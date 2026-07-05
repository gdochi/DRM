---
title: 핵심 개념
slug: core-concepts
order: 50
description: GUI, 대화, 상점, 조건, 액션을 이해하기 위한 기본 용어입니다.
product: core
category: 핵심 시스템
status: 안정
version: 0.1.x
audience: 제작자
tags:
  - concepts
  - glossary
---

## 주요 용어

| 용어 | 의미 |
| --- | --- |
| GUI | 플레이어에게 보이는 화면 레이아웃입니다. 배경, 텍스트, 버튼, 슬롯을 포함합니다. |
| Dialogue | NPC 대화 흐름입니다. 노드와 선택지로 구성됩니다. |
| Shop | 상품, 가격, 재고, 화폐, 접근 조건을 가진 상점 데이터입니다. |
| Condition | 선택지 표시, 상점 접근, 보상 지급 가능 여부를 판단하는 규칙입니다. |
| Action | 명령어 실행, 보상 지급, StoredData 변경처럼 실제 변화를 만드는 동작입니다. |
| StoredData | 플레이어, NPC, 월드 단위로 저장되는 상태 값입니다. |

## 연결 방식

DRM 콘텐츠는 보통 한 파일로 끝나지 않습니다. 대화 선택지가 상점을 열고, 상점은 GUI를 참조하고, GUI는 이미지와 컴포넌트 경로를 참조합니다. 그래서 제작할 때는 항상 “누가 누구를 부르는지”를 먼저 적어두는 편이 좋습니다.

```text
NPC
  -> Dialogue JSON
      -> Choice
          -> Condition
          -> Action
          -> Shop JSON
              -> GUI JSON
```
