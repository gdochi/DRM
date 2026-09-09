---
title: CustomNPCs Stored Data 조건 연동
slug: script-stored-data-conditions
order: 128
description: CustomNPCs 스크립트가 저장한 플레이어, 문맥 엔티티, 월드 Stored Data를 DRM 조건에서 검사하는 방법과 예제입니다.
product: core
category: 스크립트 API
section: script-api
status: 안정
version: 0.1.6
audience: CustomNPCs 스크립트 및 DRM 조건 제작자
tags:
  - script
  - customnpcs
  - storeddata
  - condition
---

## 무엇을 연결하는 기능인가

`cnpc_stored_data` 조건은 CustomNPCs 스크립트 API의 `getStoreddata()`에 저장된 값을 DRM 조건 에디터에서 읽게 해 줍니다. 스크립트가 퀘스트 단계, 보스 페이즈, 월드 챕터 같은 값을 기록하고, DRM의 대화·텔레포터·퀘스트·Remnant Message가 그 값을 조건으로 사용할 수 있습니다.

이 기능은 **조회 전용**입니다. DRM 조건은 값을 읽고 비교할 뿐, 값을 생성·수정·삭제하지 않습니다. 값 변경은 CustomNPCs 스크립트의 `put` 또는 `remove`로 처리합니다.

```text
CustomNPCs 스크립트에서 값 저장
        ↓
플레이어 / 문맥 엔티티 / 월드 Stored Data
        ↓
DRM의 cnpc_stored_data 조건에서 조회 및 비교
        ↓
대화 분기, 선택지, 텔레포트 허용, 퀘스트 시작 가능 여부 결정
```

:::warning 필요한 모드
이 조건을 실제로 판정하려면 서버에 CustomNPCs가 로드되어 있어야 합니다. CustomNPCs가 없거나 스크립트 API에 접근할 수 없으면 조건은 오류를 내며 통과하지 않고 조용히 `false`가 됩니다.
:::

## 가장 빠른 사용 예

### 1. CustomNPCs 스크립트에서 값 저장

