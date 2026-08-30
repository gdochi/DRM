---
title: 퀘스트 에디터와 저널
slug: quest-system
order: 100
description: 퀘스트 팩, 목표, 보상, 완료, After Complete 액션, 플레이어 저널을 설명합니다.
product: core
category: 퀘스트 시스템
section: quest-editor
status: 안정
version: 0.1.4
audience: 퀘스트 제작자
tags:
  - quest
  - journal
---

## 저장과 런타임

퀘스트 팩은 `config/dochi_rpg_maker/quests/<pack>/`에 저장됩니다. `pack.json`은 팩/카테고리 순서를, `quests/` 폴더는 개별 퀘스트 JSON을 가집니다. 진행도는 서버가 소유하고 클라이언트에는 저널 뷰를 전송합니다.

번들 샘플 팩은 비활성 상태입니다. 운영에는 복제하거나 별도 팩을 만드세요.

## 퀘스트 구조

| 영역 | 지원 값 |
| --- | --- |
| 시작 정책 | `manual_accept`, `auto_when_available`, `first_progress`; 레거시 호환 `dialogue`, `journal_accept`도 허용 |
| 수락 경로 | `quest_start`를 통한 NPC/다이얼로그, 플레이어 저널 수락 버튼 |
| 완료 | `turn_in`, `automatic` |
| 반복 | `never`, `always`, `daily`, `cooldown` |
| 선행 퀘스트 | `all`, `any`, `required_count` |
| 목표 그룹 | `all`, `any`, `sequence`, `required_count` |

목표는 위치, 아이템, 처치, 다이얼로그 신호, CustomNPCs 팩션 점수를 지원합니다. 아이템 목표는 보유, 획득, 납품으로 나눌 수 있습니다. 보상은 아이템, XP 포인트/레벨, DRM 커런시, 커맨드를 지원합니다.

## 다이얼로그 연동

다이얼로그 액션으로 `quest_start`, `quest_turn_in`, `quest_signal`, `quest_fail`, `quest_abandon`, `quest_pin`을 제공합니다. NPC가 흐름을 제어할 때 사용하세요. 저널에서 수락할 퀘스트는 Journal 수락 경로를 켜야 합니다.

## After Complete

Actions 페이지는 `After Complete`만 노출합니다. 서버 처리 순서는 다음과 같습니다.

1. 완료 준비 상태와 납품 아이템 소비 가능 여부를 확인합니다.
2. 미지급 보상을 모두 지급합니다.
3. 퀘스트를 `Completed`로 바꾸고 완료 액션 실행 마커를 먼저 기록합니다.
4. 설정한 `After Complete` 액션을 한 번 실행합니다.

보상에 실패하면 퀘스트는 제출 준비 상태에 남고 `After Complete`는 실행하지 않습니다. 진행도 초기화는 이미 지급한 보상을 회수하지 않습니다.

## 플레이어 저널

기본 키는 `U`입니다. 저널은 카테고리/상태 필터, 검색, 상세 정보, 목표/보상 목록, 추적, 수락, 포기, 새로고침, 닫기 컴포넌트를 지원합니다. `gui/default_quest_journal_gui.json`을 GUI Maker에서 열고 운영용 파일은 `Save As`로 저장하세요.
