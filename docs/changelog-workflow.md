# 모드별 공개 체인지로그

홈의 각 모드 카드에서 **Open docs 바로 오른쪽**에 **Changelog** 버튼을 둔다. 문서와 체인지로그는 별도 탭으로 이동한다. 체인지로그에서는 **로더 → Minecraft 버전 → 모드 버전**을 선택하고, 해당 환경·배포 버전의 기록 하나만 표시한다. MWENT의 Changelog는 Minigames로 연결하고, 바로 오른쪽의 **카드 아이콘**은 별도 **버전별 카드 변경** 문서로 연결한다.

## 파일과 화면 단위

- 공개 원문은 `content/changelogs/<product>/<모드 버전>.json`에 보관한다. 파일 하나에 모드 버전 하나만 담고, `files` 안에서 공개 파일 ID·로더·Minecraft 버전·업로드 날짜·원문을 각각 유지한다.
- 예: `content/changelogs/dochi-npc-core/0.1.2.json`. `Forge / 1.20.1`, `NeoForge / 1.21.1`, `NeoForge / 26.3`, `Fabric / 1.21.1`, `Fabric / 26.3`은 화면에서 별도 선택 항목이다.
- 주소는 `#changelog/<product>/<loader>/<minecraft>/<mod-version>`이다. 예: `#changelog/dochi-npc-core/NeoForge/26.3/0.1.2`.
- `Global`·`Common Changes`는 선택한 환경에 포함한다. 환경별 제목·중첩 목록·호환 표는 해당 로더와 Minecraft 버전에 맞는 항목만 표시한다. 같은 환경의 Added·Fixed·Changed·Improved 분류는 각각 한 번으로 합친다.
- 지원 환경이 다른 모드 버전을 합쳐 쓰거나, 한 파일의 본문을 다른 파일·버전의 기록으로 대체하지 않는다. 공개된 파일이 없는 환경은 선택 목록에 만들지 않는다.
- 기존 `content/<언어>/200-changelog-*.md` 주소는 유지하되, 같은 모드 버전의 새 체인지로그 화면으로 연결한다. 일반 문서 메뉴·검색에는 혼합 릴리스 본문을 표시하지 않는다.
- MWENT 카드 이력은 `#mwent/releases`에서 버전별로 확인한다. `section: card-history`인 카드 비교·스펙 문서는 일반 릴리스 화면으로 넘기지 않는다. 공개된 카드 비교 근거의 로더·Minecraft 범위를 보존하며, 비공개 0.1.5 작업본은 숨김 상태를 유지한다. 홈 버튼은 MWENT의 `wikiMods.cardHistoryPage` 설정을 따른다.

## 공개 기준

- **CurseForge에 실제 업로드된 버전만** 공개 문서에 기록한다. 로컬 JAR, 개발 소스의 버전, `[LOG] Change Log` 파일의 존재만으로 공개된 버전으로 취급하지 않는다.
- 같은 버전의 로컬 체인지로그가 게시 후 추가 수정되었을 수 있으므로, 최초 공개 기록은 CurseForge에 게시된 본문을 기준으로 삼는다.
- 파일 목록에는 실제 업로드된 로더·Minecraft 조합만 적는다. 다른 로더의 빌드 성공으로 공개 범위를 확대하지 않는다.
- 모드 버전은 그대로 사용한다. 문서 수정은 모드의 릴리스 변경 사항에 넣지 않는다.

## 확인과 추가

1. 모드의 CurseForge 파일 목록에서 버전과 파일 ID를 확인한다. 공개 CFWidget 인덱스 `https://api.cfwidget.com/<projectId>`는 목록을 조사하는 보조 수단이다.
2. CurseForge 공개 파일 정보 `https://www.curseforge.com/api/v1/mods/<projectId>/files/<fileId>`와 게시된 변경 기록 `.../change-log`를 읽는다. 파일명, 버전, 로더, 게임 버전, 업로드 시각, 공개 상태를 대조한다.
3. 검증 결과를 `content/changelogs/published.json`에 추가한다. 기존 공개 버전과 파일 ID는 보존한다. 조회할 수 없는 버전은 확인될 때까지 추가하지 않는다.
4. `npm.cmd run sync:changelogs`로 확인 목록의 공식 파일 정보와 릴리스 노트를 읽어 버전별 JSON을 갱신한다. 공개 상태·파일명이 일치해야 저장한다. 일부 파일 조회에 실패하면 불완전한 버전으로 덮어쓰지 않는다. 각 JSON의 원문과 출처 URL·조회 시각을 보존하며, 릴리스 항목을 임의로 고치지 않는다.
5. `scripts/changelog-data.mjs`가 빌드 시 환경별 항목을 나누고 `dist/assets/changelogs.js`를 생성한다. 화면 안내는 8개 언어로 제공하고 본문은 게시된 영문 원문을 사용한다. 다운로드는 선택한 환경·모드 버전의 파일에 연결하며 날짜는 UTC다. 모드 버전은 최신순으로 정렬한다.
6. `npm.cmd run build`, `npm.cmd run verify`, `npm.cmd run verify:translations`, `npm.cmd run verify:changelogs`를 실행한다. 빌드는 확인 목록과 다른 프로젝트·버전·환경·파일 ID 또는 누락된 공개 파일이 있는 체인지로그를 거부한다. 브라우저 검사는 각 환경·모드 버전의 본문과 다운로드, 예전 주소의 연결, 모바일 배치와 잘못된 주소를 확인한다.

## 이번 정리

기존 일반 릴리스 안내는 원본을 보존하고 `hiddenNav: true`로 공개 번들·메뉴·검색에서 제외했다. 연결된 문서의 링크는 해당 과거 CurseForge 파일 또는 새 공개 체인지로그로 바꿨다. MWENT의 과거 실제 카드 비교 자료는 유지하고, 별도 0.1.5 작업본 안내는 공개 목록에서 제외했다.

최초 확인 근거는 [공개 업로드 인덱스](evidence/changelogs-20261105/curseforge-files.json)와 [최신 공개 파일 정보·릴리스 노트](evidence/changelogs-20261105/published-release-notes.json)에 보존한다. 2026-11-06에는 확인 목록의 공개 파일 189개를 재조회해 모드 버전 105개의 원문을 `content/changelogs/<product>/<version>.json`에 보관했다. 모드별 체인지로그 원본 폴더는 이번 문서 작업으로 수정하지 않았다.
