---
title: Dochi's Real Armor 설치와 설정
slug: dochi-real-armor-setup
order: 910
description: 현재 설치 조건과 기본 사용 순서입니다.
product: dochi-real-armor
category: 설치와 설정
section: setup
status: Stable
version: 0.1.3
audience: 플레이어와 서버 운영자
tags:
  - installation
  - configuration
  - forge
---

## 설치

Real Armor **0.1.3**은 Forge 1.20.1 / Java 17과 Fabric·NeoForge 1.21.1 / Java 21을 제공합니다. 파일은 `dochi_real_armor-0.1.3-<loader>-<minecraft>.jar`이며 서버와 클라이언트에 같은 빌드를 사용합니다. Fabric에는 Fabric API도 필요합니다.

CustomNPCs·Easy NPC·Dochi NPC Core와 DRM은 선택 연동입니다. 지원 NPC의 방어 계산을 사용하려면 해당 NPC 모드를 설치하세요. DNPC의 전체·부위별 방어, 내구도, 보호 인챈트와 넉백 설정을 지원합니다.

## 설정 화면과 파일

| 로더 | 설정 파일 | 여는 방법 |
| --- | --- | --- |
| Forge | `config/dochi_real_armor-common.toml` | 모드 목록 Config |
| NeoForge | `config/dochi_real_armor-common.toml` | 모드 목록 Config |
| Fabric | `config/dochi_real_armor.json` | Mod Menu의 Config |

DRM이 있으면 공용 Mods Config의 Real Armor 탭을 사용할 수 있습니다. DRM이 없으면 독립 설정 화면을 유지합니다. Fabric 최초 실행은 기존 Real Armor TOML이 있으면 설정을 가져옵니다. 원본과 월드를 함께 백업하세요.

## 첫 확인

1. 사용할 NPC 연동을 켭니다.
2. 먼저 전체 방어 계산으로 NPC에 실제 갑옷을 장착합니다.
3. 같은 공격으로 갑옷 유무에 따른 피해를 비교합니다.
4. 필요하면 부위별 계산과 내구도 소모를 켜고 머리·가슴·다리 판정을 확인합니다.
5. `/dochi_real_armor status`와 서버 로그로 활성 상태를 확인합니다.

게임 접속 중 설정 변경은 서버가 권한 레벨 2 이상을 확인합니다. `/dochi_real_armor`의 `status`, `split`, `durability`, `debug` 하위 명령과 자동 완성을 사용할 수 있습니다.

DNPC 부위 판정은 서버 엔티티의 실제 AABB를 사용합니다. 외형 모델의 모든 뼈와 정밀하게 일치하는 판정은 아닙니다. CustomNPCs 전용 저항 순서와 companion 옵션은 DNPC에 적용하지 않습니다.
