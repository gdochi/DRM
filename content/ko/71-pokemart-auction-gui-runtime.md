---
title: Auction 에스크로·정산과 Runtime GUI
slug: pokemart-auction-gui-runtime
order: 542
description: 경매 등록·입찰·즉시 구매·취소·만료·수령 처리와 PokéMart GUI Maker 구성 요소를 설명합니다.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: 0.1.0
audience: 경매장과 사용자 PokéMart 화면을 운영하는 제작자
tags:
  - auction
  - escrow
  - gui-maker
---

## Auction Policy 범위

| 설정 | 범위 | 실제 동작 |
| --- | ---: | --- |
| House ID | 최대 64자 토큰 | 같은 ID를 가진 Auction NPC가 활성 매물과 정산 범위를 공유합니다. |
| Max Listings | 1–64 | 같은 House ID에서 플레이어 한 명이 동시에 올릴 수 있는 매물 수 |
| Maximum Duration | 5–10,080분 | 플레이어가 선택할 수 있는 등록 기간의 상한 |
| Listing Fee | 0 이상의 정수 | 등록 시 먼저 차감. 포켓몬 에스크로 이동이 실패하면 환불 시도 |
| Sale Tax | 0–100% | 판매 완료 금액에서 차감하고 판매자 정산액을 계산 |
| Minimum Bid Increment | 최소 1 | 현재 입찰가 다음에 요구되는 증가액 |
| Allow Buyout | On/Off | 즉시 구매 가격 입력과 실행 허용 |
| Allow Shiny / Legendary | On/Off | 해당 포켓몬의 등록 허용 여부 |

House ID가 다르면 같은 통화를 쓰더라도 별도 경매장입니다. 여러 마을 NPC가 하나의 글로벌 경매를 보여야 한다면 같은 House ID와 호환되는 통화 설정을 사용하세요.

## 등록과 에스크로

플레이어가 `옥션 등록`에서 포켓몬, 시작 입찰가, 선택형 즉시 구매가, 기간을 정하면 서버는 다음을 검사합니다.

- 시작 입찰가는 0보다 커야 함
- 즉시 구매가가 있으면 시작 입찰가 이상이어야 함
- 플레이어별 등록 제한 미만이어야 함
- 해당 포켓몬을 현재 소유하고 거래할 수 있어야 함
- Shiny/Legendary 정책을 통과해야 함
- Listing Fee를 결제할 수 있어야 함

검사를 통과하면 서버가 수수료를 차감하고 포켓몬 전체 NBT를 플레이어 저장소에서 제거해 월드 PersistentState 에스크로에 넣습니다. 포켓몬 제거가 실패하면 수수료를 환불하고 매물을 만들지 않습니다.

## 입찰과 즉시 구매

자기 매물에는 입찰할 수 없습니다. 런타임이 보낸 매물 Revision이 서버 최신 값과 다르면 오래된 가격으로 처리하지 않고 새로고침을 요구합니다.

- 새 입찰자는 입찰액 전부를 에스크로 결제합니다.
- 현재 최고 입찰자가 다시 올리면 기존 입찰액과 새 입찰액의 차액만 차감합니다.
- 다른 플레이어가 상위 입찰하면 이전 최고 입찰액은 즉시 인벤토리로 넣는 대신 Money Claim에 기록됩니다.
- 입찰액이 즉시 구매가 이상이면 Buyout으로 정산됩니다.
- 판매 완료 시 구매자는 Pokémon Claim, 판매자는 세금을 뺀 Money Claim을 받습니다.

Claim 방식은 오프라인 플레이어와 가득 찬 파티/PC, 사용할 수 없는 통화 상황에서도 데이터를 서버에 남기기 위한 안전장치입니다.

## 취소와 만료

판매자만 매물을 취소할 수 있고, 최고 입찰자가 생긴 매물은 취소할 수 없습니다. 입찰이 없는 매물 취소는 포켓몬을 즉시 파티 또는 PC로 돌려보내는 데 성공해야 완료됩니다. 공간 부족으로 반환하지 못하면 매물을 유지합니다.

서버는 약 20틱마다 만료 매물을 정산합니다.

- 입찰자 없음: 판매자 Pokémon Claim으로 반환
- 입찰자 있음: 최고 입찰자 Pokémon Claim과 판매자 Money Claim 생성
- 판매 대금: `낙찰가 - (낙찰가 × Sale Tax ÷ 100)`

`정산/수령함`의 `모두 수령`은 지급에 성공한 항목만 서버 Claim에서 제거합니다. 통화 공급자를 사용할 수 없거나 포켓몬 전달 공간이 없으면 항목이 남으므로 나중에 다시 시도할 수 있습니다.

## PokéMart Runtime GUI 구성 요소

PokéMart GUI 타입의 논리 Stage는 800×450입니다. GUI Maker 팔레트의 구성 요소는 런타임 데이터와 다음처럼 연결됩니다.

| Component | 런타임 기능 | 주요 Inspector 값 |
| --- | --- | --- |
| `Header and Balance` | Display Name, 잔액, 통화 오류 | 제목·잔액·경고 색상 |
| `Toolbar` | 새로고침, 닫기 | 버튼 채움·테두리·글자 색 |
| `Mode Tabs` | 역할에 맞는 탭 전환 | 탭 간격, 활성/비활성 색 |
| `Search` | 현재 상품·교환·매물 목록 필터 | Placeholder 번역 키 |
| `Catalog` | 스크롤 가능한 행 목록 | 행 높이/간격, 선택 색, 스크롤바 |
| `Pokemon Preview` | 선택한 포켓몬 3D 모델 | Model Scale, Level/Shiny 표시 |
| `Pokemon Details` | 종, 설명, 가격, 재고, 입찰 정보 | 기본·보조·강조 글자 색 |
| `Action Area` | 구매, 교환, 입찰, 등록, 취소, 수령 | 컨트롤 간격과 버튼 색 |

Header, Toolbar, Tabs, Search, Catalog, Preview, Details, Action은 Singleton 구성 요소입니다. 핵심 구성 요소를 삭제하면 해당 런타임 정보나 버튼을 배치할 곳이 없어 기능을 사용할 수 없게 됩니다.

## 역할별 런타임 탭

| Role | 표시 탭 |
| --- | --- |
| Sales | 포켓몬 상점 |
| Trade | 포켓몬 교환 |
| Auction | 경매, 옥션 등록, 정산/수령함 |

GUI JSON이 없거나 `guiType`이 `cobble_npc:pokemart`가 아니거나 요소 구조가 잘못되면 서버는 해당 역할의 애드온 기본 레이아웃으로 폴백합니다. 경로가 정상인데 일부 영역만 사라진 경우에는 JSON 전체 실패보다 해당 Component 누락이나 크기 0에 가까운 배치를 먼저 확인하세요.

## 경매 운영 테스트

1. 플레이어 A가 매물을 등록하고 수수료와 파티 제거를 확인합니다.
2. 플레이어 B가 입찰한 뒤 A가 취소할 수 없는지 확인합니다.
3. 플레이어 C가 상위 입찰하고 B의 환불이 Claim에 들어오는지 확인합니다.
4. Buyout 뒤 구매자 포켓몬과 판매자 세후 금액을 수령합니다.
5. 입찰 없는 만료와 입찰 있는 만료를 각각 시험합니다.
6. 서버 재시작 후 매물, 입찰금, 포켓몬, Claim이 유지되는지 확인합니다.
7. 통화 모드를 잠시 사용할 수 없는 상황에서도 Claim이 삭제되지 않는지 확인합니다.
