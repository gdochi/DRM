---
title: 파일과 문제 해결
slug: cobblemon-files-troubleshooting
order: 590
description: 0.1.6 저장 경로, 스키마, 원본 추적, 상호작용과 운영 점검입니다.
product: drm-cobblemon-editor
category: 운영
section: operations
status: Draft
version: 0.1.6
audience: 서버 운영자와 콘텐츠 배포자
tags:
  - paths
  - troubleshooting
  - release
---

## 저장 경로

모든 기준 경로는 `config/dochi_rpg_maker`입니다.

| 경로 | 데이터 |
| --- | --- |
| `cobblemon/trainers/` | Trainer 문서 |
| `cobblemon/pokemon_itself/` | Pokemon Itself 문서와 외형 |
| `cobblemon/battle_presentations/` | 전투 전 연출 |
| `cobblemon/pokemarts/` | Sales/Trade/Auction 문서 |
| `cobblemon/nurse_joy/` | Nurse Joy 문서 |
| `cobblemon/starter_selectors/` | Starter Selector 문서 |
| `cobblemon/entity_clones/` | 애드온 Clone Library 호환 클론 |
| `npc_spawner/entity_clones/` | 최신 DRM Core NPC Spawner 클론 |
| `gui/` | PokéMart·Starter Selector 등 런타임 GUI 배치 |
| `cobblemon/_migration_backups/` | 기본 파일 자동 마이그레이션 백업 |

`Save As`에는 현재 도메인 안의 상대 경로를 입력합니다. Trainer에서 `custom/gym/leader.json`을 저장하면 실제 파일은 다음 위치입니다.

```text
config/dochi_rpg_maker/cobblemon/trainers/custom/gym/leader.json
```

절대 경로나 `../`로 다른 폴더를 가리키지 마세요.

## 기본 파일 보호

기본값과 샘플은 출발용 템플릿입니다. 애드온은 없는 파일을 설치하고, 알려진 원본과 정확히 같은 구버전 기본 파일만 안전하게 업그레이드할 수 있습니다. 수정된 사용자 파일은 자동 교체하지 않습니다.

업그레이드 전 원본은 다음과 같은 폴더에 보관됩니다.

```text
config/dochi_rpg_maker/cobblemon/_migration_backups/canonical_defaults_<timestamp>/
```

:::warning Save As 사용
기본 파일을 직접 운영 원본으로 쓰지 말고 `custom/` 아래 새 파일로 저장하세요. 업데이트 파일과 사용자 콘텐츠가 섞이지 않아 복구와 비교가 쉬워집니다.
:::

## 현재 스키마

| 문서 | 스키마 | 주요 제한 |
| --- | ---: | --- |
| Trainer / Pokemon Itself | 20 | 라운드 16, Trainer 파티 1–6, 조건/액션 각 32 |
| Trainer Brain | 4 | 라운드별 AI 엔진·6개 능력치·전략·아이템 정책 |
| Battle Presentation | 4 | Duration 1–600틱, 요소 64 |
| PokéMart | 7 | Sales 256, Trade 128, 문서당 Role 하나 |
| Nurse Joy | 2 | 치료기 거리 1–16, 고정 Heal/Close 대화 |
| Starter Selector | 2 | 옵션 32, 성공 액션 32 |
| Entity Clone | 1 | Clone ID와 스냅샷/원본 추적 |
| DRM Core NPC Spawner | 4 | 소스 64, 조건 32, 활성/웨이브 각 32 |

지원되는 구형 파일은 로드 과정에서 최신 필드로 보정됩니다. 미래 스키마 번호는 거부할 수 있습니다. JSON을 직접 편집할 때 `schemaVersion`만 임의로 올리지 마세요.

## Save, Apply와 원본 추적

| 작업 | 바뀌는 것 |
| --- | --- |
| `Save` / `Save As` | 서버 JSON 파일 |
| 최초 `Apply` | NPC의 역할, 원본 경로, 대체 스냅샷 |
| 같은 경로에 다시 Save | 다음 런타임 요청에서 최신 원본 사용 |
| `/drm reload` | 외부 파일 변경과 서버 캐시 새로고침 |

Trainer, Pokemon Itself, PokéMart, Nurse Joy, Starter Selector는 파일 기반 Apply에서 기본적으로 원본을 추적합니다. 원본이 없거나 잘못되면 적용 당시 스냅샷으로 안전하게 대체합니다.

다시 Apply해야 하는 경우:

- 원본 경로를 다른 파일로 변경
- 적용 역할 변경
- Nurse Joy 치료기 같은 NPC별 연결을 새로 구성
- Follow Source가 아닌 Snapshot 클론 사용
- 파일이 아닌 임시 초안을 적용

## 상호작용 우선순위

편집 도구를 든 클릭은 도구 흐름을 보호합니다. 일반 런타임은 주손·보조손을 모두 비운 Main Hand 클릭을 기준으로 합니다.

| 순서 | 상태 | 결과 |
| --- | --- | --- |
| 1 | 현재 라운드의 동적 Trainer Dialogue Set | 해당 플레이어의 라운드 대화 열기 |
| 2 | Nurse Joy | 전용 제한형 대화 열기 |
| 3 | Starter Selector | 전용 제한형 대화 또는 선택 화면 열기 |
| 4 | DRM Dialogue / NPC Shop | DRM Core의 일반 상호작용 |
| 5 | PokéMart | 역할별 상점 화면 |
| 6 | Trainer / Pokemon Itself | 배틀 확인 또는 전투 흐름 |

