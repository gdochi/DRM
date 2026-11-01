---
title: NPC 한 명 만들기
slug: npc-core-setup
order: 1500
description: DNPC를 설치하고 이름·스킨·장비를 정해 NPC를 배치합니다.
product: dochi-npc-core
category: NPC Core 설치와 시작
section: setup
status: 사용 안내
version: 0.1.2
audience: 제작자 / 서버 운영자
---

## 다운로드와 설치

[CurseForge에서 Dochi’s NPC Core 다운로드](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core)

자신의 Minecraft 버전과 로더에 맞는 파일을 설치합니다. 멀티플레이는 서버와 접속자 모두 같은 파일을 사용합니다. Fabric에서는 Fabric API도 설치합니다.

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

DNPC만으로 NPC를 만들고 꾸미고 일을 시킬 수 있습니다. 대화나 상점을 붙이고 싶을 때 DRM을 추가합니다.

## 첫 NPC 배치하기

1. 크리에이티브의 **NPC Core** 탭에서 코어를 꺼냅니다. 명령어는 `/dnpc core`입니다.
2. 코어로 땅을 우클릭하면 NPC가 생깁니다.
3. 코어로 그 NPC를 우클릭해 편집 화면을 엽니다.
4. 이름을 쓰고 스킨과 장비를 고른 뒤 저장합니다.
5. 코어를 내려놓고 NPC의 모습을 확인합니다.

## 코어로 할 수 있는 일

| 조작 | 동작 |
| --- | --- |
| 땅 우클릭 | NPC 배치 |
| NPC 우클릭 | 해당 NPC 편집 |
| 허공 우클릭 | 전체 설정과 포저 열기 |
| 좌클릭 | NPC 유틸리티 메뉴 |
| 코어를 주손에 들고 Ctrl+C / Ctrl+V | NPC 복사 / 붙여넣기 |
| 코어를 주손에 들고 Ctrl+X | 대상 NPC 삭제 |

여러 번 쓸 NPC는 [복제 템플릿으로 저장](#dochi-npc-core/npc-core-templates)해 두세요.

## 다음으로 해볼 것

- [외형·장비·일 시키기](#dochi-npc-core/npc-core-editor)
- [낮에는 일하고 밤에는 쉬는 시간표](#dochi-npc-core/npc-core-schedules)
- [음식을 만들고 보관함에 넣기](#dochi-npc-core/npc-core-cooking)
- [DRM 대화·상점과 다른 모드 연결](#dochi-npc-core/npc-core-files)
