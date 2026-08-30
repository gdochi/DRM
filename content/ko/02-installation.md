---
title: 설치 준비
slug: installation
order: 30
description: DRM Core를 실행하기 위한 Forge, Minecraft, CustomNPCs 기준과 서버/클라이언트 역할입니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.1.4
audience: 서버 운영자
tags:
  - install
  - forge
---

## 지원 환경

DRM Core는 `mods.toml` 기준으로 Forge 47 이상, Minecraft 1.20.1 이상 1.21 미만을 대상으로 합니다. 모드 ID는 `dochi_rpg_maker`입니다.

| 항목 | 기준 | 비고 |
| --- | --- | --- |
| Mod Loader | Forge / `javafml` `[47,)` | Forge 1.20.1 계열 |
| Minecraft | `[1.20.1,1.21)` | 문서는 1.20.1 기준 |
| DRM Core | `dochi_rpg_maker` 0.1.4 | 클라이언트와 서버 양쪽 필요 |
| Java | 17 | Forge 1.20.1 실행 환경과 동일하게 맞춥니다. |
| CustomNPCs | `[1.20.1,)` | 클라이언트와 서버 양쪽 필수 |

코어 에디터는 Minecraft 네이티브 `Screen`으로 구현되어 있습니다. 대화/상점/GUI Maker의 기본 동작에는 HTML GUI, MCEF, CNPCExtended가 필요하지 않습니다.

## 설치 절차

1. 클라이언트와 서버의 `mods` 폴더에 같은 버전의 DRM Core JAR을 넣습니다.
2. 호환 CustomNPCs 빌드를 양쪽에 설치하고 모드셋을 맞춥니다.
3. 서버를 시작해 `config/dochi_rpg_maker`가 생성되게 합니다.
4. 기본 파일이 설치된 뒤 `dialogue_sets`, `gui`, `npc_shops`, `currency`, `hud`, `remnant_msg`, `quests`, `stats`, `items`, `teleporters`, `factions`, `popups` 폴더를 확인합니다.
5. 코어 아이템을 준비하고 에디터 선택 화면으로 들어갑니다.

로컬 개발 환경에서 JAR을 만들 때는 모드 폴더의 `build-local.ps1`을 사용합니다.

```powershell
.\build-local.ps1
```

## 선택 연동 모드

| 모드 | 선언 범위 | DRM의 주 용도 |
| --- | --- | --- |
| GeckoLib | `[4.7.1,5.0.0)` | NPC 모델과 애니메이션 |
| Player Animator | `[1.0.0,)` | 플레이어 애니메이션 공급자 |
| Mob Player Animator | `[1.3.3,)` | 몹/플레이어형 애니메이션 공급자 |
| Better Combat | `[1.8.0,)` | 전투 애니메이션 연동 |
| Iron's Spells 'n Spellbooks | `[1.20.1-3.16.2,)` | 마나 HUD와 스킬 연동 |
| Mowzie's Mobs | `[1.8.2,)` | 타 모드 스킬 연동 |
| L_Ender's Cataclysm | `[3.31,)` | 타 모드 스킬 연동 |

위 연동은 선택 사항이지만 서버 콘텐츠와 모델 공급자가 요구하는 모드는 접속할 모든 클라이언트에도 설치해야 합니다.

## 서버와 클라이언트의 역할

| 위치 | 담당 |
| --- | --- |
| 서버 | JSON 저장, NPC PersistentData, 상점 거래, 화폐 잔액, 명령 실행 |
| 클라이언트 | 에디터 화면, GUI Maker 미리보기, 런타임 화면, HUD 렌더링 |

서버 JSON은 서버 루트의 `config/dochi_rpg_maker`를 기준으로 읽습니다. 싱글플레이에서는 현재 게임 인스턴스 루트가 서버 루트처럼 동작합니다.

## 업데이트 전 백업

업데이트 전에는 다음 폴더를 백업합니다.

| 경로 | 이유 |
| --- | --- |
| `config/dochi_rpg_maker` | 현재 공식 데이터 루트입니다. |
| `dochi_rpg_maker` | 예전 루트입니다. 첫 실행 때 새 루트로 마이그레이션될 수 있습니다. |
| 월드 저장 폴더 | NPC PersistentData에 붙은 대화/상점 데이터가 들어 있습니다. |

번들 기본 대화·GUI·상점과 Remnant Msg 샘플은 시작 시 새 버전으로 다시 복사될 수 있습니다. 기본 파일을 직접 수정하지 말고 `Save As`로 별도 파일을 만든 뒤 그 파일을 NPC나 기본 설정에 연결하세요. HUD 정의와 Remnant Msg 기본 정책은 파일이 없을 때 설치되며, 기본 HUD 정의는 비활성 상태로 시작합니다.

:::warning 버전 혼합 주의
클라이언트만 최신이고 서버가 이전 버전이면 에디터 패킷, 서버 JSON 종류, 런타임 GUI 필드가 어긋날 수 있습니다. 운영 서버에서는 항상 같은 JAR로 맞춰야 합니다.
:::
