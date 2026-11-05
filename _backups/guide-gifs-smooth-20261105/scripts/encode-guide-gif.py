"""Encode original Minecraft framebuffer sequences into small, looping guide GIFs.

No synthetic game frames are generated. The manifest retains source hashes and
native screen transitions so the animation can be reviewed and reproduced.
"""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageStat, ImageDraw


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("captures", type=Path)
    parser.add_argument("name")
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    rows = json.loads((args.captures / f"{args.name}-frames.json").read_text())
    folder = args.captures / f"{args.name}-frames"
    frames, durations, selected = [], [], []
    # Eight frames/second, with a modest 1.5x playback speed. Static UI pauses
    # are capped at 1.2 seconds; all actual screen transitions are retained.
    previous = None
    for i, row in enumerate(rows):
        if i % 2 and i and row["screen"] == rows[i-1]["screen"]:
            continue
        source = folder / row["file"]
        with Image.open(source) as original:
            frame = original.convert("RGB").resize((1280, 720), Image.Resampling.LANCZOS)
        signature = frame.resize((160, 90))
        difference = 999 if previous is None else sum(ImageStat.Stat(ImageChops.difference(signature, previous)).mean)
        threshold = 0.2 if row["screen"] == "world" else 0.03
        if difference < threshold and frames and row["screen"] == selected[-1]["screen"]:
            durations[-1] = min(1200, durations[-1] + 130)
            continue
        previous = signature
        frames.append(frame)
        durations.append(130)
        selected.append({**row, "sha256": hashlib.sha256(source.read_bytes()).hexdigest()})
    if len(frames) < 8:
        raise ValueError("Too few distinct original frames for an animated guide")
    durations[0] = max(900, durations[0])
    durations[-1] = max(1400, durations[-1])
    # One shared palette avoids color flashing between adjacent game frames.
    samples = Image.new("RGB", (320 * 4, 180 * 4))
    for i in range(16):
        samples.paste(frames[round(i * (len(frames)-1)/15)].resize((320, 180)), ((i%4)*320, (i//4)*180))
    palette = samples.quantize(colors=192)
    indexed = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
    args.output.parent.mkdir(parents=True, exist_ok=True)
    indexed[0].save(args.output, save_all=True, append_images=indexed[1:], duration=durations, loop=0, optimize=True, disposal=1)
    with Image.open(args.output) as gif:
        for n in range(gif.n_frames):
            gif.seek(n); gif.load()
        receipt = {"asset": args.output.as_posix(), "sha256": hashlib.sha256(args.output.read_bytes()).hexdigest(),
                   "width": gif.width, "height": gif.height, "frameCount": gif.n_frames,
                   "durationMs": sum(durations), "sourceFrameCount": len(rows), "selectedFrames": selected}
    args.output.with_suffix(".receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
    contact = Image.new("RGB", (640 * 3, 360 * 2), "#141820")
    for i in range(6):
        n = round(i * (len(frames)-1)/5)
        contact.paste(frames[n].resize((640,360)), ((i%3)*640,(i//3)*360))
        ImageDraw.Draw(contact).text(((i%3)*640+8,(i//3)*360+6),f'{n}: {selected[n]["screen"]}',fill="yellow",stroke_width=1,stroke_fill="black")
    contact.save(args.output.with_suffix(".review.jpg"))
    print(json.dumps({key: receipt[key] for key in ("asset", "frameCount", "durationMs", "sourceFrameCount")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
