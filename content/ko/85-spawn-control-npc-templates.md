---
title: DNPC 템플릿 스폰
slug: spawn-control-npc-templates
order: 838
description: 기본 NPC 생성과 v3 복제, 자연 스폰과 배치형 소스를 구분합니다.
product: dochi-spawn-control
category: DNPC 템플릿 스폰
section: editor
status: 사용 안내
version: 0.1.4
audience: 제작자 / 서버 운영자
---

## 기본 NPC와 저장 NPC의 차이

`dochi_npc:npc`를 Entity로 고르면 기본 NPC를 생성합니다. 외형·장비·행동을 완성한 NPC를 그대로 재사용하려면 [DNPC v3 복제 템플릿](#dochi-npc-core/npc-core-templates)을 먼저 만드세요.

DRM·DNPC는 Spawn Control 전체의 필수 모드가 아닙니다. 템플릿 연동에는 공개 템플릿 API와 공급자가 필요하며 없으면 이 소스만 사용할 수 없습니다.

## 자연 스폰 규칙 — 1.20.1·1.21.1

1. DNPC에서 NPC에 저장한 뒤 **복제 템플레이트로 저장**합니다.
2. Spawn Control 카탈로그에서 **NPC 복제: 이름**을 검색합니다. `dochi_npc:actor/파일이름`으로도 찾을 수 있습니다.
3. 템플릿 모델과 장비를 확인하고 **규칙 추가**를 누릅니다.
4. 바이옴·시간·위치·수량 제한을 정해 저장합니다.
5. 실제 생성된 NPC의 외형·장비와 템플릿별 상한을 확인합니다.

기본 EntityType과 템플릿은 별도 집계 대상입니다. 템플릿에는 EntityType 전체를 제어하는 원본 스폰 ON/OFF를 적용하지 않습니다. 이 자연 스폰 경로는 COMMON 세 로더의 확인 범위이며 26.3의 같은 지원·검증을 뜻하지 않습니다.

## 배치형 스포너 — 기존 대상·26.3

1. `Spawner Editor`의 소환 목록에 항목을 추가합니다.
2. 소스 종류를 **NPC 복제 템플레이트**로 고릅니다.
3. 서버 목록에서 저장한 파일을 선택합니다.
4. 가중치와 스폰 조건을 정하고 JSON을 저장합니다.
5. 설치된 스포너에 JSON을 적용한 뒤 실제 생성과 사망 후 재생성을 확인합니다.

저장만으로 월드 스포너에 연결되지 않습니다. [스포너 제작 순서](#dochi-spawn-control/dochi-spawn-control-spawner)를 함께 확인하세요.

## 생성 규칙과 오류

생성본은 새 UUID를 사용하고 복제 장비를 다시 추첨하지 않습니다. Spawn Control이 DNPC 자체 부활을 끄고 허용된 실제 스폰 위치를 home으로 설정한 뒤 생성하여 중복 재생성을 막습니다.

- 구형 v2가 목록에 없음: NPC에 불러와 v3로 새로 저장합니다.
- 템플릿이 없음: 서버 파일과 제공자·API 준비 상태를 확인합니다. 이름의 대소문자를 보존합니다.
- 소스 실패: 빈 NPC로 대체하지 않으며 다른 일반 몹 규칙은 계속 동작합니다.
- 파일을 고쳤는데 이전 장비가 나옴: 준비 캐시를 사용하는 에디터/서버의 재로드·재적용 흐름을 수행합니다.

참고용 JSON 식별자는 자연 스폰 `NPC_TEMPLATE` / `npcTemplateId`, 배치형 `npc_template` / `source.npcTemplateId`입니다. 소스 ID 예시는 `dochi_npc:actor/guard`입니다. 26.3에는 CustomNPCs 클론 소스가 없습니다.
