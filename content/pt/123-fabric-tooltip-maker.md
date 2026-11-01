---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Organize o nome, a descrição e o modelo mostrados ao passar por cima de um item.
product: core-fabric
category: GUI Maker
section: gui-maker
status: Estável
version: 0.3.1
audience: Criadores
translationSource: en
translationMethod: assisted
---

## O que? Tooltip Maker faz

Tooltip Maker desenha o painel mostrado quando um jogador paira sobre um item. Organize onde seu nome, informações e visualização de itens aparecem.

Abra o seletor de editor com o **Dochi RPG Maker Core**, escolha **Tooltip Maker**, depois carregue um layout de dica de ferramenta ou crie um. Os padrões empacotados são modelos protegidos, então use `Save As` antes de personalizá-los.

Os layouts das pontas das ferramentas estão armazenados em `config/dochi_rpg_maker/gui/`. O layout inicial empacotado é `default_tooltip_gui.json`.

![Layout padrão do Tooltip Maker, com o ícone de item, nome e áreas de informação no meio e dimensões de tela e elemento à direita.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. O painel preto é a dica. O espaço de trabalho azul ao redor está fora de sua tela de saída.")

1. Selecione um elemento no meio. O ícone da espada, um **Rendered Item**, está selecionado aqui.
2. Mude o seu **X / Y** posição e **W / H** dimensões à direita. Defina o tamanho da dica com **Tooltip W / H → Apply** acima.
3. Adicionar exibições com ** + Texto da dica de ferramenta **, ** + Divisor**, ** + Item Renderizado** ou as outras ferramentas à esquerda.
4. Verifique **Preview**, então **Save As** seu layout. Use **Use Globally** ao selecioná-lo como layout para todos os itens.

Configure as estatísticas e a descrição reais de um item no Editor de itens. Tooltip Maker organiza como essa informação é apresentada.

## Controles principais

- Defina o tamanho da tela e organize texto, valores, divisores, imagens e a visualização do item.
- Escolha um ícone 2D ou um modelo de item 3D montado e ajuste a escala, a rotação e a rotação.
- Configure efeitos de entrada de superfície, quadro, texto e item e, em seguida, reproduza-os no editor.
- Mantenha os elementos totalmente dentro da tela de saída se eles devem ser incluídos ao salvar.

A dica de ferramenta de tempo de execução usa o item pairado real e seus dados de item. Se o resultado for mais alto que a tela, os jogadores podem rolar seu conteúdo enquanto o quadro externo permanece no lugar.

Itens de inventário criativo podem usar a dica de ferramenta de item personalizado. As dicas de botões comuns e os cartões de ajuda do editor usam sua própria renderização e não são substituídos por Tooltip Maker.
