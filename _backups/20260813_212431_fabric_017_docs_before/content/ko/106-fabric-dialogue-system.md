---
title: 다이얼로그 에디터
slug: dialogue-system
order: 60
description: Dialogue Editor의 화면 구조, 대화 문서, 노드, 선택지, 런타임 연결 방식입니다.
product: core-fabric
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.1.6
audience: 대화 제작자
tags:
  - dialogue
  - npc
---

## 역할

Dialogue Editor는 NPC 대화를 만드는 에디터입니다. 한 대화 문서는 `DialogueDocument` 구조를 사용하고, 그 안에 시작 노드, 일반 노드, 선택지, 조건, 액션, GUI 연결 정보가 들어갑니다.

대화는 크게 두 단계로 동작합니다. 먼저 `start` 노드가 어떤 일반 노드로 들어갈지 정하고, 그 다음 일반 노드가 대사와 선택지를 보여줍니다. `start` 노드는 한 대화 세트에 하나만 두는 입구 노드이며, 일반 노드들이 어떤 조건에서 호출될지 route를 정리하는 역할입니다.

## 저장 방식

대화 세트는 서버 JSON `dialogue_sets` 도메인에 저장됩니다.

```text
config/dochi_rpg_maker/dialogue_sets/my_set/
  dialogue_set.json
  start.json
  dialogue_1.json
  action_examples.json
```

`dialogue_set.json` 하나에 전체가 들어갈 수도 있고, 노드별 JSON 파일이 분리될 수도 있습니다. 로드할 때는 세트 파일과 노드 파일을 조합해 하나의 문서로 읽습니다.

## DialogueDocument 주요 필드

| 필드 | 의미 |
| --- | --- |
| `version` | 문서 형식 버전입니다. |
| `dialogueScript` | DRM 대화 문서임을 나타내는 값입니다. |
| `globals` | FTB, GeckoLib, shopScript 같은 전역 호환 플래그입니다. |
| `dialogueDefaultGui` | 대화 런타임에서 사용할 기본 GUI 연결입니다. |
| `setRegistry` | 포함된 대화 세트 이름 목록입니다. 기본값은 `default_set`입니다. |
| `nodes` | 노드 이름을 키로 갖는 노드 객체 모음입니다. |
| `current` | 에디터에서 현재 선택한 노드입니다. |
| `selectedSetScope` | 에디터에서 선택한 세트 범위입니다. |

## 노드 종류

| 종류 | 실제 값 | 역할 |
| --- | --- | --- |
| 시작 노드 | `type: "start"` | NPC를 처음 클릭했을 때 어느 일반 노드로 갈지 정합니다. |
| 일반 노드 | `type: "general"` | NPC 대사, 선택지, 조건, 액션을 담습니다. |

시작 노드는 보통 화면에 직접 대사를 보여주지 않습니다. 조건에 따라 다음 노드를 고르는 입구 역할을 합니다. 일반 노드는 플레이어가 실제로 보는 대화 화면입니다.

## 선택지와 route

| 단위 | 필드 | 설명 |
| --- | --- | --- |
| Route | `routes` | 시작 노드에서 조건에 따라 다음 노드, 상점, 닫기 동작을 고릅니다. |
| Choice | `choice` | 플레이어에게 보이는 선택지입니다. |
| Condition | `conditions` | 노드, route, 선택지가 보이거나 실행될 수 있는지 정합니다. |
| Action | `actions` | 선택지를 눌렀을 때 실행할 결과입니다. |

현재 문서 형식은 선택지 배열 이름으로 `choice`를 사용합니다. 예전 JSON의 `choices`는 현재 에디터가 쓰는 이름이 아닙니다.

## 대화 런타임 흐름

```text
NPC 우클릭
  -> NPC에 연결된 대화 source 확인
  -> 대화 세트 로드
  -> start 노드 route 조건 평가
  -> 일반 노드 표시
  -> 선택지 조건 필터링
  -> 선택지 클릭
  -> actions 순서대로 실행
```

`goto`, `go_shop`, `close`는 화면 이동을 결정합니다. `command`, `tag`, `item`, `faction_score`, `advancement`, `ftb_task`, `ftb_complete`는 서버 상태를 바꾸는 액션입니다.

