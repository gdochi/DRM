---
title: API de script de animação
slug: script-animation-api
order: 125
description: Use drmAnimation em scripts CustomNPCs para reproduzir animações e alterar mapeamentos de comportamento ou o modelo NPC.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs autores de roteiro
tags:
  - script
  - customnpcs
  - animation
translationSource: en
translationMethod: assisted
---

## Alterar um modelo de NPC e movimento de um script

Esta é uma referência avançada para CustomNPCs scripts. Para uma mudança de nome ou de pele, comece com [ configurações de aparência](#core/assets-models). O resultado real da API abaixo atribui minecraft:zombie como um modelo de NPC existente. A reprodução de animação também precisa de um ID de movimento fornecido por esse modelo ou um provedor instalado.

![Mude um modelo de NPC e mova-se de um resultado de script.](assets/media/guides/drm-031-forge1201-apis/api-model-zombie.png "DRM 0.3.1 / Forge 1.20.1 com CustomNPCs. O NPC usa uma aparência de zumbi depois de useModdedEntityModel. Isso não é uma demonstração de instalar ou jogar um recurso de onda.")

## Primeiros passos

Dochi's RPG Maker Forge 0.3.1 registra o CustomNPCs script global `drmAnimation`. O primeiro argumento de cada método é um CustomNPCs wrapper de entidade de script ou a Minecraft entidade. Na maioria dos scripts de eventos, passe `event.npc` diretamente.

```js
function interact(event) {
    drmAnimation.useModdedEntityModel(event.npc, "minecraft:zombie");
}
```

Primeiro confirme que o NPC preparado leva o modelo mostrado acima. Conecte caminhada, ataque e outra reprodução de animação somente depois de preparar o provedor e recursos reais de movimento.

:::note Requisitos
`drmAnimation` está registrado somente quando CustomNPCs está presente. Os recursos de modificação e animação do provedor selecionado também devem estar disponíveis no servidor e nos clientes de conexão.
:::

## Reprodução direta

A menor sobrecarga omite a política de reprodução e usa `once`.

```js
drmAnimation.play(event.npc, "entity", "attack_animation", 1.0, 40);
drmAnimation.playPlayerAnimator(event.npc, "mypack:wave", 1.0, 80);
drmAnimation.playBetterCombat(event.npc, "bettercombat:one_handed_slash", 1.0, 40);
drmAnimation.playEntityAnimation(event.npc, "attack_animation", 1.2, 60);
```

| Provedor | Propósito |
| --- | --- |
| `entity` | Animação nativa do modelo de entidade modificada selecionado |
| `geckolib` | Animação de a DRM-gerenciado GeckoLib Modelo JSON |
| `player_animator` | Animação de recursos do Player Animator |
| `better_combat` | A animação Melhor Combate especificada |

`player_animator` e `better_combat` são rejeitados quando o alvo usa um GeckoLib ou renderizador de entidade modificada. Para `entity`, primeiro atribua um modelo de entidade modificada ao NPC e use um ID de animação realmente exposto por esse modelo.

## Políticas de Reprodução

Modos numéricos fornecem argumentos de script compacto.

| playbackMode | Nome | Comportamento |
| --- | --- | --- |
| `0` | `loop` | Repita para a duração solicitada |
| `1` | `once` | Jogue uma vez. |
| `2` | `hold_last` | Jogue uma vez e segure o último quadro |

Coloque um modo numérico no final da chamada.

```js
drmAnimation.playEntityAnimation(event.npc, "idle_animation", 1.0, 100, 0);
drmAnimation.playEntityAnimation(event.npc, "death_animation", 1.0, 100, 2);
```

Coloque uma política de nome imediatamente após `animation`.

```js
drmAnimation.playEntityAnimation(event.npc, "attack_animation", "once", 1.0, 40);
drmAnimation.play(event.npc, "entity", "idle_animation", "loop", 1.0, 100);
```

Números e nomes fora de `loop`, `once` e `hold_last` são rejeitados em vez de serem convertidos silenciosamente.

## Salvando animações de comportamento

`setBehavior` armazena um mapeamento de animação nas configurações do modelo NPC. Os IDs de comportamento padrão são `idle`, `walk`, `sprint`, `attack`, `hurt` e `death`.

```js
function init(event) {
    var npc = event.npc;

    drmAnimation.useModdedEntityModel(npc, "cataclysm:amethyst_crab");
    drmAnimation.setBehavior(npc, "idle", "entity", "idle_animation", 1.0, 0);
    drmAnimation.setBehavior(npc, "attack", "entity", "attack_animation", 1.0, 1);
    drmAnimation.setBehavior(npc, "death", "entity", "death_animation", 1.0, 2);
}
```

Reproduza ou remova um mapeamento salvo da seguinte forma.

```js
drmAnimation.playBehavior(event.npc, "attack", 60);
drmAnimation.clearBehavior(event.npc, "attack");
```

`useModdedEntityModel` aplica um ID de tipo de entidade válido a um NPC CustomNPCs. Restaurar o renderizador regular CustomNPCs com `useCustomNpcModel`.

```js
drmAnimation.useCustomNpcModel(event.npc);
```

## Argumentos e valores de retorno

- `speed` aceita `0.0` até `32.0`.
- `durationTicks` aceita 1 através de 600 carrapatos.
- Os métodos de reprodução direta incluem `durationTicks`; não há nenhum método separado `playForTicks`.
- Use o ID de animação exato exposto pelo provedor.
- Os métodos retornam `true` quando o pedido é aceito e `false` para uma combinação inválida de alvo, argumento ou renderizador.

## Referência de assinatura completa

Esta seção é apenas de referência.

```js
drmAnimation.play(target, provider, animation, speed, durationTicks);
drmAnimation.play(target, provider, animation, speed, durationTicks, playbackMode);
drmAnimation.play(target, provider, animation, playback, speed, durationTicks);

drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks);
drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playPlayerAnimator(target, animation, playback, speed, durationTicks);

drmAnimation.playBetterCombat(target, animation, speed, durationTicks);
drmAnimation.playBetterCombat(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playBetterCombat(target, animation, playback, speed, durationTicks);

drmAnimation.playEntityAnimation(target, animation, speed, durationTicks);
drmAnimation.playEntityAnimation(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playEntityAnimation(target, animation, playback, speed, durationTicks);

drmAnimation.playBehavior(target, behavior, durationTicks);
drmAnimation.setBehavior(target, behavior, provider, animation, speed, playbackMode);
drmAnimation.clearBehavior(target, behavior);
drmAnimation.useModdedEntityModel(target, entityTypeId);
drmAnimation.useCustomNpcModel(target);
```

## Solução de problemas

- Quando uma chamada retornar `false`, verifique o destino, provedor, ID de animação, velocidade e duração primeiro.
- Verifique se Player Animator ou Better Combat não está sendo usado com uma entidade modificada ou GeckoLib Renderizador.
- Motores de animação e IDs internos variam de acordo com a entidade mod. Use um ID mostrado pela lista de seleção do NPC Basic para o modelo selecionado.
- O servidor envia solicitações de reprodução, mas os clientes as processam. Os clientes de conexão precisam do necessário DRM build, provider mod e recursos.
