---
title: 첫 근접 공격 따라 만들기
slug: battleworks-first-attack
order: 225
description: 제작 보조로 공격 하나를 만들고 피해·타이밍·추적을 직접 확인하는 실습입니다.
product: mob-editor
section: start
category: BattleWorks
status: 사용 안내
version: 0.1.6
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - tutorial
  - combat
---

## 이번 실습의 완성 모습

연습 검사가 플레이어에게 접근하고, 약 1.2초 준비한 뒤 전방을 베고, 회복 동작을 거쳐 다시 공격합니다. **DNPC의 일반 플레이어 모델**로 시작합니다. 아래 새 화면은 BattleWorks 0.1.6 / DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1에서 확인했습니다. Gecko나 모디드 엔티티 모델은 [애니메이션 안내](#mob-editor/battleworks-animation)에 따라 별도로 클립을 연결하세요.

먼저 [설치와 NPC 준비](#mob-editor/mob-editor-setup)를 마치고, NPC를 대상으로 BattleWorks를 엽니다. 아래 수치는 실습용 시작점이며 모든 보스의 정답은 아닙니다.

## 1. 새 문서 만들기

1. **Create New**로 새 문서를 만듭니다.
2. 문서 이름을 알아보기 쉽게 정하고 **Enabled**를 켭니다.
3. 이미 다른 패턴이 있다면 이번 실습에서는 사용하지 않을 패턴의 Enabled를 끕니다.
4. **Pattern Build Assist**를 엽니다.

기존 보스를 편집 중이라면 먼저 Save As로 별도 연습 파일을 만드세요.

## 2. 제작 보조의 질문에 답하기

| 질문 | 이번 실습에서 고를 항목 |
| --- | --- |
| Detail Level | Beginner |
| Attack Shape | Wide Sweep |
| Attack Tempo | Measured |

1. **Beginner → Wide Sweep → Measured**를 차례로 고릅니다. 답을 누르면 다음 질문으로 자동 이동합니다.
2. **Review Choices**에서 선택 내용을 확인합니다. 바꾸려면 왼쪽 질문을 다시 선택하거나 Edit Choices를 사용합니다.
3. **Create Pattern**을 누릅니다.

**완료 확인:** 패턴 목록에 새 패턴이 생기고 Hitbox Library에 연결된 히트박스가 생깁니다. 제작 보조는 기존 패턴을 교체하지 않고 새 패턴과 히트박스를 추가합니다.

![Pattern Build Assist에서 공격 형태를 고르는 화면.](assets/media/guides/battleworks-016-neo1211/battleworks-assist.png "BattleWorks 0.1.6 / NeoForge 1.21.1. 처음에는 Beginner로 시작하고 Wide Sweep과 Measured를 고릅니다. 앞선 답을 바꾸려면 질문 목록으로 돌아갑니다.")

## 3. 생성된 공격의 숫자 이해하기

| 위치 | 생성값 | 의미 |
| --- | --- | --- |
| Windup → Ticks | 24 | 약 1.2초의 준비 |
| Action → Ticks | 16 | 약 0.8초의 공격 단계 |
| Action의 Hitbox 이벤트 → Event Tick | 3 | Action 시작 3틱 후 판정 |
| Recovery → Ticks | 24 | 약 1.2초의 회복 단계 |
| Hitbox → Damage | 4 | 방어·무적 시간 적용 전 설정 피해 |
| 패턴 → Cooldown | 40 | 완료 후 같은 패턴 재사용까지 40틱 |
| Action → Animation | Main-Hand Swing | 일반 인간형 NPC의 기본 팔 휘두르기 |

세 단계 합계는 `64틱 = 약 3.2초`입니다. 타격은 표시상 `Windup 24 + Action 3 = 전체 27틱` 위치입니다. 반복 주기는 여기에 재사용 대기와 전투 대기가 영향을 줍니다.

![제작 보조로 만든 Wide Sweep 패턴과 24·16·24틱 타임라인.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Windup·Action·Recovery 세 구간과 27틱의 Hitbox 표시를 함께 봅니다. 패턴을 만든 결과 화면이며, 실제 피해 성공을 보여 주는 화면은 아닙니다.")

## 4. 첫 시험 후 공격 범위 좁히기

생성된 기본값의 Max Range는 `3.5`, Max Vertical은 `32`입니다. 먼저 이 상태로 저장·적용·전투를 확인해도 됩니다. 다음 값은 가까운 거리의 연습용으로 범위를 좁힐 때 사용합니다.

1. 새 패턴을 선택하고 **Core**에서 Min Range를 `0`, Max Range를 `2.7`로 설정합니다.
2. Max Vertical은 `2.5`로 시작합니다. 너무 큰 높이 차이에서는 공격을 시작하지 않게 하는 값입니다.
3. **Score**에서 Ideal Distance를 `2.0` 정도로 맞춥니다.
4. Action의 Hitbox 행을 선택하고 **Edit this hitbox**를 엽니다.
5. Wide Sweep의 Reach `2.4`, Thickness `0.5`, Damage `4`를 확인합니다.
6. **Locked Target Only**를 켜 이번 실습에서는 현재 타겟 중심으로 판정을 시험합니다.

Max Range는 **공격을 시작하는 거리**, Reach는 **Sweep 판정의 도달 거리**입니다. Max Range만 10으로 올려도 칼이 10블록까지 닿지는 않습니다.

## 5. 준비 중에는 멈추고 타겟을 바라보게 하기

1. Windup, Action, Recovery를 각각 선택합니다.
2. 세 단계 모두 **Face Target**을 켭니다.
3. 처음에는 **Stop Horizontal**을 켜고 Movement를 **Hold**로 둡니다.
4. Action에는 생성된 기본 팔 휘두르기를 유지합니다.
5. **Simulation** 또는 Hitbox Library의 **Play**로 모델 방향과 판정 위치를 봅니다.

미리보기의 모션 경고나 창이 열리지 않는 문제는 실제 전투 결과와 나누어 확인합니다. 모델이 보인다는 이유로 모션·판정이 맞았다고 판단하지 말고, 아래 서바이벌 시험에서 실제 피해를 확인하세요.

## 6. 전투 규칙 설정하기

**Combat Rules → Combat**에서 다음을 맞춥니다.

| 항목 | 실습값 |
| --- | --- |
| Suppress Native Attacks | On |
| Chase Target | On |
| Face Between Patterns | On |
| Chase Speed Multiplier | 1.0 |
| Approach Distance | 2.0 |
| Scan Without Target | 이번 DNPC 실습은 On |

다른 생명체가 없는 연습장에서 시험합니다. Target Scan Range `16`, Awareness FOV `360`으로 시작하면 방향 때문에 타겟을 놓치는지 구분하기 쉽습니다. 이 탐색은 주변의 다른 생명체를 고를 수 있으므로 우호 NPC가 있는 운영 공간에 그대로 적용하지 않습니다. 지원되는 구버전 CustomNPCs에서 팩션 타겟을 공급한다면 보조 탐색을 끄는 별도 구성을 사용할 수 있습니다.

**Combat Rules → Manager**의 Same Pattern Penalty는 첫 실습에서 `1.0`으로 둡니다. 패턴이 하나뿐인데 `0`으로 두면 직전 패턴 점수가 0이 되어 다음 공격 후보가 없어질 수 있습니다.

## 7. 파일 저장 후 NPC에 적용하기

1. **Save As**에 `training/first_sword.json`을 입력하고 확인창의 **Save**로 저장합니다.
2. NPC를 대상으로 연 상태라면 **Save**를 눌러 현재 작업 파일을 NPC에 연결합니다.
3. NPC 없이 작업했다면 Core로 연습 NPC를 선택하고 적용 목록에서 같은 파일을 적용합니다.
4. 에디터를 닫습니다.

같은 조합에서 실제 UI로 저장하고 피해까지 확인한 [first_sword.json](./assets/media/battleworks/first_sword.json)을 내려받아 `config/dochi_rpg_maker/mobs/patterns/training/`에 두고 Load할 수도 있습니다. 이 파일은 생성 기본 공격에 Scan Range 16·FOV 360·Same Pattern Penalty 1.0을 적용한 버전이며, 위 4절의 선택 조정 전 값입니다.

## 8. 실제 전투 시험하기

1. 생존 모드에서 NPC로부터 약 6블록 떨어집니다.
2. Scan Without Target가 켜져 있고 주변에 다른 생명체가 없는지 확인합니다.
3. NPC가 다가오는지 확인합니다.
4. 가까이 서서 준비 → 타격 → 회복 순서가 보이는지 확인합니다.
5. 다음 공격 때 옆으로 이동해 시선과 판정 방향을 확인합니다.
6. 다시 멀어져 추적이 재개되는지 확인합니다.

| 기대한 결과가 안 나올 때 | 먼저 볼 곳 |
| --- | --- |
| NPC가 전혀 반응하지 않음 | 생존 모드, 적대 타겟, 문서 Enabled, 적용 파일 |
| 다가오지만 공격하지 않음 | 패턴 Enabled, Max Range, 쿨다운, Same Pattern Penalty |
| 팔은 움직이지만 피해가 없음 | Hitbox 연결, Event Tick, Damage, 판정 높이·방향 |
| 타이밍 밖에서도 공격함 | Suppress Native Attacks, 기존 CustomNPC 전투 스크립트 |
| 피해가 4로 고정되지 않음 | 방어구·피해 무적 시간·다른 모드의 피해 처리 |

![전투 파일을 저장하고 NPC에 연결한 뒤의 Combat 설정.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Saved. Warnings: 0과 Scan Without Target·Scan Range 16·FOV 360을 확인합니다. 서버 파일은 mobs/patterns/training/first_sword.json에 저장되었습니다.")

![Wide Sweep을 적용한 DNPC 앞에서 피해를 받은 서바이벌 플레이어.](assets/media/guides/battleworks-016-neo1211/battleworks-first-fight.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. 방어구 없는 플레이어의 서버 체력이 20에서 12로 줄었습니다. 다른 몹 생성과 자연 회복을 제외한 촬영 월드에서 NPC의 타겟도 해당 플레이어인지 확인했습니다. 이 합계가 한 번의 공격 피해라는 뜻은 아닙니다.")

![Wide Sweep을 서바이벌 플레이어에게 실행하고 체력 변화를 확인하는 과정.](assets/media/guides/short-videos-20261106/battleworks-first-attack.mp4 "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. 서버에서 체력 20→16을 확인했습니다.")

## 9. 한 가지씩 바꾸며 배우기

첫 번째 비교에서는 Windup만 `24 → 40`으로 바꿉니다. 저장·적용 후 준비 시간이 약 0.8초 늘어나는지 봅니다. 두 번째 비교에서는 원래대로 돌린 뒤 Damage만 `4 → 2`로 낮춥니다. 세 번째 비교에서는 Event Tick만 `3 → 8`로 옮겨 모션과 판정의 차이를 봅니다.

여러 값을 한 번에 바꾸면 어떤 설정의 영향인지 알기 어렵습니다. 성공한 원본은 보관하고, 다음 [작업 화면과 타임라인](#mob-editor/mob-editor-patterns)에서 직접 액션을 추가해 보세요.
