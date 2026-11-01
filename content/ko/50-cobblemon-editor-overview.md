---
title: 포켓몬 NPC 만들기
slug: cobblemon-editor-overview
order: 500
description: 트레이너·포켓마트·간호순·스타터 NPC 중 만들고 싶은 역할을 고릅니다.
product: drm-cobblemon-editor
category: 개요
section: overview
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 코블몬 NPC와 관련 런타임을 제작하는 사용자
tags:
  - cobblemon
  - customnpcs
  - overview
---

## 어떤 NPC를 만들까요?

| 만들 것 | 사용할 도구 |
| --- | --- |
| 포켓몬 파티로 싸우는 트레이너 | **Cobblemon Editor → Trainer** |
| 포켓몬 한 마리가 직접 싸우는 NPC | **Cobblemon Editor → Pokemon Itself** |
| 포켓몬 판매·교환·경매 | **PokéMart Editor** |
| 파티 치료 | **Nurse Joy Editor** |
| 처음 받을 포켓몬 선택 | **Starter Selector Editor** |
| 배틀 시작 전 등장 장면 | **Battle Presentation Maker** |

도구는 DRM 코어로 허공을 우클릭한 뒤 **Add-on**에서 엽니다. NPC는 DNPC 또는 CustomNPCs로 만듭니다.

## 첫 트레이너부터 만들기

[설치와 첫 배틀](#drm-cobblemon-editor/cobblemon-editor-setup)을 따라 포켓몬 한 마리를 가진 트레이너를 만듭니다. 저장한 뒤 NPC에 적용하고, 양손을 비운 채 말을 걸면 배틀을 시작합니다.

이후 [파티와 라운드](#drm-cobblemon-editor/cobblemon-trainer-editor), [AI와 기믹](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items), [배틀 규칙](#drm-cobblemon-editor/cobblemon-battle-rules)을 정할 수 있습니다.

## 대화와 보상을 붙이기

배틀 전에 인사말을 넣거나, 승리 후 대화가 끝나면 보상을 주도록 만들 수 있습니다. [조건과 배틀 후 액션](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon)에서 설정합니다.

한 번 이긴 플레이어의 재대전 가능 여부와 대기 시간은 [조우와 재대전](#drm-cobblemon-editor/cobblemon-encounters-rematches)에서 정합니다.

## 여러 기능을 한 NPC에 넣을 때

양손을 비운 우클릭으로 대화·상점이 먼저 열릴 수 있습니다. 전투로 연결할 대화에는 **go_battle** 액션을 넣습니다. 다른 역할도 적용되어 전용 화면이 안 열리면 **Shift+우클릭**으로 접근합니다.

처음 만든 역할은 각각 다른 NPC에 적용하면 어떤 화면이 열리는지 알기 쉽습니다.

## 설치 환경

**Minecraft 1.21.1의 Fabric 또는 NeoForge**용입니다. DRM과 Cobblemon이 필요하며 NPC 역할에는 DNPC 또는 CustomNPCs를 사용합니다. [설치 표](#drm-cobblemon-editor/cobblemon-editor-setup)에서 필요한 버전을 확인하세요.
