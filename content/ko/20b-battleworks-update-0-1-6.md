---
title: 버전에 맞게 BattleWorks 설치하기
slug: battleworks-update-0-1-6
order: 208
description: Minecraft 버전에 맞는 DRM·NPC 모드를 준비합니다.
product: mob-editor
category: 0.1.6과 로더 선택
section: start
status: 사용 안내
version: 0.1.6
audience: 제작자 / 서버 운영자
---

## 필요한 모드

BattleWorks는 **DRM에 추가하는 NPC 전투 제작 모드**입니다. NPC는 DNPC 또는 CustomNPCs로 준비합니다.

| Minecraft / 로더 | Java | 필요한 DRM |
| --- | --- | --- |
| Forge 1.20.1 | 17 | 0.2.8 이상 |
| Fabric / NeoForge 1.21.1 | 21 | 0.2.9 이상 |
| Fabric / NeoForge 26.3 | 25 | 0.2.8 이상 |

서버와 클라이언트의 로더·버전을 맞춥니다. 26.3은 DNPC를 사용하며 CustomNPCs는 사용할 수 없습니다.

## 전투 하나 만들어 보기

NPC를 배치한 뒤 BattleWorks에서 공격 문서를 만들고 NPC에 적용합니다. 먼저 [첫 근접 공격](#mob-editor/battleworks-first-attack)으로 준비 동작·타격·대기 순서를 만들어 보세요. 이 실습의 NPC 준비 화면은 Forge·CustomNPCs 예시입니다.

DNPC에서도 전투·우호/적대 관계·외형을 연결할 수 있습니다. 추가 모션을 쓰려면 해당 모션을 제공하는 모드도 설치합니다.

## 예제 패턴 쓰기

예제는 `config/dochi_rpg_maker/mobs/patterns/samples/`에서 불러옵니다. 내 패턴으로 바꿀 때는 **Save As**로 이름을 바꿉니다.

Better Combat 예제에는 호환 Better Combat과 모션에 필요한 모드가 있어야 합니다. 26.3에서는 구형 CustomNPCs 클론 소환을 쓰지 않습니다.

[설치와 NPC 준비](#mob-editor/mob-editor-setup) 또는 [전체 학습 순서](#mob-editor/mob-editor-overview)로 이어가세요.
