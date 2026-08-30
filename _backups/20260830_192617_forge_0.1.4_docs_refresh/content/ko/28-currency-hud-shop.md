---
title: HUD와 상점 연동
slug: currency-hud-shop
order: 92
description: Currency Editor의 화폐 정의가 NPC Shop과 HUD Maker에 연결되는 방식을 설명합니다.
product: core
category: 커런시 에디터
section: currency-editor
status: 안정
version: 0.1.3
audience: 제작자 / 운영자
tags:
  - currency
  - hud
  - shop
---

## 상점 결제 연결

NPC Shop에서 DRM 화폐를 쓰려면 상점 문서의 `currencyType`과 `currencyId`가 화폐 정의와 맞아야 합니다.

```json
{
  "currencyType": "currency",
  "currencyId": "gold"
}
```

이 경우 가격은 플레이어 인벤토리 아이템이 아니라 서버에 저장된 `gold` 잔액에서 차감됩니다.

0.1.3에서는 구매 상품마다 상점 기본 결제를 상속하거나 다른 결제로 덮어쓸 수 있습니다.

```json
{
  "currencyType": "currency",
  "currencyId": "silver"
}
```

이 필드를 `items[]` 안에 넣으면 해당 상품만 `silver`를 사용합니다. 아이템 결제 override는 `currencyType: "item"`, `currencyItem`, 선택적 `currencyItemNbt`를 사용합니다. 매입 보상과 상점 루트 기본 결제는 기존 규칙을 따릅니다.

## 아이템 화폐와 DRM 화폐의 차이

| 구분 | 아이템 화폐 | DRM 화폐 |
| --- | --- | --- |
| 기준 | 인벤토리 아이템 수량 | 서버 잔액 |
| 주요 필드 | `currencyItem` | `currencyId` |
| 대표 예 | 에메랄드 상점 | RPG 골드, 토큰, 명성 |
| HUD 표시 | 직접 구성 필요 | Currency HUD와 자연스럽게 연결 |

아이템 화폐는 단순하고 직관적입니다. DRM 화폐는 인벤토리와 분리된 잔액이 필요할 때 사용합니다.

## HUD 연결

화폐 HUD는 세 가지 조건이 맞아야 표시됩니다.

| 조건 | 담당 |
| --- | --- |
| 화폐 정의가 존재함 | Currency Editor |
| HUD 표시 옵션이 켜져 있음 | Currency Editor |
| HUD에 화폐 표시 컴포넌트가 있음 | HUD Maker 또는 GUI Maker `currency_hud` |

화폐 정의의 `hudAlwaysVisible`, `hudShowOnPickup`, `hudShowInInventory`는 “언제 보일지”를 정합니다. 위치, 크기, 아이콘 배치는 HUD 쪽 문서가 담당합니다.

## 잔액 명령

화폐 잔액은 운영 명령으로도 다룰 수 있습니다.

| 명령 | 용도 |
| --- | --- |
| `/drm currency list` | 등록된 화폐 목록을 봅니다. |
| `/drm currency create <id>` | 기본 화폐 정의를 만듭니다. |
| `/drm currency give <player> <id> <amount>` | 플레이어에게 화폐를 지급합니다. |
| `/drm currency take <player> <id> <amount>` | 플레이어 화폐를 차감합니다. |
| `/drm currency set <player> <id> <amount>` | 잔액을 특정 값으로 맞춥니다. |
| `/drm currency get <player> <id>` | 현재 잔액을 봅니다. |

명령은 서버 잔액을 직접 다룹니다. HUD는 그 잔액을 받아 표시하는 쪽입니다.

## 제작 순서

1. Currency Editor에서 화폐 ID를 만듭니다.
2. 상점에서 쓸 경우 NPC Shop의 `currencyId`를 같은 ID로 지정합니다.
3. HUD에 표시할 경우 HUD Maker나 `currency_hud` GUI에 화폐 컴포넌트를 둡니다.
4. 서버가 새 JSON을 읽도록 reload 명령을 실행합니다.

## 제한

- 한 상점의 기본 가격 필드는 하나의 기준 화폐를 사용합니다.
- HUD에 숫자가 보이는 것과 상점 결제가 되는 것은 별개입니다. 상점 문서의 `currencyId`가 맞아야 결제에 사용됩니다.
- 명령으로 잔액을 바꿔도 화폐 정의 파일이 없으면 이름, 아이콘, HUD 규칙을 제대로 적용하기 어렵습니다.
