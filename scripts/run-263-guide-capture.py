"""Capture production NeoForge 26.3 screens in a new documentation-owned instance.

Reads only installed libraries and production artifacts. Never changes a launcher
profile, a mod project, or an existing world. No network downloads are performed.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
from zipfile import ZipFile, ZIP_DEFLATED

ROOT=Path(__file__).resolve().parents[1]
PRISM=Path(os.environ['APPDATA'])/'PrismLauncher'
LIB=PRISM/'libraries'
DESKTOP=Path.home()/'Desktop'
JAVA=DESKTOP/'[26.3] Dochi`s Npc Core/build/port-26.3/toolchains/jdk-25.0.2/bin'

def library_path(lib):
    artifact=lib.get('downloads',{}).get('artifact',{})
    if 'path' in artifact:return LIB/artifact['path']
    group,name,version,*classifier=lib['name'].split(':')
    suffix='-'+classifier[0] if classifier else ''
    return LIB/group.replace('.','/')/name/version/f'{name}-{version}{suffix}.jar'

def allowed(lib):
    if 'rules' not in lib:return True
    value=False
    for rule in lib['rules']:
        target=rule.get('os',{})
        if target.get('name','windows')=='windows' and target.get('arch','x86_64') in ('x86_64','amd64'):value=rule['action']=='allow'
    return value

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--run',required=True)
    p.add_argument('--plan',required=True)
    a=p.parse_args()
    if not a.run.replace('-','').isalnum():raise ValueError('Invalid run name')
    run=ROOT/'build/task/guide-capture'/a.run
    if run.exists():raise ValueError('Choose a new run name; existing worlds are never overwritten')
    game=run/'game';out=run/'captures';classes=run/'classes';mods=game/'mods'
    for path in (out,classes,mods):path.mkdir(parents=True)
    (game/'options.txt').write_text('onboardAccessibility:false\ntutorialStep:none\nlang:en_us\npauseOnLostFocus:false\nguiScale:2\nrenderDistance:4\nsimulationDistance:5\nmaxFps:60\nsoundCategory_master:0.0\n',encoding='utf-8')
    version='26.3.0.95'
    with ZipFile(LIB/f'net/neoforged/neoforge/{version}/neoforge-{version}-installer.jar') as z:neo=json.loads(z.read('version.json'))
    metadata=[json.loads((PRISM/f'meta/{name}/{ver}.json').read_text()) for name,ver in [('net.minecraft','26.3'),('org.lwjgl3','3.4.3')]]+[neo]
    selected={}
    for entry in metadata:
        for lib in entry['libraries']:
            if allowed(lib):
                parts=lib['name'].split(':');selected[tuple(parts[:2]+parts[3:])]=library_path(lib)
    libraries=list(selected.values())+[
        LIB/f'net/neoforged/minecraft-client-patched/{version}/minecraft-client-patched-{version}.jar',
        LIB/f'net/neoforged/neoforge/{version}/neoforge-{version}-universal.jar']
    missing=[str(path) for path in libraries if not path.is_file()]
    if missing:raise FileNotFoundError(missing)
    cp=os.pathsep.join(map(str,libraries))
    # FML detects production by the absence of Minecraft classes on its boot
    # classpath, then locates the installed patched client in libraryDirectory.
    runtime_cp=os.pathsep.join(map(str,selected.values()))
    sources=[DESKTOP/'[26.3] DRM/jar-26.3/dochi_rpg_maker-0.3.1-neoforge-26.3.jar',DESKTOP/'[26.3] Dochi`s Npc Core/jar-26.3/dochi_npc_core-0.1.3-neoforge-26.3.jar']
    receipts=[]
    for source in sources:
        shutil.copy2(source,mods/source.name);receipts.append({'source':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest()})
    result=subprocess.run([str(JAVA/'javac.exe'),'-encoding','UTF-8','-proc:none','-cp',cp,'-d',str(classes),str(ROOT/'scripts/guide-capture/GuideCapture263.java')],capture_output=True,text=True)
    (run/'compile.log').write_text(result.stdout+result.stderr,encoding='utf-8')
    if result.returncode:raise RuntimeError(result.stderr)
    fixture=mods/'dochi-docs-capture263.jar'
    with ZipFile(fixture,'w',ZIP_DEFLATED) as z:
        z.writestr('META-INF/neoforge.mods.toml','modLoader="javafml"\nlicense="All Rights Reserved"\n[[mods]]\nmodId="dochi_docs_capture263"\nversion="1.0.0"\ndisplayName="Dochi Documentation Capture"\n')
        for f in classes.rglob('*.class'):z.write(f,f.relative_to(classes).as_posix())
    receipts.append({'source':'documentation native 26.3 fixture','sha256':hashlib.sha256(fixture.read_bytes()).hexdigest()})
    env={'minecraft':'26.3','loader':'NeoForge '+version,'locale':'en_us','java':'25.0.2','mods':receipts}
    (out/'environment.json').write_text(json.dumps(env,indent=2)+'\n',encoding='utf-8')
    jvm=[x.replace('${library_directory}',str(LIB)) for x in neo['arguments']['jvm']]
    command=[str(JAVA/'java.exe'),'-Xmx3G','-XX:ActiveProcessorCount=4',f'-XX:ErrorFile={out}/hs_err_pid%p.log','--enable-native-access=ALL-UNNAMED','--sun-misc-unsafe-memory-access=allow',f'-Ddochi.docs.output={out}',f'-Ddochi.docs.plan={Path(a.plan).resolve(strict=True)}']+jvm+['-cp',runtime_cp,neo['mainClass'],'--username','DocsGuide','--version','26.3','--gameDir',str(game),'--assetsDir',str(PRISM/'assets'),'--assetIndex','34','--uuid','00000000000000000000000000000001','--accessToken','0','--userType','legacy','--versionType','release','--width','1920','--height','1080']+neo['arguments']['game']
    print('Starting isolated 26.3 capture:',run,flush=True)
    with (run/'client.log').open('w',encoding='utf-8') as log:
        try:result=subprocess.run(command,cwd=game,stdout=log,stderr=subprocess.STDOUT,timeout=540,creationflags=subprocess.CREATE_NO_WINDOW)
        except subprocess.TimeoutExpired:raise RuntimeError('Owned client timed out')
    print('Exit:',result.returncode,'completed:',(out/'finished.txt').exists())
    if result.returncode or not (out/'finished.txt').exists():
        print((run/'client.log').read_bytes().replace(b'\0',b'').decode('utf-8',errors='replace')[-6000:]);raise SystemExit(1)
    print((out/'screens.json').read_text(encoding='utf-8'))

if __name__=='__main__':main()
