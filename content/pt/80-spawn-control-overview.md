---
title: Criaturas esparramadas onde e quando você quiser
slug: dochi-spawn-control-overview
order: 810
description: Escolha regras de geração naturais ou desovadores colocados para criaturas e NPCs.
product: dochi-spawn-control
category: Visão geral
section: overview
status: Rascunho
version: 0.1.5
audience: Operadores de servidor e criadores de modpacks
tags:
  - spawn control
  - natural spawn
  - forge
translationSource: en
translationMethod: assisted
---

![Spawn Control para regras de geração natural.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. A esquerda seleciona o alvo, o meio lista suas regras e a direita edita a regra selecionada. Spawners colocados abrem o editor separado.")

## Escolha como eles aparecem

| Objetivo | Usar |
| --- | --- |
| Uma criatura em particular aparece nas florestas à noite. | Regras de geração natural |
| Inimigos retornam em uma masmorra | Um desovador colocado |
| Um guarda acabado aparece em um posto | Um modelo salvo DNPC |

Regras naturais verificam a área ao redor dos jogadores. Os reprodutores trabalham em volta do quarteirão.

## Mude a geração natural

Pressione default **K**, escolha uma criatura à esquerda e **Add rule**. Defina suas localizações, horas e quantidades, e então economize.

Um zumbi pode ter regras separadas de floresta e caverna. Uma regra para porcos não afeta vacas.

Seguir [Sua primeira regra natural](#dochi-spawn-control/dochi-spawn-control-setup).

## Coloque um desovador

Abra **Spawner Editor** do editor selecionador de DRM. Escolha criaturas e condições, use **Get Spawner**, coloque e aplique a configuração salva.

Veja [criar um desovador](#dochi-spawn-control/dochi-spawn-control-spawner).

## As crias originais continuam?

**Original spawning ON** permite que o jogo geração ao lado de suas regras. Defina **OFF** para usar apenas suas regras para geração natural.

Isso não bloqueia comandos, criação ou outros criadores.

## NPCs e veículos

Use um modelo [ NPC ](#dochi-spawn-control/spawn-control-npc-templates) para manter a aparência e o equipamento de um DNPC. Você também pode. [desovar veículos salvos](#dochi-spawn-control/spawn-control-vehicles).

Regras comuns de criaturas naturais não precisam de nem DRM nem um mod NPC. Adicione os respectivos mods para NPCs ou veículos.

Na 0.1.5, limite os locais com IDs e tags de biomas ou estruturas e reúna criaturas ou NPCs em um esquadrão. Siga o guia de [guardas de estruturas](#dochi-spawn-control/spawn-control-guards).
