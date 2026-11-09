---
title: 배지·트로피 만들고 지급하기
slug: cobblemon-badges
order: 580
product: drm-cobblemon-editor
section: trainer
category: 배지와 트로피
status: 사용법
version: Fabric / NeoForge 0.2.9
description: 배지 세트를 저장하고 플레이어에게 지급한 뒤 배지함에서 확인합니다.
---

## 배지 기능 켜기
Cobblemon Editor **0.2.9 / Fabric·NeoForge 1.21.1**에 포함된 기능입니다. DRM 설정 화면의 **Badges → Enable badges**를 켭니다. 서버 운영자만 켤 수 있으며, 새 월드에서는 기본 OFF입니다. 켜면 Controls에서 **Badge Case** 키를 지정할 수 있고, 키 없이도 **/badges**로 배지함을 엽니다.

## 영상으로 첫 배지 만들기
아래 영상은 샘플 세트를 복사한 상태에서 시작합니다. **Meadow League**와 **Meadow Badge**로 이름을 바꾸고 실제 서버에 저장합니다.

![샘플 세트의 이름과 배지 이름을 바꾸고 Save로 저장합니다.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, 영어 UI. 실제 편집기 입력과 서버 저장 영상입니다. 배지 기능은 촬영 전에 켜 두었습니다.")

1. DRM의 **Add-on → Badge Editor** 또는 운영자 명령 **/badges edit**로 편집기를 엽니다.
2. **Select Set**에서 샘플을 고르고 **Save Set As Copy**로 내 세트를 만듭니다. 이 버튼은 파일 이름을 입력하는 창 대신 새 ID를 가진 세트 사본을 만듭니다.
3. **Basic → Set Name**을 **Meadow League**, 배지의 **Name**을 **Meadow Badge**로 바꿉니다. 새 항목은 **Add Count → Add**로 추가합니다.
4. 항목의 종류를 **Badge** 또는 **Trophy**로 정합니다. **Front Texture**의 찾기 버튼으로 DRM 자산을 고릅니다. 뒷면을 비우면 앞면을 양쪽에 사용합니다.
5. 설명과 **Enabled**를 확인하고 **Save**를 누릅니다. 이름만 바꾼 것은 같은 배지지만, 복사·새로 만들기는 다른 ID를 만듭니다.

## 지급하고 배지함에서 확인하기
운영자 권한 2 이상으로 아래 명령을 실행합니다. 마지막 인수는 배지 이름이며 Tab으로 이름·ID를 찾을 수 있습니다. 같은 이름이 둘이면 고유 ID를 사용합니다.

```mcfunction
/drm badge give @s Meadow Badge
/badges
/drm badge take @s Meadow Badge
```

트로피는 **/drm trophy give**와 **/drm trophy take**를 사용합니다. 배지함에서 **Meadow League** 세트를 골라 보유 여부를 확인합니다. 이미 가진 배지를 다시 지급해도 보유 수가 늘어나지는 않습니다.

![실제로 저장한 Meadow League의 배지 정의와 편집 화면.](assets/media/guides/cobble-release-20261109/badge-editor-saved.png "정의 저장을 확인한 편집기 화면입니다. 플레이어의 보유 기록은 /badges에서 따로 확인합니다.")

## 트레이너 보상·대화·퀘스트에 연결하기
**Battle Config → After Actions**에서 **Badge** 또는 **Trophy** 액션을 추가하고 찾기 버튼으로 저장한 항목을 고릅니다. 결과를 승리로 한정하면 승리 배지가 됩니다. 대화 뒤 지급하려면 **Sequential**에서 대화를 먼저 두세요.

대화 액션의 배지·트로피 지급/회수도 검색 선택을 지원합니다. **Badge owned / Trophy owned**는 해당 항목의 보유 여부, **Badge count**는 선택한 세트의 배지 수, **Badge set complete**는 필수 배지 전부의 보유 여부를 확인합니다. 트로피는 배지 수에 포함되지 않으며 **Required for Completion**으로 완성에 필요한 배지를 정합니다. 필수 배지가 하나도 없는 세트는 완성 조건을 통과하지 않습니다.

퀘스트에서는 배지 획득 목표를 고르고 대상을 연결합니다. 기존에 보유한 배지를 다시 지급하는 것은 새 획득으로 집계하지 않습니다. 자세한 순서는 [배틀 후 액션](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon)을 참고하세요.

## 연출과 저장 자료
획득 알림·배지 선택 연출은 [배지 연출과 배지함 GUI](#drm-cobblemon-editor/cobblemon-badge-presentations)에서 따로 설정합니다.

정의는 **config/dochi_rpg_maker/cobblemon/badges/catalog.json**, 켜기 설정은 월드의 **serverconfig/cobble_npc/badges.json**에 있습니다. 보유 기록은 월드의 플레이어 데이터에 따로 저장됩니다. 배지 정의만 복사한다고 보유 기록도 옮겨지지는 않습니다. 정의·연출·텍스처와 월드 플레이어 데이터를 함께 백업하세요. 다른 문서가 참조하는 배지 삭제가 거부되면 먼저 연결된 보상·조건을 변경합니다.
