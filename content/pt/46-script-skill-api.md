---
title: API de script de habilidade entre modos
slug: script-skill-api
order: 129
description: Feitiços de ferro fundido, criaturas de Mowzie, e habilidades de cataclismo de CustomNPCs scripts através drmSkill.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs autores de roteiros de combate e chefe
tags:
  - script
  - customnpcs
  - skill
  - forge
translationSource: en
translationMethod: assisted
---

## Deixe um NPC lançar um feitiço instalado

Essa API conecta o feitiço de um provedor instalado a um rodízio CustomNPCs. Verifique se o provedor está presente e se o feitiço está disponível antes de lançar. A tela mostra uma chamada de bola de fogo de Iron's Spells. Para configurar o tempo, o intervalo e as fases através de um editor, use [BattleWorks habilidades e efeitos](#mob-editor/battleworks-skills-effects).

![Na verdade, deixe um NPC lançar um resultado de feitiço instalado.](assets/media/guides/drm-031-forge1201-apis/api-skill-fireball.png "DRM 0.3.1 / Forge 1.20.1 com CustomNPCs e Feitiços de Ferro 3.4.0.9. A chamada retorna o sucesso e produz o efeito de feitiço real; a saúde do servidor de vaca preparado muda de 100 para 90. Este único caso não é um valor de dano universal para outros níveis ou defesas.")

## Visão geral

`drmSkill` é um objeto de script global CustomNPCs que permite que um CustomNPCs NPC lance feitiços públicos, efeitos e projéteis fornecidos por outros Forge mods. DRM 0.1.4 inclui esses provedores:

| ID do provedor | Mod | Modelo de exposição |
| --- | --- | --- |
| `irons_spellbooks` | Feitiços de Ferro 'n Spellbooks | Apresenta dinamicamente o registo de feitiços activado para a versão instalada |
| `mowziesmobs` | As criaturas de Mowzie | Expõe seis DRM- habilidades de efeito testadas |
| `cataclysm` | L_Ender's Cataclismo | Expõe cinco DRM-teste de efeito ou habilidades projéteis |

As integrações de Mowzie e Cataclysm não copiam a inteligência artificial do chefe particular. Eles criam o efeito público ou entidades projéteis de propriedade do NPC. Um mod opcional ausente ou incompatível retorna `false` em vez de falhar o script.

:::warning Requisitos de tempo de execução
`drmSkill` é registrado quando Forge 1.20.1 DRM e CustomNPCs são carregados juntos. O rodízio deve ser um servidor vivo CustomNPCs NPC. Um jogador, criatura comum, entidade morta, ou entidade do lado do cliente é rejeitado como o lançador.
:::

## Menor exemplo

Lançar um nível 5 Bola de fogo do Iron's Spells no jogador que interage.

```js
function interact(event) {
    var success = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (!success) {
        event.npc.say("Cast failed: " + drmSkill.lastCode());
    }
}
```

`use` retorna `true` quando o elenco é aceito e `false` quando é rejeitado ou cancelado. Um nível solicitado fora da definição de habilidade é fixado ao seu mínimo ou máximo.

## Referência da API

### Descoberta

| Chamar | Retornar | Propósito |
| --- | --- | --- |
| `drmSkill.providers()` | Array de strings | IDs de provedor disponíveis |
| `drmSkill.skills()` | Array de strings | Cada ID de habilidade disponível, ordenada |
| `drmSkill.skills(provider)` | Array de strings | IDs de habilidade de um provedor |
| `drmSkill.available(skillId)` | Booleano. | Se a habilidade é atualmente utilizável |
| `drmSkill.describe(skillId)` | Corda JSON | Requisitos de nível, recarga, alcance e alvo |

```js
function init(event) {
    var providers = drmSkill.providers();
    var skills = drmSkill.skills("mowziesmobs");

    event.npc.getStoreddata().put("drm.provider.count", providers.length);
    event.npc.getStoreddata().put("drm.mowzie.skill.count", skills.length);
}
```

`describe` retorna uma string JSON com estes campos:

```js
var text = drmSkill.describe("mowziesmobs:solar_beam");
// {"id":"mowziesmobs:solar_beam","label":"Solar Beam",
//  "minLevel":1,"maxLevel":10,"cooldownTicks":120,
//  "maxRange":64.0,"requiresTarget":false,"supportsDirection":true}
```

Ele retorna `{}` para uma habilidade desconhecida. Use `JSON.parse(text)` quando o mecanismo de script CustomNPCs precisar de um objeto.

### Alvo Casts

