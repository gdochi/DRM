---
title: Battle Presentation Maker
slug: cobblemon-battle-presentation
order: 530
description: 전투 직전 연출의 레이어, 타임라인, 모델, 배경, 오디오, 저장과 트레이너 연결 방법입니다.
product: drm-cobblemon-editor
category: 배틀 연출
section: presentation
status: Draft
version: 0.1.0
audience: 전투 연출 제작자
tags:
  - presentation
  - timeline
  - audio
---

## 에디터와 런타임 구분

`Battle Presentation Maker`는 전투 직전 화면을 만드는 제작자용 에디터입니다. 중앙 Canvas는 현재 타임라인 프레임의 미리보기이며 월드 상태를 직접 바꾸지 않습니다. 저장한 연출을 트레이너에 연결하고 실제 전투를 시작했을 때 플레이어에게 보이는 화면이 런타임 연출입니다.

처음 `Create New`를 선택하면 단계별 튜토리얼이 열립니다. 편집 중에도 상단 `Help`에서 다시 볼 수 있습니다.

## 작업 영역

| 영역 | 역할 |
| --- | --- |
| 왼쪽 Layers | Label, Texture, Color Layer 추가·선택·삭제와 그리기 순서 변경 |
| 중앙 Canvas | 현재 틱의 실시간 연출 미리보기와 직접 이동·크기 조절 |
| 오른쪽 Inspector | Element, Actors, Background, Audio 설정 |
| 아래 Timeline | 재생 위치, 레이어별 활성 구간, 시작·종료 핸들, 스크럽 |

Player Model과 Opponent Model은 삭제할 수 없는 특수 액터 레이어입니다. 필요하지 않은 모델은 `Render Selected Model`을 끄세요. 일반 레이어는 높은 Layer 값일수록 앞에 그려집니다.

## 기본 설정

| 설정 | 의미 |
| --- | --- |
| Name | JSON 안에 저장되는 표시명 |
| Duration | 전체 길이. 20틱은 약 1초 |
| Skippable | 플레이어가 `Esc` 또는 `Space`로 연출을 건너뛸 수 있는지 여부 |
| Stage | 기본 960×540 논리 좌표 공간 |

파일 경로와 Name은 서로 다릅니다. 트레이너가 참조하는 값은 `Save As`에서 정한 상대 파일 경로입니다.

## 레이어 만들기

| 레이어 | 사용 예 |
| --- | --- |
| `Label` | 트레이너 이름, `VS`, 안내 문구 |
| `Texture` | 로고, 패널, 컷인 이미지 |
| `Color Layer` | 전체 배경색, 띠, 강조 사각형 |

모든 레이어에는 알아보기 쉬운 고유 ID를 사용하세요. Canvas에서 레이어를 드래그하면 시작 위치와 최종 위치가 함께 이동해 기존 이동 경로가 유지됩니다. Width와 Height는 디자인 박스이고 Font Size는 Label 글자 크기를 별도로 제어합니다.

Label에는 `{player_name}`과 `{opponent_name}` 바인딩을 사용할 수 있습니다. 런타임이 실제 전투 참가자 이름으로 바꿉니다. `Select Text`와 `Set Color`를 사용하면 Label 일부 글자에 별도 색상을 줄 수 있습니다.

Texture는 Minecraft 리소스 ID를 사용합니다.

```text
cobble_npc:textures/gui/example.png
```

이미지는 설치된 모드나 리소스 팩의 유효한 네임스페이스에 있어야 합니다. ARGB 색상은 `#CC10141A`처럼 Alpha, Red, Green, Blue 순서로 입력합니다.

## 타이밍과 모션

| 설정 | 동작 |
| --- | --- |
| Start Tick / End Tick | 레이어가 보이는 절대 타임라인 구간 |
| Fade In / Fade Out | 시작과 끝에서 투명도가 변하는 기간 |
| Start X/Y | 첫 프레임 위치 |
| Final X/Y | 활성 구간 끝에서 도달할 위치 |
| Start Size / Final Size | 시작과 끝의 스케일 |
| Start Rotation / Final Rotation | 시작과 끝의 회전 |
| Easing | 두 상태 사이의 속도 변화 |

