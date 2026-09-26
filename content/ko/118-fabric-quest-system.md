---
title: 퀘스트 에디터와 저널
slug: quest-system
order: 100
description: 퀘스트 팩, 목표, 보상, NPC 대화 연동과 플레이어 저널을 설명합니다.
product: core-fabric
category: 퀘스트 시스템
section: quest-editor
status: 안정
version: 0.2.3
audience: 퀘스트 제작자
tags:
  - quest
  - journal
---

## 저장 위치

퀘스트 팩은 `config/dochi_rpg_maker/quests/<pack>/`에 저장됩니다. `pack.json`은 팩과 카테고리 순서를, `quests/` 폴더는 개별 퀘스트를 담습니다.

처음 설치되는 샘플 팩은 비활성 상태입니다. 샘플을 참고한 뒤 운영용 팩을 따로 만들어 사용하세요.

## 만들 수 있는 퀘스트

| 영역 | 주요 기능 |
| --- | --- |
| 시작 | 직접 수락, 조건 충족 시 자동 시작, 첫 진행에서 시작 |
| 완료 | 목표 달성 후 제출하거나 자동 완료 |
| 반복 | 반복 없음, 항상 반복, 일일 반복, 재사용 대기시간 |
| 선행 조건 | 모든 선행 퀘스트, 하나 이상, 필요한 개수 |
| 목표 | 위치 도달, 아이템 보유·획득·납품, 처치, 대화 신호, 팩션 점수 |
| 보상 | 아이템, 경험치, DRM 화폐, 서버 명령 |

Quest Editor에서 팩과 카테고리를 먼저 만든 뒤 퀘스트를 추가하세요. 목표와 보상을 설정하고 저장하면 서버가 플레이어별 진행도를 관리합니다.

## NPC 대화와 연결

현재 액션 선택기는 `quest_start`, `quest_complete`, `quest_reset`, `quest_objective_complete`, `quest_objective_reset`을 제공합니다. 퀘스트와 목표 ID는 서버 목록에서 검색해 선택할 수 있습니다. 예전 제출·신호·실패·포기·추적 액션은 기존 JSON 호환 경로로 읽습니다.

일반 자동 완료와 관리자 강제 완료를 구분하세요. Fabric은 `automatic` 또는 `turn_in`을 따릅니다. 제출 방식은 목표를 채워도 제출 준비 상태로 남고, 명시적으로 제출해야 보상을 받습니다. 현재 NeoForge는 자동 완료입니다.

## 플레이어 저널

기본 키는 `U`입니다. 플레이어는 저널에서 퀘스트를 검색하고, 상태나 카테고리로 거르고, 목표·보상을 확인하고, 수락·포기·제출할 수 있습니다.

저널 모양은 GUI Maker의 `quest_journal` 타입으로 바꿀 수 있습니다. 기본 `gui/default_quest_journal_gui.json`은 직접 덮어쓰지 말고 `Save As`로 복사하세요.

## 목표 직접 제어와 트레이너 승리

[로더별 명령어 안내](#core-fabric/loader-compatibility)에서 퀘스트·개별 목표의 시작, 완료, 초기화를 확인하세요. 전체 초기화는 지급한 보상을 회수하지 않으며, 개별 목표 초기화는 지급 기록을 유지합니다.

Cobblemon Editor를 설치하면 `DRM 트레이너 승리` 목표를 추가할 수 있습니다. 대상 트레이너 ID와 필요한 승리 횟수를 지정합니다. [트레이너 승리 퀘스트 제작](#drm-cobblemon-editor/cobblemon-trainer-quests)을 참고하세요.

에디터의 트리/작업 영역과 정보/설명 영역 사이 구분선을 드래그해 폭을 조절할 수 있습니다. 긴 제목은 줄바꿈되며 목록은 스크롤로 탐색합니다. 조절한 패널 폭은 현재 화면 인스턴스에 유지되고 퀘스트 JSON에 저장되는 설정은 아닙니다.
