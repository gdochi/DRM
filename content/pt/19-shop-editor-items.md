---
title: Produtos, Buyback e Stock
slug: shop-editor-items
order: 81
description: Faça um produto de três pães custando quatro esmeraldas, depois configure estoque e reabastecimento.
product: core
category: NPC Shop
section: npc-shop
status: Guia
version: 0.3.1
audience: Criadores de lojas
translationSource: en
translationMethod: assisted
---

## Escolha em que direção o comércio vai

Abra a loja padrão em [NPC Shop setup](#core/shop-system). **Buy items** contém produtos que o jogador compra; **Sell items** contém itens que o jogador vende para o NPC. O modo de troca da loja também deve permitir a direção selecionada.

| Exemplo | Lista | O jogador recebe |
| --- | --- | --- |
| NPC vende pão | Comprar itens | Pão depois de pagar |
| NPC compra trigo | Vender itens | O pagamento configurado depois de dar trigo |

## Faça um pacote de três pães

![Pão selecionado em Comprar itens, com configurações de produto.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "DRM 0.3.1 / Forge 1.20.1. Quantidade 3 É pão por compra. 12 significa doze compras, não doze pães.")

1. Selecione **Bread** ou use **Buy items → Add**.
2. Escolha o pão sob **Product → Item** e defina a exibição **Name**.
3. Conjunto **Quantity 3**, **Stock 12** e **Maximum stock 12**.
4. Adicione um produto **Description** se necessário. É separado do próprio nome e efeitos do item entregue.

Use **Duplicate** para uma variação e **Delete** para uma linha indesejada. Pão comum não precisa de NBT personalizado; correspondência de itens especiais pode precisar dele.

## Carregar quatro esmeraldas para todo o pacote

![Aba de pagamento de pão com preço quatro e pagamento de esmeralda.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Preço 4 compra todo o pacote Quantidade 3. item:minecraft:emerald identifica o item de pagamento.")

Abra **Payment**, defina **Price 4** e use **Payment method → Inherit Shop** para seguir a moeda padrão da loja. Leia **Preview** antes de salvar. Escolha **Override: Item / Override: Currency** para um pagamento específico do produto; use **Required items** para vários materiais. Veja [ conexões de moeda](#core/shop-currency-gui).

## Reabastecer um produto limitado

![Aba de reabastecimento com controles de intervalo e quantidade.](assets/media/guides/drm-031-forge1201/shop-restock.png "Ative o reabastecimento e defina o intervalo de reabastecimento, a quantidade de reabastecimento e o estoque máximo. O reabastecimento pára no máximo.")

| Configurando | Significado |
| --- | --- |
| Estoque 12 / 0  / − 1 | 12 compras / esgotado / ilimitado |
| Estoque máximo 12 | Tampa de recarga |
| Reabastecimento 2 | Restaurar duas compras por intervalo |
| Intervalo de reabastecimento 24000 carrapatos | Uma normal. Minecraft Dia em 20 ticks por segundo |

Use quantidade positiva, intervalo e máximo para reabastecimento finito. A loja **Timer basis** determina como o tempo de sono pulado é contado; veja [configuração da loja](#core/shop-system). Dois NPCs usando um arquivo de loja mantêm o estoque restante separado.

## Comprar itens do jogador

Use **Sell items → Add**, escolha o item e **Quantity**, depois o pagamento. Por exemplo, uma quantidade de trigo de três requer um pacote completo de três trigos por venda. As entradas de recompra não usam estoque de produtos de venda. Teste o item exato ao adicionar os requisitos da NBT.

## Salvar e verificar uma compra

**Save As** `village_shop`, então abra o NPC com o DRM Core e use **NPC Shop JSON → file → Apply Shop**. Abra o NPC de mãos vazias, verifique o produto e pressione **Buy Selected**. O exemplo verificado entrega três pães, remove quatro esmeraldas e reduz o estoque em um.

Editar a colocação da linha e a aparência do botão em [GUI Maker](#core/gui-system); produtos, quantidades e preços permanecem em NPC Shop.
