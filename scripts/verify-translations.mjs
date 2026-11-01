import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBuiltDocs } from './load-built-docs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { config, data } = await loadBuiltDocs(path.join(root, 'dist'));
const sorted = values => [...values].sort();
const fenced = text => [...text.matchAll(/```[^\n]*\n[\s\S]*?```/g)].map(match => match[0]);
const inline = text => [...text.replace(/```[^\n]*\n[\s\S]*?```/g, '').matchAll(/`[^`\n]+`/g)].map(match => match[0]);
const images = doc => [...doc.html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(match => match[1]);
const links = doc => [...doc.html.matchAll(/<a[^>]+href="([^"]+)"/g)].map(match => match[1]);
let count = 0;
for (const locale of ['pt', 'es', 'fr']) {
  const copy = JSON.parse(await readFile(path.join(root, 'src/locales', `${locale}.json`), 'utf8'));
  const baseCopy = JSON.parse(await readFile(path.join(root, 'src/locales/pt.json'), 'utf8'));
  assert.deepEqual(sorted(Object.keys(copy.ui)), sorted(Object.keys(baseCopy.ui)), `Missing interface strings: ${locale}`);
  assert.deepEqual(sorted(Object.keys(copy.common)), sorted(Object.keys(baseCopy.common)), `Missing common strings: ${locale}`);
  assert.deepEqual(sorted(Object.keys(copy.config)), sorted(Object.keys(baseCopy.config)), `Missing home/navigation strings: ${locale}`);
  assert(!/[\u2047\ufffd]/u.test(JSON.stringify(copy)), `Damaged interface translation: ${locale}`);
  assert.equal(data[locale].length, data.en.length, `Missing documents: ${locale}`);
  const filenames = await readdir(path.join(root, 'content', locale));
  assert.equal(filenames.filter(file => file.endsWith('.md')).length, data.en.length);
  for (const source of data.en) {
    const doc = data[locale].find(doc => doc.slug === source.slug && doc.product === source.product);
    assert(doc, `Missing route: ${locale}/${source.product}/${source.slug}`);
    for (const key of ['slug', 'product', 'section', 'version', 'order']) assert.equal(doc[key], source[key], `Changed ${key}: ${doc.sourcePath}`);
    assert.equal(doc.translationSource, 'en');
    assert.equal(doc.translationMethod, 'assisted');
    const original = (await readFile(path.join(root, source.sourcePath), 'utf8')).replace(/\r\n/g, '\n');
    const translated = (await readFile(path.join(root, doc.sourcePath), 'utf8')).replace(/\r\n/g, '\n');
    assert(!/[\u2047\ufffd]/u.test(translated), `Unknown/damaged character: ${doc.sourcePath}`);
    assert.deepEqual(fenced(translated), fenced(original), `Changed code block: ${doc.sourcePath}`);
    assert.deepEqual(sorted(inline(translated)), sorted(inline(original)), `Changed inline command or identifier: ${doc.sourcePath}`);
    assert.deepEqual(sorted(images(doc)), sorted(images(source)), `Changed screenshot set: ${doc.sourcePath}`);
    assert.deepEqual(sorted(links(doc)), sorted(links(source)), `Changed link destinations: ${doc.sourcePath}`);
    assert.equal(doc.headings.length, source.headings.length, `Changed section structure: ${doc.sourcePath}`);
    count++;
  }
}
assert(!Object.hasOwn(data, 'pt-BR'), 'Portuguese uses one canonical pt content set');
assert.equal(config.locales.pt.htmlLang, 'pt-BR');
console.log(`Verified ${count} translations: complete routes, localized interface, unchanged code, links, screenshots and section counts.`);
