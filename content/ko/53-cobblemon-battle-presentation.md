---
title: 배틀 연출
slug: cobblemon-battle-presentation
order: 530
description: Battle Presentation Maker의 화면과 제작 방법입니다.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: 0.1.6
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
5. 정상 재생에서는 서버가 `Duration + 현재 Round의 Battle start delay`가 지난 시각까지 기다립니다.
6. 서버가 거리·선두 포켓몬·조건을 다시 검사하고 Cobblemon 배틀을 시작합니다.

`Skippable` 연출을 건너뛰면 서버는 남은 Duration과 Round의 시작 지연을 모두 기다리지 않고 즉시 마지막 검사를 수행합니다.

연출은 전투를 대신하지 않습니다. 연출이 성공해도 대상 NPC가 사라졌거나 조건·파티 검증에 실패하면 배틀은 취소됩니다.

## 네 개의 작업 영역

| 영역 | 조작 | 저장 결과 |
| --- | --- | --- |
| 왼쪽 Layers | Label, Texture, Color 추가·선택·삭제, 행 드래그 | 요소 목록과 Z 순서 |
| 중앙 Canvas | 현재 재생 틱 미리보기, 요소와 액터 직접 선택·이동 | 선택 요소의 시작/최종 위치 또는 액터 X/Y |
| 오른쪽 Inspector | `요소`, `모델`, `배경`, `오디오` 모드와 세부 탭 | 콘텐츠, 변환, 애니메이션, 액터, 사운드 설정 |
| 아래 Timeline | 재생, 일시정지, 다시 시작, 스크럽, 시작·종료 핸들 | 각 요소의 활성 구간 |

Player Model과 Opponent Model은 삭제할 수 없는 특수 액터 행입니다. 숨기려면 `선택 모델 렌더`를 끕니다. 사용자 요소는 행을 위아래로 드래그하면 Z값이 다시 계산되어 저장 순서와 미리보기 순서가 함께 바뀝니다.

## Inspector 모드

| 모드 | 하위 탭·대상 | 편집 기능 |
| --- | --- | --- |
| `Element` | `Layout`, `Content`, `Animation` | 선택 레이어의 위치·크기·Z, 글자·이미지·색, 활성 구간·Fade·From/To·Easing |
| `Actors` | Player/Opponent, `Transform`/`Pose` | 모델 표시, 타입, 위치, 크기, 회전, Z, 사람형 관절 자세 |
| `Background` | World Background, Stage Image | 화면 어둡힘, Fade, 배경 이미지, Opacity, Fit, Crop |
| `Audio` | Intro/Battle | 사운드 ID, 사용 여부, Volume, Pitch, Intro Start Tick, 미리 듣기 |

Element를 선택하지 않으면 Element Inspector의 상세 필드는 나타나지 않습니다. Canvas에서 요소 또는 액터를 직접 클릭하면 Inspector 모드와 선택 대상도 같이 바뀝니다.

## 레이어 추가

| 버튼 | 생성되는 요소 | 기본 용도 |
| --- | --- | --- |
| `Add Label` | 글자 레이어 | VS 문구, 참가자 이름, 안내 문구 |
| `Add Texture` | 이미지 레이어 | 로고, 프레임, 속도선, 장식 |
| `Add Color` | 단색 사각형 | 패널, 플래시, 화면 분할 |
| `Remove` | 선택 요소 삭제 | Player/Opponent 액터는 삭제 대상이 아님 |

새 요소는 고유한 순번을 붙인 ID와 기본 위치·크기·애니메이션을 갖습니다. ID는 타임라인과 레이어 목록에서 요소를 구분하므로 복제나 직접 JSON 편집 후 중복되지 않게 유지하세요.

## 문서 제한과 기본 좌표

| 항목 | 범위 |
| --- | ---: |
| Duration | 1–600틱, 최대 30초 |
| 요소 수 | 최대 64개 |
| Stage Width | 320–3840, 기본 960 |
| Stage Height | 180–2160, 기본 540 |
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

Battle Presentation 문서는 현재 스키마 4로 저장됩니다. 구형 스키마 1–3 파일은 호환 필드를 사용해 읽지만, 저장하면 현재 구조로 정규화됩니다. `schemaVersion`을 지원 범위 밖의 값으로 직접 바꾸면 로드되지 않습니다.

## Pose Workbench

Player 또는 Opponent 액터가 Steve/Alex 사람형 모델일 때 `Pose` 탭에서 `Pose Workbench`를 열 수 있습니다. 에디터 안의 큰 3D 미리보기로 관절을 확인하면서 다음 부위를 조정합니다.

- Head, Body
- Left/Right Arm
- Left/Right Leg
- 각 부위의 Pitch, Yaw, Roll

`Neutral`, `Ready`, `Victory` 프리셋과 축별 Reset, 반대편 복사·미러, 전체 보기 Reset을 제공합니다. 미리보기는 드래그로 회전하고 마우스 휠로 확대·축소합니다. `Save Pose`를 눌러야 Actor Inspector로 돌아가며 현재 문서에 변경을 유지합니다.

Pokemon 액터는 사람형 관절 포즈를 사용하지 않고 전체 모델 회전만 지원합니다.

## 이미지와 사운드 선택

이미지 브라우저는 현재 클라이언트가 찾을 수 있는 연출 이미지 리소스를 검색합니다. 0.1.6에서는 검색 결과를 페이지로 나누고 필요한 썸네일만 불러오므로 리소스가 많은 팩에서도 처음 여는 부담이 줄었습니다. 선택한 이미지의 원본 크기를 읽을 수 있으면 새 Texture의 크기와 Crop 초기값을 구성하는 데 사용합니다.

Texture와 Stage Image는 Minecraft 리소스 ID를 사용합니다. Windows 절대 경로나 서버의 임의 PNG 경로는 런타임 클라이언트에서 읽을 수 없습니다. 사용자 이미지는 모든 접속 클라이언트가 가진 리소스팩 또는 모드 리소스로 배포해야 합니다.

사운드 선택기는 등록된 Sound ID를 검색합니다. Inspector의 `Play`와 `Stop`은 편집 미리 듣기이며, 저장된 타임라인 재생 위치나 실제 전투 상태를 바꾸지 않습니다.

## Canvas 직접 조작

- 요소 드래그: 최종 위치와 시작 위치를 같은 거리만큼 이동해 기존 이동 방향을 유지합니다.
- 요소 모서리 드래그: Width와 Height를 조정합니다.
- 회전 핸들 드래그: 최종 Rotation을 조정합니다.
- 액터 드래그: 선택 액터의 X/Y를 조정합니다.
- 레이어 행 드래그: 목록 순서와 Z 순서를 재배치합니다.
- 타임라인 구간 몸통 드래그: 활성 구간을 이동합니다.
- 시작·종료 핸들 드래그: Start Tick과 End Tick을 조정합니다.

수치 입력과 직접 조작은 같은 데이터에 연결됩니다. 필드에 값을 입력한 뒤 다른 선택으로 이동하면 현재 값이 먼저 동기화됩니다.

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
10. 트레이너 파일을 저장하고 다음 전투에서 연출을 확인합니다. 같은 원본 경로를 추적하는 NPC는 보통 다시 Apply할 필요가 없습니다.

에디터 미리보기와 런타임은 같은 렌더러를 사용하지만, 실제 플레이어 스킨·대상 NPC·창 비율·사운드 리소스는 런타임에서만 최종 확인할 수 있습니다.
