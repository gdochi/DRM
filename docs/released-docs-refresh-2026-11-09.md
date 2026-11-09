# 공개 릴리스와 코블몬 사용법 보강

DWE를 제외한 10개 CurseForge 프로젝트의 실제 공개 목록을 다시 읽었다. 2026-11-05 확인 목록 이후 누락된 공개 파일 30개를 추가했다. 새 릴리스 파일 28개와 기존 버전의 누락 환경 2개다. DWE 파일 목록·본문·사용법은 변경하지 않았다.

| 모드 | 새로 확인한 파일 |
| --- | --- |
| DRM | Forge 0.3.1 1개 |
| DRM Fabric 프로젝트 | Fabric 0.3.1 / 1.21.1·26.3 2개 |
| DNPC | 0.1.3의 5개 환경 |
| Cobblemon Editor | 0.2.9 / Fabric·NeoForge 1.21.1 2개 |
| Warfare | 0.3.2의 3개 환경과 기존 0.2.5 NeoForge 1개 |
| Real Armor | 0.1.5·0.1.6의 10개 환경과 기존 0.1.2 NeoForge 1개 |
| MapIcon | 0.1.3의 5개 환경 |
| BattleWorks·Spawn Control·Minigames | 새로 누락된 파일 없음 |

CFWidget은 후보 검색에만 사용했다. 모든 추가 파일의 ID·이름·공개 상태 4·로더·Minecraft와 공식 변경 내역을 CurseForge API에서 대조했다. 원본 메타데이터와 변경 내역은 `evidence/published-release-refresh-20261109/applied.json`에 있다.

## 변경 기록의 본문 보존

최신 CurseForge 변경 내역은 대부분 위키를 가리키는 View Change Log 링크뿐이었다. 파일별 공식 HTML은 그대로 남기고, 이미 게시한 작성자 본문을 버전 JSON의 `authorNotes`로 보존했다. 화면에는 실제 파일의 다운로드·업로드 날짜와 해당 환경의 작성자 본문을 함께 표시한다. 아직 공개 파일이 없는 DRM NeoForge 0.3.1 환경은 기존 작성자 기록으로 남기고 다운로드를 만들지 않는다. 같은 버전의 실제 내용이 있는 공식 기록을 다른 글로 대체하지 않는다.

`refresh-published-releases.mjs --apply`는 DWE를 제외하고 새 파일을 검증·백업·반영한다. `sync-changelogs.mjs`도 연결된 작성자 본문을 보존한다. 기록의 환경 분리는 기존 범위를 따른다.

## 보강한 안내

- 한국어·영어·포르투갈어·스페인어·프랑스어에 배지·트로피, 배지 연출·배지함 GUI, RCT → DNPC 변환 안내 3종씩 총 15개를 추가했다.
- 코블몬 개요에 새 기능과 영상 진입점을 두고, 설치 안내에 실제 배틀 시작 영상을 추가했다. 파티 안내에는 Alpha 설정 영상을 추가했다. 기존 안내 15개가 보강됐다.
- 배지 정의·보유 기록·월드 스위치를 구분하고, 기본 OFF, Save Set As Copy의 ID 변경, 운영자 지급·회수, 승리 보상·조건·퀘스트, 연출 저장 후 카탈로그 저장을 설명했다.
- RCT AI 유지와 DRM AI 변환, 새 NPC 생성·반경 64블록 내 교체·프로필 저장과 원본 백업 위치를 소스에서 확인했다. 이번 환경에는 RCT가 없어 변환 완료 영상은 만들지 않았다.
- Real Armor의 5개 안내 × 5개 언어를 0.1.6 기준으로 정리했다. 기존 이미지·영상의 실제 촬영 버전과 0.1.5에서 소개한 기능은 보존하고, 명시적 Apply와 저장 처리 개선을 안내했다.

## 새 영상과 검증 범위

| 영상 | 길이 | 확인한 실제 결과 |
| --- | ---: | --- |
| badge-create | 16.05초 | 샘플 세트 사본의 이름을 Meadow League로, 첫 배지를 Meadow Badge로 바꾸고 서버 카탈로그 저장 |
| badge-presentation | 29.24초 | 획득 연출 Copy and Edit, Meadow Shine 이름, Restart, 연출 Save, 돌아와 카탈로그 Save·acquire ID 연결 |
| pokemon-alpha | 16.89초 | Basic의 Alpha 활성화, 붉은 눈 미리보기, custom/alpha_trainer.json의 파티 aspects alpha 저장 |

