---
title: GUI 시스템
slug: gui-system
order: 60
description: GUI Maker가 사용하는 레이아웃 JSON, GUI 타입, 컴포넌트, 런타임 연결 규칙입니다.
product: core
category: 핵심 시스템
section: gui-maker
status: 안정
version: 0.1.2
audience: GUI 제작자
tags:
  - gui
  - layout
---

## GUI JSON의 역할

GUI JSON은 화면의 모양을 정의합니다. 대화 내용, 상점 상품, 화폐 잔액 같은 데이터는 별도 문서나 런타임이 채우고, GUI JSON은 어디에 어떤 컴포넌트를 그릴지 결정합니다.

기본 구조는 다음 필드를 중심으로 봅니다.

| 필드 | 의미 |
| --- | --- |
| `guiType` | `dialogue`, `npc_shop`, `currency_hud`, `remnant_msg` 같은 레이아웃 타입입니다. |
| `id` | GUI 내부 ID입니다. 파일명과 맞추면 추적하기 쉽습니다. |
| `stage` | 기준 해상도, 배경, 그리드 정보를 담습니다. |
| `elements` | 화면에 배치되는 컴포넌트 배열입니다. |
| `defaultUiStyle` | 공통 패널 색, 테두리, 투명도 기본값입니다. |
| `buttonConfig` | 상점 버튼 등 일부 컴포넌트를 바닐라 버튼으로 그릴지 정합니다. |

## GUI 타입과 저장 위치

| guiType | 표면 | 기본 파일 | 저장 kind | 저장 위치 |
| --- | --- | --- | --- | --- |
| `dialogue` | 화면 GUI | `default_dialogue_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `npc_shop` | 화면 GUI | `default_shop_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `remnant_msg` | 화면 GUI | `default_remnant_msg_gui.json` | `gui` | `config/dochi_rpg_maker/gui` |
| `currency_hud` | HUD 오버레이 | `hud_components.json` | `currency_hud_layout` | `config/dochi_rpg_maker/hud/sets` |
| `player_status` | HUD 오버레이 | `player_status_hud.json` | HUD 계열 | `config/dochi_rpg_maker/hud/player_status` |
| `custom_hud` | HUD 오버레이 | `custom_hud_layout.json` | HUD 계열 | `config/dochi_rpg_maker/hud/custom` |

`currency`, `hud_layout`, `currency_hud_layout`처럼 입력된 값은 내부에서 `currency_hud`로 정규화됩니다. `shop`은 `npc_shop`, `remnant`는 `remnant_msg`로 보정됩니다.

## 등록된 주요 컴포넌트

| 컴포넌트 | 사용 GUI | 용도 |
| --- | --- | --- |
| `dialog` | 대화, Remnant Msg | 대화문이나 메시지 본문을 렌더링합니다. |
| `choice` | 대화 | 선택지 목록을 렌더링합니다. |
| `panel` | 상점, HUD, Remnant Msg | 기본 UI 패널입니다. |
| `image` | 대화, 상점, HUD, Remnant Msg | 이미지나 텍스처를 표시합니다. |
| `entity` | 대화, 상점 | NPC나 엔티티 미리보기를 표시합니다. |
| `item` | 대화, 상점 | 아이템 아이콘을 렌더링합니다. |
| `item_slot` | 상점 | 상품, 재고, 가격 행을 렌더링합니다. |
| `player_inventory` | 상점 | 판매 모드에서 플레이어 인벤토리 그리드를 표시합니다. |
| `shop_transaction_viewer` | 상점 | 구매/판매 예정 내역을 표시합니다. |
| `shop_search_bar` | 상점 | 상품 검색 필드를 표시합니다. |
| `shop_page_selector` | 상점 | 페이지 이동 UI를 표시합니다. |
| `currency_display` | 상점 | 플레이어 보유 화폐를 표시합니다. |
| `currency_list`, `currency_icon`, `currency_amount`, `currency_delta`, `currency_name` | HUD | 화폐 HUD 구성 요소입니다. |

## 대화와 상점의 GUI 연결

대화 문서는 `dialogueDefaultGui`에 기본 GUI 연결을 가집니다. 상점 문서는 `shopDefaultGui`와 `shopGuis.buy`, `shopGuis.sell`을 가집니다.

```json
{
  "guiSource": "default",
  "guiJsonSubPath": "",
  "guiJsonFileName": "default_shop_gui.json",
  "guiJsonPath": "default_shop_gui.json"
}
```

런타임은 이 값을 보고 `config/dochi_rpg_maker/gui`에서 GUI JSON을 읽습니다. 경로가 비어 있으면 `settings/defaults.json`의 기본 GUI가 채워집니다.

## 제작 규칙

- 기본 GUI 파일은 직접 덮어쓰지 말고 `Save As`로 새 파일을 만듭니다.
- 대화 GUI와 상점 GUI는 `guiType`을 다르게 저장합니다.
- 상점의 구매/판매 버튼, 페이지 버튼, 인벤토리 토글은 `buttonConfig.vanillaButtons`로 바닐라 버튼 렌더링을 켤 수 있습니다.
- 이미지 경로는 `namespace:textures/...` 같은 리소스 위치와 로컬 파일 경로를 구분합니다.
- 컴포넌트 ID는 중복을 피하고, `z` 값으로 앞뒤 순서를 정리합니다.
- 런타임에서 데이터가 채워지는 영역은 GUI Maker에서 미리보기 텍스트로 확인하고 실제 값은 상점/대화 문서에서 확인합니다.

:::warning GUI 타입 혼동
상점 레이아웃을 `dialogue` 타입으로 저장하면 상점 전용 컴포넌트가 런타임에서 기대한 역할을 하지 못할 수 있습니다. 상점은 `npc_shop`, 대화는 `dialogue`로 분리하세요.
:::
