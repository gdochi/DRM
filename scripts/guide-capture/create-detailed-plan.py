"""Author the complete native Create lessons; never connects to OBS."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LANG = json.loads((Path.home() / "Desktop/[COMMON] Dochi`s Npc Core/[NEOFORGE] Dochi NPC/src/main/resources/assets/dochi_npc/lang/en_us.json").read_text(encoding="utf-8"))
def label(key): return LANG["dochi_npc." + key]
def button(key): return "lesson:button:" + label(key)
def field(key, value): return "lesson:input:" + key + "=" + str(value)
def caption(title, body): return "lesson:caption:" + title + "|" + body
def pause(ticks=35): return f"wait:{ticks}"
def choose(key, target):
    return [button(key), "lesson:view:" + target, pause(35), "lesson:choose:" + target, pause(25)]
def material(key, item):
    return [button(key), field("search", item), "lesson:item:" + item, pause(25), button("apply"), pause(20)]
def start(kind, id, title, body):
    setup=["lesson:prepare:" + kind, pause(30)]
    if kind=="inspect": setup += ["lesson:power-board", pause(40), "lesson:check-board-power"]
    return setup + ["lesson:record:" + id, caption(title, body), pause(55)]
def schedule(action, title="낮 근무", category="create"):
    return [caption("빈 시간표에서 시작", "Core로 NPC를 우클릭하고 Schedule을 엽니다. 아직 등록된 일정이 없습니다."), "lesson:editor", pause(20), button("category.day_cycle"), pause(25),
            caption("근무 시간 만들기", "Add time을 누르고 이름과 시작·종료 시각을 입력합니다."), button("cycle.add"), field("cycle.name", title), field("cycle.start", 0), field("cycle.end", 12000), pause(25),
            caption("시간대에 할 일 추가", "가운데 시간대 행의 +를 누르고 작업 분류에서 실제 액션을 고릅니다."), "lesson:button:+", "lesson:category:" + label("cycle.catalog.category." + category), pause(25), "lesson:action:" + label(action), pause(30)]
def save():
    return [caption("활성화하고 NPC에 저장", "Enable schedule을 켠 다음 상단 디스크 아이콘 Save to NPC를 누릅니다."), button("cycle.enabled"), pause(20), button("save"), pause(30), "lesson:verify-saved", caption("저장 확인 후 편집기 닫기", "NPC settings saved를 확인합니다. 편집 중에는 작업이 멈추므로 닫고 관찰합니다."), pause(30), "lesson:arm", "lesson:close", "lesson:camera"]
def finish(): return [pause(45), "lesson:finish"]

plan = []
def add(id, actions): plan.append({"id": id, "screen": "@world", "actions": actions})

a = start("crank", "lesson-crank", "손 크랭크 · 처음부터 끝까지", "준비된 것은 크랭크 블록뿐입니다. 빈 시간표에 작업을 만들고 실제 회전을 확인합니다.")
a += schedule("work.create_crank", "크랭크 근무")
a += [caption("조작할 크랭크 선택", "Assign hand crank block의 찾기를 누르고 월드의 실제 크랭크를 Shift+우클릭합니다.")]
a += choose("kinetic.target.crank", "device")
a += [caption("회전 방향과 작동 방식", "기본 방향을 확인하고 Keep turning을 눌러 시간 제한 모드로 전환합니다."), button("kinetic.mode.continuous"), caption("실제 작동 시간 6초", "Operating time은 초입니다. 이동하거나 기다리는 시간은 이 6초에 포함되지 않습니다."), field("kinetic.duration", 6)]
a += [caption("장치와 발 위치는 다릅니다", "Assign standing position에서는 장치 앞 바닥을 고릅니다. 바닥 위 두 칸을 비워 둡니다.")]
a += choose("kinetic.position.block", "standing")
a += save() + [caption("손동작과 실제 회전 관찰", "NPC가 지정한 자리에 접근해 크랭크를 6초 돌린 뒤 멈추는 과정입니다."), pause(230), "lesson:verify", caption("유한 작업 완료", "시간을 다 쓰면 입력을 멈춥니다. 같은 근무에서 편집기를 다시 열어도 완료 시간이 초기화되지 않습니다.")]
add("lesson-crank", a + finish())

a = start("valve", "lesson-valve", "밸브 · 각도와 횟수 구분", "월드의 밸브는 90°로 준비했습니다. NPC에서는 두 번 조작하도록 설정합니다.") + schedule("work.create_valve", "밸브 근무")
a += [caption("실제 Valve Handle 지정", "밸브 선택 항목에서 찾기를 누르고 월드의 해당 밸브를 Shift+우클릭합니다.")] + choose("kinetic.target.valve", "device")
a += [caption("횟수와 추가 대기 입력", "Number of operations에 2를 입력하고 가운데 액션 행을 다시 눌러 추가 설정을 표시합니다."), field("kinetic.repetitions", 2), "lesson:reuse-action", caption("추가 대기 1초 입력", "새로 나타난 Pause between operations에 1을 입력합니다. 이 값의 단위는 초입니다."), field("kinetic.interval", 1), caption("회전 각도는 블록 설정", "NPC의 횟수 2는 2도가 아닙니다. 각 동작은 밸브 블록에 설정된 90°를 사용합니다."), pause(40)]
a += choose("kinetic.position.block", "standing") + save()
a += [caption("두 번의 동작과 쿨다운", "첫 회전과 Create의 쿨다운이 끝나야 다음 조작을 합니다. 손을 바꿔 잡는 동작도 관찰하세요."), pause(220), "lesson:verify", caption("작업 완료 뒤 한 걸음 물러남", "두 번을 완료하면 반복 입력을 멈춥니다. 시작된 회전은 일시 중단 중에도 끝날 수 있습니다.")]
add("lesson-valve", a + finish())

a = start("seat", "lesson-seat", "Create 좌석 · 지정부터 하차까지", "좌석 블록을 대상으로 하는 일정입니다. 열차 운전 경로를 만드는 작업과는 다릅니다.") + schedule("activity.ride", "좌석 근무", "movement")
a += [caption("일반 탈것에서 Create seat로 전환", "Vehicle을 눌러 Create seat로 바꾸고 실제 좌석 블록을 지정합니다."), button("ride.vehicle")]
a += choose("ride.create_pick", "seat")
a += [caption("탑승 시도 시간", "Boarding timeout은 틱입니다. 200틱 동안 접근과 탑승을 시도하도록 입력합니다."), field("ride.timeout", 200), caption("근무가 끝나면 하차", "Dismount when schedule ends가 켜져 있는지 확인합니다. 움직이는 좌석은 안전한 정지를 기다립니다."), pause(35)]
a += save() + [caption("NPC가 걸어가서 앉는 과정", "다른 개체가 이미 앉아 있으면 기다립니다. 이 예제는 빈 정지 좌석입니다."), pause(100), caption("시간 명령으로 근무 종료 재현", "검증 월드의 시각을 12500으로 바꿔 종료 상황을 보여 줍니다. 자동 하차를 관찰합니다."), "lesson:end-shift", pause(90), "lesson:verify"]
add("lesson-seat", a + finish())

a = start("polish", "lesson-polish", "사포 연마 · 재료 확인부터 납품까지", "초록 표시의 Source에는 실제 사포 한 개와 Rose Quartz 두 개가 준비돼 있습니다.")
a += ["lesson:view:source", "lesson:open:source", pause(60), caption("사포와 연마 재료 확인", "Sand Paper는 실제 내구도를 사용합니다. 먼저 출처 보관함에 둘 다 준비하세요."), pause(35), "lesson:close"]
a += schedule("work.create_polish", "사포 연마")
a += [caption("재료를 꺼낼 보관함", "Source inventory의 찾기로 초록 표시 보관함을 지정합니다.")] + choose("create_job.source", "source")
a += [caption("완성품을 받을 보관함", "Finished items inventory에는 파란 표시의 별도 보관함을 지정합니다.")] + choose("create_job.output", "output")
a += [caption("작업 자리와 바라보는 방향", "Working position and facing에서 바닥을 선택합니다. 현재 보는 방향도 작업 방향으로 저장됩니다.")] + choose("create_job.workplace", "workplace")
a += [caption("근무당 두 개만 연마", "Repeat throughout shift를 눌러 유한 작업으로 바꾸고 Batch size를 2로 입력합니다."), button("create_job.repeat"), field("create_job.batch", 2), field("create_job.interval", 20)]
a += save() + [caption("사포를 가져와 실제로 연마", "출처에서 재료와 도구를 챙기고 지정한 자리에서 연마한 뒤 완성품을 옮깁니다."), pause(360), "lesson:verify", "lesson:view:output", "lesson:open:output", caption("보관함에서 실제 결과 확인", "Polished Rose Quartz 두 개가 들어 있습니다. 결과 보관함이 꽉 차면 NPC가 들고 기다립니다."), pause(60), "lesson:close"]
add("lesson-polish", a + finish())

def parcel_base(kind, id, npc):
    a = start(kind, id, "주소 소포 배송 · " + ("NPC 수신" if npc else "보관함 수신"), "소포는 이미 Create에서 포장했습니다. Workshop A 주소를 실제 목적지와 연결합니다.")
    a += ["lesson:view:source", "lesson:open:source", caption("출발 소포 준비", "Workshop A와 Unknown 소포가 있습니다. 주소가 맞는 소포만 꺼내도록 경로를 만듭니다."), pause(55), "lesson:close"]
    a += schedule("work.create_package_delivery", "주소 배송")
    a += [caption("출발지와 반송지 지정", "Source는 초록, Return inventory는 주황 보관함입니다. 두 곳을 각각 지정합니다.")]
    a += choose("create_job.source", "source") + choose("create_job.returns", "returns")
    if npc:
        a += [caption("수신 NPC 고르기", "Add address route를 누르고 Receiving Clerk를 고른 뒤 Apply를 누릅니다."), button("create_job.add_route"), "lesson:recipient:Receiving Clerk", pause(25), button("apply")]
    else:
        a += [caption("수령 보관함으로 경로 추가", "Add inventory delivery route를 누르고 파란 수령 보관함을 선택합니다.")]
        a += choose("create_job.add_container_route", "output")
    a += [caption("소포 주소와 같은 문자열 입력", "Address 1을 Workshop A로 바꿉니다. 수신자 이름과 소포 주소는 별개의 설정입니다."), field("create_job.address.0", "Workshop A"),
          caption("대기 시간과 유한 배송 수량", "대기 80틱, Batch size 1로 설정합니다. Batch size는 소포 안 아이템 수가 아닌 봉인 소포 개수입니다."), field("create_job.recipient_wait", 80), button("create_job.repeat"), field("create_job.batch", 1), field("create_job.interval", 20)]
    return a

a = parcel_base("parcel-npc", "lesson-parcel-npc", True) + save()
a += [caption("포장을 뜯지 않고 그대로 전달", "NPC가 상자를 양팔로 들고 수신 NPC에게 걸어갑니다. 수신자는 이름이 아닌 UUID로 연결됩니다."), pause(270), "lesson:verify", caption("주소가 맞지 않는 소포는 남습니다", "Workshop A 한 개는 수신자에게 갔고 Unknown은 출발지에 남았습니다."), "lesson:view:source", "lesson:open:source", pause(55), "lesson:close"]
add("lesson-parcel-npc", a + finish())

a = parcel_base("parcel-container", "lesson-parcel-container", False) + save()
a += [caption("보관함에 봉인 소포 납품", "이 경로는 소포 전체를 넣습니다. 내용물을 자동 개봉하는 기능은 아닙니다."), pause(270), "lesson:verify", "lesson:view:output", "lesson:open:output", caption("수령 보관함의 실제 소포 확인", "봉인 소포 한 개가 들어 있습니다. 출발 보관함과 같은 더블 체스트를 목적지로 쓰지 마세요."), pause(60), "lesson:close"]
add("lesson-parcel-container", a + finish())

a = start("parcel-return", "lesson-parcel-return", "배송 실패 · 기다림과 반송", "앞 영상에서 직접 저장한 보관함 배송 설정을 그대로 이어 씁니다. 이번에는 반송을 확인합니다.")
a += ["lesson:editor", pause(25), button("category.day_cycle"), "lesson:expand-time", pause(20), "lesson:reuse-action", caption("반송 대기 시간을 짧게 재현", "수신 대기 40틱으로 바꿉니다. 픽업 후 수령 통을 가득 채워 배달 실패 상황을 만듭니다."), field("create_job.recipient_wait", 40)]
a += save() + [caption("픽업 뒤 수령 통이 가득 찬 상황", "재현 도구가 돌로 통을 채웁니다. NPC는 소포를 보유해 기다린 뒤 주황 반송 통으로 돌아갑니다."), pause(330), "lesson:verify", "lesson:view:output", "lesson:open:output", caption("가득 찬 목적지 확인", "수령 통에 공간이 없습니다. 처음부터 가득 차 있었다면 소포를 출발지에서 꺼내지 않습니다."), pause(45), "lesson:close", "lesson:view:returns", "lesson:open:returns", caption("반송된 봉인 소포 확인", "반송 통에는 소포 한 개가 들어 있습니다. 반송 통도 가득 차면 NPC가 계속 보유합니다."), pause(60), "lesson:close"]
add("lesson-parcel-return", a + finish())

a = start("keeper", "lesson-stock-ticker", "Stock Ticker 창구 · 연결과 실제 주문 화면", "좌석 옆에는 Stock Ticker 하나만 있습니다. 공급 Packager와 같은 네트워크로 미리 연결했습니다.")
a += ["lesson:view:seat", pause(50)] + schedule("work.create_stock_keeper", "주문 창구")
a += [caption("Stock Ticker와 좌석을 각각 지정", "먼저 Ticker 블록을 고르고, 다음에 Create seat를 별도로 고릅니다.")] + choose("create_job.ticker", "ticker") + choose("create_job.seat", "seat")
a += save() + [caption("근무 자리로 이동해 앉기", "NPC가 창구 좌석에 앉을 때까지 기다립니다. 빈손으로 일반 상호작용을 합니다."), pause(140), "lesson:verify", "lesson:interact", pause(35), "lesson:verify-orders", caption("연결된 실제 재고가 보이는 Create 화면", "공급 재고인 철괴 16개가 표시됩니다. Create 주문 화면에서 네트워크 연결과 재고를 먼저 확인하세요."), pause(100), "lesson:close"]
add("lesson-stock-ticker", a + finish())

a = start("process", "lesson-factory-process", "Factory Process · 네 위치를 하나씩 연결", "초록 통은 원재료, 프레스 아래 Depot은 투입·회수, 파란 통은 최종 완성품 위치입니다.")
a += ["lesson:view:source", "lesson:open:source", caption("실제 철괴 두 개 준비", "이 예제는 철괴 한 개를 철판 한 개로 만드는 배치를 두 번 실행합니다."), pause(55), "lesson:close"] + schedule("work.create_process", "철판 가공")
for key,target,title,body in [
    ("create_job.source","source","① Source inventory","NPC가 원재료를 꺼낼 초록 통을 지정합니다. 기계 투입 위치와 다릅니다."),
    ("factory.input","depot","② Machine input inventory","프레스 아래 Depot에 재료를 넣습니다. 보관함이 아니라 실제 투입 가능한 장치를 선택하세요."),
    ("factory.result","depot","③ Finished output inventory","이 프레스는 같은 Depot에 완성품이 놓입니다. 이번에는 같은 Depot을 다시 선택합니다."),
    ("create_job.output","output","④ Finished items inventory","완성된 철판을 최종 보관할 파란 통입니다. 기계의 결과 위치와 구분하세요.")]:
    a += [caption(title,body)] + choose(key,target)
a += [caption("재료 아이템 직접 선택", "Material item의 찾기에서 minecraft:iron_ingot을 검색하고 아이콘을 고른 뒤 Apply합니다.")] + material("factory.material.item","minecraft:iron_ingot")
a += [caption("한 배치에 사용할 수량", "Material quantity는 배치당 소비량입니다. 철괴 한 개로 입력합니다."), field("factory.material.count.0",1)]
a += [caption("완성품도 직접 선택", "Finished item에서 create:iron_sheet를 검색하고 선택합니다. 원재료와 결과 ID는 달라야 합니다.")] + material("factory.result_item","create:iron_sheet")
a += [caption("완성 수량과 배치 횟수", "한 배치의 완성 수량 1, 반복 OFF, Batch size 2로 설정합니다. 총 철판 두 개입니다."), field("factory.result_count",1), button("factory.repeat"), field("create_job.batch",2),
      caption("가공 대기 제한과 작업 간격", "Processing timeout 1200틱, Work interval 20틱입니다. 타임아웃이 나도 기존 재료는 보존됩니다."), field("factory.timeout",1200), field("create_job.interval",20)]
a += save() + [caption("실제 프레스 가공을 가까이서 관찰", "재료를 넣은 뒤 프레스가 눌러 철판을 만듭니다. NPC가 결과를 회수해 최종 통으로 옮깁니다."), pause(300), "lesson:verify", "lesson:view:output", "lesson:open:output", caption("최종 통의 철판 두 개 확인", "원재료 두 개가 두 번의 실제 가공을 거쳐 납품됐습니다. NPC가 결과를 생성한 것이 아닙니다."), pause(65), "lesson:close"]
add("lesson-factory-process", a + finish())

a = start("supply", "lesson-material-order", "Material Ordering · 재고 목표와 주소 입력", "공급망에는 철괴 16개가 있고, 초록 수령 통은 비어 있습니다. 목표 재고를 네 개로 설정합니다.") + schedule("work.create_supply", "자재 주문")
a += [caption("재료가 실제 도착할 수령 통", "Receiving inventory to maintain에는 목표 재고를 검사할 초록 통을 지정합니다.")] + choose("factory.receiving","source")
a += [caption("유지할 아이템과 목표 수량", "Material item에서 철괴를 선택하고 수량 4를 입력합니다. 여기서는 배치 소비량이 아닌 목표 재고입니다.")] + material("factory.material.item","minecraft:iron_ingot") + [field("factory.material.count.0",4)]
a += [caption("연결된 Ticker와 배송 주소", "공급망에 연결된 Stock Ticker를 선택하고 Delivery address에 Workshop A를 입력합니다.")] + choose("create_job.ticker","ticker")
a += [field("factory.address","Workshop A"), field("create_job.interval",20)] + save()
a += [caption("실제 네트워크 주문과 포장", "NPC가 Ticker로 접근합니다. 공급 Packager가 철괴 네 개를 예약·포장하는 과정을 보세요."), pause(210), "lesson:verify", "lesson:view:network", "lesson:open:network", caption("공급 재고 16 → 12", "실제로 철괴 네 개가 빠졌습니다. 접수한 주문은 배송이 늦어도 자동 중복 발송하지 않습니다."), pause(60), "lesson:close", caption("주문과 도착은 별도 단계", "이 강의는 주문 접수까지입니다. 실제 경로로 배송·개봉해 수령 통에 재료가 들어와야 완료됩니다.")]
add("lesson-material-order", a + finish())

a = start("control", "lesson-conditional-control", "조건 제어 · 하한과 상한을 직접 설정", "크랭크와 오른쪽 센서 통은 다른 대상입니다. 철괴 재고가 부족할 때만 돌리도록 만듭니다.") + schedule("work.create_control", "재고 조건 제어")
a += [caption("조작할 장치 지정", "Control device가 Hand crank인지 확인하고 Machine control position에서 크랭크를 고릅니다.")] + choose("factory.actuator_target","device")
a += [caption("센서 종류를 Item quantity로 전환", "Sensor reading의 Redstone strength를 한 번 눌러 Item quantity로 바꿉니다."), button("factory.option.redstone")]
a += [caption("읽을 보관함 지정", "Sensor position에서 오른쪽 IRON STOCK 통을 고릅니다. 조작 장치와 혼동하지 마세요.")] + choose("factory.sensor","sensor")
a += [caption("셀 아이템 선택", "Counted item은 Iron Ingot입니다. 다른 아이템은 이 재고 수량에 포함되지 않습니다.")] + material("factory.sensor_item","minecraft:iron_ingot")
a += [caption("하한 2 / 상한 6 입력", "Activate at the lower threshold는 ON입니다. 먼저 상한 6, 다음 하한 2를 입력해 유효한 범위를 유지합니다."), field("factory.high",6), field("factory.low",2), field("create_job.interval",20)] + save()
a += [caption("빈 재고에서 크랭크 작동", "재고가 0이므로 하한 조건을 만족합니다. NPC가 장치에 접근해 실제 입력을 시작합니다."), pause(110), caption("센서 재고를 6으로 바꿔 정지 재현", "검증 도구가 철괴 여섯 개를 넣습니다. 크랭크가 철괴를 생산한 장면이 아닙니다."), "lesson:fill-sensor", pause(85), "lesson:verify", "lesson:view:sensor", "lesson:open:sensor", caption("상한 도달과 이전 상태 유지", "6 이상이면 입력을 멈춥니다. 이후 3이나 4로 줄어도 하한 2에 닿기 전에는 정지 상태를 유지합니다."), pause(65), "lesson:close"]
add("lesson-conditional-control", a + finish())

a = start("inspect", "lesson-inspection-board", "설비 점검 · 순회와 Display Board 보고", "크랭크와 탱크를 순서대로 점검하고, 동력이 연결된 실제 보드의 지정 줄에 보고합니다.")
a += ["lesson:board-camera", caption("Create 쪽 보드 동력을 먼저 준비", "보드 옆 Cogwheel을 맞물려 실제 동력을 전달했습니다. 글자가 멈춰 있으면 동력과 회전축부터 확인하세요."), pause(60)] + schedule("work.create_inspect", "설비 순회 점검")
a += [caption("첫 번째 점검 위치", "Add inspection position을 누르고 크랭크를 선택합니다. 이 순서가 방문 순서입니다.")] + choose("factory.add_inspection","device")
a += [caption("두 번째 점검 위치", "다시 Add inspection position을 눌러 Create 탱크를 선택합니다.")] + choose("factory.add_inspection","tank")
a += [caption("점검 간격 입력", "Work interval 80틱으로 설정합니다. 점검은 상태를 읽으며 설비를 수리하거나 채우지 않습니다."), field("create_job.interval",80)]
a += [caption("실제 Display Board 지정", "Display Board의 찾기로 앞쪽 보드를 선택합니다. 보드는 정상 조립과 동력이 필요합니다.")] + choose("factory.display","board")
a += [caption("시작 줄과 예약 줄 수", "첫 줄 2, 예약 6줄을 입력합니다. 보고는 2~7번 줄에 쓰며 그 밖의 글은 유지합니다."), field("factory.display_line",2), field("factory.display_lines",6)] + save()
a += [caption("두 장치를 실제로 순회", "크랭크의 회전 상태와 탱크의 비율을 읽습니다. 빈 탱크를 채우는 작업이 아닙니다."), pause(200), "lesson:verify", "lesson:board-camera", caption("보드에서 전체 보고 확인", "점검 대상 상태, 주변 작업자와 완료 작업 요약이 보입니다. 예약한 줄이 부족하면 일부만 덮어쓰지 않습니다."), pause(200), "lesson:verify-board"]
add("lesson-inspection-board", a + finish())

path = ROOT / "scripts/guide-capture/create-detailed-lessons.json"
path.write_text(json.dumps(plan,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"Wrote {len(plan)} complete lessons, {sum(len(x['actions']) for x in plan)} native actions")
