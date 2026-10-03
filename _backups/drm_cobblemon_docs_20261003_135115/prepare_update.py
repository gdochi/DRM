from pathlib import Path
import re, json, difflib

ROOT = Path(r'C:\Users\hodu3\Desktop\[DOCHI] DOCS')
changes = {}

def read(rel):
    return changes.get(rel, (ROOT / rel).read_text(encoding='utf-8-sig'))

def put(rel, text):
    changes[rel] = text.rstrip() + '\n'

def replace(rel, old, new, required=True):
    text = read(rel)
    if old not in text:
        if required:
            raise ValueError(f'Missing text in {rel}: {old[:100]}')
        return
    put(rel, text.replace(old, new))

def append(rel, text):
    put(rel, read(rel).rstrip() + '\n\n' + text.strip() + '\n')

def page(rel, title, slug, order, description, product, section, version, body):
    ko = '/ko/' in rel
    put(rel, f'''---
title: {title}
slug: {slug}
order: {order}
description: {description}
product: {product}
category: {'시작하기' if ko else 'Getting Started'}
section: {section}
status: {'안정' if ko else 'Stable'}
version: {version}
audience: {'제작자 / 운영자' if ko else 'Creators / Operators'}
---

{body.strip()}
''')

# Historical release notes retain the original version and content.
for locale in ('ko', 'en'):
    for path in (ROOT / 'content' / locale).glob('*.md'):
        rel = path.relative_to(ROOT).as_posix()
        text = read(rel)
        product = re.search(r'^product: (.+)$', text, re.M)
        slug = re.search(r'^slug: (.+)$', text, re.M)
        if not product or (slug and 'release' in slug.group(1)):
            continue
        if product.group(1) == 'core-fabric':
            text = re.sub(r'^version: .+$', 'version: 0.2.4', text, count=1, flags=re.M)
            text = text.replace('0.2.3', '0.2.4')
            text = text.replace('Fabric 1.21.1용 DRM Core', 'Fabric·NeoForge 1.21.1용 DRM Core')
            text = text.replace('on Fabric 1.21.1', 'on Fabric and NeoForge 1.21.1')
            text = text.replace('DRM 0.2.4 Fabric JAR', 'DRM 0.2.4 JAR for your loader') if locale == 'en' else text
            text = text.replace('같은 DRM 0.2.4 Fabric JAR', '같은 로더의 DRM 0.2.4 JAR') if locale == 'ko' else text
            text = text.replace('Fabric 기본 에디터', 'Fabric·NeoForge 기본 에디터')
            text = text.replace('Fabric 0.2.4', 'Fabric·NeoForge 0.2.4') if path.name in ('123-fabric-tooltip-maker.md', '124-fabric-dialogue-presentation.md') else text
            put(rel, text)
        elif product.group(1) == 'drm-cobblemon-editor':
            text = text.replace('Fabric 0.2.0 / NeoForge 0.1.9', 'Fabric 0.2.1 / NeoForge 0.2.0')
            text = text.replace('Fabric 0.2.0 또는 NeoForge 0.1.9', 'Fabric 0.2.1 또는 NeoForge 0.2.0')
            text = text.replace('Fabric 0.2.0 or NeoForge 0.1.9', 'Fabric 0.2.1 or NeoForge 0.2.0')
            text = text.replace('dochi_cobblemon_editor-0.2.0-fabric', 'dochi_cobblemon_editor-0.2.1-fabric')
            text = text.replace('dochi_cobblemon_editor-0.1.9-neoforge', 'dochi_cobblemon_editor-0.2.0-neoforge')
            text = text.replace('| Fabric 1.21.1 | 0.2.0 |', '| Fabric 1.21.1 | 0.2.1 |')
            text = text.replace('| NeoForge 1.21.1 | 0.1.9 |', '| NeoForge 1.21.1 | 0.2.0 |')
            text = text.replace('현재 Core 빌드는 0.2.3입니다.', '현재 Fabric·NeoForge Core 빌드는 0.2.4입니다.')
            text = text.replace('Current Core builds are 0.2.3.', 'Current Fabric and NeoForge Core builds are 0.2.4.')
            put(rel, text)
        elif product.group(1) == 'core' and path.name in ('01-quick-start.md','02-installation.md','03-paths.md','51-stat-item-systems.md'):
            put(rel, text.replace('0.2.0', '0.2.1').replace('0.2.3', '0.2.4'))

cfg = json.loads((ROOT / 'site.config.json').read_text(encoding='utf-8-sig'))
for item in [cfg['products']['core'], next(m for m in cfg['wikiMods'] if m['id'] == 'drm')]:
    for key in list(item):
        if key.startswith('description'):
            item[key] = item[key].replace('0.2.0', '0.2.1')
for item in [cfg['products']['core-fabric'], next(m for m in cfg['wikiMods'] if m['id'] == 'drm-fabric')]:
    for key in list(item):
        if key.startswith(('label', 'shortLabel', 'logoAlt')):
            item[key] = item[key].replace('Fabric', 'Fabric / NeoForge')
        if key.startswith('description'):
            item[key] = item[key].replace('0.2.3', '0.2.4').replace('Fabric', 'Fabric / NeoForge')
for item in [cfg['products']['drm-cobblemon-editor'], next(m for m in cfg['wikiMods'] if m['id'] == 'drm-cobblemon-editor')]:
    for key in ('description', 'description_ko'):
        item[key] = item[key].replace('Fabric 0.2.0 / NeoForge 0.1.9', 'Fabric 0.2.1 / NeoForge 0.2.0')
put('site.config.json', json.dumps(cfg, ensure_ascii=False, indent=2))

