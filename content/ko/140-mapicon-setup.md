---
title: 지도 아이콘 설치와 시작
slug: mapicon-setup
order: 1400
description: DRM NPC의 적용 JSON과 Xaero 미니맵·월드맵 아이콘을 연결합니다.
product: dochi-mapicon-integration
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.0
audience: 제작자 / 서버 운영자
---

## 어떤 기능인가요?

**Dochi's MapIcon Integration 0.1.0**은 DRM NPC를 Xaero's Minimap과 World Map의 아이콘으로 표시하는 DRM 애드온입니다. 대화·상점·텔레포터처럼 NPC에 적용된 JSON 타입별 기본 아이콘, 특정 JSON 예외, 개별 NPC 아이콘을 설정합니다.

## 설치 조건

| 빌드 | Minecraft / Java | 최소 DRM | 현재 DRM |
| --- | --- | --- | --- |
| Forge | 1.20.1 / 17 | 0.2.1 | 0.2.2 |
| Fabric | 1.21.1 / 21 | 0.2.4 | 0.2.5 |
| NeoForge | 1.21.1 / 21 | 0.2.4 | 0.2.5 |

서버와 클라이언트에 같은 로더의 MapIcon Integration·DRM·DRM의 필수 의존성인 CustomNPCs를 설치합니다. 설치 파일은 `dochi_mapicon_integration-0.1.0-<loader>-<minecraft>.jar` 형식입니다.

지도 모드는 클라이언트 선택 연동입니다. 현재 컴파일 기준은 **Xaero Minimap 26.6.0 / World Map 1.47.0**이며 지도 모드가 요구하는 XaeroLib도 준비합니다. 구형 Xaero의 호환성을 보장하지 않습니다. 지도 모드가 없으면 지도 표시를 사용할 수 없으며 JourneyMap은 현재 지원하지 않습니다.

## 첫 상점 아이콘 만들기

1. NPC에 DRM의 NPC Shop JSON을 Apply합니다.
2. DRM 에디터 목록 또는 Mods Config의 애드온 탭에서 **월드맵 아이콘 에디터**를 엽니다. 편집에는 OP 2 이상이 필요합니다.
3. 글로벌 표시를 켜고 왼쪽 JSON 타입 목록에서 NPC Shop을 선택합니다.
4. 타입 아이콘의 이미지·크기·색상·미니맵/월드맵 표시를 정합니다.
5. **Save & Apply**로 저장·적용하고 Xaero 지도를 열어 확인합니다.

특정 상점만 다르게 표시하려면 타입을 선택한 뒤 **JSON 예외 규칙 추가**로 실제 상점 JSON을 연결합니다. 한 NPC만 바꾸려면 NPC Basic의 **지도 아이콘** 분류를 사용합니다. [우선순위와 편집](#dochi-mapicon-integration/mapicon-editor-rules)을 확인하세요.
