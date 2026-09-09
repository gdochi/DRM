---
title: 히트박스 스크립트 API
slug: script-hitbox-api
order: 126
description: CustomNPCs 스크립트의 drmHitbox로 서버 판정형 일회성 공격 범위를 만듭니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.1.6
audience: CustomNPCs 전투 스크립트 제작자
tags:
  - script
  - customnpcs
  - hitbox
  - combat
---

## 시작하기

`drmHitbox`는 스크립트가 호출되는 순간 한 번만 판정하는 서버 권한형 공격 범위 API입니다. 공격자와 후보 대상을 넘기면, 지정한 도형과 실제 엔티티 경계 상자가 겹치는 대상에게 피해를 줍니다.

```js
function slash(attacker, targets) {
    return drmHitbox.arc(
        attacker,
        targets,
        0.0, 1.0, 1.5,
        3.5, 100.0, 2.0,
        8.0,
        false
    );
}
```

반환값은 범위에 들어온 수가 아니라 실제로 피해 적용에 성공한 엔티티 수입니다.

## 공격자와 대상

- `attacker`는 CustomNPCs 스크립트 엔티티 래퍼 또는 Minecraft 생명체입니다.
- `targets`는 생명체 하나, 배열, 반복 가능한 목록, 또는 맵의 값 목록을 받을 수 있습니다.
- 같은 엔티티가 여러 번 들어와도 UUID 기준으로 한 번만 처리합니다.
- 한 호출에서 최대 256개의 고유 후보를 검사합니다.
- 공격자 자신, 죽은 대상, 다른 월드의 대상은 제외합니다.

`drmHitbox`가 주변 엔티티를 자동 검색하지는 않습니다. 스크립트에서 원하는 후보만 모아 `targets`로 넘기세요. 이 구조를 이용하면 플레이어만, 특정 팩션만, 또는 별도로 필터링한 대상만 공격하게 만들 수 있습니다.

## 좌표와 도형

`offsetX`, `offsetY`, `offsetZ`는 공격자의 발 위치를 기준으로 한 로컬 좌표입니다. 수평 오프셋과 도형 방향은 공격자의 현재 바라보는 방향에 맞춰 회전합니다. `offsetZ`를 양수로 주면 공격자 앞쪽에 판정 중심을 둘 수 있습니다.

| 메서드 | 크기 인자 | 판정 형태 |
| --- | --- | --- |
| `box` | `width`, `height`, `depth` | 공격자 방향으로 회전하는 직육면체 |
| `rectangle` | `width`, `height`, `depth` | `box`와 같은 별칭 |
| `sphere` | `radius` | 구 |
| `circle` | `radius`, `height` | 수평 원기둥 |
| `cylinder` | `radius`, `height` | `circle`과 같은 원기둥 |
| `arc` | `range`, `angleDegrees`, `height` | 공격자 전방을 향하는 수평 부채꼴 |

높이가 있는 도형은 `offsetY`가 가리키는 중심에서 위아래로 절반씩 펼쳐집니다.

```js
// 공격자 앞쪽의 3 x 2 x 2 직육면체
drmHitbox.box(attacker, targets, 0, 1, 2, 3, 2, 2, 6, false);

// 중심 반경 2.5 구
drmHitbox.sphere(attacker, targets, 0, 1, 0, 2.5, 4, false);

// 전방 120도 부채꼴
drmHitbox.arc(attacker, targets, 0, 1, 0, 4, 120, 2, 8, false);
```

피해는 공격자를 원인으로 하는 플레이어 공격 또는 몹 공격 피해원으로 적용됩니다.

## 디버그 파티클

모든 메서드의 마지막 인자는 `debug`입니다. `true`로 켜면 판정 도형과 피해 적용 대상에 파티클을 표시합니다. 공격자가 플레이어면 그 공격자에게, NPC 등 다른 생명체면 주변 64블록 안의 플레이어에게 판정 요약을 알립니다. 서버 로그에도 같은 요약과 피해 대상이 기록됩니다.

```js
drmHitbox.arc(
    attacker, targets,
    0, 1, 1,
    4, 90, 2,
    8,
    "minecraft:crit",
    true
);
```

파티클 ID를 생략하면 `minecraft:end_rod`를 사용합니다. 잘못되었거나 추가 데이터가 필요한 파티클 ID도 `minecraft:end_rod`로 대체하고 디버그 메시지에 대체 사실을 표시합니다.

직접 선을 그리는 별도 디버그 모드는 없습니다. `line`은 특별한 값이 아니며, 지원되지 않는 파티클 ID로 처리됩니다.

:::warning 운영 서버
디버그는 도형 파티클, 적중 마커, 채팅 메시지, 서버 로그를 함께 만듭니다. 판정을 확인할 때만 켜고 실제 전투 스크립트에서는 `false`로 두는 편이 좋습니다.
:::

## 허용 범위

| 값 | 허용 범위 |
| --- | --- |
| 각 오프셋 | `-64.0`부터 `64.0` |
| 너비, 높이, 깊이, 반경, 사거리 | `0` 초과 `64.0` 이하 |
| 부채꼴 각도 | `0` 초과 `360.0` 이하 |
| 피해량 | `0` 초과 `2048.0` 이하 |

숫자가 유한하지 않거나 범위를 벗어나거나 도형 이름이 잘못되면 피해 없이 `0`을 반환합니다. `debug`가 켜져 있고 공격자가 플레이어라면 잘못된 인자 거부 메시지도 표시됩니다.

## 전체 시그니처 참고

각 도형에는 기본 파티클 버전과 `debugParticle`을 받는 버전이 있습니다. 아래 대괄호는 선택적 위치를 설명하기 위한 표기이며 실제 코드에는 쓰지 않습니다.

```js
drmHitbox.hit(attacker, targets, shape,
    offsetX, offsetY, offsetZ,
    sizeA, sizeB, sizeC,
    damage, [debugParticle], debug);

drmHitbox.box(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.rectangle(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.sphere(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, damage, [debugParticle], debug);

drmHitbox.circle(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.cylinder(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.arc(attacker, targets,
    offsetX, offsetY, offsetZ,
    range, angleDegrees, height,
    damage, [debugParticle], debug);
```

일반 `hit`의 `sizeA`, `sizeB`, `sizeC` 의미는 선택한 도형의 크기 인자 순서와 같습니다. `sphere`는 `sizeA`, 원기둥은 `sizeA`와 `sizeB`만 사용합니다.
