---
title: 아이콘 편집과 우선순위
slug: mapicon-editor-rules
order: 1410
description: 타입별 기본값, JSON 예외, NPC 전용 설정과 저장·적용을 설명합니다.
product: dochi-mapicon-integration
category: 아이콘 제작
section: editor
status: 사용 안내
version: 0.1.2
audience: NPC 제작자
---

## 타입별 기본 아이콘

왼쪽 **Type defaults**를 누르고 가운데 목록에서 **NPC**, **Dialogue JSON**, **NPC Shop JSON** 같은 분류를 고릅니다. 오른쪽 **Icon settings**에서 이미지·크기·색상·표시할 지도를 바꾸고, 가운데 아래 **Icon preview**에서 모양을 확인합니다.

![MapIcon의 Type defaults 화면. 가운데 목록에서 NPC를 선택했고 오른쪽에서 이미지, Size, Tint, Minimap과 World map을 정합니다.](assets/media/guides/mapicon-012-neo1211/type-defaults.png "MapIcon 0.1.2 / NeoForge 1.21.1 화면입니다. 상점 아이콘을 바꾸려면 가운데 NPC Shop JSON을 고른 뒤 오른쪽 설정을 바꿉니다.")

**NPC**는 기본 NPC 아이콘입니다. 그 아래의 대화·상점·텔레포터 분류는 NPC에 적용한 기능에 맞는 아이콘을 정합니다. Cobblemon Editor가 있으면 Trainer, Pokemon Itself, PokéMart, Nurse Joy, Starter Selector 같은 적용 대상이 추가됩니다.

**타입별 기본 아이콘**을 켜면 별도 예외가 없는 NPC도 적용 JSON에 따라 표시합니다. NPC 기본 아이콘과 타입별 아이콘은 독립적으로 저장됩니다. 전투 연출·스케줄러처럼 NPC Apply 대상이 아닌 파일은 타입 목록에 나오지 않습니다.

## 이미지·색상·표시

| 항목 | 설정 |
| --- | --- |
| 이미지 | 내장 아이콘 검색, 외부 이미지 검색 또는 리소스 ID 직접 입력 |
| 크기 | 8–64 |
| 색상 | 색상 선택기의 스펙트럼·채도/밝기·HEX·RGB, 실시간 미리보기 |
| 지도 | 미니맵·월드맵을 각각 선택 |
| 이름 | 지도에서 NPC 이름을 표시할지 선택 |

**아이콘 선택**은 PNG 미리보기와 이름을 가진 검색 목록입니다. 내장 라이브러리는 Nikoichu의 CC0 1-bit Pixel Icons 1,476개이며 RPG 필터를 사용할 수 있습니다. 색조는 지도 표시에 적용하며 PNG 원본은 수정하지 않습니다.

## 예외와 표시 우선순위

JSON 규칙은 타입과 파일 경로를 비교합니다. 경로를 비우면 그 타입 전체에 적용하고 여러 규칙이 맞으면 우선순위가 가장 높은 규칙을 선택합니다. 동률이면 목록에서 먼저 등록한 규칙이 적용됩니다.

1. 글로벌 OFF 또는 NPC별 숨김이면 표시하지 않습니다.
2. 선택된 JSON 규칙이 OFF이면 숨깁니다. NPC별 표시는 이 규칙의 OFF를 덮어쓸 수 있지만 글로벌 OFF는 덮어쓰지 않습니다.
3. 표시할 이미지의 순서는 NPC 전용 → 선택된 JSON 규칙 → 타입별 기본 → NPC 기본입니다.
4. DRM NPC 표시 조건에 따라 해당 플레이어에게 숨겨진 NPC는 지도에도 표시하지 않습니다.

규칙은 추가·복제·삭제·검색할 수 있고 파일은 검색 목록에서 선택합니다. 기존 규칙의 이미지도 **타입 아이콘 적용**으로 바꿀 수 있습니다.

![JSON Rules에 새 NPC Shop 규칙을 추가한 화면.](assets/media/guides/mapicon-012-neo1211/mapicon-rule-added.png "MapIcon 0.1.2 / NeoForge 1.21.1. Add rule 뒤 DRM source kind를 NPC Shop JSON으로 고른 상태입니다. JSON file을 비우면 이 종류의 모든 파일에 적용합니다. 특정 상점만 바꾸려면 돋보기로 파일을 고르고 Priority를 정한 뒤 저장합니다.")

## NPC 한 명만 바꾸기

DNPC 편집기의 **Addons → Map icon**을 열면 **Selected NPC**만 있는 개별 편집 화면이 나옵니다. **Icon** 스위치로 표시·숨김을 정하고 전용 그림·크기·색상·지도 표시를 고른 뒤 **Save**합니다. 하단 **Settings saved**까지 확인하세요.

![선택 NPC의 전용 아이콘을 저장한 개별 편집 화면.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1. 왼쪽에 Type defaults나 JSON Rules가 없는 NPC 전용 화면입니다. 여기서 저장한 결과와 전체 에디터의 서버 프로필 저장을 구분합니다.")

Core의 NPC 표시 조건 때문에 해당 플레이어에게 숨겨진 NPC는 아이콘 설정만 켜서 표시하지 않습니다. [실제 미니맵 확인](#dochi-mapicon-integration/mapicon-setup)에서 저장 후 결과를 비교하세요.

## 저장과 적용

Load는 편집할 프로필을 불러오며 서버 활성 정책은 바꾸지 않습니다. **Save & Apply**, Save 또는 Save As는 저장한 프로필을 서버 정책으로 적용합니다. 하단 **적용 중** 파일명으로 서버가 응답한 활성 프로필을 확인하세요. Mods Config 스위치는 화면에 즉시 반영되고 **Apply**로 서버에 저장합니다.

[파일과 문제 해결](#dochi-mapicon-integration/mapicon-files-operations)에서 이미지 경로와 표시 범위를 확인하세요.
