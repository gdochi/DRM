import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { serve } from './preview-server.mjs';
import { loadBuiltDocs } from './load-built-docs.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const evidence=path.join(root,'docs/evidence/dwe-tutorials-20261109');
const json=async relative=>JSON.parse(await readFile(path.join(evidence,relative),'utf8'));
const recordings=await json('selected-recordings.json');
const workflow=async id=>json(`workflow/${id}-document.json`);
const point=(await workflow('point')).steps[0];
assert.equal(point.at_tick,40);assert.equal(point.lifetime_ticks,600);
assert.equal(point.bombard.altitude,96);assert.equal(point.bombard.explosion_damage,20);
const corridors=(await workflow('corridors')).steps;
assert.equal(corridors[0].bombard.shape,'line');assert.equal(corridors[0].bombard.bomb_count,4);assert.equal(corridors[0].bombard.interval,10);
assert.equal(corridors[1].bombard.shape,'area');assert.equal(corridors[1].bombard.width,24);
const vehicle=(await workflow('vehicles')).steps[0];
assert.equal(vehicle.at_tick,60);assert.equal(vehicle.lifetime_ticks,1200);assert.equal(vehicle.vehicle_support.guard_radius,24);
const fire=(await workflow('fire')).steps[0];
assert.equal(fire.at_tick,100);assert.equal(fire.fire_support.rounds,20);assert.equal(fire.fire_support.fire_ticks,60);assert.equal(fire.fire_support.airborne,false);
const npc=(await workflow('npcs')).steps[0];
assert.equal(npc.at_tick,40);assert.equal(npc.npc_move.source,'area');assert.equal(npc.npc_move.count,4);assert.equal(npc.npc_move.radius,16);
assert.deepEqual((await workflow('timing')).steps.map(s=>s.at_tick),[40,140,140]);
const center=await workflow('center');assert.equal(center.origin[0],8);assert.equal(center.steps[0].vehicle_support.start[0],0);
const saved=await workflow('saved'),loaded=await workflow('loaded');
assert.deepEqual(saved,loaded);assert.deepEqual(saved,await json('workflow/server-tutorial_support.json'));
assert.equal(saved.title,'Road reinforcement');assert.equal((await json('workflow/saved-state.json')).dirty,false);
const samples=await json('workflow/simulation-runtime.json');
assert(samples.every(s=>s.roadPreserved));assert.equal(samples.at(-1).actors.length,0);
const first=new Map();let distance=0;
for(const sample of samples)for(const actor of sample.actors){if(!first.has(actor.id))first.set(actor.id,actor);const before=first.get(actor.id);distance=Math.max(distance,Math.hypot(actor.x-before.x,actor.z-before.z));}
assert(distance>.25);
const assets=[];
for(const recording of recordings)for(const output of recording.outputs){
  const relative=`assets/media/guides/dwe-tutorials-20261109/${output.file}`;
  const original=await readFile(path.join(root,'src/media/guides/dwe-tutorials-20261109',output.file));
  assert.equal(original.length,output.bytes);assert.equal(createHash('sha256').update(original).digest('hex'),output.sha256);
  assert(original.equals(await readFile(path.join(root,'dist',relative))));assets.push(relative);
}
const {data}=await loadBuiltDocs(path.join(root,'dist'));
const routes=['expanded-support-timeline','expanded-support-actions','expanded-support-run'];
const layout=path.join(evidence,'layout');await mkdir(layout,{recursive:true});
const require=createRequire(import.meta.url);
const {chromium}=require(path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const server=serve(path.join(root,'dist'),0);if(!server.listening)await new Promise(resolve=>server.once('listening',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const views=[],errors=[];
try{
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 for(const locale of ['ko','en','pt','es','fr'])for(const route of routes){
  const doc=data[locale].find(d=>d.product==='dochi-warfare-expanded'&&d.slug===route);assert(doc);assert.equal(doc.version,'0.3.2');
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:1000});await page.goto(`${origin}/?lang=${locale}#dochi-warfare-expanded/${route}`);
   await page.waitForSelector(`[data-doc="${route}"]`);
   await page.waitForTimeout(180);await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(60);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.equal(await page.locator('.doc-video').count(),route===routes[0]?5:route===routes[1]?3:2);
   if(route!==routes[2])assert((await page.locator('.doc-follow-link:not(.prev):not(.is-disabled)').getAttribute('href')).includes(routes[routes.indexOf(route)+1]));
   if(locale==='ko'){
    await page.screenshot({path:path.join(layout,`${route}-${width}-top.png`)});
    const figure=page.locator('.doc-video').first();await figure.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(layout,`${route}-${width}-video.png`)});
    await page.locator('.doc-follow-link').first().scrollIntoViewIfNeeded();await page.screenshot({path:path.join(layout,`${route}-${width}-navigation.png`)});
   }
   views.push({locale,route,width});
  }
 }
 assert.deepEqual(errors,[]);
 const result={recordings:recordings.length,durationMs:recordings.reduce((sum,r)=>sum+r.durationMs,0),steps:recordings.reduce((sum,r)=>sum+r.steps.length,0),assets:assets.length,assetHashesAndBuildBytes:true,authoredValues:true,serverSaveEqualsReload:true,simulation:{samples:samples.length,movementBlocks:distance,finalTemporaryActors:0,roadPreserved:true},views,errors};
 await writeFile(path.join(evidence,'verification-summary.json'),JSON.stringify(result,null,2)+'\n');
 console.log(`Verified ${recordings.length} recordings, ${assets.length} asset hashes, native authoring/save/simulation evidence and ${views.length} final layouts/navigation.`);
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
