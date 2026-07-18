---
title: Sales·Trade 상품과 재고 처리
slug: pokemart-sales-trade-behavior
order: 541
description: Sales 구매 트랜잭션, Trade 매칭, NPC별 재고·재입고와 실패 복구 동작을 설명합니다.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Draft
version: 0.1.0
audience: 판매점과 교환소를 만드는 제작자
tags:
  - sales
  - trade
  - stock
---

## Sales 상품 편집

Sales 문서는 최대 256개 상품을 저장합니다. 목록의 `추가`, `복제`, `삭제`로 상품을 관리하고, `상세 포켓몬 데이터 편집`에서 실제 지급 포켓몬을 설정합니다.

| 필드 | 기능 |
| --- | --- |
| Product ID | NPC 재고를 구분하고 구매 요청이 상품을 찾을 때 사용하는 키. 문서 안에서 고유하게 사용합니다. |
| Pokémon | 종, 폼, Aspects, Shiny, 레벨, 성격, 특성, 볼, 지닌 도구, 최대 4개 기술 |
| Description | 런타임 상세 설명, 최대 512자 |
| Price | 선택한 통화로 차감할 0 이상의 정수 금액 |
| Initial Stock | 서버가 처음 만드는 현재 재고. `-1`이면 무제한 |
| Maximum Stock | 재입고 후 올라갈 수 있는 상한. Initial보다 작게 입력해도 Initial 이상으로 보정 |
| Restock Amount | 주기마다 회복할 수량. 0이면 재입고 비활성화 |
| Restock Interval | 최소 20틱, 최대 30일. Restock Amount가 0이면 저장값도 0으로 처리 |

Product ID가 같은 항목이 여러 개면 서버 조회는 먼저 발견한 상품을 사용합니다. ID 중복은 금지된 입력으로 명확히 표시되지 않을 수 있으므로 제작자가 고유성을 관리해야 합니다.

## 재고는 문서가 아니라 NPC별 상태

유한 재고의 런타임 키는 `NPC UUID + Product ID`입니다. 같은 JSON을 NPC 두 명에게 적용해도 각 NPC의 재고는 별도로 감소합니다. 같은 NPC에서 Product ID를 바꾸면 서버는 새로운 재고 키로 보고 Initial Stock에서 시작합니다.

재입고는 서버 월드 시간으로 계산합니다. 서버가 꺼져 있는 동안 실제 시간이 흘렀다는 이유만으로 충전되지 않으며, 월드 틱이 진행되고 다시 조회될 때 지난 주기 수만큼 한꺼번에 계산해 Maximum Stock까지 올립니다.

## Sales 구매 처리 순서

서버는 한 번의 구매를 다음 순서로 처리합니다.

1. NPC 역할이 Sales인지, Product ID가 존재하는지 확인합니다.
2. 통화 공급자가 사용 가능한지와 잔액을 확인합니다.
3. NPC별 재고 1개를 예약합니다.
4. 상품 데이터로 Cobblemon 포켓몬을 생성합니다.
5. 통화를 차감합니다.
6. 포켓몬을 플레이어에게 전달합니다.
7. 성공 상태와 재고를 월드 저장 데이터에 기록합니다.

포켓몬 생성이나 결제가 실패하면 예약 재고를 복구합니다. 결제 후 전달이 실패하면 환불을 시도하고 재고도 복구합니다. 전달과 환불이 모두 실패하면 `recovery_failed` 오류가 표시되므로 해당 플레이어의 통화와 서버 로그를 관리자가 확인해야 합니다.

## Trade 제안 편집

Trade 문서는 최대 128개 제안을 저장합니다. 각 제안은 `NPC가 주는 포켓몬`과 `NPC가 원하는 포켓몬 조건`을 별도로 가집니다.

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

## Trade 런타임 처리

1. 플레이어가 교환 제안을 선택합니다.
2. 런타임은 플레이어 보유 포켓몬 목록에서 조건을 만족하는 후보만 표시합니다.
3. 플레이어가 한 마리를 선택하고 영구 교환을 확정합니다.
4. 서버가 소유권과 교환 가능 상태, 조건, 제안 재고를 다시 검사합니다.
5. 플레이어 포켓몬 NBT를 백업한 뒤 소유 저장소에서 제거합니다.
6. NPC가 주는 포켓몬을 생성해 전달합니다.

새 포켓몬 전달이 실패하면 원래 포켓몬 복구를 시도합니다. 즉시 복구할 수 없으면 경매와 같은 Pokémon Claim 저장소에 넣어 유실을 방지하고 제안 재고를 되돌립니다.

Trade 재고도 `NPC UUID + Trade ID`로 저장되며 Sales와 같은 Initial/Maximum/Restock 규칙을 사용합니다. Trade ID 역시 문서 안에서 고유해야 합니다.

## 실전 점검

- 유한 재고 1개 상품을 두 플레이어가 동시에 눌러도 한 명만 성공하는지 확인합니다.
- 인벤토리/파티/PC 공간이 부족한 상태에서 구매와 교환 복구를 확인합니다.
- Item 통화는 NBT가 다른 스택을 거부하는지 확인합니다.
- Form과 Aspects가 있는 Trade 조건을 일반 개체와 변형 개체 각각으로 시험합니다.
- Product ID나 Trade ID를 배포 후 바꾸면 기존 재고 키와 분리된다는 점을 운영자에게 알립니다.
