---
title: 애니메이션 스크립트 API
slug: script-animation-api
order: 125
description: CustomNPCs 스크립트의 drmAnimation으로 애니메이션을 재생하고 행동 매핑과 NPC 모델을 바꿉니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.3.1
audience: CustomNPCs 스크립트 제작자
tags:
  - script
  - customnpcs
  - animation
---

## NPC의 외형과 동작을 스크립트에서 바꾸기

이 문서는 CustomNPCs 스크립트로 NPC의 모델과 동작을 바꾸는 고급 참고입니다. 이름·스킨만 바꾸려면 먼저 [외형 안내](#core/assets-models)를 사용하세요. 아래 화면은 실제 API로 기존 NPC의 외형을 minecraft:zombie로 지정한 결과입니다. 애니메이션을 재생하려면 그 모델이나 설치된 공급자가 제공하는 동작 ID가 추가로 필요합니다.

![실제 NPC의 외형과 동작을 스크립트에서 바꾸기 결과.](assets/media/guides/drm-031-forge1201-apis/api-model-zombie.png "DRM 0.3.1 / Forge 1.20.1 + CustomNPCs. useModdedEntityModel 호출 뒤 좀비 외형으로 표시된 NPC입니다. 플레이어용 wave 리소스를 설치하거나 재생한 장면으로 제시하지 않습니다.")

## 시작하기

Dochi's RPG Maker Forge 0.3.1은 CustomNPCs 스크립트 전역 객체 `drmAnimation`을 등록합니다. 모든 메서드의 첫 번째 인자는 CustomNPCs 스크립트 엔티티 래퍼 또는 Minecraft 엔티티입니다. 보통 이벤트의 `event.npc`를 그대로 넘기면 됩니다.

```js
function interact(event) {
    drmAnimation.useModdedEntityModel(event.npc, "minecraft:zombie");
}
```

먼저 준비한 NPC의 외형이 위 화면처럼 바뀌는지 확인합니다. 걷기·공격 등 동작 재생은 아래 공급자와 실제 동작 리소스를 준비한 뒤 연결합니다.

:::note 사용 조건
`drmAnimation`은 CustomNPCs가 있는 환경에서만 전역 객체로 등록됩니다. 선택한 공급자의 모드와 애니메이션 리소스도 서버와 접속 클라이언트에 준비되어 있어야 합니다.
:::

## 직접 재생

가장 짧은 호출은 재생 정책을 생략하며, 이 경우 `once`로 처리됩니다. 아래 `mypack:wave` 같은 이름은 실제 리소스가 필요한 예시 ID입니다. 그대로 입력하는 것만으로 동작 파일이 설치되지는 않습니다.

```js
drmAnimation.play(event.npc, "entity", "attack_animation", 1.0, 40);
drmAnimation.playPlayerAnimator(event.npc, "mypack:wave", 1.0, 80);
drmAnimation.playBetterCombat(event.npc, "bettercombat:one_handed_slash", 1.0, 40);
drmAnimation.playEntityAnimation(event.npc, "attack_animation", 1.2, 60);
```

| 공급자 | 용도 |
| --- | --- |
| `entity` | 선택한 모드 엔티티 모델의 네이티브 애니메이션 |
| `geckolib` | DRM이 관리하는 GeckoLib JSON 모델 애니메이션 |
| `player_animator` | Player Animator 리소스 애니메이션 |
| `better_combat` | 지정한 Better Combat 애니메이션 |

`player_animator`와 `better_combat`은 GeckoLib 모델 또는 모드 엔티티 렌더러를 사용하는 대상에서는 거부됩니다. `entity`는 먼저 해당 NPC에 모드 엔티티 모델을 적용하고, 그 모델이 실제로 제공하는 애니메이션 ID를 사용해야 합니다.

## 재생 정책

숫자 모드는 스크립트에서 짧게 쓰기 위한 값입니다.

| playbackMode | 이름 | 동작 |
| --- | --- | --- |
| `0` | `loop` | 지정한 유지 시간 동안 반복 |
| `1` | `once` | 한 번 재생 |
| `2` | `hold_last` | 한 번 재생한 뒤 마지막 프레임 유지 |

숫자 모드는 마지막 인자에 둡니다.

```js
drmAnimation.playEntityAnimation(event.npc, "idle_animation", 1.0, 100, 0);
drmAnimation.playEntityAnimation(event.npc, "death_animation", 1.0, 100, 2);
```

이름으로 지정할 때는 `animation` 다음에 둡니다.

```js
drmAnimation.playEntityAnimation(event.npc, "attack_animation", "once", 1.0, 40);
drmAnimation.play(event.npc, "entity", "idle_animation", "loop", 1.0, 100);
```

`loop`, `once`, `hold_last` 외의 숫자나 이름은 자동 변환하지 않고 호출을 거부합니다.

## 행동 애니메이션 저장

`setBehavior`는 NPC 모델 설정에 행동별 애니메이션 매핑을 저장합니다. 기본 행동 ID는 `idle`, `walk`, `sprint`, `attack`, `hurt`, `death`입니다.

```js
function init(event) {
    var npc = event.npc;

    drmAnimation.useModdedEntityModel(npc, "cataclysm:amethyst_crab");
    drmAnimation.setBehavior(npc, "idle", "entity", "idle_animation", 1.0, 0);
    drmAnimation.setBehavior(npc, "attack", "entity", "attack_animation", 1.0, 1);
    drmAnimation.setBehavior(npc, "death", "entity", "death_animation", 1.0, 2);
}
```

저장된 매핑은 다음처럼 호출하거나 삭제합니다.

```js
drmAnimation.playBehavior(event.npc, "attack", 60);
drmAnimation.clearBehavior(event.npc, "attack");
```

`useModdedEntityModel`은 유효한 엔티티 타입 ID를 CustomNPCs NPC에 적용합니다. 기본 CustomNPCs 렌더러로 되돌릴 때는 `useCustomNpcModel`을 사용합니다.

```js
drmAnimation.useCustomNpcModel(event.npc);
```

## 인자와 반환값

- `speed`는 `0.0`부터 `32.0`까지입니다.
- `durationTicks`는 `1`부터 `600`틱까지입니다.
- 직접 재생 메서드는 별도 `playForTicks` 없이 `durationTicks`를 받습니다.
- 애니메이션 ID는 공급자가 실제로 제공하는 정확한 ID를 사용합니다.
- 모든 메서드는 요청을 받을 수 있으면 `true`, 대상·인자·렌더러 조합이 맞지 않으면 `false`를 반환합니다.

## 전체 시그니처 참고

아래는 메서드 구조를 확인할 때만 보는 레퍼런스입니다.

```js
drmAnimation.play(target, provider, animation, speed, durationTicks);
drmAnimation.play(target, provider, animation, speed, durationTicks, playbackMode);
drmAnimation.play(target, provider, animation, playback, speed, durationTicks);

drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks);
drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playPlayerAnimator(target, animation, playback, speed, durationTicks);

drmAnimation.playBetterCombat(target, animation, speed, durationTicks);
drmAnimation.playBetterCombat(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playBetterCombat(target, animation, playback, speed, durationTicks);

drmAnimation.playEntityAnimation(target, animation, speed, durationTicks);
drmAnimation.playEntityAnimation(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playEntityAnimation(target, animation, playback, speed, durationTicks);

drmAnimation.playBehavior(target, behavior, durationTicks);
drmAnimation.setBehavior(target, behavior, provider, animation, speed, playbackMode);
drmAnimation.clearBehavior(target, behavior);
drmAnimation.useModdedEntityModel(target, entityTypeId);
drmAnimation.useCustomNpcModel(target);
```

## 문제 확인

- 호출 결과가 `false`이면 대상, 공급자, 애니메이션 ID, 속도, 유지 시간을 먼저 확인합니다.
- Player Animator 또는 Better Combat이 모드 엔티티/GeckoLib 렌더러와 함께 사용되지 않았는지 확인합니다.
- 모드 엔티티는 모드마다 애니메이션 엔진과 내부 ID가 다릅니다. NPC Basic의 선택 목록에 표시되는 실제 ID를 사용합니다.
- 서버에서는 재생 요청을 보내지만 화면 출력은 클라이언트가 담당하므로, 접속 클라이언트에도 필요한 DRM 및 공급자 모드·리소스가 있어야 합니다.
