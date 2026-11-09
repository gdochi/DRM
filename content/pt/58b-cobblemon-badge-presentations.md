---
title: Apresentações e telas de insígnias
slug: cobblemon-badge-presentations
order: 581
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Vincule efeitos de aquisição e seleção e personalize as telas da coleção.
translationSource: en
translationMethod: assisted
---

## Aquisição e seleção são separadas
Selecione uma entrada de [criar insígnias](#drm-cobblemon-editor/cobblemon-badges) e abra **Presentation**. Defina um efeito para aquisição e outro para seleção na coleção. Use os padrões do conjunto ou uma substituição individual.

## Copie e salve uma apresentação em vídeo
![Copie a apresentação, salve Meadow Shine e salve o vínculo no catálogo.](assets/media/guides/cobble-release-20261109/badge-presentation.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, inglês, sem áudio. Copy and Edit → nome → Restart → Save → voltar → Save do catálogo.")

1. Em **Presentation**, pressione **Copy and Edit** no evento desejado. **Edit** altera a apresentação compartilhada; copie para mudar apenas uma insígnia.
2. Defina **Name** à direita e veja desde o início com **Restart**. **Template** oferece **Soft Shine**, **Golden Ring** e **Gentle Rise**.
3. Selecione uma faixa à esquerda. **Transform** controla ticks inicial/final, posição, escala, rotação e opacidade. **Effect** altera as propriedades do efeito. **Add Key** insere uma chave no instante atual.
4. Use **Save** no editor de apresentações e **Cancel** para voltar. Depois pressione **Save** no editor de insígnias para confirmar o vínculo.

## Padrões e vínculos individuais
O seletor de escopo distingue a insígnia atual dos padrões do conjunto. Herdar acompanha as mudanças do conjunto. **None** desativa explicitamente a apresentação desse evento. Aquisição e seleção são independentes.

![Defina aquisição e seleção separadamente na aba Presentation.](assets/media/guides/cobble-release-20261109/badge-presentation-bindings.png "Copy and Edit superior: aquisição; inferior: seleção. Diferencie edição compartilhada de cópia.")

Importar uma apresentação de batalha a converte em documento de insígnia. Não reutiliza o vínculo do NPC de batalha.

## Telas e disposição da coleção
**Display** controla a disposição e as posições. **GUI** vincula as telas **Collection / Detail / Acquisition** do GUI Maker. Posicione listas, imagens, nomes e descrições; o runtime fornece a posse real. Edite chaves da animação no editor de apresentações e os textos da tela no GUI Maker.

## Opções de exibição
Os avisos entram em fila; os automáticos padrão ficam por pelo menos oito segundos. As configurações oferecem popups de confirmação, movimento reduzido e som. O vídeo é sem áudio e não comprova reprodução sonora. Diferencie prévias do editor de avisos reais e confira a posse com **/badges**.
