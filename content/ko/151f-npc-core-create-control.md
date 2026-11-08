---
title: Create 조건 제어와 설비 점검
slug: npc-core-create-control
order: 1517
description: 두 임계값으로 크랭크·밸브·Linked Controller를 제어하고 설비 상태를 순회 점검합니다.
product: dochi-npc-core
category: Create 연계
section: editor
status: 사용 안내
version: 0.1.3
audience: NPC 제작자 / 서버 운영자
---

## 조건이 맞을 때만 조작하기

**Conditional Machine Operation**은 센서에서 읽은 값으로 크랭크·밸브·Linked Controller 입력을 정합니다. 시간표 자체가 시작·종료 조건이고, 그 시간대 안에서 센서 조건을 추가로 판단합니다. 센서가 기계를 직접 수리하거나 재료를 생성하는 기능은 아닙니다.

기본 시간표·장치 지정은 [Create 연계 시작](#dochi-npc-core/npc-core-create-start), 재료와 완성품 연결은 [공장 가공](#dochi-npc-core/npc-core-create-factory)을 먼저 확인하세요. 아래 영상은 DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1의 무음 예제입니다.

## 예제: 철괴가 2개 이하면 돌리고 6개면 멈추기

1. **Schedule → 시간대의 + → Create → Conditional Machine Operation**을 추가합니다.
2. **Control device → Hand crank**를 고릅니다.
3. **Machine control position → 🔍**로 조작할 실제 크랭크를 지정합니다.
4. **Sensor reading → Item quantity**를 고르고 **Sensor position → 🔍**로 재고 통을 지정합니다. 조작할 장치와 값을 읽을 보관함은 서로 다른 위치여도 됩니다.
5. **Counted item**을 Iron Ingot으로 선택합니다. 통의 모든 아이템 개수를 합치는 설정이 아닙니다.
6. **Activate at the lower threshold**를 켜고 **Lower threshold 2 / Upper threshold 6**을 입력합니다.
7. **Work interval (ticks)**를 정하고 시간표 활성화·저장을 마칩니다.

![철괴 재고가 부족할 때 크랭크를 돌리다가 재고가 여섯 개에 도달하면 입력을 멈추는 NPC.](assets/media/guides/create-tutorials-20261108/create-condition.mp4 "센서 통의 0→6 변화는 임계값 반응을 보여 주려고 촬영 도구가 넣은 재고입니다. 크랭크가 철괴를 생산한 장면이 아닙니다. NPC의 실제 조건 판정과 Create 입력 중단을 확인합니다.")

## 두 임계값 사이에서는 이전 상태를 유지합니다

한 숫자만 경계로 삼으면 재고가 한 개 오갈 때마다 켜졌다 꺼질 수 있습니다. DNPC는 **하한과 상한 두 개**를 사용합니다. **Upper threshold는 Lower threshold보다 커야** 하며, 두 값은 유한한 0 이상의 수여야 합니다.

| Activate at the lower threshold | 시작 조건 | 멈춤 조건 | 두 값 사이 |
| --- | --- | --- | --- |
| ON | 읽은 값 ≤ 하한 | 읽은 값 ≥ 상한 | 직전 활성/비활성 상태 유지 |
| OFF | 읽은 값 ≥ 상한 | 읽은 값 ≤ 하한 | 직전 활성/비활성 상태 유지 |

위 예제의 ON·2·6에서는 재고가 **0 → 3 → 6 → 4 → 2**로 변하면 **작동 → 작동 유지 → 정지 → 정지 유지 → 다시 작동**입니다. OFF로 바꾸면 높은 수치에서 시작하고 낮은 수치에서 멈춥니다.

## 센서 종류와 단위

| Sensor reading | 선택할 대상 | 읽는 값 / 권장 범위 |
| --- | --- | --- |
| Redstone strength | 신호를 읽을 블록 | 주변 최강 레드스톤 신호, 0~15 |
| Item quantity | 아이템 보관함 | Counted item과 같은 아이템 ID의 수량 |
| Tank fill percentage | 지원되는 Create 탱크 | 총 용량 대비 0~100%, mB 숫자가 아님 |
| Rotation speed in RPM | 지원되는 Create 회전 장치 | 회전수의 절댓값, RPM |
| Overstress (0 or 1) | 지원되는 Create 회전 장치 | 정상 0 / 응력 초과 1 |

응력 초과를 감지하려면 OFF, **하한 0 / 상한 1**처럼 정합니다. 액체 센서에 1000 같은 저장량 단위를 입력하거나, 응력 센서에 RPM을 넣지 마세요. 아이템 센서는 큰 저장망이나 모든 외부 저장 모드를 무제한으로 읽는 기능이 아니며, 읽을 수 없는 장치는 **Sensor reading unavailable**이 됩니다.

## 크랭크·밸브·Linked Controller의 차이

| Control device | 조건이 활성일 때 | 비활성으로 바뀔 때 |
| --- | --- | --- |
| Hand crank | NPC가 그 자리에서 실제 크랭크 입력 | 새 크랭크 입력 중단 |
| Valve handle | 상태 전환에 맞춰 밸브 한 번 조작 | 반대 방향의 네이티브 밸브 조작 |
| Linked Controller | 지정 주파수의 버튼 입력 유지 | 버튼 입력 해제 |

밸브는 조건이 계속 참이라고 매 검사마다 끝없이 누르지 않습니다. 상태가 바뀌면 반대 방향으로 전환하고, 이미 시작한 회전·쿨다운은 완료를 기다립니다. **Reverse the active direction**을 켜면 활성 상태의 회전 방향을 반대로 정합니다.

Linked Controller를 쓰려면 **실제로 주파수 아이템을 설정한 Create Linked Controller**를 NPC 인벤토리에 넣고 **Linked Controller button (1–6)**을 정합니다. DNPC 편집기에서 글자로 주파수를 만드는 방식이 아닙니다. Create 수신기와 같은 주파수를 설정하고, **Machine control position**은 NPC가 걸어가 입력할 실제 작업 장소로 지정합니다. 빈 컨트롤러나 잘못된 버튼이면 **A configured Linked Controller is required in NPC inventory**가 나옵니다.

플레이어 직접 조작은 우선하며, 전투·상호작용·편집·AI 비활성 같은 중단 상태에서는 새 입력을 멈춥니다. 기계의 물리적 관성이나 시작한 밸브 동작까지 즉시 되감는 설정은 아닙니다.

## Factory Inspection: 설비를 돌아다니며 읽기

1. **Create → Factory Inspection**을 추가합니다.
2. **Add inspection position**으로 점검할 장치를 하나씩 Shift+우클릭합니다. 최대 16곳입니다.
3. 순서대로 등록하고 필요 없는 위치는 **Delete inspection position**으로 제거합니다.
4. **Work interval (ticks)**를 정합니다. 점검 판독 간격은 최소 20틱으로 처리됩니다.
5. 전광판이 필요하면 아래 항목까지 지정한 뒤 저장합니다. 없으면 점검 경로만으로 시작할 수 있습니다.

![NPC가 크랭크와 빈 Create 탱크 두 곳을 순서대로 방문해 설비를 점검하는 모습.](assets/media/guides/create-tutorials-20261108/create-inspection.mp4 "실제 장치의 상태를 읽는 순회 예제입니다. 고장 수리, 연료 보충, 탱크 채우기 또는 Display Board 출력까지 수행한 영상은 아닙니다.")

점검은 지원 장치의 **회전/정지, 응력 초과, Burner 열 상태, 탱크 비율**을 읽습니다. 점검을 시켰다고 멈춘 축이 돌아가거나 탱크가 채워지지는 않습니다. 값을 자동 운전에 사용하려면 별도 Conditional Machine Operation을 구성하세요.

## Display Board에 보고하기

점검 액션의 **Display Board (optional)**은 선택 기능입니다. Create 쪽에서 정상 조립된 보드와 필요한 동력을 먼저 준비합니다. 🔍로 실제 보드를 고른 뒤 다음 두 항목을 설정합니다.

| 항목 | 의미 | 예 |
| --- | --- | --- |
| First display row (starting at 1) | 보고를 쓰기 시작할 줄, UI는 1부터 | 2면 첫 줄은 다른 용도로 남김 |
| Reserved display rows | 보고에 쓸 연속 줄 수 | 6이면 2~7번 줄 예약 |

보고에는 점검 담당자, 현재 점검 대상의 상태, 주변 작업 NPC 수, 완료 작업과 대기 소포 요약이 포함됩니다. 주변 집계는 약 32블록 범위의 제한된 개체 조사이며 서버 전체 생산 통계가 아닙니다. **완료 작업 수를 모든 제품 아이템 개수와 같은 뜻으로 읽지 마세요.**

보고가 길면 예약 줄 안에서 줄바꿈합니다. 필요한 전체 문장을 넣을 수 없으면 **Reserved board rows cannot fit the complete report**를 표시하고 보드를 일부만 덮어쓰지 않습니다. 보드 폭·높이와 예약 줄 수를 늘립니다. 다른 점검 NPC가 같은 줄을 예약하면 서로 덮어쓰지 않고 기다리므로, NPC별 예약 구간이 겹치지 않게 하세요. 지정 구간 밖의 글은 유지합니다.

## 문제를 찾는 순서

| 증상 / 상태 | 점검할 항목 |
| --- | --- |
| Select valid loaded work positions | 장치·센서·차원이 맞는지, 청크와 작업 경로가 로드됐는지 |
| Sensor reading unavailable | 센서 종류에 맞는 실제 장치인지, 지원되는 저장함·탱크·축인지 |
| Waiting for the activation threshold | 정상 대기일 수 있음. 현재 값과 ON/OFF·두 임계값 비교 |
| Player manual operation has priority | 사람이 같은 장치를 직접 조작하고 있는지 |
| Workstation is reserved by another worker | 같은 장치나 보드 줄을 사용하는 다른 NPC |
| Display Board unavailable or not assembled | 실제 보드 조립, 로드 상태, 지정 블록과 Create 동력 |
| 보드가 보이는데 글이 안 바뀜 | 시작 줄·예약 줄 수·전체 보고가 들어갈 폭, 다른 점검자와 중복 |
| NPC가 장치 앞에서 움직이지 않음 | 전투·상호작용·편집 중단, AI 활성, 발 위치와 시야 |

처음 구성할 때는 **센서 하나·조작 장치 하나·NPC 한 명**으로 확인하세요. 그다음 [가공 NPC](#dochi-npc-core/npc-core-create-factory), [배송 NPC와 주문 창구](#dochi-npc-core/npc-core-create-logistics)를 연결하면 어느 단계에서 기다리는지 구분하기 쉽습니다.
