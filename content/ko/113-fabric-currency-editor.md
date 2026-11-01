---
title: 커런시 에디터
slug: currency-editor
order: 90
description: 잔액·실물 화폐를 만들고 아이템 변환·사망 규칙과 상점·HUD 연결을 설정합니다.
product: core-fabric
category: 커런시 에디터
section: currency-editor
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - currency
  - editor
---

## 상점에서 쓸 돈 만들기

코어의 에디터 선택 화면에서 **Currency Editor**를 엽니다. 아래 화면은 **DRM 0.3.1 / NeoForge 1.21.1의 영문 UI**입니다.

![Currency Editor의 기본 화폐 설정 화면. 화폐 이름과 아이콘, 표시 형식, 사망 처리와 HUD 설정을 편집합니다.](assets/media/guides/drm-031-neo1211/currency-editor.png "돈의 종류를 만드는 화면입니다. 상품 가격은 여기서 정하지 않고 NPC Shop에서 정합니다.")

1. **Name**에 표시 이름을 정합니다. 예제의 `Town Coin`과 저장할 ID `town_coin`은 구분합니다.
2. 오른쪽 **Item Icon** 돋보기에서 에메랄드처럼 실제 아이템을 고르고 선택창의 **Apply**를 누릅니다. 아이콘이 비어 있으면 `Invalid item icon`으로 저장이 막힐 수 있습니다.
3. 금액 표시를 정하고 **Save As**의 **Currency ID**에 `town_coin`을 입력해 확인창의 **Save As**로 저장합니다. 저장 후 상점과 HUD는 이 ID로 화폐를 찾습니다.
4. [NPC Shop](#core-fabric/shop-system)의 결제 설정에서 이 화폐를 선택하고 상품 가격을 넣습니다. 아이템으로 직접 교환하는 상점과 DRM 잔액을 사용하는 상점은 결제 대상을 다르게 고릅니다.
5. 잔액을 화면에 보이게 하려면 [HUD Maker](#core-fabric/hud-maker)에서도 이 화폐를 표시할 요소를 준비합니다.

### 에메랄드 한 개를 잔액 10으로 정하기

**Convert items on pickup → Item Prices → Add Item**에서 `minecraft:emerald`를 검색합니다. 에메랄드 행 하나만 체크해 **Add Selected (1)**로 넣고, 변환 목록에서 체크한 뒤 **Value / Item 10 → Apply Selected**를 누릅니다. 창을 닫고 화폐를 저장하세요.

![town_coin에 에메랄드 한 항목과 Value / Item 10을 저장한 변환 목록.](assets/media/guides/drm-031-neo1211/currency-emerald-prices.png "DRM 0.3.1 / NeoForge 1.21.1. 저장한 화폐의 목록을 다시 연 화면입니다. 에메랄드 광석·블록까지 고르지 않도록 정확한 minecraft:emerald 행을 선택합니다. 실제 습득 후 잔액 변화는 별도로 확인합니다.")

### 인벤토리에서 주고받는 돈도 필요하다면

**Physical currency**에서 실물 화폐를 설정합니다. 한 개의 가치를 `10`으로 정했다면 그 아이템 한 개가 화폐 10에 해당합니다. 상점 상품의 판매 수량과 혼동하지 마세요.

![Currency Editor의 Physical currency 화면. 실물 아이템의 이름과 ID, 한 개의 가치를 정하는 설정이 보입니다.](assets/media/guides/drm-031-neo1211/currency-physical.png "지갑의 잔액과 인벤토리의 실물 화폐는 구분해서 설정합니다. 사용할 결제 방식은 상점에서도 확인합니다.")

## 화폐가 쓰이는 곳

Currency Editor에서 돈의 이름·아이콘·아이템 변환·사망 시 잃는 양을 정합니다. 만든 화폐는 상점이나 보상, HUD에서 선택해 사용합니다.

화폐는 단순 표시값이 아닙니다. NPC Shop 결제, 아이템 픽업 변환, HUD 표시, 사망 시 잔액 처리에 모두 사용됩니다.

## 저장 위치

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

**Load**에서 ID·파일명·표시 이름으로 저장한 화폐를 검색할 수 있습니다.

## 파일을 직접 편집할 때의 참고

아래 필드 이름은 JSON을 직접 수정할 때 보는 참고입니다. 인게임 에디터로 만들 때 외울 필요는 없습니다.

| 필드 | 의미 |
| --- | --- |
| `type` | 항상 `currency`입니다. |
| `id` | 화폐 고유 ID입니다. 파일명과 잔액 키에 사용됩니다. |
| `name` | HUD와 상점에 표시할 이름입니다. |
| `nameTranslationKey` | `name`을 번역 키로 볼지 정합니다. |
| `enabled` | 화폐 사용 여부입니다. |
| `nameColor` | 표시 이름 색상입니다. |
| `itemIcon` | 화폐를 대표하는 아이템 ID입니다. |
| `itemNbt` | 아이콘 또는 아이템 변환에 사용할 NBT 문자열입니다. |
| `itemBacked` | 아이템 기반 화폐로 볼지 정하는 호환 필드입니다. |
| `autoConvertOnPickup` | 아이템 픽업 시 잔액으로 바꿀지 정합니다. |
| `displayFormat` | 잔액 표시 형식입니다. `%s` 자리에 숫자가 들어갑니다. |

## 실물 화폐 아이템

0.1.8부터 화폐 정의의 `physicalItem`을 켜면 인벤토리에서 주고받을 수 있는 실물 화폐를 만들 수 있습니다.

| 설정 | 의미 |
| --- | --- |
| 이름 | 아이템에 표시할 이름 또는 번역 키입니다. |
| ID | 같은 기본 아이템 안에서 화폐 종류를 구분하는 고유 ID입니다. |
| 개당 가치 | 아이템 한 개가 나타내는 화폐 금액입니다. |

상점은 설정에 따라 실물 화폐를 결제로 받거나 판매 대금으로 지급할 수 있습니다. 실물 ID는 다른 화폐와 겹치지 않게 정하세요.

## 상단 버튼

| 버튼 | 기능 |
| --- | --- |
| `Editors` | 에디터 선택 UI로 돌아갑니다. |
| `Create New` | 새 화폐 초안을 만듭니다. |
| `Load` | 서버 또는 로컬 화폐 JSON을 검색해서 불러옵니다. |
| `Save` | 현재 파일에 저장합니다. 기본 보호 파일이면 비활성화될 수 있습니다. |
| `Save As` | 새 파일명으로 저장합니다. |
| `Reset` | 현재 초안을 기본값으로 되돌립니다. |
| `Delete` | 선택한 화폐 JSON 삭제 흐름을 엽니다. |

## 사망 규칙

| 값 | 의미 |
| --- | --- |
| `KEEP` | 사망해도 해당 화폐 잔액을 잃지 않습니다. |
| `LOSE` | `deathLossPercent` 비율만큼 잔액을 잃습니다. |

`deathLossPercent`는 0부터 100 사이 값입니다. `LOSE`를 선택했는데 값이 0이면 에디터가 기본적으로 100을 넣어 손실 규칙이 명확하게 보이도록 합니다.

DRM은 플레이어가 사망 후 새 엔티티로 교체될 때 DRM 지갑과 호환 은행 잔액 키를 복사합니다. `KEEP`은 잔액을 유지하고, `LOSE`는 손실 규칙을 적용한 결과를 이어받습니다. 아이템 자동 변환과 사망 손실이 실제로 발생하면 플레이어 채팅에 안내가 표시됩니다. 일반 픽업은 방금 주운 스택만 변환하며 인벤토리의 다른 화폐 스택을 함께 훑지 않습니다.

## 잔액을 HUD에 표시하기

[HUD Maker](#core-fabric/hud-maker)에서 Currency 요소를 추가하고 저장한 화폐를 고릅니다. 금액 서식·위치·표시 조건은 HUD 쪽에서 정합니다. 화폐 정의에 옛 HUD 허용 필드를 직접 넣지 않습니다.

## Shared 설정

`Shared` 스위치는 현재 화폐를 상점 기본 화폐로 사용할지 정하는 설정입니다. 켜면 새 상점 초안이나 기본 상점 설정이 이 화폐를 우선 사용합니다.

상점마다 다른 화폐를 쓰려면 `Shared` 기본값과 별개로 NPC Shop에서 `currencyId`를 직접 지정하면 됩니다.


## 제한

- Currency Editor는 화폐 정의를 만드는 도구입니다. 상점 가격표는 NPC Shop에서 정합니다.
- HUD의 위치와 디자인은 HUD Maker 또는 GUI Maker의 `currency_hud` 타입에서 다룹니다.
- 화폐 ID를 바꾸면 기존 상점이나 명령에서 참조하던 ID도 같이 바꿔야 합니다.
- 여러 화폐를 하나의 단일 금액으로 자동 환전하는 기능은 이 에디터의 기본 역할이 아닙니다.
