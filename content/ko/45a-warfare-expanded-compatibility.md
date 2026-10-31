---
title: 차량 애드온 호환과 최신 수정
slug: expanded-compatibility
order: 315
description: DNPC 승무원, SuperbWarfare 버전과 실제 확인한 애드온 기종입니다.
product: dochi-warfare-expanded
category: 설치와 시작
section: overview
status: 사용 안내
version: 0.3.1
audience: 서버 운영자 / 제작자
---

## 함께 업데이트하기

DW·DWE **0.3.1**의 최신 수정본을 서버와 클라이언트에 함께 설치합니다. 지원 대상은 Forge 1.20.1·NeoForge 1.21.1입니다. DNPC 승무원은 CustomNPCs 없이 사용할 수 있고 기존 CNPC 연동도 유지합니다. DRM은 선택입니다.

현재 메타데이터가 허용하는 SuperbWarfare는 Forge **0.8.9 / 0.8.9.1 / 0.8.9.2**, NeoForge **0.8.9.1 / 0.8.9.2**입니다. 실제 네이티브 구조 검사도 통과해야 합니다. 호환되는 과거 빌드를 최신 번호만을 이유로 제외하지 않습니다.

## 확인한 애드온과 기종

아래는 실제 NPC 승무원의 이동·발사·재장전을 확인한 대표 기종입니다. 같은 팩의 모든 기종·특수 무장 지원을 뜻하지 않습니다.

| 애드온 | 확인 대상 | 기종 |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Vintage Vehicle Pack | Forge 1.20.1 | BMP-2 |
| Frontline Combat Pack | Forge 1.20.1 | BMP-2 |
| Spectacular Machines Addon | Forge 1.20.1 | Type 10 |

MCSP Bradley의 통과를 M1A2 지원으로 확대하지 않습니다. 조사한 MCSP M1A2는 원본 부품 정의가 대상 SW 직렬화기와 맞지 않았습니다.

**SuperbAddon 1.0.1 + SW 0.8.9.2**는 실제 폭발에서 외부 Mixin 충돌이 확인됐습니다. 같은 폭발 시험의 SW 0.8.9.1 조합은 통과했습니다. 탄피 생성이나 차량 발사 성공만으로 모든 외부 모드 조합이 호환된다고 판단하지 마세요.

## 0.3.1 최신 수정

- DNPC 운전수·포수와 우호·적대 관계, 아군 보호·전투 하차를 연결했습니다.
- 차량 파괴 시 NPC 승무원 처리 설정을 추가했습니다.
- 다른 월드에서 복원한 재장전이 지나치게 오래 대기하던 문제와 재장전 도중 정책 변경 시 탄약 중복·탄창 초과를 수정했습니다.
- 자기 차량이 아군 사선 장애물로 잡히던 문제를 고쳤으며 다른 아군의 사선 보호는 유지합니다.
- AH-6의 지상 표적 조준, 고정익 몸체 무장 조준과 미로딩 지형 부근의 과도한 상승을 보완했습니다.
- 반복 탄약·무장 처리와 조회를 줄였습니다. 개선 폭은 월드와 차량 구성에 따라 다릅니다.

초기 보고서에서 미통과였던 F-22 사격은 후속 수정과 양 로더의 실제 발사 시험에서 확인했습니다. 이를 자동 착륙이나 모든 비행 경로의 완료로 확대하지 않습니다. 최신 수정본으로 교체한 뒤 [차량 AI](#dochi-warfare/warfare-vehicle-ai)에서 원본 무장·좌석·재고·표적 조건을 확인하세요.
