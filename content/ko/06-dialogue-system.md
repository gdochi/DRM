---
title: 대화 시스템
slug: dialogue-system
order: 70
description: DialogueDocument 구조, 대화 세트 저장 방식, NPC 런타임 실행 흐름입니다.
product: core
category: 핵심 시스템
status: 안정
version: 0.1.2
audience: 대화 제작자
tags:
  - dialogue
  - npc
---

## DialogueDocument 구조

대화는 하나의 `DialogueDocument`로 읽히며, 파일로 저장할 때는 대화 세트 폴더 안에 `dialogue_set.json`과 노드별 JSON이 함께 생성됩니다.

| 필드 | 의미 |
| --- | --- |
| `version` | 현재 기본값은 `1`입니다. |
| `dialogueScript` | DRM 대화 문서임을 나타냅니다. |
| `globals` | FTB, GeckoLib, shopScript 같은 전역 호환 플래그입니다. |
| `dialogueDefaultGui` | 대화 런타임에서 사용할 GUI 연결입니다. |
| `setRegistry` | 포함된 대화 세트 이름 목록입니다. 기본값은 `default_set`입니다. |
| `nodes` | 노드 이름을 키로 하는 노드 객체 모음입니다. |
| `current` | 현재 선택된 노드 또는 시작 노드입니다. |
| `selectedSetScope` | 에디터에서 선택한 세트 범위입니다. |

## 노드와 선택지

| 단위 | 실제 필드 | 설명 |
| --- | --- | --- |
| 시작 노드 | `type: "start"` | 플레이어가 NPC를 열었을 때 조건부 route를 평가합니다. |
| 일반 노드 | `type: "general"` | NPC 대사, 선택지, 노드 조건을 가집니다. |
| Route | `routes` | 시작 노드에서 조건에 따라 다음 노드, 상점, 닫기를 고릅니다. |
| Choice | `choice` | 플레이어에게 보이는 선택지입니다. 조건 통과 후 화면에 표시됩니다. |
| Condition | `conditions` | 노드, route, choice의 표시/진입 가능 여부를 결정합니다. |
| Action | `actions` | 선택지를 눌렀을 때 이동, 상점 열기, 명령 실행 등을 수행합니다. |

예전 JSON의 `choices` 배열은 현재 런타임에서 쓰는 이름이 아닙니다. 현재 문서는 `choice` 배열을 사용합니다.

## 런타임 흐름

```text
NPC 우클릭
  -> DialogueStorage.load(npc)
  -> 시작 노드 route 조건 평가
  -> 현재 노드의 choice 조건 필터링
  -> 클라이언트 DialogueRuntimeScreen 열기
  -> 선택지 클릭
  -> actions 순서대로 평가
```

`goto`, `go_shop`, `close`는 화면 이동을 결정합니다. `command`, `tag`, `item`, `faction_score`, `advancement`, `ftb_task`, `ftb_complete`는 서버 상태를 바꾸는 side effect로 실행됩니다.

## 저장 방식

`dialogue_set` 서버 JSON을 저장하면 폴더는 다음처럼 구성됩니다.

```text
config/dochi_rpg_maker/dialogue_sets/my_set/
  dialogue_set.json
  start.json
  dialogue_1.json
  action_examples.json
```

불러올 때는 `dialogue_set.json`이 있으면 우선 읽고, 노드별 파일이 있으면 노드 파일을 조합해 다시 문서로 만듭니다. 기본 세트 `default_set`은 보호 기본값이므로 직접 덮어쓰기보다 `Save As`로 새 세트를 만듭니다.

## NPC에 저장되는 값

대화가 NPC에 적용되면 NPC PersistentData에 다음 계열 키가 저장됩니다.

| 키 계열 | 설명 |
| --- | --- |
| `dochi_rpg_maker.dialogue.json` | NPC에 직접 저장된 대화 JSON입니다. |
| `dochi_rpg_maker.dialogue.source.kind` | 서버 JSON 종류입니다. 보통 `dialogue_set`입니다. |
| `dochi_rpg_maker.dialogue.source.path` | 서버 JSON 경로입니다. |
| `dochi_rpg_maker.dialogue.enabled` | 대화 활성 여부입니다. |

서버 JSON 경로가 있으면 런타임은 먼저 그 파일을 읽습니다. 파일이 없거나 읽지 못하면 NPC에 직접 저장된 JSON을 사용합니다.

:::tip 기본 샘플
기본 `default_set`은 1번 시작 노드에서 2번 인사 노드로 이동하고, 3-5번 노드로 분기하는 작은 샘플 대화입니다. 새 기능을 확인할 때 이 세트를 복제해 테스트하면 안전합니다.
:::
