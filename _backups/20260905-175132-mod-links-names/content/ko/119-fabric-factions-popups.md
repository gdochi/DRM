---
title: 팩션과 팝업
slug: factions-popups
order: 120
description: CustomNPCs 팩션 표시와 재사용 가능한 화면 팝업을 만드는 방법입니다.
product: core-fabric
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.1.8
audience: 월드 / NPC 제작자
tags:
  - faction
  - popup
---

## Faction Editor

팩션 표시 설정은 `config/dochi_rpg_maker/factions/settings.json`에 저장됩니다. CustomNPCs의 기존 팩션 ID와 플레이어 점수는 그대로 두고, DRM에서 다음 표시 정보를 덧붙입니다.

- 표시 순서와 카테고리
- 이름, 설명, 아이콘, 배너
- 관계 상태별 이름과 색상
- 공개 여부와 상세 화면 GUI

플레이어는 기본 키 `J`로 Faction Overview를 엽니다. 점수가 이상하면 DRM 표시 설정보다 먼저 CustomNPCs의 팩션과 플레이어 점수를 확인하세요.

## Popup Maker

팝업은 화면에 잠깐 나타나는 공지, 지역 이름, 퀘스트 알림 같은 연출입니다.

| 데이터 | 저장 위치 |
| --- | --- |
| 팝업 정의 | `config/dochi_rpg_maker/popups/definitions/` |
| 표시 정책 | `config/dochi_rpg_maker/popups/policies/` |
| 팝업 GUI | `config/dochi_rpg_maker/gui/` |

Popup Maker에서는 제목, 부제, 본문, 이미지, 사운드, 페이드, 유지 시간, 우선순위와 겹침 동작을 정합니다. GUI Maker의 `popup` 타입에서는 실제 화면 배치를 바꿉니다.

팝업은 `/drm popup` 명령이나 CustomNPCs 스크립트의 `drmPopup`으로 표시할 수 있습니다. 공개 서버에서는 정책 파일의 동시 표시 수, 대기 수, 글자 수와 시간 제한을 적절히 두세요.
