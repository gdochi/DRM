---
title: 빠른 시작
slug: quick-start
order: 20
description: Fabric 1.21.1용 DRM Core 0.1.8을 처음 열고 제작을 시작하는 순서입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.1.8
audience: 처음 설치하는 사용자
tags:
  - quick-start
  - setup
---

## 첫 실행

1. Minecraft 1.21.1, Fabric Loader 0.18.0 이상, Fabric API 0.116.11 이상, Java 21 환경을 준비합니다.
2. 서버와 접속 클라이언트 양쪽에 같은 DRM 0.1.8 Fabric JAR을 넣습니다.
3. CustomNPCs 1.0.0을 서버와 클라이언트에 함께 설치합니다. 0.1.8부터 필수 의존성입니다.
4. 월드나 서버를 한 번 실행해서 `config/dochi_rpg_maker` 폴더가 생성되게 합니다.
5. 크리에이티브 모드 또는 편집 권한이 있는 상태로 `Dochi RPG Maker Core` 아이템을 준비합니다. CustomNPCs 탭에서 찾거나 `/give @s dochi_rpg_maker:dialogue_editor`를 사용합니다.

처음 실행하면 기본 대화 세트, GUI, Teleporter Set, 샘플 상점, 퀘스트 팩, 팝업, HUD, Remnant Msg와 설정 파일이 `config/dochi_rpg_maker` 아래에 설치됩니다.

## 처음 생성되는 저장 폴더

DRM이 만드는 JSON은 대부분 `config/dochi_rpg_maker` 아래에 저장됩니다. 에디터에서 `Save` 또는 `Save As`를 누르면 이 폴더 안의 종류별 저장소로 들어간다고 보면 됩니다.

| 폴더 | 저장되는 JSON | 쓰는 화면 |
| --- | --- | --- |
| `dialogue_sets/<set>/` | `dialogue_set.json`, `start.json`, 일반 노드 JSON | Dialogue Editor |
| `gui/` | 대화, 상점, 텔레포터, Remnant Msg 화면 레이아웃 | GUI Maker |
| `npc_shops/` | 파일 기반 NPC 상점 문서 | NPC Shop |
| `teleporters/` | 카테고리와 목적지를 담은 Teleporter Set | Teleporter |
| `quests/<pack>/` | 목표와 보상이 있는 퀘스트 팩 | Quest Editor |
| `factions/` | CustomNPCs 팩션 표시 설정 | Faction Editor |
| `popups/` | 팝업 정의와 표시 정책 | Popup Maker |
| `assets/textures/` | GUI와 NPC에서 고를 수 있는 서버 PNG | 에셋 선택기 |
| `npc_spawner/entity_clones/` | 재사용할 CustomNPC 소스 템플릿 | NPC Spawner |
| `npc_spawner/spawner_snapshots/` | Filled Soul Stone에서 만든 소스 스냅샷 | NPC Spawner |
| `currency/definitions/` | 화폐 ID, 이름, 아이콘, 픽업 변환 규칙 | Currency Editor |
| `hud/sets/` | HUD Maker에서 만든 HUD 세트 | HUD Maker |
| `hud/definitions/` | 바닐라 HUD 대체 또는 커스텀 HUD 정의 | HUD Maker |
| `settings/` | 기본 GUI, 기본 화폐, 리로드 정책 | 설정 / 운영 |
| `remnant_msg/messages/` | 레머넌트 메시지 본문 | Remnant Msg Editor |
| `remnant_msg/policies/` | 레머넌트 메시지 표시 정책 | Remnant Msg Editor |

대화 세트는 폴더 단위이고, 상점과 GUI는 파일 단위입니다. 같은 이름을 쓰더라도 저장 폴더가 다르면 서로 다른 데이터입니다.

## 에디터 여는 방법

| 동작 | 열리는 화면 |
| --- | --- |
| 허공에 `Dochi RPG Maker Core` 우클릭 | 에디터 선택 UI 호출 |
| CustomNPCs NPC에 코어 아이템 우클릭 | 해당 NPC를 대상으로 하는 편집 흐름 |
| 배치된 NPC Spawner 블록에 코어 아이템 우클릭 | 해당 블록의 NPC Spawner 에디터 |
| 대화가 연결된 NPC를 아이템 없이 우클릭 | 대화 런타임 |
| 상점이 연결된 NPC를 아이템 없이 우클릭 | 상점 런타임 |
| 텔레포터가 연결된 NPC를 아이템 없이 우클릭 | 텔레포터 런타임 |