타임라인 눈금자를 클릭하거나 드래그하면 스크럽할 수 있습니다. 각 행의 양쪽 핸들을 드래그하면 Start/End Tick을 직접 바꿀 수 있습니다. `Linear`, `Ease In`, `Ease Out`, `Ease In Out`, `Back Out`, `Step`은 이동 느낌이 다르므로 전체 재생으로 확인하세요.

전체 배경 레이어는 일반적으로 X `0`, Y `0`, Width `960`, Height `540`에서 시작합니다. Canvas 밖으로 나간 내용은 런타임에서도 Stage 영역으로 잘립니다.

## 액터 모델

Player와 Opponent 액터는 X/Y, Z, Scale, Yaw, Pitch, Roll을 가집니다.

- `Steve / Alex`는 Head, Body, 양팔, 양다리의 개별 Pose 회전을 편집할 수 있습니다.
- `Pokemon`은 포켓몬 모델 전체 회전을 지원합니다.
- 대상 NPC 없이 에디터를 열면 Opponent 미리보기에 샘플 포켓몬이 사용될 수 있습니다.
- 대상 포켓몬 NPC를 지정해 열면 실제 대상 모델을 우선 사용합니다.

World Background는 Stage 안의 Color Layer와 다릅니다. World Background는 연출 뒤의 실제 월드를 색상과 투명도로 어둡게 만들며 Fade In/Out을 가질 수 있습니다. Stage Image는 연출의 배경 이미지를 지정합니다.

## 오디오

| 오디오 | 재생 시점 |
| --- | --- |
| Intro Audio | 연출 타임라인이 Start Tick을 지날 때 한 번 재생 |
| Battle Audio | 연출이 끝나고 Cobblemon 전투로 넘어간 뒤 전투 음악으로 시작 |

등록된 Minecraft Sound ID를 선택하고 Volume과 Pitch를 설정합니다. `Play`와 `Stop`은 선택한 오디오만 미리 듣고 타임라인 재생 위치를 바꾸지 않습니다. 외부 모드나 리소스 팩의 사운드를 사용하면 모든 플레이어에게 같은 의존성이 있어야 합니다.

## 저장하고 트레이너에 연결하기

1. 첫 저장은 `Save As`를 누릅니다.
2. `custom/gym_intro.json`처럼 상대 경로를 입력합니다.
3. 파일은 아래 위치에 저장됩니다.

```text
config/dochi_rpg_maker/cobblemon/battle_presentations/custom/gym_intro.json
```

4. `Editors`로 돌아가 `Cobblemon Editor`를 엽니다.
5. 트레이너의 Battle Presentation 경로에서 방금 저장한 파일을 선택합니다.
6. 트레이너 JSON을 저장하고 대상 NPC에 다시 `Apply`합니다.

연출 JSON을 저장하는 것만으로는 어떤 NPC에도 연결되지 않습니다. 트레이너에는 `presets/vs_trainer.json`, Pokemon Itself에는 `presets/vs_pokemon.json`이 기본값으로 제공됩니다. 기본 파일을 수정하려면 먼저 `Save As`로 사용자 파일을 만드세요.

## 런타임 점검표

- 첫 프레임과 마지막 프레임에 잘린 레이어가 없는지 확인합니다.
- 모든 Start Tick이 End Tick 이하이고 전체 Duration 안에 있는지 확인합니다.
- Player/Opponent 모델 유형이 실제 대상과 맞는지 확인합니다.
- Intro Audio와 Battle Audio를 각각 확인합니다.
- Skippable 연출은 `Esc`와 `Space`로 안전하게 취소되는지 확인합니다.
- 작은 창과 다른 GUI Scale에서도 Stage와 로드 창이 깨지지 않는지 확인합니다.
- 연출 종료 후 실제 Cobblemon 전투가 시작되고 NPC가 정상 복구되는지 확인합니다.
