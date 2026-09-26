---
title: 첫 근접 공격 따라 만들기
slug: battleworks-first-attack
order: 225
description: 제작 보조로 공격 하나를 만들고 피해·타이밍·추적을 직접 확인하는 실습입니다.
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

## 이번 실습의 완성 모습

연습 검사가 플레이어에게 접근하고, 약 1.2초 준비한 뒤 전방을 베고, 회복 동작을 거쳐 다시 공격합니다. **일반 인간형 NPC**를 사용합니다. Gecko나 모디드 엔티티 모델은 [애니메이션 안내](#mob-editor/battleworks-animation)에 따라 별도로 클립을 연결하세요.

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

1. 각 질문의 답을 고르고 **Next**로 진행합니다.
2. **Review Choices**에서 선택 내용을 확인합니다. 바꾸려면 왼쪽 질문을 다시 선택하거나 Edit Choices를 사용합니다.
3. **Create Pattern**을 누릅니다.

**완료 확인:** 패턴 목록에 새 패턴이 생기고 Hitbox Library에 연결된 히트박스가 생깁니다. 제작 보조는 기존 패턴을 교체하지 않고 새 패턴과 히트박스를 추가합니다.

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

## 4. 공격 범위를 가까운 거리로 맞추기

1. 새 패턴을 선택하고 **Core**에서 Min Range를 `0`, Max Range를 `2.7`로 설정합니다.
2. Max Vertical은 `2.5`로 시작합니다. 너무 큰 높이 차이에서는 공격을 시작하지 않게 하는 값입니다.
3. **Score**에서 Ideal Distance를 `2.0` 정도로 맞춥니다.
4. Action의 Hitbox 행을 선택하고 **Edit this hitbox**를 엽니다.
5. Wide Sweep의 Radius `2.4`, Thickness `0.5`, Damage `4`를 확인합니다.
6. **Locked Target Only**를 켜 이번 실습에서는 현재 타겟 중심으로 판정을 시험합니다.

Max Range는 **공격을 시작하는 거리**, Radius는 **피해를 검사하는 모양의 크기**입니다. Max Range만 10으로 올려도 칼이 10블록까지 닿지는 않습니다.

## 5. 준비 중에는 멈추고 타겟을 바라보게 하기

1. Windup, Action, Recovery를 각각 선택합니다.
2. 세 단계 모두 **Face Target**을 켭니다.
3. 처음에는 **Stop Horizontal**을 켜고 Movement를 **Hold**로 둡니다.
4. Action에는 생성된 기본 팔 휘두르기를 유지합니다.
5. **Simulation** 또는 Hitbox Library의 **Play**로 모델 방향과 판정 위치를 봅니다.

**완료 확인:** 미리보기에서 NPC 앞쪽에 베기 판정이 표시됩니다. 실제 플레이어에게 피해가 들어가지 않는 것이 정상입니다.

## 6. 전투 규칙 설정하기

**Combat Rules → Combat**에서 다음을 맞춥니다.

| 항목 | 실습값 |
| --- | --- |
| Suppress Native Attacks | On |
| Chase Target | On |
| Face Between Patterns | On |
| Chase Speed Multiplier | 1.0 |
| Approach Distance | 2.0 |
| Scan Without Target | CustomNPCs 적대 설정을 쓸 때 Off |

**Scan Without Target를 켜는 경우:** 다른 생명체가 없는 연습장에서 보조 탐색을 시험할 때만 사용합니다. Target Scan Range `16`, Awareness FOV `360`으로 시작하면 방향 때문에 타겟을 놓치는지 구분하기 쉽습니다. 이 탐색은 CustomNPCs 팩션 적대 필터와 동일하지 않습니다.

**Combat Rules → Manager**의 Same Pattern Penalty는 첫 실습에서 `1.0`으로 둡니다. 패턴이 하나뿐인데 `0`으로 두면 직전 패턴 점수가 0이 되어 다음 공격 후보가 없어질 수 있습니다.

## 7. 파일 저장 후 NPC에 적용하기

1. **Save As**에 `training/first_sword.json`을 입력하고 저장합니다.
2. NPC를 대상으로 연 상태라면 **Save**를 눌러 현재 작업 파일을 NPC에 연결합니다.
3. NPC 없이 작업했다면 Core로 연습 NPC를 선택하고 적용 목록에서 같은 파일을 적용합니다.
4. 에디터를 닫습니다.

완성된 구조를 비교하고 싶다면 [실습용 전투 JSON](./assets/media/battleworks/training_swordsman.json)을 저장해 `mobs/patterns/training/`에 두고 Load하세요. 브라우저에서 내용이 열리면 파일로 저장합니다. 이 예제는 보조 탐색이 꺼져 있으므로 CustomNPCs가 적대 타겟을 정해야 합니다. JSON 내용 설명은 [JSON 참고](#mob-editor/battleworks-json-reference)에 있습니다.

## 8. 실제 전투 시험하기

1. 생존 모드에서 NPC로부터 약 6블록 떨어집니다.
2. CustomNPCs가 플레이어를 적대 타겟으로 잡게 합니다.
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

## 9. 한 가지씩 바꾸며 배우기

첫 번째 비교에서는 Windup만 `24 → 40`으로 바꿉니다. 저장·적용 후 준비 시간이 약 0.8초 늘어나는지 봅니다. 두 번째 비교에서는 원래대로 돌린 뒤 Damage만 `4 → 2`로 낮춥니다. 세 번째 비교에서는 Event Tick만 `3 → 8`로 옮겨 모션과 판정의 차이를 봅니다.

여러 값을 한 번에 바꾸면 어떤 설정의 영향인지 알기 어렵습니다. 성공한 원본은 보관하고, 다음 [작업 화면과 타임라인](#mob-editor/mob-editor-patterns)에서 직접 액션을 추가해 보세요.
