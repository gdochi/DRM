---
title: 설치와 NPC 준비
slug: mob-editor-setup
order: 220
description: 필수 모드 설치, 테스트 NPC 준비, 에디터 진입과 저장·적용 차이를 설명합니다.
product: mob-editor
section: start
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - tutorial
  - combat
---

## 1. 같은 버전의 실행 환경 준비하기

| 항목 | 이 안내의 기준 |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| 로더 | Minecraft 1.20.1용 Forge 47 계열 |
| Java | 17 |
| BattleWorks | 0.1.3 |
| Dochi RPG Maker / DRM | Forge 1.20.1용 0.1.7 이상, 필수 |
| CustomNPCs | Forge 1.20.1 호환 버전, 필수 |

1. 사용할 Minecraft 인스턴스의 `mods` 폴더에 BattleWorks, DRM, CustomNPCs와 각 모드가 요구하는 의존성을 넣습니다.
2. 이전 BattleWorks나 구형 Mob Editor JAR가 함께 들어 있지 않은지 확인합니다. 0.1.3의 모드 ID는 `dochi_battleworks`입니다.
3. 게임을 실행하고 모드 목록에서 세 모드가 로드되었는지 확인합니다.
4. 멀티플레이에서는 서버와 접속 클라이언트의 BattleWorks·DRM 버전을 맞춥니다. 연결해서 사용할 스킬·모델 모드와 리소스도 함께 맞춥니다.

이 문서는 Forge용입니다. 별도 NeoForge 빌드의 설치 조건은 이 표에서 추정하지 마세요.

## 2. 선택 모드는 나중에 붙이기

| 하고 싶은 일 | 추가로 준비할 것 |
| --- | --- |
| 일반 NPC의 기본 팔 휘두르기와 히트박스 공격 | 위 필수 환경으로 시작 |
| Better Combat 무기 모션 | 호환 Better Combat과 해당 의존성·지원 무기 |
| Gecko 모델의 클립 재생 | DRM NPC Basic의 모델·텍스처·애니메이션 설정과 해당 제공 모드 |
| Player Animator 클립 | 호환 제공 모드와 실제 클립 |
| Iron's Spellbooks, Cataclysm, Mowzie 마법 | 해당 모드와 의존성, 게임 안 목록에 표시되는 스킬 |
| 사용자 사운드·텍스처 | 실제 ID를 등록하는 모드 또는 리소스팩 |

처음부터 모든 선택 모드를 설치할 필요는 없습니다. [첫 공격 실습](#mob-editor/battleworks-first-attack)은 추가 마법·애니메이션 모드 없이 진행합니다.

## 3. 연습용 NPC와 공간 준비하기

1. 크리에이티브에서 CustomNPCs의 제작 도구로 일반 인간형 NPC 한 명을 만듭니다.
2. CustomNPCs에서 이름을 “연습 검사”, 최대 체력을 `100` 정도로 설정합니다. 이 값은 실습 권장값입니다.
3. NPC에 검을 쥐여 줍니다. 피해량은 뒤에서 BattleWorks Hitbox에 별도로 입력합니다.
4. 생존 플레이어를 적대 대상으로 삼도록 CustomNPCs의 팩션·타겟 설정을 준비합니다.
5. 주변에 다른 NPC·주민이 없는 평평한 연습장을 마련합니다. 처음에는 계단, 물, 좁은 문을 피합니다.

**완료 확인:** NPC가 존재하고, CustomNPCs 설정 화면에서 체력·장비·적대 대상을 확인할 수 있으면 다음으로 갑니다.

## 4. NPC를 대상으로 에디터 열기

1. 크리에이티브 검색에서 DRM의 **Dochi RPG Maker Core** 아이템을 준비합니다.
2. Core로 연습 NPC를 우클릭하여 대상이 있는 에디터 선택 화면을 엽니다.
3. **BattleWorks**를 선택합니다. 대상 NPC가 맞는지 확인합니다.
4. 모델을 바꿀 계획이라면 **NPC Basic**에서 먼저 모델과 자산을 준비한 뒤 BattleWorks로 돌아옵니다.

Core를 허공에 사용하면 NPC 없이 새 전투 파일을 만들 수도 있습니다. 이때는 파일 제작과 미리보기는 가능하지만, 저장만으로 월드의 NPC가 자동 선택되지는 않습니다. Particle Maker는 NPC 없이도 사용할 수 있습니다.

편집 작업은 크리에이티브 상태에서 진행합니다. 전투 시험 때는 에디터를 닫고 생존 상태로 바꿉니다. 크리에이티브·관전자 플레이어는 전투 대상에서 제외됩니다.

## 5. 파일 저장과 NPC 적용 구분하기

| 버튼 / 상황 | 실제로 하는 일 | 이후 할 일 |
| --- | --- | --- |
| Load | 서버의 파일을 편집 화면으로 불러옴 | 수정 후 저장하거나 NPC에 적용 |
| Save As | 지정한 경로의 JSON 파일을 저장 | 새 경로를 NPC에 적용하거나, 대상 편집 상태에서 Save |
| NPC를 대상으로 연 상태의 Save | 현재 내용을 저장하고 해당 NPC에 연결 | 닫고 전투 시험 |
| NPC 없이 파일을 불러온 상태의 Save | 현재 파일에 덮어쓰기 | 필요한 NPC에서 적용 상태 확인 |
| NPC 없이 새 문서의 Save | 파일 이름 입력 열기 | 파일 저장 후 NPC에 적용 |
| NPC 적용 목록에서 선택·적용 | 선택 파일의 서버 경로를 NPC에 연결 | 실제 전투 시험 |

예를 들어 Save As에 `training/first_sword.json`을 입력하면 서버의 다음 위치에 저장됩니다.

```text
config/dochi_rpg_maker/mobs/patterns/training/first_sword.json
```

입력창에는 `training/first_sword.json`만 넣습니다. `config/...` 전체 경로나 Windows 드라이브 경로를 입력하지 않습니다.

기본 파일은 읽기 전용 템플릿입니다. **Save As로 작업용 이름을 만든 뒤** 수정본을 적용하세요. NPC를 대상으로 열었다면 Save As 이후 **Save**를 눌러 그 NPC를 새 경로에 연결할 수 있습니다.

## 6. 저장되었는지 확인하기

1. 저장 후 오류가 없는지 확인합니다. 오류가 있으면 화면의 입력값과 참조를 먼저 고칩니다.
2. 에디터를 다시 열거나 Load 목록을 새로고침하여 파일이 보이는지 확인합니다.
3. NPC 적용 목록에서 작업 파일을 선택해 적용합니다.
4. 생존 모드에서 전투를 확인합니다.

서버 접속 중 만드는 파일은 **서버의 config**에 저장됩니다. 자기 PC의 별도 싱글플레이 config에 복사해도 원격 서버 목록에 나타나지 않습니다.

현재 NPC는 전체 JSON 사본 대신 파일 경로를 참조합니다. 같은 파일을 여러 NPC가 공유할 수 있으므로, 서로 다른 보스를 만들 때는 각각 Save As로 파일을 분리하세요.

이제 [첫 근접 공격 실습](#mob-editor/battleworks-first-attack)으로 진행합니다.
