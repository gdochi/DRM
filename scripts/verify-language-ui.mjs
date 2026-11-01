import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBuiltDocs } from './load-built-docs.mjs';
import { serve } from './preview-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'build/task/localize-20261101/browser');
await mkdir(output, { recursive: true });
const { config, data } = await loadBuiltDocs(path.join(root, 'dist'));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.DOCHI_PLAYWRIGHT_MODULE || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const server = serve(path.join(root, 'dist'), 0);
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.DOCHI_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [];
const errors = [];
try {
  for (const locale of ['pt', 'es', 'fr']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const chunks = [];
    page.on('request', request => { if (/\/docs-[a-z]{2}\.js/.test(request.url())) chunks.push(new URL(request.url()).pathname); });
    await page.goto(`${origin}/?lang=${locale}`);
    await page.waitForSelector('.task-card');
    assert.equal(await page.locator('html').getAttribute('lang'), config.locales[locale].htmlLang || locale);
    assert.equal(await page.locator('#tasks-title').textContent(), config.translations[locale].ui.tasks);
    assert.deepEqual(chunks, [`/assets/docs-${locale}.js`], 'Unselected languages were downloaded');
    await page.locator('.task-preview img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    await page.screenshot({ path: path.join(output, `${locale}-home-desktop.png`) });
    await page.goto(`${origin}/?lang=${locale}#dochi-npc-core/npc-core-editor`);
    await page.waitForSelector('[data-doc="npc-core-editor"]');
    const doc = data[locale].find(doc => doc.product === 'dochi-npc-core' && doc.slug === 'npc-core-editor');
    assert.equal(await page.locator('.doc-page-head h1').textContent(), doc.title);
    assert.equal(await page.locator('[data-source-locale]').textContent(), config.translations[locale].ui.sourceEnglish);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${locale} overflow at ${width}`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(output, `${locale}-npc-mobile.png`) });
    await page.locator('[data-search-open]').click();
    await page.locator('#docs-query').fill({ pt: 'municao', es: 'municion', fr: 'munitions' }[locale]);
    await page.waitForSelector('.search-result');
    assert((await page.locator('.search-result').first().getAttribute('href')).startsWith('#dochi-npc-core/'));
    await page.keyboard.press('Escape');
    await page.waitForSelector('.search-dialog[open]', { state: 'hidden' });
    await page.locator('[data-source-locale]').click();
    await page.waitForFunction(() => document.documentElement.lang === 'en');
    assert.equal(await page.locator('.doc-page-head h1').textContent(), data.en.find(doc => doc.product === 'dochi-npc-core' && doc.slug === 'npc-core-editor').title);
    assert.equal(new URL(page.url()).searchParams.get('lang'), 'en');
    await page.locator('[data-locale-toggle]').click();
    await page.locator(`[data-locale="${locale}"]`).click();
    await page.waitForFunction(lang => document.documentElement.lang === lang, config.locales[locale].htmlLang || locale);
    await page.reload();
    await page.waitForSelector('[data-doc="npc-core-editor"]');
    assert.equal(await page.locator('.doc-page-head h1').textContent(), doc.title);
    results.push({ locale, documents: data[locale].length, interface: 'passed', lazyLoading: 'passed', accentSearch: 'passed', sourceSwitch: 'passed', viewportWidths: [320, 390, 768, 1440] });
    await context.close();
  }
  const context = await browser.newContext();
  let block = true;
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.origin !== origin || (block && url.pathname.endsWith('/docs-fr.js')) ? route.abort() : route.continue();
  });
  const page = await context.newPage();
  await page.goto(`${origin}/?lang=en#core/quick-start`);
  await page.waitForSelector('[data-doc="quick-start"]');
  await page.locator('[data-locale-toggle]').click();
  await page.locator('[data-locale="fr"]').click();
  await page.waitForSelector('.language-status button');
  assert.equal(await page.locator('html').getAttribute('lang'), 'en', 'Failed language was presented as loaded');
  block = false;
  await page.locator('.language-status button').click();
  await page.waitForFunction(() => document.documentElement.lang === 'fr');
  assert.equal(await page.locator('.doc-page-head h1').textContent(), data.fr.find(doc => doc.product === 'core' && doc.slug === 'quick-start').title);
  results.push({ failureRecovery: 'passed', previousLocalePreserved: true, retry: 'passed' });
  await context.close();
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ checkedAt: new Date().toISOString(), results, errors }, null, 2) + '\n');
  console.log('Verified PT/ES/FR interface, direct language URLs, lazy loading, accent search, source switching and failed-load recovery.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
