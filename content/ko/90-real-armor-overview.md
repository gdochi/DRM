---
title: NPC에게 방어구 효과 주기
slug: dochi-real-armor-overview
order: 900
description: 입힌 방어구로 NPC의 피해를 줄이고 부위별 방어·내구도를 설정합니다.
product: dochi-real-armor
category: 개요
section: overview
status: Stable
version: 0.1.4
audience: 플레이어, 서버 운영자, 모드팩 제작자
tags:
  - armor
  - customnpcs
  - easy npc
---

## 갑옷을 입힌 NPC를 더 튼튼하게

Real Armor는 NPC가 입은 방어구의 방어력·강인함·보호 인챈트를 피해에 반영합니다. 방어구 내구도를 닳게 하거나 맞은 부위의 장비만 쓰도록 정할 수도 있습니다.

DNPC·Easy NPC·CustomNPCs를 지원하며 DRM은 필수가 아닙니다. 26.3에서는 CustomNPCs를 사용할 수 없습니다.

## 시작하는 순서

1. [설치와 설정](#dochi-real-armor/dochi-real-armor-setup)에서 사용하는 NPC 연동을 켭니다.
2. NPC에게 갑옷을 입힙니다.
3. 같은 공격을 했을 때 갑옷을 입기 전보다 피해가 줄어드는지 봅니다.
4. 원하는 전투 방식에 맞춰 부위별 방어와 내구도를 조절합니다.

## 전체 방어와 부위별 방어

| 설정 | 방어구 사용 방식 |
| --- | --- |
| 전체 방어 | 입은 방어구를 함께 계산 |
| 부위별 방어 | 머리는 투구, 가슴은 흉갑, 다리는 레깅스·부츠 |

부위별로 하면 투구가 없는 NPC의 머리가 더 약해지는 식으로 장비 구성을 살릴 수 있습니다. 부위를 구분할 수 없는 공격에는 전체 장비를 사용합니다.

방어를 무시하는 종류의 피해는 갑옷으로 줄어들지 않습니다. [계산 옵션](#dochi-real-armor/dochi-real-armor-calculation)에서 각 설정을 확인하세요.
