---
title: API de script de consulta de efeito de poção
slug: script-effect-api
order: 130
description: Use drmEffect em scripts CustomNPCs para inspecionar efeitos ativos, tempo restante, amplificador e nível de exibição em NPCs e players.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs autores de roteiros de combate e estado
tags:
  - script
  - customnpcs
  - potion
  - effect
translationSource: en
translationMethod: assisted
---

## Leia o nível de velocidade II e o tempo restante

Use isso para ramificar diálogo ou comportamento baseado em um efeito poção. Verifique se tem primeiro, depois use o nível para um número de nível voltado para o jogador. Esta API só lê efeitos; prepare o efeito separadamente.

![Velocidade de leitura real ii nível e resultado de tempo restante.](assets/media/guides/drm-031-forge1201-apis/api-effect-speed.png "DRM 0.3.1 / Forge 1.20.1. Um efeito de jogador de Speed II real retorna tem - verdadeiro, nível -2 e amplificador -1. A consulta relata 1200 carrapatos; o tempo passa antes da captura, então o inventário mostra 00:57.")

## Visão geral

`drmEffect` é um objeto de script global CustomNPCs para ler efeitos de criaturas ativas, comumente chamados de efeitos de poção, de entidades vivas. Ele relata se um NPC ou jogador tem um efeito, quantos ticks ou segundos permanecem, e tanto o amplificador interno quanto o nível voltado para o usuário.

```js
function interact(event) {
    if (drmEffect.has(event.player, "minecraft:speed")) {
        var seconds = drmEffect.remainingSeconds(event.player, "minecraft:speed");
        var level = drmEffect.level(event.player, "minecraft:speed");
        event.player.message("Speed " + level + " / " + seconds + " seconds left");
    }
}
```

`drmEffect` é somente leitura. Ele não adiciona, remove ou altera os efeitos. Um ID de destino ou efeito inválido retorna padrões seguros em vez de interromper o script.

:::note Entidades aceitas
O primeiro argumento pode ser um CustomNPCs entidade wrapper or a Minecraft LivingEntity. Entradas comuns são `event.npc`, `event.player` e `event.npc.getAttackTarget()`. Qualquer coisa que não possa resolver para uma entidade viva é tratada como não tendo efeito.
:::

## Tabela completa do método

| Método | Quando presente | Quando ausente ou inválido |
| --- | --- | --- |
| `has(entity, effectId)` | `true` | `false` |
| `remainingTicks(entity, effectId)` | Continuando carrapatos | `0` |
| `ticks(entity, effectId)` | O mesmo que `remainingTicks` | `0` |
| `remainingSeconds(entity, effectId)` | Os carrapatos restantes ÷ 20 | `0.0` |
| `seconds(entity, effectId)` | O mesmo que `remainingSeconds` | `0.0` |
| `amplifier(entity, effectId)` | Amplificador interno à base de zero | `-1` |
| `level(entity, effectId)` | Nível único voltado para o usuário | `0` |

### Presença

```js
if (drmEffect.has(event.npc, "minecraft:strength")) {
    event.npc.say("Strength is active");
}
```

`has` é `true` somente quando uma instância de efeito é realmente anexada. Um ID vazio, identificação mal formada ou efeito não registrado é `false`.

### Tempo restante

```js
var ticksLeft = drmEffect.remainingTicks(event.player, "regeneration");
var secondsLeft = drmEffect.remainingSeconds(event.player, "regeneration");

// Short aliases return the same values.
var sameTicks = drmEffect.ticks(event.player, "regeneration");
var sameSeconds = drmEffect.seconds(event.player, "regeneration");
```

Minecraft normalmente corre 20 carrapatos por segundo. `remainingSeconds` é um `double`, então pode retornar um valor fracionário como `2.5`.

Um efeito infinito retorna `-1` para ambos os ticks restantes e segundos. Não trate cada duração negativa ou não positiva como ausência. Verifique `has` primeiro.

