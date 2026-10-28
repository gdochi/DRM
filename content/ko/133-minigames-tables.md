---
title: 미니게임 테이블
slug: minigames-tables
order: 1305
description: 미니게임 테이블
product: dochi-minigames
category: 미니게임 테이블
section: setup
status: 사용 안내
version: 0.1.3
audience: 제작자 / 서버 운영자
---

## DRM 없이 테이블 만들기

Minigames 0.1.3는 Forge 1.20.1 / Java 17과 Fabric·NeoForge 1.21.1 / Java 21에서 독립 실행합니다. 게임 테이블, 기본 편집기, 카드팩과 MWENT에 DRM이 필수는 아닙니다.

1. 크리에이티브에서 `dochi_minigames:minigame_table`을 준비하거나 판자 3개와 막대기 4개로 제작합니다.
2. OP 2 이상으로 새 테이블을 우클릭합니다. 이미 설정된 테이블은 빈손으로 웅크려 우클릭해 편집합니다.
3. 내장 프리셋 또는 저장 JSON을 불러와 게임 타입·규칙·참가비·보상·외형을 정합니다.
4. **테이블에 적용**을 누르고 성공 응답을 확인합니다. Save / Save As는 별도 파일 저장이며 테이블 적용과 다릅니다.
5. 플레이어가 우클릭해 게임을 시작합니다.

테이블 규칙은 `config/dochi_rpg_maker/minigames/games/table_<key>.json`에 따로 저장됩니다. DRM이 없어도 이 저장 경로를 유지합니다. 다른 NPC나 테이블이 사용하는 원본 프리셋을 직접 덮어쓰지 않습니다.

## MWENT 테이블

MWENT 테이블은 플레이어 대전·AI 대전과 관전을 제공합니다. OP는 테이블 메뉴의 AI 대전에서 서버의 카드 배틀 JSON을 선택하고 적용합니다. 각 테이블의 AI 설정은 독립적으로 저장됩니다.

플레이어 대전은 무료 조건을 사용하고, 참가비가 있는 프로필은 AI 대전에 사용합니다. 진행 중인 PvP에 참가한 채 개인 AI전을 동시에 시작할 수 없습니다. 참가자가 있는 테이블은 비운 뒤 설정을 바꿉니다.

## 제작 도구

`/minigame editor`와 `/minigame packs`는 단독으로 사용할 수 있습니다. DRM을 추가하면 NPC Apply, 대화 액션, DRM 화폐·조건과 GUI Maker를 연결합니다. 이런 연동을 참조한 JSON은 해당 모드가 설치되어 있어야 실행합니다.

## 0.1.3 테이블 매핑과 제작

고유 테이블 8종은 바닐라 3×3 제작대로 만들고 자기 게임 종류를 유지합니다. 기존 `minigame_table`은 게임 종류를 바꾸는 **크리에이티브 테이블**이며 제작법을 제공하지 않습니다. 제작법은 게임의 레시피 북에서 확인합니다.

OP 2 이상이 빈손 Shift+우클릭으로 저장된 게임 JSON 또는 내장 프리셋 ID를 연결합니다. 다른 게임 종류를 고유 테이블에 적용하면 서버가 거부합니다. 배치할 때마다 새 JSON을 만들지 않으며 여러 테이블이 같은 ID를 공유할 수 있습니다. 규칙 변경은 `/minigame editor`에서 사용자 JSON을 명시적으로 저장합니다.

MWENT의 내장 AI는 상대를 골라 연습하는 기능입니다. 카드 정의나 AI 상대 덱을 만드는 별도 탭은 제공하지 않습니다. 카드·팩의 실제 배포는 [획득 설정](#dochi-minigames/minigames-acquisition)에서 조절합니다.
