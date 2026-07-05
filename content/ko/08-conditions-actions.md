---
title: 조건과 액션
slug: conditions-actions
order: 90
description: 대화 노드, route, 선택지에서 사용하는 실제 조건과 액션 타입입니다.
product: core
category: 핵심 시스템
section: dialogue-editor
status: 안정
version: 0.1.2
audience: 스크립트 / 데이터 제작자
tags:
  - condition
  - action
---

## 조건 평가 위치

조건은 노드, 시작 route, 선택지에 붙을 수 있습니다. 배열이 비어 있으면 통과합니다.

| 위치 | 필드 | 모드 필드 |
| --- | --- | --- |
| 노드 | `conditions` | `conditionMode` |
| 시작 route | `conditions` | `mode` |
| 선택지 | `conditions` | `conditionMode` |

모드는 `and`와 `or`를 지원합니다. 값이 비어 있거나 알 수 없으면 `and`로 처리됩니다.

## 조건 타입

| type | 주요 필드 | 동작 |
| --- | --- | --- |
| `tag` | `key`, `tag`, `value`, `op` | 플레이어 태그가 있는지 확인합니다. `op: "not"`은 없음 조건입니다. |
| `stored` | `key`, `value`, `op` | 플레이어 PersistentData의 `dochi_rpg_maker.dialogue.runtime.<key>` 값을 비교합니다. |
| `item` | `key`, `value`, `op` | 플레이어 인벤토리의 아이템 수량을 비교합니다. |
| `faction_score` | `faction`, `key`, `amount`, `value`, `op` | CustomNPCs faction point를 비교합니다. |
| `advancement` | `advancement`, `key`, `op` | 발전 과제 완료 여부를 확인합니다. |
| `ftb` | `quest`, `key`, `value`, `op` | FTB 퀘스트 상태를 확인합니다. |
| `ftb_task` | `quest`, `task`, `op` | FTB 퀘스트 태스크 상태를 확인합니다. |

숫자 비교를 쓰는 조건은 `>`, `>=`, `<`, `<=`, `==`, `!=`를 사용할 수 있습니다. 태그와 발전 과제는 보통 `has` 또는 `not`을 사용합니다.

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

`goto`, `go_shop`, `close`는 내비게이션 액션입니다. 선택지의 액션 배열에서 이 세 타입을 만나면 화면 이동이 결정됩니다. 그 외 타입은 서버 side effect로 실행됩니다.

## 명령 액션

`command` 액션은 앞의 `/`를 제거한 뒤 플레이어 기준으로 실행합니다.

```json
{
  "type": "command",
  "command": "title {player} actionbar {\"text\":\"Quest started\",\"color\":\"green\"}"
}
```

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

:::warning 선택지 순서
액션 배열에 `command` 뒤 `goto`가 있으면 명령을 먼저 실행한 뒤 노드를 이동합니다. `close`나 `go_shop`을 너무 앞에 두면 뒤 액션이 실행되지 않을 수 있으므로 결과를 먼저, 화면 이동을 나중에 두는 편이 안전합니다.
:::
