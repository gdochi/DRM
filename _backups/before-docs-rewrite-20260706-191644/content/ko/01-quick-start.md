---
title: 빠른 시작
slug: quick-start
order: 20
description: DRM Core를 처음 열었을 때 어떤 에디터를 어떤 순서로 보면 되는지 정리합니다.
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

## 첫 실행

1. Forge 1.20.1 인스턴스의 `mods` 폴더에 `dochi_rpg_maker` JAR을 넣습니다.
2. 서버에서 사용할 경우 서버와 접속 클라이언트 양쪽에 같은 JAR을 넣습니다.
3. CustomNPCs NPC를 대상으로 대화나 상점을 만들 경우 CustomNPCs도 같은 환경에 설치합니다.
4. 월드나 서버를 한 번 실행해서 `config/dochi_rpg_maker` 폴더가 생성되게 합니다.
5. 크리에이티브 모드 또는 편집 권한이 있는 상태로 `Dochi RPG Maker Core` 아이템을 준비합니다.

처음 실행하면 기본 대화 세트, 기본 대화 GUI, 기본 상점 GUI, 샘플 상점, HUD 정의, 설정 파일이 `config/dochi_rpg_maker` 아래에 설치됩니다.

## 에디터 여는 방법

| 동작 | 열리는 화면 |
| --- | --- |
| 허공에 `Dochi RPG Maker Core` 우클릭 | 공용 에디터 선택 화면 |
| CustomNPCs NPC에 코어 아이템 우클릭 | 해당 NPC를 대상으로 하는 편집 흐름 |
| 대화가 연결된 NPC를 아이템 없이 우클릭 | 대화 런타임 |
| 상점이 연결된 NPC를 아이템 없이 우클릭 | 상점 런타임 |

공용 에디터 선택 화면에서는 `Dialogue Editor`, `NPC Shop`, `Currency Editor`, `GUI Maker`, `HUD Maker`, `Remnant Msg Editor`를 고를 수 있습니다.

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
| 6 | GUI Maker | 대화/상점/메시지 화면의 모양을 바꿉니다. |
| 7 | HUD Maker | 플레이어 화면에 항상 표시되는 HUD를 다룹니다. |

:::tip 운영 명령
서버 JSON을 직접 수정했다면 `/drm reload`를 실행하거나 `settings/reload_policy.json`의 `reloadOnTrigger` 값을 확인합니다.
:::
