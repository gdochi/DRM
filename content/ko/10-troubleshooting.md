---
title: 문제 해결
slug: troubleshooting
order: 110
description: 설치, 경로, JSON, 런타임, 상점, 화폐 문제를 빠르게 좁히는 방법입니다.
product: core
category: 레퍼런스 / 운영
status: 안정
version: 0.1.2
audience: 운영자
tags:
  - troubleshooting
  - errors
---

## 증상별 확인

| 증상 | 가능한 원인 | 해결 |
| --- | --- | --- |
| 에디터 아이템 우클릭이 안 됨 | 크리에이티브/편집 권한 부족, 클라이언트 모드 누락 | 크리에이티브 모드, OP 권한, 클라이언트 JAR을 확인합니다. |
| NPC 우클릭이 일반 CustomNPCs 도구처럼 동작함 | 대상이 CustomNPCs NPC가 아니거나 코어 아이템이 아님 | `Dochi RPG Maker Core` 아이템과 대상 NPC를 확인합니다. |
| `config/dochi_rpg_maker`가 없음 | 서버가 아직 시작되지 않았거나 다른 루트를 보고 있음 | 실제 서버 실행 루트와 싱글 인스턴스 루트를 구분합니다. |
| 대화 선택지가 안 보임 | choice 조건이 모두 실패함 | 선택지 `conditions`와 `conditionMode`를 잠시 비우고 테스트합니다. |
| 대화가 바로 닫힘 | 시작 route 대상이 없거나 대상 노드 조건이 실패함 | `current`, `start` 노드, route `goto`를 확인합니다. |
| GUI가 기본 화면처럼 보임 | `dialogueDefaultGui` 또는 `shopDefaultGui` 경로가 잘못됨 | `config/dochi_rpg_maker/gui` 아래 실제 파일명을 확인합니다. |
| 상점이 없다고 나옴 | NPC에 상점이 없고 대화의 `go_shop` 대상도 없음 | NPC에 상점을 적용하거나 `go_shop.shop`에 파일 상점 ID를 넣습니다. |
| 상점 아이템 구매 실패 | 재고 0, 인벤토리 가득 참, 화폐 부족 | 런타임 메시지와 상품 `stock`, 가격, 화폐 잔액을 확인합니다. |
| 판매가 안 됨 | `sellItems`가 비어 있거나 NBT/단위 수량 불일치 | 판매 행의 `item`, `nbt`, `count`, `price`를 확인합니다. |
| 화폐가 표시되지 않음 | 화폐 정의가 비활성, HUD 조건이 숨김, 잔액 동기화 전 | `/drm currency list`, HUD 설정, 로그인/픽업 동기화를 확인합니다. |

## 빠른 분리 절차

1. 기본 샘플 JSON으로 같은 문제가 나는지 확인합니다.
2. 서버 루트의 `config/dochi_rpg_maker`를 보고 있는지 확인합니다.
3. JSON을 직접 수정했다면 문법 오류를 먼저 잡습니다.
4. 조건과 액션을 잠시 비워 화면 연결 문제인지 데이터 조건 문제인지 나눕니다.
5. `/drm reload`와 `/drm currency reload`를 실행합니다.
6. `config/dochi_rpg_maker/debug.log`, 서버 로그, 클라이언트 로그를 함께 봅니다.

## 경로 문제

GUI와 상점은 경로 종류가 다릅니다.

| 대상 | 올바른 예 | 잘못 쓰기 쉬운 예 |
| --- | --- | --- |
| 대화 GUI | `default_dialogue_gui.json` | `npc_shops/default_dialogue_gui.json` |
| 상점 GUI | `default_shop_gui.json` | `dialogue_sets/default_shop_gui.json` |
| 상점 파일 | `blacksmith.json` 또는 `blacksmith` | `gui/blacksmith.json` |
| 대화 세트 | `my_set` | `my_set/dialogue_set.json`을 세트 이름으로 입력 |

대화 세트는 폴더 단위이고, GUI와 상점은 파일 단위입니다.

## 캐시와 리로드

`settings/reload_policy.json`의 `reloadOnTrigger`가 `true`이면 JSON 로드 시 최신 파일을 다시 읽습니다. `false`이면 캐시를 사용할 수 있으므로 직접 파일을 바꾼 뒤에는 `/drm reload`가 필요합니다.

| 명령 | 용도 |
| --- | --- |
| `/drm reload` | 서버 JSON 캐시를 비우고 화폐를 다시 읽습니다. |
| `/drm currency reload` | 화폐 정의를 다시 읽고 온라인 플레이어에게 동기화합니다. |
| `/drm currency list` | 로드된 화폐 ID를 확인합니다. |

:::warning 기본 파일 덮어쓰기
기본 GUI나 샘플 상점이 보호 기본값으로 처리될 수 있습니다. 수정본을 남기려면 기본 파일을 직접 덮어쓰지 말고 새 이름으로 저장한 뒤 기본 설정이나 NPC에 연결하세요.
:::
