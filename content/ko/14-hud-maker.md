---
title: HUD Maker
slug: hud-maker
order: 86
description: HUD Maker에서 HUD 세트, 활성 레이아웃, 화폐 표시 컴포넌트를 구성하는 방법입니다.
product: core
category: 핵심 시스템
section: hud-maker
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - hud
  - editor
---

## 역할

HUD Maker는 플레이어 화면에 표시되는 HUD 레이아웃을 제작하는 에디터입니다. DRM Core에서는 화폐 HUD, 플레이어 상태 HUD, 커스텀 HUD 같은 레이아웃 프로필을 다룰 수 있습니다.

HUD 데이터는 일반 GUI와 비슷한 `LayoutDocument` 구조를 쓰지만, 저장 위치와 런타임 표시 방식이 다릅니다.

## 저장 위치

HUD 관련 파일은 아래 위치에 저장됩니다.

| 데이터 | 경로 |
| --- | --- |
| HUD 세트 | `config/dochi_rpg_maker/hud/sets` |
| 활성 HUD 세트 | `config/dochi_rpg_maker/hud/active_set.json` |
| HUD 정의 | `config/dochi_rpg_maker/hud/definitions` |
| 이전 화폐 HUD 호환 | `currency_hud_layout` kind가 `hud/sets`로 연결됩니다. |

HUD 세트는 서버에서 관리되고, 클라이언트는 활성 세트 정보를 받아 화면에 렌더링합니다.

## 기본 제작 흐름

1. `Dochi RPG Maker Core` 아이템으로 에디터 선택 화면을 엽니다.
2. `HUD Maker`를 선택합니다.
3. HUD 프로필을 고릅니다.
4. 필요한 컴포넌트를 배치합니다.
5. 저장할 HUD 세트 이름을 정합니다.
6. 활성 세트로 지정합니다.
7. 게임 화면에서 실제 위치와 크기를 확인합니다.

## 자주 쓰는 컴포넌트

| 컴포넌트 | 용도 |
| --- | --- |
| currency display | 특정 화폐 잔액을 표시합니다. |
| image | 배경 패널이나 아이콘을 표시합니다. |
| text | 고정 문구나 상태 텍스트를 표시합니다. |
| panel | 여러 요소를 묶는 배경 영역입니다. |

화폐 HUD는 Currency Editor의 화폐 ID와 직접 연결됩니다. HUD에는 표시 컴포넌트가 있어도 화폐 정의가 없으면 정상 표시되지 않습니다.

## 배치 기준

HUD는 플레이 중 항상 보이므로 대화 GUI나 상점 GUI보다 더 보수적으로 배치해야 합니다.

- 화면 모서리 기준 위치를 먼저 정합니다.
- 너무 큰 패널을 중앙에 놓지 않습니다.
- 여러 해상도에서 겹치지 않도록 여백을 둡니다.
- 화폐 이름보다 숫자 가독성을 우선합니다.
- 바닐라 HUD와 겹치는지 확인합니다.

## 런타임 갱신

HUD는 서버의 활성 세트와 플레이어 데이터에 따라 갱신됩니다. JSON을 직접 수정했다면 서버 리로드와 클라이언트 재접속 또는 HUD 갱신을 함께 확인하세요.

| 증상 | 확인할 것 |
| --- | --- |
| HUD가 보이지 않음 | `hud/active_set.json`과 활성 세트 파일을 확인합니다. |
| 숫자가 갱신되지 않음 | 화폐 잔액 저장과 서버 패킷 갱신을 확인합니다. |
| 위치가 다름 | 기준 좌표, anchor, 화면 스케일을 확인합니다. |
| 다른 HUD와 겹침 | 바닐라 HUD 대체 설정과 컴포넌트 좌표를 조정합니다. |
