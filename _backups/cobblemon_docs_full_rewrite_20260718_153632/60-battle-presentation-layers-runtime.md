---
title: 레이어·타임라인·액터·오디오 동작
slug: battle-presentation-layers-runtime
order: 531
description: 각 연출 필드가 프레임 렌더와 실제 배틀 전환에 미치는 영향을 상세히 설명합니다.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Draft
version: 0.1.0
audience: 연출 타이밍과 런타임 문제를 조정하는 제작자
tags:
  - layers
  - timeline
  - actors
  - audio
---

## Label, Texture, Color의 차이

| Type | 실제 렌더 | 중요한 설정 |
| --- | --- | --- |
| `Label` | 지정 박스 중앙에 글자를 배치하고 박스 너비를 넘는 글자는 잘라냅니다. | Text, Font Size, Color, 부분 글자 스타일 |
| `Texture` | Minecraft 리소스 이미지를 박스에 그립니다. 이미지가 없거나 잘못되면 색상 사각형으로 표시될 수 있습니다. | Image, Opacity, Fit, Crop |
| `Color` | 단색 ARGB 사각형을 그립니다. | Color, 박스 크기, Alpha |

Label의 `{player_name}`과 `{opponent_name}`은 런타임 참가자 이름으로 치환됩니다. 부분 글자 색상은 원본 문자열 인덱스에 저장되고, 플레이스홀더가 치환되면 해당 토큰의 스타일을 새 이름이 상속합니다.

Texture의 Image는 `namespace:textures/...png` 형식의 리소스 ID입니다. 파일 시스템 절대 경로는 사용할 수 없습니다.

| Image Fit | 동작 |
| --- | --- |
| `Stretch` | 박스 너비와 높이에 맞춰 비율을 변형합니다. |
| `Contain` | 원본 비율을 유지하면서 전체 이미지가 박스 안에 들어오도록 중앙 배치합니다. |
| Crop On | 원본 이미지의 X/Y/W/H 영역만 잘라 Fit 계산에 사용합니다. |

## 위치값과 Canvas 드래그

Layout의 X/Y는 요소가 도착할 최종 위치와 동기화됩니다. Canvas에서 요소를 드래그하면 `Start X/Y`와 `Final X/Y`가 같은 거리만큼 함께 이동하므로 기존 이동 거리와 방향이 유지됩니다.

슬라이드 인을 만들 때는 다음 순서가 안전합니다.

1. Canvas에서 최종 위치를 먼저 정합니다.
2. Animation 탭에서 Start X 또는 Start Y만 Stage 밖으로 옮깁니다.
3. Start/Final Scale과 Rotation을 정합니다.
4. 전체 활성 구간을 재생해 Easing을 확인합니다.

Width와 Height는 디자인 박스입니다. Label 글자 크기는 Font Size가 별도로 정하므로 박스를 키워도 글자 자체가 자동으로 커지지 않습니다.

## 타임라인 계산

| 필드 | 렌더 계산 |
| --- | --- |
| Start Tick / End Tick | 이 구간 밖에서는 요소를 렌더하지 않습니다. End는 Start보다 최소 1틱 뒤로 정규화됩니다. |
| From / To | 위치, Scale, Rotation, Alpha를 활성 시간의 진행률로 보간합니다. |
| Fade In | Start Tick부터 지정한 틱 동안 계산된 Alpha에 0→1 배수를 곱합니다. |
| Fade Out | End Tick 직전 지정한 틱 동안 Alpha에 1→0 배수를 곱합니다. |
| Easing | From과 To 사이 진행 속도를 바꿉니다. Fade도 최종 Alpha와 함께 적용됩니다. |

| Easing | 보이는 결과 |
| --- | --- |
| `Linear` | 일정 속도 |
| `Ease In` | 느리게 출발해 가속 |
| `Ease Out` | 빠르게 출발해 감속 |
| `Ease In Out` | 출발과 도착 모두 부드럽게 |
| `Back Out` | 도착점을 잠시 넘었다 돌아옴 |
| `Step` | 활성 구간 끝까지 From을 유지하고 마지막에 To로 전환 |

타임라인 눈금자를 누른 채 드래그하면 재생이 일시정지됩니다. 드래그 전 재생 중이었다면 놓은 뒤 다시 재생하고, 원래 멈춘 상태였다면 그대로 멈춥니다. Intro Audio를 다시 시험할 때는 시작 틱 이전으로 스크럽한 뒤 재생해야 합니다.

