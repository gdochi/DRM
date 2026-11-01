---
title: Conversas, lojas e arquivos salvos
slug: npc-core-files
order: 1520
description: Adicione outros recursos de mods a DNPC e encontre seu trabalho salvo.
product: dochi-npc-core
category: Arquivos NPC e integrações
section: operations
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Adicionar conversas ou lojas

Instale **DRM**, clique com o botão direito do mouse no DNPC com o DRM Core e escolha um arquivo salvo em **NPC Apply**.

![NPC Apply depois de aplicar village_guide, com sua ligação Diálogo mostrado em APLIED JSON à direita.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "Exemplo de DRM 0.3.1  +  DNPC 0.1.2 / NeoForge 1.21.1. Escolha uma função à esquerda, um arquivo no meio e aplique abaixo; verifique a ligação resultante à direita.")

Para o diálogo, use **Dialogue JSON → select file → Apply Dialogue**. Para uma loja, use **NPC Shop JSON → select file → Apply Shop**. Salvar um arquivo de editor e conectá-lo a este NPC são etapas separadas. Afaste o Núcleo e interaja com o NPC depois.

Comece com [Forge diálogo](#core/quick-start) ou [Fabric/NeoForge diálogo](#core-fabric/quick-start).

## Escolha um mod para o seu objetivo

| Objetivo | Mod extra |
| --- | --- |
| Conversas, lojas e emprego de jogadores | DRM |
| Pokémon Formadores, lojas, cura e entradas | Cobblemon Editor e suas exigências |
| Spawn salvou NPCs sob as condições escolhidas | Spawn Control e DRM |
| Padrões de corpo a corpo e batalhas de chefe | BattleWorks e DRM |
| NPCs de armas de fogo e equipes de veículos | DW / DWE e suas necessidades |
| Armadura que reduz os danos recebidos | Real Armor |
| Apresentações de instrumentos | Melodias Imersivas |

Alvo DW/DWE Forge 1.20.1 e NeoForge 1.21.1. CustomNPCs não está disponível em 26.3. Use o guia de configuração de cada mod para escolher os arquivos correspondentes.

## Encontrar trabalho salvo

| Conteúdo | Localização |
| --- | --- |
| Modelos NPC | `config/dochi_npc_core/templates/` |
| Poses | `config/dochi_npc_core/poses/` |
| PNGs de pele de servidor | `config/dochi_npc_core/assets/textures/` |
| Configurações globais | `config/dochi_npc_core/global.json` |
| Configurações do cliente | `config/dochi_npc_core/client-settings.json` |
| DRM Configurações de emprego | `config/dochi_rpg_maker/dochi_npc/employment/` |

Os NPCs e os contratos também são salvos no mundo. Inclua o mundo ao mover um servidor.

## Converter outro NPC em DNPC

Em 1.20.1 / 1.21.1, abra **Global settings → Experimental features → World scan** e selecione um NPC. Leia quais partes podem ser convertidas antes de prosseguir.

Apenas conteúdo suportado, como aparência, equipamentos e relacionamentos, transferências. Mantenha uma cópia do mundo antes da conversão. CustomNPCs A conversão não está disponível em 26.3.
