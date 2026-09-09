---
title: 보상과 흐름 만들기
slug: dialogue-rewards
order: 71
description: 선택지 액션을 조합해 아이템 보상, 태그, 상점 이동, 노드 이동을 구성합니다.
product: core
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.1.4
audience: 대화 제작자
tags:
  - dialogue
  - reward
---

## 보상은 액션 조합으로 만든다

Dialogue Editor에는 별도의 보상 전용 노드가 있는 것이 아니라, 선택지 또는 route의 액션 배열에 보상형 액션을 넣어 결과를 만듭니다.

예를 들어 “사과를 주고 다음 대사로 이동”은 다음 순서가 됩니다.

1. 선택지 생성
2. `item` 액션 추가
3. `itemOp`를 `give`로 설정
4. `itemId`를 `minecraft:apple`로 설정
5. `count`를 지급 수량으로 설정
6. 마지막에 `goto` 액션 추가

## 자주 쓰는 액션 조합

| 목표 | 액션 순서 |
| --- | --- |
| 보상 지급 후 다음 노드 | `item` -> `goto` |
| 퀘스트 시작 표시 후 다음 노드 | `tag` -> `goto` |
| 조건 태그 제거 후 종료 | `tag remove` -> `close` |
| 명령 실행 후 안내 대사 | `command` -> `goto` |
| 상점으로 이동 | `go_shop` |
| 보상 지급 후 상점 열기 | `item` -> `go_shop` |

화면 이동 액션은 보통 마지막에 둡니다. 먼저 서버 결과를 처리하고, 마지막에 노드 이동이나 상점 열기를 실행하는 흐름이 읽기 쉽습니다.

## 조건 걸기

조건은 “이 선택지가 보여도 되는가”를 정합니다.

| 조건 예시 | 구성 |
| --- | --- |
| 태그가 있는 사람만 | `type: "tag"`, `op: "has"` |
| 태그가 없는 사람만 | `type: "tag"`, `op: "not"` |
| 아이템을 가진 사람만 | `type: "item"`, 아이템 ID와 수량 비교 |
| 팩션 점수가 일정 이상 | `type: "faction_score"`, `op: ">="` |
| 발전 과제 완료자만 | `type: "advancement"`, `op: "has"` |
| FTB 퀘스트 상태 기준 | `type: "ftb"` 또는 `ftb_task` |

조건은 노드, route, 선택지에 붙일 수 있습니다. 일반적으로 플레이어에게 보이는 선택지를 제어하려면 선택지 조건을 사용합니다.

## 상점 연결

상점을 열 때는 `go_shop` 액션을 사용합니다.

| shop 값 | 결과 |
| --- | --- |
| 빈 값 | 현재 NPC에 붙은 상점을 엽니다. |
| `bound` | 현재 NPC에 붙은 상점을 엽니다. |
| `blacksmith` | `npc_shops/blacksmith.json` 또는 ID가 `blacksmith`인 상점을 엽니다. |

파일 기반 상점으로 이동할 때는 NPC Shop에서 상점 파일을 먼저 저장하고, 대화 선택지의 `go_shop`에 같은 ID를 넣습니다.

## 할 수 없는 것

- 액션 배열만으로 상점 상품을 즉석에서 새로 만들 수 없습니다.
- 조건만 넣는다고 보상이 지급되지는 않습니다. 조건은 통과 여부만 정합니다.
- 클라이언트 화면 텍스트만 바꿔서는 서버 아이템이나 태그가 바뀌지 않습니다.
- 등록되지 않은 액션 타입은 런타임에서 의미 있는 결과를 만들지 않습니다.
