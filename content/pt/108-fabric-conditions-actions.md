---
title: Condições e Ações
slug: conditions-actions
order: 90
description: Tipos de condição e ação implementados usados por nós de diálogo, rotas e escolhas.
product: core-fabric
category: Sistemas Principais
section: dialogue-editor
status: Estável
version: 0.3.1
audience: Criadores de script/dados
tags:
  - condition
  - action
translationSource: en
translationMethod: assisted
---

## Quem vê uma escolha, e o que acontece quando clicam?

**Condition list** controla se uma escolha é visível. **Choice actions** controla o que o clique faz. "Não recebeu o presente" é uma condição; "dar maçãs e gravar a reivindicação" é uma ação.

Selecione um nó geral, abra **Choices** e selecione a opção à esquerda. **Label** à direita é o botão do jogador. As duas guias abaixo editam as condições e ações separadamente.

## Mostre antes que o presente seja reivindicado.

1. Abra a escolha. **Condition list → Add**.
2. Escolha **Type: tag**.
3. Escolha **Op: not** e digite **Tag** `welcome_received`.

![Uma escolha que requer a ausência de welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-choice-condition-tag.png "DRM 0.3.1 / NeoForge 1.21.1. tag / not / welcome_received passa quando a tag está ausente.")

A condição não registra uma reivindicação por si só. Adicionar o **mesma tag através de uma ação Tag** ao conceder o presente. Siga [ recompensas únicas](#core/dialogue-rewards) para o fluxo total.

Sem condições significa que todos passam. Para várias condições, ** e** requer tudo; ** ou** requer pelo menos uma. Use e para "permission tag e pelo menos três esmeraldas", ou para "ou ambas as tags de permissão."

## Dê três maçãs em clique

Em **Choice actions**, mude a ação **Type** para **Item**, depois defina **Item: give**, **ID: minecraft:apple**, **Count: 3**. Use **+ Ação** para adicionar outra ação. Se o exemplo já tiver Goto, decida se deve substituí-lo ou mantê-lo após a recompensa.

![Item dado, minecraft:apple e Contagem 3 em uma escolha.](assets/media/guides/drm-031-neo1211/dialogue-item-reward-editor.png "DRM 0.3.1 / NeoForge 1.21.1. A etiqueta fornece o texto do botão; a ação Item concede o item real. Percorra o painel direito para chegar ao Conde.")

Depois de **Save As → NPC Apply**, clicar nessa escolha deu três maçãs no inventário do servidor. Este exemplo só de item fecha a janela depois de conceder os itens. Para mostrar uma resposta depois, adicione **Goto last and select the destination general node**.

## Escolha uma ação comum

| Objetivo | Ação | Valores a escolher |
| --- | --- | --- |
| Próxima cena de diálogo | Goto. | Nó geral de destino |
| Terminar a conversa | Fechar | Sem valores extras |
| Abra uma loja NPC | Vai às compras. | Loja encadernada ou arquivo de loja salva |
| Destinos de viagem abertos | Vai teleportador. | Conjunto de teletransporte salvo |
| Dar ou receber itens | Item | dar / tomar / conjunto, item e contagem |
| Marcar uma reivindicação | Tag | adicionar e o nome da tag |
| Remover uma marca | Tag | remover e o mesmo nome da etiqueta |
| Execute um comando | Comando | Comando do servidor sem a sua liderança |
| Conectar uma missão | Ação de missão atual | Siga as escolhas atuais no guia [quest](#core-fabric/quest-system) |

Organize ações em ordem de lista e coloque **Goto, shop opening or Close last**. Por exemplo: Item grant → Tag add → Goto.

## Para onde deve ir a condição?

| Localização | Propósito |
| --- | --- |
| Condições gerais do nó | Restringir o acesso a toda a cena |
| iniciar Rotas | Escolha a primeira cena quando a interação começar |
| Escolhas → Lista de condições | Esconder ou mostrar escolhas individuais dentro de uma cena |

Para esconder um botão, condicione essa escolha. Para mudar toda a saudação, condicionar uma rota de início que leva a outro nó geral. Veja [ criando uma conversa](#core-fabric/dialogue-system).

## Condições que precisam de outro mod

Itens, tags e avanços comparam seus valores correspondentes. As condições da missão FTB exigem missões FTB. `faction_score` lê CustomNPCs pontos de facção, não DNPC amizade ou hostilidade.

**CustomNPCs Stored Data** é uma conexão avançada com dados escritos por script. O exemplo da Tag é suficiente para um presente comum. CustomNPCs as condições são limitadas aos alvos mais antigos suportados Minecraft e não estão disponíveis em 26.3.

Use a referência [JSON](#core-fabric/json-reference) somente ao editar arquivos diretamente.
