---
title: 방어구 설정 시작하기
slug: dochi-real-armor-setup
order: 910
description: 설정 화면을 열고 NPC 종류·부위별 방어·내구도를 정합니다.
product: dochi-real-armor
category: 설치와 설정
section: setup
status: Stable
version: 0.1.4
audience: 플레이어와 서버 운영자
tags:
  - installation
  - configuration
  - forge
---

## 설치

Real Armor 0.1.4의 Minecraft·로더에 맞는 파일을 서버와 클라이언트에 넣습니다.

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Fabric에는 Fabric API도 설치합니다. NPC는 DNPC·Easy NPC 또는 기존 버전의 CustomNPCs를 사용합니다. DRM은 없어도 됩니다.

## 설정 화면 열기

- **Forge / NeoForge:** 모드 목록에서 Real Armor의 **Config**를 엽니다.
- **Fabric:** Mod Menu에서 Real Armor의 **Config**를 엽니다.
- **DRM 사용 중:** 공용 **Mods Config → Real Armor**에서도 설정합니다.

멀티플레이의 설정 변경은 OP 2 이상이 필요합니다.

아래는 **Real Armor 0.1.4 / NeoForge 1.21.1**의 독립 설정 화면입니다. **General Armor**에서 방어 계산과 부위별 방어를 정하고, **NPC Compatibility**에서 사용하는 NPC 종류의 연동을 확인합니다.

![Real Armor의 General Armor 설정. 방어 계산·부위별 방어·내구도·강인함·보호 인챈트·넉백 저항 스위치가 있습니다.](assets/media/guides/armor-014-neo1211/armor-config.png "Enable armor calculation이 전체 방어 계산입니다. Body-part armor는 맞은 부위의 장비만 사용할지, Damage armor items는 내구도를 닳게 할지 정합니다.")

![NPC Compatibility의 Dochi NPC Core, Easy NPC, CustomNPCs 연동과 디버그 설정.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "DNPC를 쓰면 Dochi NPC Core를 확인합니다. 이 화면은 1.21.1이며 26.3에서는 CustomNPCs를 사용할 수 없습니다.")

DRM의 공용 설정에서는 같은 옵션을 한 화면의 두 열로 보여 줍니다.

![DRM 공용 설정에서 Dochi Real Armor를 고른 화면. 왼쪽 열은 방어 규칙, 오른쪽 열은 NPC 연동입니다.](assets/media/guides/armor-014-neo1211/shared-armor.png "Mods Config에서 Dochi Real Armor를 선택합니다. 오른쪽 NPC 연동만 켜고 왼쪽 전체 방어 계산을 꺼 두지 않았는지도 확인합니다.")

## 먼저 정할 것

1. 사용하는 NPC 종류의 연동을 켭니다.
2. 전체 방어로 시작해 NPC에게 갑옷을 입힙니다.
3. **부위별 방어**를 켜면 맞은 부위의 장비만 사용합니다.
4. **내구도 소모**를 켜면 공격받을 때 방어구가 닳습니다.
5. 설정을 적용합니다.

DNPC의 부위 판정은 기본 몸 크기를 기준으로 합니다. 특수한 외형 모델의 모양과 정확히 같지는 않을 수 있습니다.

## 켜져 있는지 확인하기

`/dochi_real_armor status`로 현재 상태를 봅니다. 명령어의 `split`, `durability`, `debug`도 자동 완성에서 고를 수 있습니다.

직접 설정 파일을 관리한다면 Forge·NeoForge는 `config/dochi_real_armor-common.toml`, Fabric은 `config/dochi_real_armor.json`입니다.
