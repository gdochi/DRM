---
title: 위키 개요
slug: overview
order: 10
description: DRM Core가 실제로 제공하는 런타임, 에디터, 데이터 저장 구조를 한눈에 정리합니다.
product: core
category: 시작하기
hiddenNav: true
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - overview
  - drm
---

## DRM Core의 현재 범위

DRM Core는 Forge 1.20.1 환경에서 동작하는 네이티브 인게임 RPG 제작 도구입니다. CustomNPCs NPC를 대상으로 대화, GUI, 상점, 화폐, HUD, Remnant Msg 데이터를 만들고, 런타임에서 그 JSON을 읽어 플레이어에게 화면과 상호작용을 제공합니다.

이 문서는 `dochi_rpg_maker` 모드의 실제 구현을 기준으로 작성합니다. 예전처럼 `customnpcs/dc_data`나 HTML GUI를 주 경로로 보지 않고, 현재 코어가 사용하는 `config/dochi_rpg_maker` 저장소와 서버 JSON API를 기준으로 설명합니다.

| 영역 | 실제 역할 | 주요 클래스 / 데이터 |
| --- | --- | --- |
| 에디터 선택 | 오른쪽 클릭으로 열리는 공용 에디터 허브입니다. | `EditorSelectScreen`, `DochiEditorRegistry` |
| 대화 | NPC 대화 세트, 노드, 선택지, 조건, 액션을 편집하고 실행합니다. | `DialogueEditorScreen`, `DialogueDocument`, `DialogueRuntimeManager` |
| GUI | 대화, 상점, HUD, Remnant Msg 화면 레이아웃 JSON을 제작합니다. | `GuiMakerScreen`, `LayoutDocument`, `LayoutModeProfile` |
| 상점 | NPC별 또는 파일 기반 상점, 구매/판매, 재고, 화폐 결제를 처리합니다. | `NpcShopEditorScreen`, `ShopDocument`, `ShopTradeService` |
| 화폐 / HUD | 아이템 기반 화폐 정의, 잔액 저장, 픽업 변환, HUD 표시를 다룹니다. | `CurrencyDefinition`, `CurrencyBalanceStorage`, `CurrencyHudOverlay` |
| 기본 콘텐츠 | 첫 실행 또는 서버 시작 시 샘플 JSON과 기본 GUI를 설치합니다. | `DefaultContentInstaller`, `dochi_rpg_maker_defaults/**` |

## 시작 화면에서 보이는 코어 에디터

`Dochi RPG Maker Core` 아이템을 사용하면 공용 선택 화면이 열립니다. 현재 코어가 등록하는 기본 에디터 ID는 다음과 같습니다.

| 에디터 | ID | 대상 NPC 필요 | 용도 |
| --- | --- | --- | --- |
| Dialogue Editor | `dialogue` | 아니오 | 대화 세트와 노드 제작 |
| GUI Maker | `gui_maker` | 아니오 | 화면 레이아웃 제작 |
| NPC Shop | `npc_shop` | 아니오 | 상점 JSON 제작과 NPC 상점 편집 |
| NPC Basic | `npc_basic` | 예 | CustomNPCs NPC 기본 속성 편집 |
| Currency Editor | `currency` | 아니오 | 화폐 정의 JSON 제작 |
| HUD Maker | `hud_maker` | 아니오 | HUD 레이아웃과 표시 설정 제작 |
| Remnant Msg Editor | `remnant_msg` | 아니오 | Remnant Msg 메시지와 정책 제작 |

## 문서 작성 기준

- 코드에 존재하는 저장 경로와 JSON 필드명을 우선합니다.
- 기본값, 보호된 기본 JSON, 레거시 호환 동작을 구분해서 설명합니다.
- 런타임에서 실제로 실행되는 조건과 액션만 조건/액션 문서에 넣습니다.
- GUI 문서는 GUI Maker 미리보기와 런타임 렌더링이 공유하는 `Layout*` 구조를 기준으로 설명합니다.

:::tip 처음 읽는 순서
빠른 시작, 설치 준비, 폴더와 경로, 핵심 개념을 먼저 읽은 뒤 필요한 시스템 문서로 이동하면 됩니다.
:::
