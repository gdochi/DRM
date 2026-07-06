---
title: 추천 작업 흐름
slug: workflows
order: 120
description: 대화 NPC, 상점 NPC, 화폐/HUD를 실제 저장 구조 기준으로 만드는 순서입니다.
product: core
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.1.2
audience: 제작자
tags:
  - workflow
  - examples
---

## 대화 NPC 만들기

1. `GUI Maker`에서 `dialogue` 타입 GUI를 만들고 `gui/my_dialogue_gui.json`으로 저장합니다.
2. `Dialogue Editor`에서 `Create New Dialogue Set`을 선택합니다.
3. `dialogueDefaultGui.guiJsonPath`를 만든 GUI 파일로 연결합니다.
4. `start` 노드의 route가 첫 일반 노드를 가리키게 합니다.
5. 일반 노드에 대사, 선택지, 조건, 액션을 추가합니다.
6. `Save As`로 `dialogue_sets/my_npc_dialogue`에 저장합니다.
7. 코어 아이템으로 대상 NPC를 우클릭하고 대화를 적용합니다.
8. NPC에 저장된 대화는 아이템 없이 우클릭할 때 런타임 화면으로 열립니다.

## 파일 기반 상점 NPC 만들기

1. `GUI Maker`에서 `npc_shop` 타입 상점 GUI를 만들거나 기본 `default_shop_gui.json`을 사용합니다.
2. `NPC Shop`에서 `Create New NPC Shop`을 선택합니다.
3. `id`, `title`, `tradeMode`, `currency` 또는 `currencyId`를 정합니다.
4. 구매 상품은 `items`, 매입 상품은 `sellItems`에 추가합니다.
5. `shopDefaultGui`와 필요하면 `shopGuis.buy`, `shopGuis.sell`을 연결합니다.
6. `Save As`로 `npc_shops/blacksmith.json`처럼 저장합니다.
7. 대화 선택지에 `go_shop` 액션을 추가하고 `shop` 값을 `blacksmith`로 지정합니다.
8. 선택지를 누르면 파일 기반 상점 화면으로 이동합니다.

## NPC에 직접 붙은 상점 만들기

1. 코어 아이템으로 대상 NPC를 우클릭합니다.
2. `NPC Shop`을 열어 현재 NPC 상점을 편집합니다.
3. 저장하면 NPC PersistentData에 상점 JSON이 들어갑니다.
4. 대화에서 `go_shop` 값을 비우거나 `bound`로 두면 이 NPC 상점을 엽니다.

이 방식은 NPC 하나에 빠르게 붙일 때 편합니다. 여러 NPC가 같은 상점을 공유해야 한다면 파일 기반 상점이 관리하기 쉽습니다.

## 화폐와 HUD 준비

1. `Currency Editor`에서 화폐 ID와 이름을 만듭니다.
2. `itemIcon`을 `minecraft:emerald`처럼 실제 아이템 ID로 지정합니다.
3. 아이템 픽업을 잔액으로 바꾸려면 `autoConvertOnPickup`을 켭니다.
4. 사망 시 손실이 필요하면 `deathRule: "LOSE"`와 `deathLossPercent`를 설정합니다.
5. `HUD Maker` 또는 `GUI Maker`의 `currency_hud` 타입에서 화폐 표시 컴포넌트를 배치합니다.
6. `/drm currency reload` 후 서버가 새 화폐 정의를 읽게 합니다.

## 운영 반영 전 정리

| 항목 | 정리 기준 |
| --- | --- |
| 파일명 | 대화 세트, GUI, 상점, 화폐 파일명이 의도한 ID와 맞아야 합니다. |
| 기본값 | 기본 파일은 직접 수정하지 않고 복사본을 사용합니다. |
| 연결 | 대화의 GUI, 상점의 GUI, 상점의 화폐 ID가 실제 파일과 맞아야 합니다. |
| NPC 저장 | NPC PersistentData에 직접 저장한 데이터와 서버 JSON 파일을 구분합니다. |
| 리로드 | 서버 JSON을 직접 수정했다면 `/drm reload` 또는 개별 reload 명령으로 갱신합니다. |

:::tip 운영 복사본
운영 서버에 옮길 때는 `config/dochi_rpg_maker` 전체를 기준으로 관리합니다. 월드 안 NPC PersistentData에만 저장된 데이터는 파일 복사만으로는 같이 이동하지 않습니다.
:::
