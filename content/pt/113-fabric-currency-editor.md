---
title: Currency Editor
slug: currency-editor
order: 85
description: Como configurar a moeda digital e física, conversão de itens, saldos e regras de morte.
product: core-fabric
category: Sistemas Principais
section: currency-editor
status: Estável
version: 0.3.1
audience: Criadores / Operadores
tags:
  - currency
  - editor
translationSource: en
translationMethod: assisted
---

## Criar dinheiro para sua loja

Abra **Currency Editor** do seletor de editores do núcleo. As seguintes telas inglesas são de **DRM 0.3.1 / NeoForge 1.21.1**.

![Currency Editor com identidade de moeda, ícone, quantidade de exibição, regras de morte e HUD configurações.](assets/media/guides/drm-031-neo1211/currency-editor.png "Defina um tipo de dinheiro aqui. Defina os preços dos produtos separadamente em NPC Shop.")

1. Defina a exibição **Name**, como `Town Coin`. A identificação salva `town_coin` é separada.
2. Abra a lupa ao lado de **Item Icon**, escolha um item real como esmeralda, então **Apply** no seletor. Um ícone vazio pode bloquear a poupança com `Invalid item icon`.
3. Defina a quantidade exibida, escolha **Save As**, digite `town_coin` em **Currency ID** e confirme com **Save As**. Lojas e HUDs usam essa identificação salva.
4. Selecione a moeda em [NPC Shop](#core-fabric/shop-system) e defina os preços dos produtos. Troca direta de itens e pagamento de um DRM O saldo usa diferentes fontes de pagamento.
5. Para exibir seu saldo, adicione a mesma moeda em [HUD Maker](#core-fabric/hud-maker).

### Defina uma esmeralda para dez unidades monetárias

Abra **Convert items on pickup → Item Prices → Add Item** e procure `minecraft:emerald`. Verifique apenas a linha de esmeralda e escolha **Add Selected (1)**. Verifique na lista de conversão, defina **Value / Item 10** e pressione **Apply Selected**. Feche a lista e salve a moeda.

![Gravado town_coin lista de conversão com uma entrada de esmeralda em Valor / Item 10.](assets/media/guides/drm-031-neo1211/currency-emerald-prices.png "DRM 0.3.1 / NeoForge 1.21.1. A lista salva foi reaberta aqui. Selecione a linha exata minecraft:emerald em vez de minérios ou blocos de esmeralda. Verifique se a coleta e o equilíbrio mudam separadamente.")

### Jogadores de dinheiro podem carregar

Abra **Physical currency** para configurar um item de moeda. Um valor de `10` significa que um item representa dez unidades dessa moeda; é separado do número de produtos vendidos por uma loja.

![Currency Editor's página moeda física com um nome de item, identidade e valor por item.](assets/media/guides/drm-031-neo1211/currency-physical.png "Configure o saldo da carteira e a moeda transportada separadamente, em seguida, verifique qual método de pagamento a loja usa.")

## Onde a moeda é usada

Use Currency Editor para escolher nomes de dinheiro, ícones, conversão de coleta e perdas de morte. Selecione essa moeda em lojas, recompensas e HUDs.

Moedas não são apenas rótulos de exibição. Eles se conectam a pagamentos de compras, conversão de itens, exibição de HUD e comportamento de morte.

| Item | Significado |
| --- | --- |
| ID da moeda | ID única usada pelo nome do arquivo e chave de equilíbrio. |
| Exibir nome | Nome mostrado em HUDs, lojas e mensagens. |
| Icon | Item ou textura usado como ícone de moeda. |
| Formato | Formato de exibição para saldos. |
| Conversão de item | Se os itens adquiridos se tornam saldo monetário. |
| Regra da morte | Se o jogador mantém ou perde o equilíbrio sobre a morte. |

## Itens de moeda física

Em 0.1.8, habilitando `physicalItem` cria um formulário de moeda que pode ser transportado e negociado no inventário.

| Configurando | Significado |
| --- | --- |
| Nome | Exibir o nome ou a chave de tradução mostrada no item. |
| ID | Valor único que distingue essa moeda no item de moeda física compartilhada. |
| Valor unitário | Valor da moeda representado por um item. |

As lojas podem aceitar moeda física como pagamento ou pagá-lo quando configurado para fazê-lo. Mantenha cada identificação física única.

## Armazenamento

Os arquivos de moeda são salvos no caminho do lado do servidor abaixo.

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

O servidor JSON `kind` é `currency`. Lista de moedas e leitura prévia usam `currency_index`.

## Fluxo de trabalho básico

1. Clique com o botão direito do mouse no item `Dochi RPG Maker Core`.
2. Abra `Currency Editor`.
3. Escolha uma identificação de moeda.
4. Defina o nome da exibição, ícone e formatação.
5. Se a conversão for necessária, configure o item e o valor.
6. Defina a regra da morte como `KEEP` ou `LOSE`.
7. Salve, então corra `/drm currency reload` ou `/drm reload`.

DRM copia carteira e chaves de saldo bancário compatíveis quando Minecraft substitui a entidade do jogador após a morte. `KEEP` preserva o equilíbrio, enquanto `LOSE` leva adiante o valor pós-dedução. Conversão automática de itens e perda de morte notificam o jogador afetado no bate-papo. A conversão de captador comum processa apenas a pilha recém-colhida, não as pilhas de moeda não relacionadas já no inventário.

## Verificações de comando

Moedas salvas podem ser verificadas através de comandos do servidor.

| Comando | Propósito |
| --- | --- |
| `/drm currency list` | Lista moedas registradas. |
| `/drm currency create <id>` | Cria uma definição básica de moeda. |
| `/drm currency give <player> <id> <amount>` | Dá moeda a um jogador. |
| `/drm currency take <player> <id> <amount>` | Remove a moeda de um jogador. |
| `/drm currency set <player> <id> <amount>` | Ajusta o equilíbrio diretamente. |
| `/drm currency get <player> <id>` | Lê o saldo atual. |

## Conexão da loja

NPC Shop Os preços são calculados pelo ID da moeda. Se o ID de moeda usado por um item de loja não existir em `currency/definitions`, o pagamento ou a exibição podem falhar.

Quando uma loja usa várias moedas, crie todas as moedas primeiro e conecte campos de preço em NPC Shop.

## Conexão HUD

Adicione um componente Moeda em [HUD Maker](#core-fabric/hud-maker) e selecione a moeda salva. Configure seu formato de quantidade, posição e visibilidade no HUD. Não adicione campos obsoletos de permissão de exibição à definição de moeda.

O balanço do servidor é autoritário. Se a exibição do cliente não atualizar, verifique `/drm currency reload` e o conjunto HUD ativo.

## Lista de verificação

| Sintoma | Verificar |
| --- | --- |
| A moeda não aparece na lista | Caminho do arquivo e sintaxe JSON. |
| Pickup não se converte em equilíbrio | ID do item, quantidade de conversão e recarga do servidor. |
| O pagamento da loja falha | ID da moeda no preço da loja e arquivo de definição. |
| Equilíbrio após a morte é inesperado. | Se a regra da morte é `KEEP` ou `LOSE`. |
