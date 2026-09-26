---
title: 히트박스 모양과 피해 조정
slug: battleworks-hitboxes
order: 235
description: 칼의 범위와 판정 위치를 맞추고 공유 피해·배율·상태 효과·반복 판정을 설정합니다.
product: mob-editor
section: authoring
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 히트박스는 실제 피해를 검사하는 공간입니다

모델에 검이 보이거나 애니메이션이 재생되어도 그 자체로 BattleWorks 피해가 생기지는 않습니다. **Hitbox Library의 판정 정의**를 **패턴의 Hitbox 액션**에 연결해야 합니다.

처음에는 [첫 공격 실습](#mob-editor/battleworks-first-attack)의 히트박스를 사용하고, 다음 순서로 수정하세요.

## 1. 사용하는 히트박스부터 열기

1. Pattern Workbench에서 수정할 패턴을 고릅니다.
2. Action 단계의 Hitbox 행을 선택합니다.
3. **Edit this hitbox**를 누릅니다.
4. Hitbox Library에서 이름과 참조 위치를 확인합니다.
5. **Pattern:**으로 이 히트박스를 사용하는 패턴·액션을 선택합니다.
6. 돌아갈 때는 **Edit pattern**을 사용합니다.

이 순서를 쓰면 이름이 비슷한 다른 히트박스를 잘못 수정하는 일을 줄일 수 있습니다. 아직 패턴에 연결하지 않은 히트박스도 모양과 클립을 미리 볼 수 있지만, 실제 실행 시점은 연결한 액션에서 정합니다.

## 2. 공격에 맞는 모양 고르기

| Shape | 모양 | 주로 조절할 값 | 시작 용도 |
| --- | --- | --- | --- |
| Box | 회전 가능한 직육면체 | Width, Height, Depth | 전방 찌르기 |
| Sphere | 구 | Radius | NPC 주변의 원형 범위 공격 |
| Cylinder | 수직 원기둥 | Radius, Height | 바닥 장판이나 세로 범위 |
| Capsule | 끝이 둥근 수직 기둥 | Thickness, Height | 좁은 기둥 판정 |
| Sweep | 굵기가 있는 연결 경로 | Radius, Thickness, 각도, Sweep Steps | 검을 휘두르는 호 |
| Polygon | 평면 다각형에 높이를 준 모양 | 3개 이상의 점, Height | 불규칙한 바닥 영역 |

**Sweep Steps**는 자동 곡선을 구성하는 점 수입니다. 공격 횟수나 초당 타격 수가 아닙니다. 직접 Points를 넣은 Sweep은 자동 원호 대신 그 경로를 사용합니다.

## 3. 크기와 위치를 따로 맞추기

먼저 Yaw와 Pitch를 `0`으로 두고 크기부터 맞춥니다. 그다음 Offset을 바꾸세요.

| 값 | 의미 | 예 |
| --- | --- | --- |
| Width / Height / Depth | 판정 자체의 가로·세로·앞뒤 크기 | Box의 Depth를 키우면 앞뒤로 길어짐 |
| Radius | 반지름 또는 Sweep의 도달 거리 | Sphere의 Radius 2는 지름 약 4 |
| Thickness | Sweep 경로의 굵기 / Capsule 반지름 | 올리면 경로 주변 판정이 넓어짐 |
| Offset X | NPC 방향 기준 좌우 이동, 양수는 왼쪽 | 왼손 무기 쪽으로 위치 조절 |
| Offset Y | 일반 NPC 히트박스 중심에서 위아래 이동 | 0은 NPC 높이의 중간 기준 |
| Offset Z | NPC 방향 기준 앞뒤 이동, 양수는 앞 | 앞으로 찌르는 Box를 전방에 배치 |
| Yaw / Pitch | 판정의 수평 회전 / 기울기 | 대각선 베기 방향 맞추기 |

일반 Hitbox의 중심 높이는 **NPC 발 위치 + NPC 높이의 절반 + Offset Y**입니다. Offset Y를 무조건 1로 넣으면 이미 중앙에 있던 판정이 더 올라갑니다. 키가 큰 모델은 실제 미리보기로 맞추세요.

### 전방 찌르기 실습

1. 새 히트박스를 만들고 Shape를 **Box**로 고릅니다.
2. Width `0.8`, Height `1.5`, Depth `2.8`을 입력합니다.
3. Offset X `0`, Offset Y `0`, Offset Z `1.8`로 둡니다.
4. Damage `4`, Locked Target Only On으로 시작합니다.
5. Action의 Hitbox 액션에 연결하고 전방으로 길게 표시되는지 봅니다.
6. 실제 NPC 앞·옆에 각각 서서 전방 공격으로 동작하는지 확인합니다.

이 숫자는 일반 인간형 NPC용 출발점입니다. 모델 크기나 무기 길이를 바꾸면 범위도 다시 맞춥니다.

## 4. 공유 피해와 액션 배율 이해하기

```text
설정 피해 = Hitbox Library의 Damage × 액션의 Damage Multiplier
예: 4 × 1.5 = 6
```

같은 히트박스를 두 패턴이 사용한다면 라이브러리 Damage를 바꿀 때 두 패턴 모두 영향을 받습니다. 한 패턴만 강하게 만들려면 해당 액션의 배율을 바꾸거나 별도 히트박스를 만드세요.

이 값은 방어구·저항·피해 무적 시간·다른 모드의 계산 **이전 값**입니다. Damage 4를 넣었다고 화면에서 항상 체력이 정확히 4 줄어드는 것은 아닙니다.

Knockback은 타격 성공 후 밀어내는 정도입니다. 범위가 맞는지 확인하기 전에는 크게 올리지 마세요.

## 5. 타겟 제한과 상태 효과

**Locked Target Only**는 현재 타겟이 있을 때 그 타겟으로 판정을 좁힙니다. 해제하면 주변의 다른 생명체도 범위에 들어올 수 있습니다. 액션 쪽에서 제한을 켤 수 있지만, 라이브러리에서 켜 둔 제한을 액션에서 끄는 방식으로 풀 수는 없습니다.

상태 효과를 붙이려면 Effect ID, Amplifier, Effect Duration을 설정합니다. 예를 들어 실제 등록된 `minecraft:slowness`, Amplifier `0`, Duration `40`은 감속 I을 약 2초 요청합니다. Amplifier는 0부터 시작합니다.

Damage 0과 상태 효과를 조합한 판정도 가능하지만, 효과가 없는 피해 0 히트박스에는 “피해 없음” 경고가 표시될 수 있습니다.

## 6. 반복 판정 정책 선택하기

0.1.3의 Hitbox 액션에는 **Hit Policy**가 있습니다.

| 값 | 의미 | 예 |
| --- | --- | --- |
| unlimited | BattleWorks의 추가 재타격 제한 없음 | 이전 문서 동작 유지 |
| once_per_pattern | 해당 액션이 한 패턴 안에서 같은 대상을 한 번만 성공 처리 | 오래 유지되는 한 번의 베기 |
| once_per_repeat | 해당 액션의 각 반복 회차에서 대상당 한 번 | 회차별 타격 |
| cooldown | 같은 액션이 같은 대상을 다시 처리하기 전 틱 제한 | 여러 틱에 걸친 장판 |
| targetCooldownTicks | cooldown 정책의 간격 | 10이면 약 0.5초 |

성공한 피해·효과만 기억에 기록합니다. **이 기억은 액션별**이므로 같은 패턴에 별도 Hitbox 액션 두 개를 넣으면 서로 독립적인 타격 시도가 됩니다. 모든 액션의 피해가 자동으로 하나로 합쳐지지는 않습니다. 바닐라 피해 무적 시간도 계속 적용됩니다.

## 7. 모델 모션과 맞추기

1. Hitbox Library의 **Pattern:**에서 사용할 위치를 고릅니다.
2. Action 단계와 모델에 맞는 클립을 고릅니다.
3. Play를 누르고 속도를 낮춰 칼이 닿는 순간을 찾습니다.
4. Edit pattern으로 돌아가 Event Tick을 그 순간에 맞춥니다.
5. 다시 미리 보고 저장·적용합니다.
6. 생존 테스트에서 NPC 앞·옆·뒤·높이가 다른 위치를 확인합니다.

히트박스가 너무 높으면 Offset Y, 옆으로 치우치면 Offset X / Yaw, 전방에 닿지 않으면 Offset Z / 모양의 크기 / 공격 시작 거리를 확인합니다. 모션 연결은 [애니메이션 안내](#mob-editor/battleworks-animation)에서 이어집니다.
