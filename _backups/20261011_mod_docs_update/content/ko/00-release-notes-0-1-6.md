---
title: 0.1.6 업데이트
slug: release-0-1-6
order: 9
description: 에디터 공통 개선, 호버 도움말, 플레이어 머리 HUD와 렌더링 수정 사항입니다.
product: core
category: 시작하기
section: getting-started
status: Stable
version: 0.1.6
audience: 제작자 / 운영자
tags:
  - release
  - migration
---

Minecraft 1.20.1 · Forge

## 변경

- 에디터 상단 메뉴와 화면 이동 UI를 통일했습니다.
- 설정 화면과 여러 편집기의 UI 및 사용성을 개선했습니다.
- 아이템 툴팁 모델 렌더링과 NPC GeckoLib 애니메이션 처리를 개선했습니다.

## 추가

- 에디터 공통 호버 도움말을 추가했습니다.
- 플레이어 머리 HUD 컴포넌트를 추가했습니다.
- 팝업 레이아웃, 화면 잘라내기와 JSON 목록 요청 상태 관리 기능을 추가했습니다.

## 수정

- TaCZ 총기 툴팁의 렌더링, 버퍼와 스텐실 문제를 수정했습니다.
- NPC 모델 미리보기와 애니메이션 동기화 문제를 수정했습니다.
- 에디터 화면의 배치, 선택과 표시 관련 문제를 수정했습니다.

서버와 클라이언트를 모두 **0.1.6**으로 맞추고, 모드 JAR을 교체하기 전에 `config/dochi_rpg_maker`를 백업하세요.
