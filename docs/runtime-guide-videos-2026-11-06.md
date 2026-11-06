# 추가 실행 영상 — NPC 운반·차량 AI·트레이너 배틀

실제 게임 영상 세 개를 추가했다. 한국어·영어·포르투갈어·스페인어·프랑스어의 `151-npc-core-editor.md`, `41-warfare-vehicle-ai.md`, `52-cobblemon-trainer-editor.md`, 총 15곳에 배치했다. 퀘스트 문서는 변경하지 않았고 커밋·푸시는 하지 않았다.

| 영상 | 원본 길이 | 실제 확인한 결과 |
| --- | --- | --- |
| npc-haul | 10.41초 | 입력 상자 밀 32→0, NPC가 화물을 운반, 출력 상자 0→32, NPC 잔여 화물 0 |
| vehicle-ai-crew-drive | 18.42초 | DNPC 두 명이 0·1번 좌석에 탑승, 네이티브 AI가 약 10.4블록 주행, 기관총·주포 발사와 표적 피해 |
| trainer-battle-start | 16.11초 | NPC 상호작용, 실제 대화 선택지 클릭, 등장 연출, Cobblemon 배틀 화면과 서버 BattleRegistry 등록 |

게시 자산은 `src/media/guides/runtime-videos-20261106/`의 무음 MP4·WebM과 첫 프레임 PNG다. 원본 타임스탬프를 유지해 1280×720, 20fps, BT.709로 인코딩하며 보간 프레임·합성 UI를 만들지 않는다. 문서에는 자동 반복, 재생 조작과 동작 줄이기 정책을 적용한다.

## 촬영 환경과 범위

모두 NeoForge 1.21.1의 독립된 새 테스트 월드에서 촬영했다. 기본 DRM 0.3.1 / DNPC 0.1.3, 차량은 DW·DWE 0.3.2와 SuperbWarfare 0.8.9.1, 트레이너는 Cobblemon Editor 0.2.9와 Cobblemon 1.8.4를 사용했다. 장면별 `environment.json`에 실제 JAR 경로와 SHA-256이 있다. 이 환경 기록은 다른 로더·버전의 호환성 보증이 아니다.

세 장면은 미리 준비한 설정이 실행되는 예제다. 편집기에서 처음부터 모든 값을 입력하는 수동 플레이 영상으로 표현하지 않는다.

- 운반: 실제 DNPC 일정·운반 루틴이 상자와 NPC 인벤토리를 변경한다. 작업 기준점은 입력 상자 내부가 아니라 옆의 걸을 수 있는 위치다. `NpcDayCycle`, `NpcWorkRoutine`, `NpcTransferSettings`와 `NpcJobSettings`의 현재 NeoForge 소스를 확인했다.
- 차량: 생산 코드의 좌석 지정과 같은 네이티브 `startRiding` 절차로 준비한 NPC를 탑승시킨다. `SuperbWarfareVehicleBridge.moveTo`와 `setMode`를 호출하고 실제 차량 물리가 이동한다. 이동 중 좌표·속도를 강제로 바꾸지 않는다. 이 영상은 Crew 편집기의 클론 선택·권한 검사 전체를 검증한 자료가 아니다. `SuperbVehicleCrewService`, `SuperbVehicleCrewPolicy`, `SuperbVehicleAiState`의 현재 소스를 확인했다.
- 트레이너: 테스트 대화를 저장하고 현재 라운드의 `BeforeBattleSet`에 연결한다. 실제 `DialogueRuntimeScreen`의 **Let's battle!** 선택지가 `cobble_npc:go_battle`을 실행한다. 준비한 플레이어 포켓몬으로 실제 Cobblemon 배틀에 진입한다. 현재 `CobbleTrainerData`와 대화 액션 구현을 확인했다.

## 재현과 보존 자료

- 운반: `scripts/guide-capture/npc-haul-video.json`, 채택 실행 `haul-video-neo1211-en-03`.
- 차량: `scripts/guide-capture/vehicle-ai-video.json`, 채택 실행 `vehicle-video-neo1211-en-04`. 전차와 사격 대상이 함께 보이는 최종 구도를 채택했다.
- 트레이너: `scripts/guide-capture/trainer-battle-video.json`, 채택 실행 `trainer-video-neo1211-en-01`.
- `GuideCapture.java`는 트레이너 장면에서만 비동기 네이티브 화면 전환을 허용한다. 실패·중단 시 추적 상태를 정리한다.
- `scripts/verify-guide-videos.mjs`는 문서의 첫 영상뿐 아니라 모든 영상을 검사한다.
- `scripts/preview-server.mjs`는 영상의 바이트 구간 요청에 206 응답과 Content-Range를 제공한다. 기존 미리보기에서는 영상 전체가 로드돼도 탐색 가능 구간이 0이어서 탐색 막대가 처음으로 돌아왔다. 이제 전체 길이·HEAD·접미 구간·열린 끝 구간·범위 초과 416 응답을 검사하며 실제 탐색 시점과 반복 직전 시점까지 검증한다. 모바일 화면 너비는 영상 해상도와 분리해 기록한다.
- `docs/evidence/runtime-guide-videos-20261106/`에 환경, 서버 상태, 시간 기록·원본 프레임 해시, 대표 프레임, 접촉 시트와 인코딩 영수증을 보존한다. 원본 프레임 간격의 중앙값은 약 50ms, 95백분위는 약 53~61ms, 최대는 약 239ms다.
- 수정 전 백업은 `_backups/runtime-guide-videos-20261106-224629/`다. 기존 다른 촬영 실행과 사용자 월드·모드·설정은 이 작업의 정리 대상이 아니다.

## 검증

- `npm.cmd run build`: 문서 885개 빌드 완료.
- `npm.cmd run verify`: 문서 885개, 모드 카드 12개, 문서 이미지 1,667개, 영상 배치 85곳의 경로·배포 자산·촬영 환경 검증 통과.
- `npm.cmd run verify:translations`: 번역 531개의 경로·코드·링크·이미지·영상·구조 일치 확인.
- `npm.cmd run verify:videos`: 1440px·390px의 170개 화면, 고유 영상 14개 검증 통과. 자동 재생·음소거·실제 탐색·일시정지·반복 경계·MP4 대체·구간 요청·동작 줄이기 정책을 확인했다. 새 영상만 30개 화면에 해당한다.
- 한국어 새 영상 세 개의 데스크톱·모바일 본문과 캡션을 실제 중간 프레임으로 확인했다. `layout/`에 스크린샷 6개가 있다.
- 최종 촬영 도구의 Java 21 컴파일 성공. 무검사 리플렉션 관련 경고는 있으며 컴파일 오류는 없다. 영상 두 형식 모두 전체 프레임 디코딩과 빌드 후 바이트 동일성을 확인했다.
- `git diff --check` 통과. 기존 CRLF 설정에 따른 줄바꿈 알림만 있다.
- `cleanup.json`: 이번 작업의 테스트 실행 8개와 임시 FFmpeg 설치본 삭제 완료. 최종 영상·대표 화면·서버 상태·실제 트레이너 대화 JSON·시간과 해시·검증 결과·복구 백업은 보존했다.

로컬 미리보기: `http://localhost:4190/?lang=ko#dochi-npc-core/npc-core-editor`. 차량은 `#dochi-warfare/warfare-vehicle-ai`, 트레이너는 `#drm-cobblemon-editor/cobblemon-trainer-editor`에서 볼 수 있다. 문서와 촬영·미리보기 도구만 변경했으므로 모드 릴리스 체인지로그는 수정하지 않았다. 사용자 지시에 따라 커밋·푸시는 수행하지 않았다.
