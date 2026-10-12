---
title: 팝업 메이커 스크립트 API
slug: script-popup-api
order: 131
description: CustomNPCs 스크립트의 drmPopup으로 팝업 메이커 정의를 플레이어에게 재생하고 본문·타임라인을 연출용으로 덮어씁니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.1.6
audience: CustomNPCs 대화·퀘스트·전투 연출 스크립트 제작자
tags:
  - script
  - customnpcs
  - popup
  - forge
---

## 개요

`drmPopup`은 팝업 메이커에서 저장한 정의 JSON을 서버 플레이어에게 재생하는 CustomNPCs 전역 스크립트 객체입니다. 스크립트에는 실제 연출 메서드만 노출됩니다. 정의 목록, 리로드, 편집 같은 관리 작업은 팝업 메이커 GUI에서 처리합니다.

```js
function interact(event) {
    drmPopup.show(event.player, "area_title.json");
}
```

첫 번째 인자는 팝업을 받을 플레이어이고, 두 번째 인자는 팝업 메이커에서 저장한 정의 파일입니다. `.json`은 생략할 수 있습니다.

:::warning 실행 조건
`drmPopup`은 Forge 1.20.1 DRM과 CustomNPCs가 함께 로드될 때 등록됩니다. 연출은 서버에서 호출해야 하며 대상에서 서버 플레이어를 찾지 못하면 `0`을 반환합니다.
:::

## 준비

1. DRM 편집기 목록에서 **Popup Maker**를 엽니다.
2. 제목, 부제목, 본문, 페이드 인·유지·페이드 아웃, 채널과 충돌 방식을 설정합니다.
3. GUI JSON을 선택하고 필요하면 **Edit Layout**으로 팝업 컴포넌트의 위치와 텍스처를 편집합니다.
4. 정의를 저장한 뒤 그 파일명을 `drmPopup`에 전달합니다.

팝업 정의는 서버의 `dochi_rpg_maker/popups/definitions` 데이터로 관리되고, 선택한 GUI JSON은 공용 GUI 저장소에서 읽습니다. 스크립트가 원시 JSON 문자열을 직접 받는 방식은 지원하지 않습니다.

## 전체 메서드

| 메서드 | 반환 | 동작 |
| --- | ---: | --- |
| `show(targets, definition)` | 전송한 플레이어 수 | 저장된 정의를 그대로 재생 |
| `text(targets, definition, text)` | 전송한 플레이어 수 | 정의의 본문 `text`만 덮어써서 재생 |
| `timed(targets, definition, fadeIn, hold, fadeOut)` | 전송한 플레이어 수 | 세 구간의 틱을 덮어써서 재생 |
| `timed(targets, definition, fadeIn, hold, fadeOut, text)` | 전송한 플레이어 수 | 타임라인과 비어 있지 않은 본문을 함께 덮어씀 |
| `stop(targets, instanceKey)` | 전송한 플레이어 수 | 지정 인스턴스 키의 팝업을 중지 |
| `clear(targets)` | 전송한 플레이어 수 | 대상의 활성·대기 팝업을 모두 제거 |
| `lastError()` | 문자열 | 가장 최근 실패 이유, 성공 후에는 빈 문자열 |

모든 틱 값은 Minecraft 틱입니다. 일반적으로 20틱이 약 1초입니다.

:::note `timed`의 의미
`timed`는 별도의 타이머 UI를 만드는 기능이 아닙니다. 팝업 전체의 페이드 인, 유지, 페이드 아웃 재생 시간을 이번 호출에 한해 바꾸는 연출 메서드입니다.
:::

## 대상 지정

`targets`에는 서버 플레이어 하나, CustomNPCs 플레이어 래퍼, 배열 또는 반복 가능한 목록을 전달할 수 있습니다. 중복 플레이어는 한 번만 처리됩니다.

```js
// 한 명
drmPopup.show(event.player, "area_title");

// 여러 명
drmPopup.text(
    [event.player, anotherPlayer],
    "quest_notice.json",
    "Quest updated"
);
```

대상 해석은 최대 1,024명의 서로 다른 플레이어와 4단계 중첩까지만 수행됩니다. NPC나 일반 몹은 팝업 수신 대상이 아닙니다.

## 본문, 줄바꿈과 플레이스홀더

JavaScript 문자열의 `\n`을 사용하면 팝업 본문을 명시적으로 줄바꿈할 수 있습니다.

```js
drmPopup.text(
    event.player,
    "area_title.json",
    "Northern Frontier\nA new region has been discovered."
);
```

