---
title: Dochi's Battleworks 소개
slug: mob-editor-overview
order: 210
description: NPC 전투 스펙을 만들고 적용하는 배틀워크의 기본 구조입니다.
product: mob-editor
section: start
category: Battleworks
status: 사용 안내
version: 0.1.2
audience: 전투 콘텐츠 제작자
tags:
  - battleworks
  - CustomNPCs
  - combat
---

## 배틀워크로 만드는 것

Dochi's Battleworks는 **Minecraft Forge 1.20.1용 DRM 전투 제작 애드온**입니다. CustomNPCs NPC에 적용할 전투 스펙을 게임 안에서 작성합니다. 공격 패턴을 먼저 만들고, 그 안에 히트박스 판정·스킬·이동·애니메이션 타이밍을 배치합니다.

이 문서는 Battleworks 0.1.2의 제작자용 에디터를 설명합니다. 플레이어가 전투 중 보는 HUD나 GUI Maker의 화면 레이아웃 편집기가 아닙니다. 기존 Mob Editor 문서 주소는 유지하지만 현재 모드와 메뉴 이름은 Battleworks입니다.

## 세 화면의 역할

| 화면 | 하는 일 |
| --- | --- |
| Pattern Workbench | 패턴 목록에서 공격을 선택하고 Windup, Action, Recovery에 세부 액션과 실행 시점을 배치합니다. |
| Hitbox Library | 재사용 히트박스의 모양·피해·위치를 편집하고 NPC 모델, 클립 목록, Play/Stop으로 미리 봅니다. |
| Combat Rules | 패턴 선택 점수, 전투 대기와 추적, 체력 페이즈, 사망 타임라인을 설정합니다. |

모델 미리보기는 **Hitbox Library**에 있습니다. Pattern Workbench는 액션 타임라인을 넓게 사용합니다.

## 작업 단위

| 단위 | 의미 |
| --- | --- |
| Battlework | NPC에 적용하는 전투 문서 한 개. 패턴, 히트박스, 전투 규칙을 담습니다. |
| Pattern | 실행 조건과 준비·실행·회복 단계를 가진 행동 한 개입니다. |
| Stage | Windup, Action, Recovery 중 한 단계입니다. 길이, 이동, 시선, 애니메이션을 설정합니다. |
| Timed actions | 같은 시점·반복 조건으로 실행할 세부 액션 묶음입니다. |
| Hitbox | 여러 패턴에서 참조하는 판정 모양과 피해 정의입니다. 애니메이션 파일이 아닙니다. |

히트박스를 한 번 만들어 두고 여러 패턴이 서로 다른 시점에 사용하게 할 수 있습니다. 같은 틱에 있는 여러 액션도 각각의 이름 있는 행으로 선택합니다.

## 먼저 읽을 문서

1. [설치와 NPC 적용](#mob-editor/mob-editor-setup)
2. [패턴과 히트박스](#mob-editor/mob-editor-patterns)
3. [모델별 애니메이션](#mob-editor/battleworks-animation)
4. [추적과 시선](#mob-editor/mob-editor-detection-patrol)
5. [파일과 테스트 샘플](#mob-editor/battleworks-files)

필수 모드는 **CustomNPCs와 DRM**입니다. Better Combat, GeckoLib, Player Animator, Iron's Spells 'n Spellbooks 등은 해당 연동을 사용할 때만 필요합니다.


## 0.1.2 보스 전투 제작

마법, 걷기, 대시, 순간이동, 패시브 반응, 대사와 전투 음악을 조합합니다. 설정 방법과 액션 확률, 수정한 파일 적용은 [보스 전투 제작 안내](#mob-editor/battleworks-encounters)를 참고하세요.

0.1.2에는 **Pattern Build Assist**, 드래그·크기 조절이 가능한 **Simulation** 패널, 전투·GUI·팝업 훈련 샘플이 추가되었습니다. 에디터 배치, 선택 목록, 사운드 설정, 전투 방향 전환, 대상 추적, 히트박스 미리보기와 애니메이션 재생도 개선되었습니다. 클라이언트와 서버에는 같은 0.1.2 버전을 설치해야 합니다.
