---
title: 조건과 보상
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: 라운드 조건, 승리 보상, 지급 기록과 Pokemon Itself 설정입니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.0
audience: 조건부 전투와 포켓몬 NPC를 만드는 제작자
tags:
  - conditions
  - rewards
  - pokemon-itself
---

## 라운드별 규칙

Conditions와 Rewards는 Trainer 전체 공용이 아니라 라운드별 데이터입니다. 1라운드에 만든 조건이나 보상은 2라운드에 자동 복사되지 않습니다.

- 라운드당 조건 최대 32개
- 라운드당 보상 최대 32개
- 조건·보상 행 드래그로 순서 변경
- 화면 위 라운드 번호로 편집 대상 전환
- `Add Round`로 만든 새 라운드는 조건과 보상이 비어 있음

복잡한 트레이너를 편집할 때는 먼저 라운드를 선택하고 조건과 보상을 차례로 작성하세요.

## 조건을 검사하는 시점

조건은 한 번만 검사되지 않습니다.

1. Vision/Radius가 자동 감지 대상을 고를 때
2. Interaction 또는 자동 조우가 전투를 예약할 때
3. Battle Presentation과 Start Delay가 끝나 실제 배틀을 시작하기 직전

첫 검사에서 통과해도 연출 중 아이템이 없어지거나 태그·stored 값·파티가 바뀌면 마지막 검사에서 실패할 수 있습니다. 이 경우 배틀은 시작되지 않고 NPC 예약과 잠금이 해제됩니다.

## AND와 OR

| Mode | 판정 |
| --- | --- |
| `AND` | 모든 조건이 참이어야 통과 |
| `OR` | 하나 이상 참이면 통과 |

조건이 비어 있으면 항상 통과합니다. 단일 목록 안에 중첩 그룹은 만들 수 없으므로 `(A AND B) OR C` 같은 식은 직접 표현할 수 없습니다. 이런 경우 앞선 대화·스크립트·퀘스트에서 태그 또는 stored 값을 하나로 정리하고 Trainer 조건에서는 그 결과만 검사하는 방식이 안전합니다.

## 조건 공통 필드

| 필드 | 기능 |
| --- | --- |
| `Type` | 검사할 데이터 종류 |
| `Operation` | 존재 여부 또는 비교 방법 |
| `Key` | 태그, 아이템 ID, stored 키, 발전 과제 ID, 포켓몬 종 |
| `Value` | 수량이나 비교값. Type에 따라 사용하지 않을 수 있음 |

`Find` 버튼이 제공되는 Type은 현재 서버 레지스트리나 DRM 데이터에서 키를 검색해 선택합니다. 직접 입력할 때는 네임스페이스와 철자를 정확히 확인하세요.

## tag 조건

플레이어의 Minecraft 명령 태그를 검사합니다.

| Operation | 통과 조건 |
| --- | --- |
| `has` | 플레이어가 Key 태그를 가짐 |
| `not` | 플레이어가 Key 태그를 가지지 않음 |

예시:

| 목적 | Operation | Key |
| --- | --- | --- |
| 바위 배지 보유자만 도전 | `has` | `badge_boulder` |
| 이미 보스를 깬 플레이어 제외 | `not` | `boss_cleared` |

태그는 명령, DRM 액션, Trainer 보상의 `tag add/remove`로 관리할 수 있습니다.

## item 조건

플레이어 인벤토리 전체에서 같은 아이템 ID의 개수를 합산합니다. NBT가 다른 스택도 아이템 종류가 같으면 함께 계산합니다.

| Operation | 판정 |
| --- | --- |
| `has` | 총수량이 1개 이상 |
| `not` | 총수량이 0개 |
| `>=`, `<=`, `==`, `!=`, `>`, `<` | 총수량과 Value 숫자 비교 |

예시:

```text
Type: item
Operation: >=
Key: minecraft:emerald
Value: 16
```

이 조건은 아이템을 소비하지 않습니다. 실제로 회수하려면 승리 보상 `item take` 또는 앞선 DRM 액션을 별도로 사용해야 합니다.

## stored 조건

`stored`는 일반 JSON 키나 파일 경로를 읽는 기능이 아닙니다. DRM 대화·스크립트 연동에서 사용하는 플레이어 런타임 저장 키를 검사합니다. 내부적으로는 플레이어 DRM PersistentData의 `dochi_rpg_maker.dialogue.runtime.<키>` 영역을 사용합니다.

CustomNPCs 스크립트에서 storeddata 계열 흐름과 연동할 때도 DRM이 읽는 같은 키에 값을 전달해야 합니다. 단순히 임의의 NPC storeddata에 같은 이름을 넣는 것만으로는 플레이어 조건이 되지 않습니다.

### 비교 방식

