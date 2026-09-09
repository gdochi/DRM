---
title: 타 모드 스킬 스크립트 API
slug: script-skill-api
order: 129
description: CustomNPCs 스크립트의 drmSkill로 Iron's Spells, Mowzie's Mobs, Cataclysm 스킬을 대상 또는 방향으로 시전합니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.1.4
audience: CustomNPCs 전투·보스 스크립트 제작자
tags:
  - script
  - customnpcs
  - skill
  - forge
---

## 개요

`drmSkill`은 CustomNPCs NPC가 다른 Forge 모드의 공개 주문·효과·투사체를 서버에서 시전하도록 연결하는 전역 스크립트 객체입니다. DRM 0.1.4가 직접 지원하는 공급자는 다음과 같습니다.

| 공급자 ID | 대상 모드 | 제공 방식 |
| --- | --- | --- |
| `irons_spellbooks` | Iron's Spells 'n Spellbooks | 해당 버전에서 활성화된 주문 레지스트리를 동적으로 공개 |
| `mowziesmobs` | Mowzie's Mobs | DRM이 검증한 효과 스킬 6종을 공개 |
| `cataclysm` | L_Ender's Cataclysm | DRM이 검증한 효과·투사체 스킬 5종을 공개 |

Mowzie와 Cataclysm 연동은 보스의 비공개 AI를 복사하지 않습니다. 모드가 공개한 효과 또는 투사체 엔티티를 NPC 소유로 생성합니다. 공급자 모드가 설치되지 않았거나 현재 버전에서 사용할 수 없으면 스크립트 오류를 던지지 않고 `false`를 반환합니다.

:::warning 실행 조건
`drmSkill`은 Forge 1.20.1 DRM과 CustomNPCs가 함께 로드될 때 등록됩니다. 시전자는 살아 있는 서버 측 CustomNPCs NPC여야 합니다. 플레이어·일반 몹·클라이언트 엔티티를 시전자로 넘기면 거부됩니다.
:::

## 가장 짧은 사용 예

공격 대상에게 Iron's Spells 화염구를 5레벨로 시전합니다.

```js
function interact(event) {
    var target = event.player;
    var success = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        target,
        5
    );

    if (!success) {
        event.npc.say("시전 실패: " + drmSkill.lastCode());
    }
}
```

`use`는 시전이 승인되면 `true`, 거부되거나 취소되면 `false`를 반환합니다. 요청 레벨이 스킬 범위를 벗어나면 정의된 최소·최대 레벨 안으로 제한됩니다.

## 메서드 목록

### 스킬 찾기

| 호출 | 반환 | 설명 |
| --- | --- | --- |
| `drmSkill.providers()` | 문자열 배열 | 현재 사용 가능한 공급자 ID |
| `drmSkill.skills()` | 문자열 배열 | 모든 사용 가능한 스킬 ID, 정렬됨 |
| `drmSkill.skills(provider)` | 문자열 배열 | 지정 공급자의 스킬 ID |
| `drmSkill.available(skillId)` | Boolean | 현재 스킬을 실제로 사용할 수 있는지 |
| `drmSkill.describe(skillId)` | JSON 문자열 | 레벨, 쿨다운, 거리, 타겟 요구 여부 |

```js
function init(event) {
    var providers = drmSkill.providers();
    var skills = drmSkill.skills("mowziesmobs");

    event.npc.getStoreddata().put("drm.provider.count", providers.length);
    event.npc.getStoreddata().put("drm.mowzie.skill.count", skills.length);
}
```

`describe` 결과는 다음 필드를 가진 JSON 문자열입니다.

```js
var text = drmSkill.describe("mowziesmobs:solar_beam");
// {"id":"mowziesmobs:solar_beam","label":"Solar Beam",
//  "minLevel":1,"maxLevel":10,"cooldownTicks":120,
//  "maxRange":64.0,"requiresTarget":false,"supportsDirection":true}
```

