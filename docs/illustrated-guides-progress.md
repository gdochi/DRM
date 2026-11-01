# 전체 인게임 설명서 작업

시작: 2026-11-01. 문서·이미지 반영과 사이트 검사를 마쳤다. **한글 186개·영문 186개, 총 372개 문서 모두 실제 인게임 화면을 사용**한다. 검토한 원본 255개를 706곳에 배치했다. 빠져 있던 영문 안내와 룰렛·MWENT 0.1.6 안내를 보완했으며 두 언어의 문서 경로가 일치한다. 이는 모든 모드 기능의 전체 회귀 시험 완료를 뜻하지 않는다. 실제 조작 결과를 확인한 범위와 제작 화면·소스만 확인한 범위는 아래와 각 캡션에 구분했다.

## 한 페이지를 완료하는 기준

1. 독자가 이 페이지에서 끝낼 작업과 먼저 읽어야 할 문서를 정한다.
2. 설명에 필요한 실제 화면을 선택한다. 편집 도구, 선택 창, 플레이어가 보는 결과를 구분한다.
3. 화면의 모드·Minecraft·로더·언어와 원본 출처를 확인한다. 파일 해시는 원본 확인 용도이며 기능 검증을 대신하지 않는다.
4. 버튼 이름과 위치를 현재 소스 및 실제 화면과 대조한다. 기능이 바뀐 과거 화면, 글자가 읽히지 않는 화면, 실패 화면, 시험용 문구가 혼란을 주는 화면은 제외한다.
5. 진입 → 설정 → 저장 → 적용 → 실행 결과 순서로 조작을 검증한다. 화면을 열어 본 것과 전체 절차를 성공한 것은 따로 기록한다.
6. 필요한 위치에 화면을 배치하고, 캡션에 찾아야 할 조작을 짚는다. 설정의 원인과 게임에서 생기는 결과를 설명하며 빠진 단계와 문서 연결을 보완한다.
7. 한·영 문서의 설명·화면·링크를 대조하고, 사이트에서 원본 보기·읽기 크기·좁은 화면의 배치를 확인한다.

단순히 이미지 하나를 붙였다는 이유로 페이지를 완료 처리하지 않는다. 같은 화면을 재사용할 때는 해당 문단에 실제로 필요한 화면인지 확인한다. 과거 버전 기록과 고급 API 문서도 페이지 내용과 맞는 화면 및 결과를 사용한다.

## 순서

| 순서 | 범위 | 설명의 중심 |
| --- | --- | --- |
| 1 | DRM·DNPC 기본 흐름 | NPC 만들기, 대화, 상점, 저장과 적용 |
| 2 | DRM 제작 도구 | GUI·HUD·화폐·퀘스트·텔레포터·Remnant·장면·툴팁 |
| 3 | DNPC 작업과 연동 | 시간표·채굴·농사·조리·운반·고용·템플릿 |
| 4 | BattleWorks | 감지·첫 공격·패턴·히트박스·이동·연출 |
| 5 | Warfare·Expanded | 무기·탄약·AI·포즈·용병·차량·폭격 |
| 6 | Cobblemon | 트레이너·파티·대화·보상·퀘스트·상점·간호·연출 |
| 7 | Spawn Control·Armor·MapIcon | 등장 조건·스포너·방어·지도 표시 |
| 8 | Minigames·MWENT | 테이블·게임 화면·규칙·보상·카드·덱·제작 |
| 9 | 버전 차이·고급·과거 기록 | 실제 지원 범위와 해당 문서에 맞는 화면 |

## 현재 확인한 사실

- 351개 문서 중 작업 시작 시 이미지가 있는 문서는 DNPC 한·영 두 개뿐이었다.
- 로컬 모드 프로젝트에서 이미지 후보 18,570개를 조사했다. 크기 필터·동일 파일 해시를 거친 큰 이미지 후보는 14,638개다. 이 수에는 아직 검토하지 않은 자료가 포함되며 사용 가능한 스크린샷 수가 아니다.
- Windows 제어용 `node_repl`과 브라우저 제어 커넥터가 작업 폴더의 대괄호를 파일시스템 glob으로 처리하는 오류로 초기화에 실패한다. 이 도구들로 실제 게임 조작이나 사이트 육안 검사를 했다고 기록하지 않는다.
- 기존 게임 내부 검증 코드에서 촬영 방법을 확인했다. 별도 촬영용 모드를 만들고 현재 배포 JAR을 읽는 독립 클라이언트에서 새 화면 촬영을 시작했다. 화면 출력 검증과 사용자 조작의 전체 성공은 분리한다.
- 실행 중이던 사용자 게임과 촬영 월드에는 입력하지 않았다. 새 실행은 `build/task/guide-capture/`에 한정한다.

