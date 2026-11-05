---
title: 만든 NPC를 스포너에서 꺼내기
slug: spawn-control-npc-templates
order: 838
description: DNPC에 저장한 NPC를 자연 스폰이나 설치형 스포너에 연결합니다.
product: dochi-spawn-control
category: DNPC 템플릿 스폰
section: editor
status: 사용 안내
version: 0.1.5
audience: 제작자 / 서버 운영자
---

## 철 투구를 쓴 경비병을 스포너로 만들기

여기서는 DNPC에서 저장한 `guide_guard`를 스포너에 연결합니다. 이 연결에는 **DNPC와 DRM**이 필요합니다. `Entity` 목록의 기본 DNPC는 기본 NPC를 생성합니다. 꾸며 둔 외형·장비를 가져오려면 **NPC clone template**을 선택합니다.

먼저 DNPC에서 경비병을 완성하고 **Save to NPC → Save As → Name: guide_guard → Save**로 저장하세요. [NPC 템플릿 저장](#dochi-npc-core/npc-core-templates)에서 두 저장 버튼의 차이를 확인할 수 있습니다.

## 1. 저장한 NPC 고르기

1. **Spawner Editor → Spawn Target**을 엽니다. 처음 있는 항목 한 개를 그대로 사용합니다. 여러 종류를 섞으려면 **Add**로 항목을 늘립니다.
2. 오른쪽 **Source**를 **NPC clone template**으로 바꿉니다.
3. **Entity / Clone** 옆 돋보기(**Choose**)를 누르고 `guide_guard`를 검색합니다.
4. **NPC [dochi_npc:actor/guide_guard]** 행을 고른 뒤 **Select**를 누릅니다.

![저장한 guide_guard가 NPC 템플릿 선택 창에 나타난 모습.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. 표시 이름이 NPC여도 대괄호 안의 guide_guard로 저장한 템플릿을 구분할 수 있습니다.")

## 2. 스포너 파일 저장하기

**Enabled**를 켜고 **Entities per activation**을 `1`로 둡니다. 항목이 하나이고 **Chance**가 `1.0`이면 이 항목이 선택될 비율은 100%입니다. 이것은 매 틱 생성한다는 뜻이 아닙니다. 생성 간격과 조건은 별도입니다.

상단 **Save As**에서 이름을 `guide_guard_spawner.json`으로 입력하고 **Confirm**을 누릅니다. 상단 **JSON file**에 그 이름이 표시되는지 확인하세요.

![NPC clone template과 dochi_npc:actor/guide_guard를 연결해 저장한 스포너.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. guide_guard는 NPC 원본이고 guide_guard_spawner.json은 등장 조건을 담은 스포너 문서입니다. 서로 다른 파일입니다.")

## 3. 월드의 스포너에 적용하기

1. **Get Spawner**로 아이템을 받고 월드에 설치합니다.
2. **DRM Core**를 든 채 설치한 스포너를 우클릭합니다.
3. 목록에서 **guide_guard_spawner.json**을 고르고 **Apply JSON**을 누릅니다. 적용되면 창이 닫힙니다.
4. 기본 **Conditions**는 플레이어가 가까이 있어야 작동하며 **Include creative players**는 꺼져 있습니다. 이 설정으로 시험할 때는 서바이벌로 바꾸고 16블록 안에 머무릅니다.

![설치한 스포너의 Apply Spawner JSON 창에서 guide_guard_spawner.json을 선택한 모습.](assets/media/guides/spawn-control-014-neo1211/spawn-block-apply.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Save As만으로 월드의 스포너가 바뀌지는 않습니다. 이 창의 Apply JSON까지 눌러야 적용됩니다.")

이 순서로 실제 스포너에서 새 NPC 한 명이 만들어지고, 원본의 철 투구가 보존되는 것을 확인했습니다. [생성 간격·보유 수·조건](#dochi-spawn-control/dochi-spawn-control-spawner-settings)을 바꾸면 같은 템플릿으로 다른 등장 방식을 만들 수 있습니다.

![스포너 옆에 철 투구를 쓴 원본과 생성된 NPC들이 서 있는 모습.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. 저장한 철 투구가 새 NPC에게도 적용됩니다. 기본 보유 제한은 6이므로 한 명 생성 후에도 조건과 간격에 따라 추가 생성됩니다.")

## 주변에 자연스럽게 등장시키기 — 0.1.5의 모든 대상 버전

0.1.5에서는 Forge 1.20.1, Fabric·NeoForge 1.21.1과 26.3 모두 저장한 DNPC 템플릿을 자연 스폰 규칙으로 사용할 수 있습니다. 기본 **K**로 편집기를 열고 저장한 템플릿에 **Add Rule**을 만든 뒤 바이옴·시간·거리·수량을 정하고 켜서 저장합니다. 기본 NPC와 저장한 템플릿은 서로 다른 등장 대상입니다. 필요한 템플릿이나 DRM 제공 API가 없으면 빈 NPC로 대체하지 않고 해당 생성을 거부합니다.

## 목록에 없거나 모습이 다를 때

| 상황 | 확인할 곳 |
| --- | --- |
| 예전 템플릿이 없음 | DNPC에 불러온 뒤 Save to NPC → Save As로 새 이름에 다시 저장 |
| 파일은 있는데 목록에 없음 | 서버의 config/dochi_npc_core/templates/에 저장했는지, DNPC·DRM이 있는지 확인 |
| 저장했는데 스포너가 그대로임 | 월드의 스포너를 Core로 열고 파일을 다시 Apply JSON |
| 크리에이티브에서 아무 일도 없음 | Conditions의 Include creative players 또는 서바이벌 시험 |
| 예전 장비가 나옴 | NPC 원본을 다시 저장하고 템플릿을 다시 불러온 뒤 스포너에 재적용 |

생성된 NPC의 반복 생성은 Spawn Control이 관리합니다. 저장된 NPC의 자체 부활은 함께 실행하지 않습니다.
