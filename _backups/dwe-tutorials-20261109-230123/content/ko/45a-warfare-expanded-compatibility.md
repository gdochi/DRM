---
title: 사용할 수 있는 차량 팩
slug: expanded-compatibility
order: 315
description: 확인된 차량 기종과 함께 설치하면 충돌하는 조합을 확인합니다.
product: dochi-warfare-expanded
category: 설치와 시작
section: overview
status: 사용 안내
version: 0.3.1
audience: 서버 운영자 / 제작자
---

## 차량 팩 고르기

DW·DWE 0.3.1에서 아래 기종은 NPC 승무원의 이동·사격·재장전을 확인한 차량입니다. 같은 팩이라도 표에 없는 기종이나 특수 무장은 따로 확인이 필요합니다.

| 차량 팩 | Minecraft / 로더 | 기종 |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Vintage Vehicle Pack | Forge 1.20.1 | BMP-2 |
| Frontline Combat Pack | Forge 1.20.1 | BMP-2 |
| Spectacular Machines Addon | Forge 1.20.1 | Type 10 |

DW와 DWE는 최신 0.3.1 수정본을 함께 사용합니다. [첫 차량 설정](#dochi-warfare-expanded/expanded-overview)을 따라 운전수·포수와 탄약을 정하세요.

## 피해야 할 조합

- **SuperbAddon 1.0.1 + SuperbWarfare 0.8.9.2:** 폭발이 발생하면 충돌할 수 있습니다. 같은 폭발 시험에서는 SW 0.8.9.1 조합이 정상 동작했습니다.
- **MCSP M1A2:** 이 안내의 지원 기종에 포함하지 않습니다. MCSP를 쓸 때는 표에 있는 Bradley부터 선택하세요.

## 최신 수정본에서 달라진 점

DNPC 승무원과 아군 보호를 지원하고, 차량 파괴 시 승무원 처리를 고를 수 있습니다. 재장전 중 설정을 바꿀 때 탄약이 중복되거나 탄창을 넘던 문제도 수정했습니다.

AH-6의 지상 표적 사격과 F-22의 고정 무장 조준, 불러오지 못한 지형 근처에서 과도하게 상승하던 동작을 보완했습니다. 자동 착륙 기능은 제공하지 않습니다.

## 차량을 연 뒤 확인할 곳

차량 팩을 설치했으면 **Crew**에서 실제 좌석과 역할부터 확인하세요. 탑승 공급원과 무장별 승무원 조건은 [차량 AI](#dochi-warfare/warfare-vehicle-ai)에서 이어집니다.

![Crew에서 본 SuperbWarfare 기본 M1A2의 다섯 좌석.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. 번호를 누르면 오른쪽에 그 좌석의 역할과 탑승 상태가 나옵니다. 이 사진은 빈 좌석 지도이며 NPC 탑승을 완료한 결과는 아닙니다. MCSP M1A2와는 다른 기본 SuperbWarfare 차량입니다.")