## 중간 진행 기록

- 현재 356개 중 292개 문서에 화면을 배치했으며 문서 안의 화면 배치는 568개다. 검토 후 채택한 원본은 255개다. 이는 전체 작업 완료 수가 아니다.
- 실제 배포 JAR로 별도 월드에서 촬영한다. 원본·모드 해시·화면 진입과 조작 기록은 `approved-captures.json`과 실행별 `screens.json`에 남긴다.
- DRM 대화는 Save As 파일 생성, 저장 파일의 NPC Apply, 빈손 대화 열기, 선택지 이동과 닫기를 확인했다. 상점은 NeoForge와 Forge 모두 Save As → NPC 적용 → 빈손 상호작용 → Bread 체크 → Buy Selected로 빵 3개 지급·에메랄드 10→6·재고 12→11을 실제 확인했다. 적용 버튼은 NeoForge의 Apply NPC Shop과 Forge의 Apply Shop으로 달라 문서를 나눴다. 매입·재입고 한 주기 완료는 남아 있다.
- DNPC가 작업 중 0.1.3으로 갱신되어 신규 촬영은 0.1.3을 사용한다. 기존 0.1.2 화면은 버전을 명시해 보존하고, UI가 달라졌는지 별도로 대조한다.
- Armor는 실제 서버의 같은 10 피해 입력으로 무방어 10, 무인챈트 철 방어구 전체 착용 6의 체력 감소를 확인했다. 이 결과를 모든 무기·서버 설정의 보편 수치로 설명하지 않는다.
- Cobblemon은 파티·능력치·기술·라운드·시작 조건·보상·사운드·상점·간호순·스타터·연출·스케줄러 화면을 확인했다. 스타터는 Save As → NPC Apply → 빈손 상호작용 → Choose This Pokemon으로 서버 파티에 레벨 5 이상해씨 한 마리가 들어온 것까지 확인했다. 1회 제한 조건·치료기 연결·실제 치료·배틀은 후속 검증 대상으로 남아 있다.
- Warfare는 DNPC를 대상으로 실제 설정 요청을 보내 화면을 열고, TACZ M4A1 선택과 NPC 미리보기·발사 설정 이동을 확인했다. `Fire`라는 독립 탭으로 잘못 적힌 경로를 `Senses → Quick View`로 수정했다. 사격·재장전·전투 결과는 별도 검증한다.
- MWENT는 덱 선택 → 덱 편성 → 재추첨 → 실제 battle 단계까지 진입했다. 코인 연출 중 비활성 Continue와 전투 시작을 구분했다. 아직 한 경기의 완료를 검증한 것은 아니다.
- HUD의 현재 등록 진입은 HUD Maker에서 GuiMakerScreen을 직접 연다. 옛 HudMakerScreen의 Screen Editor 단계를 현재 진입으로 설명하지 않도록 수정했다. NeoForge는 Save As·활성 세트 파일 생성 후 클라이언트에 이전 빈 레이아웃이 남는 재현이 있었고, 저장한 파일을 새 실행에서 불러온 실제 HP 20/20 결과를 채택했다. Forge는 실제 Apply가 세트와 활성 파일을 연속 저장하면서 두 번째 요청이 요청 제한에 막힌다. 활성 파일 미생성 증거를 남겼으며, 재접속으로 해결된다고 쓰지 않는다.
- 텔레포터는 목적지 20.5/-60/0.5를 Save As하고 NPC에 적용한 뒤 플레이어의 Travel로 서버 좌표가 일치하는지 확인했다. 목적지 표식은 촬영 월드에만 미리 설치했다. Forge 화면에는 Effects 탭이 있고 NeoForge 화면에는 없어 각 문서를 분리했다.
- Forge와 NeoForge 화폐는 실제 검색 목록에서 minecraft:emerald 한 행만 선택하고 Value / Item 10으로 town_coin에 저장했다. NeoForge의 빈 아이콘 저장 실패를 재현하고 실제 Item Icon 선택을 거쳐 저장했다. 양쪽 HUD의 Apply Currency HUD에서 Town Coin / town_coin을 선택한 화면을 확인했다. 화폐 정의의 옛 HUD 표시 필드는 현재 정규화에서 제거되므로 제작 절차와 참고표를 고쳤다. 실제 습득 잔액 전환은 아직 별도 검증 전이다.
- BattleWorks 제작 보조의 Beginner → Wide Sweep → Measured → Create Pattern을 조작해 24/16/24틱과 27틱 타격 표시를 확인했다. 이어 실제 Save As와 Save로 DNPC에 training/first_sword.json을 연결하고 서바이벌에서 체력 20→12 감소·타겟 UUID를 확인했다. 자연 생성 몹과 자연 회복을 제외한 별도 재시험 결과를 채택했다. 실제 UI로 저장한 파일을 first_sword.json 실습 자료로 제공한다. 질문 자동 진행·Sweep Reach 라벨을 고쳤으며 모델·애니메이션 경고와 열리지 않은 Simulation은 성공으로 기록하지 않았다.
- Popup Maker는 Forge와 NeoForge에서 village_entry를 실제 Save As하고 /drm popup show @s village_entry로 게임 화면에 출력했다. 지역 감지를 자동 연결한 결과라고 설명하지 않는다.
- MapIcon은 DNPC 전용 화면의 Save 응답, 서버가 보낸 마커의 UUID·좌표·텍스처·지도 스위치와 실제 Xaero 미니맵의 파란 아이콘을 확인했다. World Map·JourneyMap 결과를 이 화면으로 검증했다고 쓰지 않는다.
- Spawn Control은 자연 규칙·설치형 대상 목록과 Conditions·Spawn Settings·Destruction·Effects·Appearance를 따로 촬영했다. Include creative players OFF 때문에 제작자가 작동 인원에 포함되지 않는 점과 Entities per activation·보유 제한·누적 제한의 차이를 화면에 맞춰 보완했다. DNPC의 실제 Save to NPC/Save As로 만든 v3 템플릿을 선택하고, Get Spawner 설치 → Core Apply JSON → 서바이벌에서 새 NPC 생성·철 투구 보존까지 확인했다. Superb Warfare M1A2는 실제 명령 저장 → Entity 목록 선택 → 파일 저장·설치·적용 → 새 UUID 차량 1대 생성·탑승자 0명을 확인했다. 저장 충돌 범위 때문에 Ground는 no_space였고 Air·반경 12 설정에서 생성됐다. 자연 스폰의 예약 생성 한 주기는 아직 남아 있다.
- 자연 스폰은 cow의 Current Target Preset을 meadow_cows로 실제 저장하고 활성 세트가 바뀌지 않는 응답을 확인했다. Check Here는 현재 위치의 거리 0.5와 규칙 24~96 때문에 거리만 FAIL이었다. Spawn One → Confirm Spawn은 PASS와 생성 UUID를 반환했다. 대상 프리셋의 다른 서버 불러오기/충돌 병합은 후속 검증이다.
- 대화 보상은 NeoForge에서 실제 Item give 3 apples → Tag add welcome_received → choice tag not 조건을 UI로 저장하고 NPC 적용 후 지급·태그·재방문 시 선택지 숨김을 확인했다. Item만 있는 선택지는 지급 후 창이 닫히므로 검증 코드의 잘못된 화면 유지 기대를 고쳤다. Forge에서는 Type 메뉴에서 Item을 선택해도 Goto로 남는 현상을 재현했다. 완성 예제를 Forge에서 실제 Load/Apply한 뒤 사과 3개·태그·재방문 숨김까지 확인했다. UI 저장 폴더 전체를 welcome_reward_once.zip으로 제공하며 Forge 조건·액션 안내를 그 경로로 고쳤다.
- 26.3용 별도 촬영 도구로 NeoForge 26.3.0.95·Java 25.0.2·DRM 0.3.1·DNPC 0.1.3의 실제 편집 화면을 확인했다. DNPC Identity·GUI Maker Text·NeoForge Item Editor 원본을 채택했다. 전체 대화/아이템 적용·플레이 성공으로 확대하지 않는다. 이전 네이티브 종료·촬영 도구 API 오류·튜토리얼 겹침·잘못된 선택 상세 화면은 채택하지 않았다.
- DRM Admin은 기본 서버 정책이 OFF여서 F7이 거부되는 것을 확인했다. 실제 Default Configs → Admin → Enable DRM Admin → Apply로 서버 파일 enabled true와 응답을 확인하고 NeoForge에서 플레이어 조회·Tags Add → welcome_received 서버 태그를 확인했다. Forge는 정책 저장은 성공했지만 DrmAdminScreen.renderOwnerWidgets의 Renderable.render 호출에서 실제 클라이언트 종료를 재현했다. 해당 Forge 안내에 제한을 적고 NeoForge 성공 화면과 구분했다.
- 작업 중 11월 1일 14:22에 Minigames 0.1.6 배포 JAR이 새로 추가됐다. 0.1.6으로 카드 획득 General·Merchant trades·Chest rewards·Product pools와 룰렛 Rules·Prize slots를 직접 촬영했다. 별도 프로젝트의 원본 룰렛 월드·참가 화면도 실제 배포 JAR 해시와 검증 기록을 확인하고 채택했다. 출처는 새 촬영과 구분한다. 룰렛 한·영 안내를 신설하고 9개 게임·기계, 시작 후 닫기/Play again/아이템 결제 예외를 보완했다. MWENT 선공 전술과 카드 기록의 0.1.6 갱신을 진행 중이다.
- 기본 안내 12개에서 이전 초안과 새 설명이 중복된 부분을 정리했다. 실제 거래 결과와 그림 절차를 보존했으며 같은 2단계 제목의 중복은 현재 없다. 정리 직전 사본은 `_backups/docs-repetition-cleanup-20261101/`이다.
- 사이트 빌드·356개 문서 링크/이미지 568개 배치 검사를 통과했다. 직전 브라우저 검사에서는 화면을 넣은 284개 페이지의 PC·모바일 이미지 로딩·가로 넘침과 대화 원본 열기를 통과했다. 이후 추가한 룰렛·카드 획득 등 8개 페이지는 다음 검사에 포함한다. 결과는 `build/task/guide-layout/results.json`에 남긴다.