page('content/ko/102-fabric-installation.md', '설치 준비', 'installation', 30,
     'Fabric·NeoForge 1.21.1용 DRM 0.2.4의 설치 조건과 서버·클라이언트 역할입니다.',
     'core-fabric', 'getting-started', '0.2.4', '''
## 지원 환경

이 문서 묶음은 **Fabric·NeoForge 1.21.1용 DRM 0.2.4**를 함께 다룹니다. 두 로더의 제작 도구와 기본 사용 순서는 같습니다. 설치할 JAR과 의존성은 로더에 맞춰 선택합니다. Forge 1.20.1 문서는 별도 항목입니다.

| 항목 | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 정확히 `1.21.1` | 정확히 `1.21.1` |
| Java | `21` 이상 | `21` |
| 로더 | Fabric Loader `0.18.0` 이상, 현재 빌드 `0.19.3` | NeoForge `21.1` 이상, 현재 빌드 `21.1.216` |
| Fabric API | `0.116.11+1.21.1` 이상, 현재 빌드 `0.116.13+1.21.1` | 설치하지 않습니다. |
| CustomNPCs | Fabric `1.0.0`, 필수 | NeoForge `1.21.1` 호환 빌드, 필수 |
| DRM | `dochi_rpg_maker-0.2.4-fabric-1.21.1.jar` | `dochi_rpg_maker-0.2.4-neoforge-1.21.1.jar` |

모드 ID와 리소스 네임스페이스는 두 로더 모두 `dochi_rpg_maker`입니다. 서버와 모든 클라이언트에 같은 로더의 같은 버전 JAR을 설치합니다.

## 선택 연동 모드

| 모드 | 사용할 기능 |
| --- | --- |
| GeckoLib | GeckoLib NPC 모델과 애니메이션. Fabric은 `4.8.4` 이상, NeoForge는 `4.9` 이상인 해당 로더 빌드를 사용합니다. |
| Mod Menu | Fabric 모드 목록에서 DRM의 `Mods Config` 화면을 열 때 사용합니다. |
| Player Animator | NeoForge의 플레이어 애니메이션 공급자 연동에 사용하는 선택 모드입니다. |
| FTB Quests | `ftb`, `ftb_task` 조건과 FTB 퀘스트·태스크 완료 액션에 필요합니다. |
| CobbleDollars | 서버 콘텐츠나 애드온에서 CobbleDollars 결제를 선택했을 때 필요합니다. |
| Dochi Cobblemon Editor | 트레이너 배틀·포켓마트·치료·스타터 선택·트레이너 승리 퀘스트를 추가하는 별도 애드온입니다. |

CustomNPCs는 DRM의 필수 의존성입니다. 그 외 연동 모드는 사용할 기능에 맞춰 설치합니다. Cobblemon 콘텐츠는 [코블몬 에디터 설치](#drm-cobblemon-editor/cobblemon-editor-setup)를 따릅니다.

## 설치 절차

1. Minecraft 1.21.1 인스턴스를 만들고 Fabric 또는 NeoForge를 선택합니다.
2. 서버와 클라이언트의 `mods`에 같은 로더의 DRM 0.2.4와 CustomNPCs를 넣습니다. Fabric에는 Fabric API도 넣습니다.
3. 서버 또는 월드를 한 번 실행해 `config/dochi_rpg_maker`를 생성합니다.
4. 크리에이티브 또는 권한 레벨 2 이상으로 코어 아이템을 준비합니다.
5. 코어 아이템으로 에디터 선택 화면을 열고 필요한 제작 도구를 선택합니다.

CustomNPCs 크리에이티브 탭에서 아이템을 찾거나 다음 명령으로 받을 수 있습니다.

```text
/give @s dochi_rpg_maker:dialogue_editor
/give @s dochi_rpg_maker:remnant_msg_setter
/give @s dochi_rpg_maker:npc_spawner
```

## 서버와 클라이언트 역할

| 위치 | 담당 |
| --- | --- |
| 서버 | JSON 저장, 편집 권한, NPC 바인딩, 조건·액션, 상점 거래·재고, 화폐, 퀘스트 진행도, 스포너와 Remnant 마커 상태 |
| 클라이언트 | 제작 에디터, 검색 선택기, GUI Maker 미리보기, 플레이어 런타임 화면과 HUD |

멀티플레이에서는 **서버의** `config/dochi_rpg_maker`가 기준입니다. 클라이언트의 동명 JSON만 고쳐서는 서버 콘텐츠가 바뀌지 않습니다.

## 업데이트 전 백업

`config/dochi_rpg_maker`와 월드 저장 폴더를 함께 백업합니다. NPC 바인딩, 퀘스트 진행도, NPC Spawner의 블록 상태·리스, Remnant 마커는 월드 쪽에도 저장됩니다.

기본 대화·GUI·상점·텔레포터와 샘플은 시작 시 번들 기본본으로 다시 설치될 수 있습니다. 커스텀 콘텐츠는 `Save As`로 새 파일을 만들고 그 파일을 연결하세요.

0.2.4는 재입고 시간 기준을 전달하므로 서버와 모든 클라이언트를 함께 교체해야 합니다. 다른 로더의 JAR을 같은 인스턴스에 넣지 않습니다.
''')

page('content/en/102-fabric-installation.md', 'Installation', 'installation', 30,
     'Requirements and client/server roles for DRM 0.2.4 on Fabric and NeoForge 1.21.1.',
     'core-fabric', 'getting-started', '0.2.4', '''
## Supported environment

This documentation covers **DRM 0.2.4 for Fabric and NeoForge 1.21.1** together. Both use the same authoring tools and normal workflow. Choose the JAR and dependencies for your loader. Forge 1.20.1 has its own documentation entry.

| Item | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | Exactly `1.21.1` | Exactly `1.21.1` |
| Java | `21` or newer | `21` |
| Loader | Fabric Loader `0.18.0`+, built with `0.19.3` | NeoForge `21.1`+, built with `21.1.216` |
| Fabric API | `0.116.11+1.21.1`+, built with `0.116.13+1.21.1` | Not used. |
| CustomNPCs | Fabric `1.0.0`, required | Compatible NeoForge `1.21.1` build, required |
| DRM | `dochi_rpg_maker-0.2.4-fabric-1.21.1.jar` | `dochi_rpg_maker-0.2.4-neoforge-1.21.1.jar` |

Both builds keep the mod ID and resource namespace `dochi_rpg_maker`. Install the same version for the same loader on the server and every client.

## Optional integrations

| Mod | Purpose |
| --- | --- |
| GeckoLib | GeckoLib NPC models and animation. Use Fabric `4.8.4`+ or NeoForge `4.9`+ for the matching loader. |
| Mod Menu | Opens DRM's `Mods Config` from the Fabric mod list. |
| Player Animator | Optional player-animation provider integration on NeoForge. |
| FTB Quests | Needed for `ftb`, `ftb_task`, and FTB quest/task completion actions. |
| CobbleDollars | Needed when server content or an addon selects CobbleDollars payments. |
| Dochi Cobblemon Editor | Separate addon for trainer battles, markets, healing, starters, and trainer-victory quests. |

CustomNPCs is required by DRM. Install other integrations for the features you use. Follow [Cobblemon Editor setup](#drm-cobblemon-editor/cobblemon-editor-setup) for Pokémon content.

## Installation

1. Prepare a Minecraft 1.21.1 instance with Fabric or NeoForge.
2. Add matching-loader DRM 0.2.4 and CustomNPCs to the server and client `mods` folders. Add Fabric API on Fabric.
3. Start the server or world once to create `config/dochi_rpg_maker`.
4. In Creative mode or with permission level 2, obtain the Core item.
5. Open the editor selector with that item and choose an authoring tool.

Find these items in the CustomNPCs creative tab or use:

```text
/give @s dochi_rpg_maker:dialogue_editor
/give @s dochi_rpg_maker:remnant_msg_setter
/give @s dochi_rpg_maker:npc_spawner
```

## Client and server responsibilities

| Side | Responsibility |
| --- | --- |
| Server | JSON storage, editing permissions, NPC bindings, conditions/actions, shop trades/stock, currency, quest progress, spawners, and Remnant marker state |
| Client | Authoring screens, searchable pickers, GUI Maker previews, player runtime screens, and HUD rendering |

In multiplayer, the **server's** `config/dochi_rpg_maker` is authoritative. Editing a similarly named client file does not update server content.

## Updating

Back up `config/dochi_rpg_maker` and the world together. NPC bindings, quest progress, NPC Spawner block state/leases, and Remnant markers also live in the world.

Bundled dialogue, GUI, shop, Teleporter, and sample files may be refreshed at startup. Use `Save As` for custom files and link those copies.

0.2.4 transmits the selected restock clock, so update the server and every client together. Use only the JAR for your instance's loader.
''')

