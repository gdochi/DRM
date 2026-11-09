---
title: 판매와 교환
slug: pokemart-sales-trade-behavior
order: 541
description: 포켓몬 판매 상품과 교환 조건을 만들고 재고를 운영합니다.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: Fabric / NeoForge 0.2.9
audience: 판매점과 교환소를 만드는 제작자
tags:
  - sales
  - trade
  - stock
---

## 포켓몬 한 마리를 판매 상품으로 만들기

[PokéMart 기본 설정](#drm-cobblemon-editor/cobblemon-pokemart)에서 **Sales**와 결제 수단을 고른 뒤 **Pokémon Catalog → Add**를 누릅니다. 상품을 선택하고 **Edit Detailed Pokémon Data**에서 종·레벨·기술을 정합니다. 오른쪽에서 가격과 재고를 입력하고 **Save As**로 내 파일을 저장한 뒤 NPC에 적용합니다.

![이상해씨 상품의 가격과 재고를 정하는 Pokémon Catalog.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1의 제작자 화면. Price 5000, Initial 3, Maximum 3, Restock 1, Interval 72000은 한 시간마다 한 마리씩 최대 세 마리까지 보충하는 예제입니다. 실제 구매 결과 화면은 아닙니다.")

**구매자는 파티에 빈칸을 준비합니다.** 구매한 포켓몬은 활성 파티로 들어가며 PC로 자동 전송되지 않습니다. 결제 수단과 실제 지급 포켓몬을 확인한 다음 상품 수를 늘리세요.

![실제 NPC 상점에서 이상해씨를 구매한 뒤 잔액 60과 재고 2가 된 화면.](assets/media/guides/cobble-029-neo1211-player/cobble-sales-purchased.png "같은 버전에서 가격을 에메랄드 4개로 저장·적용한 실습입니다. Buy · 4를 눌러 에메랄드 64→60, 재고 3→2, 서버 파티에 레벨 5 이상해씨 한 마리 지급을 확인했습니다.")

### 가격·재고 입력값 참고

Sales 문서는 최대 256개 상품을 저장합니다. 목록의 `추가`, `복제`, `삭제`로 상품을 관리하고, `상세 포켓몬 데이터 편집`에서 실제 지급 포켓몬을 설정합니다.

| 필드 | 기능 |
| --- | --- |
| Product ID | NPC 재고를 구분하고 구매 요청이 상품을 찾을 때 사용하는 키. 문서 안에서 고유하게 사용합니다. |
| Pokémon | 종, 폼, Aspects, Shiny, 레벨, 성격, 특성, 볼, 지닌 도구, 최대 4개 기술 |
| Description | 플레이 상세 설명, 최대 512자 |
| Price | 선택한 통화로 차감할 0 이상의 정수 금액 |
| Initial Stock | 서버가 처음 만드는 현재 재고. `-1`이면 무제한 |
| Maximum Stock | 재입고 후 올라갈 수 있는 상한. Initial보다 작게 입력해도 Initial 이상으로 보정 |
| Restock Amount | 주기마다 회복할 수량. 0이면 재입고 비활성화 |
| Restock Interval | 최소 20틱, 최대 30일. Restock Amount가 0이면 저장값도 0으로 처리 |

Product ID가 같은 항목이 여러 개면 서버 조회는 먼저 발견한 상품을 사용합니다. ID 중복은 금지된 입력으로 명확히 표시되지 않을 수 있으므로 제작자가 고유성을 관리해야 합니다.

### 지급 포켓몬 필드

Sales와 Trade에서 NPC가 주는 포켓몬은 Trainer 슬롯과 같은 생성 필드를 사용합니다.

| 필드 | 처리 |
| --- | --- |
| Species | 필수 종 ID. 잘못된 종은 생성 실패 |
| Form / Aspects | 선택 폼과 쉼표 구분 Aspect 집합 |
| Shiny | 실제 이로치 여부 |
| Level | 1–100 |
| Nature / Ability | 비우면 생성 기본값 |
| Moves | 최대 4개. 비우면 레벨 기술 초기화 |
| Poké Ball | 유효하지 않으면 기본 Poke Ball |
| Held Item | 선택 지닌 도구 |

생성된 포켓몬은 회복된 상태, 거래 가능한 상태로 설정되며 구매자를 원래 트레이너로 기록합니다.

## 재고는 문서가 아니라 NPC별 상태

같은 상품 파일을 NPC 두 명에게 적용해도 재고는 따로입니다. 같은 NPC에서 Product ID를 바꾸면 새 상품으로 보고 초기 재고부터 시작합니다.

재입고는 서버 월드 시간으로 계산합니다. 서버가 꺼져 있는 동안 실제 시간이 흘렀다는 이유만으로 충전되지 않으며, 월드 틱이 진행되고 다시 조회될 때 지난 주기 수만큼 한꺼번에 계산해 Maximum Stock까지 올립니다.

재고는 월드에 저장되므로 서버 재시작 후에도 유지됩니다. JSON의 Initial Stock을 바꾸고 같은 원본을 저장해도 해당 NPC의 기존 상품 재고가 자동으로 초기화되지는 않습니다. 새 재고로 운영하려면 새 Product ID 또는 새 NPC UUID를 사용해야 하지만, ID 변경은 기존 상태와 완전히 다른 상품으로 취급된다는 점을 먼저 계획하세요.

## 구매에 실패했을 때

포켓몬을 줄 수 없거나 결제가 실패하면 재고와 결제를 되돌립니다. 오류가 계속되면 관리자에게 표시된 오류와 거래 내용을 알립니다.

구매 포켓몬은 활성 파티로 들어갑니다. **구매 전에 파티 빈칸을 준비하세요.** 파티가 가득 차면 PC로 자동 전송하지 않습니다.

## Trade 제안 편집

**General → Trade**로 바꾸고 **Pokémon Trades → Add**를 누릅니다. 가운데 모델은 NPC가 주는 포켓몬이고, 아래 **Requests**는 플레이어가 내야 하는 포켓몬입니다. 두 방향을 먼저 구분하세요.

![Bulbasaur ← Rattata 교환 제안. 가운데 이상해씨 모델과 Requests Rattata, 오른쪽 레벨·재고·편집 버튼이 보입니다.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-trades.png "0.2.9 / NeoForge 1.21.1에서 Add로 만든 실제 편집 항목입니다. 플레이어가 꼬렛을 내고 이상해씨를 받는 구성입니다. NPC Offered와 Requested를 각각 편집하며, 실제 교환 완료 장면은 아닙니다.")

1. **Edit NPC Offered Pokémon**에서 NPC가 줄 포켓몬을 정합니다.
2. **Edit Requested Pokémon**에서 받을 종·폼·Aspects를 정합니다.
3. 오른쪽 **Minimum / Maximum level**, **Shiny rule**, **NPC Stock**을 정합니다.
4. **Save As**로 저장하고 교환소 NPC에 적용합니다. 플레이어는 제안과 조건에 맞는 보유 포켓몬을 고른 뒤 교환을 확정합니다.

Trade 문서는 최대 128개 제안을 저장합니다. 아래는 **플레이어가 내는 포켓몬**의 조건입니다.

| 요청 조건 | 판정 |
| --- | --- |
| Species | 반드시 일치 |
| Form | 비어 있으면 모든 폼 허용, 값이 있으면 정확히 일치 |
| Aspects | 쉼표로 지정한 모든 Aspect를 플레이어 포켓몬이 포함해야 함 |
| Shiny `Any` | 이로치 여부 무관 |
| Shiny `Required` | 이로치만 허용 |
| Shiny `Forbidden` | 일반 색만 허용 |
| Min / Max Level | 1–100 안의 포함 범위 |

Nature, Ability, Moves, Poké Ball, Held Item은 NPC가 주는 포켓몬에는 적용되지만, 플레이어가 내는 포켓몬의 매칭 조건에는 사용하지 않습니다.

플레이어가 내는 포켓몬 후보는 활성 파티와 PC에서 모두 찾습니다. 다만 다음 포켓몬은 서버가 거부합니다.

- 현재 플레이어 소유가 아님
- 거래 불가 상태
- 월드에 엔티티로 꺼내져 있음
- 플레이어가 배틀 또는 다른 거래 중
- 파티 저장소가 바쁜 상태

## Trade 플레이 처리

1. 플레이어가 교환 제안을 선택합니다.
2. 조건에 맞는 파티·PC 포켓몬 중 내줄 한 마리를 고릅니다.
3. 받을 포켓몬을 확인하고 영구 교환을 확정합니다.

![내줄 꼬렛을 고른 플레이어 교환 화면.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-player.png "Choose Your Pokémon으로 보유 목록을 열면 조건에 맞는 꼬렛이 나옵니다. 오른쪽의 조건 통과 문구와 내줄 개체를 확인한 뒤 Confirm Trade를 누릅니다.")

![교환 완료 뒤 제안 재고 0과 Pokémon trade completed 메시지.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-completed.png "실제 Confirm Trade 뒤 서버 파티에서 꼬렛이 빠지고 레벨 5 이상해씨가 추가됐으며 제안 재고가 1→0이 됐습니다. 이 예제의 교환에는 화폐를 쓰지 않았습니다.")

새 포켓몬 전달이 실패하면 원래 포켓몬 복구를 시도하고 제안 재고를 되돌립니다. 즉시 복구할 수 없으면 [Pokémon Claim 수령함](#drm-cobblemon-editor/pokemart-auction-gui-runtime)에 보관합니다.

:::warning Trade의 새 포켓몬도 활성 파티로 전달됩니다
교환 대상은 파티 또는 PC에서 고를 수 있지만 NPC가 주는 새 포켓몬은 활성 파티에만 추가됩니다. 파티 포켓몬을 내면 제거된 자리가 생기지만, PC 포켓몬을 내고 활성 파티가 가득 차 있으면 새 포켓몬 전달이 실패할 수 있습니다.
:::

Trade 재고도 `NPC UUID + Trade ID`로 저장되며 Sales와 같은 Initial/Maximum/Restock 규칙을 사용합니다. Trade ID 역시 문서 안에서 고유해야 합니다.

## 실전 점검

상품·교환 제안·보유 포켓몬은 검색과 페이지 이동으로 찾습니다. 검색어를 바꾸면 첫 페이지부터 보여 줍니다.

- 유한 재고 1개 상품을 두 플레이어가 동시에 눌러도 한 명만 성공하는지 확인합니다.
- 활성 파티가 가득 찬 상태에서 Sales가 환불·재고 복구되는지 확인합니다.
- 활성 파티가 가득 찬 상태에서 PC 포켓몬을 Trade로 내고 원본 복구 또는 Claim이 동작하는지 확인합니다.
- Item 통화는 NBT가 다른 스택을 거부하는지 확인합니다.
- Form과 Aspects가 있는 Trade 조건을 일반 개체와 변형 개체 각각으로 시험합니다.
- Product ID나 Trade ID를 배포 후 바꾸면 기존 재고 키와 분리된다는 점을 운영자에게 알립니다.
- 서버 재시작 후 NPC별 재고와 다음 재입고 시각이 유지되는지 확인합니다.
