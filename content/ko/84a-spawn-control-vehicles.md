---
title: 탈것 스폰
slug: spawn-control-vehicles
order: 842
description: 탈것 스폰
product: dochi-spawn-control
category: 탈것 스폰
section: operations
status: Guide
version: 0.1.5
audience: Creators / server operators
---

## 지원 범위

Spawn Control **0.1.5**은 저장한 모드 탈것과 지원 차량 EntityType을 고정 스포너·자연 스폰 프로필에서 생성합니다. DRM과 차량 모드는 선택 연동입니다.

| 차량 모드 | 사용할 대상 |
| --- | --- |
| Immersive Vehicles / MTS | 설치한 콘텐츠 팩의 차종·색상 또는 저장한 완성 차량. Forge·NeoForge 연동 |
| Superb Warfare | 등록 차량 EntityType 또는 저장 템플릿. Forge·NeoForge 연동 |
| Immersive Aircraft | 기종 EntityType 또는 저장한 차량. Fabric 실제 연동 검증 기록 있음 |
| Automobility | 부품을 조립한 차량의 저장 템플릿. Fabric 실제 연동 검증 기록 있음 |

각 모드는 해당 Minecraft 버전·로더에 실제 배포된 빌드를 사용합니다. Create / Valkyrien Skies 블록 조립체는 엔티티형 차량 연동 범위에 포함하지 않습니다. 이 기능은 차량 생성이며 NPC 운전 AI나 자동 승무원을 추가하지 않습니다.

## 실습: 저장한 M1A2 한 대 생성하기

아래는 **Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1**에서 실제 저장·적용·생성한 순서입니다. 다른 차량 모드의 부품·연료 동작까지 이 결과로 확인한 것은 아닙니다.

### 1. 차량 원본 저장

차량 모드로 M1A2를 준비하고 탑승자를 모두 내린 뒤, 가까이에서 다음 명령을 실행합니다.

```text
/spawncontrolvehicle save guide_tank @e[type=superbwarfare:m_1a_2,sort=nearest,limit=1,distance=..32]
```

성공 메시지에 **spawncontrol_vehicle:guide_tank**가 나옵니다. 원본 전차는 그대로 남으며 `config/dochi_rpg_maker/spawn_control/vehicles/guide_tank.json`이 생성됩니다. 저장된 이름을 확인하려면 `/spawncontrolvehicle list`, 외부에서 바꾼 템플릿을 다시 읽으려면 `/spawncontrolvehicle reload`를 사용합니다.

다른 모드는 `type=`에 실제 차량 종류를 넣습니다. MTS의 빈 `mts:builder_existing`이나 Automobility의 미조립 기본 차량을 배치 대상으로 고르는 대신, 완성된 차량 한 대를 저장하세요.

### 2. Entity 목록에서 저장 ID 선택

**Spawner Editor → Spawn Target**에서 **Source**를 **Entity**로 둡니다. 돋보기(**Choose**)를 누르고 `guide_tank`를 검색해 **spawncontrol_vehicle:guide_tank → Select**를 누릅니다. 차량 템플릿은 이 목록에 있으며 **NPC clone template**을 선택하지 않습니다.

![차량 템플릿 spawncontrol_vehicle:guide_tank가 Entity 선택 목록에 표시된 모습.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-picker.png "Spawn Control 0.1.4 / NeoForge 1.21.1. 명령으로 저장한 차량 ID를 고릅니다. 기본 차량 EntityType과 저장한 차량 템플릿은 다른 대상입니다.")

### 3. 공간·수량 설정 후 저장

이 실습은 **Spawn Settings**에서 보유 제한을 `1`, 반경을 `12`, **Placement**를 **Air**로 설정했습니다. 수직 범위는 기본 `2`, 한 번에 생성할 수는 `1`, 누적 제한은 `0`으로 두었습니다. **Save As → guide_tank_spawner.json → Confirm**으로 저장합니다.

![저장한 차량 ID가 연결된 guide_tank_spawner.json.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-spawner-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Source는 Entity입니다. 이 화면은 대상 선택을 보여 주며 배치·수량은 별도의 Spawn Settings에서 정합니다.")

**Ground에서 막힌 이유:** 이 M1A2 원본은 저장된 충돌 범위가 기준점 아래로 조금 내려가 있어, 평지의 Ground 후보에서 지면과 겹쳤습니다. 같은 원본을 Air로 바꾸어 지면 위의 빈 후보를 허용하자 생성됐습니다. Air는 비행 AI를 주는 설정이 아닙니다. 생성 뒤 움직임은 차량 모드의 물리를 따릅니다.

### 4. 설치형 스포너에 적용

**Get Spawner**로 받은 스포너를 넓은 평지에 설치합니다. **DRM Core**로 우클릭해 **guide_tank_spawner.json → Apply JSON**을 누릅니다. 기본 조건에서는 크리에이티브 플레이어가 작동 인원에 포함되지 않으므로 서바이벌로 전환해 가까이서 시험합니다. [설치·적용 화면](#dochi-spawn-control/spawn-control-npc-templates)과 같은 절차입니다.

![스포너에서 생성된 새 M1A2와 뒤쪽 원본 전차.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-runtime.png "Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1. 새 전차 한 대 생성·원본과 다른 UUID·탑승자 0명을 서버에서 확인했습니다. 자동 승무원이나 주행 결과를 보여 주는 화면은 아닙니다.")

자연 스폰 규칙에서도 저장 ID를 사용할 수 있습니다. 자연 스폰 편집기의 대상 목록에서 고르고 시간·바이옴·거리·생성 제한을 정합니다. 자연 규칙 저장과 설치형 스포너의 Apply JSON은 서로 다른 적용 절차입니다.

## 생성 공간과 상태

차량 전체가 들어갈 로드된 청크·월드 경계·충돌 공간이 필요합니다. 엔티티형 앵커의 반경 0은 앵커 중심에 생성하지만, 블록형 앵커는 자기 충돌로 생성이 막힐 수 있습니다. 지상·수상·공중 배치를 차량에 맞춥니다.

`maxOwned: 1`, `maxTotal: 0`은 살아 있는 소유 차량을 한 대로 제한하며 반복 생성을 허용합니다. 운전해서 멀리 옮겨도 살아 있는 차량을 없는 것으로 간주하지 않습니다.

차량 모드가 NBT에 저장한 부품·인벤토리·연료와 방향을 복원하고 새 UUID를 부여합니다. 탑승자는 복제하지 않으며 연료·탄약을 자동 충전하지 않습니다. 템플릿을 배포할 때 차량 모드·콘텐츠 팩과 `vehicles/` 파일도 함께 준비하세요.

## NPC도 저장한 모습으로 등장시키려면

DNPC와 DRM을 설치하고 [NPC 복제 템플릿](#dochi-spawn-control/spawn-control-npc-templates)을 선택합니다. 기본 NPC 종류를 고르면 저장한 외형·장비는 따라오지 않습니다.
