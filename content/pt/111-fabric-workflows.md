---
title: Fluxos de trabalho recomendados
slug: workflows
order: 120
description: Fluxos práticos para diálogo, lojas, Teleporter, NPC Spawner e configuração de moeda/HUD.
product: core-fabric
category: Referência / Operações
section: operations
status: Estável
version: 0.3.1
audience: Criadores
tags:
  - workflow
  - examples
translationSource: en
translationMethod: assisted
---

## Construir uma aldeia NPC nesta ordem

Comece com ** uma cena de conversa → interação real → loja ou viagem → aparência personalizada**. Layouts padrão são suficientes para testar diálogos e transações.

## Guia NPC: saudação e resposta

1. [ Coloque um DNPC ](#dochi-npc-core/npc-core-setup).
2. Escreva uma saudação em um general Dialogue Editor Node e uma pergunta em Choices.
3. Crie seu nó de resposta e conecte Goto. Rotas para a saudação.
4. Save As `village_guide` e Apply Dialogue para o NPC.
5. Esvazie as duas mãos e teste a pergunta → responda → fechar.

![Uma resposta real do NPC depois de selecionar a pergunta.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "DRM 0.3.1 / NeoForge 1.21.1. Verifique a conexão entre o texto criado e a resposta que o jogador realmente vê.")

Siga o tutorial [conversation](#core-fabric/dialogue-system) para cada tela. Para um presente único, conecte uma tag de reivindicação como mostrado em [condições e ações](#core-fabric/conditions-actions).

## Venda um pacote de pão.

Selecione Pão no padrão NPC Shop. Verifique a quantidade do produto `3` e o preço `4` e use o pagamento de esmeralda nas configurações da loja. Save As e aplicar NPC Shop para o NPC.

Na loja de verdade, verifique o Pão e pressione **Buy Selected**. Verificar **três pães concedidos, quatro esmeraldas tomadas e um pacote de ações consumido** antes de adicionar outros sistemas de recompensa.

![A loja depois que o Pão foi comprado.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "DRM 0.3.1 / NeoForge 1.21.1. Verificações do servidor confirmaram o pão 0→3, esmeraldas 10→6 E o estoque de pão 12→11. O rodapé segue o produto atualmente selecionado.")

Siga [ o tutorial da loja](#core-fabric/shop-system). Adicione [Currency Editor](#core-fabric/currency-editor) quando precisar de dinheiro da conta. Use a Go Shop para conectar a loja salva de uma escolha de diálogo.

## Viagem NPC: salvar um destino, então viajar

No Teleporter Editor, nomeie um destino e escolha coordenadas na mesma dimensão. Save As e aplicar o teletransporte para o NPC. Abra-o de mãos vazias, selecione o destino e pressione **Travel**.

![Chegada ao destino de viagem salvo.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "DRM 0.3.1 / NeoForge 1.21.1. As coordenadas do servidor confirmaram a chegada em 20.5 / -60 / 0.5. O marco foi preparado de antemão para verificação de localização.")

Veja [ o guia do teletransporte ](#core-fabric/teleporter) para condições e destinos bloqueados. Use o Go Teleporter para conectar o conjunto salvo do diálogo.

## Estenda um NPC funcional

| Próxima tarefa | Guia |
| --- | --- |
| Diálogo/aparência da loja | [GUI Maker](#core-fabric/gui-system) |
| Saúde persistente ou exibição de dinheiro | [HUD Maker](#core-fabric/hud-maker) |
| Reutilizar um NPC em vários pontos de reprodução | [DNPC modelos e Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) |
| Mais velho Core NPC Spawner | [Seu próprio guia](#core-fabric/npc-spawner); CustomNPCs fluxos de trabalho pertencem apenas a alvos mais antigos suportados |
| Mover o trabalho para outro servidor | [Folders](#core-fabric/paths) e [aplicando mudanças](#core-fabric/data-flow) |

Depois de Save As sob um novo nome, selecione esse novo arquivo para o NPC também. Traga fotos vinculadas, moedas e lojas, e preserve a colocação e o progresso do NPC mundial separadamente.
