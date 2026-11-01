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
const captures = JSON.parse(await readFile(path.join(root, "src/guide-environments.json"), "utf8")).captures;
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
let imageCount = 0;
const checkedImages = new Set();
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
    for (const match of doc.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
      imageCount++;
      assert(/\balt="[^"]+"/.test(match[0]), `Missing image description: ${doc.sourcePath}`);
      const source = match[1];
      if (source.startsWith("https://")) continue;
      const relative = source.replace(/^\.\//, "");
      assert(relative.startsWith("assets/media/") && !relative.split("/").includes(".."), `Invalid image path: ${doc.sourcePath}`);
      if (checkedImages.has(relative)) continue;
      const original = await readFile(path.join(root, "src/media", relative.slice("assets/media/".length)));
      const built = await readFile(path.join(root, "dist", relative));
      assert(original.length > 0 && original.equals(built), `Missing or altered image: ${relative}`);
      if (relative.startsWith("assets/media/guides/")) {
        const capture = captures[relative];
        assert(capture?.minecraft && capture?.loader, `Missing reviewed screenshot environment: ${relative}`);
        assert.equal(capture.width, original.readUInt32BE(16), `Incorrect screenshot width: ${relative}`);
        assert.equal(capture.height, original.readUInt32BE(20), `Incorrect screenshot height: ${relative}`);
        assert(match[0].includes(`width="${capture.width}" height="${capture.height}"`), `Missing reserved screenshot dimensions: ${doc.sourcePath}`);
      }
      checkedImages.add(relative);
    }
    count++;
  }
  for (const doc of documents) {
    for (const match of doc.html.matchAll(/href="#([^"?]+)(?:\?[^"]*)?"/g)) {
      if (match[1].includes("/")) assert(keys.has(match[1]), `Broken route in ${doc.sourcePath}: ${match[1]}`);
    }
  }
  for (const mod of config.wikiMods) assert(documents.some((doc) => doc.product === mod.product), `No ${locale} docs for ${mod.id}`);
  for (const [product, slug] of Object.entries(config.startPages || {})) assert(keys.has(`${product}/${slug}`), `Broken beginner entry: ${locale}/${product}/${slug}`);
  for (const task of config.homeTasks || []) {
    assert(task.label && task.label_ko && task.description && task.description_ko, "Incomplete home task text");
    for (const link of task.links) assert(keys.has(`${link.product}/${link.doc}`), `Broken home task: ${locale}/${link.product}/${link.doc}`);
  }
}
for (const name of ["index.html", "assets/app.js", "assets/styles.css"]) {
  assert((await stat(path.join(root, "dist", name))).size > 0, `Missing build output: ${name}`);
}
for (const mod of config.wikiMods) {
  for (const [key, value] of Object.entries(mod)) {
    if (typeof value === "string") assert(!/\?{4,}|\uFFFD/.test(value), `Damaged config text: ${mod.id}.${key}`);
  }
}
console.log(`Verified ${count} documents, ${modIds.size} mod cards, ${imageCount} document images, logos, routes, sections and distribution links.`);
