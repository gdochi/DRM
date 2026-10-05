---
title: Dochi Cobblemon Editor
slug: cobblemon-editor-overview
order: 500
description: Dochi Cobblemon Editor 현재의 기능 범위와 제작 도구입니다.
product: drm-cobblemon-editor
category: 개요
section: overview
status: Draft
version: Fabric 0.2.2 / NeoForge 0.2.1
audience: 코블몬 NPC와 관련 런타임을 제작하는 사용자
tags:
  - cobblemon
  - customnpcs
  - overview
---

## 무엇을 만드는 애드온인가요?

`Dochi Cobblemon Editor`는 Fabric·NeoForge 1.21.1용 DRM 애드온입니다. CustomNPCs NPC에 Cobblemon 전투, 전투 전 연출, PokéMart, Nurse Joy, 스타터 선택 기능을 적용하고, 재사용할 NPC 클론과 스포너 소스까지 같은 제작 흐름에서 관리합니다.

전투는 별도 모의 엔진이 아니라 플레이어의 실제 Cobblemon 파티와 Cobblemon 1.7.3 런타임을 사용합니다. 제작자는 JSON을 직접 작성하기보다 에디터에서 기본 문서를 불러오고, `Save As`로 사용자 파일을 만든 뒤 대상 NPC에 `Apply`하는 흐름을 권장합니다.

:::note 이름과 내부 ID
현재 표시 이름은 `Dochi Cobblemon Editor`이고 JAR 이름은 `dochi_cobblemon_editor-<version>-<loader>-1.21.1.jar` 형식이며 로더 자리는 `fabric` 또는 `neoforge`입니다. 기존 데이터 호환성을 위해 모드 ID와 리소스 네임스페이스는 계속 `cobble_npc`입니다. `cobble_npc:*` ID와 기존 저장 폴더는 바꾸지 마세요.
:::

## 지원 환경

| 로더 | 애드온 버전 | 필수 환경 |
| --- | --- | --- |
| Fabric 1.21.1 | 0.2.2 | Java 21, Fabric Loader 0.17.2+, Fabric API 0.116.6+1.21.1+, CustomNPCs 1.0.0 |
| NeoForge 1.21.1 | 0.2.1 | Java 21, NeoForge 21.1+, CustomNPCs 1.21.1 호환 빌드 |

두 로더 모두 **Cobblemon 1.7.3 이상 1.9.0 미만과 같은 로더의 DRM Core 0.2.2 이상**이 필요합니다. 현재 Fabric·NeoForge Core 빌드는 0.2.4입니다. 애드온 최소 조건보다 Core의 Loader/API 요구 조건이 더 높으면 Core 조건까지 충족해야 합니다.

RCT API와 CobbleDollars는 선택 연동입니다. RCT를 설치하지 않아도 DRM Strategy로 배틀을 제작할 수 있습니다. 선택 모드도 반드시 해당 로더의 호환 빌드를 사용하세요.

| 로더 | 파일 |
| --- | --- |
| Fabric | `dochi_cobblemon_editor-0.2.2-fabric-1.21.1.jar` |
| NeoForge | `dochi_cobblemon_editor-0.2.1-neoforge-1.21.1.jar` |

서버와 모든 클라이언트에 같은 빌드를 설치합니다. 모드 ID와 리소스 네임스페이스는 `cobble_npc`를 유지합니다. 구버전에서 기록된 실게임 검증 결과가 최신 기능과 모든 Cobblemon 버전의 검증을 대신하지는 않습니다.

## 제공하는 제작 도구

| 제작 도구 | 편집하는 것 | 런타임 |
| --- | --- | --- |
| `Cobblemon Editor` | Trainer와 Pokemon Itself, 라운드, 파티, AI, 조우, 조건, 전투 후 액션 | Cobblemon 배틀 |
| `Battle Presentation Maker` | 레이어, 액터, 관절 포즈, 타임라인, 사운드 | 전투 직전 전체 화면 연출 |
| `PokéMart Editor` | 판매, 교환, 경매, 통화, 재고, 이용 조건 | PokéMart 화면 |
| `Nurse Joy Editor` | 제한형 대화, 치료기 거리와 역할 | 간호 NPC의 치료 대화·동작 |
| `Starter Selector Editor` | 스타터 카드, 조건, 지급 후 액션, 오디오 | 스타터 선택 화면 |
| `Clone Library` | Trainer/Pokemon NPC 템플릿, Soul Stone 가져오기 | 재사용 클론과 스포너 소스 |
| `Cobblemon NPC Appearance` | CustomNPCs NPC의 포켓몬 외형 | 월드에 보이는 NPC 모델 |

앞의 여섯 도구는 DRM 에디터 선택 화면의 `Add-on` 영역에 나타납니다. `Cobblemon NPC Appearance`는 대상 NPC가 필요한 도구입니다. `DRM GUI Maker`는 위 기능의 게임 규칙을 편집하지 않고, PokéMart·Starter Selector 같은 런타임 화면의 배치와 컴포넌트를 편집합니다.

## 주요 기능

### Trainer와 Pokemon Itself