- 실제값과 Value를 둘 다 숫자로 읽을 수 있으면 숫자 비교
- 둘 중 하나라도 숫자로 읽지 못하면 문자열 비교
- 문자열 비교에서 실질적으로 사용하는 연산은 `==`, `!=`
- 키가 없으면 실제값은 빈 문자열로 취급

예시:

| 목적 | Operation | Key | Value |
| --- | --- | --- | --- |
| 퀘스트 단계 3 이상 | `>=` | `forest_quest_stage` | `3` |
| 선택 결과가 accept | `==` | `gym_choice` | `accept` |
| 잠금 상태가 아님 | `!=` | `trainer_lock` | `locked` |

## advancement 조건

지정한 Minecraft 발전 과제의 완료 여부를 검사합니다.

| Operation | 통과 조건 |
| --- | --- |
| `has` | 발전 과제가 완료됨 |
| `not` | 발전 과제가 완료되지 않음 |

Key는 `namespace:path` 형식의 실제 발전 과제 ID여야 합니다. 존재하지 않는 ID는 완료되지 않은 것으로 판정됩니다.

## cobblemon_party 조건

플레이어의 활성 Cobblemon 파티에서 같은 Species의 수를 셉니다. PC는 검사하지 않습니다.

| Operation | 판정 |
| --- | --- |
| `has` 또는 기본 | 같은 종이 1마리 이상 |
| `not` | 같은 종이 0마리 |
| `>=`, `<=`, `==`, `!=`, `>`, `<` | 같은 종의 수와 Value 비교 |

`pikachu`처럼 네임스페이스를 생략하면 `cobblemon:pikachu`로 정규화됩니다. Form, Aspects, Shiny, 레벨은 이 조건에서 비교하지 않습니다. 종만 일치하면 같은 수에 포함됩니다.

## 조건 조합 예시

### 체육관 입장 조건

Mode: `AND`

1. `tag has story_chapter_2`
2. `item >= minecraft:emerald 8`
3. `cobblemon_party >= cobblemon:pikachu 1`

세 조건을 모두 만족해야 자동 감지와 전투 시작이 허용됩니다. 에메랄드는 검사만 하며 소비되지 않습니다.

### 두 가지 자격 중 하나

Mode: `OR`

1. `tag has gym_pass`
2. `advancement has custom:elite_access`

둘 중 하나만 만족해도 통과합니다.

## 보상 실행 시점

보상은 Cobblemon 배틀 결과가 `win`으로 확정된 뒤 현재 라운드에서 실행됩니다.

- 승리: 보상 시도, 클리어 수 증가
- 패배: 보상 없음, 클리어 수 증가 없음
- 도주: 보상 없음, 클리어 수 증가 없음

보상 실행 전에 사용되는 진행도는 이번 승리를 기록하기 전 상태입니다. 이 때문에 `First clear only`는 최초 승리에서만 허용됩니다.

## 보상 판정 순서

서버는 다음 순서로 처리합니다.

1. `Grant Policy`가 현재 진행도에서 허용되는지 검사
2. 각 보상의 Chance를 독립적으로 굴림
3. Chance를 통과한 항목만 후보 목록에 추가
4. `Reward Mode`로 실행 대상을 선택
5. 선택된 보상을 실제 실행
6. 하나 이상 성공하면 현재 라운드를 지급 성공 기록에 추가
7. 승리 결과와 증가한 클리어 수를 저장

Chance를 모두 실패하면 보상 성공 기록은 남지 않습니다.

## Reward Mode

| Mode | 동작 |
| --- | --- |
| `All` | Chance를 통과한 모든 후보를 순서대로 실행 |
| `One random` | Chance를 통과한 후보 중 하나만 무작위 선택해 실행 |

`One random`은 먼저 하나를 고른 다음 Chance를 굴리는 방식이 아닙니다. 각 항목이 먼저 Chance를 통과해야 추첨 후보가 됩니다. 후보가 0개면 아무 보상도 실행하지 않습니다.

## Grant Policy

| Policy | 동작 | 실패했을 때 |
| --- | --- | --- |
| `Every clear` | 승리할 때마다 보상 판정 | 다음 승리에서 다시 시도 |
| `First clear only` | 이 NPC에 대한 클리어 수가 0인 최초 승리에서만 판정 | Chance 실패나 실행 실패여도 클리어 수는 증가하므로 다음 승리에는 재시도 불가 |
| `Once per round` | 해당 라운드가 지급 성공 기록에 없을 때 판정 | 모든 Chance 실패 또는 모든 실행 실패면 기록되지 않아 다음에 같은 라운드를 이길 때 재시도 가능 |

`Once per round`는 “라운드를 한 번 이겼는가”가 아니라 “그 라운드에서 하나 이상의 보상이 실제 성공했는가”를 기록합니다.

