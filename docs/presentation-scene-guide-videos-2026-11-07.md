# 배틀 프레젠테이션·씬 메이커 사용법 영상

두 편집기가 생소한 제작자를 위해 실제 사용법 영상 7편과 단계별 안내를 추가했다. 한국어·영어·포르투갈어·스페인어·프랑스어의 네 문서, 총 20개 문서에 35곳을 배치했다. 배포 자산은 `src/media/guides/tutorial-videos-20261107/`의 MP4·WebM·첫 프레임 PNG다. 총 길이는 192.73초다.

| 영상 | 길이 | 실제로 보여 주는 과정 |
| --- | ---: | --- |
| battle-label-layout | 24.35초 | Add Label, Content 문구·글자 크기, Layout 위치·상자·Layer, 입력 반영과 스크럽 |
| battle-animation-timing | 29.04초 | 활성 구간, Fade In/Out, 화면 밖 출발·최종 위치, Restart와 구간 전·중간 비교 |
| battle-actors-audio | 24.30초 | Opponent 크기·회전, Intro 사운드 ID·시작 틱, 사용자 연출 Save As |
| battle-region-particles | 31.89초 | 두 모서리 입력, 월드 블록 캡처, 기본 입자 레이어 추가·재생, 사용자 파일 저장 |
| scene-settings-subtitle | 21.56초 | 씬 설정, 1~5초 자막, 별도 텍스트 창의 Apply Fields, 중간 시점 확인 |
| scene-world-camera-path | 32.05초 | 카메라 카드 선택, World positions, 휠 속도, 실제 WASD 입력, P/N, Apply와 미리보기 |
| scene-effects-save-run | 29.54초 | Letterbox 활성 구간, Save As, Run Saved 서버 재생, 종료 후 월드 복귀 |

## 문서와 촬영 범위

- 수정 문서: 각 언어의 `53-cobblemon-battle-presentation.md`, `60-battle-presentation-layers-runtime.md`, `67-cobblemon-presentation-region-fx.md`, `122-fabric-scene-maker.md`.
- 촬영 환경: DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. 배틀 연출에는 Cobblemon Editor 0.2.9 / Cobblemon 1.8.4 / Kotlin for Forge 5.12.0을 추가했다. 실제 JAR 경로와 SHA-256은 실행별 `environment.json`에 있다.
- 실제 배포 모드와 네이티브 편집 화면을 사용했다. 촬영 도구가 실제 클릭·문자 입력·키 입력을 수행하며 수동 플레이 영상으로 표현하지 않는다. 영어 안내 자막과 클릭 십자 표시는 문서용 촬영 도구의 주석이다. 게임 화면을 모사한 합성 UI나 생성 이미지를 쓰지 않았다.
- 영상은 무음이다. Intro 사운드 설정의 저장은 확인했으며 음향 재생을 녹음한 자료가 아니다. 본문에서 직접 Play/Stop으로 미리 듣도록 안내한다.
- Region 구조물과 Scene Maker의 문·가로등은 독립 촬영 월드에 미리 준비했다. 이 구조물을 처음부터 건축하는 영상은 아니다. Region은 기본 입자 Emit 한 항목을 보여 주며 Motion·Path·Cues 상세 편집은 문서에서 범위를 구분했다.
- 배틀 영상은 편집과 파일 저장을 확인한다. 새 사용자 파일의 NPC 연결·실제 전투 실행을 이 영상에서 완료했다고 표현하지 않는다. 본문에 트레이너 파일 저장·연결 절차와 기존 실제 배틀 시작 영상 링크를 추가했다.
- 씬 영상은 단독 테스트 월드의 저장 파일 서버 재생을 확인했다. 다른 로더·Minecraft 버전·멀티플레이어 전체의 검증으로 확대하지 않는다.

## 확인한 편집 결과

