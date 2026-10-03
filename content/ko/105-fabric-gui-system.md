---
title: GUI 시스템
slug: gui-system
order: 100
description: GUI Maker가 사용하는 레이아웃 JSON, GUI 타입, 컴포넌트, 런타임 연결 규칙입니다.
product: core-fabric
category: GUI Maker
section: gui-maker
status: 안정
version: 0.2.4
audience: GUI 제작자
tags:
  - gui
  - layout
---

## 역할

GUI 시스템은 화면의 모양을 정의합니다. 대화 내용, 상점 상품, 화폐 잔액 같은 실제 데이터는 각 에디터가 만들고, GUI JSON은 그 데이터를 어느 위치에 어떤 컴포넌트로 보여줄지 정합니다.

GUI Maker에서 저장하는 일반 화면 GUI는 모두 `config/dochi_rpg_maker/gui` 아래에 들어갑니다. 대화, 상점, 텔레포터, 레머넌트 메시지는 폴더를 따로 나누지 않고 `guiType`으로 구분합니다.

0.1.8의 GUI Maker는 `dialogue`, `npc_shop`, `teleporter`, `remnant_msg`, `quest_journal`, `popup`, `currency_hud`와 플레이어 상태/커스텀 HUD 계열을 같은 캔버스 규칙으로 다룹니다. 에디터 미리보기, 저장된 GUI 레이아웃, 플레이어가 보는 런타임 화면은 서로 다른 단계이므로 미리보기 샘플을 실제 런타임 데이터로 보지 마세요.

## 기본 구조

| 필드 | 의미 |
| --- | --- |
| `guiType` | `dialogue`, `npc_shop`, `teleporter`, `currency_hud`, `remnant_msg` 같은 화면 타입입니다. |
| `id` | GUI 문서 ID입니다. 파일명과 맞추면 연결할 때 관리하기 쉽습니다. |
| `stage` | 기준 해상도, 배경, 그리드 같은 화면 전체 설정입니다. |
| `elements` | 화면에 배치되는 컴포넌트 배열입니다. |
| `defaultUiStyle` | 공통 패널, 테두리, 색상 기본값입니다. |
| `buttonConfig` | 버튼 컴포넌트를 바닐라 버튼처럼 그릴지 정하는 설정입니다. |

`elements`는 실제 화면 요소입니다. 각 요소는 `id`, `type`, 위치, 크기, 색상, 텍스트, 이미지, 상점 역할 같은 값을 가집니다.

`stage`의 기준 크기와 실제 viewport를 함께 보면서 안전 여백을 남기고, 패널의 `fillOpacity`와 상속된 기본 스타일을 확인하세요. 0.1.8 상점 프리셋은 상품/거래 컴포넌트를 담는 루트 패널 구조도 함께 사용합니다.

## GUI 타입

| guiType | 쓰는 곳 | 기본 파일 | 저장 위치 |
| --- | --- | --- | --- |
| `dialogue` | 대화 런타임 | `default_dialogue_gui.json` | `config/dochi_rpg_maker/gui` |
| `npc_shop` | 상점 런타임 | `default_shop_gui.json` | `config/dochi_rpg_maker/gui` |
| `teleporter` | 텔레포터 런타임 | `default_teleporter_gui.json` | `config/dochi_rpg_maker/gui` |
| `quest_journal` | 플레이어 퀘스트 저널 | `default_quest_journal_gui.json` | `config/dochi_rpg_maker/gui` |
| `popup` | 화면 팝업 | `default_popup_gui.json` | `config/dochi_rpg_maker/gui` |
| `remnant_msg` | 레머넌트 메시지 | `default_remnant_msg_gui.json` | `config/dochi_rpg_maker/gui` |
| `currency_hud` | 화폐 HUD 레이아웃 | `currency_hud_layout.json` | `config/dochi_rpg_maker/hud/sets` |

`shop`은 내부에서 `npc_shop`으로, `remnant`는 `remnant_msg`로 정규화됩니다. HUD 계열은 화면 GUI와 저장소가 다르므로 GUI Maker와 HUD Maker 문서를 같이 봐야 합니다.

## 등록된 주요 컴포넌트