## NPC에 저장되는 값

대화를 NPC에 적용하면 NPC PersistentData에 다음 계열 값이 저장됩니다.

| 키 계열 | 설명 |
| --- | --- |
| `dochi_rpg_maker.dialogue.json` | NPC에 직접 저장된 대화 JSON입니다. |
| `dochi_rpg_maker.dialogue.source.kind` | 서버 JSON 종류입니다. 보통 `dialogue_set`입니다. |
| `dochi_rpg_maker.dialogue.source.path` | 서버 JSON 경로입니다. |
| `dochi_rpg_maker.dialogue.enabled` | 대화 활성 여부입니다. |

서버 JSON 경로가 있으면 런타임은 그 파일을 먼저 읽습니다. 파일 경로가 비어 있거나 읽을 수 없으면 NPC에 직접 저장된 JSON을 사용합니다.

## 가능한 것

- NPC 대사와 선택지를 여러 노드로 나눌 수 있습니다.
- 조건에 따라 선택지를 숨기거나 다른 노드로 보낼 수 있습니다.
- 선택지를 누를 때 아이템 지급, 태그 변경, 명령 실행, 상점 열기 같은 액션을 실행할 수 있습니다.
- 대화 GUI를 GUI Maker에서 만든 `dialogue` 타입 GUI로 바꿀 수 있습니다. GUI Maker가 아직 어렵다면 기본 대화 GUI를 그대로 사용해도 됩니다.
- 기본 대화 GUI를 커스텀할 때는 `Save`로 기본 파일을 덮어쓰지 말고 반드시 `Save As`로 새 파일을 만든 뒤 연결하세요.

## 0.1.6 노드 편집 흐름

- 노드 목록에서 `Shift+Click`하거나 드래그해 여러 노드를 선택할 수 있습니다.
- 선택한 노드는 `Copy` / `Paste` 또는 `Ctrl+C` / `Ctrl+V`로 같은 세트나 선택한 다른 세트에 복사할 수 있습니다.
- 붙여넣을 때 노드 이름은 충돌하지 않게 바뀌고, 복사 묶음 안의 내부 링크와 Blueprint 위치도 함께 다시 연결됩니다. 복사 밖을 가리키는 링크는 유지됩니다.
- 노드, route, choice, condition, action 행은 드래그해서 순서를 바꿀 수 있습니다.
- `Duplicate`는 대화 세트 전체와 Blueprint 위치를 새 세트 ID로 복제합니다. 서버 저장 완료 메시지를 확인한 뒤 런타임에 적용하세요.
- `Dialogue Sets` 사이드바는 폭을 드래그해 조절할 수 있고, 다음에 열 때 그 폭을 기억합니다.

런타임에서는 긴 선택지가 설정된 viewport 안에서 정리되고, 실제 선택지 수가 넘칠 때만 스크롤합니다. 긴 대화 본문은 모든 줄을 페이지로 나누며, GUI JSON의 `dialogPageNavX`, `dialogPageNavY`, `dialogPageBtnW`, `dialogPageBtnH`, `dialogPageBtnGap` 또는 별도 `pager` 컴포넌트로 이전/다음 버튼 위치를 정할 수 있습니다. 타이핑 중 첫 클릭은 현재 페이지를 즉시 펼치고, 펼친 뒤의 입력이 페이지를 이동합니다. `Dialogue`, `Choice`, `Close` 같은 기본 라벨도 클라이언트 언어를 따릅니다.

## 제한

- Dialogue Editor는 대화 흐름과 액션을 만드는 도구입니다. 상점 상품 자체는 NPC Shop에서 만들어야 합니다.
- 선택지에 `go_shop` 액션을 넣어도 연결할 상점 파일이나 NPC 상점이 없으면 상점 화면으로 이어질 수 없습니다.
- 클라이언트 화면에 보이는 텍스트와 서버에서 실행되는 명령은 역할이 다릅니다. 명령, 아이템, 화폐 관련 결과는 서버에서 처리됩니다.
- 복잡한 스크립트 언어를 직접 실행하는 구조가 아닙니다. 등록된 조건과 액션 타입 안에서 구성해야 합니다.
