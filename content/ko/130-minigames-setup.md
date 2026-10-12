---
title: 미니게임스 설치와 시작
slug: minigames-setup
order: 1300
description: 몬티홀·슬롯·기억력 게임을 만들고 NPC와 대화에 연결합니다.
product: dochi-minigames
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.0
audience: 제작자 / 서버 운영자
---

## 설치

**Dochi`s Minigames 0.1.0**은 Minecraft 1.21.1 / Java 21용 DRM 애드온입니다. Fabric·NeoForge 빌드를 제공하며 Forge 1.20.1 빌드는 없습니다.

| 로더 | 설치 파일 | 기본 환경 |
| --- | --- | --- |
| Fabric | `dochi_minigames-0.1.0-fabric-1.21.1.jar` | Fabric Loader 0.18.0+, Fabric API 0.116.11+1.21.1+ |
| NeoForge | `dochi_minigames-0.1.0-neoforge-1.21.1.jar` | NeoForge 21.1+ |

두 빌드 모두 같은 로더의 **DRM 0.2.4 이상**이 필수이며 현재 Core는 0.2.5입니다. 현재 DRM 자체가 CustomNPCs를 요구하므로 전체 실행 환경에 CustomNPCs도 설치합니다. Cobblemon은 포켓몬 보상, CobbleDollars는 해당 참가비를 사용할 때 추가합니다. 서버와 클라이언트에 같은 로더·같은 빌드를 넣으세요.

## 첫 게임 만들기

1. DRM Core 도구로 에디터 목록을 열고 **미니게임스 / Minigames**를 선택합니다. 편집에는 OP 2 이상이 필요합니다.
2. 기본값 사용 또는 새로 만들기로 시작하고 몬티홀, 슬롯, 기억력 중 게임 타입을 고릅니다.
3. 일반 탭에서 제목·제한 시간·참가비를 정합니다. 첫 시험은 참가비 `0`으로 시작하세요.
4. 규칙·심볼·보상 탭을 편집하고 에디터의 시험 플레이로 확인합니다. 시험 플레이에는 참가비와 실제 보상이 없습니다.
5. `Save As`로 사용자 게임 JSON을 저장합니다. 기존 프로필의 ID 변경도 다른 이름으로 저장에서 처리합니다.
6. 대상 NPC의 **NPC Apply Editor**에서 미니게임스를 선택하고 저장한 서버 JSON을 연결합니다.

실제 플레이어가 NPC를 우클릭하면 참가 비용 확인 화면이 열립니다. **시작**을 누를 때 결제하고 게임을 시작하며 슬롯은 레버로 시작할 수 있습니다. NPC에 웅크려 상호작용하거나 편집 도구를 들고 있으면 게임을 열지 않습니다.

## 대화에서 열기

대화 선택지 액션 또는 시작 노드 라우트에서 **고 미니게임스 / Go Minigames**를 고르고 **게임 JSON** 목록에서 파일을 지정합니다. 성공하면 대화를 닫고 참가 비용 확인으로 이동합니다. 게임이 없거나 사용할 수 없으면 대화를 유지합니다.

대화로만 들어가는 NPC에는 미니게임을 직접 Apply하지 마세요. 직접 Apply한 미니게임의 우클릭 처리가 대화보다 먼저 실행됩니다. 액션 ID는 `dochi_minigames:play`이며 기존 `id: "monty"`와 파일 선택기의 `id: "monty.json"`을 모두 읽습니다.

## 명령

```text
/minigame list
/minigame play monty
/minigame scores monty
/minigame editor
```

`monty`는 저장한 게임 ID 예시입니다. [게임 규칙과 보상](#dochi-minigames/minigames-rules-rewards)과 [GUI·파일·문제 해결](#dochi-minigames/minigames-files-gui)을 이어서 확인하세요.
