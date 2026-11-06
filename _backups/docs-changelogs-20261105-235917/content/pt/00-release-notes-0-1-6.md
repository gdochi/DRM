---
title: O que há de novo em 0.1.6
slug: release-0-1-6
order: 9
description: Melhorias no editor compartilhado, ajuda com o hover, suporte ao HUD do jogador e correções de renderização.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.1.6
audience: Criadores / Operadores
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
---

Minecraft 1.20.1 · Forge

## Controles compartilhados do editor

O documento, pasta e salvar ícones mantêm as mesmas funções entre os editores. As duas setas se movem através de telas visitadas; use o ícone de disco ou Save As para salvar. Continue com o guia [ atual](#core/gui-system) para salvá-lo e aplicá-lo.

![Controles compartilhados do editor.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Mudou.

- Unificou o menu superior e a interface de navegação entre editores.
- Melhorou a interface do usuário e usabilidade da tela de configuração e vários editores.
- Renderização melhorada do modelo de ponta de ferramenta do item e manipulação de animação NPC GeckoLib.

## Adicionado

- Adicionado ajuda compartilhada para editores.
- Adicionado um componente HUD de cabeça de jogador.
- Adicionado layout popup, recorte de viewport e gerenciamento de estado de solicitação de lista JSON.

## Corrigido

- Corrigido problemas de renderização, buffer e estêncil em TaCZ dicas de ferramentas de armas.
- Corrigido problemas de visualização do modelo NPC e sincronização de animação.
- Corrigido problemas de layout, seleção e exibição em telas do editor.

Atualize o servidor e os clientes para **0.1.6**. Para trás. `config/dochi_rpg_maker` Antes de substituir o mod JAR.
