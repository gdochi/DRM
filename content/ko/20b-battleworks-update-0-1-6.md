---
title: 0.1.6과 로더 선택
slug: battleworks-update-0-1-6
order: 208
description: 현재 배포 요구 조건과 26.3 DNPC 전투 범위입니다.
product: mob-editor
category: 0.1.6과 로더 선택
section: start
status: 사용 안내
version: 0.1.6
audience: 제작자 / 서버 운영자
---

## 현재 설치 기준

BattleWorks **0.1.6**의 로컬 배포 메타데이터를 기준으로 합니다. 이전 README나 0.1.4 배포 묶음의 Core 조건과 구분하세요.

| 대상 | Java | JAR이 선언한 DRM 조건 | NPC |
| --- | --- | --- | --- |
| Forge 1.20.1 | 17 | 0.2.8 이상 | 아래 입문 실습은 CustomNPCs |
| Fabric·NeoForge 1.21.1 | 21 | 0.2.9 이상 | CustomNPCs 선택 연동 |
| Fabric·NeoForge 26.3 | 25 | 0.2.8 이상 | DNPC 제공자, CustomNPCs 제외 |

DRM은 필수이고 CustomNPCs는 기존 대상에서도 선택 의존성입니다. 다만 이 위키의 기존 [첫 공격 실습](#mob-editor/battleworks-first-attack)은 **Forge·CustomNPCs** 작업 순서입니다. 이를 모든 DNPC 기능의 동일 지원으로 해석하지 마세요.

표는 현재 JAR의 선언이며 이전 모든 DRM이 실제로 비호환이라는 판정은 아닙니다. 기존 Fabric 포트는 `drm:battleworks_api=1` 기능도 필요합니다.

## 26.3에서 시작하기

같은 로더의 DRM·DNPC·BattleWorks를 설치하고 DNPC에 전투 문서를 적용합니다. 모델과 모션은 DRM의 지원 스택을 사용합니다. [26.3 안내](#core-fabric/minecraft-26-3)의 Java·제외 기능도 확인하세요.

내장 샘플 6종은 `config/dochi_rpg_maker/mobs/patterns/samples/`에 없는 파일만 설치합니다. 작업용 복사본은 `Save As`로 만듭니다. Better Combat 3연격 샘플은 호환 모드·라이브러리·NPC 모션 지원이 필요하며 해당 샘플의 실제 재생은 별도 미검증입니다.

구형 `summon_clone`은 26.3에서 거부합니다. CustomNPCs 클론 이름을 DNPC 템플릿으로 자동 변환하지 않습니다. DNPC 서버·클라이언트의 제한된 실기 검증이 있으며 외부 마법·모션 모드 조합 전체를 검증한 것은 아닙니다. 0.1.6 버전 정렬만을 위해 기존 모든 게임플레이 검사를 다시 실행하지는 않았습니다.
