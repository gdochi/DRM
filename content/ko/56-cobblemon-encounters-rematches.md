---
title: 조우, 전투 설정과 재대전
slug: cobblemon-encounters-rematches
order: 521
description: 자동 조우, 추적, Battle Config, Encounter Policy와 라운드 진행입니다.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Draft
version: 0.1.4
audience: 트레이너 조우와 반복 전투를 설계하는 제작자
tags:
  - encounter
  - rematch
  - battle-config
---

## 전투 요청 순서

```text
상호작용 또는 자동 감지
→ 이용 정책과 라운드 조건 확인
→ 감지 피드백·추적·위치 정렬
→ 임시 상대 파티 생성
→ Cobblemon 배틀
→ 결과별 After Actions와 진행도
→ NPC 복구 또는 숨김·제거
```

서버가 각 단계의 최종 판정을 합니다. 자동 감지가 대상을 찾았더라도 시작 직전에 조건, 쿨다운, 다른 배틀 예약 상태를 다시 검사합니다.

## Trigger

| 모드 | 동작 |
| --- | --- |
| `Interaction` | 플레이어가 양손을 비우고 우클릭할 때 요청 |
| `Vision` | 시야 거리와 각도 안의 플레이어를 감지 |
| `Radius` | 방향과 관계없이 반경 안의 플레이어를 감지 |

- 자동 감지 주기는 5–200틱입니다.
- Vision 거리는 1–64블록, 각도는 5–180도입니다.
- Radius는 1–64블록입니다.
- 자동 조우 대상은 살아 있고 관전자·크리에이티브가 아니며 전투 가능한 플레이어여야 합니다.

`Vision`과 `Radius` NPC는 일반 빈손 우클릭으로 수동 배틀을 시작하지 않습니다. 자동 조우와 명시적 대화 액션을 구분해 설계하세요.

## 감지 피드백과 반응 대기

마커, 사운드, 반응 대기는 자동 감지에서 플레이어가 조우를 인지하도록 돕습니다. 대기 중 대상이 사라지거나 조건이 깨지면 시작을 취소하고 재시도 보호 시간을 둡니다. 너무 짧은 감지 주기와 긴 추적을 여러 NPC에 동시에 설정하면 경로 탐색 부하가 커질 수 있습니다.

## 추적과 시작 거리

| 설정 | 범위 |
| --- | --- |
| Walking Speed | 0–100 |
| Stop Distance | 0.5–96블록 |
| Max Chase Distance | 최대 96블록 |
| Max Chase Duration | 10–1200틱 |

추적 거리는 서버의 청크와 월드 경계를 넘는 순간을 고려해 설정하세요. `Stop Distance`가 배틀 시작에 필요한 거리보다 지나치게 크면 NPC가 멀리 멈추고 시작을 반복 실패할 수 있습니다.

## Battle Positioning

배틀 시작 전에 플레이어와 NPC를 마주 보게 정렬하고 거리를 맞출 수 있습니다. 위치 거리는 1–16블록이며 기본은 3블록입니다. 안전한 위치를 찾지 못하면 원래 위치를 사용하거나 전투를 취소할 수 있으므로 좁은 실내, 벽 모서리, 낭떠러지에서 반드시 시험하세요.

전투 중에는 예약된 NPC를 잠그고, 전투 종료 뒤 원래 위치·회전·가시성 상태를 복구합니다. Pokemon Itself는 전투용 임시 포켓몬 엔티티를 사용하며 실제 CustomNPCs NPC 상태를 보존합니다.

## Battle Config

전역 기본값을 두고 라운드에서 덮어쓸 수 있습니다.

| 설정 | 선택 | 의미 |
| --- | --- | --- |
| Level Policy | `Keep`, `Fixed`, `Match player party average` | 실제 레벨 유지, 고정 레벨 또는 플레이어 파티 평균에 맞춤 |
| Fixed Level | 1–100 | `Fixed`에서 사용할 레벨 |
| Fixed Scope | Trainer only / Both sides | 상대 파티만 맞추거나 플레이어와 상대의 배틀용 파티를 모두 맞춤 |
| Average Offset | -99–99 | 플레이어 파티 평균보다 상대 파티를 얼마나 높거나 낮출지 설정 |
| Natural Drops | On/Off | 상대 포켓몬의 자연 드롭 허용 여부 |
| Capture Policy | `Allow`, `Deny` | 전투 중 포획 허용 여부 |

