import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
let patch = '*** Begin Patch\n';
const originals=new Map(), updates=new Map();
function edit(rel, fn) {
  const old = updates.get(rel) ?? fs.readFileSync(path.join(root, rel), 'utf8').replace(/\r\n/g, '\n');
  if(!originals.has(rel)) originals.set(rel,old);
  const value = fn(old);
  if (value === old) return;
  updates.set(rel,value);
}
const newVersion='Fabric 0.2.2 / NeoForge 0.2.1';
for (const locale of ['ko','en']) {
  const ko=locale==='ko';
  for (const name of fs.readdirSync(`content/${locale}`)) {
    edit(`content/${locale}/${name}`, s=>{
      if (s.includes('product: drm-cobblemon-editor') && !name.startsWith('49-')) {
        s=s.replaceAll('Fabric 0.2.1 / NeoForge 0.2.0',newVersion).replaceAll('Fabric 0.2.1 · NeoForge 0.2.0','Fabric 0.2.2 · NeoForge 0.2.1')
          .replaceAll('| Fabric 1.21.1 | 0.2.1 |','| Fabric 1.21.1 | 0.2.2 |').replaceAll('| NeoForge 1.21.1 | 0.2.0 |','| NeoForge 1.21.1 | 0.2.1 |')
          .replaceAll('dochi_cobblemon_editor-0.2.1-fabric','dochi_cobblemon_editor-0.2.2-fabric').replaceAll('dochi_cobblemon_editor-0.2.0-neoforge','dochi_cobblemon_editor-0.2.1-neoforge');
      }
      if(s.includes('product: dochi-warfare')) {
        s=s.replace('version: 0.2.9','version: Forge 0.3.0 / NeoForge 0.2.9');
        s=s.replace('현재 버전은 0.2.9이며 Forge 1.20.1과 NeoForge 1.21.1 빌드가 있습니다.', '현재 빌드는 Forge 1.20.1용 DW 0.3.0과 NeoForge 1.21.1용 DW 0.2.9입니다. Forge의 차량 AI는 별도 DWE 0.3.0이 필요합니다.')
          .replace('Current version: 0.2.9, with Forge 1.20.1 and NeoForge 1.21.1 builds.', 'Current builds: DW 0.3.0 for Forge 1.20.1 and DW 0.2.9 for NeoForge 1.21.1. Forge vehicle AI requires the separate DWE 0.3.0 addon.');
      }
      return s;
    });
  }
  edit(`content/${locale}/30-tacz-overview.md`,s=>s.replace(/(---\n\n)/, '$1'+(ko ?
    '## Forge 0.3.0 업데이트\n\nDW는 NPC 전투와 애드온 코어를 담당하며 차량 AI·무장·승무원·차량 프로필은 [Dochi\'s Warfare Expanded](#dochi-warfare-expanded/expanded-overview)로 분리되었습니다. DW만 설치해도 NPC 전투를 사용할 수 있습니다. 아래 0.2.9 기능 설명 중 차량 부분은 Forge에서 DWE를 추가했을 때 적용되며, NeoForge는 기존 0.2.9 구성을 사용합니다. 클론 보관함에는 삭제 확인과 복구용 보관 폴더가 추가되었습니다.\n\n':
    '## Forge 0.3.0 update\n\nDW owns NPC combat and the addon core. Vehicle AI, weapons, crew, and profiles now belong to [Dochi\'s Warfare Expanded](#dochi-warfare-expanded/expanded-overview). NPC combat works with DW alone. Vehicle features in the earlier 0.2.9 overview below require DWE on Forge; NeoForge retains its 0.2.9 implementation. The shared clone library now provides confirmed deletion and recoverable archived files.\n\n')));
  edit(`content/${locale}/31-tacz-setup.md`,s=>s.replaceAll(ko?'도치 워페어 0.2.9':'Dochi\'s Warfare 0.2.9',ko?'Forge 도치 워페어 0.3.0':'Forge Dochi\'s Warfare 0.3.0')
    .replace(ko?'## 로더별 0.2.9 빌드':'## Loader-specific 0.2.9 builds',ko?'## 로더별 빌드':'## Loader-specific builds')
    .replace('| Forge 47+ |','| Forge 47+ · DW 0.3.0 |').replace('| NeoForge | 1.21.1','| NeoForge · DW 0.2.9 | 1.21.1')
    .replace('0.2.9 JAR','0.3.0 JAR').replace('the 0.2.9 JAR','the 0.3.0 JAR')
    .replace('Native gun and vehicle support requires 0.8.9 final build `6effe4385`.','Supported native bridges accept 0.8.9 / 0.8.9.1 after compatibility checks; vehicle AI also requires DWE.')
    .replace(/(## (?:NPC별 GUI 열기|Open the per-NPC GUI))/, (ko?
      '## DWE 추가 설치\n\nForge 0.3.0에서 차량 편집·AI·승무원·지원 타임라인을 사용하려면 [DWE 0.3.0](#dochi-warfare-expanded/expanded-overview)과 SuperbWarfare 0.8.9 또는 0.8.9.1을 함께 설치합니다. NPC 총기 전투만 사용할 때는 DWE가 필요하지 않습니다. 같은 버전 번호라도 서버·클라이언트의 빌드를 맞추세요.\n\n':
      '## Add DWE for vehicles\n\nFor Forge 0.3.0 vehicle editing, AI, crew, and support timelines, install [DWE 0.3.0](#dochi-warfare-expanded/expanded-overview) and SuperbWarfare 0.8.9 or 0.8.9.1. NPC gun combat does not require DWE. Match actual builds on server and clients, even when version numbers are identical.\n\n')+'$1'));
  edit(`content/${locale}/41-warfare-vehicle-ai.md`,s=>s.replace(/(---\n\n)/,'$1'+(ko?
    'Forge 0.3.0에서는 이 페이지의 차량 기능을 **DWE**가 제공합니다. [DWE 설치와 저장 경로](#dochi-warfare-expanded/expanded-overview), [차량 반응 기믹](#dochi-warfare-expanded/expanded-vehicle-gimmicks), [폭격·증원 타임라인](#dochi-warfare-expanded/expanded-support-timeline)을 함께 확인하세요. NeoForge 0.2.9는 기존 DW 차량 기능을 사용합니다.\n\n':
    'On Forge 0.3.0, **DWE** supplies the vehicle functions below. See [DWE setup and files](#dochi-warfare-expanded/expanded-overview), [vehicle reactions](#dochi-warfare-expanded/expanded-vehicle-gimmicks), and [support timelines](#dochi-warfare-expanded/expanded-support-timeline). NeoForge 0.2.9 retains its existing DW vehicle implementation.\n\n')));
  edit(`content/${locale}/42-warfare-entity-clones.md`,s=>s+'\n'+(ko?
    '## Forge 0.3.0 클론 삭제와 복구\n\n보관함에서 NPC 또는 차량 항목을 선택하고 `삭제` → `삭제 확인`을 누릅니다. 종류와 ID를 확인하고 취소하려면 Escape 또는 취소를 사용합니다. 이미 소환한 엔티티에는 영향을 주지 않습니다.\n\n삭제 파일은 `config/dochi_warfare/entity_clones/.deleted/<종류>-<UUID>/`로 이동합니다. 복구하려면 원래 `npc` 또는 `vehicle` 폴더에 동명 파일이 없는지 확인한 뒤 파일을 옮깁니다. 클론을 참조하는 DWE 기믹 문서는 자동 수정되지 않으므로 참조도 확인하세요.\n\n차량 클론·승무원 기능에는 DWE가 필요합니다. 현재 저장명은 영문·숫자·밑줄·점·하이픈을 사용하며 한글 등은 밑줄로 정리됩니다. 타임라인에서는 실제 클론 ID를 선택하세요.\n':
    '## Forge 0.3.0 deletion and recovery\n\nSelect an NPC or vehicle entry, choose Delete, then confirm the displayed type and ID. Escape or Cancel returns without deletion. Already-spawned entities are unaffected.\n\nFiles move to `config/dochi_warfare/entity_clones/.deleted/<type>-<UUID>/`. To restore one, first ensure the original `npc` or `vehicle` folder has no same-name file, then move it back. DWE timelines referencing that clone are not automatically rewritten.\n\nVehicle clone and crew features require DWE. Saved names currently allow letters, digits, underscores, dots, and hyphens; other characters are sanitized to underscores. Select the actual clone ID in timelines.\n'));
  edit(`content/${locale}/44-warfare-server-ai-missions.md`,s=>{
    s=s.replace(ko?'서버 AI 제어와 Mission Planner':'Server AI Controls and Mission Planner',ko?'서버 AI 제어와 전투 지원':'Server AI and Combat Support');
    s=s.replace(/^description:.*$/m,ko?'description: NPC·차량 전역 AI 정책과 DWE 지원 타임라인의 연결을 안내합니다.':'description: Separate NPC and vehicle AI policies and use DWE support timelines.');
    s=s.slice(0,s.indexOf('## Mission Core Planner'))+(ko?
      '## 차량 정책과 전투 지원\n\nForge 0.3.0의 차량 전역 AI는 DWE가 관리하며 `config/dochi_warfare/vehicle_ai/server-ai.json`에 저장합니다. NPC 정책과 별개로 차량 동작을 중단하고 개별 설정은 보존합니다.\n\n폭격·기총 지원·차량 증원·NPC 이동은 [DWE 타임라인](#dochi-warfare-expanded/expanded-support-timeline)에서 제작하고 `/dw callgimmicks <이름> [x y z]`로 호출합니다. 기존 문서의 Mission Core Planner와 `/dw planner`는 현재 소스에서 확인되지 않아 현행 제작 절차에서 제외했습니다.\n':
      '## Vehicle policy and combat support\n\nOn Forge 0.3.0, DWE owns global vehicle AI at `config/dochi_warfare/vehicle_ai/server-ai.json`. It suspends vehicle behavior separately from NPC policy while preserving per-vehicle settings.\n\nAuthor bombing, gun support, vehicle reinforcements, and NPC movement in the [DWE timeline](#dochi-warfare-expanded/expanded-support-timeline), then invoke `/dw callgimmicks <name> [x y z]`. The previously documented Mission Core Planner and `/dw planner` could not be found in current sources and are excluded from current authoring instructions.\n');
    return s;
  });
  edit(`content/${locale}/48-cobblemon-release-notes-current.md`,s=>s.replace(/^description:.*$/m,ko?'description: 배틀 연출 적용, 파티 모델, 새 프리셋, 커스텀 보상과 포기 결과 처리입니다.':'description: Encounter bindings, party models, new presets, custom rewards, and forfeit outcomes.')+'\n'+(ko?
    '## 0.2.2 / 0.2.1 추가사항\n\n- [야생·RCT·PvP 연출 적용](#drm-cobblemon-editor/cobblemon-encounter-presentations): 종류별 글로벌 스위치와 JSON 연결, 야생 종류·RCT UUID 예외, 2인 PvP 양쪽 시점을 설정합니다.\n- [배틀 연출](#drm-cobblemon-editor/cobblemon-battle-presentation): 양쪽 파티 6슬롯, 슬롯별 Motion, 모델 크기 보정과 카메라 키프레임, 일반·보스·전설·파티 기본 연출을 추가했습니다. 문서 스키마는 5입니다.\n- 애프터 액션 아이템 찾기에 `내 인벤토리` 복사가 추가되었습니다. 이름·인챈트·총기 데이터 등 스택 컴포넌트를 보존하고 지급 수량은 액션 설정을 따릅니다.\n- 트레이너 배틀 포기는 `flee`, 일반 패배는 `loss`로 구분합니다. 포기 입력만으로 보상을 지급하지 않고 실제 배틀 결과가 확정된 뒤 처리합니다.\n- 연출 Load 목록을 반복 요청해 `rate limited`가 발생하던 문제를 수정했습니다.\n':
    '## Additions in 0.2.2 / 0.2.1\n\n- [Wild/RCT/PvP bindings](#drm-cobblemon-editor/cobblemon-encounter-presentations): category switches, saved scenes, species/UUID exceptions, and both perspectives in two-player PvP.\n- [Battle Presentation](#drm-cobblemon-editor/cobblemon-battle-presentation): six party slots per side, per-slot Motion, model fitting and camera keyframes, plus trainer/boss/legendary/party presets. Document schema is now 5.\n- After-action item selection can copy `My Inventory` stacks with names, enchantments, gun data, and other components. The action controls the awarded quantity.\n- Trainer forfeits produce `flee`; ordinary defeats remain `loss`. Rewards wait for the actual completed battle result.\n- Fixed repeated presentation Load-list requests that caused `rate limited` errors.\n'));
  edit(`content/${locale}/53-cobblemon-battle-presentation.md`,s=>s.replace('현재 스키마 4','현재 스키마 5').replace('구형 스키마 1–3','구형 스키마 1–4')+'\n'+(ko?
    '## 파티 모델과 Motion\n\n`Actors` → `Player` 또는 `Opponent` → `Trainer / 1–6`에서 양쪽 여섯 슬롯을 편집합니다. 각 슬롯의 `Render selected model`, `Transform`, `Pose`, `Motion`을 따로 설정합니다. 기본 연출은 파티 슬롯을 숨기며 `presets/vs_party_showcase.json`은 6+6 슬롯을 켠 선택용 예시입니다.\n\n에디터는 샘플 포켓몬을 표시하고 실전에는 서버가 해당 배틀 파티의 외형을 넣습니다. 없는 슬롯은 비어 있으며 숨긴 슬롯의 종족·기술·능력치·도구를 보내지 않습니다. 모델은 월드에 소환되지 않습니다.\n\nMotion에서 시작·끝, 진입·퇴장 시간, 오프셋·배율·유지 이동을 편집합니다. 참고용 JSON 옵션 `actors.*.animation.fitToModel`은 전신 크기 보정, `camera`는 최대 64개의 틱별 위치·확대·회전 키프레임입니다. 키프레임 목록 자체는 JSON에서 편집하고 에디터 미리보기로 확인합니다. `step`, `linear`, `ease_in`, `ease_out`, `ease_in_out`을 사용할 수 있습니다.\n\n## 새 기본 연출\n\n| 파일 | 기본 길이 | 용도 |\n| --- | --- | --- |\n| `presets/vs_trainer.json` | 144틱 / 7.2초 | 트레이너 등장과 이름 |\n| `presets/vs_pokemon.json` | 132틱 / 6.6초 | 야생 등장 |\n| `presets/vs_boss_trainer.json` | 168틱 / 8.4초 | 보스 트레이너 |\n| `presets/vs_legendary_pokemon.json` | 184틱 / 9.2초 | 전설 포켓몬 |\n| `presets/vs_party_showcase.json` | 168틱 / 8.4초 | 선택적 6+6 파티 표시 |\n\n길이는 정상 20 TPS 기준입니다. 새 일반 프리셋은 화면 전체 배경과 모델 전신 보정을 사용합니다. 기본 파일은 템플릿으로 두고 `Save As`로 사용자 파일을 만드세요. 사용자 JSON을 새 프리셋으로 일괄 덮어쓰지 마세요.\n\n`raster_warp`, `vs_ribbon`, `versus_mark`, `iris_shutter`, `arena_depth`, `wild_meadow`, `wild_grass`, `rift_sky`, `ground_shadow`, `light_sweep`, `dust_motes` 효과도 사용할 수 있습니다. 일반 야생·RCT·PvP에 연결하려면 [배틀 연출 적용](#drm-cobblemon-editor/cobblemon-encounter-presentations)을 사용합니다.\n':
    '## Party models and Motion\n\nChoose `Actors` → `Player` or `Opponent` → `Trainer / 1–6`. Each side has six slots with independent Render selected model, Transform, Pose, and Motion settings. Normal presets hide party slots; `presets/vs_party_showcase.json` enables an optional 6+6 example.\n\nPreviews use sample Pokémon; actual battles use server-provided party appearance. Missing slots stay empty. Hidden slots do not expose species, moves, stats, or held items. Models are not spawned into the world.\n\nMotion edits start/end, entrance/exit duration, offsets, scale, and drift. JSON reference: `actors.*.animation.fitToModel` fits the full model; `camera` holds up to 64 tick-based position/zoom/rotation keyframes. Edit that list in JSON and check it in the shared preview renderer. Supported easing includes step, linear, ease_in, ease_out, and ease_in_out. Presentation schema is 5, with earlier 1–4 documents readable.\n\n## New presets\n\n| File | Duration at 20 TPS | Purpose |\n| --- | --- | --- |\n| `presets/vs_trainer.json` | 144 ticks / 7.2 s | Trainer reveal and name |\n| `presets/vs_pokemon.json` | 132 ticks / 6.6 s | Wild encounter |\n| `presets/vs_boss_trainer.json` | 168 ticks / 8.4 s | Boss trainer |\n| `presets/vs_legendary_pokemon.json` | 184 ticks / 9.2 s | Legendary Pokémon |\n| `presets/vs_party_showcase.json` | 168 ticks / 8.4 s | Optional 6+6 party reveal |\n\nNew general presets use full-screen backgrounds and full-model fitting. Treat defaults as templates and use Save As for custom files. Do not overwrite user scenes wholesale.\n\nEffects include raster_warp, vs_ribbon, versus_mark, iris_shutter, arena_depth, wild_meadow, wild_grass, rift_sky, ground_shadow, light_sweep, and dust_motes. Bind scenes to ordinary wild, RCT, or PvP battles in [Encounter Presentations](#drm-cobblemon-editor/cobblemon-encounter-presentations).\n'));
  edit(`content/${locale}/57-cobblemon-conditions-rewards-pokemon.md`,s=>s+'\n'+(ko?
    '## 커스텀 아이템 보상과 포기 결과\n\n애프터 액션 → 아이템 → 찾기에서 `아이템 목록` 또는 `내 인벤토리`를 선택합니다. 인벤토리 스택은 원본을 소비하지 않고 이름·설명·인챈트·손상도·커스텀 데이터를 복사합니다. 지급 개수는 복사한 스택 수량이 아니라 액션의 수량을 따릅니다. `Clear saved item data`는 저장 컴포넌트만 제거하고 아이템 ID와 수량을 유지합니다.\n\n데이터를 가진 아이템 회수는 ID와 컴포넌트가 모두 같은 스택을 대상으로 하며 총량 부족 시 일부만 먼저 소비하지 않습니다. 참고용 JSON 필드는 `itemComponentsSnbt`입니다. 트레이너 배틀에서 플레이어가 포기한 뒤 확정된 패배는 `flee`, 일반 패배는 `loss`입니다. 보상 트리거를 따로 설정하세요.\n':
    '## Custom item rewards and forfeits\n\nOpen After Actions → Item → Find, then choose Items or My Inventory. Copying preserves names, lore, enchantments, damage, and custom data without consuming the original stack. Award quantity comes from the action. Clear saved item data removes components while retaining the item ID and quantity.\n\nComponent-aware removal matches both ID and components and does not partially consume an insufficient total. The optional JSON field is itemComponentsSnbt. A confirmed trainer defeat after player forfeit is flee; an ordinary defeat remains loss. Configure their reward triggers separately.\n'));
}
edit('site.config.json',s=>{
 const c=JSON.parse(s);
 const descriptions={en:'Forge DW 0.3.0 / NeoForge DW 0.2.9: NPC combat, ammunition, mercenaries and shared clones. Forge vehicle AI requires DWE.',ko:'Forge DW 0.3.0 / NeoForge DW 0.2.9: NPC 전투·탄약·용병·공용 클론. Forge 차량 AI는 DWE가 필요합니다.',ru:'DW: бой NPC и общие клоны. Для ИИ техники на Forge нужен DWE.',zh:'DW：NPC 战斗与共享克隆。Forge 载具 AI 需要 DWE。',ja:'DW：NPC戦闘と共通クローン。Forgeの車両AIにはDWEが必要です。'};
 for(const obj of [c.wikiMods.find(x=>x.id==='dochi-warfare'),c.products['dochi-warfare']]) for(const [l,v] of Object.entries(descriptions)) obj[l==='en'?'description':`description_${l}`]=v;
 for(const obj of [c.wikiMods.find(x=>x.id==='drm-cobblemon-editor'),c.products['drm-cobblemon-editor']]) {
   obj.description='Fabric 0.2.2 / NeoForge 0.2.1: trainers, wild/RCT/PvP presentations, party models, custom rewards, and service NPCs.';
   obj.description_ko='Fabric 0.2.2 / NeoForge 0.2.1: 트레이너, 야생·RCT·PvP 연출, 파티 모델, 커스텀 보상과 서비스 NPC를 제작합니다.';
 }
 const meta={label:"Dochi's Warfare Expanded",label_ko:"Dochi's Warfare Expanded",shortLabel:'Warfare Expanded',shortLabel_ko:'워페어 익스팬디드',description:'Forge 1.20.1 addon requiring DW 0.3.0: vehicle AI, reactions, bombing, reinforcements, and NPC movement.',description_ko:'DW 0.3.0 필수 Forge 1.20.1 애드온: 차량 AI·반응 기믹·폭격·증원·NPC 이동을 제작합니다.'};
 if(!c.wikiMods.some(x=>x.id==='dochi-warfare-expanded')) c.wikiMods.splice(c.wikiMods.findIndex(x=>x.id==='dochi-warfare')+1,0,{id:'dochi-warfare-expanded',...meta,type:'addon',product:'dochi-warfare-expanded'});
 c.products['dochi-warfare-expanded']={...meta,accent:'amber',sections:[{id:'overview',label:'Setup',label_ko:'설치와 시작'},{id:'vehicles',label:'Vehicle Reactions',label_ko:'차량 반응 기믹'},{id:'support',label:'Support Timelines',label_ko:'폭격·증원 타임라인'}]};
 return JSON.stringify(c,null,2)+'\n';
});
for(const [rel,value] of updates){
 const old=originals.get(rel),a=old.trimEnd().split('\n'),b=value.trimEnd().split('\n');
 let start=0,end=0;
 while(start<Math.min(a.length,b.length)&&a[start]===b[start])start++;
 while(end<Math.min(a.length,b.length)-start&&a[a.length-1-end]===b[b.length-1-end])end++;
 if(start===a.length&&start===b.length)continue;
 patch += `*** Update File: ${root.replaceAll('\\', '/')}/${rel}\n@@\n`;
 patch += a.slice(Math.max(0,start-2),start).map(s=>' '+s).join('\n')+'\n';
 const removed=a.slice(start,a.length-end),added=b.slice(start,b.length-end);
 if(removed.length)patch+=removed.map(s=>'-'+s).join('\n')+'\n';
 if(added.length)patch+=added.map(s=>'+'+s).join('\n')+'\n';
 if(end)patch+=a.slice(a.length-end,a.length-end+2).map(s=>' '+s).join('\n')+'\n';
}
patch+='*** End Patch\n';
process.stdout.write(patch);