| 컴포넌트 | 사용 GUI | 용도 |
| --- | --- | --- |
| `dialog` | `dialogue`, `remnant_msg` | 대화문이나 메시지 본문을 표시합니다. |
| `choice` | `dialogue` | 플레이어 선택지 목록을 표시합니다. |
| `panel` | `npc_shop`, `currency_hud`, `remnant_msg` | 배경이나 구획을 만드는 기본 패널입니다. |
| `image` | `dialogue`, `npc_shop`, `teleporter`, `currency_hud`, `remnant_msg` | 텍스처나 이미지 리소스를 표시합니다. |
| `entity` | `dialogue`, `npc_shop` | NPC나 엔티티 미리보기 영역입니다. |
| `item` | `dialogue`, `npc_shop` | 아이템 아이콘을 표시합니다. |
| `item_slot` | `npc_shop` | 상점 상품 행, 가격, 재고를 표시합니다. |
| `player_inventory` | `npc_shop` | 판매 모드에서 플레이어 인벤토리 영역을 표시합니다. |
| `shop_transaction_viewer` | `npc_shop` | 구매/판매 예정 내역을 표시합니다. |
| `shop_action_button` | `npc_shop` | 구매 또는 판매 실행 버튼입니다. |
| `shop_search_bar` | `npc_shop` | 상점 상품 검색 입력 영역입니다. |
| `shop_page_selector` | `npc_shop` | 상점 목록 페이지 이동 영역입니다. |
| `currency_display` | `npc_shop` | 플레이어가 가진 화폐 잔액을 표시합니다. |
| `teleporter_search_bar` | `teleporter` | 목적지 검색 입력 영역입니다. |
| `teleporter_category_list` | `teleporter` | 카테고리 필터 목록입니다. |
| `teleporter_destination_list` | `teleporter` | 사용할 수 있는 목적지 목록입니다. |
| `teleporter_destination_name`, `teleporter_destination_description`, `teleporter_destination_icon` | `teleporter` | 선택 목적지의 상세 정보입니다. |
| `teleporter_action_button`, `teleporter_close_button` | `teleporter` | 이동 실행과 닫기 버튼입니다. |
| `quest_tabs`, 퀘스트 목록·상세·목표·보상 컴포넌트 | `quest_journal` | 저널 탐색과 퀘스트 정보를 표시합니다. |
| `popup_title`, `popup_subtitle`, `popup_text` | `popup` | 팝업의 제목, 부제와 본문을 표시합니다. |
| `currency_list` | `currency_hud` | 여러 화폐를 목록으로 표시합니다. |
| `currency_icon` | `currency_hud` | 화폐 아이콘입니다. |
| `currency_amount` | `currency_hud` | 화폐 수량입니다. |
| `currency_delta` | `currency_hud` | 획득/소모 변화량입니다. |
| `currency_name` | `currency_hud` | 화폐 이름입니다. |
| `player_health`, `player_food`, `player_armor`, `player_air`, `player_xp_level` | `currency_hud` | 플레이어 상태 표시용 HUD 컴포넌트입니다. |

## GUI 연결 방식

대화 문서는 `dialogueDefaultGui`로 대화 GUI를 연결합니다. 상점 문서는 `shopDefaultGui`, `shopGuis.buy`, `shopGuis.sell`로 상점 GUI를 연결합니다. Teleporter Set은 루트 `gui` 필드로 `teleporter` GUI를 연결하고, 비어 있으면 `default_teleporter_gui.json`을 사용합니다. 레머넌트 메시지는 메시지 문서의 `gui` 필드로 `remnant_msg` GUI를 연결합니다.

```json
{
  "guiSource": "default",
  "guiJsonFileName": "default_shop_gui.json",
  "guiJsonPath": "default_shop_gui.json"
}
```

런타임은 이 값을 보고 `config/dochi_rpg_maker/gui`에서 GUI JSON을 읽습니다. 경로가 비어 있으면 설정 기본값이나 번들 기본 GUI를 사용합니다.

## 가능한 것

