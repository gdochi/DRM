---
title: 설치 준비
slug: installation
order: 30
description: Fabric 1.21.1용 DRM Core 0.1.8의 설치 조건과 서버/클라이언트 역할입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.1.8
audience: 서버 운영자
tags:
  - install
  - fabric
---

## 지원 환경

Fabric 빌드는 Minecraft `1.21.1` 전용입니다. Forge 1.20.1용 JAR과 파일 이름이 비슷해도 서로 바꿔 넣을 수 없습니다. 모드 ID와 리소스 네임스페이스는 두 로더 모두 `dochi_rpg_maker`입니다.

| 항목 | 요구 조건 | 현재 프로젝트 기준 |
| --- | --- | --- |
| DRM Core | `0.1.8` Fabric 빌드 | `dochi_rpg_maker-0.1.8-fabric-1.21.1.jar` |
| Minecraft | 정확히 `1.21.1` | 다른 1.21.x 버전과 혼용하지 않습니다. |
| Fabric Loader | `0.18.0` 이상 | 빌드 기준 `0.19.3` |
| Fabric API | `0.116.11+1.21.1` 이상 | 빌드 기준 `0.116.13+1.21.1` |
| Java | `21` 이상 | 서버와 클라이언트 모두 동일 |

## 필수 및 선택 연동 모드

`fabric.mod.json`에서 CustomNPCs 1.0.0은 필수이며, 나머지는 필요한 기능에 따라 선택합니다.

| 모드 | 언제 필요한가 |
| --- | --- |
| CustomNPCs 1.0.0 | 필수입니다. 서버와 모든 클라이언트에 설치합니다. |
| GeckoLib 4.8.4 이상 | GeckoLib NPC 모델과 애니메이션을 사용할 때 설치합니다. |
| Mod Menu | Minecraft 모드 목록에서 DRM의 `Mods Config` 화면을 열고 싶을 때 사용합니다. |
| FTB Quests | `ftb`, `ftb_task` 조건과 퀘스트/태스크 완료 액션을 사용할 때 필요합니다. |
| CobbleDollars | 설치된 애드온이나 서버 구성이 이 연동을 사용할 때만 필요합니다. DRM Core의 필수 의존성은 아닙니다. |

## 설치 절차

1. 클라이언트와 서버의 `mods` 폴더에 같은 `0.1.8` Fabric JAR을 넣습니다.
2. 같은 환경에 Fabric API를 설치합니다.
3. Fabric 1.21.1용 CustomNPCs 1.0.0을 서버와 클라이언트에 함께 설치합니다.
4. 월드나 서버를 한 번 실행해 `config/dochi_rpg_maker`를 생성합니다.
5. 크리에이티브 또는 권한 레벨 2 이상으로 `dochi_rpg_maker:dialogue_editor`를 준비합니다.

CustomNPCs가 설치되어 있으면 코어 아이템과 Remnant Msg Setter가 CustomNPCs 크리에이티브 탭에 추가됩니다. 탭에서 찾기 어렵다면 다음 명령으로 받을 수 있습니다.

```text
/give @s dochi_rpg_maker:dialogue_editor
/give @s dochi_rpg_maker:remnant_msg_setter
/give @s dochi_rpg_maker:npc_spawner
```

## 서버와 클라이언트 역할

| 위치 | 담당 |
| --- | --- |
| 서버 | JSON 저장, 권한 검사, NPC 바인딩, 텔레포터 세션/목적지, NPC Spawner 풀/리스, 조건/액션 실행, 상점 거래, 재고, 화폐 잔액, Remnant 마커 저장 |
| 클라이언트 | 에디터 화면, 검색 선택기, GUI Maker 미리보기, 대화/상점/텔레포터 런타임 화면, HUD 렌더링 |

멀티플레이에서는 서버의 `config/dochi_rpg_maker`가 기준입니다. 클라이언트에 같은 이름의 JSON을 따로 복사해도 서버 데이터가 바뀌지는 않습니다.

## 업데이트 전 백업

업데이트하기 전에 `config/dochi_rpg_maker`와 월드 저장 폴더를 함께 백업하세요. NPC에 직접 저장한 대화·상점 데이터, NPC Spawner 블록 상태와 리스, Remnant 마커 SavedData는 월드 쪽에 들어갑니다. Spawner 템플릿과 스냅샷은 `config/dochi_rpg_maker/npc_spawner` 아래에 있습니다.

기본 대화 세트, 기본 GUI, 샘플 상점, 기본 Teleporter Set, Remnant 샘플 메시지는 시작할 때 번들 기본본으로 다시 설치될 수 있습니다. 보호된 기본 파일을 직접 수정하지 말고 `Save As`로 새 이름을 만든 뒤 연결하세요.

## 개발 빌드

소스 프로젝트에서 빌드할 때는 Java 21로 다음 명령을 사용합니다.

```powershell
.\gradlew.bat clean build
```

완성 JAR은 `build/libs`에 생성됩니다.

:::warning 로더 혼합 금지
Fabric 서버에는 `fabric.mod.json`이 들어 있는 Fabric JAR만 사용합니다. `META-INF/mods.toml` 기반 Forge JAR을 같이 넣지 마세요.
:::
