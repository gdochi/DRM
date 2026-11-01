---
title: Fluxos de trabalho recomendados
slug: workflows
order: 120
description: Fluxos práticos para NPCs de diálogo, NPCs de compras e configuração de moeda/HUD.
product: core
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

## Terminar um diálogo NPC

1. Abra o exemplo em [Dialogue Editor](#core/dialogue-system) e escreva a saudação em **Text**.
2. Em **Choices**, crie uma opção de resposta e uma opção de fechamento.
3. Verifique se **start → Rotas** aponta para a saudação.
4. **Save As** `village_guide`.
5. Abra o NPC com o núcleo e escolha **Dialogue JSON → village_guide → Apply Dialogue**.
6. Interaja com as duas mãos vazias e teste todas as escolhas.

![village_guide aplicado como o Diálogo NPC.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "DRM 0.3.1 / Forge 1.20.1. Selecione o arquivo, pressione Apply Dialogue e verifique seu nome à direita.")

Complete a conversa com o layout padrão primeiro. Para alterar sua aparência, copie um layout em [GUI Maker](#core/gui-system) e conecte-o nas configurações **GUI** do diálogo.

## Conecte uma loja

Em [NPC Shop](#core/shop-system), definido **Product → Payment → Restock** para bens, preço e estoque. Verifique **Preview**, Save As o arquivo e aplicá-lo em **NPC Shop JSON**. Prepare o pagamento, compre uma vez, depois verifique estoque e estoque.

![Preço do pão 4 com o pagamento da Loja Herança.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "DRM 0.3.1 / Forge 1.20.1. Quantidade 3 é o pão recebido por compra; Preço 4 são as esmeraldas pagas por compra.")

Para entrar no diálogo, adicione **go_shop** em **Choice actions** e escolha a loja salva. Use **bound** para a loja aplicada ao NPC atual.

## Adicionar moeda e uma exibição de saldo

1. Criar uma moeda em [Currency Editor](#core/currency-editor) e Save As.
2. Selecione-o para pagamento na loja, correspondência de itens físicos ou saldo DRM para o método pretendido.
3. Adicione Moeda em [HUD Maker](#core/hud-maker) e selecione a mesma moeda.
4. Teste a concessão de dinheiro, compras e o balanço juntos. Adicionar um HUD não dá dinheiro.

Ao mover arquivos, verifique a GUI conectada, loja e moeda em [ pastas salvas](#core/paths).
