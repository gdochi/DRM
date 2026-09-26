---
title: 전투 제어·패링 범위·사망 연출
slug: mob-editor-parry
order: 270
description: 기본 공격·스크립트 중복을 막고 현재 패링 지원 범위와 사망 타임라인을 확인합니다.
product: mob-editor
section: combat
category: BattleWorks
status: 사용 안내
version: 0.1.3
audience: 입문자와 전투 콘텐츠 제작자
tags:
  - battleworks
  - combat
---

## 1. 기본 공격과 작성한 공격의 중복 막기

**Combat Rules → Combat → Suppress Native Attacks**를 켜면 BattleWorks가 작성한 전투 타이밍을 중심으로 기본 공격과 이동의 충돌을 줄입니다.

1. Hitbox만으로 완성된 첫 공격을 준비합니다.
2. 이 옵션을 켜 저장·적용합니다.
3. 준비·회복 구간에 별도의 기본 타격이 끼어드는지 봅니다.
4. 여전히 타격이나 모션이 겹치면 기존 CustomNPC 전투 스크립트를 확인합니다.

## 2. 기존 스크립트가 함께 움직이는 NPC

0.1.3의 **Suppress CustomNPC Scripts**는 기존 스크립트 실행을 억제해 두 전투 제어가 같은 NPC 모션을 계속 바꾸는 충돌을 줄이는 옵션입니다. 저장된 스크립트 데이터를 삭제하는 기능은 아닙니다.

이전 스크립트 보스를 BattleWorks 문서로 옮긴 경우에 검토합니다. 그 NPC의 스크립트가 전투 외 기능도 담당한다면 어떤 동작이 함께 중단되는지 확인하세요. 새 NPC의 첫 실습에서는 필요 없이 켤 이유가 없습니다.

## 3. 패링 설정의 실제 지원 범위

| 기능 | 0.1.3 소스 기준 |
| --- | --- |
| 공통 Magic Projectile Parry | 지원되는 Iron's Spellbooks 투사체 반사 연동 |
| 공통 Lock-on | 전역 허용 설정과 클라이언트 표현 설정 |
| Hitbox Debug | 실제 판정 확인용 표시. 별도 피해를 만들지 않음 |
| 문서의 Parry Window·Posture·Riposte 값 | 저장·편집되지만 해당 BattleWorks 패턴 런타임 소비는 확인되지 않음 |
| 패턴의 Parryable·Posture Damage On Parry | 이것만으로 체간 감소·근접 패링·리포스트가 완성되지 않음 |
| guard / evade 즉시 반응 패턴 | 별도 피해 반응 기능. [패시브 안내](#mob-editor/battleworks-passives) 참조 |

공통 주문 투사체 반사가 모든 모드의 모든 투사체를 지원하는 것은 아닙니다. 사용하는 제공 모드와 투사체를 실제로 시험하세요.

체간을 깎아야만 보스를 쓰러뜨리는 설계를 문서의 Parry 항목만으로 만들지 마세요. 먼저 현재 동작하는 Hitbox·패턴·페이즈로 전투를 완성합니다.

## 4. 전역 설정과 개인 화면 설정

| 파일 | 역할 |
| --- | --- |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | 공통 마법 패링·락온·히트박스 디버그 허용 |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | 패널 배치·락온 표현·모션 트레일·오디오 등 개인 설정 |

공통 규칙의 기본값은 마법 패링 On, 락온 On, 히트박스 디버그 Off입니다. 특정 NPC의 Pattern Core를 바꾸는 것과 전역 허용 설정을 바꾸는 것은 다릅니다.

**Disable vanilla music**은 클라이언트의 별도 오디오 설정입니다. 보스 전투 중인지와 무관하게 기본 음악을 억제하며 음악 볼륨 숫자 자체를 덮어쓰지 않습니다. 전투 BGM 설정은 [스킬·사운드·대사](#mob-editor/battleworks-skills-effects)를 참고하세요.

## 5. 사망 후 짧은 안내 만들기

1. **Combat Rules → Death**를 엽니다.
2. Enabled를 켜고 Duration을 `40틱`으로 정합니다.
3. 시체의 수평 이동을 잡아 두려면 **Lock Corpse**를 켭니다.
4. 0틱 이벤트에 Sound나 Title처럼 간단한 연출을 넣습니다.
5. 20틱에 두 번째 연출이 필요하면 별도 이벤트를 추가합니다.
6. 모든 실행·반복 시점이 Duration 안에 있는지 확인합니다.
7. NPC를 실제로 처치해 연출을 확인합니다.

사망 타임라인에서는 처치자가 타겟으로 사용될 수 있습니다. 플레이어용 타이틀·대사라면 수신 대상이 플레이어인지 확인합니다. 이미 죽은 시전자가 필요한 스킬이나 이동은 실패할 수 있으므로 사망 연출은 사운드·타이틀·호환 모션부터 시작합니다.

**Lock Corpse**는 내비게이션과 수평 이동을 멈추는 설정입니다. NPC의 드롭, 리스폰, 모든 시체 물리까지 이 화면에서 정하는 것은 아닙니다.

## 6. 완성 전 확인

1. 준비·회복 중 의도하지 않은 기본 공격이 없는지 봅니다.
2. 모션이 계속 초기화되면 스크립트와 다른 모션 요청을 확인합니다.
3. 패링의 미연결 설정을 승리 조건으로 쓰지 않았는지 확인합니다.
4. 사망 연출을 한 번의 처치로 끝까지 시험합니다.
5. 재전투·리스폰 후에도 의도한 파일을 사용하는지 확인합니다.
