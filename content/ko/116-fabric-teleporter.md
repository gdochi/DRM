---
title: 텔레포터
slug: teleporter
order: 82
description: 목적지 세트를 만들고 NPC에 적용해 플레이어 텔레포터 런타임을 구성합니다.
product: core-fabric
category: 핵심 시스템
section: teleporter
status: 안정
version: 0.1.7
audience: 제작자 / 운영자
tags:
  - teleporter
  - npc
  - gui
---

## 개요

Teleporter 에디터는 `config/dochi_rpg_maker/teleporters` 아래에 파일 기반 `teleporter_set` 문서를 만듭니다. 한 세트에는 카테고리, 목적지, 접근 조건, 잠김 표시, 미디어, 화면 전환 시간, 소리 설정이 들어갑니다.

보호된 시작 파일은 다음 두 개입니다.

- `teleporters/default_teleporter_set.json`
- `gui/default_teleporter_gui.json`

보호 기본값을 직접 수정하지 말고 `Save As`로 운영 파일을 만드세요.

## 열기와 저장

1. `dochi_rpg_maker:dialogue_editor`를 들고 허공을 우클릭합니다.
2. 공용 에디터 선택 화면에서 `Teleporter`를 고릅니다.
3. `Load Existing`, `Use Default`, `Create New` 중 하나를 선택합니다.
4. 세트를 편집하고 `Save As`로 `town_network.json` 같은 기본값이 아닌 이름에 저장합니다.

상단 바에는 `Editors`, `Create New`, `Load`, `Save`, `Save As`, `Reset`이 있습니다. 본문은 `Categories`, `Interaction`, `Destinations`, `Presentation`으로 나뉘며 카테고리와 목적지 목록을 검색할 수 있습니다.

## 카테고리와 목적지

schemaVersion 2 세트 하나는 카테고리 최대 256개, 목적지 최대 1,024개를 지원합니다.

| 구역 | 주요 필드 |
| --- | --- |
| 세트 | `setId`, `displayName`, `gui` |
| 카테고리 | `id`, `name`, `iconMedia` |
| 목적지 | `id`, `enabled`, `categoryId`, `name`, `description`, `descriptionStyles`, `iconMedia` |
| 대상 | `x`, `y`, `z`, `yaw`, `pitch` |
| 접근 | `accessConditions`, 선택형 잠김 표시/전환 override |

대상은 플레이어의 현재 차원 안에서 좌표와 회전값을 사용합니다. DRM Core 0.1.7에는 목적지 차원 필드가 없으므로 차원 간 텔레포터로 동작하지 않습니다.

카테고리와 목적지 미디어는 이미지 또는 아이템을 사용할 수 있습니다. 이미지는 맞춤/자르기 설정을, 아이템은 아이템 ID·수량·표시 크기를 저장합니다.

## 조건, 잠김 표시, 화면 전환

`interactionConditions`는 세트 전체를 열 수 있는지 검사합니다. 각 목적지에는 별도 `accessConditions`가 있습니다. 둘 다 DRM 공용 조건 형식을 쓰며 서버에서 판정됩니다.

세트의 잠김 표시는 `visible`, `dimmed`, `hidden`, `unknown`, `custom`을 지원합니다. 목적지는 세트 값을 상속하거나 따로 override할 수 있습니다. 이 설정은 사용할 수 없는 목적지를 보여 주는 방식을 정할 뿐 서버 조건 검사를 우회하지 않습니다.

화면 전환은 `fadeOutTicks`, `fadeInTicks`, 선택형 출발/도착 소리를 설정합니다. 소리는 레지스트리 ID, 볼륨, 피치를 가지며 에디터에서 검색하고 미리 들을 수 있습니다.

## NPC에 세트 적용

1. Teleporter Set을 저장합니다.
2. 코어 아이템으로 대상 CustomNPCs NPC를 우클릭합니다.
3. NPC Apply의 `FUNCTION` 검색창에서 `Teleporter`를 찾습니다.
4. JSON 목록에서 세트를 고르고 `Apply Teleporter`를 누릅니다.
5. 코어 아이템 없이 NPC를 우클릭해 플레이어 런타임을 엽니다.

FUNCTION 검색은 현지화된 액션 이름, 대상 ID, 서버 JSON 종류, 에디터 ID, 바인딩 그룹을 함께 검색합니다. 기능을 바꿀 때 좌측 하단에 잠깐 나타나던 중복 로딩 라벨은 0.1.7에서 그리지 않으며, 실제 적용/불러오기 작업의 피드백은 유지됩니다.

연결을 지울 때는 같은 대상에서 `Remove Teleporter`를 사용합니다.

## 대화에서 열기

대화 선택지의 `go_teleporter` 액션으로 텔레포터를 열 수 있습니다.

```json
{
  "type": "go_teleporter",
  "teleporter": "bound"
}
```

현재 NPC에 적용된 세트를 쓰려면 `bound` 또는 빈 값을 사용합니다. 파일을 직접 열려면 `teleporter` 또는 `value`에 `town_network.json` 같은 정규화된 경로를 넣습니다.

## 플레이어 런타임과 GUI

기본 Teleporter GUI의 stage는 800 × 450입니다. GUI Maker에는 다음 텔레포터 컴포넌트가 등록되어 있습니다.

- `teleporter_search_bar`
- `teleporter_category_list`
- `teleporter_destination_list`
- `teleporter_destination_name`
- `teleporter_destination_description`
- `teleporter_destination_icon`
- `teleporter_action_button`
- `teleporter_close_button`

일반 `image` 컴포넌트도 `teleporter` 레이아웃에서 사용할 수 있습니다. 0.1.7 플레이어 런타임은 화면을 덮던 바닐라 블러를 적용하지 않으므로 검색, 목적지 선택, 이동, 닫기 컨트롤을 정상 조작할 수 있습니다.

## 서버 검증

서버는 NPC 바인딩 또는 지정 경로를 해석하고 상호작용 조건을 판정한 뒤 필터링된 목적지 스냅샷을 보냅니다. 이동 요청은 세션이 유효하고 플레이어가 연결 NPC와 예상 차원/거리 안에 있을 때만 처리됩니다. 서버는 목적지 접근 조건을 다시 확인한 뒤 화면 전환과 텔레포트를 실행합니다.

:::warning 현재 차원 전용
좌표만 바꿔서는 다른 차원으로 이동하지 않습니다. 차원 간 이동이 필요하면 별도 이동 로직을 구성해야 합니다.
:::

