---
title: 0.1.4 변경 사항
slug: release-0-1-4
order: 10
description: Forge 0.1.3에서 0.1.4로 바뀐 기능, 동작, 의존성, 마이그레이션 항목입니다.
product: core
category: 시작하기
section: getting-started
status: 안정
version: 0.1.4
audience: 제작자 / 운영자
tags:
  - release
  - migration
---

## 릴리스 범위

0.1.4는 단순 유지보수 패치가 아니라 대규모 시스템 릴리스입니다. 0.1.3 JAR과 직접 비교하면 클래스 706개와 비클래스 리소스 60개가 추가되었습니다. 기존 다이얼로그, 상점, 커런시, GUI, HUD, Remnant Message에 더해 퀘스트, 스탯, 데이터베이스 아이템, 팩션, 텔레포터, 팝업, 관리자, NPC 모델, 애니메이션/전투 스크립트가 에디터 체계에 들어왔습니다.

## 새 제작 시스템

| 시스템 | 0.1.4 추가 범위 |
| --- | --- |
| Quest | 퀘스트 팩, 챕터/카테고리, 목표, 보상, 선행 조건, 반복/완료 규칙, `After Complete`, `U` 저널 |
| Stat Builder | 커스텀 스탯 세트, 투자 비용, 속성 효과, 활성 세트, `Y` 투자 UI, `Go Stat Builder` |
| Item Editor | DRM 데이터베이스 아이템, 카테고리, 희귀도, 툴팁, 요구치, 보너스, 속성, 스케일링 |
| Faction | CustomNPCs 팩션 표시, 순서, 상태 스타일, 플레이어 개요 |
| Teleporter | 카테고리, 목적지, 조건, 커맨드, 페이드, 사운드, NPC 적용 |
| Popup | 재사용 팝업 정의, 충돌/시간 정책, GUI, 명령어/스크립트 호출 |
| Admin | 플레이어별 DRM/FTB 퀘스트, 발전과제, 팩션, 태그, storeddata 관리 |

## 중요한 동작 변경

- CustomNPCs는 이제 클라이언트와 서버 양쪽의 필수 의존성입니다.
- 아이템 스탯 요구치가 장착을 막지 않습니다. 미달 시 `Unmet penalty %`만큼 아이템의 스탯/속성/스케일링 기여분을 제거합니다.
- 퀘스트 이벤트 액션은 의도적으로 `After Complete`만 제공합니다. 보상 지급 성공 후 완료 상태가 될 때 한 번만 실행합니다.
- 텍스처 피커는 선택 후 `Apply`를 눌러야 대상에 기록합니다. 페이지 이동이나 필터 변경만으로 대상 값이 바뀌지 않습니다.
- 올바른 `texture.png.mcmeta` 애니메이션 메타데이터를 커스텀 PNG와 함께 전송합니다.
- 공용 에디터 단축키는 `Ctrl+S`, `Ctrl+Z`, `Ctrl+Y`/`Ctrl+Shift+Z`입니다. Undo 이력이 있는 에디터에서 적용됩니다.

## 업그레이드 체크리스트

1. `config/dochi_rpg_maker`를 백업합니다.
2. 서버와 모든 클라이언트에 0.1.4와 같은 CustomNPCs 버전을 설치합니다.
3. 한 번 실행한 뒤 새 GUI, 퀘스트, 스탯, 아이템, 텔레포터, 팝업 기본 템플릿을 확인합니다.
4. 운영 데이터는 사용자 ID로 저장하고, 보호된 기본 파일에서는 `Save As`로 시작합니다.
5. Iron's Spells, Combat Roll, CustomNPCs 데이터 게이지를 쓴다면 HUD 겹침을 확인합니다.
6. 실제 운영 전에 테스트 플레이어로 퀘스트 보상과 `After Complete` 액션을 검증합니다.

:::warning 기본 데이터
번들 기본 파일은 참고 템플릿이며 설치 버전에 따라 갱신될 수 있습니다. `default_*` 또는 sample 파일을 운영 데이터의 유일한 사본으로 사용하지 마세요.
:::
