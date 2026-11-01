---
title: Use uma moeda em lojas e HUDs
slug: currency-hud-shop
order: 92
description: Conecte a mesma moeda salva para fazer pagamentos e exibir o saldo do jogador.
product: core
category: Currency Editor
section: currency-editor
status: Guia
version: 0.3.1
audience: Criadores e operadores
translationSource: en
translationMethod: assisted
---

## Selecione a mesma moeda salva

Salve `town_coin` em [Currency Editor](#core/currency-editor). Seu arquivo define o tipo de dinheiro; uma loja aceita esse dinheiro e um HUD exibe o saldo do jogador. Selecione a mesma identificação nos três lugares.

## Aceite seu equilíbrio em uma loja

1. Abra **NPC Shop → Shop settings**.
2. Escolha **Shop currency → Currency** e a moeda salva.
3. Use **Payment → Payment method → Inherit Shop** para produtos que o seguem.
4. Defina **Price**, salve e aplique a loja ao NPC.
5. Tente uma compra com um jogador segurando um saldo nessa moeda.

![Compre as configurações para pagamento comum.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Esta foto usa o pagamento do item; mude a moeda da loja para Moeda para um saldo de DRM. As substituições de produtos têm precedência sobre a configuração comum.")

| Pagamento | O que o jogador precisa |
| --- | --- |
| Item | Itens de inventário reais, como quatro esmeraldas |
| Moeda | Um balanço armazenado, como town_coin 4 |

Uma esmeralda. **Item Icon** Não faz a loja aceitar itens de esmeralda. Escolha o pagamento separadamente. Veja [produtos](#core/shop-editor-items) para substituições.

## Exibir o saldo em um HUD

1. Abra **HUD Maker → + Currency**.
2. Pesquise `town_coin` em **Apply Currency HUD**.
3. Verifique a identificação abaixo do nome e pressione **Apply** deste selecionador.
4. Selecione o elemento adicionado **Currency** e defina a posição, o tamanho e o formato da quantidade.
5. **Save As** o conjunto HUD e use a barra de ferramentas **Apply** para ativá-lo.

![Moeda de cidade / town_coin selecionada em Aplicar moeda HUD.](assets/media/guides/drm-031-forge1201/hud-currency-picker.png "DRM 0.3.1 / Forge 1.20.1. Aplicar dentro deste seletor adiciona o componente. Aplicar na barra de ferramentas atrás dele ativa o conjunto.")

Configure a formatação de quantidade e visibilidade em HUD Maker em vez de adicionar campos HUD obsoletos ao arquivo de moeda. O artefato verificado Forge 0.3.1 pode rejeitar o segundo salvo da ativação por causa de um limite de solicitação; veja a nota de ativação de [HUD Maker](#core/hud-maker).

## Prepare dinheiro para uma verificação de transação

Com permissão administrativa, use a ID salva real:

```mcfunction
/drm currency give @s town_coin 20
/drm currency get @s town_coin
```

Para uma compra de preço quatro, compare o saldo e a contagem de produtos antes e depois. Se a negociação funcionar, mas a exibição estiver faltando, verifique o HUD ativo, o ID da moeda e as regras de visibilidade. Use a conversão [pickup](#core/currency-fields) para transformar itens coletados em um equilíbrio.
