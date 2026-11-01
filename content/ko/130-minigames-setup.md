---
title: 테이블 놓고 게임 시작하기
slug: minigames-setup
order: 1300
description: 미니게임을 열고 규칙·참가비·보상을 정합니다.
product: dochi-minigames
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.6
audience: 제작자 / 서버 운영자
---

## 먼저 한 판 해보기

[미니게임 테이블](#dochi-minigames/minigames-tables)을 놓고 게임을 고릅니다. DRM 없이도 사용할 수 있습니다.

제작자는 `/minigame editor`로 편집기를 열 수 있습니다. 프리셋을 불러와 **테이블에 적용**한 뒤 플레이어가 우클릭하면 참가 화면이 열립니다.

### 편집 화면에서 한 판 시험하기

아래는 **Minigames 0.1.5 / NeoForge 1.21.1의 영문 화면**입니다. **Presets**에서 예제를 고른 뒤 편집 화면을 살펴봅니다.

![미니게임 편집기. 왼쪽에 게임 종류, 가운데 몬티홀 미리보기, 오른쪽에 제목·시간·참가비 설정이 보입니다.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "왼쪽에서 게임을 고르고 오른쪽 Inspector에서 설정합니다. 가운데는 편집용 미리보기이며 실제 입력은 위쪽 Test play로 시험합니다.")

1. 왼쪽 **Monty Hall**을 선택합니다.
2. 오른쪽 **General**에서 제목과 **Time (s)**를 정합니다. **Entry fee**가 `0`이면 무료입니다.
3. **Rules**에서 문 개수와 규칙을, **Symbols**에서 사용할 아이템을, **Rewards**에서 보상을 정합니다.
4. 위쪽 **Test play**를 눌러 실제 플레이 화면을 엽니다. 몬티홀은 닫힌 문을 먼저 고른 뒤, 꽝 문이 공개되면 원래 선택을 유지할지 바꿀지 정합니다.

![몬티홀 Test play의 실제 플레이 화면. 닫힌 문 세 개와 점수·남은 시간이 보입니다.](assets/media/guides/minigames-015-neo1211/minigames-test-play.png "Test play는 참가비와 보상을 처리하지 않습니다. 게임 조작을 확인한 다음 실제 테이블에서도 참가 확인과 정산을 따로 확인합니다.")

## 어떤 게임이 있나요?

몬티홀·슬롯·기억력·두더지·타이밍·하이로우·사격장·**아이템 룰렛**과 카드 게임 **MWENT**가 있습니다. 경품·확률과 기계 조작은 [아이템 룰렛](#dochi-minigames/minigames-roulette)에서 확인하세요. [게임별 규칙](#dochi-minigames/minigames-rules-rewards)에서 플레이 방법과 보상을 정합니다. MWENT는 [전용 시작 안내](#mwent/start)를 사용하세요.

## 내 게임으로 바꾸기

1. 편집기에서 프리셋을 불러옵니다.
2. 제목·제한 시간·게임 규칙을 바꿉니다.
3. 참가비와 보상을 정합니다. 참가비 0은 무료입니다.
4. **Save As**로 게임 파일을 저장합니다.
5. 사용할 테이블에 그 게임을 적용합니다.

참가비는 참가 화면의 **시작**을 눌렀을 때 냅니다. 참가 화면을 취소하면 결제하지 않으며, 기존 점수 게임은 시작 후 닫으면 포기입니다. 기본 Spin on block 룰렛은 창 없이 기계를 누르는 순간 시작·결제하며, 이미 시작한 추첨과 지급을 유지하므로 [별도 안내](#dochi-minigames/minigames-roulette)를 따릅니다.

## NPC나 대화에서 열기

DRM이 있으면 **NPC Apply → Minigames**에서 게임을 NPC에 적용할 수 있습니다.

대화 선택지를 눌렀을 때만 열려면 NPC에 게임을 직접 붙이지 말고, 선택지에 **Go Minigames**를 넣어 저장한 게임을 고릅니다. 직접 적용한 게임은 대화보다 먼저 열립니다.

## 설치 파일 고르기

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

현재 문서는 0.1.6 기준입니다. 이전 0.1.5 화면은 캡션에 버전을 표시했습니다. 서버와 클라이언트에 같은 버전·로더 파일을 설치하고 Fabric에는 Fabric API를 추가합니다. DRM 화폐나 Cobblemon 보상을 선택했을 때는 해당 모드도 필요합니다.
