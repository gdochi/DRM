---
title: 무기 설정과 전투 AI
slug: tacz-weapons-ai
order: 330
description: 명중률, 발사 빈도, 표적 선택, 근접 fallback 같은 핵심 설정을 다룹니다.
product: cnpc-tacz-fire
category: 총기 AI
status: 베타
version: 0.1.x
audience: 총기 NPC 제작자
tags:
  - weapon
  - ai
  - targeting
---

## 자주 조절하는 항목

| 설정 | 의미 | 팁 |
| --- | --- | --- |
| Accuracy | 실제 명중 편차 | 너무 높으면 인간적인 느낌이 사라집니다. |
| Fire Frequency | 발사 간격 | RPM과 구분해서 생각해야 합니다. |
| Reload | 재장전 사용 여부 | 탄창 모드와 함께 테스트합니다. |
| Stance | 전투 자세 | Auto와 Ranged 저장 여부를 점검합니다. |

## 표적 선택

- 기본 적대 대상을 그대로 쓸지,
- 태그 기준으로 같은 팩션도 예외적으로 공격하게 할지,
- 엔티티 ID나 팩션 기반으로 제한할지,
- 보스 호출용 신호처럼 팀 단위 전투를 만들지
먼저 정하는 편이 좋습니다.

## 근접 fallback

총기를 쓰는 NPC라도 거리나 탄약 상황에 따라 근접 전투로 넘어갈 수 있습니다. 이때는 **탐지 거리**와 **근접 무기 거리**를 혼동하지 않도록 주의합니다.