- Label: RIVAL CHALLENGE, Font Size 30, Final X/Y 320/70, Width/Height 360/70, Layer 60. Start/End 20/120, Fade In/Out 12/12, Start X/Y −300/70, Final X/Y 320/70.
- Opponent Scale 60 / Yaw −25, 활성화된 Intro `minecraft:ui.toast.challenge_complete` / Start Tick 20을 실제 저장 JSON에서 확인했다.
- Region은 31블록·두 블록 상태를 저장했다. 입자 레이어 하나의 `minecraft:end_rod`도 저장됐다. Region의 packed `blocks` 문자열은 세미콜론으로 구분한 셀 수로 검증한다.
- Scene은 200틱/10초, 자막 20~100틱, Letterbox 0~200틱, 카메라 위치 네 개를 저장했다. 실제 ScenePlaybackScreen 진입과 종료 후 월드 복귀를 기록했다.
- 0틱의 기본 페이드가 편집 중 결과를 가리지 않도록 첫 영상을 중간 시점에서 시작한다. 배틀 필드 입력 후 탭 전환으로 반영하는 순서를 보여 준다. 씬을 줄일 때 기존 카드의 종료 시각도 새 길이 안으로 맞춰야 한다는 안내를 추가했다.

## 재현과 보존

- 계획: `scripts/guide-capture/presentation-tutorial.json`, `scripts/guide-capture/scene-tutorial.json`.
- 채택 실행: 배틀 기본 세 영상 `presentation-tutorial-05`, Region `presentation-tutorial-01`의 `battle-stage-tutorial`, 씬 세 영상 `scene-tutorial-03`.
- Region 채택 실행의 별도 Label 시도는 실패했으며 게시하지 않았다. 그 실행 전체를 성공으로 표시하지 않고 채택한 Region 구간만 사용했다.
- `GuideTutorials.java`는 튜토리얼 표시와 네이티브 입력, 씬 재생 관찰을 담당한다. `GuideCapture.java`는 이 도구가 있을 때만 선택적으로 연결하며 기존 Forge/26.3 촬영에는 새 컴파일 의존성을 추가하지 않는다.
- `scripts/review-guide-video.py`는 원본 프레임별 시간·해시, 대표 프레임 12개와 접촉 시트를 보존한다. 원본 해상도와 실제 시간 기록을 유지하고 20fps / BT.709로 인코딩했다. 보간 프레임은 만들지 않았다.
- 증거: `docs/evidence/presentation-scene-videos-20261107/`. 저장한 예제 JSON, 환경·프레임 해시, 대표 화면, 실행 기록, 인코딩 영수증, `workflow-checks.json`, 브라우저 결과를 보존한다.
- 수정 전 백업: `_backups/presentation-scene-videos-20261107-191500/`.
- 원본 프레임 간격 중앙값은 약 50ms, 95백분위는 약 52~57ms, 최대는 약 114ms다. 촬영 도구의 프레임 유실 검사는 통과했다.

## 검증

- `npm.cmd run build`: 885개 문서 빌드.
- `npm.cmd run verify`: 문서 885개, 이미지 1,667개, 전체 영상 배치 120곳과 경로·배포 자산 검사 통과.
- `npm.cmd run verify:translations`: 번역 531개의 코드·링크·영상·구조 일치 확인.
- `npm.cmd run verify:videos`: 변경한 네 경로에서 5개 언어 × 7개 영상 × 데스크톱/모바일, 총 70개 화면과 고유 영상 7개 검사 통과. 실제 탐색·일시정지·반복 경계·MP4 대체·바이트 구간 요청·동작 줄이기 설정을 확인했다.
- 한국어 네 문서의 1440px·390px 전체 화면 배치 8개와 대표 프레임·접촉 시트를 직접 확인했다.
- MP4·WebM 모두 전체 프레임 디코딩, SHA-256과 빌드 후 바이트 일치를 확인했다.
- 최종 촬영 도구 Java 21 컴파일 및 `git diff --check` 통과. 기존 무검사 리플렉션 관련 컴파일 경고는 남아 있다.
- 최종 증거를 보존한 뒤 이번 작업의 테스트 실행·원본 프레임·임시 컴파일 결과·FFmpeg 설치본 등 임시 폴더 11개를 삭제했다. 실제 정리 결과는 `cleanup.json`에 기록했다.

문서·촬영 도구만 변경했으므로 모드 릴리스 체인지로그는 수정하지 않았다. 커밋·푸시는 수행하지 않았다.

로컬 미리보기: `http://localhost:4196/?lang=ko#drm-cobblemon-editor/cobblemon-battle-presentation`, `http://localhost:4196/?lang=ko#core-fabric/scene-maker`.
