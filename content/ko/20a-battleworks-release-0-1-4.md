---
title: BattleWorks 0.1.4 업데이트
slug: battleworks-release-0-1-4
order: 211
description: Forge·NeoForge 현재 빌드와 NPC 모델·스킬·제작 도구 안내입니다.
product: mob-editor
category: BattleWorks
section: start
status: 사용 안내
version: 0.1.4
audience: 전투 콘텐츠 제작자
---

## 현재 빌드

BattleWorks **0.1.4**는 Forge 1.20.1과 NeoForge 1.21.1을 지원합니다. CustomNPCs와 같은 로더의 DRM이 필수이며 현재 Core는 각각 0.2.2와 0.2.5입니다. 서버·클라이언트의 실제 빌드를 함께 맞추세요.

## 현재 제작 흐름

- NPC 모델·외부 텍스처는 DRM NPC Basic에서 준비하며 Hitbox Library와 패턴 미리보기에서 사용합니다.
- 패턴은 Windup·Action·Recovery의 선택한 트랙에 액션을 추가해 제작합니다. 스킬 선택기는 설치·등록된 제공자의 지원 스킬을 보여 줍니다.
- 편집 미리보기는 실제 전투를 대신하지 않습니다. 이동·애니메이션·히트박스를 확인한 뒤 월드에서 타겟·충돌·외부 스킬을 시험합니다.

[설치와 NPC 준비](#mob-editor/mob-editor-setup), [첫 공격](#mob-editor/battleworks-first-attack), [스킬과 효과](#mob-editor/battleworks-skills-effects)를 이어서 확인하세요. 전투 JSON 스키마는 `dochi.battleworks.v1`을 유지합니다.
