---
title: 포션 효과 조회 스크립트 API
slug: script-effect-api
order: 130
description: CustomNPCs 스크립트의 drmEffect로 NPC·플레이어의 포션 효과 보유 여부, 남은 시간, 증폭 단계와 표시 레벨을 조회합니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.1.4
audience: CustomNPCs 전투·상태 스크립트 제작자
tags:
  - script
  - customnpcs
  - potion
  - effect
---

## 개요

`drmEffect`는 살아 있는 엔티티의 Mob Effect, 즉 포션 효과를 읽는 CustomNPCs 전역 스크립트 객체입니다. NPC와 플레이어가 특정 효과를 가지고 있는지, 몇 틱·몇 초 남았는지, 내부 증폭 값과 화면에 표시되는 레벨을 조회할 수 있습니다.

```js
function interact(event) {
    if (drmEffect.has(event.player, "minecraft:speed")) {
        var seconds = drmEffect.remainingSeconds(event.player, "minecraft:speed");
        var level = drmEffect.level(event.player, "minecraft:speed");
        event.player.message("신속 " + level + " / 남은 시간 " + seconds + "초");
    }
}
```

`drmEffect`는 조회 전용입니다. 효과를 추가·삭제하거나 남은 시간을 바꾸지 않습니다. 잘못된 대상이나 효과 ID는 스크립트를 중단시키지 않고 안전한 기본값을 반환합니다.

:::note 사용 가능한 대상
첫 번째 인자는 CustomNPCs 엔티티 래퍼 또는 Minecraft LivingEntity입니다. 보통 `event.npc`, `event.player`, `event.npc.getAttackTarget()`를 그대로 넘길 수 있습니다. 살아 있는 엔티티가 아닌 값은 효과 없음으로 처리됩니다.
:::

## 전체 메서드

| 메서드 | 효과가 있을 때 | 효과가 없거나 입력이 잘못됐을 때 |
| --- | --- | --- |
| `has(entity, effectId)` | `true` | `false` |
| `remainingTicks(entity, effectId)` | 남은 틱 | `0` |
| `ticks(entity, effectId)` | `remainingTicks`와 같음 | `0` |
| `remainingSeconds(entity, effectId)` | 남은 틱 ÷ 20 | `0.0` |
| `seconds(entity, effectId)` | `remainingSeconds`와 같음 | `0.0` |
| `amplifier(entity, effectId)` | 내부 증폭 값, 0부터 시작 | `-1` |
| `level(entity, effectId)` | 사용자 표시 레벨, 1부터 시작 | `0` |

### 효과 보유 여부

```js
if (drmEffect.has(event.npc, "minecraft:strength")) {
    event.npc.say("힘 효과 적용 중");
}
```

`has`는 효과 인스턴스가 실제로 붙어 있을 때만 `true`입니다. 남은 시간이 0인 값, 잘못된 ID, 등록되지 않은 효과는 `false`입니다.

### 남은 시간

```js
var ticksLeft = drmEffect.remainingTicks(event.player, "regeneration");
var secondsLeft = drmEffect.remainingSeconds(event.player, "regeneration");

// 짧은 별칭도 같은 값
var sameTicks = drmEffect.ticks(event.player, "regeneration");
var sameSeconds = drmEffect.seconds(event.player, "regeneration");
```

일반적인 Minecraft 시간은 20틱이 약 1초입니다. `remainingSeconds`는 정수가 아니라 `double`이므로 2.5처럼 소수 값이 나올 수 있습니다.

무한 지속 효과는 남은 틱과 초가 `-1`입니다. `-1`을 0초 또는 효과 없음으로 판정하지 마십시오. 효과 보유 여부는 항상 `has`로 먼저 확인하는 것이 안전합니다.

```js
var hasEffect = drmEffect.has(event.npc, "minecraft:resistance");
var left = drmEffect.remainingTicks(event.npc, "minecraft:resistance");

if (hasEffect && left < 0) {
    event.npc.say("저항 효과가 무한 지속 중");
}
```

### 증폭 값과 표시 레벨

Minecraft 내부 증폭 값은 0부터 시작하지만 화면에 보이는 포션 레벨은 1부터 시작합니다.

