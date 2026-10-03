---
title: 에셋, 모델, 애니메이션 메타데이터
slug: assets-models
order: 130
description: 서버 PNG 에셋, 피커 필터, mcmeta 애니메이션, NPC 모델/애니메이션 공급자를 설명합니다.
product: core
category: 월드와 NPC 도구
section: world-tools
status: 안정
version: 0.1.6
audience: GUI / NPC 제작자
tags:
  - assets
  - geckolib
  - animation
---

## 서버 에셋 루트

제작자 PNG는 `config/dochi_rpg_maker/assets/textures/` 아래에 둡니다. 서버가 안전한 상대 경로를 카탈로그로 만들고 선택한 런타임 데이터를 클라이언트에 전송합니다. PNG 제한은 파일당 8 MiB, 한 변 4096픽셀, 전체 1600만 픽셀입니다.

## 에셋 피커 정책

- Search는 리소스 경로를 검색합니다.
- 모드/네임스페이스와 첫 상위 폴더 필터는 복수 선택 체크박스입니다.
- 페이지 이동만으로 텍스처를 적용하지 않습니다.
- 행을 선택하고 미리보기를 확인한 뒤 `Apply`를 누릅니다.
- 리스트 미리보기 표면 위에 대상 텍스처를 렌더하며 일반 아이템 슬롯 플레이스홀더를 덮지 않습니다.

## 애니메이션 PNG 메타데이터

`priestall.png` 옆에는 `priestall.png.mcmeta` 이름으로 메타데이터를 둡니다. 0.1.4는 표준 `animation` 객체의 프레임 너비/높이, `frametime`, 명시적 `frames`, 프레임별 시간, `interpolate`를 읽습니다.

올바르고 제한 안에 있는 메타데이터만 사용합니다. 크기는 최대 16 KiB, 애니메이션 프레임은 최대 4096개입니다. 잘못됐거나 에셋 루트 밖으로 벗어난 동반 파일은 안전하게 무시합니다.

## NPC 모델과 애니메이션

NPC Basic은 설치 상태에 따라 GeckoLib, 모드 엔티티, Player Animator, Better Combat 표시 공급자를 지원합니다. 동작 바인딩은 idle, walk, sprint, attack, hurt, death를 제공하고 loop/once/hold-last 재생을 설정할 수 있습니다.

번들 Gecko 예제는 템플릿으로만 사용하세요. 커스텀 모델, 애니메이션, 텍스처, 메타데이터 경로를 함께 관리하고 필요한 클라이언트 모드 조합마다 최종 NPC를 테스트하세요.

