---
title: Create 연마 · 소포 배송 · 주문 창구
slug: npc-core-create-logistics
order: 1515
description: 사포 연마부터 NPC·보관함 주소 배송, 반송, Stock Ticker 창구까지 순서대로 만듭니다.
product: dochi-npc-core
category: Create 연계
section: editor
status: 사용 안내
version: 0.1.3
audience: NPC 제작자 / 서버 운영자
---

## 시작 전에

이 문서는 **NPC 제작자용 Schedule 편집 화면**과 그 설정이 실행되는 게임 장면을 설명합니다. 설치 환경과 공통 저장 순서는 [Create 연계 시작](#dochi-npc-core/npc-core-create-start)에서 먼저 확인하세요. 영상은 같은 DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1 환경에서 촬영한 무음 예제입니다. 장치·시간표를 미리 준비한 실행 영상과 실제 입력을 보여 주는 편집 영상을 구분했습니다.

## 사포 연마: 재료 → 작업 자리 → 완성품 보관함

**Sandpaper Polishing**을 선택하면 NPC가 실제 Create 사포와 연마 재료를 챙기고, 지정한 자리에서 연마한 뒤 결과물을 옮깁니다. 예제는 **Rose Quartz 두 개 → Polished Rose Quartz 두 개**입니다. 실제 조합법은 현재 월드의 Create 조합법을 사용합니다.

1. **Source inventory**로 지정할 상자·통에 Create **Sand Paper** 또는 **Red Sand Paper**와 연마 가능한 재료를 넣습니다. 사포는 장비 칸에 장식으로 들려주는 대신 작업이 사용할 보관함에 준비합니다.
2. **Finished items inventory**에 완성품을 받을 다른 보관함을 지정합니다.
3. **Working position and facing**을 지정합니다. 🔍로 바닥을 선택하거나 **Use my position and facing**을 누릅니다. 후자는 발 위치와 플레이어가 보는 방향을 함께 저장합니다.
4. 계속 만들려면 **Repeat throughout shift**, 정해진 수량이면 **Finish one batch per shift**를 선택합니다. 예제는 유한 작업, **Batch size 2**입니다.
5. **Work interval (ticks)**를 정합니다. `20`은 20 TPS에서 1초입니다. 시간표를 켜고 **Save to NPC**로 저장합니다.

![사포와 장미석을 가져와 지정한 방향으로 연마하고 결과 두 개를 오른쪽 보관함으로 옮기는 NPC.](assets/media/guides/create-tutorials-20261108/create-polish.mp4 "준비된 시간표를 실행합니다. 원본 Create 연마 조합법, 사포 소모와 결과 보관을 사용하는 예제입니다. 화면의 수량은 촬영 도구가 읽은 실제 서버 보관함 수량입니다.")

사포는 실제 내구도를 사용합니다. 완성품 보관함이 꽉 차면 결과를 NPC 인벤토리에 보관하고 납품을 기다립니다. NPC 인벤토리에도 빈 공간이 필요합니다. 작업 자리만 지정하고 재료·사포·출력 보관함을 빼먹으면 연마를 시작하지 못합니다.

## 소포 배송: 주소와 목적지는 따로 지정합니다

**Addressed Parcel Delivery**는 Create가 이미 만든 **봉인 소포 전체**를 운반합니다. 상자 속 일반 아이템을 자동으로 포장하거나, 수신자가 받은 소포를 자동으로 개봉하는 기능이 아닙니다.

| 설정 | 역할 | 예 |
| --- | --- | --- |
| Source inventory | 출발할 Create 소포를 꺼낼 곳 | 발송 대기 통 |
| Return inventory | 운반 중 배달할 수 없어진 소포를 돌려놓을 곳 | 반송 통 |
| Address routes → Address | 소포에 적힌 주소와 비교할 패턴 | Workshop A |
| Recipient: NPC / inventory | 실제로 받을 NPC 또는 보관함 | 창고 담당 NPC / 수령 통 |
| Recipient wait (ticks) | 운반 중 목적지가 사라지거나 가득 찼을 때 기다릴 시간 | 400틱 = 약 20초 |

처음에는 서로 다른 출발·수령·반송 보관함을 준비하고 주소 하나로 시작하세요. **출발 보관함과 수령 보관함은 달라야 합니다.** 같은 더블 체스트의 반대쪽 반쪽도 별개 출발지·목적지로 취급하지 마세요.

주소 경로는 최대 **32개**입니다. 유한 배송의 **Batch size 1~64는 봉인 소포 개수**이며 소포 안의 아이템 수가 아닙니다. **Repeat throughout shift**는 근무 중 계속 배송합니다. **Work interval**은 4~1200틱, **Recipient wait**는 20~24000틱입니다. 틱을 초로 환산한 예는 서버가 20 TPS로 진행할 때를 기준으로 합니다.

## NPC에게 주소 연결하기

1. 출발 보관함에 `Workshop A` 주소가 적힌 실제 Create 소포를 넣습니다. 주소는 Create 쪽에서 소포를 만들 때 지정합니다.
2. **Schedule → Addressed Parcel Delivery** 액션에서 **Source inventory**와 **Return inventory**를 선택합니다.
3. **Add address route**를 누르고 받을 DNPC를 선택합니다. 선택기는 **주변 64블록 안에 로드된 DNPC**를 찾습니다.
4. 추가한 행의 **Address**를 **Workshop A**로 입력합니다. 기본으로 만들어진 Address 1 같은 예시 문자열을 그대로 두지 마세요.
5. 수신 NPC 이름을 확인하고 필요하면 🔍로 다시 선택합니다. 다른 목적지를 더 만들 때만 경로를 추가합니다.
6. 기다릴 시간, 반복 또는 유한 작업, 수량과 작업 간격을 정하고 **Save to NPC**로 저장합니다.

![준비된 배송 경로에서 주소 Workshop A와 수신 대기 80틱을 입력하고 NPC에 저장하는 편집 과정.](assets/media/guides/create-tutorials-20261108/create-parcel-routes.mp4 "수신 NPC와 보관함은 미리 지정했습니다. 주소와 대기 시간의 실제 필드 입력·서버 저장을 보여 줍니다. 80틱은 20 TPS에서 4초이며 기본값 400틱과 다릅니다.")

수신자는 **이름이 아닌 NPC의 UUID**로 저장합니다. 같은 이름의 NPC를 새로 만들거나 템플릿에서 복제해도 원래 수신자를 대신하지 않습니다. 새 NPC를 쓸 때는 경로의 수신자를 다시 고릅니다. 템플릿 복제와 식별자는 [NPC 템플릿](#dochi-npc-core/npc-core-templates)도 참고하세요.

![Workshop A 소포는 수신 NPC에게 전달되고 Unknown 소포는 출발 보관함에 남는 과정.](assets/media/guides/create-tutorials-20261108/create-parcel-npc.mp4 "준비된 경로의 실제 실행입니다. 수신 NPC 인벤토리에 봉인 소포 한 개가 들어갔고, 일치하지 않는 Unknown 소포는 출발지에 남았습니다.")

## 보관함으로 배송하기

수신 NPC 대신 지정 보관함으로 보낼 수 있습니다. **Add inventory delivery route**를 누르고 월드에서 수령 보관함을 Shift+우클릭한 뒤 그 행의 **Address**를 적습니다. 기존 NPC 경로는 **Choose a receiving inventory**로 전환하고, 보관함 경로는 **Choose an NPC recipient**로 전환할 수 있습니다.

![주소가 맞는 소포 한 개를 오른쪽 수령 보관함에 그대로 넣는 배송 NPC.](assets/media/guides/create-tutorials-20261108/create-parcel-container.mp4 "수령 보관함에는 봉인 소포가 들어갑니다. Create Packager의 개봉이나 후속 벨트 이송을 이 영상에서 수행하지 않습니다.")

NPC 배송과 보관함 배송 모두 **일치하는 경로가 정확히 하나**일 때만 꺼냅니다. Create의 주소 패턴을 사용하므로 Workshop * 같은 넓은 패턴과 Workshop A를 함께 넣으면 한 소포가 두 경로에 걸릴 수 있습니다. 이때 먼저 적힌 경로를 임의로 고르지 않고 출발지에 둡니다. 처음에는 와일드카드 없이 서로 겹치지 않는 주소를 쓰세요.

## 배송 실패와 반송을 구분하기

**꺼내기 전** 목적지가 이미 가득 차 있거나 수신자를 찾지 못하면 소포를 출발지에 둡니다. **꺼낸 뒤** 수신자가 사라지거나 목적지가 꽉 차면 NPC가 소포를 보유한 채 기다리고, 수신 대기 시간이 지나면 **Return inventory**로 돌아갑니다. 반송 보관함도 꽉 차면 소포는 NPC에게 남습니다.

![소포를 꺼낸 뒤 목적지에 공간이 없어지자 반송 보관함으로 돌려놓는 과정.](assets/media/guides/create-tutorials-20261108/create-parcel-return.mp4 "문제 상황을 설명하려고 촬영 도구가 픽업 직후 수령 보관함을 돌로 채웁니다. NPC가 스스로 목적지를 채운 것이 아닙니다. 반송 후 소포 한 개와 출발지의 미일치 소포를 확인합니다.")

| 상태 | 의미 | 다음에 할 일 |
| --- | --- | --- |
| Waiting for a uniquely addressed package | 주소 미일치 또는 여러 경로에 일치 | 소포 주소와 모든 경로를 비교 |
| Recipient unavailable; keeping the package | 수신자가 없거나 접근 조건을 만족하지 못함 | 원래 수신 NPC·차원·청크·작업 범위 확인 |
| Recipient full; keeping the package | 수령 공간 부족 | 수신 NPC 인벤토리 또는 목적지 공간 확보 |
| Returning the undelivered package | 픽업한 소포를 반송하는 중 | 반송 보관함까지의 경로 확인 |
| Output full; keeping the item | 납품 또는 반송을 끝낼 공간 부족 | 공간을 비우고 NPC의 화물 보존 확인 |

근무가 끝나면 들고 있던 화물을 지운 뒤 새 물건을 만드는 방식으로 처리하지 않습니다. 운반 중 설정을 바꿔도 이미 들고 있는 물건에는 원래 저장된 목적지 기록이 사용될 수 있으므로, 실제 인벤토리와 반송 상태를 먼저 확인하세요.

## Stock Ticker 주문 창구 만들기

**Stock Ticker Attendance**는 정해진 시간에 자리에 앉아 **Create의 원래 주문 화면**을 열어 주는 담당 NPC를 만듭니다. DRM 상점 화면이나 DNPC 전용 상품 목록 편집기가 아닙니다.

1. **정지한 Create Seat**를 놓고 그 좌석 바로 옆에 **Stock Ticker 하나만** 배치합니다.
2. Create 쪽에서 Stock Ticker를 실제 물류 네트워크에 연결하고 주문 가능한 재고를 준비합니다.
3. 액션을 **Stock Ticker Attendance**로 고르고 **Stock Ticker**와 **Create seat**를 각각 🔍로 지정합니다.
4. 시간표를 켜고 저장·닫기 합니다. NPC가 좌석에 앉아 **Attending the Stock Ticker** 상태가 되는지 봅니다.
5. NPC에게 일반 상호작용을 하면 Create 주문 화면이 열립니다. NPC 편집 도구를 들고 하는 편집 상호작용은 우선합니다.

![NPC가 좌석에 앉아 창구를 지키고 일반 상호작용으로 Create 주문 화면을 여는 모습.](assets/media/guides/create-tutorials-20261108/create-stock-keeper.mp4 "이 장면은 좌석 연결과 실제 Create 주문 화면 진입을 보여 줍니다. 예제 창구에서 상품 결제와 물류 배송까지 완료한 영상은 아닙니다.")

영상의 **No Packagers Linked**는 이 창구 예제에 공급 Packager를 연결하지 않았다는 뜻입니다. 실제 주문에 쓸 창구에는 Create 물류 네트워크와 공급 재고를 연결하세요. 아래 자재 주문 문서의 영상은 별도로 연결한 네트워크에서 주문을 접수하는 예제입니다.

좌석 옆에 Ticker가 없거나 여러 개면 정확한 연결을 확정할 수 없습니다. 좌석이 사용 중이면 기다립니다. 근무가 끝나면 안전하게 하차합니다. **앉아 있기**, **주문 창구 근무**, **자동 자재 주문**은 서로 다른 액션입니다. NPC가 부족분을 알아서 주문하게 하려면 [Material Ordering](#dochi-npc-core/npc-core-create-factory)을 사용하세요.

## Blaze Burner에 연료를 옮기려면

기존 **아이템 운반** 기능의 목적지로 지원되는 Create Blaze Burner를 사용합니다. Burner가 실제로 받아들이는 연료를 공급하고, 버킷처럼 되돌려 주는 용기는 NPC 인벤토리의 반환 공간을 확보합니다. 이 경로는 Factory Process에서 가짜 가공 결과를 만드는 방식이 아닙니다. 일반 운반의 필터·수량·납품 설정은 [NPC 작업과 운반](#dochi-npc-core/npc-core-editor)을 참고하세요.

이 페이지의 신규 영상은 Burner 급유를 별도로 촬영하지 않았습니다. Burner가 가열됐다고 해서 주변 기계의 동력·배관·조합법 조건이 자동으로 갖춰지지는 않습니다.
