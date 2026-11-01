---
title: NPC를 저장하고 다시 쓰기
slug: npc-core-templates
order: 1530
description: 완성한 NPC를 템플릿으로 보관하고 복제하거나 기존 NPC에 불러옵니다.
product: dochi-npc-core
category: NPC 복제 템플릿
section: operations
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## 완성한 NPC 저장하기

1. 코어로 NPC를 열고 외형·장비·행동을 완성합니다.
2. **NPC에 저장**을 누릅니다.
3. **복제 템플레이트로 저장**을 눌러 이름을 정합니다.

파일은 `config/dochi_npc_core/templates/`에 보관됩니다. 잠깐 복사할 때는 Ctrl+C / Ctrl+V를, 다음에도 꺼내 쓸 때는 템플릿을 사용합니다.

## 무엇이 따라오나요?

외형·장비·인벤토리와 행동 설정, 연결한 대화·상점 등의 설정을 재사용합니다. 새로 만든 NPC는 진행 중이던 운반·탑승·전투를 이어받지 않고 새로 시작합니다.

기존 NPC에 템플릿을 불러올 때는 그 NPC의 위치와 진행 중인 운반물을 유지합니다. 새 NPC 만들기와 기존 NPC에 덮어 적용하기를 구분해 선택하세요.

## 경비병을 여러 곳에 등장시키기

[Spawn Control](#dochi-spawn-control/spawn-control-npc-templates)의 **NPC 복제 템플레이트** 목록에서 저장한 NPC를 고릅니다. 그 자리의 경비병을 만들거나 시간·장소 조건에 따라 등장시키는 데 쓸 수 있습니다. 이 연결에는 DRM도 필요합니다.

NPC 템플릿 자체의 저장에는 DRM이 필요하지 않습니다.

## 예전 파일이 목록에 없어요

설정 전용 또는 v2 템플릿은 NPC에 불러온 뒤 **NPC에 저장 → 복제 템플레이트로 저장**으로 다시 저장합니다. 기존 파일을 보관하려면 새 이름을 쓰세요.

파일을 바꿨는데 이전 장비가 계속 나오면 Spawn Control에서 템플릿을 다시 불러오고 적용합니다.
