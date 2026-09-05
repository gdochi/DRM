---
title: 설치와 NPC 전투 스펙 적용
slug: mob-editor-setup
order: 220
description: 필수 모드를 설치하고 Battleworks 문서를 NPC에 저장합니다.
product: mob-editor
section: start
category: Battleworks
status: 사용 안내
version: 0.1.0
audience: 전투 콘텐츠 제작자
tags:
  - battleworks
  - CustomNPCs
  - combat
---

## 설치 환경

| 항목 | 지원 기준 |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| 모드 로더 | Forge 47 이상, 1.20.1용 |
| Java | 17 |
| Dochi's Battleworks | 0.1.0 |
| Dochi's RPG Maker | Forge 1.20.1용 0.1.4 이상, 필수 |
| CustomNPCs | Forge 1.20.1 호환 버전, 필수 |

서버와 접속 클라이언트에 같은 Battleworks·DRM 버전과 호환되는 CNPC를 설치합니다. Fabric 빌드는 이 문서의 대상이 아닙니다. 선택 연동을 사용한다면 그 모드와 해당 모드의 의존성도 맞춰 설치합니다.

## 에디터 열기

1. 크리에이티브에서 DRM의 **Dochi RPG Maker Core** 아이템을 준비합니다.
2. 허공에 우클릭해 에디터 선택 화면을 열고 **Battleworks**를 선택합니다.
3. 특정 NPC를 편집하려면 Core로 CustomNPCs NPC를 우클릭해 대상이 있는 화면으로 들어갑니다.
4. 사용할 모델과 기본 애니메이션 연결은 DRM의 **NPC Basic**에서 먼저 설정합니다.

NPC의 팩션, 적대 대상, 일반 대기 동작은 CNPC에서 준비합니다. Battleworks는 NPC 전투 문서를 적용하는 도구이며 NPC 모델 자산을 만드는 도구는 아닙니다.

## 첫 공격 만들기

1. **Create New**로 새 문서를 만들거나 **Load**로 기본 전투 문서를 불러옵니다.
2. **Pattern Workbench → Add**로 패턴을 만듭니다.
3. Windup, Action, Recovery의 길이를 정하고 **Action → + Action**에서 Hitbox 액션을 추가합니다.
4. **Choose from list**에서 히트박스를 선택하거나 새로 만듭니다.
5. **Edit this hitbox**로 이동해 크기와 위치를 맞춥니다. 클립을 사용할 경우 Action 단계를 선택하고 클립을 지정한 뒤 **Play**로 확인합니다.
6. **Save As**로 `my_boss.json` 같은 별도 파일에 저장합니다.
7. NPC 적용 화면에서 해당 Battleworks 전투 스펙을 선택해 적용합니다.

파일은 `config/dochi_rpg_maker/mobs/my_boss.json`에 저장됩니다. 기본 문서는 시작용 템플릿으로 보존하고, 실제 작업본은 다른 이름으로 저장합니다.

## Save와 Save As의 차이

- **Save**: NPC를 대상으로 열었다면 NPC에 현재 문서를 저장합니다. 불러온 파일 경로가 있으면 그 파일도 저장합니다.
- **Save As**: 지정한 이름으로 JSON 파일을 저장합니다. 이 동작만으로 NPC의 전투 스펙이 갱신되지는 않습니다.
- NPC 없이 새 문서를 편집 중이라면 **Save**가 파일 이름 입력을 엽니다.

NPC는 적용한 문서 사본을 자체 저장합니다. JSON 파일을 나중에 고쳤다면 NPC에 다시 적용하거나, NPC를 대상으로 에디터를 열어 **Save**해야 합니다.

## 전투 확인

에디터를 닫고 생존 모드의 적대 대상으로 시험합니다. 크리에이티브·관전자 플레이어는 Battleworks의 유효한 전투 대상에서 제외됩니다. 미리보기 전용 샘플은 전투가 꺼져 있으므로 [전투 샘플](#mob-editor/battleworks-files)을 적용해야 실제 추적과 피해를 확인할 수 있습니다.

