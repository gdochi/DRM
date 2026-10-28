---
title: 0.2.9 업데이트
slug: release-notes-0-2-9
order: 4
description: 선택 NPC 연동, 복제 템플릿과 최신 수정 안내입니다.
product: core-fabric
category: 0.2.9 업데이트
section: getting-started
status: 사용 안내
version: 0.2.9
audience: 제작자 / 서버 운영자
---

## 현재 버전

DRM **0.2.9**의 기존 대상은 Forge 1.20.1 / Java 17, Fabric·NeoForge 1.21.1 / Java 21입니다. 별도 Fabric·NeoForge 26.3 빌드는 Java 25를 사용합니다. 26.3의 제외 기능과 검증 범위는 [26.3 안내](#core-fabric/minecraft-26-3)에서 확인하세요.

CustomNPCs와 DNPC는 선택 연동입니다. 기본 제작 도구를 쓰는 데 두 NPC 모드가 필수는 아니며, 각 NPC 기능은 해당 제공자가 필요합니다. 26.3부터 CustomNPCs는 영구 제외하고 선택적 DNPC actor/provider API를 사용합니다.

## 이번 변경으로 할 수 있는 것

- **DNPC 복제 템플릿 연결:** Core가 공개 템플릿 공급자 API를 제공합니다. DNPC에서 NPC와 장비를 v3 복제 템플릿으로 저장한 뒤 Spawn Control에서 선택합니다. [템플릿 만들기](#dochi-npc-core/npc-core-templates)를 참고하세요.
- **CustomNPCs 없는 모델 애니메이션:** 1.20.1·1.21.1에서 DNPC나 일반 엔티티에 모델 프로필을 적용했을 때 발생하던 CustomNPCs 클래스 로딩 오류를 수정했습니다. 이미 0.2.9를 쓰더라도 이 수정이 포함된 배포본으로 교체하고 게임을 재시작합니다.
- **도구 찾기:** 1.20.1·1.21.1에서 DRM이 설치된 NPC 제공자의 크리에이티브 탭에 자체 공개 도구를 등록합니다. DNPC와 CustomNPCs가 함께 있어도 같은 도구를 중복 등록하지 않습니다.
- **트레이너 기록 정리:** Fabric·NeoForge 1.21.1의 호환 Cobblemon Editor와 함께 Admin에서 전체 배틀 기록을 삭제할 수 있습니다. 횟수 초기화와 다른 작업이며 미지급 보상과 지급 표식도 지워집니다. [관리자 안내](#core-fabric/drm-administration)를 먼저 확인하세요.

템플릿 공급자 API가 없는 이전 코어에서는 그 연동만 사용할 수 없습니다. 모든 모드의 버전 번호를 같게 맞추는 규칙은 없습니다.

## 교체 순서

1. 서버 설정과 월드를 함께 백업합니다.
2. 서버와 모든 클라이언트에 같은 Minecraft·로더용 DRM을 설치합니다. 기존 파일과 새 파일을 동시에 두지 않습니다.
3. 사용 중인 애드온이 선언한 Core 요구 조건도 확인합니다.
4. 기존 대화·상점·퀘스트를 열고 파일 저장과 NPC 적용을 각각 확인합니다. 기본 템플릿을 고칠 때는 `Save As`를 사용합니다.

버전 번호가 같은 수정본도 있으므로 파일명만으로 수정 포함 여부를 판단하지 마세요. 이 안내의 버전은 **2026-10-28 로컬 배포본 기준**이며 공개 사이트 업로드 여부를 뜻하지 않습니다. [0.2.8 당시 변경 기록](#core/release-notes-0-2-8)은 그대로 보존합니다.
