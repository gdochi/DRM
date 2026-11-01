---
title: API de script de ataque incorporada
slug: script-combat-api
order: 127
description: Use drmCombat em scripts CustomNPCs para habilitar ou desabilitar ataques corpo a corpo e alcance de um NPC.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs autores de roteiros de combate
tags:
  - script
  - customnpcs
  - combat
  - ai
translationSource: en
translationMethod: assisted
---

## Desabilitar ataques internos para um NPC com script

A CustomNPCs O ator usando feitiços ou ataques personalizados pode desabilitar seus ataques corpo a corpo e alcance. O resultado abaixo verifica ambos os interruptores armazenados depois de desativá-los. Esta configuração sozinha não adiciona nenhum feitiço ou padrão de combate. Para ataques baseados em tela, comece com [BattleWorks](#mob-editor/battleworks-first-attack).

![Desabilite os ataques internos para um resultado de NPC com script.](assets/media/guides/drm-031-forge1201-apis/api-combat-switches.png "DRM 0.3.1 / Forge 1.20.1 com CustomNPCs. true no bate-papo significa que a mudança foi aceita; melee-false / ranged-false são os estados com deficiência consultados. Isso verifica o estado de troca em vez de um ciclo de combate completo.")

## Primeiros passos

`drmCombat` é uma API de script autoritativa do servidor para habilitar ou desabilitar de forma independente um CustomNPCs O NPC é corpo a corpo e ataques à distância.

Desabilite ambos os ataques internos para um NPC que usa apenas feitiços ou ataques de script personalizados.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, false);
}
```

Permitir apenas ataques à distância da seguinte forma.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, true);
}
```

:::note Alvo
Os métodos de mudança de estado aceitam apenas um servidor CustomNPCs NPC. Outra entidade ou um alvo do lado do cliente retorna `false`.
:::

## Interruptores de ataque individuais

```js
drmCombat.setMeleeAttack(event.npc, false);
drmCombat.setRangedAttack(event.npc, true);
```

| Método | Efeito quando `enabled` é `false` |
| --- | --- |
| `setMeleeAttack` | Interrompe o início, a continuação e a execução direta. |
| `setRangedAttack` | Interrompe o início da IA e a execução direta. |

Use `setAttacks(npc, meleeEnabled, rangedEnabled)` para mudar os dois interruptores em uma chamada.

## Lendo o estado atual

```js
var meleeEnabled = drmCombat.isMeleeAttackEnabled(event.npc);
var rangedEnabled = drmCombat.isRangedAttackEnabled(event.npc);
```

Ambas as consultas retornam `true` quando nenhuma fechadura foi salva. Os NPCs existentes, portanto, mantêm o padrão de legado em que ataques corpo a corpo e à distância são permitidos.

Os métodos de consulta também tratam um alvo inválido como o legado `true` padrão. Não os use para validar um alvo; verifique o valor de retorno de um método de mudança de estado.

## Persistência e comportamento da IA

Os switches são armazenados no lado do servidor nos dados persistentes do NPC. Eles sobrevivem ao NPC e recarregam o mundo. Re-permitir um ataque remove a chave de bloqueio.

```js
function enableNormalCombat(npc) {
    return drmCombat.setAttacks(npc, true, true);
}
```

Alcance `enabled` significa permitido, não pronto. O CustomNPCs NPC também deve ter um item de projétil não vazio em seu slot de projétil antes que a IA possa funcionar. Quando ataques de alcance são desativados ou não existe projétil utilizável, um NPC com corpo a corpo habilitado é tratado como livre de projétil para que sua IA corpo a corpo possa ser executada.

## Valores de retorno e padrão de uso

Os métodos de mudança de estado retornam `true` depois de aplicar valores a um servidor CustomNPCs NPC e `false` quando eles não podem aplicar a alteração.

```js
function makeMagicOnly(npc) {
    if (!drmCombat.setAttacks(npc, false, false)) {
        // Verify that this is a server-side CustomNPCs NPC.
        return false;
    }

    // Configure separate spell or scripted attacks here.
    return true;
}
```

Desativar ataques internos não bloqueia danos separados em scripts, como uma chamada `drmHitbox`. Estes interruptores controlam apenas o built-in CustomNPCs Caminhos de ataque corpo a corpo e à distância.

## Referência de assinatura completa

```js
drmCombat.setMeleeAttack(npc, enabled);
drmCombat.setRangedAttack(npc, enabled);
drmCombat.setAttacks(npc, meleeEnabled, rangedEnabled);
drmCombat.isMeleeAttackEnabled(npc);
drmCombat.isRangedAttackEnabled(npc);
```
