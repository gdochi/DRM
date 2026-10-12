---
title: 전투 JSON 구조와 전체 예제
slug: battleworks-json-reference
order: 285
description: 복사 가능한 완전한 예제와 필드·참조·시간·크기 제한을 설명합니다.
product: mob-editor
section: reference
category: BattleWorks
status: 참고
version: 0.1.3
audience: JSON을 직접 편집하는 제작자
tags:
  - battleworks
  - json
---

## 직접 JSON을 편집할 때만 읽어도 됩니다

처음 만드는 사람은 [첫 공격 실습](#mob-editor/battleworks-first-attack)처럼 화면에서 작성하고 저장하면 됩니다. 이 페이지는 외부 파일을 수정하거나 구조를 비교하는 제작자를 위한 참고입니다.

[전체 전투 예제 다운로드](./assets/media/battleworks/training_swordsman.json)와 [파티클 예제 다운로드](./assets/media/battleworks/training_ring.json)를 제공합니다. 두 파일은 다른 schema와 저장 폴더를 사용합니다.

## 1. 최소 문서 구조 읽기

| 최상위 필드 | 내용 |
| --- | --- |
| schema | 전투는 dochi.battleworks.v1 |
| id / displayName / enabled | 문서 ID·표시 이름·실행 여부 |
| combat | 기본 공격·스크립트 억제, 탐색·추적·대기·BGM |
| npcStats | 선택적인 능력치 덮어쓰기. 기본은 꺼짐 |
| manager | 일반 패턴 선택과 반복·콤보·대기 규칙 |
| phases | 체력 페이즈와 전환 패턴 |
| hitboxes | 재사용 판정 정의 |
| patterns | 조건·점수·세 단계·이벤트·콤보 |
| death | 사망 타임라인 |
| authoring | 제작 메모. 전투 로직 자체는 아님 |
| drmNpcModel | 실제 NPC 적용에 사용할 DRM 모델 스냅샷 |
| previewNpcModel / previewTexture | 미리보기 전용 정보 |
| particleEffects | 이전 내장 효과 호환 데이터. 새 작업은 별도 particleFile 연결 권장 |

이름·장비·팩션·드롭·리스폰은 CustomNPCs에서 준비합니다. 고급 npcStats를 켠 외부 문서는 최대 체력·이동 속도·회복을 바꿀 수 있으므로 가져올 때 확인합니다. 알 수 없는 기존 필드나 모델 스냅샷을 정리 목적으로 지우지 마세요.

## 2. 예제를 적용하는 순서

1. 아래 전체 객체를 파일로 저장하거나 다운로드합니다.
2. 서버의 `config/dochi_rpg_maker/mobs/patterns/training/training_swordsman.json`에 둡니다.
3. 일반 인간형 CustomNPC에 검·기본 능력치·적대 타겟을 준비합니다.
4. BattleWorks에서 파일을 Load한 뒤 검증 오류가 없는지 봅니다.
5. NPC에 적용하고 생존 모드에서 시험합니다.

선택 애니메이션·마법 모드는 요구하지 않습니다. 기본 팔 휘두르기는 일반 인간형 NPC를 전제로 하며, Gecko·모디드 엔티티 모델에는 그대로 적용하지 않습니다. 자동 보조 탐색은 꺼져 있어 CustomNPCs가 적대 타겟을 정해야 합니다.

## 3. 전체 전투 JSON 예제

다음은 생략·주석 없는 **완전한 전투 문서**입니다. damage 4는 방어 이전의 설정값입니다.

```json
{
  "schema": "dochi.battleworks.v1",
  "id": "training_swordsman",
  "displayName": "Training Swordsman",
  "enabled": true,
  "description": "Beginner Forge 1.20.1 / BattleWorks 0.1.3 example. Normal humanoid NPC; CustomNPCs supplies the hostile target.",
  "combat": {
    "suppressNativeAttacks": true,
    "suppressCustomNpcScripts": false,
    "engageDelayMin": 10,
    "engageDelayMax": 18,
    "combatResetDelayTicks": 100,
    "retryDelayTicks": 10,
    "targeting": {
      "scanWhenNoTarget": false,
      "scanRange": 16,
      "requireLineOfSight": true,
      "fovDegrees": 360,
      "chaseTarget": true,
      "faceTarget": true,
      "chaseSpeed": 1,
      "preferredDistance": 2
    },
    "parry": {
      "mode": "off",
      "magicProjectileDeflect": false,
      "betterCombatMelee": false
    },
    "bgm": {
      "enabled": false,
      "soundId": "",
      "volume": 0.7,
      "pitch": 1
    }
  },
  "manager": {
    "globalCooldownTicks": 0,
    "maxCombo": 0,
    "selectionFloor": 0.65,
    "samePatternPenalty": 1,
    "recentPatternPenalty": 1,
    "sameRolePenalty": 1,
    "randomFactor": 0,
    "stationaryChainPenalty": 1,
    "recoveryMin": 8,
    "recoveryMax": 14
  },
  "phases": [
    {
      "index": 1,
      "id": "phase_1",
      "name": "Training",
      "enabled": true,
      "enterAtHealthRatio": 1,
      "transitionPatternId": ""
    }
  ],
  "hitboxes": [
    {
      "id": "training_sweep",
      "name": "Training Sweep",
      "shape": "sweep",
      "damage": 4,
      "radius": 2.4,
      "width": 1.5,
      "height": 1.8,
      "depth": 1.5,
      "thickness": 0.5,
      "yaw": 0,
      "pitch": 0,
      "offsetX": 0,
      "offsetY": 0,
      "offsetZ": 0,
      "sweepSteps": 6,
      "arcStartYaw": 90,
      "arcStartPitch": 20,
      "arcEndYaw": -90,
      "arcEndPitch": -20,
      "lockedTargetOnly": true,
      "effectId": "",
      "points": []
    }
  ],
  "patterns": [
    {
      "id": "basic_slash",
      "name": "Basic Slash",
      "enabled": true,
      "role": "melee",
      "trigger": {
        "type": "manager"
      },
      "priority": 10,
      "minPhase": 1,
      "maxPhase": 16,
      "minDistance": 0,
      "maxDistance": 2.7,
      "maxVertical": 2.5,
      "minBossHealth": 0,
      "maxBossHealth": 1,
      "minTargetHealth": 0,
      "maxTargetHealth": 1,
      "requiresLineOfSight": true,
      "targetRequired": true,
      "mobility": false,
      "stationary": true,
      "cooldownTicks": 40,
      "recoveryTicks": 8,
      "score": {
        "base": 10,
        "idealDistance": 2,
        "distancePeak": 0
      },
      "windup": {
        "id": "windup",
        "ticks": 24,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "none",
          "id": "",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": []
      },
      "action": {
        "id": "action",
        "ticks": 16,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "vanilla_swing",
          "id": "main_hand",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": [
          {
            "id": "strike",
            "at": 3,
            "interval": 0,
            "count": 1,
            "chancePercent": 100,
            "actions": [
              {
                "type": "dochi_battleworks:hitbox",
                "chancePercent": 100,
                "params": {
                  "hitboxId": "training_sweep",
                  "damageMultiplier": 1,
                  "knockback": 0.2,
                  "hitPolicy": "once_per_pattern"
                }
              },
              {
                "type": "dochi_battleworks:sound",
                "chancePercent": 100,
                "params": {
                  "soundId": "minecraft:entity.player.attack.sweep",
                  "volume": 1,
                  "pitch": 1
                }
              }
            ]
          }
        ]
      },
      "recovery": {
        "id": "recovery",
        "ticks": 24,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "none",
          "id": "",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": []
      },
      "combos": []
    }
  ],
  "death": {
    "enabled": false,
    "durationTicks": 40,
    "lockCorpse": true,
    "events": []
  }
}
```

## 4. 먼저 수정해 볼 값

| JSON 경로 | 바꾸는 내용 |
| --- | --- |
| patterns[0].windup.ticks | 준비 시간 |
| patterns[0].action.events[0].at | Action 안의 타격 시점 |
| patterns[0].recovery.ticks | 회복 단계 길이 |
| patterns[0].cooldownTicks | 완료 후 같은 패턴 쿨다운 |
| patterns[0].minDistance / maxDistance | 시작 가능한 수평 거리 |
| hitboxes[0].damage | 공유 판정 피해 |
| hitboxes[0].radius / thickness | Sweep 도달 거리와 굵기 |
| combat.targeting.preferredDistance | 공격 사이 접근 거리 |

한 값을 바꾼 뒤 저장·재적용하여 차이를 확인합니다. `patterns[0]`은 배열의 첫 패턴이라는 뜻입니다.

## 5. 참조와 시간 검사

1. 모든 hitboxId가 hitboxes 안의 ID와 일치해야 합니다.
2. 콤보 patternId와 transitionPatternId가 실제 패턴을 가리켜야 합니다.
3. 패시브는 콤보를 갖거나 콤보·전환의 대상이 될 수 없습니다.
4. 같은 목록의 ID를 중복하지 않습니다. 이벤트 ID도 단계 안에서 고유하게 둡니다.
5. 모든 이벤트 at은 단계 길이 이하여야 합니다.
6. 반복은 `at + interval × (count - 1) ≤ stage.ticks`를 만족하게 둡니다.
7. 히트박스 단계는 호환 애니메이션 또는 explicitSelection이 true인 명시적 None을 사용합니다.
8. 실제 없는 스킬·모델·사운드·파티클 ID를 만들지 않습니다.

JSON에는 주석·끝 쉼표·생략 부호를 넣지 않습니다. 자동 보정이 일부 값을 바꾸더라도 정상 작성된 것으로 간주하지 말고 원래 입력을 고칩니다.

## 6. 별도 파티클 파일 연결 조각

아래는 전투의 이벤트 안 actions 배열에 넣을 **액션 하나**입니다. `particles/training_ring.json`이 먼저 존재해야 합니다.

```json
{
  "type": "dochi_battleworks:particle_shape",
  "chancePercent": 100,
  "params": {
    "particleFile": "training_ring.json",
    "origin": "caster"
  }
}
```

이 액션을 한 번 실행하면 파일의 효과 전체를 시작합니다. 타격은 별도 Hitbox입니다.

## 7. 주요 크기 제한

| 항목 | 상한 |
| --- | --- |
| 전투 JSON 네트워크 문자열 | 524,288 문자 |
| 페이즈 | 16 |
| 패턴 / 히트박스 | 각각 256 |
| 단계당 이벤트 | 128 |
| 이벤트당 액션 | 32 |
| 액션 params 항목 | 64 |
| 사용자 히트박스 점 | 12 |

문자 수 제한을 “한글 포함 무조건 512KiB 파일”로 바꾸어 해석하지 않습니다. 0.1.3은 큰 문서를 압축·분할 전송하지만 문서 크기 제한 자체를 없애지는 않습니다.

## 8. 소스 기준과 검증 범위

이 문서 묶음은 2026-09-12의 Forge 0.1.3 소스에서 BattleworkDocument, BattleworkValidator, BattleworkRuntimeController, BattleworkStore, BattleworkNetwork, BattleworkAnimationPolicy, ParticleDocument, ParticleFiles, ParticleCommands와 에디터 번역·화면을 대조했습니다.

0.1.2용 JSON 가이드와 달라진 저장 방식·애니메이션·추가 액션을 현재 소스 기준으로 반영했습니다. 문법·참조 검사를 통과해도 실제 모델 접촉, 마법 제공자, 서버 지형과 전투 밸런스는 [플레이 테스트](#mob-editor/battleworks-troubleshooting)로 확인해야 합니다.
