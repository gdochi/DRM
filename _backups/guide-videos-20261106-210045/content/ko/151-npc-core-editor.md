---
title: 외형·장비·일 시키기
slug: npc-core-editor
order: 1510
description: NPC를 꾸미고 일할 장소와 도구를 정합니다.
product: dochi-npc-core
category: NPC·시간표·고용
section: editor
status: 사용 안내
version: 0.1.3
audience: 제작자 / 서버 운영자
---

## 외형과 장비 바꾸기

코어로 NPC를 우클릭해 편집 화면을 엽니다. 이름·스킨·몸 비율·장비를 고르고 저장합니다. 기본 인간형 외에도 설치한 모델을 고를 수 있으며, Gecko 모델에는 GeckoLib가 필요합니다.

![DNPC 편집기의 Identity 화면. 왼쪽에 기능 목록, 가운데에 NPC 미리보기, 오른쪽에 이름과 칭호 입력란이 있습니다.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1 영문 UI. 왼쪽 Identity → 오른쪽 Information의 Name에서 이름을 입력하고 상단 Save to NPC로 저장합니다. Style은 이름과 칭호의 글자 모양을 정합니다.")

### 스킨과 몸 크기 바꾸기

왼쪽 **Appearance & Model**을 고릅니다. **Humanoid** 모델에서는 **Skin** 옆 찾기로 스킨을 고르고, **Scale**로 전체 크기를 조절합니다. **Slim arms**는 얇은 팔 형태를 선택합니다. 부위마다 따로 키우려면 **Part scales**, 실제 충돌 크기를 조절하려면 **Hitbox**를 엽니다.

![DNPC 0.1.2 NeoForge 1.21.1의 Appearance & Model. 오른쪽에 Humanoid 모델, Skin, Scale과 Slim arms 설정이 보입니다.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "외형은 가운데 미리보기에서 확인합니다. 이 화면의 Scale은 전체 외형 크기이며, 작업 장소나 공격 범위를 정하는 값이 아닙니다.")

포저에서는 자세를 만들고 여러 자세를 이어 움직임을 만듭니다. 장비를 무작위로 바꾸고 싶으면 슬롯별 후보와 확률을 정합니다.

### 무기·탄약 설정 찾기

갑옷은 **Inventory & Equipment → Equipment**의 **Head / Chest / Legs / Feet**에 넣습니다. 가운데 **NPC storage**에 보관한 갑옷은 착용한 갑옷과 다릅니다.

![DNPC Inventory & Equipment. 가운데 NPC storage와 Player inventory, 오른쪽에 Head, Chest, Legs, Feet 착용 슬롯이 있습니다.](assets/media/guides/dnpc-012-neo1211/dnpc-inventory.png "DNPC 0.1.2 / NeoForge 1.21.1. 보관함과 착용 슬롯을 구분합니다. 방어구 효과를 더 설정하려면 Real Armor 안내를 확인하세요.")

왼쪽 **Weapon & ammunition**을 누르면 오른쪽에 무기 설정이 나옵니다. **Idle hands**는 평소에 들 물건, **Combat hands**는 전투 중 들 물건입니다. 원거리 무기와 탄약은 **Ranged weapon**, **Ammunition**에서 고릅니다.

![DNPC의 Weapon & ammunition 화면. 오른쪽 Weapons 탭에 평소와 전투 중 손에 들 물건, 원거리 무기, 탄약 슬롯이 보입니다.](assets/media/guides/dnpc-013-neo1211/dnpc-weapons.png "DNPC 0.1.3 / NeoForge 1.21.1 영문 UI. Weapons 탭의 슬롯을 확인하세요. 가운데 NPC storage는 보관함이고, 오른쪽 손·무기 슬롯과 구분됩니다.")

## 일을 시키는 순서

1. 왼쪽 **Schedule**에서 일할 시간대를 추가합니다.
2. 채굴·농사·벌목·수집·운반 등 할 일을 고릅니다.
3. 일할 장소와 범위, 사용할 도구, 재료나 완성품을 넣을 보관함을 정합니다.
4. NPC에게 필요한 도구와 아이템을 준비하고 저장합니다.

작업하지 않으면 시간대가 맞는지, 필요한 도구가 있는지, 작업 장소와 보관함까지 걸어갈 수 있는지 확인합니다. 채굴 대상은 블록이나 태그를 선택해 좁힐 수 있습니다.

구체적인 시간 설정은 [시간표](#dochi-npc-core/npc-core-schedules), 음식 만들기는 [조리 작업](#dochi-npc-core/npc-core-cooking)에서 설명합니다.

## 움직이지 않는 안내 NPC 만들기

![DNPC의 Movement AI 화면. 오른쪽 아래에 Lock position과 Lock rotation 스위치가 있습니다.](assets/media/guides/dnpc-013-neo1211/dnpc-movement.png "DNPC 0.1.3 / NeoForge 1.21.1 영문 UI. 왼쪽 Movement AI를 엽니다. 오른쪽 아래 Lock position이 위치 고정, Lock rotation이 회전 고정입니다.")

**Movement AI → Lock position**을 켜면 그 자리에 머뭅니다. **Lock rotation**은 따로 설정해 몸과 고개 방향도 고정합니다. 고정한 회전은 주변 플레이어 바라보기보다 우선합니다.

**전투 AI → 무적**은 모든 피해를 막습니다. 플레이어에게만 피해를 받지 않게 하려면 **플레이어 피해 허용**을 끕니다.

![DNPC 0.1.2 NeoForge 1.21.1의 Combat AI. 체력·근접 피해·공격 간격 아래에 Invulnerable과 Allow player damage가 보입니다.](assets/media/guides/dnpc-012-neo1211/dnpc-combat.png "Invulnerable은 모든 피해를 막는 설정입니다. Allow player damage는 플레이어에게 받는 피해를 별도로 정합니다.")

코블몬 트레이너는 위치 고정을 켜도 설정된 대시·복귀 동작을 하고 다시 자리로 돌아올 수 있습니다.

## 플레이어가 NPC를 고용하게 하기

이 기능에는 **DRM**이 필요합니다.

1. 고용될 NPC의 외형·장비·작업을 완성해 저장합니다.
2. DRM의 **고용 에디터**에서 모집 항목을 만듭니다.
3. 사용할 NPC, 시작 위치, 가격·기간과 플레이어가 바꿀 수 있는 작업을 정해 저장합니다.
4. 모집 담당 NPC의 **NPC Apply → Function → NPC 고용**에 적용합니다.
5. 플레이어가 모집 NPC에게 말을 걸어 고용합니다. 기본 **H → 내 고용**에서 정지·복귀·연장·해고와 짐 회수를 합니다.

계약이 끝나도 남은 짐을 회수할 때까지 NPC는 남습니다.

### 고용될 NPC와 계약을 고르는 화면

아래는 **DNPC 0.1.2 + DRM 0.3.1 / NeoForge 1.21.1**의 고용 편집기입니다. **NPC** 탭의 **Prepared NPC JSON set** 옆 찾기에서 [저장한 NPC 템플릿](#dochi-npc-core/npc-core-templates)을 고릅니다. 기본 **Default NPC** 대신 내 작업자를 고르면 그 NPC의 외형과 준비된 작업을 모집 항목에 사용할 수 있습니다.

![Employment Editor의 NPC 탭. Prepared NPC JSON set, NPC display name과 고용 제공 스위치가 보입니다.](assets/media/guides/dnpc-012-neo1211/employment-npc.png "이 탭은 고용될 NPC를 고릅니다. 모집 담당 NPC에게 붙일 대화나 상점을 고르는 탭이 아닙니다.")

**Contract**에서 지불 수단·가격·기간을 정합니다. 화면의 예시는 에메랄드 10개, **20 Minutes**, **Real Ticks**입니다. Real Ticks는 서버가 진행한 틱으로, World Ticks는 수면·시간 명령으로 바뀌는 월드 시각으로 기간을 셉니다.

![Contract 탭의 에메랄드 비용 10, 고용 기간 20분, Real Ticks와 Renew contract 설정.](assets/media/guides/dnpc-012-neo1211/employment-contract.png "기간 숫자만 읽지 말고 Period unit과 Duration clock도 함께 확인합니다. 계약을 갱신할 수 있는지는 Renew contract에서 정합니다.")

**Allowed Work**는 고용한 플레이어가 맡길 수 있는 역할을 정합니다. 준비한 NPC에 없는 작업이 이 스위치만으로 새로 만들어지지는 않습니다.

## 음악가 NPC 만들기

1.20.1·1.21.1에서 **Immersive Melodies**를 설치하면 시간표에 악기 연주를 넣을 수 있습니다. 곡·악기·연주할 장소를 고릅니다.

**장착한 악기만 사용**은 NPC가 실제 악기를 들고 있어야 합니다. **없으면 임시 악기 지급**은 연주하는 동안만 악기를 보여 줍니다. 임시 악기는 사망 드롭으로 남지 않습니다.
