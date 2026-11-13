---
title: Dochi's BattleWorks 시작 안내
slug: mob-editor-overview
order: 210
description: 설치부터 첫 공격, 보스 패턴과 파티클 제작까지 따라가는 학습 순서입니다.
product: mob-editor
section: start
category: BattleWorks
status: 사용 안내
version: 0.1.7
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - tutorial
  - combat
---

## 먼저 무엇을 만들까요?

BattleWorks **0.1.7**에서는 NPC 공격의 시간, 히트박스, 이동과 보스 페이즈를 만듭니다. Forge 1.20.1, Fabric / NeoForge 1.21.1, 별도 Fabric / NeoForge 26.3 빌드 중 환경에 맞는 파일을 사용하세요.

**DRM은 선택 연동입니다.** 배틀워크스 완드로 편집기를 열어 NPC 없이 파일을 만들 수 있습니다. 실제 전투에는 DNPC 같은 지원 NPC가 필요합니다. 이전 버전의 CustomNPCs 연동은 선택 사항으로 유지되며, 26.3 이상에서는 지원하지 않습니다.

빠르게 시작하려면 [간단 편집과 공격 레시피](#mob-editor/battleworks-authoring)를, 값을 직접 배우려면 아래 첫 공격 실습을 따라가세요. 일반 인간형의 기본 팔 휘두르기와 히트박스에는 별도 마법·애니메이션 모드가 필요하지 않습니다.

## 처음 배우는 사람의 진행 순서

| 순서 | 따라 할 문서 | 이 단계의 완료 기준 |
| --- | --- | --- |
| 1 | [설치와 NPC 준비](#mob-editor/mob-editor-setup) | NPC를 대상으로 BattleWorks 화면을 열 수 있습니다. |
| 2 | [첫 근접 공격 실습](#mob-editor/battleworks-first-attack) | NPC가 접근하고, 준비한 뒤 한 번 공격합니다. |
| 3 | [작업 화면과 타임라인](#mob-editor/mob-editor-patterns) | 원하는 액션을 골라 타격 시점을 바꿀 수 있습니다. |
| 4 | [히트박스 제작](#mob-editor/battleworks-hitboxes) | 공격 범위·위치·피해량을 따로 조정합니다. |
| 5 | [모델과 애니메이션](#mob-editor/battleworks-animation) | 선택한 모델의 공격 모션과 타격 순간을 맞춥니다. |
| 6 | [추적과 시선](#mob-editor/mob-editor-detection-patrol), [이동 액션](#mob-editor/battleworks-movement) | 접근·후퇴·대시가 공격 타이밍과 충돌하지 않습니다. |
| 7 | [패턴 선택과 페이즈](#mob-editor/mob-editor-phases), [패시브 반응](#mob-editor/battleworks-passives) | 여러 공격과 체력 변화에 따른 행동을 만듭니다. |
| 8 | [보스 제작 실습](#mob-editor/battleworks-encounters) | 지금까지 만든 기능을 한 전투로 연결합니다. |

마법과 연출은 [스킬·사운드·대사](#mob-editor/battleworks-skills-effects), 시각 효과는 [Particle Maker](#mob-editor/battleworks-particles), 소환·지연 공격은 [고급 액션](#mob-editor/battleworks-advanced-actions)에서 이어갑니다.

## 어떤 설정을 어디서 하나요?

![간단 편집 속성과 공격 타임라인.](assets/media/guides/battleworks-017-20261113/simple-edit.png "BattleWorks 0.1.7 / NeoForge 1.21.1 / DRM 0.3.2 / DNPC 0.1.4. 기본 Basic Slash를 선택한 화면입니다. 편집 배치를 보여주며 레시피 생성이나 실제 피해를 증명하는 장면은 아닙니다.")

**패턴 작업실**에서 순서를, **히트박스 보관함**에서 피해 공간을, **전투 규칙**에서 타겟·페이즈·아레나를 설정합니다. **간단 편집**은 자주 쓰는 공격 값을 모아 보여주고, **상세 편집**은 기존 조건·이벤트·이동·애니메이션을 유지하면서 세부 설정을 엽니다. [레시피와 내 기술](#mob-editor/battleworks-authoring)로 시작점을 재사용할 수 있습니다.

| 작업 | 사용하는 편집기 |
| --- | --- |
| 이름, 기본 체력, 장비, 관계, 드롭, 리스폰 | DNPC 등 해당 NPC의 편집기 |
| 외형과 모델 | DNPC 외형 및 모델 또는 설치한 모델 제공자; DRM 모델은 DRM NPC Basic |
| 패턴, 히트박스, 전투 시간, 이동, 페이즈 | BattleWorks |
| 재사용하는 시각 효과 파일 | 단독 선택 화면의 Particle Maker 또는 DRM의 Visual |
| DRM 팝업과 대화 연출 | DRM의 팝업·GUI 도구 |

가져온 문서가 npcStats를 켜 두었다면 일부 전투 능력치를 덮어쓸 수 있습니다. 보스 파일 적용 뒤 체력이나 이동이 달라지면 이 설정도 확인하세요.

## 화면에서 쓰는 다섯 가지 말

| 용어 | 쉽게 이해하기 |
| --- | --- |
| Battlework / 전투 문서 | NPC 한 종류의 전투 설계 파일입니다. 여러 NPC가 같은 파일을 참조할 수 있습니다. |
| Pattern / 패턴 | “전방 베기”, “뒤로 피하기” 같은 행동 하나입니다. |
| Stage / 단계 | 한 패턴 안의 Windup, Action, Recovery입니다. |
| Timed actions / 이벤트 | 같은 시점과 반복 규칙을 공유하는 액션 묶음입니다. |
| Hitbox / 히트박스 | 피해를 검사할 공간의 모양입니다. 무기 모양 자체와는 별도로 맞춥니다. |

`20틱 = 약 1초`입니다. 서버가 정상 속도로 돌아갈 때의 기준이며, 10틱은 약 0.5초입니다.

## 처음부터 기억할 세 가지

1. **보이는 효과와 실제 피해는 따로 연결합니다.** 파티클이나 팔 휘두르기만 추가하면 Hitbox 피해가 생기지 않습니다.
2. **저장한 뒤 NPC에 적용합니다.** Save As는 파일을 만들며, NPC를 새 파일에 연결하는 단계가 별도로 필요합니다.
3. **Simulation 다음에는 실제 전투를 시험합니다.** 미리보기는 모델·이동·판정 위치를 보는 도구입니다. 실제 AI, 피해, 주문, 명령어와 사운드까지 실행하지 않습니다.

막히면 [문제 해결 순서](#mob-editor/battleworks-troubleshooting)에서 증상별 확인 절차를 따라가세요. 외부 파일을 사용한다면 [저장·백업·샘플](#mob-editor/battleworks-files)을 먼저 확인하세요.
