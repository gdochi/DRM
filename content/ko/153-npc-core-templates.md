---
title: NPC를 저장하고 다시 쓰기
slug: npc-core-templates
order: 1530
description: 완성한 NPC를 템플릿으로 보관하고 복제하거나 기존 NPC에 불러옵니다.
product: dochi-npc-core
category: NPC 복제 템플릿
section: operations
status: 사용 안내
version: 0.1.3
audience: 제작자 / 서버 운영자
---

## 완성한 NPC 저장하기

1. 코어로 NPC를 열고 외형·장비·행동을 완성합니다.
2. 상단 **Save to NPC**를 누릅니다.
3. 상단 **Save As**를 누르고 **Name**에 `guide_guard`처럼 구분할 이름을 쓴 뒤 **Save**를 누릅니다.

![DNPC 편집기의 Save As 창. 템플릿 Name 입력란과 Save, Cancel 버튼이 있습니다.](assets/media/guides/dnpc-012-neo1211/dnpc-templates-save.png "DNPC 0.1.2 / NeoForge 1.21.1. Save to NPC는 월드의 NPC에 반영하고, Save As는 나중에 다시 꺼낼 템플릿을 저장합니다.")

파일은 `config/dochi_npc_core/templates/`에 보관됩니다. 잠깐 복사할 때는 Ctrl+C / Ctrl+V를, 다음에도 꺼내 쓸 때는 템플릿을 사용합니다.

![철 투구를 쓴 NPC를 템플릿으로 저장한 뒤 Saved 응답이 표시된 화면.](assets/media/guides/dnpc-013-neo1211/dnpc-template-saved.png "DNPC 0.1.3 / NeoForge 1.21.1. guide_guard로 저장한 실제 NPC입니다. 저장 후 Spawn Control 목록에서 선택하고, 생성된 NPC의 철 투구 보존까지 확인했습니다.")

## 무엇이 따라오나요?

외형·장비·인벤토리와 행동 설정, 연결한 대화·상점 등의 설정을 재사용합니다. 새로 만든 NPC는 진행 중이던 운반·탑승·전투를 이어받지 않고 새로 시작합니다.

기존 NPC에 템플릿을 불러올 때는 그 NPC의 위치와 진행 중인 운반물을 유지합니다. 새 NPC 만들기와 기존 NPC에 덮어 적용하기를 구분해 선택하세요.

## 경비병을 여러 곳에 등장시키기

[Spawn Control](#dochi-spawn-control/spawn-control-npc-templates)의 **NPC 복제 템플레이트** 목록에서 저장한 NPC를 고릅니다. 그 자리의 경비병을 만들거나 시간·장소 조건에 따라 등장시키는 데 쓸 수 있습니다. 이 연결에는 DRM도 필요합니다.

NPC 템플릿 자체의 저장에는 DRM이 필요하지 않습니다.

![스포너 옆에 철 투구를 쓴 원본과 생성된 NPC들이 서 있는 모습.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. 저장한 철 투구가 새 NPC에게도 적용됩니다. 기본 보유 제한은 6이므로 한 명 생성 후에도 조건과 간격에 따라 추가 생성됩니다.")

## 예전 파일이 목록에 없어요

설정 전용 또는 v2 템플릿은 NPC에 불러온 뒤 **Save to NPC → Save As**로 다시 저장합니다. 기존 파일을 보관하려면 새 이름을 쓰세요.

파일을 바꿨는데 이전 장비가 계속 나오면 Spawn Control에서 템플릿을 다시 불러오고 적용합니다.
