---
title: Treinador Victory Quests
slug: cobblemon-trainer-quests
order: 568
description: Treinador Victory Quests
product: drm-cobblemon-editor
category: Treinador Victory Quests
section: trainer
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores
translationSource: en
translationMethod: assisted
---

## Requisitos

O ambiente verificado é Cobblemon Editor **0.2.9 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**. O addon adiciona **Trainer Victory** a DRM missões. Primeiro dê ao treinador uma identidade legível, depois ligue a mesma identidade na busca.

## Vincule uma ID de treinador

1. Selecione o tipo de batalha `Trainer` em Cobblemon Editor.
2. Abra **Battle Config → General → Set ID**. O campo está marcado **NPC ID**.
3. Digite uma ID legível como `gym_brock` e pressione `Use ID`. Um ID existente é reutilizado; um novo ID é criado e vinculado na mesma ação.
4. Salve o documento e aplique-o na batalha NPC.

As identidades estão aparadas e em minúsculas. Eles devem começar com uma letra ou dígito, podem conter letras minúsculas, dígitos, `_`, `.` e `-`, e estão limitados a 64 caracteres. Nomes de NPC e nomes de arquivos JSON não substituem a identidade do treinador.

O selecionador de identificação lista os objetivos do treinador-vitória de missões atualmente carregadas. Pesquise e selecione o ID do treinador de uma missão existente ao construir um NPC para uma missão que você já criou. Um NPC não precisa existir no mundo antes do design da missão.

![NPC ID entrou como gym_guide no seletor real.](assets/media/guides/cobble-029-neo1211/cobble-trainer-id-entry.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Vincule a NPC ID superior com Use ID. As missões de busca abaixo reutilizam uma identidade de uma missão carregada; nenhuma corresponde neste caso. Inspecionar controles de identidade é separado de verificar a contagem de vitórias reais.")

## Crie o objetivo

1. Criar uma busca e objetivo em DRM Quest Editor.
2. Escolha `Trainer Victory`.
3. Vincule a mesma identidade de treinador que o documento de batalha e defina as vitórias necessárias.
4. Salve a missão, então teste uma batalha real enquanto a missão do jogador está ativa. As missões configuradas para iniciar no primeiro progresso seguem essa política de início.

A exigência de 3 significa três vitórias separadas contra o treinador ligado. Múltiplos NPCs compartilhando uma identificação de treinador para o mesmo alvo. Use IDs distintas para contá-las separadamente.

## O que conta

Apenas jogadores confirmados vencem em DRM As batalhas de treinador contam. Perdas, fugas, cancelamentos, batalhas com Pokémon, e... RCT As batalhas de treinador não contam. Vitórias históricas não são importadas. A entrega repetida do mesmo resultado de batalha não adiciona outra vitória. A identidade é capturada quando a batalha começa.

Ambos atuais DRM Quest Editors autor de missões automáticas. Alcançar a contagem de vitórias exigida não termina toda a busca se outros objetivos permanecerem. Veja. [migração de dados](#core-fabric/loader-compatibility) Ao importar o JSON mais velho.

## Armazenamento e backups

O tipo objetivo é `cobble_npc:trainer_victory`; documentos fazem referência a um estábulo `trainerKey`. Vincule-o através do editor em vez de substituir manualmente uma identificação legível no JSON.

A criação de dados vive sob `config/dochi_rpg_maker`. Faça backup de documentos do treinador, pacotes de missões, `cobblemon/trainer_registry.json` e `cobblemon/trainer_registry.initialized` juntos, além do mundo contendo o progresso do jogador.
