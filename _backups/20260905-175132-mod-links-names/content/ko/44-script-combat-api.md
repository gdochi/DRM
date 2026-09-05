---
title: 기본 공격 스크립트 API
slug: script-combat-api
order: 127
description: CustomNPCs 스크립트의 drmCombat으로 NPC의 기본 근접·원거리 공격을 켜고 끕니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.1.4
audience: CustomNPCs 전투 스크립트 제작자
tags:
  - script
  - customnpcs
  - combat
  - ai
---

## 시작하기

`drmCombat`은 CustomNPCs NPC가 기본으로 수행하는 근접 공격과 원거리 공격을 각각 켜거나 끄는 서버 권한형 스크립트 API입니다.

마법이나 별도 스크립트 공격만 쓰는 NPC라면 기본 공격 시도를 모두 막을 수 있습니다.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, false);
}
```

원거리 공격만 허용하는 NPC는 다음처럼 설정합니다.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, true);
}
```

:::note 적용 대상
상태 변경 메서드는 서버의 CustomNPCs NPC만 받습니다. 다른 엔티티나 클라이언트 쪽 대상을 넘기면 `false`를 반환합니다.
:::

## 개별 공격 스위치

```js
drmCombat.setMeleeAttack(event.npc, false);
drmCombat.setRangedAttack(event.npc, true);
```

| 메서드 | `enabled: false`일 때 |
| --- | --- |
| `setMeleeAttack` | 근접 공격 AI의 시작과 계속 실행, 직접 근접 공격 실행을 막습니다. |
| `setRangedAttack` | 원거리 공격 AI의 시작과 직접 원거리 공격 실행을 막습니다. |

`setAttacks(npc, meleeEnabled, rangedEnabled)`를 쓰면 두 값을 한 번에 바꿉니다.

## 현재 상태 확인

```js
var meleeEnabled = drmCombat.isMeleeAttackEnabled(event.npc);
var rangedEnabled = drmCombat.isRangedAttackEnabled(event.npc);
```

두 조회 메서드는 저장된 잠금 값이 없으면 `true`를 반환합니다. 따라서 기존 NPC는 업데이트 후에도 기본적으로 근접·원거리 공격이 허용된 상태를 유지합니다.

조회 메서드는 잘못된 대상도 레거시 기본값인 `true`로 처리합니다. 대상 유효성 검사 용도로 쓰지 말고, 상태 변경 메서드의 반환값을 확인하세요.

## 저장과 AI 동작

공격 스위치는 NPC의 PersistentData에 서버 기준으로 저장됩니다. NPC나 월드를 다시 불러와도 유지되며, 공격을 다시 켜면 해당 잠금 키를 제거합니다.

```js
function enableNormalCombat(npc) {
    return drmCombat.setAttacks(npc, true, true);
}
```

원거리 공격의 `enabled`는 허용 여부입니다. 실제 원거리 AI가 실행되려면 CustomNPCs NPC의 발사체 슬롯에 비어 있지 않은 발사체 아이템도 있어야 합니다. 원거리 공격이 꺼져 있거나 사용할 발사체가 없으면, 근접 공격이 켜진 NPC는 발사체가 없는 대상으로 취급되어 근접 AI를 사용할 수 있습니다.

## 반환값과 사용 패턴

상태 변경 메서드는 서버의 CustomNPCs NPC에 값을 적용하면 `true`, 적용할 수 없으면 `false`를 반환합니다.

```js
function makeMagicOnly(npc) {
    if (!drmCombat.setAttacks(npc, false, false)) {
        // 대상이 서버 CustomNPCs NPC인지 확인합니다.
        return false;
    }

    // 여기서 별도 마법/스크립트 공격을 구성합니다.
    return true;
}
```

기본 공격을 꺼도 `drmHitbox` 같은 별도 스크립트 피해 호출까지 차단하는 것은 아닙니다. 이 스위치는 CustomNPCs의 내장 근접·원거리 공격 경로만 제어합니다.

## 전체 시그니처 참고

```js
drmCombat.setMeleeAttack(npc, enabled);
drmCombat.setRangedAttack(npc, enabled);
drmCombat.setAttacks(npc, meleeEnabled, rangedEnabled);
drmCombat.isMeleeAttackEnabled(npc);
drmCombat.isRangedAttackEnabled(npc);
```
