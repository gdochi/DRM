# 공개 체인지로그 정리 기록

작업 완료: 2026-11-06 KST. 업로드 목록·원문 조회는 2026-11-05 UTC에 수행했다. 기존 문서가 있는 한국어·영어·포르투갈어·스페인어·프랑스어에 버전별 페이지 55개를 추가하고, MWENT의 기록 안내 5개를 Minigames 체인지로그에 연결했다. 각 문서 제품에 `체인지로그` 카테고리를 추가했다.

## 공개 기준 확인

공개 CFWidget 인덱스로 파일 목록을 조사한 뒤, 최신 버전의 각 파일을 CurseForge 공개 API에서 다시 확인했다. 파일명·프로젝트·공개 상태와 게시된 릴리스 노트를 대조했으며, 로컬 체인지로그를 그대로 복사하지 않았다. 공식 파일 정보와 원문은 [published-release-notes.json](published-release-notes.json), 전체 업로드 목록은 [curseforge-files.json](curseforge-files.json)에 있다.

| 문서 제품 | 이번에 기록한 공개 버전 | 실제 업로드 파일 환경 |
| --- | --- | --- |
| DRM Forge | 0.3.0 | Forge 1.20.1 |
| DRM Fabric / NeoForge 문서 | 0.3.0 | Fabric 1.21.1 / 26.3 |
| NPC Core | 0.1.2 | Forge 1.20.1; Fabric / NeoForge 1.21.1 / 26.3 |
| Cobblemon Editor | 0.2.8 | Fabric / NeoForge 1.21.1 |
| BattleWorks | 0.1.6 | Forge 1.20.1; Fabric / NeoForge 1.21.1 / 26.3 |
| Warfare | 0.3.1 | Forge 1.20.1; NeoForge 1.21.1 |
| Warfare Expanded | 0.3.1 | Forge 1.20.1; NeoForge 1.21.1 |
| Spawn Control | 0.1.5 | Forge 1.20.1; Fabric / NeoForge 1.21.1 / 26.3 |
| Real Armor | 0.1.4 | Forge 1.20.1; Fabric / NeoForge 1.21.1 / 26.3 |
| MapIcon Integration | 0.1.2 | Forge 1.20.1; Fabric / NeoForge 1.21.1 / 26.3 |
| Minigames | 0.1.6 | Forge 1.20.1; Fabric / NeoForge 1.21.1 / 26.3 |

DRM 0.3.1·Forge 0.2.9, Cobblemon Editor 0.2.9, DNPC 0.1.3, DW/DWE 0.3.2, Real Armor 0.1.5, MapIcon 0.1.3은 이번 확인 목록에 공개 파일이 없어 새 체인지로그에 포함하지 않았다. 기존 일반 릴리스 안내와 MWENT 0.1.5 작업본은 원본을 보존하고 공개 번들·메뉴·검색에서 제외했다. 해당 안내로 연결되던 링크는 공개된 과거 파일 또는 새 체인지로그로 변경했다.

기존 일반 사용법의 개발 버전 기준을 일괄 수정하는 작업은 수행하지 않았다. 이번 공개 여부 검사는 릴리스·체인지로그 페이지에 적용한다. 모드 소스, 배포 JAR, `[LOG] Change Log` 원본은 수정하지 않았다.

## 변경 위치

- `content/<locale>/200-changelog-<product>-<version>.md`: 버전별 공개 파일 표와 게시된 변경 사항, 과거 버전 링크.
- `content/changelogs/published.json`: 확인된 프로젝트·버전·파일 ID 목록.
- `site.config.json`: 모든 문서 제품의 체인지로그 카테고리. `_links/mod-links.json`과 함께 Spawn Control·Real Armor의 현재 CurseForge 프로젝트 주소를 동기화했다.
- `scripts/build.mjs`: 미확인 버전, 표시 버전 불일치, 다른 프로젝트·버전의 파일 ID를 가진 릴리스 문서를 거부한다.
- `scripts/verify-translations.mjs`: 비공개 원본 파일을 번역 공개 문서 수에서 제외한다.
- [운영 규칙](../../changelog-workflow.md): 다음 버전부터의 공개 확인·기록 절차.

## 검증과 복구

- `npm.cmd run build`: 문서 885개 생성.
- `npm.cmd run verify`: 문서 885개, 모드 카드 12개, 이미지 1,687개와 내부 링크·분류·배포 링크 검사 통과.
- `npm.cmd run verify:translations`: 번역 531개 검사 통과.
- [verify.mjs](verify.mjs): 체인지로그·MWENT 안내 60개 경로의 데스크톱·모바일 표시, 로더별 파일 표, 메뉴 이동을 확인했다. 미공개 버전·다른 모드 파일 ID·표시 버전 불일치의 빌드 거부도 확인했다. [검증 결과](browser/results.json)에 기록했다.
- [데스크톱 화면](browser/minigames-ko-desktop.png), [모바일 화면](browser/warfare-ko-mobile.png)을 직접 확인했다. 변경 범위를 넘어 전체 사용법의 게임 내 동작을 검증했다는 의미는 아니다.
- `git diff --check` 및 변경된 빌드·검증 스크립트 구문 검사 통과.

백업: `C:/Users/hodu3/Desktop/[DOCHI] DOCS/_backups/docs-changelogs-20261105-235917/`. 기존 파일만 작업 전 상태로 복사했다. 이번 작업의 일회성 생성기와 임시 빌드 거부용 문서는 정리했으며, 재현용 검증 코드·최종 화면·공개 근거·복구 백업은 보존했다. 기존 다른 작업의 `build/task/reader-ui` 자료는 수정하거나 삭제하지 않았다.

로컬 미리보기는 `http://localhost:4173/?lang=ko#core/changelog-0-3-0`에서 확인했다. 사이트 배포나 Git 커밋은 수행하지 않았다.
