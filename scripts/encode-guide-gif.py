"""Encode original Minecraft framebuffer sequences into small, looping guide GIFs.

No synthetic game frames are generated. The manifest retains source hashes and
native screen transitions so the animation can be reviewed and reproduced.
"""
import argparse
from bisect import bisect_left
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("captures", type=Path)
    parser.add_argument("name")
    parser.add_argument("output", type=Path)
    parser.add_argument("--fps", type=int, default=20)
    parser.add_argument("--final-world-seconds",type=float,help="Cut only the final world shot after this many seconds; inspect its ending before publication")
    args = parser.parse_args()
    rows = json.loads((args.captures / f"{args.name}-frames.json").read_text())
    folder = args.captures / f"{args.name}-frames"
    if args.fps != 20:
        raise ValueError("Guide motion is encoded at 20 fps / 50 ms per frame")
    if len(rows) < 8 or any("elapsedMs" not in row for row in rows):
        raise ValueError("A fresh, timestamped render-frame capture is required")
    times = [row["elapsedMs"] for row in rows]
    gaps = sorted(b-a for a,b in zip(times,times[1:]))
    p95 = gaps[round((len(gaps)-1)*.95)]
    if p95 > 90 or max(gaps) > 250:
        raise ValueError(f"Capture cadence is too uneven to publish: p95={p95:.1f}ms, max={max(gaps):.1f}ms")
    source_frame_count=len(rows)
    if args.final_world_seconds is not None:
        if args.final_world_seconds<3 or rows[-1]["screen"]!="world":
            raise ValueError("The optional end cut needs a final world shot and at least three seconds")
        start=len(rows)-1
        while start>0 and rows[start-1]["screen"]=="world":start-=1
        end=rows[start]["elapsedMs"]+args.final_world_seconds*1000
        rows=[row for row in rows if row["elapsedMs"]<=end]
        times=[row["elapsedMs"] for row in rows]
    # Resample timestamps at 50 ms, preserving wall-clock speed. Never discard
    # visually similar motion or turn it into a long held still frame.
    selected = []
    for target in range(0,round(times[-1])+1,50):
        i = bisect_left(times,target)
        candidates = [n for n in (i-1,i) if 0 <= n < len(rows)]
        row = rows[min(candidates,key=lambda n:abs(times[n]-target))]
        source = folder/row["file"]
        selected.append({**row,"playbackMs":target,"sha256":hashlib.sha256(source.read_bytes()).hexdigest()})
    durations = [50] * len(selected)
    durations[-1] += 750
    def read_frame(row):
        with Image.open(folder/row["file"]) as original:
            return original.convert("RGB").resize((1280,720),Image.Resampling.LANCZOS)
    # Build one shared palette without retaining hundreds of full RGB frames.
    samples = Image.new("RGB", (320 * 4, 180 * 4))
    for i in range(16):
        samples.paste(read_frame(selected[round(i*(len(selected)-1)/15)]).resize((320,180)),((i%4)*320,(i//4)*180))
    palette = samples.quantize(colors=256)
    indexed = [read_frame(row).quantize(palette=palette,dither=Image.Dither.NONE) for row in selected]
    args.output.parent.mkdir(parents=True, exist_ok=True)
    indexed[0].save(args.output, save_all=True, append_images=indexed[1:], duration=durations, loop=0, optimize=True, disposal=1)
    with Image.open(args.output) as gif:
        for n in range(gif.n_frames):
            gif.seek(n); gif.load()
        receipt = {"asset": args.output.as_posix(), "sha256": hashlib.sha256(args.output.read_bytes()).hexdigest(),
                   "width": gif.width, "height": gif.height, "frameCount": gif.n_frames,
                   "durationMs": sum(durations), "sourceFrameCount": source_frame_count, "encodedFps":20,
                   "retainedSourceFrameCount":len(rows),"finalWorldLimitSeconds":args.final_world_seconds,
                   "sourceGapMedianMs":gaps[len(gaps)//2],"sourceGapP95Ms":p95,"sourceGapMaxMs":max(gaps),
                   "resampledFrameCount":len(selected),"selectedFrames":selected}
    args.output.with_suffix(".receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
    contact = Image.new("RGB", (640 * 3, 360 * 2), "#141820")
    for i in range(6):
        n = round(i * (len(selected)-1)/5)
        contact.paste(read_frame(selected[n]).resize((640,360)), ((i%3)*640,(i//3)*360))
        ImageDraw.Draw(contact).text(((i%3)*640+8,(i//3)*360+6),f'{n}: {selected[n]["screen"]}',fill="yellow",stroke_width=1,stroke_fill="black")
    contact.save(args.output.with_suffix(".review.jpg"))
    print(json.dumps({key: receipt[key] for key in ("asset", "frameCount", "durationMs", "sourceFrameCount")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
