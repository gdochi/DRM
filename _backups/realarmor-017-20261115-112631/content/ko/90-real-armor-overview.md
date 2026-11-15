---
title: NPC에게 방어구 효과 주기
slug: dochi-real-armor-overview
order: 900
description: 입힌 방어구로 NPC의 피해를 줄이고 부위별 방어·내구도를 설정합니다.
product: dochi-real-armor
category: 개요
section: overview
status: Stable
version: 0.1.6
audience: 플레이어, 서버 운영자, 모드팩 제작자
tags:
  - armor
  - customnpcs
  - easy npc
---

## 0.1.6으로 업데이트할 때
현재 공개 버전은 **0.1.6**입니다. 설정 스위치·서버 응답 후 포커스와 저장 충돌 처리가 개선되었습니다. 드롭 세트는 저장만으로 활성화되지 않으므로 **Save → Apply 확인**까지 진행하세요. 아래 0.1.4·0.1.5 촬영 자료는 촬영 버전을 캡션에 표시했습니다.

## 갑옷을 입힌 NPC를 더 튼튼하게

Real Armor는 NPC가 입은 방어구의 방어력·강인함·보호 인챈트를 피해에 반영합니다. 방어구 내구도를 닳게 하거나 맞은 부위의 장비만 쓰도록 정할 수도 있습니다.

DNPC·Easy NPC·CustomNPCs를 지원하며 DRM은 필수가 아닙니다. 26.3에서는 CustomNPCs를 사용할 수 없습니다.

0.1.5에서는 갑옷이 실제로 손상될 때 떨어질 아이템을 GUI로 설정합니다. [아이템 드롭 설정과 영상](#dochi-real-armor/dochi-real-armor-drops)에서 방어구별 확률·수량과 세트 저장·적용 방법을 확인하세요.

## 시작하는 순서

1. [설치와 설정](#dochi-real-armor/dochi-real-armor-setup)에서 사용하는 NPC 연동을 켭니다.
2. NPC에게 갑옷을 입힙니다.
3. 같은 공격을 했을 때 갑옷을 입기 전보다 피해가 줄어드는지 봅니다.
4. 원하는 전투 방식에 맞춰 부위별 방어와 내구도를 조절합니다.

![DNPC가 철 갑옷 한 벌을 착용한 편집 화면. 오른쪽 Head, Chest, Legs, Feet에 철 방어구가 들어 있고 가운데에도 착용한 모습이 표시됩니다.](assets/media/guides/armor-014-neo1211/armor-equipped.png "Real Armor 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1의 예제입니다. 갑옷은 NPC storage에 보관하는 대신 오른쪽 착용 슬롯에 넣습니다.")

이 환경에서 인챈트 없는 철 갑옷 한 벌을 입히고 동일한 기본 피해 `10`을 비교하면, 장비 없을 때 체력 `10`, 입었을 때 체력 `6`이 줄었습니다. 전체 방어 설정의 예시이며 부위별 모드·무기·인챈트에 따라 결과가 달라집니다. 피해가 전혀 들어오지 않는 NPC는 먼저 DNPC의 **Combat AI → Invulnerable**과 **Allow player damage**도 확인하세요.

## 전체 방어와 부위별 방어

| 설정 | 방어구 사용 방식 |
| --- | --- |
| 전체 방어 | 입은 방어구를 함께 계산 |
| 부위별 방어 | 머리는 투구, 가슴은 흉갑, 다리는 레깅스·부츠 |

부위별로 하면 투구가 없는 NPC의 머리가 더 약해지는 식으로 장비 구성을 살릴 수 있습니다. 부위를 구분할 수 없는 공격에는 전체 장비를 사용합니다.

방어를 무시하는 종류의 피해는 갑옷으로 줄어들지 않습니다. [계산 옵션](#dochi-real-armor/dochi-real-armor-calculation)에서 각 설정을 확인하세요.
