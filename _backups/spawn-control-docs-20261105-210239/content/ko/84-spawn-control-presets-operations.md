---
title: 프리셋, 공유와 운영
slug: dochi-spawn-control-presets-operations
order: 850
description: 저장과 불러오기, 파일 경로, 프리셋 충돌 정책과 문제 해결을 설명합니다.
product: dochi-spawn-control
category: 프리셋과 운영
section: operations
status: 사용 안내
version: 0.1.4
audience: 서버 운영자와 콘텐츠 배포자
tags:
  - presets
  - troubleshooting
---

## 저장 동작

다음 표는 **자연 스폰 에디터**의 저장 동작입니다. 배치형 스포너의 저장과 적용은 아래에서 별도로 설명합니다.

| 작업 | 결과 |
| --- | --- |
| `저장` | 현재 초안을 활성 `spawn_control.json`에 저장하고 즉시 적용 |
| `다른 이름으로 저장 → 전체 세트` | 모든 규칙, 원본 스폰 정책, 전역 스케줄러 예산을 이름 있는 세트로 저장하고 활성화 |
| `다른 이름으로 저장 → 현재 대상 프리셋` | 현재 엔티티 또는 클론에 귀속된 모든 규칙과 권장 원본 스폰 정책만 저장 |
| `초기화` | 저장된 활성 설정이 아니라 에디터를 열거나 마지막 저장 응답을 받은 시점의 초안 기준으로 복귀 |
| `새로 만들기` | 빈 세트 초안을 시작. 저장하기 전에는 서버 활성 설정을 바꾸지 않음 |

대상 프리셋에는 전역 스케줄러 예산이 들어가지 않습니다. 다른 서버에 몹 한 종류의 규칙만 가져갈 때 기존 서버 운영 예산을 덮지 않기 위한 정책입니다.

## 소 규칙만 다른 서버로 가져가기

자연 스폰 편집기 왼쪽에서 `minecraft:cow`를 찾고 **Add Rule**로 규칙을 만듭니다. 조건을 완성한 뒤 **Save As**를 누르면 저장 범위를 고르는 창이 나옵니다.

![Complete Set과 Current Target Preset을 고르는 Save As 창.](assets/media/guides/spawn-control-014-neo1211/spawn-preset-scope.png "Spawn Control 0.1.4 / NeoForge 1.21.1. 서버 전체 구성을 옮길 때는 Complete Set, 지금 선택한 소의 규칙만 옮길 때는 Current Target Preset을 고릅니다.")

**Current Target Preset**을 고르고 **Display Name**에 `Meadow Cows`, **Stable ID**에 `meadow_cows`를 입력한 뒤 **Save As**를 누릅니다. `Target preset saved. The active set was not changed.`가 나오면 저장된 것입니다. **이 저장은 현재 서버의 활성 규칙을 바꾸지 않습니다.** 지금 서버에서도 작동시키려면 편집기로 돌아가 상단 **Save**를 사용합니다.

