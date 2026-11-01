---
title: DRM 관리자 도구
slug: drm-administration
order: 140
description: 플레이어 상태를 조회하고 권한 있는 변경을 수행하는 DRM Admin 사용법입니다.
product: core-fabric
category: 운영 / 레퍼런스
section: operations
status: 안정
version: 0.3.1
audience: 서버 운영자
tags:
  - admin
  - operations
---

## 먼저 서버에서 관리자 기능 켜기

처음 생성된 서버 설정은 DRM Admin이 **OFF**입니다. 운영자 권한이 있어도 이 상태에서 F7을 누르면 열리지 않습니다.

1. 월드나 서버에 접속한 상태에서 DRM Core로 허공을 우클릭합니다.
2. 에디터 목록 아래 **Default Configs → Admin**을 엽니다.
3. **Enable DRM Admin**을 켜고 **Apply**를 누릅니다.
4. **Saved and applied on the server** 응답을 확인합니다.
5. 설정을 닫고 **F7**을 누릅니다. 정책 변경에는 운영자 권한 레벨 2 이상이 필요합니다.

![서버의 DRM Admin을 켜고 Apply한 설정 화면.](assets/media/guides/drm-031-neo1211/admin-server-policy.png "DRM 0.3.1 / NeoForge 1.21.1. Enable DRM Admin은 서버 정책입니다. 실제 Apply 후 config/dochi_rpg_maker-admin.json의 enabled가 true로 저장됐고 서버 적용 응답을 받았습니다. 단축키 ON/OFF와 별개입니다.")

F7이 반응하지 않으면 **Keyboard shortcuts → Open DRM Admin**과 마인크래프트 키 설정도 확인합니다. 파일로 설정을 옮길 때 서버 정책은 `config/dochi_rpg_maker-admin.json`에 있으며 `config/dochi_rpg_maker/` 폴더 바깥입니다.

## 플레이어와 데이터 고르기

화면은 왼쪽부터 **Players → Data categories → Data list → Edit tools** 순서입니다. 먼저 플레이어 이름을 고르고, Tags·DRM Quests·Currency 같은 분류를 고릅니다. 목록의 행을 누르면 오른쪽에 상세 정보가 나옵니다.

![플레이어를 선택한 DRM Admin Overview.](assets/media/guides/drm-031-neo1211/admin-overview.png "DRM 0.3.1 / NeoForge 1.21.1. 촬영용 DocsGuide 한 명을 조회한 상태입니다. Factions·FTB Quests·Trainer battles·Stored data의 Unavailable은 이 환경에 해당 연동 모드가 없다는 뜻입니다.")

**체크박스는 변경할 대상**, 파란 선택 행은 지금 보는 상세 정보입니다. 삭제·초기화처럼 여러 항목에 적용하는 작업은 체크한 항목에 적용됩니다. 전체 선택 전에는 검색 결과와 대상 플레이어를 함께 확인합니다.

## 1회 보상 기록 확인하기

[1회 보상 대화](#core/dialogue-rewards)의 선물이 예상과 다르게 보이면 해당 플레이어의 **Tags**에서 `welcome_received`를 찾습니다. 태그가 있으면 이미 받은 조건에 해당합니다. 태그를 지워 재시험해도 이미 받은 사과는 회수되지 않습니다. 새 플레이어의 No data는 태그가 아직 없다는 뜻입니다. 오른쪽 Tag to add에 이름을 넣고 Add하면 추가합니다. 삭제하려면 목록에서 해당 태그를 체크합니다.

![관리자 화면에서 welcome_received를 추가하고 서버 확인을 받은 모습.](assets/media/guides/drm-031-neo1211/admin-tag-added.png "DRM 0.3.1 / NeoForge 1.21.1. Tag to add에 welcome_received를 넣고 Add한 결과입니다. 목록에 같은 태그가 나타났고 Server confirmed 응답과 실제 서버 플레이어 태그를 확인했습니다. 그림의 태그는 아직 체크되지 않아 Delete가 비활성입니다.")

## 초기화와 콘텐츠 편집 구분하기

| 원하는 작업 | 사용할 곳·영향 |
| --- | --- |
| 대사·상품·목표·보상 내용 변경 | 각 제작 에디터에서 파일 수정 후 적용 |
| 플레이어 태그·잔액·퀘스트 상태 확인 | DRM Admin에서 해당 플레이어와 분류 선택 |
| 퀘스트 초기화 | 진행 기록을 바꾸지만 이미 지급한 아이템·화폐는 자동 회수하지 않음 |
| FTB Quests 변경 | 팀 진행도에 연결될 수 있으므로 해당 팀 범위 확인 |
| DNPC 우호·적대 설정 | DNPC 관계 설정 사용. 여기의 CustomNPCs Factions와 다름 |

CustomNPCs의 Factions·Stored data는 지원되는 구형 Minecraft 연동입니다. 26.3에는 CustomNPCs가 없습니다.

## 0.2.8 관리자 변경

일괄 변경에는 진행 상태가 표시됩니다. Fabric·NeoForge에서는 호환 Cobblemon Editor가 등록한 트레이너 진행도와 승리 횟수 초기화도 사용할 수 있습니다. 애드온이 없으면 해당 기능이 자동으로 제공되지는 않습니다. 현재 애드온의 전투 횟수 초기화는 전투 후 숨김도 해제합니다. 대상 플레이어·NPC와 초기화 범위를 확인하세요.

## 트레이너 배틀 기록 삭제 — 0.2.9

Fabric·NeoForge 1.21.1의 호환 Cobblemon Editor와 함께 사용합니다. 트레이너 배틀에서 플레이어와 기록을 체크한 뒤 **배틀 기록 삭제**를 선택합니다.

- **배틀 횟수 초기화:** 보상 표식과 이력을 보존하는 기존 동작입니다.
- **배틀 기록 삭제:** 해당 플레이어의 해당 진행 기록 전체를 제거합니다. 횟수·마지막 결과·배틀 ID·지급 완료 표식·미지급 보상도 지워져 미지급 보상 소실과 이후 보상 재지급이 가능합니다.

확인 창에서 범위를 읽고 확정합니다. 진행 중 배틀이나 트레이너 예약이 있으면 거부합니다. 오프라인 대상은 기존 예약 처리로 반영합니다. 기록 삭제를 지원하지 않는 애드온에서는 이 버튼을 사용할 수 없습니다.

`Unknown trainer`나 ClearCount 0은 유실 판정이 아닙니다. NPC 미로드·이름/위치 정보 부재 또는 횟수 초기화 뒤 남은 이력일 수 있습니다. 자동 정리하지 않으며 영구 폐기한 진행 ID만 수동 검토합니다. NPC 엔티티나 트레이너 JSON을 삭제하는 기능은 아닙니다.
