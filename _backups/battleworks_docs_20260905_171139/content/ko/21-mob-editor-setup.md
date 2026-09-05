---
title: Mob Editor 설치와 준비
slug: mob-editor-setup
order: 220
description: Mob Editor 작업 전에 점검할 환경과 준비 항목입니다.
product: mob-editor
category: 개요
status: 베타
version: 0.1.x
audience: 서버 운영자
tags:
  - setup
  - mods
  - environment
---

## 기본 환경

Mob Editor는 일반적으로 다음 요소와 함께 고려합니다.

| 항목 | 역할 |
| --- | --- |
| CustomNPCs | NPC 본체와 기본 이벤트 처리 |
| DRM Mob Editor | 전투 패턴 설계 애드온 |
| GeckoLib 계열 | 애니메이션 재생이 필요한 경우 |
| Better Combat | 패링 등 근접 전투 타이밍을 맞출 때 유리 |

## 작업 전 체크리스트

1. 테스트 전용 월드를 준비합니다.
2. 사용할 NPC 모델과 애니메이션 자산을 정리합니다.
3. 전투 거리, 공격 타입, 상태 이상 같은 규칙을 먼저 메모합니다.
4. 패턴 하나를 먼저 만들고 그 다음 페이즈와 분기를 붙입니다.

## 추천 개발 순서

- 1단계: 기본 대기 상태와 이동 상태 확인
- 2단계: 단일 공격 패턴 구현
- 3단계: 히트박스 타이밍과 애니메이션 동기화
- 4단계: 패턴 묶음과 페이즈 전환 추가
- 5단계: 패링, 경직, 반응형 로직 추가
