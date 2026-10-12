import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const snapshot = path.dirname(fileURLToPath(import.meta.url));
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'dist/assets/docs-data.js'), 'utf8'), context);
const config = context.window.DRM_DOCS_CONFIG;
const data = context.window.DRM_DOCS_DATA;
const errors = [];
for (const [locale, docs] of Object.entries(data)) {
  const keys = new Set();
  for (const doc of docs) {
    const key = `${doc.product}/${doc.slug}`;
    if (keys.has(key)) errors.push(`Duplicate ${locale}/${key}`);
    keys.add(key);
    if (!config.products[doc.product]) errors.push(`Missing product ${locale}/${key}`);
    else if (!config.products[doc.product].sections.some(s => s.id === doc.section)) errors.push(`Missing section ${locale}/${key}/${doc.section}`);
    if (!doc.html || doc.html.includes('\ufffd')) errors.push(`Invalid rendered content ${locale}/${key}`);
  }
}
for (const card of config.wikiMods) {
  if (!data.en.some(d => d.product === card.product)) errors.push(`No English entrance ${card.id}`);
  if (!data.ko.some(d => d.product === card.product)) errors.push(`No Korean entrance ${card.id}`);
  if (card.logo && !fs.existsSync(path.join(root, 'dist', card.logo))) errors.push(`Missing logo ${card.id}`);
}
function rawDocs(base, locale) {
  return fs.readdirSync(path.join(base, 'content', locale)).filter(f => f.endsWith('.md')).map(name => {
    const raw = fs.readFileSync(path.join(base, 'content', locale, name), 'utf8');
    return { name, raw, key: `${raw.match(/^product: (.+)$/m)?.[1]}/${raw.match(/^slug: (.+)$/m)?.[1]}`, hidden: /^hiddenNav: true$/m.test(raw) };
  });
}
function broken(base, locale) {
  const docs = rawDocs(base, locale);
  const available = new Set([...rawDocs(base, 'en'), ...docs].filter(d => !d.hidden).map(d => d.key));
  const result = [];
  for (const doc of docs.filter(d => !d.hidden)) {
    for (const match of doc.raw.matchAll(/\]\(#([^\s)]+\/[^\s)]+)\)/g)) {
      const target = match[1].split('::')[0];
      if (!available.has(target)) result.push(`${locale}/${doc.name} -> ${target}`);
    }
  }
  return result;
}
const existing = new Set(['en', 'ko'].flatMap(locale => broken(snapshot, locale)));
const current = ['en', 'ko'].flatMap(locale => broken(root, locale));
const newBroken = current.filter(link => !existing.has(link));
errors.push(...newBroken.map(link => `New broken route: ${link}`));
const requiredRoutes = ['minigames-setup', 'minigames-rules-rewards', 'minigames-files-gui', 'mapicon-setup', 'mapicon-editor-rules', 'mapicon-files-operations', 'cobblemon-battle-scheduler', 'cobblemon-presentation-region-fx', 'release-0-2-2', 'release-notes-0-2-5', 'battleworks-release-0-1-4'];
for (const locale of ['en', 'ko']) for (const slug of requiredRoutes) if (!data[locale].some(d => d.slug === slug)) errors.push(`Missing new route ${locale}/${slug}`);
const summary = { documents: Object.values(data).flat().length, products: config.wikiMods.length, newRoutes: requiredRoutes.length * 2, existingBrokenLinks: existing.size, remainingBrokenLinks: current.length, newBrokenLinks: newBroken.length, errors };
console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
