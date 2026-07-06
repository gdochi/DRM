---
title: 폴더와 경로
slug: paths
order: 40
description: DRM Core 데이터가 저장되는 실제 루트와 서버 JSON 종류별 경로 규칙입니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - paths
  - files
---

## 공식 데이터 루트

현재 DRM Core의 공식 데이터 루트는 게임 또는 서버 루트 기준 `config/dochi_rpg_maker`입니다.

```text
<game-or-server-root>/
  config/
    dochi_rpg_maker/
```

예전 루트인 `<game-or-server-root>/dochi_rpg_maker`가 있고 새 루트가 없으면 시작 시 새 루트로 복사됩니다.

## 주요 폴더

| 데이터 | 경로 | 설명 |
| --- | --- | --- |
| 대화 세트 | `config/dochi_rpg_maker/dialogue_sets/<set>/` | `dialogue_set.json`과 노드별 `*.json`을 함께 저장합니다. |
| GUI 레이아웃 | `config/dochi_rpg_maker/gui/` | 대화, 상점, Remnant Msg 같은 화면 GUI JSON입니다. 하위 폴더를 사용할 수 있습니다. |
| NPC 상점 | `config/dochi_rpg_maker/npc_shops/` | 파일 기반 상점 JSON입니다. |
| 화폐 정의 | `config/dochi_rpg_maker/currency/definitions/` | 화폐 ID, 이름, 아이콘, 픽업 변환, 사망 규칙을 정의합니다. |
| HUD 세트 | `config/dochi_rpg_maker/hud/sets/` | HUD Maker가 쓰는 HUD 세트 JSON입니다. |
| HUD 정의 | `config/dochi_rpg_maker/hud/definitions/` | 바닐라 HUD 대체 또는 커스텀 HUD 정의입니다. |
| 설정 | `config/dochi_rpg_maker/settings/` | `reload_policy.json`, `defaults.json` 등이 들어갑니다. |
| Remnant Msg | `config/dochi_rpg_maker/remnant_msg/` | 메시지와 정책 JSON을 저장합니다. |
| 로그 | `config/dochi_rpg_maker/debug.log` | 코어가 직접 남기는 보조 로그입니다. |

## 서버 JSON 종류

서버와 클라이언트는 `kind`와 `path`를 주고받아 JSON을 읽고 씁니다.

| kind | 저장 폴더 | 특징 |
| --- | --- | --- |
| `dialogue_set` | `dialogue_sets` | 폴더 단위입니다. 저장 시 `dialogue_set.json`과 노드 파일을 같이 씁니다. |
| `gui` | `gui` | 최대 3단계까지 하위 폴더 검색을 지원합니다. |
| `npc_shop` | `npc_shops` | 파일 단위 상점입니다. |
| `currency` | `currency/definitions` | 화폐 정의 파일입니다. |
| `currency_index` | 화폐 정의 전체 | 목록/미리보기용 읽기 전용 인덱스입니다. |
| `currency_hud_layout` | `hud/sets` | HUD 세트 저장소입니다. 예전 `currency_hud` 이름도 호환됩니다. |
| `hud_active_set` | `hud/active_set.json` | 현재 활성 HUD 세트입니다. |
| `hud_definition` | `hud/definitions` | 바닐라 HUD 대체와 커스텀 HUD 정의입니다. |
| `settings` | `settings/defaults.json` | 기본 화폐와 기본 GUI 연결 설정입니다. |

## 경로 입력 규칙

- `gui/default_shop_gui.json`처럼 폴더 기준 상대 경로를 사용합니다.
- `config/dochi_rpg_maker/gui/default_shop_gui.json` 같은 표시용 전체 경로도 일부 로더가 인식합니다.
- Windows 역슬래시는 내부에서 `/`로 정규화됩니다.
- 빈 파일명은 `default.json`으로 보정될 수 있으므로 저장 전 이름을 명확히 정합니다.
- `..`로 상위 폴더를 벗어나는 경로는 거부됩니다.
- 기본 파일명으로 시작하는 GUI와 샘플 상점은 보호 기본값으로 취급되어 직접 삭제하거나 덮어쓰기 어렵습니다.

## 레거시 호환

대화 저장소는 오래된 NPC 데이터의 `dc_dialogue_json_path`를 읽을 수 있습니다. 이 경우 `customnpcs/dc_data/dc_dialogues` 아래의 JSON을 읽어 현재 `DialogueDocument`로 변환합니다.

새 문서와 새 제작 흐름에서는 `customnpcs/dc_data`를 주 저장소로 쓰지 않습니다. 기존 데이터를 유지해야 할 때만 레거시 경로를 확인하세요.

:::danger 운영 주의
서버에서 직접 JSON을 수정할 때는 `config/dochi_rpg_maker`의 서버 파일을 고치고, 클라이언트 복사본만 수정하지 않았는지 확인해야 합니다.
:::
