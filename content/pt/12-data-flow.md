---
title: Fazer alterações salvas aparecer
slug: data-flow
order: 105
description: Saiba quando salvar, aplicar a um NPC e recarregar arquivos editados.
product: core
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

![A pasta de conjunto após Save As a altera para village_guide.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. Isso confirma o arquivo salvo. Escolha seu NPC separadamente em NPC Apply.")


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



Veja [pastas](#core/paths) para locais exatos.
