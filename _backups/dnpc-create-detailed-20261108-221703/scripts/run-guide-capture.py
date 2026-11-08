"""Capture real production-mod screens in a workspace-owned Minecraft instance.

Uses installed Prism libraries and the existing mapped NeoForge compile classpath.
No downloads, launcher changes, production source edits or existing-world changes.
"""

import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
DESKTOP = Path.home() / "Desktop"
PRISM = Path(os.environ["APPDATA"]) / "PrismLauncher"
LIBRARIES = PRISM / "libraries"
JAVA = Path("C:/Program Files/Java/jdk-21/bin")
CORE_PROJECT = DESKTOP / "[COMMON] DRM/[NEOFORGE] DRM"


def library_path(lib):
    artifact = lib.get("downloads", {}).get("artifact", {})
    if "path" in artifact:
        return LIBRARIES / artifact["path"]
    group, name, version, *classifier = lib["name"].split(":")
    suffix = "-" + classifier[0] if classifier else ""
    return LIBRARIES / group.replace(".", "/") / name / version / f"{name}-{version}{suffix}.jar"


def allowed(lib):
    if "rules" not in lib:
        return True
    allow = False
    for rule in lib["rules"]:
        target = rule.get("os", {})
        if target.get("name", "windows") == "windows" and target.get("arch", "x86_64") in ("x86_64", "amd64"):
            allow = rule["action"] == "allow"
    return allow


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--run", required=True, help="Unique run name; an existing world is never overwritten")
    parser.add_argument("--locale", choices=["en_us", "ko_kr"], default="en_us")
    parser.add_argument("--width",type=int,default=1920)
    parser.add_argument("--height",type=int,default=1080)
    parser.add_argument("--actor", choices=["dnpc", "customnpcs"], default="dnpc", help="Owned actor for this pre-26.3 capture runtime")
    parser.add_argument("--views", default="", help="Comma-separated capture IDs for a focused rerun")
    parser.add_argument("--extra-mod", action="append", default=[], help="Existing production mod JAR to copy into the isolated instance")
    parser.add_argument("--all-editors", action="store_true", help="Capture registered editor default entry points; inspect every result before use")
    parser.add_argument("--plan", help="JSON capture plan with registered editor IDs and observed UI actions")
    parser.add_argument("--seed-hud-from", help="Copy the GUI-saved guide_hud and activation file from an owned capture run to verify startup loading")
    parser.add_argument("--npc-mod", default=str(DESKTOP / "[COMMON] Dochi`s Npc Core/jar/dochi_npc_core-0.1.3-neoforge-1.21.1.jar"), help="Exact DNPC production JAR; its hash is retained in the environment receipt")
    args = parser.parse_args()
    if args.width<1280 or args.height<720:
        raise ValueError("Capture framebuffer must be at least 1280x720")
    if not args.run.replace("-", "").isalnum():
        raise ValueError("Use letters, numbers and hyphens in the run name")
    run = ROOT / "build/task/guide-capture" / args.run
    if run.exists():
        raise ValueError(f"Run already exists; choose another name: {run}")
    runtime = run / "game"
    mods_dir = runtime / "mods"
    classes = run / "classes"
    output = run / "captures"
    for directory in [mods_dir, classes, output]:
        directory.mkdir(parents=True)
    (runtime / "options.txt").write_text(f"onboardAccessibility:false\nlang:{args.locale}\npauseOnLostFocus:false\nguiScale:2\nrenderDistance:4\nsimulationDistance:5\nsoundCategory_music:0.0\nsoundCategory_record:0.0\n", encoding="utf-8")
    seeded = []
    if args.seed_hud_from:
        if not args.seed_hud_from.replace("-", "").isalnum():
            raise ValueError("HUD seed must name an owned capture run")
        source_root = ROOT / "build/task/guide-capture" / args.seed_hud_from / "game/config/dochi_rpg_maker/hud"
        source_files = [source_root / "active_set.json"] + sorted((source_root / "sets/guide_hud").rglob("*.json"))
        if len(source_files) < 3:
            raise ValueError("GUI-saved HUD seed is incomplete")
        for source in source_files:
            relative = source.relative_to(source_root)
            target = runtime / "config/dochi_rpg_maker/hud" / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
            seeded.append({"source": str(source), "relative": relative.as_posix(), "sha256": hashlib.sha256(source.read_bytes()).hexdigest()})
    installed_mods = PRISM / "instances/1.21.1(2)/minecraft/mods"
    mods = [
        DESKTOP / "[COMMON] DRM/jar/dochi_rpg_maker-0.3.1-neoforge-1.21.1.jar",
        Path(args.npc_mod),
        installed_mods / "geckolib-neoforge-1.21.1-4.9.2.jar",
        installed_mods / "architectury-13.0.11-neoforge.jar",
    ] + [Path(item) for item in args.extra_mod]
    receipts = []
    for source in mods:
        source = source.resolve(strict=True)
        shutil.copy2(source, mods_dir / source.name)
        receipts.append({"source": str(source), "sha256": hashlib.sha256(source.read_bytes()).hexdigest()})
    compile_paths = (CORE_PROJECT / "build/moddev/clientLegacyClasspath.txt").read_text().splitlines()
    compile_paths += [str(CORE_PROJECT / "build/moddev/artifacts/neoforge-21.1.216-merged.jar")]
    compile_cp = os.pathsep.join(path for path in compile_paths + [str(mod) for mod in mods] if path)
    compile_result = subprocess.run([str(JAVA / "javac.exe"), "-encoding", "UTF-8", "-proc:none", "-cp", compile_cp,
                                     "-d", str(classes), *[str(ROOT / "scripts/guide-capture" / name) for name in
                                         ("GuideCapture.java", "GuideScenes.java", "GuideTutorials.java", "GuideArmorDrops.java", "GuideCreate.java")]], capture_output=True, text=True)
    (run / "compile.log").write_text(compile_result.stdout + compile_result.stderr, encoding="utf-8")
    if compile_result.returncode:
        raise RuntimeError(compile_result.stderr)
    probe = mods_dir / "dochi-docs-capture.jar"
    with ZipFile(probe, "w", ZIP_DEFLATED) as jar:
        jar.writestr("META-INF/neoforge.mods.toml", 'modLoader="javafml"\nloaderVersion="[4,)"\nlicense="All Rights Reserved"\n[[mods]]\nmodId="dochi_docs_capture"\nversion="1.0.0"\ndisplayName="Dochi Documentation Capture"\n')
        for item in classes.rglob("*.class"):
            jar.write(item, item.relative_to(classes).as_posix())
        for item in (ROOT / "scripts/guide-capture/assets").rglob("*.png"):
            jar.write(item, item.relative_to(ROOT / "scripts/guide-capture").as_posix())
    receipts.append({"source": "documentation capture fixture", "sha256": hashlib.sha256(probe.read_bytes()).hexdigest()})
    version = "21.1.259"
    installer = LIBRARIES / f"net/neoforged/neoforge/{version}/neoforge-{version}-installer.jar"
    with ZipFile(installer) as archive:
        neo = json.loads(archive.read("version.json"))
    metadata = [json.loads((PRISM / f"meta/{name}/{version}.json").read_text()) for name, version in [("net.minecraft", "1.21.1"), ("org.lwjgl3", "3.3.3")]] + [neo]
    selected = {}
    for entry in metadata:
        for lib in entry["libraries"]:
            if allowed(lib):
                parts = lib["name"].split(":")
                selected[tuple(parts[:2] + parts[3:])] = library_path(lib)
    libraries = list(selected.values()) + [LIBRARIES / "net/minecraft/client/1.21.1-20240808.144430/client-1.21.1-20240808.144430-extra.jar"]
    missing = [str(item) for item in libraries if not item.is_file()]
    if missing:
        raise FileNotFoundError("Missing installed libraries: " + ", ".join(missing))
    cp = os.pathsep.join(map(str, libraries))

    def expand(value):
        for key, replacement in {"${library_directory}": str(LIBRARIES), "${classpath_separator}": os.pathsep, "${version_name}": "1.21.1"}.items():
            value = value.replace(key, replacement)
        return value

    command = [str(JAVA / "java.exe"), "-Xmx3G", f"-DlegacyClassPath={cp}", f"-Ddochi.docs.output={output}", f"-Ddochi.docs.locale={args.locale}", f"-Ddochi.docs.views={args.views}"]
    command.append(f"-Ddochi.docs.actor={args.actor}")
    if args.all_editors:
        command.append("-Ddochi.docs.allEditors=true")
    if args.plan:
        command.append(f"-Ddochi.docs.plan={Path(args.plan).resolve(strict=True)}")
    command += [expand(value) for value in neo["arguments"]["jvm"]]
    command += ["-cp", cp, neo["mainClass"], "--username", "DocsGuide", "--version", "1.21.1", "--gameDir", str(runtime),
                "--assetsDir", str(PRISM / "assets"), "--assetIndex", "17", "--uuid", "00000000000000000000000000000001", "--accessToken", "0",
                "--userType", "legacy", "--versionType", "release", "--width", str(args.width), "--height", str(args.height)] + neo["arguments"]["game"]
    (output / "environment.json").write_text(json.dumps({"minecraft": "1.21.1", "loader": "NeoForge " + version, "locale": args.locale, "actor": args.actor, "mods": receipts, "seededHudFiles": seeded}, indent=2) + "\n", encoding="utf-8")
    print(f"Starting isolated capture: {run}", flush=True)
    with (run / "client.log").open("w", encoding="utf-8") as log:
        result = subprocess.Popen(command, cwd=runtime, stdout=log, stderr=subprocess.STDOUT, creationflags=subprocess.CREATE_NO_WINDOW)
        (run / "process.json").write_text(json.dumps({"pid": result.pid, "parentPid": os.getpid(), "runtime": str(runtime)}, indent=2) + "\n", encoding="utf-8")
        try:
            result.wait(timeout=600)
        except subprocess.TimeoutExpired:
            result.kill()
            result.wait()
            raise
    print(f"Client exit: {result.returncode}; completed: {(output / 'finished.txt').exists()}")
    if (output / "screens.json").exists():
        print(json.dumps(json.loads((output / "screens.json").read_text(encoding="utf-8")), ensure_ascii=True, indent=2))
    if result.returncode or not (output / "finished.txt").exists():
        print((run / "client.log").read_text(encoding="utf-8", errors="replace")[-9000:])
        raise SystemExit(1)


if __name__ == "__main__":
    main()
