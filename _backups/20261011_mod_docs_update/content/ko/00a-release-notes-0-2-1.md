---
title: Forge 0.2.1 업데이트
slug: release-0-2-1
order: 7
description: NPC별 상점 재고, 재입고 시간 기준과 GUI 타일 설정을 안내합니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.2.1
audience: 제작자 / 운영자
---

## 현재 버전

Minecraft 1.20.1 · Forge · DRM **0.2.1** 기준입니다. 서버와 모든 클라이언트의 JAR을 함께 교체하고 `config/dochi_rpg_maker`와 월드를 백업하세요.

## NPC Shop

- 실행 재고와 다음 재입고 시각을 개별 NPC NBT에 보관합니다. 같은 JSON을 사용하는 다른 NPC는 별도 재고를 가집니다.
- JSON은 초기 재고·상품·재입고 설정을 보관하며 정의 저장·내보내기에는 실행 예정 시각을 넣지 않습니다.
- 상품 상세 `RESTOCK > Timer basis`에서 `Real ticks` 또는 `World ticks`를 선택합니다. 상점 전체에 적용하며 잠으로 건너뛴 시간을 포함할지 결정합니다.

[NPC Shop](#core/shop-system)에서 설정과 기존 재고 이관 방법을 확인하세요.

## GUI Maker

- `Default UI Settings`의 Tile/Stretch와 `Sprite Scale %` 직접 입력을 지원합니다. 배율은 50–400%입니다.
- 이미지 `Fit: Tile`에서 선택 컴포넌트의 가로·세로 비율을 각각 10–800%로 정합니다.
- 대화 런타임이 Tile 설정을 읽으며 타일 이미지의 반복·표시 처리를 개선했습니다.

[GUI Maker](#core/gui-system)에서 실제 제작 순서와 JSON 참고를 확인하세요. 기본 문서는 `Save As`로 사용자 복사본을 만들어 운영합니다.
