---
title: Dialogue Choice e Gecko Apresentação
slug: dialogue-presentation
order: 63
description: Escolhas de tamanho, adicione destaques de pulso e conecte rotas de animação Gecko em Fabric e NeoForge 0.2.4.
product: core-fabric
category: Dialogue Editor
section: dialogue-editor
status: Estável
version: 0.3.1
audience: Criadores de diálogos
translationSource: en
translationMethod: assisted
---

## Escolha texto e pulso

Na seção **Choices** de um nó de diálogo, use **Choice text size (px; 0 = GUI default)** para substituir o tamanho de texto do layout GUI vinculado para esse nó. Um valor de `0` mantém a configuração da GUI.

Habilitar **Pulse highlight** em uma escolha individual para chamar a atenção quando ela se tornar visível. Configure seus ticks totais, contagem de pulsos, cor RGB e intensidade. Escolhas ocultas ou fora da tela não gastam seu tempo de pulso antes de se tornarem visíveis.

Opções traduzidas longas usam o texto exibido quando DRM calcula a largura do botão e o embrulho. A área de escolha de tempo de execução pode rolar quando a lista completa não se encaixa.

![O destaque do pulso habilitado para uma escolha selecionada.](assets/media/guides/drm-031-neo1211/dialogue-choice-pulse.png "DRM 0.3.1 / NeoForge 1.21.1. Abaixo estão os carrapatos totais 40, contagem de pulsos 2, intensidade 25 e a cor. Escolha o tamanho do texto 0 herda o tamanho da GUI. Isso captura as configurações de edição, não a reprodução.")

Siga [criação de diálogo](#core-fabric/dialogue-system) para Save As e aplique o conjunto a um NPC, em seguida, verifique as escolhas de momento aparecem. Selecione uma opção antes de ativar o destaque Pulse para apenas esse botão.

## Rotas de animação Gecko

Uma Rota Inicial usando `gecko_animation` pode incluir um alvo Goto. DRM envia a solicitação de animação e, em seguida, se move para o nó válido selecionado.

As ações de diálogo são avaliadas na ordem do documento durante o mesmo tick do servidor. O primeiro resultado de navegação permanece autorizado, mas efeitos colaterais posteriores, como animação Gecko, comandos, tags e ações de itens ainda são executados.

A reprodução do Gecko usa uma linha do tempo do servidor sincronizado. Um jogador que começa a rastrear um NPC depois que a reprodução começa recebe a animação ativa e alcança sua posição atual.
