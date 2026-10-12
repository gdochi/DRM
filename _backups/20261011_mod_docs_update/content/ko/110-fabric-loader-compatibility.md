---
title: 로더별 설치와 데이터 이동
slug: loader-compatibility
order: 45
description: Forge와 Fabric·NeoForge 공용 문서의 범위, 설치 기준과 데이터 이동 방법입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.2.4
audience: 제작자 / 운영자
---

## 문서 범위

**Fabric·NeoForge 1.21.1은 이 문서 묶음을 함께 사용합니다.** 대화, NPC Shop, GUI Maker, 화폐, HUD, 퀘스트, Scene Maker와 Core NPC Spawner의 제작 순서는 같습니다. 로더를 고르면 설치 파일과 플랫폼 의존성만 해당 빌드에 맞춥니다.

Forge 1.20.1은 별도 문서 묶음입니다. 사이트 주소의 `core-fabric`은 기존 링크를 유지하기 위한 식별자이며 NeoForge 사용자도 이 항목을 이용합니다.

## 설치 기준

| 로더 | Minecraft | DRM | Java | 필수 NPC 모드 |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.2.1 | 17 | CustomNPCs 1.20.1 호환 빌드 |
| Fabric | 1.21.1 | 0.2.4 | 21 | CustomNPCs Fabric 1.0.0 |
| NeoForge 21.1+ | 1.21.1 | 0.2.4 | 21 | CustomNPCs NeoForge 1.21.1 호환 빌드 |

Fabric에는 Loader 0.18.0 이상과 Fabric API 0.116.11+1.21.1 이상도 필요합니다. 자세한 설치 파일과 선택 의존성은 [설치 준비](#core-fabric/installation)에 있습니다.

## 제작 데이터 이동

제작 데이터 루트는 `config/dochi_rpg_maker`입니다. 서버 JSON이 원본이며 NPC 바인딩과 플레이어 진행도 같은 실행 상태는 월드에도 저장됩니다.

1. 현재 config와 월드를 함께 백업합니다.
2. 대상 로더의 DRM과 의존성으로 별도 인스턴스를 준비합니다.
3. config 복사본에서 사용자 문서를 불러옵니다.
4. 참조하는 아이템·엔티티·모델·애니메이션이 대상 로더에도 설치되어 있는지 확인합니다.
5. 대화, 구매·판매·재입고, 퀘스트 보상과 재접속 후 상태를 확인합니다.

제작 기능을 함께 안내하더라도 Minecraft/모드 ID와 CustomNPCs 월드 데이터가 자동 변환되지는 않습니다. Core의 `dochi_rpg_maker:npc_spawner`와 별도 Spawn Control 애드온의 스포너 문서는 각각의 경로에서 사용합니다.

## 퀘스트 직접 제어

Fabric·NeoForge에서 권한 레벨 2로 사용합니다.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start`는 선행 조건 등을 건너뛰는 관리자 시작입니다. `complete`는 미지급 보상을 지급하는 강제 완료입니다. 전체 `reset`은 진행·보상 기록을 지우며, 이미 받은 아이템·화폐는 회수하지 않습니다. 목표 하나의 초기화는 다른 목표와 보상 지급 기록을 유지합니다.

현재 두 로더의 에디터에서 만드는 퀘스트는 자동 완료를 사용합니다. 구형 JSON의 `completionMode: turn_in`을 이관할 때는 Fabric이 제출 대기를 유지하고 NeoForge는 자동 완료하므로, 목표 달성 후 보상 시점을 확인하세요. 이 항목은 기존 데이터 이관 참고 사항입니다.
