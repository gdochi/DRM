---
title: 총을 쏘는 NPC 만들기
slug: dochi-warfare-overview
order: 310
description: Warfare로 NPC의 총·공격 대상·재장전과 전투 행동을 정합니다.
product: dochi-warfare
category: 개요
section: overview
status: Draft
version: 0.3.1
audience: 총기 NPC 제작자
tags:
  - TACZ
  - customnpcs
  - overview
---

## NPC의 총기 설정 화면

**DW Npc Core**로 NPC를 열면 왼쪽에서 무기·감지·탄약·공격 대상을 고를 수 있습니다. 다음은 **DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1**의 영문 화면입니다.

![총기 모드를 켠 Overview의 감지·전투·피해 설정 요약.](assets/media/guides/warfare-031-neo1211/dw-overview.png "Overview는 현재 값을 읽는 곳입니다. 총을 바꾸려면 Gun, 재장전은 Ammo, 감지·발사 속도는 Senses로 이동합니다.")

## Warfare로 할 수 있는 일

NPC에게 총을 들려주고 누구를 공격할지, 얼마나 가까이 갈지, 언제 재장전할지 정합니다. 가까운 적에게는 근접 무기를 쓰게 하거나 엄폐·순찰·용병 지휘도 설정할 수 있습니다.

NPC는 **DNPC 또는 CustomNPCs**로 준비합니다. 총기 전투만 쓸 때는 DW, 차량을 움직이고 승무원을 태울 때는 **DWE도** 설치합니다.

## 먼저 한 NPC에게 총을 설정하세요

1. [설치와 첫 설정](#dochi-warfare/warfare-setup)대로 필요한 모드를 설치합니다.
2. **DW Npc Core**로 NPC를 우클릭합니다.
3. **TACZ Fire NPC Mode**와 **Enabled**를 켭니다.
4. **Gun**에서 총을 고릅니다.
5. **Save**한 뒤 공격 대상과 마주 보게 합니다.

**Easy Build / Presets**를 쓰면 여러 전투 설정을 예시로 시작할 수 있습니다.

## 다음에 바꿀 설정

| 원하는 행동 | 문서 |
| --- | --- |
| 가까우면 칼, 멀면 총 | [무기와 스탠스](#dochi-warfare/warfare-weapons-ai) |
| 특정 적만 공격 | [타겟 규칙](#dochi-warfare/warfare-target-filters) |
| 탄약을 제한하거나 다시 채우기 | [재장전과 재고](#dochi-warfare/warfare-reload-ammo) |
| 엄폐하거나 제압 사격 | [엄폐와 제압](#dochi-warfare/warfare-cover-suppression) |
| 플레이어가 고용하고 지휘 | [용병](#dochi-warfare/warfare-mercenary) |
| 차량 이동과 승무원 | [DWE 시작](#dochi-warfare-expanded/expanded-overview) |

NPC용 여분 탄약은 **Ammo Stock**으로 정합니다. 보조손에 탄약이나 탄창 아이템을 쥐여 주는 방식은 사용하지 않습니다.

## 지원 환경

DW는 **Forge 1.20.1 / NeoForge 1.21.1**용입니다. TACZ와 클라이언트의 Player Animator가 필요합니다. 지원하는 PointBlank·SuperbWarfare 총기도 선택할 수 있으며, 그 모드를 설치했을 때 목록에서 고릅니다.

자세한 버전은 [설치 표](#dochi-warfare/warfare-setup)에 있습니다.
