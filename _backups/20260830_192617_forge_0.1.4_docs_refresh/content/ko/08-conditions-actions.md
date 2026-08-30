---
title: 조건과 액션
slug: conditions-actions
order: 70
description: 대화 노드, route, 선택지에서 사용하는 조건, 액션, 보상형 처리입니다.
product: core
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.1.2
audience: 대화 제작자
tags:
  - condition
  - action
---

## 적용 위치

조건과 액션은 대화 문서의 여러 위치에 붙습니다.

| 위치 | 조건 필드 | 액션 필드 | 설명 |
| --- | --- | --- | --- |
| 노드 | `conditions` | 없음 | 노드 자체가 진입 가능한지 정합니다. |
| 시작 route | `conditions` | route 자체 필드 | 시작 노드에서 어느 흐름으로 갈지 정합니다. |
| 선택지 | `conditions` | `actions` | 선택지가 보일지, 눌렀을 때 무엇을 할지 정합니다. |

조건 배열이 비어 있으면 통과합니다. 모드는 `and`와 `or`를 지원합니다. 값이 비어 있거나 알 수 없으면 `and`로 처리됩니다.

## 조건 타입

| type | 주요 필드 | 동작 |
| --- | --- | --- |
| `tag` | `key`, `tag`, `value`, `op` | 플레이어 태그가 있는지 봅니다. |
| `cnpc_stored_data` | `scope`, `key`, `op`, `valueType`, `value` | CustomNPCs의 플레이어, 문맥 엔티티, 월드 Stored Data를 조회하고 비교합니다. |
| `item` | `key`, `value`, `op` | 플레이어 인벤토리의 아이템 수량을 비교합니다. |
| `faction_score` | `faction`, `key`, `amount`, `value`, `op` | CustomNPCs faction point를 비교합니다. |
| `advancement` | `advancement`, `key`, `op` | 발전 과제 완료 여부를 봅니다. |
| `ftb` | `quest`, `key`, `value`, `op` | FTB 퀘스트 상태를 봅니다. |
| `ftb_task` | `quest`, `task`, `op` | FTB 퀘스트 태스크 상태를 봅니다. |

숫자 비교 조건은 `>`, `>=`, `<`, `<=`, `==`, `!=`를 사용할 수 있습니다. 태그와 발전 과제는 보통 `has` 또는 `not`을 사용합니다.

레거시 `stored` 조건은 제거되었습니다. 이전 JSON에 `"type": "stored"`가 남아 있어도 DRM이 `cnpc_stored_data`로 해석하고, 에디터에서 다시 저장하면 새 타입으로 정규화합니다. 새 조건에는 항상 `cnpc_stored_data`를 사용하십시오.

`cnpc_stored_data`는 `player`, `context_entity`, `world` Scope와 `exists`, `not_exists`, 문자열·숫자 비교를 지원합니다. 에디터 사용 순서, 이전 JSON 이관, 실행 위치별 문맥 차이, 스크립트 예제와 실패 규칙은 스크립트 API 섹션의 **CustomNPCs Stored Data 조건 연동** 문서를 참고하십시오.

## 액션 타입

| type | 주요 필드 | 동작 |
| --- | --- | --- |
| `goto` | `value` | 같은 대화 문서 안의 노드로 이동합니다. |
| `go_shop` | `shop`, `value` | NPC에 붙은 상점 또는 `npc_shops` 파일 상점을 엽니다. |
| `close` | 없음 | 대화 화면을 닫습니다. |
| `command` | `command`, `value` | 서버 명령을 플레이어 기준으로 실행합니다. |
| `tag` | `key`, `op` | 플레이어 태그를 추가하거나 제거합니다. |
| `item` | `itemId`, `count`, `itemOp` | 아이템을 지급, 회수, 수량 맞춤 처리합니다. |
| `faction_score` | `faction`, `amount`, `factionOp` | CustomNPCs faction point를 변경합니다. |
| `advancement` | `advancement`, `criterion`, `advancementOp` | 발전 과제를 지급하거나 회수합니다. |
| `ftb_task` | `quest`, `task` | FTB 퀘스트 태스크를 완료 처리합니다. |
| `ftb_complete` | `quest` | FTB 퀘스트를 완료 처리합니다. |

`goto`, `go_shop`, `close`는 화면 이동 액션입니다. 선택지의 액션 배열에서 이 타입을 만나면 다음 화면이 결정됩니다. 그 외 타입은 서버에서 결과를 처리하는 액션입니다.

## 보상형 액션

보상은 별도 보상 시스템이 아니라 액션 조합으로 만듭니다.

| 원하는 결과 | 쓰는 액션 |
| --- | --- |
| 아이템 지급 | `item` + `itemOp: "give"` |
| 아이템 회수 | `item` + `itemOp: "take"` 또는 `"remove"` |
| 특정 수량으로 맞춤 | `item` + `itemOp: "set"` |
| 태그 부여 | `tag` + `op: "add"` |
| 태그 제거 | `tag` + `op: "remove"` |
| 호감도/팩션 점수 변경 | `faction_score` |
| 발전 과제 지급 | `advancement` + `advancementOp: "grant"` |
| FTB 퀘스트 처리 | `ftb_task`, `ftb_complete` |

한 선택지에 여러 액션을 넣을 수 있습니다. 예를 들어 아이템을 주고 태그를 붙인 다음 다음 노드로 이동하려면 `item`, `tag`, `goto` 순서로 넣습니다.

## 명령 액션

`command` 액션에는 마인크래프트 명령어를 그대로 넣습니다. 채팅에 입력할 때 붙이는 앞의 `/`는 제거하고, 명령은 플레이어 기준으로 실행됩니다.

사용 가능한 플레이스홀더는 다음과 같습니다.

| 플레이스홀더 | 치환 값 |
| --- | --- |
| `{player}` / `%player%` / `${player}` | 플레이어 이름 |
| `{uuid}` / `%uuid%` | 플레이어 UUID |

## 아이템 액션

| itemOp | 동작 |
| --- | --- |
| `give` | `count`만큼 아이템을 지급합니다. |
| `take` 또는 `remove` | `count`만큼 아이템을 회수합니다. |
| `set` | 현재 수량이 `count`가 되도록 지급 또는 회수합니다. |

아이템 ID는 `minecraft:apple`처럼 네임스페이스를 포함해야 합니다.

## 제한

- 조건은 등록된 타입만 사용할 수 있습니다. 임의의 JavaScript나 스크립트 조건을 직접 실행하지 않습니다.
- 액션 결과는 서버 기준으로 처리됩니다. 클라이언트 화면 텍스트만 바꾼다고 실제 보상이 지급되지는 않습니다.
- FTB 관련 조건과 액션은 FTB Quests가 로드된 환경에서 의미가 있습니다.
- 상점 열기는 `go_shop`으로 연결하지만, 상점 상품과 가격은 NPC Shop 문서가 담당합니다.
