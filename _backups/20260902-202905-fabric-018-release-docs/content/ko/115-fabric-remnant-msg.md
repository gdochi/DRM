---
title: 레머넌트 Msg
slug: remnant-msg
order: 115
description: Remnant Msg Editor에서 메시지 문서, 정책, 조건, 액션, GUI 연결을 구성하는 방법입니다.
product: core-fabric
category: 레머넌트 Msg
section: remnant-msg
status: 안정
version: 0.1.7
audience: 제작자 / 운영자
tags:
  - remnant
  - message
---

## 역할

Remnant Msg는 일반 NPC 대화와 별도로 월드 안 메시지, 안내문, 상호작용 메시지를 관리하는 기능입니다. 메시지 문서, 정책, 표시 GUI, 마커/세터 아이템이 함께 동작합니다.

대화 에디터가 NPC와 대화 흐름을 만드는 도구라면, Remnant Msg Editor는 특정 위치나 상호작용에 붙는 메시지를 관리하는 도구입니다.

## 저장 위치

| 데이터 | 경로 |
| --- | --- |
| 메시지 | `config/dochi_rpg_maker/remnant_msg/messages` |
| 정책 | `config/dochi_rpg_maker/remnant_msg/policies` |
| 표시 GUI | `config/dochi_rpg_maker/gui/default_remnant_msg_gui.json` 또는 별도 `remnant_msg` GUI |

메시지 JSON kind는 `remnant_msg`, 정책 JSON kind는 `remnant_msg_policy`입니다.

## 상단 버튼

| 버튼 | 기능 |
| --- | --- |
| `Editors` | 에디터 선택 UI로 돌아갑니다. |
| `Create New` | 새 메시지 문서를 만듭니다. |
| `Load` | 메시지 또는 정책 JSON을 불러옵니다. |
| `Save` | 현재 문서를 저장합니다. |
| `Save As` | 새 파일명으로 저장합니다. |
| `Reset` | 현재 초안을 기본값으로 되돌립니다. |
| `World List` | 월드에 배치된 레머넌트 메시지 목록 흐름을 엽니다. |
| `Close` | 에디터를 닫습니다. |

## 페이지 구성

| 페이지 | 역할 |
| --- | --- |
| `Message` | 메시지 이름, GUI 파일, 본문, 텍스트 스타일을 편집합니다. |
| `Interact Conditions` | 플레이어가 메시지와 상호작용할 수 있는 조건을 정합니다. |
| `View Conditions` | 메시지가 보일 조건을 정합니다. |
| `View Actions` | 메시지를 본 뒤 실행할 액션을 정합니다. |

조건과 액션의 기본 방식은 Dialogue Editor와 비슷하지만, 적용 위치가 NPC 대화가 아니라 레머넌트 메시지입니다.

## 메시지 문서 필드

| 필드 | 의미 |
| --- | --- |
| `type` | 메시지 문서 타입입니다. |
| `id` | 메시지 고유 ID입니다. |
| `name` | 에디터와 목록에 표시되는 이름입니다. |
| `enabled` | 메시지 사용 여부입니다. |
| `message` | 실제 표시할 본문입니다. |
| `messageStyles` | 본문 일부에 적용할 색상, 굵게, 기울임, 밑줄, 취소선 스타일입니다. |
| `gui` | 사용할 `remnant_msg` GUI 파일입니다. |
| `useConditionsEnabled` | 상호작용 조건 사용 여부입니다. |
| `messageConditionsEnabled` | 보기 조건 사용 여부입니다. |
| `messageActionsEnabled` | 보기 액션 사용 여부입니다. |
| `messageTrigger` | 액션 실행 트리거입니다. |

`messageTrigger`는 기본적으로 `every_view`와 `once_per_player` 흐름을 사용합니다.

## 세터와 World List

- `remnant_msg_setter`로 블록 면을 우클릭하면 해당 면 방향을 기준으로 메시지 마커를 배치합니다.
- 허공 우클릭 또는 웅크린 채 블록 우클릭은 `World List`를 엽니다.
- 목록은 페이지 이동과 선택 이동을 지원하며 `Edit`, `Teleport`, `Delete`, `Refresh`로 배치된 마커를 관리합니다.
- 일반 사용자의 세터 소비, JSON/트리거 사용 가능 여부와 마커 수명은 정책 파일이 결정합니다.

0.1.7의 메시지/정책 선택 창은 서버 JSON 목록을 검색할 수 있습니다. 마커 외형은 `Default`, `Item`, `Block` 중에서 고르고, 아이템/블록은 이름·네임스페이스·ID로 검색합니다. `Scale`은 `0.05`부터 `16.0`까지이며, `Billboard`는 `fixed`, `vertical`, `horizontal`, `center`를 지원합니다. 아이템 외형은 `none`, 1·3인칭 손, `head`, `gui`, `ground`, `fixed` 변환을 선택할 수 있습니다. 이 값은 서버에서 다시 검증되어 마커 SavedData와 표시 엔티티에 저장됩니다.

마커를 사용하면 정책에 따라 내장 메시지 작성 화면 또는 JSON 메시지 선택 화면이 열립니다. 런타임은 상호작용 조건과 보기 조건을 검사하고, 메시지를 표시한 뒤 `messageTrigger` 기준으로 액션을 실행합니다.

## 정책 문서 필드

| 필드 | 의미 |
| --- | --- |
| `generalCanWriteMessage` | 일반 사용자가 메시지 작성 기능을 쓸 수 있는지 정합니다. |
| `generalCanUseJson` | 일반 사용자가 JSON 메시지를 사용할 수 있는지 정합니다. |
| `generalCanUseTriggers` | 일반 사용자가 트리거를 사용할 수 있는지 정합니다. |
| `adminCanUseJson` | 관리자 JSON 사용 권한입니다. |
| `adminCanUseTriggers` | 관리자 트리거 사용 권한입니다. |
| `consumeSetterOnGeneralUse` | 일반 사용자가 세터 아이템을 쓰면 소비할지 정합니다. |
| `markerLifetimeTicks` | 마커 유지 시간입니다. 0이면 별도 제한을 두지 않습니다. |
| `maxMessageLength` | 메시지 본문 최대 길이입니다. |

## 가능한 것

- 월드 위치나 마커에 메시지를 연결할 수 있습니다.
- 메시지 본문 일부에 색상과 글자 스타일을 줄 수 있습니다.
- 보기 조건과 상호작용 조건을 따로 설정할 수 있습니다.
- 메시지를 볼 때 태그, 명령, 아이템 같은 액션을 실행할 수 있습니다.
- GUI Maker의 `remnant_msg` 타입 GUI로 표시 화면을 바꿀 수 있습니다.

## 제한

- Remnant Msg는 대화 트리 편집기가 아닙니다. 여러 선택지를 가진 NPC 대화는 Dialogue Editor가 담당합니다.
- 메시지 표시 GUI는 `gui` 저장소를 사용하지만, `guiType`은 `remnant_msg`여야 합니다.
- 정책은 권한과 사용 범위를 정하는 문서입니다. 실제 메시지 본문은 메시지 문서에 있어야 합니다.
- 마커와 세터 아이템은 월드 배치 흐름에 연결됩니다. 단순 JSON 작성만으로 월드에 자동 배치되지는 않습니다.
