---
title: Recarregar e munição Stock
slug: warfare-reload-ammo
order: 350
description: Como o estoque de munição DW, tempo de recarga nativo, regeneração, retorno e movimento de recarga funcionam em armas suportadas.
product: dochi-warfare
category: Ammo.
section: ammo
status: Rascunho
version: 0.3.1
audience: Criadores de NPC de armas de fogo
tags:
  - reload
  - ammo
  - magazine
translationSource: en
translationMethod: assisted
---

## Comece com um guarda que recarrega

Em **Ammo**, habilite **Reload** e **Supply Ammo**, então comece com **Reload Type: Normal**. **Ammo Stock** é munição de reserva, separada das balas já carregadas na arma.

![Recarga de munição, reservas, regeneração e exaustão.](assets/media/guides/warfare-031-neo1211/dw-ammo.png "DW 0.3.1 / NeoForge 1.21.1. Stock -1 dá reservas ilimitadas; Reload Duration 0 usa o tempo de recarga nativo da arma. Essas reservas não exigem um suporte de revista offhand.")

## Modelo de munição

Dochi's Warfare não faz NPCs gerenciados transportar munição de reposição TACZ, PointBlank, ou SuperbWarfare na mão. O NPC usa uma arma nativa suportada, enquanto a munição de reserva é representada pelos dados da DW:

| Dados | Significado |
| --- | --- |
| `Ammo Stock` | Rodas de reposição para este NPC. `-1` é infinito, `0` é vazio, valores positivos são rodadas de reserva finitas. |
| `Ammo Stock Max` | Máxima reserva de munição após a regeneração. `-1` significa sem tampa. |
| `Ammo Regen Amount` | Rodadas restauraram cada intervalo de regeneração. `0` Desativa a regeneração. |
| `Ammo Regen Interval Ms` | O tempo entre os carrapatos de regeneração. `0` Desativa a regeneração. |
| `Reload Duration Ms` | NPC recarrega a duração do bloqueio. `0` usa o tempo de recarga vazio ou tático nativo da arma operada. |
| `Reload Speed Multiplier` | Multiplicador de velocidade apenas enquanto recarrega. `0` pára o movimento de recarga, `1` mantém a velocidade normal. |

:::warning Não use munição.
A munição NPC é gerenciada por `Ammo Stock`, estado de recarga de DW, e o estado de pilha nativo da arma operada. Não equipar munição física ou itens de revista para representar recargas de NPC.
:::

## Principais alternâncias

| Alternar | Comportamento |
| --- | --- |
| `Reload` | Permite que o NPC recarregue depois que a arma ficar vazia. |
| `Supply Ammo` | Usa munição adicional para recarregar a arma NPC após o atraso de recarga. |

Se `Supply Ammo` estiver desligado, o addon não será reabastecido de seu estoque de reserva. Se `Ammo Stock` for `0`, o NPC não tem munição de reserva, mesmo que a recarga esteja ativada.

## Recarregar tipos

| `Reload Type` | Comportamento |
| --- | --- |
| `Normal` | Recarregue quando a arma ficar vazia. |
| `Force Fixed` | Forçar uma recarga depois `Force Shots` Tiros bem-sucedidos, mesmo que as balas permaneçam carregadas. |
| `Force Range` | Depois de cada recarga, role um novo limite de disparo bem-sucedido de `Force Min` até `Force Max`, então force a próxima recarga nesse limite. |

Contadores de recarga forçados usam tiros bem sucedidos. Confirme a compatibilidade de recarga de armas nativas com `Normal` primeiro, depois use modos forçados somente quando o encontro precisar desse ritmo.

## Retrocesso de munição vazia

`Ammo-Aware Switching` Ativa somente quando a munição carregada da arma e a reserva do NPC `Ammo Stock` estão exaustos.

| Configurando | Comportamento |
| --- | --- |
| `Fallback To Melee` | Continue combatendo com a arma corpo-a-corpo configurada quando estiver disponível. |
| `Fallback To Unarmed` | Permitam corpo a corpo desarmado quando nenhuma arma corpo a corpo configurada puder ser usada. |

Quando o fallback termina e a munição se torna utilizável novamente, o NPC retorna à sua arma de alcance e recarrega o fluxo. Se o fallback for desativado, espera-se que um NPC totalmente esgotado pare de disparar.

## Remagem automática após a perda do alvo

`Auto Rearm After Target Loss` é um caminho de recuperação opcional para um NPC que entrou em queda de exaustão de munição e depois continuamente perdeu seu alvo.

