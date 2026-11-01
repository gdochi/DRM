# Português · Español · Français — 2026-11-01

## 반영 내용

- 포르투갈어 `pt`(HTML 언어 `pt-BR`), 스페인어 `es`, 프랑스어 `fr`를 추가했다. 각 언어에 기존 영문 문서와 같은 186개 경로가 있다.
- 제목·본문·이미지 설명을 번역하고 홈, 문서 목록, 검색, 목차, 이미지 확대, 이전·다음 이동과 상태 안내를 현지화했다.
- 명령어, 코드 블록, 파일 식별자, 원문 링크와 실제 게임 화면은 유지했다. 새 언어를 위해 모드 소스나 JAR를 변경하지 않았다.
- 새 본문은 오프라인 번역 모델을 사용한 보조 번역이다. 공통 용어, 홈·메뉴와 처음 시작하기의 주요 문구를 검수·교정했다. 모든 문서가 원어민 교열을 마친 것은 아니다. 문서에 번역 표시와 영어 원문 전환 버튼을 제공한다.
- 기본 영어 문서와 선택한 언어만 읽는다. 다른 번역 전체를 초기 로딩에 포함하지 않는다. 실패하면 이전 언어를 유지하며 재시도할 수 있다.
- 언어를 URL로 공유할 수 있다: `?lang=pt`, `?lang=es`, `?lang=fr`. 선택한 언어를 저장하고 검색은 악센트 생략 입력도 처리한다.

## 파일

- `content/pt`, `content/es`, `content/fr`: 총 558개 번역 문서.
- `src/locales`: 현지화 문구와 검수한 공통 번역 보정.
- `site.config.json`, `src/app.js`, `src/styles.css`: 언어 선택·원문 전환·표시·검색.
- `scripts/build.mjs`: 언어별 데이터 생성. `scripts/load-built-docs.mjs`: 검증용 전체 데이터 로드.
- `scripts/verify-translations.mjs`, `scripts/verify-language-ui.mjs`: 번역 보존 조건과 실제 언어 선택 동작 검사.
- 기존 문서·브라우저 검증과 GitHub Pages 작업도 언어별 파일을 검사하도록 갱신했다.

변경 전 백업: `_backups/docs-refresh-languages-20261101-171507/`.

## 검증

- 930개 문서, 12개 모드, 이미지 1,762개 배치 검증.
- 558개 번역의 경로·메타데이터, 코드 블록·인라인 명령어, 링크 대상, 이미지 구성, 항목 수 보존 검사.
- 930개 문서의 PC 1440px·모바일 390px 검사.
- 새 언어별 320·390·768·1440px 표시, 메뉴, 검색, 언어 URL, 원문 전환, 저장된 언어 복원, 선택하지 않은 언어의 다운로드 방지, 로딩 실패와 재시도 검사.
- `npm run build`, `npm run verify`, `npm run verify:translations`, `npm run verify:ui`, `npm run verify:languages`로 재현할 수 있다. 브라우저 도구 경로는 기존 검증 스크립트의 환경 변수로 지정한다.

## 번역 도구

Helsinki-NLP/OPUS-MT의 [영어→포르투갈어](https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-pt), [영어→스페인어](https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-es), [영어→프랑스어](https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-fr) 모델(CC BY 4.0)을 [CTranslate2](https://opennmt.net/CTranslate2/)로 로컬 실행했다. 모델과 실행 라이브러리는 사이트 배포물에 포함하지 않는다. 작업별 재현 스크립트와 검증 결과는 로컬 `build/task/localize-20261101/`에 있다.