## 최종 반영과 검증 범위

- 전체 372개 문서의 설명·이미지·연결 경로를 점검했다. 초보자가 화면에서 할 일을 먼저 찾도록 작성하고, JSON·API 필드와 파일 구조는 참고 설명으로 구분했다. DNPC CurseForge 링크는 사이트 설정·배포 링크 목록·한영 설치 안내에서 확인했다.
- 한글에만 있던 대화 편집·상품·화폐·GUI·HUD·Remnant 세부 안내 12개를 영문에 추가했다. 과거 릴리스 기록의 ‘현재 버전’ 표기를 고치고 현재 화면을 과거 촬영으로 오해하지 않게 설명했다.
- MWENT 0.1.6의 기본 335종·선택 모드 89종을 실제 배포 JAR에서 추출해 0.1.5 정의와 대조했다. 골렘 봉인핵은 같은 소켓의 전력 4 골렘으로 바뀌고 선공 전술이 소비된 것까지 확인했다.
- Remnant Setter의 실제 설치·문구 저장·서버 메시지 파일 생성·마커 읽기를 확인했다. GUI Maker는 서버 자산 폴더의 PNG를 검색·선택·Apply하고 내 GUI 파일에 저장했다.
- BattleWorks의 기존 두 번째 페이즈를 50%로 저장하고 DNPC 체력 100→49에서 실제 런타임 페이즈 1→2를 확인했다. UI에서 저장한 최소 예제를 다운로드로 제공한다. 네이티브 체력 라벨의 Format error 표시는 캡션에 밝혔으며 모드 코드는 수정하지 않았다.
- 기존 1.20.1 CustomNPCs 스크립트 API는 실제 공급자 객체를 호출해 스위치 조회, 중복 후보를 넣은 소 한 마리의 피해 20→14, 좀비 외형, 저장 데이터 조건 PASS, 신속 II 조회, 화염구 피해 100→90, 저장한 팝업 표시를 확인했다. CustomNPCs 스크립트 엔진의 특정 이벤트 전체를 실행한 결과로 확대하지 않는다.
- Cobblemon Trainer의 Save As → NPC Apply의 Apply vs Trainer → DNPC Clone Library 저장을 확인했다. 실제 클론 파일의 역할·dochi_npc:npc·follow_source를 대조했다. Core 스포너에 이 클론을 연결한 생성 결과까지 확인한 것은 아니다.
- PokéMart는 실제 판매로 레벨 5 이상해씨 지급·에메랄드 64→60·재고 3→2를, 실제 교환으로 꼬렛 제거·이상해씨 지급·재고 1→0을 확인했다. 경매는 에메랄드 2개 수수료 차감·꼬렛 보관·활성 매물 생성·입찰 없는 만료·Claim All 반환을 확인했다. 다른 플레이어의 입찰·낙찰·환불·세금 정산은 미검증이다.
- 전체 페이지가 빌드·링크·이미지 검사와 Chrome의 1440px / 390px 이미지 로딩·가로 넘침 검사를 통과했다. 대화 페이지에서는 원본 PNG 열기도 확인했다. 결과는 `browser-layout-check.json`에 보존했다.
- 마지막 대조 중 Minigames 0.1.6 JAR이 촬영 이후 교체된 것을 확인했다. 교체본에서도 기본 335종·선택 모드 89종은 동일했다. 기본 룰렛이 Spin on block인 실제 새 화면을 촬영하고 GUI 파일 없이 시작하는 동작·참가비 안내를 보완했다. 최종 수정 12개 페이지는 PC·모바일로 다시 검사했고 나머지 360개는 전체 검사본과 문서 내용이 같음을 확인했다. `minigames-final016-artifact-check.json`과 `browser-final-followup-check.json`에 기록했다.
- 실제 모드 소스와 배포 JAR은 문서 작성의 읽기 자료였다. Forge DW/DWE 보호 대상 1,100개 파일은 전후 해시가 같다. 문서 전용 촬영 코드는 DOCS 저장소에만 있으며 모드에 포함하지 않았다. 모드 자체 변경이 없으므로 릴리스 체인지로그는 추가 수정하지 않았다.