`Match player party average`는 플레이어의 현재 파티 평균 레벨에 Offset을 더한 값을 상대 파티의 목표 평균으로 사용합니다. 상대 파티 안에서 원래 설정한 포켓몬 사이의 레벨 차이는 가능한 한 유지합니다.

고정 레벨과 평균 맞춤은 실제 플레이어 포켓몬을 영구 수정하지 않습니다. 배틀용 복사본만 조정하고 전투가 끝나면 원래 파티 상태를 유지합니다. 구형 Fixed 설정은 기존처럼 양쪽 배틀 파티에 적용되도록 읽습니다.

## Encounter Policy

### 이용 모드

| Mode | 동작 |
| --- | --- |
| `Always` | 조건이 맞으면 계속 이용 가능 |
| `Once` | 완료 판정 뒤 다시 이용 불가 |
| `Cooldown` | 완료 판정 뒤 지정 시간 동안 이용 불가 |

`Scope`는 `Player` 또는 `Global`입니다. Player는 플레이어별로 독립되고, Global은 NPC를 이용하는 모든 플레이어가 같은 상태를 공유합니다. 정책 쿨다운은 최대 30일입니다.

`Complete On`은 다음 중 하나입니다.

- `Win`: 승리했을 때만 이용 완료
- `Battle End`: 승리·패배·도주를 포함해 배틀이 끝나면 완료

### 전투 후 NPC 상태

| 설정 | 동작 |
| --- | --- |
| `Stay` | NPC 유지 |
| `Hide` | NPC를 숨김 |
| `Despawn` | NPC를 월드에서 제거 |

`Hide`와 `Despawn`은 일반 After Actions가 성공한 뒤 마지막에 처리됩니다. Clone Spawner가 관리하는 NPC라면 배틀이 끝나고 예약이 해제될 때까지 제거를 미룹니다.

## 라운드 진행 방식

| 방식 | 진행 |
| --- | --- |
| `Fixed` | 지정한 시작 라운드를 계속 사용 |
| `Continue` | 승리할 때 다음 라운드로 진행, 마지막 라운드 유지 |
| `Loop` | 승리할 때 다음 라운드로 진행, 마지막 뒤 첫 라운드로 순환 |

시작 라운드는 1부터 표시됩니다. 라운드 순서를 바꾸면 기존 클리어 수가 새 순서에도 그대로 해석되므로 운영 중 재정렬은 신중해야 합니다.

## 기존 Rematch와 새 Encounter Policy

현재 버전은 구형 Rematch/쿨다운 데이터를 읽으면서 더 명확한 Encounter Policy로 정규화합니다. 새 문서는 `Always`, `Once`, `Cooldown`, 범위, 완료 시점, 전투 후 NPC 상태를 사용하세요. 구형 파일을 로드하고 저장하면 최신 정책 필드가 만들어집니다.

## 진행도와 운영

- 플레이어별 클리어 수와 라운드 액션 기록은 NPC UUID 기준으로 유지됩니다.
- 같은 JSON을 다른 NPC에 적용하면 진행도는 분리됩니다.
- 같은 NPC의 원본 JSON을 수정해도 기존 진행도는 유지됩니다.
- 전역 Encounter Policy는 서버 운영 상태이므로 월드 백업에 포함합니다.

테스트 초기화가 필요하면 운영 NPC 데이터를 직접 지우기보다 새 UUID의 테스트 NPC에 같은 문서를 적용하는 편이 안전합니다.

## 자동 조우 테스트

1. 조건과 정책을 `Always`로 두고 Vision 또는 Radius만 시험합니다.
2. 마커와 사운드가 한 번만 자연스럽게 재생되는지 확인합니다.
3. 추적 중 멀어짐, 차원 이동, 사망, 다른 배틀 시작을 시험합니다.
4. 좁은 공간에서 위치 정렬과 홈 복귀를 확인합니다.
5. 패배·도주 때 `Complete On`과 After Actions가 의도대로 동작하는지 확인합니다.
6. Global Once/Cooldown은 플레이어 둘 이상으로 검증합니다.
