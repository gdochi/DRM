# 별도 체인지로그 탭과 환경·버전별 기록

2026-11-06 작업. 홈의 모든 모드 카드에서 Open docs 바로 오른쪽에 Changelog 버튼을 추가했다. 문서와 체인지로그는 별도 탭이며, 체인지로그는 로더 → Minecraft 버전 → 모드 버전 순서로 선택한다. 선택한 환경·모드 버전의 변경 내역과 다운로드 파일 하나만 표시한다. MWENT는 Minigames 기록으로 연결한다.

## 변경과 공개 근거

- `src/app.js`, `src/styles.css`, `src/template.html`: 별도 화면, 홈 버튼, 문서/체인지로그 탭, 환경·버전 선택, 예전 릴리스 주소 연결, 8개 언어 안내.
- `content/changelogs/<product>/<version>.json`: 확인된 11개 문서 제품의 모드 버전 105개, 공개 파일 189개의 원문. 각 파일 ID·로더·Minecraft 버전·날짜·공개 상태·공식 출처 URL을 따로 보관한다.
- `scripts/sync-changelogs.mjs`: 기존 공개 인덱스의 공식 파일 정보와 변경 기록을 재조회한다. 이번에 189/189 파일의 공개 상태와 실제 파일명을 확인했다. 한 버전의 조회가 완성되어야 저장한다.
- `scripts/changelog-data.mjs`, `scripts/build.mjs`: 공통 항목과 선택한 환경의 항목을 합쳐 표시한다. 타 환경의 제목·중첩 목록·호환 표 행은 제외하고 Added·Fixed·Changed·Improved는 각각 한 번으로 정리한다. 출처 원문은 수정하지 않는다. 확인 목록과 다른 버전·환경·파일 ID 또는 누락된 공개 파일은 빌드에서 거부한다.
- `scripts/verify-changelogs.mjs`, `package.json`: 재현 가능한 별도 검증과 원문 동기화 명령. 기존 `verify-reader-ui.mjs`는 별도 화면으로 이동한 releases 문서를 일반 문서 화면 검사에서 제외한다. 이전 주소 연결은 체인지로그 검사에서 확인한다.
- 운영 방법: [changelog-workflow.md](../../changelog-workflow.md).

원문은 각 버전 JSON의 `metadataSource`와 `notesSource`에 기재된 CurseForge 공식 공개 API에서 읽었다. 다른 로더의 파일·로컬 개발 버전·모드 작업 로그로 공개 범위를 확대하지 않았다. 모드 소스·배포 JAR·`[LOG] Change Log` 원본은 변경하지 않았다.

## 검증

- `npm.cmd run build`: 문서 885개 및 환경별 체인지로그 189개 생성.
- `npm.cmd run verify`: 문서 885개, 모드 카드 12개, 문서 이미지 1,687개 및 경로·분류·배포 링크 검사 통과.
- `npm.cmd run verify:translations`: 번역 531개 검사 통과.
- `npm.cmd run verify:ui`: 일반 문서 810개의 데스크톱·모바일 레이아웃과 검색·언어 전환·탐색·이미지 확대·터치 조작 회귀 검사 통과. 결과는 `build/task/reader-ui/results.json`에 보존했다.
- `npm.cmd run verify:changelogs`: [results.json](results.json). 189개 환경·버전별 본문/다운로드, 모바일 320px 넘침, 8개 언어 홈의 320/390/768/1440px 버튼 배치, 12개 사용법 진입점, 예전 릴리스 주소, 잘못된 주소, 뒤로 가기·새로 고침·모드 전환 검사 통과. 브라우저 JavaScript 오류 없음.
- 실제 원문 기준으로 DNPC 1.21.1의 전용 직업과 26.3, DW의 NeoForge 전용 충돌 수정과 Forge, DWE의 환경별 차량 호환 행, DRM의 1.21.1 전용 변경과 26.3이 분리되는 것을 확인했다.
- 변경 파일 구문 검사와 `git diff --check` 통과.

## 화면과 복구

- [홈 모바일 버튼](home-buttons-mobile.png)
- [체인지로그 데스크톱](changelog-desktop.png)
- [체인지로그 모바일](changelog-mobile.png)
- [모바일 테마 전환](changelog-mobile-theme.png)

최종 데스크톱·모바일 화면을 직접 확인했다. 복구 백업은 `_backups/changelog-tabs-20261106-174924/`에 있다. 재현용 스크립트·확인된 공개 원문·최종 화면·결과와 백업을 보존했다. 이번 작업에서 일회성 파일이나 임시 문서는 생성하지 않았으며, 다른 작업의 기존 build/task 자료는 삭제하지 않았다.

로컬 미리보기: `http://localhost:4173/?lang=ko#changelog/dochi-npc-core/NeoForge/26.3/0.1.2`. 사이트 배포·Git 커밋은 수행하지 않았다.
