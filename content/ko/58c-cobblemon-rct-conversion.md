---
title: RCT 트레이너를 DNPC로 바꾸기
slug: cobblemon-rct-conversion
order: 582
product: drm-cobblemon-editor
section: trainer
category: 트레이너 변환
status: 사용법
version: Fabric / NeoForge 0.2.9
description: 원래 RCT AI를 유지하거나 DRM AI로 변환하고, 생성·교체·프로필 저장을 구분합니다.
---

## 무엇을 바꾸는 기능인가요?
Cobblemon Editor 0.2.9는 서버에서 활성화한 **Radical Cobblemon Trainers** 트레이너 데이터를 읽어 DNPC 트레이너나 편집 가능한 프로필로 바꿉니다. 일반 트레이너 제작에는 RCT가 필요하지 않습니다. 원래 RCT 전투 AI를 유지하는 방식에는 호환되는 RCT API가 필요하고, DNPC 개체 생성·교체에는 DNPC도 설치해야 합니다.

## 변환 화면 열기
1. DRM의 **Add-on → Cobblemon Editor**를 엽니다.
2. **Port Radical Trainers**를 눌러 **Radical Trainer Porting**을 엽니다.
3. 이름이나 ID를 검색하고 변환할 트레이너에 체크합니다. 목록은 서버에 활성화된 데이터팩을 기준으로 하며 페이지를 넘겨 선택할 수 있습니다.
4. **Battle AI**와 **Conversion target**을 먼저 고르고 변환합니다. 첫 확인은 트레이너 한 명으로 진행하면 결과를 비교하기 쉽습니다.

## 전투 AI 고르기
| 선택 | 결과 |
| --- | --- |
| **Keep original RCT AI** | 원래 RCT AI·아이템 가방·배틀 규칙을 유지합니다. 기본 선택입니다. |
| **Convert to DRM AI** | 변환한 파티와 아이템을 DRM AI의 판단과 정책으로 사용합니다. |

RCT 유지와 DRM Strategy의 별도 아이템·기믹 정책을 같은 동작으로 해석하지 마세요. [전투 AI와 아이템](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items)에서 차이를 확인할 수 있습니다.

## 생성·교체·파일 저장 고르기
| **Conversion target** | 용도 |
| --- | --- |
| **Create DNPC trainers** | 근처에 새 DNPC 트레이너를 만듭니다. 기본 DNPC 스킨으로 시작하며 한 번에 최대 64명입니다. |
| **Replace matching RCT NPCs within 64 blocks** | 선택한 트레이너 ID와 일치하는 반경 64블록 내 RCT NPC를 DNPC로 교체합니다. 전투 중인 NPC 등은 건너뜁니다. |
| **Save trainer profiles only** | 개체를 만들거나 교체하지 않고 프로필 JSON을 저장합니다. |

프로필은 **config/dochi_rpg_maker/cobblemon/trainers/radical_ported/**에 저장합니다. 기존 NPC를 교체할 때는 원본 개체 유형·차원·NBT를 **config/dochi_rpg_maker/cobblemon/rct_conversion_backups/**에 먼저 저장합니다. 이 파일은 원본 기록이며 자동으로 되돌리는 UI를 뜻하지 않습니다.

## 변환 뒤 확인
완료 메시지의 성공·실패 수를 확인하고 만들어진 NPC의 이름·파티·지닌 도구·AI 방식을 확인합니다. 새 DNPC 스킨과 외형은 [NPC 편집기](#dochi-npc-core/npc-core-editor)에서 정합니다. 프로필 저장만 했다면 [첫 트레이너 적용](#drm-cobblemon-editor/cobblemon-editor-setup)의 NPC Apply 단계로 연결합니다.

원본 트레이너가 검색되지 않으면 서버의 활성 데이터팩부터 확인합니다. RCT AI 유지가 거부되면 호환 RCT API 설치 또는 DRM 변환을 선택합니다. 아래 절차는 소스에서 확인한 안내이며, 이번 촬영 환경에는 RCT가 없어 실제 RCT 변환 완료 영상은 제공하지 않습니다.