스킬이 없으면 `describe`는 `{}`를 반환합니다. CustomNPCs 스크립트 엔진에서 JSON 객체가 필요하면 `JSON.parse(text)`를 사용하십시오.

### 대상 시전

```js
drmSkill.use(npc, skillId);
drmSkill.use(npc, skillId, target);
drmSkill.use(npc, skillId, target, level);
drmSkill.use(npc, skillId, target, level, options);
drmSkill.use(npc, skillId, target, level, affectNpcs);
drmSkill.use(npc, skillId, target, level, affectNpcs, options);
```

`cast(...)`는 `use(...)`의 별칭입니다. 가장 명확하고 모든 오버로드가 있는 `use`를 권장합니다. `target`에는 CustomNPCs 래퍼 또는 Minecraft LivingEntity를 전달할 수 있습니다. 타겟 없는 스킬에는 `null`도 허용됩니다.

### 방향 시전

```js
drmSkill.useDirection(npc, skillId, x, y, z);
drmSkill.useDirection(npc, skillId, x, y, z, level);
drmSkill.useDirection(npc, skillId, x, y, z, level, options);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs, options);
```

`castDirection(...)`은 방향 시전의 별칭입니다. 방향 벡터는 DRM이 정규화하므로 길이가 1일 필요는 없지만, 세 값은 유한한 숫자이고 `(0, 0, 0)`이 아니어야 합니다.

```js
// NPC의 시선 방향으로 시전
var rotation = event.npc.getRotation();
var yaw = Number(rotation[0]) * Math.PI / 180.0;
var pitch = Number(rotation[1]) * Math.PI / 180.0;
var x = -Math.sin(yaw) * Math.cos(pitch);
var y = -Math.sin(pitch);
var z =  Math.cos(yaw) * Math.cos(pitch);

drmSkill.useDirection(
    event.npc,
    "cataclysm:ignis_fireball",
    x, y, z,
    4
);
```

스킬 정의가 타겟을 반드시 요구하면 방향 시전은 조용히 취소됩니다. 반환값은 `false`, `lastCode()`는 `cancelled`이며 쿨다운을 소비하거나 오류 로그를 남기지 않습니다.

## NPC 피해 허용 여부

기본값 `affectNpcs`는 `true`입니다. `false`를 전달하면 이번 스킬이 CustomNPCs NPC에게 주는 피해만 0으로 막습니다.

```js
var success = drmSkill.use(
    event.npc,
    "mowziesmobs:solar_beam",
    event.npc.getAttackTarget(),
    4,
    false,
    drmSkill.options().set("durationTicks", 50)
);
```

| 값 | CustomNPCs NPC 피해 | 플레이어 피해 | CustomNPCs가 아닌 몹 피해 |
| --- | --- | --- | --- |
| `true` | 허용 | 허용 | 허용 |
| `false` | 차단 | 허용 | 허용 |

이 설정은 우호 관계, 팀, faction을 판정하는 옵션이 아닙니다. 대상이 CustomNPCs NPC인지로만 피해를 거릅니다. 지속 빔·브레스·투사체도 DRM이 추적할 수 있는 동안 같은 정책을 유지합니다.

옵션 빌더에서도 설정할 수 있습니다.

```js
var options = drmSkill.options()
    .affectNpcs(false)
    .set("durationTicks", 50);

drmSkill.use(event.npc, "mowziesmobs:solar_beam", target, 4, options);
```

명시적인 Boolean 인자와 옵션에 모두 값이 있으면 Boolean 인자가 우선합니다.

## 옵션 입력: 쌍따옴표 이스케이프 불필요

가장 읽기 쉬운 방식은 빌더입니다.

```js
var options = drmSkill.options()
    .set("damage", 14)
    .set("speed", 1.1)
    .set("warmupTicks", 8)
    .set("soul", true);
```

`set`은 같은 빌더를 반환하므로 계속 연결할 수 있습니다. `set(key, null)`은 해당 키를 지우고, `clear()`는 전부 지웁니다. `size()`는 현재 옵션 수를 반환합니다.

