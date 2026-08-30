---
title: 스탯 빌더와 아이템 에디터
slug: stat-item-systems
order: 110
description: 커스텀 스탯 세트, 투자 비용, 데이터베이스 아이템, 요구치, 보너스, 속성, 스케일링을 설명합니다.
product: core
category: 스탯과 아이템
section: stat-item
status: 안정
version: 0.1.4
audience: RPG 시스템 제작자
tags:
  - stats
  - items
---

## Stat Builder

스탯 세트는 `config/dochi_rpg_maker/stats/sets/`에 저장되고 `stats/active_set.json`이 런타임 세트를 선택합니다. 각 스탯에는 ID, 이름, 설명, 아이템 아이콘, 최소/최대/기본값, 투자 비용, 바닐라/모드 속성 효과를 설정할 수 있습니다.

투자 재화는 Minecraft XP 레벨, DRM 커런시, 아이템 중에서 선택합니다. 비용 증가는 base, step, multiplier로 계산합니다.

플레이어 투자 화면 기본 키는 `Y`입니다. `Allow Y key allocation UI`는 활성 세트를 키바인드로 열 수 있는지 결정합니다. 다이얼로그의 `Go Stat Builder`는 이 키바인드 전용 설정과 별개로 같은 런타임 화면을 엽니다.

번들 `default_stat_gui.json`은 왼쪽의 넓은 스크롤 목록과 오른쪽의 값, 비용, 설명, 투자 버튼을 분리합니다. GUI Maker에서 복사본을 수정하세요.

## Item Editor

아이템 정의는 `config/dochi_rpg_maker/items/definitions/`에 저장되고, 공용 카테고리, 희귀도, 툴팁 형식은 `items/editor_settings.json`에 저장됩니다.

아이템 정의에서 설정할 수 있는 항목은 다음과 같습니다.

- carrier/category, 템플레이트 아이템, 이름, 희귀도, 광택, 스택, 내구도, 로어
- 할당 스탯 요구치
- 장착 스탯 보너스
- 바닐라/모드 속성 수정치와 장비 슬롯
- 스탯 포인트당 스케일링
- 툴팁 섹션 순서와 표시 여부

## 요구치 미달 페널티

요구치는 할당 스탯만 사용하므로 아이템 자신의 보너스로 자기 요구치를 충족할 수 없습니다. 요구치가 부족해도 아이템을 들고 장착하고 공격할 수 있습니다.

`Unmet penalty %`는 아이템 기여분에서 제거할 비율입니다.

| 페널티 | 미달 상태에서 남는 기여분 |
| --- | --- |
| `0` | 100% |
| `25` | 75% |
| `100` | 0% |

이 배율은 장착 스탯 보너스, 설정한 속성 수정치, 스탯 스케일링 수정치에 적용됩니다. 템플레이트 아이템 자체의 기본 동작이 설정된 수정치로 표현되지 않았다면 그 기본 동작까지 삭제하거나 교체하지는 않습니다.

:::tip 테스트
`Give Test Item`을 쓰기 전에 정의를 저장하세요. 미리보기 또는 테스트 아이템을 호버해 생성된 툴팁을 확인하고, 요구치를 충족한 플레이어와 미달 플레이어를 각각 테스트하세요.
:::

