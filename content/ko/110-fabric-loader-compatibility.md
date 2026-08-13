---
title: Forge와 Fabric 구분
slug: loader-compatibility
order: 45
description: Forge 1.20.1 문서와 Fabric 1.21.1 문서를 구분하고 데이터 이동 시 확인할 차이를 정리합니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.1.7
audience: 제작자 / 서버 운영자
tags:
  - fabric
  - compatibility
  - migration
---

## 이 문서가 다루는 빌드

이 제품의 모든 페이지는 `DRM Core 0.1.7`, `Fabric 1.21.1`, `Java 21` 소스를 기준으로 합니다. 기존 `DRM Forge 1.20.1` 제품의 페이지는 Forge 빌드 문서로 남아 있습니다.

| 구분 | Forge 문서 | Fabric 문서 |
| --- | --- | --- |
| Minecraft | 1.20.1 | 1.21.1 |
| 로더 | Forge 47+ | Fabric Loader 0.18.0+ |
| Java | 17 | 21 |
| 메타데이터 | `META-INF/mods.toml` | `fabric.mod.json` |
| JAR 예시 | `dochi_rpg_maker-0.1.4-1.20.1-forge.jar` | `dochi_rpg_maker-0.1.7-fabric-1.21.1.jar` |

## 유지되는 데이터 계약

Fabric 포트는 새 모드로 재설계한 것이 아니라 기존 DRM 데이터를 유지하도록 구현되었습니다. 다음 값은 그대로입니다.

- 모드 ID와 네임스페이스 `dochi_rpg_maker`
- 공식 데이터 루트 `config/dochi_rpg_maker`
- 대화, GUI, NPC Shop, 화폐, HUD, Remnant Msg JSON 키와 폴더 의미
- 에디터·컴포넌트·조건·액션 ID
- CustomNPCs NPC에 저장되는 바인딩 의미

이 때문에 기존 Forge JSON을 Fabric 서버로 옮겨 시험할 수 있습니다. 다만 원본 운영 폴더나 유일한 월드에서 바로 시험하지 말고 복사본에서 먼저 확인하세요.

## Fabric 0.1.7에서 확인할 기능

- 긴 대화 본문의 전체 줄 페이지 이동과 설정 가능한 이전/다음 버튼
- NPC Shop Item ID 검색 선택기
- 조건 편집기의 아이템·팩션·발전 과제·FTB 퀘스트 검색과 드래그 순서 변경
- NPC Apply의 `FUNCTION` 검색과 기본/애드온 적용 대상 필터링, 기능 전환 때 좌측 하단에 잠깐 보이던 중복 로딩 라벨 제거
- Teleporter Set 제작, NPC 적용/제거, `go_teleporter`, 서버 권한 이동, 블러 없이 조작 가능한 플레이어 런타임 GUI
- 가중치 템플릿/Soul Stone 소스, 조건, 소환 모드, 서버 검증 외형을 갖춘 범용 NPC Spawner 블록 에디터
- Remnant 메시지/정책 검색, 아이템·블록 외형, 크기·billboard·item transform 저장
- 사망 후 화폐 잔액 복사와 픽업/사망 손실 안내
- Mod Menu를 통한 선택형 `Mods Config` 진입

## 현재 0.1.7 경계

Forge 0.1.4에서 나중에 추가된 `choiceHideUntilTypingComplete` 옵션은 현재 Fabric 0.1.7 소스에 없습니다. Fabric에는 FTB 퀘스트 검색기가 있지만, Forge 최신 선택기의 초기 검색 포커스와 세분화된 빈 상태 처리까지 모두 같다고 가정하지 마세요.

0.1.7 소스는 `clean build runPortingRegressionChecks`를 통과했습니다. Gradle 13개 작업이 모두 완료됐고, 집중 회귀 테스트 파일 35개가 PASS를 보고했으며, 소스 JSON 54개가 파싱됐고, 번들 11개 언어가 동일한 839개 키를 가졌습니다. 실제 GUI 조작, 멀티플레이, 선택 연동 모드, 재접속·재시작 저장은 서버 구성별로 별도 검수해야 합니다.

NPC Spawner ConfigVersion 1~3 데이터와 예전 단일 Source는 현재 ConfigVersion 4 가중치 풀로 마이그레이션됩니다. 예전 Cobblemon Editor clone 파일도 가져오기용으로 읽지만, 새 범용 템플릿은 Core 경로에서 `dochi_rpg_maker_npc_spawner_template` 형식을 사용하세요.

## Forge에서 옮길 때

1. Forge의 `config/dochi_rpg_maker`와 월드를 백업합니다.
2. 별도 Fabric 1.21.1 테스트 인스턴스를 만듭니다.
3. Fabric DRM과 필요한 Fabric용 의존 모드만 설치합니다.
4. `config/dochi_rpg_maker` 복사본을 넣고 JSON 문법을 검사합니다.
5. 대화 Load/Save As, 상점 구매·판매, 텔레포터 편집·적용·이동, NPC Spawner 소스·재시작, 화폐 사망 규칙, HUD, Remnant 마커 재시작을 차례로 확인합니다.
6. 문제를 확인하기 전에는 Fabric에서 저장된 파일을 Forge 운영 폴더에 다시 덮어쓰지 않습니다.

:::warning 애드온도 로더를 맞추세요
DRM Core만 Fabric으로 바꾸고 Forge용 DRM 애드온을 함께 넣을 수는 없습니다. 모든 애드온과 선택 의존 모드를 Fabric 1.21.1용으로 맞춰야 합니다.
:::