다음 입력 방식도 지원합니다.

```js
// JavaScript 객체
drmSkill.use(npc, skillId, target, 4, {
    durationTicks: 50,
    damage: 14
});

// 느슨한 객체 문자열: 내부 키와 숫자에 쌍따옴표가 필요 없음
drmSkill.use(npc, skillId, target, 4, "{durationTicks:50, damage:14}");

// key=value 문자열
drmSkill.use(npc, skillId, target, 4, "durationTicks=50, damage=14");

// 기존의 정상 JSON 문자열도 호환
drmSkill.use(npc, skillId, target, 4, '{"durationTicks":50}');
```

:::note 옵션 제한
한 번에 최대 32개의 원시값 옵션을 받습니다. 문자열 입력은 최대 2,048자, 키는 영문 소문자·숫자·점·밑줄·하이픈 1~48자, 값은 최대 256자입니다. 객체·배열을 옵션 값으로 중첩하지 마십시오. 잘못된 옵션은 `false`와 `rejected`로 처리됩니다.
:::

옵션 키는 내부에서 소문자로 정규화됩니다. 따라서 문서에는 읽기 쉬운 `durationTicks`, `warmupTicks`, `affectNpcs`를 쓰되, 공급자 구현은 대소문자와 무관하게 읽습니다.

## 공급자별 스킬과 옵션

### Iron's Spells 'n Spellbooks

DRM은 설치된 버전의 활성 주문을 최대 512개까지 동적으로 읽습니다. 정확한 목록은 서버에서 확인하십시오.

```js
var ids = drmSkill.skills("irons_spellbooks");
for (var i = 0; i < ids.length; i++) {
    event.npc.say(String(ids[i]));
}
```

스킬 ID는 `irons_spellbooks:fireball`처럼 주문 레지스트리 ID를 그대로 사용합니다. 기본 설명 거리는 64블록이며 현재 DRM 공급자 전용 옵션은 없습니다. 주문 자체의 선행 조건, 시전 가능 상태, 대상 규칙에 따라 `rejected` 또는 다른 실패가 반환될 수 있습니다.

```js
if (drmSkill.available("irons_spellbooks:fireball")) {
    drmSkill.use(event.npc, "irons_spellbooks:fireball", event.player, 5);
}
```

### Mowzie's Mobs

| 스킬 ID | 쿨다운 | 최대 거리 | 옵션과 허용 범위 |
| --- | ---: | ---: | --- |
| `mowziesmobs:sunstrike` | 40틱 | 64 | 없음 |
| `mowziesmobs:solar_beam` | 120틱 | 64 | `durationTicks`: 10~100 |
| `mowziesmobs:ice_breath` | 100틱 | 32 | 없음 |
| `mowziesmobs:boulder_projectile` | 60틱 | 64 | `damage`: 1~100, `speed`: 0.2~2.0 |
| `mowziesmobs:axe_attack` | 40틱 | 16 | `vertical`: 기본 `false` |
| `mowziesmobs:axe_attack_vertical` | 60틱 | 16 | `vertical`: 기본 `true` |

모든 Mowzie 스킬 레벨 범위는 1~10이며 대상 또는 방향으로 조준할 수 있습니다. `solar_beam`의 기본 지속 시간은 `30 + level × 5`틱입니다. 바위의 기본 피해는 `3 + level × 2`, 기본 속도는 `0.9 + level × 0.04`이며 레벨에 따라 크기 단계가 올라갑니다.

```js
var boulder = drmSkill.options()
    .set("damage", 18)
    .set("speed", 1.2);

drmSkill.use(
    event.npc,
    "mowziesmobs:boulder_projectile",
    event.npc.getAttackTarget(),
    5,
    boulder
);
```

### L_Ender's Cataclysm