```js
drmSkill.use(npc, skillId);
drmSkill.use(npc, skillId, target);
drmSkill.use(npc, skillId, target, level);
drmSkill.use(npc, skillId, target, level, options);
drmSkill.use(npc, skillId, target, level, affectNpcs);
drmSkill.use(npc, skillId, target, level, affectNpcs, options);
```

`cast(...)` é um pseudónimo para `use(...)`; `use` é recomendado porque tem o conjunto de sobrecarga mais claro. `target` pode ser um CustomNPCs wrapper ou uma Minecraft entidade viva. Passe `null` apenas para uma habilidade que não requer um alvo.

### Direção Casts

```js
drmSkill.useDirection(npc, skillId, x, y, z);
drmSkill.useDirection(npc, skillId, x, y, z, level);
drmSkill.useDirection(npc, skillId, x, y, z, level, options);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs, options);
```

`castDirection(...)` é o pseudônimo. DRM normaliza o vetor, então seu comprimento não precisa ser 1. Todos os três valores devem ser finitos e o vetor não deve ser `(0, 0, 0)`.

```js
// Cast along the NPC's look direction.
var rotation = event.npc.getRotation();
var yaw = Number(rotation[0]) * Math.PI / 180.0;
var pitch = Number(rotation[1]) * Math.PI / 180.0;
var x = -Math.sin(yaw) * Math.cos(pitch);
var y = -Math.sin(pitch);
var z =  Math.cos(yaw) * Math.cos(pitch);

drmSkill.useDirection(
    event.npc,
    "cataclysm:ignis_fireball",
    x, y, z,
    4
);
```

Se uma definição requer estritamente um alvo, uma direção é silenciosamente cancelada. Ele retorna `false`, `lastCode()` é `cancelled`, nenhum cooldown é consumido, e nenhum diagnóstico de erro é escrito.

## Controlando Danos aos NPCs

`affectNpcs` padrão para `true`. Passar `false` faz com que esse elenco cause zero dano especificamente a CustomNPCs NPCs.

```js
var success = drmSkill.use(
    event.npc,
    "mowziesmobs:solar_beam",
    event.npc.getAttackTarget(),
    4,
    false,
    drmSkill.options().set("durationTicks", 50)
);
```

| Valor | CustomNPCs Dano NPC | Dano do Jogador | Não-CustomNPC criatura Dano |
| --- | --- | --- | --- |
| `true` | Permitido | Permitido | Permitido |
| `false` | Bloqueado | Permitido | Permitido |

Isso não é uma facção, equipe, ou teste de fogo amigável. Ele filtra apenas se a entidade danificada é um CustomNPCs NPC. Vigas, respirações e projéteis rastreados mantêm a política, enquanto DRM pode associá-los ao rodízio.

O construtor de opções pode carregar a mesma configuração:

```js
var options = drmSkill.options()
    .affectNpcs(false)
    .set("durationTicks", 50);

drmSkill.use(event.npc, "mowziesmobs:solar_beam", target, 4, options);
```

Uma sobrecarga booleana explícita tem precedência quando ambos os locais fornecem a configuração.

## Opções sem citações fugidas

O construtor é o formulário de entrada mais legível.

```js
var options = drmSkill.options()
    .set("damage", 14)
    .set("speed", 1.1)
    .set("warmupTicks", 8)
    .set("soul", true);
```

`set` retorna o mesmo construtor para encadeamento. `set(key, null)` remove uma chave, `clear()` remove todas as entradas e `size()` retorna a contagem atual.

Os seguintes formulários também são aceitos:

```js
// JavaScript object
drmSkill.use(npc, skillId, target, 4, {
    durationTicks: 50,
    damage: 14
});

// Relaxed object text: keys and numbers need no quotes
drmSkill.use(npc, skillId, target, 4, "{durationTicks:50, damage:14}");

// key=value text
drmSkill.use(npc, skillId, target, 4, "durationTicks=50, damage=14");

// Existing valid JSON text remains compatible
drmSkill.use(npc, skillId, target, 4, '{"durationTicks":50}');
```

:::note Limites de entrada
Uma chamada aceita até 32 opções primitivas. A entrada de texto é limitada a 2,048 caracteres. Chaves aceitam 1–48 letras minúsculas, dígitos, pontos, sublinhados ou hífens; os valores são limitados a 256 Caracteres. Não aninhar arrays ou objetos como valores. Entrada inválida retorna `false` com `rejected`.
:::

As teclas de opção são normalizadas para diminuir internamente. A documentação usa nomes legíveis como `durationTicks`, `warmupTicks` e `affectNpcs`; a pesquisa do provedor é insensível a casos após a normalização.

## Habilidades e Opções do Provedor

### Feitiços de Ferro 'n Spellbooks

