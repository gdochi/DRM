---
title: 서버 AI 제어와 Mission Planner
slug: warfare-server-ai-missions
order: 385
description: 0.2.7의 서버 전체 AI 기능 제한과 레드스톤 차량 Mission을 설정합니다.
product: dochi-warfare
category: 월드 도구
section: tools
status: Draft
version: 0.2.7
audience: 서버 운영자와 맵 제작자
tags:
  - server
  - ai
  - missions
---

## 서버 전체 AI 제어

0.2.7은 선택형 서버 AI 기능과 NPC별 저장 설정을 분리합니다. 운영자는 DW 평시 이동, 사용자 지정 타겟, 고급 조건, 청각, 경계, 전투 기억, 전술 이동, 엄폐, 제압 사격, 수류탄, 팩션 지원, 부비트랩을 각각 허용하거나 제한할 수 있습니다. 차량 AI와 용병 AI에는 별도의 전역 스위치가 있습니다.

설정은 서버가 관리하고 클라이언트에 동기화합니다. 편집에는 권한 레벨 2가 필요합니다. 제한된 기능의 NPC 설정은 삭제되지 않으며 서버에서 다시 허용하면 재사용됩니다. 용병 AI를 꺼도 계약 시간이 멈추거나 계약 데이터가 삭제되지는 않습니다.

설정 저장 위치:

```text
config/dochi_warfare/server-ai.json
```

## Mission Core Planner

`Mission Core Planner`는 레드스톤으로 차량 Mission을 제어하는 블록입니다. 반경, 자동 차량 분류, CustomNPCs 팩션, Mission ID, 목표 좌표, 컨트롤러 UUID, 체력, 제어 차량 목록을 설정할 수 있습니다.

전원이 들어오면 범위 안에서 조건에 맞는 로드된 차량을 선택해 Area Mission을 발행합니다. 전원이 꺼지거나 설정이 바뀌거나 블록이 파괴되면 해당 Planner가 소유한 Mission만 취소합니다. 컨트롤러 UUID가 차량 Mission 상태에 저장되므로 재로드 뒤에도 소유 관계를 구분합니다.

## 명령어

0.2.7은 `/dw` 명령어 루트를 사용합니다.

```text
/dw planner configure
/dw planner status
/dw planner cancel
/dw planner damage
/dw planner repair
```

차량 AI를 포함한 다른 운영자 명령어도 `/dw` 아래에 있습니다. 권한 레벨 2가 필요합니다.
