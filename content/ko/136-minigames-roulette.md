---
title: 아이템 룰렛 만들기
slug: minigames-roulette
order: 1315
description: 경품과 확률을 정하고 룰렛 기계나 게임 화면에서 한 번씩 추첨합니다.
product: dochi-minigames
category: 게임 제작
section: rules
status: 사용 안내
version: 0.1.6
audience: 플레이어 / 게임 제작자
---

## 한 번 돌려 경품 하나 받기

아이템 룰렛은 **Minigames 0.1.6**에 추가된 게임입니다. DRM 없이도 플레이할 수 있습니다. 룰렛 기계에 저장한 게임을 연결하고 우클릭하면 시작합니다.

**현재 기본 프리셋은 Spin on block**입니다. 우클릭하면 창 없이 기계가 바로 회전합니다. 참가 화면에서 경품과 확률을 보고 시작하게 하려면 **Rules → Play mode → Game screen**으로 바꾸고 저장·적용합니다. 기존에 저장한 프로필은 자신의 Play mode를 확인하세요.

![월드에 놓인 룰렛 기계.](assets/media/guides/minigames-016-neo1211/roulette-native-world-stopped.png "Minigames 0.1.6 / NeoForge 1.21.1. 가운데가 Roulette Machine입니다. 왼쪽 두더지 게임과 오른쪽 슬롯은 별도 기계입니다. 프로젝트의 실제 클라이언트 검증에서 촬영한 원본입니다.")

**Game screen** 방식에서는 참가 화면의 경품·수량·확률과 참가비를 보고 **Spin**을 누릅니다. 화살표가 가리킨 경품 하나를 받으며, **Hide prizes & odds / Show prizes & odds**로 오른쪽 목록을 숨기거나 펼칩니다.

![유료 룰렛의 Spin 전 참가 화면.](assets/media/guides/minigames-016-neo1211/roulette-native-entry.png "Minigames 0.1.6 / NeoForge 1.21.1. 이 유료 예제의 참가비는 에메랄드 1개이고 경품 8칸은 각각 12.5%입니다. 기본 roulette 프리셋의 참가비는 0이므로 자신의 설정을 확인하세요.")

**Play again**은 다음 추첨을 바로 시작합니다. 유료 게임이면 다음 참가비도 내므로 결과만 다시 보는 버튼으로 사용하지 않습니다.

## 기계 만들고 게임 연결하기

룰렛 기계는 제작대에서 만듭니다. 첫 줄은 **금 주괴 / 시계 / 금 주괴**, 둘째 줄은 **막대기 / 레드스톤 가루 / 막대기**, 셋째 줄은 **판자 세 개**입니다. 판자 종류는 섞어도 됩니다.

1. 기계 위 한 칸을 비우고 배치합니다.
2. 제작자는 `/minigame editor`에서 **Item Roulette**를 고릅니다.
3. 아래 설정을 마친 뒤 **Save As**로 `village_roulette`처럼 자신의 게임 이름을 정합니다.
4. 기계를 **빈손 Shift+우클릭**해 프로필을 고르고 테이블에 적용합니다. 설정에는 OP 2 이상이 필요합니다.
5. 일반 우클릭으로 플레이합니다. 일반 Minigame Table을 쓰는 방법은 [테이블 안내](#dochi-minigames/minigames-tables)에 있습니다.

## 경품과 확률 바꾸기

**Prize slots**에서 경품 행을 고릅니다. 오른쪽 **Reward ID** 옆 찾기 버튼으로 아이템을 선택하고 **Count**로 당첨 수량을 정합니다. 인벤토리의 이름·데이터가 있는 아이템을 선택할 수도 있으며 선택에 사용한 아이템을 소비하지 않습니다.

![경품을 고르고 아이템·수량·가중치를 편집하는 화면.](assets/media/guides/minigames-016-neo1211/roulette-editor-prizes.png "Minigames 0.1.6 / NeoForge 1.21.1. 파란 Diamond 행이 편집 대상입니다. 행 왼쪽 체크는 여러 경품 삭제용이며 편집 선택과 다릅니다. 오른쪽 Chance가 실제 적용될 확률입니다.")

**Rules → Weighted chances**를 끄면 모든 경품 칸의 확률이 같습니다. 켜면 각 경품의 **Weight** 비율을 사용합니다. 두 칸의 가중치가 1과 3이면 각각 25%와 75%입니다. 수량은 확률을 바꾸지 않습니다. 기계의 칸 크기도 실제 확률을 따릅니다.

**Spin time (seconds)**는 3~8초입니다. **General**에서 참가비 아이템과 수량을 정하며 `0`은 무료입니다. 룰렛 참가비는 현재 실물 아이템을 사용합니다. 점수 게임의 highest·cumulative 보상 정책 대신 Prize slots에서 고른 경품 하나를 지급합니다.

![룰렛의 화면 방식·회전 시간·가중치 스위치.](assets/media/guides/minigames-016-final-neo1211/roulette-editor-rules.png "11월 1일 15:40 교체된 Minigames 0.1.6 / NeoForge 1.21.1 배포본의 실제 화면입니다. 기본 Spin on block, 5초, Weighted chances OFF이며 여덟 경품은 각각 12.5%입니다. 위 참가 화면은 Game screen을 선택한 별도 예제입니다.")

## 화면 없이 기계만 돌리기

**Rules → Play mode → Spin on block**을 고르면 일반 우클릭으로 기계가 바로 회전하며 게임 창을 열지 않습니다. 유료라면 이 조작에서 참가비를 냅니다. 이미 회전 중인 기계를 다시 누른다고 중복 결제하지 않습니다.

**Game screen**은 큰 룰렛 화면을 여는 방식입니다. 저장한 프로필의 Play mode를 바꾸고 기계에 적용한 뒤 실제 우클릭 결과를 확인합니다.

Spin on block은 GUI 레이아웃 파일이 없어도 시작합니다. 26.3 빌드에는 기계가 멈출 때 경품 입자·사운드가 추가됐으며, 위 1.21.1 사진으로 그 효과까지 확인한 것은 아닙니다.

## 창을 닫았거나 인벤토리가 가득 찼을 때

이미 시작한 룰렛은 창을 닫거나 멀리 가도 취소되지 않습니다. 추첨 결과와 경품 지급을 서버가 보관합니다. 인벤토리가 가득 차면 경품을 보류하고 새 유료 추첨을 막습니다. 빈칸을 만든 뒤 보관된 경품을 받은 것을 확인하고 다시 시작하세요.

이 동작은 몬티홀·슬롯 같은 기존 점수 게임의 중도 포기와 다릅니다. 경품 설정을 보관하는 Save As와 기계에 연결하는 작업도 별도이므로 [파일·GUI 안내](#dochi-minigames/minigames-files-gui)를 함께 확인하세요.
