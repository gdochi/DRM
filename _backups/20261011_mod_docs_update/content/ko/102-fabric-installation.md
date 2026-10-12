---
title: 설치 준비
slug: installation
order: 30
description: Fabric·NeoForge 1.21.1용 DRM 0.2.4의 설치 조건과 서버·클라이언트 역할입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.2.4
audience: 제작자 / 운영자
---

## 지원 환경

이 문서 묶음은 **Fabric·NeoForge 1.21.1용 DRM 0.2.4**를 함께 다룹니다. 두 로더의 제작 도구와 기본 사용 순서는 같습니다. 설치할 JAR과 의존성은 로더에 맞춰 선택합니다. Forge 1.20.1 문서는 별도 항목입니다.

| 항목 | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 정확히 `1.21.1` | 정확히 `1.21.1` |
| Java | `21` 이상 | `21` |
| 로더 | Fabric Loader `0.18.0` 이상, 현재 빌드 `0.19.3` | NeoForge `21.1` 이상, 현재 빌드 `21.1.216` |
| Fabric API | `0.116.11+1.21.1` 이상, 현재 빌드 `0.116.13+1.21.1` | 설치하지 않습니다. |
| CustomNPCs | Fabric `1.0.0`, 필수 | NeoForge `1.21.1` 호환 빌드, 필수 |
| DRM | `dochi_rpg_maker-0.2.4-fabric-1.21.1.jar` | `dochi_rpg_maker-0.2.4-neoforge-1.21.1.jar` |

모드 ID와 리소스 네임스페이스는 두 로더 모두 `dochi_rpg_maker`입니다. 서버와 모든 클라이언트에 같은 로더의 같은 버전 JAR을 설치합니다.

## 선택 연동 모드

| 모드 | 사용할 기능 |
| --- | --- |
| GeckoLib | GeckoLib NPC 모델과 애니메이션. Fabric은 `4.8.4` 이상, NeoForge는 `4.9` 이상인 해당 로더 빌드를 사용합니다. |
| Mod Menu | Fabric 모드 목록에서 DRM의 `Mods Config` 화면을 열 때 사용합니다. |
| Player Animator | NeoForge의 플레이어 애니메이션 공급자 연동에 사용하는 선택 모드입니다. |
| FTB Quests | `ftb`, `ftb_task` 조건과 FTB 퀘스트·태스크 완료 액션에 필요합니다. |
| CobbleDollars | 서버 콘텐츠나 애드온에서 CobbleDollars 결제를 선택했을 때 필요합니다. |
| Dochi Cobblemon Editor | 트레이너 배틀·포켓마트·치료·스타터 선택·트레이너 승리 퀘스트를 추가하는 별도 애드온입니다. |

CustomNPCs는 DRM의 필수 의존성입니다. 그 외 연동 모드는 사용할 기능에 맞춰 설치합니다. Cobblemon 콘텐츠는 [코블몬 에디터 설치](#drm-cobblemon-editor/cobblemon-editor-setup)를 따릅니다.

## 설치 절차

1. Minecraft 1.21.1 인스턴스를 만들고 Fabric 또는 NeoForge를 선택합니다.
2. 서버와 클라이언트의 `mods`에 같은 로더의 DRM 0.2.4와 CustomNPCs를 넣습니다. Fabric에는 Fabric API도 넣습니다.
3. 서버 또는 월드를 한 번 실행해 `config/dochi_rpg_maker`를 생성합니다.
4. 크리에이티브 또는 권한 레벨 2 이상으로 코어 아이템을 준비합니다.
5. 코어 아이템으로 에디터 선택 화면을 열고 필요한 제작 도구를 선택합니다.

CustomNPCs 크리에이티브 탭에서 아이템을 찾거나 다음 명령으로 받을 수 있습니다.

```text
/give @s dochi_rpg_maker:dialogue_editor
/give @s dochi_rpg_maker:remnant_msg_setter
/give @s dochi_rpg_maker:npc_spawner
```

## 서버와 클라이언트 역할

| 위치 | 담당 |
| --- | --- |
| 서버 | JSON 저장, 편집 권한, NPC 바인딩, 조건·액션, 상점 거래·재고, 화폐, 퀘스트 진행도, 스포너와 Remnant 마커 상태 |
| 클라이언트 | 제작 에디터, 검색 선택기, GUI Maker 미리보기, 플레이어 런타임 화면과 HUD |

멀티플레이에서는 **서버의** `config/dochi_rpg_maker`가 기준입니다. 클라이언트의 동명 JSON만 고쳐서는 서버 콘텐츠가 바뀌지 않습니다.

## 업데이트 전 백업

`config/dochi_rpg_maker`와 월드 저장 폴더를 함께 백업합니다. NPC 바인딩, 퀘스트 진행도, NPC Spawner의 블록 상태·리스, Remnant 마커는 월드 쪽에도 저장됩니다.

기본 대화·GUI·상점·텔레포터와 샘플은 시작 시 번들 기본본으로 다시 설치될 수 있습니다. 커스텀 콘텐츠는 `Save As`로 새 파일을 만들고 그 파일을 연결하세요.

0.2.4는 재입고 시간 기준을 전달하므로 서버와 모든 클라이언트를 함께 교체해야 합니다. 다른 로더의 JAR을 같은 인스턴스에 넣지 않습니다.
