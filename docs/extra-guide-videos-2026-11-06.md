# 추가 설명 영상 — 퀘스트 제외

GUI Maker, NPC 상점, Spawn Control, MWENT와 Warfare 사격·재장전의 실제 게임 영상 5개를 추가했다. 퀘스트 문서는 변경하지 않았다. 게시 자산은 `src/media/guides/extra-videos-20261106/`이며 각 영상에 무음 WebM·MP4와 첫 프레임 PNG가 있다. 기존 자동 반복·재생 조작·동작 줄이기 정책을 그대로 사용한다. 한국어·영어·포르투갈어·스페인어·프랑스어, 6개 문서의 총 30곳에 배치했다. 커밋·푸시는 수행하지 않았다.

문서 변경은 각 언어의 `29-gui-maker-screen.md`, `07-shop-system.md`, `107-fabric-shop-system.md`, `82a-spawn-control-spawner.md`, `151-mwent-how-to-play.md`, `35-tacz-reload-ammo.md`다. 촬영 도구 `GuideCapture.java`·`GuideScenes.java`, 장면 계획, 영상 환경 목록 `src/guide-environments.json`, 검증 결과 저장 위치를 선택하는 `scripts/verify-guide-videos.mjs`도 갱신했다.

## 채택한 장면

| 영상 | 길이 | 실제로 확인한 동작 |
| --- | --- | --- |
| gui-drag-resize | 7.79초 | Text를 네이티브 마우스 입력으로 이동·크기 조절하고 편집기의 Preview로 전환 |
| shop-purchase | 7.95초 | 빵 3개 지급, 에메랄드 10→6, 구매 가능 재고 12→11 |
| spawn-cap-respawn | 10.01초 | 정상 전진 입력으로 범위 진입, 보유 개체 1 제한 유지, 처치 후 누적 2·보유 1 확인 |
| mwent-golem | 7.10초 | 실제 선공 개막 전술 사용, 같은 칸의 전투력 4 골렘으로 변환, 전술 소모 |
| warfare-fire-reload | 9.41초 | TACZ M4A1 실사격 6회, 고정 3발 재장전 2회, 재장전 후 재사격과 표적 피해 |

모두 NeoForge 1.21.1에서 촬영했다. DRM 0.3.1 / DNPC 0.1.3을 기본으로 하고 Spawn Control 0.1.5, Minigames 0.1.6, Warfare 0.3.2 / TACZ 1.1.8 / PlayerAnimator 2.0.4를 필요한 장면에만 로드했다. 실제 JAR 출처·해시는 장면별 `environment.json`에 있다. Forge 문서에 공유한 영상에도 캡션으로 실제 NeoForge 촬영 환경을 표시했다.

영상에는 실제 게임 화면만 사용했다. 촬영 도구가 네이티브 UI와 테스트 월드의 서버 요청을 조작했으며, 수동 플레이나 모든 설정을 처음부터 UI로 작성한 과정으로 표현하지 않는다. GUI 미리보기는 편집 초안이다. 스포너와 전투 설정은 촬영 전에 준비했다. 스포너의 첫 돼지는 테스트 도구가 실제 서버 피해를 가해 처치했다. MWENT는 실제 동전 던지기로 선공 전술을 받은 판을 채택했다. 일반 손패 한 장을 사용하는 동작과 구분했다.

## Warfare 엄폐 확인 한계

엄폐 지점에 도착해 대기하는 단계까지 확인되지 않아 해당 장면은 게시하지 않았다. DNPC에서 탐색 후 복귀하거나 이동이 제한된 시도, 구형 CustomNPCs 1.21.1에서 경로 도달 불가가 나온 시도, 이동 설정 변경 후 근접전으로 전환된 시도를 제외했다. 최종 Warfare 영상은 DNPC를 사용한 사격·재장전 전용 촬영이며 엄폐 성공 자료가 아니다. 이 작업에서는 모드 구현을 변경하지 않았다.

## 재현과 검증

- GUI/상점: `extra-ui-videos.json`; 채택한 GUI 미리보기는 `warfare-video-neo1211-en-02`, 상점은 `extra-ui-videos-neo1211-en-01` 실행이다. GUI 실행의 실패한 Warfare 장면은 제외했다.
- 스포너: `spawn-video.json`, `spawn-video-neo1211-en-02`. 첫 개체·처치 효과를 촬영 전에 로드해 초기 끊김을 제거했다.
- MWENT: `mwent-video.json`, `mwent-video-neo1211-en-02`. 촬영 도구가 현재 화면의 `scale` 배율을 처리하도록 보정했다.
- Warfare: `warfare-final-video.json`의 `warfare-fire-reload-video`, `warfare-video-neo1211-en-07`. 별도 연습 월드, 고정 3발 재장전과 500 체력의 비공격 표적을 사용했다.
- `scripts/encode-guide-video.py`는 실제 타임스탬프를 보존해 20fps로 인코딩했다. 보간 프레임을 만들지 않았으며 MP4/WebM의 전체 프레임 디코딩을 확인했다.
- 원본 프레임 간격의 중앙값은 약 50ms, 95백분위는 약 52~61ms, 최대는 약 135ms다. 소스 시간 기록·해시와 대표 프레임을 증거 폴더에 보존했다.
- `npm.cmd run build`: 문서 885개 빌드.
- `npm.cmd run verify`: 문서 885개, 이미지 1,667개, 영상 배치 70곳과 배포 자산·환경·경로 검증.
- `npm.cmd run verify:translations`: 번역 문서 531개에서 영상·이미지·링크·구조 일치 확인.
- `npm.cmd run verify:videos`: 140개 모바일/데스크톱 화면과 고유 영상 11개에서 실제 재생·탐색·일시정지·반복 경계·MP4 호환·동작 줄이기 검증.
- 최종 `GuideCapture.java`와 `GuideScenes.java`를 Java 21로 컴파일했다.

검증 자료는 `docs/evidence/extra-guide-videos-20261106/`, 수정 전 백업은 `_backups/extra-guide-videos-20261106-212711/`에 있다. 최종 자료를 보존한 뒤 새 테스트 월드·중간 프레임·컴파일 산출물·임시 FFmpeg 설치본을 모두 정리했다. 문서·촬영 도구만 변경했으므로 모드 릴리스 체인지로그는 수정하지 않았다.
