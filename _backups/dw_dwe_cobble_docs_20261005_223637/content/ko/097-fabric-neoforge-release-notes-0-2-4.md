---
title: Fabric·NeoForge 0.2.4 업데이트
slug: release-notes-0-2-4
order: 7
description: Fabric·NeoForge 공용 제작 흐름, 재입고 시간 기준과 GUI 타일 설정입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.2.4
audience: 제작자 / 운영자
---

## 공용 문서와 설치

Minecraft 1.21.1용 **Fabric·NeoForge DRM 0.2.4**를 같은 문서에서 안내합니다. 두 로더의 제작 도구와 기본 사용 순서는 같으며 설치할 JAR·의존성은 로더에 맞춥니다. [설치 준비](#core-fabric/installation)에서 선택하세요.

## NPC Shop

상품 상세의 `RESTOCK > Timer basis`에서 `Real ticks` 또는 `World ticks`를 선택합니다. 상점 전체가 같은 기준을 사용합니다. Real ticks는 실제 진행한 게임 틱, World ticks는 잠으로 건너뛴 시간을 포함한 월드 시간입니다.

시간 기준 변경이나 시간 역행 시 남은 대기시간을 보정합니다. 파일 기반 상점의 실행 재고·재입고 상태는 기존 JSON 저장 방식을 유지합니다. [NPC Shop](#core-fabric/shop-system)을 확인하세요.

## GUI Maker

- 스프라이트 Tile/Stretch와 `Sprite Scale %` 직접 입력, 50–400%.
- `Fit: Tile`의 컴포넌트별 `Tile W %`·`H %`, 각 10–800%.
- 미리보기와 실제 대화 화면의 Tile 설정 연결과 반복 이미지 표시 개선.

[GUI Maker](#core-fabric/gui-system)에서 설정을 확인하세요. 타일 가로·세로는 글로벌 기본 UI가 아닌 개별 컴포넌트에 저장합니다.

## 퀘스트와 애드온

현재 두 로더의 Quest Editor에서 만드는 퀘스트는 자동 완료를 사용합니다. 트레이너 승리 목표는 해당 로더의 Dochi Cobblemon Editor를 추가해 제작합니다. [퀘스트](#core-fabric/quest-system)와 [트레이너 승리 퀘스트](#drm-cobblemon-editor/cobblemon-trainer-quests)를 확인하세요.

업데이트 전 `config/dochi_rpg_maker`와 월드를 함께 백업하고 서버와 모든 클라이언트에 같은 로더의 0.2.4를 설치합니다. 보호된 기본 파일의 커스텀 버전은 `Save As`로 만듭니다.
