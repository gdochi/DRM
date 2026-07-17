---
title: 문제 해결
slug: tacz-troubleshooting
order: 360
description: TACZ Fire NPC 설정, 타겟, 탄약, 시각 효과, 성능 문제를 확인하는 순서입니다.
product: cnpc-tacz-fire
category: 운영
section: operations
status: Draft
version: 0.2.0
audience: 운영자
tags:
  - troubleshooting
  - reload
  - npc
---

## 빠른 분리 테스트

총기 NPC가 실패하면 여러 값을 한꺼번에 바꾸지 말고 설정을 줄이세요.

1. 새 CustomNPCs NPC 하나를 사용합니다.
2. 실제 TACZ 총기 하나만 사용합니다.
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
| NPC가 전혀 발사하지 않음 | `TACZ Fire NPC Mode`, `Enabled`, 스탠스, 선택한 TACZ 총기, 타겟 시야, `Max Distance`, 타겟 규칙, 탄약 재고를 확인합니다. |
| NPC가 타겟을 보지만 기다림 | `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle`, 시야를 확인합니다. |
| 가까이 접근해도 뒤쪽 타겟을 놓침 | `Close Detection`과 `Close Detect Distance`를 확인합니다. 의도적인 백스탭 NPC라면 OFF가 정상입니다. |
| 플레이어 총성이나 블록 작업에 반응하지 않음 | `Sound Detection`, 소리 종류별 거리, `Detect Distance`, `Sound Investigation`을 확인합니다. 크리에이티브·관전자 플레이어의 소리는 무시됩니다. |
| 발사 리듬이 이상함 | `RPM Override`, `RPM Min`, `RPM Max`, `Burst Fire`, TACZ 총기의 기본 발사 모드를 확인합니다. |
| 총이 빈 뒤 멈춤 | `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Type`, `Ammo-Aware Switching`, 근접/빈손 fallback을 확인합니다. |
| 설정한 피해·넉백·공격 속도가 나오지 않음 | `Gun`과 `Melee`의 `Gun/Weapon Spec` 또는 `Custom` 선택과 사용자 값을 확인합니다. |
| 순찰 NPC가 벽에 붙거나 한 걸음씩 끊김 | `Default Walk Speed`, 순찰 지점, 수직 높이와 A* 도달 가능성을 확인합니다. 0.2.0 JAR가 클라이언트와 서버 양쪽에 설치되었는지도 확인합니다. |
| 잘못된 타겟을 공격함 | 엔티티 ID 필터, 요구 태그, 거부 태그, 같은 팩션 태그 규칙을 지우고 하나씩 다시 추가합니다. |
| NPC가 잘못된 아이템을 들고 있음 | 원거리 무기가 실제 TACZ 총기인지, 탄약/탄창 아이템을 오프핸드 재장전 소품으로 쓰지 않았는지 확인합니다. |
| 경계 아이콘이 보이지 않음 | NPC별 `Alert Icons` 설정과 클라이언트 `cnpc_tacz_fire Config`의 마커 표시 설정을 확인합니다. |
| GUI가 왜곡되어 보임 | 바닐라 비디오 설정에서 `GUI Scale`을 조정한 뒤 다시 확인합니다. |

## GUI 접근 문제

`TACZ NPC Core`는 편집 아이템입니다. CustomNPCs NPC 엔티티에만 작동하며 편집에는 크리에이티브 모드가 필요합니다. 다른 엔티티는 우클릭되는데 TACZ Fire 화면이 열리지 않는다면 대상이 실제 CustomNPCs NPC인지, 클라이언트와 서버 양쪽에 애드온이 설치되어 있는지 확인하세요.

## 사격과 시야 문제

CNPC TACZ Fire는 발사 직전에 최종 line-of-sight 검사를 합니다. 엄폐물 너머로 직접 발사하지 않게 하기 위한 동작입니다. NPC가 타겟을 감지하지만 쏘지 않는다면 AI를 조정하기 전에 열린 평지에서 먼저 테스트하세요. 열린 공간에서는 작동한다면 총기 아이템 문제가 아니라 엄폐, 각도, 감지 지연, 거리 문제입니다.

