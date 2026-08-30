---
title: 팩션, 텔레포터, 팝업
slug: world-npc-tools
order: 120
description: 팩션 표시, 목적지 흐름, 재사용 런타임 팝업을 설정합니다.
product: core
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.1.4
audience: 월드 / NPC 제작자
tags:
  - faction
  - teleporter
  - popup
---

## Faction Editor

팩션 표시 설정은 `config/dochi_rpg_maker/factions/settings.json`에 저장됩니다. CustomNPCs 팩션 ID와 플레이어 점수를 읽고 DRM 순서, 카테고리, 아이콘, 배너, 설명, 표시 여부, 상태 스타일, 활성 팩션 GUI를 추가합니다. 런타임 기본 키는 `J`입니다.

이 에디터는 DRM 표시와 상태 매핑을 바꿉니다. 팩션 정의와 플레이어 팩션 점수의 원본은 CustomNPCs입니다.

## Teleporter Editor

Teleporter Set은 `config/dochi_rpg_maker/teleporters/`에 저장됩니다. 세트는 카테고리와 목적지를 가지며, 각 목적지에 위치/차원, 아이콘 미디어, 이용 조건, 잠금 표시, 사운드, 페이드, 커맨드를 설정할 수 있습니다.

커맨드 타이밍은 `BEFORE_FADE_OUT`, `DURING_FADE_OUT`, `BEFORE_TELEPORT`, `AFTER_TELEPORT`, `DURING_FADE_IN`, `AFTER_FADE_IN`을 지원합니다. 저장한 세트를 NPC에 적용하거나 다이얼로그 액션 `Go Teleporter`로 여세요.

## Popup Maker

팝업 정의는 `config/dochi_rpg_maker/popups/definitions/`, 정책은 `popups/policies/`에 저장됩니다. 정의는 GUI, 채널, 우선순위, 충돌 처리, 제목/부제/본문 스타일, 페이드/유지 시간, 사운드를 제어합니다. 정책은 권한, 텍스트/시간 덮어쓰기, 활성/대기 개수, 텍스트 길이, 지속시간 상한을 제한합니다.

DRM 명령어, 다이얼로그/런타임 액션, CustomNPCs 스크립트 전역 `drmPopup`으로 팝업을 열 수 있습니다. 공개 서버에서는 정책 상한을 보수적으로 두세요.

