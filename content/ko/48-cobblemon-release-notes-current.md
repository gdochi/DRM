---
title: Fabric·NeoForge 0.2.7 업데이트
slug: cobblemon-editor-current-update
order: 480
description: AI·기술 선택·Cobblemon 1.8.4, 선택 NPC와 배틀 후 대화 안내입니다.
product: drm-cobblemon-editor
category: 시작하기
section: overview
status: 안정
version: Fabric / NeoForge 0.2.7
audience: 제작자 / 운영자
---

## 0.2.7 최신 변경

Minecraft 1.21.1 / Java 21의 Fabric·NeoForge 빌드입니다. DRM **0.2.8 이상**과 **Cobblemon 1.7.3 이상 1.9.0 미만**이 필요합니다. CustomNPCs는 선택 의존성으로 바뀌었으며 DNPC 트레이너와 파일 편집은 CustomNPCs 없이 사용할 수 있습니다. Pokemon Itself·PokéMart·Nurse Joy·Starter Selector와 기존 CNPC 클론은 해당 CustomNPCs 연동 범위입니다.

- **배틀 AI:** 실제 능력치 변화를 추적하여 랭크업·벽·트릭룸·교체·기믹·팀 연계를 평가하고, 강화 직후 불필요한 교체와 반복 강화, 더블 슬롯 예약 오류를 수정했습니다.
- **기술 목록:** 등록된 전체 기술을 선택할 수 있으며 일반·이벤트·과거 습득 기술을 우선 정렬합니다. 최종 실행 가능 여부는 Cobblemon과 설치된 기술 제공자가 결정합니다.
- **Cobblemon 1.8.4:** 빈 기믹 응답 정규화와 미리보기의 이로치·폼 특성 동기화를 수정했습니다. 1.7.3 컴파일 기준과 기존 런타임 범위를 유지합니다.
- **배틀 후 대화:** 애프터 액션에서 대화 세트를 선택합니다. DNPC의 전투 종료와 복귀 처리 뒤 대화를 열며 대화에 전투 시작 액션이 필요하지 않습니다.
- **Admin:** 호환 DRM 0.2.9의 트레이너 **배틀 기록 삭제**를 지원합니다. 승리 횟수 초기화와 달리 미지급 보상과 지급 완료 표식까지 제거합니다.

## 확인한 Cobblemon 버전

| 실제 실행 확인 | 이번 확인에서 제외 |
| --- | --- |
| 1.7.3, 1.8.0, 1.8.2, 1.8.3, 1.8.4 · 양 로더 | 1.8.1 별도 실행 없음 |

허용 범위 안에 있다는 것과 실제 시험한 것은 다릅니다. 기믹은 호환 제공 모드와 키 아이템이 필요하며 모든 선택 모드 조합을 보증하지 않습니다. 0.2.7 안에서 추가 수정이 있으므로 최신 수정본으로 교체하세요.

