---
title: 상점 시스템
slug: shop-system
order: 80
description: NPC Shop JSON, 상품, 화폐, 재고, GUI 연결 규칙입니다.
tags:
  - shop
  - economy
---

## 상점 데이터

상점은 ID, 표시 이름, 화폐, 상품 목록, 접근 조건, GUI 연결로 구성됩니다.

| 항목 | 설명 |
| --- | --- |
| Shop ID | 상점을 부르는 고유 ID입니다. |
| Currency | 기본 화폐입니다. 상품별로 덮어쓸 수 있습니다. |
| Product | 판매 또는 구매 대상 아이템입니다. |
| Stock | 무한 재고, 기본 재고, 재입고 규칙을 정합니다. |
| Access Guard | 상점을 열 수 있는 조건입니다. |
| GUI JSON | 화면으로 사용할 GUI 파일입니다. |

## 상품 체크포인트

- 상품 ID는 중복되면 안 됩니다.
- 아이템 ID는 `minecraft:stone`처럼 네임스페이스까지 씁니다.
- NBT 상품은 전체 NBT가 비어 있으면 안 됩니다.
- `Base Stock`이 `-1`이면 무한 재고로 취급합니다.
- 카테고리를 삭제하면 상품 이동 규칙을 확인합니다.