`Detect Distance`는 최초 인식 거리입니다. `Max Distance`는 원거리 사격 거리입니다. 둘을 같은 값처럼 조정하지 마세요.

## 탄약과 재장전 문제

가장 흔한 탄약 문제는 실제 탄약 아이템과 애드온 탄약 재고를 섞는 것입니다. NPC 오프핸드에 TACZ 탄약이나 탄창을 넣지 마세요. `Ammo Stock`, `Supply Ammo`, 재장전 상태를 사용합니다.

진단 순서는 아래와 같습니다.

1. `Ammo Stock`을 `-1`로 둡니다.
2. `Reload`와 `Supply Ammo`를 ON으로 둡니다.
3. `Reload Duration Ms`를 `0`으로 두어 들고 있는 총기의 기본 재장전 시간을 사용합니다.
4. 타겟 하나로 다시 테스트합니다.

무한 재고에서는 작동하지만 유한 재고에서 실패한다면 NPC가 예비 탄 `0`에 도달했거나 재생 설정이 비활성일 가능성이 큽니다.

## 소리 감지 문제

0.2.0의 청각은 모든 재생 사운드를 계속 스캔하지 않습니다. 플레이어의 TACZ 총성, TACZ 재장전, 블록 파괴, 블록 설치 이벤트만 짧은 자극으로 등록합니다. 종류별 범위는 항상 `Detect Distance` 이하로 저장됩니다. `Move To Source`가 켜져 있어도 이미 전투 중이거나 위치 고정 스탠스라면 이동하지 않는 것이 정상입니다.

## 순찰과 길찾기 문제

Area/Route 순찰은 `Default Walk Speed`로 활성 A* 경로를 유지합니다. 경로를 만들 수 없거나 끝까지 도달하지 못하면 제한된 횟수만 즉시 재시도하고, 계속 실패하면 해당 지점을 건너뜁니다. 장애물을 부수거나 벽으로 계속 밀어붙이는 동작은 정상 동작이 아닙니다.

한 블록 아래로 내려가지 못한다면 직접 Route 좌표의 Y가 실제 발 위치와 맞는지 확인하세요. 0.2.0은 주변의 설 수 있는 지면을 찾고 수직 거리도 도착 판정에 포함하지만, 낙하가 불가능한 울타리·막힌 공간·너무 좁은 발판까지 강제로 이동시키지는 않습니다.

## 피해 정책 문제

`Gun Spec`은 TACZ 총기 원본 피해를 유지하고, `Custom`은 이 NPC의 관리 탄환에만 고정 피해를 적용합니다. 근접 `Weapon Spec`은 아이템 능력치를 사용하며, 근접 `Custom`은 피해·넉백·초당 공격 횟수를 각각 지정할 수 있습니다. 잘못된 결과가 나오면 한 번에 한 정책만 `Custom`으로 바꿔 확인하세요.

## 타겟 규칙 문제

엔티티 ID 목록이 비어 있으면 일반 동작을 허용합니다. 엔티티 ID 목록이 채워지면 허용 목록이 됩니다. 요구 태그와 거부 태그는 추가 필터입니다. 세 가지가 모두 켜져 있으면 타겟은 모두 통과해야 합니다.

확신이 없으면 설정 프로필을 내보낸 뒤 단순화하고, 테스트 후 다시 가져오세요.

## 성능과 로그

0.2.0은 긴 `Detect Distance`를 위해 공간 인덱스를 사용하고 이벤트 기반 청각으로 반복 스캔을 줄였습니다. 그래도 큰 `Detect Distance`, 큰 `Max Distance`, 넓은 타겟 목록, 많은 관리 NPC는 후보 필터링과 전투 작업을 늘릴 수 있습니다. 초기 테스트는 작게 유지하세요. 디버그 로그는 설정 중에는 유용하지만, 전투를 확인한 뒤에는 낮춰야 라이브 서버 로그를 읽기 쉽습니다.
