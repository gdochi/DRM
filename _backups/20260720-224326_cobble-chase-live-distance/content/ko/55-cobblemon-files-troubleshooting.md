---
title: 문제 해결
slug: cobblemon-files-troubleshooting
order: 550
description: 저장 경로, 적용 문제와 운영 점검 방법입니다.
product: drm-cobblemon-editor
category: 운영
section: operations
status: Draft
version: 0.1.0
audience: 서버 운영자와 콘텐츠 배포자
tags:
  - paths
  - troubleshooting
  - release
---

## 저장 경로 지도

모든 서버 편집 JSON의 기준 경로는 `config/dochi_rpg_maker`입니다.

| 경로 | 저장 내용 |
| --- | --- |
| `cobblemon/trainers/` | 트레이너 파티, 라운드, 조우, 조건, 보상 |
| `cobblemon/pokemon_itself/` | 한 마리 포켓몬 전투와 NPC 외형 |
| `cobblemon/battle_presentations/` | 전투 직전 타임라인 연출 |
| `cobblemon/pokemarts/` | Sales/Trade/Auction 상점 문서 |
| `gui/` | 역할별 PokéMart 런타임 화면 레이아웃 |
| `cobblemon/_migration_backups/` | 애드온이 구버전 기본 파일을 안전하게 업그레이드할 때 만든 백업 |

에디터의 `Save As`에는 위 도메인 안의 상대 경로를 입력합니다. 예를 들어 트레이너에서 `custom/gym/leader.json`을 저장하면 실제 파일은 다음 위치에 생깁니다.

```text
config/dochi_rpg_maker/cobblemon/trainers/custom/gym/leader.json
```

## 기본 파일과 샘플

첫 실행 시 애드온은 다음 템플릿을 설치합니다.

- 기본 Trainer와 Interaction/Vision/Radius 샘플
- 챔피언 파티 샘플
- 기본 Pokemon Itself와 전설 포켓몬 샘플
- Trainer/Pokemon/Custom 배틀 연출 프리셋과 연출 샘플
- 기본 PokéMart와 Sales/Trade/Auction 샘플
- 역할별 PokéMart GUI

없는 파일만 새로 복사하는 것이 기본입니다. 일부 정식 기본 파일은 알려진 이전 버전의 원본 해시와 정확히 같을 때만 업그레이드됩니다. 사용자가 수정한 파일은 자동 교체하지 않습니다. 업그레이드되는 원본은 먼저 아래 폴더에 백업됩니다.

```text
config/dochi_rpg_maker/cobblemon/_migration_backups/canonical_defaults_<timestamp>/
```

:::warning 기본 파일을 작업 원본으로 쓰지 마세요
기본값과 샘플은 출발점입니다. 사용자 콘텐츠는 `Save As`로 `custom/` 아래에 저장하세요. 그래야 애드온 업데이트와 사용자 콘텐츠를 명확히 분리할 수 있습니다.
:::

## 파일 종류와 스키마

| 문서 | 현재 스키마 | 주요 제한 |
| --- | ---: | --- |
| Trainer / Pokemon Itself | 7 | 라운드 최대 16, 파티 1–6, 라운드별 조건·보상 각 32 |
| Battle Presentation | 4 | Duration 1–600틱, 요소 최대 64 |
| PokéMart | 7 | Sales 256, Trade 128, 한 문서 한 Role |

지원 범위 안의 구형 스키마는 로드 과정에서 호환값으로 보정될 수 있습니다. 지원 범위보다 큰 `schemaVersion`은 미래 형식으로 간주해 거부합니다. 직접 JSON을 수정할 때 스키마 번호만 임의로 올리지 마세요.

에디터는 숫자 범위, 목록 수, 빈 값, 경로와 일부 ID를 저장 시 정규화합니다. 직접 수정한 JSON이 로드되더라도 잘못된 Species, Item, Sound 같은 외부 레지스트리 ID는 실제 생성·실행 단계에서 실패할 수 있습니다.

## NPC 우클릭 우선순위

플레이어 런타임은 양손이 비어 있는 Main Hand 우클릭을 기준으로 다음 순서를 따릅니다.

| 우선순위 | 연결 상태 | 결과 |
| --- | --- | --- |
| 1 | DRM Dialogue 또는 DRM NPC Shop 연결 | 해당 DRM 대화·상점이 우클릭을 소유 |
| 2 | PokéMart 적용 | PokéMart 런타임 화면 열기 |
| 3 | Trainer 또는 Pokemon Itself 적용 | 배틀 확인 화면 열기 |
| 4 | 아무 역할도 없음 | 다른 모드 또는 CustomNPCs 기본 상호작용으로 전달 |

코어 아이템과 다른 설정 도구를 들고 우클릭하면 도구의 편집 흐름을 보호하기 위해 배틀 확인을 열지 않습니다. 전투 NPC를 테스트할 때는 Main Hand와 Off Hand를 모두 비우세요.

