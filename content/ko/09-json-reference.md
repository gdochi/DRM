---
title: JSON 레퍼런스
slug: json-reference
order: 100
description: DRM 데이터 파일을 직접 확인할 때 필요한 기본 형태입니다.
tags:
  - json
  - reference
---

## 공통 규칙

- JSON은 문법 오류가 하나만 있어도 가져오기와 실행이 막힙니다.
- ID는 파일명과 맞추면 추적이 쉽습니다.
- 숫자 필드는 문자열로 넣지 않습니다.
- 경로는 운영 환경에서 실제로 존재하는지 확인합니다.

## 예시 구조

```json
{
  "id": "blacksmith_shop",
  "name": "Blacksmith",
  "gui": "dc_data/dc_gui/shop_blacksmith.json",
  "currency": {
    "type": "item",
    "item": "minecraft:emerald"
  },
  "products": []
}
```

## 문서화 방식

새 JSON 형식이 생기면 이 문서에는 필드 설명을 먼저 추가하고, 실제 제작 예제는 각 기능 문서에 둡니다. 레퍼런스는 짧고 정확해야 다시 찾기 쉽습니다.
