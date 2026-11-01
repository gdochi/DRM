---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Projete dicas de ferramentas, controle visualizações de itens e adicione efeitos de entrada.
product: core
category: Tooltip Maker
section: gui-maker
status: Estável
version: 0.3.1
audience: Criadores
tags:
  - tooltip
  - item
  - editor
translationSource: en
translationMethod: assisted
---

## O que faz?

Tooltip Maker projeta o painel de informações que os jogadores veem quando pairam sobre um item. É um editor separado de GUI Maker, que projeta telas como diálogo e lojas. O nome do item, estatísticas e outras informações ao vivo vêm do item pairado; o layout decide onde elas aparecem.

## Iniciar um design

1. Clique com o botão direito no ar com o **Dochi RPG Maker Core**.
2. Abra **Visual → Tooltip Maker**.
3. Use **Load** para abrir uma dica de ferramenta existente ou iniciar um novo design. Use **Save As** para personalizar uma cópia de um modelo empacotado.
4. Defina a largura e a altura da tela e, em seguida, organize a visualização do item, texto, seções, imagens e divisores.
5. Ajuste o elemento selecionado no Inspetor e salve seu projeto.

Layouts de pontas de ferramentas vivem em `config/dochi_rpg_maker/gui`. O modelo padrão é `default_tooltip_gui.json`. Eles compartilham essa pasta com outros arquivos GUI, mas a lista de carregamento do Tooltip Maker mostra layouts de dicas de ferramentas.

## Canvas e salvar

A tela de saída é a área que será salva. Mover um elemento não aumenta automaticamente a tela. Mude as dimensões da tela quando precisar de uma dica de ferramenta maior.

Você pode colocar temporariamente elementos ao redor da tela enquanto os organiza. **Um elemento deve estar completamente dentro da tela para ser incluído em Salvar ou Save As.** Os elementos externos permanecem parte do espaço de trabalho de edição, mas são omitidos da saída salva.

## Controles de visualização de itens

| Controle | Usar |
| --- | ---

## O que? Tooltip Maker faz

Tooltip Maker desenha o painel mostrado quando um jogador paira sobre um item. Organize onde seu nome, informações e visualização de itens aparecem.

Abra o seletor de editor com o **Dochi RPG Maker Core**, escolha **Tooltip Maker**, depois carregue um layout de dica de ferramenta ou crie um. Os padrões empacotados são modelos protegidos, então use `Save As` antes de personalizá-los.

Os layouts das pontas das ferramentas estão armazenados em `config/dochi_rpg_maker/gui/`. O layout inicial empacotado é `default_tooltip_gui.json`.

![Layout padrão do Tooltip Maker, com o ícone de item, nome e áreas de informação no meio e dimensões de tela e elemento à direita.](assets/media/guides/drm-031-forge1201/tooltip-maker.png "DRM 0.3.1 / Forge 1.20.1. O painel preto é a dica. O espaço de trabalho azul ao redor está fora de sua tela de saída.")

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
