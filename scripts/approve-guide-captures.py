"""Copy manually reviewed original game captures and retain their provenance.

This command records visual review only. It does not mark a document or a
complete authoring/player workflow as verified.
"""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--run', required=True)
parser.add_argument('--group', required=True)
parser.add_argument('--files', required=True, help='Comma-separated capture IDs already viewed at original size')
args = parser.parse_args()
captures = root / 'build/task/guide-capture' / args.run / 'captures'
target = root / 'src/media/guides' / args.group
for path, parent in [(captures, root / 'build/task/guide-capture'), (target, root / 'src/media/guides')]:
    if not path.resolve().is_relative_to(parent.resolve()):
        raise ValueError('Path outside capture/media root')
environment = json.loads((captures / 'environment.json').read_text(encoding='utf-8'))
ledger = root / 'docs/evidence/illustrated-guides-20261101/approved-captures.json'
records = json.loads(ledger.read_text(encoding='utf-8'))
target.mkdir(parents=True, exist_ok=True)
for name in args.files.split(','):
    if Path(name).name != name:
        raise ValueError('Capture ID must not contain directories')
    source = captures / (name + '.png')
    with Image.open(source) as frame:
        frame.verify()
    destination = target / source.name
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    asset = 'assets/media/guides/' + args.group + '/' + source.name
    old = next((record for record in records if record['asset'] == asset), None)
    if old and old['sha256'] != digest:
        raise ValueError('Use a new asset name for a different original: ' + asset)
    shutil.copyfile(source, destination)
    if not old:
        records.append(dict(asset=asset, run=args.run, sha256=digest, environment=environment,
            review='Opened original image and checked visible controls; broader workflow status remains separate.'))
ledger.write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Retained', len(args.files.split(',')), 'reviewed original captures; ledger total', len(records))
