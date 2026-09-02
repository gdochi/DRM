---
title: Fabric 0.1.8 업데이트
slug: release-notes-0-1-8
order: 10
description: 공개 버전 0.1.7 이후 Fabric 0.1.8에 추가된 핵심 기능과 업데이트 전 확인 사항입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.1.8
audience: 사용자 / 제작자 / 운영자
tags:
  - release
  - changelog
---

0.1.8은 0.1.7의 대화·상점·텔레포터·NPC Spawner 제작 도구 위에 퀘스트, 팩션, 팝업, 관리자 도구와 확장된 에셋·NPC 연출 기능을 더한 대규모 업데이트입니다.

## 한눈에 보는 새 기능

| 새 기능 | 할 수 있는 일 | 여는 방법 |
| --- | --- | --- |
| Quest Editor | 목표, 선행 조건, 보상, 반복 규칙, NPC 대화 연동이 있는 퀘스트 팩 제작 | 코어 아이템의 에디터 선택 화면 |
| Quest Journal | 진행 중이거나 완료 가능한 퀘스트 검색·추적·수락·제출 | 기본 키 `U` |
| Faction Editor | CustomNPCs 팩션에 이름, 아이콘, 설명, 카테고리, 관계 상태 표시 추가 | 코어 아이템의 에디터 선택 화면 |
| Faction Overview | 플레이어의 팩션 점수와 관계를 한 화면에서 확인 | 기본 키 `J` |
| Popup Maker | 제목, 본문, 이미지, 사운드, 표시 시간과 우선순위를 가진 알림 제작 | 코어 아이템의 에디터 선택 화면 |
| DRM Admin | 플레이어 태그, 화폐, 퀘스트, 발전과제, 팩션 점수와 저장 데이터를 관리 | 권한이 있는 운영자가 `F7` |

## 제작 화면과 NPC 연출

- 에디터 상단바, 패널, 목록, 정렬, 입력 포커스가 더 일관되고 보기 쉽게 바뀌었습니다.
- `config/dochi_rpg_maker/assets/textures`의 PNG를 검색·필터·미리보기로 고를 수 있습니다.
- PNG 옆에 `.png.mcmeta`를 두어 움직이는 텍스처를 사용할 수 있습니다.
- NPC Basic에서 텍스처, 모델, 애니메이션, 미리보기 카메라와 히트박스를 더 세밀하게 다룰 수 있습니다.
- GeckoLib을 설치하면 커스텀 NPC 모델·애니메이션과 대화 액션 연출을 사용할 수 있습니다.

## 기존 기능의 변화

- 화폐에 실제 아이템 형태와 아이템 1개당 가치를 설정할 수 있습니다.
- HUD에서 CustomNPCs의 storeddata와 tempdata 값을 표시할 수 있습니다.
- Teleporter는 페이드 전후와 이동 전후의 원하는 시점에 명령을 실행할 수 있습니다.
- 대화, 상점, NPC Apply, NPC Spawner, Remnant Msg의 검색·스크롤·입력·미리보기 오류를 다듬었습니다.
- 큰 에셋 목록과 편집 화면에서 반복 로딩을 줄여 조작이 더 부드러워졌습니다.

## 업데이트 전에 확인

:::warning CustomNPCs가 필수로 변경되었습니다
0.1.8은 CustomNPCs `1.0.0`을 필수로 사용합니다. 서버와 모든 접속 클라이언트에 DRM 0.1.8, Fabric API, CustomNPCs를 함께 설치하세요.
:::

GeckoLib, FTB Quests, Mod Menu, CobbleDollars는 선택 연동입니다. 업데이트 전에는 월드와 `config/dochi_rpg_maker`를 백업하세요.
