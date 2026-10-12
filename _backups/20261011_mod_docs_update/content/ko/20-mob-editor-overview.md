---
title: Dochi's BattleWorks 시작 안내
slug: mob-editor-overview
order: 210
description: 설치부터 첫 공격, 보스 패턴과 파티클 제작까지 따라가는 학습 순서입니다.
product: mob-editor
section: start
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - tutorial
  - combat
---

## 먼저 무엇을 만들까요?

BattleWorks는 **CustomNPCs NPC가 언제, 어떻게 공격할지 만드는 Forge 1.20.1용 DRM 애드온**입니다. “플레이어에게 다가간다 → 잠깐 준비한다 → 칼을 휘두르며 피해를 준다 → 쉬었다가 다시 고른다”를 게임 안에서 작성합니다.

이 안내는 **BattleWorks 0.1.3, DRM 0.1.7 이상**의 Forge 소스를 기준으로 합니다. 기존 `mob-editor` 문서 주소는 계속 사용할 수 있습니다. 게임 안에서는 BattleWorks 이름을 찾으세요.

처음에는 일반 인간형 NPC로 느린 근접 공격 하나를 완성하세요. JSON을 직접 작성하거나 마법·모델 모드를 추가할 필요 없이 시작할 수 있습니다.

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

| 만들 내용 | 설정하는 곳 | 예시 |
| --- | --- | --- |
| NPC의 체력·장비·팩션·드롭·리스폰 | CustomNPCs | 최대 체력 100인 적대 검사 |
| NPC 모델·텍스처·애니메이션 자산과 기본 동작 연결 | DRM의 NPC Basic | 일반 인간형 또는 Gecko 모델 |
| 공격 순서·판정·추적·이동·페이즈 | BattleWorks | 준비 24틱 후 전방 베기 |
| 별도 파티클 연출 파일 | Visual → Particle Maker | 바닥에서 커지는 원형 예고 |
| 팝업 모양과 대사 표시 | DRM의 Popup Maker와 관련 GUI | 보스 대사, 전투 안내 |

BattleWorks의 문서 이름을 바꿔도 NPC의 머리 위 이름이나 최대 체력이 자동 변경되지는 않습니다. 검을 쥐여 주는 것과 Hitbox의 피해를 설정하는 것도 각각의 작업입니다.

고급 전투 파일은 `npcStats`를 켜 일부 능력치를 덮어쓸 수 있습니다. 첫 실습에서는 이 기능을 끄고 CustomNPCs 기본 설정을 사용합니다. 외부 파일을 가져올 때는 [고급 능력치 설정](#mob-editor/battleworks-advanced-actions)도 확인하세요.

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
