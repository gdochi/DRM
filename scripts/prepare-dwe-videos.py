"""Review and encode the selected native DWE tutorial recordings, sequentially."""
import hashlib
import json
import subprocess
import sys
from pathlib import Path
from statistics import median

root = Path(__file__).resolve().parent.parent
task = root / 'build/task/dwe-tutorials-20261109'
evidence = root / 'docs/evidence/dwe-tutorials-20261109'
assets = root / 'src/media/guides/dwe-tutorials-20261109'
ffmpeg = next((task / 'encoding/imageio_ffmpeg/binaries').glob('ffmpeg-*.exe'))
ids = ['workspace', 'point', 'corridors', 'vehicles', 'fire', 'npcs', 'timing', 'center', 'files', 'simulation']
selected = []
for name in ids:
    clip = 'dwe-' + name
    run = '02' if name in ['workspace', 'files'] else '03'
    source = task / ('run-' + run) / 'capture'
    target = evidence / clip
    target.mkdir(parents=True, exist_ok=True)
    manifest = source / (clip + '-frames.json')
    frames = json.loads(manifest.read_text(encoding='utf-8'))
    notes_file = source / (clip + '-notes.json')
    notes = json.loads(notes_file.read_text(encoding='utf-8'))
    # Estimate the recorder epoch from original PNG filesystem timestamps.
    # Writer delay is small; retain the measured offset instead of assuming a tick interval.
    epoch_ms = median((source / (clip + '-frames') / row['file']).stat().st_mtime_ns / 1e6 - row['elapsedMs'] for row in frames[::max(1, len(frames)//50)])
    begin_ms = notes_file.stat().st_mtime_ns / 1e6 - notes[-1]['startMs']
    offset_ms = begin_ms - epoch_ms
    for note in notes:
        note['startMs'] = max(0, round(note['startMs'] + offset_ms, 3))
    notes[0]['startMs'] = 0
    annotations = target / 'steps.json'
    annotations.write_text(json.dumps(notes, ensure_ascii=False, indent=2), encoding='utf-8')
    focus = []
    for note in notes:
        zoom = 1.45 if name not in ['workspace', 'timing', 'simulation', 'files'] and note['step'] >= 3 else 1
        focus.append({'startMs':note['startMs'], 'zoom':zoom, 'centerX':1600, 'centerY':450})
    focus_file = target / 'focus.json'
    focus_file.write_text(json.dumps(focus, indent=2), encoding='utf-8')
    subprocess.run([sys.executable, str(root/'scripts/review-guide-video.py'), str(manifest), str(target/'native')], check=True)
    poster = {'workspace':22, 'point':27, 'corridors':28, 'vehicles':29,
              'fire':26, 'npcs':26, 'timing':29, 'center':31,
              'files':44, 'simulation':24}[name]
    result = subprocess.run([sys.executable, str(root/'scripts/encode-guide-video.py'), str(manifest), str(assets/(clip+'.mp4')), '--ffmpeg', str(ffmpeg), '--annotations', str(annotations), '--focus', str(focus_file), '--poster-seconds', str(poster), '--threads', '2'], check=True, capture_output=True, text=True, encoding='utf-8')
    receipt = json.loads(result.stdout)
    (target/'encoding.json').write_text(json.dumps(receipt, indent=2), encoding='utf-8')
    selected.append({'id':clip,'run':run,'durationMs':receipt['durationMs'],'steps':notes,'annotationEpochOffsetMs':offset_ms,'annotationEpochMethod':'median original PNG write timestamp minus frame elapsed time; caption file write timestamp','sourceWidth':1920,'sourceHeight':1080,'width':receipt['width'],'height':receipt['height'],'outputs':receipt['outputs']})
    (evidence/'selected-recordings.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2),encoding='utf-8')
    print(clip, 'encoded', round(receipt['durationMs']/1000,2), 'seconds', flush=True)