총 62.18초, `src/media/guides/cobble-release-20261109/`의 MP4·WebM·첫 프레임 PNG로 게시한다. 원본 프레임 시각과 실제 색상을 유지한 1920×1080, 20fps, BT.709 무음 영상이다. 신규 영상 20곳과 기존 실제 배틀 영상 5곳을 추가했다. 자동 재생·반복·재생 조작과 동작 줄이기는 기존 동작을 사용한다.

실제 환경은 Cobblemon Editor 0.2.9 / DRM 0.3.1 / DNPC 0.1.3 / Cobblemon 1.8.4 / NeoForge 1.21.1이다. NeoForge 0.3.1 DRM은 공용 jar 폴더에서 이동되어 로더의 build/libs 배포 JAR을 명시했다. `--core-mod`로 해당 경로와 해시를 남긴다. DNPC와 코블몬 에디터 JAR의 파일 크기는 이번 공개 파일 메타데이터와 일치하며, 환경 기록에는 로컬 SHA-256을 별도로 보존한다. 원격 파일과 바이트 동일성을 검증했다고 확대하지 않는다.

운영자 명령의 실제 배지 지급과 소유 UUID는 확인했지만 배지함 세트 선택의 촬영 도구가 실패해 그 영상은 게시하지 않았다. 배지 편집·연출 저장 장면과 실제 승리 보상 획득을 구분한다. Alpha 영상은 설정·모델·저장까지이며 NPC Apply나 실제 전투 완료 영상이 아니다. 첫 시도에서 Alpha 버튼을 개발 소스의 Appearance 위치로 찾았으나 실제 배포 JAR은 Basic에 있어 수정했다. 실패한 시도는 완료된 기능으로 표현하지 않았다.

게임은 한 번에 한 인스턴스만 실행했고 모든 촬영 클라이언트를 종료했다. 첫 준비 실패는 게임을 시작하지 않았으며, 이후 두 실행에서 성공한 세 장면만 채택했다. 추가 게임 실행 없이 마지막 촬영 도구의 Java 컴파일과 Python 구문을 확인했다.

## 문서·브라우저 확인

- build: 문서 935개.
- verify: 모드 카드 12개·이미지 1,667개·전체 영상 배치 265곳의 경로와 배포 자산 검사 통과.
- verify:translations: 번역 561개 코드·링크·미디어·문서 구조 일치.
- verify:videos: 변경한 코블몬 5개 경로의 PC·모바일 60개 화면과 고유 영상 4개에서 재생·음소거·탐색·일시정지·반복·MP4 대체·206 구간 응답·동작 줄이기 확인.
- verify:changelogs: 224개 환경별 릴리스 경로와 다운로드·로더 범위·과거 주소·모바일 배치 확인. 새 버전 등장 후에도 DNPC 과거 범위 검사는 명시적으로 0.1.2를 사용한다.
- verify-release-note-sources: 위키 링크뿐인 본문, minified HTML, 실제 내용 우선, 환경 불일치 거부와 미업로드 작성자 환경 보존 확인.
- 한국어 PC·모바일 배치와 원본 접촉 시트를 직접 확인했다. 인코딩 시 두 형식 모두 전체 프레임 디코딩을 통과했다.

증거는 `evidence/cobble-release-20261109/`와 `evidence/published-release-refresh-20261109/`에, 복구 백업은 `_backups/released-docs-20261109/`와 `_backups/published-release-refresh-20261109-143724/`에 남겼다. 문서만 변경했으므로 모드 릴리스 체인지로그에 새 항목을 추가하지 않았다.

이번 작업의 촬영 준비·실행 폴더 3개와 FFmpeg·최종 컴파일 임시 폴더를 정리했다. 사용자 게임·다른 작업·DWE 촬영 폴더는 건드리지 않았다. 실제 정리 목록은 `evidence/cobble-release-20261109/cleanup.json`에 있다.
