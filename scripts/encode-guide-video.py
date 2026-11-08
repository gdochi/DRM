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
    parser.add_argument("--annotations", type=Path, help="Timed lesson steps in a separate padded Korean caption panel")
    parser.add_argument("--focus", type=Path, help="Optional native-screen detail cuts timed to actual field input")
    parser.add_argument("--poster-seconds", type=float, default=0, help="A representative point from the encoded lesson")
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
        source_width, source_height = width, height
        if args.focus:
            cues = json.loads(args.focus.read_text(encoding="utf-8"))
            spans = [(cue, cues[i + 1]["startMs"] if i + 1 < len(cues) else duration) for i, cue in enumerate(cues) if cue["zoom"] > 1]
            z, x, y = "1", "0", "0"
            for cue, end in reversed(spans):
                condition = f"between(on,{round(cue['startMs'] / 50)},{round(end / 50)})"
                amount = cue["zoom"]
                z = f"if({condition},{amount},{z})"
                x = f"if({condition},max(0,min(iw-iw/zoom,{cue['centerX']}-iw/zoom/2)),{x})"
                y = f"if({condition},max(0,min(ih-ih/zoom,{cue['centerY']}-ih/zoom/2)),{y})"
            filters += f",zoompan=z='{z}':x='{x}':y='{y}':d=1:s={width}x{height}:fps=20"
        if args.annotations:
            steps = json.loads(args.annotations.read_text(encoding="utf-8"))
            panel_height = 180
            height += panel_height
            fonts = temporary / "fonts"
            fonts.mkdir()
            shutil.copy2("C:/Windows/Fonts/malgun.ttf", fonts / "malgun.ttf")
            def stamp(ms):
                cs = max(0, round(ms / 10))
                return f"{cs // 360000}:{cs // 6000 % 60:02}:{cs // 100 % 60:02}.{cs % 100:02}"
            def ass_text(value):
                return value.replace("\\", "\\\\").replace("{", "\\{").replace("}", "\\}").replace("\n", "\\N")
            lines = ["[Script Info]", "ScriptType: v4.00+", f"PlayResX: {width}", f"PlayResY: {height}", "WrapStyle: 0", "[V4+ Styles]", "Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding", "Style: Lesson,Malgun Gothic,36,&H00FFFFFF,&H00FFFFFF,&H00101922,&H00101922,-1,0,0,0,100,100,0,0,1,0,0,7,48,48,0,1", "[Events]", "Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text"]
            for i, step in enumerate(steps):
                end = steps[i + 1]["startMs"] if i + 1 < len(steps) else duration
                title = f"{step['step']:02}  {step['title']}"
                label = "{\\pos(48," + str(source_height + 24) + ")}" + ass_text(title) + "\\N{\\fs28\\b0}" + ass_text(step["body"])
                lines.append(f"Dialogue: 0,{stamp(step['startMs'])},{stamp(end)},Lesson,,0,0,0,,{label}")
            (temporary / "lesson.ass").write_text("\n".join(lines) + "\n", encoding="utf-8")
            filters += f",pad=iw:ih+{panel_height}:0:0:color=0x101922,ass=lesson.ass:fontsdir=fonts"
        if args.caption:
            (temporary / "caption.txt").write_text(args.caption, encoding="utf-8")
            shutil.copy2("C:/Windows/Fonts/consola.ttf", temporary / "font.ttf")
            filters += ",drawbox=x=0:y=ih-60:w=iw:h=60:color=0x101922:t=fill,drawtext=fontfile=font.ttf:textfile=caption.txt:fontsize=20:fontcolor=white:x=(w-tw)/2:y=h-38"
        base = [str(args.ffmpeg), "-hide_banner", "-loglevel", "error", "-y", "-filter_threads", str(args.threads), "-threads", str(args.threads),
                *inputs, "-an", "-vf", filters, "-threads", str(args.threads),
                "-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709"]
        subprocess.run(base + ["-c:v", "libx264", "-preset", "fast" if args.annotations else "slow", "-crf", "18",
                              "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(args.output)], check=True, cwd=temporary)
        subprocess.run(base + ["-c:v", "libvpx-vp9", "-crf", "26" if args.annotations else "28", "-b:v", "0", "-row-mt", "1", "-deadline", "realtime" if args.annotations else "good", "-cpu-used", "6" if args.annotations else "1",
                              "-pix_fmt", "yuv420p", str(args.output.with_suffix(".webm"))], check=True, cwd=temporary)
        if args.caption or args.annotations:
            subprocess.run([str(args.ffmpeg), "-v", "error", "-y", "-ss", str(args.poster_seconds), "-i", str(args.output), "-frames:v", "1", str(args.output.with_suffix(".png"))], check=True)
    outputs = []
    for file in [args.output, args.output.with_suffix(".webm"), args.output.with_suffix(".png")]:
        if file.suffix != ".png":
            # Decode every frame, rather than accepting an encoder exit code.
            subprocess.run([str(args.ffmpeg), "-v", "error", "-threads", str(args.threads), "-i", str(file), "-f", "null", "-"], check=True)
        outputs.append({"file": file.name, "bytes": file.stat().st_size, "sha256": digest(file)})
    receipt = {"source": args.source.as_posix(), "sourceBytes": args.source.stat().st_size,
               "sourceSha256": digest(args.source), "width": width, "height": height,
               "durationMs": duration, "fps": 20, "audio": False,
               "sourceType": "original_timestamped_png" if args.source.suffix == ".json" else "palette_reduced_gif",
               "colorSpace": "bt709", "colorRange": "limited", "captionFooter": args.caption,
               "annotations": str(args.annotations) if args.annotations else None, "focusCuts": str(args.focus) if args.focus else None,
               "sourceWidth": source_width, "sourceHeight": source_height, "outputs": outputs}
    receipt["posterSeconds"] = args.poster_seconds
    receipt["h264Preset"] = "fast" if args.annotations else "slow"
    receipt["vp9CpuUsed"] = 6 if args.annotations else 1
    receipt["vp9Deadline"] = "realtime" if args.annotations else "good"
    print(json.dumps(receipt))


if __name__ == "__main__":
    main()
