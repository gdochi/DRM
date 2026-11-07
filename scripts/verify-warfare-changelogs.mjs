import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import os from 'node:os';
import vm from 'node:vm';
import {serve} from './preview-server.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'docs/evidence/dw-dwe-032-20261107');await mkdir(output,{recursive:true});
const context={window:{}};vm.runInNewContext(await readFile(path.join(root,'dist/assets/changelogs.js'),'utf8'),context);
const releases=JSON.parse(JSON.stringify(context.window.DOCHI_CHANGELOGS));
const authored=releases.filter(r=>r.source==='author'&&['dochi-warfare','dochi-warfare-expanded'].includes(r.product));assert.equal(authored.length,6);
const published=JSON.parse(await readFile(path.join(root,'content/changelogs/published.json'),'utf8'));
assert.equal(releases.filter(r=>r.source!=='author').length,published.projects.reduce((n,p)=>n+p.files.length,0));
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.DOCHI_PLAYWRIGHT_MODULE||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const server=serve(path.join(root,'dist'),0);if(!server.listening)await new Promise(r=>server.once('listening',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const routes=[],errors=[];
try{
 const session=await browser.newContext({viewport:{width:1440,height:1000}});const page=await session.newPage();page.on('pageerror',e=>errors.push(e.message));
 await session.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
 for(const release of authored){
  const route=`#changelog/${release.product}/${release.loader}/${release.minecraft}/0.3.2`;
  await page.goto(`${origin}/?lang=ko${route}`);await page.waitForSelector('[data-changelog][data-version="0.3.2"]');
  const text=await page.locator('.changelog-notes').textContent();
  assert.equal(await page.locator('.changelog-release').count(),1);assert.equal(await page.locator('.release-title a').count(),0);
  assert.equal(await page.locator('.release-title h2').textContent(),'0.3.2');
  const count=await page.locator('.changelog-notes li').count();
  if(release.product==='dochi-warfare'){
   assert.equal(count,8);assert(text.includes('Ctrl+S'));assert(text.includes('first ammunition resupply'));
   assert.equal(text.includes('Mod Menu access'),release.loader==='Fabric');
   assert.equal(text.includes('Refabricated'),release.loader==='Fabric');
   assert.equal(text.includes('virtual ammunition'),release.loader==='Fabric');
   assert.equal(text.includes('NPC muzzle effects'),release.loader!=='Fabric');
   assert.equal(text.includes('disappearing NPC guns'),release.loader!=='Fabric');
   assert.equal(text.includes('NPCs stopping short'),release.loader!=='Fabric');
  }else{
   assert.equal(count,{Forge:46,Fabric:48,NeoForge:47}[release.loader]);
   assert(text.includes('startup crashes'));assert(text.includes('relative coordinate editing'));assert(text.includes('Ctrl+S'));
   assert.equal(text.includes('fixed version list'),release.loader!=='Fabric');
   assert.equal(text.includes('DNPC crews'),release.loader==='Fabric');
   assert.equal(text.includes('outdated Fabric addon version labels'),release.loader==='Fabric');
   assert.equal(text.includes('background blur'),release.loader==='NeoForge');
  }
  const categories=await page.locator('.changelog-notes h3').allTextContents();assert.equal(categories.length,new Set(categories).size);
  await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:path.join(output,`${release.product}-${release.loader}-390.png`),fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(output,`${release.product}-${release.loader}-1440.png`),fullPage:true});
  routes.push({route,count,source:release.source});
 }
 for(const locale of ['en','ko','pt','es','fr','ru','zh','ja']){
  await page.goto(`${origin}/?lang=${locale}#changelog/dochi-warfare/Fabric/1.21.1/0.3.2`);await page.waitForSelector('[data-version="0.3.2"]');
  assert((await page.locator('.changelog-notes').textContent()).includes('Refabricated'));assert.equal(await page.locator('.release-title a').count(),0);
 }
 assert.deepEqual(errors,[]);await writeFile(path.join(output,'scopes.json'),JSON.stringify({pass:true,routes,interfaceLocales:8,errors},null,2)+'\n');console.log(`Passed six DW/DWE 0.3.2 loader scopes, eight locales, downloads and mobile layouts. ${output}`);
}finally{await browser.close();await new Promise(r=>server.close(r));}
