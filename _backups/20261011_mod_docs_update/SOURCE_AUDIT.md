# 2026-10-11 모드 문서 조사

바탕화면의 실제 프로젝트 소스·메타데이터·설치용 JAR와 현재 문서를 비교했다. 모드 소스 및 버전은 수정하지 않았다. 공개 배포 사이트에서 새 모드의 확정 URL을 확인하지 못했으므로 다운로드 주소를 추측해 추가하지 않았다.

| 프로젝트 | 확인한 현재 버전 | 문서 반영 |
| --- | --- | --- |
| Forge DRM | 0.2.2 | 최신 안내, 설치·시작, 즐겨찾기, 외부 PNG·Gecko 텍스처 |
| Fabric / NeoForge DRM | 0.2.5 | 최신 안내, 설치·시작·로더 구분, 새 애드온 연결 |
| Fabric / NeoForge Cobblemon Editor | 0.2.4 | 설치·개요, 배틀 스케줄러, 영역 ON/OFF·월드 선택, 블록 무대·FX, 레벨·도주 |
| Forge / NeoForge BattleWorks | 0.1.4 | 최신 안내와 현행 버전 표기 |
| Forge / NeoForge DW / DWE | 0.3.0 | NeoForge 애드온 분리, 설치·차량·운영 안내 |
| Forge / Fabric / NeoForge MapIcon Integration | 0.1.0 | 새 모드 목록과 한·영 3페이지 |
| Fabric / NeoForge Minigames | 0.1.0 | 새 모드 목록과 한·영 3페이지 |
| Spawn Control | 0.1.2 | 로더별 gradle.properties와 기존 문서 기준 일치 |
| Real Armor | Forge 0.1.1 / NeoForge 0.1.2 | 소스 README·메타데이터와 기존 문서 기준 일치 |

## 주요 근거

- 각 프로젝트의 `gradle.properties`, Forge DRM `mods.toml` 및 `build-local.ps1`, 각 설치용 JAR 파일명.
- DRM `EditorSelectScreen`, `EditorFavorites`, `DrmTextureAssetCache`, `GuiImageAssetLoader`, `NpcGeckoRenderer`, Fabric `NpcBasicEditorScreen` 및 텍스처 회귀 검사.
- Cobble NPC 양쪽 메타데이터: 최소 DRM 0.2.4, Cobblemon 1.7.3 이상 1.9.0 미만. Fabric 애드온 선언은 Loader 0.17.2/API 0.116.6이지만 문서 환경 표에는 현행 Core가 요구하는 Loader 0.18.0/API 0.116.11까지 포함했다.
- NeoForge Cobble NPC `BattleSchedulerCommands`의 현재 `start`, `cancel`, `area on/off/status`. 프로젝트의 이전 `docs/battle-scheduler.md`에는 area 명령 추가 전 설명이 남아 있어 현재 소스를 우선했다.
- `BattleSchedulerService`, `BattleSchedulerAreaControl`, `BattleSchedulerAreaGuide`, `BattleSchedulerData`, `BattlePresentationRegionCapture`, `PresentationRegionValidation`, `BattlePresentationRegion`, `BattleRuleSettings`, `BattleFleeRuntime`, `CobbleTrainerOptions`, `CobbleTrainerJsonCodec`.
- Region 현재 한도: 축 128, 지원 비공기 블록 32,768, 상태 512. 블록 엔티티는 제외하며 기존 번역의 32/4096 문자열은 현행 한도를 나타내지 않는다.
- NeoForge DW/DWE 메타데이터: DW 0.3.0, DWE 정확히 DW 0.3.0/SuperbWarfare 0.8.9.1, NeoForge 21.1.216 이상 21.2 미만, PlayerAnimator 2.0.0+ 클라이언트 필수.
- MapIcon `README`, `MapIconResolver`, `SettingsStore`, `MapIconServer`, 로더 메타데이터. 타입 목록·저장 적용·이미지 경로는 현재 README와 소스 확인.
- Minigames `README`, `GameDocument`, `GameEngine`, `GameServer`, `RewardService`, 로더 메타데이터와 배포 JAR. 현재 아이템 보상은 인벤토리 여유가 없으면 드롭하므로 README의 일반 지급 오류 설명과 구분했다.

## 변경 범위와 검증

한·영 신규 페이지 22개. 기존 현재 안내·버전 메타데이터·설치 조건과 홈의 데이터 설정을 갱신하고 과거 릴리스 기록은 보존했다. `_backups/20261011_mod_docs_update`에 변경 전 콘텐츠·사이트 설정·로고·링크 정보를 복사했다.

`npm.cmd run build`와 `validate.mjs`로 빌드, 문서·제품·섹션 중복, 신규 경로, 로고 파일과 내부 문서 연결을 확인한다. 게임 자체의 전투·지도 연동을 재시험한 작업은 아니며, 새 모드 카드에는 전용 로고가 없어 사이트의 기존 텍스트 대체 표시를 사용한다.

최종 정적 검사: 문서 289개, 모드 목록 10개, 신규 한·영 경로 22개. 중복·미등록 제품/섹션·없는 로고·내부 문서 링크 오류 0개. `git diff --check` 통과. 미리보기는 `http://localhost:4173`에서 HTTP 200을 확인했다. 브라우저 도구는 작업 폴더의 대괄호 경로를 쓰기 glob으로 해석하는 초기화 오류가 재시도에도 반복되어 시각 검증을 수행하지 못했다.
