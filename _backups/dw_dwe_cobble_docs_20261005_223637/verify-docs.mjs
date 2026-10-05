import fs from 'node:fs';
import vm from 'node:vm';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('dist/assets/docs-data.js','utf8'),context);
const config=context.window.DRM_DOCS_CONFIG;
for(const locale of ['ko','en']) {
 const docs=context.window.DRM_DOCS_DATA[locale];
 const ids=new Set(docs.map(d=>d.product+'/'+d.slug));
 if(ids.size!==docs.length) throw Error('Duplicate routes: '+locale);
 const relevant=docs.filter(d=>['dochi-warfare','dochi-warfare-expanded','drm-cobblemon-editor'].includes(d.product));
 for(const d of relevant){
  if(!config.products[d.product].sections.some(s=>s.id===d.section))throw Error('Missing section: '+d.slug);
  for(const match of d.html.matchAll(/href="#([^"\s]+)"/g)) {
   const route=match[1].split('?')[0];
   if(route.includes('/')&&!ids.has(route))throw Error('Broken route: '+locale+' '+d.slug+' -> '+route);
  }
 }
 for(const product of config.wikiMods.filter(m=>m.id==='dochi-warfare-expanded')) {
  if(!docs.some(d=>d.product===product.product))throw Error('Empty product');
 }
 console.log(locale+': '+relevant.length+' DW/DWE/Cobblemon pages; unique routes, sections, internal links, and DWE entry valid');
}
const desktop='C:/Users/hodu3/Desktop/';
for(const loader of ['FABRIC','NEOFORGE']){
 const dir=desktop+'['+loader+'] dochi_cobble_npc/src/main/resources/cobble_npc_defaults/battle_presentations/presets/';
 for(const [name,ticks] of [['vs_trainer',144],['vs_pokemon',132],['vs_boss_trainer',168],['vs_legendary_pokemon',184],['vs_party_showcase',168]]){
  const value=JSON.parse(fs.readFileSync(dir+name+'.json','utf8'));
  if(value.durationTicks!==ticks||value.schemaVersion!==5)throw Error('Preset mismatch: '+loader+' '+name);
 }
 console.log(loader+': documented preset durations and schema match source');
}
const response=await fetch('http://localhost:4173');
if(!response.ok)throw Error('Preview HTTP '+response.status);
console.log('Preview HTTP '+response.status);
