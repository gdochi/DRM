---
title: Forge·Fabric·NeoForge 설치와 차이
slug: loader-compatibility
order: 45
description: 로더별 현재 설치 조건과 기능 차이입니다.
product: core-fabric
category: Forge·Fabric·NeoForge 설치와 차이
section: getting-started
status: Draft
version: 0.2.3
audience: Creators / Operators
---

## 로더별 설치 기준

| 로더 | Minecraft | DRM | Java | 필수 NPC 모드 |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.2.0 | 17 | CustomNPCs 1.20.1 호환 빌드 |
| Fabric | 1.21.1 | 0.2.3 | 21 | CustomNPCs Fabric 1.0.0 |
| NeoForge 21.1+ | 1.21.1 | 0.2.3 | 21 | CustomNPCs NeoForge 1.21.1 호환 빌드 |

Fabric은 Loader 0.18.0 이상과 Fabric API 0.116.11+1.21.1 이상도 필요합니다. CustomNPCs는 세 DRM 빌드 모두 필수입니다. 같은 로더와 Minecraft 버전의 DRM 및 애드온을 서버와 클라이언트에 함께 설치하세요.

이 사이트의 `core` 문서는 Forge, `core-fabric` 문서는 Fabric 기준입니다. NeoForge 설치와 주요 차이는 이 페이지를 기준으로 확인하며, Fabric의 모든 동작이 NeoForge와 같다고 가정하지 않습니다.

## 기능 차이

| 기능 | Forge 0.2.0 | Fabric 0.2.3 | NeoForge 0.2.3 |
| --- | --- | --- | --- |
| 대화·상점·GUI·화폐·HUD·퀘스트 | 제공 | 제공 | 제공 |
| Scene Maker | 현재 Core에 없음 | 제공 | 제공 |
| Core NPC Spawner와 클론/리스 관리 | 현재 Core에 없음 | 제공 | 제공 |
| Spawn Control의 별도 스포너 | 해당 로더 애드온 설치 | 해당 로더 애드온 설치 | 해당 로더 애드온 설치 |
| 퀘스트 완료 방식 | 제출 또는 자동 | 제출 또는 자동 | 현재 구현은 자동 완료 |
| 아래 퀘스트 직접 제어 명령 | 제공하지 않음 | 제공 | 제공 |
| Cobblemon 트레이너 승리 목표 | 해당 애드온 빌드 없음 | Cobblemon Editor로 추가 | Cobblemon Editor로 추가 |

Core의 `dochi_rpg_maker:npc_spawner`와 Spawn Control의 `Spawner Editor`는 서로 다른 기능입니다. Core의 클론·리스 설정과 Spawn Control의 확률 목록 JSON은 서로 바꿔 넣지 마세요.

## NeoForge 설치

`dochi_rpg_maker-0.2.3-neoforge-1.21.1.jar`와 NeoForge용 CustomNPCs를 설치합니다. Gecko 모델에는 GeckoLib 4.9 이상이 선택적으로 필요합니다. Player Animator 등도 NeoForge용 호환 빌드를 사용해야 하며 Forge 1.20.1용 파일을 옮겨 넣지 않습니다.

## 데이터 이동

세 로더의 제작 데이터 루트는 `config/dochi_rpg_maker`입니다. 서버의 문서가 기준이며 월드에는 NPC 바인딩과 플레이어 진행도 같은 실행 상태가 저장됩니다.

1. 기존 config와 월드를 함께 백업합니다.
2. 별도 인스턴스에 대상 로더의 모드와 의존성을 설치합니다.
3. config 복사본에서 각 문서를 불러옵니다.
4. 참조하는 아이템·엔티티·모델·애니메이션·스킬이 그 로더에도 있는지 확인합니다.
5. NPC 대화, 상점, 퀘스트 완료·보상과 재접속 후 상태를 시험합니다.

같은 JSON 경로를 사용해도 Minecraft/모드 ID와 NPC 저장 데이터가 자동 변환되는 것은 아닙니다. 과거 릴리스 노트의 버전 번호는 당시 기록으로 유지합니다.

## 퀘스트 직접 제어

Fabric·NeoForge에서 권한 레벨 2로 사용합니다.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start`는 선행 조건 등을 건너뛰는 관리자 시작입니다. `complete`는 미지급 보상을 지급하는 강제 완료입니다. 전체 `reset`은 진행·보상 기록을 지우지만 이미 받은 아이템이나 화폐를 회수하지 않습니다. 목표 하나의 초기화는 다른 목표와 보상 지급 기록을 유지합니다.
