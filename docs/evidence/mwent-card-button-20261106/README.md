# MWENT 버전별 카드 변경 버튼

2026-11-06. 홈의 MWENT 항목에만 카드 모양 아이콘 버튼을 추가했다. 문서 → 체인지로그 → 버전별 카드 변경 순서이며, 카드 버튼은 체인지로그 바로 오른쪽에 표시된다. 툴팁과 접근성 이름은 8개 인터페이스 언어로 제공한다.

## 변경

- `src/app.js`: 카드 SVG 아이콘, MWENT 전용 홈 버튼, 문서 사이드바의 카드 변경 탭과 활성 상태.
- `site.config.json`: MWENT의 `wikiMods.cardHistoryPage` 연결과 별도 `card-history` 분류.
- 5개 본문 언어의 `156-mwent-releases.md`: 버전별 카드 변경 목록. 0.1.6, 0.1.4, 0.1.3, 0.1.2, 0.1.1을 각각 별도 행으로 표시하며, 기존 상세 문서와 현재 카드 카탈로그를 연결한다.
- 같은 언어의 `157-mwent-version-0-1-1.md`, `158-mwent-version-0-1-2.md`, `161-mwent-version-0-1-6.md`: 기존 카드 비교·스펙 본문을 유지하고 `card-history` 분류로 옮겼다. 따라서 일반 체인지로그로 자동 이동하지 않는다.
- `scripts/verify-changelogs.mjs`: 체인지로그 탭을 마지막 탭이라는 위치 대신 실제 체인지로그 주소로 선택한다.
- `docs/changelog-workflow.md`: 일반 체인지로그와 MWENT 카드 이력의 별도 연결을 기록했다.

기존 Minigames 체인지로그와 숨김 상태인 0.1.5 작업본은 유지한다. 0.1.1–0.1.4 카드 비교 범위는 실제 업로드된 Fabric 1.21.1 카탈로그다. 근거는 [기존 카드 비교 기록](../mwent-20261030/card-history.json)이며, 0.1.6의 추가·스펙 기록은 기존 공개 문서 내용을 사용했다. 다른 로더의 카드 정의까지 같은 결과라고 확대하지 않았다.

## 검증

- `npm.cmd run build`: 문서 885개 생성.
- `npm.cmd run verify`: 문서·경로·분류·로고·이미지·영상·배포 링크 검사 통과.
- `npm.cmd run verify:translations`: 번역 531개 검사 통과.
- `npm.cmd run verify:changelogs`: 기존 환경별 체인지로그 189개 경로와 탐색·모바일 검사 통과.
- 카드 버튼 별도 브라우저 확인: 8개 언어, 320/390/768/1440px 위치, MWENT에만 버튼 하나 표시, 5개 버전 행, 상세 문서 직접 열기, 본문의 기존 새 탭 열기, 새로 고침, 사이드바 이동·뒤로 가기, 일반 체인지로그 연결 및 0.1.5 숨김 확인. [결과](results.json)에 JavaScript 오류 없음.
- 구문·변경 파일 공백 검사 통과. [홈 데스크톱](mwent-home-desktop.png), [홈 모바일](mwent-home-mobile.png), [카드 이력 데스크톱](card-history-desktop.png), [카드 이력 모바일](card-history-mobile.png)을 보존했다. 홈과 카드 이력 화면을 직접 확인했다.

백업: `_backups/mwent-card-button-20261106-213926/`. 이번 작업의 임시 파일은 만들지 않았으며, 최종 화면·결과와 복구 백업을 보존했다. 기존 다른 작업의 파일·미디어는 수정하거나 삭제하지 않았다. 모드 소스·배포물·모드 릴리스 로그 변경은 없다.

미리보기: `http://127.0.0.1:59107/?lang=ko#home`, 카드 이력: `http://127.0.0.1:59107/?lang=ko#mwent/releases`. 사이트 배포·Git 커밋은 수행하지 않았다.
