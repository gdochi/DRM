---
title: GUI 시스템
slug: gui-system
order: 100
description: GUI Maker가 사용하는 레이아웃 JSON, GUI 타입, 컴포넌트, 런타임 연결 규칙입니다.
product: core
category: GUI Maker
section: gui-maker
status: 안정
version: 0.1.5
audience: GUI 제작자
tags:
  - gui
  - layout
---

## 역할

GUI 시스템은 화면의 모양을 정의합니다. 대화 내용, 상점 상품, 화폐 잔액 같은 실제 데이터는 각 에디터가 만들고, GUI JSON은 그 데이터를 어느 위치에 어떤 컴포넌트로 보여줄지 정합니다.

GUI Maker에서 저장하는 일반 화면 GUI는 모두 `config/dochi_rpg_maker/gui` 아래에 들어갑니다. 대화, 상점, 레머넌트 메시지는 폴더를 따로 나누지 않고 `guiType`으로 구분합니다.

0.1.4의 GUI Maker는 `dialogue`, `npc_shop`, `remnant_msg`, `faction`, `teleporter`, `quest_journal`, `stat_allocation`, `popup`과 HUD 계열 레이아웃 프로필을 같은 캔버스 규칙으로 다룹니다. 에디터 미리보기, 저장된 GUI 레이아웃, 플레이어가 보는 런타임 화면은 서로 다른 단계이므로 미리보기 샘플을 실제 런타임 데이터로 보지 마세요.

## 기본 구조

| 필드 | 의미 |
| --- | --- |
| `guiType` | `dialogue`, `npc_shop`, `faction`, `teleporter`, `quest_journal`, `stat_allocation`, `popup`, `remnant_msg` 같은 화면 타입입니다. |
| `id` | GUI 문서 ID입니다. 파일명과 맞추면 연결할 때 관리하기 쉽습니다. |
| `stage` | 기준 해상도, 배경, 그리드 같은 화면 전체 설정입니다. |
| `elements` | 화면에 배치되는 컴포넌트 배열입니다. |
| `defaultUiStyle` | 공통 패널, 테두리, 색상 기본값입니다. |
| `buttonConfig` | 버튼 컴포넌트를 바닐라 버튼처럼 그릴지 정하는 설정입니다. |

`elements`는 실제 화면 요소입니다. 각 요소는 `id`, `type`, 위치, 크기, 색상, 텍스트, 이미지, 상점 역할 같은 값을 가집니다.

`stage`의 기준 크기와 실제 viewport를 함께 보면서 안전 여백을 남기고, 패널의 `fillOpacity`와 상속된 기본 스타일을 확인하세요. 0.1.3 상점 프리셋은 상품/거래 컴포넌트를 담는 루트 패널 구조도 함께 사용합니다.

## GUI 타입

| guiType | 쓰는 곳 | 기본 파일 | 저장 위치 |
| --- | --- | --- | --- |
| `dialogue` | 대화 런타임 | `default_dialogue_gui.json` | `config/dochi_rpg_maker/gui` |
| `npc_shop` | 상점 런타임 | `default_shop_gui.json` | `config/dochi_rpg_maker/gui` |
| `remnant_msg` | 레머넌트 메시지 | `default_remnant_msg_gui.json` | `config/dochi_rpg_maker/gui` |
| `faction` | 팩션 개요 | `default_faction_gui.json` | `config/dochi_rpg_maker/gui` |
| `teleporter` | 목적지 목록 | `default_teleporter_gui.json` | `config/dochi_rpg_maker/gui` |
| `quest_journal` | 플레이어 퀘스트 저널 | `default_quest_journal_gui.json` | `config/dochi_rpg_maker/gui` |
| `stat_allocation` | 플레이어 스탯 투자 | `default_stat_gui.json` | `config/dochi_rpg_maker/gui` |
| `popup` | 팝업 표시 | `default_popup_gui.json` | `config/dochi_rpg_maker/gui` |
| `currency_hud` | 화폐 HUD 레이아웃 | `currency_hud_layout.json` | `config/dochi_rpg_maker/hud/sets` |

`shop`은 내부에서 `npc_shop`으로, `remnant`는 `remnant_msg`로 정규화됩니다. HUD 계열은 화면 GUI와 저장소가 다르므로 GUI Maker와 HUD Maker 문서를 같이 봐야 합니다.

## 등록된 주요 컴포넌트

