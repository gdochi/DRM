---
title: 조건과 액션
slug: conditions-actions
order: 90
description: DRM에서 상태를 판정하고 결과를 실행하는 규칙입니다.
tags:
  - condition
  - action
---

## 조건

조건은 “보여줄지”, “열 수 있는지”, “지급할 수 있는지”를 판단합니다.

| 조건 종류 | 사용 예 |
| --- | --- |
| StoredData | 퀘스트 진행도, NPC 만남 여부 |
| Tag | 플레이어 상태나 서버 그룹 |
| Item | 특정 아이템 소지 여부 |
| Permission | 운영자 또는 권한 그룹 |
| Economy | 화폐 잔액 |

## 액션

액션은 조건을 통과한 뒤 실제 변화를 만듭니다.

| 액션 종류 | 사용 예 |
| --- | --- |
| Command | 서버 명령어 실행 |
| Reward | 아이템, 화폐, 경험치 지급 |
| StoredData Set | 진행도 저장 |
| Open Shop | 상점 열기 |
| Close GUI | 화면 닫기 |

:::tip 테스트 방법
조건은 성공 케이스와 실패 케이스를 둘 다 테스트해야 합니다. 액션은 실행 순서가 중요하므로 로그나 임시 메시지를 넣고 확인하면 좋습니다.
:::