page('content/ko/110-fabric-loader-compatibility.md', '로더별 설치와 데이터 이동', 'loader-compatibility', 45,
     'Forge와 Fabric·NeoForge 공용 문서의 범위, 설치 기준과 데이터 이동 방법입니다.',
     'core-fabric', 'getting-started', '0.2.4', '''
## 문서 범위

**Fabric·NeoForge 1.21.1은 이 문서 묶음을 함께 사용합니다.** 대화, NPC Shop, GUI Maker, 화폐, HUD, 퀘스트, Scene Maker와 Core NPC Spawner의 제작 순서는 같습니다. 로더를 고르면 설치 파일과 플랫폼 의존성만 해당 빌드에 맞춥니다.

Forge 1.20.1은 별도 문서 묶음입니다. 사이트 주소의 `core-fabric`은 기존 링크를 유지하기 위한 식별자이며 NeoForge 사용자도 이 항목을 이용합니다.

## 설치 기준

| 로더 | Minecraft | DRM | Java | 필수 NPC 모드 |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.2.1 | 17 | CustomNPCs 1.20.1 호환 빌드 |
| Fabric | 1.21.1 | 0.2.4 | 21 | CustomNPCs Fabric 1.0.0 |
| NeoForge 21.1+ | 1.21.1 | 0.2.4 | 21 | CustomNPCs NeoForge 1.21.1 호환 빌드 |

Fabric에는 Loader 0.18.0 이상과 Fabric API 0.116.11+1.21.1 이상도 필요합니다. 자세한 설치 파일과 선택 의존성은 [설치 준비](#core-fabric/installation)에 있습니다.

## 제작 데이터 이동

제작 데이터 루트는 `config/dochi_rpg_maker`입니다. 서버 JSON이 원본이며 NPC 바인딩과 플레이어 진행도 같은 실행 상태는 월드에도 저장됩니다.

1. 현재 config와 월드를 함께 백업합니다.
2. 대상 로더의 DRM과 의존성으로 별도 인스턴스를 준비합니다.
3. config 복사본에서 사용자 문서를 불러옵니다.
4. 참조하는 아이템·엔티티·모델·애니메이션이 대상 로더에도 설치되어 있는지 확인합니다.
5. 대화, 구매·판매·재입고, 퀘스트 보상과 재접속 후 상태를 확인합니다.

제작 기능을 함께 안내하더라도 Minecraft/모드 ID와 CustomNPCs 월드 데이터가 자동 변환되지는 않습니다. Core의 `dochi_rpg_maker:npc_spawner`와 별도 Spawn Control 애드온의 스포너 문서는 각각의 경로에서 사용합니다.

## 퀘스트 직접 제어

Fabric·NeoForge에서 권한 레벨 2로 사용합니다.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start`는 선행 조건 등을 건너뛰는 관리자 시작입니다. `complete`는 미지급 보상을 지급하는 강제 완료입니다. 전체 `reset`은 진행·보상 기록을 지우며, 이미 받은 아이템·화폐는 회수하지 않습니다. 목표 하나의 초기화는 다른 목표와 보상 지급 기록을 유지합니다.

현재 두 로더의 에디터에서 만드는 퀘스트는 자동 완료를 사용합니다. 구형 JSON의 `completionMode: turn_in`을 이관할 때는 Fabric이 제출 대기를 유지하고 NeoForge는 자동 완료하므로, 목표 달성 후 보상 시점을 확인하세요. 이 항목은 기존 데이터 이관 참고 사항입니다.
''')

page('content/en/110-fabric-loader-compatibility.md', 'Loader setup and data migration', 'loader-compatibility', 45,
     'Scope of Forge and shared Fabric/NeoForge docs, installation, and moving existing data.',
     'core-fabric', 'getting-started', '0.2.4', '''
## Documentation scope

**Fabric and NeoForge 1.21.1 share this documentation.** Dialogue, NPC Shop, GUI Maker, currency, HUD, quests, Scene Maker, and Core NPC Spawner use the same normal authoring workflow. Select the matching JAR and platform dependencies for your loader.

Forge 1.20.1 has a separate documentation entry. The existing `core-fabric` route remains for link compatibility and also serves NeoForge readers.

## Installation requirements

| Loader | Minecraft | DRM | Java | Required NPC mod |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.2.1 | 17 | Compatible CustomNPCs 1.20.1 build |
| Fabric | 1.21.1 | 0.2.4 | 21 | CustomNPCs Fabric 1.0.0 |
| NeoForge 21.1+ | 1.21.1 | 0.2.4 | 21 | Compatible CustomNPCs NeoForge 1.21.1 build |

Fabric also requires Loader 0.18.0+ and Fabric API 0.116.11+1.21.1+. See [Installation](#core-fabric/installation) for files and optional integrations.

## Moving authoring data

Authoring documents use `config/dochi_rpg_maker`. Server JSON is authoritative; runtime state such as NPC bindings and player progress also lives in the world.

1. Back up config and the world together.
2. Prepare a separate instance with the destination loader's DRM and dependencies.
3. Load copies of your custom documents.
4. Check that referenced items, entities, models, and animations exist on that loader.
5. Test dialogue, buying/selling/restocking, quest rewards, and reconnect persistence.

Shared authoring guidance does not automatically convert Minecraft/mod IDs or CustomNPCs world data. Core's `dochi_rpg_maker:npc_spawner` and the separate Spawn Control addon's spawner documents each use their own data paths.

## Direct quest controls

Available on Fabric and NeoForge with permission level 2.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start` bypasses normal availability gates. `complete` forces completion and grants unclaimed rewards. Whole-quest `reset` clears progress and reward records; it does not reclaim granted items or currency. Resetting one objective retains sibling progress and reward history.

Quests created in the current editor use automatic completion on both loaders. When migrating older JSON with `completionMode: turn_in`, Fabric retains manual turn-in while NeoForge completes automatically. Check the reward timing when importing that legacy data.
''')

