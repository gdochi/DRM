---
title: 바닐라 HUD 대체
slug: hud-maker-vanilla
order: 112
description: HUD Maker에서 Minecraft 기본 HUD 슬롯을 DRM HUD 정의로 대체하는 기준입니다.
product: core
category: HUD Maker
section: hud-maker
status: 안정
version: 0.1.2
audience: HUD 제작자
tags:
  - hud
  - vanilla
---

## 대체 방식

HUD 정의의 `mode`가 `VANILLA_REPLACEMENT`이고 `replaceVanilla`가 지정되면, 해당 바닐라 HUD 슬롯을 DRM HUD 정의로 대체할 수 있습니다.

```json
{
  "mode": "VANILLA_REPLACEMENT",
  "replaceVanilla": "HEALTH",
  "enabled": true
}
```

대체 정의가 비활성화되어 있으면 바닐라 HUD가 그대로 사용됩니다.

## 대체 가능한 슬롯

| 값 | 대상 |
| --- | --- |
| `HEALTH` | 체력 |
| `ARMOR` | 방어도 |
| `FOOD` | 허기 |
| `AIR` | 산소 |
| `EXPERIENCE` | 경험치 |
| `HOTBAR` | 핫바 |
| `CROSSHAIR` | 조준점 |
| `MOUNT_HEALTH` | 탑승 생물 체력 |
| `BOSS_BAR` | 보스바 |

각 슬롯은 Minecraft 화면에서 위치와 렌더링 의미가 다릅니다. 체력과 경험치처럼 숫자/비율이 있는 슬롯은 BAR와 TEXT 요소를 함께 쓰기 좋습니다.

## 기본 체력 HUD

HUD Maker는 기본 체력 HUD 정의로 `hud/definitions/vanilla/health_bar.json`을 다룹니다. 이 파일은 `HEALTH` 슬롯 대체 예시로 사용할 수 있습니다.

체력 HUD는 보통 다음 요소를 가집니다.

| 요소 | 용도 |
| --- | --- |
| 배경 이미지 또는 패널 | 체력바 배경 |
| BAR | 현재 체력 비율 |
| TEXT | 현재 체력 숫자 또는 포맷 문자열 |

## 커스텀 오버레이와의 차이

| 구분 | CUSTOM_OVERLAY | VANILLA_REPLACEMENT |
| --- | --- | --- |
| 목적 | 새 HUD 추가 | 기본 HUD 교체 |
| 대상 | 자유 배치 | 특정 바닐라 슬롯 |
| 예시 | 화폐 지갑, 서버 상태 | 체력바, 허기바, 경험치바 |

## 제한

- 바닐라 HUD 전체를 하나의 설정으로 모두 바꾸는 방식이 아닙니다. 슬롯별 정의가 필요합니다.
- 대체 슬롯이 없는 커스텀 HUD는 `CUSTOM_OVERLAY`로 다루는 편이 맞습니다.
- 바닐라 슬롯을 숨기거나 대체해도 채팅, 디버그 화면, 플레이어 목록 같은 다른 Minecraft UI까지 바꾸는 것은 아닙니다.
