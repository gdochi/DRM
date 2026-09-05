---
title: 설치와 첫 NPC 설정
slug: warfare-setup
order: 320
description: 도치 워페어 0.2.5 설치, DW 제작 도구, 구버전 프로필 이전, 첫 관리 NPC 설정을 설명합니다.
product: dochi-warfare
category: 설치
section: setup
status: Draft
version: 0.2.5
audience: 서버 운영자
tags:
  - setup
  - TACZ
  - gui
---

## 설치 체크리스트

도치 워페어 0.2.5는 Forge 1.20.1을 대상으로 합니다. TACZ는 필수 총기 런타임 기준이고 Player Animator는 클라이언트 필수입니다. CustomNPCs는 NPC 워크플로에 필요하며 PointBlank, SuperbWarfare, Better Combat, Mob Player Animator, LesRaisins Tactical Equipments는 선택형 연동입니다.

| 구성 요소 | 이 위키 흐름에서 필요 여부 | 메모 |
| --- | --- | --- |
| Forge | 필요 | 1.20.1 Forge 47+ 환경을 사용합니다. |
| TACZ | 필요 | 클라이언트·서버에서 1.1.8부터 지원되는 1.1.x 범위를 사용합니다. |
| Player Animator | 클라이언트 필수 | 공유 관리 총기 애니메이션 컨트롤러에 필요합니다. |
| CustomNPCs | NPC 설정에 필요 | 관리 NPC, 용병, 포즈, NPC 클론 워크플로에 필요합니다. |
| 도치 워페어 | 필요 | 일반적인 모드 서버 플레이에서는 0.2.5 JAR를 클라이언트와 서버 양쪽에 넣습니다. |
| PointBlank | 선택 | 지원되는 1.11.1 또는 2.1.0 중 하나만 설치합니다. |
| SuperbWarfare | 선택 | 네이티브 총기·차량 연동은 0.8.9 final 빌드 `6effe4385`를 요구합니다. |
| Better Combat | 선택 | 등록된 근접 무기 공격·포즈와 무기 기반 공격 타이밍을 사용할 때 설치합니다. 일반 멀티플레이에서는 서버와 클라이언트의 모드 구성을 맞추세요. |
| Mob Player Animator | 선택 | Better Combat의 정확한 NPC 모션 재생에 필요한 클라이언트 모드입니다. 없으면 바닐라 주손 스윙으로 전환됩니다. |
| LesRaisins Tactical Equipments | 선택 | 지원 수류탄 투척과 LRT 수류탄 부비트랩 페이로드를 활성화합니다. |

## NPC별 GUI 열기

1. 크리에이티브 모드로 들어갑니다.
2. `DW Npc Core` 아이템을 준비합니다.
3. `DW Npc Core`를 들고 CustomNPCs NPC를 우클릭합니다.
4. 해당 NPC의 DW NPC별 설정 화면이 열립니다.
5. 설정을 바꾼 뒤 `Save`를 누릅니다.

`DW Npc Core`는 크리에이티브 모드 제작 도구입니다. CustomNPCs NPC를 우클릭하면 총기 설정, 지원 SuperbWarfare 차량을 우클릭하면 차량 AI 설정, 허공을 우클릭하면 NPC·차량 클론 보관함이 열립니다.

## 첫 안전 테스트

복잡한 전투를 만들기 전에 아래 흐름으로 먼저 확인하세요.

1. `TACZ Fire NPC Mode`를 켭니다.
2. `Enabled`를 ON으로 둡니다.
3. `Gun`에서 플레이어 인벤토리의 지원 총기 하나를 선택합니다. 선택형 연동보다 순정 TACZ 총기로 먼저 확인하세요.
4. `Senses`의 `General` 설정에서 `Stance: Auto` 또는 `Stance: Ranged`를 사용합니다.
5. `Fire`에서 `RPM Mode: TACZ Native`를 선택해 총기의 기본 RPM을 사용합니다.
6. `Ammo`에서 `Reload`와 `Supply Ammo`를 ON으로 두고 `Ammo Stock`은 `-1`로 둡니다.
7. `Targets`는 기본 동작 또는 단순한 엔티티 ID 하나로 시작합니다.
8. 저장한 뒤 시야가 열린 공간에서 타겟 하나를 상대로 테스트합니다.

이 기본 테스트가 통과한 뒤에 유한 탄약, 랜덤 풀, 고급 타겟 필터, 이동 튜닝, FX, 수류탄을 하나씩 추가하세요.

## GUI 카테고리 지도

