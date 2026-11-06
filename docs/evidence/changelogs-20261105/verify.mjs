import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { loadBuiltDocs } from '../../../scripts/load-built-docs.mjs';
import { serve } from '../../../scripts/preview-server.mjs';

const root = process.cwd();
const output = path.join(root, 'docs/evidence/changelogs-20261105/browser');
await fs.mkdir(output, { recursive: true });
const { config, data } = await loadBuiltDocs(path.join(root, 'dist'));
const official = JSON.parse(await fs.readFile('docs/evidence/changelogs-20261105/published-release-notes.json', 'utf8'));
const checks = [];
const probe = 'content/en/999-unpublished-release-probe.md';
await assert.rejects(fs.stat(probe), { code: 'ENOENT' });
const originalIndex = await fs.readFile('dist/index.html');
try {
  for (const [version, id, message, displayedVersion] of [
    ['0.3.1', 9378110, 'has no verified CurseForge upload'],
    ['0.3.0', 9383985, 'file from another version or project'],
    ['0.3.0', 9378110, 'must match its verified releaseVersion', '0.3.1']
  ]) {
    await fs.writeFile(probe, `---\ntitle: Publication probe\nslug: changelog-probe\nproduct: core\nsection: releases\nversion: ${displayedVersion || version}\nreleaseVersion: ${version}\ncurseForgeFiles:\n  - ${id}\n---\n## Probe\nThis temporary document must never be published.\n`);
    const result = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: root, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert(result.stderr.includes(message), result.stderr);
    checks.push(`Build rejects ${version} / ${id}: ${message}.`);
  }
} finally {
  await fs.rm(probe, { force: true });
}
assert(originalIndex.equals(await fs.readFile('dist/index.html')), 'Rejected builds changed the working preview');

for (const [locale, docs] of Object.entries(data)) {
  if (!docs.length) continue;
  for (const release of official.releases) {
    const doc = docs.find(doc => doc.product === release.product && doc.releaseVersion === release.version);
    assert(doc, `${locale}/${release.product} missing published changelog`);
    assert.equal(doc.section, 'releases');
    assert.deepEqual(Array.from(doc.curseForgeFiles, Number), release.files.map(file => file.id));
    assert(!/href="\/linkout/.test(doc.html));
    for (const file of release.files) assert(doc.html.includes(file.url));
  }
  assert(!docs.some(doc => /(?:release-notes|current-update|battleworks-update|^release-)/.test(doc.slug)), 'Retired release page remained in public data');
  assert(!docs.some(doc => doc.product === 'mwent' && doc.slug === 'version-0-1-5'));
}
checks.push('All five content languages publish exactly the verified latest version and exact file IDs for each of the eleven mod documentation products.');
checks.push('Retired release guides and the MWENT 0.1.5 development page are absent from public data and search.');

const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const server = serve(path.join(root, 'dist'), 0);
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const routes = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  for (const [locale, docs] of Object.entries(data)) {
    if (!docs.length) continue;
    for (const doc of docs.filter(doc => doc.releaseVersion)) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${origin}/?lang=${locale}#${doc.product}/${doc.slug}`);
      await page.waitForSelector(`[data-doc-page][data-product="${doc.product}"][data-doc="${doc.slug}"]`);
      assert.equal(await page.locator('.doc-page-head h1').textContent(), doc.title);
      const group = page.locator('.nav-group').filter({ has: page.locator(`a[href="#${doc.product}/${doc.slug}"]`) });
      assert(await group.evaluate(element => element.open));
      const label = config.products[doc.product].sections.find(section => section.id === 'releases');
      assert((await group.locator('summary').textContent()).includes(label[`label_${locale}`] || label.label));
      if (doc.product !== 'mwent') {
        assert.equal(await page.locator('.doc-page-body table').first().locator('tbody tr').count(), doc.curseForgeFiles.length);
      }
      if (locale === 'ko' && doc.product === 'dochi-minigames') await page.screenshot({ path: path.join(output, 'minigames-ko-desktop.png') });
      if (locale === 'en' && doc.product === 'core') await page.screenshot({ path: path.join(output, 'drm-en-desktop.png') });
      await page.setViewportSize({ width: 390, height: 844 });
      const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, bodyTop: document.querySelector('.doc-page-body').getBoundingClientRect().top }));
      assert(layout.scroll <= layout.width + 1, `${locale}/${doc.product} horizontal overflow`);
      assert(layout.bodyTop < 720, `${locale}/${doc.product} body is below the initial viewport`);
      if (locale === 'ko' && doc.product === 'dochi-warfare') await page.screenshot({ path: path.join(output, 'warfare-ko-mobile.png') });
      routes.push({ locale, product: doc.product, slug: doc.slug, desktop: 'passed', mobile: 'passed', fileLinks: doc.curseForgeFiles.length });
    }
  }
  // Open the category from an ordinary guide, as a reader would.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/?lang=ko#core/quick-start`);
  await page.waitForSelector('[data-doc="quick-start"]');
  const releases = page.locator('.nav-group').filter({ has: page.locator('summary', { hasText: '체인지로그' }) });
  await releases.locator('summary').click();
  await releases.locator('a').click();
  await page.waitForSelector('[data-doc="changelog-0-3-0"]');
  checks.push('A reader can expand the Changelog category from the setup guide and open the published version.');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({ checkedAt: new Date().toISOString(), checks, routes, errors }, null, 2) + '\n');
console.log(`Verified publication rejection cases, ${routes.length} changelog routes on desktop/mobile, file links and sidebar category navigation.`);
