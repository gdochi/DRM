---
title: 설치와 NPC 준비
slug: mob-editor-setup
order: 220
description: 필수 모드 설치, 테스트 NPC 준비, 에디터 진입과 저장·적용 차이를 설명합니다.
product: mob-editor
section: start
category: BattleWorks
status: 사용 안내
version: 0.1.7
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - tutorial
  - combat
---

## 1. 실습 환경 준비하기

Minecraft 버전과 로더가 일치하는 BattleWorks **0.1.7** 파일을 사용하세요. 서버·클라이언트 환경을 맞추고 선택한 파일에 표시된 의존성을 설치합니다.

| Minecraft | BattleWorks 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric 또는 NeoForge | 21 |
| 26.3 | Fabric 또는 NeoForge | 25 |

**DRM은 필수가 아닙니다.** 단독 편집기도 사용할 수 있습니다. 이 실습의 NPC는 DNPC로 준비합니다. DRM·외부 애니메이션 라이브러리·마법 모드·모델 제공자는 사용하는 기능에 맞춰 추가하세요. 해당 리소스는 전투 JSON과 별개입니다.

CustomNPCs는 Forge 1.20.1과 Fabric / NeoForge 1.21.1에서 선택 연동으로 남아 있습니다. 26.3 이상에서는 제외되므로 DNPC를 사용하세요. 아래에 남아 있는 0.1.6 스크린샷과 영상은 실제 촬영 버전을 그대로 표시합니다.

## 2. 연습용 DNPC 만들기

1. 크리에이티브에서 [DNPC 만들기](#dochi-npc-core/npc-core-setup)를 따라 NPC 한 명을 배치합니다.
2. 이름을 알아보기 쉽게 정하고 일반 플레이어 모델로 시작합니다.
3. 주변에 다른 NPC·몹이 없는 평평한 공간을 준비합니다.
4. 이번 첫 공격은 BattleWorks의 **Scan Without Target**로 플레이어를 찾습니다. DNPC의 작업·다른 전투 모드로 같은 NPC를 동시에 움직이지 않게 합니다.
5. 제작은 크리에이티브, 공격 시험은 서바이벌에서 진행합니다.

![DNPC의 Identity 화면에서 연습 NPC를 준비하는 예.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. 이 NPC에 BattleWorks 전투 파일을 연결합니다. 외형·장비를 바꾸는 것과 BattleWorks의 실제 피해·판정 설정은 따로입니다.")

검을 쥐여 주면 공격 의도를 보여 주기 좋습니다. 이 실습의 피해는 검 아이템의 공격력 대신 BattleWorks Hitbox에 입력합니다. NPC의 체력을 높이는 것은 이후 보스 실습에서 진행해도 됩니다.

## 3. NPC를 대상으로 BattleWorks 열기

1. 크리에이티브의 BattleWorks 전용 탭에서 **배틀워크스 완드**를 찾습니다. DNPC 탭이 있으면 그곳에도 표시됩니다.
2. 지원 NPC에게 지팡이를 사용하면 해당 NPC의 편집기 선택 화면이 열립니다. 허공에 사용하면 NPC 연결 없이 작성합니다. 편집 명령은 `/battleworks editor`이며 서버 권한이 필요합니다.
3. BattleWorks에서 **기존 파일 불러오기**, **기본값 사용**, **새로 만들기** 중 하나를 선택합니다. 기본 예제는 작업 복사본으로 저장하세요.
4. [간단 편집과 레시피](#mob-editor/battleworks-authoring) 또는 [첫 근접 공격](#mob-editor/battleworks-first-attack)으로 진행합니다.

DRM이 있으면 기존 Core 진입도 사용할 수 있습니다. NPC 적용 분류는 **Battlework JSON**입니다. NPC 없이 만든 파일은 해당 NPC의 파일 목록에서 선택한 뒤 **Apply Battlework**로 적용하세요. 다른 모델을 쓸 때는 외형 설정과 [애니메이션 연결](#mob-editor/battleworks-animation)을 먼저 준비합니다.

## 4. 추가 모드는 필요한 기능부터 준비하기

| 하고 싶은 일 | 추가로 준비할 것 |
| --- | --- |
| 기본 팔 휘두르기와 히트박스 공격 | 위 실습 환경으로 시작 |
| Better Combat 무기 모션 | 호환 Better Combat과 해당 모션·지원 무기 |
| Gecko 모델의 클립 | 모델·텍스처·애니메이션 자산과 제공 모드 |
| Player Animator 클립 | 호환 제공 모드와 실제 클립 |
| 타 모드 마법·스킬 | 해당 모드와 의존성, 게임 안에 등록된 스킬 |
| 사용자 사운드·텍스처 | 해당 ID를 제공하는 모드 또는 리소스팩 |

기본 첫 공격을 확인한 뒤 추가 모션이나 스킬을 연결하면, 파일 적용 문제와 외부 자산 문제를 구분하기 쉽습니다.

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
