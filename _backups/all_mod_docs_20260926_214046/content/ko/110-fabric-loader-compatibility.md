---
title: Forge와 Fabric 구분
slug: loader-compatibility
order: 45
description: Forge 1.20.1 문서와 Fabric 1.21.1 문서를 구분하고 옮길 때 확인할 차이입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.1.8
audience: 제작자 / 서버 운영자
tags:
  - fabric
  - compatibility
  - migration
---

## 이 문서가 다루는 빌드

이 제품의 모든 페이지는 `DRM Core 0.1.8`, `Fabric 1.21.1`, Java 21을 기준으로 합니다. 별도의 `Dochi's RPG Maker Forge 1.20.1` 제품은 Forge 빌드 문서입니다.

| 구분 | Forge 문서 | Fabric 문서 |
| --- | --- | --- |
| Minecraft | 1.20.1 | 1.21.1 |
| 로더 | Forge 47+ | Fabric Loader 0.18.0+ |
| Java | 17 | 21 |
| 예시 JAR | `dochi_rpg_maker-0.1.4-1.20.1-forge.jar` | `dochi_rpg_maker-0.1.8-fabric-1.21.1.jar` |

## 0.1.8 설치 경계

Fabric 0.1.8은 CustomNPCs 1.0.0을 필수로 사용합니다. 서버와 모든 접속 클라이언트에 다음을 맞춰 설치하세요.

- DRM Core 0.1.8 Fabric
- Fabric API 0.116.11+1.21.1 이상
- CustomNPCs 1.0.0

GeckoLib, FTB Quests, Mod Menu, CobbleDollars는 해당 연동 기능을 쓸 때만 설치합니다.

## 유지되는 데이터

Fabric도 모드 ID `dochi_rpg_maker`와 데이터 루트 `config/dochi_rpg_maker`를 사용합니다. 대화, 상점, GUI, 화폐, HUD, Remnant Msg 같은 기존 JSON은 복사본에서 불러와 확인할 수 있습니다.

0.1.8에는 퀘스트, 팩션, 팝업, 서버 PNG 에셋처럼 0.1.7보다 늘어난 폴더가 있습니다. 새 버전에서 저장한 파일을 이전 빌드가 이해한다고 가정하지 마세요.

## Forge에서 옮길 때

1. 기존 `config/dochi_rpg_maker`와 월드를 백업합니다.
2. 별도의 Fabric 1.21.1 인스턴스를 준비합니다.
3. DRM과 모든 애드온·연동 모드를 Fabric용으로 맞춥니다.
4. 설정 폴더 복사본을 넣고 각 에디터에서 불러옵니다.
5. NPC 대화·상점·텔레포터, 퀘스트, 팩션, 팝업, HUD와 월드 저장 데이터를 확인합니다.

:::warning 로더 혼합 금지
Forge용 DRM이나 애드온은 Fabric에서 로드되지 않습니다. JAR 이름만 보고 섞지 말고 모든 모드가 Fabric 1.21.1용인지 확인하세요.
:::
