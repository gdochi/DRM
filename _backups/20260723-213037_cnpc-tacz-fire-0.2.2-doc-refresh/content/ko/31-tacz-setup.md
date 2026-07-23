---
title: 설치와 첫 NPC 설정
slug: tacz-setup
order: 320
description: 설치 확인, TACZ NPC Core 사용 흐름, 첫 안전 테스트 설정입니다.
product: cnpc-tacz-fire
category: 설치
section: setup
status: Draft
version: 0.2.1
audience: 서버 운영자
tags:
  - setup
  - TACZ
  - gui
---

## 설치 체크리스트

CNPC TACZ Fire는 Forge 1.20.1을 대상으로 합니다. 총기 NPC 제작에는 TACZ와 CustomNPCs가 필요합니다. playerAnimator, Better Combat, Mob Player Animator는 사용하는 애니메이션 연동에 따라 선택해서 설치합니다.

| 구성 요소 | 이 위키 흐름에서 필요 여부 | 메모 |
| --- | --- | --- |
| Forge | 필요 | 1.20.1 Forge 47+ 환경을 사용합니다. |
| TACZ | 필요 | NPC 총기는 실제 TACZ 총기 아이템입니다. |
| CustomNPCs | NPC 설정에 필요 | `TACZ NPC Core`는 CustomNPCs NPC 엔티티만 편집합니다. |
| CNPC TACZ Fire | 필요 | 일반적인 모드 서버 플레이에서는 클라이언트와 서버 양쪽에 넣습니다. |
| playerAnimator | 선택 | 존재할 때 클라이언트 애니메이션 지원에 사용합니다. |
| Better Combat | 선택 | 등록된 근접 무기 공격·포즈와 무기 기반 공격 타이밍을 사용할 때 설치합니다. 일반 멀티플레이에서는 서버와 클라이언트의 모드 구성을 맞추세요. |
| Mob Player Animator | 선택 | Better Combat의 정확한 NPC 모션 재생에 필요한 클라이언트 모드입니다. 없으면 바닐라 주손 스윙으로 전환됩니다. |

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
3. `Gun`에서 플레이어 인벤토리의 TACZ 총기 하나를 선택합니다.
4. `Senses`의 `General` 설정에서 `Stance: Auto` 또는 `Stance: Ranged`를 사용합니다.
5. `Fire`에서 `RPM Override`를 `0`으로 두어 총기의 기본 TACZ RPM을 사용합니다.
6. `Ammo`에서 `Reload`와 `Supply Ammo`를 ON으로 두고 `Ammo Stock`은 `-1`로 둡니다.
7. `Targets`는 기본 동작 또는 단순한 엔티티 ID 하나로 시작합니다.
8. 저장한 뒤 시야가 열린 공간에서 타겟 하나를 상대로 테스트합니다.

이 기본 테스트가 통과한 뒤에 유한 탄약, 랜덤 풀, 고급 타겟 필터, 이동 튜닝, FX, 수류탄을 하나씩 추가하세요.

## GUI 카테고리 지도

| 카테고리 | 용도 |
| --- | --- |
| `Overview` | 현재 적용되는 정책, 감지, 전투, 피해, 장비, 탄약, 타겟, FX를 수정 없이 확인하는 요약 화면 |
| `Fire` | 사격 거리, 근접 전환 거리, RPM, 랜덤 RPM, 명중률, 사격 모드 |
| `Senses` | `General`/`Advanced` 스탠스, 전술 이동, 대기 이동, 시각 인식, 근거리 감지, 플레이어 소리 감지 |
| `Targets` | 엔티티 ID, 필터, 요구/거부 태그, 프로필 가져오기/내보내기 |
| `Ammo` | 재장전 방식, 탄약 재고·재생, 재장전 중 이동, 탄약 소진 전환 |
| `Gun` | 플레이어 TACZ 총기 선택, 원거리 피해 정책, 인라인 확률을 쓰는 원거리 무기 풀, NPC 미리보기 |
| `Melee` | 비 TACZ 근접 아이템, 피해·넉백·공격 속도 정책, `Better Combat Compatibility`, 인라인 확률을 쓰는 근접 무기 풀, NPC 미리보기 |
| `Armor` | 실제 머리, 몸통, 다리, 발 슬롯을 쓰는 스크롤 가능한 방어구 세트 풀과 NPC 미리보기 |
| `Grenade` | 지원되는 투척물 데이터가 있을 때 선택형 수류탄 투척 |
| `Visual & FX` | Steve/Alex 스킨 풀, 경계 아이콘, 감지/사격 사운드와 CustomNPCs say 문구 |

`Overview`는 읽기 전용입니다. 값을 바꾸려면 해당 카테고리로 이동하세요. 긴 `Senses` 페이지에서는 `Quick View`로 하위 구역을 바로 선택할 수 있고, `?` 도움말은 현재 화면 밖의 컨트롤까지 자동 스크롤합니다.

0.2.1의 무기·스킨·방어구 풀 확률은 각 항목 행에서 직접 수정합니다. 한 항목을 수정해도 다른 항목은 자동으로 바뀌지 않으므로 합계를 `100%`로 맞추거나 `Equalize`를 눌러 명시적으로 균등 분배하세요. 항목이 하나뿐이면 확률은 `100%`로 유지됩니다.

## 설정 파일

전역 브리지 기본값은 아래 파일에 생성됩니다.

```text
config/cnpc_tacz_fire-common.toml
```

그래도 일반 제작 경로는 GUI입니다. config는 기본값과 스크립트 브리지 동작을 잡는 용도로 사용하고, 특정 NPC는 GUI 또는 스크립트로 개별 오버라이드하세요.

## 설정 프로필 파일

`Targets` 탭의 `Import`와 `Export`는 아래 위치의 JSON 프로필을 사용합니다.

```text
config/cnpc_tacz_fire/target_entities/
```

현재 내보내기 프로필은 타겟 목록만이 아니라 NPC의 TACZ Fire 설정 전체를 함께 저장합니다. NPC 하나를 설정한 뒤 프로필로 내보내면 다른 CustomNPCs NPC에 가져와 같은 전투 설정을 빠르게 복제할 수 있습니다. 구버전 타겟 전용 JSON도 가져올 수 있지만, 새 제작 흐름에서는 이 기능을 NPC 설정 프리셋으로 보는 편이 맞습니다.
