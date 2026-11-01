---
title: Forge 0.2.2 Atualização
slug: release-0-2-2
order: 6
description: Editor favoritos e melhorias para PNG externo e NPC-modelo texturas.
product: core
category: Iniciar
section: getting-started
status: Guia de uso
version: 0.2.2
audience: Criadores/operadores
translationSource: en
translationMethod: assisted
---

## Localizar favoritos do editor

Use uma estrela ao lado de um editor para favoritar, depois retorne através de Favoritos à esquerda. Carregar, Use Default e Create New começar a trabalhar no editor selecionado. Continue com o guia [ atual](#core/quick-start) para salvá-lo e aplicá-lo.

![Encontre os favoritos do editor.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Instalação neste lançamento

O DRM Núcleo atual para Minecraft 1.20.1 / Forge / Java 17 é **0.2.2**. Fabric e NeoForge 1.21.1 usam Core 0.2.5; selecione o JAR para seu carregador. Atualize o servidor e os clientes juntos e faça backup das configurações e do mundo.

## Editor favoritos

Use ☆/★ na lista de editores para adicionar ou remover ferramentas favoritas. Encontre-os na categoria Favoritos e no topo da lista. As preferências são locais para a instância do jogo em `config/dochi_rpg_maker/editor_favorites.json`; elas não alteram os documentos do servidor ou as vinculações NPC.

## Imagens externas e texturas NPC

PNGs de ativos de servidor e texturas de pacotes de recursos são resolvidos separadamente, com um fallback durante o carregamento ou download. A integração da imagem GUI e da textura do modelo Gecko NPC foi melhorada. Armazene imagens externas em `config/dochi_rpg_maker/assets/textures/` e faça referência a elas como `dochi_rpg_maker:textures/...png`.

## Novo addon de mapa

[ MapIcon Integração 0.1.0](#dochi-mapicon-integration/mapicon-setup) é instalado separadamente. Ele configura ícones Xaero por tipo JSON, arquivo e NPC; instalar o Core sozinho não fornece ícones de mapa.

O [ 0.2.1 registro](#core/release-0-2-1) permanece disponível para suas NPC Shop ações e GUI tiling mudanças.
