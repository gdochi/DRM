---
title: 폴더와 경로
slug: paths
order: 40
description: DRM Core 데이터가 저장되는 실제 루트와 서버 JSON 종류별 경로 규칙입니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.1.4
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
| 퀘스트 팩 | `config/dochi_rpg_maker/quests/<pack>/` | `pack.json`과 `quests/` 아래 개별 퀘스트 파일입니다. |
| 스탯 세트 | `config/dochi_rpg_maker/stats/sets/` | 스탯 정의이며 `stats/active_set.json`이 활성 세트를 선택합니다. |
| 데이터베이스 아이템 | `config/dochi_rpg_maker/items/definitions/` | DRM 아이템 정의이며 공용 편집 규칙은 `items/editor_settings.json`입니다. |
| 텔레포터 | `config/dochi_rpg_maker/teleporters/` | Teleporter Set JSON입니다. |
| 팩션 | `config/dochi_rpg_maker/factions/` | DRM 팩션 표시 설정과 프리셋입니다. |
| 팝업 | `config/dochi_rpg_maker/popups/` | 팝업 정의와 정책입니다. |
| 제작자 PNG 에셋 | `config/dochi_rpg_maker/assets/textures/` | 서버가 카탈로그로 만드는 PNG와 동반 `.png.mcmeta` 파일입니다. |
| 화폐 정의 | `config/dochi_rpg_maker/currency/definitions/` | 화폐 ID, 이름, 아이콘, 픽업 변환, 사망 규칙을 정의합니다. |
| HUD 세트 | `config/dochi_rpg_maker/hud/sets/` | HUD Maker가 쓰는 HUD 세트 JSON입니다. |
| HUD 정의 | `config/dochi_rpg_maker/hud/definitions/` | 바닐라 HUD 대체 또는 커스텀 HUD 정의입니다. |
| 설정 | `config/dochi_rpg_maker/settings/` | `reload_policy.json`, `defaults.json` 등이 들어갑니다. |
| Remnant Msg | `config/dochi_rpg_maker/remnant_msg/` | 메시지와 정책 JSON을 저장합니다. |
| 로그 | `config/dochi_rpg_maker/debug.log` | 코어가 직접 남기는 보조 로그입니다. |

## 폴더별 저장 방식

| 폴더 | 저장 단위 | 파일 예시 | 알아둘 점 |
| --- | --- | --- | --- |
| `dialogue_sets` | 폴더 | `dialogue_sets/blacksmith/start.json` | 한 대화 세트가 하나의 폴더입니다. 불러오기와 저장도 세트 폴더 기준으로 처리합니다. |
| `gui` | JSON 파일 | `gui/default_shop_gui.json` | 대화, 상점, 메시지 화면의 배치와 컴포넌트만 저장합니다. 상품이나 대화 내용 자체는 저장하지 않습니다. |
| `npc_shops` | JSON 파일 | `npc_shops/blacksmith.json` | NPC가 팔거나 매입하는 상품, 가격, 재고, 화폐 기준을 저장합니다. |
| `currency/definitions` | JSON 파일 | `currency/definitions/gold.json` | 화폐 ID와 표시 방식, 픽업 변환, 사망 규칙을 저장합니다. |
| `hud/sets` | 세트 JSON | `hud/sets/default.json` | HUD Maker에서 편집한 화면 배치 세트입니다. |
| `hud/definitions` | 정의 JSON | `hud/definitions/vanilla/health.json` | HUD 요소가 어떤 값을 표시할지 정하는 정의입니다. |
| `settings` | 설정 JSON | `settings/defaults.json` | 기본 대화 GUI, 기본 상점 GUI, 기본 화폐, 리로드 정책을 저장합니다. |
| `remnant_msg/messages` | JSON 파일 | `remnant_msg/messages/tutorial.json` | 플레이어에게 보여줄 레머넌트 메시지 본문입니다. |
| `remnant_msg/policies` | JSON 파일 | `remnant_msg/policies/default.json` | 메시지 길이, 표시 조건, 출력 정책을 저장합니다. |

대화 세트만 폴더 안에 여러 JSON이 모여 하나의 세트가 됩니다. 나머지는 대부분 파일 하나가 하나의 문서입니다.

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
| `faction_settings` | `factions/settings.json` | 활성 팩션 표시 설정입니다. |
| `faction_preset` | `factions/presets` | 재사용 팩션 표시 프리셋입니다. |
| `teleporter_set` | `teleporters` | Teleporter Set 정의입니다. |
| `stat_set` | `stats/sets` | 플레이어 스탯 세트입니다. |
| `item_definition` | `items/definitions` | DRM 데이터베이스 아이템입니다. |
| `item_editor_settings` | `items/editor_settings.json` | 카테고리, 희귀도, 툴팁 형식입니다. |
| `popup_definition` | `popups/definitions` | 팝업 표시 정의입니다. |
| `popup_policy` | `popups/policies` | 팝업 권한과 리소스 제한입니다. |
| `remnant_msg` | `remnant_msg/messages` | 레머넌트 메시지 문서입니다. |
| `remnant_msg_policy` | `remnant_msg/policies` | 레머넌트 메시지 정책 문서입니다. |
| `settings` | `settings/defaults.json` | 기본 화폐와 기본 GUI 연결 설정입니다. |

## 경로 입력 규칙

- `gui/default_shop_gui.json`처럼 폴더 기준 상대 경로를 사용합니다.
- `config/dochi_rpg_maker/gui/default_shop_gui.json` 같은 표시용 전체 경로도 일부 로더가 인식합니다.
- Windows 역슬래시는 내부에서 `/`로 정규화됩니다.
- 빈 파일명은 `default.json`으로 보정될 수 있으므로 저장 전 이름을 명확히 정합니다.
- `..`로 상위 폴더를 벗어나는 경로는 거부됩니다.
- `default_set`, `default`로 시작하는 GUI, 알려진 기본 GUI 경로, `default`로 시작하는 상점과 샘플 상점은 보호 기본값입니다. 서버 저장/삭제가 거부되므로 `Save As`로 새 이름을 만듭니다.

## 업데이트 때 기본 파일이 처리되는 방식

| 데이터 | 시작 시 처리 |
| --- | --- |
| 기본 대화, GUI, 상점, 팩션, 텔레포터, 퀘스트, 스탯, 아이템, 팝업 | 데이터 종류별 기본 정책에 따라 0.1.4 JAR에서 설치 또는 갱신됩니다. |
| Remnant Msg 샘플 메시지 | JAR 기본본으로 갱신됩니다. |
| HUD 정의 | 파일이 없을 때만 설치되며 기본값은 `enabled: false`입니다. |
| Remnant Msg 기본 정책 | 파일이 없을 때만 설치됩니다. |

사용자 파일은 기본 보호 이름을 피해서 저장하면 이 갱신 대상과 분리됩니다.

## 레거시 호환

대화 저장소는 오래된 NPC 데이터의 `dc_dialogue_json_path`를 읽을 수 있습니다. 이 경우 `customnpcs/dc_data/dc_dialogues` 아래의 JSON을 읽어 현재 `DialogueDocument`로 변환합니다.

새 문서와 새 제작 흐름에서는 `customnpcs/dc_data`를 주 저장소로 쓰지 않습니다. 기존 데이터를 유지해야 할 때만 레거시 경로를 확인하세요.

:::danger 운영 주의
서버에서 직접 JSON을 수정할 때는 `config/dochi_rpg_maker`의 서버 파일을 고치고, 클라이언트 복사본만 수정하지 않았는지 확인해야 합니다.
:::
