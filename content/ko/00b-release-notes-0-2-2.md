---
title: Forge 0.2.2 업데이트
slug: release-0-2-2
order: 6
description: 에디터 즐겨찾기와 외부 PNG·NPC 모델 텍스처 연결 개선입니다.
product: core
category: 시작하기
section: getting-started
status: 사용 안내
version: 0.2.2
audience: 제작자 / 운영자
---

## 현재 설치 기준

Minecraft 1.20.1 / Forge / Java 17용 DRM Core는 **0.2.2**입니다. Fabric·NeoForge 1.21.1의 현재 Core는 0.2.5이며 해당 로더 JAR을 선택합니다. 서버와 클라이언트를 함께 교체하고 설정·월드를 백업하세요.

## 에디터 즐겨찾기

에디터 목록의 ☆/★로 자주 쓰는 도구를 등록·해제합니다. 즐겨찾기 분류와 목록 상단에서 다시 찾을 수 있습니다. 설정은 해당 게임 인스턴스의 `config/dochi_rpg_maker/editor_favorites.json`에 저장되며 서버 문서나 NPC 적용 설정을 바꾸지 않습니다.

## 외부 이미지와 NPC 텍스처

DRM 서버 에셋의 PNG와 리소스팩 텍스처를 구분해 해석하며 다운로드·로드 중에는 기본 텍스처를 사용합니다. GUI 이미지와 Gecko NPC 모델의 서버 PNG 연결을 개선했습니다. 외부 이미지는 `config/dochi_rpg_maker/assets/textures/` 아래에 저장하고 `dochi_rpg_maker:textures/...png`로 연결합니다.

## 새 지도 애드온

[MapIcon Integration 0.1.0](#dochi-mapicon-integration/mapicon-setup)은 별도 설치하는 DRM 애드온입니다. Xaero 지도 아이콘을 JSON 타입·파일·NPC별로 설정하며 Core만 설치해서 지도 아이콘 기능이 생기지는 않습니다.

기존 [0.2.1 변경 기록](#core/release-0-2-1)은 NPC Shop 재고와 GUI 타일 설정의 당시 안내로 보존합니다.
