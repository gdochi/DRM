---
title: Sua primeira timeline de apoio
slug: expanded-support-timeline
order: 330
description: Aprenda a usar o novo editor no mundo para bombardeios, tempos e centro de posicionamento.
product: dochi-warfare-expanded
category: Apoio de combate
section: support
status: Guia
version: 0.3.3
audience: Criadores de mapas e operadores iniciantes
translationSource: en
translationMethod: assisted
---

## Siga estas três lições

O **Gimmick Editor é uma ferramenta de criação**. Posicione o apoio no mundo real e escolha os momentos de início na timeline.

| Lição | Objetivo |
| --- | --- |
| 1. Esta página | Conhecer a tela, criar bombardeios de ponto/linha/área, ajustar tempo e centro |
| 2. [Veículos, armas e NPCs](#dochi-warfare-expanded/expanded-support-actions) | Definir partida/destino, veículos, armas e fontes de NPCs |
| 3. [Salvar, simular e executar](#dochi-warfare-expanded/expanded-support-run) | Salvar, carregar, testar com Simulation e chamar o arquivo |

As três lições incluem dez vídeos de **DWE 0.3.2 / NeoForge 1.21.1**, com a interface real em inglês e explicações de etapas em coreano. São vídeos sem áudio: pause para localizar cada controle. Forge e Fabric usam o mesmo fluxo; a gravação foi feita no NeoForge.

Confira a [instalação e o primeiro veículo](#dochi-warfare-expanded/expanded-overview), entre num mundo com permissão de operador e abra **Gimmick Editor → Create New**. **Use Default** cria um rascunho com um bombardeio de ponto na posição do jogador. Comece com um único evento.

## 1. Conheça a tela

| Área | Função |
| --- | --- |
| Superior | Novo, Load, Save, Save As, Reset, título, Simulation, coordenadas e Center |
| Esquerda | Ferramentas, seleção, duplicação e exclusão de eventos |
| Mundo | Posições e trajetos nas superfícies reais dos blocos |
| Direita | Aeronave/veículo, tempo e quantidades; Advanced mostra coordenadas e opções adicionais |
| Timeline inferior | Linhas de NPCs, veículos/armas e bombardeio; edição dos inícios |

![Crie um documento, recolha e redimensione painéis e mova a câmera.](assets/media/guides/dwe-tutorials-20261109/dwe-workspace.mp4 "01 · Painéis, divisórias, deslocamento, rotação e zoom. DWE 0.3.2 / NeoForge 1.21.1.")

Use as setas dos cantos para recolher/expandir painéis e arraste suas divisórias. Role **dentro das propriedades** para ver outros campos.

No mundo, a roda ajusta o zoom, o botão central arrasta a vista e o direito gira a câmera. **F** focaliza o evento ou centro selecionado. WASD move o jogador com acompanhamento; Jump/Sneak ajustam a altura da câmera. A velocidade −/+ é da câmera, não da execução.

## 2. Crie o primeiro bombardeio de ponto

Objetivo: **um alvo no chão, com primeira soltura dois segundos após a chamada**.

1. Escolha **Point bombing**.
2. Clique numa superfície de bloco carregada. Confira o evento na lista e na linha de bombardeio.
3. Volte a **Select / move** e selecione o marcador ou a linha.
4. Confira **Aircraft / Payload**. As listas vêm do servidor; uma lista vazia exige verificar a instalação e a combinação compatível.
5. Defina **Start (seconds) 2**, **Altitude 96** e **Lifetime (seconds) 30**.
6. Confira coordenadas em **Advanced**; **Basic** retorna às opções compactas.

![Posicione um ponto com início em dois segundos, altitude 96 e duração de 30 segundos.](assets/media/guides/dwe-tutorials-20261109/dwe-point.mp4 "02 · Explosion damage 20 significa dano base de explosão de 20 HP. Este vídeo não mede acertos ou dano.")

**Dois segundos é a primeira soltura, não o impacto.** A altitude e a física da arma atrasam a chegada ao chão. Lifetime é a vida útil do apoio temporário.

Contagem e intervalo podem estar desativados para pontos. Use linha/área para várias solturas. Os marcadores representam o plano; a física nativa determina os impactos reais.

## 3. Desenhe linhas e áreas

1. Com **Line bombing**, arraste um corredor no chão.
2. Defina a contagem e o intervalo: o exemplo usa **quatro bombas a cada 0,5 segundo**.
3. Desenhe outro corredor com **Area bombing**, que também tem largura.
4. Em **Select / move**, arraste os controles de comprimento/largura/direção ou use **Advanced → Width / Heading**.

![Defina quatro bombas a cada meio segundo e ajuste a largura e direção de uma área.](assets/media/guides/dwe-tutorials-20261109/dwe-corridors.mp4 "03 · Eventos separados de linha e área. Área: Width 24, Heading 0. Mostra a configuração, não um ataque.")

Começando em dois segundos, as solturas são **2,0 → 2,5 → 3,0 → 3,5 segundos**. A contagem explícita é por aeronave; áreas podem usar várias faixas. Contagem, velocidade nativa e intervalo calculam o comprimento, podendo bloquear esse campo. Contagem vazia mantém a carga nativa.

Heading: **0 sul, 90 oeste, −90 leste**. Confira primeiro o marcador de aproximação.

## 4. Organize vários eventos

**Mudar o tempo e reordenar a lista são operações diferentes.**

- Basic usa segundos em incrementos de **0,05**. Advanced e os arquivos usam ticks inteiros; **20 ticks = um segundo** a 20 TPS.
- Arraste os marcadores horizontalmente para mudar os inícios. Clicar na régua escolhe o instante para novos eventos.
- Timeline −/+ muda a faixa visível, não a velocidade.
- Arrastar linhas da lista reordena os eventos mantendo os slots de tempo. Use campos/marcadores para editar o tempo.
- Depois de **Duplicate**, confira sobreposição e início. As caixas permitem exclusão em lote.

![Crie veículos em dois segundos e bombardeio em cinco, amplie a faixa e edite o marcador.](assets/media/guides/dwe-tutorials-20261109/dwe-timing.mp4 "04 · Tempos, marcadores, Duplicate e Ctrl+Z / Ctrl+Y.")

**Ctrl+Z / Ctrl+Y** desfazem/refazem edições. **Esc** ou soltar fora da área permitida cancela um arraste. No máximo 16 eventos podem iniciar no mesmo tick; distribua grupos maiores.

## 5. Use centro e coordenadas relativas

A tela inicia em **Relative coordinates**. Zero em todos os eixos representa o **Center** da barra superior.

| Operação | Modo relativo | Modo absoluto |
| --- | --- | --- |
| Trocar a exibição | Mantém a disposição | Mantém a disposição |
| Mudar Center | Move partidas, destinos e alvos juntos | Mantém posições mundiais e muda só a referência |
| Inserir coordenadas | Distâncias a partir do centro | Coordenadas mundiais |

![Compare mover toda a disposição em modo relativo com mudar apenas a referência absoluta.](assets/media/guides/dwe-tutorials-20261109/dwe-center.mp4 "05 · Center X = 8 e desfazer. Em Absolute coordinates, mudar o centro preserva o trajeto.")

Use **Center → X/Y/Z**, **Use player position**, ou clique/arraste o centro no mundo. No modo relativo, todos os trajetos e alvos se movem juntos. Decida se quer corrigir um marcador ou transportar todo o conjunto.

Carregar no modo relativo leva a disposição ao centro atual. Para manter as posições salvas, **mude para Absolute coordinates antes de Load**. Arquivos antigos sem origem usam o primeiro alvo como referência.

Continue com [veículos, armas e NPCs](#dochi-warfare-expanded/expanded-support-actions) ou [salve, teste e execute](#dochi-warfare-expanded/expanded-support-run).
