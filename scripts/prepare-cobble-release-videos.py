"""Publish only completed, reviewed Cobblemon tutorial clips; never launch Minecraft."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--ffmpeg', type=Path, required=True)
args = parser.parse_args()
assets = root / 'src/media/guides/cobble-release-20261109'
evidence = root / 'docs/evidence/cobble-release-20261109'
assets.mkdir(parents=True, exist_ok=True)
evidence.mkdir(parents=True, exist_ok=True)
manifest_path = root / 'src/guide-environments.json'
manifest = {'captures': {}}
jobs = [('badge-create', '02'), ('badge-presentation', '02'), ('pokemon-alpha', '03')]
for clip, number in jobs:
    captures = root / f'build/task/guide-capture/cobble-release-tutorials-20261109-{number}/captures'
    frames = captures / f'{clip}-frames.json'
    if not frames.is_file():
        raise ValueError(f'Clip has no completed native recording receipt: {clip}')
    folder = evidence / clip
    subprocess.run([sys.executable, str(root/'scripts/review-guide-video.py'), str(frames), str(folder)], check=True)
    subprocess.run([sys.executable, str(root/'scripts/encode-guide-video.py'), str(frames), str(assets/f'{clip}.mp4'), '--ffmpeg', str(args.ffmpeg), '--threads', '2'], check=True)
    shutil.copy2(captures/'environment.json', folder/'environment.json')
    prefix = 'assets/media/guides/cobble-release-20261109/'
    duration = json.loads((folder/'frames-receipt.json').read_text(encoding='utf-8'))['durationMs']
    manifest['captures'][prefix+clip+'.mp4'] = {'minecraft':'1.21.1','loader':'NeoForge','locale':'en_us','width':1920,'height':1080,'poster':prefix+clip+'.png','webm':prefix+clip+'.webm','durationMs':duration}
    manifest['captures'][prefix+clip+'.png'] = {'minecraft':'1.21.1','loader':'NeoForge','locale':'en_us','width':1920,'height':1080}
    print(f'Published {clip}: {duration/1000:.2f}s', flush=True)
captures = root/'build/task/guide-capture/cobble-release-tutorials-20261109-02/captures'
for name in ['badge-editor-saved', 'badge-presentation-bindings', 'badge-presentation-editor']:
    shutil.copy2(captures/f'{name}.png', assets/f'{name}.png')
    manifest['captures']['assets/media/guides/cobble-release-20261109/'+name+'.png'] = {'minecraft':'1.21.1','loader':'NeoForge','locale':'en_us','width':1920,'height':1080}
for number in ['02','03']:
    run = root/f'build/task/guide-capture/cobble-release-tutorials-20261109-{number}'
    dest = evidence/f'run-{number}'
    dest.mkdir(exist_ok=True)
    for name in ['environment.json','screens.json','tutorial-actions.json','badge-server-verified.json','badge-editor-saved.json','badge-presentation-saved.json','pokemon-alpha-settings.json','finished.txt']:
        source = run/'captures'/name
        if source.is_file(): shutil.copy2(source,dest/name)
    for name in ['client.log','compile.log','process.json']:
        shutil.copy2(run/name, dest/name)
    configs = run/'game/config/dochi_rpg_maker/cobblemon'
    for relative in ['badges/catalog.json','trainers/custom/alpha_trainer.json']:
        source = configs/relative
        if source.is_file():
            target = dest/'saved'/relative
            target.parent.mkdir(parents=True,exist_ok=True)
            shutil.copy2(source,target)
    if (configs/'presentations').is_dir(): shutil.copytree(configs/'presentations',dest/'saved/presentations',dirs_exist_ok=True)
latest = json.loads(manifest_path.read_text(encoding='utf-8'))
latest['captures'].update(manifest['captures'])
manifest_path.write_text(json.dumps(latest, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
