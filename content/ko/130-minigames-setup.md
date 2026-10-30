---
title: 미니게임스 설치와 시작
slug: minigames-setup
order: 1300
description: 현재 설치 조건과 기본 사용 순서입니다.
product: dochi-minigames
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.3
audience: 제작자 / 서버 운영자
---

## 설치

**Dochi’s Minigames 0.1.3**는 DRM 없이 실행하는 미니게임 모드입니다. 서버와 클라이언트에 같은 로더의 같은 빌드를 설치합니다.

| 로더 | Minecraft / Java | 설치 파일 |
| --- | --- | --- |
| Forge | 1.20.1 / 17 | `dochi_minigames-0.1.3-forge-1.20.1.jar` |
| Fabric | 1.21.1 / 21 | `dochi_minigames-0.1.3-fabric-1.21.1.jar` |
| NeoForge | 1.21.1 / 21 | `dochi_minigames-0.1.3-neoforge-1.21.1.jar` |
| Fabric / NeoForge | 26.3 / 25 | `dochi_minigames-0.1.3-<loader>-26.3.jar` |

Fabric은 Loader 0.15.11 이상과 Fabric API 0.101.2+1.21.1 이상이 필요합니다. Forge는 47.2.0 이상, NeoForge는 21.1 이상을 사용합니다. DRM·CustomNPCs·Cobblemon·CobbleDollars는 선택 연동입니다. 특정 화폐·조건·포켓몬 보상을 참조하면 해당 제공 모드를 추가합니다.

## 첫 게임 만들기

1. OP 2 이상으로 `/minigame editor`를 실행하거나 [미니게임 테이블](#dochi-minigames/minigames-tables)을 편집합니다.
2. 프리셋을 불러오거나 새 문서에서 몬티홀·슬롯·메모리·두더지·타이밍·하이로우·사격장·MWENT 중 하나를 선택합니다.
3. 제목·제한 시간·규칙을 정합니다. 첫 시험은 무료로 시작합니다.
4. 지원되는 시험 플레이에서 규칙을 확인하고 실제 테이블에서도 플레이합니다.
5. `Save As`로 사용자 JSON을 저장하거나 **테이블에 적용**으로 배치한 테이블에 연결합니다.

## DRM NPC와 대화 연결

호환 DRM을 설치하면 공용 에디터 목록, NPC Apply, 대화 액션과 GUI Maker를 연결할 수 있습니다. 저장한 게임을 NPC Apply의 Minigames로 지정하면 NPC 상호작용에서 게임을 엽니다.

대화에서만 열려면 NPC에 직접 Minigames Apply를 하지 않고 선택지의 **Go Minigames** 액션에서 게임 JSON을 고릅니다. 직접 Apply한 게임은 대화보다 먼저 상호작용을 처리합니다. 액션 ID는 `dochi_minigames:play`이며 기존 ID와 `.json` 경로를 읽습니다.

참가 화면의 시작을 눌러야 결제합니다. NPC 클릭이나 참가 확인 취소만으로 비용을 차감하지 않습니다. 플레이 도중 종료하면 포기로 처리합니다.

## 명령

```text
/minigame list
/minigame play monty
/minigame play mob_battle
/minigame scores monty
/minigame editor
/minigame packs
```

[게임 규칙과 보상](#dochi-minigames/minigames-rules-rewards), [MWENT](#mwent/start), [파일과 GUI](#dochi-minigames/minigames-files-gui)를 확인하세요.

## 0.1.3 카드 획득과 26.3

주민·떠돌이 상인·자연 생성 상자의 카드 획득은 [MWENT 획득 설정](#mwent/acquisition)에서 관리합니다. 프로필 저장과 Apply를 구분하세요.

26.3은 같은 모드 버전의 Java 25 별도 빌드이며 DRM 없이 실행합니다. CustomNPCs는 제외합니다. 플랫폼 설치와 범위는 [26.3 안내](#core-fabric/minecraft-26-3)를 따릅니다.