| 화면 표시 | `amplifier` | `level` |
| --- | ---: | ---: |
| 신속 I | 0 | 1 |
| 신속 II | 1 | 2 |
| 신속 III | 2 | 3 |
| 효과 없음 | -1 | 0 |

대부분의 스크립트 UI와 대사에는 `level`이 읽기 쉽습니다. Minecraft 내부 수식과 동일한 증폭 수치가 필요할 때만 `amplifier`를 사용하십시오.

```js
var shownLevel = drmEffect.level(event.player, "speed");
var internalAmplifier = drmEffect.amplifier(event.player, "speed");
```

## 효과 ID 규칙

정식 형식은 `namespace:path`입니다.

```text
minecraft:speed
minecraft:regeneration
irons_spellbooks:instant_mana
example_mod:custom_effect
```

네임스페이스를 생략하면 `minecraft:`가 자동으로 붙습니다.

```js
drmEffect.has(event.player, "speed");
drmEffect.has(event.player, "minecraft:speed");
// 두 호출은 같은 효과를 조회
```

ID는 앞뒤 공백을 제거하고 소문자로 바꾼 뒤 Forge Mob Effect 레지스트리에서 찾습니다. 빈 문자열, 잘못된 ResourceLocation, 현재 서버에 등록되지 않은 모드 효과는 효과 없음으로 처리됩니다.

:::warning 번역 이름을 쓰지 마십시오
`신속`, `Speed II`, 툴팁 문구가 아니라 레지스트리 ID를 사용해야 합니다. 모드 효과의 정확한 ID는 해당 모드 문서 또는 레지스트리 확인 도구로 확인하십시오.
:::

## 플레이어 효과로 분기

플레이어에게 야간 투시가 10초보다 많이 남았을 때만 대사를 실행합니다.

```js
function interact(event) {
    var player = event.player;
    var effect = "minecraft:night_vision";

    if (!drmEffect.has(player, effect)) {
        player.message("야간 투시 효과가 필요합니다.");
        return;
    }

    var seconds = drmEffect.remainingSeconds(player, effect);
    if (seconds >= 0 && seconds <= 10) {
        player.message("남은 시간이 너무 짧습니다: " + seconds + "초");
        return;
    }

    player.message("조건 통과");
}
```

`seconds < 0`은 무한 지속이므로 위 예제에서는 시간 조건을 통과합니다.

## NPC 자신의 효과 확인

NPC에게 저항 II 이상이 붙어 있는 동안만 방어 페이즈를 유지합니다.

```js
var DEFENSE_ACTIVE = false;

function tick(event) {
    var npc = event.npc;
    var active = drmEffect.level(npc, "minecraft:resistance") >= 2;

    if (active == DEFENSE_ACTIVE) return;
    DEFENSE_ACTIVE = active;

    if (active) {
        drmCombat.setAttacks(npc, false, false);
        npc.say("방어 페이즈 시작");
    } else {
        drmCombat.setAttacks(npc, true, true);
        npc.say("방어 페이즈 종료");
    }
}
```

이 패턴은 매 틱 대사를 반복하지 않도록 이전 상태가 바뀔 때만 동작합니다.

## 타겟 효과를 확인한 뒤 스킬 시전

타겟이 독 상태가 아닐 때만 Cataclysm 투사체를 사용합니다.

```js
var NEXT_CAST_TICK = 0;

function tick(event) {
    var npc = event.npc;
    var target = npc.getAttackTarget();
    if (target == null) return;

    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    if (drmEffect.has(target, "minecraft:poison")) {
        NEXT_CAST_TICK = now + 20;
        return;
    }

    var options = drmSkill.options()
        .set("speed", 0.8)
        .set("warmupTicks", 0);

    var ok = drmSkill.use(
        npc,
        "cataclysm:ender_guardian_bullet",
        target,
        5,
        options
    );

    NEXT_CAST_TICK = now + (ok
        ? Math.max(20, drmSkill.lastCooldownTicks())
        : 20);
}
```

`drmEffect`는 효과가 있는지 읽을 뿐, 위 스킬이 독을 실제로 부여한다는 뜻은 아닙니다. 스킬의 실제 효과는 공급자 모드의 동작을 따릅니다.

