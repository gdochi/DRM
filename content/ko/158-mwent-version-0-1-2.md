---
title: 0.1.2 — 카드 유지와 안정화
slug: version-0-1-2
order: 1580
description: 신규 카드·수치 변경 0종과 화면·서버 안정화, 26.3 추가 업로드 기록입니다.
product: mwent
category: 버전별 변경
section: releases
status: 공개 버전 기록
version: 0.1.2
audience: 플레이어 / 서버 운영자
---

## 공개 기준

2026-10-24 CurseForge에 [Fabric 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309263), [NeoForge 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309269), [Forge 1.20.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309265)이 업로드되었습니다. 10-25에는 같은 0.1.2의 [Fabric 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317314)과 [NeoForge 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317311)이 추가되었습니다.

## 카드 추가·변경

| 비교 항목 | 0.1.1 → 0.1.2 |
| --- | --- |
| 신규 / 삭제 카드 | 0종 / 0종 |
| 기본 카드 정의 | 263 → 263종 |
| 선택 모드 카드 정의 | 89 → 89종 |
| 일반판·애니메이티드판 합계 | 704 → 704개 |
| 전력·편성 비용·프레임·희귀도 변경 | 0종 |
| 배치·명령·키워드·외형 참조 변경 | 0종 |

두 버전의 **실제 Fabric 1.21.1 업로드 JAR**에서 최종 카드 카탈로그와 선택 모드 카드를 읽어 비교한 결과입니다. 현재 소스에서 과거 변경을 추정한 값이 아닙니다. 별도 추가 카드가 없으므로 기존 카드 수치와 편성은 [0.1.1 기준선](#mwent/version-0-1-1)을 이어갑니다.

## 플레이와 서버 안정화

0.1.2 작업 기록에서 덱 선택 툴바 겹침, 테이블 대기실의 플레이어 스킨 표시, AI 미지정 화면의 주민 미리보기를 수정한 것을 확인했습니다. AI 미지정 상태에서 시작할 수 없다는 기존 규칙은 유지합니다.

서버 쪽에서는 반복 상태 복사와 같은 틱의 중복 방송을 줄이고, 잘못된 PvP 입력의 불필요한 전체 방송을 막았습니다. AI 판단을 여러 틱으로 나누고 종료된 경기의 변경 없는 반복 방송을 중지했습니다. 이는 처리·화면 안정화이며 카드 전력이나 비용을 올리거나 내린 패치가 아닙니다.

26.3 업로드는 Java 25 별도 대상입니다. 기존 1.21.1 파일을 26.3에 대신 설치하지 마세요. 이 페이지의 역사적 파일 비교는 각종 외부 모드 조합의 실행 검증을 의미하지 않습니다.