## 보상 공통 필드

| 필드 | 기능 |
| --- | --- |
| `Type` | 실행할 보상 종류 |
| `Operation` | 지급, 회수, 설정 등 세부 동작 |
| `Key` | 아이템·태그·stored·명령·발전 과제·통화·포켓몬 종 |
| `Value` | 수량, 레벨 또는 설정할 문자열 |
| `Chance` | 0.0–1.0. 1.0은 항상, 0.5는 50% |

## item 보상

| Operation | 동작 |
| --- | --- |
| `give` | 1–6400개를 아이템 최대 스택 크기에 맞춰 나눠 지급 |
| `take` | 플레이어가 전체 수량을 가지고 있을 때만 전부 회수 |

`take`는 일부만 가져가지 않습니다. 필요한 수량보다 하나라도 부족하면 실패하고 아무것도 회수하지 않습니다.

`give`에서 인벤토리에 들어가지 못한 남은 스택은 플레이어 위치에 드롭됩니다. 아이템 ID가 유효하지 않으면 보상 실행이 실패합니다. NBT 지정 지급은 지원하지 않습니다.

## tag 보상

| Operation | 동작 |
| --- | --- |
| `add` | 플레이어 명령 태그 추가 |
| `remove` | 플레이어 명령 태그 제거 |

이미 있는 태그를 추가하거나 없는 태그를 제거해도 서버 동작 자체는 성공으로 처리됩니다. 태그 키는 비어 있으면 실패합니다.

## stored 보상

| Operation | 동작 |
| --- | --- |
| `set` | Value 문자열을 그대로 저장 |
| `add` | 현재값과 Value를 숫자로 읽어 더함 |
| `subtract` | 현재값에서 Value를 숫자로 읽어 뺌 |
| `remove` | 값을 빈 문자열로 지움 |

`add`와 `subtract`에서 숫자로 읽지 못하는 현재값이나 Value는 0으로 처리됩니다. 계산 결과는 소수 문자열로 저장될 수 있습니다.

같은 키를 다음 라운드 조건에서 읽어 단계형 전투를 만들 수 있습니다.

```text
1라운드 보상: stored set gym_stage 1
2라운드 조건: stored >= gym_stage 1
2라운드 보상: stored set gym_stage 2
```

## command 보상

`command run`은 서버 명령 권한 레벨 4의 조용한 실행 소스로 명령을 실행합니다. 명령 앞의 `/`는 제거됩니다.

사용 가능한 치환값:

| 값 | 치환 결과 |
| --- | --- |
| `{player}` | 플레이어 이름 |
| `{uuid}` | 플레이어 UUID |
| `{npc}` | 트레이너 NPC UUID |
| `{battle}` | Cobblemon 배틀 UUID |

예시:

```text
title {player} title {"text":"Victory!"}
```

명령은 강한 권한으로 실행되므로 외부 입력이나 플레이어가 조작할 수 있는 문자열을 이어 붙이지 마세요. 잘못된 명령도 실행 요청 자체가 전달되면 보상 성공으로 취급될 수 있으므로 서버 로그와 실제 결과를 함께 확인해야 합니다.

## advancement 보상

| Operation | 동작 |
| --- | --- |
| `grant` | `advancement grant <player> only <ID>` 실행 |
| `revoke` | `advancement revoke <player> only <ID>` 실행 |

지정한 한 발전 과제만 대상으로 합니다. ID가 잘못되면 원하는 결과가 생기지 않으므로 실제 서버 명령으로 먼저 검증하세요.

## currency 보상

DRM Currency ID의 플레이어 잔액을 변경합니다.

| Operation | 동작 |
| --- | --- |
| `add` | 잔액 증가 |
| `take` | 잔액 차감. DRM 통화 저장소가 차감을 거부하면 실패 |
| `set` | 잔액을 지정값으로 설정 |

Value는 0 이상의 정수로 처리되며 음수는 0으로 보정됩니다. PokéMart의 `cobbledollars` 공급자가 아니라 DRM Currency Editor에서 만든 통화 ID를 사용합니다.

## cobblemon_give 보상

Key의 Species와 Value의 레벨로 새 포켓몬을 만들어 플레이어의 활성 파티에 추가합니다.

- Species는 `cobblemon:` 생략 가능
- 레벨은 1–100
- 폼·성격·특성·기술·볼·지닌 도구 세부 지정 없음
- 활성 파티에만 추가
- 파티가 가득 차면 실패
- PC로 자동 전달하지 않음

`First clear only`와 함께 사용할 때 파티가 가득 차 있으면 포켓몬을 받지 못하고 다음 승리에 재시도할 수도 없습니다. 안전하게 지급하려면 `Every clear` 또는 `Once per round`를 사용하거나 명령·별도 전달 흐름을 고려하세요.

