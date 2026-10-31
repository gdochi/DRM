---
title: GUI·파일·문제 해결
slug: minigames-files-gui
order: 1320
description: 게임 규칙과 화면 배치의 저장 위치, GUI Maker 편집과 운영 점검입니다.
product: dochi-minigames
category: 파일과 운영
section: operations
status: 사용 안내
version: 0.1.5
audience: 제작자 / 운영자
---

## 저장 위치

| 내용 | 경로 |
| --- | --- |
| 게임 규칙 | `config/dochi_rpg_maker/minigames/games/<id>.json` |
| 기본 런타임 GUI | `config/dochi_rpg_maker/gui/minigames/minigames_gui.json` |
| 최고 기록 | `<world>/data/dochi_minigames_scores.json` |

게임 규칙 JSON은 참가비·제한 시간·심볼·보상을 저장합니다. GUI JSON은 플레이어가 보는 경기판·점수 패널 배치를 저장합니다. NPC 연결은 NPC 저장 데이터에 남으며 같은 게임 ID를 연결한 NPC들은 같은 게임 설정을 사용합니다.

## GUI Maker에서 화면 편집

DRM이 설치된 환경에서 게임 규칙 탭의 **GUI Maker** 버튼으로 현재 게임의 GUI 파일을 엽니다. 경기판과 점수 패널의 위치·크기를 편집한 뒤 저장합니다. 기본 GUI를 별도로 꾸밀 때는 `Save As`로 복사하고 게임의 `guiLayout`에 해당 GUI를 연결하세요.

**게임판 → 메모리 카드 크기**는 16–96px, 기본 40px입니다. 카드가 많으면 경기판에 맞춰 자동 축소되며 클릭 판정도 표시 크기에 맞춥니다. `previewGame`은 GUI Maker의 예시 화면에만 영향을 주고 실제 게임 규칙을 바꾸지 않습니다.

숫자를 입력하다 값이 불완전해지면 탭 이동·저장이 차단됩니다. 입력을 완성한 뒤 이동하세요. 공용 뒤로·앞으로 이동과 창 크기 변경은 편집 초안을 유지하지만 서버 저장을 대신하지 않습니다.

## 문제 해결

| 증상 | 확인할 것 |
| --- | --- |
| 로드 목록에 게임이 없음 | 서버 게임 폴더, 스키마, 지원 게임 타입과 파일 검증 오류 |
| NPC 클릭에 바로 게임이 뜸 | 대화에서만 진입하려면 직접 Minigames Apply 연결을 해제 |
| 참가 화면 뒤 시작 실패 | 잔액, 참조 아이템, Cobblemon·CobbleDollars 설치, 서버 메시지 |
| 기억력 저장 실패 | 카드 수가 짝수인지, 짝 수만큼 서로 다른 심볼이 있는지 |
| GUI가 안 바뀜 | 해당 게임에 연결한 GUI 파일을 수정·저장했는지 |
| 보상이 다르게 지급됨 | 점수 단계와 `highest`·`cumulative`·`random` 정책 |

업데이트 전에는 `config/dochi_rpg_maker`와 월드를 함께 백업합니다. 배포 JAR에는 게임 시험용 코드가 포함되지 않은 일반 빌드를 사용합니다.

## JSON 참고

직접 JSON을 편집하는 도구를 위한 참고입니다. 규칙 스키마는 `dochi.minigames.v1`, 타입은 `monty`·`slots`·`memory`·`whack`·`timing`·`highlow`·`shooting`·`mob_battle`입니다. `guiLayout`은 DRM `gui/` 기준 상대 경로이며 기본값은 `minigames/minigames_gui.json`입니다. 숨겨진 정답이나 진행 세션은 규칙 파일에 저장하지 않습니다.

## 단독 실행과 이전 파일

DRM이 없어도 `config/dochi_rpg_maker/minigames/`와 `gui/minigames/` 경로를 사용합니다. 구형 `dochi_minigames/games/`와 `gui/dochi_minigames/`를 사용하는 설정은 마이그레이션 대상입니다. 업데이트 전에 기존 폴더를 함께 백업하세요. 클라이언트 UI 설정은 `config/dochi_minigames/client.json`, 학습 완료 기록은 `<world>/data/dochi_minigames/tutorial/<UUID>.json`입니다.
