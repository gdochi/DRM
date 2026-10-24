# 모드 배포 링크 관리

`mod-links.json`에서 위키 카드에 표시할 CurseForge와 Modrinth 링크를 관리합니다.

- `wikiModId`: `site.config.json`의 `wikiMods[].id`와 같은 값입니다.
- `curseForgeUrl`: CurseForge 프로젝트 주소입니다.
- `modrinthUrl`: Modrinth 프로젝트 주소입니다.
- 아직 프로젝트가 없으면 링크 값을 `null`로 둡니다.
- 프로젝트가 새로 생기면 `null` 대신 전체 URL을 입력합니다.

`publish-docs.bat`를 실행하면 이 파일의 링크가 `site.config.json`에 먼저 반영된 뒤 사이트를 빌드하고 게시합니다. `null` 또는 빈 문자열인 링크는 위키 카드에서 숨겨집니다.

2026-10-24에는 Modrinth 공식 API의 `great_dochi` 공개 프로젝트 목록과 파일 목록을 확인했습니다. 공개 프로젝트는 DRM, Cobblemon Editor, BattleWorks, Warfare입니다. 로컬 최신 Warfare 0.3.1과 Modrinth 공개 0.2.9는 구분하며, 확인하지 않은 새 프로젝트 URL은 추측해서 채우지 않습니다.
