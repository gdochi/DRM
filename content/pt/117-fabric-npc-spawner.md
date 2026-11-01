---
title: Use o Core NPC Spawner
slug: npc-spawner
order: 84
description: Escolha NPCs salvos e condições de geração para um bloco de gerador de núcleo.
product: core-fabric
category: Sistemas Principais
section: npc-spawner
status: Estável
version: 0.3.1
audience: Criadores / Operadores
tags:
  - npc
  - spawner
  - world
translationSource: en
translationMethod: assisted
---

## Que desovador é esse?

Isso é **DRM Core's NPC Spawner**, usando clones NPC de formato Core legíveis por sua lista de origem. Cobblemon Editor's Clone Library também conecta DNPCs configurados por função a esse fluxo de trabalho. Importar CustomNPCs Filled Soul Stones em alvos mais antigos 1.21.1 é um caminho de provedor separado.

Começando com DNPCO próprio Save As Modelo? Usar [Spawn ControlNPC-template desovador](#dochi-spawn-control/spawn-control-npc-templates). Para Cobblemon-Clonados de papel, sigam [Clone Library](#drm-cobblemon-editor/cobblemon-clone-library-spawner). Combine o formato do modelo com o desovador.

## Coloque e abra o bloco

1. Pegue `/give @s dochi_rpg_maker:npc_spawner` e coloque.
2. Clique com o botão direito do mouse no DRM Core.
3. Fique dentro de oito quarteirões enquanto edita.
4. Adicione NPCs salvos em **Source**. CustomNPCs Pedras de Alma Preenchidas aparecem quando carregadas no inventário.
5. Escolha o modo de geração, intervalo e quantidades em **Spawn**.
6. Pressione **Save**.

Salvar altera o bloco de mundo selecionado; ele não cria um novo arquivo através de Save As.

## Escolha entre vários NPCs

A fonte suporta até 64 entradas. **Weights** definir sua frequência relativa: guardas em 3 e arqueiros em 1 fazer guardas mais comum.

Uma nova escolha é feita para cada tentativa. **Max Active** tampas vivendo NPCs de toda a lista.

## Escolha quando ele é executado

![Configurações de spawn.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "DRM 0.3.1 / NeoForge 1.21.1, IU Inglês. O modo seleciona o gatilho, reduz o intervalo de carrapatos, ativa a tampa viva e o tamanho da onda a contagem por tentativa. Fontes atribuídas são zero neste caso: isso verifica a tela de configurações, não gerando NPC com sucesso.")

| Modo | Comportamento |
| --- | --- |
| contínuo | Tentativas em intervalos |
| target_nearby | Tentativas enquanto um alvo está próximo |
| target_enter | Tentativas quando um alvo entra |
| redstone_pulse | Tentativas em um pulso de redstone |

Por exemplo, Cooldown 200 é de cerca de dez segundos entre as tentativas; Max ativo 1 impede a geração adicional enquanto um permanece vivo; Tamanho da onda 1 tenta um NPC por ativação.

A recarga é 20–72,000 carrapatos. Cap ativo e tamanho da onda são cada um 1–32. O raio alvo é de até 64 blocos; o raio de geração é de até 32.

## Efeitos e aparência

Use **Conditions** para requisitos de ativação e **Effects** para partículas, aparência de bloco e tamanho. O NPC para desovar e a aparência do desovador são escolhas separadas.

Ao mover o mundo, também inclua modelos NPC de `config/dochi_rpg_maker/npc_spawner/`.
