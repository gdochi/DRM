---
title: Fabric 0.2.0 업데이트
slug: release-notes-0-2-0
order: 8
description: Fabric 0.2.0의 Tooltip Maker, 공용 도움말, 대화 연출과 Gecko 애니메이션 개선 사항입니다.
product: core-fabric
category: 시작하기
section: getting-started
status: 안정
version: 0.2.0
audience: 제작자 / 운영자
---

## 변경 사항 0.2.0

### Changed

- 여러 에디터의 입력칸과 버튼이 내용에 맞는 간결한 너비를 사용하도록 개선했습니다.
- 공용 마우스 오버 도움말이 자동 줄바꿈과 화면 가장자리 보정을 적용하고 에디터 위쪽 레이어에 안정적으로 표시됩니다.
- Gecko 애니메이션 재생이 서버 시간축을 기준으로 동기화되며 늦게 표시를 시작한 플레이어도 현재 재생 위치를 따라갑니다.

### Added

- 아이템 툴팁 레이아웃, 2D·3D 아이템 미리보기, 이미지, 텍스트, 스크롤과 등장 효과를 제작하는 **Tooltip Maker**를 추가했습니다.
- 플레이어 머리 HUD 렌더링을 추가했습니다.
- 노드별 대화 선택지 글자 크기와 선택형 펄스 강조 효과를 추가했습니다.
- Gecko 애니메이션 Start Route에 Goto 대상을 연결할 수 있습니다.

### Fixed

- Goto나 Close 같은 대화 이동 액션 뒤의 애니메이션, 명령어, 태그, 아이템 액션이 실행되지 않던 문제를 수정했습니다.
- Gecko 미리보기의 탐색·재시작, 에셋 재요청, 로딩 실패 시 기본 렌더러 복귀를 개선했습니다.
- GUI Maker, Quest Editor, Faction Editor 등의 겹침, 과도하게 늘어난 컨트롤과 잘못된 입력칸 클리핑을 수정했습니다.

### 업데이트 안내

월드와 `config/dochi_rpg_maker/`를 백업한 뒤 서버와 모든 클라이언트에 같은 DRM Core 0.2.0 JAR을 설치하세요. 이 Fabric 빌드는 CustomNPCs가 계속 필요합니다. 보호된 기본 파일을 수정할 때는 `Save As`로 복사본을 만드세요.
