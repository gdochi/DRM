# 모드 배포 링크 관리

`mod-links.json`에서 위키 카드에 표시할 CurseForge와 Modrinth 링크를 관리합니다.

- `wikiModId`: `site.config.json`의 `wikiMods[].id`와 같은 값입니다.
- `curseForgeUrl`: CurseForge 프로젝트 주소입니다.
- `modrinthUrl`: Modrinth 프로젝트 주소입니다.
- 아직 프로젝트가 없으면 링크 값을 `null`로 둡니다.
- 프로젝트가 새로 생기면 `null` 대신 전체 URL을 입력합니다.

`publish-docs.bat`를 실행하면 이 파일의 링크가 `site.config.json`에 먼저 반영된 뒤 사이트를 빌드하고 게시합니다. `null` 또는 빈 문자열인 링크는 위키 카드에서 숨겨집니다.
