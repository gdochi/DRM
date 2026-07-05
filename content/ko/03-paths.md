---
title: 폴더와 경로
slug: paths
order: 40
description: DRM 데이터가 저장되는 위치와 경로 규칙입니다.
tags:
  - paths
  - files
---

## 자주 쓰는 경로

| 데이터 | 권장 경로 | 설명 |
| --- | --- | --- |
| 스크립트 | `minecraft/customnpcs/scripts/ecmascript` | CustomNPCs JavaScript 파일 위치입니다. |
| 플레이어 스크립트 | `minecraft/customnpcs/scripts/player_scripts.json` | 플레이어 이벤트 스크립트 등록 파일입니다. |
| GUI JSON | `minecraft/customnpcs/dc_data/dc_gui` | GUI Maker 출력 파일을 둡니다. |
| 대화 JSON | `minecraft/customnpcs/dc_data/dc_dialogues` | Dialogue Editor 출력 파일을 둡니다. |
| 상점 JSON | `minecraft/customnpcs/dc_data/dc_shops` | NPC Shop 출력 파일을 둡니다. |
| HTML GUI | `minecraft/saves/<world>/customnpcs/scripts/ecmascript/html` | 월드별 HTML GUI 파일 위치입니다. |

## 파일명 규칙

- 공백 대신 소문자, 숫자, 밑줄을 사용합니다.
- 파일명과 내부 ID를 가능하면 맞춥니다.
- 서버에 이미 배포된 ID는 가볍게 바꾸지 않습니다.
- 테스트 파일은 `test_`, `dev_` 접두어를 붙여 실제 콘텐츠와 구분합니다.

:::danger 위험
GUI JSON은 있는데 이미지가 리소스팩에 없으면 런타임에서 다른 화면처럼 보일 수 있습니다. JSON 경로와 리소스 경로를 따로 확인해야 합니다.
:::
