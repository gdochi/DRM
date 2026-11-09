import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// CFWidget discovers candidates; CurseForge itself must verify every new file.
// DWE is being edited separately and is deliberately excluded, including notes.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');
const checkedAt = new Date().toISOString();
const stamp = checkedAt.replace(/[-:]/g, '').replace(/T/, '-').slice(0, 15);
const backup = path.join(root, '_backups', `published-release-refresh-${stamp}`);
const indexPath = 'content/changelogs/published.json';
const index = JSON.parse(await readFile(path.join(root, indexPath), 'utf8'));
const report = { checkedAt, excluded: ['dochi-warfare-expanded'], projects: [] };
const changes = new Map();
async function json(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}
for (const project of index.projects.filter(p => !report.excluded.includes(p.product))) {
  const discovery = await json(`https://api.cfwidget.com/${project.projectId}`);
  assert.equal(discovery.id, project.projectId);
  const missing = discovery.files.filter(file => !project.files.some(old => old.id === file.id));
  const result = { product: project.product, projectId: project.projectId, discoverySource: `https://api.cfwidget.com/${project.projectId}`, latest: discovery.files[0]?.name, added: [] };
  const versions = new Set();
  for (const file of missing) {
    const source = `https://www.curseforge.com/api/v1/mods/${project.projectId}/files/${file.id}`;
    const response = await json(source);
    const meta = response.data || response;
    assert.equal(meta.id, file.id);
    assert.equal(meta.fileName, file.name);
    assert.equal(meta.status, 4, `Not a public approved file: ${file.id}`);
    const version = file.name.match(/-(\d+\.\d+\.\d+)(?=[_.-])/)?.[1];
    assert(version, `Unrecognized mod version: ${file.name}`);
    const minecraft = file.version;
    const loader = ['NeoForge', 'Fabric', 'Forge'].find(value => file.versions.includes(value));
    assert(loader && /^\d+\.\d+(?:\.\d+)?$/.test(minecraft));
    if (meta.gameVersions) {
      assert(meta.gameVersions.includes(minecraft));
      assert(meta.gameVersions.includes(loader));
    }
    const notes = await json(`${source}/change-log`);
    assert.equal(typeof notes.changelogBody, 'string');
    assert(notes.changelogBody.trim(), `Empty public notes: ${file.id}`);
    const entry = { id: file.id, version, name: file.name, url: file.url, uploadedAt: meta.fileDate || file.uploaded_at, versions: file.versions, minecraft };
    project.files.push(entry);
    versions.add(version);
    result.added.push({ ...entry, metadataSource: source, metadata: meta, notesSource: `${source}/change-log`, html: notes.changelogBody });
  }
  for (const version of versions) {
    const relative = `content/changelogs/${project.product}/${version}.json`;
    let old;
    try { old = JSON.parse(await readFile(path.join(root, relative), 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    const release = { product: project.product, version, projectId: project.projectId, checkedAt, files: [] };
    if (old?.source === 'author') release.authorNotes = old;
    else if (old?.authorNotes) release.authorNotes = old.authorNotes;
    for (const entry of project.files.filter(file => file.version === version)) {
      const fresh = result.added.find(file => file.id === entry.id);
      if (!fresh) {
        const previous = old?.files?.find(file => file.id === entry.id);
        assert(previous, `Missing previous public notes: ${relative}/${entry.id}`);
        release.files.push(previous);
      } else {
        release.files.push({ id: fresh.id, loader: ['NeoForge','Fabric','Forge'].find(value => fresh.versions.includes(value)), minecraft: fresh.minecraft, name: fresh.name, url: fresh.url, uploadedAt: fresh.uploadedAt, status: fresh.metadata.status, metadataSource: fresh.metadataSource, notesSource: fresh.notesSource, html: fresh.html });
      }
    }
    release.files.sort((a,b) => a.id - b.id);
    changes.set(relative, release);
  }
  project.files.sort((a,b) => b.id - a.id);
  report.projects.push(result);
  console.log(`${project.product}: ${result.latest}; ${result.added.length} new public files`);
}
if (apply && changes.size) {
  index.checkedAt = checkedAt;
  changes.set(indexPath, index);
  // Fetch/validate everything first; failures above leave the content untouched.
  for (const [relative, value] of changes) {
    const target = path.join(root, relative);
    const saved = path.join(backup, relative);
    try { await mkdir(path.dirname(saved), { recursive: true }); await copyFile(target, saved); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, JSON.stringify(value, null, 2) + '\n');
  }
}
const evidence = path.join(root, 'docs/evidence/published-release-refresh-20261109');
await mkdir(evidence, { recursive: true });
await writeFile(path.join(evidence, apply ? 'applied.json' : 'audit.json'), JSON.stringify({ ...report, applied: apply, changedFiles: [...changes.keys()], backup: apply && changes.size ? path.relative(root, backup) : null }, null, 2) + '\n');
console.log(`${apply ? 'Updated' : 'Would update'} ${changes.size} version/index files. DWE excluded.`);
