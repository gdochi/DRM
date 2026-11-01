---
title: API de script do criador de popups
slug: script-popup-api
order: 131
description: Use drmPopup em scripts CustomNPCs para reproduzir definições do Popup Maker e substituir o texto da apresentação ou o tempo da linha do tempo.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs diálogo, busca, e autores de apresentação de combate
tags:
  - script
  - customnpcs
  - popup
  - forge
translationSource: en
translationMethod: assisted
---

## Mostrar um pop-up salvo de um script

Primeiro crie o título e o corpo em [ Popup Maker](#core/world-npc-tools) e salve uma definição. Em seguida, um script seleciona o nome do arquivo e o reproduz para um jogador. Este exemplo salva village_entry e chama com 10-tick fade-in, 80-tick hold e 20-tick fade-out.

![Mostra um pop-up salvo de um resultado de script.](assets/media/guides/drm-031-forge1201-apis/api-popup-shown.png "DRM 0.3.1 / Forge 1.20.1 com CustomNPCs. A verdadeira chamada PopupScriptApi.timed envia para um jogador e exibe Village Gate. Não é um gatilho automático de entrada na região.")

## Visão geral

`drmPopup` é um objeto de script global CustomNPCs que reproduz definições salvas pelo Popup Maker para jogadores de servidor. Expõe apenas ações de apresentação. As operações de edição, listagem e recarga de definições permanecem na GUI do Criador de Popup.

```js
function interact(event) {
    drmPopup.show(event.player, "village_entry.json");
}
```

O primeiro argumento resolve os jogadores que recebem. O segundo é um arquivo de definição do Popup Maker; o sufixo `.json` é opcional.

:::warning Exigência de tempo de execução
`drmPopup` é registrado quando Forge 1.20.1 DRM e CustomNPCs são carregados juntos. Chame no servidor. Um alvo que não resolve nenhum jogador do servidor retorna `0`.
:::

## Configuração

1. Abra **Popup Maker** da lista de editores incorporada DRM.
2. Definir título, subtítulo, corpo, fade-in, hold, fade-out, canal e comportamento de conflito.
3. Selecione um JSON de GUI e use **Edit Layout** quando as posições ou texturas dos componentes precisarem de alterações.
4. Salve a definição e passe o nome do arquivo para `drmPopup`.

As definições são gerenciadas sob os dados `dochi_rpg_maker/popups/definitions` do servidor e carregam seu JSON de GUI selecionado do armazenamento de GUI compartilhado. A API de script não aceita definição bruta JSON.

## Tabela completa do método

| Método | Retorna | Comportamento |
| --- | ---: | --- |
| `show(targets, definition)` | Jogadores enviados | Reproduza a definição salva inalterada |
| `text(targets, definition, text)` | Jogadores enviados | Substituir apenas corpo `text` |
| `timed(targets, definition, fadeIn, hold, fadeOut)` | Jogadores enviados | Substitua os três segmentos da linha do tempo |
| `timed(targets, definition, fadeIn, hold, fadeOut, text)` | Jogadores enviados | Superar o tempo e um corpo não vazio |
| `stop(targets, instanceKey)` | Jogadores enviados | Parar a chave de instância popup correspondente |
| `clear(targets)` | Jogadores enviados | Remover todos os pop-ups ativos e em fila |
| `lastError()` | String | Motivo de falha mais recente, vazio após o sucesso |

Argumentos de tempo são Minecraft carrapatos; 20 carrapatos são normalmente cerca de um segundo.

:::note O que? `timed` Means
`timed` não cria uma interface de contagem regressiva separada. Ele muda a duração da apresentação de fade-in, hold e fade-out do popup para essa chamada.
:::

## Alvos

`targets` pode ser um jogador servidor, um CustomNPCs jogador wrapper, um array, ou uma coleção iterável. Jogadores duplicados são enviados uma vez.

```js
drmPopup.show(event.player, "area_title");

drmPopup.text(
    [event.player, anotherPlayer],
    "quest_notice.json",
    "Quest updated"
);
```

A resolução está limitada a 1,024 jogadores distintos e quatro níveis de nidificação. NPCs e criaturas comuns não podem receber um popup.

## Texto corporal, quebras de linha e marcadores

Use `\n` em uma string JavaScript para uma quebra explícita de linha do corpo.

```js
drmPopup.text(
    event.player,
    "area_title.json",
    "Northern Frontier\nA new region has been discovered."
);
```

Guardado título, subtítulo, corpo e suporte de texto por jogador.

| Formulários | Valor |
| --- | --- |
| `@player`, `{player}`, `${player}`, `%player%` | Recebendo o nome do jogador |
| `{uuid}`, `${uuid}`, `%uuid%` | Receptor UUID |
| `@npc`, `{npc}`, `${npc}`, `%npc%` | Nome NPC fornecido por um contexto de apresentação DRM |

`@npc` resolve automaticamente somente quando um caminho DRM, como uma ação de diálogo, abre um contexto de apresentação NPC. Uma chamada de script direta `drmPopup` não tem argumento NPC, então componha esse texto explicitamente quando necessário.

```js
var body = String(event.npc.getName()) + "\nhas discovered a new area.";
drmPopup.text(event.player, "area_title.json", body);
```

## Substituições de tempo

Este popup desaparece para 10 carrapatos, mantém para 60 e desaparece para 20.

```js
drmPopup.timed(event.player, "area_title.json", 10, 60, 20);
```

Adicione um argumento final para substituir o corpo também.

```js
drmPopup.timed(
    event.player,
    "quest_notice.json",
    5,
    100,
    15,
    "Objective complete\nReturn to @npc"
);
```

Um corpo final vazio preserva o corpo salvo. Usar `text(targets, definition, "")` quando o corpo deve ser limpo.

## Comportamento de Conflito e Paragem

Os controles de valor `conflict` da definição se sobrepõem no mesmo canal.

| Valor | Comportamento |
| --- | --- |
| `replace` | Substitua o popup do canal ativo e sua fila |
| `refresh` | Substitua o pop-up ativo por uma nova instância |
| `queue` | Jogar depois que o popup atual terminar |
| `stack` | Jogue simultaneamente com espaçamento vertical |
| `ignore` | Ignorar um pedido enquanto o canal estiver ativo |

`show`, `text` e `timed` retornam contagens em vez de UUIDs de tempo de execução gerados. Use o `instanceKey` salvo na definição ao parar de um script.

```js
drmPopup.stop(event.player, "area_title");
drmPopup.clear(event.player);
```

## Limites de política e erros

A GUI Política Popup aplica esses valores aos scripts:

- `allowTextOverride` para `text` e texto-rolamento `timed` chamadas
- `allowTimingOverride` para `timed`
- `maxTextLength` para título, subtítulo e corpo
- `maxDurationTicks` para a linha do tempo completa
- `maxActivePerPlayer` e `maxQueuedPerPlayer` para limites de tempo de execução

Uma definição ou GUI ausente, ou uma substituição bloqueada, retorna `0` e armazena o motivo em `lastError()`.

```js
var sent = drmPopup.text(event.player, "quest_notice.json", "Quest updated");
if (sent == 0) {
    event.npc.say("popup failed: " + drmPopup.lastError());
}
```

## Combinando habilidades cross-mod

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "cataclysm:void_rune",
        event.player,
        4,
        drmSkill.options().set("damage", 14)
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "skill_notice.json",
            "Void Rune\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

Veja **Cross-Mod Skill Script API** para descoberta de provedores, IDs de habilidade, elencos de destino e direção, opções, códigos de resultados e recargas.

## Solução de problemas

1. Se `drmPopup` estiver indefinido, verifique se Forge DRM e CustomNPCs estão carregados juntos.
2. `Unable to load popup definition` significa que o nome do arquivo Popup Maker está errado ou faltando.
3. Um erro de carga de GUI significa que o JSON de GUI selecionado da definição está ausente do armazenamento de GUI compartilhado.
4. Se apenas `text` ou `timed` falharem, inspecione os switches de substituição da Política de Popup.
5. Para um pop-up invisível, inspecione a definição e o componente `enabled`, o comportamento de conflito do canal e os limites ativos/de fila.
