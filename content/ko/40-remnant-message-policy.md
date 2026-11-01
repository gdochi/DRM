---
title: 메시지와 정책
slug: remnant-message-policy
order: 116
description: Remnant Msg의 메시지 문서와 정책 문서가 나뉘는 기준입니다.
product: core
category: 레머넌트 Msg
section: remnant-msg
status: 안정
version: 0.3.1
audience: 제작자 / 운영자
tags:
  - remnant
  - policy
---

## 안내문을 볼 사람과 볼 때 할 일 정하기

먼저 [Remnant 안내문](#core/remnant-msg)을 만들고 **Interact Conditions / View Conditions / View Actions**를 설정합니다. 월드에 놓는 순서는 [마커 설치](#core/remnant-marker-gui)를 따릅니다.

| 만들고 싶은 동작 | 열 곳 |
| --- | --- |
| 특정 플레이어만 마커를 사용 | **Interact Conditions** |
| 조건에 맞는 사람에게만 본문 표시 | **View Conditions** |
| 읽었을 때 태그·아이템 같은 동작 실행 | **View Actions** |

조건을 넣은 뒤 **Enable**도 켭니다. 여러 조건을 모두 만족해야 하면 **and**, 하나만 만족해도 되면 **or**입니다. 보기 액션을 매번 실행할지 플레이어마다 한 번만 실행할지도 정한 뒤 저장합니다. 이 설정은 해당 메시지에 적용됩니다.

![View Conditions의 Enable과 조건 목록.](assets/media/guides/drm-031-forge1201/remnant-view-conditions.png "DRM 0.3.1 / Forge 1.20.1. 조건을 추가하는 것과 조건 검사를 켜는 것은 별도입니다. Interact는 사용 허용, View는 표시 허용을 다룹니다.")

## 메시지 파일 참고

외부에서 파일 내용을 확인할 때 쓰는 필드입니다. 문구·조건·액션은 편집 화면에서 작성해도 됩니다.

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