GUI_KO = '''
## 스프라이트 배율과 이미지 반복

이 설정은 GUI Maker로 저장한 **플레이어 런타임 화면**에 적용됩니다. 제작 에디터의 상단바 크기를 바꾸는 설정은 아닙니다.

`Default UI Settings`에서 스프라이트를 사용하는 화면의 공통 설정을 정합니다.

| 설정 | 동작 |
| --- | --- |
| `Tile` | 스프라이트 무늬를 반복해 패널·버튼을 채웁니다. |
| `Stretch` | 무늬를 표시 영역에 맞춰 늘립니다. |
| `Sprite Scale %` | 숫자를 직접 입력합니다. 범위는 50–400%, 기본은 100%입니다. `125.5` 같은 소수도 사용할 수 있습니다. |

일반 이미지의 반복은 **선택한 컴포넌트의 Inspector**에서 설정합니다.

1. 반복할 이미지 컴포넌트를 선택하고 이미지 에셋을 지정합니다.
2. `Fit`을 `Tile`로 선택합니다.
3. 표시되는 `Tile W %`와 `H %`에 한 장의 가로·세로 크기를 입력합니다. 각 범위는 10–800%, 기본은 100%입니다.
4. 예를 들어 가로 200%, 세로 50%는 한 장을 두 배 넓고 절반 높게 반복합니다. 컴포넌트의 전체 `w`·`h`는 바꾸지 않습니다.
5. `Save As`로 사용자 GUI를 저장하고 대화·상점 등 실제 사용 화면에 연결합니다.

타일 비율은 **컴포넌트별** 설정입니다. 옆 이미지에는 영향을 주지 않습니다. `Fit`을 Stretch 또는 Contain으로 바꾸면 비율 입력칸이 숨겨지며, Tile로 돌아오면 저장한 비율을 다시 사용합니다. 미리보기와 실제 대화 화면은 같은 Tile 설정을 읽습니다.

## JSON 참고: 반복 설정

GUI 루트의 `spriteFillMode`는 `tile` 또는 `stretch`, `spriteScale`은 0.5–4.0입니다. 개별 요소의 `imageFit: tile`, `tileWidthRatio`, `tileHeightRatio`가 이미지 반복과 축별 비율을 저장합니다. 100%는 JSON 값 `1.0`입니다.

구형 루트에 들어 있던 타일 비율은 미지정 컴포넌트의 초기값으로 읽고 다음 저장 때 각 요소에 기록합니다. 새 문서의 타일 가로·세로 비율을 글로벌 기본 UI 값으로 작성하지 마세요.
'''
GUI_EN = '''
## Sprite scale and tiled images

These settings affect the **player runtime layout** saved by GUI Maker. They do not resize the authoring editor's toolbar.

Use `Default UI Settings` for the shared sprite appearance.

| Setting | Behavior |
| --- | --- |
| `Tile` | Repeats the sprite pattern to fill panels and buttons. |
| `Stretch` | Stretches the pattern across the surface. |
| `Sprite Scale %` | Enter a number directly: 50–400%, default 100%. Decimals such as `125.5` are supported. |

For an ordinary image, use the **selected component's Inspector**.

1. Select the image component and assign its asset.
2. Set `Fit` to `Tile`.
3. Enter `Tile W %` and `H %`. Each axis accepts 10–800%, default 100%.
4. For example, 200% width and 50% height repeats a tile twice as wide and half as tall. The component's overall `w` and `h` stay the same.
5. Use `Save As` for a custom GUI and connect it to the dialogue, shop, or other runtime screen.

Tile proportions belong to **one component** and do not alter neighboring images. Stretch or Contain hides the ratio fields; switching back to Tile restores the stored ratios. Preview and live dialogue use the same Tile settings.

## JSON reference: repetition settings

At GUI root, `spriteFillMode` is `tile` or `stretch`, and `spriteScale` is 0.5–4.0. Each element stores `imageFit: tile`, `tileWidthRatio`, and `tileHeightRatio`. A JSON ratio of `1.0` means 100%.

Legacy root ratios become initial values for components without explicit ratios and are written to each element on the next save. New tile width/height ratios belong to elements rather than global UI defaults.
'''
RESTOCK_KO = '''
## 재입고 시간 기준 설정

구매 상품을 선택하고 상품 상세의 **RESTOCK**에서 `Timer basis`를 고릅니다. 선택기는 상품 상세 안에 있지만 **상점 전체에 하나의 기준**을 저장합니다. 같은 상점의 상품마다 서로 다른 시계를 설정하지 않습니다.

| Timer basis | 시간 계산 |
| --- | --- |
| `Real ticks` | 서버에서 실제로 진행한 게임 틱을 셉니다. 잠으로 건너뛴 시간은 더하지 않습니다. 기본값입니다. |
| `World ticks` | 오버월드의 날짜·시간을 사용합니다. 잠으로 건너뛴 시간도 재입고에 반영합니다. |

`Real ticks`는 컴퓨터의 실제 시각이나 서버가 꺼져 있던 시간을 세는 방식이 아닙니다. 정상 20 TPS에서 24000틱은 약 20분이며, 서버가 느려지거나 정지하면 실제 대기시간도 달라집니다.

재입고를 켜려면 유한 `stock`과 양수 `maxStock`, `amount`, `intervalTicks`를 설정합니다. 재고가 최대치 아래로 내려가면 타이머가 시작됩니다. 시간이 지나면 수량을 채우되 최대 재고를 넘기지 않으며, 오래 닫혀 있던 상점은 지나간 주기를 반영할 수 있습니다.

시간 기준을 바꾸거나 `/time set` 등으로 시간이 뒤로 가면 남은 대기시간을 새 기준에 맞춰 다시 잡습니다. `nextGameTime`은 선택한 기준의 서버 관리 시각이므로 제작자가 직접 계산하지 않습니다.

JSON 참고: 상점 루트의 `restockTimeMode`는 `real_ticks` 또는 `world_ticks`입니다. 상품의 `restock`에는 활성화·수량·간격 설정이 있습니다. 매입 상품과 무제한 재고에는 재입고를 적용하지 않습니다.
'''
RESTOCK_EN = '''
## Choosing the restock clock

Select a buy product and find `Timer basis` in its **RESTOCK** details. Although the control appears in product details, it selects **one clock for the entire shop**. Products in the same shop do not choose separate clocks.

| Timer basis | Time source |
| --- | --- |
| `Real ticks` | Counts game ticks actually processed by the server. Sleep skips do not count. This is the default. |
| `World ticks` | Uses Overworld date/time. Sleep skips count toward restocking. |

`Real ticks` does not count wall-clock time or time while the server is stopped. At normal 20 TPS, 24000 ticks is about 20 minutes; slowdown or a paused server changes the real wait.

Enable restocking with finite `stock` and positive `maxStock`, `amount`, and `intervalTicks`. The timer starts below maximum stock. Due restocks add units without exceeding the maximum; a shop closed for several intervals can catch up.

Changing the clock or moving time backward with `/time set` rebases the remaining cooldown. `nextGameTime` is a server-managed deadline in the selected clock, so do not calculate it by hand.

JSON reference: root `restockTimeMode` is `real_ticks` or `world_ticks`. Product `restock` stores enabled state, amount, and interval. Sell offers and unlimited stock do not restock.
'''

for locale, gui, restock in [('ko', GUI_KO, RESTOCK_KO), ('en', GUI_EN, RESTOCK_EN)]:
    for filename, version in [('05-gui-system.md','0.2.1'), ('105-fabric-gui-system.md','0.2.4')]:
        rel = f'content/{locale}/{filename}'
        append(rel, gui)
        put(rel, re.sub(r'^version: .+$', f'version: {version}', read(rel), count=1, flags=re.M))
    for filename, version in [('07-shop-system.md','0.2.1'), ('107-fabric-shop-system.md','0.2.4')]:
        rel = f'content/{locale}/{filename}'
        append(rel, restock)
        put(rel, re.sub(r'^version: .+$', f'version: {version}', read(rel), count=1, flags=re.M))
    if locale == 'ko':
        replace('content/ko/07-shop-system.md', '유한 재고 상품은 `maxStock`과 `restock.enabled`, `amount`, `intervalTicks`, `nextGameTime`으로 월드 게임 시간 기준 재입고를 구성할 수 있습니다.', '유한 재고 상품은 `maxStock`과 `restock.enabled`, `amount`, `intervalTicks`로 재입고를 구성합니다. 시간은 상점의 `Timer basis`를 따르며 다음 예정 시각은 서버가 관리합니다.')
        replace('content/ko/107-fabric-shop-system.md', '유한 재고 상품은 `maxStock`과 `restock.enabled`, `amount`, `intervalTicks`, `nextGameTime`으로 월드 게임 시간 기준 재입고를 구성할 수 있습니다.', '유한 재고 상품은 `maxStock`과 `restock.enabled`, `amount`, `intervalTicks`로 재입고를 구성합니다. 시간은 상점의 `Timer basis`를 따르며 다음 예정 시각은 서버가 관리합니다.')

