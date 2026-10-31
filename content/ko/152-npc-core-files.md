---
title: NPC 파일·연동·변환
slug: npc-core-files
order: 1520
description: NPC 파일·연동·변환
product: dochi-npc-core
category: NPC 파일·연동·변환
section: operations
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## 저장 위치

| 내용 | 경로 |
| --- | --- |
| 글로벌 설정 | `config/dochi_npc_core/global.json` |
| 포즈 | `config/dochi_npc_core/poses/<id>.json` |
| NPC 템플릿 | `config/dochi_npc_core/templates/` |
| 서버 스킨 | `config/dochi_npc_core/assets/textures/` |
| 클라이언트 설정 | `config/dochi_npc_core/client-settings.json` |
| DRM 고용 Function | `config/dochi_rpg_maker/dochi_npc/employment/<id>.json` |

NPC 배치 상태와 고용 계약 등은 월드에도 저장됩니다. 설정만 복사하지 말고 월드를 함께 백업합니다. 서버 에셋 선택은 서버가 보유한 PNG를 클라이언트로 전송하므로 접속자의 PC에 파일을 수동 복사할 필요가 없습니다.

## 모드별 연결 범위

| 모드 | DNPC와의 연결 |
| --- | --- |
| DRM 0.3.1 | 선택적 Actor API와 템플릿 공급자 API, 지원되는 Apply 기능 |
| Cobblemon Editor 0.2.9 | 1.21.1 트레이너·Pokemon Itself·상점·치료·스타터·클론과 순차 보상 |
| Spawn Control 0.1.4 | 기본 NPC와 v3 정확한 복제를 별도 소스로 선택. COMMON 자연 스폰·기존 대상/26.3 배치형 템플릿 |
| Real Armor 0.1.4 | 방어·부위 피해·내구도. CNPC 전용 저항·companion 제외 |
| DW / DWE 0.3.1 | Forge 1.20.1·NeoForge 1.21.1의 총기·근접·승무원·일정. 26.3 제외 |
| Minigames 0.1.5 | DNPC Gecko 카드 외형과 로딩 중 미리보기 재생성 |
| BattleWorks 0.1.6 | 기존 세 로더와 26.3의 DNPC 전투·관계·외형·제어권 연결 |

파일 템플릿과 임시 클립보드는 다릅니다. [v3 저장·구형 파일 이행](#dochi-npc-core/npc-core-templates)을 확인하세요. 확인한 조합의 버전이 모든 연동의 최소 버전이라는 뜻은 아닙니다.

## 실험적 NPC 체인징

글로벌 설정 → 실험적 기능 → 월드 조사에서 변환할 NPC를 체크합니다. 미지원 항목을 읽고, 필요한 경우에만 부분 변환을 허용한 뒤 선택한 NPC를 변환합니다. 원본 월드를 먼저 백업하고 복사본에서 시험하세요.

Forge 1.20.1과 Fabric·NeoForge 1.21.1용 변환 어댑터가 있습니다. 외형·모델·애니메이션·관계 등 지원 데이터만 변환하며 임의의 다른 모드 스크립트나 월드 저장 형식 전체를 자동 포팅하는 기능은 아닙니다.

26.3은 Fabric·NeoForge / Java 25의 별도 빌드입니다. CustomNPCs는 영구 제외하므로 기존 CNPC 변환 안내를 26.3에 적용하지 않습니다. [26.3 범위](#core-fabric/minecraft-26-3)를 확인하세요.
