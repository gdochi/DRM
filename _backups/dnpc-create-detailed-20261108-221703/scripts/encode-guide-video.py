"""Encode original timestamped game PNG captures to silent video.

Pass a local FFmpeg executable with --ffmpeg. Original timing and resolution
are retained; no interpolated frames or artificial UI are introduced.
"""

import argparse
import hashlib
import json
import shutil
import subprocess
import tempfile
from contextlib import ExitStack
from pathlib import Path

from PIL import Image


def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Original capture -frames.json")
    parser.add_argument("output", type=Path, help="Output .mp4 path; also writes .webm and .png")
    parser.add_argument("--ffmpeg", required=True, type=Path)
    parser.add_argument("--allow-gif", action="store_true", help="Legacy conversion only; GIF palette loss cannot be restored")
    parser.add_argument("--caption", help="Optional readable recording annotation in a footer; never changes the game scene")
    parser.add_argument("--threads", type=int, default=2, help="Bound encoding CPU use while other work is active")
    args = parser.parse_args()
    args.source = args.source.resolve()
    args.output = args.output.resolve()
    args.ffmpeg = args.ffmpeg.resolve()
    if args.output.suffix != ".mp4":
        parser.error("Output must have the .mp4 extension")
    if args.source.suffix != ".json" and not (args.allow_gif and args.source.suffix == ".gif"):
        parser.error("Use original timestamped PNG captures. GIF input requires --allow-gif and cannot preserve original game colors.")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with ExitStack() as stack:
        temporary = Path(stack.enter_context(tempfile.TemporaryDirectory(prefix=".encode-", dir=args.output.parent))).resolve()
        if args.source.suffix == ".json":
            rows = json.loads(args.source.read_text(encoding="utf-8"))
            if len(rows) < 8 or any(b["elapsedMs"] <= a["elapsedMs"] for a, b in zip(rows, rows[1:])):
                parser.error("A timestamped capture with at least eight ordered frames is required")
            folder = args.source.with_suffix("")
            with Image.open(folder / rows[0]["file"]) as source:
                width, height = source.size
                source.convert("RGB").save(args.output.with_suffix(".png"))
            concat = temporary / "frames.txt"
            lines = []
            for i, row in enumerate(rows):
                file = (folder / row["file"]).resolve().as_posix().replace("'", "'\\''")
                seconds = (rows[i + 1]["elapsedMs"] - row["elapsedMs"]) / 1000 if i + 1 < len(rows) else 0.05
                lines.extend([f"file '{file}'", f"duration {seconds:.6f}"])
            lines.append(lines[-2])
            concat.write_text("\n".join(lines) + "\n", encoding="utf-8")
            inputs = ["-f", "concat", "-safe", "0", "-i", str(concat)]
            duration = rows[-1]["elapsedMs"] - rows[0]["elapsedMs"] + 50
        else:
            with Image.open(args.source) as source:
                width, height = source.size
                source.seek(0)
                source.convert("RGB").save(args.output.with_suffix(".png"))
                duration = 0
                for frame in range(source.n_frames):
                    source.seek(frame)
                    duration += source.info.get("duration", 0)
            inputs = ["-ignore_loop", "1", "-i", str(args.source)]
        # Convert full-range RGB explicitly to limited-range BT.709, then tag both
        # codecs consistently so browsers do not guess a different color matrix.
        filters = "fps=20,scale=in_range=full:out_range=limited:out_color_matrix=bt709,format=yuv420p"
        if args.caption:
            (temporary / "caption.txt").write_text(args.caption, encoding="utf-8")
            shutil.copy2("C:/Windows/Fonts/consola.ttf", temporary / "font.ttf")
            filters += ",drawbox=x=0:y=ih-60:w=iw:h=60:color=0x101922:t=fill,drawtext=fontfile=font.ttf:textfile=caption.txt:fontsize=20:fontcolor=white:x=(w-tw)/2:y=h-38"
        base = [str(args.ffmpeg), "-hide_banner", "-loglevel", "error", "-y",
                *inputs, "-an", "-vf", filters, "-threads", str(args.threads),
                "-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709"]
        subprocess.run(base + ["-c:v", "libx264", "-preset", "slow", "-crf", "18",
                              "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(args.output)], check=True, cwd=temporary)
        subprocess.run(base + ["-c:v", "libvpx-vp9", "-crf", "28", "-b:v", "0", "-row-mt", "1",
                              "-pix_fmt", "yuv420p", str(args.output.with_suffix(".webm"))], check=True, cwd=temporary)
        if args.caption:
            subprocess.run([str(args.ffmpeg), "-v", "error", "-y", "-i", str(args.output), "-frames:v", "1", str(args.output.with_suffix(".png"))], check=True)
    outputs = []
    for file in [args.output, args.output.with_suffix(".webm"), args.output.with_suffix(".png")]:
        if file.suffix != ".png":
            # Decode every frame, rather than accepting an encoder exit code.
            subprocess.run([str(args.ffmpeg), "-v", "error", "-i", str(file), "-f", "null", "-"], check=True)
        outputs.append({"file": file.name, "bytes": file.stat().st_size, "sha256": digest(file)})
    receipt = {"source": args.source.as_posix(), "sourceBytes": args.source.stat().st_size,
               "sourceSha256": digest(args.source), "width": width, "height": height,
               "durationMs": duration, "fps": 20, "audio": False,
               "sourceType": "original_timestamped_png" if args.source.suffix == ".json" else "palette_reduced_gif",
               "colorSpace": "bt709", "colorRange": "limited", "captionFooter": args.caption, "outputs": outputs}
    print(json.dumps(receipt))


if __name__ == "__main__":
    main()
