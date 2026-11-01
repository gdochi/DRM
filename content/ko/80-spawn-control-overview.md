---
title: 정한 장소와 시간에 몹 등장시키기
slug: dochi-spawn-control-overview
order: 810
description: 자연 스폰 규칙이나 설치형 스포너로 몹·NPC의 등장을 정합니다.
product: dochi-spawn-control
category: 개요
section: overview
status: Draft
version: 0.1.4
audience: 서버 운영자와 모드팩 제작자
tags:
  - spawn control
  - natural spawn
  - forge
---

![자연 스폰 규칙을 만드는 Spawn Control.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. 왼쪽은 등장 대상, 가운데는 그 대상의 규칙, 오른쪽은 선택 규칙의 조건입니다. 설치형 스포너를 만들 때는 위 Placed Spawners로 다른 편집기를 엽니다.")

## 두 방식 중 하나로 시작하세요

| 만들고 싶은 상황 | 사용할 것 |
| --- | --- |
| 밤의 숲에 특정 몹이 나타남 | 자연 스폰 규칙 |
| 던전의 한 지점에서 몹이 반복 등장 | 배치형 스포너 |
| 완성한 경비병이 초소에 등장 | 저장한 DNPC 템플릿 |

자연 스폰은 플레이어 주변에서 조건을 검사합니다. 배치형 스포너는 설치한 블록 주변에서 작동합니다.

## 자연 스폰을 바꾸려면

기본 **K**로 스폰 컨트롤을 열고 왼쪽에서 몹을 고릅니다. **규칙 추가**를 누른 뒤 장소·시간·등장 수를 정하고 저장합니다.

같은 좀비라도 ‘숲의 밤’과 ‘동굴’ 규칙을 따로 만들 수 있습니다. 돼지에 만든 규칙은 소에게 적용되지 않습니다.

[첫 자연 스폰 규칙](#dochi-spawn-control/dochi-spawn-control-setup)을 따라 해보세요.

## 스포너를 설치하려면

DRM 에디터 선택 화면에서 **Spawner Editor**를 열고 소환할 몹·조건을 정합니다. **Get Spawner**로 블록을 받아 설치한 뒤 저장한 설정을 적용합니다.

[스포너 만들기](#dochi-spawn-control/dochi-spawn-control-spawner)에서 순서대로 설명합니다.

## 원래 나오던 몹도 계속 나오나요?

**원본 스폰 ON**이면 원래 게임의 스폰과 내가 만든 규칙이 함께 작동합니다. 내가 만든 규칙만 쓰고 싶으면 **원본 스폰 OFF**로 바꿉니다.

이 스위치는 자연 스폰을 바꿉니다. 명령어·번식·다른 스포너로 생성하는 몹까지 막지는 않습니다.

## NPC와 탈것

DNPC의 외형·장비까지 그대로 등장시키려면 [NPC 템플릿](#dochi-spawn-control/spawn-control-npc-templates)을 사용합니다. [저장한 탈것](#dochi-spawn-control/spawn-control-vehicles)도 소환할 수 있습니다.

일반 몹의 자연 스폰에는 DRM이나 NPC 모드가 필요하지 않습니다. NPC·탈것을 선택할 때 해당 모드를 추가합니다.
