---
title: 저장 경로·백업·샘플 사용
slug: battleworks-files
order: 280
description: 서버 파일 참조, 외부 수정 반영, 배포 자료와 업그레이드 경로를 설명합니다.
product: mob-editor
section: reference
category: BattleWorks
status: 사용 안내
version: 0.1.7
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 1. 파일 위치부터 구분하기

아래 경로의 기준은 **사용 중인 Minecraft 인스턴스 또는 서버 폴더**입니다.

| 경로 | 내용 |
| --- | --- |
| `config/dochi_rpg_maker/mobs/patterns/` | BattleWorks 전투 JSON |
| `config/dochi_rpg_maker/mobs/animations/` | DRM 모델 애니메이션 자산 |
| `config/dochi_rpg_maker/mobs/geometry/` | DRM 모델 지오메트리 자산 |
| `config/dochi_rpg_maker/particles/` | Particle Maker의 별도 JSON |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | 개인 에디터·표현 설정 |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | 공통 전투 허용 설정 |

옛 `mobs/*.json` 안내 대신 **mobs/patterns**를 사용합니다. 모델의 `.geo.json`이나 `.animation.json`을 전투 적용 목록에 넣지 않습니다.

## 2. 폴더와 파일 이름 정하기

```text
config/dochi_rpg_maker/
  mobs/
    patterns/
      training/
        first_sword.json
      bosses/
        training_captain.json
    animations/
    geometry/
  particles/
    training_ring.json
```

Save As와 전투 파일 참조에는 `bosses/training_captain.json`처럼 patterns 기준 상대 경로를 씁니다. 절대 경로, 드라이브 문자, `..`, 빈 경로 구간은 사용하지 않습니다.

파티클 파일 이름은 영문·숫자·밑줄·하이픈과 하위 폴더 형태를 사용하면 됩니다. 명령어에서만 `.json`을 빼고 입력합니다.

## 3. NPC는 서버 파일을 참조합니다

현재 적용 방식은 NPC NBT에 전체 전투 JSON을 복사하는 방식이 아닙니다. NPC가 **전투 파일 경로와 작은 플래그를 저장**합니다.

1. 하나의 파일을 여러 NPC에 적용하면 같은 전투 설계를 공유합니다.
2. NPC별로 다르게 만들려면 Save As로 파일을 나눕니다.
3. NPC 클론이나 월드만 옮겼다면 참조하는 전투 JSON도 함께 옮깁니다.
4. 파티클·팝업·모델·스킬 같은 외부 참조도 새 환경에 준비합니다.

