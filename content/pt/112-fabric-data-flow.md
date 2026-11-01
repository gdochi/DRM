---
title: Fazer alterações salvas aparecer
slug: data-flow
order: 105
description: Saiba quando salvar, aplicar a um NPC e recarregar arquivos editados.
product: core-fabric
category: Referência / Operações
section: operations
status: Estável
version: 0.3.1
audience: Criadores / Operadores
tags:
  - data-flow
  - architecture
  - json
translationSource: en
translationMethod: assisted
---

## Uma nova conversa ou loja

Use esta ordem: **edit → Save As → Aplicar a um NPC → interagir com as mãos vazias**.

Salvar cria o arquivo. Apply escolhe o NPC que o usa. Se você salvou apenas, clique com o botão direito do mouse no NPC com o Core e selecione o arquivo a ser aplicado.


![O NPC aplica a tela depois de selecionar uma conversa do servidor salva.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide foi selecionado e ligado a Apply Dialogue. Depois de Save As sob outro nome, selecione o novo arquivo aqui também.")

## Mude algo já aplicado

Abra o mesmo arquivo, use **Save** e, em seguida, interaja com o NPC novamente. Se você salvou com um novo nome, aplique esse novo arquivo ao NPC.

Verifique também os arquivos vinculados, como a GUI do diálogo ou a moeda da loja, ao substituí-los.

## Depois de editar um arquivo diretamente

| Conteúdo editado | Recarregar |
| --- | --- |
| Diálogo, lojas e outras configurações comuns | `/drm reload` |
| Configurações de moeda | `/drm currency reload` |
| Trabalho salvo em um editor | Feche e reabra a tela relevante |

Multiplayer usa os arquivos do servidor. Editar apenas a cópia local não altera a conversa do servidor.

## Mover o trabalho para outro servidor

Os arquivos estão em `config/dochi_rpg_maker/`. Mova uma pasta de conjunto de conversas inteira e inclua arquivos de loja/GUI vinculados.

Colocação de NPC, estoque restante da loja e contratos de trabalho também vivem no mundo. **Keep configuration and the world together** ao mover ou restaurar um servidor inteiro.

As configurações do NPC Spawner também estão no mundo. Copiar modelos por si só não copia as configurações de um bloco colocado.

Veja [pastas](#core-fabric/paths) para locais exatos.