| 카테고리 | 용도 |
| --- | --- |
| `Overview` | 현재 적용되는 정책, 감지, 전투, 피해, 장비, 탄약, 타겟, FX를 수정 없이 확인하는 요약 화면 |
| `Fire` | 사격 거리, 근접 전환 거리, `RPM Mode`, 고정·랜덤 RPM, 고정 명중률 또는 명중률 상승, 랜덤 길이 버스트 |
| `Senses` | `General`/`Advanced` 스탠스, 전술 이동, 대기 이동, 시각 인식, 근거리 감지, 플레이어 소리 감지 |
| `Cover` | 실험적 엄폐 트리거, 피해 임계값, 탐색 한도, 대기·쿨다운 시간, 이동 속도, 피킹 횟수 |
| `Targets` | 엔티티 ID, 필터, 요구/거부 태그, 프로필 `Load`/`Save As` |
| `Ammo` | 재장전 방식, 탄약 재고·재생, 재장전 중 이동, 탄약 소진 전환 |
| `Gun` | 지원 TACZ·PointBlank·SuperbWarfare 총기 선택, 원거리 피해 정책, 원거리 무기 풀, NPC 미리보기 |
| `Melee` | 비 TACZ 근접 아이템, 피해·넉백·공격 속도 정책, `Better Combat Compatibility`, 인라인 확률을 쓰는 근접 무기 풀, NPC 미리보기 |
| `Armor` | 실제 머리, 몸통, 다리, 발 슬롯을 쓰는 스크롤 가능한 방어구 세트 풀과 NPC 미리보기 |
| `Grenade` | 지원되는 투척물 데이터가 있을 때 선택형 수류탄 투척 |
| `Visual & FX` | Steve/Alex 스킨 풀, 경계 아이콘, 감지/사격 사운드와 CustomNPCs say 문구 |
| `Pose` | 대기, 경계, 사격, 전술 이동, 재장전, 무기 전환, 근접, 수류탄 행동에 기본 또는 사용자 포즈 연결 |

`Overview`는 읽기 전용입니다. 값을 바꾸려면 해당 카테고리로 이동하세요. 긴 `Senses` 페이지에서는 `Quick View`로 하위 구역을 바로 선택할 수 있고, `?` 도움말은 현재 화면 밖의 컨트롤까지 자동 스크롤합니다.

0.2.1의 무기·스킨·방어구 풀 확률은 각 항목 행에서 직접 수정합니다. 한 항목을 수정해도 다른 항목은 자동으로 바뀌지 않으므로 합계를 `100%`로 맞추거나 `Equalize`를 눌러 명시적으로 균등 분배하세요. 항목이 하나뿐이면 확률은 `100%`로 유지됩니다.

## 상단 도구와 별도 편집 아이템

상단 바는 파일 작업, 도움말 도구, `TACZ Fire NPC Mode`를 나눠 표시합니다.

| 위치 | 도구 |
| --- | --- |
| 파일 작업 | `Save`, `Close`, `Load`, `Save As` |
| 도움말 | `Help`, `Easy Build`, `Presets`, 튜토리얼과 툴팁 |
| 모드 | 현재 NPC의 `TACZ Fire NPC Mode` |

네 코어 아이템은 서로 다른 제작자 화면을 엽니다.

| 아이템 | 제작자 화면 |
| --- | --- |
| `DW Npc Core` | 총기, 전투 AI, 탄약, 타겟, 장비, FX, 행동별 포즈 연결 |
| `DW Pose Core` | Steve/Alex NPC용 사용자 포즈와 TACZ 총기 렌더 위치 편집 |
| `DW Mercenary Core` | 서버가 판정하는 용병 계약 조건 편집 |
| `DW 부비트랩 코어` | 블록별 비밀번호, 폭발, 효과, 밀쳐내기, 생명주기, 프로필, 관리자 편집 |

`DW Npc Core`로 허공을 우클릭하면 `Entity Clone Library`가 열립니다. CustomNPCs NPC와 지원 SuperbWarfare 차량을 서버 측 JSON 템플릿으로 보관하고 소환하며, NPC 설정의 `Save As` 프로필과는 별도 기능입니다.

플레이어가 보는 고용 확인 화면과 `J` 지휘 HUD는 이 제작자 화면들과 구분되는 인게임 런타임 화면입니다.

## 설정 파일

전역 브리지 기본값은 아래 파일에 생성됩니다.

```text
config/dochi_warfare-common.toml
```

클라이언트 전용 시각 기본값은 `config/dochi_warfare-client.toml`에 따로 저장됩니다.

그래도 일반 제작 경로는 GUI입니다. config는 기본값과 스크립트 브리지 동작을 잡는 용도로 사용하고, 특정 NPC는 GUI 또는 스크립트로 개별 오버라이드하세요.

실험적 엄폐는 아래 전역 스위치도 필요합니다. 서버 스위치와 NPC의 `Enable Cover`가 모두 엄폐를 허용해야 합니다.

```toml
[experimentalCover]
enabled = true
```

## 설정 프로필 파일

상단 바의 `Load`와 `Save As`는 아래 위치의 JSON 프로필을 사용합니다.

```text
config/dochi_warfare/target_entities/
```

현재 `Save As` 프로필은 타겟 목록만이 아니라 NPC의 DW 총기 설정 전체를 함께 저장합니다. NPC 하나를 설정한 뒤 프로필로 저장하면 다른 CustomNPCs NPC에서 `Load`해 같은 전투 설정을 빠르게 복제할 수 있습니다. 구버전 타겟 전용 JSON도 불러올 수 있지만, 새 제작 흐름에서는 이 기능을 NPC 설정 프리셋으로 보는 편이 맞습니다.

재사용 JSON의 새 기준 루트는 `config/dochi_warfare/`입니다. 첫 사용 시 모드는 `config/cnpc_tacz_fire/`의 구버전 파일 중 새 위치에 없는 것만 복사하며, 더 최신인 대상 파일을 덮어쓰거나 복구 가능한 원본을 지우지 않습니다. 0.2.5의 다른 보관 경로는 다음과 같습니다.

```text
config/dochi_warfare/poses/
config/dochi_warfare/vehicle_ai/profiles/
config/dochi_warfare/entity_clones/
config/dochi_warfare/booby_traps/profiles/
```
