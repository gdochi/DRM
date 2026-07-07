---
title: CNPC TaCZ Fire 개요
slug: tacz-overview
order: 310
description: CNPC TaCZ Fire가 제어하는 범위, 건드리지 않는 범위, 총기 NPC 제작 기본 규칙입니다.
product: cnpc-tacz-fire
category: 개요
section: overview
status: Draft
version: 0.1.9
audience: 총기 NPC 제작자
tags:
  - tacz
  - customnpcs
  - overview
---

## CNPC TaCZ Fire란?

CNPC TaCZ Fire는 CustomNPCs NPC가 실제 TaCZ 총기로 전투하도록 만드는 Forge 1.20.1 애드온입니다. 단순히 원거리 공격을 총처럼 보이게 바꾸는 방식이 아닙니다. 이 애드온은 TaCZ 사격, 재장전 상태, 총기 상태, 탄약 재고, 타겟 규칙, 전술 이동, 인식, 무기 풀, 외형 풀, 방어구 풀, 전투 FX, 선택형 수류탄 동작을 NPC별 설정 GUI에서 제어합니다.

가장 중요한 스위치는 `TACZ Fire NPC Mode`입니다. 이 모드가 OFF이면 NPC는 일반 CustomNPCs 동작을 유지합니다. CustomNPCs NPC에 이 모드를 ON으로 저장하면 CNPC TaCZ Fire가 해당 NPC의 총기 동작을 제어할 수 있습니다.

## 핵심 규칙

| 규칙 | 의미 |
| --- | --- |
| 실제 TaCZ 총기 사용 | NPC는 실제 TaCZ 총기 아이템을 사용해야 합니다. 일반적으로 관리되는 원거리 무기로 저장하거나 들게 됩니다. |
| 오프핸드 탄약 금지 | 여분 탄약은 실제 탄약/탄창 아이템이 아니라 애드온의 탄약 재고와 재장전 정책으로 처리합니다. |
| NPC별 활성화 | `TACZ Fire NPC Mode`가 켜진 선택된 NPC만 제어합니다. 일반 CustomNPCs NPC는 그대로 둡니다. |
| GUI 우선 설정 | 인게임 NPC별 GUI가 기본 설정 경로입니다. 스크립트와 storeddata는 고급 워크플로용입니다. |

:::warning 탄약 규칙
NPC가 TaCZ 탄약이나 탄창 아이템을 오프핸드에 들게 만들지 마세요. 재장전은 `Ammo Stock`, 재장전 상태, TaCZ 총기 스택 상태로 표현합니다.
:::

## 애드온이 제어하는 것

| 영역 | 예시 |
| --- | --- |
| 사격 동작 | `Reload`, `Supply Ammo`, `Max Distance`, `RPM Override`, 랜덤 RPM 범위, 명중률, 버스트 사격 |
| 스탠스 | `Idle`, `Ranged`, `Melee`, `Auto`, `Auto Hidden`, 조건 1개를 쓰는 고급 규칙 |
| 전술 이동 | 고정, 산개, 밀집, 전진, 후퇴, 거리 유지 사격, 이동 사격 |
| 인식 | 감지 거리, 감지 각도, 전투 진입 지연, 즉시 전투 각도, 마지막 위치 기억 |
| 타겟 | 엔티티 ID 허용 목록, 팩션 규칙, 요구 태그, 거부 태그, 같은 팩션 태그 공격 |
| 장비와 외형 | 랜덤 원거리 무기, 근접 무기, 스킨, 방어구 세트, 미리보기와 손 아이템 동기화 |
| 전투 피드백 | 경계 아이콘, 감지 사운드, 사격 사운드, 감지 대사, 사격 대사 |
| 선택형 수류탄 | 수류탄 종류, 거리, 탐색 범위, 체력 조건, 쿨다운, 신관, 위력, 각도 |

## 애드온이 건드리지 않는 것

CNPC TaCZ Fire는 모든 CustomNPCs 원거리/근접 NPC를 전역으로 바꾸지 않습니다. 일반 CustomNPCs 공격 출력은 애드온이 제어하는 TaCZ Fire NPC에서만 억제됩니다. 따라서 한 월드 안에서 일반 NPC와 TaCZ Fire NPC를 함께 사용할 수 있습니다.

또한 가짜 총기 애니메이션을 직접 만들 필요가 없습니다. TaCZ와 선택형 전투 애니메이션 연동은 각 모드의 기본 동작을 사용해야 합니다. TaCZ 총기나 Better Combat 근접 애니메이션이 맞지 않으면 동작을 흉내 내기보다 연동 또는 설정 문제로 보고 해결하는 편이 맞습니다.

## 지원 조합

| 모드 또는 로더 | 역할 |
| --- | --- |
| Minecraft 1.20.1 | 이 애드온 빌드의 대상 게임 버전입니다. |
| Forge 47 이상 | 필수 로더 범위입니다. |
| TaCZ 1.1.8 이상 | 필수 총기 시스템입니다. |
| CustomNPCs 1.20.1 이상 | 이 위키의 CustomNPCs NPC 제작 흐름에 필요합니다. |
| playerAnimator 1.0.0 이상 | 애니메이션 지원이 있을 때 쓰는 선택형 클라이언트 의존성입니다. |
| Better Combat | 가능할 때 근접 애니메이션 지원에 사용합니다. |
| 지원되는 투척물 모드 | 투척물 데이터가 있을 때 선택형 수류탄 동작에 사용합니다. |

## 권장 제작 순서

1. 테스트 월드에서 새 CustomNPCs NPC 하나를 만듭니다.
2. `TACZ NPC Core`로 NPC별 설정 GUI를 엽니다.
3. `TACZ Fire NPC Mode`와 `Enabled`를 켭니다.
4. `Gun` 탭에서 실제 TaCZ 총기 하나를 선택합니다.
5. `Ammo Stock`은 `-1`로 두어 무한 예비 탄약 상태에서 시작합니다.
6. 고급 타겟, 풀, 수류탄, 스크립트 오버라이드를 넣기 전에 단순한 `Auto` 스탠스로 한 타겟을 먼저 테스트합니다.

이렇게 시작하면 첫 문제를 작게 유지할 수 있습니다. 이 기본 설정에서도 NPC가 발사하지 못한다면 보통 모드 활성화, 총기 선택, 타겟 선택, 거리, 시야, 탄약/재장전 정책 중 하나가 원인입니다.
