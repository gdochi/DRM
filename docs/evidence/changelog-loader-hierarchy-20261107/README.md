# DRM 체인지로그 로더 계층 수정

DRM의 Forge 문서와 Fabric/NeoForge 문서 구분이 체인지로그까지 나누던 문제를 수정했다. 체인지로그는 `#changelog/core` 한 화면에 모으고 **로더 → Minecraft 버전 → 모드 버전**으로 탐색한다.

- Forge → 1.20.1
- NeoForge → 1.21.1, 26.3
- Fabric → 1.21.1, 26.3

체인지로그의 문서 환경 전환을 제거하고 제목에는 공통 모드 이름을 표시한다. 기존 `core-fabric` 체인지로그 주소는 선택한 로더·Minecraft 버전·모드 버전을 유지해 `core` 주소로 이동한다. 문서 열기는 선택한 릴리스의 문서 환경으로 연결한다. 출처별 릴리스 원문은 그대로 보존한다.

수정 파일은 `src/app.js`, `scripts/verify-changelogs.mjs`, `scripts/verify-reader-ui.mjs`, `docs/changelog-workflow.md`다. 수정 전 백업은 `_backups/changelog-loader-hierarchy-20261107-133324/`에 보관했다.

검증 결과:

- `npm.cmd run build`: 문서 885개 빌드 성공.
- `npm.cmd run verify`: 문서 885개, 모드 설정 12개, 이미지 1667개, 안내 영상 85개와 문서·배포 링크 검증 통과.
- `npm.cmd run verify:translations`: 번역 문서 531개 검증 통과.
- `npm.cmd run verify:changelogs`: 환경·모드 버전 경로 202개, 기존 DRM 주소, 로더별 버전 목록, 8개 언어, 뒤로 가기·새로고침, 모바일 배치와 다운로드 검증 통과. 자세한 결과는 `results.json`에 기록했다.
- `npm.cmd run verify:ui`: 문서 830개의 브라우저 배치와 문서 선택·검색·모바일 동작 검증 통과. 상세 결과는 `reader-ui-results.json`에 보관했다.

`drm-unified-desktop.png`와 `drm-unified-mobile.png`는 NeoForge → 26.3 → DRM 0.3.1 선택 화면이다. 로컬 미리보기: `http://localhost:4174/?lang=ko#changelog/core`.

문서 화면과 탐색 구조만 수정했으므로 모드 릴리스 체인지로그에는 항목을 추가하지 않았다. 복구용 백업과 최종 검증 자료를 보존했으며 일회성 편집 스크립트는 만들지 않았다.