NPC의 `Interact` 스크립트에 다음 코드를 넣습니다. 플레이어가 NPC를 클릭할 때 플레이어 Stored Data에 숫자 `3`이 저장됩니다.

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
    event.player.message("퀘스트 단계가 3으로 변경되었습니다.");
}
```

### 2. DRM 조건 에디터에서 조건 추가

조건 목록에서 `CustomNPCs Stored Data`를 추가하고 아래처럼 설정합니다.

| 항목 | 입력 값 |
| --- | --- |
| Type | `CustomNPCs Stored Data` |
| Scope | `Player` |
| Key | `my_pack.quest.stage` |
| Operator | `>=` |
| Value Type | `Number` |
| Expected Value | `3` |

이제 해당 조건은 `my_pack.quest.stage`가 숫자로 해석되며 `3` 이상일 때만 통과합니다.

:::note 에디터 입력과 JSON
에디터에서는 `3`만 입력하면 됩니다. JSON의 따옴표나 `"value": "3"` 같은 문법을 직접 쓸 필요가 없습니다. 아래 JSON 예제는 파일을 직접 편집하거나 애드온을 개발할 때만 참고하십시오.
:::

## 조건을 붙일 수 있는 위치

공용 조건 에디터에서 타입을 `CustomNPCs Stored Data`로 선택합니다.

| 기능 | 대표 위치 | `Player` | `Context Entity` | `World` |
| --- | --- | --- | --- | --- |
| Dialogue | 노드, 시작 route, 선택지의 Conditions | 가능 | 가능. 현재 대화 NPC | 가능 |
| Teleporter | Interaction Conditions, 목적지 Access Conditions | 가능 | 가능. 텔레포터 NPC | 가능 |
| Quest | Availability → Additional Conditions → Conditions | 가능 | 실행 경로에 NPC 문맥이 있을 때만 가능 | 가능 |
| Remnant Message | Use Conditions, Message Conditions | 가능 | 현재 실행 경로에서는 문맥 엔티티가 전달되지 않아 항상 실패 | 가능 |

퀘스트의 `Context Entity`는 특히 주의해야 합니다. NPC가 직접 수행하는 퀘스트 판정에는 NPC 문맥이 들어올 수 있지만, 자동 갱신·명령·백그라운드 판정처럼 NPC 없이 수행되는 경로에서는 문맥이 없습니다. 모든 경로에서 같은 결과가 필요하면 `Player` 또는 `World`를 사용하십시오.

## 각 입력 항목

### Scope

`Scope`는 어느 객체의 Stored Data를 읽을지 정합니다.

| 에디터 값 | JSON 값 | 읽는 대상 | 스크립트에서 같은 위치에 쓰는 예 |
| --- | --- | --- | --- |
| Player | `player` | 조건을 판정 중인 플레이어 | `event.player.getStoreddata()` |
| Context Entity | `context_entity` | 조건과 함께 전달된 엔티티. 보통 현재 NPC | `event.npc.getStoreddata()` |
| World | `world` | 판정 중인 플레이어가 현재 있는 서버 월드 | `event.player.getWorld().getStoreddata()` 또는 `event.npc.getWorld().getStoreddata()` |

`World` 값은 차원별 월드 데이터입니다. 오버월드에서 저장한 값과 네더에서 저장한 값은 같은 대상으로 간주하지 마십시오. 판정 시점에 플레이어가 있는 `ServerLevel`을 읽습니다.

### Key

`Key`는 `put`에 사용한 문자열과 글자 하나까지 같아야 합니다. 대소문자도 구분됩니다.

```js
event.player.getStoreddata().put("my_pack.quest.stage", 3);
```

위 코드와 연결되는 Key는 정확히 다음과 같습니다.

```text
my_pack.quest.stage
```

빈 Key는 항상 실패합니다. 다른 스크립트와 충돌하지 않도록 `팩ID.기능.값` 형태를 권장합니다.

```text
my_pack.quest.stage
my_pack.boss.defeated
my_pack.dialogue.blacksmith_intro
```

### Operator

| Operator | 의미 | Expected Value 필요 여부 |
| --- | --- | --- |
| `exists` | Key가 존재하면 통과 | 필요 없음 |
| `not_exists` | 정상적으로 Stored Data에 접근했고 Key가 없으면 통과 | 필요 없음 |
| `==` | 실제 값과 기대 값이 같으면 통과 | 필요 |
| `!=` | 실제 값과 기대 값이 다르면 통과 | 필요 |
| `>` | 실제 숫자가 기대 숫자보다 큼 | 필요 |
| `>=` | 실제 숫자가 기대 숫자 이상 | 필요 |
| `<` | 실제 숫자가 기대 숫자보다 작음 | 필요 |
| `<=` | 실제 숫자가 기대 숫자 이하 | 필요 |

`exists`와 `not_exists`를 고르면 Value Type과 Expected Value가 숨겨집니다. 값의 내용이 아니라 Key의 존재 여부만 검사하기 때문입니다.

### Value Type

| Value Type | 판정 규칙 | 적합한 용도 |
| --- | --- | --- |
| Auto | 저장된 실제 값이 `Number`면 숫자, 문자열이면 문자열로 비교 | 저장 타입이 명확한 일반적인 경우 |
| String | 실제 값을 문자열로 보고 `==`, `!=`만 지원 | 상태명, ID, 플래그 |
| Number | 실제 숫자 또는 숫자 문자열을 유한한 실수로 변환해 비교 | 단계, 점수, 횟수, 타이머 |

문자열 비교는 정확한 대소문자를 구분합니다. `READY`와 `ready`는 다른 값입니다. `String`에서 `>`, `>=`, `<`, `<=`를 사용하면 조건은 통과하지 않습니다.

`Number`는 실제 값이 숫자이거나 `"3.5"`처럼 숫자로 변환 가능한 문자열일 때 사용할 수 있습니다. 빈 문자열, `abc`, `NaN`, 무한대는 유효한 숫자가 아니므로 실패합니다.

:::warning Boolean과 복합 객체
현재 비교기는 `Number`와 문자열만 비교합니다. Boolean, 배열, 맵, Java 객체 같은 복합 값은 `exists` 검사에는 쓸 수 있지만 값 비교는 실패합니다. 참/거짓 플래그는 `1`/`0` 또는 `"yes"`/`"no"`로 저장하는 방식을 권장합니다.
:::

## 스크립트 작성 예제

### 플레이어 퀘스트 단계 저장

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
}
```

