---
title: 핵심 개념
slug: core-concepts
order: 50
description: DRM Core의 에디터, 런타임, 서버 JSON, NPC 바인딩을 이해하기 위한 기본 용어입니다.
product: core
category: 핵심 시스템
section: getting-started
status: 안정
version: 0.1.4
audience: 제작자
tags:
  - concepts
  - glossary
---

## 주요 용어

| 용어 | 의미 |
| --- | --- |
| Editor Descriptor | 선택 화면에 표시되는 에디터 정의입니다. ID, 제목, 정렬 순서, NPC 대상 필요 여부를 가집니다. |
| Source Choice | 기존 파일 불러오기, 기본값 사용, 새로 만들기 같은 첫 선택 단계입니다. |
| Server JSON Domain | `dialogue_set`, `gui`, `npc_shop`처럼 서버가 저장 위치를 알고 있는 JSON 종류입니다. |
| Layout Profile | `dialogue`, `npc_shop`, `currency_hud` 같은 GUI 타입별 저장소와 기본 파일명을 정의합니다. |
| Dialogue Document | 대화 세트 전체를 담는 JSON 루트입니다. 노드, 선택지, 조건, 액션, 기본 GUI 연결을 포함합니다. |
| Shop Document | NPC 상점 JSON입니다. 구매/판매 모드, 상품, 판매 매입 목록, 상점 GUI 연결을 포함합니다. |
| Currency Definition | 화폐 하나를 정의하는 JSON입니다. 아이템 아이콘, 자동 변환, HUD 표시, 사망 손실 규칙을 가집니다. |
| NPC Binding | NPC PersistentData에 대화나 상점 JSON을 직접 저장하거나 서버 JSON 경로를 연결하는 방식입니다. |
| Protected Default | 기본 샘플 파일처럼 직접 덮어쓰기보다 `Save As`를 사용해야 하는 보호 데이터입니다. |

## 에디터와 런타임의 차이

에디터는 JSON을 만들고 저장하는 화면입니다. 런타임은 플레이어가 NPC를 우클릭했을 때 서버가 저장된 JSON을 읽고 실제 대화, 상점, HUD 변화를 실행하는 흐름입니다.

| 단계 | 처리 위치 | 예 |
| --- | --- | --- |
| 제작 | 클라이언트 화면 + 서버 저장 | Dialogue Editor에서 노드 수정 후 서버 JSON 저장 |
| 바인딩 | 서버 NPC PersistentData | NPC에 `source.kind`, `source.path` 또는 내장 JSON 저장 |
| 실행 | 서버 런타임 + 클라이언트 화면 | 조건 평가 후 선택지만 필터링해서 대화 화면 열기 |
| 결과 | 서버 상태 변경 | 명령 실행, 아이템 지급, 태그 변경, 화폐 차감 |

## 연결 방식

DRM 콘텐츠는 보통 한 파일로 끝나지 않습니다. 대화 선택지가 상점을 열고, 상점은 GUI를 참조하며, GUI는 화면 컴포넌트와 리소스 경로를 참조합니다.

```text
CustomNPCs NPC
  -> DialogueStorage 또는 NpcShopStorage
      -> ServerJsonStorage(kind, path)
          -> Dialogue / Shop / GUI / Currency JSON
              -> Runtime screen
                  -> 조건 평가
                  -> 액션 실행
```

## 파일 기반과 NPC 내장 데이터

| 방식 | 장점 | 주의 |
| --- | --- | --- |
| 서버 JSON 경로 연결 | 여러 NPC가 같은 파일을 공유하고 수정 사항을 다시 읽기 쉽습니다. | 파일명과 ID를 안정적으로 유지해야 합니다. |
| NPC 내장 JSON 저장 | NPC 단독 설정이 간단합니다. | 월드/NPC 데이터 안에 들어가므로 파일 단위 관리가 어렵습니다. |

상점 거래 중 재고가 줄어드는 경우 파일 기반 상점이면 가능한 한 원본 상점 JSON에 다시 저장합니다. 내장 상점이면 NPC에 저장된 상점 데이터가 갱신됩니다.

## 기본값과 설정

`settings/defaults.json`은 기본 대화 GUI, 기본 상점 GUI, 기본 화폐 연결을 저장합니다. 대화나 상점 문서에 GUI 정보가 비어 있으면 이 기본값이 채워집니다.

`settings/reload_policy.json`은 서버 JSON 캐시와 수동 리로드 명령을 제어합니다.

| 설정 | 기본값 | 의미 |
| --- | --- | --- |
| `reloadOnTrigger` | `true` | JSON을 사용할 때 캐시 대신 최신 파일을 다시 읽습니다. |
| `manualReloadCommand` | `true` | `/drm reload`와 `/drm currency reload`를 허용합니다. |

:::tip 제작 팁
문제가 생기면 먼저 "어느 JSON이 어느 경로로 연결되어 있는가"를 확인하세요. 대다수 오류는 파일 내용보다 연결 정보가 오래되었을 때 생깁니다.
:::
