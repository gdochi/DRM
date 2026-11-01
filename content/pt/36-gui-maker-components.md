---
title: Escolha as peças GUI certas
slug: gui-maker-components
order: 102
description: Escolha componentes que exibam diálogo, produtos, saldos e mensagens reais.
product: core
category: GUI Maker
section: gui-maker
status: Guia
version: 0.3.1
audience: Criadores de GUI
translationSource: en
translationMethod: assisted
---

## Mantenha as partes funcionais no layout

Para uma conversa, posicione as áreas **diálogo ** e **escolha** antes de adicionar texto decorativo ou imagens. O editor de diálogo fornece a linha real e responde; GUI Maker fornece sua posição e aparência.

![Dialogue canvas com pré-visualização de NPC, diálogo e escolhas.](assets/media/guides/drm-031-forge1201/gui-maker.png "DRM 0.3.1 / Forge 1.20.1. Mantenha as áreas de diálogo/escolha separadas do Texto decorativo. Escreva a conversa em Dialogue Editor.")

## Partes de diálogo

| Componente | Exibe |
| --- | --- |
| diálogo | Linha NPC do nó atual |
| escolha | Respostas passando suas condições de visibilidade |
| entidade | Visualização de NPC ou entidade |
| item | ícone de item de apresentação |
| imagem/painel | Fotos, fundo e enquadramento |

Removendo `dialog` ou `choice` remove o lugar usado para essas partes da conversa.

## Peças da loja

| Componente | Exibe ou executa |
| --- | --- |
| item_slot | Linhas de produtos |
| player_inventory | Player inventory em modo de venda |
| shop_transaction_viewer | Resumo de transações planejadas |
| shop_action_button | Compra ou venda |
| shop_item_description | Descrição do produto selecionada |
| shop_search_bar / shop_page_selector | Pesquisa e navegação da página |
| currency_display | Saldo do jogador ou participações de pagamento |

Os layouts de compra e venda podem compartilhar partes, mas o modo ativo determina o significado da linha e da ação. Faça produtos em [NPC Shop](#core/shop-system).

## Moeda e peças de status do jogador

`currency_list` fornece a área de lista. `currency_icon`, `currency_amount`, `currency_delta` e `currency_name` mostram um ícone, equilíbrio, mudança recente e nome. `player_health`, `player_food`, `player_armor`, `player_air` e `player_xp_level` mostram o estado do jogador.

Um componente do valor da moeda não concede dinheiro. Os saldos mudam por meio de ações do servidor, transações e conversão de coleta. Veja [ moeda e HUD](#core/currency-hud-shop).

## Partes remanescentes

Use `dialog` para o corpo da mensagem e `panel / image` para o enquadramento. Mensagens importantes não usam uma lista de escolha de conversa. Conecte o layout através da mensagem [Remanescente](#core/remnant-msg).

Se um componente estiver em branco, verifique se o recurso fornece seus dados e se o componente tem uma área visível. Para posição e camadas, veja [canvas editing](#core/gui-maker-screen).
