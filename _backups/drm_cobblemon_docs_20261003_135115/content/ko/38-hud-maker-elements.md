---
title: HUD 요소
slug: hud-maker-elements
order: 111
description: HUD Maker의 GROUP, TEXT, BAR, IMAGE 요소와 transform, binding, renderer 구조입니다.
product: core
category: HUD Maker
section: hud-maker
status: 안정
version: 0.1.6
audience: HUD 제작자
tags:
  - hud
  - elements
---

## 요소 추가 버튼

HUD Maker의 HUD 편집 영역에는 요소 추가 버튼이 있습니다.

| 버튼 | 생성 요소 |
| --- | --- |
| `Add Text` | `TEXT` |
| `Add Bar` | `BAR` |
| `Add Image` | `IMAGE` |

선택한 요소가 `GROUP`이면 새 요소가 그 그룹의 자식으로 들어갈 수 있습니다. 그렇지 않으면 현재 HUD 정의의 최상위 요소로 들어갑니다.

## 요소 구조

| 구조 | 의미 |
| --- | --- |
| `id` | 요소 고유 ID입니다. |
| `type` | `GROUP`, `TEXT`, `BAR`, `IMAGE`, `ICON_LIST` 중 하나입니다. |
| `transform` | 위치, 크기, 앵커, z 순서입니다. |
| `binding` | 플레이어 데이터나 화폐 값과 연결하는 정보입니다. |
| `renderer` | 색상, 텍스트, 이미지, 바 표시 방식입니다. |
| `visibility` | 언제 보일지 정하는 조건입니다. |
| `animation` | 표시 애니메이션 설정입니다. |
| `children` | 그룹 안의 자식 요소입니다. |

## transform

| 필드 | 설명 |
| --- | --- |
| `anchor` | 화면 기준 위치입니다. |
| `x`, `y` | 앵커 기준 좌표입니다. |
| `width`, `height` | 요소 크기입니다. |
| `zIndex` | 앞뒤 순서입니다. |

HUD는 화면 해상도와 GUI 스케일에 영향을 받으므로, 앵커와 크기를 같이 고려해야 합니다.

## binding

`binding`은 화면 요소가 어떤 값을 표시할지 정합니다.

| 예시 | 설명 |
| --- | --- |
| 화폐 바인딩 | Currency Editor의 화폐 ID를 기준으로 잔액을 표시합니다. |
| 바닐라 체력 바인딩 | 플레이어 체력 값을 읽습니다. |
| 바닐라 방어도 바인딩 | 플레이어 방어도 값을 읽습니다. |
| 바닐라 허기 바인딩 | 플레이어 허기 값을 읽습니다. |

TEXT는 바인딩 값을 문자열로 표시하고, BAR는 바인딩 값을 비율로 표시하는 식으로 사용합니다.

## renderer

| 요소 타입 | 주요 렌더러 설정 |
| --- | --- |
| `TEXT` | 텍스트, 색상, 정렬, 그림자 |
| `BAR` | 채움 색상, 배경, 비율 방향 |
| `IMAGE` | 이미지 경로, crop, fill mode |
| `GROUP` | 자식 요소를 담는 영역 |
| `ICON_LIST` | 아이콘 개수, 크기, 간격, 채움/배경 색상 |

## 제한

- 요소를 추가하는 것만으로 값이 생기지는 않습니다. 값을 표시하려면 적절한 binding이 필요합니다.
- IMAGE는 텍스처 경로가 맞아야 보입니다.
- BAR는 숫자 또는 비율로 해석할 수 있는 값과 함께 써야 합니다.
- GROUP은 직접 값을 표시하는 요소가 아니라 자식 요소를 묶는 구조입니다.
- ICON_LIST는 방어도처럼 단계형 아이콘 표시에 적합하며 숫자 binding이 필요합니다.
