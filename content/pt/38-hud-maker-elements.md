---
title: Adicionar e posicionar elementos HUD
slug: hud-maker-elements
order: 111
description: Adicione saúde, saldos e outras informações, depois ajuste o tamanho e as camadas.
product: core
category: HUD Maker
section: hud-maker
status: Guia
version: 0.3.1
audience: Criadores de HUD
translationSource: en
translationMethod: assisted
---

## Adicione a informação que você quer ver

Abra [HUD Maker](#core/hud-maker). Use **+ Saúde**, **+ Comida** ou **+ Moeda** sob **HUD TYPE**. Em seguida, selecione a entrada em **ADDED HUD TYPES** para editá-la à direita.

![Saúde selecionada no HUD Na tela e no Inspetor.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "DRM 0.3.1 / Forge 1.20.1. A entrada adicionada selecionada tem um * de liderança. Este exemplo foi posicionado em X 400 / Y 250 e salvo como guide_hud.")

| Adicionar | Exibe |
| --- | --- |
| + Moeda | O saldo de uma moeda salva |
| + Saúde / Comida / Armadura / Ar / Nível | Sobrevivência do jogador e valores de experiência |
| + Cabeça do Jogador | Cara de jogador |
| Integrações opcionais de mana/estamina | Valores do provedor instalado |

Um botão desativado pode indicar falta de moeda ou dados do provedor. **CNPC Tempdata / Storeddata** exigir CustomNPCs em um alvo mais velho apoiado.

## Mover, redimensionar e duplicar

Role o Inspetor para **Box ID / Layer # / X / Y / W / H**. A caixa de identificação distingue o elemento; Camada controla a ordem frontal/traseira. Posição X/Y e tamanho W/H. Você também pode selecionar e mover elementos na tela.

As configurações de texto, barra e ícone disponíveis dependem do elemento. **Duplicate** copia o elemento selecionado; mova a cópia para que ela não cubra o original.

Se a informação de sobrevivência estiver escondida na Creative, verifique **Render survival HUD** e inspecione a Survival também. Remover um elemento DRM é separado de [ esconder corações de baunilha](#core/hud-maker-vanilla).

**Save As** seu set. O verificado Forge 0.3.1 limitação de ativação-save é descrita em [Configuração do HUD](#core/hud-maker)Um arquivo salvo por si só não prova que a ativação foi bem-sucedida.
