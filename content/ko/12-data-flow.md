---
title: 데이터 흐름
slug: data-flow
order: 105
description: DRM Core의 기본 설치, 서버 JSON 저장, NPC 바인딩, 런타임 실행, 리로드 흐름입니다.
product: core
category: 레퍼런스 / 운영
section: operations
status: 안정
version: 0.1.4
audience: 제작자 / 운영자
tags:
  - data-flow
  - architecture
  - json
---

## 전체 흐름

DRM Core는 서버 루트의 `config/dochi_rpg_maker`를 중심으로 JSON을 읽고 씁니다. NPC에는 전체 JSON을 직접 저장할 수도 있고, 서버 JSON의 종류와 경로만 연결할 수도 있습니다.

```text
모드 시작
  -> DefaultContentInstaller
  -> config/dochi_rpg_maker 기본 파일 설치
  -> DochiRpgMakerApi 레지스트리 초기화
  -> 에디터/런타임에서 ServerJsonStorage 사용
```

## 제작 데이터 흐름

```text
Editor Screen
  -> Save / Save As
      -> ServerJsonStorage.save(kind, path, json)
          -> config/dochi_rpg_maker/<domain>
              -> 선택한 NPC에 source.kind / source.path 또는 내장 JSON 저장
```

대화 세트는 폴더 단위로 저장되고, GUI와 상점은 파일 단위로 저장됩니다. 저장소가 다른데 같은 경로 문자열을 쓰면 런타임에서 찾지 못할 수 있습니다.

## 대화 런타임 흐름

```text
플레이어가 NPC 우클릭
  -> DialogueStorage.hasDialogue(npc)
  -> DialogueStorage.load(npc)
      -> source.kind/source.path가 있으면 서버 JSON 우선
      -> 없으면 NPC 내장 JSON 사용
  -> DialogueRuntimeManager.start
  -> start route 조건 평가
  -> 현재 노드 choice 조건 필터링
  -> DialogueRuntimeScreen 열기
  -> 선택지 액션 실행
```

런타임이 클라이언트에 보내는 대화 문서는 현재 노드와 보이는 선택지만 포함하도록 필터링됩니다. 조건에 실패한 선택지는 화면에 내려가지 않습니다.

## 상점 런타임 흐름

```text
go_shop 액션 또는 상점 NPC 우클릭
  -> target이 bound이면 NPC 상점 로드
  -> target이 파일/ID이면 npc_shops에서 검색
  -> NpcShopRuntimeScreen 열기
  -> 구매/판매 요청
  -> ShopTradeService가 서버에서 검증
  -> 화폐 차감/지급, 아이템 지급/회수, 재고 저장
```

구매와 판매는 모두 서버 권한으로 처리됩니다. 클라이언트 화면은 미리보기와 요청 입력을 담당하고, 실제 재고와 잔액 변경은 서버가 결정합니다.

## 화폐와 HUD 흐름

```text
currency/definitions/*.json
  -> CurrencyStorage.reload
  -> 플레이어 로그인 또는 아이템 픽업
  -> CurrencyBalanceStorage PersistentData 갱신
  -> CurrencySyncService
  -> CurrencyHudOverlay
```

화폐 잔액은 플레이어 PersistentData의 `dochi_rpg_maker.currency.balance.<currencyId>` 키에 저장됩니다. 사망 규칙은 플레이어 사망 이벤트에서 적용되고, 변경된 잔액은 클라이언트에 다시 동기화됩니다.

## GUI 로딩 흐름

대화와 상점 런타임은 GUI 연결 필드를 보고 `config/dochi_rpg_maker/gui`에서 GUI JSON을 찾습니다.

| 런타임 | GUI 연결 필드 |
| --- | --- |
| 대화 | `dialogueDefaultGui.guiJsonPath` |
| 상점 기본 | `shopDefaultGui.guiJsonPath` |
| 상점 구매/판매 | `shopGuis.buy.guiJsonPath`, `shopGuis.sell.guiJsonPath` |
| Remnant Msg | 메시지/정책 데이터와 `remnant_msg` GUI |

GUI JSON 안의 이미지 리소스는 Minecraft 리소스 위치와 로컬 경로를 구분해서 처리해야 합니다. 리소스팩 이미지라면 `namespace:textures/...` 형태를 유지하세요.

## 리로드와 캐시

`ServerJsonStorage`는 JSON 캐시를 가질 수 있습니다. `reloadOnTrigger`가 켜져 있으면 로드 시 최신 파일을 다시 읽고 캐시를 갱신합니다. 수동 리로드 명령은 캐시를 비우고 화폐 정의를 다시 읽습니다.

| 상황 | 추천 행동 |
| --- | --- |
| 에디터로 저장 | 별도 리로드 없이 바로 다시 불러와 확인합니다. |
| 파일을 직접 수정 | `/drm reload` 또는 관련 에디터 Load를 사용합니다. |
| 화폐 정의 수정 | `/drm currency reload`로 온라인 플레이어에게 다시 동기화합니다. |
| 기본 파일 수정 | 새 파일로 복제한 뒤 기본 설정에서 연결합니다. |

:::tip 문제를 좁히는 질문
문제가 생기면 "어느 NPC가 어떤 `kind/path`를 들고 있고, 그 파일이 서버의 어떤 폴더에 있는가"부터 확인하세요. 이 질문 하나로 경로 오류와 조건 오류를 빠르게 분리할 수 있습니다.
:::
