---
title: Bloquear estágios e FX
slug: cobblemon-presentation-region-fx
order: 533
description: Capture uma região do mundo em apresentação JSON e autor de coreografia de partículas.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Guia de uso
version: Fabric / NeoForge 0.2.9
audience: Criadores de apresentações de batalha
translationSource: en
translationMethod: assisted
---

## Use blocos do mundo como um palco

Battle Presentation Maker's **Region** incorpora estados de bloco selecionados na apresentação JSON. É um palco visual para a entrada da batalha, não uma ferramenta que coloca ou restaura blocos do mundo. A forma salva permanece disponível depois que a localização original muda ou a batalha acontece em outro lugar.

1. Carregue os pedaços que contêm a estrutura.
2. Defina dois cantos da região ou use a seleção de área do mundo para mover e redimensionar a caixa.
3. Aplique a seleção validada e use **Capture region**.
4. Ajuste Yaw, Pitch, Zoom, Offset e rotação final para enquadrar o palco.
5. Jogue a linha do tempo com modelos e camadas, em seguida, Salvar ou Save As na barra de ferramentas.

A captura por si só não persiste o estágio em disco. Capture novamente depois de mudar a área selecionada. A seleção mundial nunca muda de bloco, e Esc cancela.

![Piso capturado e pilares salvos como um arquivo de apresentação.](assets/media/guides/cobble-029-neo1211-flow/cobble-region-captured.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Depois de capturar 31 blocos e dois estados de bloco, Save As criou custom/guide_stage.json. Salvo à direita e o status inferior confirmar a salvar.")

## Limites de captura

| Item | Limite atual / comportamento |
| --- | --- |
| Comprimento por eixo | Até 128 blocos |
| Blocos armazenados | Até 32,768 blocos não-ar suportados |
| Estados de bloqueio distintos | Até 512 |
| Chunks | Toda a região deve ser carregada. |
| Bloquear entidades como peitos | Rejeitar captura quando presente; selecione uma região excluindo-os |

Regiões de grandes dimensões, muitos estados ou nenhum bloco capturável impedem a captura. O estágio visual não marca, então não reproduz o comportamento funcional de redstone ou container.

## Autor FX

Adicione uma entrada de partícula em **Particles**, escolha sua identificação/opções de partícula e, em seguida, use Emit, Motion, Path e Cues para definir o tempo, contagem/intervalo, forma, dimensões, posição, velocidade e caminho. Copiar/Colar transfere as configurações de entrada.

Comece com uma partícula e um curto intervalo, depois visualize-a com o ator, o palco do bloco e a câmera. São visuais de apresentação, não ataques mundiais ou hitboxes de dano. Partículas de mod externo requerem mod de fornecedor.

![Uma camada de partículas adicionada em Partículas, com a apresentação tocando.](assets/media/guides/cobble-029-neo1211-flow/cobble-presentation-fx.png "Selecione Partículas → Adicionar camada e, em seguida, edite Emit à direita. Esta entrada usa minecraft:end_rod, carrapatos 0–39, Intervalo 2 e Amostras 24. A reprodução executa a pré-visualização da apresentação do editor.")

## Conecte o resultado

Use a apresentação através de ligações de treinador, selvagem.RCT/PvP integração, ou o [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler). Apresentação JSON permanece esquema `5`. Veja [layers e tempo de execução](#drm-cobblemon-editor/battle-presentation-layers-runtime) para texto, imagens, atores, áudio e tempo.