확인한 Forge 0.3.1의 Admin 조회 종료·대화 액션 타입 선택 문제·HUD 활성화 저장 제한은 해당 문서에 남겼다. 실제 치료·모든 스케줄 작업·총기 사격과 재장전·MWENT 한 경기 완료·다중 사용자 경합 등 시험하지 않은 결과를 성공으로 쓰지 않았다. 이 작업은 문서 작성이며 모드 결함 수정을 수행하지 않았다.

## 임시 자료 정리

환경·화면 조작·결과 JSON을 `evidence/illustrated-guides-20261101/runs/`에 보존한 뒤 촬영용 런타임·클래스 폴더 292개와 미사용 원본 이미지 45개를 정리했다. 실제 페이지에서 사용하는 255개 PNG의 해시는 승인 원본과 일치한다. 기존 사용자 이미지와 복구 백업은 보존했다.

자동 승인 검토는 촬영 폴더 150개와 일회성 스크립트를 추가로 일괄 삭제하는 작업을 범위가 넓다는 이유로 거부했다. 이 삭제를 재시도하거나 우회하지 않았으며 남은 중간 자료는 보존했다. 세 개의 초기화 실패 폴더에는 촬영용 모드 복사본·옵션과 빈 출력 폴더가 남아 있다. 결정은 `final-task-cleanup-review.json`에 기록했다.

