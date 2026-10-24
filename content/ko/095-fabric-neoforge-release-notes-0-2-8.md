---
title: 0.2.8 업데이트
slug: release-notes-0-2-8
order: 5
description: 0.2.8 업데이트
product: core-fabric
category: 0.2.8 업데이트
section: getting-started
status: 사용 안내
version: 0.2.8
audience: 제작자 / 서버 운영자
---

## 설치 기준

DRM **0.2.8**은 Forge 1.20.1 / Java 17, Fabric·NeoForge 1.21.1 / Java 21을 제공합니다. 서버와 모든 클라이언트의 로더·빌드를 맞추세요. [Modrinth 배포 파일](https://modrinth.com/mod/drm/versions)에서 Minecraft 버전과 로더를 함께 선택합니다.

**CustomNPCs는 선택 의존성입니다.** DRM만으로 사용할 수 있는 제작 도구와 CustomNPCs NPC에 붙이는 기능을 구분합니다. CustomNPCs NPC의 대화·상점·모델 편집에는 CustomNPCs가 필요합니다. DNPC는 별도의 선택 모드이며 모든 애드온이 DNPC의 모든 기능을 지원하는 것은 아닙니다.

## 편집과 저장

- 지원 목록에 체크박스 다중 선택, 전체 선택, 선택 항목 삭제와 복사·붙여넣기를 추가했습니다. 상세 편집 대상으로 고른 행과 삭제용 체크는 별개입니다.
- 대화 노드·선택지·조건·액션 구역과 스크롤을 정리했습니다. Forge의 여러 줄 입력 및 노드 드래그 오류도 수정했습니다.
- NPC Apply는 카테고리를 여러 개 선택할 수 있습니다. 선택한 분류 중 하나에 속하는 JSON을 보여 주며, 전체 선택은 분류 필터를 초기화합니다. 필터는 클라이언트에 저장됩니다.
- 공용 Back/Forward는 화면 방문 기록입니다. 저장·변경 취소와 구분하고 작업을 마치면 Save 또는 Save As를 누릅니다.

## 퀘스트와 관리자

퀘스트 액션은 아이템·태그·세력 점수·발전 과제·애니메이션·JSON 선택 등 실제 실행 방식에 맞는 필드를 제공합니다. 퀘스트 전용 새 액션 목록에서는 `go_stat_builder`, `cobble_npc:go_battle`, `dochi_minigames:play`를 제외합니다. 대화 에디터의 등록과 기존 저장 액션은 유지합니다.

세력 점수에는 CustomNPCs 세력과 **DNPC 관계** 분기가 있습니다. DNPC 관계는 그룹에 대한 플레이어 평판이며 추가·차감·설정을 지원합니다. 이 기능은 최신 DRM과 관계 API가 포함된 DNPC를 함께 설치해야 합니다. DNPC가 없거나 구형이면 CustomNPCs 점수로 대체 실행하지 않습니다.

F7 관리자 도구는 호환 Cobblemon Editor가 설치된 Fabric·NeoForge에서 트레이너 진행도 조회와 승리 횟수 초기화를 제공합니다. 일괄 작업에는 진행 상태가 표시됩니다.

## Remnant Message와 성능

숨김 마커와 플레이어별 한 번 실행 상태를 지원합니다. 에디터의 검색·NPC 미리보기·관리자 목록 캐시와 GUI 준비 처리를 개선했습니다. 이는 서버의 실제 조건·보상·권한 검사를 생략하는 설정이 아닙니다.

## 업데이트 순서

1. `config/dochi_rpg_maker`와 월드를 함께 백업합니다.
2. 로더에 맞는 0.2.8을 서버와 모든 클라이언트에 설치합니다.
3. Cobblemon Editor 0.2.6은 DRM 0.2.8 이상이 필요하므로 함께 맞춥니다.
4. 사용자 대화·상점·퀘스트·Remnant를 열고 저장·실제 플레이를 확인합니다. 기본 템플릿 변경은 Save As로 분리합니다.

Minecraft 26.3 포팅은 별도 작업 대상입니다. 이 페이지의 1.20.1·1.21.1 배포 안내와 같은 지원 범위로 보지 마세요.
