---
title: 저장 파일·샘플·문제 해결
slug: battleworks-files
order: 280
description: 전투 스펙과 모델 자산을 구분하고 샘플을 실제 NPC에서 시험합니다.
product: mob-editor
section: reference
category: Battleworks
status: 사용 안내
version: 0.1.1
audience: 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 저장 위치

모든 경로의 기준은 Minecraft 인스턴스의 `config/dochi_rpg_maker`입니다.

| 경로 | 내용 |
| --- | --- |
| `mobs/*.json` | NPC에 적용할 Battleworks 전투 스펙 |
| `mobs/battleworks_default.json` | 없을 때 설치되는 시작용 전투 템플릿 |
| `mobs/animations/` | DRM에서 사용하는 모델 애니메이션 자산 |
| `mobs/geometry/` | DRM에서 사용하는 모델 지오메트리 자산 |
| `settings/battleworks_client.json` | 패널 크기, 접힘 상태 등 클라이언트 설정 |
| `settings/battleworks_global_rules.json` | 공통 마법 패링, 락온, 히트박스 디버그 스위치 |

구형 히트박스 작업대 배치는 `settings/battleworks_hitbox_workspace.json`을 사용할 수 있습니다. 새 설정을 별도의 Battleworks 폴더에 나눠 저장하지 않습니다. 이전 설정 경로의 파일은 현재 경로에 없는 경우에만 복사해 이어받습니다.

기본 파일은 템플릿으로 보존하고 **Save As**로 작업본을 만드세요. NPC 적용 목록은 전투 문서 내용과 경로를 확인하므로 모델·애니메이션 JSON은 전투 스펙 후보에서 제외됩니다.

## Jar Fist 샘플

JAR의 `samples/`에 다음 두 JSON이 포함되어 있습니다. 필요한 파일을 꺼내 `config/dochi_rpg_maker/mobs/`에 두고 **Load**합니다. Jar Fist 모델·텍스처·애니메이션 자산 자체는 이 샘플에 포함되지 않으며, NPC Basic에 맞는 자산이 이미 지정된 Gecko NPC가 필요합니다.

| 파일 | 목적 |
| --- | --- |
| `battleworks_sample_jar_fist_preview.json` | 전투 꺼짐, 피해 0. 준비 자세·검 공격·다중 판정·구르기 클립 미리보기 |
| `battleworks_sample_jar_fist_combat.json` | 전투 켜짐. 검 공격 피해 4, 다중 접촉 히트박스 피해 2, 피해 없는 후퇴 구르기 |

샘플은 `ready_to_fight`, `sword_attack`, `sword_attack2`, `roll` 클립을 사용하는 Jar Fist 구성을 기준으로 합니다. 다른 모델을 사용한다면 실제 목록의 클립으로 바꾸세요. 샘플 판정 크기와 타격 시점은 테스트용 값이며 모든 무기 모양에 맞춰진 완성 설정은 아닙니다.

전투 샘플은 CNPC의 기존 적대 타겟을 사용합니다. 추적과 시선이 켜져 있고, 접근 유지 거리는 2.0, 검 공격 시작 거리는 2.7블록입니다. 자동 주변 탐색은 꺼져 있습니다.

## 실제 테스트 순서

1. 모델이 설정된 테스트 NPC에 전투 샘플을 적용합니다.
2. 생존 모드에서 CNPC가 적대 타겟을 잡게 합니다.
3. 6~8블록 떨어져 접근하는지, 옆으로 이동했을 때 머리와 몸통이 돌아오는지 확인합니다.
4. 검 공격의 타격 순간과 여러 액션 행의 판정 시점을 비교합니다.
5. 멀어져 재추적, 장애물 모서리에서 우회, 구르기 후 추적 복귀를 확인합니다.

동일 대상의 연속 접촉은 피해 무적 시간과 방어 등의 영향을 받으므로 표시된 피해 값이 매번 그대로 합산된다고 가정하지 마세요.

## JSON 구조 참고

이 절은 직접 JSON을 다루는 제작자를 위한 참고입니다. 평소에는 에디터에서 작성하고 저장하는 편이 쉽습니다.

| 필드 | 내용 |
| --- | --- |
| `schema` | 현재 전투 문서는 `dochi.battleworks.v1` |
| `id`, `displayName`, `enabled` | 문서 식별자, 이름, 전투 활성화 |
| `combat`, `manager`, `phases` | 타겟·추적·선택 규칙과 페이즈 |
| `patterns` | Windup / Action / Recovery와 이벤트·액션 |
| `hitboxes` | 재사용 판정 정의 |
| `death` | 사망 타임라인 |
| `drmNpcModel` | DRM이 내보낸 모델 설정 스냅샷 |

이전 Mob Profile JSON/NBT는 호환 입력으로 읽을 수 있습니다. 내부 모드 ID `drm_addon_mob_editor`는 기존 저장 데이터를 위해 유지됩니다. 기본 CNPC-Gecko 저장 호환 기능도 포함되어 외부 CNPC-Gecko-Addon JAR를 추가할 필요가 없습니다.

## 업그레이드 후 확인

게임을 종료하고 새 JAR로 교체한 뒤 다시 시작합니다. 같은 Battleworks JAR를 중복 설치하지 않습니다. 파일만 바꿔도 이미 적용된 NPC의 문서 사본은 갱신되지 않으므로 전투 스펙을 다시 적용합니다.

전투 시작 크래시나 재생 문제를 보고할 때는 사용한 Battleworks·DRM·CNPC 버전, 전투 스펙, `logs/latest.log`와 생성된 크래시 리포트를 함께 확인합니다.

