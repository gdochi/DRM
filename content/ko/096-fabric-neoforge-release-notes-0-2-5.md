---
title: Fabric·NeoForge 0.2.5 업데이트
slug: release-notes-0-2-5
order: 6
description: 에디터 즐겨찾기, NPC 외부 텍스처와 새 애드온 연결 안내입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 사용 안내
version: 0.2.5
audience: 제작자 / 운영자
---

## 현재 설치 기준

Minecraft 1.21.1 / Java 21의 Fabric·NeoForge DRM Core는 **0.2.5**입니다. 기존 두 로더 공용 문서를 사용하되 JAR과 의존성은 같은 로더로 맞춥니다. [설치 준비](#core-fabric/installation)를 확인하세요.

## 즐겨찾기와 텍스처

- 에디터 목록의 ☆/★로 도구를 등록·해제하고 즐겨찾기 분류에서 엽니다. `config/dochi_rpg_maker/editor_favorites.json`은 인스턴스 로컬 설정입니다.
- 서버 에셋 PNG와 리소스팩 텍스처를 구분하고 로드 중 기본 텍스처를 사용합니다. Gecko 모델 미리보기와 월드 NPC 외부 텍스처 연결을 개선했습니다.
- Fabric NPC Basic의 외부 텍스처 선택·미리보기 흐름을 Forge 기준과 맞췄습니다. 파일은 `assets/textures/`에 두고 DRM 리소스 ID로 연결합니다.

## 함께 사용할 애드온

| 애드온 | 현재 문서 |
| --- | --- |
| Cobblemon Editor 0.2.4 | [배틀 스케줄러](#drm-cobblemon-editor/cobblemon-battle-scheduler), 블록 무대·FX, 트레이너·서비스 NPC |
| Minigames 0.1.0 | [몬티홀·슬롯·기억력](#dochi-minigames/minigames-setup), 참가비·보상, NPC·대화 연결 |
| MapIcon Integration 0.1.0 | [Xaero 지도 아이콘](#dochi-mapicon-integration/mapicon-setup), JSON 규칙·NPC별 설정 |

각 기능은 별도 애드온을 설치해야 합니다. 현재 Core의 CustomNPCs 필수 조건도 함께 충족하세요. 이전 [0.2.4 기록](#core-fabric/release-notes-0-2-4)은 재입고 시간 기준·GUI 타일 변경의 당시 안내로 유지합니다.