DRM Core 대화/상점과 Nurse Joy·Starter Selector를 함께 적용한 NPC는 일반 클릭을 Core가 소유하고 Shift+우클릭으로 전용 역할에 접근할 수 있습니다. 역할 조합과 등록 순서에 따라 실제 안내가 필요하므로 통합 NPC는 반드시 게임 안에서 시험하세요.

## 자주 발생하는 문제

### 파일을 저장했는데 NPC가 옛 설정을 사용함

1. NPC가 추적하는 원본 경로와 편집한 파일이 같은지 확인합니다.
2. 새 창·새 전투 요청으로 런타임을 다시 엽니다.
3. 서버 밖에서 고쳤다면 `/drm reload`를 실행합니다.
4. 원본 JSON이 파싱 실패해 대체 스냅샷을 쓰는지 서버 로그를 확인합니다.
5. Snapshot 클론인지 확인합니다.

### Load 목록에 파일이 없음

- 올바른 도메인 폴더에 있는지 확인합니다.
- 파일 확장자가 `.json`인지 확인합니다.
- 경로에 `..`, 절대 경로, 허용되지 않은 문자가 없는지 확인합니다.
- 서버에서 파일을 추가했다면 `/drm reload` 후 다시 엽니다.

### 전투가 열리지 않음

- 양손을 비웁니다.
- Trainer/Pokemon Itself의 `Enabled`를 확인합니다.
- 플레이어의 전투 가능한 Cobblemon 파티를 확인합니다.
- 현재 라운드 Conditions와 Encounter Policy를 확인합니다.
- Vision/Radius NPC를 Interaction처럼 수동 클릭하고 있지 않은지 확인합니다.
- DRM 대화, PokéMart, Nurse Joy, Starter Selector가 클릭을 소유하는지 확인합니다.

### RCT AI가 대체됨

- RCT API 0.15.1-beta 이상을 설치합니다.
- 서버와 클라이언트의 버전을 맞춥니다.
- RCT 엔진은 DRM Trainer Items와 기믹 계획을 사용하지 않는다는 점을 확인합니다.

### 배틀 아이템이나 기믹을 쓰지 않음

- AI 엔진이 `DRM Strategy`인지 확인합니다.
- Trainer Items가 현재 라운드에 있는지 확인합니다.
- 기믹 키 아이템이 General Inventory에 있는지 확인합니다.
- 포켓몬의 지닌 도구, Tera Type, Dynamax Level, GMax Factor를 확인합니다.
- Mega Showdown이 서버와 클라이언트에 설치됐는지 확인합니다.

### After Action이 실행되지 않음

- `When`이 실제 결과와 맞는지 확인합니다.
- Chance, All/One Random, 반복 정책을 확인합니다.
- 현재 라운드의 액션을 편집했는지 확인합니다.
- FTB Quests·통화 공급자 같은 선택 의존성을 확인합니다.
- 실패 액션은 다음 배틀 요청에서 재시도되므로 서버 로그와 보류 상태를 확인합니다.

### Nurse Joy가 치료하지 않음

- 치료기 링크와 1–16블록 최대 거리를 확인합니다.
- 치료기 옆 안전한 이동 공간을 확보합니다.
- 플레이어가 12블록 안이고 배틀 중이 아닌지 확인합니다.
- 치료기가 충전·사용 가능하며 다른 치료 중이 아닌지 확인합니다.

### Starter가 지급되지 않음

- 옵션 조건과 Open 조건을 확인합니다.
- 60초 세션이 만료되지 않았는지 확인합니다.
- Species와 포켓몬 필드 ID를 확인합니다.
- 파티와 PC가 모두 포켓몬을 받을 수 있는지 확인합니다.

### 스포너가 배틀 중 NPC를 지우지 않음

정상 보호 동작입니다. Cobblemon 배틀이 예약된 NPC는 전투 종료와 예약 해제 뒤에 `Remove Inactive` 또는 정리 정책을 처리합니다.

## 백업 범위

콘텐츠와 운영 상태를 모두 복구하려면 다음을 함께 백업합니다.

- `config/dochi_rpg_maker/`
- 월드 저장 전체
- 서버 `mods/` 버전 목록
- 데이터팩과 리소스팩

JSON만 백업하면 PokéMart 재고·경매, 플레이어별 Trainer 진행도, Encounter Policy의 전역 상태 같은 월드 데이터는 복구되지 않습니다.

## 배포 전 점검

1. 새 테스트 월드에서 기본 문서 설치를 확인합니다.
2. 모든 사용자 문서가 `custom/` 아래에 있는지 확인합니다.
3. Trainer와 Pokemon Itself의 모든 라운드를 완료해 봅니다.
4. win/loss/flee/battle_end 액션을 각각 시험합니다.
5. 선택 모드를 설치한 구성과 뺀 구성을 구분합니다.
6. Nurse Joy 치료기 파손·재연결을 시험합니다.
7. Starter를 파티 만석 상태에서 시험합니다.
8. Clone Follow Source와 Snapshot 차이를 확인합니다.
9. 스포너 NPC가 배틀 중 제거되지 않는지 확인합니다.
10. 서버 재시작 뒤 재고, 경매, 진행도, 스포너 상태를 확인합니다.
