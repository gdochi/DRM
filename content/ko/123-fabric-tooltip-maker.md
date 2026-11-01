---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: 아이템에 마우스를 올렸을 때 보이는 이름·설명·모델의 배치를 바꿉니다.
product: core-fabric
category: GUI Maker
section: gui-maker
status: 안정
version: 0.3.1
audience: 제작자
---

## Tooltip Maker의 역할

Tooltip Maker는 플레이어가 아이템 위에 마우스를 올렸을 때 표시되는 정보 패널을 제작합니다. 이름과 설명, 아이템 미리보기가 들어갈 위치를 정합니다.

**Dochi RPG Maker Core**로 에디터 선택 화면을 열고 **Tooltip Maker**를 선택한 다음 기존 레이아웃을 불러오거나 새로 만드세요. 번들 기본본은 보호된 템플릿이므로 수정할 때는 `Save As`를 사용합니다.

툴팁 레이아웃은 `config/dochi_rpg_maker/gui/`에 저장됩니다. 번들 시작 파일은 `default_tooltip_gui.json`입니다.

![Tooltip Maker의 기본 레이아웃. 가운데에 검 아이콘·이름·설명 영역, 오른쪽에 캔버스 크기와 선택 요소의 좌표·크기가 보입니다.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. 가운데 검은 패널 안이 툴팁입니다. 바깥의 파란 작업 영역까지 함께 저장되는 것은 아닙니다.")

1. 가운데 캔버스에서 바꿀 요소를 고릅니다. 위 화면에서는 검 아이콘인 **Rendered Item**이 선택되어 있습니다.
2. 오른쪽 **X / Y**로 위치, **W / H**로 크기를 바꿉니다. 전체 툴팁 크기는 위의 **Tooltip W / H → Apply**로 정합니다.
3. 왼쪽 **+ Tooltip Text**, **+ Divider**, **+ Rendered Item** 등으로 필요한 표시를 추가합니다.
4. **Preview**로 확인하고 **Save As**로 내 레이아웃을 저장합니다. 전체 아이템에 사용할 레이아웃으로 지정할 때는 **Use Globally**를 사용합니다.

아이템의 능력치나 설명 내용 자체를 만들려면 아이템 에디터에서 설정합니다. Tooltip Maker는 그 내용이 표시되는 모양을 정합니다.

## 주요 기능

- 캔버스 크기를 정하고 텍스트, 값, 구분선, 이미지와 아이템 미리보기를 배치합니다.
- 2D 아이콘 또는 크기가 자동 보정되는 3D 아이템 모델을 선택하고 배율, 회전과 회전 속도를 조절합니다.
- 배경, 프레임, 텍스트와 아이템의 등장 효과를 설정하고 에디터에서 다시 재생합니다.
- 저장할 요소는 출력 캔버스 안에 완전히 들어오도록 배치합니다.

플레이 툴팁은 실제로 마우스를 올린 아이템과 그 아이템 데이터를 사용합니다. 화면보다 세로로 길면 바깥 프레임을 유지한 채 내부 내용을 스크롤할 수 있습니다.

크리에이티브 인벤토리의 아이템에도 사용자 툴팁을 적용할 수 있습니다. 일반 버튼 도움말과 에디터의 마우스 오버 도움말은 별도 렌더링을 사용하므로 Tooltip Maker가 대체하지 않습니다.
