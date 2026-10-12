---
title: 에디터 화면
slug: dialogue-editor-screen
order: 61
description: Dialogue Editor의 상단 버튼, 노드 목록, 편집 패널, 저장 흐름입니다.
product: core
category: 다이얼로그 에디터
section: dialogue-editor
status: 안정
version: 0.1.6
audience: 대화 제작자
tags:
  - dialogue
  - editor
---

## 화면 구역

Dialogue Editor는 한 화면에서 대화 세트, 노드, 선택지, 조건, 액션을 편집합니다. 화면은 크게 상단 공용 버튼, 노드 목록, 현재 노드 편집 영역, 조건/액션 편집 영역으로 나뉩니다.

| 구역 | 역할 |
| --- | --- |
| 상단 버튼 | 에디터 이동, 새 문서, 불러오기, 저장, 저장 이름 변경, 초기화, 닫기를 담당합니다. |
| 노드 목록 | `start`, `dialogue_1` 같은 노드를 고르고 추가합니다. |
| 노드 편집 | 노드 이름, 노드 타입, 대사, GUI 연결 값을 편집합니다. |
| 선택지 편집 | 플레이어에게 보일 선택지와 선택지별 액션을 편집합니다. |
| 조건/액션 편집 | 노드, route, 선택지의 조건과 실행 결과를 편집합니다. |
| Blueprint | 노드 연결 관계를 시각적으로 보는 영역입니다. |

## 상단 버튼

| 버튼 | 기능 |
| --- | --- |
| `Editors` | 에디터 선택 UI로 돌아갑니다. |
| `Create New` | 새 대화 세트 초안을 만듭니다. |
| `Load` | 기존 대화 세트를 검색해서 불러옵니다. |
| `Save` | 현재 경로에 저장합니다. |
| `Save As` | 새 대화 세트 이름으로 저장합니다. |
| `Reset` | 현재 초안을 기본 상태로 되돌립니다. |
| `Close` | 에디터를 닫습니다. |
| `Duplicate` | 현재 대화 세트 전체와 Blueprint 배치를 새 세트로 복제합니다. |

대화 세트는 서버 JSON으로 저장할 수 있고, NPC에 직접 적용할 수도 있습니다. 여러 NPC가 같은 대화를 써야 하면 서버 JSON으로 저장하는 쪽이 관리하기 쉽습니다.

## 새 대화 세트 만들기

대화 세트는 파일 하나가 아니라 폴더 단위로 만들어집니다. 예를 들어 `blacksmith` 세트를 만들면 `dialogue_sets/blacksmith/` 폴더가 생기고, 그 안에 전체 스냅샷인 `dialogue_set.json`, 입구 노드인 `start.json`, 일반 대화 노드 JSON들이 함께 저장됩니다.

```text
config/dochi_rpg_maker/dialogue_sets/blacksmith/
  dialogue_set.json
  start.json
  greeting.json
  quest_done.json
```

하나의 일반 노드는 보통 하나의 JSON으로 저장되고, `start` 노드를 기준으로 여러 일반 노드가 모여 하나의 대화 세트가 됩니다. 그래서 `Load`, `Save`, `Save As`는 개별 노드 하나가 아니라 세트 폴더 전체를 대상으로 생각하는 편이 좋습니다.

1. `Create New`를 누릅니다.
2. 기본 `start` 노드와 일반 노드를 준비합니다.
3. 일반 노드에 NPC 대사를 입력합니다.
4. 선택지를 추가하고 각 선택지에 액션을 넣습니다.
5. `Save As`로 `dialogue_sets/<set_id>`에 저장합니다.
6. NPC 편집 흐름에서 해당 대화 세트를 NPC에 연결합니다.

## 불러오기와 저장

`Load`는 대화 세트 파일을 불러옵니다. 서버 JSON 목록을 사용하는 경우 대화 세트 도메인만 대상으로 하며, GUI JSON이나 상점 JSON은 이 목록에 섞이지 않습니다.

`Save`는 현재 파일에 덮어씁니다. 기본 샘플을 직접 덮어쓰기보다 `Save As`로 새 이름을 만드는 방식이 좋습니다.

## 다중 선택과 복사

1. 노드 목록에서 `Shift+Click`하거나 드래그해 여러 노드를 선택합니다.
2. `Copy` 또는 `Ctrl+C`로 선택 묶음을 복사합니다.
3. 다른 세트에 붙이려면 먼저 `Dialogue Sets` 패널 안을 클릭해 붙여넣기 대상을 지정합니다.
4. `Paste` 또는 `Ctrl+V`로 붙여넣고 저장합니다.

붙여넣기는 같은 이름에 접미사를 붙여 충돌을 피하고, 함께 복사한 노드끼리의 `goto` 링크와 Blueprint 위치를 새 이름에 맞게 바꿉니다. 외부 링크는 그대로 둡니다. `start` 노드는 한 세트에 하나만 유지되도록 정규화됩니다.

노드, route, choice, condition, action 행은 드래그로 순서를 바꿀 수 있습니다. `Dialogue Sets` 패널의 오른쪽 경계를 드래그하면 폭이 바뀌고 설정이 저장됩니다.

## 에디터에서 만들 수 있는 것

- `start` 노드에서 조건별로 첫 대화 노드를 나눌 수 있습니다.
- 일반 노드에 대사와 여러 선택지를 넣을 수 있습니다.
- 선택지에 조건을 붙여 특정 플레이어에게만 보이게 할 수 있습니다.
- 선택지를 누를 때 아이템 지급, 태그 변경, 상점 열기, 노드 이동을 실행할 수 있습니다.
- GUI Maker에서 만든 `dialogue` GUI를 연결할 수 있습니다.

## 에디터에서 직접 만들지 않는 것

- 상점 상품 목록은 NPC Shop에서 만듭니다.
- 화폐 정의는 Currency Editor에서 만듭니다.
- 대화창의 위치, 패널, 버튼 모양은 GUI Maker에서 만듭니다.
- 복잡한 전투 AI나 몹 패턴은 DRM Mob Editor 영역입니다.
