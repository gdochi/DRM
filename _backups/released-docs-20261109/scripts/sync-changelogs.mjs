import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Refresh the release notes for the already verified public upload index.
// Keep one source file per mod version; never combine different versions.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'content/changelogs');
const index = JSON.parse(await readFile(path.join(directory, 'published.json'), 'utf8'));
const jobs = index.projects.flatMap(project => project.files.map(file => ({ project, file })));
const collected = new Map();
const failures = [];
let cursor = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < jobs.length) {
    const { project, file } = jobs[cursor++];
    try {
      const source = `https://www.curseforge.com/api/v1/mods/${project.projectId}/files/${file.id}`;
      const responses = await Promise.all([source, `${source}/change-log`].map(async url => {
        const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
        if (!response.ok) throw new Error(`${response.status} ${url}`);
        return response.json();
      }));
      const metadata = responses[0].data || responses[0];
      if (metadata.id !== file.id || metadata.status !== 4 || metadata.fileName !== file.name) {
        throw new Error(`Public metadata differs for ${file.id}: ${JSON.stringify(metadata).slice(0,400)}`);
      }
      const html = responses[1].changelogBody;
      if (typeof html !== 'string') throw new Error(`Missing changelogBody for ${file.id}`);
      const loader = ['NeoForge', 'Fabric', 'Forge'].find(loader => file.versions.includes(loader));
      if (!loader || !file.minecraft) throw new Error(`Missing environment for ${file.id}`);
      const key = `${project.product}/${file.version}`;
      if (!collected.has(key)) collected.set(key, {
        product: project.product, version: file.version, projectId: project.projectId,
        checkedAt: new Date().toISOString(), files: []
      });
      collected.get(key).files.push({
        id: file.id, loader, minecraft: file.minecraft, name: file.name,
        url: file.url, uploadedAt: file.uploadedAt, status: metadata.status,
        metadataSource: source, notesSource: `${source}/change-log`, html
      });
    } catch (error) { failures.push(`${project.product} ${file.id}: ${error.message}`); }
  }
}));
// Write only complete versions so an interrupted refresh cannot truncate one.
for (const [key, release] of collected) {
  const project = index.projects.find(project => project.product === release.product);
  const expected = project.files.filter(file => file.version === release.version);
  if (release.files.length !== expected.length) continue;
  release.files.sort((a,b) => a.id - b.id);
  await mkdir(path.join(directory, release.product), { recursive: true });
  await writeFile(path.join(directory, `${key}.json`), JSON.stringify(release, null, 2) + '\n');
}
console.log(`Read ${jobs.length - failures.length}/${jobs.length} public files; ${collected.size} mod versions.`);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
