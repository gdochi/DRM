"""Convert reviewed game GIFs or timestamped PNG captures to silent video.

Pass a local FFmpeg executable with --ffmpeg. Original timing and resolution
are retained; no interpolated frames or artificial UI are introduced.
"""

import argparse
import hashlib
import json
import subprocess
import tempfile
from contextlib import ExitStack
from pathlib import Path

from PIL import Image


def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Reviewed GIF or capture -frames.json")
    parser.add_argument("output", type=Path, help="Output .mp4 path; also writes .webm and .png")
    parser.add_argument("--ffmpeg", required=True, type=Path)
    args = parser.parse_args()
    if args.output.suffix != ".mp4":
        parser.error("Output must have the .mp4 extension")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with ExitStack() as stack:
        if args.source.suffix == ".json":
            rows = json.loads(args.source.read_text(encoding="utf-8"))
            folder = args.source.with_suffix("")
            with Image.open(folder / rows[0]["file"]) as source:
                width, height = source.size
                source.convert("RGB").save(args.output.with_suffix(".png"))
            temporary = Path(stack.enter_context(tempfile.TemporaryDirectory(prefix=".encode-", dir=args.output.parent)))
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
        base = [str(args.ffmpeg), "-hide_banner", "-loglevel", "error", "-y",
                *inputs, "-an", "-vf", "fps=20"]
        subprocess.run(base + ["-c:v", "libx264", "-preset", "slow", "-crf", "18",
                              "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(args.output)], check=True)
        subprocess.run(base + ["-c:v", "libvpx-vp9", "-crf", "28", "-b:v", "0", "-row-mt", "1",
                              "-pix_fmt", "yuv420p", str(args.output.with_suffix(".webm"))], check=True)
    outputs = []
    for file in [args.output, args.output.with_suffix(".webm"), args.output.with_suffix(".png")]:
        if file.suffix != ".png":
            # Decode every frame, rather than accepting an encoder exit code.
            subprocess.run([str(args.ffmpeg), "-v", "error", "-i", str(file), "-f", "null", "-"], check=True)
        outputs.append({"file": file.name, "bytes": file.stat().st_size, "sha256": digest(file)})
    receipt = {"source": args.source.as_posix(), "sourceBytes": args.source.stat().st_size,
               "sourceSha256": digest(args.source), "width": width, "height": height,
               "durationMs": duration, "fps": 20, "audio": False, "outputs": outputs}
    print(json.dumps(receipt))


if __name__ == "__main__":
    main()
