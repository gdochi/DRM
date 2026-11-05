# 간호순·침대·레머넌트 짧은 GIF

2026-11-05 요청에 따라 실제 Minecraft 프레임으로 GIF 세 개를 제작했다. 5개 언어의 간호순·DNPC 시간표·Forge 및 Fabric/NeoForge 레머넌트 문서, 총 20곳에 배치했다. 게시용 파일은 `src/media/guides/short-gifs-20261105/`에 있다. 모드 구현 변경은 없으므로 모드 릴리스 체인지로그는 갱신하지 않았다.

## 촬영과 확인 범위

- Minecraft 1.21.1 / NeoForge 21.1.259, DRM 0.3.1, DNPC 0.1.3의 별도 싱글플레이 월드를 사용했다. 간호순·침대 촬영에는 Cobblemon Editor 0.2.9, Cobblemon 1.8.4와 Kotlin for Forge 5.12.0도 로드했다. 원본 배포 JAR의 출처와 SHA-256은 각 환경 기록에 있다. 사용자 게임과 기존 월드는 수정하지 않았다.
- 간호순: AcidFlounder391의 [Nurse Joy 스킨](https://www.minecraftskins.com/skin/22531361/nurse-joy/)을 적용했다. 실제 편집기의 Apply to NPC와 Link Healing Machine, 실제 매핑 서비스의 Shift 사용 경로, 빈손 NPC 상호작용과 플레이어 치료 선택지를 사용했다. NPC의 이동·치료·복귀, 이상해씨의 체력 1→19/19 및 세션 종료를 서버 상태로 확인했다. 기계 충전과 파티 구성은 촬영 준비 데이터다.
- 침대: 실제 Houses → Assign bed와 선택 모드, 정상 select_bed 요청, Bed assigned와 Save to NPC를 촬영했다. 수면 시간표와 밤 시각은 촬영 도구가 준비했으며, 이 GIF를 시간표 전체를 UI로 작성한 증거로 취급하지 않는다. 지정한 침대로 이동해 실제로 수면하는 서버 상태를 확인했다.
- 레머넌트: 실제 세터 아이템의 블록 사용 → 본문 입력 → Save → 마커 상호작용으로 촬영했다. 서버 마커에 남은 문구와 RemnantMsgViewScreen의 본문을 확인했다. 저장 JSON 연결 예시와 직접 입력 예시를 문서에서 구분했다. Forge 문서에도 촬영 환경이 NeoForge임을 명시했다.
- 촬영 도구는 독립 문서용 fixture이며 배포 모드에 포함하지 않는다. 프로그램이 네이티브 UI와 서버 요청을 조작했고, 수동 마우스 녹화로 표현하지 않는다. GUI·플레이 결과를 합성하거나 다시 그리지 않았다.

## 파일과 재현

- 계획: `scripts/guide-capture/three-short-gifs.json`
- 실제 캡처: `scripts/run-guide-capture.py`, `GuideCapture.java`, `GuideScenes.java`
- 인코딩: `scripts/encode-guide-gif.py` — 1920×1080 원본을 1280×720으로 축소하고 정지 구간을 줄여 무한 반복 GIF로 저장한다. 게임 프레임 사이의 합성 보간은 없다.
- 검토 자료: `docs/evidence/short-guide-gifs-20261105/` — 환경·JAR 해시·네이티브 조작 기록·서버 확인 결과·대표 원본 프레임·GIF 해시와 프레임 수·접촉 시트·브라우저 검사 결과.
- 수정 전 백업: `_backups/three-guide-gifs-20261105/`

## 검증과 정리

- `npm.cmd run build`: 930개 문서 빌드 성공.
- `npm.cmd run verify`: 930개 문서, 1,787개 이미지 배치와 링크·이미지 크기 확인.
- `npm.cmd run verify:translations`: 558개 번역의 이미지·링크·문서 구조 일치 확인.
- `node scripts/verify-guide-gifs.mjs`: 5개 언어, 4개 문서, PC 1440px·모바일 390px의 40개 화면에서 GIF 디코딩·MIME·원본 보기·가로 넘침 검사 통과.
- 게시 GIF 세 개의 전체 프레임 디코딩, 1280×720 크기, 무한 반복과 해시를 확인했다. 간호순 56프레임/22.39초, 침대 46프레임/18.16초, 레머넌트 72프레임/14.26초다.
- 최종 촬영 도구의 Java 컴파일을 확인했고, Forge 단독 컴파일 경로가 새 NeoForge 촬영 클래스에 의존하지 않도록 선택적 로딩을 사용했다. Forge 런처의 기존 소스 변환 진입점도 보존했다.
- 처음의 샌드박스 로컬 연결 실패, 간호순 화면 전환 대기 오류, 침대 요청 revision 타입 오류, 실패한 침대 선택 안내가 겹친 레머넌트 촬영은 채택하지 않았다. 수정 후 확인된 실행만 게시했다.
- 최종 증거와 복구용 백업을 보존하고 이번 작업의 촬영 인스턴스·임시 월드·중간 프레임·인코딩 중간 파일은 정리했다.