| 스킬 ID | 쿨다운 | 최대 거리 | 옵션과 허용 범위 |
| --- | ---: | ---: | --- |
| `cataclysm:void_rune` | 60틱 | 64 | `damage`: 0~200, `warmupTicks`: 0~100 |
| `cataclysm:ignis_fireball` | 30틱 | 64 | `speed`: 0.1~1.0, `warmupTicks`: 0~100, `soul`: Boolean |
| `cataclysm:ignis_soul_fireball` | 50틱 | 64 | `speed`: 0.1~1.0, `warmupTicks`: 0~100, `soul`: Boolean |
| `cataclysm:ignis_abyss_fireball` | 80틱 | 64 | `speed`: 0.1~0.8, `warmupTicks`: 0~100 |
| `cataclysm:ender_guardian_bullet` | 20틱 | 80 | `speed`: 0.1~2.0, `warmupTicks`: 0~100 |

모든 Cataclysm 스킬 레벨 범위는 1~10이며 대상 또는 방향으로 조준할 수 있습니다. 옵션을 생략하면 레벨 기반 기본값을 사용합니다.

```js
var rune = drmSkill.options()
    .set("damage", 14)
    .set("warmupTicks", 8);

drmSkill.use(event.npc, "cataclysm:void_rune", target, 4, rune);
```

## 결과 코드와 쿨다운

가장 최근의 `use` 또는 `useDirection` 결과는 현재 스크립트 실행 스레드에 보관됩니다.

```js
var success = drmSkill.use(event.npc, skillId, target, level);
var code = String(drmSkill.lastCode());
var message = String(drmSkill.lastMessage());
var cooldown = Number(drmSkill.lastCooldownTicks());
```

| 코드 | 의미 | 일반 처리 |
| --- | --- | --- |
| `success` | 시전 승인 | `lastCooldownTicks()` 뒤 재시도 |
| `invalid_caster` | 서버 CustomNPCs NPC가 아님 | 시전자와 실행 측 확인 |
| `invalid_skill` | 등록되지 않은 스킬 ID | `available` 또는 `skills`로 확인 |
| `provider_unavailable` | 공급자 모드/API를 사용할 수 없음 | 모드 버전과 서버 설치 확인 |
| `invalid_target` | 타겟이 없거나 유효하지 않음 | 새 타겟을 기다림 |
| `out_of_range` | 타겟이 최대 거리 밖 | 가까워진 뒤 재시도 |
| `cooldown` | DRM 쿨다운 중 | 반환된 남은 틱만큼 대기 |
| `cancelled` | 타겟 필수 스킬의 방향 시전 등 정상 취소 | 조용히 종료 |
| `rejected` | 공급자 또는 옵션 검증이 거부 | `lastMessage` 확인 |
| `error` | 공급자 실행 예외 | DRM 로그 확인 |

쿨다운을 직접 조회하거나 관리자성 스크립트에서 지울 수 있습니다.

```js
var ticks = drmSkill.cooldownRemaining(event.npc, skillId);
var cleared = drmSkill.clearCooldown(event.npc, skillId);
```

성공한 시전의 쿨다운은 NPC별·스킬별로 저장됩니다. 실패·조용한 취소는 새 쿨다운을 소비하지 않습니다.

## 실전 Tick 스크립트

다음 예제는 공격 대상이 있을 때 5레벨 바위를 시전하고, 성공한 쿨다운 또는 실패 종류에 맞춰 재시도합니다.

```js
var NEXT_CAST_TICK = 0;
var SKILL_ID = "mowziesmobs:boulder_projectile";

function tick(event) {
    var npc = event.npc;
    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    var target = npc.getAttackTarget();
    if (target == null) {
        NEXT_CAST_TICK = now + 10;
        return;
    }

    if (!drmSkill.available(SKILL_ID)) {
        NEXT_CAST_TICK = now + 100;
        return;
    }

    var options = drmSkill.options()
        .set("damage", 14)
        .set("speed", 1.1);

    if (drmSkill.use(npc, SKILL_ID, target, 5, false, options)) {
        NEXT_CAST_TICK = now + Math.max(10, drmSkill.lastCooldownTicks());
        return;
    }

    var code = String(drmSkill.lastCode());
    if (code == "cooldown") {
        NEXT_CAST_TICK = now + Math.max(1, drmSkill.lastCooldownTicks());
    } else if (code == "invalid_target" || code == "out_of_range") {
        NEXT_CAST_TICK = now + 10;
    } else {
        NEXT_CAST_TICK = now + 20;
    }
}

function died(event) {
    drmSkill.cancel(event.npc);
}
```

