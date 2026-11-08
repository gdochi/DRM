---
title: Create 공장 가공과 자재 주문
slug: npc-core-create-factory
order: 1516
description: 네 보관 위치와 배치 수량을 연결하고, 실제 기계 가공과 부족 자재 주문을 구성합니다.
product: dochi-npc-core
category: Create 연계
section: editor
status: 사용 안내
version: 0.1.3
audience: NPC 제작자 / 서버 운영자
---

## 먼저 사람이 가동할 수 있는 기계를 만듭니다

**Factory Process**는 재료를 실제 기계에 넣고 실제 결과물을 회수하는 NPC 작업입니다. 조합법을 NPC에게 입력해 아이템을 바로 생성하는 기능이 아닙니다. 먼저 플레이어가 Create 기계에 재료를 넣었을 때 원하는 결과가 나오는지 확인하세요.

예제는 **Iron Ingot → Mechanical Press + Depot → Iron Sheet**입니다. 기계의 동력·회전 방향·응력·열·물·후속 이송 조건은 Create 쪽에서 갖춥니다. 영상은 이해하기 쉽게 Creative Motor를 사용하지만, 실제 공장은 조건을 만족하는 다른 동력원으로 구성할 수 있습니다.

공통 설치와 시간표 저장 순서는 [Create 연계 시작](#dochi-npc-core/npc-core-create-start), 소포를 직접 옮기는 작업은 [주소 배송](#dochi-npc-core/npc-core-create-logistics)을 먼저 읽으세요. 아래는 DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1의 무음 촬영입니다.

## 네 보관 위치를 구분하세요

**Source → Machine input → Finished output → Finished items**의 흐름입니다. 오른쪽 필드에 비슷한 보관함 이름이 나와도 역할이 다릅니다.

| 편집기 항목 | NPC가 하는 일 | 프레스 예제 |
| --- | --- | --- |
| Source inventory | 배치에 필요한 원재료를 꺼냄 | 왼쪽 원재료 통 |
| Machine input inventory | 꺼낸 재료를 기계에 투입 | 프레스 아래 Depot |
| Finished output inventory | 기계가 실제 만든 완성품을 기다렸다 꺼냄 | 같은 Depot |
| Finished items inventory | 회수한 완성품을 최종 납품 | 오른쪽 완제품 통 |

**Machine input과 Finished output은 같은 Depot일 수 있습니다.** 반면 Source와 Machine input, 최종 Finished items와 기계의 Finished output을 같은 보관함으로 연결하지 마세요. 같은 더블 체스트의 양쪽도 같은 인벤토리입니다. 처음에는 원재료 통·Depot·완제품 통의 세 위치로 시작하면 이해하기 쉽습니다.

## Factory Process 설정하기

1. **Schedule → 시간대의 + → Create → Factory Process**를 추가합니다.
2. 위 표의 네 필드를 각각 🔍로 선택합니다. 상자 외에도 실제 아이템 입출력을 제공하는 지원 장치를 선택할 수 있지만, 기계의 어느 면으로 재료를 받는지와 필터도 확인합니다.
3. **Materials and quantities**에서 첫 **Material item → 🔍**로 Iron Ingot을 고르고 **Material quantity**를 정합니다. 여러 재료면 **Add material**로 추가합니다. 최대 8종, 각 1~64개이며 같은 아이템을 중복 행으로 추가하지 않습니다.
4. **Finished item → 🔍**에서 Iron Sheet를 고르고 **Finished quantity per batch**를 정합니다. 해당 배치에서 실제로 나올 수 있는 수량이어야 합니다.
5. 처음에는 **Order missing materials automatically**를 끄고 원재료 통에 재료를 직접 넣습니다. 수동 준비로 한 배치를 성공시킨 후 자동 주문을 추가하세요.
6. **Repeat throughout shift**를 켜면 반복합니다. 끄면 **Batch size**만큼 **배치**를 완료합니다. 원재료 한 개의 뜻이 아닙니다.
7. **Processing timeout in ticks**, **Work interval (ticks)**를 확인하고 시간표를 켜서 **Save to NPC**로 저장합니다.

![준비된 프레스 작업에서 배치당 철괴 두 개와 완성 철판 두 개를 지정하고 저장하는 편집 화면.](assets/media/guides/create-tutorials-20261108/create-factory-settings.mp4 "네 보관 위치와 아이템은 미리 연결했습니다. 실제 수량 필드 입력과 NPC 저장을 보여 줍니다. 아래 실행 영상은 별도 설정인 한 개씩 두 배치입니다.")

## 수량 예: 재료 수량과 Batch size는 곱해집니다

| 설정 | 한 배치 | 유한 작업 전체 |
| --- | --- | --- |
| Material quantity 1, Finished quantity 1, Batch size 2 | 철괴 1 → 철판 1 | 철괴 2 → 철판 2 |
| Material quantity 2, Finished quantity 2, Batch size 3 | 철괴 2 → 철판 2 | 철괴 6 → 철판 6 |

이 수량은 실제 조합법이 1:1일 때의 예입니다. 다른 조합법의 확률 결과나 부산물이 기대 수량을 보장한다고 가정하면 계속 기다릴 수 있습니다. 또한 **재료 아이템 ID와 완성품 아이템 ID는 달라야 합니다.** 같은 아이템을 다시 꺼내 완료로 오인하는 구성을 허용하지 않습니다.

## 실행: 모으기 → 투입 → 기다리기 → 납품

![원재료 통에서 철괴를 가져와 프레스 아래 Depot에 넣고 실제 철판을 회수·납품하는 두 배치.](assets/media/guides/create-tutorials-20261108/create-factory-process.mp4 "배치당 철괴 1·철판 1, Batch size 2의 준비된 시간표입니다. 기계 가공은 Create Mechanical Press가 수행하며 최종 통의 철판 두 개로 결과를 확인합니다.")

작업 시작 전 기계의 결과 위치에서 **지정한 완성품이 남아 있으면 먼저 비워야** 합니다. 다른 작업의 결과를 이번 배치로 잘못 세지 않도록 하기 위한 조건입니다. 이후 NPC는 배치 재료를 확보하고 투입한 다음, 설정한 완성품 수량을 받을 때까지 기다립니다. 실제 결과물을 확보해야 최종 납품으로 넘어갑니다.

같은 기계의 투입·회수 위치는 한 작업자가 예약합니다. 다른 NPC와 같은 Depot을 공유하면 **Workstation is reserved by another worker** 상태가 나올 수 있습니다. 처음에는 기계 한 세트에 가공 NPC 한 명을 두세요.

## 타임아웃이 떠도 재료는 사라지지 않습니다

기본 **Processing timeout**은 `1200`틱, 20 TPS에서 약 60초입니다. 범위는 20~24000틱입니다. 제한 시간을 넘으면 **Processing timed out; existing materials remain owned**로 표시하지만, 투입한 재료와 진행 기록을 지우고 같은 배치를 또 투입하지 않습니다.

1. 기계가 실제로 돌아가는지, 응력이 초과되지 않았는지 확인합니다.
2. 정확한 조합법 재료와 필요한 열·액체·필터를 확인합니다.
3. **Finished output inventory**가 실제 결과가 나오는 위치인지 확인합니다.
4. 결과 아이템 ID와 수량이 현실적인지 확인합니다.
5. 기계나 보관함을 바꿨다면 기존 기계 안의 물건과 NPC의 예약 화물을 먼저 확인합니다.

납품 통이 가득 차면 완성품은 NPC에게 남고, NPC 인벤토리가 가득 차면 회수도 기다립니다. 진행 중인 기계를 부수거나 예약 화물을 수동으로 빼내는 대신 공간과 기계 조건부터 복구하세요. 재접속·설정 변경이 진행 중 배치를 안전하게 취소하고 새로 시작하는 버튼은 아닙니다.

## Material Ordering: 목표 재고의 부족분 주문

**Material Ordering**은 기계를 돌리는 액션과 다릅니다. 지정한 **Receiving inventory to maintain**의 재고를 보고, 목표보다 부족하면 실제 **Stock Ticker 물류 네트워크**에 그 부족분을 주문합니다.

예를 들어 목표 철괴가 **4개**일 때 수령 통이 비었으면 4개, 3개 있으면 1개를 주문합니다. 이 액션의 **Material quantity는 목표 재고**입니다. Factory Process에서는 같은 수량 필드가 **배치당 소비량**입니다.

### Create 쪽 준비

1. 재고를 가진 공급 보관함과 **Packager**를 준비합니다.
2. **Stock Link**와 **Stock Ticker**를 같은 Create 물류 네트워크로 연결합니다. 먼저 Ticker에서 공급 재고가 보이는지 확인합니다.
3. 주문 주소의 소포가 수령 보관함까지 오고 개봉되어 **일반 재료가 수령 보관함에 들어가는 실제 경로**를 준비합니다. DNPC가 주문했다고 물품이 순간 이동하지 않습니다.
4. 소포를 NPC가 중간 운반하게 하려면 별도의 [Addressed Parcel Delivery](#dochi-npc-core/npc-core-create-logistics) 경로도 구성합니다. 봉인 소포를 통에 넣는 것과 재료를 개봉해 재고로 만드는 것은 별개입니다.

### DNPC 쪽 설정

1. **Create → Material Ordering**을 선택합니다.
2. **Receiving inventory to maintain**에 실제 재료가 도착할 통을 지정합니다.
3. **Materials and quantities**에 유지할 아이템과 목표 수량을 넣습니다.
4. 연결된 **Stock Ticker**를 지정하고 **Delivery address**를 Create 물류 경로와 맞춥니다.
5. **Work interval (ticks)**를 확인하고 저장합니다.

![준비된 물류 네트워크에 철괴 네 개를 주문하고 접수된 주문을 대기하는 NPC.](assets/media/guides/create-tutorials-20261108/create-material-order.mp4 "공급 재고 16→12와 보존된 주문 한 건을 확인합니다. 실제 Create 주문·포장은 사용하지만, 이 예제는 배송 경로를 연결하지 않아 수령 통 도착·개봉까지 보여 주지 않습니다.")

## 접수된 주문을 반복해서 보내지 않는 이유

**Accepted order is waiting for delivery**는 주문에 실패했다는 뜻이 아닙니다. 접수한 주문은 도착을 기다리고 저장·재접속 뒤에도 기록을 유지합니다. 시간만 지났다고 자동으로 같은 요청을 재전송하지 않습니다. 실제 물품이 원래 수령 보관함에 도착했는지로 처리합니다.

| 상태 | 먼저 점검할 곳 |
| --- | --- |
| Native logistics network has insufficient stock | 공급 통 재고, Stock Link 연결, Ticker의 실제 표시 재고 |
| Native logistics network rejected the order | Create 네트워크·요청 조건 |
| Accepted order is waiting for delivery | Packager, 주소, 이동 경로, 개봉, 원래 수령 통 |
| Order result uncertain; automatic resend stopped | 중복 발송 전에 Create가 이미 재고를 예약·발송했는지 |
| Target stock is available | 목표 재고를 이미 만족하므로 정상 대기 |

대기 중 수령 통을 바꿔도 예전 주문이 새 통에 도착한 것으로 간주하지 않습니다. NPC에게 같은 아이템을 직접 넣는 것만으로 원래 수령지의 미도착 주문이 완료되지는 않습니다.

## Factory Process에 자동 주문 붙이기

수동 가공이 정상 동작하면 **Factory Process → Order missing materials automatically**를 켭니다. 추가로 나타나는 **Stock Ticker**와 **Delivery address**를 지정합니다. 부족한 배치 재료를 주문한 뒤 원재료 출처로 도착하면 가공이 이어집니다.

별도 Material Ordering NPC와 자동 주문 가공 NPC를 같은 재고에 동시에 붙일 필요는 없습니다. 처음에는 **한 가지 주문 담당 방식**으로 구성하고, 실제 재고·주문·도착을 확인한 후 역할을 늘리세요. 동력이나 액체 조건까지 제어하려면 [조건 제어와 설비 점검](#dochi-npc-core/npc-core-create-control)으로 이어집니다.
