---
title: Reutilizar Treinadores com Clone Library
slug: cobblemon-clone-library-spawner
order: 560
description: Salve um treinador aplicado como um clone e conecte-o a um Core NPC Spawner.
product: drm-cobblemon-editor
category: Palhaços e Spawners
section: world-tools
status: Guia de uso
version: Fabric / NeoForge 0.2.9
audience: Criadores reutilizando NPCs de batalha
tags:
  - clone-library
  - npc-spawner
translationSource: en
translationMethod: assisted
---

## Guarde um treinador acabado para reutilização

**Clone Library** salva um NPC que já tem um papel de Treinador ou Pokemon. Escolha esse clone como fonte em **DRM Core NPC Spawner**. DNPC os próprios modelos Save As usam um formato diferente; use [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) para esses modelos.

O seguinte fluxo de salvar e aplicar foi verificado com **Cobblemon Editor 0.2.9, DRM 0.3.1 e DNPC 0.1.3 em NeoForge 1.21.1**.

1. Construa uma equipe em [Trainer Editor](#drm-cobblemon-editor/cobblemon-trainer-editor) e **Save As** seu próprio arquivo.
2. Abra o NPC com o DRM Core. Escolha ** vs Trainer → seu arquivo → Apply vs Trainer**. Verifique o nome do arquivo em **APPLIED JSON** à direita.
3. Abra **Clone Library** para esse NPC e escolha **Save As**.
4. Ativar **Follow applied JSON source** se novos clones devem seguir edições para o arquivo original. Verifique o nome e pressione **Confirm**.
5. Encontre o NPC em **Saved Clones**. Selecione sua linha para detalhes e **Test Spawn**.

![NPC Apply com guide_trainer conectado sob vs Treinador.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "vs Treinador à esquerda seleciona uma categoria; Aplicar vs Treinador na parte inferior executa a ligação. O servidor reconheceu custom/guide_trainer.json e o nome do arquivo apareceu à direita.")

![Saved Oakridge treinador guia em Clone Library.](assets/media/guides/cobble-029-neo1211-flow/cobble-clone-library.png "O servidor retornou o clone salvo: trainer/guide_trainer_clone e criou seu arquivo. O armazenado entityType é dochi_npc:npc e bindingPolicy é follow_source. Isso mostra a poupança de clones, não uma corrida de geração concluída.")

## Escolha como as edições afetam clones

| Configurando | Use-o quando |
| --- | --- |
| **Follow applied JSON source** ativado | Os NPCs recém-criados devem ler as alterações no arquivo de origem aplicado |
| Desativado: **Snapshot** | O NPC salvo deve manter seu conteúdo capturado sem seguir edições de origem posteriores |

Salvar um ID de clone existente requer a confirmação de substituição. Antes de excluir um clone, verifique quais criadores usam seu ID; essas entradas não podem aparecer depois que sua fonte for removida.

A aba **Filled Soul Stones** importa o legado CustomNPCs fontes através desse provedor em alvos antigos suportados Minecraft. É separado de salvar um DNPC Alvo.

## Conectar um Core NPC Spawner

1. Lugar `dochi_rpg_maker:npc_spawner`.
2. Segure o item DRM Core, `dochi_rpg_maker:dialogue_editor`, e clique com o botão direito do mouse no bloco.
3. Em **Source**, adicione um clone salvo.
4. Em **Spawn**, comece com **Wave size 1** e **Max active 1**, depois **Save** até o bloco.
5. Teste de detecção de alvo em Sobrevivência: Jogadores criativos e espectadores são excluídos.

![Core NPC Spawner configurações de tempo e quantidade.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "Modo seleciona o gatilho, Recarga o intervalo, Max ativa o limite de vida e Tamanho da onda a contagem por ativação. Esta captura separada tem fontes atribuídas 0 e mostra apenas as configurações; não estabelece que o clone salvo foi gerado.")

Use o bloco Core para novas colocações. O antigo bloco addon `cobble_npc:clone_spawner` permanece para compatibilidade com o mundo existente. Este é um gerador de blocos fixos; o bioma e a geração de pedaços pertencem a um sistema separado de raia natural.

### Gatilho e quantidade de referência

| Configurando | Escolhas / intervalo |
| --- | --- |
| Modo | Contínuo, Alvo Próximo, Alvo Entre, Pulso de Pedra Vermelha |
| Arrefecer. | 20–72,000 carrapatos |
| Max Active / Tamanho da onda | 1–32 cada um |
| Raio alvo | 1–64 blocos |
| Deslocamento | −32–32 blocos por eixo |
| Raio aleatório | 0–32 blocos |
| Fonte da piscina | Até 64 clones; cada peso 1 – 10,000 |
| Condições | Até 32 regras verificadas pelo servidor |

Os pesos influenciam a seleção aleatória para cada fenda de geração; eles não definem uma sequência fixa. **Require Target**, **Remove Inactive** e o controle Ignore/Powered/Unpowered do redstone quando o bloco pode operar. **Effects** mudanças geram partículas e a aparência do bloco; a aparência do NPC vem de seu clone.

## Mantenha os arquivos necessários juntos

| Pasta | Conteúdo |
| --- | --- |
| `config/dochi_rpg_maker/npc_spawner/entity_clones/` | Armazenamento de clone do núcleo |
| `config/dochi_rpg_maker/cobblemon/entity_clones/` | Cobblemon Clone Library armazenamento de compatibilidade |

O núcleo atual lê os dois locais. Evite IDs duplicados e mantenha os arquivos de origem `cobblemon/trainers/` e `pokemon_itself/` com clones de código-seguinte. Preservar o mundo também ao mover os reprodutores instalados.

## Verifique a limpeza da batalha antes de adicionar ondas

Cobblemon Editor registra limpeza consciente de batalha com o Core. Um NPC reservado para a batalha não é imediatamente removido por **Remove Inactive** ou limpeza de onda; remoção espera até que a reserva termine.

Comece com um clone. Confirme sua aparência e papel de batalha com **Test Spawn**, depois teste o desovador instalado, deixando sua área de detecção durante uma batalha, limpeza depois e um reinício do servidor. Verifique distribuições ponderadas sobre ativações repetidas em vez de julgar um único resultado.
