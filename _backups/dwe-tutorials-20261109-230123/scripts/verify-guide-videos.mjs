import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBuiltDocs } from './load-built-docs.mjs';
import { serve } from './preview-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, process.env.DOCHI_VIDEO_EVIDENCE || 'docs/evidence/guide-videos-20261106/browser');
const routes = new Set((process.env.DOCHI_VIDEO_ROUTES || '').split(',').filter(Boolean));
await mkdir(output, { recursive: true });
const { data } = await loadBuiltDocs(path.join(root, 'dist'));
const captureManifest = JSON.parse(await readFile(path.join(root, 'src/guide-environments.json'), 'utf8')).captures;
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
    for (const doc of docs.filter(doc => doc.html.includes('class="doc-video"') && (!routes.size || routes.has(`${doc.product}/${doc.slug}`)))) {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`${origin}/?lang=${locale}&video-check=${width}#${doc.product}/${doc.slug}`);
        await page.waitForSelector('.doc-video video');
        for (let index = 0; index < await page.locator('.doc-video video').count(); index++) {
          const video = page.locator('.doc-video video').nth(index);
          const element = await video.elementHandle();
          await video.scrollIntoViewIfNeeded();
          await page.waitForFunction(video => video.readyState >= 2 && !video.paused, element);
          const state = await video.evaluate(v => ({ width: v.videoWidth, height: v.videoHeight, muted: v.muted, loop: v.loop, controls: v.controls, inline: v.playsInline, paused: v.paused, label: v.getAttribute('aria-label'), source: v.currentSrc, duration: v.duration }));
          const asset = new URL(state.source).pathname.slice(1);
          const metadata = captureManifest[asset] || captureManifest[asset.replace(/\.webm$/, '.mp4')];
          assert(metadata, `Missing capture dimensions: ${asset}`);
          assert.equal(state.width, metadata.width);
          assert.equal(state.height, metadata.height);
          assert(state.muted && state.loop && state.controls && state.inline && !state.paused && state.label, JSON.stringify(state));
          assert(Number.isFinite(state.duration) && state.duration > 0);
          if (metadata.durationMs) assert(Math.abs(state.duration * 1000 - metadata.durationMs) < 300, `${asset}: duration differs from the native capture receipt`);
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${locale}/${doc.slug}/${width}`);
          views.push({ locale, route: `${doc.product}/${doc.slug}`, viewportWidth: width, index, ...state });
          if (locale === 'ko') {
            await video.screenshot({ path: path.join(output, `${doc.product}-${doc.slug}-${width}-${index}.png`) });
            if (index === 0) await page.screenshot({ path: path.join(output, `${doc.product}-${doc.slug}-${width}-layout.png`) });
          }
          if (seen.has(state.source)) { await element.dispose(); continue; }
          seen.add(state.source);
          for (const source of await video.locator('source').all()) {
            const url = new URL(await source.getAttribute('src'), origin).href;
            const response = await context.request.get(url);
            assert(response.ok());
            assert(response.headers()['content-type'].startsWith(await source.getAttribute('type')));
            const bytes = await response.body();
            assert.equal(Number(response.headers()['content-length']), bytes.length);
            const partial = await context.request.get(url, { headers: { Range: 'bytes=0-31' } });
            assert.equal(partial.status(), 206);
            assert.equal(partial.headers()['content-range'], `bytes 0-31/${bytes.length}`);
            assert.deepEqual(await partial.body(), bytes.subarray(0, 32));
            if (!playback.length) {
              for (const range of ['bytes=-16', `bytes=${bytes.length - 16}-`]) {
                const tail = await context.request.get(url, { headers: { Range: range } });
                assert.equal(tail.status(), 206);
                assert.deepEqual(await tail.body(), bytes.subarray(-16));
              }
              const invalid = await context.request.get(url, { headers: { Range: `bytes=${bytes.length}-` } });
              assert.equal(invalid.status(), 416);
              assert.equal(invalid.headers()['content-range'], `bytes */${bytes.length}`);
              const head = await context.request.head(url);
              assert.equal(Number(head.headers()['content-length']), bytes.length);
              assert.equal((await head.body()).length, 0);
            }
          }
          const frames = await video.evaluate(async v => {
            v.pause();
            const target = Math.min(2, v.duration / 2);
            v.currentTime = target;
            await new Promise(resolve => v.addEventListener('seeked', resolve, { once: true }));
            const seekTime = v.currentTime;
            await v.play();
            const before = v.getVideoPlaybackQuality().totalVideoFrames;
            await new Promise(resolve => setTimeout(resolve, 650));
            const decoded = v.getVideoPlaybackQuality().totalVideoFrames - before;
            v.pause();
            return { decoded, paused: v.paused, target, seekTime };
          });
          assert(frames.decoded >= 5 && frames.paused, JSON.stringify(frames));
          assert(Math.abs(frames.seekTime - frames.target) < 0.15, JSON.stringify(frames));
          if (metadata.steps?.length) {
            const caption = await video.evaluate(v => {
              const figure = v.closest('.doc-video'), panel = figure.querySelector('.doc-video-step');
              return { time: v.currentTime * 1000, title: panel.querySelector('[data-step-title]').textContent, body: panel.querySelector('[data-step-body]').textContent, lang: panel.lang, bottom: panel.getBoundingClientRect().bottom, videoTop: v.getBoundingClientRect().top };
            });
            const expected = metadata.steps.filter(step => step.startMs <= caption.time).at(-1) || metadata.steps[0];
            assert(caption.title.endsWith(expected.title));
            assert.equal(caption.body, expected.body);
            assert.equal(caption.lang, 'ko');
            assert(caption.bottom <= caption.videoTop, 'Paused step text overlaps native video controls');
          }
          // Observe the actual loop boundary, not just the HTML loop attribute.
          const boundary = await video.evaluate(async v => {
            const target = v.duration - 0.2;
            v.currentTime = target;
            await new Promise(resolve => v.addEventListener('seeked', resolve, { once: true }));
            const seekTime = v.currentTime;
            await v.play();
            return { target, seekTime };
          });
          assert(Math.abs(boundary.seekTime - boundary.target) < 0.15, JSON.stringify(boundary));
          await page.waitForFunction(video => video.currentTime < 2, element);
          await video.evaluate(async v => { v.pause(); v.querySelector('source[type="video/webm"]').remove(); v.load(); await v.play(); });
          assert((await video.evaluate(v => v.currentSrc)).endsWith('.mp4'));
          assert(await video.evaluate((v, dimensions) => v.videoWidth === dimensions.width && v.videoHeight === dimensions.height && !v.error, metadata));
          playback.push({ source: state.source, decodedFrames: frames.decoded, seekTime: frames.seekTime, seek: true, byteRanges: true, pause: true, loop: true, mp4Fallback: true });
          await element.dispose();
        }
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
