# 문서 하단 탐색 중복 정리

2026-11-06. `Continue with`를 `Related documents` / `관련 문서`로 바꿨다. 이전·다음 문서는 관련 문서 목록에서 제외한다. 같은 모드의 이름을 항목마다 반복하지 않고, 다른 모드로 연결할 때만 모드명을 표시한다. 관련 문서가 남지 않으면 해당 영역을 숨긴다. 문서 번호와 이전·다음 탐색은 유지한다.

변경 파일: `src/app.js`, `src/styles.css`, `src/locales/pt.json`, `src/locales/es.json`, `src/locales/fr.json`.

## 확인

- 빌드, 문서 885개 검사, 번역 531개 검사, JavaScript 구문 및 변경 파일 공백 검사 통과.
- 첨부 화면의 NPC 문서에서 다음 문서인 `Daily Schedules and Riding`은 하단 Next에만 표시된다. 관련 문서는 `Cook and Deliver Food`, `Save and Reuse an NPC` 두 개만 표시된다.
- 5개 본문 언어, 320/390/1440px에서 제목·중복 제거·줄 넘침을 확인했다. 관련 문서가 없는 실제 페이지와 다른 모드의 이름 표시, 관련 문서·Next·브라우저 뒤로 가기 이동을 확인했다. 브라우저 JavaScript 오류 없음.
- [검증 결과](results.json), [데스크톱](npc-footer-desktop.png), [모바일](npc-footer-mobile.png), [빈 관련 문서 영역 숨김](empty-related-footer.png). 데스크톱과 모바일 화면을 직접 확인했다.

백업: `_backups/related-docs-20261106-213040/`. 이번 작업에서 임시 파일은 만들지 않았으며, 확인 화면·결과와 복구 백업을 보존했다. 모드 소스·배포물·모드 릴리스 로그는 변경하지 않았다.

미리보기: `http://127.0.0.1:59107/?lang=en#dochi-npc-core/npc-core-editor`. 기존 미리보기 포트가 사용 중이어서 이 작업용 서버를 별도 포트에 열었다. 사이트 배포·Git 커밋은 수행하지 않았다.