Load는 편집 화면에 파일을 여는 작업이고, Apply는 NPC를 그 파일에 연결하는 작업입니다. Save As 이후 NPC 적용 여부는 [설치 안내](#mob-editor/mob-editor-setup)의 표를 따릅니다.

![서버 파일로 저장하고 DNPC에 연결한 전투 편집 화면.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. 화면의 경로 표시는 짧게 보이지만 실제 확인한 파일은 config/dochi_rpg_maker/mobs/patterns/training/first_sword.json입니다. 다른 서버로 옮길 때도 이 전투 파일을 함께 준비합니다.")

## 4. 외부 편집기의 수정 반영하기

1. 해당 JSON의 백업을 만듭니다.
2. 외부 편집기에서 값을 바꾸고 저장합니다.
3. JSON 문법 검사를 통과하는지 봅니다.
4. 에디터의 파일 목록을 새로고침하여 파일을 불러옵니다.
5. NPC에 해당 파일을 **다시 적용**하거나 서버를 재시작합니다.
6. 실제 전투로 바뀐 값을 확인합니다.

전투 중에는 매 틱 파일을 다시 읽지 않고 서버 캐시를 사용합니다. 목록 Refresh만 누르고 기존 NPC의 전투가 자동 변경되었다고 판단하지 마세요. 파티클 저장소는 별도 캐시를 사용하므로 전투 파일과 파티클 파일의 반영 절차를 혼동하지 않습니다.

## 5. 문서에 포함된 연습 파일

| 파일 | 사용하는 곳 | 필요한 준비 |
| --- | --- | --- |
| [first_sword.json](./assets/media/battleworks/first_sword.json) | `mobs/patterns/training/` | BattleWorks 0.1.6·DNPC 0.1.3·NeoForge 1.21.1에서 실제 저장·적용·피해 확인 |
| [training_swordsman.json](./assets/media/battleworks/training_swordsman.json) | `mobs/patterns/training/` | 일반 인간형 DNPC 또는 지원하는 구형 NPC; 보조 탐색 사용 |
| [training_ring.json](./assets/media/battleworks/training_ring.json) | `particles/` | Particle Maker 또는 /drm particle 명령 |

**first_sword.json**은 실제 UI 저장·피해 검증 파일이며, **training_swordsman.json**은 일반 인간형과 보조 탐색을 사용하는 JSON 실습 예제입니다. 사용할 NPC와 전투 조건을 확인한 뒤 적용하세요.

브라우저에서 JSON이 열리면 파일로 저장합니다. `.json.txt`로 저장되지 않았는지 확장자를 확인하세요. 두 파일은 각각 전투와 시각 효과이므로 서로 폴더를 바꿔 넣지 않습니다.

실습 파일의 외부 ID는 기본 팔 휘두르기·바닐라 사운드·바닐라 파티클만 사용합니다. 전투 파일에는 저장된 모델 설정이 없어 기본 예제 자체가 별도 모델 자산을 요구하지 않습니다.

## 6. 추가 훈련 팩과 Jar Fist 샘플

별도 배포되는 30개 훈련 파일은 소스의 `examples/training-pack/mobs/patterns/`에서 관리됩니다. **모드 시작 시 자동 설치되는 샘플이 아닙니다.** 해당 팩을 실제로 받은 경우에만 서버 patterns 폴더에 복사합니다.

`1_sword.json`, `1_tutorial.json`, `2_tutorial_irons.json` 등의 이름은 난이도·연동 종류를 구분합니다. 각 파일의 `authoring.requiredMods`와 `authoring.steps`를 확인하세요. 물리 공격용 훈련 파일도 지정된 Better Combat 모션을 사용할 수 있어 “마법 없음 = 추가 의존성 없음”은 아닙니다.

| Jar Fist 파일 | 목적 |
| --- | --- |
| `battleworks_sample_jar_fist_preview.json` | 전투 꺼짐·피해 0인 미리보기 |
| `battleworks_sample_jar_fist_combat.json` | 추적·검 공격·후퇴 전투 테스트 |

이 샘플은 JAR의 samples 자료에서 제공될 수 있으며 사용할 때 patterns 폴더에 둡니다. **Jar Fist 모델·텍스처·애니메이션 자산은 별도**입니다. `ready_to_fight`, `sword_attack`, `sword_attack2`, `roll`이 있는 해당 모델 구성을 전제로 하므로 다른 NPC라면 실제 클립으로 교체합니다.

모드에 포함되는 기본 템플릿과 별도 보스 자료는 구분합니다. 불·얼음·번개·Arkel 보스나 사용자 음악·팝업이 모드 업데이트만으로 모두 설치된다고 가정하지 마세요.

## 7. 업그레이드와 이전 파일

1. JAR을 바꾸기 전에 월드와 config를 백업합니다.
2. Minecraft·로더가 맞는 BattleWorks 0.1.7을 설치하고 이전 BattleWorks·Mob Editor JAR 중복을 제거합니다.
3. DRM은 선택 사항입니다. 해당 기능을 사용한다면 환경에 맞는 DRM·제공자 의존성을 확인합니다.
4. 전투 파일을 다시 열어 NPC 연결·모델·스킬·소리를 확인합니다.
5. 다시 적용하고 실제 전투·정리·재시작 후 유지를 시험합니다.

인식 가능한 이전 전투 파일은 mobs에서 patterns로 이동할 수 있으며 원본 바이트는 config/dochi_rpg_maker/backups/battleworks-mobs-patterns-v1에 백업합니다. 충돌 파일과 알 수 없는 모델 JSON은 보존합니다. 파일을 정리한 뒤에는 직접 다시 적용하세요. 이름이 중복되면 참조 복구가 확실하지 않습니다.

모드 ID는 dochi_battleworks를 유지합니다. 이전 모델 변환이 누락된 모델 제공자까지 대신하지는 않습니다. CustomNPCs 의존 NPC와 에셋은 지원하는 이전 대상에만 해당하며 26.3의 네이티브 연동으로 사용할 수 없습니다.

## 8. 다른 서버에 전달할 자료

전투 파일, 파티클 파일, 모델 자산, 사운드 리소스, 팝업·GUI, 클론 자료, 요구 모드 버전을 함께 정리합니다. **새 환경의 일반 NPC에 Load·Apply하여 실제로 실행되는지** 확인한 뒤 배포합니다.

문제가 있으면 [JSON 참고](#mob-editor/battleworks-json-reference)와 [문제 해결](#mob-editor/battleworks-troubleshooting)로 이어갑니다.

## 플레이어별 기술 보관함

**기술 저장**은 현재 서버의 해당 플레이어 보관함에 재사용 묶음을 저장합니다. 서버 경로는 `config/dochi_rpg_maker/battleworks/pattern_library/<UUID>/`이며 플레이어당 유효 항목 128개까지 저장합니다. DRM이 없어도 경로는 dochi_rpg_maker 아래를 사용합니다.

**내 기술 → 기술 불러오기**로 다른 전투 문서에 가져옵니다. 패턴과 연결 리소스는 새 ID로 들어갑니다. 참조한 서버 파티클 파일은 포함할 수 있지만 외부 모델·소리·스킬과 해당 모드는 별도 의존성입니다. NPC의 전투 JSON만 복사해도 개인 보관함이 같이 옮겨지지는 않습니다. [레시피와 복사 흐름](#mob-editor/battleworks-authoring)을 참고하세요.

실행 취소는 문서를 되돌리며 이미 저장한 보관함 항목을 삭제하지 않습니다. 서버를 옮길 때는 서버 전투 파일과 보관함을 함께 백업하세요.
