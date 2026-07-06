---
title: Mob Editor 개요
slug: mob-editor-overview
order: 210
description: DRM Mob Editor가 다루는 전투 설계 범위와 핵심 개념입니다.
product: mob-editor
category: 개요
status: 베타
version: 0.1.x
audience: 전투 콘텐츠 제작자
tags:
  - mob editor
  - combat
  - overview
---

## Mob Editor가 하는 일

DRM Mob Editor는 **CNPC 기반 적 전투를 에디터 방식으로 설계**하기 위한 애드온 문서 트랙입니다. 목표는 스크립트에 직접 매달리지 않고, 패턴과 조건을 조합해서 전투를 만드는 것입니다.

| 영역 | 설명 |
| --- | --- |
| 패턴 | 공격 타이밍, 히트박스, 투사체, 이동을 묶어서 설계합니다. |
| 애니메이션 | 공격 또는 대기 상태와 패턴 타이밍을 연결합니다. |
| 전투 조건 | 체력, 거리, 타겟 상태, 페이즈 전환 등을 기준으로 분기합니다. |
| 반응형 전투 | 패링, 경직, 추적, 재타겟팅 같은 반응을 설계합니다. |

## 추천 독자

- 보스형 NPC를 만들고 싶은 제작자
- 일반 몹보다 복잡한 전투 패턴을 구성하려는 서버 운영자
- Better Combat, GeckoLib, Iron's Spellbooks 같은 모드와 연계를 고려하는 제작자

:::tip 방향
Mob Editor 문서는 **패턴 설계**와 **전투 흐름 분리**를 가장 중요한 원칙으로 둡니다.
:::
