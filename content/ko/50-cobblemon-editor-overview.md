---
title: drm_cobblemon_editor 개요
slug: cobblemon-editor-overview
order: 500
description: drm_cobblemon_editor의 기능 범위, 지원 환경, 에디터와 런타임의 역할을 정리합니다.
product: drm-cobblemon-editor
category: 개요
section: overview
status: Draft
version: 0.1.0
audience: 코블몬 NPC와 상점을 제작하는 사용자
tags:
  - cobblemon
  - customnpcs
  - overview
---

## drm_cobblemon_editor란?

`drm_cobblemon_editor`는 Fabric 1.21.1용 DRM 애드온입니다. CustomNPCs NPC에 Cobblemon 트레이너 또는 한 마리의 포켓몬 전투 데이터를 적용하고, 전투 직전 연출과 포켓몬 판매·교환·경매 화면까지 같은 DRM 제작 흐름에서 관리합니다.

이 모드는 Cobblemon 전투를 별도 전투 엔진으로 흉내 내지 않습니다. 플레이어의 실제 Cobblemon 파티와 Cobblemon 1.7.3 기본 배틀 시스템을 사용합니다. 제작자는 JSON을 직접 외우기보다 DRM의 에디터 선택 UI, `Save As`, NPC 적용 화면을 통해 콘텐츠를 만드는 것이 기본입니다.

:::note 표시명과 내부 ID
모드 목록과 JAR에는 `drm_cobblemon_editor`가 표시됩니다. 기존 데이터 호환성을 위해 내부 모드 ID와 리소스 네임스페이스는 `cobble_npc`를 유지합니다. `cobble_npc:*` ID를 임의로 `drm_cobblemon_editor:*`로 바꾸지 마세요.
:::

## 지원 환경

| 구성 요소 | 필요 여부 | 현재 지원 범위 |
| --- | --- | --- |
| Minecraft | 필수 | Java Edition 1.21.1 |
| Fabric Loader | 필수 | 0.17.2 이상 |
| Fabric API | 필수 | 0.116.6+1.21.1 이상 |
| Java | 필수 | Java 21 이상 |
| DRM | 필수 | `dochi_rpg_maker` 0.1.3 이상 |
| Cobblemon | 필수 | 1.7.3 이상, 1.8.0 미만 |
| CustomNPCs | 필수 | Fabric 1.0.0 |
| CobbleDollars | 선택 | PokéMart의 `cobbledollars` 통화 공급자를 사용할 때 필요 |

현재 배포 대상은 Fabric 1.21.1입니다. Forge 또는 다른 Minecraft 버전용 JAR과 섞어 설치하지 마세요. 일반 멀티플레이에서는 서버와 접속 클라이언트 양쪽에 같은 버전의 DRM, Cobblemon, CustomNPCs, `drm_cobblemon_editor`를 설치합니다.

## 제공하는 제작 도구

| 제작 도구 | 편집하는 것 | 플레이어가 보는 런타임 |
| --- | --- | --- |
| `Cobblemon Editor` | 트레이너 파티, 포켓몬 자신 전투, 조우 방식, 라운드, 조건, 보상 | 빈손으로 NPC를 우클릭했을 때 배틀 확인 및 Cobblemon 전투 |
| `Battle Presentation Maker` | 전투 직전 레이어, 모델, 배경, 타임라인, 사운드 | 전투가 시작되기 전의 전체 화면 연출과 전투 음악 |
| `PokéMart Editor` | 판매, 교환, 경매, 통화, 재고, 이용 조건 | 빈손으로 PokéMart NPC를 우클릭했을 때 상점 화면 |
| `Cobblemon NPC Appearance` | CustomNPCs NPC의 포켓몬 외형 | 월드에 보이는 NPC 모델 |

앞의 세 도구는 DRM 에디터 선택 UI에 `Add-on` 에디터로 등록됩니다. `Cobblemon NPC Appearance`는 NPC를 대상으로 하는 도구이므로 대상 CustomNPCs NPC가 있어야 합니다.

## 트레이너와 포켓몬 자신 전투

`Cobblemon Editor`에는 두 전투 유형이 있습니다.

| 유형 | 용도 |
| --- | --- |
| `Trainer` | 최대 6마리 파티, Singles/Doubles/Triples, AI Skill, 최대 16개 라운드, 조건과 승리 보상을 가진 트레이너 NPC |
| `Pokemon Itself` | 종, 폼, 성격, 기술, 볼, 지닌 도구와 외형을 지정한 한 마리 포켓몬 NPC |

두 유형은 저장 폴더도 다릅니다. 트레이너 파일을 포켓몬 자신 폴더로 옮기거나 반대로 사용하지 말고, 에디터의 전투 유형과 `Save As` 경로를 맞추세요.

## 런타임 핵심 규칙

- 트레이너 또는 PokéMart 문서를 저장하는 것만으로는 NPC에 적용되지 않습니다. 대상 NPC 적용 흐름에서 저장한 문서를 선택하고 `Apply`해야 합니다.
- 전투 확인과 PokéMart 런타임은 플레이어가 양손을 비운 상태로 CustomNPCs NPC를 우클릭할 때 열립니다.
- DRM 대화나 DRM NPC Shop이 연결된 NPC는 해당 런타임이 일반 우클릭을 우선 사용합니다. 같은 NPC에 배틀을 함께 넣을 때는 대화 액션 또는 별도의 명시적 흐름을 사용하세요.
- PokéMart가 적용된 NPC는 일반 배틀 확인보다 PokéMart 런타임을 먼저 엽니다.
- 트레이너 진행도, 조건 판정, 보상, 재고, 경매는 서버가 최종 판정합니다.

## 권장 제작 순서

1. `Cobblemon Editor`에서 기본 트레이너를 불러오고 한 라운드·한 마리로 전투를 완성합니다.
2. `Save As`로 사용자 파일을 만든 뒤 테스트 CustomNPCs NPC에 적용합니다.
3. 빈손 우클릭으로 실제 Cobblemon 전투가 시작되는지 확인합니다.
4. 조우 감지, 추적, 재대전, 조건, 보상을 하나씩 추가합니다.
5. `Battle Presentation Maker`로 전투 직전 연출을 만들고 트레이너에 연결합니다.
6. 필요할 때 별도의 NPC에 `PokéMart` 역할을 적용합니다.

기본 전투부터 검증하면 문제가 파티 데이터인지, NPC 적용인지, 자동 감지인지, 연출인지 빠르게 분리할 수 있습니다.
