---
title: Create · Controle condicional e inspeção
slug: npc-core-create-control
order: 1517
description: Use dois limites para controlar dispositivos e inspecione equipamentos reais sem alterar seu conteúdo.
product: dochi-npc-core
category: Integração Create
section: editor
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Trabalhar somente sob uma condição

**Conditional Machine Operation** aplica manivela, válvula ou Linked Controller conforme um sensor durante o turno ativo. Leia [Início Create](#dochi-npc-core/npc-core-create-start) e [Processamento](#dochi-npc-core/npc-core-create-factory). Vídeos silenciosos: DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Exemplo: começar com dois, parar com seis

1. Adicione **Create → Conditional Machine Operation**.
2. Escolha **Control device → Hand crank** e a manivela em **Machine control position**.
3. Escolha **Sensor reading → Item quantity** e um barril em **Sensor position**.
4. Defina **Counted item → Iron Ingot**; só esse ID é contado.
5. Ligue **Activate at the lower threshold**. Informe **6** em **Upper threshold** primeiro e depois **2** em **Lower threshold**, mantendo a faixa válida.
6. Defina intervalo, ative e salve.

![Criar controle condicional, definir dispositivo, sensor e ferro e informar limite superior seis antes do inferior dois.](assets/media/guides/create-lessons-20261108/lesson-conditional-control.mp4 "A ordem mantém uma faixa válida. A mudança explícita 0→6 é entrada de teste; a manivela não produz os lingotes adicionados.")

**Momentos**: 0:04 Horário vazio · 0:36 Dispositivo · 0:45 Sensor · 0:56 Escolher itens · 1:11 Limites · 1:19 Ativar/salvar · 1:33 Execução real · 1:40 Parar em seis.

## Entre dois limites, mantenha o estado anterior

O limite superior deve exceder o inferior; ambos precisam ser finitos e não negativos.

| Activate at the lower threshold | Começa | Para | Entre eles |
| --- | --- | --- | --- |
| ON | Valor ≤ inferior | Valor ≥ superior | Mantém estado |
| OFF | Valor ≥ superior | Valor ≤ inferior | Mantém estado |

Com ON / 2 / 6, estoque **0 → 3 → 6 → 4 → 2** resulta em **girar → continuar → parar → permanecer parado → girar**. Isso evita alternância perto de um número único.

## Sensores e unidades

| Sensor reading | Alvo e valor |
| --- | --- |
| Redstone strength | Maior sinal vizinho do bloco, 0–15 |
| Item quantity | ID escolhido em inventário compatível |
| Tank fill percentage | Tanque Create compatível, 0–100%, não mB |
| Rotation speed in RPM | Velocidade absoluta de dispositivo cinético |
| Overstress (0 or 1) | Normal 0 / sobrecarregado 1 |

Para sobrecarga, use OFF / inferior 0 / superior 1. Não confunda volume com porcentagem nem RPM com sobrecarga. Sistemas ilegíveis ou grandes não são uma varredura ilimitada; **Sensor reading unavailable** indica falha de leitura.

## Manivela, válvula e Linked Controller

| Dispositivo | Ativo | Transição inativa |
| --- | --- | --- |
| Hand crank | Entrada nativa contínua | Para novas entradas |
| Valve handle | Uma operação da transição | Direção oposta |
| Linked Controller | Mantém entrada do canal | Libera entrada |

A válvula responde a mudanças de estado, não repete a cada leitura. Aguarda rotação e espera nativas. **Reverse the active direction** muda a direção ativa.

Coloque um **Linked Controller real com frequências configuradas** no inventário NPC, selecione **Linked Controller button (1–6)** e iguale as frequências do receptor Create. **Machine control position** é o local físico de trabalho. DNPC não cria frequências digitando nomes. Controlador vazio gera **A configured Linked Controller is required in NPC inventory**.

O jogador tem prioridade. Edição, combate, interação e IA desativada pausam novas entradas sem reverter movimento já iniciado.

## Factory Inspection

1. Adicione **Create → Factory Inspection**.
2. Use **Add inspection position** e Shift + clique direito em até **16** dispositivos compatíveis.
3. Registre a ordem e remova com **Delete inspection position**.
4. Defina **Work interval (ticks)**; a leitura usa no mínimo **20 ticks**.
5. Atribua opcionalmente um Display Board e salve.

![Definir dois pontos de inspeção e um Display Board real, informar linhas e conferir percurso e relatório.](assets/media/guides/create-lessons-20261108/lesson-inspection-board.mp4 "Manivela e tanque vazio são escolhidos separadamente. O painel montado e com energia recebe o relatório e é mostrado de perto.")

**Momentos**: 0:05 Energia do painel · 0:09 Horário vazio · 0:41 Pontos de inspeção · 1:01 Definir painel · 1:09 Linhas inicial/reservadas · 1:14 Ativar/salvar · 1:29 Execução real · 1:41 Relatório no painel.

Lê rotação/parada, sobrecarga, calor do Burner e nível do tanque. Não repara nem altera conteúdo. Responda com uma ação condicional separada.

## Relatórios no Display Board

Monte o painel Create corretamente e forneça sua potência normal. O vídeo aciona o painel com um **Cogwheel** engrenado ao lado. Receber texto não faz um painel sem energia terminar de exibir os caracteres; confira a ligação das engrenagens e o funcionamento primeiro. Atribua **Display Board (optional)** e configure:

| Campo | Significado |
| --- | --- |
| First display row (starting at 1) | Primeira linha; 2 preserva a linha 1 |
| Reserved display rows | Linhas consecutivas; seis a partir da 2 reservam 2–7 |

O relatório inclui inspetor, equipamento atual, NPCs próximos trabalhando, trabalhos concluídos e encomendas pendentes. A busca é limitada a cerca de **32 blocos**, não à produção do servidor inteiro. Trabalhos concluídos não equivalem à quantidade total de produtos.

O relatório completo quebra linhas no espaço reservado. **Reserved board rows cannot fit the complete report** deixa o painel intacto: aumente largura/linhas. Reservas sobrepostas aguardam outro inspetor; linhas externas são preservadas.

## Solução de problemas

| Estado | Confira |
| --- | --- |
| Select valid loaded work positions | Dispositivo, sensor, dimensão e caminho carregado |
| Sensor reading unavailable | Tipo de sensor e capacidade compatível |
| Waiting for the activation threshold | Valor, modo e ambos os limites; pode ser normal |
| Player manual operation has priority | Uso direto do jogador |
| Workstation is reserved by another worker | Outro NPC ou linhas reservadas |
| Display Board unavailable or not assembled | Montagem, alvo, chunks e potência |
| Painel não muda | Linha inicial, largura, linhas e sobreposições |
| NPC espera perto da máquina | Pausa, IA, pés e visibilidade |

Comece com um sensor, um dispositivo e um NPC; depois conecte [processamento](#dochi-npc-core/npc-core-create-factory) e [logística](#dochi-npc-core/npc-core-create-logistics).
