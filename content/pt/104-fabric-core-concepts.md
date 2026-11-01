---
title: Salvar, carregar e aplicar
slug: core-concepts
order: 50
description: Entenda os botões que você usa para salvar o trabalho e anexá-lo a um NPC.
product: core-fabric
category: Sistemas Principais
section: getting-started
status: Estável
version: 0.3.1
audience: Criadores
tags:
  - concepts
  - glossary
translationSource: en
translationMethod: assisted
---

## Os botões que você vai usar

| Botão | Use-o para |
| --- | --- |
| **Load** | Abra o trabalho salvo ou um exemplo empacotado |
| **Save** | Mantenha as alterações em seu próprio arquivo |
| **Save As** | Faça sua própria cópia de um exemplo ou salve sob outro nome |
| **Apply** | Anexar uma conversa, loja ou outro trabalho salvo a um NPC |

**Close** e as setas para trás/para a frente não salvam seu trabalho.


![O NPC aplica a tela depois de selecionar uma conversa do servidor salva.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide foi selecionado e ligado a Apply Dialogue. Depois de Save As sob outro nome, selecione o novo arquivo aqui também.")

## Conteúdo e aparência são separados

Escreva diálogos e escolhas em **Dialogue Editor**. Organize a janela de diálogo, cores e imagens em **GUI Maker**. Coloque produtos e preços em **NPC Shop**.

Você pode terminar o conteúdo usando a tela padrão primeiro. Para alterar sua aparência mais tarde, escolha sua GUI salva na conversa ou nas configurações de GUI da loja.

## Reutilizar o trabalho em vários NPCs

Aplique uma conversa salva a vários NPCs para compartilhá-la. A edição desse arquivo atualiza o conteúdo compartilhado. Para conversas diferentes, faça cópias separadas com **Save As**.

Lojas que usam o mesmo arquivo de produto ainda têm **estoque separado para cada NPC**. Jogadores que visitam o mesmo NPC compartilham as ações do NPC.

## Condições e ações

A **condição** decide quem pode ver ou usar algo: por exemplo, mostrando uma escolha depois que uma missão estiver completa. Um **ação** decide o que acontece quando é escolhido, como dar um item ou abrir uma loja.

Use [condições e ações](#core-fabric/conditions-actions) para adicionar esses comportamentos.