DRM 조건:

```text
Scope: Player
Key: my_pack.quest.stage
Operator: >=
Value Type: Number
Expected Value: 3
```

### 문자열 상태 저장

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.state", "ready");
}
```

DRM 조건:

```text
Scope: Player
Key: my_pack.quest.state
Operator: ==
Value Type: String
Expected Value: ready
```

### 값의 존재 여부만 검사

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.intro.seen", 1);
}
```

처음 본 플레이어만 처리하려면 `not_exists`, 이미 본 플레이어만 처리하려면 `exists`를 사용합니다. 이때 Expected Value는 입력하지 않습니다.

### NPC의 보스 페이즈 저장

```js
function init(event) {
    event.npc.getStoreddata().put("my_pack.boss.phase", 1);
}

function damaged(event) {
    if (event.npc.getHealth() <= event.npc.getMaxHealth() * 0.5) {
        event.npc.getStoreddata().put("my_pack.boss.phase", 2);
    }
}
```

이 NPC와 연결된 대화 또는 텔레포터 조건은 다음처럼 설정합니다.

```text
Scope: Context Entity
Key: my_pack.boss.phase
Operator: >=
Value Type: Number
Expected Value: 2
```

`Context Entity`가 없는 퀘스트 자동 판정이나 Remnant Message에서는 이 예제가 통과하지 않습니다.

### 월드 공용 챕터 저장

```js
function interact(event) {
    event.npc.getWorld().getStoreddata().put("my_pack.world.chapter", "chapter_2");
}
```

DRM 조건:

```text
Scope: World
Key: my_pack.world.chapter
Operator: ==
Value Type: String
Expected Value: chapter_2
```

같은 월드의 모든 플레이어가 이 값을 공유합니다.

### 숫자 값을 안전하게 증가

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var current = data.has("my_pack.kill.count")
        ? Number(data.get("my_pack.kill.count"))
        : 0;

    if (!isFinite(current)) {
        current = 0;
    }

    data.put("my_pack.kill.count", current + 1);
}
```

DRM에서는 `Value Type: Number`, `Operator: >=`, `Expected Value: 10`으로 10회 이상인지 검사할 수 있습니다.

### 값 삭제와 초기화

```js
function interact(event) {
    event.player.getStoreddata().remove("my_pack.quest.stage");
}
```

삭제 후에는 해당 Key의 `not_exists`가 통과하고 `exists` 및 모든 값 비교는 실패합니다. 값을 `0`으로 바꾸는 것과 Key를 삭제하는 것은 다른 동작입니다.

### 저장 값 확인용 디버그 메시지

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var key = "my_pack.quest.stage";
    var value = data.has(key) ? String(data.get(key)) : "<missing>";
    event.player.message(key + " = " + value);
}
```

## 완성 예제: 단계에 따라 대화 선택지 열기

목표는 플레이어가 열쇠 NPC를 클릭한 뒤에만 문지기 대화의 선택지가 보이게 만드는 것입니다.

### 열쇠 NPC 스크립트

```js
function interact(event) {
    var data = event.player.getStoreddata();
    data.put("my_pack.gate.permission", "granted");
    event.player.message("성문 통행 허가를 받았습니다.");
}
```

### 문지기 Dialogue 선택지 조건

```text
Type: CustomNPCs Stored Data
Scope: Player
Key: my_pack.gate.permission
Operator: ==
Value Type: String
Expected Value: granted
```

