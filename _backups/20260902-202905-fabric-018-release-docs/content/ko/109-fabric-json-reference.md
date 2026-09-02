---
title: JSON 레퍼런스
slug: json-reference
order: 100
description: DRM Core가 현재 읽고 쓰는 주요 JSON 형식과 필드 요약입니다.
product: core-fabric
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.1.7
audience: 고급 사용자
tags:
  - json
  - reference
---

## 공통 규칙

- 서버 JSON 경로는 `config/dochi_rpg_maker` 아래 상대 경로로 생각합니다.
- 파일명과 내부 ID를 맞추면 대화, 상점, 텔레포터 대상을 찾기 쉽습니다.
- 기본 샘플 파일은 직접 덮어쓰기보다 `Save As`로 복제합니다.
- 대화 문서와 상점 문서는 런타임 네트워크 전송 버퍼에서 각각 최대 1MB까지 허용됩니다. 서버 JSON 패킷 자체에는 별도 2MB 제한이 있습니다.

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

이 절은 NPC Shop으로 저장한 상점 JSON의 내부 구조를 참고용으로 설명합니다. 일반 제작자는 에디터 화면에서 상품, 가격, 재고, GUI 연결을 설정하면 되고, 아래 필드는 파일을 직접 점검할 때만 보면 됩니다.

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

0.1.7 구매 상품의 결제·재입고 필드는 다음 형태입니다.

```json
{
  "productId": "special_ticket",
  "item": "minecraft:name_tag",
  "count": 1,
  "price": 4,
  "currencyType": "item",
  "currencyItem": "minecraft:paper",
  "currencyItemNbt": "",
  "stock": 8,
  "maxStock": 8,
  "restock": {
    "enabled": true,
    "amount": 2,
    "intervalTicks": 24000,
    "nextGameTime": 0
  }
}
```

상품이 상점 기본 결제를 그대로 쓰면 상품의 `currencyType`을 `inherit`로 둡니다. 명시한 결제 ID나 NBT가 잘못되면 런타임은 실패 상태로 처리합니다.

## TeleporterDocument 요약

```json
{
  "schemaVersion": 2,
  "setId": "town_network",
  "displayName": "Town Network",
  "gui": "default_teleporter_gui.json",
  "interactionConditions": {
    "enabled": false,
    "conditionMode": "and",
    "conditions": []
  },
  "lockedPresentation": { "mode": "dimmed" },
  "transition": {
    "fadeOutTicks": 10,
    "fadeInTicks": 10
  },
  "categories": [
    { "id": "towns", "name": "마을", "iconMedia": { "mode": "image" } }
  ],
  "destinations": [
    {
      "id": "spawn",
      "enabled": true,
      "categoryId": "towns",
      "name": "스폰",
      "description": "스폰으로 돌아갑니다.",
      "descriptionStyles": [],
      "target": { "x": 0.5, "y": 64.0, "z": 0.5, "yaw": 0.0, "pitch": 0.0 },
      "accessConditions": { "enabled": false, "conditionMode": "and", "conditions": [] }
    }
  ]
}
```

Teleporter Set은 `teleporters` 아래에 저장되는 파일 기반 `teleporter_set` 문서입니다. 한 세트는 카테고리 최대 256개, 목적지 최대 1,024개를 지원합니다. 목적지는 플레이어의 현재 차원 안에서 좌표와 회전값을 사용하며, 0.1.7 스키마에는 차원 필드가 없습니다.

## NPC Spawner 템플릿 요약

```json
{
  "format": "dochi_rpg_maker_npc_spawner_template",
  "schemaVersion": 1,
  "sourceId": "npc/test_guard",
  "name": "test_guard",
  "classificationId": "npc",
  "entityType": "customnpcs:customnpc",
  "minecraftVersion": "1.21.1",
  "requiredMods": ["customnpcs"],
  "bindingPolicy": "",
  "displayName": "Test Guard",
  "subject": "",
  "partySize": 0,
  "level": 0,
  "payloadEncoding": "snbt",
  "entityNbt": "{...}"
}
```

재사용 템플릿은 `npc_spawner/entity_clones/<classification>` 아래에 둡니다. 배치된 블록의 ConfigVersion 4 설정, 가중치 풀, 활성 리스는 `ServerJsonStorage`가 아니라 월드의 블록 엔티티 데이터에 저장됩니다. SNBT와 CustomNPCs 엔티티 데이터를 이해하지 못한다면 `entityNbt`를 직접 수정하지 마세요.

## Remnant Msg 요약

```json
{
  "type": "remnant_msg",
  "id": "tutorial",
  "enabled": true,
  "message": "문을 조사해 보세요.",
  "messageStyles": [],
  "useConditionsEnabled": false,
  "useConditions": [],
  "messageConditionsEnabled": false,
  "messageConditions": [],
  "messageActionsEnabled": false,
  "messageTrigger": "every_view",
  "messageActions": [],
  "gui": "default_remnant_msg_gui.json"
}
```

정책은 별도 `remnant_msg_policy` 문서이며 일반 사용자/관리자의 JSON·트리거 권한, 세터 소비, 마커 수명, 최대 메시지 길이를 관리합니다.

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
