---
title: 조건·보상과 Pokemon Itself
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: 라운드 조건과 승리 보상의 비교·실행 방식, Pokemon Itself의 데이터와 외형 동작을 설명합니다.
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

## 조건은 언제 검사되는가

조건은 라운드별로 최대 32개입니다. 비어 있으면 통과하며, `AND`는 모든 조건, `OR`은 하나 이상의 조건이 참이어야 합니다.

서버는 자동 감지 대상을 찾을 때 조건을 먼저 검사하고, 연출이 끝난 뒤 실제 배틀을 시작하기 직전에 같은 조건을 다시 검사합니다. 연출 도중 아이템이 사라지거나 태그가 바뀌면 배틀이 취소될 수 있습니다.

## 조건 유형별 정확한 판정

| Type | Key | Value | 허용 Operation과 판정 |
| --- | --- | --- | --- |
| `tag` | 스코어보드 태그 | 사용 안 함 | `has`, `not`으로 플레이어 태그 존재 여부 검사 |
| `item` | 아이템 ID | 수량 | `has`, `not`, `>=`, `<=`, `==`, `!=`, `>`, `<`. 플레이어 인벤토리의 같은 아이템 총합을 셉니다. |
| `stored` | storeddata 키 | 비교값 | 숫자로 읽히면 수치 비교, 아니면 `==`/`!=` 문자열 비교를 수행합니다. |
| `advancement` | 발전 과제 ID | 사용 안 함 | `has`, `not`으로 완료 여부 검사 |
| `cobblemon_party` | 포켓몬 종 | 수량 | 활성 파티에서 같은 종의 수를 세어 수량 비교. `cobblemon:` 생략 가능 |

`item`의 `has`는 수량이 1개 이상인지, `not`은 0개인지 검사합니다. NBT가 다른 같은 아이템도 아이템 종류가 같으면 함께 계산합니다.

:::note stored 값
`stored`는 CustomNPCs 스크립트 사용자가 접근하는 storeddata 계열 런타임 값입니다. 일반 파일 경로나 임의 JSON 키를 읽는 기능이 아닙니다.
:::

## 보상 선택 순서

보상은 라운드당 최대 32개이며 승리 결과가 확정된 뒤 실행됩니다.

1. `Grant Policy`가 현재 플레이어 진행도에서 지급 가능한지 검사합니다.
2. 각 항목의 Chance를 독립적으로 굴려 후보를 만듭니다.
3. Reward Mode가 `All`이면 후보를 모두 실행하고, `One random`이면 후보 중 하나만 무작위 실행합니다.
4. 실제로 하나 이상의 보상이 성공하면 해당 라운드의 지급 기록을 남깁니다.

| Grant Policy | 동작 |
| --- | --- |
| `Every clear` | 승리할 때마다 시도 |
| `First clear only` | 이 NPC를 한 번도 클리어하지 않은 첫 승리에만 시도 |
| `Once per round` | 라운드별 최초 한 번만 시도. 다른 라운드는 별도 기록 |

Chance는 0.0–1.0입니다. `One random`에서도 먼저 Chance를 통과한 후보만 추첨 대상이 됩니다.

## 보상 유형별 서버 처리

| Type | Operation | 실제 동작 |
| --- | --- | --- |
| `item` | `give`, `take` | 수량은 1–6400. `take`는 전체 수량이 있을 때만 회수하며 일부만 가져가지 않습니다. 지급 공간이 부족하면 남은 스택을 플레이어 위치에 드롭합니다. |
| `tag` | `add`, `remove` | 플레이어 스코어보드 태그를 추가·제거합니다. |
| `stored` | `set`, `add`, `subtract`, `remove` | 문자열 설정, 숫자 가감, 키 삭제를 수행합니다. |
| `command` | `run` | 서버 권한 레벨 4의 조용한 명령으로 실행합니다. 앞의 `/`는 제거됩니다. |
| `advancement` | `grant`, `revoke` | 지정 발전 과제만 지급하거나 회수합니다. |
| `currency` | `add`, `take`, `set` | DRM Currency ID의 잔액을 서버에서 변경합니다. 음수 수량은 0으로 정규화됩니다. |
| `cobblemon_give` | `give` | 지정 종과 1–100 레벨의 포켓몬을 만들어 활성 파티에 추가합니다. |

Command에는 `{player}`, `{uuid}`, `{npc}`, `{battle}` 치환값을 사용할 수 있습니다. 사용자 입력을 그대로 연결하는 명령은 권한 상승 위험이 있으므로 정식 서버 전에 반드시 실제 값으로 시험하세요.

## 실전 조건 예시

| 원하는 결과 | Type | Operation | Key | Value |
| --- | --- | --- | --- | --- |
| 배지 태그가 있어야 도전 | `tag` | `has` | `badge_boulder` | 비움 |
| 에메랄드 16개 이상 | `item` | `>=` | `minecraft:emerald` | `16` |
| 파티에 피카츄 1마리 이상 | `cobblemon_party` | `>=` | `cobblemon:pikachu` | `1` |
| 특정 발전 과제를 아직 완료하지 않음 | `advancement` | `not` | 발전 과제 ID | 비움 |

`AND`로 묶으면 위 조건을 모두 만족해야 하고, `OR`로 묶으면 하나만 만족해도 됩니다. 조건별 중첩 그룹은 만들지 않으므로 복잡한 `(A AND B) OR C`는 stored 값이나 태그로 앞단에서 정리하는 방식이 안전합니다.

## Pokemon Itself가 Trainer와 다른 점

`Pokemon Itself`는 라운드·재대전·조건·보상 대신 한 마리의 전체 포켓몬 데이터를 사용합니다. `Trainer` 카테고리는 비활성화되고 `Pokemon Party` 화면에서 단일 슬롯을 편집합니다.

- 전투 형식은 Singles 기반의 Cobblemon PVE입니다.
- 기본 연출은 `presets/vs_pokemon.json`입니다.
- 종, 폼, Aspects, Shiny, 레벨, 성격, 특성, 기술, 볼, 지닌 도구가 실제 상대 데이터가 됩니다.
- Scale은 0.05–12.0, Pose 기본값은 `AUTO`, Animation은 빈 값일 때 자동 상태를 사용합니다.
- `Shiny`는 포켓몬 자체의 이로치 데이터이고 `Shining`은 NPC 렌더의 별도 강조 효과입니다.

Pokemon Itself를 NPC에 적용하면 종과 Form/Aspects를 조합해 CustomNPCs NPC의 포켓몬 외형도 구성합니다. 외형만 따로 바꾸고 전투 JSON을 다시 적용하면 JSON의 Appearance 값이 다시 우선할 수 있으므로 최종 외형은 Pokemon Itself 문서에서 관리하는 편이 일관적입니다.

## Pokemon Itself 제작 순서

1. `Use Default`로 기본 이상해씨를 불러옵니다.
2. Species와 Level만 바꾸고 저장·적용해 전투 생성부터 확인합니다.
3. Form과 Aspects를 추가하고 월드 외형과 배틀 모델이 모두 맞는지 봅니다.
4. Nature, Ability, Moves, Held Item을 고정합니다.
5. Scale, Pose, Animation, Shining을 조정합니다.
6. 사용자 연출을 연결한 뒤 마지막으로 재적용합니다.
