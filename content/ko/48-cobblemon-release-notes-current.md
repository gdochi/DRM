---
title: Fabric 0.2.2 · NeoForge 0.2.1 업데이트
slug: cobblemon-editor-current-update
order: 480
description: 배틀 연출 적용, 파티 모델, 새 프리셋, 커스텀 보상과 포기 결과 처리입니다.
product: drm-cobblemon-editor
category: 시작하기
section: overview
status: 안정
version: Fabric 0.2.2 / NeoForge 0.2.1
audience: 제작자 / 운영자
---

## 현재 설치 기준

Minecraft 1.21.1 · Java 21에서 **Fabric 0.2.2 / NeoForge 0.2.1**을 사용합니다. 필수 연동은 같은 로더의 DRM Core, CustomNPCs와 Cobblemon입니다. 현재 DRM은 0.2.4이며 애드온의 선언된 최소 DRM은 0.2.2입니다. Cobblemon 범위는 1.7.3 이상 1.9.0 미만입니다.

RCT API와 CobbleDollars는 선택 연동입니다. [설치와 첫 적용](#drm-cobblemon-editor/cobblemon-editor-setup)에서 로더별 요구 조건을 확인하세요.

## 일반 인벤토리

- `Items`와 `My Inventory`에서 아이템을 선택합니다. 실제 플레이어 스택은 소비하지 않고 복사합니다.
- NBT·컴포넌트를 저장하고 수량 변경 뒤에도 유지합니다. 같은 ID의 서로 다른 커스텀 아이템을 구분합니다.
- 일반 인벤토리는 기믹 키 보유 검사에 사용하며 라운드 AI 배틀 가방과 별도입니다.
- Trainer 스키마는 `23`을 유지합니다.

[AI·파티·아이템](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items)에서 제작 순서를 확인하세요.

## 결제와 공용 탐색

PokéMart의 DRM 화폐·아이템 결제는 Core의 결제 서비스를 사용합니다. 잘못된 결제 설정이나 Core 금액 범위를 넘는 거래를 거부합니다. CobbleDollars를 선택한 경우 해당 공급자의 잔액을 사용합니다.

코어와 애드온 에디터의 공용 뒤로·앞으로 화살표로 방문한 화면을 이동합니다. 이동 기록이 없으면 아이콘이 비활성화됩니다. 파일 저장과 NPC Apply는 각각 따로 수행합니다.

## 트레이너 승리 퀘스트와 업데이트

트레이너 문서와 Quest Editor 목표에 같은 Trainer ID를 연결합니다. 이름이나 파일명만 맞춰서는 집계되지 않습니다. [트레이너 승리 퀘스트](#drm-cobblemon-editor/cobblemon-trainer-quests)를 확인하세요.

`config/dochi_rpg_maker`와 월드를 함께 백업하고 서버·클라이언트에 같은 로더의 같은 애드온 버전을 설치합니다. 기존 0.1.6 변경 기록은 당시 릴리스 안내로 보존합니다.

## 0.2.2 / 0.2.1 추가사항

- [야생·RCT·PvP 연출 적용](#drm-cobblemon-editor/cobblemon-encounter-presentations): 종류별 글로벌 스위치와 JSON 연결, 야생 종류·RCT UUID 예외, 2인 PvP 양쪽 시점을 설정합니다.
- [배틀 연출](#drm-cobblemon-editor/cobblemon-battle-presentation): 양쪽 파티 6슬롯, 슬롯별 Motion, 모델 크기 보정과 카메라 키프레임, 일반·보스·전설·파티 기본 연출을 추가했습니다. 문서 스키마는 5입니다.
- 애프터 액션 아이템 찾기에 `내 인벤토리` 복사가 추가되었습니다. 이름·인챈트·총기 데이터 등 스택 컴포넌트를 보존하고 지급 수량은 액션 설정을 따릅니다.
- 트레이너 배틀 포기는 `flee`, 일반 패배는 `loss`로 구분합니다. 포기 입력만으로 보상을 지급하지 않고 실제 배틀 결과가 확정된 뒤 처리합니다.
- 연출 Load 목록을 반복 요청해 `rate limited`가 발생하던 문제를 수정했습니다.
