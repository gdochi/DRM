---
title: 저장 경로와 문제 해결
slug: cobblemon-files-troubleshooting
order: 550
description: 애드온 JSON 경로, 기본 파일 보호, NPC 우클릭 우선순위, 배포 전 점검표입니다.
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

### Vision 또는 Radius 조우가 동작하지 않음

- 크리에이티브·관전자 플레이어는 자동 감지 대상이 아닙니다.
- Trigger가 `Interaction`으로 남아 있지 않은지 확인합니다.
- Vision Distance, Vision Angle, Radius, Line of Sight를 확인합니다.
- 라운드 조건, 재대전 횟수, Cooldown이 도전을 막고 있지 않은지 확인합니다.
- Chase Max Distance 또는 Duration이 너무 작지 않은지 확인합니다.

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
