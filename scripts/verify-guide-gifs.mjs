import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "./preview-server.mjs";
import { loadBuiltDocs } from "./load-built-docs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "build/task/guide-gifs-20261105/browser");
await mkdir(output, { recursive: true });
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"));
const built = await loadBuiltDocs(path.join(root, "dist"));
const server = serve(path.join(root, "dist"), 0);
if (!server.listening) await new Promise(resolve => server.once("listening", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const errors = [], results = [];
try {
  const context = await browser.newContext();
  await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(String(error)));
  for (const locale of Object.keys(built.data)) {
    for (const doc of built.data[locale].filter(doc => doc.html.includes("guides/short-gifs-20261105/"))) {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
        await page.goto(`${origin}/?lang=${locale}#${doc.product}/${doc.slug}`);
        const gif = page.locator('.doc-image img[src$=".gif"]').first();
        await gif.scrollIntoViewIfNeeded();
        await gif.evaluate(image => image.decode());
        assert.equal(await gif.evaluate(image => image.naturalWidth), 1280);
        assert.equal(await gif.evaluate(image => image.naturalHeight), 720);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow: ${locale}/${doc.slug}/${width}`);
        const source = await gif.getAttribute("src");
        const response = await context.request.get(new URL(source, origin).href);
        assert(response.ok());
        assert(response.headers()["content-type"].startsWith("image/gif"));
        const frame = gif.locator("..");
        await frame.click();
        await page.waitForSelector(".image-dialog[open]");
        await page.locator(".image-dialog img").evaluate(image => image.decode());
        await page.keyboard.press("Escape");
        if (locale === "ko" && doc.product !== "core") {
          await frame.screenshot({ path: path.join(output, `${doc.slug}-${width}.png`) });
        }
        results.push({ locale, route: `${doc.product}/${doc.slug}`, width, source, decoded: true, originalViewer: true });
      }
    }
  }
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, "results.json"), JSON.stringify({ results, errors }, null, 2) + "\n");
  console.log(`Verified GIF loading, MIME type, original viewer and desktop/mobile layout: ${results.length} page views.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
