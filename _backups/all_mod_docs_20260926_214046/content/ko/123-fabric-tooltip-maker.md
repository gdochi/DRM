---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Fabric 0.2.0에서 아이템 툴팁 레이아웃과 미리보기를 제작합니다.
product: core-fabric
category: GUI Maker
section: gui-maker
status: 안정
version: 0.2.0
audience: 제작자
---

## Tooltip Maker의 역할

Tooltip Maker는 플레이어가 아이템 위에 마우스를 올렸을 때 표시되는 정보 패널을 제작합니다. Fabric 0.2.0의 기본 에디터이며, 대화·상점 같은 전체 화면을 제작하는 GUI Maker와는 별도 도구입니다.

**Dochi RPG Maker Core**로 에디터 선택 화면을 열고 **Tooltip Maker**를 선택한 다음 기존 레이아웃을 불러오거나 새로 만드세요. 번들 기본본은 보호된 템플릿이므로 수정할 때는 `Save As`를 사용합니다.

툴팁 레이아웃은 `config/dochi_rpg_maker/gui/`에 저장됩니다. 번들 시작 파일은 `default_tooltip_gui.json`입니다.

## 주요 기능

- 캔버스 크기를 정하고 텍스트, 값, 구분선, 이미지와 아이템 미리보기를 배치합니다.
- 2D 아이콘 또는 크기가 자동 보정되는 3D 아이템 모델을 선택하고 배율, 회전과 회전 속도를 조절합니다.
- 배경, 프레임, 텍스트와 아이템의 등장 효과를 설정하고 에디터에서 다시 재생합니다.
- 저장할 요소는 출력 캔버스 안에 완전히 들어오도록 배치합니다.

런타임 툴팁은 실제로 마우스를 올린 아이템과 그 아이템 데이터를 사용합니다. 화면보다 세로로 길면 바깥 프레임을 유지한 채 내부 내용을 스크롤할 수 있습니다.

크리에이티브 인벤토리의 아이템에도 사용자 툴팁을 적용할 수 있습니다. 일반 버튼 도움말과 에디터의 마우스 오버 도움말은 별도 렌더링을 사용하므로 Tooltip Maker가 대체하지 않습니다.
