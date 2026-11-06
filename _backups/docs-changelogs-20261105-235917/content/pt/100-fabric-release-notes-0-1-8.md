---
title: Fabric 0.1.8 Atualização
slug: release-notes-0-1-8
order: 10
description: As principais adições em Fabric 0.1.8 desde o lançamento do público 0.1.7, além de requisitos de atualização.
product: core-fabric
category: Primeiros passos
section: getting-started
status: Estável
version: 0.1.8
audience: Jogadores / Criadores / Operadores
tags:
  - release
  - changelog
translationSource: en
translationMethod: assisted
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core-fabric/release-notes-0-3-1) para orientação atual.

0.1.8 é uma grande atualização construída sobre o diálogo, loja, Teleporter, e NPC Spawner ferramentas de 0.1.7. Ele adiciona missões, facções, popups, administração, e um conjunto de ferramentas de apresentação de NPC muito maior.

## Encontre objetivos e recompensas

Adicione uma Categoria e Busca em Quest Editor e preencha Informações, Objetivos e Recompensas. O diário do jogador é uma tela separada. Esta corrente NeoForge editor não estabelece todas as regras de conclusão em histórico Fabric. Continue com o guia [ atual](#core-fabric/quest-system) para salvá-lo e aplicá-lo.

![Encontre objetivos e recompensas.](assets/media/guides/drm-031-neo1211/quest-info.png "DRM 0.3.1 / NeoForge 1.21.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Novo em um olhar

| Característica | O que faz | Como abrir |
| --- | --- | --- |
| Quest Editor | Cria pacotes de missões com objetivos, pré-requisitos, recompensas, regras repetidas e links de diálogo NPC | Seletor de editor do item principal |
| Quest Journal | Pesquisar, rastrear, aceitar e transformar em missões do jogador | Chave padrão `U` |
| Faction Editor | Adiciona nomes, ícones, descrições, categorias e apresentação de relacionamento a facções CustomNPCs | Seletor de editor do item principal |
| Visão Geral da Facção | Mostra as pontuações e relações da facção do jogador | Chave padrão `J` |
| Criador de Popup | Cria anúncios com texto, imagens, sons, tempo e prioridade | Seletor de editor do item principal |
| DRM Admin | Gerencia tags de jogadores, moeda, missões, avanços, pontos de facção e dados armazenados | `F7` para operadores autorizados |

## Criação E Apresentação NPC

- As barras superiores do editor, painéis, listas, alinhamento e foco de entrada são mais claras e consistentes.
- Arquivos PNG em `config/dochi_rpg_maker/assets/textures` podem ser pesquisados, filtrados e visualizados.
- Um arquivo `.png.mcmeta` correspondente pode animar uma textura PNG.
- NPC Basic adiciona textura mais profunda, modelo, animação, pré-visualização de câmera e controles hitbox.
- Instalar GeckoLib permite modelos NPC personalizados, animações e ações de animação de diálogo.

## Melhorias de recursos existentes

- Uma moeda pode ter um formulário de item físico e um valor por item.
- HUDs podem exibir valores de CustomNPCs storeddata e tempdata.
- Comandos de teletransporte podem ser executados em momentos escolhidos ao redor do fade e teletransporte.
- Diálogo, lojas, NPC Apply, NPC Spawner, e Remnant Msg receberam buscas, rolagem, entrada e correções de visualização.
- Grandes listas de ativos e telas do editor evitam carregamentos repetidos desnecessários.

## Antes de atualizar

:::warning CustomNPCs agora é necessário
0.1.8 requer CustomNPCs `1.0.0`. Instale DRM 0.1.8, Fabric API e CustomNPCs no servidor e em cada cliente de conexão.
:::

GeckoLib, FTB Quests, Mod Menu, e CobbleDollars permanecem integrações opcionais. Faça backup do mundo e `config/dochi_rpg_maker` antes de atualizar.
