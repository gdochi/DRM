---
title: 명령어와 문제 해결
slug: dochi-real-armor-operations
order: 930
description: 관리자 명령어, 상태 확인, 디버그 사용법과 CustomNPCs·Easy NPC 문제 점검표입니다.
product: dochi-real-armor
category: 명령어와 문제 해결
section: operations
status: Stable
version: 0.1.1
audience: 서버 운영자와 모드팩 제작자
tags:
  - commands
  - troubleshooting
  - debug
---

## 관리자 명령어

모든 명령어는 권한 레벨 2가 필요합니다.

```mcfunction
/dochi_real_armor status
/dochi_real_armor split true
/dochi_real_armor durability false
/dochi_real_armor debug true
```

`status`는 부위별 방어, 내구도, 디버그, CustomNPCs 지원, Easy NPC 지원 상태를 출력합니다. 나머지 명령어는 공통 설정을 즉시 저장합니다.

## 디버그 사용법

피격 부위와 감소 전후 피해를 확인할 때만 디버그를 잠시 켭니다. 디버그는 결과 관찰 기능이므로 `/dochi_real_armor debug false` 이후에도 방어가 동일하게 작동해야 정상입니다.

## 문제 점검표

| 증상 | 확인할 항목 |
| --- | --- |
| 방어력이 적용되지 않음 | 방어 계산과 해당 NPC 호환 스위치가 ON인지 확인 |
| Easy NPC가 무시됨 | 엔티티 ID의 네임스페이스가 `easy_npc`인지, Easy NPC 지원이 ON인지 확인 |
| 하체 사격이 다른 부위로 나옴 | 서버에도 0.1.1이 설치됐는지 확인한 뒤 부위별 방어와 디버그를 켜서 재시험 |
| 모든 부위에 모든 장비가 적용됨 | 부위별 방어가 OFF이거나 피격점을 판정하지 못한 상황인지 확인 |
| 보호 인챈트가 작동하지 않음 | 보호 스위치와 피해의 방어·인챈트 무시 태그 확인 |
| GUI 변경이 거절됨 | 권한 레벨 2 계정으로 실행 |
| 중복 모드 오류로 시작 실패 | 구형 `cnpc_real_armor` 및 다른 버전 jar를 제거하고 한 릴리스만 유지 |

문제를 보고할 때는 `logs/latest.log`, 정확한 jar 파일명, NPC 및 무기 모드 버전, 관련 설정, 디버그 OFF에서도 같은 증상인지 함께 기록하세요.
