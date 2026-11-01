import assert from "node:assert/strict";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { serve } from "./preview-server.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.DOCHI_PLAYWRIGHT_MODULE || path.join(os.homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"));
const output = path.join(root, "build/task/guide-layout");
await mkdir(output, { recursive: true });
// Each run checks a fixed build, even if authoring continues in the workspace.
const snapshot = path.join(output, `site-${Date.now()}`);
await cp(path.join(root, "dist"), snapshot, { recursive: true, errorOnExist: true });
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(snapshot, "assets/docs-data.js"), "utf8"), context);
const server = serve(snapshot, 0);
if (!server.listening) await new Promise(resolve => server.once("listening", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.DOCHI_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const results = [];

try {
  for (const [locale, docs] of Object.entries(context.window.DRM_DOCS_DATA)) {
    const pages = docs.filter(doc => doc.html.includes('class="doc-image"'));
    if (!pages.length) continue;
    const session = await browser.newContext();
    // Keep comments and other third-party integrations outside this local layout check.
    await session.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    await session.addInitScript(value => localStorage.setItem("drm-docs-locale", value), locale);
    const page = await session.newPage();
    for (const doc of pages) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${origin}/#${doc.product}/${doc.slug}`);
      await page.waitForSelector(".doc-page-body .doc-image");
      const images = page.locator(".doc-page-body .doc-image img");
      const count = await images.count();
      for (let index = 0; index < count; index++) {
        const img = images.nth(index);
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(element => element.decode());
        assert(await img.evaluate(element => element.complete && element.naturalWidth > 0), `Image not loaded: ${doc.sourcePath}`);
        assert(await img.evaluate(element => element.getBoundingClientRect().width <= element.closest(".doc-page-body").getBoundingClientRect().width), `Desktop image overflow: ${doc.sourcePath}`);
      }
      if (doc.slug === "dialogue-system") {
        await images.first().scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, `${locale}-${doc.product}-dialogue-desktop.png`) });
        await images.first().locator("..").click();
        await page.waitForSelector(".image-dialog[open]");
        await page.locator("[data-image-actual]").click();
        assert.equal(await page.locator("[data-zoom-level]").textContent(), "100%", "Original-resolution zoom did not open");
        const popupPromise = page.waitForEvent("popup");
        await page.locator(".image-toolbar a").click();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        assert(popup.url().endsWith(".png"), "Original image link did not open the PNG");
        await popup.close();
        await page.keyboard.press("Escape");
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await images.first().scrollIntoViewIfNeeded();
      const measurements = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth,
        images: [...document.querySelectorAll(".doc-image img")].map(img => ({ left: img.getBoundingClientRect().left, right: img.getBoundingClientRect().right })) }));
      assert(measurements.scroll <= measurements.width + 1, `Mobile horizontal overflow: ${doc.sourcePath}`);
      assert(measurements.images.every(img => img.left >= 0 && img.right <= measurements.width + 1), `Mobile image clipped: ${doc.sourcePath}`);
      if (doc.slug === "dialogue-system") await page.screenshot({ path: path.join(output, `${locale}-${doc.product}-dialogue-mobile.png`) });
      results.push({ document: doc.sourcePath, images: count, desktop: "passed", mobile: "passed" });
    }
    await session.close();
  }
  await writeFile(path.join(output, "results.json"), JSON.stringify(results, null, 2) + "\n");
  await writeFile(path.join(output, "snapshot.json"), JSON.stringify({ snapshot, documents: results.length, completedAt: new Date().toISOString() }, null, 2) + "\n");
  console.log(`Browser-checked ${results.length} illustrated guides at 1440px and 390px; original image links checked in dialogue guides.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
