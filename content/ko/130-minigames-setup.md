---
title: 테이블 놓고 게임 시작하기
slug: minigames-setup
order: 1300
description: 미니게임을 열고 규칙·참가비·보상을 정합니다.
product: dochi-minigames
category: 시작하기
section: setup
status: 사용 안내
version: 0.1.5
audience: 제작자 / 서버 운영자
---

## 먼저 한 판 해보기

[미니게임 테이블](#dochi-minigames/minigames-tables)을 놓고 게임을 고릅니다. DRM 없이도 사용할 수 있습니다.

제작자는 `/minigame editor`로 편집기를 열 수 있습니다. 프리셋을 불러와 **테이블에 적용**한 뒤 플레이어가 우클릭하면 참가 화면이 열립니다.

## 어떤 게임이 있나요?

몬티홀·슬롯·기억력·두더지·타이밍·하이로우·사격장과 카드 게임 **MWENT**가 있습니다. [게임별 규칙](#dochi-minigames/minigames-rules-rewards)에서 플레이 방법과 보상을 정합니다. MWENT는 [전용 시작 안내](#mwent/start)를 사용하세요.

## 내 게임으로 바꾸기

1. 편집기에서 프리셋을 불러옵니다.
2. 제목·제한 시간·게임 규칙을 바꿉니다.
3. 참가비와 보상을 정합니다. 참가비 0은 무료입니다.
4. **Save As**로 게임 파일을 저장합니다.
5. 사용할 테이블에 그 게임을 적용합니다.

참가비는 참가 화면의 **시작**을 눌렀을 때 냅니다. 참가 화면을 취소하면 결제하지 않으며, 시작한 게임을 중간에 닫으면 포기입니다.

## NPC나 대화에서 열기

DRM이 있으면 **NPC Apply → Minigames**에서 게임을 NPC에 적용할 수 있습니다.

대화 선택지를 눌렀을 때만 열려면 NPC에 게임을 직접 붙이지 말고, 선택지에 **Go Minigames**를 넣어 저장한 게임을 고릅니다. 직접 적용한 게임은 대화보다 먼저 열립니다.

## 설치 파일 고르기

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

현재 문서는 0.1.5 기준입니다. 서버와 클라이언트에 같은 버전·로더 파일을 설치하고 Fabric에는 Fabric API를 추가합니다. DRM 화폐나 Cobblemon 보상을 선택했을 때는 해당 모드도 필요합니다.