이 조건을 `성문을 열어 달라고 한다` 선택지에 붙이면 허가를 받은 플레이어에게만 선택지가 표시됩니다. 같은 조건을 Teleporter 목적지의 Access Conditions에 붙이면 화면 표시뿐 아니라 실제 이동 허용도 함께 제한할 수 있습니다.

## 여러 조건 조합

조건 그룹의 모드는 다음처럼 작동합니다.

| Mode | 결과 |
| --- | --- |
| AND | 모든 조건이 `true`여야 통과 |
| OR | 조건 중 하나 이상이 `true`면 통과 |

예를 들어 퀘스트 단계가 3 이상이고 열쇠로 쓰는 철사 덫 갈고리도 있어야 한다면 `AND` 그룹에 Stored Data 조건과 Item 조건을 함께 넣습니다.

```text
AND
├─ CustomNPCs Stored Data: my_pack.quest.stage >= 3
└─ Item: minecraft:tripwire_hook >= 1
```

조건 그룹 자체가 꺼져 있으면 그 그룹은 적용되지 않습니다. Quest에서는 `Availability → Additional Conditions`의 활성 상태와 AND/OR 모드도 저장되므로, 조건을 만들고도 그룹을 꺼 둔 것은 아닌지 확인하십시오.

## JSON 필드 참조

에디터 사용자는 이 JSON을 직접 작성할 필요가 없습니다. 애드온 제작, 파일 점검, 수동 복구 시에만 사용하십시오.

```json
{
  "type": "cnpc_stored_data",
  "scope": "player",
  "key": "my_pack.quest.stage",
  "op": ">=",
  "valueType": "number",
  "value": "3"
}
```

| 필드 | 필수 | 허용 값 / 기본 의미 |
| --- | --- | --- |
| `type` | 예 | 반드시 `cnpc_stored_data` |
| `scope` | 예 | `player`, `context_entity`, `world` |
| `key` | 예 | 비어 있지 않은 Stored Data Key |
| `op` | 예 | `exists`, `not_exists`, `==`, `!=`, `>`, `>=`, `<`, `<=` |
| `valueType` | 값 비교 시 | `auto`, `string`, `number` |
| `value` | 값 비교 시 | 에디터의 Expected Value |

### Dialogue 조건 배열 예

```json
{
  "conditionMode": "and",
  "conditions": [
    {
      "type": "cnpc_stored_data",
      "scope": "player",
      "key": "my_pack.quest.stage",
      "op": ">=",
      "valueType": "number",
      "value": "3"
    }
  ]
}
```

### Teleporter 조건 그룹 예

```json
{
  "interactionConditions": {
    "enabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.gate.permission",
        "op": "==",
        "valueType": "string",
        "value": "granted"
      }
    ]
  }
}
```

목적지별 조건은 해당 목적지의 `accessConditions`에 같은 조건 그룹 구조를 넣습니다.

### Quest 선행 조건 예

```json
{
  "prerequisites": {
    "conditionsEnabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.quest.stage",
        "op": ">=",
        "valueType": "number",
        "value": "3"
      }
    ]
  }
}
```

## 레거시 `stored` 타입 이관

이전 DRM 버전의 `stored` 조건은 제거되었습니다. 조건 목록과 신규 JSON에는 `cnpc_stored_data`만 사용합니다.

기존 대화·퀘스트·텔레포터·Remnant Message JSON에 `"type": "stored"`가 남아 있으면 DRM은 이를 `cnpc_stored_data`의 이전 별칭으로 읽습니다. 조건 에디터에서 해당 파일을 다시 저장하면 `type`이 `cnpc_stored_data`로 정규화됩니다. 별도의 레거시 DRM 런타임 저장소를 더 이상 조회하지 않습니다.

레거시 JSON에는 Scope와 Value Type이 없을 수 있습니다. 이 경우 기본값은 `scope: "player"`, `valueType: "auto"`이며, 기존 `key`, `op`, `value`는 그대로 사용합니다. 새 조건은 에디터에서 `CustomNPCs Stored Data`를 선택해 작성하십시오.

