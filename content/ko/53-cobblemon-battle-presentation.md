---
title: Battle Presentation Maker 기능 가이드
slug: cobblemon-battle-presentation
order: 530
description: 배틀 연출 메이커의 작업 영역, 데이터 제한, 미리보기와 저장·연결 흐름을 설명합니다.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: 0.1.0
audience: 전투 연출 제작자
tags:
  - presentation
  - editor
  - workflow
---

## 에디터가 하는 일

`Battle Presentation Maker`는 Cobblemon 배틀이 실제로 시작되기 전 재생할 전체 화면 연출을 만듭니다. 에디터 Canvas와 타임라인은 제작자용 미리보기이며, 월드의 플레이어나 NPC를 직접 이동시키지 않습니다.

실제 런타임 흐름은 다음과 같습니다.

1. 서버가 트레이너 조건과 플레이어 파티를 검사합니다.
2. NPC와 플레이어를 선택형 Battle Positioning 위치로 정렬합니다.
3. 서버가 저장된 연출 JSON, 상대 이름, 플레이어 선두 포켓몬의 볼 정보를 클라이언트에 보냅니다.
4. 클라이언트가 입력을 소비하는 비일시정지 전체 화면 연출을 재생합니다.
5. 연출 완료 또는 허용된 건너뛰기 결과를 서버에 돌려보냅니다.
6. 서버가 조건을 다시 검사하고 Round의 `Battle start delay` 뒤 Cobblemon 배틀을 시작합니다.

연출은 전투를 대신하지 않습니다. 연출이 성공해도 대상 NPC가 사라졌거나 조건·파티 검증에 실패하면 배틀은 취소됩니다.

## 네 개의 작업 영역

| 영역 | 조작 | 저장 결과 |
| --- | --- | --- |
| 왼쪽 Layers | Label, Texture, Color 추가·선택·삭제, 행 드래그 | 요소 목록과 Z 순서 |
| 중앙 Canvas | 현재 재생 틱 미리보기, 요소와 액터 직접 선택·이동 | 선택 요소의 시작/최종 위치 또는 액터 X/Y |
| 오른쪽 Inspector | `요소`, `모델`, `배경`, `오디오` 모드와 세부 탭 | 콘텐츠, 변환, 애니메이션, 액터, 사운드 설정 |
| 아래 Timeline | 재생, 일시정지, 다시 시작, 스크럽, 시작·종료 핸들 | 각 요소의 활성 구간 |

Player Model과 Opponent Model은 삭제할 수 없는 특수 액터 행입니다. 숨기려면 `선택 모델 렌더`를 끕니다. 사용자 요소는 행을 위아래로 드래그하면 Z값이 다시 계산되어 저장 순서와 미리보기 순서가 함께 바뀝니다.

## 문서 제한과 기본 좌표

| 항목 | 범위 |
| --- | ---: |
| Duration | 1–600틱, 최대 30초 |
| 요소 수 | 최대 64개 |
| 기본 Stage | 960×540 논리 좌표 |
| 요소 Width / Height | 1–3840 / 1–2160 |
| Z | -1000–1000 |
| Label Text | 최대 512자 |
| Font Size | 4–128 |
| Motion Scale | 0.01–20 |
| Motion Rotation | -3600–3600도 |
| Alpha / Image Opacity | 0–1 |

Stage 원점은 왼쪽 위이며 X는 오른쪽, Y는 아래로 증가합니다. 기본 중앙은 X 480, Y 270입니다. 런타임은 Stage를 현재 창에 투영하고 Canvas 밖은 Scissor로 잘라내므로, 화면 밖으로 나간 요소는 다른 GUI까지 침범하지 않습니다.

## Create New, Reset, Load, Save

| 작업 | 기능 |
| --- | --- |
| `Create New` | 안전한 새 연출 템플릿과 단계별 튜토리얼을 엽니다. |
| `Reset` | 현재 편집값을 기본 트레이너 연출로 되돌립니다. 저장되지 않은 변경은 사라집니다. |
| `Load` | `cobblemon/battle_presentations/` 아래의 다른 연출 파일로 편집 대상을 바꿉니다. |
| `Save` | 현재 파일 경로에 덮어씁니다. 아직 경로가 없으면 `Save As` 흐름을 사용합니다. |
| `Save As` | `custom/gym_intro.json` 같은 새 상대 경로에 저장합니다. `.json`을 생략하면 자동으로 붙습니다. |

Name은 JSON 내부 표시 이름이고 트레이너가 참조하는 값은 `Save As` 파일 경로입니다. 이름만 같게 만든 파일은 자동 연결되지 않습니다.

## 제작 순서

1. Duration과 `Skippable`을 먼저 정합니다.
2. World Background와 Stage Image를 정합니다.
3. 큰 Color Layer로 화면 구도를 만듭니다.
4. Player/Opponent 액터 위치와 Z를 정합니다.
5. Label과 Texture 내용을 채웁니다.
6. Start/End Tick과 Fade를 맞춥니다.
7. 시작 위치·크기·회전과 Easing으로 움직임을 만듭니다.
8. Intro/Battle Audio를 설정하고 전체 재생합니다.
9. `Save As`로 저장한 뒤 Cobblemon Editor의 Battle Presentation 경로에 선택합니다.
10. 트레이너 파일을 저장하고 NPC에 다시 `Apply`합니다.

에디터 미리보기와 런타임은 같은 렌더러를 사용하지만, 실제 플레이어 스킨·대상 NPC·창 비율·사운드 리소스는 런타임에서만 최종 확인할 수 있습니다.
