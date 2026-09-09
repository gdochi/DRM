---
title: Nurse Joy Editor
slug: cobblemon-nurse-joy
order: 550
description: Nurse Joy 문서, 제한형 대화, 치료기 연결과 런타임 동작입니다.
product: drm-cobblemon-editor
category: 서비스 NPC
section: services
status: Draft
version: 0.1.6
audience: 포켓몬 치료 NPC를 만드는 제작자
tags:
  - nurse-joy
  - healer
  - dialogue
---

## 역할

`Nurse Joy Editor`는 CustomNPCs NPC와 Cobblemon 치료기를 한 세트로 묶습니다. 플레이어가 전용 대화에서 `Heal`을 선택하면 NPC가 연결된 치료기로 이동해 Cobblemon의 기본 치료 동작을 실행하고 원래 자리로 돌아옵니다.

문서는 `config/dochi_rpg_maker/cobblemon/nurse_joy/`에 저장되며 현재 스키마는 `2`입니다.

## 에디터와 런타임 구분

- `Nurse Joy Editor`: 이름, 제한형 대화, 치료기 최대 거리 같은 역할 데이터 편집
- NPC 적용 화면: 문서를 NPC에 연결하고 `Link Machine` 시작
- 런타임: 플레이어가 보는 대화와 NPC의 이동·치료 동작
- DRM GUI Maker: Nurse Joy 전용 규칙을 편집하지 않음. 대화는 DRM 공용 Dialogue GUI를 사용

## 문서 설정

| 설정 | 설명 |
| --- | --- |
| ID | 문서 내부 식별자 |
| Display Name | 제작 목록과 표시용 이름 |
| Max Machine Distance | NPC와 치료기 사이 허용 거리 1–16블록 |
| Dialogue Text | 최대 2048자의 안내 문구 |
| Heal Label | 치료 선택지 표시 문구 |
| Close Label | 닫기 선택지 표시 문구 |

대화 액션은 안전한 두 가지로 고정됩니다.

1. `Heal`: 연결된 치료기 사용
2. `Close`: 대화 닫기

임의 명령이나 보상 액션이 필요한 일반 대화는 DRM Dialogue Editor에서 별도로 만드세요.

## 저장과 Apply

1. `Use Default`로 문서를 엽니다.
2. 표시 이름, 문구와 최대 거리를 설정합니다.
3. `Save As`로 `custom/nurse_joy.json`을 저장합니다.
4. 대상 NPC에 `Nurse Joy` 역할로 `Apply`합니다.

파일 기반 Apply는 원본 JSON을 추적합니다. 같은 경로에 저장한 문구와 거리는 다음 런타임 요청부터 최신값을 사용합니다. 치료기 연결은 문서가 아니라 NPC별 상태이므로 파일 저장만으로 다른 치료기로 바뀌지 않습니다.

## 치료기 연결

1. Nurse Joy가 적용된 대상 NPC를 편집 흐름에서 엽니다.
2. `Link Machine`을 누릅니다.
3. 60초 안에 같은 차원의 Cobblemon 치료기를 Shift+우클릭합니다.
4. NPC와 치료기 사이가 문서의 `Max Machine Distance` 이내인지 확인합니다.
5. 치료기 옆에 NPC가 설 수 있는 안전한 인접 블록을 남깁니다.

한 치료기는 동시에 다른 Nurse Joy NPC의 소유가 될 수 없습니다. 연결된 치료기를 부수면 연결이 해제됩니다.

:::warning 연결된 치료기의 직접 사용
Nurse Joy에 연결된 치료기는 일반 직접 사용이 제한되고 Nurse Joy 런타임이 제어합니다. 공용으로 직접 쓰는 치료기와 연출용 Nurse Joy 치료기를 분리하세요.
:::

## 플레이어 런타임

기본 흐름:

1. 플레이어가 양손을 비우고 Nurse Joy NPC를 우클릭합니다.
2. 제한형 대화에서 `Heal`을 선택합니다.
3. 서버가 플레이어와 NPC, 치료기 상태를 다시 검사합니다.
4. NPC가 치료기 옆 안전 위치로 이동합니다.
5. Cobblemon 치료기가 플레이어 파티를 치료합니다.
6. NPC가 원래 위치와 바라보던 방향으로 돌아옵니다.

다음 조건에서는 치료가 시작되지 않습니다.

- 플레이어가 NPC에서 12블록보다 멀리 있음
- 플레이어가 Cobblemon 배틀 중임
- 치료기가 사라졌거나 충전·사용 가능 상태가 아님
- 다른 치료가 진행 중임
- 안전한 인접 위치가 없음

## 다른 역할과 함께 사용할 때

Nurse Joy만 적용한 NPC는 일반 빈손 우클릭으로 전용 대화를 엽니다. DRM Dialogue 또는 NPC Shop이 같은 NPC의 일반 클릭을 소유하면 Shift+우클릭으로 Nurse Joy 역할에 접근합니다.

PokéMart, Starter Selector, Trainer까지 한 NPC에 모두 넣으면 플레이어가 역할을 찾기 어렵습니다. 명확한 안내 대화가 없다면 역할별 NPC를 나누세요.

## 문제 해결

| 증상 | 확인할 것 |
| --- | --- |
| 대화가 안 열림 | 양손, 다른 DRM 대화/상점, Shift 접근 |
| Link Machine 시간 초과 | 60초 안에 Shift+우클릭했는지 |
| 거리가 멀다고 나옴 | 문서의 최대 1–16블록과 실제 거리 |
| NPC가 이동하지 못함 | 치료기 옆 안전한 바닥과 충돌 공간 |
| 치료가 거부됨 | 플레이어 배틀 상태, 치료기 충전/사용 중 상태 |
| 문구는 바뀌었는데 기계는 그대로 | 정상 동작. 기계는 NPC별 링크이므로 다시 연결 |