## 보상 설계 예시

### 최초 클리어 배지

- Reward Mode: `All`
- Grant Policy: `First clear only`
- `item give custom:boulder_badge 1`, Chance 1.0
- `tag add badge_boulder`, Chance 1.0

두 항목 중 하나만 성공해도 지급 성공 라운드로 기록되지만, First Clear 정책은 어차피 다음 승리에 다시 실행되지 않습니다. 두 보상이 모두 반드시 필요하면 아이템 ID와 태그를 배포 전 검증하세요.

### 반복 승리 랜덤 보상

- Reward Mode: `One random`
- Grant Policy: `Every clear`
- 포션 Chance 1.0
- 희귀 사탕 Chance 0.25
- 통화 Chance 1.0

희귀 사탕이 Chance에서 탈락하면 나머지 후보 중 하나를 고릅니다. 통과하면 세 후보 중 하나가 됩니다.

### 라운드별 최초 보상

- 각 라운드 Grant Policy: `Once per round`
- 1라운드: 태그와 소액 통화
- 2라운드: 아이템
- 3라운드: 고레벨 포켓몬

라운드 순서를 운영 중에 바꾸면 기존 지급 기록은 라운드 번호 기준으로 남으므로 보상 대응이 달라질 수 있습니다.

## Pokemon Itself

`Pokemon Itself`는 한 마리의 지정 포켓몬과 Cobblemon 기본 PVE 전투를 만드는 유형입니다.

Trainer와 다른 점:

- 라운드 없음
- 재대전 진행도 없음
- 라운드 조건·보상 없음
- Trainer AI Skill과 멀티 포맷 없음
- 한 마리 포켓몬 데이터와 월드 NPC 외형을 함께 관리
- 기본 연출 경로는 Pokemon용 프리셋

## Pokemon Itself 포켓몬 데이터

Species, Form, Aspects, Shiny, Level, Nature, Ability, Moves, Poké Ball, Held Item의 생성 규칙은 Trainer 슬롯과 같습니다.

전투가 시작되면 서버는 설정으로 실제 Cobblemon 포켓몬 엔티티를 만들고 CustomNPCs NPC를 숨긴 뒤 표준 PVE 배틀을 시작합니다. 전투 시작 실패, 승리, 패배, 도주 후에는 임시 포켓몬과 숨김 상태를 정리하고 NPC를 다시 표시합니다.

## Pokemon Itself 외형

| 필드 | 기능 |
| --- | --- |
| `Scale` | 0.05–12.0, 월드의 NPC 포켓몬 모델 크기 |
| `Pose` | 기본 `AUTO`, 지원되는 포즈를 선택 |
| `Animation` | 빈 값이면 자동 상태, 지정하면 해당 애니메이션 요청 |
| `Shining` | NPC 렌더 주변의 별도 강조 효과 |

`Shiny`는 실제 포켓몬 데이터의 이로치 상태이고 `Shining`은 CustomNPCs NPC 렌더 효과입니다. 서로 자동으로 같은 값이 되지 않습니다.

Pokemon Itself 문서를 NPC에 적용하면 Species·Form·Aspects를 기준으로 NPC 외형도 다시 구성합니다. 별도 Appearance Editor에서 외형을 바꾼 뒤 Pokemon Itself JSON을 다시 적용하면 문서의 Appearance가 다시 우선할 수 있습니다.

## Pokemon Itself 제작 순서

1. `Use Default`로 한 마리 기본값을 엽니다.
2. Species와 Level만 바꿉니다.
3. `Save As` 후 NPC에 Apply하고 PVE 배틀 생성부터 확인합니다.
4. Form과 Aspects를 추가해 월드 외형과 배틀 모델을 확인합니다.
5. Nature, Ability, Moves, Poké Ball, Held Item을 고정합니다.
6. Scale, Pose, Animation, Shining을 조정합니다.
7. Pokemon용 Battle Presentation을 연결합니다.
8. 정상 승패·도주와 NPC 재표시를 확인합니다.

## 조건·보상 테스트 체크리스트

- 각 조건 Type을 참·거짓 상태에서 한 번씩 시험
- AND와 OR 모두 시험
- 자동 감지 전과 연출 중 조건 변경 시험
- Every Clear, First Clear, Once per Round를 각각 2회 이상 승리해 확인
- Chance 0, 0.5, 1.0 확인
- All과 One Random 후보 처리 확인
- 아이템 부족 상태에서 `take`가 일부 회수하지 않는지 확인
- 파티가 가득 찬 상태에서 `cobblemon_give` 실패 확인
- 라운드 순서 변경 전 기존 지급 기록 영향을 확인
