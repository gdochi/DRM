---
title: 필드와 버튼
slug: currency-fields
order: 91
description: Currency Editor의 주요 버튼, 입력 필드, 저장되는 JSON 값을 설명합니다.
product: core
category: 커런시 에디터
section: currency-editor
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - currency
  - fields
---

## 기본 입력 필드

| 화면 항목 | 저장 필드 | 설명 |
| --- | --- | --- |
| ID | `id` | 화폐 고유 ID입니다. 파일명과 잔액 키에 연결됩니다. |
| Name | `name` | 화면에 표시할 이름입니다. |
| Display Format | `displayFormat` | 숫자를 표시할 형식입니다. `%s` 자리에 잔액이 들어갑니다. |
| HUD Amount | `hudAmountFormat` | HUD 표시를 `compact` 또는 `full`로 정합니다. |
| Death | `deathRule`, `deathLossPercent` | 사망 시 잔액 보존 또는 손실 비율입니다. |
| Item Icon | `itemIcon`, `itemNbt` | 대표 아이콘과 아이템 기반 변환 기준입니다. |

ID는 소문자, 숫자, `_`, `-` 중심으로 쓰는 것이 관리하기 쉽습니다. 파일명은 ID를 기준으로 만들어집니다.

## 스위치

| 스위치 | 저장 필드 | 의미 |
| --- | --- | --- |
| `Shared` | settings 기본 화폐 | 새 상점에서 기본으로 사용할 화폐로 등록합니다. |
| `Enable` | `enabled` | 화폐 사용 여부입니다. |
| `Convert Items` | `autoConvertOnPickup` | 해당 아이템을 주웠을 때 잔액으로 변환합니다. |
| `Always` | `hudAlwaysVisible` | HUD에서 항상 표시합니다. |
| `Pickup Flash` | `hudShowOnPickup` | 잔액 변화가 있을 때 잠시 표시합니다. |
| `Inventory` | `hudShowInInventory` | 인벤토리 화면에서 표시합니다. |

`Shared`는 화폐 정의 자체가 아니라 DRM 기본 설정에도 영향을 주는 버튼입니다. 모든 상점이 반드시 이 화폐를 써야 한다는 뜻은 아닙니다.

## Load와 Save As

`Load`는 화폐 JSON 목록을 열고 검색어로 필터링합니다. 검색 대상은 화폐 ID, 파일명, 표시 이름입니다.

`Save As`는 입력한 이름을 파일명으로 사용합니다. 이미 존재하는 화폐 ID를 다른 파일에 중복 저장하면 나중에 상점 연결이 헷갈릴 수 있으므로, 하나의 화폐는 하나의 ID와 하나의 파일을 기준으로 관리하는 것이 좋습니다.

## Item Icon

`Item Icon`은 화폐를 대표하는 아이템을 고릅니다.

| 값 | 예시 | 의미 |
| --- | --- | --- |
| 아이템 ID | `minecraft:emerald` | 상점과 HUD에서 화폐 아이콘처럼 표시됩니다. |
| NBT | `{CustomModelData:1}` | 특정 모델이나 아이템 데이터를 구분할 때 사용합니다. |

아이템 픽업 변환을 켜면 이 아이템 기준으로 잔액 변환이 일어납니다.

## 표시 형식

`displayFormat`의 기본값은 `%s`입니다.

| 값 | 표시 예 |
| --- | --- |
| `%s` | `1200` |
| `%s G` | `1200 G` |
| `Gold: %s` | `Gold: 1200` |

`hudAmountFormat`은 숫자를 축약해서 보일지, 전체 숫자로 보일지 정합니다. 표시 형식과 HUD 형식은 함께 적용될 수 있으므로 너무 긴 접두어나 접미사는 피하는 편이 좋습니다.

## 제한

- 화폐 정의는 잔액 규칙입니다. 아이템 드롭률이나 몹 보상은 이 에디터가 직접 만들지 않습니다.
- `itemIcon`은 대표 아이콘입니다. HUD의 위치와 크기는 HUD Maker나 GUI Maker에서 정합니다.
- `enabled`를 끄면 해당 화폐를 사용하는 상점이나 HUD 표시에서 의도한 결과가 나오지 않을 수 있습니다.
