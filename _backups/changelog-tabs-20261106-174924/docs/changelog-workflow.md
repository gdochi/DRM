# 모드별 공개 체인지로그

각 모드의 문서 메뉴 마지막에 **체인지로그**를 둔다. 버전마다 `content/<언어>/200-changelog-<product>-<버전>.md`를 추가한다. 현재 공개 버전부터 기록하고, 이전 버전은 해당 모드의 CurseForge 파일 목록으로 안내한다. MWENT는 독립 모드가 아니므로 Minigames의 체인지로그를 연결한다.

## 공개 기준

- **CurseForge에 실제 업로드된 버전만** 공개 문서에 기록한다. 로컬 JAR, 개발 소스의 버전, `[LOG] Change Log` 파일의 존재만으로 공개된 버전으로 취급하지 않는다.
- 같은 버전의 로컬 체인지로그가 게시 후 추가 수정되었을 수 있으므로, 최초 공개 기록은 CurseForge에 게시된 본문을 기준으로 삼는다.
- 파일 목록에는 실제 업로드된 로더·Minecraft 조합만 적는다. 다른 로더의 빌드 성공으로 공개 범위를 확대하지 않는다.
- 모드 버전은 그대로 사용한다. 문서 수정은 모드의 릴리스 변경 사항에 넣지 않는다.

## 확인과 추가

1. 모드의 CurseForge 파일 목록에서 버전과 파일 ID를 확인한다. 공개 CFWidget 인덱스 `https://api.cfwidget.com/<projectId>`는 목록을 조사하는 보조 수단이다.
2. CurseForge 공개 파일 정보 `https://www.curseforge.com/api/v1/mods/<projectId>/files/<fileId>`와 게시된 변경 기록 `.../change-log`를 읽는다. 파일명, 버전, 로더, 게임 버전, 업로드 시각, 공개 상태를 대조한다.
3. 검증 결과를 `content/changelogs/published.json`에 추가한다. 기존 공개 버전과 파일 ID는 보존한다. 원문과 응답은 `docs/evidence/`의 날짜별 폴더에 남긴다. 조회할 수 없는 버전은 확인될 때까지 추가하지 않는다.
4. 현재 문서가 있는 5개 언어(`en`, `ko`, `pt`, `es`, `fr`)의 버전 페이지를 추가한다. 안내·파일 표는 각 언어로 쓰고, 릴리스 항목은 게시된 영문을 사용한다. 영문 노트를 싣는다는 안내를 유지한다. `pt`, `es`, `fr` 페이지에는 기존 번역 메타데이터를 넣는다. 본문 번역이 없는 언어의 영문 폴백은 유지한다.
5. `section: releases`, `version`, `releaseVersion`, `curseForgeFiles`를 지정한다. 버전 페이지에는 환경별 파일 링크, UTC 업로드 날짜, 변경 사항, 과거 버전의 CurseForge 링크를 둔다. 새 버전이 메뉴의 앞에 오도록 `order`를 정한다.
6. `npm.cmd run build`, `npm.cmd run verify`, `npm.cmd run verify:translations`를 실행한다. 빌드는 확인 목록에 없는 버전이나 다른 프로젝트·버전의 파일 ID를 가진 체인지로그를 거부한다.

## 이번 정리

기존 일반 릴리스 안내는 원본을 보존하고 `hiddenNav: true`로 공개 번들·메뉴·검색에서 제외했다. 연결된 문서의 링크는 해당 과거 CurseForge 파일 또는 새 공개 체인지로그로 바꿨다. MWENT의 과거 실제 카드 비교 자료는 유지하고, 별도 0.1.5 작업본 안내는 공개 목록에서 제외했다.

확인 근거는 [공개 업로드 인덱스](evidence/changelogs-20261105/curseforge-files.json)와 [공식 파일 정보·릴리스 노트](evidence/changelogs-20261105/published-release-notes.json)에 보존한다. 모드별 체인지로그 원본 폴더는 이번 문서 작업으로 수정하지 않았다.
