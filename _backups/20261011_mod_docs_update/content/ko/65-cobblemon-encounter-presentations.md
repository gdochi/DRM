---
title: 야생·RCT·PvP 연출 적용
slug: cobblemon-encounter-presentations
order: 535
description: 배틀 종류별로 글로벌 연출과 개별 예외를 연결합니다.
product: drm-cobblemon-editor
category: 배틀 연출
section: presentation
status: Draft
version: Fabric 0.2.2 / NeoForge 0.2.1
audience: 제작자와 운영자
---

## 연출 제작과 적용

`Battle Presentation Maker`는 장면을 만드는 도구입니다. **배틀 연출 적용(Encounter Presentations)**은 저장한 장면을 일반 야생 포켓몬·RCT 트레이너·PvP 배틀에 연결하는 별도 편집기입니다. DRM 애드온 에디터 목록에서 배틀 프레젠테이션 바로 아래에 있습니다.

1. 사용할 연출을 [배틀 프레젠테이션](#drm-cobblemon-editor/cobblemon-battle-presentation)에서 저장합니다.
2. 배틀 연출 적용을 열고 야생 / RCT / PvP 카테고리를 고릅니다.
3. 해당 카테고리의 글로벌 스위치를 켜고 서버 연출 JSON을 선택합니다.
4. 필요하면 야생 종류 또는 RCT 개체별 예외를 추가합니다.
5. 저장하고 다음 배틀에서 확인합니다.

신규 설정의 글로벌 스위치는 기본 OFF입니다. 기존 애드온 NPC 트레이너의 연출은 해당 Trainer 설정을 사용하며 이 정책으로 이중 재생하지 않습니다. RCT API는 선택 연동입니다.

## 적용 우선순위

| 설정 | 결과 |
| --- | --- |
| 카테고리 글로벌 OFF | 개별 ON과 관계없이 연출 OFF |
| 글로벌 ON + 개별 OFF | 해당 대상만 OFF |
| 글로벌 ON + 개별 ON 또는 미등록 | 연출 사용 |
| 개별 JSON 경로 있음 | 개별 연출 우선 |
| 개별 경로 없음 | 글로벌 연출 상속 |
| 글로벌 경로도 없음 | 해당 배틀 종류의 기본 연출 |

야생 예외는 `cobblemon:pikachu` 같은 **종류 ID** 기준입니다. 같은 종류의 특정 월드 개체만 지정하는 기능은 아닙니다. RCT 예외는 **월드 개체 UUID** 기준입니다. PvP는 글로벌 스위치와 JSON만 제공하며 플레이어별 예외 목록은 없습니다.

## PvP와 스킵

한쪽에 플레이어 한 명씩인 2인 PvP를 지원하며 싱글·더블 배틀 포맷을 사용할 수 있습니다. 2 대 2 멀티 배틀 연출은 포함하지 않습니다. 각 플레이어는 자신을 Player, 상대를 Opponent로 보는 연출을 받습니다.

스킵 가능한 연출에서 한 명만 스킵하면 상대의 남은 시간이 줄어들지 않습니다. 양쪽이 스킵하면 조기 시작할 수 있습니다. 서버가 배틀과 타이머를 관리하며 중복 참가 요청은 차단하고 서로 무관한 배틀은 함께 진행합니다.

## 저장과 문제 해결

```text
config/dochi_rpg_maker/cobblemon/encounter_presentations/settings.json
config/dochi_rpg_maker/cobblemon/battle_presentations/
```

첫 파일은 연결 정책이고 둘째 폴더는 장면 문서입니다. 정책만 복사하고 참조한 장면을 누락하지 마세요. 클라이언트 로컬 파일이 아니라 서버에 저장된 경로를 선택합니다.

연출이 나오지 않으면 카테고리 글로벌 스위치 → 개별 OFF → JSON 경로 → 실제 배틀 종류 순서로 확인합니다. 사용자 이미지와 사운드는 접속 클라이언트의 리소스팩에도 필요합니다. 최신 빌드는 Load 목록 응답이 반복 요청을 일으키던 문제를 수정했습니다. 구형 빌드에서 `rate limited`가 반복되면 같은 로더의 최신 서버·클라이언트 빌드를 맞추세요.