# Forge stock now belongs to each NPC, while the shared 1.21.1 implementation
# still writes file-backed runtime stock to JSON.
replace('content/ko/07-shop-system.md', '파일 기반 재입고 결과도 서버 JSON에 저장되며 열려 있는 상점 화면에 갱신됩니다.', '실행 중 재고와 재입고 예정 시각은 개별 NPC의 NBT에 저장되며 열려 있는 같은 NPC의 상점 화면에 갱신됩니다. 원본 상점 JSON은 초기 재고·상품·재입고 설정을 보관합니다.')
replace('content/en/07-shop-system.md', 'Restock changes persist to file-based shops and are pushed to live viewers.', 'Runtime stock and deadlines persist in each NPC\'s NBT and update viewers of that NPC. The source shop JSON stores initial stock, products, and restock configuration.')
replace('content/en/07-shop-system.md', ''':::warning File-Based Stock
Finite stock in file-based shops may be written back to the shop JSON after trades. When editing production shop files by hand, check whether the server is running and how reload policy is configured.
:::''', '''## Initial stock and NPC state

Forge 0.2.1 stores runtime stock and restock deadlines per NPC. Two NPCs using the same shop JSON keep separate stock. Reconnecting preserves that NPC's state; a new world or a copied NPC starts from the definition.

Keep stable `productId` values when editing prices or reordering products. Changing initial stock, restock settings, or the product definition resets that product's runtime state. Exported definitions omit server-managed deadlines. Existing JSON stock becomes the initial value; older stock overwritten by past purchases cannot be reconstructed automatically.''')
append('content/ko/07-shop-system.md', '''## 초기 재고와 NPC별 상태

Forge 0.2.1은 같은 상점 JSON을 연결한 NPC라도 각자 재고를 가집니다. 같은 NPC의 여러 이용자는 그 NPC의 재고를 함께 사용합니다. 재접속 후에는 유지되며 새 월드·복제 NPC는 정의의 초기값으로 시작합니다.

가격이나 상품 순서만 바꿀 때는 안정적인 `productId`를 유지하세요. 초기 재고·재입고 설정·상품 정의를 바꾸면 해당 상품 상태를 새 정의로 초기화합니다. 정의 저장·내보내기에서는 서버 관리 예정 시각을 제외합니다. 구형 JSON의 재고는 초기값으로 사용하므로 과거 구매로 이미 줄어든 원래 재고를 자동 복원하지는 않습니다.''')
replace('content/ko/19-shop-editor-items.md', '유한 재고 상품을 구매하면 상점 JSON의 재고 값이 줄어듭니다. 파일 기반 상점이면 서버 JSON 파일의 재고가 기준이 됩니다.', 'Forge 0.2.1에서 유한 재고를 구매하면 해당 NPC의 실행 재고가 줄어듭니다. 원본 JSON의 `stock`은 초기 재고이며, 실행 중 재고와 재입고 예정 시각은 개별 NPC NBT에 저장됩니다. 같은 JSON을 쓰는 다른 NPC는 별도 재고를 가집니다.')
append('content/ko/19-shop-editor-items.md', '[재입고 시간 기준](#core/shop-system)에서 RESTOCK의 `Timer basis`와 잠으로 건너뛴 시간의 처리 방법을 확인하세요.')
put('content/ko/19-shop-editor-items.md', re.sub(r'^version: .+$', 'version: 0.2.1', read('content/ko/19-shop-editor-items.md'), count=1, flags=re.M))

# Both current editors author automatic quests; loader-specific legacy handling
# is confined to migration reference rather than presented as separate products.
replace('content/ko/118-fabric-quest-system.md', '| 완료 | 목표 달성 후 제출하거나 자동 완료 |', '| 완료 | 현재 에디터에서 만든 퀘스트는 목표 달성 후 자동 완료 |')
replace('content/ko/118-fabric-quest-system.md', '일반 자동 완료와 관리자 강제 완료를 구분하세요. Fabric은 `automatic` 또는 `turn_in`을 따릅니다. 제출 방식은 목표를 채워도 제출 준비 상태로 남고, 명시적으로 제출해야 보상을 받습니다. 현재 NeoForge는 자동 완료입니다.', '현재 Fabric·NeoForge의 에디터에서 만드는 퀘스트는 자동 완료를 사용합니다. 목표 달성으로 완료하는 일반 흐름과 조건을 건너뛰는 관리자 `quest_complete`를 구분하세요. 구형 제출 방식 JSON의 이관은 [로더별 데이터 이동](#core-fabric/loader-compatibility)을 참고합니다.')
replace('content/en/118-fabric-quest-system.md', '| Completion | Turn in after objectives or complete automatically |', '| Completion | Quests authored by the current editor complete automatically after objectives |')
replace('content/en/118-fabric-quest-system.md', 'Distinguish normal completion from forced completion. Fabric honors `automatic` or `turn_in`: a manual quest remains ready until explicitly submitted. Current NeoForge completes automatically.', 'The current Fabric and NeoForge editors author automatic quests. Distinguish completion through objectives from the administrator\'s forced `quest_complete`. See [data migration](#core-fabric/loader-compatibility) for older turn-in JSON.')
append('content/ko/118-fabric-quest-system.md', '''## Save As로 팩 복사하기

새 팩 ID를 입력하고 저장합니다. 퀘스트마다 목표가 있어야 하며, 팩 ID가 잘못되었거나 이미 존재하는 ID와 겹치면 저장을 수정해야 합니다. 같은 팩 안의 `팩ID:퀘스트ID` 참조와 외부 팩 참조를 확인하고, 저장에 성공한 복사본을 불러온 뒤 수락·완료·보상을 시험하세요. 표시 이름을 바꾸는 것과 팩 ID를 바꾸는 것은 다른 작업입니다.''')
append('content/en/118-fabric-quest-system.md', '''## Copying a pack with Save As

Enter a new pack ID and save. Each quest needs objectives; invalid or already-used pack IDs must be corrected. Check `pack:quest` references within the copy and references to other packs, then load the saved copy and test acceptance, completion, and rewards. Changing the display name is separate from changing the pack ID.''')
replace('content/ko/56b-cobblemon-trainer-quests.md', 'Fabric과 NeoForge DRM의 완료 정책 차이는 [로더별 안내](#core-fabric/loader-compatibility)를 확인하세요. 목표의 승리 횟수와 퀘스트 전체의 완료·보상 처리는 별개입니다.', '현재 두 로더의 DRM Quest Editor에서 만든 퀘스트는 자동 완료를 사용합니다. 필요한 승리 횟수를 채워도 다른 목표가 남아 있으면 퀘스트 전체는 완료되지 않습니다. 기존 제출 방식 JSON의 이관은 [데이터 이동 안내](#core-fabric/loader-compatibility)를 확인하세요.')