이후 추가한 Minigames 최종 확인용 촬영 인스턴스 한 개도 보존했다. 문서에서 교체한 이전 룰렛 화면 한 장은 미참조 자료로 남아 있으며, 현재 사용하는 원본 수는 255개다.

## 기록과 복구

- 문서별 제목·소분류·화면 배치 현황: `evidence/illustrated-guides-20261101/document-coverage.json`.
- 조사 집계: `evidence/illustrated-guides-20261101/inventory-summary.json`.
- 새 촬영의 환경·JAR 해시·화면 조작 결과: `evidence/illustrated-guides-20261101/runs/<실행 이름>/`. 실제 사용하는 원본 PNG는 `src/media/guides/`, 승인 목록은 `approved-captures.json`에 있다.
- 전체 작업 시작 백업: `_backups/docs-refresh-illustrated-20261101-092451/`. 앞선 DNPC 이미지 작업을 포함한 시작 시점의 content·src·scripts·site.config.json을 보존한다.

재현 도구는 `scripts/audit-guide-media.py`, 각 로더의 `scripts/run-*-guide-capture.py`와 `scripts/run-guide-capture.py`, 촬영용 소스는 `scripts/guide-capture/`에 있다. 촬영용 모드는 문서 저장소의 독립 실행에만 사용하며 배포 모드 JAR에 넣지 않는다.
