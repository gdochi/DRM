import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './preview-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, process.env.DOCHI_CREATE_LAYOUT_EVIDENCE || 'docs/evidence/dnpc-create-detailed-20261108/layout');
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
await mkdir(output, { recursive: true });
const server = serve(path.join(root, 'dist'), 0);
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
assert.equal(server.address().address, '127.0.0.1');
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [], errors = [];
try {
  const context = await browser.newContext();
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  for (const slug of ['start', 'logistics', 'factory', 'control']) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${origin}/?lang=ko#dochi-npc-core/npc-core-create-${slug}`);
      await page.waitForSelector('.doc-page-body .doc-video');
      const content = page.locator('.doc-page-body');
      const text = await content.innerText();
      assert(text.includes('Create'));
      const state = await page.evaluate(() => ({
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        headings: [...document.querySelectorAll('.doc-page-body h2')].map(h => h.textContent),
        videos: [...document.querySelectorAll('.doc-video video')].map(v => ({ label: v.getAttribute('aria-label'), width: v.getBoundingClientRect().width, src: v.querySelector('source[type="video/mp4"]').getAttribute('src') })),
        brokenLinks: [...document.querySelectorAll('.doc-page-body a[href^="#"]')].filter(a => !a.getAttribute('href').includes('/')).map(a => a.getAttribute('href'))
      }));
      assert(state.documentWidth <= width + 1, `Horizontal page overflow: ${slug}/${width}`);
      assert(state.videos.every(v => v.label && v.width > 0 && v.width <= width));
      assert.equal(state.brokenLinks.length, 0);
      await page.screenshot({ path: path.join(output, `${slug}-${width}-page.png`), fullPage: true });
      for (let i = 0; i < await page.locator('.doc-video video').count(); i++) {
        const video = page.locator('.doc-video video').nth(i);
        await video.scrollIntoViewIfNeeded();
        await video.evaluate(async v => {
          if (v.readyState < 1) await new Promise((resolve, reject) => { v.addEventListener('loadedmetadata', resolve, { once: true }); v.addEventListener('error', reject, { once: true }); });
          v.pause();
          v.currentTime = Math.min(v.duration / 2, 6);
          await new Promise(resolve => v.addEventListener('seeked', resolve, { once: true }));
        });
        await page.waitForFunction(v => v.readyState >= 2 && !v.seeking, await video.elementHandle());
        await video.evaluate(async v => { await v.play(); await new Promise(resolve => setTimeout(resolve, 300)); v.pause(); });
        await video.screenshot({ path: path.join(output, `${slug}-${width}-video-${i}.png`) });
        const figure = video.locator('..');
        assert(await figure.locator('.doc-video-step').isVisible());
        await figure.screenshot({ path: path.join(output, `${slug}-${width}-paused-step-${i}.png`) });
      }
      results.push({ slug, width, ...state });
    }
  }
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ results, errors, bind: server.address() }, null, 2));
  console.log(`Verified ${results.length} Create guide layouts and their video frames without horizontal overflow.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