## 실패 시 판정 규칙

이 조건은 서버에서 판정하며, 잘못된 설정이나 선택적 모드 문제는 모두 안전하게 실패합니다.

| 상황 | 결과 |
| --- | --- |
| Key가 정상적으로 존재 | `exists`는 `true`, `not_exists`는 `false` |
| Stored Data 접근은 성공했지만 Key가 없음 | `not_exists`만 `true`; 나머지는 `false` |
| CustomNPCs가 없음 | 모든 연산이 `false` |
| CustomNPCs API를 사용할 수 없음 | 모든 연산이 `false` |
| `Context Entity`를 골랐지만 문맥 엔티티가 없음 | 모든 연산이 `false` |
| Scope, Operator, Value Type이 알 수 없는 값 | `false` |
| Key가 비어 있음 | `false` |
| 숫자 변환 실패 | `false` |
| 실제 값이 Boolean 또는 복합 객체 | 값 비교는 `false` |

중요하게도 CustomNPCs 자체를 사용할 수 없는 상황은 Key가 없는 상황과 다릅니다. 따라서 모드 또는 API 접근 오류가 발생했다고 `not_exists`가 잘못 통과하지 않습니다.

## 문제 해결

### 조건이 항상 실패할 때

다음 순서로 확인하십시오.

1. 서버에 CustomNPCs가 실제로 로드되었는지 확인합니다.
2. Type이 `CustomNPCs Stored Data`인지 확인합니다. 이전 JSON의 `stored`는 다시 저장해 새 타입으로 정규화합니다.
3. Scope가 스크립트에서 값을 쓴 대상과 같은지 확인합니다.
4. Key의 대소문자, 점, 밑줄, 공백을 확인합니다.
5. 숫자 비교라면 Value Type을 `Number`로 두고 저장 값이 숫자로 변환 가능한지 확인합니다.
6. `Context Entity`라면 해당 기능의 실행 경로가 NPC 문맥을 제공하는지 확인합니다.
7. CustomNPCs 스크립트 디버그 메시지로 실제 값을 출력합니다.

### 로그 확인

CustomNPCs 연동 API를 해석하거나 읽는 과정에서 예외가 발생하면 DRM이 같은 오류를 반복해서 도배하지 않도록 오류 서명별로 한 번 기록합니다.

```text
config/dochi_rpg_maker/debug.log
```

검색할 문구:

```text
CustomNPCs Stored Data access failed
```

Key가 단순히 없거나 비교 결과가 `false`인 정상 판정은 오류 로그로 남지 않습니다.

### 흔한 실수

| 실수 | 수정 방법 |
| --- | --- |
| 스크립트는 Player에 저장했는데 Scope를 World로 선택 | Scope를 Player로 변경 |
| `put("stage", 3)` 후 String 값 `03`과 비교 | Number로 `3`과 비교하거나 저장 형식을 통일 |
| `ready`를 저장하고 `READY`와 비교 | 대소문자를 동일하게 입력 |
| Remnant Message에서 Context Entity 사용 | Player 또는 World로 변경 |
| Key를 `0`으로 바꾸고 `not_exists`를 기대 | `remove(key)`로 Key 자체를 삭제 |
| Boolean `true`를 `==`로 비교 | `1` 또는 `"true"` 같은 숫자/문자열로 저장 |

## 제작 권장 규칙

- Key는 `팩ID.시스템.항목`처럼 충돌 가능성이 낮은 이름을 사용합니다.
- 단계와 횟수는 숫자, 상태명과 ID는 문자열로 저장합니다.
- 여러 스크립트가 같은 Key를 쓴다면 저장 타입도 하나로 통일합니다.
- 모든 실행 경로에서 필요한 조건은 Player 또는 World Scope를 사용합니다.
- 월드 Scope는 해당 차원의 모든 플레이어가 공유한다는 점을 고려합니다.
- 설정 파일을 직접 수정하기보다 DRM 조건 에디터를 우선 사용합니다.
