---
title: HUD Maker
slug: hud-maker
order: 86
description: Como configurar conjuntos HUD, layouts ativos e componentes de exibição de moeda em HUD Maker.
product: core-fabric
category: Sistemas Principais
section: hud-maker
status: Estável
version: 0.3.1
audience: Criadores / Operadores
tags:
  - hud
  - editor
translationSource: en
translationMethod: assisted
---

## Coloque uma barra de saúde na tela

Um HUD mostra saúde, fome ou equilíbrio durante o jogo. Abra **HUD Maker** a partir do DRM Core para posicioná-lo sobre a visualização do jogo. Esta tela em inglês usa **DRM 0.3.1 / NeoForge 1.21.1**.

![Componente de saúde posicionado em X 400, Y 250 e salvo como guide_hud.](assets/media/guides/drm-031-neo1211/native-hud-health.png "Adicione-o com + Saúde à esquerda, selecione Saúde sob Adicionado HUD Tipos e, em seguida, role o Inspetor direito para configurações de posicionamento e componentes. O contorno verde marca a exibição de saúde editada.")

1. Clique em **+ Saúde ** à esquerda.
2. Selecione **Added HUD Types → Health**. Um `*` marca o item selecionado.
3. Role o **Inspector** para **X / Y**. O exemplo usa ** 400 / 250** para que seja fácil de ver perto do centro; mova-o para o canto pretendido para o jogo normal.
4. Use **Box ID** para identificar o componente e, em seguida, ajuste o tamanho, o texto e a aparência da barra. Colapso sobrepondo painéis de editores com seus `-` controles para inspecionar a colocação.
5. **Save As** um novo conjunto como `guide_hud`. Verifique **Loaded JSON: guide_hud**.
6. Escolha **Apply**, feche o editor e verifique o HUD no modo de jogo pretendido e na escala GUI.

Salvar mantém os arquivos; Aplicar seleciona o conjunto a ser exibido. Use **Unapply** para parar de usá-lo. Carregue o mesmo conjunto para continuar editando e salvando seu layout.

![Jogabilidade de sobrevivência depois de carregar o salvo guide_hud conjunto, com o seu HP 20/20 Corações de bar e baunilha.](assets/media/guides/drm-031-neo1211/hud-loaded-world.png "Um novo jogo carregou os arquivos salvos pelo editor. O bar em 400 / 250 e os corações de baunilha são visíveis; escolha a colocação final e a visibilidade de baunilha separadamente.")

## Escolha uma moeda salva

Salve a moeda em Currency Editor primeiro, depois pressione **+ Moeda**. Em **Apply Currency HUD**, confirme seu nome e ID e pressione **Apply**. Este flyout's Apply adiciona o componente de moeda selecionado; a barra de ferramentas Apply ativa um conjunto HUD.

![A moeda da cidade e seus town_coin ID no HUD Seletor de moedas.](assets/media/guides/drm-031-neo1211/hud-currency-picker.png "DRM 0.3.1 / NeoForge 1.21.1. A primeira linha é o nome da exibição e a segunda é o ID da moeda. Se + Moeda estiver desabilitada, primeiro verifique se Currency Editor salvou uma definição.")

Selecione o **Currency** adicionado, ajuste sua posição e tamanho e salve o conjunto HUD. Os exemplos de saldo/mudança do editor não são evidência de pagamento real; teste o saldo do jogador pretendido e a transação da loja também.


## Adicionar outras informações

| Botão esquerdo | Informações |
| --- | --- |
| **+ Moeda** | Saldo de uma moeda criada em Currency Editor |
| **+ Saúde / Comida / Armadura / Ar / Nível** | Saúde do jogador, fome, armadura, ar e experiência |
| **+ Cabeça de Jogador** | Cara de jogador |
| Entradas de integração instaladas | Mana, resistência ou outros valores fornecidos por esse mod |

Por dinheiro, selecione o ** mesmo ID de moeda** criado em [Currency Editor](#core-fabric/currency-editor). Adicionar uma exibição de saldo não dá dinheiro.

Valores específicos de modificação exigem seu provedor. **CNPC Tempdata / Storeddata** aplica-se apenas a ambientes suportados com CustomNPCs instalado. Minecraft 26.3 e mais tarde exclui CustomNPCs; não construa HUDs em torno dessas entradas lá.

## Verifique o editor e peça normal

A política de exibição em modo criativo pode esconder informações de sobrevivência, como saúde e fome. Verifique **Render survival HUD** no editor e no modo de jogo real, depois teste no ambiente de sobrevivência destinado aos jogadores.

Se o DRM bar sobrepõe corações de baunilha, esconder a exibição padrão relevante no Inspetor **Vanilla HUD Guide**. Escondendo um elemento de baunilha não cria sua substituição.

| Sintoma | Verificar |
| --- | --- |
| HUD salvo está ausente | Salvar e aplicar nomes de conjuntos, componentes habilitados |
| Visível apenas durante a edição | Verifique o conjunto salvo/aplicado e reconecte-se. Se ainda estiver ausente, verifique o modo de jogo, as condições de visibilidade e a sobreposição de depuração da F3. |
| Colocação errada | X/Y, âncora, tamanho da tela e escala GUI |
| Equilíbrio permanece inalterado | ID da moeda e o saldo real do jogador |
| Outras sobreposições mod HUD | Configurações de visibilidade de cada mod e posicionamento do componente DRM |

## Mantenha o conjunto completo

Os conjuntos estão abaixo de `config/dochi_rpg_maker/hud/sets/<set name>/`. Este `guide_hud` exemplo cria **hud_set.json** e **componentes/hp/hp.json**. Mantenha a pasta inteira em vez de mover apenas seu componente de saúde. `hud/active_set.json` registra o conjunto selecionado.