## 자주 발생하는 문제

### 화면은 저장됐지만 NPC 동작이 바뀌지 않음

서버 JSON 저장과 NPC 적용은 별도입니다. 수정한 파일을 대상 NPC에 다시 `Apply`하세요. 다른 NPC나 다른 적용 대상에 문서를 넣지 않았는지도 확인합니다.

### Load 목록에 파일이 없음

- 현재 에디터의 도메인과 실제 폴더가 맞는지 확인합니다.
- 트레이너는 `trainers/`, Pokemon Itself는 `pokemon_itself/`입니다.
- 확장자가 `.json`인지 확인합니다.
- 서버 파일을 직접 수정했다면 DRM의 리로드 흐름을 실행하거나 서버를 안전하게 다시 시작합니다.

### 빈손 우클릭으로 배틀이 열리지 않음

- 양손이 모두 비었는지 확인합니다.
- NPC에 Trainer 또는 Pokemon Itself 데이터가 실제 적용됐는지 확인합니다.
- 같은 NPC에 DRM Dialogue, DRM NPC Shop, PokéMart가 연결됐는지 확인합니다.
- 플레이어가 이미 Cobblemon 전투 중이 아닌지 확인합니다.
- 대상 NPC가 다른 플레이어의 전투에 사용 중인지 확인합니다.

### 확인 화면은 열리지만 전투가 시작되지 않음

- 플레이어 활성 파티에 전투 가능한 선두 포켓몬이 있는지 확인합니다.
- 현재 선택 라운드의 모든 Species가 유효한지 확인합니다.
- 연출이 끝날 때 플레이어가 NPC 16블록 안에 있는지 확인합니다.
- 연출 중 선두 포켓몬이나 파티 상태가 바뀌지 않았는지 확인합니다.
- 현재 라운드 조건이 연출 전과 후에 모두 참인지 확인합니다.
- Doubles/Triples에 필요한 유효 상대 수가 있는지 확인합니다.
- 다른 전투나 조우가 플레이어를 예약하지 않았는지 확인합니다.

Battle Presentation만 보이고 끝나는 경우에는 Presentation 자체보다 마지막 거리·선두 파티·조건 재검사를 먼저 확인하세요.

### Vision 또는 Radius 조우가 동작하지 않음

- 크리에이티브·관전자 플레이어는 자동 감지 대상이 아닙니다.
- Trigger가 `Interaction`으로 남아 있지 않은지 확인합니다.
- Vision Distance, Vision Angle, Radius, Line of Sight를 확인합니다.
- 라운드 조건, 재대전 횟수, Cooldown이 도전을 막고 있지 않은지 확인합니다.
- Chase Max Distance 또는 Duration이 너무 작지 않은지 확인합니다.

### NPC가 추적하다 멈추거나 계속 돌아감

- Stop Distance가 NPC와 플레이어 히트박스에 비해 너무 작지 않은지 확인합니다.
- 좁은 문, 반블록, 울타리, 물, 절벽에서 CustomNPCs 내비게이션이 막히는지 확인합니다.
- Max Distance는 대상까지 거리가 아니라 감지 당시 NPC 홈에서 벗어난 거리입니다.
- Duration은 Reaction 단계 뒤 추적 시간입니다.
- Return Home이 켜져 있으면 실패 후 원래 위치로 복귀하는 것이 정상입니다.
- Stop Distance 안쪽 판정은 여러 틱 연속 유지되어야 하므로 빠르게 스쳐 지나가지 않았는지 확인합니다.

### 라운드가 예상과 다름

- 첫 도전은 항상 1라운드입니다. Start Round는 첫 승리 이후부터 사용합니다.
- 패배와 도주는 클리어 수를 올리지 않습니다.
- `Max Rematches 3`은 최초 승리 외에 추가 3승입니다.
- Continue는 마지막 라운드에서 고정되고 Loop만 Start Round로 돌아갑니다.
- 같은 NPC에 JSON을 다시 Apply해도 기존 플레이어 진행도는 유지됩니다.
- 라운드 순서를 바꾸면 기존 `Once per round` 지급 기록의 라운드 번호 의미도 달라질 수 있습니다.

새 진행도로 검증하려면 기존 운영 NPC를 강제로 초기화하려 하지 말고 새 UUID의 테스트 NPC를 소환해 같은 JSON을 적용하세요.

### 쿨다운이 재시작 후 사라짐

정상 동작입니다. 클리어 수와 보상 라운드 기록은 플레이어 PersistentData에 남지만 쿨다운은 CustomNPCs NPC의 런타임 tempdata입니다. 서버 재시작과 NPC 런타임 재생성 후에는 유지되지 않을 수 있습니다.

### 보상을 받지 못함

