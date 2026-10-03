from pathlib import Path
import difflib, re
ROOT=Path(r'C:\Users\hodu3\Desktop\[DOCHI] DOCS')
changes={}
def replace(rel,old,new):
    text=changes.get(rel) or (ROOT/rel).read_text(encoding='utf-8-sig')
    if old not in text:raise ValueError(rel+' missing '+old[:60])
    changes[rel]=text.replace(old,new)

replace('content/ko/101-fabric-quick-start.md','1. Minecraft 1.21.1, Fabric Loader 0.18.0 이상, Fabric API 0.116.11 이상, Java 21 환경을 준비합니다.','1. Minecraft 1.21.1과 Java 21을 준비합니다. Fabric은 Loader 0.18.0 이상과 Fabric API 0.116.11+1.21.1 이상, NeoForge는 21.1 이상을 사용합니다.')
replace('content/ko/101-fabric-quick-start.md','3. CustomNPCs 1.0.0을 서버와 클라이언트에 함께 설치합니다. 0.1.8부터 필수 의존성입니다.','3. 해당 로더의 CustomNPCs를 서버와 클라이언트에 함께 설치합니다. Fabric은 1.0.0, NeoForge는 1.21.1 호환 빌드가 필수입니다.')
replace('content/en/101-fabric-quick-start.md','1. Prepare Minecraft 1.21.1, Fabric Loader 0.18.0 or newer, Fabric API 0.116.11 or newer, and Java 21.','1. Prepare Minecraft 1.21.1 and Java 21. Fabric needs Loader 0.18.0+ and Fabric API 0.116.11+1.21.1+; NeoForge needs 21.1+.')
replace('content/en/101-fabric-quick-start.md','2. Put the DRM Core 0.2.4 Fabric JAR in the client and server `mods` folders.','2. Put the same matching-loader DRM Core 0.2.4 JAR in the client and server `mods` folders.')
replace('content/en/101-fabric-quick-start.md','3. Install CustomNPCs 1.0.0 on the server and clients. It is required by DRM 0.2.4.','3. Install matching-loader CustomNPCs on the server and clients: Fabric 1.0.0 or a compatible NeoForge 1.21.1 build. It is required by DRM.')
replace('content/en/101-fabric-quick-start.md','available as a built-in Fabric editor','available as a built-in editor on Fabric and NeoForge')
for name in ('123-fabric-tooltip-maker.md','124-fabric-dialogue-presentation.md'):
    replace('content/en/'+name,'Fabric·NeoForge','Fabric and NeoForge')
replace('content/ko/113-fabric-currency-editor.md','Fabric 0.1.8은 플레이어가','DRM은 플레이어가')
replace('content/en/113-fabric-currency-editor.md','Fabric 0.1.8 copies DRM wallet','DRM copies wallet')
replace('content/en/56b-cobblemon-trainer-quests.md','See [loader differences](#core-fabric/loader-compatibility) for Fabric and NeoForge quest completion policies. Objective progress and whole-quest completion or rewards are separate operations.', 'Both current DRM Quest Editors author automatic quests. Reaching the required win count does not finish the whole quest if other objectives remain. See [data migration](#core-fabric/loader-compatibility) when importing older turn-in JSON.')
for locale in ('ko','en'):
    replace(f'content/{locale}/50-cobblemon-editor-overview.md','dochi_cobblemon_editor-<version>-fabric-1.21.1.jar','dochi_cobblemon_editor-<version>-<loader>-1.21.1.jar')
replace('content/ko/50-cobblemon-editor-overview.md','형식입니다. 기존 데이터 호환성을','형식이며 로더 자리는 `fabric` 또는 `neoforge`입니다. 기존 데이터 호환성을')
replace('content/en/50-cobblemon-editor-overview.md','For existing-data compatibility,','The loader is `fabric` or `neoforge`. For existing-data compatibility,')
replace('content/ko/52-cobblemon-trainer-editor.md','최대 64종의 아이템','최대 64개 아이템 항목')
replace('content/ko/58-cobblemon-trainer-ai-party-items.md','최대 64종의 등록 아이템','최대 64개 등록 아이템 항목')
replace('content/en/57-cobblemon-conditions-rewards-pokemon.md','Changes a DRM Currency balance; negative amounts normalize to zero.','Changes the selected DRM or CobbleDollars balance. Invalid or negative amounts fail; zero is allowed for `set`. CobbleDollars requires its optional provider.')

for locale in ('ko','en'):
    rel=f'content/{locale}/57-cobblemon-conditions-rewards-pokemon.md'
    text=changes.get(rel) or (ROOT/rel).read_text(encoding='utf-8-sig')
    addition='''## 화폐 After Action

`currency` 액션에서 DRM 화폐 또는 CobbleDollars를 선택하고 `add`, `take`, `set`을 정합니다. `set`은 잔액을 지정 값으로 바꾸며 0도 허용합니다. 음수·잘못된 금액과 사용할 수 없는 공급자는 실패로 처리됩니다. CobbleDollars는 선택 연동이며 설치하지 않은 서버에서는 해당 보상을 지급할 수 없습니다.
''' if locale=='ko' else '''## Currency After Actions

For `currency`, choose DRM currency or CobbleDollars and an operation: `add`, `take`, or `set`. `set` replaces the balance and can set it to zero. Invalid/negative amounts and unavailable providers fail. CobbleDollars is optional and its rewards cannot run without the provider.
'''
    changes[rel]=text.rstrip()+'\n\n'+addition

# Remove the legacy deadline from the Forge definition example, but preserve
# the shared 1.21.1 example whose runtime continues to use JSON.
for locale in ('ko','en'):
    rel=f'content/{locale}/09-json-reference.md'
    text=(ROOT/rel).read_text(encoding='utf-8-sig')
    text=re.sub(r'("intervalTicks":\s*\d+),\n\s*"nextGameTime": 0',r'\1',text)
    changes[rel]=text

patch=['*** Begin Patch']
for rel,new in changes.items():
    path=ROOT/rel; old=path.read_text(encoding='utf-8-sig')
    if old==new:continue
    patch.append(f'*** Update File: {path.as_posix()}')
    for line in list(difflib.unified_diff(old.splitlines(),new.splitlines(),n=3))[2:]:
        patch.append('@@' if line.startswith('@@') else line)
patch.append('*** End Patch')
print('\n'.join(patch))