![meadow_cows 대상 프리셋을 저장한 응답.](assets/media/guides/spawn-control-014-neo1211/spawn-target-preset-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. 실제 생성된 targets/meadow_cows.json을 확인했습니다. 이름은 목록 표시용이고 Stable ID가 파일을 구분합니다.")

받는 서버의 `targets/`에 파일을 넣고 **Load → Target Presets**에서 선택합니다. 같은 소 규칙을 바꿀지, 기존 규칙도 남길지는 아래 충돌 정책에서 정합니다.

## 저장 경로

모든 제작 문서는 게임 또는 서버 실행 폴더의 공용 `config` 아래에 둡니다. 싱글플레이에서는 인스턴스의 `minecraft` 폴더가 기준이며 같은 인스턴스의 월드들이 문서를 공유합니다. 멀티플레이에서는 접속한 서버의 폴더가 기준입니다. 클라이언트에만 복사한 파일은 서버 목록에 나오지 않습니다.

```text
config/dochi_rpg_maker/spawn_control/
├─ spawn_control.json
├─ spawn_control.json.bak
├─ sets/
│  └─ <set-id>.json
├─ targets/
│  └─ <target-preset-id>.json
└─ spawners/
   └─ examples/mixed.json
```

자연 스폰 활성 설정과 프리셋은 임시 파일을 거쳐 저장하며 기존 파일의 이전 버전을 `.bak`으로 남깁니다. `spawners/`의 JSON도 임시 파일을 거쳐 교체하지만 자동 `.bak`은 만들지 않으므로 따로 백업하세요.

## 스포너 JSON 저장과 적용

`Spawner Editor`의 `Save`는 제작 문서만 저장합니다. 설치된 스포너를 바꾸려면 DRM Core로 그 스포너를 우클릭하고 저장된 파일을 골라 `Apply JSON`을 누릅니다. 파일 하나를 고쳤다고 같은 파일을 적용했던 모든 스포너가 자동 갱신되지는 않습니다.

`spawners/`의 JSON을 공유할 수 있습니다. 파일은 클론 원본을 포함하지 않으므로 CNPC 서버 클론이나 DW 템플릿, 해당 엔티티·모델·파티클·사운드를 제공하는 모드도 준비하세요.

### 스포너 파일 목록이 비어 있음

서버의 `config/dochi_rpg_maker/spawn_control/spawners/`에 저장했는지 확인하고 `Refresh`를 누르세요. 월드의 serverconfig 폴더는 제작 문서 경로가 아닙니다. 검색어를 비우고 JSON 오류가 있는지도 확인하세요.

### 설치한 스포너가 작동하지 않음

새 스포너는 JSON을 적용하기 전에는 작동하지 않습니다. 적용한 파일의 `Enabled`, 플레이어·크리에이티브 포함 조건, 시간, 배치 공간과 생성 제한을 확인하세요. 양수 확률의 항목에 필요한 모드나 클론이 없으면 해당 스포너가 중단될 수 있습니다. [스포너 조건과 효과](#dochi-spawn-control/dochi-spawn-control-spawner-settings)에서 설정을 확인하세요.

## 불러오기와 충돌 정책

전체 세트를 불러오면 활성 세트 전체를 교체하므로 확인 단계를 거칩니다. 대상 프리셋은 현재 화면의 미저장 초안을 기준으로 병합하며 다음 정책을 선택합니다.

| 정책 | 동작 |
| --- | --- |
| `대상 교체` | 같은 대상에 귀속된 기존 규칙을 지우고 프리셋 규칙으로 교체 |
| `ID 기준 병합` | 같은 대상과 같은 프로필 ID를 교체하고 나머지는 유지 |
| `둘 다 유지` | 기존 규칙을 유지하고 충돌하는 ID에는 새 고유 ID를 부여 |

대상 프리셋의 권장 원본 스폰 정책은 `둘 다 유지`가 아닐 때 등록 엔티티에 적용될 수 있습니다. 불러온 뒤 `원본 스폰: ON/OFF`를 반드시 확인하세요.

## 공유

`sets/` 또는 `targets/`의 JSON 파일을 배포하면 됩니다. 프리셋에는 필요한 모드 namespace가 `requiredMods`로 기록됩니다.

- 일반 모드 엔티티 프리셋을 받는 서버에는 해당 EntityType을 등록하는 모드가 필요합니다.
- CustomNPCs 대상 프리셋에는 `customnpcs` 요구 사항이 기록되지만 클론 본문은 들어가지 않습니다.
- 같은 탭과 이름의 서버 클론을 별도로 배포해야 합니다.
- 대상이 없어도 파일 전체를 삭제하지 않고 해당 프로필만 오류/비활성 상태로 격리합니다.

## 문제 해결

### 선택한 엔티티에 다른 엔티티 규칙이 보임

1. 가운데 보기가 `선택 대상`인지 확인합니다. `전체 구성`은 의도적으로 모든 대상 규칙을 표시합니다.
2. 인스펙터 아래 실제 EntityType 또는 클론 표시를 확인합니다.
3. 현재 UI에 `선택 대상`과 `전체 구성` 버튼이 없고 구형 `Target / + / All / P / Name` 구조만 보이면 오래된 JAR입니다.
4. 클라이언트와 서버의 `mods/`에서 중복 JAR을 제거하고 같은 최신 빌드로 맞춘 뒤 완전히 재시작합니다.

현재 빌드는 규칙이 없는 새 대상을 선택하면 이전 프로필 선택과 인스펙터를 비웁니다. 대상 간 규칙 상속은 없습니다.

### 프로필을 켰지만 스폰되지 않음

다음 순서로 확인합니다.

1. `고급 진단 → 현재 위치 검사` 실행
2. 차원, 시간, Y, 바이옴, 조도, 플레이어 거리 확인
3. 대상에 맞는 지상/동굴/공중/수중 배치 방식 확인
4. 스폰 확률과 검사 간격 확인
5. 서버, 차원, 청크, 플레이어, 프로필, 대상, 공유 그룹 제한 확인
6. 후보 청크가 실제로 로드돼 있는지 확인
7. 다른 모드가 Forge 스폰 이벤트를 거부하는지 서버 로그 확인

### Check Here에서 거리만 FAIL이라고 나옴

![현재 위치 검사 결과에서 Player Distance만 FAIL인 예.](assets/media/guides/spawn-control-014-neo1211/spawn-diagnostics-check.png "Spawn Control 0.1.4 / NeoForge 1.21.1. 현재 위치는 플레이어 바로 옆이라 nearest=0.5, 규칙은 24.0~96.0블록을 요구합니다. 다른 조건이 PASS여도 이 자리에는 생성되지 않습니다.")

**Check Here**는 내가 서 있는 위치를 검사합니다. 기본 최소 거리가 24블록이라면 내 발밑 검사에서 거리가 실패하는 것이 자연스럽습니다. 이 결과만으로 주변 모든 후보 위치도 실패한다고 판단하지 마세요.

**Spawn One → Confirm Spawn**은 실제 관리 엔티티 한 마리를 생성하는 시험입니다. 저장 전 초안을 사용하며 자연 생성 한 주기를 기다리는 기능과 다릅니다. 시험한 개체를 지우려면 해당 규칙의 **Clear Generated**를 누릅니다.

![Spawn One과 Confirm Spawn 뒤 PASS와 생성한 개체 UUID가 표시된 모습.](assets/media/guides/spawn-control-014-neo1211/spawn-diagnostics-spawn.png "Spawn Control 0.1.4 / NeoForge 1.21.1. cow 규칙의 수동 생성 요청이 성공했습니다. 프리셋 저장과 활성 세트 저장은 별도 작업입니다.")

### 프로필이 자동 비활성화됨

- `MISSING ENTITY`: 해당 EntityType을 등록하는 모드가 없음
- `MISSING CLONE`: 저장된 CustomNPCs 탭/클론 이름이 없음
- `CUSTOMNPCS NOT LOADED`: 클론 규칙인데 CustomNPCs가 설치되지 않음
- `ADAPTER REQUIRED OR UNSUPPORTED`: `MISC`, CustomNPCs 빈 EntityType 또는 특수 생성 경로가 필요한 대상
- `RUNTIME ERROR`: 대상 어댑터 실행 중 격리된 오류 발생

### 원본 몹과 관리 몹이 너무 많이 등장함

원본 스폰과 관리 프로필이 동시에 켜져 있는지 확인합니다. 관리 규칙을 충분히 시험했다면 해당 등록 엔티티의 `원본 스폰: OFF`를 저장합니다. 그 뒤 관리 프로필과 대상/서버 제한을 조정하세요.

## 백업 권장 범위

- `config/dochi_rpg_maker/spawn_control/`
- 월드 저장 전체
- 서버와 클라이언트의 모드 버전 목록
- CustomNPCs 클론을 사용한다면 해당 서버 클론 데이터

JSON만 백업하면 이미 월드에 존재하는 엔티티와 다른 모드의 데이터까지 복구되지는 않습니다.

## 0.1.4 NPC·탈것 연동

DRM·CustomNPCs·DNPC·Warfare는 선택 연동입니다. DNPC를 생성할 때는 DRM도 설치합니다. 꾸며 둔 NPC를 그대로 쓰려면 기본 NPC 대신 복제 템플릿을 고릅니다. [탈것 저장·스폰](#dochi-spawn-control/spawn-control-vehicles)에서 MTS·Superb Warfare·Aircraft·Automobility 사용법을 확인하세요.
