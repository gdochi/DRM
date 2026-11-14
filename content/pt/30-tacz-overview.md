---
title: Faça um NPC de arma de fogo
slug: dochi-warfare-overview
order: 310
description: Use o Warfare para escolher a arma de um NPC, alvos, recargas e comportamento de combate.
product: dochi-warfare
category: Visão geral
section: overview
status: Rascunho
version: 0.3.3
audience: Criadores de NPC de armas de fogo
tags:
  - TACZ
  - customnpcs
  - overview
translationSource: en
translationMethod: assisted
---

## O editor de armas de fogo NPC

Abra o NPC com **DW Npc Core**. As categorias esquerdas contêm armas, sentidos, munição e seleção de alvos. Esta interface inglesa usa **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![Visão geral com o modo de arma de fogo ativado e as configurações atuais de detecção, combate e danos.](assets/media/guides/warfare-031-neo1211/dw-overview.png "Visão geral resume as configurações. Use arma para a arma, munição para recargas, e sentidos para detecção e taxa de fogo.")

## O que a guerra faz

Dê uma arma a um NPC e escolha seus alvos, movimento e recargas. Você também pode fazê-lo mudar para corpo a corpo nas proximidades, usar cobertura, patrulhar ou seguir comandos mercenários.

Crie o NPC com **DNPC or CustomNPCs**. Use DW para combate NPC; adicione **DWE** para veículos e tripulações.

## Configure um NPC primeiro

1. Instale os requisitos em [setup](#dochi-warfare/warfare-setup).
2. Clique com o botão direito do mouse no NPC com **DW Npc Core**.
3. Habilitar **TACZ Fire NPC Mode** e **Enabled**.
4. Escolha uma arma sob **Gun**.
5. **Save**, então colocá-lo à vista de um alvo válido.

**Easy Build / Presets** fornece configurações de combate inicial.

## Escolha o que mudar a seguir

| Objetivo | Guia |
| --- | --- |
| Use corpo a corpo nas proximidades e uma arma ao alcance | [Armas e posturas](#dochi-warfare/warfare-weapons-ai) |
| Ataque inimigos escolhidos | [ Regras do alvo](#dochi-warfare/warfare-target-filters) |
| Limitar ou reabastecer munição | [Recargas e estoque](#dochi-warfare/warfare-reload-ammo) |
| Proteja-se ou suprima os inimigos. | [ Cobertura e supressão](#dochi-warfare/warfare-cover-suppression) |
| Contratar e comandar NPCs | [Mercenários](#dochi-warfare/warfare-mercenary) |
| Mova veículos e atribua tripulações | [DWE](#dochi-warfare-expanded/expanded-overview) |

Coloque munição sobressalente com **Ammo Stock**. Não equipar munição ou itens de revista na mão do NPC.

## Plataformas suportadas

DW 0.3.3 oferece suporte a **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 1.21.1**. No Fabric, use TACZ Refabricated, Fabric API e Forge Config API Port. Player Animator é obrigatório nos clientes Forge/NeoForge e opcional no Fabric.

Veja [setup](#dochi-warfare/warfare-setup) para requisitos de versão.
