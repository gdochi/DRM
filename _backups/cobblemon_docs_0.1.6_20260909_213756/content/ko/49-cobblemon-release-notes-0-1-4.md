---
title: Cobblemon Editor 0.1.4 변경 사항
slug: cobblemon-editor-release-0-1-4
order: 490
description: 0.1.3에서 0.1.4로 달라진 기능과 업데이트 전 확인 사항입니다.
product: drm-cobblemon-editor
category: 시작하기
section: overview
status: 안정
version: 0.1.4
audience: 제작자 / 운영자
tags:
  - release
  - changelog
---

## 한눈에 보기

0.1.4는 트레이너 난이도를 더 섬세하게 만들고, 플레이어 파티에 맞춰 레벨을 조절하며, 큰 목록을 훨씬 가볍게 다루는 업데이트입니다. 남아 있던 영문 UI도 대폭 한국어화했습니다.

## 전투 레벨 설정

- `Keep`, `Fixed`에 `Match player party average`가 추가되었습니다.
- 평균 맞춤은 플레이어의 현재 파티 평균 레벨에 -99~99 Offset을 더해 상대 파티의 목표 평균을 정합니다.
- 상대 파티 안에서 원래 설정한 포켓몬 사이의 레벨 차이는 가능한 한 유지합니다.
- Fixed는 상대만 맞추거나 플레이어와 상대의 배틀용 파티를 모두 맞출 수 있습니다.
- 실제 플레이어 포켓몬의 레벨은 바뀌지 않습니다.

## 더 세밀한 DRM 트레이너 AI

- AI를 `판단력`, `배틀 지식`, `공격 성향`, `방어 성향`, `변칙 성향`, `교체 성향` 여섯 값으로 각각 0–100까지 조절할 수 있습니다.
- `초보`, `표준`, `숙련`, `보스` 빠른 설정을 고른 뒤 세부 값을 다시 바꿀 수 있습니다.
- AI 배틀 프로필에서 난이도, 정보 활용, 성향, 교체 운용, 설정 일관성, 강점과 주의점을 바로 확인할 수 있습니다.
- 기존 AI Skill, Temperament, Knowledge가 들어 있는 문서는 가까운 새 설정으로 자동 변환됩니다.
- AI가 사용할 수 없는 행동을 선택해도 배틀이 멈추지 않고 서버 기본 행동으로 이어집니다.

## 트레이너 아이템 사용 기준

- `아이템 사용 안 함`, `아껴 쓰기`, `일찍 쓰기`, `직접 설정` 빠른 설정을 제공합니다.
- 아이템 사용 우선도, 회복을 시작할 HP, 강화 아이템을 쓸 마지막 턴을 직접 정할 수 있습니다.
- 기절 회복, 상태 회복, PP 회복 아이템의 허용 여부를 각각 선택할 수 있습니다.
- 이 설정은 `DRM Strategy`에 적용됩니다. RCT와 Cobblemon Strong은 각 엔진의 판단을 사용합니다.

## 에디터와 화면

- 코블몬 에디터 화면을 DRM Core와 같은 패널·상단바·버튼·입력칸 스타일로 정리했습니다.
- 포켓몬 정보, 아이템, 클론, RCT 가져오기, 연출 이미지처럼 항목이 많은 선택창에 검색과 페이지 이동을 추가했습니다.
- Battle Presentation 이미지 브라우저는 필요한 썸네일만 불러옵니다.
- PokéMart는 상품, 교환, 보유 포켓몬, 경매 매물, 판매 목록과 정산 항목을 서버에서 검색·페이지 단위로 가져옵니다.
- 기본 PokéMart와 Starter Selector GUI를 DRM 스프라이트 스타일로 갱신했습니다. 수정하지 않은 구형 기본 파일만 자동 교체하며, 사용자 GUI는 보존합니다.
- Cobblemon Editor에 남아 있던 영문 버튼, 안내와 오류 문구를 대폭 한국어화했습니다.

## 스타터 선택과 클론

- DRM Dialogue Editor에서 `go_starter_selector` 액션으로 스타터 선택 화면을 열 수 있습니다.
- 특정 Starter Selector JSON 또는 현재 NPC에 연결된 `bound` 문서를 선택할 수 있습니다.
- Clone Library가 서버 검색과 페이지 이동을 지원합니다.
- 같은 Clone ID를 저장할 때 덮어쓰기 확인창이 나타납니다.

## 많은 NPC를 사용하는 월드

- 전투 역할이 없는 NPC는 트레이너 감지에서 빠르게 제외합니다.
- 트레이너 감지 시점을 분산하고 경로 재계산과 원본 JSON 읽기를 줄였습니다.
- 클론, RCT 가져오기, 연출 이미지와 PokéMart 목록은 필요한 범위만 읽거나 전송합니다.

## 업데이트 전 확인

- 필수 DRM Core 버전은 `0.1.7` 이상입니다.
- 대상은 Minecraft `1.21.1`, Cobblemon `1.7.3 이상 1.8.0 미만`, CustomNPCs Fabric `1.0.0`입니다.
- JAR 이름은 `dochi_cobblemon_editor-0.1.4-fabric-1.21.1.jar`입니다.
- 내부 모드 ID와 리소스 네임스페이스는 기존 저장 데이터 호환을 위해 계속 `cobble_npc`입니다.
- Trainer/Pokemon Itself 문서 스키마는 `20`, Trainer Brain 스키마는 `4`입니다. 지원되는 구형 문서는 자동으로 읽습니다.
- 수정하지 않은 구형 기본 GUI는 교체 전에 `config/dochi_rpg_maker/cobblemon/_migration_backups/`에 백업됩니다.
