---
title: 지도 아이콘 설치와 시작
slug: mapicon-setup
order: 1400
description: 현재 설치 조건과 기본 사용 순서입니다.
product: dochi-mapicon-integration
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## 어떤 기능인가요?

**MapIcon Integration 0.1.2**은 DRM NPC의 지도 아이콘을 타입·JSON 파일·개별 NPC별로 설정합니다. Xaero’s Minimap·World Map과 **JourneyMap 6 / API 2**를 지원합니다.

## 설치

| 빌드 | Minecraft / Java | DRM |
| --- | --- | --- |
| Forge | 1.20.1 / 17 | 필수 |
| Fabric·NeoForge | 1.21.1 / 21 | 필수 |
| Fabric·NeoForge | 26.3 / 25 | 같은 26.3 로더 빌드, 필수 |

서버와 클라이언트에 같은 대상의 `dochi_mapicon_integration-0.1.2-<loader>-<minecraft>.jar`와 DRM을 설치합니다. DRM에 숫자 버전 하한을 두지 않습니다. 현재 확인한 기존 대상 Core는 0.2.9이며 이를 최소 버전으로 해석하지 마세요.

**Xaero Minimap·World Map·JourneyMap은 각각 독립적인 선택 연동**입니다. 하나만 설치하거나 모두 없어도 에디터와 서버 저장을 사용할 수 있습니다. 설치하지 않은 지도의 렌더링만 비활성화합니다. 지도를 설치할 때는 해당 지도 자체의 기반 라이브러리도 준비합니다.

CustomNPCs·DNPC도 사용할 NPC에 맞춘 선택 제공자입니다. 26.3은 CustomNPCs를 영구 제외하고 공통 Actor API를 사용합니다. [26.3 안내](#core-fabric/minecraft-26-3)를 확인하세요.

지도 컴파일 기준은 Xaero Minimap 26.6.0 / World Map 1.47.0, JourneyMap 6 / API 2입니다. 지도 모드의 모든 과거 버전 호환을 보증하는 수치는 아닙니다.

## 첫 상점 아이콘

1. NPC에 DRM NPC Shop JSON을 적용합니다.
2. OP 2 이상으로 DRM 에디터 목록 또는 Mods Config에서 지도 아이콘 에디터를 엽니다.
3. 글로벌 표시를 켜고 JSON 타입에서 NPC Shop을 선택합니다.
4. 아이콘 이미지·크기·색상과 미니맵·월드맵 표시를 정합니다.
5. **Save & Apply**로 저장·적용하고 설치한 지도에서 확인합니다.

특정 파일은 JSON 예외 규칙으로, 한 NPC만 바꿀 때는 NPC Basic의 지도 아이콘 분류로 설정합니다. 왼쪽 카테고리, 가운데 작업 목록·미리보기, 오른쪽 인스펙터로 편집합니다.

JourneyMap에서도 같은 이미지·색상·크기·표시 정책을 사용합니다. 숨김 대상과 관리 NPC의 일반 레이더 얼굴 중복 표시도 처리합니다. 일시정지한 싱글플레이에서 저장한 아이콘도 월드 틱을 기다리지 않고 동기화합니다.

[규칙 우선순위](#dochi-mapicon-integration/mapicon-editor-rules), [파일과 표시 범위](#dochi-mapicon-integration/mapicon-files-operations)를 확인하세요.

DNPC에서는 **NPC 편집기 → 애드온 → 지도 아이콘**에서 개별 설정을 편집할 수도 있습니다. 기존 대상의 CNPC Basic 분류와 구분하세요. 프로필 Load는 편집용 불러오기이며 **Save & Apply**가 활성 정책을 바꿉니다.
