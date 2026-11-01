import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { serve } from './preview-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'build/task/reader-ui');
await mkdir(output, { recursive: true });
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.DOCHI_PLAYWRIGHT_MODULE || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const data = { window: {} };
vm.runInNewContext(await readFile(path.join(root, 'dist/assets/docs-data.js'), 'utf8'), data);
const server = serve(path.join(root, 'dist'), 0);
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.DOCHI_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const failures = [];
const routes = [];
const checks = [];

try {
  const session = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await session.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await session.newPage();
  const go = async url => {
    await page.goto(url);
    const [product, requested] = new URL(url).hash.replace(/^#/, '').split('/');
    if (!product || product === 'home') return page.waitForSelector('.home-shell');
    const slug = requested || data.window.DRM_DOCS_CONFIG.startPages[product];
    const doc = data.window.DRM_DOCS_DATA.ko.find(doc => doc.product === product && doc.slug === slug);
    if (doc) await page.waitForSelector(`[data-doc-page][data-product="${product}"][data-doc="${slug}"]`);
    else await page.waitForSelector('.not-found');
  };
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  await page.goto(origin);
  await page.evaluate(() => { localStorage.setItem('drm-docs-locale', 'ko'); localStorage.setItem('drm-docs-theme', 'light'); });
  await page.reload();
  assert.equal(await page.locator('.task-card').count(), 6);
  assert.equal(await page.locator('.track-card p').count(), 12);
  await page.locator('.task-preview img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.screenshot({ path: path.join(output, 'home-desktop.png') });
  for (const [product, slug] of Object.entries(data.window.DRM_DOCS_CONFIG.startPages)) {
    await go(`${origin}/#${product}`);
    assert.equal(await page.locator('[data-doc-page]').getAttribute('data-doc'), slug, product);
  }
  checks.push('All 12 mod entries open their configured beginner guide.');

  await go(`${origin}/#core/dialogue-system`);
  await page.setViewportSize({ width: 390, height: 844 });
  const bodyTop = await page.locator('.doc-page-body').evaluate(element => element.getBoundingClientRect().top);
  assert(bodyTop < 700, `Mobile body starts too low: ${bodyTop}`);
  assert(!await page.locator('[data-sidebar]').isVisible());
  await page.locator('[data-mobile-menu]').click();
  assert(await page.locator('[data-sidebar]').isVisible());
  await page.locator('.doc-nav-link.is-active').click();
  // A same-document link must also close the menu.
  assert(!await page.locator('[data-sidebar]').isVisible());
  await page.screenshot({ path: path.join(output, 'dialogue-mobile.png') });
  await page.locator('.mobile-toc summary').click();
  const tocLink = page.locator('.mobile-toc [data-toc-link]').nth(2);
  const headingId = await tocLink.getAttribute('data-toc-link');
  await tocLink.click();
  assert(!await page.locator('.mobile-toc').evaluate(element => element.open));
  const headingY = await page.locator(`[id="${headingId}"]`).evaluate(element => element.getBoundingClientRect().top);
  assert(headingY >= 55 && headingY <= 150, `Heading behind toolbar: ${headingY}`);
  checks.push({ mobileBodyTop: bodyTop, mobileTocHeadingTop: headingY });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await go(`${origin}/#dochi-npc-core/npc-core-editor`);
  await page.evaluate(() => scrollTo({ top: 2100, behavior: 'instant' }));
  const before = await page.evaluate(() => scrollY);
  // DOM click avoids the browser scrolling to the sticky toolbar as part of the test action.
  await page.locator('[data-theme-toggle]').evaluate(element => element.click());
  assert(Math.abs(await page.evaluate(() => scrollY) - before) < 5);
  await page.locator('[data-locale-toggle]').evaluate(element => element.click());
  assert(Math.abs(await page.evaluate(() => scrollY) - before) < 5);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('[data-locale-toggle]').getAttribute('aria-expanded'), 'false');
  await page.locator('[data-locale-toggle]').evaluate(element => element.click());
  await page.locator('[data-locale="en"]').click();
  assert(await page.evaluate(() => scrollY) > 500);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.locator('[data-locale-toggle]').evaluate(element => element.click());
  await page.locator('[data-locale="ko"]').click();
  checks.push('Theme, language-menu and translation switches preserve the reading position.');

  await page.keyboard.press('Control+k');
  await page.locator('#docs-query').fill('탄약');
  await page.waitForSelector('.search-result');
  assert((await page.locator('.search-result').first().getAttribute('href')).startsWith('#dochi-npc-core/'));
  await page.locator('.search-scope select').selectOption('');
  await page.locator('#docs-query').fill('Save As');
  await page.waitForFunction(() => document.querySelector('.search-status').textContent.includes('검색 결과'));
  await page.waitForTimeout(150);
  assert(await page.locator('.search-result').count() > 0);
  await page.locator('#docs-query').fill('존재하지않는기능xyz987');
  await page.waitForFunction(() => document.querySelector('.search-status').textContent.includes('찾지 못했습니다'));
  assert.equal(await page.locator('.search-result').count(), 0);
  await page.locator('.search-scope select').selectOption('core');
  await page.locator('#docs-query').fill('상점');
  await page.waitForSelector('.search-result');
  const searchHref = await page.locator('.search-result').first().getAttribute('href');
  await page.keyboard.press('ArrowDown');
  assert(await page.locator('.search-result').first().evaluate(element => element === document.activeElement));
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => !document.querySelector('dialog[open]'));
  assert.equal(decodeURIComponent(await page.evaluate(() => location.hash)), decodeURIComponent(searchHref));
  checks.push('Search scopes, Korean aliases, English button names, empty results and keyboard navigation work.');

  await go(`${origin}/#dochi-npc-core/npc-core-editor`);
  const imageLink = page.locator('.doc-image a').first();
  await imageLink.scrollIntoViewIfNeeded();
  await imageLink.locator('img').evaluate(image => image.decode());
  const imagePosition = await page.evaluate(() => scrollY);
  await imageLink.click();
  await page.waitForSelector('.image-dialog[open]');
  await page.locator('[data-image-actual]').click();
  assert.equal(await page.locator('[data-zoom-level]').textContent(), '100%');
  await page.locator('[data-zoom-in]').click();
  assert.equal(await page.locator('[data-zoom-level]').textContent(), '150%');
  const viewport = page.locator('.image-viewport');
  const box = await viewport.boundingBox();
  const panBefore = await viewport.evaluate(element => element.scrollLeft);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 100, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();
  assert(await viewport.evaluate(element => element.scrollLeft) > panBefore + 50);
  await page.screenshot({ path: path.join(output, 'image-zoom-desktop.png') });
  await page.keyboard.press('Escape');
  assert(Math.abs(await page.evaluate(() => scrollY) - imagePosition) < 5);
  assert(await imageLink.evaluate(element => element === document.activeElement));
  await page.setViewportSize({ width: 390, height: 844 });
  await imageLink.click();
  await page.locator('[data-image-actual]').click();
  assert(await page.locator('.image-viewport').evaluate(element => element.scrollWidth > element.clientWidth * 3));
  await page.screenshot({ path: path.join(output, 'image-zoom-mobile.png') });
  await page.keyboard.press('Escape');
  checks.push('Original-resolution image viewing, zoom, drag, Escape and focus/scroll restoration work.');

  await go(`${origin}/#mwent/card-catalog`);
  const allRows = await page.locator('.table-wrap tbody tr').count();
  await page.locator('#catalog-query').fill('zzzz-no-card-987');
  assert.equal(await page.locator('.table-wrap tbody tr:visible').count(), 0);
  await page.locator('#catalog-query').fill('');
  assert.equal(await page.locator('.table-wrap tbody tr:visible').count(), allRows);
  checks.push({ catalogRows: allRows, filtering: 'passed' });

  for (const route of ['dochi-npc-core/does-not-exist', 'unknown-product/foo']) {
    await go(`${origin}/#${route}`);
    assert(await page.locator('.not-found').isVisible());
    assert.equal(await page.locator('[data-doc-page]').count(), 0);
  }
  checks.push('Invalid document and mod addresses show an explicit not-found page.');

  for (const width of [320, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['home', 'core/dialogue-system', 'dochi-npc-core/npc-core-editor', 'mwent/card-catalog']) {
      await go(`${origin}/#${route}`);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Viewport overflow: ${width} ${route}`);
      assert(await page.locator('[data-search-open]').first().isVisible());
      assert(await page.locator('[data-theme-toggle]').isVisible());
      assert(await page.locator('[data-locale-toggle]').isVisible());
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go(`${origin}/#dochi-npc-core/npc-core-editor`);
  await page.screenshot({ path: path.join(output, 'npc-desktop-dark.png') });
  checks.push('Home, dialogue, NPC and catalog layouts fit 320, 768, 1024, 1440 and 1920px.');

  const touchSession = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await touchSession.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  await touchSession.addInitScript(() => localStorage.setItem('drm-docs-locale', 'ko'));
  const touchPage = await touchSession.newPage();
  await touchPage.goto(`${origin}/#dochi-npc-core/npc-core-editor`);
  await touchPage.locator('.doc-image a').first().tap();
  await touchPage.locator('[data-image-actual]').tap();
  assert.equal(await touchPage.locator('[data-zoom-level]').textContent(), '100%');
  const cdp = await touchSession.newCDPSession(touchPage);
  const point = (x, y, id) => ({ x, y, id, force: 1 });
  // Model each gesture over 300ms of physical contact, with compositor input
  // acknowledgment between samples. Instant CDP batches suppress the next tap.
  const touch = async (type, touchPoints) => {
    await cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
    await new Promise(resolve => setTimeout(resolve, 50));
  };
  await touch('touchStart', [point(140, 350, 0), point(240, 350, 1)]);
  for (let step = 1; step <= 5; step++) await touch('touchMove', [point(140 - step * 10, 350, 0), point(240 + step * 10, 350, 1)]);
  await touch('touchEnd', []);
  assert(parseInt(await touchPage.locator('[data-zoom-level]').textContent()) >= 180, 'Touch pinch did not enlarge the image');
  const touchPanBefore = await touchPage.locator('.image-viewport').evaluate(element => element.scrollLeft);
  await touch('touchStart', [point(240, 350, 0)]);
  for (let step = 1; step <= 5; step++) await touch('touchMove', [point(240 - step * 20, 350, 0)]);
  await touch('touchEnd', []);
  assert(await touchPage.locator('.image-viewport').evaluate(element => element.scrollLeft) > touchPanBefore + 50, 'Touch drag did not move the image');
  await touchPage.screenshot({ path: path.join(output, 'touch-pinch-mobile.png') });
  await touchPage.locator('[data-dialog-close]').tap();
  await touchPage.waitForSelector('dialog[open]', { state: 'hidden' });
  await touchSession.close();
  checks.push('Mobile touch tap, two-finger pinch, one-finger pan and close work in a touch browser context.');

  for (const [locale, docs] of Object.entries(data.window.DRM_DOCS_DATA)) {
    if (!docs.length) continue;
    await page.evaluate(locale => localStorage.setItem('drm-docs-locale', locale), locale);
    await page.reload();
    for (const doc of docs) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await go(`${origin}/#${doc.product}/${doc.slug}`);
      assert.equal(await page.locator('.doc-page-head h1').textContent(), doc.title, doc.sourcePath);
      const expected = doc.headings.filter(heading => [2,3].includes(heading.level)).length;
      assert.equal(await page.locator('.page-toc [data-toc-link]').count(), expected, doc.sourcePath);
      const images = await page.locator('.doc-image img').evaluateAll(images => images.map(image => ({ width: image.getBoundingClientRect().width, reserved: !!image.width && !!image.height })));
      assert(images.every(image => image.reserved && image.width > 0), `Missing reserved image dimensions: ${doc.sourcePath}`);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      assert(!await page.locator('[data-sidebar]').isVisible(), doc.sourcePath);
      const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, titleTop: document.querySelector('.doc-page-head h1').getBoundingClientRect().top, bodyTop: document.querySelector('.doc-page-body').getBoundingClientRect().top, navAfterBody: document.querySelector('.doc-follow-nav').compareDocumentPosition(document.querySelector('.doc-page-body')) & Node.DOCUMENT_POSITION_PRECEDING }));
      assert(layout.scroll <= layout.width + 1, `Horizontal overflow: ${doc.sourcePath} ${layout.scroll}`);
      assert(layout.titleTop < 440, `Title below first screen: ${doc.sourcePath}`);
      assert(layout.bodyTop < 720, `Body below first screen: ${doc.sourcePath} ${layout.bodyTop}`);
      assert(layout.navAfterBody, `Previous/next above body: ${doc.sourcePath}`);
      routes.push({ locale, route: `${doc.product}/${doc.slug}`, mobileBodyTop: layout.bodyTop, desktop: 'passed', mobile: 'passed' });
    }
  }
  assert.deepEqual(errors, [], 'Browser JavaScript errors');
  assert.deepEqual(failures, [], 'Failed local resources');
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ completedAt: new Date().toISOString(), checks, routes, errors, failures }, null, 2) + '\n');
  console.log(`Passed reader interactions and desktop/mobile layout for ${routes.length} documents. Evidence: build/task/reader-ui`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
