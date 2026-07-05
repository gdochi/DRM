---
title: 커런시 에디터
slug: currency-editor
order: 85
description: Currency Editor에서 화폐 정의, 아이템 픽업 변환, 잔액, 사망 규칙을 설정하는 방법입니다.
product: core
category: 핵심 시스템
section: currency-editor
status: 안정
version: 0.1.2
audience: 제작자 / 운영자
tags:
  - currency
  - editor
---

## 역할

Currency Editor는 DRM Core의 화폐 정의 JSON을 만드는 에디터입니다. 화폐 정의는 `config/dochi_rpg_maker/currency/definitions`에 저장되고, 런타임에서는 플레이어 PersistentData의 잔액 키와 연결됩니다.

화폐는 단순한 표시값이 아니라 상점 결제, 아이템 픽업 변환, HUD 표시, 사망 시 보존 규칙에 모두 연결됩니다.

| 항목 | 설명 |
| --- | --- |
| 화폐 ID | 저장 파일명과 잔액 키에 쓰이는 고유 ID입니다. |
| 표시 이름 | HUD, 상점, 메시지에서 보여줄 이름입니다. |
| 아이콘 | 화폐를 대표하는 아이템 또는 텍스처입니다. |
| 포맷 | 잔액을 화면에 표시할 때 사용할 형식입니다. |
| 아이템 변환 | 특정 아이템을 주우면 화폐 잔액으로 바꿀지 결정합니다. |
| 사망 규칙 | 죽었을 때 잔액을 유지할지 잃을지 정합니다. |

## 저장 위치

화폐 정의 파일은 서버 기준 아래 경로에 저장됩니다.

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

서버 JSON API의 `kind`는 `currency`입니다. 에디터나 명령에서 화폐 목록을 읽을 때는 `currency_index`가 사용됩니다.

## 기본 제작 흐름

1. `Dochi RPG Maker Core` 아이템을 우클릭합니다.
2. 에디터 선택 화면에서 `Currency Editor`를 엽니다.
3. 화폐 ID를 정합니다.
4. 표시 이름, 아이콘, 포맷을 설정합니다.
5. 아이템 픽업 변환이 필요하면 대상 아이템과 지급량을 설정합니다.
6. 사망 규칙을 `KEEP` 또는 `LOSE`로 정합니다.
7. 저장 후 `/drm currency reload` 또는 `/drm reload`로 서버 캐시를 갱신합니다.

## 명령으로 확인하기

Currency Editor에서 저장한 화폐는 운영 명령으로 바로 확인할 수 있습니다.

| 명령 | 용도 |
| --- | --- |
| `/drm currency list` | 등록된 화폐 목록을 확인합니다. |
| `/drm currency create <id>` | 기본 화폐 정의를 만듭니다. |
| `/drm currency give <player> <id> <amount>` | 플레이어에게 화폐를 지급합니다. |
| `/drm currency take <player> <id> <amount>` | 플레이어의 화폐를 차감합니다. |
| `/drm currency set <player> <id> <amount>` | 잔액을 특정 값으로 맞춥니다. |
| `/drm currency get <player> <id>` | 현재 잔액을 확인합니다. |

## 상점과의 연결

NPC Shop의 상품 가격은 화폐 ID를 기준으로 계산됩니다. 상점 문서에서 사용하는 화폐 ID와 `currency/definitions`에 저장된 ID가 다르면 결제 실패나 표시 오류가 발생합니다.

상점에서 여러 화폐를 쓰는 경우에는 먼저 Currency Editor에서 모든 화폐를 만들고, 그 다음 NPC Shop에서 가격 필드를 연결하는 순서가 안전합니다.

## HUD와의 연결

화폐가 HUD에 보이려면 두 가지가 맞아야 합니다.

- 화폐 정의에서 HUD 표시가 가능한 상태여야 합니다.
- HUD Maker의 활성 세트에 화폐 표시 컴포넌트가 들어 있어야 합니다.

잔액은 서버 값이 기준입니다. 클라이언트 화면이 갱신되지 않으면 먼저 `/drm currency reload`와 HUD 활성 세트를 확인하세요.

## 점검 순서

| 증상 | 확인할 것 |
| --- | --- |
| 화폐가 목록에 없음 | 파일 위치와 JSON 오류를 확인합니다. |
| 픽업이 잔액으로 변하지 않음 | 아이템 ID, 변환량, 서버 리로드를 확인합니다. |
| 상점 결제가 실패함 | 상점 가격의 화폐 ID와 정의 파일 ID가 같은지 확인합니다. |
| 죽은 뒤 잔액이 예상과 다름 | death rule이 `KEEP`인지 `LOSE`인지 확인합니다. |
