---
title: DRM 관리자 도구
slug: drm-administration
order: 140
description: 0.1.4 관리자 화면에서 플레이어 데이터를 조회하고 권한 있는 변경을 수행하는 방법입니다.
product: core
category: 운영 / 레퍼런스
section: operations
status: 안정
version: 0.1.6
audience: 서버 운영자
tags:
  - admin
  - operations
---

## 관리자 화면 열기

DRM Admin 기본 키는 `F7`입니다. 키바인드만으로 권한이 생기지는 않으며 서버가 요청을 다시 승인합니다.

권한이 있으면 플레이어 태그, DRM 퀘스트 상태, 선택적 FTB Quests 진행도, 발전과제, CustomNPCs 팩션 점수, CustomNPCs storeddata를 조회하고 변경할 수 있습니다. 표시되는 섹션은 설치된 연동 모드와 서버 정책에 따라 달라집니다.

## 안전 규칙

- 변경 전에 대상 플레이어를 다시 확인합니다.
- 파괴적이거나 부작용이 있는 작업은 확인 절차를 거칩니다.
- DRM 퀘스트 초기화는 이미 지급한 보상을 회수하지 않습니다.
- FTB Quests 진행도는 팀 단위일 수 있어 다른 팀원에게 영향을 줄 수 있습니다.
- 운영자 작업을 진단할 때 서버 로그와 감사 데이터를 보존합니다.

정의 제작은 각 에디터에서 하고, DRM Admin은 플레이어 상태 관리와 복구에만 사용하세요.

