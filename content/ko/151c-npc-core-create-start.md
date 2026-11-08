---
title: Create 연계 시작 · 크랭크와 밸브
slug: npc-core-create-start
order: 1514
description: Create 작업을 시간표에 넣고 장치·발 위치를 지정합니다. 크랭크, 밸브, 좌석의 차이부터 배웁니다.
product: dochi-npc-core
category: Create 연계
section: editor
status: 사용 안내
version: 0.1.3
audience: NPC 제작자 / 서버 운영자
---

## 무엇을 만들 수 있나요?

DNPC는 Create 장치 옆으로 걸어가 손으로 크랭크와 밸브를 조작하고, 재료를 연마하거나 공장 물품을 운반할 수 있습니다. **NPC가 언제, 어디에서 무엇을 할지**는 DNPC 시간표가 정하고, **장치의 회전·응력·가공법·물류 네트워크**는 Create가 처리합니다.

| 하고 싶은 일 | 고를 액션 | 이어서 볼 문서 |
| --- | --- | --- |
| 손 크랭크로 동력 공급 | Operate hand crank | 이 문서 |
| 정해진 각도만큼 밸브 조작 | Operate valve handle | 이 문서 |
| 정해진 시간에 Create 좌석 탑승 | Mount vehicle → Create seat | 이 문서 |
| 사포 연마, 주소 소포 배송, 주문 창구 | Sandpaper Polishing / Addressed Parcel Delivery / Stock Ticker Attendance | [연마·배송·주문 창구](#dochi-npc-core/npc-core-create-logistics) |
| 실제 기계에 재료 투입·완성품 회수, 부족분 주문 | Factory Process / Material Ordering | [공장 가공과 자재 주문](#dochi-npc-core/npc-core-create-factory) |
| 재고·신호·액체·속도에 따라 조작, 설비 순회 점검 | Conditional Machine Operation / Factory Inspection | [조건 제어와 설비 점검](#dochi-npc-core/npc-core-create-control) |

## 설치와 촬영 환경

DNPC와 **현재 Minecraft 버전·로더에서 사용할 수 있는 실제 Create 배포본 및 그 필수 의존 모드**를 준비합니다. 멀티플레이에서는 서버와 클라이언트에 맞는 파일을 설치합니다. DNPC의 기본 NPC 생성과 편집에는 Create나 DRM이 필요하지 않습니다. Create 연계 기능을 쓰는 환경에만 해당 모드를 추가하세요.

이 연계의 기존 실행 검증 자료는 **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 26.3**에 있습니다. 이를 Fabric 1.21.1이나 NeoForge 26.3용 Create 배포·호환성 보증으로 읽지 마세요. 자신의 대상에 실제 Create 배포본과 필요한 기능이 있는지 확인해야 합니다. 26.3에서는 CustomNPCs를 사용하지 않습니다.

아래 영상은 **DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1**의 실제 게임 촬영입니다. **6.0.10은 촬영 버전이며 모든 환경의 최소 요구 버전이 아닙니다.** 장치와 재료만 미리 준비하고, NPC의 빈 시간표부터 액션 추가·블록 지정·값 입력·활성화·저장·실행을 이어서 보여 줍니다. 반송 편은 직전 배송 편에서 저장한 설정을 이어 씁니다. 영문 UI와 화면 아래 별도 영역의 한국어 단계 설명을 사용하며, 입력 필드는 확대하고 클릭 위치를 표시합니다. 예제 좌표는 자신의 월드 위치로 바꿉니다. 영상 위의 현재 단계 안내는 재생·탐색 시 함께 바뀌며 일시정지 중에도 읽을 수 있습니다.

## 공통 순서: 시간표 → 액션 → 대상 → 저장

1. NPC Core 아이템으로 **NPC 편집기**를 열고 왼쪽 **Schedule**을 선택합니다. 이 화면은 제작자용 편집 도구입니다.
2. **Add time**으로 시간대를 만들고 이름, **Start (world ticks)**, **End (world ticks)**를 설정합니다. 처음에는 `0 → 12000`의 낮 근무 하나로 시작합니다.
3. 가운데 시간대 행의 **+**로 액션을 추가합니다. 액션 선택기의 **Create** 분류에서 원하는 작업을 고릅니다. 일반 좌석 탑승은 이동 분류의 **Mount vehicle**을 사용합니다.
4. 가운데 액션 행을 눌러 오른쪽 작업 설정을 엽니다. 대상 블록 옆 **🔍**를 누르면 월드 선택 상태로 전환됩니다.
5. 사용할 블록을 **Shift+우클릭**합니다. 편집기로 돌아와 **블록 이름·차원·좌표**가 맞는지 확인합니다. **Esc**는 선택 취소입니다.
6. 시간표의 **Enable schedule**을 켜고 상단 **Save to NPC**로 저장합니다. 저장 후 편집기를 닫아 실제 작업을 확인합니다.

**블록 선택은 초안만 바꿉니다.** 월드에서 선택하고 돌아온 것만으로 NPC에게 적용되지 않습니다. 시간대 이름 옆 **✓**도 NPC 전체 저장과 다릅니다. 시간표의 일반 사용법과 세계 시각 표는 [하루 시간표](#dochi-npc-core/npc-core-schedules)를 참고하세요.

## 손 크랭크: 동력을 공급하는 작업

먼저 플레이어가 Create 크랭크를 손으로 돌렸을 때 원하는 기계가 움직이는지 확인합니다. NPC를 붙여도 축 방향, 연결, 응력 초과 같은 기계 구성 문제는 그대로 적용됩니다.

1. 액션을 **Operate hand crank**로 정합니다.
2. **Assign hand crank block → 🔍**로 실제 Hand Crank를 선택합니다. 밸브는 이 항목의 대상이 아닙니다.
3. **Rotation direction**에서 **Default direction / Reverse direction**을 고릅니다. 원하는 기계의 회전 방향으로 확인하세요.
4. **Operation mode**를 정합니다. **Keep turning**은 근무 중 계속 입력하고, **Turn for a duration**은 정해진 시간만 입력합니다.
5. 시간 제한 모드에서는 **Operating time (seconds)**를 입력합니다. 예: `6`은 실제 크랭크 입력 시간 6초입니다. 걸어오는 시간이나 다른 작업자를 기다리는 시간은 이 타이머에서 빠집니다.
6. 서 있을 위치를 자동으로 찾게 하거나 아래 방법으로 지정하고 저장합니다.

![빈 시간표부터 크랭크 액션 추가, 장치·발 위치 선택, 6초 입력과 저장, 실제 회전까지 이어지는 전체 과정.](assets/media/guides/create-lessons-20261108/lesson-crank.mp4 "클릭 위치와 입력 필드를 확인하며 따라 하세요. 일정 활성화와 NPC 저장을 마친 후 편집기를 닫고 실제 손동작·회전을 관찰합니다.")

**영상 구간**: 0:04 빈 시간표 · 0:36 대상 지정 · 0:47 작동 시간 · 0:59 활성화·저장 · 1:13 실제 실행.

| 항목 | 단위와 범위 | 처음 사용할 예 |
| --- | --- | --- |
| Operating time | 초, 1~1200 | 6초 |
| Operating position | 자동 탐색 또는 지정한 발 위치 | 자동 탐색부터 시작 |
| Rotation direction | 기본 / 반대 | 플레이어 수동 조작으로 비교 |

Create가 크랭크의 RPM과 응력 용량을 계산합니다. NPC 수나 애니메이션 속도로 회전 성능을 정하는 기능은 아닙니다. **장치 하나는 NPC 한 명이 사용하며 플레이어의 직접 조작이 우선**합니다.

## 서 있을 위치는 장치 좌표와 다릅니다

**Assign hand crank block / Assign valve handle block**에는 장치 자체를 지정합니다. **Assign standing position**에는 NPC의 발이 놓일 공간을 지정합니다.

- **Operating position → Find a reachable position**: NPC가 주변에서 도달 가능한 자리를 찾습니다.
- **Assign standing position → 🔍**: 단단한 바닥 블록을 Shift+우클릭합니다. 선택한 블록 바로 위의 빈 공간이 발 위치가 됩니다. 발과 머리가 들어갈 두 칸을 비웁니다.
- **Use my current position**: 플레이어가 서 있는 발 위치를 씁니다. 장치와 같은 차원에서 지정해야 합니다.
- 지정 해제 **X**를 누르면 해당 지정값을 지웁니다. 장치를 다시 고른 뒤에도 예전 발 위치가 적절한지 확인하세요.

난간 뒤, 기계 내부, 허공, 장치를 볼 수 없는 곳은 피합니다. 처음에는 장치 앞에 평평한 통로를 두고 자동 탐색으로 확인한 뒤, 연출상 필요한 경우 위치를 고정하세요.

## 밸브: 각도는 블록에서, 횟수는 NPC에서

**Operate valve handle**은 Create Valve Handle의 현재 회전 각도 설정을 사용합니다. NPC 편집기의 횟수는 각도를 입력하는 칸이 아닙니다.

1. Create 밸브 블록의 각도를 먼저 설정합니다. 영상은 **90°**입니다.
2. **Operate valve handle → Assign valve handle block → 🔍**로 그 밸브를 지정합니다.
3. **Rotation direction**과 **Number of operations**를 설정합니다. 예: `2`면 90° 조작을 두 번 수행합니다.
4. 두 번 이상이면 **Pause between operations (seconds)**도 정합니다. 다음 조작은 Create의 실제 회전과 쿨다운이 끝난 뒤 시작합니다.
5. 서 있을 위치를 확인하고 **Save to NPC**로 저장합니다.

![빈 시간표에 밸브 작업을 만들고 밸브·서 있을 위치, 조작 횟수 2회와 추가 대기 1초를 설정해 실행하는 과정.](assets/media/guides/create-lessons-20261108/lesson-valve.mp4 "블록의 90도 설정과 NPC의 2회 설정을 구분합니다. Create가 실제 회전과 쿨다운을 처리합니다.")

**영상 구간**: 0:04 빈 시간표 · 0:36 대상 지정 · 0:44 수량·횟수 · 0:50 추가 대기 · 1:04 활성화·저장 · 1:18 실제 실행.

| 항목 | 범위 | 주의할 점 |
| --- | --- | --- |
| Number of operations | 1~64회 | 해당 근무 회차의 완료 횟수 |
| Pause between operations | 0.2~60초 | 회전·쿨다운 완료 후의 추가 대기 |
| 블록의 각도 설정 | Create에서 설정 | NPC의 반복 횟수와 별개 |

유한 작업의 완료 기록은 저장됩니다. 편집기 열기, 전투, 저장·재접속을 ‘같은 근무의 횟수를 처음부터 다시 실행하는 방법’으로 사용하지 마세요. 새 근무 회차와 작업 설정 변경은 별도로 처리됩니다.

## Create 좌석: 앉는 일정과 기계 운전은 별개

1. 시간대에 **Mount vehicle** 액션을 넣습니다.
2. 대상 방식을 **Create seat**로 전환합니다.
3. **🔍**로 월드의 실제 Create Seat 블록을 Shift+우클릭합니다.
4. 탑승 시도 시간과 **일정 종료 시 하차**를 확인하고 저장합니다.

![Mount vehicle 액션에서 Create seat를 선택하고 좌석 지정·탑승 제한 시간 입력·저장·착석·근무 종료 하차까지 확인하는 과정.](assets/media/guides/create-lessons-20261108/lesson-seat.mp4 "빈 시간표에서 시작합니다. 종료 장면은 검증 월드의 시각을 12500으로 바꿔 재현하며 화면에 그 조작을 명시합니다.")

**영상 구간**: 0:04 빈 시간표 · 0:36 대상 지정 · 0:47 탑승 제한 · 0:53 활성화·저장 · 1:07 실제 실행 · 1:13 근무 종료·하차.

Create 좌석은 일반 탈것의 좌석 번호로 고르는 대신 **블록을 지정**합니다. 다른 개체가 사용 중이거나, 블록이 사라졌거나, 청크가 로드되지 않았거나, 걸어갈 수 없으면 기다리다 시도 시간이 끝납니다. 하차는 좌석이 멈추고 안전한 바닥이 있을 때 진행합니다.

좌석 추적은 조립·해체와 저장 복원을 고려하지만, **이 액션이 열차 운전이나 이동 경로를 작성하지는 않습니다.** Stock Ticker 창구는 아래 문서의 별도 작업으로 만듭니다.

## 움직이지 않을 때 확인할 순서

| 증상 / 상태 | 확인할 내용 |
| --- | --- |
| 아무 액션도 시작하지 않음 | Enable schedule, 현재 세계 시각, 시간대 안의 액션, Save to NPC 저장 여부 |
| Work paused | 편집기 열림, AI 비활성, 전투·상호작용·수면, 외부 AI 제어 여부 |
| Choose a device in this dimension | 실제 장치 지정과 NPC가 있는 차원이 같은지 |
| Approaching operating position에서 계속 대기 | 발 위치의 바닥·두 칸 공간·시야·이동 경로 |
| Waiting for another operator | 같은 장치에 연결된 다른 NPC |
| Yielding to manual operation | 플레이어가 해당 장치를 직접 사용 중인지 |
| Device unavailable | 블록 종류, 청크 로드, 실제 Create 기능 제공 여부 |
| 장치는 도는데 기계가 멈춤 | Create 연결·회전 방향·응력 초과를 수동으로 먼저 점검 |
| Work complete | 제한 시간이 끝났거나 해당 근무의 밸브 횟수를 이미 완료함 |

다음은 [연마·소포 배송·주문 창구](#dochi-npc-core/npc-core-create-logistics)입니다. 실제 가공 라인을 만들려면 [공장 가공과 자재 주문](#dochi-npc-core/npc-core-create-factory)으로 이어집니다.
