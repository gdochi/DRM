---
title: Escolha seu BattleWorks Build
slug: battleworks-update-0-1-6
order: 208
description: Escolha DRM e um mod NPC para sua versão Minecraft.
product: mob-editor
category: 0.1.6 e seleção de carregador
section: start
status: Guia
version: 0.1.6
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Mods necessários

BattleWorks **adiciona NPC combate autor de DRM**. Crie o NPC com DNPC ou CustomNPCs.

| Minecraft / carregador | Java | Arquivos para escolher |
| --- | --- | --- |
| Forge 1.20.1 | 17 | Forge 1.20.1 compilações de BattleWorks, DRM e o mod NPC |
| Fabric / NeoForge 1.21.1 | 21 | 1.21.1 constrói para o carregador selecionado |
| Fabric / NeoForge 26.3 | 25 | 26.3 compilações de BattleWorks, DRM e DNPC para o carregador selecionado |

Combine carregadores/versões no servidor e nos clientes. Use DNPC em 26.3; CustomNPCs não está disponível lá.

## Faça um ataque.

Coloque um NPC, faça o seu BattleWorks arquivo de combate e aplicá-lo. Seguir [Seu primeiro ataque corpo a corpo](#mob-editor/battleworks-first-attack) para construir o vento, bater e se recuperar. O tutorial atual usa um DNPC em NeoForge 1.21.1 e verifica o salvamento, aplicação e dano real.

DNPC também apoia o combate, relacionamentos e integração de aparência. O movimento extra requer seus respectivos mods de animação.

O tutorial do primeiro ataque foi verificado com **BattleWorks 0.1.6 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**. O sucesso com essa combinação não estabelece uma versão mínima DRM que exclui todas as versões mais antigas.

![Uma salva. BattleWorks arquivo de combate ligado a um DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Após a instalação, verifique salvar, aplicar e um hit real, além de abrir o editor.")

## Usar padrões de exemplo

Carregar exemplos de `config/dochi_rpg_maker/mobs/patterns/samples/`. Use **Save As** para fazer sua própria versão.

Exemplos de Combate Melhor precisam de Combate Melhor compatível e suas exigências de movimento. Legacy CustomNPCs clone invocação não está disponível em 26.3.

Continue com [Configuração do NPC](#mob-editor/mob-editor-setup) ou o [caminho de aprendizagem](#mob-editor/mob-editor-overview).
