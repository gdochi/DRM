---
title: 필드와 버튼
slug: currency-fields
order: 91
description: 이름·금액 표시·아이템 변환 가치와 실물 화폐 설정을 구분합니다.
product: core
category: 커런시 에디터
section: currency-editor
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - currency
  - fields
---

## 화폐 이름과 금액 표시 맞추기

Currency Editor의 **General settings**에서 이름과 규칙을 정합니다. 상점이 한 번에 얼마를 받을지는 [NPC Shop의 Payment](#core/shop-system)에서 따로 설정합니다.

![Currency Editor의 Name·Display format·사망 처리·아이템 변환 설정.](assets/media/guides/drm-031-forge1201/currency-editor.png "DRM 0.3.1 / Forge 1.20.1. 돈의 종류를 만드는 화면입니다. 상품 가격이나 플레이어의 현재 잔액을 직접 입력하는 화면이 아닙니다.")

| 화면 항목 | 정할 것 |
| --- | --- |
| **Enabled** | 이 화폐를 사용할지 |
| **Name** | 플레이어에게 보일 이름 |
| **Display format** | 금액 표기. `%s G`는 1200을 `1200 G`로 표시 |
| 사망 처리 | 잔액 유지 또는 잃을 비율·방식 |
| **Use as shared currency** | 공용 화폐로 사용할지 |
| **Item Icon** | 화폐를 대표할 그림 |

ID는 표시 이름과 별개입니다. **Save As**로 `town_coin`처럼 겹치지 않는 이름에 저장하고, 상점·보상·HUD에서는 같은 화폐를 선택합니다. 이름을 예쁘게 바꾸는 것과 다른 화폐를 새 ID로 만드는 것을 구분하세요.

## 주운 아이템을 잔액으로 바꾸기

**Convert items on pickup**을 켜고 **Item Prices**에서 변환할 아이템과 한 개의 가치를 정합니다. 아이콘만 고르는 것으로 변환 목록이 완성되지는 않습니다.

![Item Prices에서 연 Pickup Conversion Items 창.](assets/media/guides/drm-031-forge1201/currency-item-prices.png "DRM 0.3.1 / Forge 1.20.1. 처음 목록은 비어 있습니다. Add Item으로 대상을 넣고, 선택한 행의 Value / Item을 정한 뒤 Apply Selected를 누릅니다.")

1. **Add Item**에서 아이템을 검색해 체크하고 **Add Selected**로 넣습니다.
2. 목록에서 바꿀 아이템을 체크합니다.
3. **Value / Item**에 한 개가 될 잔액을 넣고 **Apply Selected**합니다. 예를 들어 10이면 해당 아이템 1개가 잔액 10입니다.
4. 창을 닫고 화폐를 **Save / Save As**합니다.
5. 실제 플레이어로 아이템을 주워 아이템 수와 잔액 변화를 함께 확인합니다.

![에메랄드만 변환 목록에 넣고 Value / Item 10으로 저장한 town_coin 화폐.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. Emerald 행의 값이 10이고 위 저장 경로가 town_coin.json인지 확인합니다. 이 화면은 변환 대상과 가치의 저장 결과이며, 실제 습득 후 잔액 확인은 별도로 합니다.")

검색어 `emerald`에는 에메랄드 광석·블록도 함께 나옵니다. **Emerald / minecraft:emerald** 행만 체크한 뒤 **Add Selected (1)**을 누르세요. **Select Visible**은 검색 결과 전체를 고르므로, 이 예제에서는 사용하지 않습니다.

## 인벤토리에서 건네는 실물 화폐

**Physical currency**는 화폐를 아이템으로 건네기 위한 설정입니다. 이름·고유 ID·한 개의 가치를 정하고 저장합니다. 단순 아이콘, 주운 아이템 변환, 실물 화폐는 사용하는 위치가 다릅니다. [화폐 시작 안내](#core/currency-editor)에서 상점과 연결하세요.
