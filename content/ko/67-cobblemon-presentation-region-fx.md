---
title: 블록 무대와 FX
slug: cobblemon-presentation-region-fx
order: 533
description: 월드 영역을 연출 JSON에 캡처하고 입자 무대를 제작합니다.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: 사용 안내
version: 0.2.4
audience: 배틀 연출 제작자
---

## 월드 블록을 연출 무대로 사용하기

Battle Presentation Maker의 **Region**은 선택한 월드 블록 상태를 연출 JSON 안에 저장합니다. 실제 월드를 배치·복원하는 도구가 아니라 배틀 진입 화면에 보여 주는 무대입니다. 원래 장소를 바꾸거나 다른 곳에서 배틀해도 저장한 블록 모양을 사용합니다.

1. 캡처할 건축물의 청크를 로드합니다.
2. Region에서 두 모서리를 정하거나 월드 영역 선택으로 박스 위치·크기를 맞춥니다.
3. 선택 검사 뒤 Apply하고 **Capture region**을 실행합니다.
4. Yaw·Pitch·Zoom·Offset과 종료 회전값으로 화면 구도를 맞춥니다.
5. 모델·레이어와 함께 타임라인을 재생한 뒤 상단 Save 또는 Save As로 연출 JSON을 저장합니다.

캡처만 하고 파일을 저장하지 않으면 다음 로드에 남지 않습니다. 영역을 바꾼 뒤에는 다시 캡처해야 합니다. 월드 선택은 블록을 변경하지 않고 Esc로 취소할 수 있습니다.

## 캡처 제한

| 항목 | 현재 한도 / 처리 |
| --- | --- |
| 각 축 길이 | 최대 128블록 |
| 저장 블록 수 | 공기를 제외한 지원 블록 최대 32,768개 |
| 서로 다른 블록 상태 | 최대 512개 |
| 청크 | 전체 영역이 로드되어 있어야 함 |
| 상자 같은 블록 엔티티 | 캡처에서 제외. 인벤토리·NBT·엔티티를 저장하지 않음 |

크기·상태 수를 넘기거나 저장할 블록이 없으면 캡처하지 못합니다. 캡처된 무대는 틱을 실행하지 않으므로 레드스톤 장치나 상자 기능을 재현하지 않습니다.

## FX 제작

**FX** 모드에서 입자 항목을 추가하고 입자 ID·옵션을 고른 뒤 Emit, Motion, Path, Cues 페이지에서 발생 구간, 개수·간격, 모양, 크기·위치·속도와 이동 경로를 정합니다. Copy/Paste로 항목 설정을 옮길 수 있습니다.

먼저 한 입자와 짧은 구간으로 시작하고 배우 모델·블록 무대·카메라와 함께 미리보기를 재생하세요. 연출 안의 시각 효과이며 실제 월드 공격이나 피해 판정을 만드는 기능은 아닙니다. 외부 모드 입자는 그 제공 모드가 설치되어야 합니다.

## 함께 사용할 설정

배틀 프레젠테이션은 트레이너 연결, 야생·RCT·PvP 적용 또는 [배틀 스케줄러](#drm-cobblemon-editor/cobblemon-battle-scheduler)에서 사용합니다. 프레젠테이션 JSON 스키마는 `5`를 유지합니다. [레이어와 런타임](#drm-cobblemon-editor/battle-presentation-layers-runtime)에서 텍스트·이미지·액터·오디오와 타임라인을 확인하세요.
