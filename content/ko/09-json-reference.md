---
title: JSON 레퍼런스
slug: json-reference
order: 100
description: DRM Core가 현재 읽고 쓰는 주요 JSON 형식과 필드 요약입니다.
product: core
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.1.2
audience: 고급 사용자
tags:
  - json
  - reference
---

## 공통 규칙

- 모든 문서 JSON은 UTF-8로 저장합니다.
- 서버 JSON 경로는 `config/dochi_rpg_maker` 아래 상대 경로로 생각합니다.
- 파일명과 내부 `id`를 맞추면 대화 액션이나 상점 대상에서 찾기 쉽습니다.
- 기본 샘플 파일은 직접 덮어쓰기보다 `Save As`로 복제합니다.
- 대화와 상점 문서는 네트워크 전송 시 최대 1MB 제한이 있습니다.

## DialogueDocument 요약

```json
{
  "version": 1,
  "dialogueScript": true,
  "globals": {
    "ftb": false,
    "geckolib": false,
    "shopScript": false
  },
  "dialogueDefaultGui": {
    "guiSource": "default",
    "guiJsonPath": "default_dialogue_gui.json"
  },
  "setRegistry": ["default_set"],
  "nodes": {
    "start": {
      "type": "start",
      "routes": []
    },
    "dialogue_1": {
      "type": "general",
      "text": "",
      "choice": []
    }
  },
  "current": "start"
}
```

대화 세트는 폴더 단위입니다. `dialogue_set.json`은 전체 문서 스냅샷이고, 노드 파일은 편집/로드 호환을 위한 개별 노드입니다.

## GUI Layout 요약

```json
{
  "guiType": "npc_shop",
  "id": "default_shop_gui",
  "stage": {
    "width": 800,
    "height": 450,
    "grid": {
      "width": 4,
      "height": 4
    }
  },
  "elements": [
    {
      "id": "shop_rows",
      "type": "item_slot",
      "x": 88,
      "y": 112,
      "w": 416,
      "h": 154,
      "z": 2
    }
  ]
}
```

GUI 요소는 `id`, `type`, `x`, `y`, `w`, `h`, `z`를 기본으로 갖습니다. 타입별로 추가 스타일 필드가 붙습니다.

## ShopDocument 요약

```json
{
  "type": "npc_shop",
  "schemaVersion": 2,
  "id": "blacksmith",
  "title": "Blacksmith",
  "currency": "minecraft:emerald",
  "currencyType": "item",
  "tradeMode": "buy_sell",
  "display": {
    "itemDescription": true,
    "itemSearchBar": true,
    "itemListMode": "scroll"
  },
  "shopDefaultGui": {
    "guiJsonPath": "default_shop_gui.json"
  },
  "items": [],
  "sellItems": []
}
```

`tradeMode`는 `buy_only`, `sell_only`, `buy_sell`을 사용합니다. `items[].stock`은 `-1`이면 무제한입니다.

## CurrencyDefinition 요약

```json
{
  "type": "currency",
  "id": "gold",
  "name": "Gold",
  "enabled": true,
  "iconType": "item",
  "itemIcon": "minecraft:gold_nugget",
  "itemBacked": true,
  "autoConvertOnPickup": true,
  "displayFormat": "%s",
  "hudAmountFormat": "compact",
  "deathRule": "KEEP",
  "deathLossPercent": 0,
  "hudShowOnPickup": true
}
```

화폐 ID는 소문자, 숫자, 밑줄, 대시, 점을 사용합니다. `deathRule`은 `KEEP` 또는 `LOSE`입니다.

## Settings 요약

`settings/defaults.json`은 기본 GUI와 기본 화폐를 관리합니다.

```json
{
  "type": "editor_defaults",
  "version": 1,
  "defaultCurrencyId": "",
  "defaultCurrencyItem": "",
  "currencyEnabled": false,
  "defaultDialogueGui": {
    "guiJsonPath": "default_dialogue_gui.json"
  },
  "defaultShopGui": {
    "guiJsonPath": "default_shop_gui.json"
  }
}
```

`settings/reload_policy.json`은 리로드 정책을 관리합니다.

```json
{
  "type": "reload_policy",
  "version": 1,
  "reloadOnTrigger": true,
  "manualReloadCommand": true
}
```

:::tip 직접 수정 순서
직접 JSON을 편집했다면 문법 검사를 먼저 하고, 서버 파일을 수정했는지 확인한 뒤 `/drm reload` 또는 해당 에디터의 Load 기능으로 다시 읽어 보세요.
:::