`cancel(npc)`은 해당 NPC가 만든 것으로 DRM이 추적 중인 빔·브레스·투사체·효과 엔티티를 제거하고 제거 개수를 반환합니다. NPC 사망, 페이즈 전환, 스킬 강제 중단 때 호출하십시오.

## 다른 DRM 스크립트 API와 조합

```js
function castBossSkill(npc, target) {
    // 기본 공격을 끄고 공격 애니메이션을 재생한 뒤 스킬 시도
    drmCombat.setAttacks(npc, false, false);
    drmAnimation.playEntityAnimation(npc, "attack_animation", 1.0, 40);

    var ok = drmSkill.use(npc, "cataclysm:void_rune", target, 5,
        drmSkill.options().set("damage", 18));

    if (!ok && String(drmSkill.lastCode()) != "cancelled") {
        npc.say("skill: " + drmSkill.lastCode());
    }
    return ok;
}
```

`drmAnimation`, `drmHitbox`, `drmCombat`은 각각 별도 문서에 전체 메서드와 제한이 설명되어 있습니다. 포션 효과를 조건으로 시전하려면 **포션 효과 조회 스크립트 API** 문서의 `drmEffect`를 사용하십시오.

### 스킬 성공을 팝업으로 알리기

팝업 메이커에서 저장한 정의는 `drmPopup`으로 같은 스크립트에서 재생할 수 있습니다. 다음 예제는 스킬 시전이 성공한 플레이어에게 `area_title.json` 팝업을 띄우고 본문만 바꿉니다.

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "area_title.json",
            "Fireball cast\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

`drmPopup.text`는 성공적으로 전송한 플레이어 수를 반환합니다. 전체 팝업 메서드, 줄바꿈, 대상 배열, 정책 제한은 **팝업 메이커 스크립트 API** 문서를 확인하십시오.

## 문제 해결과 로그

취소(`cancelled`)를 제외한 스킬 호출은 다음 두 위치에 진단 정보를 남깁니다.

```text
config/dochi_rpg_maker/debug.log
logs/latest.log
```

검색할 접두사:

```text
NPC skill script call:
```

로그에는 `skill`, 요청 `level`, `success`, `code`, `cooldownTicks`, `message`가 포함됩니다.

1. `drmSkill`이 정의되지 않으면 DRM·CustomNPCs 버전과 서버 시작 로그의 스크립트 API 등록 문구를 확인합니다.
2. `provider_unavailable`이면 공급자 모드가 서버에 설치되고 DRM이 지원하는 버전인지 확인합니다.
3. `invalid_skill`이면 추측한 ID를 쓰지 말고 `skills(provider)` 결과를 확인합니다.
4. `invalid_target` 또는 `out_of_range`이면 현재 공격 대상과 `describe`의 최대 거리를 확인합니다.
5. `rejected`이면 `lastMessage()`와 공급자별 옵션 범위를 확인합니다.
6. 지속 효과가 남으면 NPC의 `died`와 페이즈 종료 경로에서 `cancel(npc)`을 호출합니다.

## 애드온 공급자 등록

다른 Forge 애드온도 DRM API의 `NpcSkillProvider`를 구현하고 `NpcSkillRegistry.register(provider)`로 공급자를 등록할 수 있습니다. 공급자는 고유한 공급자 ID와 스킬 정의를 제공하고, 서버에서 `NpcSkillResult`를 반환해야 합니다. 스크립트는 내장 공급자와 동일하게 `providers`, `skills`, `describe`, `use`를 사용하므로 별도 전역 객체가 필요하지 않습니다.