에디터 선택 UI에서는 `Dialogue Editor`, `NPC Shop`, `NPC Basic`, `Currency Editor`, `GUI Maker`, `HUD Maker`, `Popup Maker`, `Faction Editor`, `Quest Editor`, `Teleporter`, `Remnant Msg Editor`를 고를 수 있습니다. NPC Spawner는 배치된 블록에서 직접 엽니다.

0.1.8의 선택 UI는 검색과 `Built-in` / `Add-on` 분류를 지원합니다. 마지막으로 열었던 에디터와 JSON 소스도 세션 동안 기억하므로, 에디터 선택 화면으로 돌아왔다가 다시 열면 직전 작업 흐름을 이어가기 쉽습니다.

대상 NPC의 NPC Apply 화면에서는 새 `FUNCTION` 검색창으로 기본/애드온 적용 기능을 현지화 이름, 대상 ID, JSON 종류, 에디터 ID, 바인딩 그룹 기준으로 필터링할 수 있습니다.

## 공용 편집 단축키

지원되는 에디터에서는 다음 단축키를 사용할 수 있습니다. 화면의 `?` 도움말에서 현재 단축키를 다시 확인할 수 있습니다.

| 단축키 | 기능 |
| --- | --- |
| `Ctrl+S` | 현재 문서를 저장합니다. 기본 보호 문서는 `Save As`가 필요합니다. |
| `Ctrl+Z` | 최근 편집을 되돌립니다. |
| `Ctrl+Y` 또는 `Ctrl+Shift+Z` | 되돌린 편집을 다시 적용합니다. |
| `U` | 플레이어 퀘스트 저널을 엽니다. |
| `J` | 팩션 개요를 엽니다. |
| `F7` | 권한이 있는 운영자의 DRM Admin을 엽니다. |

`default_set`, `default`로 시작하는 GUI, 기본/샘플 상점은 읽기 전용 보호 대상입니다. 기본 파일을 출발점으로 쓸 때는 먼저 `Save As`로 새 ID를 만드세요.

## 가장 짧은 대화 제작 흐름

1. 허공 우클릭으로 에디터 선택 화면을 엽니다.
2. `Dialogue Editor`에서 `Use Default Dialogue Set` 또는 `Create New Dialogue Set`을 선택합니다.
3. 노드와 선택지를 수정합니다.
4. 필요한 조건과 액션을 붙입니다.
5. `Save As`로 서버 JSON에 저장합니다.
6. 코어 아이템으로 대상 NPC를 우클릭하고 대화 데이터를 적용합니다.
7. 아이템을 들지 않은 상태에서 NPC를 우클릭하면 저장된 대화가 런타임 화면으로 열립니다.

상점은 `NPC Shop`에서 같은 방식으로 시작합니다. 파일 기반 상점은 `config/dochi_rpg_maker/npc_shops`에 저장되고, NPC에 직접 붙인 상점은 NPC PersistentData에도 복사됩니다.

## 처음 봐야 할 문서 순서

| 순서 | 문서 | 이유 |
| --- | --- | --- |
| 1 | 설치 준비 | 모드 로더, 서버/클라이언트 역할, 기본 폴더를 이해합니다. |
| 2 | 폴더와 경로 | 어떤 JSON이 어느 폴더에 저장되는지 봅니다. |
| 3 | 다이얼로그 에디터 | NPC 대화의 기본 제작 단위입니다. |
| 4 | 조건과 액션 | 선택지 잠금, 보상 지급, 상점 연결을 이해합니다. |
| 5 | NPC Shop | 구매/판매 상점을 만듭니다. |
| 6 | 텔레포터 | 목적지 세트, NPC 적용, 플레이어 이동을 만듭니다. |
| 7 | NPC Spawner | 가중치 소스, 소환 규칙, 블록 외형을 설정합니다. |
| 8 | 퀘스트 에디터와 저널 | 목표, 보상, NPC 연동과 플레이어 진행을 만듭니다. |
| 9 | 팩션과 팝업 | 관계 화면과 재사용 알림을 만듭니다. |
| 10 | GUI Maker | 대화/상점/퀘스트/텔레포터/팝업 화면의 모양을 바꿉니다. |
| 11 | HUD Maker | 플레이어 화면에 항상 표시되는 HUD를 다룹니다. |

:::tip 운영 명령
서버 JSON을 직접 수정했다면 `/drm reload`를 실행하거나 `settings/reload_policy.json`의 `reloadOnTrigger` 값을 확인합니다.
:::
