---
title: NPC Spawner
slug: npc-spawner
order: 84
description: 가중치 CustomNPC 소스, 소환 규칙, 조건, 효과, 블록 외형을 설정합니다.
product: core-fabric
category: 핵심 시스템
section: npc-spawner
status: 안정
version: 0.1.7
audience: 제작자 / 운영자
tags:
  - npc
  - spawner
  - world
---

## 개요

`dochi_rpg_maker:npc_spawner`는 전체 CustomNPC 소스를 가중치 풀에서 고르는 서버 권한 블록입니다. 설정, 풀, 활성 리스는 월드 블록 엔티티에 저장되고, 재사용 소스 템플릿과 소유 Soul Stone 스냅샷은 Core config 루트에 저장됩니다.

CustomNPCs는 로더에서 선택 의존성이므로 없어도 DRM Core가 블록을 등록하고 에디터를 열 수 있습니다. 하지만 Filled Soul Stone 검색, 유효한 CustomNPC 소스 생성, 실제 NPC 소환에는 CustomNPCs가 필요합니다.

## 에디터 열기

1. 블록을 받아 배치합니다.

```text
/give @s dochi_rpg_maker:npc_spawner
```

2. `dochi_rpg_maker:dialogue_editor`를 들고 배치된 블록을 우클릭합니다.
3. 편집 권한을 유지하고 대상 블록에서 8칸 안에 있어야 합니다.

빈손 상호작용은 통과합니다. 서버는 블록이 없거나 종류가 다르고, 권한이 부족하거나, 대상이 8칸보다 멀면 편집을 거부합니다.

상단 바에는 `Editors`, `Load`, `Save`, `Reset`, `Close`가 있습니다. 선택한 월드 블록을 직접 수정하므로 `Create New`와 `Save As`는 비활성입니다. `Load`는 검색 가능한 템플릿 라이브러리를 열고, `Reset`은 현재 서버 draft를 복원합니다.

## Source 탭

Source 탭에는 검색/분류 가능한 소스 목록과 적용된 가중치 풀이 있습니다.

| 컨트롤 | 규칙 |
| --- | --- |
| 풀 크기 | 최대 64개 소스 |
| 가중치 | 1~10,000, 기본 100 |
| Add / Remove | 이후 가중치 선택에 반영 |
| Clear All | 확인 절차가 있는 전체 풀 제거 |
| Apply Weight | 선택 소스의 새 가중치 저장 |

소환을 시도할 때마다 현재 가중치를 정규화해 소스 하나를 고릅니다. `Max Active`는 소스별 상한이 아니라 풀 전체 상한입니다.

### 템플릿 라이브러리

새 템플릿은 다음 경로와 형식을 사용합니다.

```text
config/dochi_rpg_maker/npc_spawner/entity_clones/<classification>/<name>.json
format: dochi_rpg_maker_npc_spawner_template
```

소스 ID는 `npc/test_guard`처럼 두 부분입니다. 템플릿은 전체 엔티티 NBT payload와 분류, 엔티티 종류, 필수 모드, subject, party size, level 같은 메타데이터를 보존합니다. 라이브러리는 템플릿 최대 512개, 파일당 최대 2,000,000자를 허용합니다.

레거시 `config/dochi_rpg_maker/cobblemon/entity_clones` 루트와 `cobble_npc_entity_clone` 형식도 마이그레이션용으로 읽을 수 있습니다.

### Filled Soul Stone

CustomNPCs가 설치되어 있으면 플레이어 인벤토리의 호환 Filled Soul Stone이 Source 목록에 `soulstone/<slot>`로 표시됩니다. 이를 추가하면 서버가 다음 경로에 원자적 스냅샷을 만듭니다.

```text
config/dochi_rpg_maker/npc_spawner/spawner_snapshots
```

해당 Spawner가 소유한 스냅샷은 배정 소스를 제거하거나 전체 삭제할 때 필요한 범위에서 정리됩니다. 상단 `Load`에는 라이브러리 템플릿만 나오며 인벤토리 Soul Stone은 Source 탭에 표시됩니다.

## Spawn 탭

현재 설정 레코드는 ConfigVersion 4입니다.

| 설정 | 값 / 범위 |
| --- | --- |
| 소환 모드 | `continuous`, `target_nearby`, `target_enter`, `redstone_pulse` |
| 레드스톤 게이트 | `ignore`, `powered`, `unpowered` |
| 쿨다운 | 20~72,000 tick, 기본 200 |
| Max active | 풀 전체 1~32 |
| Wave size | 소환 시도 1~32회 |
| 대상 반경 | 1~64칸 |
| 위치 오프셋 | -32~32 |
| 소환 반경 | 0~32칸 |
| 기타 스위치 | `enabled`, `requireTarget`, `removeWhenInactive` |

서버는 소스를 만들기 전에 선택한 모드, 레드스톤 게이트, 대상 요구, 쿨다운, 활성 상한, wave 크기, 위치 규칙을 적용합니다.

## Conditions 탭

대상 조건 그룹은 Disabled, AND, OR 모드와 DRM 공용 조건 최대 32개를 지원합니다. Disabled는 저장된 조건 모드를 지우지 않습니다. 행 추가, 복제, 제거, 위/아래 이동, 드래그 순서 변경, 가장자리 자동 스크롤, 삽입 가이드를 사용할 수 있습니다.

## Effects 탭

| 구역 | 옵션 |
| --- | --- |
| Spawner 모델 | `visible`, Default/Item/Block 외형 |
| 크기 | 0.05~16 |
| Billboard | `fixed`, `vertical`, `horizontal`, `center` |
| Item transform | `none`, 1·3인칭 손, `head`, `gui`, `ground`, `fixed` |
| 파티클 | cloud, poof, smoke, large smoke, happy villager, enchant, portal, reverse portal, end rod, flame |

아이템/블록과 파티클 선택기는 검색할 수 있습니다. 서버가 외형 데이터를 검증하고 표시 엔티티를 관리합니다. 잘못된 커스텀 외형은 클라이언트 값을 신뢰하지 않고 기본 Spawner 모델을 남깁니다.

## 저장, 제거, 마이그레이션

- `Save`는 서버 검증 후 draft를 선택한 블록 엔티티에 씁니다.
- 소스 제거와 가중치 변경은 이후 선택에 반영되며 이미 활성화된 무관한 NPC를 제거하지 않습니다.
- ConfigVersion 1~3 설정, 예전 단일 Source 필드, 레거시 분류 ID는 현재 가중치 풀 모델로 마이그레이션됩니다.
- 운영 Spawner를 옮길 때는 `config/dochi_rpg_maker/npc_spawner`뿐 아니라 월드 저장본도 복사해야 합니다.

:::warning 전체 엔티티 payload
Spawner 템플릿은 불투명한 CustomNPC 엔티티 태그를 원자적 payload로 보존합니다. 에디터 또는 신뢰할 수 있는 내보내기 경로를 사용하세요. 일부만 직접 고치면 소스가 무효가 될 수 있습니다.
:::

