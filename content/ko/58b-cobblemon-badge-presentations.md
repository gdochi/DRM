---
title: 배지 획득 연출과 배지함 꾸미기
slug: cobblemon-badge-presentations
order: 581
product: drm-cobblemon-editor
section: trainer
category: 배지와 트로피
status: 사용법
version: Fabric / NeoForge 0.2.9
description: 획득과 선택 연출을 따로 연결하고 배지함·상세·알림 GUI를 꾸밉니다.
---

## 획득과 선택 연출은 따로 설정합니다
[배지 만들기](#drm-cobblemon-editor/cobblemon-badges)에서 저장한 항목을 선택하고 **Presentation**을 엽니다. 획득 시 재생할 연출과 배지함에서 선택할 때의 연출을 각각 정합니다. 세트 기본값을 공유하거나 현재 배지만 다르게 지정할 수 있습니다.

## 영상으로 연출 복사하고 저장하기
![획득 연출을 Copy and Edit로 복사해 Meadow Shine으로 저장하고 배지 카탈로그까지 저장합니다.](assets/media/guides/cobble-release-20261109/badge-presentation.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, 영어 UI·무음. 실제 Copy and Edit → 이름 변경 → Restart → Save → 돌아가기 → 카탈로그 Save 과정입니다.")

1. **Presentation**에서 원하는 이벤트의 **Copy and Edit**를 누릅니다. **Edit**는 공유 연출 자체를 바꾸므로 한 배지만 바꿀 때는 사본을 만듭니다.
2. 오른쪽 **Name**을 정하고 **Restart**로 처음부터 미리 봅니다. **Template**에는 **Soft Shine**, **Golden Ring**, **Gentle Rise**가 있습니다.
3. 왼쪽 트랙을 고르고 **Transform**에서 시작·종료 틱, 위치·크기·회전·불투명도를 조절합니다. **Effect**는 선택한 효과 자체의 속성입니다. **Add Key**로 현재 시점의 키를 추가합니다.
4. 연출 편집기에서 **Save**한 뒤 **Cancel**로 배지 편집기에 돌아옵니다. 마지막으로 배지 편집기의 **Save**도 눌러 연결을 확정합니다.

## 세트 기본값과 개별 연결
상단 범위 선택으로 현재 배지와 세트 기본값을 구분합니다. 기본값을 상속하면 세트의 변경이 해당 배지에도 적용됩니다. **None**은 명시적으로 연출을 끕니다. 획득과 선택은 각각 독립된 연결입니다.

![배지의 Presentation 탭에서 획득과 선택 연출의 연결을 따로 정합니다.](assets/media/guides/cobble-release-20261109/badge-presentation-bindings.png "위쪽 이벤트의 Copy and Edit는 획득 연출, 아래쪽은 선택 연출입니다. 공유 프리셋 편집과 복사 편집을 구분하세요.")

배틀 연출을 가져올 때는 배지용 문서로 변환해 사용합니다. 배틀 NPC 연결을 그대로 배지에 넣는 과정은 아닙니다.

## 배지함 화면과 배치
**Display**는 배지함의 배열과 배치, **GUI**는 **Collection / Detail / Acquisition** 화면의 GUI Maker 연결을 다룹니다. GUI Maker에서는 배지 목록·이미지·이름·설명을 배치하고 실제 플레이어 보유 상태는 런타임이 표시합니다. 이미지 연출의 키프레임과 화면의 글자 배치는 각각 해당 도구에서 정합니다.

## 플레이어 표시 설정
획득 알림은 순서대로 대기하며 기본 자동 알림은 최소 8초 표시됩니다. 팝업 확인 방식, 동작 줄이기와 소리는 배지 설정에서 조절합니다. 영상은 무음이므로 사운드의 청취 결과로 사용하지 마세요. 배지 편집기 미리보기와 실제 획득 알림을 구분하고, 지급 후 **/badges**에서 보유 상태를 확인하세요.
