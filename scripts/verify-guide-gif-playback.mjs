import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "./preview-server.mjs";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const output=path.join(root,"build/task/guide-gifs-smooth-20261105/browser-playback");
await mkdir(output,{recursive:true});
const require=createRequire(import.meta.url);
const {chromium}=require(path.join(os.homedir(),".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"));
const server=serve(path.join(root,"dist"),0);
if(!server.listening)await new Promise(resolve=>server.once("listening",resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(origin);
  await page.evaluate(async src=>{
    const img=new Image();img.src=src+"?playback-check="+Date.now();
    document.body.replaceChildren(img);document.body.style.background="#20242a";
    await img.decode();
    // This original recording enters treatment at 18.8 seconds. Observe the
    // actual browser GIF compositor during movement, rather than just decoding
    // the first image or trusting an encoder's requested frame rate.
    await new Promise(resolve=>setTimeout(resolve,19200));
  },`${origin}/assets/media/guides/short-gifs-20261105/nurse-joy-treatment.gif`);
  // Canvas drawImage can expose the default GIF image, so inspect Chrome's
  // actual composited pixels through screenshots instead.
  const samples=[];const started=performance.now();
  while(performance.now()-started<2200){
    const atMs=performance.now()-started;
    const png=await page.screenshot({clip:{x:180,y:120,width:900,height:480},animations:"allow"});
    samples.push({atMs,hash:createHash("sha256").update(png).digest("hex")});
    const remaining=50-(performance.now()-started-atMs);
    if(remaining>0)await new Promise(resolve=>setTimeout(resolve,remaining));
  }
  const result={samples,uniqueImages:new Set(samples.map(sample=>sample.hash)).size};
  assert(result.samples.length>=20,"Browser screenshot sampling was too slow");
  assert(result.uniqueImages>=20,`Browser displayed only ${result.uniqueImages} distinct motion frames`);
  await page.screenshot({path:path.join(output,"nurse-browser-motion.png")});
  await writeFile(path.join(output,"results.json"),JSON.stringify(result,null,2)+"\n");
  console.log(`Native Chrome GIF playback: ${result.uniqueImages} distinct images in 2.2 seconds (${result.samples.length} samples).`);
}finally{
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
