---
title: 서버 AI 제어와 전투 지원
slug: warfare-server-ai-missions
order: 385
description: NPC·차량 전역 AI 정책과 DWE 지원 타임라인의 연결을 안내합니다.
product: dochi-warfare
category: 월드 도구
section: tools
status: Draft
version: Forge 0.3.0 / NeoForge 0.2.9
audience: 서버 운영자와 맵 제작자
tags:
  - server
  - ai
  - missions
---

## 서버 전체 AI 제어

0.2.9은 선택형 서버 AI 기능과 NPC별 저장 설정을 분리합니다. 운영자는 DW 평시 이동, 사용자 지정 타겟, 고급 조건, 청각, 경계, 전투 기억, 전술 이동, 엄폐, 제압 사격, 수류탄, 팩션 지원, 부비트랩을 각각 허용하거나 제한할 수 있습니다. 차량 AI와 용병 AI에는 별도의 전역 스위치가 있습니다.

설정은 서버가 관리하고 클라이언트에 동기화합니다. 편집에는 권한 레벨 2가 필요합니다. 제한된 기능의 NPC 설정은 삭제되지 않으며 서버에서 다시 허용하면 재사용됩니다. 용병 AI를 꺼도 계약 시간이 멈추거나 계약 데이터가 삭제되지는 않습니다.

설정 저장 위치:

```text
config/dochi_warfare/server-ai.json
```

## 차량 정책과 전투 지원

Forge 0.3.0의 차량 전역 AI는 DWE가 관리하며 `config/dochi_warfare/vehicle_ai/server-ai.json`에 저장합니다. NPC 정책과 별개로 차량 동작을 중단하고 개별 설정은 보존합니다.

폭격·기총 지원·차량 증원·NPC 이동은 [DWE 타임라인](#dochi-warfare-expanded/expanded-support-timeline)에서 제작하고 `/dw callgimmicks <이름> [x y z]`로 호출합니다. 기존 문서의 Mission Core Planner와 `/dw planner`는 현재 소스에서 확인되지 않아 현행 제작 절차에서 제외했습니다.
