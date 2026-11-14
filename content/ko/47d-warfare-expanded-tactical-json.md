---
title: 전술 명령 JSON 참고
slug: expanded-tactical-json
order: 334
description: 전체 전술 JSON 예제, 파일 ID, 재로드·발급과 설정 한도를 확인합니다.
product: dochi-warfare-expanded
category: 전투 지원
section: support
status: Guide
version: 0.3.3
audience: 서버 관리자와 연동 제작자
---

## 직접 편집하기 전에

일반 제작은 [전술 명령 GUI 사용법](#dochi-warfare-expanded/expanded-tactical-orders)을 먼저 보세요. 이 페이지는 서버 파일을 직접 편집할 때 쓰는 참고입니다. 지원 배치를 만드는 방법은 [타임라인 튜토리얼](#dochi-warfare-expanded/expanded-support-timeline)에 있습니다.

## 전체 파일 예제

다음 전체 내용을 **config/dochi_warfare/vehicle_ai/tactical_orders/tutorial_air_support.json**에 저장합니다. ID는 파일명과 같은 **tutorial_air_support**입니다. 내장 정밀 폭격 기믹을 연결하므로 해당 기본 기믹과 SuperbWarfare가 준비되어 있어야 합니다. 이 파일은 생성할 때 자동 설치되는 기본 전술을 덮어쓰지 않습니다.

```json
{
  "schema": "dochi.warfare.tactical_order.v1",
  "id": "tutorial_air_support",
  "enabled": true,
  "name": "Tutorial air support",
  "description": "Request precision support at the designated point.",
  "gimmick": "sample_a10_point_strike",
  "appearance": {
    "default": "ww2_radio",
    "allowed": [
      "ww2_radio",
      "rugged_tablet"
    ]
  },
  "targeting": {
    "mode": "ground_point",
    "max_distance": 128,
    "require_line_of_sight": true,
    "heading": "caller_yaw"
  },
  "activation": {
    "hold_ticks": 20,
    "consume_self": 1,
    "allow_movement": true
  },
  "limits": {
    "cooldown_group": "air_support",
    "cooldown_ticks": 1200,
    "max_active_per_player": 1,
    "allowed_dimensions": [
      "minecraft:overworld"
    ]
  },
  "hud": {
    "bar_style": "horizontal",
    "guide_color": "#68D0DE",
    "bar_color": "#21AA41"
  },
  "sounds": {
    "rugged_tablet": {
      "cast": {
        "id": "minecraft:block.note_block.pling",
        "volume": 0.27,
        "pitch": 1.33,
        "loop": false
      }
    }
  }
}
```

## 재로드하고 아이템 발급하기

권한 레벨 2로 아래 명령을 실행합니다. 재로드 결과를 확인한 뒤 발급하세요. 첫 give는 정의의 기본 외형으로 한 개, 두 번째는 태블릿 외형으로 두 개를 지급합니다. 아이템 사용 순서는 [플레이어 조준 안내](#dochi-warfare-expanded/expanded-tactical-orders)에서 확인하세요.

```text
/dw tactical reload
/dw tactical give @s tutorial_air_support
/dw tactical give @s tutorial_air_support rugged_tablet 2
```

## 허용값과 제한

ID는 1~64자의 소문자·숫자·밑줄·하이픈이며 첫 글자는 소문자나 숫자입니다. 확장자·경로 구분자와 Windows 예약 이름은 사용할 수 없습니다. 서버 전술 목록은 최대 256개 파일, 개별 파일은 최대 32 KiB입니다. 파일명이 ID와 다르거나 알 수 없는 필드가 있으면 거부됩니다.

시간은 정상 20 TPS 기준입니다. 이 범위 안의 값도 원본 차량·무장, 로드된 지형과 실제 지원 경로가 유효해야 실행됩니다.

| 필드 | 허용값과 의미 |
| --- | --- |
| `schema` | 정확히 dochi.warfare.tactical_order.v1 |
| `id` | 같은 이름의 JSON 파일과 일치하는 전술 ID |
| `gimmick` | 저장된 기믹 타임라인 ID. 확장자 제외 |
| `targeting.mode` | ground_point만 지원 |
| `targeting.max_distance` | 8~512블록 |
| `targeting.heading` | caller_yaw만 지원. 유지 완료 시 방향 사용 |
| `activation.hold_ticks` | 정수 1~200틱, 0.05~10초 |
| `activation.consume_self` | 항상 1. 크리에이티브도 접수 시 한 개 소모 |
| `activation.allow_movement` | true면 유지 중 몸 이동 허용 |
| `limits.cooldown_group` | 같은 그룹의 전술이 플레이어별 대기시간 공유 |
| `limits.cooldown_ticks` | 정수 0~72000틱, 최대 1시간 |
| `limits.max_active_per_player` | 정수 1~8. 해당 플레이어의 진행 중 전술 요청 전체에 적용 |
| `limits.allowed_dimensions` | 빈 목록 불가. 명시적인 차원 ID 1~32개 |

## HUD·소리 설정

HUD 방향은 horizontal 또는 vertical입니다. 색상은 불투명 #RRGGBB이며 알파 채널은 지원하지 않습니다. hud를 생략하면 기본 세로 게이지와 기본 유도선·게이지 색을 사용합니다.

sounds는 ww2_radio·rugged_tablet별 equip·use·cast·fail을 설정합니다. 예제는 태블릿 접수음만 바꾸므로 나머지는 기기별 기본음을 유지합니다. 음량은 0~1, 피치는 0.5~2이며 반복은 use에만 허용됩니다. id를 빈 문자열로 지정하거나 음량을 0으로 두면 해당 소리를 끕니다. 사운드 ID는 리소스팩 등에 등록된 정의 ID이며 OGG 경로나 URL이 아닙니다.

기본 프리셋을 사용 중지할 때는 enabled를 false로 저장하세요. 삭제만 하면 다음 시작 때 복원될 수 있습니다. 사용자 설정은 별도 ID로 만들고 원본 파일을 보관합니다.
