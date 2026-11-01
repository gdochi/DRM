"""Run real Forge 1.20.1 documentation captures in a new, owned instance.

The capture fixture is compiled and remapped separately. Production sources,
JARs, launcher profiles and existing worlds are read-only inputs.
"""
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
DESKTOP = Path.home() / 'Desktop'
PRISM = Path(os.environ['APPDATA']) / 'PrismLauncher'
LIBRARIES = PRISM / 'libraries'
PROJECT = DESKTOP / '[COMMON] DRM/[FORGE] DRM'
JAVA = Path('C:/Program Files/Java/jdk-17/bin')

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def argfile(path, arguments):
    path.write_text('\n'.join('"' + str(v).replace('\\', '/').replace('"', '\\"') + '"' for v in arguments) + '\n', encoding='utf-8')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--run', required=True)
    parser.add_argument('--views', default='')
    parser.add_argument('--locale', choices=['en_us', 'ko_kr'], default='en_us')
    parser.add_argument('--all-editors', action='store_true')
    parser.add_argument('--plan')
    parser.add_argument('--extra-mod', action='append', default=[])
    parser.add_argument('--with-cnpc', action='store_true')
    parser.add_argument('--actor', choices=['dnpc', 'customnpcs'], default='dnpc')
    parser.add_argument('--seed-dialogue-from', help='Copy only the UI-saved welcome_reward_once set from an owned capture run')
    args = parser.parse_args()
    if args.actor == 'customnpcs' and not args.with_cnpc:
        raise ValueError('The legacy CustomNPCs actor requires --with-cnpc in this Forge 1.20.1-only runner')
    if not args.run.replace('-', '').isalnum():
        raise ValueError('Use a new run name containing letters, numbers and hyphens')
    run = ROOT / 'build/task/guide-capture' / args.run
    if run.exists():
        raise ValueError('The run already exists; existing worlds are never overwritten')
    runtime = run / 'game'
    output = run / 'captures'
    classes = run / 'classes'
    sources = run / 'fixture-src'
    for path in [runtime / 'mods', output, classes, sources]:
        path.mkdir(parents=True)
    (runtime / 'options.txt').write_text(f'onboardAccessibility:false\nlang:{args.locale}\npauseOnLostFocus:false\nguiScale:2\nrenderDistance:4\nsimulationDistance:5\n', encoding='utf-8')
    if args.seed_dialogue_from:
        if not args.seed_dialogue_from.replace('-', '').isalnum():
            raise ValueError('Dialogue seed must name an owned capture run')
        seed = ROOT / 'build/task/guide-capture' / args.seed_dialogue_from / 'game/config/dochi_rpg_maker/dialogue_sets/welcome_reward_once'
        if not (seed / 'dialogue_set.json').is_file():
            raise ValueError('UI-saved dialogue seed is missing')
        destination = runtime / 'config/dochi_rpg_maker/dialogue_sets/welcome_reward_once'
        shutil.copytree(seed, destination)

    specification = importlib.util.spec_from_file_location('guide_capture_libraries', ROOT / 'scripts/run-guide-capture.py')
    helper = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(helper)
    version = '47.4.20'
    installer = LIBRARIES / f'net/minecraftforge/forge/1.20.1-{version}/forge-1.20.1-{version}-installer.jar'
    with ZipFile(installer) as archive:
        loader = json.loads(archive.read('version.json'))
    entries = []
    for name in ['net.minecraft/1.20.1.json', 'org.lwjgl3/3.3.1.json', f'net.minecraftforge/{version}.json']:
        entries += json.loads((PRISM / 'meta' / name).read_text(encoding='utf-8'))['libraries']
    entries += loader['libraries']
    paths = {}
    for entry in entries:
        if not helper.allowed(entry) or 'ForgeWrapper' in entry['name']:
            continue
        key = entry['name'].split(':')
        paths[tuple(key[:2] + key[3:])] = helper.library_path(entry)
    for name in ['fmlcore', 'javafmllanguage', 'lowcodelanguage', 'mclanguage']:
        paths[name] = LIBRARIES / f'net/minecraftforge/{name}/1.20.1-{version}/{name}-1.20.1-{version}.jar'
    for kind in ['universal', 'client']:
        paths['forge-' + kind] = LIBRARIES / f'net/minecraftforge/forge/1.20.1-{version}/forge-1.20.1-{version}-{kind}.jar'
    for kind in ['srg', 'extra']:
        paths['client-' + kind] = LIBRARIES / f'net/minecraft/client/1.20.1-20230612.114412/client-1.20.1-20230612.114412-{kind}.jar'
    for path in paths.values():
        if not path.is_file():
            raise FileNotFoundError(path)
    native = run / 'natives'
    native.mkdir()
    for path in paths.values():
        with ZipFile(path) as archive:
            for name in archive.namelist():
                if name.lower().endswith('.dll'):
                    (native / Path(name).name).write_bytes(archive.read(name))

    original = (ROOT / 'scripts/guide-capture/GuideCapture.java').read_text(encoding='utf-8')
    source = original.replace('net.neoforged.api.distmarker.Dist', 'net.minecraftforge.api.distmarker.Dist')
    source = source.replace('net.neoforged.fml.common.Mod', 'net.minecraftforge.fml.common.Mod')
    source = source.replace('import net.neoforged.neoforge.common.NeoForge;', 'import net.minecraftforge.common.MinecraftForge;')
    source = source.replace('import net.neoforged.neoforge.client.event.ClientTickEvent;', 'import net.minecraftforge.event.TickEvent;')
    source = source.replace('@Mod(value="dochi_docs_capture", dist=Dist.CLIENT)', '@Mod("dochi_docs_capture")')
    source = source.replace('NeoForge.EVENT_BUS.addListener((ClientTickEvent.Post event)->tick());', 'MinecraftForge.EVENT_BUS.addListener((TickEvent.ClientTickEvent event)->{if(event.phase==TickEvent.Phase.END)tick();});')
    source = source.replace('ResourceLocation.parse(', 'new ResourceLocation(')
    source = source.replace('player.registryAccess()', 'player.serverLevel().registryAccess()')
    source = source.replace('current.mouseScrolled(x,y,0,', 'current.mouseScrolled(x,y,')
    source = source.replace('current.mouseScrolled((cx+cw/2d)*scale,(cy+ch/2d)*scale,0,', 'current.mouseScrolled((cx+cw/2d)*scale,(cy+ch/2d)*scale,')
    source = source.replace('current.mouseScrolled(current.width*.8,current.height*.75,0,', 'current.mouseScrolled(current.width*.8,current.height*.75,')
    source = source.replace('current.mouseScrolled(x,(listY+height/2)*scale,0,', 'current.mouseScrolled(x,(listY+height/2)*scale,')
    source = source.replace('current.mouseScrolled((cx+cw/2)*scale,(cy+ch/2)*scale,0,', 'current.mouseScrolled((cx+cw/2)*scale,(cy+ch/2)*scale,')
    source = source.replace('settings,options,dimensions,new TitleScreen()', 'settings,options,dimensions')
    # Production Forge uses SRG member names. Reflection strings need the same
    # mapping as direct bytecode references; mod-owned names remain unchanged.
    source = source.replace('getDeclaredField(name)', 'getDeclaredField(forgeFieldName(cls,name))')
    source = source.replace('method.getName().equals(name)', 'forgeNames(name).contains(method.getName())')
    marker = '    private static Object construct('
    mapping_helpers = '''    private static final Properties FORGE_NAMES=new Properties();
    static{try(var in=GuideCapture.class.getResourceAsStream("/minecraft-reflection.properties")){if(in!=null)FORGE_NAMES.load(in);}catch(Exception error){throw new ExceptionInInitializerError(error);}}
    private static Set<String> forgeNames(String name){Set<String> out=new LinkedHashSet<>();out.add(name);out.addAll(Arrays.asList(FORGE_NAMES.getProperty(name,"").split(",")));return out;}
    private static String forgeFieldName(Class<?> cls,String name){for(String candidate:forgeNames(name))try{cls.getDeclaredField(candidate);return candidate;}catch(NoSuchFieldException ignored){}return name;}
'''
    assert marker in source
    source = source.replace(marker, mapping_helpers + marker, 1)
    (sources / 'GuideCapture.java').write_text(source, encoding='utf-8')
    compile_args = [line.strip('"') for line in (PROJECT / 'build/javac.args').read_text(encoding='utf-8-sig').splitlines()]
    compile_cp = compile_args[next(i+1 for i, value in enumerate(compile_args) if value in ('-cp', '-classpath'))]
    compile_cp = os.pathsep.join(sorted(compile_cp.split(os.pathsep), key=lambda value: 0 if '_mapped_official_' in value else 1))
    compiled = subprocess.run([str(JAVA / 'javac.exe'), '-encoding', 'UTF-8', '--release', '17', '-proc:none', '-cp', compile_cp, '-d', str(classes), str(sources / 'GuideCapture.java')], capture_output=True, text=True)
    (run / 'compile.log').write_text(compiled.stdout + compiled.stderr, encoding='utf-8')
    if compiled.returncode:
        raise RuntimeError(compiled.stderr)
    mapping = Path.home() / '.gradle/caches/forge_gradle/minecraft_user_repo/de/oceanlabs/mcp/mcp_config/1.20.1-20230612.114412/srg_to_official_1.20.1.tsrg'
    names = {}
    for line in mapping.read_text(encoding='utf-8').splitlines():
        if not line.startswith('\t') or line.startswith('\t\t'):
            continue
        row = line.strip().split()
        if len(row) in (2, 3):
            names.setdefault(row[-1], set()).add(row[0])
    named = run / 'fixture-named.jar'
    with ZipFile(named, 'w', ZIP_DEFLATED) as archive:
        for path in classes.rglob('*.class'):
            archive.write(path, path.relative_to(classes).as_posix())
        archive.writestr('minecraft-reflection.properties', '\n'.join(name + '=' + ','.join(sorted(values)) for name, values in names.items()))
        archive.writestr('META-INF/mods.toml', 'modLoader="javafml"\nloaderVersion="[47,)"\nlicense="All Rights Reserved"\n[[mods]]\nmodId="dochi_docs_capture"\nversion="1.0.0"\ndisplayName="Dochi Documentation Capture"\n')
    probe = runtime / 'mods/dochi-docs-capture.jar'
    fart = Path.home() / '.gradle/caches/forge_gradle/maven_downloader/net/minecraftforge/ForgeAutoRenamingTool/1.0.6/ForgeAutoRenamingTool-1.0.6-all.jar'
    remap = ['-jar', str(fart), '--input', str(named), '--output', str(probe), '--names', str(mapping), '--reverse', '--threads', '2']
    for library in compile_cp.split(os.pathsep):
        remap += ['--lib', library]
    argfile(run / 'remap.args', remap)
    with (run / 'remap.log').open('w', encoding='utf-8') as log:
        subprocess.run([str(JAVA / 'java.exe'), '@' + str(run / 'remap.args')], stdout=log, stderr=subprocess.STDOUT, check=True)

    mods = [DESKTOP / '[COMMON] DRM/jar/dochi_rpg_maker-0.3.1-1.20.1-forge.jar', DESKTOP / '[COMMON] Dochi`s Npc Core/jar/dochi_npc_core-0.1.3-forge-1.20.1.jar', PROJECT / 'build/deps/geckolib-forge-1.20.1-4.8.3.jar']
    if args.with_cnpc:
        mods.append(PROJECT / 'build/deps/CustomNPCs-1.20.1-GBPort-Unofficial-1.20.1.20260227.jar')
    mods += [Path(value).resolve(strict=True) for value in args.extra_mod]
    receipts = []
    for path in mods:
        if not path.is_file():
            raise FileNotFoundError(path)
        shutil.copy2(path, runtime / 'mods' / path.name)
        receipts.append({'source': str(path), 'sha256': digest(path)})
    receipts.append({'source': 'documentation capture fixture', 'sha256': digest(probe)})
    cp = os.pathsep.join(map(str, paths.values()))
    def expand(value):
        value = value.replace('${library_directory}', LIBRARIES.as_posix()).replace('${classpath_separator}', os.pathsep).replace('${version_name}', '1.20.1')
        return value + ',client-' if value.startswith('-DignoreList=') else value
    launch = ['-Xmx3G', '-Djava.library.path=' + native.as_posix(), '-DlegacyClassPath=' + cp, '-Ddochi.docs.output=' + str(output), '-Ddochi.docs.views=' + args.views, '-Ddochi.docs.locale=' + args.locale]
    launch.append('-Ddochi.docs.actor=' + args.actor)
    if args.all_editors:
        launch.append('-Ddochi.docs.allEditors=true')
    if args.plan:
        launch.append('-Ddochi.docs.plan=' + str(Path(args.plan).resolve(strict=True)))
    launch += [expand(value) for value in loader['arguments']['jvm']]
    launch += ['-cp', cp, loader['mainClass'], *loader['arguments']['game'], '--username', 'DocsGuide', '--uuid', '00000000000000000000000000000001', '--accessToken', '0', '--version', '1.20.1', '--gameDir', str(runtime), '--assetsDir', str(PRISM / 'assets'), '--assetIndex', '5', '--userType', 'legacy', '--width', '1920', '--height', '1080']
    argfile(run / 'launch.args', launch)
    (output / 'environment.json').write_text(json.dumps({'minecraft': '1.20.1', 'loader': 'Forge ' + version, 'locale': args.locale, 'mods': receipts, 'mappingSha256': digest(mapping)}, indent=2) + '\n', encoding='utf-8')
    print('Starting isolated Forge capture: ' + str(run), flush=True)
    with (run / 'client.log').open('w', encoding='utf-8') as log:
        result = subprocess.run([str(JAVA / 'java.exe'), '@' + str(run / 'launch.args')], cwd=runtime, stdout=log, stderr=subprocess.STDOUT, timeout=600, creationflags=subprocess.CREATE_NO_WINDOW)
    print(f'Client exit: {result.returncode}; completed: {(output / "finished.txt").exists()}')
    if (output / 'screens.json').exists():
        print((output / 'screens.json').read_text(encoding='utf-8'))
    if result.returncode or not (output / 'finished.txt').exists():
        print((run / 'client.log').read_text(encoding='utf-8', errors='replace').replace('\0', '')[-5000:])
        raise SystemExit(1)

if __name__ == '__main__':
    main()
