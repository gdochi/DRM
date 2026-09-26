---
title: 조건, After Actions와 Pokemon Itself
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: 라운드 조건, 결과별 전투 후 액션, 실패 재시도와 Pokemon Itself입니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.6
audience: 조건부 전투와 결과 처리를 설계하는 제작자
tags:
  - conditions
  - after-actions
  - pokemon-itself
---

## 라운드별 데이터

Conditions와 After Actions는 문서 전체 공용이 아니라 현재 라운드의 데이터입니다.

- 라운드당 조건 최대 32개
- 라운드당 After Action 최대 32개
- 행 드래그로 순서 변경
- `Duplicate Round`는 조건과 액션까지 복제
- Pokemon Itself도 같은 라운드 조건과 액션 사용

UI 탭 이름이 `Rewards`로 보이더라도 현재 버전의 실제 의미는 승리 보상에 한정되지 않는 `After Actions`입니다.

## Conditions

| Type | 검사 내용 |
| --- | --- |
| `tag` | 플레이어 태그 보유 또는 미보유 |
| `item` | 아이템 ID와 수량 |
| `stored` | CustomNPCs 스크립트 `storeddata` 지향 키/값 |
| `advancement` | 발전과제 완료 여부 |
| `cobblemon_party` | 파티의 종, 타입, 레벨 등 |
| `ftb_quest` | FTB Quest 완료 여부 |
| `ftb_task` | FTB Task 완료 여부 |

FTB Quests가 설치되지 않았을 때 FTB 조건은 충족되지 않습니다. 선택 모드에 의존하는 조건은 배포 서버와 클라이언트의 모드 구성을 함께 기록하세요.

### 조건 그룹

- `All`: 모든 조건이 참이어야 통과
- `Any`: 하나 이상 참이면 통과
- 각 행의 `Invert`: 해당 조건 결과를 반전

아이템 조건은 검사만 하며 소비하지 않습니다. 전투 뒤 회수하려면 `item` After Action의 `take`를 사용합니다.

:::note stored의 용도
`stored`는 일반 JSON 파일 경로나 임의 DRM 내부 키를 읽는 기능이 아닙니다. CustomNPCs 스크립트에서 사용하는 플레이어 storeddata 중심의 연동 기능입니다. 새 콘텐츠에서 단순 진행 플래그가 필요하면 태그를 우선 고려하세요.
:::

## Cobblemon Party 조건

파티 조건은 서버의 실제 Cobblemon 파티를 검사합니다. 사용 가능한 필드 조합은 에디터에서 선택하고, 종·타입 같은 ID는 현재 Cobblemon 레지스트리를 따릅니다.

예시:

- 특정 종을 파티에 보유해야 입장
- 일정 레벨 이상의 포켓몬이 있어야 도전
- 특정 타입을 가진 파티원 요구
- 조건 반전으로 특정 종을 가진 플레이어 제외

조건을 통과해도 실제로 배틀 가능한 포켓몬이 한 마리 이상 있어야 전투가 시작됩니다.

## After Action 실행 시점

각 액션의 `When`을 설정합니다.

| When | 실행 시점 |
| --- | --- |
| `win` | 플레이어 승리 |
| `loss` | 플레이어 패배 |
| `flee` | 전투 도주 |
| `battle_end` | 결과와 관계없이 전투가 종료됨 |

한 결과에서 `battle_end`와 구체적인 결과가 모두 맞으면 각각의 액션이 실행될 수 있습니다. 중복 지급을 피하려면 같은 효과를 두 시점에 동시에 넣지 마세요.

## 액션 종류

