---
title: 트레이너 승리 퀘스트
slug: cobblemon-trainer-quests
order: 568
description: 트레이너 승리 퀘스트
product: drm-cobblemon-editor
category: 트레이너 승리 퀘스트
section: trainer
status: Draft
version: Fabric / NeoForge 0.2.9
audience: Creators
---

## 준비

현재 확인한 환경은 Cobblemon Editor **0.2.9 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**입니다. 애드온이 DRM 퀘스트에 **Trainer Victory** 목표를 추가합니다. 먼저 트레이너에 읽기 쉬운 ID를 정하고 퀘스트에도 같은 ID를 연결합니다.

## 트레이너 ID 연결

1. Cobblemon Editor에서 전투 유형을 `Trainer`로 선택합니다.
2. **Battle Config → General → Set ID**를 엽니다. 화면의 필드 이름은 **NPC ID**입니다.
3. `gym_brock`처럼 알아보기 쉬운 ID를 입력하고 `Use ID`를 누릅니다. 기존 ID이면 재사용하고, 없는 ID이면 생성해 바로 연결합니다.
4. 문서를 저장하고 전투 NPC에 적용합니다.

ID는 앞뒤 공백을 제거하고 소문자로 정리됩니다. 영문 소문자·숫자로 시작하며 영문 소문자, 숫자, `_`, `.`, `-`를 사용할 수 있고 최대 64자입니다. NPC 이름이나 JSON 파일 이름은 트레이너 ID를 대신하지 않습니다.

ID 설정 목록에는 현재 불러온 퀘스트의 트레이너 승리 목표가 표시됩니다. 검색해서 기존 퀘스트의 트레이너 ID를 선택할 수도 있습니다. 퀘스트를 먼저 설계했다면 이 목록에서 연결하세요. 월드에 NPC를 먼저 배치할 필요는 없습니다.

![NPC ID를 gym_guide로 입력한 실제 선택창.](assets/media/guides/cobble-029-neo1211/cobble-trainer-id-entry.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. 위 NPC ID와 Use ID로 연결합니다. 아래 Search quests는 기존 퀘스트에서 ID를 가져오는 목록이며, 이 실행에는 일치하는 퀘스트가 없습니다. ID 연결 화면 확인과 실제 승리 횟수 집계 검증은 별도입니다.")

## 퀘스트 목표 만들기

1. DRM Quest Editor에서 퀘스트와 목표를 만듭니다.
2. 목표 유형을 `Trainer Victory`로 고릅니다.
3. 전투 문서와 같은 트레이너 ID를 연결하고 필요한 승리 횟수를 지정합니다.
4. 퀘스트를 저장한 뒤 플레이어의 퀘스트가 진행 중인 상태에서 실제 전투를 시험합니다. 첫 진행으로 시작하는 퀘스트는 해당 시작 정책을 따릅니다.

예를 들어 필요 횟수가 3이면 연결한 트레이너와의 서로 다른 전투에서 세 번 승리해야 합니다. 여러 NPC에 같은 트레이너 ID를 연결하면 같은 목표로 집계됩니다. NPC별로 따로 집계하려면 서로 다른 ID를 사용하세요.

## 집계되는 전투

DRM Trainer 전투에서 확정된 플레이어 승리만 셉니다. 패배·도주·취소, Pokemon Itself 전투, 외부 RCT 트레이너 전투는 집계하지 않습니다. 예전 승리 기록을 소급해서 가져오지 않으며, 같은 전투 결과를 다시 받아도 중복 집계하지 않습니다. 전투를 시작할 때의 트레이너 ID가 기준입니다.

현재 두 로더의 DRM Quest Editor에서 만든 퀘스트는 자동 완료를 사용합니다. 필요한 승리 횟수를 채워도 다른 목표가 남아 있으면 퀘스트 전체는 완료되지 않습니다. 기존 제출 방식 JSON의 이관은 [데이터 이동 안내](#core-fabric/loader-compatibility)를 확인하세요.

## 저장과 백업

내부 목표 유형은 `cobble_npc:trainer_victory`이고 문서는 안정적인 `trainerKey`로 연결됩니다. 사람이 읽는 ID만 JSON에 임의로 끼워 넣지 말고 에디터에서 연결하세요.

제작 데이터 루트는 `config/dochi_rpg_maker`입니다. 트레이너 문서, 퀘스트 팩, `cobblemon/trainer_registry.json`, `cobblemon/trainer_registry.initialized`를 함께 백업하고 플레이어 진행도가 있는 월드도 보관하세요.
