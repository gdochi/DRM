---
title: DWE 설치와 시작
slug: expanded-overview
order: 310
description: DW를 필수로 사용하는 차량·전투 지원 애드온의 설치와 제작 순서입니다.
product: dochi-warfare-expanded
category: 시작하기
section: overview
status: Draft
version: 0.3.0
audience: 제작자와 서버 운영자
---

**Dochi's Warfare Expanded(DWE)**는 DW 0.3.0을 필수로 사용하는 Forge 1.20.1 애드온입니다. 차량 AI, 무장, 승무원, 차량 반응 기믹과 폭격·증원 타임라인을 담당합니다. NPC의 총기·근접 전투, 탄약, 애니메이션과 공용 클론 보관함은 DW가 담당합니다.

## 설치

| 구성 | 조건 |
| --- | --- |
| Minecraft / 로더 | 1.20.1 / Forge 47+, Java 17 |
| DW | 정확히 0.3.0, DW의 TACZ·Player Animator 요구 조건도 충족 |
| DWE | `dochi_warfare_expanded-0.3.0.jar` |
| SuperbWarfare | 0.8.9 또는 0.8.9.1, 네이티브 호환 검사 통과 필요 |
| CustomNPCs | NPC 승무원·전투 하차·NPC 증원을 사용할 때 필요 |
| DRM | 선택 사항. 설치하면 공용 에디터 선택과 도움말을 사용 |

서버와 클라이언트에 동일한 DW/DWE 빌드를 설치합니다. 같은 0.3.0이라도 통신 규격이 다른 빌드는 혼용할 수 없습니다. 이전 이름의 `dochi_warfare_vehicle-0.3.0.jar`는 새 파일로 교체하고 함께 설치하지 마세요. 내부 모드 ID는 호환성을 위해 `dochi_warfare_vehicle`를 유지합니다.

현재 확인된 DWE는 Forge용입니다. NeoForge DW 0.2.9의 기존 차량 기능과 DWE 0.3.0의 설치 조건을 섞지 마세요. [DW 설치](#dochi-warfare/warfare-setup)를 함께 확인하세요.

## 첫 차량 만들기

1. 지원 SuperbWarfare 차량을 배치합니다.
2. 크리에이티브에서 `DW Npc Core`로 차량을 우클릭합니다.
3. 차량 AI, 이동 모드, 홈과 범위를 정합니다.
4. 무장 하나와 단순한 타겟 조건으로 먼저 확인합니다.
5. 필요하면 `Crew`에서 NPC 클론이나 소울스톤으로 승무원을 배치합니다.
6. 저장 응답을 확인한 뒤 [차량 반응 기믹](#dochi-warfare-expanded/expanded-vehicle-gimmicks)을 추가합니다.

이동·표적·탄약·좌석의 상세 항목은 [차량 AI](#dochi-warfare/warfare-vehicle-ai)에 있습니다. 차량을 직접 조종하려면 먼저 AI를 끄세요. 원본 모드가 물리·발사체·모델·사운드를 처리하므로 차량 정의에 없는 무장이나 연막을 DWE가 만들어 주지는 않습니다.

## 저장 위치와 업데이트

| 데이터 | 서버 경로 |
| --- | --- |
| 차량 AI 프로필 | `config/dochi_warfare/vehicle_ai/profiles/` |
| 차량 전역 AI 정책 | `config/dochi_warfare/vehicle_ai/server-ai.json` |
| 지원 타임라인 | `config/dochi_warfare/vehicle_ai/gimmicks/` |
| 공용 NPC·차량 클론 | `config/dochi_warfare/entity_clones/` |
| DW NPC 전역 AI 정책 | `config/dochi_warfare/server-ai.json` |

설정과 월드를 함께 백업한 뒤 업데이트하세요. 이전 `config/dochi_warfare_vehicle` 프로필은 검증 후 현재 폴더로 가져오며 원본을 보존합니다. 동명·동일 내용은 중복 생성하지 않고, 내용이 다르면 기존 파일을 보존한 채 `_dwe_<내용 해시>` 접미어로 가져옵니다. 이전 차량 전역 정책은 새 정책이 없을 때만 가져옵니다.

전역 차량 AI OFF는 개별 차량 설정을 지우지 않고 동작을 중단합니다. NPC 전역 정책과 차량 전역 정책은 별도 파일입니다. `Save As` 프로필과 클론 저장도 다릅니다. 프로필은 기존 차량에 설정을 적용하고 클론은 새 엔티티를 소환합니다.