## 남은 시간을 Stored Data에 기록

다른 CustomNPCs 스크립트나 DRM의 `cnpc_stored_data` 조건에서 읽을 수 있도록 현재 상태를 저장할 수 있습니다.

```js
function tick(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (!drmEffect.has(npc, "speed")) {
        data.remove("boss.speed.seconds");
        data.remove("boss.speed.level");
        return;
    }

    data.put("boss.speed.seconds",
        String(drmEffect.remainingSeconds(npc, "speed")));
    data.put("boss.speed.level",
        String(drmEffect.level(npc, "speed")));
}
```

매 틱 저장이 필요하지 않다면 20틱마다 갱신하도록 별도 카운터를 두는 편이 좋습니다. DRM 조건에서 이 값을 검사할 때는 `CustomNPCs Stored Data 조건 연동` 문서의 Scope와 Number 비교 규칙을 따르십시오.

## 안전한 조회 함수 만들기

반복 사용한다면 효과 없음·무한 지속을 구분하는 보조 함수를 만들 수 있습니다.

```js
function effectSnapshot(entity, effectId) {
    if (!drmEffect.has(entity, effectId)) {
        return {
            present: false,
            ticks: 0,
            seconds: 0,
            amplifier: -1,
            level: 0,
            infinite: false
        };
    }

    var ticks = Number(drmEffect.remainingTicks(entity, effectId));
    return {
        present: true,
        ticks: ticks,
        seconds: Number(drmEffect.remainingSeconds(entity, effectId)),
        amplifier: Number(drmEffect.amplifier(entity, effectId)),
        level: Number(drmEffect.level(entity, effectId)),
        infinite: ticks < 0
    };
}
```

사용 예:

```js
var state = effectSnapshot(event.player, "minecraft:strength");
if (state.present && state.level >= 2) {
    event.player.message("힘 II 이상");
}
```

## 실패와 기본값

| 입력 상황 | `has` | 시간 | `amplifier` | `level` |
| --- | ---: | ---: | ---: | ---: |
| 효과 없음 | false | 0 | -1 | 0 |
| `entity`가 `null` | false | 0 | -1 | 0 |
| LivingEntity가 아닌 객체 | false | 0 | -1 | 0 |
| 빈 효과 ID | false | 0 | -1 | 0 |
| 잘못된 ID 형식 | false | 0 | -1 | 0 |
| 선택 모드가 없어 효과가 미등록 | false | 0 | -1 | 0 |
| 무한 지속 효과 | true | -1 | 실제 값 | 실제 레벨 |

효과 없음과 0레벨을 혼동하지 않으려면 다음 순서를 권장합니다.

```js
if (drmEffect.has(entity, id)) {
    var level = drmEffect.level(entity, id);
    var ticks = drmEffect.remainingTicks(entity, id);
}
```

## 자주 하는 실수

1. `amplifier >= 2`를 화면의 II 이상으로 착각하지 마십시오. 화면 II는 amplifier 1입니다.
2. `remainingTicks <= 0`만으로 효과 없음을 판정하면 무한 효과 `-1`도 잘못 제외합니다. 먼저 `has`를 사용하십시오.
3. 모드 효과에 `minecraft:`를 붙이지 마십시오. 정확한 모드 네임스페이스가 필요합니다.
4. 표시 이름이나 번역 키 대신 레지스트리 ID를 사용하십시오.
5. 대상이 바뀔 수 있는 Tick 스크립트에서는 `getAttackTarget()` 결과를 매번 `null` 검사하십시오.

## 관련 스크립트 전역 객체

| 객체 | 용도 |
| --- | --- |
| `drmSkill` | 타 모드 스킬 발견·대상 시전·방향 시전·쿨다운·취소 |
| `drmAnimation` | 애니메이션 직접 재생과 행동 매핑 |
| `drmHitbox` | NPC 히트박스·눈높이·공격 박스 제어 |
| `drmCombat` | CustomNPCs 기본 근접·원거리 공격 허용 여부 |
| `drmEffect` | 현재 포션 효과 상태 조회 |

각 객체는 스크립트 API 섹션의 해당 문서에서 전체 메서드와 실전 예제를 확인할 수 있습니다.
