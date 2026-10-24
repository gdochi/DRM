---
title: 탈것 스폰
slug: spawn-control-vehicles
order: 842
description: 탈것 스폰
product: dochi-spawn-control
category: 탈것 스폰
section: operations
status: Guide
version: 0.1.3
audience: Creators / server operators
---

## 지원 범위

Spawn Control **0.1.3**은 저장한 모드 탈것과 지원 차량 EntityType을 고정 스포너·자연 스폰 프로필에서 생성합니다. DRM과 차량 모드는 선택 연동입니다.

| 차량 모드 | 사용할 대상 |
| --- | --- |
| Immersive Vehicles / MTS | 설치한 콘텐츠 팩의 차종·색상 또는 저장한 완성 차량. Forge·NeoForge 연동 |
| Superb Warfare | 등록 차량 EntityType 또는 저장 템플릿. Forge·NeoForge 연동 |
| Immersive Aircraft | 기종 EntityType 또는 저장한 차량. Fabric 실제 연동 검증 기록 있음 |
| Automobility | 부품을 조립한 차량의 저장 템플릿. Fabric 실제 연동 검증 기록 있음 |

각 모드는 해당 Minecraft 버전·로더에 실제 배포된 빌드를 사용합니다. Create / Valkyrien Skies 블록 조립체는 엔티티형 차량 연동 범위에 포함하지 않습니다. 이 기능은 차량 생성이며 NPC 운전 AI나 자동 승무원을 추가하지 않습니다.

## 완성 차량 저장

1. 원래 차량 모드로 차종·부품·연료·도색을 준비하고 탑승자를 내립니다.
2. OP 권한으로 실제 차량 루트 엔티티 한 개를 선택해 저장합니다.

```text
/spawncontrolvehicle save adventure_car @e[type=mts:builder_existing,sort=nearest,limit=1,distance=..16]
/spawncontrolvehicle list
/spawncontrolvehicle reload
```

다른 차량 모드에서는 `type=`을 실제 차량 EntityType으로 바꾸거나 마지막 인수에 차량 UUID를 사용합니다. 원본 차량을 이동하거나 소비하지 않습니다. 파일은 `config/dochi_rpg_maker/spawn_control/vehicles/adventure_car.json`, 선택 ID는 `spawncontrol_vehicle:adventure_car`입니다.

## 스포너에 연결

기존 스포너의 엔티티 목록에서 저장 ID를 선택합니다. 자연 스폰 편집기의 엔티티 목록에서도 같은 ID를 사용하고 바이옴·차원·시간·플레이어 거리와 생성 제한을 정합니다. 프로필을 저장하고 배치 스포너에 다시 적용해 목록을 갱신합니다.

Immersive Vehicles 목록은 설치된 팩의 차종·색상을 직접 열거합니다. 팩 차량의 기본 부품만 생성하므로 원하는 엔진·바퀴·연료까지 완성하려면 저장 템플릿을 사용하세요. MTS의 빈 `builder_existing`과 Automobility의 미조립 차량은 직접 선택 대신 완성 차량을 저장합니다.

## 생성 공간과 상태

차량 전체가 들어갈 로드된 청크·월드 경계·충돌 공간이 필요합니다. 엔티티형 앵커의 반경 0은 앵커 중심에 생성하지만, 블록형 앵커는 자기 충돌로 생성이 막힐 수 있습니다. 지상·수상·공중 배치를 차량에 맞춥니다.

`maxOwned: 1`, `maxTotal: 0`은 살아 있는 소유 차량을 한 대로 제한하며 반복 생성을 허용합니다. 운전해서 멀리 옮겨도 살아 있는 차량을 없는 것으로 간주하지 않습니다.

차량 모드가 NBT에 저장한 부품·인벤토리·연료와 방향을 복원하고 새 UUID를 부여합니다. 탑승자는 복제하지 않으며 연료·탄약을 자동 충전하지 않습니다. 템플릿을 배포할 때 차량 모드·콘텐츠 팩과 `vehicles/` 파일도 함께 준비하세요.

## DNPC 생성

DNPC의 기본 EntityType 생성은 DRM 공통 NPC API v1과 DNPC 제공자가 필요합니다. 생성 시 DNPC 자체 부활을 끄고 생성 위치를 집으로 정합니다. API가 없으면 해당 생성을 실패시키며, 저장된 DNPC 템플릿·장비·DRM 연결을 복제하는 기능은 제공하지 않습니다.
