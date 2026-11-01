---
title: 서버 AI 제어와 전투 지원
slug: warfare-server-ai-missions
order: 385
description: NPC·차량 전역 AI 정책과 DWE 지원 타임라인의 연결을 안내합니다.
product: dochi-warfare
category: 월드 도구
section: tools
status: Draft
version: 0.3.1
audience: 서버 운영자와 맵 제작자
tags:
  - server
  - ai
  - missions
---

## NPC 설정이 켜져 있는데 AI가 동작하지 않을 때

서버 정책이 그 기능을 막으면 NPC에서 켜도 실행되지 않습니다. **Minecraft의 Mods → Dochi’s Warfare → Config → DW Server AI**에서 서버 전체의 허용 상태를 확인합니다. NPC를 우클릭해 여는 Senses·Cover 화면과는 다른 설정입니다. 변경을 저장하려면 서버 운영 권한 레벨 2가 필요합니다.

![DW 자체 Config의 서버 AI 정책 화면.](assets/media/guides/warfare-031-neo1211/dw-server-ai-policy.png "DW 0.3.1 / NeoForge 1.21.1 실제 서버에서 받은 정책입니다. 왼쪽 기능 버튼의 ON/OFF, 가운데 Available, 오른쪽 OFF일 때의 설명을 함께 읽습니다. 이 실행의 초기 정책은 모두 ON이었습니다.")

1. 막힌 기능을 찾습니다. 예를 들어 **Cover AI**는 엄폐, **Hearing / investigation**은 소리 감지·조사입니다.
2. 서버에서 허용하려면 해당 버튼을 ON으로 둡니다.
3. 아래 **Save**를 눌러 서버에 반영합니다.
4. 그 뒤 해당 NPC의 Cover·Senses 등 개별 설정으로 돌아가 조건을 맞춥니다.

**Basic combat preset**은 확장 AI 기능을 한꺼번에 제한합니다. **Allow all features**는 전역 제한을 풉니다. 모든 NPC의 세부 행동을 같은 값으로 덮어쓰는 버튼은 아닙니다. 기본값을 모르는 상태에서 프리셋을 누르기 전에 현재 정책을 확인하세요.

## 기능 사이의 연결

| 서버 정책 | 함께 볼 것 |
| --- | --- |
| Combat target memory | 끄면 전투 기억을 쓰는 Suppression fire도 사용할 수 없습니다. |
| Tactical movement / Cover AI | 전역 허용 외에 NPC의 개별 이동·엄폐 설정과 도달 가능한 지형이 필요합니다. |
| Mercenary AI | 꺼도 계약 만료·소유권 보호·사격 중지 명령은 유지됩니다. 계약 시간을 멈추는 설정이 아닙니다. |
| NPC grenade AI / Booby traps | 수류탄 투척과 설치형 함정은 별개 정책입니다. |

제한한 기능의 NPC 저장값은 남아 있으므로 서버에서 다시 허용하면 재사용합니다. 서버 정책 파일은 `config/dochi_warfare/server-ai.json`입니다.

## 차량과 폭격 지원 연결

차량 AI의 전역 정책은 **DWE 0.3.1**이 따로 관리합니다. NPC 정책을 바꿨다고 차량의 모든 동작까지 같은 방식으로 바뀌지는 않습니다. 차량 정책 파일은 `config/dochi_warfare/vehicle_ai/server-ai.json`입니다.

폭격·기총 지원·차량 증원·NPC 이동은 [DWE 지원 타임라인](#dochi-warfare-expanded/expanded-support-timeline)에서 만듭니다.

![DWE 지원 연출의 Timeline 편집 화면.](assets/media/guides/warfare-expanded-031-neo1211/dwe-gimmick.png "DWE 0.3.1 / NeoForge 1.21.1 실제 편집 화면입니다. 서버 정책은 기능 허용 여부, 이 타임라인은 호출했을 때의 실행 순서를 정합니다. 이 사진만으로 폭격 실행까지 검증한 것은 아닙니다.")

저장한 지원 이름은 `/dw callgimmicks <이름> [x y z]`로 호출합니다. 제작부터 월드 실행까지의 단계는 위 타임라인 안내를 따릅니다.
