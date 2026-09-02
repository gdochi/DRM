---
title: DRM 관리자 도구
slug: drm-administration
order: 140
description: 플레이어 상태를 조회하고 권한 있는 변경을 수행하는 DRM Admin 사용법입니다.
product: core-fabric
category: 운영 / 레퍼런스
section: operations
status: 안정
version: 0.1.8
audience: 서버 운영자
tags:
  - admin
  - operations
---

## 관리자 화면 열기

기본 키는 `F7`입니다. 키를 누르는 것만으로 권한이 생기지는 않으며, 서버가 실제 권한을 확인한 뒤 화면을 엽니다.

권한이 있으면 다음 플레이어 상태를 조회하거나 바꿀 수 있습니다.

- 태그와 DRM 화폐
- DRM 퀘스트 상태
- 발전과제
- CustomNPCs 팩션 점수와 storeddata
- FTB Quests 진행도(FTB Quests 설치 시)

사용할 수 없는 연동 모드의 항목은 비활성으로 표시됩니다.

## 운영할 때

- 변경 전에 대상 플레이어를 다시 확인하세요.
- 초기화나 완료 처리처럼 영향이 큰 작업은 확인 창의 내용을 읽으세요.
- 퀘스트를 초기화해도 이미 지급한 보상은 자동 회수되지 않습니다.
- FTB Quests 진행도는 팀에 묶여 있을 수 있습니다.

정의나 콘텐츠 제작은 각 에디터에서 하고, DRM Admin은 플레이어 상태 확인과 복구에 사용하세요.
