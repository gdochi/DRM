---
title: Dochi's Real Armor 개요
slug: dochi-real-armor-overview
order: 900
description: 0.1.1의 역할, 지원 NPC 모드, 방어 처리 위치와 호환 범위를 설명합니다.
product: dochi-real-armor
category: 개요
section: overview
status: Stable
version: 0.1.1
audience: 플레이어, 서버 운영자, 모드팩 제작자
tags:
  - armor
  - customnpcs
  - easy npc
---

## 모드의 역할

**Dochi's Real Armor**는 지원 NPC가 착용한 방어구를 바닐라 방식의 피해 감소에 참여시키는 Forge 1.20.1 호환 모드입니다. 모드 ID와 명령어 루트는 `dochi_real_armor`입니다.

두 NPC 연동은 선택 사항이며 각각 따로 켜고 끌 수 있습니다.

| NPC 모드 | 인식 기준 | 설정 키 |
| --- | --- | --- |
| CustomNPCs | 엔티티 레지스트리 네임스페이스 `customnpcs` | `enableCustomNpcs` |
| Easy NPC | 엔티티 레지스트리 네임스페이스 `easy_npc` | `enableEasyNpc` |

어느 NPC 모드도 필수 의존성은 아니지만 실제 방어 기능을 쓰려면 둘 중 하나가 필요합니다.

## 피해 처리 방식

방어 계산은 Minecraft의 방어 흡수 단계에서 한 번만 실행됩니다. 디버그 메시지는 완료된 결과를 보여 줄 뿐이므로 디버그를 꺼도 방어 계산은 계속됩니다.

NPC의 바닐라 방어 속성을 읽거나, 장착 아이템의 속성 수정자를 직접 합산하거나, 두 방식 중 적절한 값을 자동 선택할 수 있습니다. 강인함, 보호 인챈트, 넉백 저항, 방어구 내구도 감소도 각각 설정할 수 있습니다.

:::note 적용 경계
방어 무시 태그가 붙은 피해에는 방어구가 적용되지 않습니다. Minecraft의 일반 LivingEntity 방어 단계를 건너뛰는 무기나 모드는 별도 호환 어댑터가 필요할 수 있습니다.
:::

## 부위별 방어

부위별 방어를 켜면 모든 방어구가 아니라 피격 부위에 대응하는 슬롯만 사용합니다.

| 피격 부위 | 사용 슬롯 |
| --- | --- |
| 머리 | 투구 |
| 가슴 | 흉갑 |
| 다리 | 레깅스와 부츠 |
| 판정 불가 | 모든 방어구 슬롯 |

Easy NPC의 발사체 피격은 발사체 이동 경로와 엔티티 충돌 상자를 교차해 판정합니다. 따라서 TACZ 계열처럼 빠르거나 외부에서 관리되는 탄환의 하체 피격도 다리로 인식하기 쉬워졌습니다.

Dochi RPG Maker 0.1.4 이상이 있으면 DRM의 Mods Config에 탭이 등록됩니다. DRM이 없을 때는 Forge 모드 목록에서 동일한 형태의 독립 설정 화면을 엽니다.
