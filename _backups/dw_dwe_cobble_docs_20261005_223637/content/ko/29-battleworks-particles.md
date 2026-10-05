---
title: Particle Maker로 파티클 제작
slug: battleworks-particles
order: 274
description: NPC 없이 2초짜리 원형 효과를 만들고 명령어와 전투 타임라인에 연결합니다.
product: mob-editor
section: effects
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 이번 실습에서 만드는 것

약 2초 동안 원형 입자를 방출하는 효과를 만들고, Minecraft 명령어와 보스의 Windup에서 재생합니다. **Particle Maker의 결과는 시각 효과 파일**입니다. 피해는 별도 Hitbox나 스킬로 연결합니다.

0.1.3의 공용 Particle Maker는 **별도 `dochi.particles.v1` 파일**을 사용합니다. 예전 문서의 내장 `particleEffects` 방식과 구분하세요.

## 1. NPC 없이 편집기 열기

1. 크리에이티브에서 DRM Core로 에디터 선택 화면을 엽니다.
2. **Visual → Particle Maker**를 선택합니다.
3. 새 효과를 만들거나 **Load**에서 `particle_sample.json`을 불러옵니다.
4. 다른 이름으로 Save As하여 작업본을 만듭니다.

BattleWorks의 Particle Shape 액션에서도 **Open Particle Maker**로 같은 편집기를 열 수 있습니다. 이 경우 저장한 파일을 해당 액션에 연결하는 흐름으로 이어집니다.

## 2. 원형 레이어 만들기

| 위치 / 값 | 실습 입력 |
| --- | --- |
| Effect name | Training Ring |
| Duration (ticks) | 40 |
| + Layer | 레이어 1개 |
| Start tick / End tick | 0 / 39 |
| Interval (ticks) | 2 |
| Choose particle | minecraft:end_rod |
| Origin | Caster |
| Shape | Ring |
| Radius | 2.4 |
| Sample points | 24 |
| Count / point | 1 |
| Spread / Speed | 0 / 0 |
| Local Y | 0.05 |

1. **Timing / names**에서 전체 길이와 레이어 시점을 맞춥니다.
2. **Particle / origin**에서 입자와 기준 위치를 고릅니다.
3. **Shape / size**에서 Ring·Radius·Sample points를 입력합니다.
4. **Starting position / rotation**에서 Local Y를 조금 올려 바닥과 겹치지 않게 합니다.
5. **Play / Pause**로 결과를 보고 **Reset**으로 처음부터 재생합니다.

파티클 레이어의 End tick은 포함되지만 **Duration보다 작아야** 합니다. 40틱 효과의 유효 범위는 0~39입니다. 전투 Stage의 Event Tick 경계와 혼동하지 마세요.

이 설정은 0, 2, 4, …, 38틱에 총 20회 방출합니다. 한 번에 24개를 요청하므로 전체 요청은 480개입니다. Count와 Sample points를 동시에 크게 올리면 입자 수가 빠르게 증가합니다.

## 3. 반지름이 커지는 효과로 바꾸기

1. **End values (linear)**에서 Animate to end values를 켭니다.
2. 시작 Radius를 `1`, End Radius를 `2.4`로 정합니다.
3. 다른 종료 위치 값은 시작 위치와 같게 맞춥니다.
4. 재생해서 작은 원이 큰 원으로 바뀌는지 봅니다.

복잡한 이동은 **Motion keyframes**를 사용합니다. 타임라인에서 시점을 선택 → **Add key** → 그 키의 위치·반지름·Yaw를 입력합니다. 두 키 사이 값은 선형으로 변합니다.

시간 키가 있는 X/Y/Z·Radius·Yaw는 해당 키의 값으로 계산됩니다. 같은 항목에 종료값 보간과 키를 동시에 설정해 서로 다른 결과를 기대하지 마세요. 시간 키는 **방출 위치**를 움직이며, 이미 생성된 모든 입자를 그 위치로 끌고 가는 기능은 아닙니다.

## 4. 파티클 종류와 옵션

- 선택 목록은 현재 클라이언트에 실제 등록된 바닐라·모드 파티클입니다.
- 추가 데이터가 필요 없는 입자는 Particle options가 표시되지 않을 수 있습니다.
- `minecraft:dust`처럼 옵션이 필요한 입자는 실제 해석 가능한 값을 입력해야 합니다.
- dust의 예시 옵션은 `1 0.3 0.1 1`입니다.
- 블록 입자 옵션은 `minecraft:stone` 같은 실제 블록 상태를 사용합니다.
- 모드 전용 옵션은 해당 파티클의 실제 입력 형식을 따릅니다.

