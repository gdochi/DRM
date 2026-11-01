---
title: 차량을 움직이고 승무원 태우기
slug: expanded-overview
order: 310
description: DWE로 차량 AI·무장·운전수·포수를 설정합니다.
product: dochi-warfare-expanded
category: 시작하기
section: overview
status: Draft
version: 0.3.1
audience: 제작자와 서버 운영자
---

## 무엇을 설치하나요?

DWE는 **DW에 추가하는 차량 기능 모드**입니다. 지원하는 SuperbWarfare 차량을 움직이고 무장을 사용하거나 NPC를 운전수·포수로 태울 수 있습니다.

| 항목 | 필요 조건 |
| --- | --- |
| Minecraft / 로더 | Forge 1.20.1 또는 NeoForge 1.21.1 |
| DW와 DWE | 둘 다 0.3.1, 서버·클라이언트에 함께 설치 |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2, NeoForge 0.8.9.1 / 0.8.9.2 |
| NPC 승무원 | DNPC 또는 CustomNPCs |
| DRM | 선택 |

DW의 TACZ·Player Animator도 필요합니다. [DW 설치](#dochi-warfare/warfare-setup)를 함께 확인하세요.

## 첫 차량 설정하기

1. 지원 차량을 배치합니다.
2. **DW Npc Core**로 차량을 우클릭합니다.
3. 차량 AI를 켜고 이동 방식·돌아올 위치·활동 범위를 정합니다.
4. 사용할 무장과 공격 대상을 정합니다.
5. **Crew**에서 승무원을 배치하고 운전수·포수 자리를 정합니다.
6. 저장한 뒤 차량의 이동과 사격을 확인합니다.

직접 운전하려면 차량 AI를 끕니다. 어떤 무장을 쓸 수 있는지는 그 차량이 원래 가지고 있는 무장에 따라 달라집니다.

## 다음에 만들 것

- 피격 시 후퇴·연막·승무원 하차: [차량 반응](#dochi-warfare-expanded/expanded-vehicle-gimmicks)
- 폭격·증원 요청: [지원 타임라인](#dochi-warfare-expanded/expanded-support-timeline)
- 이동·타겟·탄약 상세: [차량 AI](#dochi-warfare/warfare-vehicle-ai)
- 다른 차량 팩 사용: [호환 기종](#dochi-warfare-expanded/expanded-compatibility)

## 설정을 다시 쓰기

**Save As**는 차량의 설정을 보관합니다. 다른 차량에 **Load**해 적용합니다. **클론**은 차량 자체를 새로 소환할 때 사용합니다.

차량 설정은 `config/dochi_warfare/vehicle_ai/profiles/`, 지원 타임라인은 `config/dochi_warfare/vehicle_ai/gimmicks/`에 저장됩니다.

예전 `dochi_warfare_vehicle` JAR는 새 DWE와 함께 넣지 않습니다. 이전 프로필은 원본을 남기고 가져옵니다.