[설치](#drm-cobblemon-editor/cobblemon-editor-setup), [AI·파티·아이템](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items), [관리자](#core-fabric/drm-administration)를 확인하세요. 아래는 이전 버전 당시 기록입니다.

## 0.2.6 당시 변경

DRM **0.2.8 이상**이 필요합니다. 전투 후 NPC 숨김, 전투 횟수 초기화 시 숨김 해제, 전투 전 탐지·추적·대시와 포켓몬 외형의 Basic 미리보기를 수정했습니다. 편집 권한이 있는 사용자가 DRM Core를 어느 손에든 들면 생명주기로 숨겨진 NPC를 편집용으로 볼 수 있습니다. 다른 플레이어의 표시나 저장된 숨김 상태를 자동으로 바꾸지 않습니다.

[Modrinth 0.2.6](https://modrinth.com/mod/drm-cobblemon-editor/versions)에서 같은 로더의 Core·애드온을 함께 맞추세요.

## 이전 변경 기록

## 0.2.4 당시 설치 기준

Minecraft 1.21.1 · Java 21에서 **Fabric·NeoForge 0.2.4**를 사용합니다. 필수 연동은 같은 로더의 DRM Core, CustomNPCs와 Cobblemon입니다. 현재 DRM은 0.2.5이며 애드온의 최소 DRM은 0.2.4입니다. Cobblemon 범위는 1.7.3 이상 1.9.0 미만입니다.

RCT API와 CobbleDollars는 선택 연동입니다. [설치와 첫 적용](#drm-cobblemon-editor/cobblemon-editor-setup)에서 로더별 요구 조건을 확인하세요.

## 0.2.4 주요 변경

- [배틀 스케줄러](#drm-cobblemon-editor/cobblemon-battle-scheduler): 클론 소환부터 등장·배틀·결과 장면과 정리까지 연결하고, 자동 영역 입장을 서버에서 켜고 끕니다.
- [블록 무대와 FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx): 월드 블록 상태를 연출 JSON에 캡처하고 입자 발생·이동을 편집합니다.
- 월드에서 영역 박스를 이동·크기 조절하고 Apply할 수 있습니다. 블록은 변경하지 않습니다.
- 배틀 룰의 레벨 설정과 도주 정책을 보완했습니다. 고정 레벨·플레이어 파티 평균과 원본·즉시·거리 도주를 구분합니다.
- Trainer 스키마 23과 Presentation 스키마 5를 유지합니다.

## 일반 인벤토리

- `Items`와 `My Inventory`에서 아이템을 선택합니다. 실제 플레이어 스택은 소비하지 않고 복사합니다.
- NBT·컴포넌트를 저장하고 수량 변경 뒤에도 유지합니다. 같은 ID의 서로 다른 커스텀 아이템을 구분합니다.
- 일반 인벤토리는 기믹 키 보유 검사에 사용하며 라운드 AI 배틀 가방과 별도입니다.
- Trainer 스키마는 `23`을 유지합니다.

[AI·파티·아이템](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items)에서 제작 순서를 확인하세요.

## 결제와 공용 탐색

PokéMart의 DRM 화폐·아이템 결제는 Core의 결제 서비스를 사용합니다. 잘못된 결제 설정이나 Core 금액 범위를 넘는 거래를 거부합니다. CobbleDollars를 선택한 경우 해당 공급자의 잔액을 사용합니다.

코어와 애드온 에디터의 공용 뒤로·앞으로 화살표로 방문한 화면을 이동합니다. 이동 기록이 없으면 아이콘이 비활성화됩니다. 파일 저장과 NPC Apply는 각각 따로 수행합니다.

## 트레이너 승리 퀘스트와 업데이트

트레이너 문서와 Quest Editor 목표에 같은 Trainer ID를 연결합니다. 이름이나 파일명만 맞춰서는 집계되지 않습니다. [트레이너 승리 퀘스트](#drm-cobblemon-editor/cobblemon-trainer-quests)를 확인하세요.

`config/dochi_rpg_maker`와 월드를 함께 백업하고 서버·클라이언트에 같은 로더의 같은 애드온 버전을 설치합니다. 기존 0.1.6 변경 기록은 당시 릴리스 안내로 보존합니다.

## 0.2.2 / 0.2.1 추가사항

- [야생·RCT·PvP 연출 적용](#drm-cobblemon-editor/cobblemon-encounter-presentations): 종류별 글로벌 스위치와 JSON 연결, 야생 종류·RCT UUID 예외, 2인 PvP 양쪽 시점을 설정합니다.
- [배틀 연출](#drm-cobblemon-editor/cobblemon-battle-presentation): 양쪽 파티 6슬롯, 슬롯별 Motion, 모델 크기 보정과 카메라 키프레임, 일반·보스·전설·파티 기본 연출을 추가했습니다. 문서 스키마는 5입니다.
- 애프터 액션 아이템 찾기에 `내 인벤토리` 복사가 추가되었습니다. 이름·인챈트·총기 데이터 등 스택 컴포넌트를 보존하고 지급 수량은 액션 설정을 따릅니다.
- 트레이너 배틀 포기는 `flee`, 일반 패배는 `loss`로 구분합니다. 포기 입력만으로 보상을 지급하지 않고 실제 배틀 결과가 확정된 뒤 처리합니다.
- 연출 Load 목록을 반복 요청해 `rate limited`가 발생하던 문제를 수정했습니다.
