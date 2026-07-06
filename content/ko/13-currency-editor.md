---
title: 커런시 에디터
slug: currency-editor
order: 90
description: Currency Editor에서 화폐 정의, 아이템 변환, 사망 규칙, HUD 표시 기준을 설정하는 방법입니다.
product: core
category: 커런시 에디터
section: currency-editor
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - currency
  - editor
---

## 역할

Currency Editor는 DRM Core의 화폐 정의 JSON을 만드는 에디터입니다. 화폐 정의는 `config/dochi_rpg_maker/currency/definitions`에 저장되고, 런타임에서는 플레이어 PersistentData의 잔액 키와 연결됩니다.

화폐는 단순 표시값이 아닙니다. NPC Shop 결제, 아이템 픽업 변환, HUD 표시, 사망 시 잔액 처리에 모두 사용됩니다.

## 저장 위치

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

서버 JSON kind는 `currency`입니다. 에디터의 Load 화면은 `currency_index`를 받아 파일 목록을 보여주고, 검색어로 ID/파일명/표시 이름을 필터링합니다.

## 기본 필드

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
| `HUD GUI` | `currency_hud` 타입 GUI 편집으로 이동합니다. |
| `HUD` | 클라이언트 HUD 표시 자체를 켜거나 끕니다. |

## 사망 규칙

| 값 | 의미 |
| --- | --- |
| `KEEP` | 사망해도 해당 화폐 잔액을 잃지 않습니다. |
| `LOSE` | `deathLossPercent` 비율만큼 잔액을 잃습니다. |

`deathLossPercent`는 0부터 100 사이 값입니다. `LOSE`를 선택했는데 값이 0이면 에디터가 기본적으로 100을 넣어 손실 규칙이 명확하게 보이도록 합니다.

## HUD 표시 설정

| 필드 | 의미 |
| --- | --- |
| `hudAmountFormat` | `compact` 또는 `full`입니다. |
| `hudAlwaysVisible` | 항상 HUD에 보이게 할지 정합니다. |
| `hudShowOnPickup` | 화폐 변화가 있을 때 잠시 보이게 할지 정합니다. |
| `hudShowInInventory` | 인벤토리 화면에서 보이게 할지 정합니다. |
| `hudPickupTicks` | 픽업 표시가 유지되는 tick 수입니다. 기본값은 80입니다. |

화폐 정의가 HUD 표시를 허용해도, 실제 HUD 화면에는 HUD Maker 또는 `currency_hud` GUI에 화폐 컴포넌트가 있어야 표시됩니다.

## Shared 설정

`Shared` 스위치는 현재 화폐를 상점 기본 화폐로 사용할지 정하는 설정입니다. 켜면 새 상점 초안이나 기본 상점 설정이 이 화폐를 우선 사용합니다.

상점마다 다른 화폐를 쓰려면 `Shared` 기본값과 별개로 NPC Shop에서 `currencyId`를 직접 지정하면 됩니다.

## 가능한 것

- 서버 공용 화폐 정의를 만들 수 있습니다.
- 아이템을 주웠을 때 잔액으로 변환되게 할 수 있습니다.
- 상점 결제용 화폐로 연결할 수 있습니다.
- HUD 표시 방식과 사망 시 잔액 손실 비율을 정할 수 있습니다.
- 명령으로 잔액을 지급, 차감, 설정, 조회할 수 있습니다.

## 제한

- Currency Editor는 화폐 정의를 만드는 도구입니다. 상점 가격표는 NPC Shop에서 정합니다.
- HUD의 위치와 디자인은 HUD Maker 또는 GUI Maker의 `currency_hud` 타입에서 다룹니다.
- 화폐 ID를 바꾸면 기존 상점이나 명령에서 참조하던 ID도 같이 바꿔야 합니다.
- 여러 화폐를 하나의 단일 금액으로 자동 환전하는 기능은 이 에디터의 기본 역할이 아닙니다.
