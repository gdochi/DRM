---
title: O que há de novo em 0.2.9
slug: cobblemon-editor-current-update
order: 480
description: Mudanças para recompensas sequenciais, DNPC Papéis e movimento de treinador.
product: drm-cobblemon-editor
category: Primeiros passos
section: overview
status: Estável
version: Fabric / NeoForge 0.2.9
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

## Recompensas após o diálogo

![Depois dos controles de Ações por ordem pós-batalha.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, IU Inglês. Abra Battle Config → Depois de Ações e escolha o modo Ação. Esta foto mostra o modo All inicial com zero ações, não uma execução completa de diálogo e recompensa Sequencial.")

Para recompensas após o diálogo, escolha **Sequential** e coloque a ação de diálogo antes de sua recompensa. Isso coordena a conclusão do diálogo com o pagamento posterior.

**Sequential** after-actions esperar até o diálogo termina antes de conceder recompensas posteriores. Após cancelamento/desconexão, a próxima interação com o NPC pode continuar com as ações restantes.

Cada rodada permite uma ação de diálogo. Veja [ etapas de configuração](#drm-cobblemon-editor/cobblemon-trainer-editor).

## DNPC papéis

DNPC suporta Treinador, Pokemon em si, Pokémon aparência, PokéMart, Enfermeira Joy e Starter Selector, além de conexões clone/spawner/battle-scheduler.

Treinadores podem correr e voltar enquanto DNPC **Position lock** está habilitado. Correções também abordam a velocidade do traço restante e a falha em retornar após o diálogo cancelado.

## Recursos transportados para a frente

Inclui: 0.2.7As melhorias da IA de batalha, seleção de movimento completo e Cobblemon 1.8.4 trabalho de compatibilidade. Mecânicas adicionais como Mega Evolution precisam de seus respectivos mods e itens-chave.

## Atualizar arquivos

Para Fabric/NeoForge em Minecraft 1.21.1. Use patches atuais de DRM Core, DNPC e Cobblemon Editor juntos para esses recursos. Veja [instalação](#drm-cobblemon-editor/cobblemon-editor-setup).