```js
var present = drmEffect.has(event.npc, "minecraft:resistance");
var left = drmEffect.remainingTicks(event.npc, "minecraft:resistance");

if (present && left < 0) {
    event.npc.say("Resistance is infinite");
}
```

### Amplificador Versus Display Level

Minecraft armazena amplificadores de zero, enquanto a interface do usuário exibe níveis de efeito de um.

| Texto da interface do usuário | `amplifier` | `level` |
| --- | ---: | ---: |
| Velocidade I | 0 | 1 |
| Velocidade II | 1 | 2 |
| Velocidade III | 2 | 3 |
| Ausente | -1 | 0 |

Use `level` em diálogo e regras comuns de jogo. Use `amplifier` somente quando corresponder às fórmulas internas baseadas em zero do Minecraft.

```js
var shownLevel = drmEffect.level(event.player, "speed");
var internalAmplifier = drmEffect.amplifier(event.player, "speed");
```

## Regras de ID do efeito

A forma completa é `namespace:path`.

```text
minecraft:speed
minecraft:regeneration
irons_spellbooks:instant_mana
example_mod:custom_effect
```

Um ID sem um namespace padrão é `minecraft:`.

```js
drmEffect.has(event.player, "speed");
drmEffect.has(event.player, "minecraft:speed");
// These query the same effect.
```

DRM apara a identificação, converte-a em minúscula, e procura-a no registro Efeito da criatura Forge. Texto em branco, uma ResourceLocation inválida ou um efeito de um mod que não está instalado é tratado como ausente.

:::warning Não use nomes de exibição
Use o ID do registro, não texto localizado, como `Speed II` ou um nome de dica de ferramenta. Obtenha o ID exato de um efeito modificado da documentação desse mod ou de uma ferramenta de inspeção de registro.
:::

## Ramificação em um efeito de jogador

Exigir Visão Noturna com mais de 10 segundos restantes.

```js
function interact(event) {
    var player = event.player;
    var effect = "minecraft:night_vision";

    if (!drmEffect.has(player, effect)) {
        player.message("Night Vision is required.");
        return;
    }

    var seconds = drmEffect.remainingSeconds(player, effect);
    if (seconds >= 0 && seconds <= 10) {
        player.message("The effect expires too soon: " + seconds + " seconds");
        return;
    }

    player.message("Requirement passed");
}
```

`seconds < 0` representa um efeito infinito, então ele passa o requisito de duração neste exemplo.

## Verificando o próprio efeito do NPC

Mantenha uma fase de defesa ativa enquanto o NPC tiver Resistência II ou superior.

```js
var DEFENSE_ACTIVE = false;

function tick(event) {
    var npc = event.npc;
    var active = drmEffect.level(npc, "minecraft:resistance") >= 2;

    if (active == DEFENSE_ACTIVE) return;
    DEFENSE_ACTIVE = active;

    if (active) {
        drmCombat.setAttacks(npc, false, false);
        npc.say("Defense phase started");
    } else {
        drmCombat.setAttacks(npc, true, true);
        npc.say("Defense phase ended");
    }
}
```

Rastrear o estado anterior impede que a mensagem e a atualização de combate repitam todos os ticks.

## Verificando um alvo antes de lançar uma habilidade

Lançar um projétil Cataclísmico só enquanto o alvo não estiver envenenado.

```js
var NEXT_CAST_TICK = 0;

function tick(event) {
    var npc = event.npc;
    var target = npc.getAttackTarget();
    if (target == null) return;

    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    if (drmEffect.has(target, "minecraft:poison")) {
        NEXT_CAST_TICK = now + 20;
        return;
    }

    var options = drmSkill.options()
        .set("speed", 0.8)
        .set("warmupTicks", 0);

    var ok = drmSkill.use(
        npc,
        "cataclysm:ender_guardian_bullet",
        target,
        5,
        options
    );

    NEXT_CAST_TICK = now + (ok
        ? Math.max(20, drmSkill.lastCooldownTicks())
        : 20);
}
```

