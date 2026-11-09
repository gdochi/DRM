---
title: Clone Library와 DRM Core NPC Spawner
slug: cobblemon-clone-library-spawner
order: 560
description: 역할을 적용한 트레이너를 클론으로 저장하고 Core 스포너에 연결합니다.
product: drm-cobblemon-editor
category: 클론과 스포너
section: world-tools
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 코블몬 NPC를 재사용하거나 웨이브로 소환하는 제작자
tags:
  - clone-library
  - npc-spawner
  - soul-stone
---

## 완성한 트레이너를 다시 배치하기

**Clone Library**는 Trainer 또는 Pokemon Itself 역할을 이미 적용한 NPC를 저장합니다. 저장한 클론은 **DRM Core NPC Spawner**의 소스로 고릅니다. DNPC 자체의 Save As 템플릿과는 형식이 다릅니다. 그 템플릿으로 시작한다면 [Spawn Control 안내](#dochi-spawn-control/spawn-control-npc-templates)를 보세요.

아래는 **Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 / NeoForge 1.21.1**에서 트레이너 파일을 저장하고 실제 DNPC에 적용한 뒤 클론으로 보관한 흐름입니다.

1. [트레이너 편집기](#drm-cobblemon-editor/cobblemon-trainer-editor)에서 파티를 만든 뒤 **Save As**로 내 파일을 저장합니다.
2. DRM 코어로 NPC를 열고 **vs Trainer → 내 파일 → Apply vs Trainer**를 누릅니다. 오른쪽 **APPLIED JSON**에 파일 이름이 나타나는지 확인합니다.
3. 같은 NPC를 대상으로 **Clone Library**를 열고 **Save As**를 누릅니다.
4. 원본 파일 변경을 따라가게 하려면 **Follow applied JSON source**를 켭니다. 이름을 확인하고 **Confirm**합니다.
5. **Saved Clones**에 저장된 NPC가 나타나는지 확인합니다. 항목을 선택하면 상세 정보와 **Test Spawn**을 사용할 수 있습니다.

![NPC Apply 오른쪽 vs Trainer에 guide_trainer가 연결된 화면.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "왼쪽 vs Trainer는 목록 분류이고, 실제 적용 버튼은 아래 Apply vs Trainer입니다. custom/guide_trainer.json의 적용 성공 응답과 오른쪽 파일 이름을 확인했습니다.")

![Clone Library에 저장된 Oakridge guide 트레이너 클론.](assets/media/guides/cobble-029-neo1211-flow/cobble-clone-library.png "Saved clone: trainer/guide_trainer_clone 응답과 실제 서버 파일 생성을 확인했습니다. 저장 파일의 entityType은 dochi_npc:npc, bindingPolicy는 follow_source입니다. 이 화면은 클론 저장 결과이며 스포너 생성 완료 장면은 아닙니다.")

## 역할 분담

| 도구 | 담당 |
| --- | --- |
| `Clone Library` | 적용 완료 NPC 또는 Soul Stone을 재사용 가능한 소스로 저장 |
| `DRM Core NPC Spawner` | 저장한 클론을 조건·가중치·웨이브에 따라 월드에 소환 |
| Cobblemon Editor | 클론 안의 Trainer/Pokemon 원본 문서 제작 |

새 배치는 DRM Core의 `dochi_rpg_maker:npc_spawner`를 사용합니다. 구형 애드온 블록 `cobble_npc:clone_spawner`는 기존 월드 호환을 위해 로드되지만 새 콘텐츠의 기준으로 사용하지 마세요.

## Clone Library

Clone Library는 Trainer와 Pokemon NPC를 분류해 저장하고 검색합니다. 0.1.6에서는 검색과 페이지 이동을 서버에서 처리해 클론이 많아도 필요한 결과만 불러옵니다. 적용 완료 NPC를 대상으로 열거나, 포켓몬/NPC 정보가 든 Soul Stone을 가져올 수 있습니다.

같은 Clone ID로 저장하면 덮어쓰기 확인창이 먼저 열립니다. 기존 클론을 교체하려는 경우에만 확인하세요.

### 저장 방식

| 방식 | 동작 |
| --- | --- |
| `Follow Source` | NPC에 적용된 원본 JSON 경로를 유지하고 게임에 최신 문서를 해석 |
| `Snapshot` | 저장 당시 데이터를 자체 포함하고 이후 원본 파일 변경을 따라가지 않음 |

콘텐츠 파일을 고치면 모든 스포너 NPC도 같이 최신화되어야 할 때는 Follow Source가 적합합니다. 이벤트 당시 상태를 고정하거나 원본 파일 없이 배포해야 할 때만 Snapshot을 사용하세요.

클론 삭제 전에 어떤 스포너가 해당 Clone ID를 참조하는지 확인하세요. 소스 ID를 삭제하면 기존 스포너의 해당 항목은 더 이상 소환할 수 없습니다.

## 저장 경로와 호환

| 경로 | 용도 |
| --- | --- |
| `config/dochi_rpg_maker/npc_spawner/entity_clones/` | 최신 DRM Core 클론 저장소 |
| `config/dochi_rpg_maker/cobblemon/entity_clones/` | Cobblemon 애드온 Clone Library 호환 저장소 |

최신 Core 스포너는 두 경로를 모두 읽습니다. 같은 ID를 중복으로 만들지 말고, 운영 백업에는 두 폴더와 원본 `cobblemon/trainers/`, `pokemon_itself/`를 함께 포함하세요.

## DRM Core NPC Spawner 열기

1. DRM Core NPC Spawner 블록을 설치합니다.
2. DRM Core 편집 아이템 `dochi_rpg_maker:dialogue_editor`를 듭니다.
3. 블록을 우클릭해 편집 화면을 엽니다.

스포너 에디터는 `Source`, `Spawn`, `Conditions`, `Effects` 탭으로 구성됩니다. 이는 Clone Library와 별도인 DRM Core 편집 화면입니다.

처음에는 **Source 한 개 → Wave size 1 → Max active 1**로 설정하고 Save합니다. 대상 감지를 쓴다면 플레이어를 서바이벌로 바꿔 시험합니다. 크리에이티브·관전자는 감지 대상에서 제외됩니다.

![Core NPC Spawner의 작동 방식과 수량 설정.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "Mode는 작동 계기, Cooldown은 간격, Max active는 살아 있는 수, Wave size는 한 번 생성 수입니다. 이 별도 실행의 Assigned sources는 0이므로 화면은 설정 위치를 보여 줍니다. 클론 저장 사진과 합쳐 소환까지 검증한 결과로 해석하지 마세요.")

## Source

- 최대 64개 클론 소스
- 소스별 Weight 1–10000
- 가중치에 따른 랜덤 선택
- Trainer/Pokemon 분류 표시

한 웨이브 안에서도 각 소환 슬롯이 가중치로 소스를 고릅니다. 확정 순서가 필요하면 스포너를 나누거나 조건과 신호를 분리하세요.

## Spawn

| 모드 | 트리거 |
| --- | --- |
| `Continuous` | 쿨다운마다 계속 검사 |
| `Target Nearby` | 대상이 반경에 있을 때 |
| `Target Enter` | 대상이 감지 범위로 들어온 순간 |
| `Redstone Pulse` | 레드스톤 펄스 |

주요 제한:

- Cooldown 20–72000틱
- Max Active 1–32
- Wave Size 1–32
- Target Radius 1–64블록
- 좌표 Offset -32–32블록
- Random Radius 0–32블록
- Source Pool 최대 64개

대상 플레이어는 살아 있고 크리에이티브·관전자가 아니어야 합니다. `Require Target`, `Remove Inactive`, 레드스톤 `Ignore/Powered/Unpowered` 정책을 조합할 수 있습니다.

## Conditions와 Effects

조건은 DRM Core의 공용 서버 규칙을 사용하며 최대 32개입니다. 소환 전 서버가 다시 판정합니다.

효과 예시:

- Cloud, Poof, Smoke, Large Smoke
- Happy Villager, Enchant, Portal, Reverse Portal
- End Rod, Flame

블록 외형은 기본, 아이템, 블록 표시 방식으로 바꿀 수 있습니다. 여기서 바꾸는 것은 스포너 블록의 모습입니다. 소환 NPC의 외형은 저장한 클론을 따릅니다.

## Cobblemon 전투 보호

애드온은 Core 스포너에 Trainer/Pokemon 분류와 배틀 종료 보호를 등록합니다.

- 배틀 예약 중인 NPC는 `Remove Inactive`나 웨이브 정리로 즉시 제거하지 않습니다.
- 전투가 끝나고 예약이 해제된 뒤 제거를 처리합니다.
- 스포너가 NPC를 관리하더라도 전투 결과와 플레이어 진행도는 서버가 최종 기록합니다.

## 제한 사항

NPC Spawner는 월드 자연 생성 시스템이 아닙니다. 월드에 고정 설치한 블록을 중심으로 조건부 소환하는 도구입니다. 바이옴·청크 자연 스폰을 만들려면 별도의 월드 생성 또는 스폰 시스템이 필요합니다.

## 테스트 체크리스트

1. 소스 한 개, Wave Size 1, Max Active 1로 시작합니다.
2. Follow Source 클론의 원본 JSON을 저장하고 새 소환에 반영되는지 확인합니다.
3. 배틀 중 레드스톤을 끄거나 대상을 떠나도 NPC가 중간 제거되지 않는지 확인합니다.
4. 전투 종료 뒤 `Remove Inactive`가 동작하는지 확인합니다.
5. 여러 소스의 Weight 비율은 충분한 반복 횟수로 검사합니다.
6. 스포너 청크 언로드·서버 재시작 후 활성 수와 소환 정책을 확인합니다.
