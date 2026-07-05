---
title: 빠른 시작
slug: quick-start
order: 20
description: 설치 후 가장 짧은 경로로 DRM Core 에디터와 런타임을 확인하는 절차입니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.1.2
audience: 처음 설치하는 사용자
tags:
  - quick-start
  - setup
---

## 첫 실행 체크

1. Forge 1.20.1 인스턴스의 `mods` 폴더에 `dochi_rpg_maker` JAR을 넣습니다.
2. 서버에서 쓸 경우 서버와 접속 클라이언트 양쪽에 같은 모드를 넣습니다.
3. CustomNPCs 기반 NPC 제작을 할 경우 CustomNPCs도 같은 환경에 설치합니다.
4. 월드나 서버를 한 번 실행해서 `config/dochi_rpg_maker` 폴더가 생성되는지 확인합니다.
5. 크리에이티브 모드 또는 편집 권한이 있는 상태로 `Dochi RPG Maker Core` 아이템을 얻습니다.

첫 실행 시 모드는 기본 대화 세트, 기본 대화 GUI, 기본 상점 GUI, 샘플 상점, HUD 정의, 설정 파일을 `config/dochi_rpg_maker` 아래에 설치합니다.

## 에디터 열기

| 동작 | 결과 |
| --- | --- |
| 허공에 `Dochi RPG Maker Core` 우클릭 | 공용 에디터 선택 화면을 엽니다. |
| CustomNPCs NPC에 아이템 우클릭 | 해당 NPC를 대상으로 대화/상점/기본 편집 흐름을 엽니다. |
| 일반 플레이어가 아이템 없이 대화가 있는 NPC 우클릭 | 대화 런타임이 열립니다. |
| 상점만 연결된 NPC 우클릭 | NPC 상점 런타임이 열립니다. |

편집 아이템은 CustomNPCs 크리에이티브 탭에도 추가됩니다. 권한이 없거나 크리에이티브가 아니면 에디터가 열리지 않습니다.

## 가장 짧은 제작 흐름

1. 허공 우클릭으로 에디터 선택 화면을 엽니다.
2. `Dialogue Editor`에서 `Use Default Dialogue Set` 또는 `Create New Dialogue Set`을 선택합니다.
3. 노드와 선택지를 수정한 뒤 `Save As`로 서버 JSON에 저장합니다.
4. NPC에 코어 아이템을 우클릭하고 대화 데이터를 적용합니다.
5. 코어 아이템을 들지 않은 상태로 같은 NPC를 우클릭해서 런타임을 확인합니다.

상점은 `NPC Shop`에서 같은 방식으로 시작합니다. 파일 기반 상점은 `config/dochi_rpg_maker/npc_shops`에 저장되고, NPC에 직접 붙은 상점은 NPC PersistentData에도 복사됩니다.

## 빠른 검증표

| 체크 | 정상 상태 | 문제가 있으면 |
| --- | --- | --- |
| 모드 로딩 | 모드 목록에 `Dochi RPG Maker`가 보입니다. | Forge 1.20.1, Java, JAR 위치를 확인합니다. |
| 기본 폴더 | `config/dochi_rpg_maker`가 생성됩니다. | 서버 루트와 클라이언트 루트를 혼동하지 않았는지 봅니다. |
| 에디터 아이템 | `Dochi RPG Maker Core`가 보입니다. | CustomNPCs 탭 또는 `/give`로 확인합니다. |
| 기본 JSON | `dialogue_sets/default_set`, `gui`, `npc_shops`가 생깁니다. | 첫 실행 로그와 파일 권한을 확인합니다. |
| 런타임 | NPC 우클릭 시 대화나 상점 화면이 열립니다. | NPC에 저장된 `source.kind`, `source.path`, 내장 JSON을 확인합니다. |

:::tip 운영 명령
서버 JSON을 직접 수정했다면 `/drm reload`를 실행하거나 `settings/reload_policy.json`의 `reloadOnTrigger` 값을 확인합니다.
:::
