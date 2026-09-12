---
title: 문제 해결과 전투 테스트
slug: battleworks-troubleshooting
order: 290
description: 반응 없음·피해 없음·모션 충돌·파일 미반영을 원인별로 좁히는 검사 순서입니다.
product: mob-editor
section: reference
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 가장 먼저 확인할 다섯 가지

1. BattleWorks 0.1.3, DRM 0.1.7 이상, 호환 CustomNPCs가 실제로 로드되었는지 봅니다.
2. 지금 NPC에 연결된 파일이 수정한 파일인지 확인합니다.
3. 문서와 사용할 패턴의 Enabled를 확인합니다.
4. 전투 테스트는 생존 플레이어로 하고 유효한 적대 타겟을 준비합니다.
5. 에디터 검증 오류와 서버 `logs/latest.log`를 확인합니다.

그다음 아래에서 현재 증상 하나를 골라 순서대로 검사합니다.

## 파일이 목록에 없습니다

1. 원격 서버라면 서버의 `config/dochi_rpg_maker/mobs/patterns/`에 있는지 봅니다.
2. 파일 확장자가 `.json`인지 확인합니다.
3. 전투 schema가 `dochi.battleworks.v1`인지 봅니다.
4. 파일이 `.animation.json`, `.geo.json` 또는 자산 폴더에 들어 있지 않은지 봅니다.
5. 엄격한 JSON 문법 검사를 합니다.
6. Load / Apply 목록을 새로고침합니다.

Particle Maker 파일은 `particles/`와 `dochi.particles.v1`을 사용하므로 전투 목록에서 찾지 않습니다.

## 저장했는데 NPC가 예전 행동을 합니다

1. Save As로 새 파일만 만든 상태인지 확인합니다.
2. NPC를 대상으로 연 에디터에서 Save하거나 NPC 적용 목록에서 새 파일을 적용합니다.
3. 외부에서 파일을 수정했다면 재적용 또는 서버 재시작으로 캐시를 갱신합니다.
4. 같은 이름의 다른 하위 폴더 파일이 없는지 봅니다.
5. 문서 스냅샷에 따라 모델도 함께 적용되었는지 확인합니다.

NPC가 파일을 공유하는 구조이므로 한 파일을 바꾸면 여러 NPC에 영향을 줄 수 있습니다. 서로 다른 결과를 원하면 파일을 분리합니다.

## NPC가 전혀 공격하지 않습니다

1. 크리에이티브·관전자 상태가 아닌지 확인합니다.
2. CustomNPCs가 적대 타겟을 선택했는지 봅니다.
3. 보조 탐색을 쓴다면 Scan Without Target·거리·FOV·시야 조건을 봅니다.
4. 패턴 거리·높이·페이즈·체력 조건을 잠시 넉넉히 하여 원인을 구분합니다.
5. 패턴이 모두 패시브라서 일반 Manager 후보가 없는지 확인합니다.
6. Base Score가 0이거나 같은 패턴 배율이 0인지 확인합니다.
7. 외부 이동 세션의 Duration이나 쿨다운이 오래 남아 있는지 봅니다.

가장 단순한 [실습 파일](./assets/media/battleworks/training_swordsman.json)을 별도 NPC에서 시험하면 설치·타겟 문제와 복잡한 패턴 문제를 분리할 수 있습니다.

## 접근하지만 공격 범위 앞에서 멈춥니다

1. Approach Distance와 패턴 Max Range를 비교합니다.
2. 실제 Hitbox의 Radius / Depth / Offset Z를 확인합니다.
3. 공격을 시작해도 타격 순간 타겟이 범위 밖으로 나가는지 봅니다.
4. 계단·절벽이면 Max Vertical과 내비게이션을 봅니다.
5. 준비 중 Away나 이동 액션이 NPC를 다시 멀어지게 하는지 확인합니다.

공격 시작 거리와 실제 피해 모양은 별도 값입니다.

## 모션은 있는데 피해가 없습니다

1. 실제 생존 전투인지 확인합니다. Simulation은 피해를 주지 않습니다.
2. Action에 Hitbox 또는 실제 피해 스킬이 연결되어 있는지 봅니다.
3. Event Tick과 마지막 반복이 단계 안에 있는지 봅니다.
4. Damage·Multiplier·확률이 0인지 확인합니다.
5. Hitbox 중심 높이·Offset·Yaw·Pitch를 확인합니다.
6. Locked Target Only와 실제 타겟을 확인합니다.
7. 방어구·저항·무적 시간·반복 Hit Policy를 확인합니다.

같은 틱에 여러 히트박스를 넣었다고 피해가 모두 단순 합산되지는 않습니다.

## 공격이 겹치거나 애니메이션이 끊깁니다

