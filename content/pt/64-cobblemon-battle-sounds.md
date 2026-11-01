---
title: Treinadora de sons de batalha
slug: cobblemon-battle-sounds
order: 525
description: Regras de som comuns e per-round atuais desencadeadas pelo restante do treinador Pokémon Conte.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Estável
version: Fabric / NeoForge 0.2.9
audience: Criadores que criam o áudio de batalha do treinador
tags:
  - battle-sounds
  - rounds
  - audio
translationSource: en
translationMethod: assisted
---

## Qual é essa característica?

`Battle Sounds` São regras de tempo de execução que jogam enquanto uma batalha de Treinador está ativa, com base no restante do treinador. Pokémon Conte.

- Eles são separados de Battle Presentation Maker áudio da linha do tempo.
- Eles correm durante o real Cobblemon batalha, não durante a apresentação pré-batalha.
- Eles trabalham independentemente de DRM Estratégia, RCT ou Cobblemon AI forte.
- Eles se aplicam a batalhas de Treinadores, não a encontros com Pokémon.

![A batalha soa com restos...Pokémon Contagem e seleção global.](assets/media/guides/cobble-029-neo1211/cobble-sounds.png "Battle Config → A batalha soa. Para alterar a música em um restante Pokémon, selecione 1, habilite Reproduzir nesta contagem e escolha ID de Som. Aplique e salve o documento principal. 0.2.9 / NeoForge 1.21.1.")

## Fluxo de trabalho de criação

1. Abra um documento do Treinador em `Cobblemon Editor`.
2. Escolha `Battle Sounds` no topo de uma seção de Treinador. `Battle Strategy` também pode abrir o mesmo editor enquanto preserva a rodada atual.
3. Selecione `Global (all rounds)` ou uma rodada específica à esquerda.
4. Selecione uma contagem de gatilhos de 1 até 6.
5. Habilite `Play at this count` e, em seguida, escolha um ID de som, volume e pitch.
6. Use `Play` e `Stop` para visualizar o som no cliente.
7. Escolha `Apply` e, em seguida, salve o documento do instrutor no editor pai com `Save` ou `Save As`.

`Close` não aplica o rascunho do editor. Se os valores forem alterados ou os números inválidos permanecerem, uma confirmação perguntará se devem ser descartados.

## Modos globais e per-round

| Alvo | Modo | Comportamento |
| --- | --- | --- |
| Todos os rounds | Global | Linha de base para cada rodada de herança |
| Uma rodada | `Use global` | Resolver as regras globais atuais durante o jogo |
| Uma rodada | `Custom` | Use um conjunto independente de regras de contagem |
| Uma rodada | `Off` | Não toque nenhum desses sons mesmo quando existem regras globais. |

A primeira vez que uma rodada muda para `Custom`, ela usa as regras globais atuais como rascunho inicial. Edições posteriores afetam apenas essa rodada.

## Comportamento de gatilho

- A contagem inclui todos os treinadores ativos e em banco. Pokémon.
- A primeira contagem observada após a partida de batalha pode disparar. Um seis...Pokémon O treinador pode, portanto, jogar o `6` regra no início.
- Um evento fraco marca a contagem para outra verificação do lado do servidor.
- Cada contagem joga no máximo uma vez em uma batalha.
- Zero significa que a batalha terminou, então não há regra de contagem zero.
- Uma revanche cria uma nova sessão de batalha com um novo estado de gatilho.

## Configurações de som

| Configurando | Alcance ou comportamento |
| --- | --- |
| ID de som | Um som de namespaced disponível através dos pacotes de recursos ativos do cliente |
| Volume | 0–4; zero não é jogável |
| Pitch | 0.05–4 |
| `Stop sounds first` | Pare a música de batalha atual e os sons iniciados por essas regras antes de tocar o novo som |

O selecionador procura nomes e IDs traduzidos. Se a visualização falhar, primeiro confirme se o som existe nos pacotes de recursos ativos. A navegação ou a seleção de um som não ativa automaticamente `Play at this count`.

O botão de visualização `Stop` pára apenas o som reproduzido por este editor. Não muda a política de tempo de execução `Stop sounds first`.

## Limpeza do tempo de execução

Quando a batalha termina ou sua sessão é limpa, o servidor diz ao cliente para parar o áudio associado a esta batalha de treinador. Isso não funciona como uma parada global para sons de jogos não relacionados.

## Referência JSON

Esta é uma informação de referência para ferramentas externas e controle de versão. No esquema Trainer 22, as regras globais são armazenadas em `trainerOptions.battleSound.rules[]`; configurações por rodada usam `rounds[].battleSoundOverride`. Cada regra contém `remainingPokemon`, `enabled`, `sound`, `volume`, `pitch` e `stopBeforePlay`. A autoria através do editor é recomendada.