| Type | 동작 |
| --- | --- |
| `item` | 아이템 지급 또는 회수 |
| `tag` | 태그 추가 또는 제거 |
| `stored` | CustomNPCs storeddata 값 설정·변경 |
| `command` | 서버 명령 실행 |
| `advancement` | 발전과제 부여 또는 회수 |
| `currency` | DRM/CobbleDollars 등 등록 통화 변경 |
| `cobblemon_give` | 설정한 포켓몬 지급 |
| `ftb_complete_quest` | FTB Quest 완료 |
| `ftb_complete_task` | FTB Task 완료 |
| `npc_hide` | 비종료 액션 처리 뒤 NPC 숨김 |
| `npc_despawn` | 비종료 액션 처리 뒤 NPC 제거 |

명령 액션은 강한 서버 권한으로 실행됩니다. 플레이어가 조작할 수 있는 문자열을 이어 붙이지 말고 테스트 서버 로그와 실제 결과를 함께 확인하세요.

## 선택과 반복 정책

| 설정 | 동작 |
| --- | --- |
| `All` | 조건과 Chance를 통과한 모든 액션 실행 |
| `One Random` | Chance를 통과한 후보 중 하나 실행 |
| `Every Clear` | 결과가 맞을 때마다 판정 |
| `First Clear` | 첫 클리어 흐름에서만 판정 |
| `Once Per Round` | 해당 라운드에서 실제 성공한 기록이 없을 때만 판정 |

`One Random`은 각 항목의 Chance를 먼저 통과시킨 뒤 후보 중 하나를 고릅니다. 후보가 없으면 아무 액션도 실행하지 않습니다.

## 실패 보류와 재시도

FTB 완료, 화폐, 아이템처럼 외부 상태 때문에 액션 실행이 실패할 수 있습니다. 현재 버전은 실패한 전투 후 액션을 보류하고, 같은 플레이어가 다음 배틀 요청을 보낼 때 먼저 재시도합니다.

- 실패를 성공으로 기록하지 않습니다.
- NPC 숨김·제거는 일반 액션이 성공한 뒤 마지막에 처리합니다.
- 선택 모드가 빠진 상태로 계속 재시도되지 않도록 배포 의존성을 확인합니다.
- 재시도될 수 있는 액션은 중복 실행에 안전한 구성을 사용합니다.

## Pokemon Itself

Pokemon Itself는 포켓몬 한 마리와 Cobblemon PVE 전투를 만들고 같은 데이터를 CustomNPCs NPC 외형에도 사용합니다.

### Trainer와 다른 점

- 각 라운드에 포켓몬 한 마리만 사용
- Trainer AI, Trainer Items, Trainer Gimmick은 사용하지 않음
- 포켓몬 Appearance를 함께 저장
- 전투 중 임시 Cobblemon 포켓몬을 만들고 NPC를 숨겼다가 복구

### 공통으로 지원하는 것

- 최대 16라운드와 재대전 진행
- Conditions와 After Actions
- Battle Config와 Encounter Policy
- Interaction, Vision, Radius 조우
- IV/EV, Tera Type, Dynamax Level, GMax Factor 같은 포켓몬 데이터

### 외형

종, 폼, Aspects와 함께 Scale, Pose, Animation, Shining을 설정합니다. `Apply`하면 문서 외형을 NPC에 구성합니다. 파일 기반 바인딩은 최신 문서를 추적하지만, 별도 외형 도구로 NPC만 바꾼 값은 다음 문서 해석과 충돌할 수 있으므로 외형의 기준 소스를 하나로 정하세요.

## 테스트 체크리스트

1. 조건 그룹을 비운 상태와 각 조건을 만족/불만족한 상태로 시험합니다.
2. win, loss, flee, battle_end를 각각 발생시킵니다.
3. Once Per Round와 First Clear를 반복 전투로 확인합니다.
4. FTB Quests 또는 통화 모드를 뺀 테스트에서 실패가 보류되는지 확인합니다.
5. Pokemon Itself의 두 번째 라운드가 진행도에 따라 바뀌는지 확인합니다.
6. npc_hide/despawn이 다른 액션보다 먼저 실행되지 않는지 확인합니다.
