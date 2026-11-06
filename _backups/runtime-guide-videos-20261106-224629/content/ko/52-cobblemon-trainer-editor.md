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

## 포켓몬 한 마리부터 설정하기

**Pokemon Party**에서 가운데 목록의 포켓몬을 누르면 오른쪽에 그 포켓몬의 설정이 나옵니다. 화면은 **Cobblemon Editor 0.2.9 · DRM 0.3.1 · Cobblemon 1.8.4 / NeoForge 1.21.1**의 영문 UI입니다.

![이상해씨 레벨 5를 선택한 파티 편집 화면. 오른쪽 Basic에 종·레벨·폼·성별·특성·지닌 도구가 보입니다.](assets/media/guides/cobble-029-neo1211/cobble-party.png "왼쪽은 큰 분류, 가운데는 현재 라운드의 파티와 모델, 오른쪽은 선택한 포켓몬의 설정입니다.")

1. **Add**로 파티에 한 마리를 추가합니다. Trainer는 라운드당 최대 6마리, Pokemon Itself는 한 마리를 사용합니다.
2. 오른쪽 **Basic → Pokemon**의 종 이름을 눌러 원하는 포켓몬을 찾습니다. 예제에서는 **Bulbasaur**입니다.
3. **Level**을 정합니다. **Form / Aspects**는 그 종이 지원하는 모습, **Nature / Ability**는 성격과 특성입니다.
4. **Held Item**에서 지닌 도구를 고릅니다. 회복약처럼 트레이너가 배틀 중 사용하는 아이템은 아래의 **Battle Item Inventory**에서 별도로 정합니다.
5. **Save As**로 내 파일을 저장한 뒤 NPC에 적용합니다. 처음 연결하는 순서는 [첫 배틀](#drm-cobblemon-editor/cobblemon-editor-setup)에 있습니다.

![Bulbasaur 버튼으로 연 포켓몬 종 선택 창. 검색과 Filters, 목록, 페이지 이동이 있습니다.](assets/media/guides/cobble-029-neo1211/cobble-pokemon-picker.png "종 ID를 외울 필요 없이 이름을 검색하거나 Filters로 목록을 좁혀 고릅니다.")

## 능력치와 기술 정하기

**Stats**는 현재 레벨에서 계산한 능력치를 보여 줍니다. **Edit IV / EV**에서 개체값과 노력치를 바꿉니다. 화면처럼 성격이나 IV가 Random이면 하나의 확정 수치 대신 가능한 범위가 나옵니다.

![레벨 5 이상해씨의 Stats. HP 19~21과 IV Random, EV 0/510이 표시됩니다.](assets/media/guides/cobble-029-neo1211/cobble-stats.png "이 수치는 현재 작성한 레벨 기준입니다. 배틀의 레벨 보정이나 별도 규칙이 있으면 실제 배틀 수치는 달라질 수 있습니다.")

| 설정 | 범위 |
| --- | --- |
| 레벨 | 1~100 |
| 기술 | 최대 4개 |
| IV | 능력치마다 0~31 |
| EV | 능력치마다 0~252, 전체 합계 510 이하 |

**Moves**의 각 슬롯 옆 찾기 버튼으로 기술을 고릅니다. 이미 넣은 기술은 드래그해 순서를 바꿉니다. 빈 슬롯은 기존 기술 구성 규칙을 사용하므로, 예제처럼 네 칸이 None인 화면을 ‘기술을 하나도 못 쓰는 포켓몬’으로 해석하지 마세요.

![Moves 탭의 네 기술 슬롯과 각 슬롯의 선택 버튼.](assets/media/guides/cobble-029-neo1211/cobble-moves.png "특정 기술 조합을 쓰게 하려면 이 탭에서 직접 지정합니다. 목록에서는 해당 포켓몬의 습득 기술을 먼저 찾을 수 있습니다.")

여러 마리를 조건에 맞춰 만들려면 **Generate Party**를 사용합니다. AI·자동 편성·기믹을 더 조절하려면 [전투 두뇌와 파티 설정](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items)으로 이어가세요.

## 배틀 시작 방식·라운드·대화 연결하기

왼쪽 **Battle Config**를 누르면 배틀 전체 설정으로 전환합니다.

![Battle Config의 General. Trainer Battle, Battle type, Name source와 Battle presentation이 보입니다.](assets/media/guides/cobble-029-neo1211/cobble-config.png "General은 이름과 배틀 유형, Encounter는 시작 방식, Rounds는 라운드, Dialogue는 배틀 전 대화, After Actions는 결과 뒤 동작입니다.")

1. **General**에서 **Trainer Battle**을 켜고 **Battle type**을 정합니다. 이름은 **Name source → Trainer Profile**이면 여기에 쓴 **Trainer Name**, **Applied NPC Name**이면 적용한 NPC 이름을 씁니다.
2. **Encounter**에서 클릭으로 시작할지, 근처 플레이어를 발견하면 시작할지 정합니다. [조우·재대전](#drm-cobblemon-editor/cobblemon-encounters-rematches)에서 조건과 대기 시간을 확인합니다.
3. **Rounds**에서 **Add / Duplicate**로 최대 16라운드를 구성합니다. 라운드마다 파티·규칙·조건·대화·보상을 다르게 정할 수 있습니다. 순서를 바꾸면 기존 플레이어 진행 기록도 그 순서를 사용하므로 운영 중에는 확인이 필요합니다. 다시 Apply하는 것만으로 승리 기록이 지워지지는 않습니다.
4. **Dialogue**에 현재 라운드의 대화를 연결합니다. ‘배틀하자’ 선택지에 **go_battle**을 넣습니다. 대화를 비우면 일반 배틀 확인 화면을 사용합니다.
5. 등장 장면은 **General → Battle presentation**, 싱글·더블과 레벨 보정은 [배틀 규칙](#drm-cobblemon-editor/cobblemon-battle-rules)에서 정합니다.

![현재 라운드의 배틀 규칙·AI·기믹·재대전 설정.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "Rounds의 실제 추가·복사 버튼은 Add / Duplicate입니다. 오른쪽 AI skill의 현재 값 버튼을 누르면 전략 설정을 엽니다.")

## 대화를 마친 뒤 보상 주기

**Battle Config → After Actions**에서 **Action Mode → Sequential**을 고릅니다. 대화 액션을 먼저 넣고 아이템·화폐 보상은 그 아래에 둡니다. 승리·패배·도주 중 실행할 결과도 정합니다.

순차 실행은 대화를 마쳐야 다음 보상으로 넘어갑니다. 대화 취소나 접속 종료로 멈췄다면 다시 NPC와 상호작용해 남은 액션을 이어갑니다. 라운드당 대화 액션은 한 개이며, 예전 파일에 여러 개가 있다면 하나로 정리해야 저장·적용할 수 있습니다.

**General Item Inventory**는 메가 키처럼 소지 여부를 확인하는 아이템을 넣는 곳입니다. 배틀 중 소비하는 **Battle Item Inventory**와 구분합니다. 플레이어 인벤토리에서 복사해 넣은 아이템은 플레이어에게서 차감되지 않습니다.
