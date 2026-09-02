---
title: 추천 작업 흐름
slug: workflows
order: 120
description: 대화, 상점, 텔레포터, NPC Spawner, 화폐/HUD를 실제 저장 구조 기준으로 만드는 순서입니다.
product: core-fabric
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.1.7
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
6. 반복되는 흐름은 `Shift+Click`으로 노드를 묶어 `Copy` / `Paste`하고, 행 드래그로 node/route/choice/condition/action 순서를 정리합니다.
7. `Save As`로 `dialogue_sets/my_npc_dialogue`에 저장합니다.
8. 코어 아이템으로 대상 NPC를 우클릭하고 대화를 적용합니다.
9. NPC에 저장된 대화는 아이템 없이 우클릭할 때 런타임 화면으로 열립니다.

## 파일 기반 상점 NPC 만들기

1. `GUI Maker`에서 `npc_shop` 타입 상점 GUI를 만들거나 기본 `default_shop_gui.json`을 사용합니다.
2. `NPC Shop`에서 `Create New NPC Shop`을 선택합니다.
3. `id`, `title`, `tradeMode`, `currency` 또는 `currencyId`를 정합니다.
4. 구매 상품은 `items`, 매입 상품은 `sellItems`에 추가합니다. 상품별 결제가 다르면 `Payment`를 상속 대신 아이템/DRM 화폐 override로 바꿉니다.
5. 유한 재고를 쓸 상품은 `Stock`, `Max Stock`, `Restock`, `Amount`, `Interval`을 설정합니다.
6. `shopDefaultGui`와 필요하면 `shopGuis.buy`, `shopGuis.sell`을 연결합니다.
7. `Save As`로 `npc_shops/blacksmith.json`처럼 저장합니다.
8. 대화 선택지에 `go_shop` 액션을 추가하고 `shop` 값을 `blacksmith`로 지정합니다.
9. 선택지를 누르면 파일 기반 상점 화면으로 이동합니다.

## NPC에 직접 붙은 상점 만들기

1. 코어 아이템으로 대상 NPC를 우클릭합니다.
2. `NPC Shop`을 열어 현재 NPC 상점을 편집합니다.
3. 저장하면 NPC PersistentData에 상점 JSON이 들어갑니다.
4. 대화에서 `go_shop` 값을 비우거나 `bound`로 두면 이 NPC 상점을 엽니다.

이 방식은 NPC 하나에 빠르게 붙일 때 편합니다. 여러 NPC가 같은 상점을 공유해야 한다면 파일 기반 상점이 관리하기 쉽습니다.

## 텔레포터 NPC 만들기

1. `GUI Maker`에서 `teleporter` GUI를 만들거나 `default_teleporter_gui.json`으로 시작합니다.
2. 공용 에디터 선택 화면에서 `Teleporter`를 열고 `Create New`를 고르거나, 보호된 기본 세트를 `Save As`로 복제합니다.
3. 카테고리와 목적지를 추가합니다. 목적지는 플레이어의 현재 차원 안에서 좌표와 회전값을 사용합니다.
4. 상호작용/목적지 조건, 잠김 표시, 페이드 tick, 소리, 선택형 이미지/아이템 미디어를 설정합니다.
5. `teleporters/town_network.json`으로 저장합니다.
6. 코어 아이템으로 대상 CustomNPCs NPC를 우클릭합니다. NPC Apply의 `FUNCTION`에서 Teleporter를 검색하고 저장한 JSON을 골라 `Apply Teleporter`를 누릅니다.
7. 코어 아이템 없이 NPC를 우클릭해 검색, 카테고리, 목적지 상세 정보, 이동을 확인합니다.
8. 대화 선택지에서 열려면 `go_teleporter`에 `bound` 또는 지정 세트 경로를 넣습니다.

이동 요청은 서버가 현재 NPC 바인딩, 세션 거리/차원, 상호작용 조건, 목적지 접근 조건을 다시 검사한 뒤 실행합니다.

## NPC Spawner 블록 만들기

1. `dochi_rpg_maker:npc_spawner`를 배치하고 `dochi_rpg_maker:dialogue_editor`로 우클릭합니다. 편집 권한이 있어야 하며 블록에서 8칸 안에 있어야 합니다.
2. 재사용 템플릿을 `npc_spawner/entity_clones/<classification>`에 두거나, 인벤토리에 CustomNPCs Filled Soul Stone을 준비해 원자적 스냅샷 소스로 사용합니다.
3. `Source` 탭에서 소스를 검색/분류하고 최대 64개를 추가한 뒤 각각 1~10,000의 가중치를 줍니다.
4. `Spawn` 탭에서 모드, 레드스톤 게이트, 쿨다운, 대상 반경, 오프셋/소환 반경, `Max Active`, `Wave Size`를 설정합니다.
5. `Conditions`에서 대상 조건 그룹을 만들고, `Effects`에서 표시 여부, 파티클, Default/Item/Block 외형을 설정합니다.
6. `Save`를 누르고 블록을 활성화한 뒤 소환 동작과 재시작 후 유지를 확인합니다.

`Max Active`는 가중치 풀 전체의 전역 상한이고, `Wave Size`는 한 번에 시도할 소환 횟수입니다. 소스 제거·가중치 변경은 이후 선택에 적용되며 이미 소환된 무관한 NPC를 제거하지 않습니다.

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
| 파일명 | 대화 세트, GUI, 상점, 텔레포터, 화폐 파일명이 의도한 ID와 맞아야 합니다. |
| 기본값 | 기본 파일은 직접 수정하지 않고 복사본을 사용합니다. |
| 연결 | 대화/상점/텔레포터 GUI와 상점 화폐 ID가 실제 파일과 맞아야 합니다. |
| 월드 저장 | NPC PersistentData, NPC Spawner 블록 엔티티, 서버 JSON 파일을 구분합니다. |
| 리로드 | 서버 JSON을 직접 수정했다면 `/drm reload` 또는 개별 reload 명령으로 갱신합니다. |

:::tip 운영 복사본
운영 서버에 옮길 때는 `config/dochi_rpg_maker` 전체와 월드 저장본을 함께 관리합니다. 월드 안 NPC PersistentData나 NPC Spawner 블록에만 저장된 데이터는 config 파일 복사만으로는 같이 이동하지 않습니다.
:::

:::tip 편집 중 빠른 조작
지원 화면에서는 `Ctrl+S`, `Ctrl+Z`, `Ctrl+Y` 또는 `Ctrl+Shift+Z`를 사용할 수 있습니다. 기본 보호 JSON에서는 `Ctrl+S` 대신 새 ID로 `Save As`하세요.
:::
