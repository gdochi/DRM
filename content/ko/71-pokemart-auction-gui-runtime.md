---
title: 경매와 GUI
slug: pokemart-auction-gui-runtime
order: 542
description: 경매장 NPC를 만들고 등록·입찰·수령과 플레이어 화면을 설정합니다.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 경매장과 사용자 PokéMart 화면을 운영하는 제작자
tags:
  - auction
  - escrow
  - gui-maker
---

## 경매장 NPC 만들기

[PokéMart Editor](#drm-cobblemon-editor/cobblemon-pokemart)의 **General → NPC Role → Auction**을 고르고 결제 수단을 정합니다. 왼쪽 **Auction**에서 경매장 이름표인 **Auction House ID**, 등록 수수료와 세율을 입력합니다. **Save As**로 내 파일을 저장한 뒤 경매장 NPC에 적용합니다.

![Auction 설정의 경매장 ID, 등록 제한, 수수료와 세율.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-auction.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1의 제작자 화면. 예제는 House ID default, 1인 등록 5개, 최대 1440분, 수수료 500, 판매세 5%, 최소 입찰 증가액 100입니다. 실제 매물 등록이나 낙찰 결과를 보여 주는 화면은 아닙니다.")

여러 마을에서 같은 매물을 보여 주려면 **같은 House ID와 호환되는 통화 설정**을 사용합니다. House ID가 다르면 같은 통화를 써도 별도 경매장입니다.

## 플레이어의 등록·입찰·수령

1. **옥션 등록**에서 맡길 포켓몬과 시작 입찰가를 고릅니다. 현재 기본 화면은 경매장에 설정한 기간을 사용합니다. 즉시 구매를 허용한 경매장이라면 즉시 구매가도 정할 수 있습니다. 등록하면 수수료를 내고 포켓몬을 경매에 맡깁니다.
2. 다른 플레이어는 **경매**에서 매물을 선택하고 입찰하거나 즉시 구매합니다. 자신의 매물에는 입찰할 수 없습니다.
3. 낙찰 뒤 **정산/수령함 → 모두 수령**으로 구매자는 포켓몬을, 판매자는 세금을 뺀 대금을 받습니다. 상위 입찰에 밀린 이전 입찰금도 이 수령함에서 받습니다.

**포켓몬 수령 전에는 활성 파티에 빈칸을 만듭니다.** PC에만 빈칸이 있어도 Pokémon Claim은 남을 수 있습니다. 지급하지 못한 항목은 수령함에 남으므로 공간이나 통화 문제를 해결한 뒤 다시 수령합니다.

![옥션 등록에 해당하는 Auction Listing의 꼬렛 선택과 가격 입력.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-player.png "0.2.9 / NeoForge 1.21.1의 실제 플레이 화면. 이 실습은 에메랄드 결제, 시작가 10, 즉시 구매가 20, 등록 수수료 2입니다. 아래 List Pokémon · Fee 2로 등록합니다.")

![등록된 꼬렛 매물과 수수료를 낸 뒤 잔액 62.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-listed.png "등록 뒤 에메랄드 64→62, 파티에서 꼬렛 제거, 활성 매물 한 개를 확인했습니다. 자기 매물이므로 Bid와 Buyout이 비활성이고 Cancel Listing이 가능합니다.")

![입찰 없이 만료된 꼬렛 한 마리가 기다리는 Settlement Inbox.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-inbox.png "테스트 월드의 게임 시각을 진행시켜 입찰 없는 만료를 확인했습니다. Pokémon waiting: 1에서 Claim All을 눌렀습니다.")

![Claim All 뒤 대기 포켓몬 0과 Auction claims delivered 메시지.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-claimed.png "실제 수령 뒤 서버 파티에 꼬렛이 돌아오고 대기 수가 1→0이 됐습니다. 등록 수수료를 낸 뒤 잔액 62는 유지됐습니다. 다른 플레이어의 입찰·낙찰·판매세 정산은 이 실습에 포함하지 않았습니다.")

## 경매장 설정값 참고

| 설정 | 범위 | 실제 동작 |
| --- | ---: | --- |
| House ID | 최대 64자 토큰 | 같은 ID를 가진 Auction NPC가 활성 매물과 정산 범위를 공유합니다. |
| Max Listings | 1–64 | 같은 House ID에서 플레이어 한 명이 동시에 올릴 수 있는 매물 수 |
| Maximum Duration | 5–10,080분 | 등록 기간 상한. 현재 기본 등록 화면은 이 값을 사용 |
| Listing Fee | 0 이상의 정수 | 등록 시 먼저 차감. 포켓몬 에스크로 이동이 실패하면 환불 시도 |
| Sale Tax | 0–100% | 판매 완료 금액에서 차감하고 판매자 정산액을 계산 |
| Minimum Bid Increment | 최소 1 | 현재 입찰가 다음에 요구되는 증가액 |
| Allow Buyout | On/Off | 즉시 구매 가격 입력과 실행 허용 |
| Allow Shiny / Legendary | On/Off | 해당 포켓몬의 등록 허용 여부 |

매물에는 생성 당시의 House ID, 통화 공급자·ID·Item NBT, 최소 증가액과 세율이 함께 저장됩니다. 운영 중 Auction 문서의 통화나 세율을 바꿔도 이미 만들어진 매물이 전부 새 정책으로 변환되는 구조가 아닙니다. 활성 매물이 있는 House의 경제 설정은 유지하는 편이 안전합니다.

## 등록과 에스크로

플레이어가 `옥션 등록`에서 포켓몬, 시작 입찰가, 선택형 즉시 구매가, 기간을 정하면 서버는 다음을 검사합니다.

- 시작 입찰가는 0보다 커야 함
- 즉시 구매가가 있으면 시작 입찰가 이상이어야 함
- 플레이어별 등록 제한 미만이어야 함
- 해당 포켓몬을 현재 소유하고 거래할 수 있어야 함
- Shiny/Legendary 정책을 통과해야 함
- Listing Fee를 결제할 수 있어야 함

경매를 등록하면 수수료를 내고 포켓몬을 경매에 맡깁니다. 등록에 실패하면 수수료를 돌려주고 매물을 만들지 않습니다.

등록 기간의 허용 범위는 최소 5분부터 Auction Policy의 Maximum Duration까지이며, 현재 기본 등록 화면은 경매장에 설정한 기간을 보냅니다. 매물 종료 시각은 실제 시계가 아니라 서버 월드 틱으로 저장됩니다. 서버가 꺼져 있는 동안의 현실 시간만으로 경매가 만료되지는 않습니다.

등록 가능한 포켓몬은 활성 파티와 PC에서 찾지만 다음 상태는 거부됩니다.

- 플레이어 소유가 아님
- 거래 불가 상태
- 월드에 엔티티로 꺼내져 있음
- 플레이어가 배틀·거래 중이거나 파티 저장소가 바쁨
- 정책에서 Shiny 또는 Legendary를 금지함

## 입찰과 즉시 구매

화면을 연 뒤 다른 사람이 먼저 입찰했다면 다른 탭에 갔다 돌아오거나 창을 다시 열어 바뀐 가격을 확인한 뒤 입찰합니다.

- 새 입찰자는 입찰액 전부를 에스크로 결제합니다.
- 현재 최고 입찰자가 다시 올리면 기존 입찰액과 새 입찰액의 차액만 차감합니다.
- 다른 플레이어가 상위 입찰하면 이전 최고 입찰액은 즉시 인벤토리로 넣는 대신 Money Claim에 기록됩니다.
- 입찰액이 즉시 구매가 이상이면 Buyout으로 정산됩니다.
- 판매 완료 시 구매자는 Pokémon Claim, 판매자는 세금을 뺀 Money Claim을 받습니다.

Claim 방식은 오프라인 플레이어, 활성 파티 공간 부족, 사용할 수 없는 통화 상황에서도 데이터를 서버에 남기기 위한 안전장치입니다.

일반 입찰은 현재 입찰가에 **Minimum Bid Increment**를 더한 최소 금액 이상이어야 합니다.

## 취소와 만료

판매자만 매물을 취소할 수 있고, 최고 입찰자가 생긴 매물은 취소할 수 없습니다. 입찰이 없는 매물 취소는 포켓몬을 즉시 파티 또는 PC로 돌려보내는 데 성공해야 완료됩니다. 공간 부족으로 반환하지 못하면 매물을 유지합니다.

서버는 약 20틱마다 만료 매물을 정산합니다.

- 입찰자 없음: 판매자 Pokémon Claim으로 반환
- 입찰자 있음: 최고 입찰자 Pokémon Claim과 판매자 Money Claim 생성
- 판매 대금: `낙찰가 - (낙찰가 × Sale Tax ÷ 100)`

`정산/수령함`의 `모두 수령`은 지급에 성공한 항목만 서버 Claim에서 제거합니다. 통화 공급자를 사용할 수 없거나 포켓몬 전달 공간이 없으면 항목이 남으므로 나중에 다시 시도할 수 있습니다.

:::warning Pokémon Claim은 활성 파티로 수령합니다
경매 취소는 포켓몬을 활성 파티 또는 PC로 즉시 반환할 수 있지만, 만료·낙찰 뒤 Pokémon Claim의 `모두 수령`은 활성 파티 추가를 사용합니다. 활성 파티가 가득 차면 PC에 빈칸이 있어도 Claim이 남을 수 있으므로 파티 공간을 만든 뒤 다시 수령하세요.
:::

Money Claim은 같은 플레이어와 같은 통화 키의 금액을 합산해 보관합니다. 해당 통화 공급자가 다시 사용 가능해졌을 때 수령에 성공한 Claim만 제거됩니다.

## 경매 데이터 옮기기

등록한 포켓몬·입찰금·수령 대기 내역은 월드에 저장됩니다. 다른 서버로 옮기거나 복구할 때는 월드와 `config/dochi_rpg_maker/`를 함께 보관합니다.

## PokéMart Runtime GUI 구성 요소

상점 기능을 먼저 확인한 뒤 [GUI Maker](#core/gui-system)에서 **PokéMart** 타입의 화면을 편집합니다. 기본 파일을 바꿀 때는 **Save As**로 내 레이아웃을 만들고, PokéMart Editor의 **General → Runtime GUI**에 연결합니다. 상품 편집 화면과 플레이어가 보는 거래창은 별도입니다.

PokéMart GUI 타입의 논리 Stage는 800×450입니다. GUI Maker 팔레트의 구성 요소는 플레이 데이터와 다음처럼 연결됩니다.

| Component | 플레이 기능 | 주요 Inspector 값 |
| --- | --- | --- |
| `Header and Balance` | Display Name, 잔액, 통화 오류 | 제목·잔액·경고 색상 |
| `Toolbar` | 닫기 | 버튼 채움·테두리·글자 색 |
| `Mode Tabs` | 역할에 맞는 탭 전환 | 탭 간격, 활성/비활성 색 |
| `Search` | 현재 상품·교환·매물 목록 필터 | Placeholder 번역 키 |
| `Catalog` | 스크롤 가능한 행 목록 | 행 높이/간격, 선택 색, 스크롤바 |
| `Pokemon Preview` | 선택한 포켓몬 3D 모델 | Model Scale, Level/Shiny 표시 |
| `Pokemon Details` | 종, 설명, 가격, 재고, 입찰 정보 | 기본·보조·강조 글자 색 |
| `Action Area` | 구매, 교환, 입찰, 등록, 취소, 수령 | 컨트롤 간격과 버튼 색 |

Header, Toolbar, Tabs, Search, Catalog, Preview, Details, Action은 Singleton 구성 요소입니다. 핵심 구성 요소를 삭제하면 해당 플레이 정보나 버튼을 배치할 곳이 없어 기능을 사용할 수 없게 됩니다.

GUI Maker의 Canvas는 제작자 미리보기이고 실제 상품·잔액·매물 데이터는 플레이어가 NPC를 열었을 때 서버 데이터로 채워집니다. 0.1.6에서는 활성 매물, 등록 가능한 포켓몬, 판매 목록과 정산 항목을 검색·페이지 단위로 받아 큰 경매장도 필요한 내용만 갱신합니다. 에디터에서 보이는 샘플 문자열과 포켓몬 모델은 배치 확인용입니다.

목록 행, 버튼과 입력 필드는 Runtime Screen이 GUI 구성 요소의 박스 안에 역할별로 생성합니다. Action Area가 너무 작거나 화면 밖에 있으면 서버 기능이 살아 있어도 플레이어가 버튼을 누를 수 없습니다.

## 역할별 플레이 탭

| Role | 표시 탭 |
| --- | --- |
| Sales | 포켓몬 상점 |
| Trade | 포켓몬 교환 |
| Auction | 경매, 옥션 등록, 정산/수령함 |

0.1.6의 기본 PokéMart와 Starter Selector GUI는 DRM Core의 공용 스프라이트 시트를 사용합니다. 수정하지 않은 구형 기본 GUI는 설치 시 새 스타일로 교체되고 원본은 `cobblemon/_migration_backups/`에 보관됩니다. 사용자가 고친 GUI는 자동으로 덮어쓰지 않습니다.

GUI JSON이 없거나 `guiType`이 `cobble_npc:pokemart`가 아니거나 요소 구조가 잘못되면 서버는 해당 역할의 애드온 기본 레이아웃을 사용합니다. 경로가 정상인데 일부 영역만 사라진 경우에는 JSON 전체 실패보다 해당 Component 누락이나 크기 0에 가까운 배치를 먼저 확인하세요.

## 경매 운영 테스트

1. 플레이어 A가 매물을 등록하고 수수료와 파티 제거를 확인합니다.
2. 플레이어 B가 입찰한 뒤 A가 취소할 수 없는지 확인합니다.
3. 플레이어 C가 상위 입찰하고 B의 환불이 Claim에 들어오는지 확인합니다.
4. Buyout 뒤 구매자 포켓몬과 판매자 세후 금액을 수령합니다.
5. 입찰 없는 만료와 입찰 있는 만료를 각각 시험합니다.
6. 서버 재시작 후 매물, 입찰금, 포켓몬, Claim이 유지되는지 확인합니다.
7. 통화 모드를 잠시 사용할 수 없는 상황에서도 Claim이 삭제되지 않는지 확인합니다.
8. 활성 파티를 가득 채운 상태에서 Pokémon Claim이 유지되고 빈칸을 만든 뒤 수령되는지 확인합니다.
9. PC에만 빈칸이 있을 때 Claim이 자동으로 PC로 들어가지 않는지 확인합니다.
10. 월드와 config를 함께 백업한 뒤 테스트 복구에서 매물·재고·Claim을 확인합니다.
