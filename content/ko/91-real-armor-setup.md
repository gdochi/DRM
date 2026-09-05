---
title: Dochi's Real Armor 설치와 설정
slug: dochi-real-armor-setup
order: 910
description: 설치 요구 사항, 설정 경로, GUI 접근, 기본값과 이전 설정 이관 방법입니다.
product: dochi-real-armor
category: 설치와 설정
section: setup
status: Stable
version: 0.1.1
audience: 플레이어와 서버 운영자
tags:
  - installation
  - configuration
  - forge
---

## 요구 사항

- Minecraft 1.20.1
- Forge 47.x
- Java 17
- 방어를 적용할 CustomNPCs 또는 Easy NPC

클라이언트와 서버의 `mods` 폴더에 `dochi_real_armor-0.1.1.jar`를 넣습니다. 피해 계산과 설정 권한은 서버가 담당하므로 전용 서버에도 설치해야 합니다.

## 설정 화면 열기

타이틀 화면이나 일시 정지 메뉴에서 **Mods > Dochi's Real Armor > Config**를 엽니다. Dochi RPG Maker가 설치되어 있으면 DRM의 **Mods Config**에서 Dochi's Real Armor 탭을 선택할 수도 있습니다.

설정값은 ON/OFF 스위치로 조작합니다. 멀티플레이 설정 변경은 서버로 전송되며 권한 레벨 2가 필요합니다.

## 설정 파일과 자동 이관

공통 설정 파일은 다음 위치에 저장됩니다.

```text
config/dochi_real_armor-common.toml
```

새 파일이 없고 `config/cnpc_real_armor-common.toml`만 있으면 0.1.1이 기존 파일을 새 이름으로 복사합니다. 복구할 수 있도록 원본 파일은 삭제하지 않습니다.

## 기본값

| 설정 | 기본값 | 역할 |
| --- | --- | --- |
| CustomNPCs 지원 | ON | `customnpcs` 엔티티 처리 |
| Easy NPC 지원 | ON | `easy_npc` 엔티티 처리 |
| 방어 계산 | ON | 바닐라식 피해 감소 적용 |
| 방어 강인함 | ON | 바닐라 공식에 강인함 포함 |
| 보호 인챈트 | ON | 호환되는 보호 계열 인챈트 적용 |
| 넉백 저항 | ON | 엔티티 속성에 빠진 장비 저항 보완 |
| 동료 방어 덮어쓰기 | OFF | CustomNPCs 동료 방어 경로 교체 |
| 부위별 방어 | OFF | 피격 부위 슬롯만 방어에 사용 |
| 방어구 내구도 감소 | ON | 방어에 참여한 장비 내구도 감소 |
| 디버그 메시지 | OFF | 계산 결과만 보고하며 계산 여부와 무관 |

설정은 즉시 저장됩니다. jar를 교체했을 때는 게임과 서버를 재시작해야 합니다.
