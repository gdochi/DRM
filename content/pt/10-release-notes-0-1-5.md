---
title: O que há de novo em 0.1.5
slug: release-0-1-5
order: 10
description: Tooltip Maker, opções de diálogo mais claras, melhores visualizações de itens e correções HUD.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.1.5
audience: Criadores / Operadores
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core/release-notes-0-3-1) para orientação atual.

Minecraft 1.20.1 · Forge

Esta atualização adiciona um Tooltip Maker dedicado e dá aos criadores mais controle sobre as opções de diálogo. Também melhora as visualizações de itens e corrige vários problemas de exibição do HUD.

## Encontre Tooltip Maker

Edite a dica de ferramenta do item na tela central. Item Renderizado exibe o item; Texto da dica de ferramenta adiciona seções de texto. Verifique Preview e Save As seu próprio layout. Continue com o guia [ atual](#core/tooltip-maker) para salvá-lo e aplicá-lo.

![Encontre Tooltip Maker.](assets/media/guides/drm-031-forge1201/tooltip-maker.png "DRM 0.3.1 / Forge 1.20.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Adicionado

- **Tooltip Maker:** Dicas de ferramentas de itens de design em seu próprio editor, disponíveis sob **Visual**. Organize visualizações de itens, texto, seções de estatísticas, imagens e divisores.
- **Tooltip effects:** Adicione efeitos de entrada e reproduza-os com o botão de reprodução durante a edição. Escolha ícones de itens 2D, itens 3D rotativos ou visualizações de equipamentos vestíveis.
- **Long tooltip scrolling:** Leia informações que não cabem na tela ao rolar a dica de ferramenta.
- **Choice text size:** Alterar o tamanho do texto de escolha de diálogo no editor de diálogo ou no layout da GUI.
- **Choice pulse highlight:** Faça uma escolha individual piscar suavemente quando aparecer. Escolha a cor, a duração total, a contagem de pulsos e a força de **0 a 100**. Conversas existentes permanecem inalteradas a menos que você habilite o efeito.
- **NPC stat screens:** Conecte um arquivo Stat Builder a um NPC para interagir com esse NPC abre a tela de alocação de estatísticas do jogador.

## Melhorado

- Os botões de escolha agora usam a largura disponível antes de embrulhar texto longo, incluindo texto traduzido por meio de um pacote de recursos.
- Longas escolhas crescem mais alto quando necessário. Listas com muitas escolhas podem ser roladas.
- Os botões de escolha padrão têm cerca de **5 pixels GUI de espaço acima e abaixo do texto**, em vez de preenchimento vazio de grandes dimensões.
- A edição de pontas de ferramentas tem limites de tela mais claros, controles de tamanho e espaço para colocar temporariamente elementos fora da tela. Apenas elementos totalmente dentro da tela de saída são salvos.
- Melhorou a economia de dicas, o carregamento e a reabertura para que o design padrão não mais piscasse antes do design carregado anteriormente.

## Corrigido

- Corrigido blocos comuns e outros itens não usáveis sendo mostrados na mão de um suporte de armadura ou jogador quando uma visualização do equipamento foi selecionada.
- Melhorou o tamanho e o centro de rotação de pré-visualizações de itens modificados, incluindo armas Epic Knights. Corte reduzido e causas corrigidas de cintilação escura enquanto os itens giram.
- Corrigido TaCZ armas que faltavam nos previews de dicas de ferramentas. Detalhes da arma e anexos instalados são mantidos ao exibir seus modelos.
- Fixou os fundos do item-slot permanecendo pequenos quando a caixa de ferramentas foi ampliada.
- Corrigido nomes de guias criativas incorretamente recebendo o layout de dica de ferramenta de item personalizado.
- Moeda fixa aparecendo no inventário da Survival quando a opção de exibição do estoque foi desativada.
- Barras HUD personalizadas fixas voltando para barras de baunilha quando **F3** foi aberto.
- Corrigido o efeito de dano ao remover o equipamento só reduziu a saúde máxima do jogador.
- Carregamento de modelo NPC personalizado aprimorado para evitar mostrar brevemente peças de modelo e textura incompatíveis.

## Actualização

Atualize o servidor e os clientes para **0.1.5**. Mantenha uma cópia da pasta `config/dochi_rpg_maker` antes de substituir os arquivos. Use **Save As** ao personalizar modelos empacotados.