- 대화, 상점, 텔레포터, 레머넌트 메시지의 화면 배치를 바꿀 수 있습니다.
- 상점의 구매 화면과 판매 화면을 다른 GUI로 분리할 수 있습니다.
- 버튼, 패널, 이미지, 아이템 슬롯, 선택지 목록의 위치와 크기를 조정할 수 있습니다.
- 상점 버튼 일부는 `buttonConfig.vanillaButtons`로 바닐라 버튼 렌더링을 사용할 수 있습니다.
- 이미지 경로는 `namespace:textures/...` 같은 리소스 위치 또는 로컬 파일 경로를 사용할 수 있습니다.

## 제한

- GUI Maker는 화면 모양을 바꾸는 도구입니다. 대화 노드, 보상, 상품 가격, 화폐 잔액 자체는 각 전용 에디터에서 만들어야 합니다.
- `dialogue` GUI에 상점 전용 컴포넌트를 넣어도 상점 데이터가 자동으로 생기지 않습니다.
- `npc_shop` GUI에 선택지 컴포넌트를 넣어도 대화 선택지처럼 동작하지 않습니다.
- `teleporter` GUI가 아닌 레이아웃에는 목적지 목록과 이동 버튼의 런타임 동작이 연결되지 않습니다.
- 기본 GUI 파일을 직접 덮어쓰면 업데이트 때 기본값과 섞일 수 있으므로 `Save As`로 별도 파일을 만드는 쪽이 좋습니다.
- `default`로 시작하는 GUI와 알려진 기본 GUI 경로는 서버에서 읽기 전용으로 보호되므로 실제로도 `Save As`가 필요합니다.
- 컴포넌트 ID가 중복되면 런타임 연결이 헷갈릴 수 있으므로 역할이 있는 요소는 고유 ID를 유지해야 합니다.

## 스프라이트 배율과 이미지 반복

이 설정은 GUI Maker로 저장한 **플레이어 런타임 화면**에 적용됩니다. 제작 에디터의 상단바 크기를 바꾸는 설정은 아닙니다.

`Default UI Settings`에서 스프라이트를 사용하는 화면의 공통 설정을 정합니다.

| 설정 | 동작 |
| --- | --- |
| `Tile` | 스프라이트 무늬를 반복해 패널·버튼을 채웁니다. |
| `Stretch` | 무늬를 표시 영역에 맞춰 늘립니다. |
| `Sprite Scale %` | 숫자를 직접 입력합니다. 범위는 50–400%, 기본은 100%입니다. `125.5` 같은 소수도 사용할 수 있습니다. |

일반 이미지의 반복은 **선택한 컴포넌트의 Inspector**에서 설정합니다.

1. 반복할 이미지 컴포넌트를 선택하고 이미지 에셋을 지정합니다.
2. `Fit`을 `Tile`로 선택합니다.
3. 표시되는 `Tile W %`와 `H %`에 한 장의 가로·세로 크기를 입력합니다. 각 범위는 10–800%, 기본은 100%입니다.
4. 예를 들어 가로 200%, 세로 50%는 한 장을 두 배 넓고 절반 높게 반복합니다. 컴포넌트의 전체 `w`·`h`는 바꾸지 않습니다.
5. `Save As`로 사용자 GUI를 저장하고 대화·상점 등 실제 사용 화면에 연결합니다.

타일 비율은 **컴포넌트별** 설정입니다. 옆 이미지에는 영향을 주지 않습니다. `Fit`을 Stretch 또는 Contain으로 바꾸면 비율 입력칸이 숨겨지며, Tile로 돌아오면 저장한 비율을 다시 사용합니다. 미리보기와 실제 대화 화면은 같은 Tile 설정을 읽습니다.

## JSON 참고: 반복 설정

GUI 루트의 `spriteFillMode`는 `tile` 또는 `stretch`, `spriteScale`은 0.5–4.0입니다. 개별 요소의 `imageFit: tile`, `tileWidthRatio`, `tileHeightRatio`가 이미지 반복과 축별 비율을 저장합니다. 100%는 JSON 값 `1.0`입니다.

구형 루트에 들어 있던 타일 비율은 미지정 컴포넌트의 초기값으로 읽고 다음 저장 때 각 요소에 기록합니다. 새 문서의 타일 가로·세로 비율을 글로벌 기본 UI 값으로 작성하지 마세요.
