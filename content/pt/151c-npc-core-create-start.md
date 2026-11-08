---
title: Integração Create · Manivelas, válvulas e assentos
slug: npc-core-create-start
order: 1514
description: Adicione tarefas Create ao horário, atribua blocos e posições e confira a operação real.
product: dochi-npc-core
category: Integração Create
section: editor
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Escolha uma tarefa

O horário DNPC decide quando e onde o NPC trabalha. Create controla a rotação, o esforço, as receitas e a rede logística reais.

| Objetivo | Ação | Guia |
| --- | --- | --- |
| Fornecer rotação manual | Operate hand crank | Esta página |
| Girar pelo ângulo configurado | Operate valve handle | Esta página |
| Sentar durante o turno | Mount vehicle → Create seat | Esta página |
| Polir, entregar ou atender | Sandpaper Polishing / Addressed Parcel Delivery / Stock Ticker Attendance | [Logística](#dochi-npc-core/npc-core-create-logistics) |
| Abastecer máquinas e pedir materiais | Factory Process / Material Ordering | [Processamento](#dochi-npc-core/npc-core-create-factory) |
| Reagir a sensores e inspecionar | Conditional Machine Operation / Factory Inspection | [Controle e inspeção](#dochi-npc-core/npc-core-create-control) |

## Instalação e alcance dos vídeos

Instale uma distribuição real de Create para sua versão de Minecraft e carregador, com as dependências exigidas. Cliente e servidor precisam de arquivos compatíveis. DNPC básico funciona sem Create ou DRM; adicione Create para estas tarefas.

Os registros anteriores de execução abrangem **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 26.3**. Eles não comprovam disponibilidade ou compatibilidade de Create no Fabric 1.21.1 ou NeoForge 26.3. Confira a distribuição e as capacidades reais do alvo. CustomNPCs é excluído no 26.3.

As gravações silenciosas usam **DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1**. **6.0.10 identifica a gravação, não um requisito mínimo universal.** Somente dispositivos e materiais foram preparados. Cada aula começa com um horário vazio e mostra ação, alvos no mundo, campos, ativação, salvamento e execução real. A devolução continua a configuração salva na aula anterior. A interface é inglesa, com etapas em coreano num painel abaixo do jogo, campos ampliados e marcador de clique. Adapte as coordenadas ao seu mundo. A etapa acima de cada vídeo acompanha a reprodução e a busca e continua legível durante a pausa.

## Fluxo comum: horário, ação, alvo e salvar

1. Abra **NPC editor → Schedule** com o item NPC Core; é uma ferramenta de criação.
2. Use **Add time**, nomeie o turno e configure **Start / End (world ticks)**. Comece com **0 → 12000**.
3. No **+** da linha do turno, escolha uma ação em **Create**. Assentos usam **Mount vehicle**, na categoria de movimento.
4. Selecione a ação e pressione **🔍** no alvo. Use **Shift + clique direito** no bloco correto.
5. Confira nome, dimensão e coordenadas. **Esc** cancela a seleção.
6. Ative **Enable schedule**, use **Save to NPC**, feche e observe.

A seleção muda somente o rascunho. O **✓** do nome também não salva o NPC completo. Consulte [Horários](#dochi-npc-core/npc-core-schedules).

## Manivela manual

Confira primeiro se a máquina funciona quando um jogador gira a manivela. Conexões, direção e limites de esforço continuam valendo.

1. Escolha **Operate hand crank** e selecione a manivela em **Assign hand crank block → 🔍**.
2. Configure **Rotation direction → Default direction / Reverse direction**.
3. Escolha **Keep turning** ou **Turn for a duration**.
4. Em **Operating time (seconds)**, **6** significa seis segundos de entrada efetiva. Deslocamento e espera por outro operador não gastam esse tempo.
5. Defina posição automática ou atribuída e salve.

![Criar o trabalho de manivela num horário vazio, escolher bloco e posição, informar seis segundos, salvar e observar a rotação.](assets/media/guides/create-lessons-20261108/lesson-crank.mp4 "Marcadores e detalhes ampliados mostram as entradas. Ative e salve o horário, feche o editor e observe mãos e manivela reais.")

**Momentos**: 0:04 Horário vazio · 0:36 Alvos no mundo · 0:47 Tempo de operação · 0:59 Ativar/salvar · 1:13 Execução real.

O tempo aceita **1–1200 segundos**. Um NPC usa o dispositivo por vez; o jogador tem prioridade manual. RPM, capacidade e sobrecarga pertencem ao Create.

## Posição do dispositivo e dos pés

**Assign hand crank block / Assign valve handle block** recebe o dispositivo. A outra posição é para os pés do NPC.

- **Find a reachable position** procura uma posição próxima.
- **Assign standing position → 🔍** seleciona o chão sólido; o espaço acima recebe os pés. Deixe espaço para pés e cabeça.
- **Use my current position** usa sua posição na mesma dimensão.
- **X** limpa a atribuição correspondente. Revise a posição ao trocar o dispositivo.

Garanta piso plano, acesso e visibilidade; evite interiores bloqueados e posições no ar.

## Válvula: ângulo no bloco, quantidade no NPC

1. Ajuste o ângulo do bloco Create; o exemplo usa **90°**.
2. Escolha **Operate valve handle** e atribua esse bloco.
3. Configure direção e **Number of operations**. **2** executa duas operações de 90°.
4. Defina **Pause between operations (seconds)**. A rotação e a espera nativas precisam terminar primeiro.
5. Confira a posição e salve.

![Criar o trabalho de válvula, escolher bloco e posição, informar duas operações e pausa adicional de um segundo e executar.](assets/media/guides/create-lessons-20261108/lesson-valve.mp4 "Os 90 graus do bloco diferem da contagem do NPC. Create controla rotação e espera.")

**Momentos**: 0:04 Horário vazio · 0:36 Alvos no mundo · 0:44 Quantidade/contagem · 0:50 Pausa extra · 1:04 Ativar/salvar · 1:18 Execução real.

São **1–64 operações** por ocorrência e **0,2–60 segundos** de pausa extra. A conclusão finita é salva. Editar, combater ou reconectar não reinicia o limite concluído do mesmo turno. Nova ocorrência e tarefa alterada são tratadas separadamente.

## Assentos Create

Adicione **Mount vehicle**, troque para **Create seat**, selecione o bloco com **🔍** e confira tempo de tentativa e desembarque ao fim do turno antes de salvar.

![Escolher Create seat em Mount vehicle, definir assento e prazo, salvar, embarcar e sair ao fim do turno.](assets/media/guides/create-lessons-20261108/lesson-seat.mp4 "Começa com horário vazio. A ferramenta muda explicitamente a hora para 12500 para demonstrar o fim do turno.")

**Momentos**: 0:04 Horário vazio · 0:36 Alvos no mundo · 0:47 Prazo de embarque · 0:53 Ativar/salvar · 1:07 Execução real · 1:13 Fim/desembarque.

O alvo é um bloco, não o número de assento de um veículo comum. Assentos ocupados, ausentes, descarregados ou inacessíveis aguardam até o limite. O desembarque espera parada e chão seguro. O rastreamento considera montagem/desmontagem e dados salvos, mas esta ação não cria condução de trens ou rotas de movimento.

## Solução de problemas

| Estado | Confira |
| --- | --- |
| Nada começa | Horário ativo, hora do mundo, ação e salvamento |
| Work paused | Edição, IA desativada, combate, interação, sono ou IA externa |
| Choose a device in this dimension | Atribuição e dimensão |
| Approaching operating position | Chão, altura livre, caminho e visibilidade |
| Waiting for another operator | Outro NPC no dispositivo |
| Yielding to manual operation | Uso direto pelo jogador |
| Device unavailable | Bloco correto, chunk carregado e capacidade Create |
| Máquina não acompanha | Conexões, direção e esforço nativos |
| Work complete | Tempo ou operações do turno já concluídos |

Continue em [polimento e logística](#dochi-npc-core/npc-core-create-logistics) ou [processamento](#dochi-npc-core/npc-core-create-factory).
