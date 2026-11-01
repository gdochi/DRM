---
title: Fabric 0.1.9 Atualização
slug: release-notes-0-1-9
order: 9
description: Scene Maker e edição mais fácil em Fabric 0.1.9.
product: core-fabric
category: Primeiros passos
section: getting-started
status: Estável
version: 0.1.9
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core-fabric/release-notes-0-3-1) para orientação atual.

## Encontre a linha do tempo da cena

Use a linha do tempo inferior para câmera, legenda e tempo de efeito. Adicione clipes com + Câmera ou + Legenda e, em seguida, edite suas propriedades à direita. A posição mundial abre posição contra o mundo real. Continue com o guia [ atual](#core-fabric/scene-maker) para salvá-lo e aplicá-lo.

![Encontre o cronograma da cena.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Alterar log 0.1.9

### Adicionado

- **Scene Maker** — Crie passeios de câmera e cenas de história dentro Minecraft. Organize o movimento da câmera, legendas, imagens, sons, desvanecimentos, barras cinematográficas e agite a câmera em uma linha do tempo.
- **World camera points** — Coloque pontos enquanto olha ao redor do seu mundo. Pegue um pino em forma de diamante com o mouse para movê-lo diretamente.
- **Editable camera routes** — Use caminhos retos ou suaves e adicione pontos entre os existentes para moldar a jornada da câmera.
- **Scene playback commands** — Use `/drm scene` para ver cenas jogáveis. O próximo argumento sugere cenas salvas, tornando-as mais fáceis de começar.
- **Back and forward arrows** — Mova-se entre as telas do editor da barra superior compartilhada. Passe o mouse sobre uma flecha para ver o que ela faz.

### Melhorado

- **Timeline browsing** — Uma barra de rolagem inferior separada permite que você olhe através de uma cena longa sem mover seu marcador de reprodução.
- **Card editing** — Clique com o botão direito do mouse em um cartão de linha do tempo para encontrar ações como dividir e excluir. As ações disponíveis dependem do tipo de cartão.
- **Easier settings** — Escolha opções de listas, use switches para configurações de ligar/desligar e selecione cores com o seletor de cores.
- **World editing** — O movimento da câmera parece mais suave, os caminhos da câmera são mais claros, e os pinos de diamante sólidos são mais fáceis de reconhecer.
- **Point controls** — Clicar em um pino o seleciona. Clique com o botão direito do mouse para mover a câmera para lá, mova o ponto para a câmera, edite seu caminho de saída ou exclua-o.
- **Safe dragging** — Solte o mouse para manter um movimento de ponto, ou pressione Esc/clique com o botão direito para cancelar esse movimento. Um arrasto completo pode ser desfeito em um passo.

### Corrigido

- Clicar em cartões de linha do tempo não faz mais o salto do marcador de reprodução.
- Adicionar elementos de cena é mais confiável.
- Os nomes das dimensões e os rótulos dos prazos permanecem dentro de suas áreas pretendidas.
- Aplicar edições de posição mundial mantém os pontos organizados em vez de mover o ponto selecionado para a câmera de visualização.
- A ação da barra de ferramentas Save As usa seu ícone apropriado.

### Actualização

Faça backup do seu mundo e `config/dochi_rpg_maker/`, depois atualize DRM no servidor e nos clientes. CustomNPCs continua a ser necessário. Missões existentes, facções, popups e ferramentas de administração de 0.1.8 permanecem disponíveis.

As âncoras de cena usam **Player** ou **Fixed Position**. Se você tiver uma cena experimental mais antiga usando uma âncora NPC, altere-a antes de salvá-la ou reproduzi-la. Para setas para trás/para a frente em editores addon Cobblemon, instale também a compilação de addon atualizada.
