---
title: 엔티티 클론 보관함
slug: warfare-entity-clones
order: 380
description: CustomNPCs NPC와 지원 SuperbWarfare 차량을 정리된 서버 측 템플릿으로 저장하고 소환합니다.
product: dochi-warfare
category: 월드 도구
section: tools
status: Draft
version: 0.2.4
audience: 시나리오 제작자
tags:
  - clone
  - npc
  - vehicle
---

## 클론의 역할

`Entity Clone Library`는 두 종류의 서버 소유 JSON 템플릿을 보관합니다.

* 현재 DW 설정을 포함한 CustomNPCs NPC
* 원본 데이터와 재사용 DW 전투 설정을 포함한 지원 SuperbWarfare 차량

NPC·차량 편집기의 `Save As`와는 다릅니다. 설정 프로필은 이미 존재하는 대상에 설정을 복사하고, 엔티티 클론은 정리된 새 엔티티를 만듭니다.

## 템플릿 저장

1. 크리에이티브 모드로 들어갑니다.
2. `DW Npc Core`로 CustomNPCs NPC 또는 지원 SuperbWarfare 차량을 엽니다.
3. 편집기 상단의 `Clone`을 누릅니다.
4. 이름을 입력하고 확인합니다. 같은 이름을 덮어쓰려면 두 번째 확인이 필요합니다.

서버가 엔티티 데이터를 직접 읽고 정리합니다. 클라이언트가 보낸 원시 엔티티 NBT를 저장 데이터로 신뢰하지 않습니다.

## 보관함 열기와 소환

`DW Npc Core`로 허공을 우클릭하면 `Entity Clone Library`가 열립니다. 통합 목록을 검색하고 `NPC` 또는 `Vehicle`로 필터한 뒤 템플릿을 골라 `Summon`을 누릅니다.

서버는 크리에이티브 권한, 템플릿, 필수 모드를 다시 검사하고 플레이어 앞의 안전하고 로드된 위치를 찾습니다. 의존 모드가 없거나 안전한 공간을 찾지 못하면 불완전한 엔티티를 만들지 않고 거부합니다.

## 정리되는 상태

클론은 재사용할 외형, 장비, 원본 엔티티 데이터, DW 전투 설정을 유지하지만 현재 월드의 신원과 임시 상태는 제거합니다.

* UUID, 위치, 속도, 회전, 탑승자, 목줄, 소유자 신원
* 현재 Brain, 분노, 화염, 공기, 낙하 등 실시간 상태
* 활성 용병 소유자와 이동·사격 중지 명령
* 차량 AI 소유자, 홈, 명령 목적지, 현재 순찰 위치 상태

따라서 새 클론이 원본 엔티티의 신원, 소유권, 진행 중인 월드 작업을 이어받지 않습니다.

## 저장 경로

템플릿은 서버의 종류별 폴더에 저장됩니다.

```text
config/dochi_warfare/entity_clones/npc/
config/dochi_warfare/entity_clones/vehicle/
```

이 파일은 서버 콘텐츠로 다루세요. 일반 제작에서는 서버 검증과 정리 과정이 유지되도록 인게임 `Clone`·`Summon` 흐름을 사용합니다.