- 결과가 실제 `win`인지 확인합니다. 패배와 도주는 보상이 없습니다.
- 현재 승리한 라운드의 Rewards를 편집했는지 확인합니다.
- Chance를 모두 실패하지 않았는지 확인합니다.
- First Clear는 첫 승리에서 Chance나 실행이 실패해도 다음 승리에 재시도되지 않습니다.
- Once per Round는 하나 이상 성공했을 때만 지급 라운드로 기록됩니다.
- `item take`는 전체 필요 수량이 없으면 아무것도 회수하지 않습니다.
- `cobblemon_give`는 활성 파티가 가득 차면 PC로 보내지 않고 실패합니다.
- Command와 Advancement ID는 서버 로그와 실제 명령 결과를 함께 확인합니다.

### Battle Presentation이 로드되지 않음

- 트레이너의 경로가 `battle_presentations/` 기준 상대 경로인지 확인합니다.
- 레이어 ID가 중복되지 않는지 확인합니다.
- Texture와 Sound가 유효한 Minecraft 리소스 ID인지 확인합니다.
- Start Tick이 End Tick보다 크거나 Duration 밖에 있지 않은지 확인합니다.

### PokéMart에서 결제할 수 없음

- Currency Provider가 실제 설치된 모드 또는 DRM 통화와 맞는지 확인합니다.
- `cobbledollars`를 선택했다면 CobbleDollars가 설치됐는지 확인합니다.
- Item 통화는 아이템 ID와 NBT 조건이 플레이어 아이템과 정확히 맞는지 확인합니다.
- Interaction Conditions가 상점 진입을 막고 있지 않은지 확인합니다.

### PokéMart 포켓몬을 받지 못함

- Sales와 Trade 지급은 활성 파티를 사용합니다. PC에 공간이 있어도 파티가 가득 차면 실패할 수 있습니다.
- Sales 실패 후 통화 환불과 재고 복구 여부를 확인합니다.
- PC 포켓몬을 Trade에 냈다면 새 포켓몬을 받을 파티 공간을 먼저 만듭니다.
- Auction 취소는 파티 또는 PC로 반환하지만 Pokémon Claim 수령은 활성 파티 공간이 필요합니다.
- Claim 지급이 실패하면 데이터가 제거되지 않고 남는지 새로고침해 확인합니다.

### 재고가 JSON의 Initial Stock으로 돌아가지 않음

재고는 `NPC UUID + Product ID` 또는 `NPC UUID + Trade ID`로 월드 PersistentState에 저장됩니다. 같은 ID와 NPC를 유지한 채 JSON의 Initial Stock만 바꿔도 이미 존재하는 런타임 재고는 초기화되지 않습니다. 새 ID는 새 재고로 시작하지만 기존 상태와 분리되므로 운영 중 ID 변경을 재고 초기화 도구처럼 무분별하게 사용하지 마세요.

## 서버 로그에서 확인할 정보

오류를 보고할 때 다음 정보를 함께 남기면 원인을 빠르게 좁힐 수 있습니다.

- Minecraft, Fabric Loader, Fabric API 버전
- DRM, Cobblemon, CustomNPCs, DRM Cobblemon Editor 버전
- 사용한 JSON 상대 경로와 문서 Role/Battle Type
- NPC UUID와 문제를 재현한 플레이어 UUID
- 첫 도전인지 재대전인지, 예상 라운드 번호
- Interaction/Vision/Radius 중 사용한 Trigger
- 승리·패배·도주·연출 스킵 중 어떤 흐름인지
- 서버 로그의 `cobble_npc` 경고와 Cobblemon battle 오류

사용자 JSON에는 명령, 통화 ID, 아이템 NBT 등 민감한 운영 정보가 들어갈 수 있으므로 공개 이슈에 올리기 전에 확인하세요.

## 정식 배포 전 점검표

1. 서버와 새 클라이언트 인스턴스에서 모드 의존성 오류 없이 시작합니다.
2. 기본 폴더와 샘플이 새 config에 설치되는지 확인합니다.
3. Trainer와 Pokemon Itself를 각각 저장·적용·전투 완료까지 테스트합니다.
4. Interaction, Vision, Radius 조우를 생존 모드 플레이어로 테스트합니다.
5. 승리·패배·도주 후 NPC 외형, 위치, 사운드, 플레이어 포켓몬이 복구되는지 확인합니다.
6. 연출 재생, 건너뛰기, 전투 음악, 작은 GUI Scale을 확인합니다.
7. Sales, Trade, Auction을 서버 재시작 전후로 검증합니다.
8. 사용자 JSON과 `_migration_backups`를 포함한 서버 백업 정책을 준비합니다.
9. 배포 JAR 이름은 `drm_cobblemon_editor-<version>.jar`, 내부 모드 ID는 `cobble_npc`인지 확인합니다.
10. 트레이너 진행도와 PokéMart PersistentState가 포함된 월드 저장도 config와 함께 백업합니다.
11. Sales·Trade·보상 포켓몬 지급 전에 활성 파티 공간이 필요한 흐름을 플레이어 안내에 적습니다.
