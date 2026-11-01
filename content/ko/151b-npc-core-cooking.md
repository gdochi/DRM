---
title: 음식 만들고 보관함에 넣기
slug: npc-core-cooking
order: 1514
description: 조리법·재료 보관함·작업 장치를 연결해 요리사를 만듭니다.
product: dochi-npc-core
category: 작업
section: editor
status: 사용 안내
version: 0.1.3
audience: NPC 제작자
---

## 조리 작업 준비하기

1. NPC가 걸어갈 수 있는 곳에 조리 장치와 재료·완성품 보관함을 놓습니다.
2. NPC 편집기의 **Schedule → Add time**으로 시간대를 만들고, 그 행의 **+**를 누릅니다. 행동 목록에서 **Cooking**을 검색해 고릅니다. **Gathering and production** 분류에서도 찾을 수 있습니다.
3. 오른쪽 **Food to cook** 옆 찾기 버튼으로 만들 음식을 고릅니다. 조리법을 고르기 전에는 재료를 가져오지 않습니다.
4. **Ingredient source / Cooking block / Output**으로 재료 보관함·작업 장치·완성품 보관함을 지정합니다. 아래쪽 설정은 Inspector를 스크롤해 찾습니다.
5. 재료·필요한 도구·연료를 준비하고 **Batch / Repeat**를 정합니다.
6. **Enable schedule**을 켜고 **Save to NPC**로 실제 NPC에 저장합니다. 현재 게임 시간이 설정한 시간대에 들어가는지도 확인합니다.

![Schedule에 Cooking을 추가하고 Food to cook·Ingredient source를 설정하는 화면.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking.png "DNPC 0.1.3 / Farmer’s Delight 1.3.4 / NeoForge 1.21.1. 이 준비 화면은 음식·장치가 미지정이고 Enable schedule도 OFF입니다. 필요한 위치를 지정하고 시간표를 켠 뒤 저장합니다.")

**Repeat**를 켜면 계속 만들고, 끄면 한 배치를 만들어 납품한 뒤 기다립니다.

## 음식 선택 창에서 확인할 것

찾기 버튼을 누른 뒤 음식 이름이나 아이템 ID로 검색하고, 왼쪽에서 조리법 한 행을 고릅니다. 같은 스테이크라도 화로·훈연기 등 만드는 장치가 다르면 별도 행입니다. 오른쪽 **Cooking block / Recipe cooking time / Ingredients for one recipe batch**를 읽고 준비할 장치와 재료를 정하세요.

![스테이크의 화로 조리법을 선택해 생소고기 1개와 조리 시간 200틱이 표시된 화면.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking-beef.png "DNPC 0.1.3 / NeoForge 1.21.1. 검색어는 minecraft:cooked_beef입니다. 선택한 행은 Furnace, 200 ticks, Raw Beef ×1입니다. 아래 Apply는 이 선택을 편집 중 초안에 반영하며, 마지막 Save to NPC는 별도로 누릅니다.")

## 어떤 장치를 쓸 수 있나요?

| 장치 | NPC가 하는 일 |
| --- | --- |
| 화로·훈연기 | 재료와 연료를 넣고 완성품을 꺼냄 |
| Farmer’s Delight 도마 | 필요한 도구로 재료를 손질 |
| Farmer’s Pizzeria | 반죽 밀기·토핑·생피자 회수 |
| French Delight 치즈틀 | 재료 넣기·숙성 기다리기·치즈 회수 |
| 지원 바스켓·캐비닛 | 재료와 중간재·완성품을 옮김 |

추가 장치는 해당 모드를 설치해야 목록에서 사용할 수 있습니다. 위 조리 애드온을 함께 사용하는 안내는 **NeoForge 1.21.1** 기준입니다. 다른 로더의 조리법은 설치한 장치와 목록에 표시되는 항목을 기준으로 선택하세요. 26.3용 조리 안내는 제공하지 않습니다.

## 재료는 있는데 시작하지 않아요

- NPC에게 필요한 **도구**도 준비했는지 확인합니다. 도구는 조리 재료와 별도입니다.
- 재료 보관함과 작업 장치를 올바르게 지정했는지 확인합니다.
- 장치까지 가는 길이나 서서 일할 자리가 막혀 있지 않은지 봅니다.
- 화로·훈연기는 **연료**가 필요합니다.
- 조리가 끝났어도 납품할 보관함이 가득 차면 회수가 늦어질 수 있습니다.

치즈틀은 숙성에 1,200틱, 정상 속도로 약 1분이 걸립니다. 작업 도중 잠시 말을 걸었다면 장치 안의 음식이 끝날 때까지 기다린 뒤 이어서 회수합니다.

일하는 시간은 [시간표](#dochi-npc-core/npc-core-schedules)에서 정합니다.