INVENTORY_KO = '''
## 일반 인벤토리에 커스텀 아이템 넣기

`General > General Item Inv`에서 Trainer 전체가 공유하는 인벤토리를 엽니다.

1. `Items`에서 등록 아이템의 기본 스택을 검색하거나 `My Inventory`에서 현재 플레이어가 가진 실제 스택을 고릅니다.
2. `Add selected`로 추가합니다. `My Inventory`는 아이템을 복사하며 플레이어의 원본을 소비하지 않습니다.
3. `Quantity`를 1–99로 정하고 문서를 저장합니다. 최대 64개 항목입니다.
4. 같은 아이템 ID라도 이름·인챈트·커스텀 데이터 등 컴포넌트가 다르면 별도 항목으로 보관할 수 있습니다.

수량을 바꿔도 NBT와 컴포넌트를 유지합니다. 데이터가 붙은 항목의 Item ID는 직접 바꾸지 않고 목록에서 다른 아이템을 선택합니다. 데이터가 잘못되거나 너무 크면 복사를 거부하므로 일반 아이템으로 바꿔 저장된 것으로 생각하지 마세요.

이 인벤토리는 기믹 키 아이템 보유를 검사하며 소비하지 않습니다. 라운드 AI가 사용하는 회복·배틀 아이템 가방인 `Trainer Items`와 구분합니다.

JSON 참고: Trainer 스키마는 계속 `23`입니다. 일반 인벤토리 항목에 `componentsSnbt`를 저장하고 기존 `components` 데이터도 읽습니다. 새 기능을 쓰기 위해 `schemaVersion`을 직접 바꿀 필요는 없습니다.
'''
INVENTORY_EN = '''
## Adding custom items to General Inventory

Open `General > General Item Inv` for the inventory shared by the whole Trainer.

1. Search `Items` for a registered default stack, or select a real player stack from `My Inventory`.
2. Choose `Add selected`. `My Inventory` copies the stack without consuming the player's item.
3. Set `Quantity` to 1–99 and save the trainer. The inventory holds up to 64 entries.
4. Stacks with the same item ID but different names, enchantments, or custom components can remain separate entries.

Quantity edits preserve NBT and components. For an entry with stored data, choose another item from the list instead of editing its Item ID. Invalid or oversized data is rejected rather than silently replaced with a plain item.

This inventory checks gimmick-key possession without consuming the keys. It is separate from `Trainer Items`, the round AI's healing/battle bag.

JSON reference: the Trainer schema remains `23`. General entries store `componentsSnbt` and still read older `components` data. Do not change `schemaVersion` by hand to enable the feature.
'''
for locale, inventory in [('ko', INVENTORY_KO), ('en', INVENTORY_EN)]:
    append(f'content/{locale}/52-cobblemon-trainer-editor.md', inventory)
    append(f'content/{locale}/55-cobblemon-files-troubleshooting.md', '''## 일반 인벤토리 데이터 확인

`My Inventory` 복사 후 저장·다시 불러오기에서 아이템 이름과 커스텀 데이터를 확인하세요. 수량만 바꿨는데 이름·인챈트·데이터가 사라진다면 일반 Item ID로 새 항목을 만든 것인지 확인하고 원본 스택에서 다시 선택합니다. 잘못된 데이터 또는 크기 제한으로 복사가 거부된 항목은 문서에 추가되지 않습니다.''' if locale == 'ko' else '''## Checking copied inventory data

After copying from `My Inventory`, save and reload the trainer and check the item name and custom data. If a quantity edit appears to lose those details, check whether you created a plain Item ID entry instead, then select the original stack again. A copy rejected for invalid or oversized data is not added to the document.''')
append('content/ko/58-cobblemon-trainer-ai-party-items.md', INVENTORY_KO)
page('content/en/58-cobblemon-trainer-ai-party-items.md', 'Trainer AI, parties, and items', 'cobblemon-trainer-ai-party-items', 580,
     'AI engines, random parties, and the distinction between general inventory and round battle items.',
     'drm-cobblemon-editor', 'trainer', 'Fabric 0.2.1 / NeoForge 0.2.0', '''
## Choosing the AI engine

| Engine | Use |
| --- | --- |
| `DRM Strategy` | DRM tuning, strategy plans, Trainer Items, and trainer gimmick decisions. |
| `RCT` | Optional RCT provider. Requires a compatible RCT API installation. |
| `Cobblemon Strong` | Cobblemon's built-in strong AI. |

DRM Strategy works without RCT. RCT absence or call errors are handled at the addon boundary; they do not make RCT a required dependency. DRM's round item bag and gimmick plan apply to DRM Strategy.

Start with a preset, then change one AI value or strategy at a time and compare using the same party and battle rules. Move selection, switching, and item timing also depend on the current battle state.

## Random Party

Configure party size, level, generations, types, evolution stage, legendary/mythical eligibility, duplicate species, Shiny chance, IV/EV settings, and automatic nature/ability/move choices. Candidates come from the installed Cobblemon registry. Relax filters if there are too few candidates.

A fixed seed is reproducible within the same mod/datapack/registry setup. Changing available species can change the result.

## Trainer Items

The round's virtual battle bag holds up to 16 item types, each with quantity 1–99. It is recreated for each battle and uses DRM Strategy; it does not remove items from the NPC's physical inventory.

Use recovery, status cure, revival, PP recovery, or stat-boost items. Item-use frequency, healing HP threshold, early boost turns, and permitted recovery categories control when the AI considers them. Supplying an item does not guarantee use on the first turn.

## Trainer gimmicks

Configure the round's Mega, Dynamax, Z-Move, Tera, or Omni equipment and policy. Put the appropriate key item in General Inventory and prepare Pokémon held items, Tera type, Dynamax level, or Gigantamax factor where required. These integrations need a compatible Mega Showdown installation.

Equipment and battle-rule permissions are separate. A forbidden gimmick stays forbidden even when its key item is present. See [Battle Rules](#drm-cobblemon-editor/cobblemon-battle-rules).
''' + INVENTORY_EN)

for locale in ('ko','en'):
    append(f'content/{locale}/51-cobblemon-editor-setup.md', '''## 에디터 뒤로·앞으로 이동

공용 상단바의 화살표는 DRM 코어와 애드온 에디터 사이의 화면 방문 기록을 이동합니다. 이동할 기록이 없으면 아이콘은 비활성 상태로 남습니다. 화면 이동은 파일 저장이나 NPC Apply가 아니므로 작업을 마친 문서는 `Save` 또는 `Save As`로 저장하세요.''' if locale == 'ko' else '''## Back and Forward in editors

The shared toolbar arrows follow screen history across DRM Core and addon editors. An arrow remains visible but disabled when there is no destination. Navigation is separate from saving a file or applying it to an NPC; finish with `Save` or `Save As`.''')
    append(f'content/{locale}/54-cobblemon-pokemart.md', '''## DRM 결제 선택과 금액 제한

결제 선택기는 DRM 화폐 정의와 인벤토리 아이템을 구분합니다. `drm`에는 Currency Editor의 화폐 ID, `item`에는 아이템 ID와 필요하면 NBT·컴포넌트 조건을 저장합니다. 한 종류를 선택한 뒤 상품 구매와 경매 수수료·입찰·정산에 같은 결제 수단이 사용되는지 확인하세요.

PokéMart 가격은 내부에서 큰 정수로 읽지만 DRM·아이템 결제는 Core의 64비트 정수 범위 안에서만 처리합니다. 그 범위를 넘는 금액은 거부하며 작은 값으로 잘라 결제하지 않습니다. CobbleDollars 공급자는 해당 API의 큰 정수 잔액을 사용합니다.''' if locale == 'ko' else '''## DRM payment selection and amount limits

The payment picker distinguishes DRM currency definitions from inventory items. Provider `drm` stores a Currency Editor ID; `item` stores an item ID and optional NBT/component matching. Check the chosen payment for sales and auction fees, bids, and settlements.

PokéMart reads prices as large integers, but DRM/item payments must fit Core's signed 64-bit integer range. Amounts above that range are rejected rather than truncated. The CobbleDollars provider uses its API's large-integer balances.''')

