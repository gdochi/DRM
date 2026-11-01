---
title: 포켓몬 판매점·교환소 만들기
slug: cobblemon-pokemart
order: 540
description: 포켓몬을 판매·교환·경매하는 NPC를 만듭니다.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 포켓몬 상점 제작자와 서버 운영자
tags:
  - pokemart
  - editor
  - runtime
---

## 역할부터 고르기

**PokéMart Editor**는 포켓몬을 거래하는 NPC를 만듭니다. 일반 아이템 상점은 DRM의 **NPC Shop**을 사용합니다.

| Role | 플레이어가 하는 일 |
| --- | --- |
| **Sales** | 정해진 가격에 포켓몬 구매 |
| **Trade** | 조건에 맞는 내 포켓몬과 교환 |
| **Auction** | 포켓몬 등록·입찰·정산 |

한 NPC는 한 역할을 사용합니다. 판매점과 교환소를 함께 만들려면 NPC를 따로 배치합니다.

## 첫 판매점 만들기

1. DRM 에디터 목록의 **Add-on → PokéMart Editor**를 엽니다.
2. 기본 예제를 불러오고 **Role → Sales**를 고릅니다.
3. **General**에서 상점 이름과 결제 수단을 정합니다.
4. 포켓몬 상품을 추가하고 **상세 포켓몬 데이터 편집**에서 종·레벨·폼 등을 고릅니다.
5. 가격과 **Initial Stock**을 정합니다. **-1**은 무제한 재고입니다.
6. **Save As**로 내 파일을 저장합니다.
7. DRM 코어로 DNPC 또는 CustomNPCs NPC를 열고 **PokéMart**로 적용합니다.
8. 양손을 비우고 NPC와 거래합니다. 구매자는 파티에 빈칸이 필요합니다.

## 돈은 무엇으로 받나요?

**Currency Provider / ID**에서 DRM 화폐, 아이템 또는 CobbleDollars를 고릅니다. DRM 화폐는 Currency Editor에서 먼저 만들고, CobbleDollars는 그 모드가 설치되어 있어야 합니다.

교환 역할은 돈 대신 조건에 맞는 포켓몬을 받습니다. [판매와 교환 상세](#drm-cobblemon-editor/pokemart-sales-trade-behavior)를 참고하세요.

## 화면 모양 바꾸기

**Runtime GUI**에서 플레이어에게 보여 줄 GUI 파일을 연결합니다. 에디터의 상품 입력칸과 플레이어 상점창의 배치는 별도입니다.

경매는 [등록·입찰·수령](#drm-cobblemon-editor/pokemart-auction-gui-runtime)에서 설명합니다.

## 바꾼 내용을 반영하기

같은 파일에 상품·가격을 **Save**하면 다음 이용 때 반영됩니다. 파일 이름이나 역할을 바꾸면 NPC에 다시 **Apply**합니다.

재고·경매·수령함은 월드에 남습니다. 서버를 옮길 때는 설정과 월드를 함께 가져갑니다. **해제**는 NPC의 상점 연결만 없애며 이미 진행 중인 경매를 지우지는 않습니다.
