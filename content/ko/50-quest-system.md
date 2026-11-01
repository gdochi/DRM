---
title: 퀘스트 에디터와 저널
slug: quest-system
order: 100
description: 퀘스트 팩, 목표, 보상, 완료, After Complete 액션, 플레이어 저널을 설명합니다.
product: core
category: 퀘스트 시스템
section: quest-editor
status: 안정
version: 0.3.1
audience: 퀘스트 제작자
tags:
  - quest
  - journal
---

## NPC가 주는 첫 임무 만들기

코어의 에디터 목록에서 **Quest Editor → Create New**를 엽니다. **+ Category**로 장을 만들고 **+ Quest**로 그 장에 임무를 추가합니다. 아래는 **DRM 0.3.1 / Forge 1.20.1** 화면입니다.

![Forge Quest Editor에서 첫 퀘스트의 이름과 수락·완료 방식을 정하는 Info 화면.](assets/media/guides/drm-031-forge1201/quest-info.png "Title은 플레이어에게 보일 제목입니다. NPC Interaction / Dialogue는 켜져 있고 Player Quest Journal은 꺼져 있습니다. Forge의 Completion Mode는 이 예제에서 Turn in입니다.")

1. **Info → Quest ID / Title / Description**에 참조할 이름·표시 제목·해야 할 일을 적습니다.
2. **Start Policy → Manual Accept**라면 수락할 경로도 켭니다. 대화로 줄 때는 **NPC Interaction / Dialogue**, 저널의 수락 버튼을 쓸 때는 **Player Quest Journal**입니다.
3. **Objectives → + Add**로 목표를 넣고 종류와 필요 횟수를 정합니다. 처음 추가된 목표는 아래처럼 **Dialogue Signal**일 수 있으므로 원하는 종류인지 확인합니다.
4. **Rewards → + Add**로 보상을 넣습니다.
5. **Completion Mode**가 **Turn in**이면 목표 달성 뒤 제출하는 흐름까지 만들고, **Automatic**이면 목표 달성 후 완료되도록 설정합니다. 이 부분은 NeoForge 안내와 다릅니다.
6. **Save As**로 팩을 저장하고 NPC 대화의 **quest_start**에 연결합니다. Turn in이라면 완료 대화에 **quest_turn_in**도 연결합니다.

![새로 추가한 Dialogue Signal 목표의 신호 이름과 Required 횟수.](assets/media/guides/drm-031-forge1201/quest-objective-detail.png "이 목표는 물건을 갖고 있는지 세지 않습니다. 해당 신호를 보내야 진행합니다. 예를 들어 Signal에 적은 이름을 대화의 quest_signal과 맞춥니다.")

**U**로 저널을 열어 수락·진행·완료를 시험하고, 실제 보상을 받는지도 확인합니다. 샘플 팩은 비활성 상태이므로 내 팩을 켜고 저장해야 합니다.

팩은 `config/dochi_rpg_maker/quests/<pack>/`에 저장됩니다. 옮길 때는 `pack.json`과 `quests/`가 들어 있는 팩 폴더 전체를 복사합니다.

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

## 0.2.8 액션과 관계 점수

아이템·태그·세력 점수·발전 과제 등은 실행 방식에 맞는 동작과 대상 필드를 제공합니다. JSON 찾기는 등록된 종류의 서버 파일을 선택하며, 다른 팩의 퀘스트와 현재 미저장 퀘스트도 지원되는 선택기에서 찾을 수 있습니다.

세력 점수에서 CustomNPCs 세력 또는 DNPC 관계 그룹을 선택합니다. DNPC 관계는 플레이어 평판이며 추가·차감·설정을 지원합니다. DNPC 관계를 쓰려면 최신 DRM과 DNPC를 함께 설치합니다.

퀘스트용 새 액션 목록에서는 `go_stat_builder`, `cobble_npc:go_battle`, `dochi_minigames:play`를 제외합니다. 기존 저장 액션과 대화 에디터 등록은 유지합니다.
