---
title: 문제 해결
slug: tacz-troubleshooting
order: 360
description: TaCZ Fire NPC 설정, 타겟, 탄약, 시각 효과, 성능 문제를 확인하는 순서입니다.
product: cnpc-tacz-fire
category: 운영
section: operations
status: Draft
version: 0.1.9
audience: 운영자
tags:
  - troubleshooting
  - reload
  - npc
---

## 빠른 분리 테스트

총기 NPC가 실패하면 여러 값을 한꺼번에 바꾸지 말고 설정을 줄이세요.

1. 새 CustomNPCs NPC 하나를 사용합니다.
2. 실제 TaCZ 총기 하나만 사용합니다.
3. `TACZ Fire NPC Mode`와 `Enabled`를 켭니다.
4. `Stance: Ranged` 또는 `Stance: Auto`를 사용합니다.
5. `Ammo Stock: -1`로 둡니다.
6. 타겟 필터를 제거합니다.
7. `Max Distance` 안에 있고 시야가 열린 타겟 하나로 테스트합니다.

이 상태에서 작동하면 애드온과 총기 루프는 정상입니다. 그 뒤 필터, 유한 탄약, 이동, 풀, FX를 하나씩 추가하세요.

## 증상별 확인표

| 증상 | 먼저 확인할 것 |
| --- | --- |
| `TACZ NPC Core`로 GUI가 열리지 않음 | 크리에이티브 모드인지, CustomNPCs NPC를 우클릭했는지 확인합니다. 다른 living entity는 거부됩니다. |
| NPC가 전혀 발사하지 않음 | `TACZ Fire NPC Mode`, `Enabled`, 스탠스, 선택한 TaCZ 총기, 타겟 시야, `Max Distance`, 타겟 규칙, 탄약 재고를 확인합니다. |
| NPC가 타겟을 보지만 기다림 | `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle`, 시야를 확인합니다. |
| 발사 리듬이 이상함 | `RPM Override`, `RPM Min`, `RPM Max`, `Burst Fire`, TaCZ 총기의 기본 발사 모드를 확인합니다. |
| 총이 빈 뒤 멈춤 | `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Duration Ms`, 총기 재장전 호환성을 확인합니다. |
| 잘못된 타겟을 공격함 | 엔티티 ID 필터, 요구 태그, 거부 태그, 같은 팩션 태그 규칙을 지우고 하나씩 다시 추가합니다. |
| NPC가 잘못된 아이템을 들고 있음 | 원거리 무기가 실제 TaCZ 총기인지, 탄약/탄창 아이템을 오프핸드 재장전 소품으로 쓰지 않았는지 확인합니다. |
| 경계 아이콘이 보이지 않음 | NPC별 `Alert Icons` 설정과 클라이언트 `cnpc_tacz_fire Config`의 마커 표시 설정을 확인합니다. |

## GUI 접근 문제

`TACZ NPC Core`는 편집 아이템입니다. CustomNPCs NPC 엔티티에만 작동하며 편집에는 크리에이티브 모드가 필요합니다. 다른 엔티티는 우클릭되는데 TaCZ Fire 화면이 열리지 않는다면 대상이 실제 CustomNPCs NPC인지, 클라이언트와 서버 양쪽에 애드온이 설치되어 있는지 확인하세요.

## 사격과 시야 문제

CNPC TaCZ Fire는 발사 직전에 최종 line-of-sight 검사를 합니다. 엄폐물 너머로 직접 발사하지 않게 하기 위한 동작입니다. NPC가 타겟을 감지하지만 쏘지 않는다면 AI를 조정하기 전에 열린 평지에서 먼저 테스트하세요. 열린 공간에서는 작동한다면 총기 아이템 문제가 아니라 엄폐, 각도, 감지 지연, 거리 문제입니다.

`Detect Distance`는 최초 인식 거리입니다. `Max Distance`는 원거리 사격 거리입니다. 둘을 같은 값처럼 조정하지 마세요.

## 탄약과 재장전 문제

가장 흔한 탄약 문제는 실제 탄약 아이템과 애드온 탄약 재고를 섞는 것입니다. NPC 오프핸드에 TaCZ 탄약이나 탄창을 넣지 마세요. `Ammo Stock`, `Supply Ammo`, 재장전 상태를 사용합니다.

진단 순서는 아래와 같습니다.

1. `Ammo Stock`을 `-1`로 둡니다.
2. `Reload`와 `Supply Ammo`를 ON으로 둡니다.
3. `Reload Duration Ms`를 `0`으로 두어 들고 있는 총기의 기본 재장전 시간을 사용합니다.
4. 타겟 하나로 다시 테스트합니다.

무한 재고에서는 작동하지만 유한 재고에서 실패한다면 NPC가 예비 탄 `0`에 도달했거나 재생 설정이 비활성일 가능성이 큽니다.

## 타겟 규칙 문제

엔티티 ID 목록이 비어 있으면 일반 동작을 허용합니다. 엔티티 ID 목록이 채워지면 허용 목록이 됩니다. 요구 태그와 거부 태그는 추가 필터입니다. 세 가지가 모두 켜져 있으면 타겟은 모두 통과해야 합니다.

확신이 없으면 타겟 프로필을 내보낸 뒤 단순화하고, 테스트 후 다시 가져오세요.

## 성능과 로그

큰 `Detect Distance`, 큰 `Max Distance`, 넓은 타겟 목록, 많은 관리 NPC는 스캔과 전투 작업을 늘릴 수 있습니다. 초기 테스트는 작게 유지하세요. 디버그 로그는 설정 중에는 유용하지만, 전투를 확인한 뒤에는 낮춰야 라이브 서버 로그를 읽기 쉽습니다.
