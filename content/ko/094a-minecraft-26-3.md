---
title: Minecraft 26.3
slug: minecraft-26-3
order: 6
description: 별도 26.3 빌드, Java 25, NPC 제공자와 포팅 범위입니다.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: 사용 안내
version: 0.2.9 / Minecraft 26.3
audience: 제작자 / 서버 운영자
---

## 먼저 대상 버전을 고르세요

26.3은 Fabric·NeoForge / **Java 25**용 별도 빌드입니다. 1.20.1·1.21.1 JAR을 옮겨 설치하지 않습니다. 서버와 모든 클라이언트에서 Minecraft 버전과 로더를 맞춥니다. Fabric은 각 모드가 요구하는 Fabric API도 별도로 설치합니다.

아래 표는 2026-10-28의 **로컬 배포본 확인 결과**입니다. 공개 다운로드 여부나 전체 포팅 완료를 뜻하지 않습니다.

| 모드 | 26.3 버전 | 연동 조건 |
| --- | --- | --- |
| DRM | 0.2.9 | DNPC 선택 |
| NPC Core | 0.1.1 | DRM 없이 NPC 생성·편집·저장 |
| BattleWorks | 0.1.6 | DRM 필수, NPC 전투는 DNPC 제공자 사용 |
| Spawn Control | 0.1.4 | 단독 일반 스폰, DNPC 템플릿 연동 시 공개 템플릿 API 필요 |
| Real Armor | 0.1.4 | Easy NPC·DNPC 선택 연동 |
| Minigames | 0.1.3 | DRM 선택 |
| MapIcon Integration | 0.1.2 | DRM 필수, 지도 모드와 DNPC는 각각 선택 |

Cobblemon Editor의 이번 확인 대상은 Fabric·NeoForge **1.21.1**, Warfare·Expanded는 Forge **1.20.1**·NeoForge **1.21.1**입니다. 이 표를 해당 모드의 26.3 지원 안내로 사용하지 마세요.

## NPC와 편집 기능

**26.3부터 CustomNPCs는 영구 제외합니다.** 향후 CustomNPCs 업데이트를 설치 조건으로 기다리지 않습니다. DRM과 DNPC는 서로 선택 연동이고, DNPC는 DRM 없이 기본 NPC를 만들 수 있습니다. 다른 애드온의 DRM 필수 여부는 위 표처럼 각각 다릅니다.

26.3 DRM에는 **Faction Editor와 연결된 플레이어 세력 화면·GUI Maker 세력 컴포넌트가 없습니다.** 구형 저장 파일을 보존하는 것과 편집 기능을 제공하는 것은 다릅니다. DNPC의 선택적 관계 API는 별개입니다. Fabric의 Item Editor·Stat Builder 제외도 유지하며 NeoForge와 동일한 편집기 목록으로 안내하지 않습니다.

## 처음 연결하기

1. 같은 로더의 DRM과 DNPC를 준비하고 NPC를 생성합니다.
2. DNPC에서 외형·장비·행동을 저장합니다. 재사용하려면 [v3 복제 템플릿](#dochi-npc-core/npc-core-templates)을 만듭니다.
3. BattleWorks는 NPC를 대상으로 전투 문서를 저장·적용합니다. 내장 샘플 6종은 `config/dochi_rpg_maker/mobs/patterns/samples/`에 없는 파일만 설치합니다.
4. Spawn Control의 배치형 스포너에서는 **NPC 복제 템플레이트** 소스를 선택합니다. 구형 CustomNPCs 클론을 DNPC로 자동 변환하지 않습니다.
5. 실제 월드에서 상호작용·저장·재접속과 사용하는 애드온 기능을 확인합니다.

BattleWorks의 구형 `summon_clone`은 26.3에서 검증 오류입니다. Better Combat 샘플은 실제 호환 모드와 모션 제공자가 필요하며 샘플 포함만으로 모션 실기 검증이 완료된 것은 아닙니다. MWENT의 26.3 거래 정의 변경은 월드 재접속 또는 서버 재시작 후 반영합니다.

## 검증과 이전 데이터

DRM의 클라이언트·전용 서버 구동과 JSON 네트워크 검사가 기록되어 있지만, 전체 GUI·거래·기존 월드 이행의 포팅 완료를 의미하지 않습니다. Core에 남아 있는 구버전 반사 경로 정리도 별도 미완료 항목이며 CustomNPCs 지원 근거가 아닙니다.

DNPC의 단독 실행과 Spawn Control 배치형 템플릿 생성에는 실제 26.3 검증 기록이 있습니다. COMMON에서 확인한 DNPC 템플릿 자연 스폰을 26.3까지 검증한 것으로 확대하지 않습니다. 이전 월드는 복사본에서 확인하고 설정·월드를 함께 백업합니다.

개발자가 빌드할 경우 최종 배포 JAR은 각 로더의 `build/libs/`와 해당 모드 26.3 작업공간의 `jar-26.3/`에 보관됩니다. 이전 대상의 `jar/`와 구분합니다.
