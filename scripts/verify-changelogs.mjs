import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { loadBuiltDocs } from './load-built-docs.mjs';
import { serve } from './preview-server.mjs';
import { scopeMatches, scopedNotes } from './changelog-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'docs/evidence/changelog-tabs-20261106');
await mkdir(output, { recursive: true });
const { config, data } = await loadBuiltDocs(path.join(root, 'dist'));
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(root, 'dist/assets/changelogs.js'), 'utf8'), context);
const releases = JSON.parse(JSON.stringify(context.window.DOCHI_CHANGELOGS));
const link = r => `#changelog/${r.product}/${r.loader}/${r.minecraft}/${r.version}`;
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.DOCHI_PLAYWRIGHT_MODULE || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const server = serve(path.join(root, 'dist'), 0);
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.DOCHI_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const routes = [];
const checks = [];
try {
  assert(scopeMatches('Forge 1.20.1 / Fabric & NeoForge 1.21.1', 'NeoForge', '1.21.1'));
  assert(!scopeMatches('Forge 1.20.1 / Fabric & NeoForge 1.21.1', 'NeoForge', '26.3'));
  assert(scopeMatches('Fabric 1.21.1 / Fabric & NeoForge 26.3', 'NeoForge', '26.3'));
  assert(!scopeMatches('Fabric 1.21.1 / Fabric & NeoForge 26.3', 'NeoForge', '1.21.1'));
  const fabricated = '<h2>Global</h2><ul><li>Shared.</li></ul><h2>Forge 1.20.1</h2><ul><li>Legacy feature.</li></ul><h2>NeoForge 26.3</h2><ul><li>Modern feature.</li></ul><script>alert(1)</script>';
  assert(!scopedNotes(fabricated, 'NeoForge', '26.3').includes('Legacy feature.'));
  assert(scopedNotes(fabricated, 'NeoForge', '26.3').includes('Modern feature.'));
  assert(!scopedNotes(fabricated, 'NeoForge', '26.3').includes('<script'));
  const session = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await session.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await session.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const go = async hash => { await page.goto(`${origin}/?lang=ko${hash}`); await page.waitForSelector('[data-changelog], .not-found, .home-shell, [data-doc-page]'); };
  for (const release of releases) {
    await go(link(release));
    await page.waitForSelector('[data-changelog]');
    const actual = await page.locator('[data-changelog]').evaluate(element => ({ ...element.dataset }));
    for (const key of ['product', 'loader', 'minecraft', 'version']) assert.equal(actual[key], release[key], link(release));
    assert.equal(await page.locator('.changelog-release').count(), 1);
    assert.equal(await page.locator('.release-title h2').textContent(), release.version);
    assert.equal(await page.locator('.release-title a').getAttribute('href'), release.url);
    const categories = await page.locator('.changelog-notes h3').allTextContents();
    for (const title of ['Added','Fixed','Changed','Improved']) assert(categories.filter(item => item === title).length <= 1, `Repeated category ${link(release)} ${title}`);
    const expectedHtml = await page.evaluate(html => new DOMParser().parseFromString(html, 'text/html').body.innerHTML, release.html);
    assert.equal(await page.locator('.changelog-notes').innerHTML(), expectedHtml, link(release));
    await page.setViewportSize({ width: 320, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Mobile overflow ${link(release)}`);
    await page.setViewportSize({ width: 1440, height: 1000 });
    routes.push(link(release));
  }
  checks.push(`All ${routes.length} public environment/version routes show exactly one release, its exact download and no mobile overflow.`);

  for (const locale of Object.keys(config.locales)) {
    await page.goto(`${origin}/?lang=${locale}#home`);
    await page.waitForSelector('.home-shell');
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Home overflow ${locale} ${width}`);
      assert.equal(await page.locator('.track-changelog').count(), config.wikiMods.length);
      for (const group of await page.locator('.track-primary-actions').all()) {
        const boxes = await group.locator('a').evaluateAll(links => links.map(link => { const r=link.getBoundingClientRect(); return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}; }));
        assert(boxes[1].x >= boxes[0].right && Math.abs(boxes[1].y - boxes[0].y) < 1, `Changelog must sit right of Open docs: ${locale} ${width}`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.track-changelog').nth(1).click();
    await page.waitForSelector('[data-changelog][data-product="core-fabric"]');
    assert.equal(await page.locator('.product-tabs [aria-current]').count(), 1);
  }
  checks.push('All eight interface languages keep Changelog immediately right of Open docs at 320, 390, 768 and 1440px.');

  for (const [product, slug] of Object.entries(config.startPages)) {
    await go(`#${product}/${slug}`);
    await page.waitForSelector('[data-doc-page]');
    assert.equal(await page.locator('[data-doc-page]').getAttribute('data-doc'), slug);
    assert.equal(await page.locator('.doc-nav .nav-group').filter({ hasText: 'Change Log' }).count(), 0);
    await page.locator('.sidebar .product-tabs a').last().evaluate(element => element.click());
    await page.waitForSelector('[data-changelog]');
    assert.equal(await page.locator('[data-changelog]').getAttribute('data-product'), product === 'mwent' ? 'dochi-minigames' : product);
  }
  checks.push('All 12 beginner guides retain navigation and expose the separate changelog; MWENT opens Minigames history.');

  for (const doc of data.en.filter(doc => doc.section === 'releases')) {
    await go(`#${doc.product}/${doc.slug}`);
    await page.waitForSelector('[data-changelog]');
    assert.equal(await page.locator('[data-changelog]').getAttribute('data-version'), doc.releaseVersion || doc.version);
  }
  checks.push('Existing release links redirect to the same mod version in the separate changelog.');

  await go('#changelog/dochi-npc-core/NeoForge/26.3/0.1.2');
  let text = await page.locator('.changelog-notes').textContent();
  assert(!text.includes("Farmer's Delight"));
  assert(!text.includes('cutting board'));
  await page.locator('.changelog-options a[href="#changelog/dochi-npc-core/NeoForge/1.21.1"]').click();
  await page.waitForSelector('[data-minecraft="1.21.1"]');
  text = await page.locator('.changelog-notes').textContent();
  assert(text.includes("Farmer's Delight"));
  assert(text.includes('cutting board'));
  await page.goBack();
  await page.waitForSelector('[data-minecraft="26.3"]');
  await page.reload();
  await page.waitForSelector('[data-minecraft="26.3"]');
  await page.locator('[data-changelog-mod]').selectOption('dochi-warfare');
  await page.waitForSelector('[data-product="dochi-warfare"][data-changelog]');
  assert(!await page.locator('.changelog-notes').textContent().then(text => text.includes('Mercenary Configuration screen')));
  await go('#changelog/dochi-warfare/NeoForge/1.21.1/0.3.1');
  assert((await page.locator('.changelog-notes').textContent()).includes('Mercenary Configuration screen'));
  await go('#changelog/core-fabric/Fabric/26.3/0.3.0');
  assert(!/CNPC|trainer battle records/.test(await page.locator('.changelog-notes').textContent()));
  await go('#changelog/dochi-warfare-expanded/NeoForge/1.21.1/0.3.1');
  assert.equal(await page.locator('.changelog-notes tbody tr').count(), 3);
  assert(!/VVP|FCP|SMA|Forge 1\.20\.1/.test(await page.locator('.changelog-notes').textContent()));
  checks.push('Real DNPC, DRM, Warfare and DWE notes are isolated by environment, including scoped compatibility rows. Back/reload/mod switches preserve valid selection.');

  for (const bad of ['#changelog/unknown/Forge/1.20.1/0.3.0','#changelog/core/NeoForge/1.20.1/0.3.0','#changelog/core/Forge/26.3/0.3.0','#changelog/core/Forge/1.20.1/99.0.0','#changelog/core/Forge/1.20.1/0.3.0/extra']) {
    await go(bad); assert(await page.locator('.not-found').isVisible(), bad);
  }
  checks.push('Unknown mods, loaders, Minecraft versions, mod versions and malformed routes show not found.');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await go('#changelog/dochi-npc-core/NeoForge/1.21.1/0.1.2');
  await page.screenshot({ path: path.join(output, 'changelog-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(output, 'changelog-mobile.png'), fullPage: true });
  await go('#home');
  await page.locator('.track-card').nth(1).screenshot({ path: path.join(output, 'home-buttons-mobile.png') });
  await page.locator('[data-theme-toggle]').click();
  await go('#changelog/dochi-npc-core/NeoForge/26.3/0.1.2');
  await page.screenshot({ path: path.join(output, 'changelog-mobile-theme.png'), fullPage: true });
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ completedAt: new Date().toISOString(), versions: new Set(releases.map(r=>`${r.product}/${r.version}`)).size, routes, checks, errors }, null, 2)+'\n');
  console.log(`Passed ${routes.length} scoped release routes and changelog navigation/layout checks. Evidence: ${output}`);
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
