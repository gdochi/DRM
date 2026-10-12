import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const updates = new Map();
function read(file) { return updates.get(file) ?? fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n'); }
function edit(file, transform) { updates.set(file, transform(read(file))); }
function replace(file, before, after) {
  edit(file, text => {
    if (!text.includes(before)) throw new Error(`Missing replacement in ${file}: ${before.slice(0, 70)}`);
    return text.replace(before, after);
  });
}

edit('site.config.json', raw => {
  const config = JSON.parse(raw);
  const descriptions = {
    core: ["Forge 1.20.1 documentation for DRM Core 0.2.2.", "DRM Core 0.2.2의 Forge 1.20.1 문서입니다."],
    'core-fabric': ["Fabric / NeoForge 1.21.1 documentation for DRM Core 0.2.5.", "DRM Core 0.2.5의 Fabric·NeoForge 1.21.1 공용 문서입니다."],
    'mob-editor': ["BattleWorks 0.1.4 for Forge and NeoForge: NPC combat, hitboxes, phases and effects.", "Forge·NeoForge BattleWorks 0.1.4: NPC 전투, 히트박스, 페이즈와 효과를 제작합니다."],
    'drm-cobblemon-editor': ["Fabric / NeoForge 0.2.4: trainers, battle schedulers, saved block stages, FX and service NPCs.", "Fabric·NeoForge 0.2.4: 트레이너, 배틀 스케줄러, 블록 무대·FX와 서비스 NPC를 제작합니다."],
    'dochi-warfare': ["Forge / NeoForge DW 0.3.0: NPC combat, ammunition, mercenaries and shared clones. Vehicle AI requires DWE.", "Forge·NeoForge DW 0.3.0: NPC 전투·탄약·용병·공용 클론. 차량 AI는 DWE가 필요합니다."],
    'dochi-warfare-expanded': ["Forge 1.20.1 / NeoForge 1.21.1 addon requiring DW 0.3.0: vehicle AI, reactions and support timelines.", "DW 0.3.0 필수 Forge 1.20.1·NeoForge 1.21.1 애드온: 차량 AI·반응 기믹·지원 타임라인입니다."]
  };
  for (const [id, [en, ko]] of Object.entries(descriptions)) {
    const product = config.products[id];
    product.description = en; product.description_ko = ko;
    for (const locale of ['ru', 'zh', 'ja']) {
      if (!product[`description_${locale}`]) continue;
      if (id === 'core') product[`description_${locale}`] = product[`description_${locale}`].replaceAll('0.2.1', '0.2.2');
      else if (id === 'core-fabric') product[`description_${locale}`] = product[`description_${locale}`].replaceAll('0.2.4', '0.2.5');
      else if (id === 'mob-editor') product[`description_${locale}`] = product[`description_${locale}`].replaceAll('0.1.3', '0.1.4');
      else delete product[`description_${locale}`];
    }
    const card = config.wikiMods.find(m => m.product === id);
    card.description = en; card.description_ko = ko;
    for (const locale of ['ru', 'zh', 'ja']) {
      if (id === 'core' || id === 'core-fabric' || id === 'mob-editor') {
        const [from, to] = id === 'core' ? ['0.2.1', '0.2.2'] : id === 'core-fabric' ? ['0.2.4', '0.2.5'] : ['0.1.3', '0.1.4'];
        if (card[`description_${locale}`]) card[`description_${locale}`] = card[`description_${locale}`].replaceAll(from, to);
      } else delete card[`description_${locale}`];
    }
  }
  config.wikiMods.find(m => m.id === 'dochi-warfare-expanded').logo = 'assets/mod-logos/dochi_warfare_expanded.png';
  config.wikiMods.find(m => m.id === 'dochi-warfare-expanded').logoAlt = "Dochi's Warfare Expanded logo";
  const cobble = config.products['drm-cobblemon-editor'];
  cobble.sections.splice(cobble.sections.findIndex(s => s.id === 'presentation') + 1, 0, {
    id: 'scheduler', label: 'Battle Scheduler', label_ko: '배틀 스케줄러',
    description: 'Clone actors, scenes, battle flow and automatic area entry.',
    description_ko: '클론 배우, 장면, 배틀 진행과 자동 영역 입장을 연결합니다.'
  });
  function addProduct(id, label, shortLabel, shortKo, en, ko, sections) {
    config.wikiMods.push({ id, label, label_ko: label, shortLabel, shortLabel_ko: shortKo, description: en, description_ko: ko, type: 'addon', product: id });
    config.products[id] = { label, label_ko: label, shortLabel, shortLabel_ko: shortKo, description: en, description_ko: ko, accent: 'blue', sections };
  }
  addProduct('dochi-minigames', 'Dochi`s Minigames', 'Minigames', '미니게임스',
    'Fabric / NeoForge 0.1.0: Monty Hall, slots and memory games with entry fees, rewards and NPC/dialogue bindings.',
    'Fabric·NeoForge 0.1.0: 몬티홀·슬롯·기억력, 참가비·보상과 NPC·대화 연결입니다.', [
      { id: 'setup', label: 'Setup', label_ko: '설치와 시작' },
      { id: 'rules', label: 'Rules and Rewards', label_ko: '게임 규칙과 보상' },
      { id: 'operations', label: 'GUI and Files', label_ko: 'GUI와 파일' }
    ]);
  addProduct('dochi-mapicon-integration', "Dochi's MapIcon Integration", 'MapIcon', '지도 아이콘',
    'Forge / Fabric / NeoForge 0.1.0: Xaero NPC icons, JSON-type defaults, file rules and NPC overrides.',
    'Forge·Fabric·NeoForge 0.1.0: Xaero NPC 아이콘, 타입 기본값·JSON 규칙·NPC별 설정입니다.', [
      { id: 'setup', label: 'Setup', label_ko: '설치와 시작' },
      { id: 'editor', label: 'Icons and Rules', label_ko: '아이콘과 규칙' },
      { id: 'operations', label: 'Files and Troubleshooting', label_ko: '파일과 문제 해결' }
    ]);
  config.description = "Documentation hub for Dochi's RPG Maker and Dochi mods: Cobblemon Editor, BattleWorks, Warfare, Spawn Control, Real Armor, Minigames and MapIcon Integration.";
  config.locales.en.description = config.description;
  config.locales.ko.description = 'Dochi RPG Maker와 Cobblemon Editor·BattleWorks·Warfare·Spawn Control·Real Armor·Minigames·MapIcon Integration 문서 허브입니다.';
  return JSON.stringify(config, null, 2) + '\n';
});

for (const locale of ['ko', 'en']) {
  for (const name of fs.readdirSync(path.join(root, 'content', locale)).filter(f => f.endsWith('.md'))) {
    const file = `content/${locale}/${name}`;
    const raw = read(file);
    const product = raw.match(/^product: (.+)$/m)?.[1];
    const slug = raw.match(/^slug: (.+)$/m)?.[1];
    const historical = /release/.test(name) && !name.includes('current');
    if (historical) continue;
    if (product === 'mob-editor') edit(file, s => s.replaceAll('0.1.3', '0.1.4'));
    if (product === 'dochi-warfare') edit(file, s => s.replaceAll('NeoForge 0.2.9', 'NeoForge 0.3.0'));
    if (product === 'drm-cobblemon-editor') edit(file, s => s.replaceAll('Fabric 0.2.2 / NeoForge 0.2.1', 'Fabric / NeoForge 0.2.4'));
    if ((product === 'core' || product === 'core-fabric') && ['quick-start', 'installation', 'loader-compatibility'].includes(slug)) {
      edit(file, s => s.replaceAll('0.2.1', '0.2.2').replaceAll('0.2.4', '0.2.5'));
    }
  }
}

for (const locale of ['ko', 'en']) {
  const file = `content/${locale}/48-cobblemon-release-notes-current.md`;
  replace(file, locale === 'ko' ? 'title: Fabric 0.2.2 · NeoForge 0.2.1 업데이트' : 'title: Fabric / NeoForge 0.2.4 update',
    locale === 'ko' ? 'title: Fabric·NeoForge 0.2.4 업데이트' : 'title: Fabric and NeoForge 0.2.4 Update');
  replace(file, locale === 'ko' ? 'description: 배틀 연출 적용, 파티 모델, 새 프리셋, 커스텀 보상과 포기 결과 처리입니다.' : 'description: Encounter bindings, party models, new presets, custom rewards, and forfeit outcomes.',
    locale === 'ko' ? 'description: 배틀 스케줄러, 월드 영역 선택, 블록 무대·FX와 배틀 규칙 업데이트입니다.' : 'description: Battle schedulers, world selection, block stages/FX and battle-rule updates.');
  replace(file, locale === 'ko' ? '현재 DRM은 0.2.4이며 애드온의 선언된 최소 DRM은 0.2.2입니다.' : 'Current DRM is 0.2.4; the addon declares DRM 0.2.2 as its minimum.',
    locale === 'ko' ? '현재 DRM은 0.2.5이며 애드온의 최소 DRM은 0.2.4입니다.' : 'Current DRM is 0.2.5; the addon requires DRM 0.2.4 or newer.');
  const newSection = locale === 'ko'
    ? '## 0.2.4 주요 변경\n\n- [배틀 스케줄러](#drm-cobblemon-editor/cobblemon-battle-scheduler): 클론 소환부터 등장·배틀·결과 장면과 정리까지 연결하고, 자동 영역 입장을 서버에서 켜고 끕니다.\n- [블록 무대와 FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx): 월드 블록 상태를 연출 JSON에 캡처하고 입자 발생·이동을 편집합니다.\n- 월드에서 영역 박스를 이동·크기 조절하고 Apply할 수 있습니다. 블록은 변경하지 않습니다.\n- 배틀 룰의 레벨 설정과 도주 정책을 보완했습니다. 고정 레벨·플레이어 파티 평균과 원본·즉시·거리 도주를 구분합니다.\n- Trainer 스키마 23과 Presentation 스키마 5를 유지합니다.\n\n'
    : '## Main changes in 0.2.4\n\n- [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler): connect clone spawning, intro/battle/result scenes and cleanup, with server controls for automatic area entry.\n- [Block stages and FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx): capture block states into presentation JSON and author particle emission and motion.\n- Move and resize selection boxes in the world, then Apply without changing blocks.\n- Expanded battle-rule level settings and flee policies: fixed/player-party-average levels and native/immediate/distance fleeing.\n- Trainer schema 23 and Presentation schema 5 remain unchanged.\n\n';
  edit(file, s => s.replace(locale === 'ko' ? '## 일반 인벤토리' : '## General Inventory', newSection + (locale === 'ko' ? '## 일반 인벤토리' : '## General Inventory')));

  const setup = `content/${locale}/51-cobblemon-editor-setup.md`;
  edit(setup, s => s.replaceAll('0.2.2', '0.2.4').replaceAll('0.2.1', '0.2.4')
    .replace(locale === 'ko' ? '현재 Fabric·NeoForge Core 빌드는 0.2.4입니다.' : 'Current Fabric/NeoForge Core builds are 0.2.4.',
      locale === 'ko' ? '현재 Fabric·NeoForge Core 빌드는 0.2.5입니다.' : 'Current Fabric/NeoForge Core builds are 0.2.5.')
    .replace('0.17.2+', '0.18.0+').replace('0.116.6+1.21.1+', '0.116.11+1.21.1+')
    .replace('│  ├─ battle_presentations/', '│  ├─ battle_presentations/\n│  ├─ battle_schedulers/\n│  ├─ encounter_presentations/\n│  ├─ battle_sound/'));

  const rules = `content/${locale}/63-cobblemon-battle-rules.md`;
  edit(rules, s => s.replace('스키마 22', '스키마 23').replace('schema 22', 'schema 23'));
  const ruleSection = locale === 'ko'
    ? '## 레벨과 도주 정책\n\n레벨은 작성한 값 유지, 고정 레벨(1–100), 플레이어 파티 평균 + 보정값(-99–99)을 선택합니다. 고정 레벨은 Trainer만 또는 양쪽에 적용할 수 있고 파티 평균 방식은 Trainer에 적용합니다. 실제 평균 산정과 배틀용 포켓몬 생성은 서버가 처리합니다.\n\n도주는 원본 Cobblemon 규칙(`native`), 즉시 도주(`immediate`), 시작 위치에서 지정 거리 이탈(`distance`)을 선택합니다. 거리 범위는 1–512블록입니다. 거리 모드에서 버튼을 누르면 필요한 거리를 안내하고, 실제 거리를 벗어나야 도주합니다. 이 정책은 애드온이 관리하는 배틀에 적용하며 결과는 `flee`로 처리합니다.\n\n'
    : '## Level and flee policies\n\nChoose authored levels, a fixed level (1–100), or player-party average plus an offset (-99 to 99). Fixed levels can affect the trainer only or both sides; average mode affects the trainer. The server calculates the average and creates battle Pokémon.\n\nFlee policies are native Cobblemon behavior (`native`), immediate fleeing (`immediate`), or moving a configured distance from the starting position (`distance`, 1–512 blocks). In distance mode the button explains the required distance; actually moving outside it triggers fleeing. These rules apply to addon-owned battles and produce the `flee` outcome.\n\n';
  const heading = locale === 'ko' ? '## 문제 해결' : '## Troubleshooting';
  replace(rules, heading, ruleSection + heading);

  for (const name of ['53-cobblemon-battle-presentation.md', '60-battle-presentation-layers-runtime.md']) {
    edit(`content/${locale}/${name}`, s => s.trimEnd() + (locale === 'ko'
      ? '\n\n## 블록 무대·FX와 스케줄러\n\n0.2.4의 Region·FX 제작은 [블록 무대와 FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx), 클론·장면·배틀 실행 연결은 [배틀 스케줄러](#drm-cobblemon-editor/cobblemon-battle-scheduler)를 확인하세요.\n'
      : '\n\n## Block stages, FX and scheduling\n\nSee [block stages and FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) for Region/FX authoring in 0.2.4, and [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) for clone, scene and battle execution.\n'));
  }

  const overview = `content/${locale}/30-tacz-overview.md`;
  replace(overview, locale === 'ko'
    ? '아래 0.2.9 기능 설명 중 차량 부분은 Forge에서 DWE를 추가했을 때 적용되며, NeoForge는 기존 0.2.9 구성을 사용합니다.'
    : 'Vehicle features in the earlier 0.2.9 overview below require DWE on Forge; NeoForge retains its 0.2.9 implementation.',
    locale === 'ko' ? '차량 기능은 Forge·NeoForge 모두 DWE 0.3.0을 추가했을 때 사용합니다.' : 'Vehicle features require DWE 0.3.0 on both Forge and NeoForge.');
  replace(overview, locale === 'ko' ? '## Forge 0.3.0 업데이트' : '## Forge 0.3.0 update',
    locale === 'ko' ? '## Forge·NeoForge 0.3.0 업데이트' : '## Forge and NeoForge 0.3.0 update');
  for (const name of ['30-tacz-overview.md', '40-warfare-gun-integrations.md', '41-warfare-vehicle-ai.md']) {
    const file = `content/${locale}/${name}`;
    edit(file, s => s.replace('NeoForge 1.21.1용 DW 0.2.9', 'NeoForge 1.21.1용 DW 0.3.0')
      .replace('DW 0.2.9 for NeoForge 1.21.1', 'DW 0.3.0 for NeoForge 1.21.1')
      .replace('Forge의 차량 AI는 별도 DWE 0.3.0이 필요합니다.', '두 로더의 차량 AI는 별도 DWE 0.3.0이 필요합니다.')
      .replace('Forge vehicle AI requires the separate DWE 0.3.0 addon.', 'Vehicle AI on both loaders requires the separate DWE 0.3.0 addon.'));
  }
  const vehicle = `content/${locale}/41-warfare-vehicle-ai.md`;
  edit(vehicle, s => s.replace('Forge 0.3.0에서는 이 페이지의 차량 기능을', 'Forge·NeoForge 0.3.0에서는 이 페이지의 차량 기능을')
    .replace(' NeoForge 0.3.0는 기존 DW 차량 기능을 사용합니다.', '')
    .replace('On Forge 0.3.0, the vehicle features on this page belong to', 'On Forge and NeoForge 0.3.0, the vehicle features on this page belong to')
    .replace(' NeoForge 0.3.0 retains its earlier DW vehicle implementation.', ''));

  const dwSetup = `content/${locale}/31-tacz-setup.md`;
  edit(dwSetup, s => s.replace('NeoForge · DW 0.2.9', 'NeoForge 21.1.216+ · DW 0.3.0')
    .replace('Player Animator 2.0+는 선택 의존성', 'Player Animator 2.0+ 클라이언트 필수')
    .replace('Player Animator 2.0+ optional', 'Player Animator 2.0+ required on client')
    .replace('NeoForge 메타데이터는 0.8.9.1 이상 0.8.10 미만을 선언합니다.', 'NeoForge는 SuperbWarfare 정확히 0.8.9.1을 선언합니다.')
    .replace('NeoForge declares 0.8.9.1 to below 0.8.10.', 'NeoForge declares exactly SuperbWarfare 0.8.9.1.')
    .replace('Forge 0.3.0에서 차량 편집', 'Forge·NeoForge 0.3.0에서 차량 편집')
    .replace('For Forge 0.3.0 vehicle editing', 'For Forge and NeoForge 0.3.0 vehicle editing'));
  edit(dwSetup, s => s.replace(locale === 'ko' ? '## NPC별 GUI 열기' : '## Open the per-NPC GUI',
    (locale === 'ko'
      ? 'NeoForge 설치 파일은 `dochi_warfare-0.3.0-neoforge-1.21.1.jar`와 `dochi_warfare_expanded-0.3.0-neoforge-1.21.1.jar`입니다. NeoForge DWE에는 SuperbWarfare 정확히 0.8.9.1이 필요합니다.\n\n## NPC별 GUI 열기'
      : 'NeoForge files are `dochi_warfare-0.3.0-neoforge-1.21.1.jar` and `dochi_warfare_expanded-0.3.0-neoforge-1.21.1.jar`. NeoForge DWE requires exactly SuperbWarfare 0.8.9.1.\n\n## Open the per-NPC GUI')));
  edit(`content/${locale}/44-warfare-server-ai-missions.md`, s => s.replace('Forge 0.3.0의 차량 전역 AI', 'Forge·NeoForge 0.3.0의 차량 전역 AI').replace('On Forge 0.3.0, DWE owns', 'On Forge and NeoForge 0.3.0, DWE owns'));

  const dwe = `content/${locale}/45-warfare-expanded-overview.md`;
  edit(dwe, s => s.replace('Forge 1.20.1 애드온입니다.', 'Forge 1.20.1·NeoForge 1.21.1 애드온입니다.')
    .replace('requires DW 0.3.0 on Forge 1.20.1.', 'requires DW 0.3.0 on Forge 1.20.1 or NeoForge 1.21.1.')
    .replace('| Minecraft / 로더 | 1.20.1 / Forge 47+, Java 17 |', '| Minecraft / 로더 | Forge 1.20.1 / Java 17 또는 NeoForge 1.21.1 / Java 21 |')
    .replace('| Minecraft / loader | 1.20.1 / Forge 47+, Java 17 |', '| Minecraft / loader | Forge 1.20.1 / Java 17 or NeoForge 1.21.1 / Java 21 |')
    .replace('| DWE | `dochi_warfare_expanded-0.3.0.jar` |', '| DWE | Forge: `dochi_warfare_expanded-0.3.0.jar`; NeoForge: `dochi_warfare_expanded-0.3.0-neoforge-1.21.1.jar` |')
    .replace('| SuperbWarfare | 0.8.9 또는 0.8.9.1, 네이티브 호환 검사 통과 필요 |', '| SuperbWarfare | Forge: 0.8.9 또는 0.8.9.1; NeoForge: 정확히 0.8.9.1. 네이티브 검사 필요 |')
    .replace('| SuperbWarfare | 0.8.9 or 0.8.9.1; native compatibility checks must pass |', '| SuperbWarfare | Forge: 0.8.9 or 0.8.9.1; NeoForge: exactly 0.8.9.1. Native checks must pass |')
    .replace('현재 확인된 DWE는 Forge용입니다. NeoForge DW 0.2.9의 기존 차량 기능과 DWE 0.3.0의 설치 조건을 섞지 마세요.', 'NeoForge도 DW·DWE 0.3.0의 분리 구성을 사용합니다. NeoForge 21.1.216 이상 21.2 미만을 사용하고 Forge JAR과 혼용하지 않습니다.')
    .replace('The verified DWE project targets Forge. NeoForge DW 0.2.9 retains its earlier vehicle implementation; its installation requirements are separate.', 'NeoForge now uses the separated DW/DWE 0.3.0 structure too. Use NeoForge 21.1.216 to below 21.2 and keep Forge JARs out of that instance.'));

  for (const [name, next] of [['00a-release-notes-0-2-1.md', '0.2.2'], ['097-fabric-neoforge-release-notes-0-2-4.md', '0.2.5']]) {
    const file = `content/${locale}/${name}`;
    edit(file, s => {
      const end = s.indexOf('\n---\n', 4) + 5;
      const note = locale === 'ko' ? `\n:::note 이전 변경 기록\n이 페이지는 당시 릴리스 기록입니다. 현재 Core 설치 기준은 ${next}입니다.\n:::\n` : `\n:::note Historical release record\nThis page records the earlier release. The current Core installation baseline is ${next}.\n:::\n`;
      return s.slice(0, end) + note + s.slice(end);
    });
  }
}

// Build minimal apply_patch hunks with an LCS line diff; this script never edits site files.
function hunks(oldText, newText) {
  const a = oldText.trimEnd().split('\n'), b = newText.trimEnd().split('\n');
  const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--)
    dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops = []; let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) { ops.push(' ' + a[i++]); j++; }
    else if (j < b.length && (i === a.length || dp[i][j + 1] >= dp[i + 1][j])) ops.push('+' + b[j++]);
    else ops.push('-' + a[i++]);
  }
  const ranges = [];
  for (let k = 0; k < ops.length; k++) if (!ops[k].startsWith(' ')) {
    const start = Math.max(0, k - 3), end = Math.min(ops.length, k + 4);
    if (ranges.length && start <= ranges.at(-1)[1]) ranges.at(-1)[1] = end;
    else ranges.push([start, end]);
  }
  return ranges.map(([start, end]) => '@@\n' + ops.slice(start, end).join('\n')).join('\n');
}
const patches = [];
for (const [file, next] of updates) {
  const old = fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
  if (old === next) continue;
  patches.push(`*** Update File: ${path.join(root, file).replaceAll('\\', '/')}\n${hunks(old, next)}`);
}
process.stdout.write('*** Begin Patch\n' + patches.join('\n') + '\n*** End Patch\n');
