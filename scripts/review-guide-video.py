"""Retain original frame receipts and a contact sheet before clearing an owned capture run."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image, ImageDraw


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    rows = json.loads(args.source.read_text(encoding="utf-8"))
    folder = args.source.with_suffix("")
    args.output.mkdir(parents=True, exist_ok=True)
    shutil.copy2(args.source, args.output / args.source.name)
    receipt = []
    for row in rows:
        file = folder / row["file"]
        receipt.append({**row, "bytes": file.stat().st_size, "sha256": hashlib.sha256(file.read_bytes()).hexdigest()})
    intervals = sorted(b["elapsedMs"] - a["elapsedMs"] for a, b in zip(rows, rows[1:]))
    indices = sorted({round(i * (len(rows) - 1) / 11) for i in range(12)})
    contact = Image.new("RGB", (1280, 4 * 198), "#18212a")
    draw = ImageDraw.Draw(contact)
    selected = []
    for i, index in enumerate(indices):
        row = rows[index]
        target = args.output / row["file"]
        shutil.copy2(folder / row["file"], target)
        with Image.open(target) as source:
            source.thumbnail((426, 176))
            x, y = (i % 3) * 426, (i // 3) * 198
            contact.paste(source, (x, y))
            draw.text((x + 5, y + 178), f'{row["elapsedMs"] / 1000:.2f}s | {row["screen"]}', fill="white")
        selected.append({"frame": index, **row})
    contact.save(args.output / "contact.png")
    result = {"source": args.source.as_posix(), "frames": len(rows), "selected": selected,
              "durationMs": rows[-1]["elapsedMs"] - rows[0]["elapsedMs"] + 50,
              "intervalMs": {"median": intervals[len(intervals) // 2], "p95": intervals[int(len(intervals) * .95)], "max": max(intervals)},
              "originalFrames": receipt}
    (args.output / "frames-receipt.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: result[key] for key in ["frames", "durationMs", "intervalMs"]}))


if __name__ == "__main__":
    main()
