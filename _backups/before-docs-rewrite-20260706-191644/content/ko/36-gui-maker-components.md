---
title: 컴포넌트
slug: gui-maker-components
order: 102
description: GUI Maker 컴포넌트가 각 GUI 타입에서 어떤 런타임 데이터와 연결되는지 설명합니다.
product: core
category: GUI Maker
section: gui-maker
status: 안정
version: 0.1.2
audience: GUI 제작자
tags:
  - gui
  - components
---

## 컴포넌트의 의미

컴포넌트는 화면에 배치되는 요소입니다. 단순 장식 요소도 있고, 런타임 데이터와 연결되는 요소도 있습니다.

| 구분 | 예시 | 설명 |
| --- | --- | --- |
| 장식 요소 | `panel`, `image` | 배경, 프레임, 아이콘처럼 화면을 꾸밉니다. |
| 표시 요소 | `dialog`, `currency_amount` | 대사, 메시지, 화폐 수량 같은 값을 표시합니다. |
| 조작 요소 | `choice`, `shop_action_button`, `shop_page_selector` | 플레이어 입력과 연결됩니다. |
| 목록 요소 | `item_slot`, `currency_list`, `player_inventory` | 여러 데이터를 반복 표시합니다. |

## 대화 GUI 컴포넌트

| 컴포넌트 | 역할 |
| --- | --- |
| `dialog` | 현재 노드의 NPC 대사를 표시합니다. |
| `choice` | 조건을 통과한 선택지 목록을 표시합니다. |
| `entity` | NPC 또는 엔티티 미리보기입니다. |
| `item` | 대화 연출용 아이템 아이콘입니다. |
| `image` | 배경, 초상화, 장식 이미지입니다. |

대화 GUI에서 가장 중요한 컴포넌트는 `dialog`와 `choice`입니다. 이 둘이 없으면 대사와 선택지를 표시하기 어렵습니다.

## 상점 GUI 컴포넌트

| 컴포넌트 | 역할 |
| --- | --- |
| `item_slot` | 상품 목록 행입니다. |
| `player_inventory` | 판매 모드에서 플레이어 인벤토리를 표시합니다. |
| `shop_transaction_viewer` | 거래 예정 내역을 표시합니다. |
| `shop_action_button` | 구매 또는 판매 실행 버튼입니다. |
| `shop_item_description` | 선택한 상품 설명입니다. |
| `shop_search_bar` | 상품 검색 입력입니다. |
| `shop_page_selector` | 페이지 이동 UI입니다. |
| `currency_display` | 플레이어 잔액 또는 보유 화폐입니다. |

상점 GUI는 구매와 판매가 같은 컴포넌트를 공유할 수 있지만, 행 역할이나 버튼 문구는 모드에 따라 다르게 해석됩니다.

## 화폐 HUD 컴포넌트

| 컴포넌트 | 역할 |
| --- | --- |
| `currency_list` | 표시할 화폐 목록 영역입니다. |
| `currency_icon` | 화폐 아이콘입니다. |
| `currency_amount` | 화폐 수량입니다. |
| `currency_delta` | 획득/소모 변화량입니다. |
| `currency_name` | 화폐 이름입니다. |
| `player_health`, `player_food`, `player_armor`, `player_air`, `player_xp_level` | 플레이어 상태 값입니다. |

화폐 HUD 컴포넌트는 Currency Editor의 화폐 정의와 함께 동작합니다.

## 레머넌트 메시지 컴포넌트

| 컴포넌트 | 역할 |
| --- | --- |
| `panel` | 메시지 프레임입니다. |
| `image` | 메시지 배경이나 마커 이미지입니다. |
| `dialog` | 레머넌트 메시지 본문입니다. |

레머넌트 메시지는 선택지 중심 화면이 아니므로 `choice`가 아니라 메시지 본문 표시가 중심입니다.

## 제한

- 컴포넌트가 있어도 해당 런타임 데이터가 없으면 비어 보일 수 있습니다.
- `choice`는 대화 선택지를 직접 만들지 않습니다. 선택지 데이터는 Dialogue Editor에 있어야 합니다.
- `item_slot`은 상점 상품 데이터를 표시합니다. 상품 생성은 NPC Shop이 담당합니다.
- `currency_amount`는 잔액을 표시합니다. 잔액 변경은 서버 명령, 상점 거래, 픽업 변환 쪽에서 일어납니다.