## Z값과 액터가 섞이는 순서

Player와 Opponent도 각각 Z값을 가진 렌더 항목입니다. 런타임은 일반 요소의 Z 순서를 순회하면서 액터 Z가 해당 요소보다 작거나 같아지는 지점에 모델을 끼워 그립니다.

예시 구성:

- 배경 Color: Z 1
- 장식 패널: Z 5–12
- Opponent: Z 23
- Player: Z 24
- 이름 Label: Z 30–31
- VS Label: Z 40
- 마지막 흰색 Flash: Z 100

모델 앞에 있어야 하는 글자가 가려지면 위치보다 Z값을 먼저 확인하세요.

## 액터 모델

| 설정 | 실제 동작 |
| --- | --- |
| Visible | 꺼지면 해당 액터를 렌더하지 않습니다. |
| Model Type `Humanoid` | Steve/Alex 계열 모델과 Head, Body, 양팔, 양다리 Pose를 사용합니다. |
| Model Type `Pokemon` | 포켓몬 엔티티 전체 모델 회전만 사용하고 관절 Pose는 사용하지 않습니다. |
| `Auto` | 구형 문서 호환용 자동 판정입니다. 새 파일은 의도한 타입을 명시하는 편이 안전합니다. |
| X/Y | Stage 안에서 모델 발 기준 위치 |
| Scale | 모델 렌더 크기 |
| Yaw/Pitch/Roll | 모델 전체 회전 |
| Z | 일반 레이어와의 앞뒤 순서 |

런타임 Player 액터는 실제 플레이어 엔티티를 사용하고, 선두 포켓몬의 Poké Ball을 Main Hand 표시용으로 넘깁니다. Opponent는 대상 CustomNPCs NPC 엔티티를 사용합니다. 대상이 살아 있는 LivingEntity가 아니면 액터는 그려지지 않습니다.

에디터를 NPC 대상 없이 열면 Opponent 미리보기에 샘플 이상해씨를 사용할 수 있습니다. 이 샘플이 잘 보여도 실제 트레이너 NPC 타입과 맞는다는 뜻은 아니므로 런타임 테스트가 필요합니다.

## World Background와 Stage Image

`World Background`는 전체 플레이어 창에 색을 덮어 실제 월드를 어둡게 합니다. 자체 Opacity, Fade In, Fade Out을 사용합니다. 일반 Color Layer는 960×540 Stage 내부 요소이며 Z 순서와 요소 타임라인을 따릅니다.

`Stage Image`는 Stage 뒤에 그리는 한 장의 배경 이미지입니다. 일반 Texture Layer를 여러 개 만드는 것보다 고정 배경에 적합하며, Opacity, Fit, Crop을 가집니다.

## Intro Audio와 Battle Audio

| Audio | 시작과 종료 |
| --- | --- |
| Intro | 지정 Start Tick을 재생 위치가 통과할 때 한 번 시작합니다. 건너뛰기·대상 소실·화면 중단에서는 즉시 정지합니다. 정상 완료 때는 긴 끝음을 위해 전투 전환 위로 계속 들릴 수 있습니다. |
| Battle | 연출 타임라인 안에서는 재생하지 않습니다. 연출 완료 뒤 서버가 Cobblemon 배틀을 시작할 때 전투 오디오로 넘깁니다. |

두 오디오는 등록된 Minecraft Sound ID, Volume, Pitch를 사용합니다. Inspector의 `Play`/`Stop`은 선택 사운드만 미리 듣고 타임라인 위치를 바꾸지 않습니다.

## 건너뛰기와 실패 처리

`Skippable`이 켜진 연출은 플레이어가 `Esc` 또는 `Space`로 종료 결과를 서버에 보낼 수 있습니다. 서버는 해당 문서가 실제로 건너뛰기를 허용한 경우에만 배틀 시작 흐름을 계속합니다.

다음 상황은 안전 취소로 처리되어 전투가 시작되지 않을 수 있습니다.

- 플레이어가 죽거나 월드에서 사라짐
- 대상 NPC가 제거·사망하거나 다른 월드 상태가 됨
- 클라이언트 연출 화면이 비정상적으로 중단됨
- 연출 뒤 조건 재검사 실패
- 플레이어 파티 또는 상대 포켓몬 생성 실패

정식 확인은 `첫 프레임 → Intro 시작점 → 중간 프레임 → 마지막 Flash → 건너뛰기 → 실제 배틀 → 승패/도주 후 복구` 순서로 진행하세요.