DRM lê dinamicamente até 512 feitiços habilitados da versão instalada. Descubra a lista exata do servidor em vez de presumir que existe um feitiço.

```js
var ids = drmSkill.skills("irons_spellbooks");
for (var i = 0; i < ids.length; i++) {
    event.npc.say(String(ids[i]));
}
```

O ID de habilidade é o ID do registro ortográfico, como `irons_spellbooks:fireball`. As descrições usam um intervalo 64-bloco e, atualmente, não há DRM opções específicas do provedor. O feitiço ainda pode rejeitar um elenco através de suas próprias condições pré-moldadas ou regras estaduais.

```js
if (drmSkill.available("irons_spellbooks:fireball")) {
    drmSkill.use(event.npc, "irons_spellbooks:fireball", event.player, 5);
}
```

### As criaturas de Mowzie

| ID de habilidade | Arrefecer. | Max Range | Opções e Limites |
| --- | ---: | ---: | --- |
| `mowziesmobs:sunstrike` | 40 carrapatos | 64 | Nenhum. |
| `mowziesmobs:solar_beam` | 120 carrapatos | 64 | `durationTicks`: 10–100 |
| `mowziesmobs:ice_breath` | 100 carrapatos | 32 | Nenhum. |
| `mowziesmobs:boulder_projectile` | 60 carrapatos | 64 | `damage`: 1–100, `speed`: 0.2–2.0 |
| `mowziesmobs:axe_attack` | 40 carrapatos | 16 | `vertical`: padrão `false` |
| `mowziesmobs:axe_attack_vertical` | 60 carrapatos | 16 | `vertical`: padrão `true` |

Todas as definições de Mowzie usam níveis 1–10 e apoiar o alvo ou direção apontando. O feixe solar padrão para `30 + level × 5` carrapatos. O dano de Boulder é padrão para `3 + level × 2`, velocidade para `0.9 + level × 0.04`, e seu nível de tamanho aumenta com o nível.

```js
var boulder = drmSkill.options()
    .set("damage", 18)
    .set("speed", 1.2);

drmSkill.use(
    event.npc,
    "mowziesmobs:boulder_projectile",
    event.npc.getAttackTarget(),
    5,
    boulder
);
```

### L_Ender's Cataclismo

| ID de habilidade | Arrefecer. | Max Range | Opções e Limites |
| --- | ---: | ---: | --- |
| `cataclysm:void_rune` | 60 carrapatos | 64 | `damage`: 0–200, `warmupTicks`: 0–100 |
| `cataclysm:ignis_fireball` | 30 carrapatos | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Booleano |
| `cataclysm:ignis_soul_fireball` | 50 carrapatos | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Booleano |
| `cataclysm:ignis_abyss_fireball` | 80 carrapatos | 64 | `speed`: 0.1–0.8, `warmupTicks`: 0–100 |
| `cataclysm:ender_guardian_bullet` | 20 carrapatos | 80 | `speed`: 0.1–2.0, `warmupTicks`: 0–100 |

Todas as definições de cataclismo usam níveis 1–10 e apoiar o alvo ou direção apontando. Opções omitidas usam padrões baseados em nível.

```js
var rune = drmSkill.options()
    .set("damage", 14)
    .set("warmupTicks", 8);

drmSkill.use(event.npc, "cataclysm:void_rune", target, 4, rune);
```

## Resultados e Cooldowns

O resultado mais recente `use` ou `useDirection` é mantido para o tópico de script atual.

```js
var success = drmSkill.use(event.npc, skillId, target, level);
var code = String(drmSkill.lastCode());
var message = String(drmSkill.lastMessage());
var cooldown = Number(drmSkill.lastCooldownTicks());
```

| Código | Significado | Resposta típica |
| --- | --- | --- |
| `success` | Elenco aceito | Tente novamente depois de `lastCooldownTicks()` |
| `invalid_caster` | Não é um servidor CustomNPCs NPC | Verifique o rodízio e o lado lógico |
| `invalid_skill` | ID de habilidade desconhecida | Use `available` ou `skills` |
| `provider_unavailable` | Mod ou API do provedor indisponível | Verificar a versão mod e a instalação do servidor |
| `invalid_target` | Alvo ausente ou inválido | Espere por um novo alvo. |
| `out_of_range` | Alvo excede o alcance máximo | Tente novamente quando estiver mais perto |
| `cooldown` | DRM A recarga está ativa | Espere os carrapatos restantes retornados |
| `cancelled` | Cancelamento silencioso normal | Terminar sem manipulação de erros |
| `rejected` | Validação de provedor ou opção rejeitada | Leia `lastMessage` |
| `error` | Exceção de execução do provedor | Inspecionar DRM logs |

