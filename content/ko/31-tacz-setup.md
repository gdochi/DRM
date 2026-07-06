---
title: 설치와 첫 NPC 설정
slug: tacz-setup
order: 320
description: 설치 확인, TACZ NPC Core 사용 흐름, 첫 안전 테스트 설정입니다.
product: cnpc-tacz-fire
category: 설치
section: setup
status: Draft
version: 0.1.9
audience: 서버 운영자
tags:
  - setup
  - tacz
  - gui
---

## 설치 체크리스트

CNPC TaCZ Fire는 Forge 1.20.1을 대상으로 합니다. 모드 메타데이터 기준 필수 범위는 Forge `[47,)`, Minecraft `[1.20.1,1.21)`, TaCZ `[1.1.8,)`입니다. CustomNPCs는 메타데이터에서는 선택 의존성으로 되어 있지만, 이 위키의 흐름은 CustomNPCs NPC 제작을 전제로 하므로 총기 NPC를 만들 때는 CustomNPCs를 함께 설치해야 합니다.

| 구성 요소 | 이 위키 흐름에서 필요 여부 | 메모 |
| --- | --- | --- |
| Forge | 필요 | 1.20.1 Forge 47+ 환경을 사용합니다. |
| TaCZ | 필요 | NPC 총기는 실제 TaCZ 총기 아이템입니다. |
| CustomNPCs | NPC 설정에 필요 | `TACZ NPC Core`는 CustomNPCs NPC 엔티티만 편집합니다. |
| CNPC TaCZ Fire | 필요 | 일반적인 모드 서버 플레이에서는 클라이언트와 서버 양쪽에 넣습니다. |
| playerAnimator | 선택 | 존재할 때 클라이언트 애니메이션 지원에 사용합니다. |
| Better Combat | 선택 | 가능할 때 근접 애니메이션 지원에 사용합니다. |

## NPC별 GUI 열기

1. 크리에이티브 모드로 들어갑니다.
2. `TACZ NPC Core` 아이템을 준비합니다.
3. `TACZ NPC Core`를 들고 CustomNPCs NPC를 우클릭합니다.
4. 해당 NPC의 `cnpc_tacz_fire` 설정 화면이 열립니다.
5. 설정을 바꾼 뒤 `Save`를 누릅니다.

`TACZ NPC Core`는 제작자용 편집 도구입니다. CustomNPCs가 아닌 대상은 거부하며, 편집에는 크리에이티브 모드가 필요합니다.

## 첫 안전 테스트

복잡한 전투를 만들기 전에 아래 흐름으로 먼저 확인하세요.

1. `TACZ Fire NPC Mode`를 켭니다.
2. `Enabled`를 ON으로 둡니다.
3. `Gun`에서 플레이어 인벤토리의 TaCZ 총기 하나를 선택합니다.
4. `Basic`에서 `Stance: Auto` 또는 `Stance: Ranged`를 사용합니다.
5. `Fire`에서 `RPM Override`를 `0`으로 두어 총기의 기본 TaCZ RPM을 사용합니다.
6. `Ammo`에서 `Reload`와 `Supply Ammo`를 ON으로 두고 `Ammo Stock`은 `-1`로 둡니다.
7. `Targets`는 기본 동작 또는 단순한 엔티티 ID 하나로 시작합니다.
8. 저장한 뒤 시야가 열린 공간에서 타겟 하나를 상대로 테스트합니다.

이 기본 테스트가 통과한 뒤에 유한 탄약, 랜덤 풀, 고급 타겟 필터, 이동 튜닝, FX, 수류탄을 하나씩 추가하세요.

## GUI 카테고리 지도

| 카테고리 | 용도 |
| --- | --- |
| `Basic` | 메인 모드 토글, 스탠스, 고급 스탠스 모드, 미리보기 동작 |
| `Fire` | 사격 거리, 근접 전환 거리, RPM, 랜덤 RPM, 명중률, 사격 모드 |
| `AI` | 전술 이동, 교전 모드, 대기 이동, 인식, 속도, 간격 |
| `Targets` | 엔티티 ID, 필터, 요구/거부 태그, 프로필 가져오기/내보내기 |
| `Ammo` | 재장전, 탄약 재고, 재고 최대치, 탄약 재생, 재장전 중 이동 |
| `Gun` | 플레이어 TaCZ 총기 선택과 원거리 무기 풀 구성 |
| `Melee` | 비 TaCZ 근접 아이템 선택과 근접 무기 풀 구성 |
| `Visual` | CustomNPCs 텍스처 경로 기반 스킨 풀 |
| `Armor` | 실제 머리, 몸통, 다리, 발 슬롯을 쓰는 방어구 세트 풀 |
| `FX` | 감지/사격 사운드와 CustomNPCs say 문구 |
| `Grenade` | 지원되는 투척물 데이터가 있을 때 선택형 수류탄 투척 |

## 설정 파일

전역 브리지 기본값은 아래 파일에 생성됩니다.

```text
config/cnpc_tacz_fire-common.toml
```

그래도 일반 제작 경로는 GUI입니다. config는 기본값과 스크립트 브리지 동작을 잡는 용도로 사용하고, 특정 NPC는 GUI 또는 스크립트로 개별 오버라이드하세요.

## 타겟 프로필 파일

타겟 가져오기/내보내기 기능은 아래 위치의 JSON 프로필을 사용합니다.

```text
config/cnpc_tacz_fire/target_entities/
```

여러 NPC가 같은 엔티티 ID 타겟 목록을 공유해야 할 때 프로필을 쓰세요. 일회성 NPC라면 `Targets` 탭에서 직접 설정하는 편이 더 빠릅니다.