for locale in ('ko','en'):
    for filename, version in [('09-json-reference.md','0.2.1'),('109-fabric-json-reference.md','0.2.4')]:
        rel=f'content/{locale}/{filename}'
        append(rel, '''## 현재 반복·재입고 설정 참고

GUI 루트의 `spriteFillMode`·`spriteScale`과 요소별 `imageFit`·`tileWidthRatio`·`tileHeightRatio`는 [GUI Maker](#PRODUCT/gui-system)를 따릅니다. NPC Shop 루트의 `restockTimeMode`는 `real_ticks` 또는 `world_ticks`이며 [재입고 안내](#PRODUCT/shop-system)를 따릅니다. 예정 시각은 런타임이 관리하므로 새 정의에 임의 시각을 넣지 않습니다.''' .replace('PRODUCT','core' if filename=='09-json-reference.md' else 'core-fabric') if locale=='ko' else '''## Current repetition and restock fields

GUI root `spriteFillMode`/`spriteScale` and element `imageFit`/`tileWidthRatio`/`tileHeightRatio` follow [GUI Maker](#PRODUCT/gui-system). NPC Shop root `restockTimeMode` is `real_ticks` or `world_ticks`; follow the [restock guide](#PRODUCT/shop-system). Deadlines are runtime-managed, so do not supply arbitrary times in new definitions.'''.replace('PRODUCT','core' if filename=='09-json-reference.md' else 'core-fabric'))
        put(rel,re.sub(r'^version: .+$',f'version: {version}',read(rel),count=1,flags=re.M))
    append(f'content/{locale}/12-data-flow.md', '''## Forge 상점의 제작 데이터와 실행 상태

0.2.1에서 상점 JSON은 초기 재고와 재입고 설정을 보관하며, 실행 중 재고·예정 시각은 개별 NPC NBT에 저장합니다. 같은 JSON을 쓰는 다른 NPC는 별도 재고입니다. config와 월드를 함께 백업해야 상점 정의와 실행 상태를 모두 복원할 수 있습니다.''' if locale=='ko' else '''## Forge shop definitions and runtime state

In 0.2.1, shop JSON stores initial stock and restock configuration; runtime stock and deadlines persist in each NPC's NBT. Different NPCs using the same JSON keep separate stock. Back up config and the world together to restore both definition and runtime state.''')

