---
title: 대화창·상점창 꾸미기
slug: gui-system
order: 100
description: GUI Maker에서 기본 화면을 복사해 글자·그림·버튼을 배치합니다.
product: core-fabric
category: GUI Maker
section: gui-maker
status: 안정
version: 0.3.1
audience: GUI 제작자
tags:
  - gui
  - layout
---

## 기본 화면을 내 스타일로 바꾸기

1. 코어를 들고 허공을 우클릭해 **GUI Maker**를 엽니다.
2. 꾸밀 화면 종류를 고르고 기본 예제를 불러옵니다. 대화는 **dialogue**, 상점은 **npc_shop**입니다.
3. 캔버스에서 요소를 클릭해 선택하고 위치·크기·색상을 바꿉니다.
4. **Save As**로 내 화면을 저장합니다.
5. Dialogue Editor나 NPC Shop의 GUI 설정에서 방금 저장한 파일을 고릅니다.
6. NPC와 상호작용해 플레이어가 보는 화면을 확인합니다.

GUI Maker의 예시 상품이나 대사는 배치를 돕는 미리보기입니다. 실제 대사는 Dialogue Editor, 상품·가격은 NPC Shop에서 정합니다.

## 어떤 요소를 넣으면 되나요?

| 화면에 넣을 것 | 요소 |
| --- | --- |
| NPC 대사 | **Dialog** |
| 플레이어 선택지 | **Choice** |
| 직접 쓴 문장이나 NPC 이름 | **Text** |
| 배경이나 구획 | **Panel** |
| 로고·장식 그림 | **Image** |
| NPC 모습 | **Entity** |
| 상점 상품 목록 | **Item Slot** |
| 상점의 구매·판매 버튼 | **Shop Action Button** |
| 돈 표시 | **Currency Display** |

상점의 거래 버튼·상품 목록처럼 기능이 있는 요소는 해당 화면 종류에서 사용합니다.

## NPC 이름과 안내 문구 추가하기

대화 화면에 **Text**를 추가하고 **Content / 표시 내용**을 고릅니다.

- **Direct input / 직접 입력:** ‘대장간’처럼 늘 보여 줄 문구를 입력합니다.
- **NPC name / NPC 이름:** 현재 대화 중인 NPC의 이름을 보여 줍니다.

상자는 여러 개 넣을 수 있습니다. 하나는 이름, 다른 하나는 안내 문구로 쓰고 각각 위치·크기·배경·테두리를 정하세요.

## 그림을 반복하거나 늘이기

이미지 요소를 고르고 **Fit**을 설정합니다. **Stretch**는 영역에 맞게 늘이고, **Contain**은 그림 비율을 지키며 맞추고, **Tile**은 반복합니다.

Tile을 고르면 **Tile W % / H %**로 반복되는 그림 한 장의 크기를 정합니다. 기본 100%, 범위 10~800%이며 가로·세로를 따로 바꿉니다. 그림 전체가 차지하는 영역은 요소의 가로·세로 크기로 정합니다.

**Default UI Settings**의 **Sprite Scale %**는 패널·버튼 무늬 크기입니다. 기본 100%, 범위 50~400%이며 제작 에디터의 도구 크기를 바꾸지는 않습니다.

## 저장했는데 화면이 그대로라면

저장한 GUI가 대화나 상점의 GUI 설정에 연결되어 있는지 확인하세요. 파일을 저장하기만 해서는 기존 화면이 바뀌지 않습니다.

파일 위치는 `config/dochi_rpg_maker/gui/`입니다. 파일을 직접 수정할 때는 [JSON 참고](#core-fabric/json-reference)를 사용하세요.