- 문서당 최대 16라운드, Trainer 라운드당 파티 1–6마리
- Singles, Doubles, Triples, Lead Duel
- 프로필 이름 또는 CustomNPCs 이름 사용
- 종, 폼, Aspects, 성별, Shiny, 레벨, 성격, 특성, 기술, 볼, 지닌 도구
- 개체값과 노력치 편집, Tera 타입, Dynamax 레벨, Gigantamax Factor
- 공통/라운드별 배틀 룰, 조건, 전투 후 액션, 전투 전 DRM Dialogue Set
- 남은 트레이너 포켓몬 수에 따른 공통/라운드별 배틀 사운드
- Pokemon Itself도 라운드, 조건, 전투 후 액션을 지원

### AI, 파티와 전투 아이템

- `DRM Strategy`, 선택형 `RCT`, `Cobblemon Strong` AI 엔진
- DRM AI용 6가지 세부 능력치, 빠른 프리셋, 난이도·강점·주의점 평가와 18개 전략 계획
- 세대·타입·진화 단계·특수 개체·레벨·기술 등을 정하는 랜덤 파티 생성기
- Trainer 공용 일반 인벤토리와 라운드별 가상 배틀 아이템, 세부 사용 기준
- Mega, Dynamax, Z-Move, Tera, Omni 라운드 기믹
- 검색·페이지 이동을 지원하는 RCT 데이터팩 트레이너 JSON 포터

### 조우와 전투 정책

- Interaction, Vision, Radius 트리거와 최대 96블록 추적·정지 거리
- 레벨 유지, 임시 고정 레벨 또는 플레이어 파티 평균에 맞춘 상대 레벨
- 자연 드롭 허용 여부와 포획 허용/금지
- 플레이어별 또는 전역 `Always`, `Once`, `Cooldown`
- 완료 판정 시점과 전투 후 NPC `Stay`, `Hide`, `Despawn`

### 조건과 전투 후 액션

- 태그, 아이템, storeddata, 발전과제, Cobblemon 파티, FTB Quest/Task 조건
- 아이템, 태그, storeddata, 명령, 발전과제, 화폐, 포켓몬 지급, FTB 완료, NPC 숨김·제거 액션
- `win`, `loss`, `flee`, `battle_end` 실행 시점
- 실행 실패 시 보류하고 다음 전투 요청에서 재시도

## 저장 문서와 적용 바인딩

`Save`/`Save As`는 `config/dochi_rpg_maker` 아래 JSON을 저장합니다. `Apply`는 대상 NPC에 문서 경로와 안전한 대체 스냅샷을 연결합니다.

:::note 원본 추적
Trainer, Pokemon Itself, PokéMart, Nurse Joy, Starter Selector는 파일에서 적용하면 기본적으로 원본 JSON을 계속 추적합니다. 한 번 `Apply`한 뒤 같은 경로에 저장하면 다음 런타임 요청에서 최신 문서를 읽습니다. 서버 파일을 외부에서 수정했다면 `/drm reload` 후 확인하세요. 경로 또는 적용 역할을 바꾸거나, Nurse Joy의 치료기처럼 NPC별 연결을 새로 설정하거나, 의도적으로 스냅샷 클론을 만들 때는 다시 적용해야 합니다.
:::

원본 파일이 사라지거나 잘못되면 NPC에 남은 적용 시점 스냅샷을 안전한 대체값으로 사용합니다. 이 대체 동작을 믿고 파일을 지우기보다는 `config/dochi_rpg_maker`와 월드 저장을 함께 백업하세요.

## 상호작용 기본 규칙

- 편집 도구를 든 클릭은 각 도구가 우선합니다.
- 일반 런타임은 기본적으로 주손·보조손을 모두 비운 상태의 우클릭을 사용합니다.
- DRM의 동적 라운드 대화가 있으면 해당 플레이어의 현재 라운드 대화가 먼저 열립니다.
- Nurse Joy 또는 Starter Selector만 적용한 NPC는 일반 빈손 클릭으로 전용 제한형 대화를 엽니다.
- DRM 대화·NPC Shop과 전용 역할을 함께 적용했다면 일반 클릭은 DRM Core가 소유할 수 있고, 전용 역할은 Shift+우클릭으로 접근합니다.
- PokéMart는 배틀 확인보다 먼저 열립니다. 대화나 상점이 있는 배틀 NPC는 대화의 `go_battle` 액션 같은 명시적 흐름을 사용하세요.

## 권장 제작 순서

1. 기본 Trainer를 한 라운드·한 마리·`Interaction` 트리거로 저장합니다.
2. 새 테스트 NPC에 한 번 `Apply`하고 실제 전투를 확인합니다.
3. 라운드, 조우, 조건, 전투 후 액션을 차례로 추가합니다.
4. AI·랜덤 파티·아이템·기믹을 한 기능씩 검증합니다.
5. Battle Presentation과 전투 전 대화를 연결합니다.
6. Nurse Joy, Starter Selector, PokéMart는 처음에는 별도 NPC로 시험합니다.
7. 재사용이 필요하면 Clone Library에 저장하고 DRM Core NPC Spawner의 소스로 사용합니다.

[트레이너 승리 퀘스트](#drm-cobblemon-editor/cobblemon-trainer-quests)에서 ID 연결과 승리 횟수 목표를 설정하는 방법을 확인하세요.