# Add current release pages without renaming any historical route.
page('content/ko/00a-release-notes-0-2-1.md', 'Forge 0.2.1 업데이트', 'release-0-2-1', 7,
     'NPC별 상점 재고, 재입고 시간 기준과 GUI 타일 설정을 안내합니다.', 'core', 'getting-started','0.2.1','''
## 현재 버전

Minecraft 1.20.1 · Forge · DRM **0.2.1** 기준입니다. 서버와 모든 클라이언트의 JAR을 함께 교체하고 `config/dochi_rpg_maker`와 월드를 백업하세요.

## NPC Shop

- 실행 재고와 다음 재입고 시각을 개별 NPC NBT에 보관합니다. 같은 JSON을 사용하는 다른 NPC는 별도 재고를 가집니다.
- JSON은 초기 재고·상품·재입고 설정을 보관하며 정의 저장·내보내기에는 실행 예정 시각을 넣지 않습니다.
- 상품 상세 `RESTOCK > Timer basis`에서 `Real ticks` 또는 `World ticks`를 선택합니다. 상점 전체에 적용하며 잠으로 건너뛴 시간을 포함할지 결정합니다.

[NPC Shop](#core/shop-system)에서 설정과 기존 재고 이관 방법을 확인하세요.

## GUI Maker

- `Default UI Settings`의 Tile/Stretch와 `Sprite Scale %` 직접 입력을 지원합니다. 배율은 50–400%입니다.
- 이미지 `Fit: Tile`에서 선택 컴포넌트의 가로·세로 비율을 각각 10–800%로 정합니다.
- 대화 런타임이 Tile 설정을 읽으며 타일 이미지의 반복·표시 처리를 개선했습니다.

[GUI Maker](#core/gui-system)에서 실제 제작 순서와 JSON 참고를 확인하세요. 기본 문서는 `Save As`로 사용자 복사본을 만들어 운영합니다.
''')
page('content/en/00a-release-notes-0-2-1.md', 'Forge 0.2.1 update', 'release-0-2-1', 7,
     'Per-NPC shop stock, restock clocks, and GUI tiling controls.', 'core','getting-started','0.2.1','''
## Current version

Minecraft 1.20.1 · Forge · DRM **0.2.1**. Update the server and all clients together and back up `config/dochi_rpg_maker` and the world.

## NPC Shop

- Runtime stock and deadlines persist per NPC in NBT. Different NPCs using the same JSON have separate stock.
- JSON keeps initial stock, products, and restock configuration; definition saves/exports omit runtime deadlines.
- Choose `Real ticks` or `World ticks` in product details under `RESTOCK > Timer basis`. The choice applies shop-wide and controls whether sleep skips count.

See [NPC Shop](#core/shop-system) for setup and legacy-stock migration.

## GUI Maker

- Tile/Stretch and direct `Sprite Scale %` input in `Default UI Settings`, with scale 50–400%.
- Per-component tile width/height from 10–800% when image `Fit` is `Tile`.
- Dialogue runtime reads Tile settings, with improved repeating-image rendering and visibility.

See [GUI Maker](#core/gui-system) for authoring and JSON reference. Use `Save As` for custom copies of bundled templates.
''')
page('content/ko/097-fabric-neoforge-release-notes-0-2-4.md', 'Fabric·NeoForge 0.2.4 업데이트', 'release-notes-0-2-4', 7,
     'Fabric·NeoForge 공용 제작 흐름, 재입고 시간 기준과 GUI 타일 설정입니다.', 'core-fabric','getting-started','0.2.4','''
## 공용 문서와 설치

Minecraft 1.21.1용 **Fabric·NeoForge DRM 0.2.4**를 같은 문서에서 안내합니다. 두 로더의 제작 도구와 기본 사용 순서는 같으며 설치할 JAR·의존성은 로더에 맞춥니다. [설치 준비](#core-fabric/installation)에서 선택하세요.

## NPC Shop

상품 상세의 `RESTOCK > Timer basis`에서 `Real ticks` 또는 `World ticks`를 선택합니다. 상점 전체가 같은 기준을 사용합니다. Real ticks는 실제 진행한 게임 틱, World ticks는 잠으로 건너뛴 시간을 포함한 월드 시간입니다.

시간 기준 변경이나 시간 역행 시 남은 대기시간을 보정합니다. 파일 기반 상점의 실행 재고·재입고 상태는 기존 JSON 저장 방식을 유지합니다. [NPC Shop](#core-fabric/shop-system)을 확인하세요.

## GUI Maker

- 스프라이트 Tile/Stretch와 `Sprite Scale %` 직접 입력, 50–400%.
- `Fit: Tile`의 컴포넌트별 `Tile W %`·`H %`, 각 10–800%.
- 미리보기와 실제 대화 화면의 Tile 설정 연결과 반복 이미지 표시 개선.

[GUI Maker](#core-fabric/gui-system)에서 설정을 확인하세요. 타일 가로·세로는 글로벌 기본 UI가 아닌 개별 컴포넌트에 저장합니다.

## 퀘스트와 애드온

현재 두 로더의 Quest Editor에서 만드는 퀘스트는 자동 완료를 사용합니다. 트레이너 승리 목표는 해당 로더의 Dochi Cobblemon Editor를 추가해 제작합니다. [퀘스트](#core-fabric/quest-system)와 [트레이너 승리 퀘스트](#drm-cobblemon-editor/cobblemon-trainer-quests)를 확인하세요.

업데이트 전 `config/dochi_rpg_maker`와 월드를 함께 백업하고 서버와 모든 클라이언트에 같은 로더의 0.2.4를 설치합니다. 보호된 기본 파일의 커스텀 버전은 `Save As`로 만듭니다.
''')
page('content/en/097-fabric-neoforge-release-notes-0-2-4.md', 'Fabric and NeoForge 0.2.4 update', 'release-notes-0-2-4', 7,
     'Shared authoring workflow, restock clocks, and GUI tiling settings.', 'core-fabric','getting-started','0.2.4','''
## Shared documentation and installation

**Fabric and NeoForge DRM 0.2.4 for Minecraft 1.21.1** share this documentation. Authoring tools and normal workflows are the same; choose your loader's JAR and dependencies in [Installation](#core-fabric/installation).

## NPC Shop

Choose `Real ticks` or `World ticks` in product details under `RESTOCK > Timer basis`. The setting applies shop-wide. Real ticks counts actual game ticks; World ticks includes world time skipped by sleep.

Changing the clock or moving time backward rebases the remaining cooldown. File-based runtime stock/restock state retains the existing JSON persistence. See [NPC Shop](#core-fabric/shop-system).

## GUI Maker

- Tile/Stretch and direct `Sprite Scale %` input, 50–400%.
- Per-component `Tile W %` and `H %` when `Fit` is `Tile`, each 10–800%.
- Consistent Tile settings between preview and live dialogue, with improved repeating-image rendering.

See [GUI Maker](#core-fabric/gui-system). Tile width/height are component settings, not global UI defaults.

## Quests and addons

Both current Quest Editors author automatic quests. Add the matching Dochi Cobblemon Editor build for trainer-victory objectives. See [Quests](#core-fabric/quest-system) and [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Back up `config/dochi_rpg_maker` and the world, then install matching-loader 0.2.4 on the server and every client. Use `Save As` for custom versions of protected defaults.
''')
page('content/ko/48-cobblemon-release-notes-current.md', 'Fabric 0.2.1 · NeoForge 0.2.0 업데이트', 'cobblemon-editor-current-update', 480,
     '커스텀 아이템 복사, 결제 연동, 공용 탐색과 현재 설치 기준입니다.', 'drm-cobblemon-editor','overview','Fabric 0.2.1 / NeoForge 0.2.0','''
## 현재 설치 기준

Minecraft 1.21.1 · Java 21에서 **Fabric 0.2.1 / NeoForge 0.2.0**을 사용합니다. 필수 연동은 같은 로더의 DRM Core, CustomNPCs와 Cobblemon입니다. 현재 DRM은 0.2.4이며 애드온의 선언된 최소 DRM은 0.2.2입니다. Cobblemon 범위는 1.7.3 이상 1.9.0 미만입니다.

RCT API와 CobbleDollars는 선택 연동입니다. [설치와 첫 적용](#drm-cobblemon-editor/cobblemon-editor-setup)에서 로더별 요구 조건을 확인하세요.

## 일반 인벤토리

- `Items`와 `My Inventory`에서 아이템을 선택합니다. 실제 플레이어 스택은 소비하지 않고 복사합니다.
- NBT·컴포넌트를 저장하고 수량 변경 뒤에도 유지합니다. 같은 ID의 서로 다른 커스텀 아이템을 구분합니다.
- 일반 인벤토리는 기믹 키 보유 검사에 사용하며 라운드 AI 배틀 가방과 별도입니다.
- Trainer 스키마는 `23`을 유지합니다.

[AI·파티·아이템](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items)에서 제작 순서를 확인하세요.

## 결제와 공용 탐색

PokéMart의 DRM 화폐·아이템 결제는 Core의 결제 서비스를 사용합니다. 잘못된 결제 설정이나 Core 금액 범위를 넘는 거래를 거부합니다. CobbleDollars를 선택한 경우 해당 공급자의 잔액을 사용합니다.

코어와 애드온 에디터의 공용 뒤로·앞으로 화살표로 방문한 화면을 이동합니다. 이동 기록이 없으면 아이콘이 비활성화됩니다. 파일 저장과 NPC Apply는 각각 따로 수행합니다.

## 트레이너 승리 퀘스트와 업데이트

트레이너 문서와 Quest Editor 목표에 같은 Trainer ID를 연결합니다. 이름이나 파일명만 맞춰서는 집계되지 않습니다. [트레이너 승리 퀘스트](#drm-cobblemon-editor/cobblemon-trainer-quests)를 확인하세요.

`config/dochi_rpg_maker`와 월드를 함께 백업하고 서버·클라이언트에 같은 로더의 같은 애드온 버전을 설치합니다. 기존 0.1.6 변경 기록은 당시 릴리스 안내로 보존합니다.
''')
page('content/en/48-cobblemon-release-notes-current.md', 'Fabric 0.2.1 / NeoForge 0.2.0 update', 'cobblemon-editor-current-update', 480,
     'Custom item copying, payment integration, shared navigation, and current requirements.', 'drm-cobblemon-editor','overview','Fabric 0.2.1 / NeoForge 0.2.0','''
## Current requirements

Use **Fabric 0.2.1 / NeoForge 0.2.0** on Minecraft 1.21.1 with Java 21. Required integrations are matching-loader DRM Core, CustomNPCs, and Cobblemon. Current DRM is 0.2.4; the addon declares DRM 0.2.2 as its minimum. Cobblemon must be 1.7.3 or newer and below 1.9.0.

RCT API and CobbleDollars remain optional. See [Setup](#drm-cobblemon-editor/cobblemon-editor-setup) for loader requirements.

## General Inventory

- Select default items from `Items` or copy real player stacks from `My Inventory` without consuming them.
- Preserve NBT/components when saving and editing quantity, with distinct entries for different custom stacks sharing an ID.
- Gimmick-key possession is separate from the round AI's battle bag.
- Trainer schema remains `23`.

See [AI, parties, and items](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) for authoring steps.

## Payments and shared navigation

PokéMart DRM-currency/item payments use Core's payment service. Invalid payment settings or amounts above Core's range are rejected. CobbleDollars uses the selected provider's balance.

Shared Back/Forward arrows navigate visited Core and addon editor screens. Without a destination the icon is disabled. File saving and NPC Apply remain separate operations.

## Trainer-victory quests and updating

Link the same Trainer ID in the battle document and Quest Editor objective. NPC names and filenames do not establish identity. See [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Back up `config/dochi_rpg_maker` and the world together. Install the same matching-loader addon version on the server and clients. The 0.1.6 notes remain a historical release record.
''')

patch=['*** Begin Patch']
changed=[]
for rel,new in changes.items():
    path=ROOT/rel
    old=path.read_text(encoding='utf-8-sig') if path.exists() else ''
    if new == old:
        continue
    changed.append(rel)
    if not path.exists():
        patch += [f'*** Add File: {path.as_posix()}'] + ['+'+line for line in new.splitlines()]
    else:
        patch.append(f'*** Update File: {path.as_posix()}')
        diff=list(difflib.unified_diff(old.splitlines(),new.splitlines(),n=3))[2:]
        for line in diff:
            patch.append('@@' if line.startswith('@@') else line)
patch.append('*** End Patch')
print('\n'.join(patch))