저장된 제목·부제목·본문과 스크립트로 덮어쓴 본문에는 플레이어별 플레이스홀더를 사용할 수 있습니다.

| 형식 | 값 |
| --- | --- |
| `@player`, `{player}`, `${player}`, `%player%` | 대상 플레이어 이름 |
| `{uuid}`, `${uuid}`, `%uuid%` | 대상 플레이어 UUID |
| `@npc`, `{npc}`, `${npc}`, `%npc%` | DRM 호출 경로가 제공한 NPC 이름 |

`@npc`는 다이얼로그 액션처럼 DRM이 NPC 연출 컨텍스트를 연 호출에서만 자동 해석됩니다. CustomNPCs 스크립트가 `drmPopup`을 직접 호출할 때는 NPC 인자가 없으므로 필요하면 직접 문자열을 만드십시오.

```js
var body = String(event.npc.getName()) + "\nhas discovered a new area.";
drmPopup.text(event.player, "area_title.json", body);
```

## 재생 시간 덮어쓰기

10틱 동안 나타나고, 60틱 유지한 뒤, 20틱 동안 사라지게 합니다.

```js
drmPopup.timed(
    event.player,
    "area_title.json",
    10,
    60,
    20
);
```

본문도 함께 바꾸려면 마지막 인자를 추가합니다.

```js
drmPopup.timed(
    event.player,
    "quest_notice.json",
    5,
    100,
    15,
    "Objective complete\nReturn to @npc"
);
```

마지막 본문이 빈 문자열이면 저장된 본문을 유지합니다. 본문만 빈 값으로 지우려면 `text(targets, definition, "")`를 사용하십시오.

## 충돌 방식과 중지

동일 채널의 팝업이 겹칠 때 동작은 팝업 메이커 정의의 `conflict`가 결정합니다.

| 값 | 동작 |
| --- | --- |
| `replace` | 기존 채널 팝업과 대기열을 교체 |
| `refresh` | 기존 활성 팝업을 새 인스턴스로 갱신 |
| `queue` | 기존 팝업이 끝난 뒤 재생 |
| `stack` | 동시에 재생하며 세로로 간격을 둠 |
| `ignore` | 같은 채널이 이미 재생 중이면 새 요청 무시 |

`show`, `text`, `timed`는 생성된 런타임 UUID를 반환하지 않으므로 스크립트에서 중지할 때는 정의에 저장된 `instanceKey`를 사용합니다.

```js
drmPopup.stop(event.player, "area_title");
drmPopup.clear(event.player);
```

## 정책 제한과 오류 확인

팝업 정책 GUI의 다음 값이 스크립트 호출에도 적용됩니다.

- `allowTextOverride`: `text`와 본문을 포함한 `timed` 허용 여부
- `allowTimingOverride`: `timed` 허용 여부
- `maxTextLength`: 제목·부제목·본문 최대 길이
- `maxDurationTicks`: 전체 타임라인 최대 틱
- `maxActivePerPlayer`, `maxQueuedPerPlayer`: 활성·대기 인스턴스 한도

정의 또는 GUI JSON을 읽지 못하거나 정책이 덮어쓰기를 막으면 호출은 `0`을 반환하고 `lastError()`에 이유를 저장합니다.

```js
var sent = drmPopup.text(event.player, "quest_notice.json", "Quest updated");
if (sent == 0) {
    event.npc.say("popup failed: " + drmPopup.lastError());
}
```

## 타 모드 스킬과 조합

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "cataclysm:void_rune",
        event.player,
        4,
        drmSkill.options().set("damage", 14)
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "skill_notice.json",
            "Void Rune\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

공급자 목록, 스킬 ID 조회, 대상·방향 시전, 옵션, 결과 코드와 쿨다운은 **타 모드 스킬 스크립트 API** 문서를 확인하십시오.

## 문제 해결

1. `drmPopup`이 정의되지 않으면 Forge DRM과 CustomNPCs가 함께 로드됐는지 확인합니다.
2. `lastError()`에 `Unable to load popup definition`이 나오면 팝업 메이커의 저장 파일명을 확인합니다.
3. GUI 관련 오류면 정의의 GUI JSON이 공용 GUI 저장소에 존재하는지 확인합니다.
4. `text` 또는 `timed`만 실패하면 팝업 정책의 덮어쓰기 허용값을 확인합니다.
5. 팝업이 보이지 않으면 정의의 `enabled`, 컴포넌트 `enabled`, 채널 충돌 방식과 활성·대기 한도를 확인합니다.

