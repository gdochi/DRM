---
title: Nomes, Valores e Conversão de Moedas
slug: currency-fields
order: 91
description: Defina nomes de moeda, formatação de quantidade, valores de captação e moeda física.
product: core
category: Currency Editor
section: currency-editor
status: Guia
version: 0.3.1
audience: Criadores e operadores
translationSource: en
translationMethod: assisted
---

## Nomear e exibir a moeda

Use **Currency Editor → General settings** para as regras da moeda. Defina os preços dos produtos separadamente em [ NPC Shop → Pagamento](#core/shop-system).

![Nome da moeda, formato de exibição, regras de morte e configurações de conversão de itens.](assets/media/guides/drm-031-forge1201/currency-editor.png "DRM 0.3.1 / Forge 1.20.1. Isso define um tipo de dinheiro; ele não define diretamente o preço do produto ou o saldo atual de um jogador.")

| Configurando | Escolher |
| --- | --- |
| Ativado | Se a moeda é usada |
| Nome | Nome do jogador visível |
| Formato de exibição | Formatação de quantidade; `%s G` exibe 1200 como `1200 G` |
| Configurações de morte | Se e quanto dinheiro é perdido |
| Use como moeda compartilhada | Se deve usá-lo como moeda compartilhada |
| Icon do item | A imagem representativa da moeda |

O ID salvo é separado do Nome. **Save As** `town_coin`, então selecione a mesma moeda em lojas, recompensas e HUDs. Renomar o nome exibido é diferente de criar outra identificação.

## Converter itens colhidos em dinheiro

Habilite **Convert items on pickup** e abra **Item Prices**. Selecionar um ícone não adiciona uma regra de conversão.

![Itens de conversão abertos a partir dos Preços do Item.](assets/media/guides/drm-031-forge1201/currency-item-prices.png "Comece com Adicionar Item e, em seguida, atribua Valor / Item às linhas de conversão verificadas e use Aplicar Selecionado.")

1. Em **Add Item**, procure e verifique o item; use **Add Selected**.
2. Verifique a linha de conversão desse item.
3. Defina **Value / Item → 10**, então **Apply Selected**. Um item correspondente vale dez unidades de equilíbrio.
4. Feche a janela e **Save / Save As** A moeda.
5. Pegue o item real e compare sua quantidade de estoque com a mudança de equilíbrio.

![town_coin salvo com apenas Emerald atribuído um valor de dez.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. Esmeralda vale 10 e o caminho salvo é town_coin.json. Isso verifica as regras salvas; a conversão real do captador é uma verificação separada.")

Pesquisando `emerald` também encontra minério e blocos. Verifique **Emerald / minecraft:emerald** sozinho e use **Add Selected (1)** para este exercício. **Select Visible** seleciona todos os resultados de busca visíveis.

## Moeda física

**Physical currency** define dinheiro que pode ser entregue como um item. Defina seu nome, ID exclusivo e valor por item e salve. O ícone, a lista de conversão de captadores e a moeda física têm usos diferentes. Continue até [ configuração de moeda](#core/currency-editor) para conectar uma loja.
