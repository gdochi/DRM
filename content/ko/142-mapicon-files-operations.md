---
title: 지도 파일과 문제 해결
slug: mapicon-files-operations
order: 1420
description: 프로필·PNG 저장 위치와 실시간 NPC 표시 범위를 안내합니다.
product: dochi-mapicon-integration
category: 파일과 운영
section: operations
status: 사용 안내
version: 0.1.0
audience: 제작자 / 운영자
---

## 프로필과 이미지

| 내용 | 경로 / 예시 |
| --- | --- |
| 서버 프로필 | `config/dochi_mapicon_integration/*.json` |
| 활성 프로필 이름 | `config/dochi_mapicon_integration/active.txt` |
| DRM 서버 PNG | `config/dochi_rpg_maker/assets/textures/icons/` |
| 내장 PNG 설치 폴더 | `config/dochi_rpg_maker/assets/textures/icons/nikoichu/` |

외부 PNG를 서버 텍스처 폴더에 넣고 **아이콘 선택 → 외부 이미지**에서 찾습니다. `assets/textures/icons/vendor.png`의 표시 ID는 `dochi_rpg_maker:textures/icons/vendor.png`입니다. 클라이언트에는 DRM의 텍스처 전송·캐시를 사용합니다.

리소스팩의 `assets/myserver/textures/icons/vendor.png`는 `myserver:textures/icons/vendor.png`로 직접 지정합니다. 정적 PNG 32×32 또는 64×64를 권장하며 최대 크기는 1024×1024입니다. 아직 다운로드 중이거나 이미지가 없으면 기본 NPC 아이콘을 사용합니다. 애드온 서버 초기화는 없는 내장 PNG만 설치하고 기존 파일은 덮어쓰지 않습니다.

## 실시간 표시 범위

같은 차원에서 서버가 로드하고 있는 NPC를 플레이어 반경 4096블록 안에서 가까운 순으로 최대 512개 표시합니다. 서버 갱신은 1초 간격이며 클라이언트가 엔티티를 추적 중이면 실제 위치를 사용합니다.

NPC 언로드·사망, 차원 이동·접속 종료 시 이전 표시를 정리합니다. 0.1.0은 언로드된 NPC의 고정 POI나 마지막 위치를 저장하지 않습니다. 관리 대상 NPC의 기본 Xaero 레이더 표시를 숨겨 중복을 줄이며 Xaero Fair Play 모드에서는 애드온 미니맵 레이어를 그리지 않습니다.

## 문제 해결

| 증상 | 확인할 것 |
| --- | --- |
| 지도에 아이콘이 없음 | 지원 Xaero·XaeroLib 설치, 글로벌 표시, 해당 지도 스위치, NPC 로드·차원·거리 |
| 특정 플레이어만 안 보임 | DRM NPC 표시 조건, NPC 숨김, 일치 규칙 OFF |
| 예상과 다른 아이콘 | NPC 전용 설정, JSON 경로, 규칙 우선순위, 타입 기본값 순서 |
| 지도 아이콘이 두 개 보임 | 애드온 관리 대상인지, 사용 중인 Xaero 빌드의 호환성 |
| 프로필 저장 충돌 | 서버 프로필을 다시 불러온 뒤 변경사항을 재적용 |
| NPC를 멀리 떠나면 사라짐 | 서버가 언로드한 NPC는 표시하지 않는 현재 동작 |

파일·편집·저장은 OP 2 이상이 필요하지만 지도 읽기는 일반 플레이어도 가능합니다. 운영 백업에는 지도 프로필, DRM 에셋, 월드의 NPC 데이터를 함께 포함하세요.