`drmEffect` só lê o estado. Este exemplo não implica que a habilidade selecionada aplica Veneno; o comportamento real da habilidade pertence ao mod do provedor.

## Copiando o estado do efeito em dados armazenados

Armazene um instantâneo para outro script CustomNPCs ou uma condição DRM `cnpc_stored_data`.

```js
function tick(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (!drmEffect.has(npc, "speed")) {
        data.remove("boss.speed.seconds");
        data.remove("boss.speed.level");
        return;
    }

    data.put("boss.speed.seconds",
        String(drmEffect.remainingSeconds(npc, "speed")));
    data.put("boss.speed.level",
        String(drmEffect.level(npc, "speed")));
}
```

Se um instantâneo per-tick for desnecessário, atualize-o a cada 20 marcado com um contador. Quando DRM condições ler esses valores, siga as regras de comparação de escopo e número em **CustomNPCs Stored Data Condition Integration**.

## Instantâneo seguro reutilizável

Este ajudante mantém os efeitos ausentes e infinitos distintos.

```js
function effectSnapshot(entity, effectId) {
    if (!drmEffect.has(entity, effectId)) {
        return {
            present: false,
            ticks: 0,
            seconds: 0,
            amplifier: -1,
            level: 0,
            infinite: false
        };
    }

    var ticks = Number(drmEffect.remainingTicks(entity, effectId));
    return {
        present: true,
        ticks: ticks,
        seconds: Number(drmEffect.remainingSeconds(entity, effectId)),
        amplifier: Number(drmEffect.amplifier(entity, effectId)),
        level: Number(drmEffect.level(entity, effectId)),
        infinite: ticks < 0
    };
}
```

Uso:

```js
var state = effectSnapshot(event.player, "minecraft:strength");
if (state.present && state.level >= 2) {
    event.player.message("Strength II or higher");
}
```

## Falha Padrão

| Situação de entrada | `has` | Tempo | `amplifier` | `level` |
| --- | ---: | ---: | ---: | ---: |
| Efeito ausente | false | 0 | -1 | 0 |
| `entity` é `null` | false | 0 | -1 | 0 |
| Objeto não é uma entidade viva. | false | 0 | -1 | 0 |
| ID de efeito em branco | false | 0 | -1 | 0 |
| Sintaxe de ID inválida | false | 0 | -1 | 0 |
| Mod opcional faltando, então o efeito não está registrado | false | 0 | -1 | 0 |
| Efeito infinito | Verdade. | -1 | Valor real | Nível real |

Use esta ordem quando a ausência e o nível zero não devem ser confundidos:

```js
if (drmEffect.has(entity, id)) {
    var level = drmEffect.level(entity, id);
    var ticks = drmEffect.remainingTicks(entity, id);
}
```

## Erros comuns

1. Não interprete `amplifier >= 2` como UI nível II ou superior. Nível II tem amplificador 1.
2. Não use apenas `remainingTicks <= 0` para ausência; isso também rejeita a duração infinita `-1`. Chamar `has` Primeiro.
3. Não prefixar um efeito modificado com `minecraft:`. Use seu namespace mod real.
4. Use um ID de registro em vez de um nome de exibição ou chave de tradução.
5. Em um script Tick, null-check `getAttackTarget()` sempre porque o alvo pode mudar.

## Script Globals relacionados

| Objeto | Propósito |
| --- | --- |
| `drmSkill` | Descubra, envie alvos, direcione, descarregue e cancele as habilidades cross-mod |
| `drmAnimation` | Reprodução de animação direta e mapeamentos de comportamento |
| `drmHitbox` | NPC hitbox, altura dos olhos e controle da caixa de ataque |
| `drmCombat` | Permitir ou bloquear CustomNPCs ataques corpo a corpo e alcance padrão |
| `drmEffect` | Consultar o estado atual de efeito poção |

Cada objeto tem uma referência completa e exemplos práticos na seção API de script.