처음에는 옵션이 필요 없는 `minecraft:end_rod`로 성공한 뒤 종류를 바꾸는 편이 쉽습니다.

## 5. 미리보기 조작과 종료 방식

캔버스를 드래그해 회전하고 휠로 확대·축소합니다. Front / Perspective로 시점을 바꿀 수 있습니다.

**End: Hold**는 미리보기 마지막 장면을 유지하고, **End: Clear**는 미리보기 재생 종료 후 입자를 지웁니다. 이것을 월드에서 모든 입자의 수명을 바꾸는 옵션으로 해석하지 마세요. 실제 입자의 생존 시간·물리는 해당 제공 파티클의 규칙을 따릅니다.

미리보기는 실제 파티클 생성기·텍스처·렌더 방식을 사용합니다. 다만 별도의 월드 렌더가 필요한 CUSTOM 유형은 미리보기에서 지원 불가로 표시될 수 있고, NO_RENDER는 보이지 않는 것이 정상입니다. 화면 안과 월드의 조명·배경·깊이 차이도 실제 게임에서 확인합니다.

## 6. 파일 저장하고 명령어로 시험하기

1. Save As에 `training_ring.json`을 입력합니다.
2. 저장 성공 상태를 확인합니다.
3. 서버의 `config/dochi_rpg_maker/particles/training_ring.json`에 저장되었는지 확인합니다.
4. 권한 레벨 2 이상인 상태에서 다음을 한 번 실행합니다.

```mcfunction
/drm particle play training_ring ~ ~ ~
```

**명령어에서는 .json을 붙이지 않습니다.** 자동 완성에도 확장자 없는 이름이 나옵니다. 하위 폴더라면 `effects/training_ring`처럼 입력합니다.

한 번의 명령으로 전체 타임라인을 예약합니다. 매 틱 반복 호출할 필요가 없습니다. `~ ~ ~`는 명령 실행 위치 기준이며 절대 좌표도 사용할 수 있습니다.

[실습용 파티클 JSON](./assets/media/battleworks/training_ring.json)을 저장해 같은 폴더에서 비교할 수도 있습니다.

## 7. 전투 Windup에 연결하기

1. BattleWorks 패턴의 Windup을 선택합니다.
2. **+ Action → 연출 분류 → Particle Shape**를 추가합니다.
3. **Choose particle JSON**에서 `training_ring.json`을 고릅니다.
4. Origin을 **Caster**로 설정합니다.
5. Event Tick `0`, Interval `0`, Repeat Count `1`로 둡니다.
6. 실습에서는 Windup을 `40틱`으로 맞추고 효과가 끝난 뒤 타격하도록 구성합니다.
7. 전투 문서도 저장·적용합니다.

전투 액션은 `params.particleFile`로 파일을 참조합니다. 파티클 파일을 수정하면 그 파일을 사용하는 다른 전투도 영향을 받습니다.

Caster / Target로 연결한 효과는 실행 중 기준 엔티티의 위치·방향을 따라 방출할 수 있습니다. **플레이어가 있던 자리**를 고정해서 예고하려면 먼저 위치를 저장하고 Origin을 Saved position으로 고릅니다.

## 8. 표시 한도와 문제 해결

| 범위 | 현재 상한 |
| --- | --- |
| 파일 하나의 효과 길이 | 600틱 |
| 레이어 수 / 레이어당 시간 키 | 32 / 64 |
| 단발 도형의 Sample points / Count | 512 / 32 |
| 전투 NPC당 동시 효과 / 틱당 방출 예산 | 8 / 2,048 |
| 명령 재생의 차원당 동시 효과 / 틱당 예산 | 64 / 4,096 |

표시가 일부 생략되면 Sample points·Count·반복 빈도와 동시 효과 수를 줄여 비교합니다. 파일이 없거나 잘못되면 `Particle JSON rejected` 로그를 확인합니다. 미리보기 지원 불가 상태는 `/drm particle play`로 실제 월드에서도 확인합니다.

파티클이 맞게 보여도 피해가 없다면 정상일 수 있습니다. [히트박스 연결](#mob-editor/battleworks-hitboxes)을 별도로 확인하세요.
