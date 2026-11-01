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

## 상점 NPC에 아이콘 달기

DRM과 MapIcon Integration, 사용할 지도 모드를 설치합니다. **Xaero’s Minimap / World Map** 또는 **JourneyMap 6**를 사용할 수 있습니다.

1. NPC에 DRM 상점을 적용합니다.
2. DRM 에디터 목록이나 **Mods Config**에서 지도 아이콘 에디터를 엽니다.
3. 전체 표시를 켜고 **NPC Shop** 종류를 선택합니다.
4. 그림·크기·색상을 고르고 미니맵과 월드맵 중 어디에 보일지 정합니다.
5. **Save & Apply**를 누르고 지도를 엽니다.

대화 NPC나 트레이너도 같은 방식으로 종류에 맞는 아이콘을 정합니다. 코블몬 역할은 Cobblemon Editor가 설치되어 있어야 목록에 나타납니다.

## 한 NPC만 다르게 표시하기

DNPC는 **NPC 편집기 → 애드온 → 지도 아이콘**에서 바꿉니다. CustomNPCs는 **NPC Basic → 지도 아이콘**에서 설정합니다.

한 상점만 특별한 아이콘으로 만들거나, 지도에서 숨길 때 사용합니다. [개별 설정과 우선순위](#dochi-mapicon-integration/mapicon-editor-rules)를 확인하세요.

## 설치할 때

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

서버와 클라이언트에 같은 로더의 DRM·MapIcon을 설치합니다. 지도 모드는 각각 골라 설치하며, 해당 지도가 요구하는 라이브러리도 필요합니다. Fabric에는 Fabric API를 준비합니다.

지도 모드가 없어도 아이콘 설정은 편집할 수 있지만 지도 표시는 볼 수 없습니다. 26.3에서는 DNPC를 사용하며 CustomNPCs는 사용할 수 없습니다.

아이콘이 안 보이거나 내 그림을 넣고 싶으면 [그림 추가와 문제 해결](#dochi-mapicon-integration/mapicon-files-operations)을 보세요.
