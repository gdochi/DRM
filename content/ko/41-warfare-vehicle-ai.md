---
title: SuperbWarfare 차량 AI
slug: warfare-vehicle-ai
order: 370
description: SuperbWarfare 자율 이동, 타겟, 무장, 탄약, 프로필, 명령어, 소울스톤을 설정합니다.
product: dochi-warfare
category: 차량 AI
section: vehicles
status: Draft
version: 0.2.4
audience: 시나리오 제작자와 운영자
tags:
  - SuperbWarfare
  - vehicle
  - ai
---

## 요구 사항과 편집기

차량 AI는 SuperbWarfare 0.8.9 final 빌드 `6effe4385`용 선택형 연동입니다. 크리에이티브 모드에서 `DW Npc Core`를 들고 지원 SuperbWarfare 차량을 우클릭합니다. 이 화면은 CustomNPCs NPC 편집기와 다른 차량 제작자 편집기입니다.

DW는 탑승자 없는 차량을 원본 `processInput`, 엔진 물리, 포탑 조준, 무장 사격, 에너지, 사운드, 충돌로 움직입니다. 가짜 탑승자를 만들거나 속도를 직접 덮어써 조향하지 않습니다. 차량에 탑승하려면 먼저 AI를 끄세요.

## 이동 모드

| 대기 모드 | 동작 |
| --- | --- |
| `Stationary` | 전투나 명시적 명령이 없으면 저장 위치를 지킵니다. |
| `Area Patrol` | 저장된 홈 주변에서 목적지를 선택합니다. |
| `Return Only` | 홈으로 복귀한 뒤 대기합니다. |
| `Route Patrol` | 저장 지점을 순서대로 돌며, 지점이 없으면 홈 기준 자동 지점을 사용합니다. |

전투 이동은 `Hold Position`, `Advance`, `Retreat`으로 따로 정합니다. 최소 사거리 확보 이동을 켜면 선택한 기준 무장이 너무 가까워 발사할 수 없을 때 위치 고수 차량도 잠시 거리를 벌릴 수 있습니다.

길찾기는 원본 엔진을 바퀴·궤도·선박으로 분류하고 차체 폭, 단차, 경사, 지지면, 회전 반경, 장애물, 끼임 복구 규칙을 각각 적용합니다. 경로는 로드된 지형 안에서만 계획합니다. 헬리콥터·항공기의 자율 비행 기능은 아닙니다.

## 인식과 타겟

차량 타겟은 엔티티 ID, 요구/제외 스코어보드 태그, 팩션 규칙, 아군 사격 방지를 조합합니다. 인식에는 감지 반경, 수평 시야각, 반응 지연, 근거리 감지, 피격 반응, 팩션 방어, 타겟 기억, 소리 감지가 있습니다.

`Nearest`는 거리순으로 선택합니다. `Custom`은 보병·생명체, 지상·수상 차량, 공중 차량의 가중치를 사용합니다. 서버는 반격 보너스, 현재 타겟 유지, 거리, 전환 격차도 함께 계산합니다.

소유자, 같은 스코어보드 팀, 같은 `dochi_faction:<factionId>` 태그 엔티티는 보호됩니다. `dochi_warfare_vehicle_target` 태그로 명시 타겟을 표시할 수 있지만 소유자·팀·팩션·사거리·아군 사격 검사를 우회하지는 않습니다.

## 무장과 탄약

원본 차량 무장은 각각 다음을 설정할 수 있습니다.

* 사용 여부와 0~100 선호도
* 정확도
* 보병, 지상·수상 차량, 공중 차량 대상 범주
* 엔티티, 팩션, 태그, 차량 내구도 조건
* 원본/기본 또는 수동 최소·최대 사거리
* 공격 기회마다 1개, 지정 개수, 사용 가능한 모든 무장 사용

탄약은 글로벌 또는 무장별 정책으로 두고 무한/제한을 선택합니다. 탄창 크기, 예비 탄, 재장전 시간은 DW 데이터이며 실제 탄약·탄창 아이템을 만들지 않습니다. 원본 무장 상태와 발사는 SuperbWarfare가 계속 담당합니다.

## 프로필, 소울스톤, 클론

`Save As`와 `Load`는 재사용 차량 AI 프로필을 아래에 저장합니다.

```text
config/dochi_warfare/vehicle_ai/profiles/
```

프로필에는 현재 엔티티 신원과 월드 위치 상태가 포함되지 않습니다. 빈 CustomNPCs 소울스톤은 탑승자 없는 SuperbWarfare 차량을 담았다가 원본 차량 데이터와 DW 전투 설정을 유지한 채 다시 배치할 수 있습니다. `Clone` 버튼은 정리된 서버 측 템플릿을 저장하며, `DW Npc Core`로 허공을 우클릭해 클론 보관함에서 소환합니다.

## 운영자 명령어

명령어는 권한 레벨 2가 필요합니다. 24블록 안의 SuperbWarfare 차량을 직접 바라본 뒤 사용합니다.

```text
/dochi_warfare vehicle_ai enable
/dochi_warfare vehicle_ai disable
/dochi_warfare vehicle_ai wander
/dochi_warfare vehicle_ai guard
/dochi_warfare vehicle_ai engage
/dochi_warfare vehicle_ai move_to_me
/dochi_warfare vehicle_ai return_home
/dochi_warfare vehicle_ai patrol_add
/dochi_warfare vehicle_ai patrol_clear
/dochi_warfare vehicle_ai status
```

일반 제작은 GUI가 우선입니다. 명령어는 라이브 운영, 빠른 지시, 상태 진단에 사용하세요.
