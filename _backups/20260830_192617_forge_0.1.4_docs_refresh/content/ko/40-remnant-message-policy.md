---
title: 메시지와 정책
slug: remnant-message-policy
order: 116
description: Remnant Msg의 메시지 문서와 정책 문서가 나뉘는 기준입니다.
product: core
category: 레머넌트 Msg
section: remnant-msg
status: 안정
version: 0.1.3
audience: 제작자 / 운영자
tags:
  - remnant
  - policy
---

## 메시지 문서

메시지 문서는 실제로 보여줄 내용을 담습니다.

| 필드 | 설명 |
| --- | --- |
| `id` | 메시지 고유 ID입니다. |
| `name` | 에디터 목록에 보일 이름입니다. |
| `enabled` | 메시지 사용 여부입니다. |
| `message` | 화면에 표시할 본문입니다. |
| `messageStyles` | 본문 일부에 적용할 스타일입니다. |
| `gui` | 표시 화면으로 사용할 `remnant_msg` GUI입니다. |

`messageStyles`는 본문 문자열의 일부 범위에 색상, 굵게, 기울임, 밑줄, 취소선을 적용합니다.

## 조건 페이지

Remnant Msg에는 조건 페이지가 둘 있습니다.

| 페이지 | 필드 | 의미 |
| --- | --- | --- |
| `Interact Conditions` | `useConditions` | 플레이어가 상호작용할 수 있는 조건입니다. |
| `View Conditions` | `messageConditions` | 메시지가 보이는 조건입니다. |

둘 다 `and`와 `or` 모드를 가집니다. 조건 타입은 Dialogue Editor와 같은 계열을 사용합니다.

## 액션 페이지

`View Actions`는 메시지를 볼 때 실행할 액션을 정합니다.

| 필드 | 의미 |
| --- | --- |
| `messageActionsEnabled` | 보기 액션 사용 여부입니다. |
| `messageTrigger` | 액션이 실행되는 기준입니다. |
| `messageActions` | 실행할 액션 배열입니다. |

`messageTrigger`가 `every_view`이면 볼 때마다, `once_per_player`이면 플레이어 기준 한 번만 실행하는 흐름입니다.

## 정책 문서

정책 문서는 누가 메시지 작성, JSON 사용, 트리거 사용을 할 수 있는지 정합니다.

| 필드 | 설명 |
| --- | --- |
| `generalUseAllowed` | 일반 사용자가 세터/마커 사용 흐름에 들어갈 수 있는지 정합니다. |
| `generalCanWriteMessage` | 일반 사용자가 메시지를 작성할 수 있는지 정합니다. |
| `generalCanUseJson` | 일반 사용자가 JSON 메시지를 참조할 수 있는지 정합니다. |
| `generalCanUseTriggers` | 일반 사용자가 트리거를 사용할 수 있는지 정합니다. |
| `adminCanUseJson` | 관리자의 JSON 사용 권한입니다. |
| `adminCanUseTriggers` | 관리자의 트리거 사용 권한입니다. |
| `consumeSetterOnGeneralUse` | 일반 사용자의 세터 아이템 소비 여부입니다. |
| `markerLifetimeTicks` | 마커 유지 시간입니다. |
| `maxMessageLength` | 메시지 최대 길이입니다. |

번들 `default_policy.json`은 일반 사용자의 기본 사용·직접 메시지 작성을 허용하고 JSON/트리거는 막습니다. 관리자는 JSON과 트리거를 사용할 수 있으며, 세터는 기본적으로 소비되지 않고 마커 수명 제한은 0, 최대 메시지 길이는 4096입니다. 기존 정책 파일이 있으면 업데이트가 이를 덮어쓰지 않습니다.

## 역할 분리

| 문서 | 담당 |
| --- | --- |
| 메시지 | 무엇을 보여줄지 |
| 정책 | 누가 어떤 방식으로 사용할 수 있는지 |
| GUI | 화면에 어떻게 보일지 |
| 마커 | 월드 어디에 놓일지 |

## 제한

- 정책에 메시지 본문을 넣지 않습니다.
- 메시지 문서의 조건은 해당 메시지에만 적용됩니다.
- GUI 파일은 표시 모양을 담당하며, 정책 권한을 대신하지 않습니다.
