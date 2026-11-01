---
title: 0.2.9에서 달라진 점
slug: cobblemon-editor-current-update
order: 480
description: 순차 보상·DNPC 역할·트레이너 이동의 변경 사항입니다.
product: drm-cobblemon-editor
category: 시작하기
section: overview
status: 안정
version: Fabric / NeoForge 0.2.9
audience: 제작자 / 운영자
---

## 대화를 마친 뒤 보상 지급

배틀 후 액션의 **Sequential / 순차 실행**을 쓰면 대화가 끝난 다음에 보상을 줍니다. 취소·접속 종료 뒤에는 남은 액션을 다음 상호작용에서 이어갈 수 있습니다.

라운드당 대화 액션은 한 개입니다. [설정 순서](#drm-cobblemon-editor/cobblemon-trainer-editor)를 확인하세요.

## DNPC로 만들 수 있는 역할

트레이너 외에 Pokemon Itself, 포켓몬 외형, PokéMart, Nurse Joy, Starter Selector를 DNPC에 적용할 수 있습니다. 클론·스포너·배틀 스케줄러에도 연결합니다.

DNPC의 **위치 고정**을 켠 채 트레이너가 대시하고 돌아오도록 개선했습니다. 이동 중단 후 속도가 남거나 대화 취소 뒤 복귀하지 못하던 문제도 수정했습니다.

## 이전 업데이트의 주요 기능

0.2.7의 배틀 AI 개선, 전체 기술 선택과 Cobblemon 1.8.4 대응을 포함합니다. 메가진화 등 추가 기믹에는 해당 모드와 키 아이템이 필요합니다.

## 업데이트할 파일

Minecraft 1.21.1의 Fabric·NeoForge용입니다. 이 기능을 함께 사용할 때는 해당 로더의 DRM Core·DNPC·Cobblemon Editor 최신 수정본을 함께 교체합니다. [설치 안내](#drm-cobblemon-editor/cobblemon-editor-setup)에서 필요한 모드를 확인하세요.
