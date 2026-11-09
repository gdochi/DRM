import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadChangelogs, publicNoteBody } from './changelog-data.mjs';
import { fileURLToPath } from 'node:url';

const authored = { source: 'author', environments: [{ loader: 'Fabric', minecraft: '1.21.1' }],
  markdown: '###### Badges', html: '<h4>Global</h4><h5>Added</h5><h6>Badges</h6><ul><li>Added a badge editor.</li></ul><h4>NeoForge 26.3</h4><ul><li>Different target.</li></ul>' };
const file = { id: 1, loader: 'Fabric', minecraft: '1.21.1', html: '<h1>0.2.9 Change Log</h1><ul><li><a href="/linkout?remoteUrl=https%253a%252f%252fgdochi.github.io%252fDRM%252f%2523changelog">View Change Log</a></li></ul>' };
const body = publicNoteBody(file, authored);
assert(body.includes('Added a badge editor.') && body.includes('<h4>Badges</h4>'));
assert(!body.includes('View Change Log') && !body.includes('Different target.'));
assert.throws(() => publicNoteBody(file), /matching author text/);
assert.throws(() => publicNoteBody({ ...file, loader: 'NeoForge' }, authored), /matching author text/);
const original = '<p>Fixed an official release problem.</p>';
assert.equal(publicNoteBody({ ...file, html: original }, authored), original);
const index = JSON.parse(await readFile(new URL('../content/changelogs/published.json', import.meta.url)));
const releases = await loadChangelogs(fileURLToPath(new URL('../content/changelogs', import.meta.url)), index);
const cobble = releases.filter(r => r.product === 'drm-cobblemon-editor' && r.version === '0.2.9');
assert.equal(cobble.length, 2);
for (const release of cobble) {
  assert(release.url.includes('/files/') && release.id);
  assert(release.html.includes('Badge Editor'));
  assert(!release.html.includes('View Change Log'));
}
assert(releases.some(r => r.product === 'core-fabric' && r.version === '0.3.1' && r.loader === 'NeoForge' && r.source === 'author' && !r.url));
console.log('Verified wiki-linked release bodies, authoritative file links, environment scoping and retained author-only environments.');