1. O alvo deve permanecer ausente por `Rearm Start Delay (Seconds)`.
2. Requisitar um alvo cancela a recuperação pendente.
3. Após o atraso, a duração de recarga configurada ainda se aplica.
4. Uma recuperação bem-sucedida concede uma revista completa através do adaptador gerenciado e estado nativo da pilha de armas.

Isso não restaura `Ammo Stock` e não cria munição física. Use-o quando um NPC fallback estiver pronto para o próximo encontro sem receber reservas ilimitadas.

A animação de recarga é dividida por responsabilidade: a parte superior do corpo mantém a ação de recarga gerenciada enquanto a parte inferior do corpo continua o movimento real de caminhada, corrida ou agachamento do NPC. `Reload Speed Multiplier` muda a velocidade de movimento; não substitui o estado atual de movimento do corpo inferior por uma pose fixa de corpo inteiro.

## Fluxo de configuração recomendado

1. Comece com `Ammo Stock: -1`.
2. Confirme que o NPC dispara, recarrega e volta a disparar.
3. Mantenha `Reload Type: Normal`, então mude `Ammo Stock` para um valor finito somente após o loop básico funcionar.
4. Decida se reserva `0` deve parar o combate ou mudar para combate corpo a corpo/desarmado.
5. Adicione `Ammo Regen Amount` e `Ammo Regen Interval Ms` se o encontro precisar de reabastecimento lento.
6. Sintonize `Reload Duration Ms` só depois que o comportamento de recarga nativo da arma se sentir errado para o encontro.
7. Use `Reload Speed Multiplier` para criar janelas de vulnerabilidade durante a recarga.
8. Adicione `Force Fixed` ou `Force Range` último.
9. Adicionar rearme de perda de alvo somente se um NPC exausto se recuperar entre encontros.

Esta ordem separa problemas de fogo de problemas econômicos. Um NPC de munição finita que nunca dispara pode estar vazio, mas um NPC de munição infinita que nunca dispara provavelmente tem uma arma, alvo, posição, distância ou problema de linha de visão.

## Pressão de RPM e munição

`RPM Mode`, alcance aleatório de RPM, tiros mínimos e máximos de explosão, e precisão fixa ou de rampa, tudo muda a pressão da munição. Um NPC de alta RPM com munição finita pode esvaziar sua reserva rapidamente. Um NPC de baixa precisão pode parecer cinematográfico, mas pode desperdiçar munição se `Ammo Stock` É limitado.

Equilíbrio nesta ordem:

1. `RPM Mode: TACZ Native` com munição infinita.
2. Precisão fixa.
3. Alcance de explosão, precisão ou RPM fixo/aleatório.
4. Estoque de munição fina.
5. Regeneração ou recarga de penalidades de movimento.

## Referência de script e storeddata

A GUI é o caminho de configuração principal, mas os usuários de script também podem trabalhar com valores de ponte. O namespace `tacznpcfire.*` storeddata é mantido como um contrato de compatibilidade interna, mesmo que o ID de modificação pública seja agora `dochi_warfare`.

| Chave | Significado |
| --- | --- |
| `tacznpcfire.supplyAmmo` | Habilita ou desativa o fornecimento de munição adicional. |
| `tacznpcfire.ammoStock` | `-1` infinito, `0` vazio, rodadas finitas positivas. |
| `tacznpcfire.ammoStockMax` | Estoque máximo para regeneração. |
| `tacznpcfire.ammoRegenAmount` | Rodadas restauradas em cada intervalo. |
| `tacznpcfire.ammoRegenIntervalMs` | Intervalo de regeneração em milissegundos. |
| `tacznpcfire.reloadDurationMs` | Recarregar duração em milissegundos. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | Multiplicador de movimento só de recarga. |
| `tacznpcfire.reloadType` | `0` Normal, `1` Força Fixa, `2` Alcance de Força. |
| `tacznpcfire.forceReload.shots` | Contagem bem-sucedida para Força Fixa. |
| `tacznpcfire.forceReload.minShots` / `maxShots` | Contagens mínimas e máximas de tiro bem-sucedido para o Force Range. |
| `tacznpcfire.combat.ammoAwareSwitching` | Permite a troca de lógica quando carregada e reserva de munição estão ambos exaustos. |
| `tacznpcfire.combat.fallbackToMelee` | Permite o retorno à arma corpo a corpo configurada. |
| `tacznpcfire.combat.fallbackToUnarmed` | Permite que caiam desarmados quando nenhuma arma corpo a corpo está disponível. |

Use os dados armazenados somente quando o encontro realmente precisar de alterações no lado do script. Para a criação normal de NPC, mantenha os valores na GUI por NPC para que outros criadores possam inspecioná-los visualmente.