1. Suppress Native Attacks를 확인합니다.
2. 기존 CustomNPC 전투 스크립트가 같은 모션을 재생하는지 봅니다.
3. 필요한 경우 Suppress CustomNPC Scripts의 영향을 시험합니다.
4. 단계 Animation과 같은 단계의 Animation 액션을 동시에 사용했는지 확인합니다.
5. Cast Animation Ticks와 다음 단계 시작 시간을 비교합니다.
6. 모델 제공자에 맞는 클립인지 봅니다.

같은 매핑이 연속 단계에 이어질 때 재시작하지 않는 동작은 정상입니다. 다른 모델 타입의 클립을 무작정 대체하지 마세요.

## 마법만 실행되지 않습니다

1. 실제 게임 안 목록에서 선택한 ID인지 확인합니다.
2. 클라이언트·서버의 제공 모드와 의존성을 봅니다.
3. 타겟·거리·시야·스킬 자체 쿨다운을 확인합니다.
4. 빈 스킬 액션이나 지원하지 않는 options를 제거합니다.
5. 한 번의 단순 시전으로 다시 시험합니다.
6. `Battleworks skill failed`와 함께 기록된 이유를 확인합니다.

## 콤보·페이즈·패시브가 기대와 다릅니다

| 증상 | 확인 |
| --- | --- |
| 콤보가 안 이어짐 | Max Combo, 후속 패턴 존재·조건·쿨다운 |
| 특정 공격만 반복 | Priority, Selection Floor, 거리 조건 |
| 체력 회복 후 페이즈가 안 내려감 | 같은 전투에서 페이즈가 유지되는 정상 동작 |
| 전환 대사가 평소에도 나옴 | 전환 패턴이 일반 선택 점수도 얻는지 |
| 패시브가 즉시 실행 안 됨 | 기본 Queue 패시브는 현재 패턴 종료를 기다림 |
| 한 번 실행한 Health Below가 다시 안 나옴 | Once Per Combat, 재상승 후 하강 여부 |
| 반응이 사라짐 | Skip, Queue 만료, 재검사 조건 실패 |
| Parry 값을 바꿔도 체간·리포스트가 없음 | 현재 미연결 문서 설정인지 확인 |

## 파티클이 없거나 너무 많이 나옵니다

1. Particle Maker에서 파일을 재생합니다.
2. 옵션이 필요한 입자인지 확인합니다.
3. `/drm particle play training_ring ~ ~ ~`처럼 확장자 없이 월드에서 시험합니다.
4. 전투 액션의 particleFile이 실제 존재하는지 봅니다.
5. Origin이 Target / Saved position이면 타겟·저장 위치가 있는지 확인합니다.
6. 긴 효과를 매 틱 새로 시작하도록 Repeat를 설정했는지 봅니다.
7. Sample points·Count·Interval·동시 효과 수를 줄여 표시 예산을 확인합니다.

## BGM이나 대사가 들리지 않습니다

1. 일반 Sound는 적대 생명체, BGM은 음악 볼륨을 확인합니다.
2. 등록된 Sound ID와 클라이언트 리소스를 확인합니다.
3. 현재 타겟이 플레이어인지 확인합니다.
4. 이벤트·액션 확률을 둘 다 100%로 놓고 비교합니다.
5. 팝업 파일·GUI·명령어 인자가 실제 서버 자료와 맞는지 봅니다.
6. 다른 보스의 BGM 소유권이나 다른 팝업·타이틀과의 충돌을 확인합니다.

## 로그에서 찾을 문구

| 로그 | 뜻 |
| --- | --- |
| Battleworks JSON unavailable | NPC가 참조하는 전투 파일을 읽지 못함 |
| save rejected | 서버가 저장 요청을 거절함. 뒤의 구체적인 이유 확인 |
| Battleworks skill failed | 제공 스킬 실행 실패 |
| Battleworks target movement rejected | 타겟 이동의 대상·좌표·로드·충돌 조건 실패 |
| Particle JSON rejected | 참조 파티클 파일 로드·검사 실패 |

## 완성 전 실제 플레이 기록

| 시험 | 적을 내용 |
| --- | --- |
| 근거리·중거리·원거리 | 어떤 패턴이 시작되고 실제로 맞았는지 |
| 측면·후방 | 시선과 판정 방향 |
| 벽·계단·높이 차이 | 접근·이동·시야 실패 |
| 각 페이즈 | 진입 체력과 전환 횟수 |
| 패시브 | 피격 유형·확률·대기·재사용 |
| 사망·재전투 | BGM·연출·소환·상태 초기화 |
| 파일 재열기 | 저장값과 참조 유지 |

문제를 전달할 때는 모드 버전, 재현 순서, 사용한 전투 JSON과 참조 파일, 예상 결과·실제 결과, `latest.log`와 생성된 크래시 리포트를 함께 정리합니다. 개인정보나 접속 토큰이 있으면 공유 전에 지웁니다.
