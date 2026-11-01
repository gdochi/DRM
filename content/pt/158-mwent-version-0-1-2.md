---
title: 0.1.2 — cartas inalteradas e estabilidade
slug: version-0-1-2
order: 1580
description: Zero cartões novos ou reequilibrados, interface do usuário e trabalho de estabilidade do servidor, e mais tarde 26.3 uploads.
product: mwent
category: Lançar histórico
section: releases
status: Registro de lançamento público
version: 0.1.2
audience: Jogadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Upload público

CurseForge recebeu [Fabric 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309263), [NeoForge 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309269) e [Forge 1.20.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309265) em outubro 24, 2026. O mesmo. 0.1.2 Liberação ganha [Fabric 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317314) e [NeoForge 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317311) uploads em outubro 25.

## Adições e alterações de cartão

| Comparação | 0.1.1 → 0.1.2 |
| --- | --- |
| Adicionado / removido cartões | Zero / zero |
| Definições incorporadas | 263 → 263 |
| Definições opcionais-mod | 89 → 89 |
| Impressões regulares e animadas | 704 → 704 |
| Poder, provisões, moldura ou mudanças de raridade | Zero |
| Implante, ordem, palavra-chave ou alterações de referência de aparência | Zero |

Esses valores comparam os catálogos finais incorporados e opcionais do ** real carregado Fabric 1.21.1 JARs**, em vez de estimar a história da fonte de hoje. Sem cartões adicionais, o [0.1.1 baseline](#mwent/version-0-1-1) continua.

## Jogabilidade e estabilidade do servidor

![Barra de ferramentas atual e controles de quantidade.](assets/media/guides/minigames-016-neo1211/mwent016-deck-catalog.png "Atual 0.1.6 / NeoForge 1.21.1 tela. Troca de baralho, Deck padrão e partida de início são separados dos controles de quantidade de cartão. As notas de estabilidade abaixo dizem respeito a 0.1.2; esta não é uma captura de tela capturada nessa versão.")

Para os controles atuais, siga [ coleções e baralhos](#mwent/cards-decks) da edição para o início da partida.

O 0.1.2 Registros de implementação confirmam reparos em controles de barras de seleção de deck sobrepostos, exibição de pele de jogador em lobbies de mesa e visualizações de aldeões em telas de IA não atribuídas. Iniciar um perfil de IA não atribuído permanece desativado.

O trabalho do servidor reduz as cópias de estado repetidas e duplica as transmissões de mesmo tick, suprime transmissões desnecessárias para entradas PvP inválidas, distribui decisões de IA entre ticks e interrompe transmissões periódicas inalteradas após o término das partidas. São melhorias de processamento e exibição, em vez de poder do cartão ou buffs de provisão e nerfs.

O upload 26.3 é um alvo Java separado 25. Não substitua um arquivo 1.21.1 por ele. A comparação de artefatos históricos não estabelece compatibilidade de tempo de execução com combinações arbitrárias de mod externo.
