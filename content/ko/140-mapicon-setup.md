---
title: 지도 아이콘 설치와 시작
slug: mapicon-setup
order: 1400
description: 현재 설치 조건과 기본 사용 순서입니다.
product: dochi-mapicon-integration
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.1
audience: 제작자 / 서버 운영자
---

## 어떤 기능인가요?

**MapIcon Integration 0.1.1**은 DRM NPC의 지도 아이콘을 타입·JSON 파일·개별 NPC별로 설정합니다. Xaero’s Minimap·World Map과 **JourneyMap 6 / API 2**를 지원합니다.

## 설치

| 빌드 | Minecraft / Java | 최소 DRM | 현재 안내 기준 |
| --- | --- | --- | --- |
| Forge | 1.20.1 / 17 | 0.2.1 | 0.2.8 |
| Fabric | 1.21.1 / 21 | 0.2.7 | 0.2.8 |
| NeoForge | 1.21.1 / 21 | 0.2.7 | 0.2.8 |

서버와 클라이언트에 같은 로더의 `dochi_mapicon_integration-0.1.1-<loader>-<minecraft>.jar`와 DRM을 설치합니다. CustomNPCs·DNPC는 사용할 NPC에 맞춰 설치합니다. DRM 0.2.8 자체는 CustomNPCs를 필수로 요구하지 않습니다.

지도 모드는 클라이언트 선택 연동입니다. Xaero 기준은 Minimap 26.6.0 / World Map 1.47.0이며 필요한 XaeroLib도 설치합니다. JourneyMap은 6 계열과 API 2를 사용하며 6.0.9 조합의 검증 기록이 있습니다. 구형 지도 모드 버전의 호환성을 일괄 보장하지 않습니다.

## 첫 상점 아이콘

1. NPC에 DRM NPC Shop JSON을 적용합니다.
2. OP 2 이상으로 DRM 에디터 목록 또는 Mods Config에서 지도 아이콘 에디터를 엽니다.
3. 글로벌 표시를 켜고 JSON 타입에서 NPC Shop을 선택합니다.
4. 아이콘 이미지·크기·색상과 미니맵·월드맵 표시를 정합니다.
5. **Save & Apply**로 저장·적용하고 설치한 지도에서 확인합니다.

특정 파일은 JSON 예외 규칙으로, 한 NPC만 바꿀 때는 NPC Basic의 지도 아이콘 분류로 설정합니다. 왼쪽 카테고리, 가운데 작업 목록·미리보기, 오른쪽 인스펙터로 편집합니다.

JourneyMap에서도 같은 이미지·색상·크기·표시 정책을 사용합니다. 숨김 대상과 관리 NPC의 일반 레이더 얼굴 중복 표시도 처리합니다. 일시정지한 싱글플레이에서 저장한 아이콘도 월드 틱을 기다리지 않고 동기화합니다.

[규칙 우선순위](#dochi-mapicon-integration/mapicon-editor-rules), [파일과 표시 범위](#dochi-mapicon-integration/mapicon-files-operations)를 확인하세요.
