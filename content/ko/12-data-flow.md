---
title: 데이터 흐름
slug: data-flow
order: 105
description: GUI, 대화, 상점, 조건, 액션이 서로 연결되는 전체 흐름입니다.
product: core
category: 레퍼런스 / 운영
status: 안정
version: 0.1.x
audience: 제작자 / 운영자
tags:
  - data-flow
  - architecture
  - json
---

## 왜 데이터 흐름을 먼저 봐야 하는가

DRM 콘텐츠는 단일 파일로 끝나지 않습니다. 화면, 대화, 상점, 조건, 액션이 서로 ID와 경로로 연결됩니다. 그래서 문제가 생겼을 때는 어느 파일이 깨졌는지보다 **어느 연결이 끊겼는지**를 먼저 봐야 합니다.

```text
Player / NPC Event
  -> Dialogue or GUI Open
      -> Choice / Button / Product
          -> Condition Check
          -> Action Run
              -> StoredData / Command / Reward
```

## 연결 단위

| 연결 | 확인할 것 | 흔한 문제 |
| --- | --- | --- |
| NPC → Dialogue | 시작 대화 ID | NPC는 맞는데 시작 노드가 없음 |
| Dialogue → GUI | GUI 파일 경로 | GUI JSON 위치가 다른 월드를 가리킴 |
| Choice → Condition | 조건 ID와 파라미터 | 조건이 항상 false |
| Choice → Action | 실행 순서 | 보상 지급 전에 화면이 닫힘 |
| Shop → GUI | 상점 화면 타입 | 대화 GUI를 상점에 재사용함 |

## 운영 팁

- 배포 전에는 `test_`, `dev_` 접두어 파일을 분리합니다.
- 공개 서버에서는 ID를 자주 바꾸지 않습니다.
- 장애 대응을 위해 콘텐츠 단위별로 백업 폴더를 둡니다.