Consultar ou limpar recargas diretamente quando necessário:

```js
var ticks = drmSkill.cooldownRemaining(event.npc, skillId);
var cleared = drmSkill.clearCooldown(event.npc, skillId);
```

Um elenco bem sucedido armazena uma recarga por NPC e habilidade. Falhas e cancelamentos silenciosos não consomem uma nova recarga.

## Completar o Tick Script

Este script lança uma pedra de nível 5 enquanto um alvo de ataque existe e agenda tentativas de acordo com o resultado.

```js
var NEXT_CAST_TICK = 0;
var SKILL_ID = "mowziesmobs:boulder_projectile";

function tick(event) {
    var npc = event.npc;
    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    var target = npc.getAttackTarget();
    if (target == null) {
        NEXT_CAST_TICK = now + 10;
        return;
    }

    if (!drmSkill.available(SKILL_ID)) {
        NEXT_CAST_TICK = now + 100;
        return;
    }

    var options = drmSkill.options()
        .set("damage", 14)
        .set("speed", 1.1);

    if (drmSkill.use(npc, SKILL_ID, target, 5, false, options)) {
        NEXT_CAST_TICK = now + Math.max(10, drmSkill.lastCooldownTicks());
        return;
    }

    var code = String(drmSkill.lastCode());
    if (code == "cooldown") {
        NEXT_CAST_TICK = now + Math.max(1, drmSkill.lastCooldownTicks());
    } else if (code == "invalid_target" || code == "out_of_range") {
        NEXT_CAST_TICK = now + 10;
    } else {
        NEXT_CAST_TICK = now + 20;
    }
}

function died(event) {
    drmSkill.cancel(event.npc);
}
```

`cancel(npc)` remove vigas, respirações, projéteis e entidades de efeito rastreados criados por esse NPC e retorna o número removido. Chame isso de morte de NPC, uma transição de fase de chefe, ou uma interrupção explícita de habilidade.

## Combinando DRM APIs de script

```js
function castBossSkill(npc, target) {
    drmCombat.setAttacks(npc, false, false);
    drmAnimation.playEntityAnimation(npc, "attack_animation", 1.0, 40);

    var ok = drmSkill.use(npc, "cataclysm:void_rune", target, 5,
        drmSkill.options().set("damage", 18));

    if (!ok && String(drmSkill.lastCode()) != "cancelled") {
        npc.say("skill: " + drmSkill.lastCode());
    }
    return ok;
}
```

As páginas `drmAnimation`, `drmHitbox` e `drmCombat` documentam seus métodos e restrições completos. Use `drmEffect` de **Potion Effect Query Script API** para fechar um elenco por um efeito ativo.

### Anunciando uma habilidade de sucesso com um popup

Uma definição salva pelo Popup Maker pode ser tocada do mesmo script até `drmPopup`. Este exemplo mostra `area_title.json` para o jogador depois de um elenco bem-sucedido e substitui apenas o texto do corpo.

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "area_title.json",
            "Fireball cast\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

`drmPopup.text` retorna o número de jogadores que receberam a apresentação. Veja **Popup Maker Script API** para todos os métodos, quebras de linha, matrizes de destino e limites de política.

## Solução de problemas e registros

Cada chamada de habilidade não cancelada escreve um diagnóstico para ambos os locais:

```text
config/dochi_rpg_maker/debug.log
logs/latest.log
```

Procure por:

```text
NPC skill script call:
```

A linha contém `skill`, solicitada `level`, `success`, `code`, `cooldownTicks` e `message`.

1. Se `drmSkill` estiver indefinido, verifique as versões DRM e CustomNPCs e a linha de registro da API de script na inicialização do servidor.
2. Para `provider_unavailable`, verifique o mod do provedor e sua versão de servidor suportada.
3. Para `invalid_skill`, inspecione `skills(provider)` em vez de adivinhar uma identificação.
4. Para `invalid_target` ou `out_of_range`, inspecione o alvo de ataque atual e `describe` alcance.
5. Para `rejected`, leia `lastMessage()` e a opção de provedor se limita acima.
6. Se os efeitos persistentes permanecerem, ligue para `cancel(npc)` dos caminhos da morte e do fim de fase.

## Provedores de complementos

Outro. Forge addon pode implementar DRM's `NpcSkillProvider` e registre-o através `NpcSkillRegistry.register(provider)`. O provedor fornece um ID de provedor exclusivo, definições de habilidade e um servidor `NpcSkillResult`. Os scripts usam os mesmos métodos `providers`, `skills`, `describe` e `use` sem precisar de outro objeto global.
