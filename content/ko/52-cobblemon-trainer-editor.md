---
title: 파티·라운드·대화·보상 정하기
slug: cobblemon-trainer-editor
order: 520
description: 트레이너의 포켓몬을 편성하고 배틀 전후에 할 일을 정합니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 트레이너와 포켓몬 NPC를 만드는 제작자
tags:
  - trainer
  - pokemon
  - rounds
---

## 파티 편성하기

**Pokemon Party**에서 **Add Pokémon**으로 추가합니다. Trainer는 라운드마다 최대 6마리, Pokemon Itself는 한 마리를 사용합니다.

포켓몬을 골라 종·폼·레벨·기술·특성·지닌 도구를 정합니다. **Stats**는 IV/EV, **Battle Mechanics**는 테라 타입·다이맥스 등의 설정입니다. 기술 목록에서는 해당 포켓몬의 습득 기술이 먼저 나옵니다.

| 수치 | 범위 |
| --- | --- |
| 레벨 | 1~100 |
| 기술 | 최대 4개 |
| IV | 능력치별 0~31 |
| EV | 능력치별 0~252, 합계 510 이하 |

**Random Party**는 조건에 맞는 파티를 자동으로 만들고, **Battle Strategy**는 상대 AI, **Trainer Items**는 배틀 중 사용할 회복 아이템을 정합니다. [상세 설정](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items)을 참고하세요.

## 라운드를 나누기

한 NPC에 최대 16라운드를 만들 수 있습니다. **Add Round**로 추가하고 **Duplicate Round**로 현재 라운드를 복사합니다.

라운드마다 파티·조건·대화·보상을 다르게 정합니다. 순서를 바꾼 뒤에는 기존에 플레이한 사람의 진행도도 그 순서를 사용한다는 점을 확인하세요. 다시 Apply해도 승리 기록은 자동으로 지워지지 않습니다.

## 배틀 시작 방식과 규칙

**Encounter**에서 클릭으로 시작할지, 근처 플레이어를 보고 시작할지 정합니다. **Enabled**가 꺼져 있으면 배틀이 시작되지 않습니다.

**Rounds → 배틀 룰 편집**에서는 Singles·Doubles, 레벨 맞춤, 아이템 사용, 전설·기믹 허용을 정합니다. 라운드별로 다르게 하거나 공통 규칙을 씁니다. [배틀 룰](#drm-cobblemon-editor/cobblemon-battle-rules)에 각 항목이 있습니다.

## 배틀 전 대화 붙이기

현재 라운드의 **Dialogue**에서 대화 세트를 고릅니다. 대화의 ‘배틀하자’ 같은 선택지에는 **go_battle** 액션을 넣습니다.

대화를 지정하지 않으면 일반 배틀 확인 화면을 사용합니다. 등장 장면은 **General → Battle Presentation**에서 따로 고릅니다.

## 대화가 끝난 뒤 보상 주기

1. **Battle Config → After Actions**를 엽니다.
2. **Action Mode → Sequential**을 고릅니다.
3. 대화 액션을 넣고 그 아래에 아이템·화폐 등 보상 액션을 둡니다.
4. 실행할 결과를 승리·패배·도주 등으로 정하고 저장합니다.

순차 실행은 대화를 마친 뒤 다음 액션을 실행합니다. 대화를 취소하거나 접속이 끊기면 뒤의 보상은 멈춥니다. 다시 NPC와 상호작용하면 남은 액션부터 이어집니다.

라운드당 대화 액션은 한 개입니다. 예전 설정에 여러 개가 있으면 하나로 정리해야 저장·적용할 수 있습니다.

## 이름과 기믹용 아이템

**General**의 이름 소스를 **NPC**로 고르면 NPC의 현재 이름, **Profile**로 고르면 문서에 쓴 이름을 사용합니다.

**General Item Inv**에는 메가 키 같은 ‘소지하고 있어야 하는 아이템’을 넣습니다. **My Inventory → Add selected**는 플레이어 아이템을 복사하며 소모하지 않습니다. 이것은 배틀 중 소비하는 **Trainer Items**와 별도입니다.

저장한 파일을 NPC에 처음 연결하는 순서는 [첫 배틀](#drm-cobblemon-editor/cobblemon-editor-setup)에 있습니다.