| 컴포넌트 | 사용 GUI | 용도 |
| --- | --- | --- |
| `dialog` | `dialogue`, `remnant_msg` | 대화문이나 메시지 본문을 표시합니다. |
| `choice` | `dialogue` | 플레이어 선택지 목록을 표시합니다. |
| `panel` | `npc_shop`, `currency_hud`, `remnant_msg` | 배경이나 구획을 만드는 기본 패널입니다. |
| `image` | `dialogue`, `npc_shop`, `currency_hud`, `remnant_msg` | 텍스처나 이미지 리소스를 표시합니다. |
| `entity` | `dialogue`, `npc_shop` | NPC나 엔티티 미리보기 영역입니다. |
| `item` | `dialogue`, `npc_shop` | 아이템 아이콘을 표시합니다. |
| `item_slot` | `npc_shop` | 상점 상품 행, 가격, 재고를 표시합니다. |
| `player_inventory` | `npc_shop` | 판매 모드에서 플레이어 인벤토리 영역을 표시합니다. |
| `shop_transaction_viewer` | `npc_shop` | 구매/판매 예정 내역을 표시합니다. |
| `shop_action_button` | `npc_shop` | 구매 또는 판매 실행 버튼입니다. |
| `shop_search_bar` | `npc_shop` | 상점 상품 검색 입력 영역입니다. |
| `shop_page_selector` | `npc_shop` | 상점 목록 페이지 이동 영역입니다. |
| `currency_display` | `npc_shop` | 플레이어가 가진 화폐 잔액을 표시합니다. |
| `currency_list` | `currency_hud` | 여러 화폐를 목록으로 표시합니다. |
| `currency_icon` | `currency_hud` | 화폐 아이콘입니다. |
| `currency_amount` | `currency_hud` | 화폐 수량입니다. |
| `currency_delta` | `currency_hud` | 획득/소모 변화량입니다. |
| `currency_name` | `currency_hud` | 화폐 이름입니다. |
| `player_health`, `player_food`, `player_armor`, `player_air`, `player_xp_level` | `currency_hud` | 플레이어 상태 표시용 HUD 컴포넌트입니다. |
| `faction_*` | `faction` | 헤더, 카테고리, 팩션 목록/상세, 상태 범례, 닫기입니다. |
| `teleporter_*` | `teleporter` | 카테고리, 목적지 목록/상세, 이동/닫기, 상태, 페이지입니다. |
| `quest_*` | `quest_journal` | 필터, 검색, 목록/상세, 목표, 보상, 추적, 수락/포기, 닫기입니다. |
| `stat_*` | `stat_allocation` | 헤더, 스크롤 스탯 목록, 포인트, 설명, 투자, 닫기입니다. |
| `popup_*` | `popup` | 런타임 제목, 부제, 본문, 표시 표면입니다. |

## GUI 연결 방식

대화 문서는 `dialogueDefaultGui`로 대화 GUI를 연결합니다. 상점 문서는 `shopDefaultGui`, `shopGuis.buy`, `shopGuis.sell`로 상점 GUI를 연결합니다. 레머넌트 메시지는 메시지 문서의 `gui` 필드로 `remnant_msg` GUI를 연결합니다.

```json
{
  "guiSource": "default",
  "guiJsonFileName": "default_shop_gui.json",
  "guiJsonPath": "default_shop_gui.json"
}
```

런타임은 이 값을 보고 `config/dochi_rpg_maker/gui`에서 GUI JSON을 읽습니다. 경로가 비어 있으면 설정 기본값이나 번들 기본 GUI를 사용합니다.

## 가능한 것

- 대화, 상점, 레머넌트 메시지의 화면 배치를 바꿀 수 있습니다.
- 상점의 구매 화면과 판매 화면을 다른 GUI로 분리할 수 있습니다.
- 버튼, 패널, 이미지, 아이템 슬롯, 선택지 목록의 위치와 크기를 조정할 수 있습니다.
- 상점 버튼 일부는 `buttonConfig.vanillaButtons`로 바닐라 버튼 렌더링을 사용할 수 있습니다.
- 이미지 경로는 `namespace:textures/...` 같은 리소스 위치 또는 로컬 파일 경로를 사용할 수 있습니다.

## 제한

- GUI Maker는 화면 모양을 바꾸는 도구입니다. 대화 노드, 보상, 상품 가격, 화폐 잔액 자체는 각 전용 에디터에서 만들어야 합니다.
- `dialogue` GUI에 상점 전용 컴포넌트를 넣어도 상점 데이터가 자동으로 생기지 않습니다.
- `npc_shop` GUI에 선택지 컴포넌트를 넣어도 대화 선택지처럼 동작하지 않습니다.
- 기본 GUI 파일을 직접 덮어쓰면 업데이트 때 기본값과 섞일 수 있으므로 `Save As`로 별도 파일을 만드는 쪽이 좋습니다.
- `default`로 시작하는 GUI와 알려진 기본 GUI 경로는 서버에서 읽기 전용으로 보호되므로 실제로도 `Save As`가 필요합니다.
- 컴포넌트 ID가 중복되면 런타임 연결이 헷갈릴 수 있으므로 역할이 있는 요소는 고유 ID를 유지해야 합니다.

## 0.1.5 툴팁과 선택지 꾸미기

아이템 툴팁은 **Visual → Tooltip Maker**에서 따로 편집합니다. 아이템 미리보기, 글자, 이미지, 구분선을 배치할 수 있고, 파일은 기존 `gui` 폴더에 저장됩니다. 자세한 사용법은 **Tooltip Maker** 문서를 참고하세요.

대화 GUI의 **Choice** 요소에서는 **Text size (px)**로 글자 크기를 정합니다. 대화 노드의 **Choice text px (0 = GUI)**로 개별 크기를 지정할 수도 있습니다. 버튼 크기와 강조 효과는 **선택지 글자와 펄스** 문서에서 설명합니다.
