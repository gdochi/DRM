---
title: Cobblemon Editor 0.1.6 변경 사항
slug: cobblemon-editor-release-0-1-6
order: 490
description: 0.1.6의 배틀 룰, 호환성, 에디터와 런타임 수정 내용입니다.
product: drm-cobblemon-editor
category: 시작하기
section: overview
status: 안정
version: 0.1.6
audience: 제작자 / 운영자
tags:
  - release
  - changelog
---

## 한눈에 보기

0.1.6은 배틀 설정을 공통/라운드별 룰로 재구성하고, Cobblemon 1.7.3과 1.8.0을 하나의 JAR로 지원합니다. 트레이너 사운드, 습득 가능 기술 목록, 아이템 제한, 광역기 AI 평가와 에디터 탐색도 현재 구현에 맞게 보완되었습니다.

## 설치·호환성

- Minecraft 1.21.1, Java 21, Fabric Loader 0.17.2+, Fabric API 0.116.6+1.21.1+
- 필수: DRM Core 0.1.9+, Cobblemon 1.7.3 이상 1.9.0 미만, CustomNPCs Fabric 1.0.0
- 선택: CobbleDollars, RCT API 0.15.1-beta+, FTB Quests, Mega Showdown 등 기능별 연동 모드
- JAR: `dochi_cobblemon_editor-0.1.6-fabric-1.21.1.jar`

RCT API는 필수 의존성이 아닙니다. 미설치·호출 오류 시 애드온 경계에서 안전한 AI로 대체합니다. 서버와 모든 클라이언트의 0.1.6 JAR을 같이 교체하세요.

## 라운드 중심 배틀 룰

- 배틀 룰 진입점을 `General`에서 `Rounds`로 옮겼습니다.
- `공통 규칙`과 1–16 라운드를 직접 선택하며, 각 라운드는 상속 또는 개별 덮어쓰기를 사용합니다.
- 형식: Singles, Doubles, Triples, Lead Duel
- 레벨: 원본 유지, 플레이어 파티 평균+오프셋, 고정 레벨과 적용 범위
- 아이템: 사용/지닌물건 허용, 금지 목록, 횟수 제한, 최소 턴, HP 상한
- 포켓몬·기믹: 전설 금지, 선봉 선택, Mega/Tera/Dynamax 허용

아이템 목록은 이름·ID 검색과 모드 필터를 제공하며, 행을 누르면 즉시 금지/허용이 바뀌어 ID를 외울 필요가 없습니다. 배틀 아이템, 부활, 포획 아이템은 소비 전에 서버가 규칙을 다시 검사하고, 크리에이티브도 횟수 제한을 따릅니다.

Lead Duel은 양쪽 선봉 한 마리로 시작하는 Singles이며 원본 파티를 삭제하지 않습니다. NPC 기믹 장비와 배틀 룰은 별개입니다. 장비가 있어도 해당 룰에서 금지하면 발동하지 않습니다.

## 배틀 사운드

트레이너의 남은 포켓몬 수 1–6에 맞춰 사운드를 배틀당 한 번 재생할 수 있습니다. 공통 규칙을 만들고 라운드별로 상속·개별·끄기를 선택합니다. 사운드 ID 검색, 미리듣기, 볼륨 0–4, 피치 0.05–4, 재생 전 배틀 오디오 정지 옵션을 제공합니다.

## 포켓몬·AI·에디터 수정

- 기술 선택창은 서버가 해석한 종·폼·Aspects의 습득 가능 목록만 표시합니다.
- 지정한 1–4개 기술의 개수와 순서를 실제 전투와 미리보기에서 그대로 유지합니다.
- DRM AI가 지진·스톤샤워 같은 광역/자동 대상 기술의 상성, 피해, STAB, 아군 피해를 평가합니다.
- 배틀/일반 인벤토리의 검색·페이지·리사이즈 중 입력 보존, 긴 기술 이름, 미리보기, 버튼 활성 상태를 수정했습니다.
- 공통 Back/Forward 화살표와 호버 도움말을 DRM Core 0.1.9의 공유 이력·UI API에 맞춰 적용했습니다.

## 데이터 규약

- Trainer JSON 스키마: `22`
- Pokemon Itself JSON 스키마: `8`
- Trainer Brain 스키마: `4`
- 내부 모드 ID와 리소스 네임스페이스: `cobble_npc`

지원되는 구형 JSON/NBT는 현재 필드로 보정합니다. 업데이트 전에 `config/dochi_rpg_maker/cobblemon/`과 월드를 함께 백업하세요.
