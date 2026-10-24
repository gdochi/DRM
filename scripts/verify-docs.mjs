import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "dist/assets/docs-data.js"), "utf8"), context);
const config = context.window.DRM_DOCS_CONFIG;
const data = context.window.DRM_DOCS_DATA;
const links = JSON.parse(await readFile(path.join(root, "_links/mod-links.json"), "utf8"));
const mappings = new Map(links.mods.map((entry) => [entry.wikiModId, entry]));
assert.equal(mappings.size, links.mods.length, "Duplicate distribution link mapping");
const modIds = new Set();

for (const mod of config.wikiMods) {
  assert(!modIds.has(mod.id), `Duplicate mod: ${mod.id}`);
  modIds.add(mod.id);
  assert(config.products[mod.product], `Unknown product: ${mod.id}`);
  assert(mod.logo?.startsWith("assets/mod-logos/"), `Missing logo: ${mod.id}`);
  const relative = mod.logo.slice("assets/mod-logos/".length);
  assert(!relative.includes(".."), `Invalid logo path: ${mod.id}`);
  const source = await readFile(path.join(root, "_modLogo", relative));
  const built = await readFile(path.join(root, "dist", mod.logo));
  assert(source.equals(built), `Built logo differs: ${mod.id}`);
  assert(source.length >= 8 && source.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `Invalid PNG: ${mod.id}`);
  const mapping = mappings.get(mod.id);
  assert(mapping, `Missing distribution mapping: ${mod.id}`);
  for (const field of ["curseForgeUrl", "modrinthUrl"]) {
    assert.equal(mod[field] || null, mapping[field], `Unsynchronized ${field}: ${mod.id}`);
    if (mod[field]) assert.equal(new URL(mod[field]).protocol, "https:");
  }
}
assert.equal(modIds.size, mappings.size, "Unmatched distribution mappings");

let count = 0;
for (const [locale, documents] of Object.entries(data)) {
  if (!documents.length) continue;
  const keys = new Set();
  for (const doc of documents) {
    const key = `${doc.product}/${doc.slug}`;
    assert(!keys.has(key), `Duplicate route: ${locale}/${key}`);
    keys.add(key);
    const product = config.products[doc.product];
    assert(product, `Unknown document product: ${doc.sourcePath}`);
    assert(product.sections.some((section) => section.id === doc.section), `Unknown section: ${doc.sourcePath}`);
    assert(doc.title && doc.version && doc.html, `Incomplete document: ${doc.sourcePath}`);
    assert(!/\?{4,}|\uFFFD/.test(doc.title + doc.description + doc.html), `Damaged text encoding: ${doc.sourcePath}`);
    count++;
  }
  for (const doc of documents) {
    for (const match of doc.html.matchAll(/href="#([^"?]+)(?:\?[^"]*)?"/g)) {
      if (match[1].includes("/")) assert(keys.has(match[1]), `Broken route in ${doc.sourcePath}: ${match[1]}`);
    }
  }
  for (const mod of config.wikiMods) assert(documents.some((doc) => doc.product === mod.product), `No ${locale} docs for ${mod.id}`);
}
for (const name of ["index.html", "assets/app.js", "assets/styles.css"]) {
  assert((await stat(path.join(root, "dist", name))).size > 0, `Missing build output: ${name}`);
}
for (const mod of config.wikiMods) {
  for (const [key, value] of Object.entries(mod)) {
    if (typeof value === "string") assert(!/\?{4,}|\uFFFD/.test(value), `Damaged config text: ${mod.id}.${key}`);
  }
}
console.log(`Verified ${count} documents, ${modIds.size} mod cards, logos, routes, sections and distribution links.`);
