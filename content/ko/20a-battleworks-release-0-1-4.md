---
title: BattleWorks 0.1.4 업데이트
slug: battleworks-release-0-1-4
order: 211
description: 0.1.4의 제작 흐름 기록과 현재 설치·첫 공격 안내입니다.
product: mob-editor
category: BattleWorks
section: start
status: 사용 안내
version: 0.1.4
audience: 전투 콘텐츠 제작자
---

## 0.1.4 기록과 현재 안내

이 페이지는 **0.1.4 당시의 제작 흐름 기록**입니다. 현재 확인한 BattleWorks는 0.1.6이며 설치 파일과 NPC 준비는 [현재 설치 안내](#mob-editor/mob-editor-setup)를 따릅니다. DNPC를 사용할 수 있는 현재 버전에 과거의 CustomNPCs 필수 조건을 적용하지 않습니다.

![현재 BattleWorks에서 첫 베기를 저장한 화면.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1 영문 화면입니다. 패턴을 만들고 별도 파일로 저장하는 흐름을 보여 주는 현재 예시이며 0.1.4 당시 촬영본은 아닙니다.")

## 당시 제작 흐름에서 이어지는 작업

- NPC 모델·외부 텍스처는 DRM NPC Basic에서 준비하며 Hitbox Library와 패턴 미리보기에서 사용합니다.
- 패턴은 Windup·Action·Recovery의 선택한 트랙에 액션을 추가해 제작합니다. 스킬 선택기는 설치·등록된 제공자의 지원 스킬을 보여 줍니다.
- 편집 미리보기는 실제 전투를 대신하지 않습니다. 이동·애니메이션·히트박스를 확인한 뒤 월드에서 타겟·충돌·외부 스킬을 시험합니다.

[설치와 NPC 준비](#mob-editor/mob-editor-setup), [첫 공격](#mob-editor/battleworks-first-attack), [스킬과 효과](#mob-editor/battleworks-skills-effects)를 이어서 확인하세요. 전투 JSON 스키마는 `dochi.battleworks.v1`을 유지합니다.
