---
title: Cozinhe e entregue comida
slug: npc-core-cooking
order: 1514
description: Escolha uma receita, armazenamento de ingredientes e estação de trabalho para o seu cozinheiro.
product: dochi-npc-core
category: Empregos
section: editor
status: Guia
version: 0.1.3
audience: Criadores de NPC
translationSource: en
translationMethod: assisted
---

## Prepare um trabalho de cozinha.

1. Coloque uma estação de trabalho acessível e armazenamento de ingredientes/saídas.
2. No editor do NPC, use **Schedule → Add time**, então a linha do tempo é ** + **. Procure por **Cooking**, ou encontre-o em **Gathering and production**.
3. Use o controle de navegação ao lado de **Food to cook** para selecionar uma receita. Ingredientes não são buscados antes de uma receita ser selecionada.
4. Atribuir **Ingredient source / Cooking block / Output**. Role o Inspetor para configurações mais baixas.
5. Fornecer ingredientes, qualquer ferramenta e combustível necessários, e depois definir **Batch / Repeat**.
6. Habilitar **Enable schedule** e **Save to NPC**. Verifique se a hora atual do mundo está dentro do período programado.

![Cozinhar adicionado a Schedule, com comida para cozinhar e fonte de ingredientes.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking.png "DNPC 0.1.3, O Prazer do Agricultor 1.3.4, NeoForge 1.21.1. Esta visão de preparação não tem receita ou estação e a programação está desligada. Atribua-os, ative o cronograma e salve.")

Habilitar **Repeat** para continuar cozinhando. Desative-o para terminar e entregar um lote, então espere.

## Leia a receita antes de preparar a estação

Pesquise por nome de comida ou ID do item e selecione uma linha de receita à esquerda. O mesmo bife pode ter receitas separadas de forno e fumante. Leia **Cozinhar bloco / Receita cozinhar tempo / Ingredientes para um lote de receita ** à direita antes de preparar a estação e ingredientes.

![A receita de carne de forno selecionada mostra uma carne crua e um 200- É hora de cozinhar.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking-beef.png "DNPC 0.1.3 / NeoForge 1.21.1. A busca é minecraft:cooked_beef. Esta fileira requer Forno, 200 carrapatos e carne crua ×1. Aplique atualizações no rascunho do editor; termine com Save to NPC separadamente.")

## estações de trabalho disponíveis

| Dispositivo | O que o NPC faz |
| --- | --- |
| Forno/fumador | Adiciona ingredientes e combustível, então recolhe o resultado |
| Placa de corte Farmer's Delight | Prepara ingredientes com a ferramenta necessária |
| Pizzeria do fazendeiro | Rola massa, adiciona coberturas e recolhe pizza crua |
| Mofo de queijo francês Delight | Preenche o molde, espera pelo envelhecimento e coleta queijo |
| Cestas/cabines suportados | Move ingredientes, itens intermediários e produtos |

Dispositivos extras precisam dos respectivos mods. O guia combinado de culinária e addon acima é baseado em **NeoForge 1.21.1**. Em outras carregadoras, escolha entre os dispositivos instalados e a lista de receitas disponíveis. Isto não é um 26.3 guia de cozinha.

## Os ingredientes estão prontos, mas cozinhar não começa

- Forneça o necessário **ferramenta** Bem como ingredientes.
- Verifique o armazenamento de ingredientes e a estação de trabalho.
- Deixe um caminho e espaço para ficar no dispositivo.
- Fornos/fumantes precisam **Combustível**.
- O armazenamento de saída total pode atrasar a coleta ou entrega.

Envelhecimento de queijo leva 1,200 carrapatos, cerca de um minuto na velocidade normal. Se a conversa interrompe brevemente o cozimento, o NPC pode coletar a comida depois que o dispositivo terminar.

Escolha o horário de trabalho em [schedules](#dochi-npc-core/npc-core-schedules).
