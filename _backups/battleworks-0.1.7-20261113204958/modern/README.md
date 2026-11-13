# Dochi's BattleWorks — Minecraft 26.3

Fabric·NeoForge / Minecraft 26.3 / Java 25 전용 독립 작업 공간입니다. 모드 버전은 0.1.7이며 ID `dochi_battleworks`, 문서 스키마 `dochi.battleworks.v1`, 기존 저장 경로를 유지합니다.

공통 구현은 `common/26.3`, 로더 구현은 `fabric-26.3`, `neoforge-26.3`에 있습니다. 1.21.1·Forge 1.20.1 소스는 이전 `[COMMON] Dochi`s BattleWorks` 작업 공간에 남아 있습니다.

0.1.7의 문서 Undo/Redo, 템플릿 검색·외형 미리보기, 지면 예고와 전장 복귀는 [사용법](docs/AUTHORING_TOOLS_0.1.7.ko.md)을 참고하세요. [DRM 독립 가능성 검토](docs/DRM_INDEPENDENCE_REVIEW_2026-11-07.ko.md)는 구현 변경과 별도로 보관합니다.

0.1.7은 DRM 없이도 실행됩니다. **배틀워크스 완드** (`dochi_battleworks:editor`) 또는 `/battleworks editor`로 같은 편집기를 엽니다. DRM 설치 시 공용 선택기·내비게이션·설정·Apply 연계를 유지합니다. [구현·검증 기록](docs/DRM_INDEPENDENCE_IMPLEMENTATION_2026-11-07.ko.md) · [설계 기록](docs/DRM_INDEPENDENCE_PLAN_2026-11-07.ko.md).

간단 편집, 공격 레시피, 내 기술함과 독립 복사를 제공합니다. 테스트 배틀·선택 공격 시험·관찰 복귀 단축키는 2026-11-08에 제거했습니다. [쉬운 공격 제작](docs/AUTHORING_USABILITY_0.1.7.ko.md) · [최종 JAR 제거 감사](verification/remove-test-battle-recheck-2026-11-08/RESULT.md).

## 빌드와 배포

Java 25와 Node.js가 필요합니다. 필요하면 `BATTLEWORKS_JAVA_HOME`을 지정합니다.

```powershell
node tools/build.cjs fabric build verifyPort263References
node tools/build.cjs neoforge build verifyPort263References
node tools/audit.cjs
```

`build.cmd` 또는 `build-all.ps1`은 두 로더를 빌드합니다. `-PwithoutDrm`을 빌드 인수에 추가하면 Core 없이 프로덕션 코드를 컴파일합니다. 선택 연동 검사는 로더별 `libs`의 실제 26.3 DRM JAR를 사용하며 다른 소스 작업 공간을 참조하지 않습니다. 캐시가 없는 새 환경에서는 `--online`을 추가하여 의존성을 내려받습니다.

배포 JAR는 각 로더의 `build/libs`와 루트 `jar-26.3`에 함께 보관합니다. Fabric과 NeoForge JAR를 서로 바꾸어 설치하지 마세요. DRM과 DNPC는 선택 사항입니다. DNPC 전투는 DNPC의 네이티브 공개 API로 독립 실행되며, DRM이 있으면 그 공급자·제어권 API를 우선합니다. NPC 모드 없이도 명시적으로 적용한 바닐라 몹과 임시 테스트 배틀을 사용할 수 있습니다. DRM 소유 커스텀 모델·스킬은 해당 서비스가 설치되어야 실행됩니다. 개발 시험용 DNPC JAR는 각 로더의 `runtime-libs`에 별도로 보관하며 애드온에 포함하지 않습니다.

NeoForge 실행 하한은 **26.3.0.76**이며 .76과 .95에서 최종 JAR의 실제 서버 동작을 확인했습니다. Fabric의 기존 배포 메타데이터는 Loader **0.19.5** / Fabric API **0.165.0+26.3** 이상을 요구하며, 이것을 검증된 최저 API 버전으로 단정하지 않습니다. 빌드 버전과 실행 하한은 별도 속성으로 관리합니다. [NeoForge 근거·시험 범위](neoforge-26.3/verification/LOADER_COMPATIBILITY.md)와 [Fabric 의존성 제약](fabric-26.3/verification/LOADER_COMPATIBILITY.md)을 참고하세요.

## 26.3 내장 테스트 샘플

기본 샘플 5종과 Better Combat 모션을 사용하는 3연격 샘플 `06_better_combat_combo.json`을 양쪽 JAR에 내장합니다. 시작 시 `config/dochi_rpg_maker/mobs/patterns/samples/`에 없는 파일만 설치하며 기존 파일은 보존합니다. Better Combat 샘플은 해당 모드·의존 라이브러리와 DRM 호환 휴머노이드 모션을 지원하는 NPC 렌더러가 필요합니다. [샘플 사용법](docs/port-26.3/SAMPLES.md)과 [커먼 비교·보완 기록](docs/port-26.3/COMMON_COMPARISON.md)을 참고하세요.

## DNPC 공급자

DRM 설치 시 `dochi_npc:actor` 공급자 API를 우선합니다. 단독 실행에서는 DNPC의 공개 설정·관계·템플릿 API와 `NpcAiOwnership.register(Predicate)`로 실제 DNPC를 연결합니다. DNPC를 복제 구현하거나 외부 소스를 변경하지 않습니다. 전투 중 만료되는 AI 소유권을 갱신하고, 해제 또는 만료 시 DNPC 기본 AI가 재개됩니다. 다른 모드의 소유권을 빼앗지 않습니다. 모델과 애니메이션의 소유권은 DRM에 있습니다.

26.3에는 CustomNPCs 네이티브 연결이 없습니다. 과거 Java 패키지명과 비활성 JSON 필드는 저장 호환용으로 유지합니다. 과거 CustomNPCs 복제 이름을 DNPC 템플릿으로 임의 변환하지 않으므로 `summon_clone`은 명시적으로 검증 오류를 반환합니다. Iron's Spellbooks 등 선택 외부 모드의 26.3 런타임 조합은 이번 DNPC 검증 범위에 포함하지 않았습니다.

[검증 결과와 재현 방법](docs/port-26.3/README.md), [기계 판독 상태](workspace-status.json), [배포물 감사](docs/port-26.3/audit.json)를 참고하세요. 컴파일 성공과 실제 게임 동작 검증은 구분해 기록합니다.
