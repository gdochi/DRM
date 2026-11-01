---
title: 지도에 NPC 아이콘 띄우기
slug: mapicon-setup
order: 1400
description: 상점·트레이너 같은 NPC를 지도에서 알아보기 쉽게 표시합니다.
product: dochi-mapicon-integration
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## NPC 한 명을 파란 아이콘으로 표시하기

DRM·MapIcon Integration과 실제 지도를 표시할 모드를 준비합니다. 아래는 **MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1 / Xaero’s Minimap 26.6.0**에서 확인한 화면입니다. 아이콘 설정 편집은 지도 모드 없이도 할 수 있습니다.

1. [DNPC](#dochi-npc-core/npc-core-setup)를 한 명 배치합니다.
2. **NPC 편집기 → Addons → Map icon**을 엽니다. NPC 하나를 바꾸는 화면은 왼쪽에 **Selected NPC**만 있습니다.
3. **Icon**을 켜고 그림을 고릅니다. 예제는 내장 파란 사람 아이콘입니다.
4. **Size 16**, **Tint 4AB7FF**, **Minimap** 켜기로 맞춥니다. 월드맵에도 표시하려면 **World map**도 켭니다.
5. 상단 **Save**를 누르고 **Settings saved** 응답을 확인합니다.
6. 편집기를 닫고 미니맵에서 해당 NPC의 아이콘을 확인합니다.

![Selected NPC에서 파란 사람 아이콘을 저장한 화면.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "이 화면의 Save는 선택한 NPC의 설정을 저장합니다. 가운데는 아이콘 미리보기이며 지도 화면은 아닙니다. Texture resource·Size·Tint와 사용할 지도 스위치를 함께 확인합니다.")

![실제 Xaero 미니맵에 파란 사람 아이콘으로 표시된 DNPC.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "왼쪽 위 미니맵에서 흰 플레이어 표시 바로 위의 파란 사람 아이콘이 Oakridge guide NPC입니다. 주변 노란 표시는 다른 동물입니다. 선택한 NPC를 약 20블록 떨어뜨려 지도 위치와 월드의 NPC를 함께 확인했습니다.")

## 모든 상점에 같은 아이콘 쓰기

개별 NPC마다 작업하지 않고 상점 종류 전체를 바꾸려면 DRM 에디터 목록이나 **Mods Config**에서 전체 지도 아이콘 에디터를 엽니다.

1. 글로벌 표시를 켜고 **Type defaults → NPC Shop JSON**을 고릅니다.
2. 사용할 이미지·크기·색상·지도 표시를 정합니다.
3. **Save & Apply**로 서버 프로필을 저장·활성화합니다.
4. 실제 DRM 상점이 적용된 NPC로 확인합니다.

대화·트레이너도 해당 종류의 기본값을 고릅니다. Cobblemon 역할은 Cobblemon Editor가 있을 때 목록에 나타납니다. 한 NPC만 다른 그림을 썼다면 개별 설정이 우선하므로 [아이콘 우선순위](#dochi-mapicon-integration/mapicon-editor-rules)를 확인하세요.

## 설치할 때

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

서버와 클라이언트에 같은 로더의 DRM·MapIcon을 설치합니다. 지도 모드는 각각 골라 설치하며, 해당 지도가 요구하는 라이브러리도 필요합니다. Fabric에는 Fabric API를 준비합니다.

지도 모드가 없어도 아이콘 설정은 편집할 수 있지만 지도 표시는 볼 수 없습니다. 26.3에서는 DNPC를 사용하며 CustomNPCs는 사용할 수 없습니다.

아이콘이 안 보이거나 내 그림을 넣고 싶으면 [그림 추가와 문제 해결](#dochi-mapicon-integration/mapicon-files-operations)을 보세요.
