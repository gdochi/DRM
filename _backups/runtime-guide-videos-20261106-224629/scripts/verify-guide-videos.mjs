import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBuiltDocs } from './load-built-docs.mjs';
import { serve } from './preview-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, process.env.DOCHI_VIDEO_EVIDENCE || 'docs/evidence/guide-videos-20261106/browser');
await mkdir(output, { recursive: true });
const { data } = await loadBuiltDocs(path.join(root, 'dist'));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.DOCHI_PLAYWRIGHT_MODULE || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const server = serve(path.join(root, 'dist'), 0);
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.DOCHI_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [], views = [], playback = [];
try {
  const context = await browser.newContext();
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const seen = new Set();
  for (const [locale, docs] of Object.entries(data)) {
    for (const doc of docs.filter(doc => doc.html.includes('class="doc-video"'))) {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`${origin}/?lang=${locale}&video-check=${width}#${doc.product}/${doc.slug}`);
        await page.waitForSelector('.doc-video video');
        const video = page.locator('.doc-video video').first();
        await video.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => {
          const video = document.querySelector('.doc-video video');
          return video?.readyState >= 2 && !video.paused;
        });
        const state = await video.evaluate(v => ({ width: v.videoWidth, height: v.videoHeight, muted: v.muted, loop: v.loop, controls: v.controls, inline: v.playsInline, paused: v.paused, label: v.getAttribute('aria-label'), source: v.currentSrc, duration: v.duration }));
        assert.equal(state.width, 1280);
        assert.equal(state.height, 720);
        assert(state.muted && state.loop && state.controls && state.inline && !state.paused && state.label, JSON.stringify(state));
        assert(state.duration > 0 && state.duration < 60);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${locale}/${doc.slug}/${width}`);
        views.push({ locale, route: `${doc.product}/${doc.slug}`, width, ...state });
        if (locale === 'ko') await video.screenshot({ path: path.join(output, `${doc.product}-${doc.slug}-${width}.png`) });
        if (seen.has(state.source)) continue;
        seen.add(state.source);
        for (const source of await video.locator('source').all()) {
          const url = new URL(await source.getAttribute('src'), origin).href;
          const response = await context.request.get(url);
          assert(response.ok());
          assert(response.headers()['content-type'].startsWith(await source.getAttribute('type')));
        }
        const frames = await video.evaluate(async v => {
          v.currentTime = Math.min(2, v.duration / 2);
          await new Promise(resolve => v.addEventListener('seeked', resolve, { once: true }));
          await v.play();
          const before = v.getVideoPlaybackQuality().totalVideoFrames;
          await new Promise(resolve => setTimeout(resolve, 650));
          const decoded = v.getVideoPlaybackQuality().totalVideoFrames - before;
          v.pause();
          return { decoded, paused: v.paused };
        });
        assert(frames.decoded >= 5 && frames.paused, JSON.stringify(frames));
        // Observe the actual loop boundary, not just the HTML loop attribute.
        await video.evaluate(async v => {
          v.currentTime = v.duration - 0.2;
          await new Promise(resolve => v.addEventListener('seeked', resolve, { once: true }));
          await v.play();
        });
        await page.waitForFunction(() => document.querySelector('.doc-video video').currentTime < 2);
        await video.evaluate(async v => { v.pause(); v.querySelector('source[type="video/webm"]').remove(); v.load(); await v.play(); });
        assert((await video.evaluate(v => v.currentSrc)).endsWith('.mp4'));
        assert(await video.evaluate(v => v.videoWidth === 1280 && !v.error));
        playback.push({ source: state.source, decodedFrames: frames.decoded, seek: true, pause: true, loop: true, mp4Fallback: true });
      }
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${origin}/?lang=en#core-fabric/remnant-msg`);
  await page.waitForSelector('.doc-video video');
  assert(await page.locator('.doc-video video').evaluate(v => !v.autoplay && v.paused && v.controls));
  await page.locator('.doc-video video').evaluate(v => v.play());
  assert(await page.locator('.doc-video video').evaluate(v => !v.paused));
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ views, playback, reducedMotion: true, errors }, null, 2) + '\n');
  console.log(`Verified ${views.length} desktop/mobile video views and ${playback.length} unique recordings: autoplay, mute, seek, pause, looping, MP4 fallback and reduced motion.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
