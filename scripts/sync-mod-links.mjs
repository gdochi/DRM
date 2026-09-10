import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const linksPath = path.join(root, "_links", "mod-links.json");
const siteConfigPath = path.join(root, "site.config.json");

const linksConfig = JSON.parse(await readFile(linksPath, "utf8"));
const siteConfig = JSON.parse(await readFile(siteConfigPath, "utf8"));
const mappings = Array.isArray(linksConfig.mods) ? linksConfig.mods : [];
const wikiMods = Array.isArray(siteConfig.wikiMods) ? siteConfig.wikiMods : [];
const seenIds = new Set();

for (const mapping of mappings) {
  const wikiModId = String(mapping.wikiModId || "").trim();
  if (!wikiModId) throw new Error("Each link mapping requires wikiModId.");
  if (seenIds.has(wikiModId)) throw new Error(`Duplicate link mapping: ${wikiModId}`);
  seenIds.add(wikiModId);

  const matches = wikiMods.filter((mod) => mod.id === wikiModId);
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one wikiMods entry for '${wikiModId}', found ${matches.length}.`);
  }

  syncUrl(matches[0], mapping, "curseForgeUrl");
  syncUrl(matches[0], mapping, "modrinthUrl");
}

const missingMappings = wikiMods.map((mod) => mod.id).filter((id) => !seenIds.has(id));
if (missingMappings.length) {
  throw new Error(`Missing _links mappings for wikiMods: ${missingMappings.join(", ")}`);
}

await writeFile(siteConfigPath, `${JSON.stringify(siteConfig, null, 2)}\n`, "utf8");
console.log(`[LINKS] Synced ${mappings.length} mod link mappings.`);

function syncUrl(target, source, key) {
  if (!Object.hasOwn(source, key)) {
    throw new Error(`Link mapping '${source.wikiModId}' is missing ${key}. Use null when unavailable.`);
  }

  const value = source[key] == null ? "" : String(source[key]).trim();
  if (!value) {
    delete target[key];
    return;
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Invalid ${key} for '${source.wikiModId}': ${value}`);
  }
  if (parsed.protocol !== "https:") {
    throw new Error(`${key} for '${source.wikiModId}' must use https.`);
  }
  target[key] = value;
}
