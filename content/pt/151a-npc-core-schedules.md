---
title: Horários diários e equitação
slug: npc-core-schedules
order: 1512
description: Escolha horas de trabalho, períodos de descanso e veículos para embarcar.
product: dochi-npc-core
category: Horários
section: editor
status: Guia
version: 0.1.3
audience: Criadores de NPC
translationSource: en
translationMethod: assisted
---

## Trabalhar de dia, descansar à noite.

1. Abra **Schedule** no trilho esquerdo do editor do NPC.
2. Pressione **Add time** no meio. Digite um **Time slot name**, como "Dia de turno", à direita e pressione o **✓** ao lado dele para aplicar esse nome.
3. Digite **Start (world ticks) / End (world ticks)** à direita.
4. Use **+** na linha do tempo para adicionar uma atividade e selecione essa atividade para configurar sua localização e alvos.
5. Adicione um período noturno com **Rest** ou **Sleep in assigned bed** e atribua seu lugar de descanso ou cama.
6. Ativar **Enable schedule** acima da lista e, em seguida, usar **Save to NPC** no topo.

![Schedule imediatamente após Adicionar tempo, com um 0–1000 período no meio e nome, início e fim campos à direita.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-add.png "DNPC 0.1.2 / NeoForge 1.21.1. A fila + adiciona uma atividade. O nome é ✓ aplica seu nome; Save to NPC salva todo o NPC.")

A foto `0–1000` é o período inicial. Mude sua hora do fim se ela cobrir um dia inteiro de trabalho. Um período sem atividade, ou um horário com deficiência, não é uma configuração de trabalho concluída.

| Tempo | Marcar valor |
| --- | --- |
| 06:00 | 0 |
| 12:00 | 6000 |
| 18:00 | 12000 |
| 00:00 | 18000 |

Procure na lista de ações por trabalhos como madeireiras, transporte ou equitação. As categorias podem restringir a busca.

![O selecionador de ação da fila do tempo com categorias à esquerda, atividades específicas à direita e pesquisa acima.](assets/media/guides/dnpc-012-neo1211/dnpc-action-picker.png "Movimento e espera contém movimento, espera, equitação e patrulha. Escolha uma categoria, então a atividade real à direita.")

## Atribuir uma cama

![Escolher Assign bed em Houses, associar e guardar a cama e ver o NPC caminhar e dormir.](assets/media/guides/short-videos-20261106/dnpc-bed-assignment.mp4 "Gravado no jogo com DNPC 0.1.3 / NeoForge 1.21.1, interface em inglês. Um horário noturno foi preparado no mundo de captura; a associação da cama e o sono real foram verificados.")

Escolha **Houses → Assign bed** e faça **Shift+clique direito** na cama. Ao regressar ao editor, confirme **Bed assigned** e use **Save to NPC**. Adicione **Sleep in assigned bed** ao período noturno e ative **Enable schedule**. A localização da casa e a sua cama são definidas separadamente.

## Comece com um exemplo

Use **Load schedule**, escolha um exemplo, então mude suas localizações e alvos para o seu mundo. Filtre por horários gerais/militares e complementos necessários.

![Schedule biblioteca aberta através do agendamento de carga, mostrando exemplos, complementos necessários, filtros de categoria e Selecionar.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-load.png "Leia um exemplo, selecione-o e pressione Selecionar. Exemplos de cozinha relatam requisitos indisponíveis quando o addon está faltando.")

Por exemplo, **Wheat delivery task** coleta apenas trigo, mas ainda precisa de um recipiente de saída. **Cooking task** precisa de um mod de cozinha e uma fonte de ingrediente, estação de trabalho, recipiente de saída e receita. Continue com [cozinhando ](#dochi-npc-core/npc-core-cooking).

Em 1.20.1 / 1.21.1, exemplos também cobrem guarda DW, patrulha e escolta deveres e tripulações DWE. DW está disponível em Forge / NeoForge; as tarefas do veículo precisam de DW, DWE e SuperbWarfare. Exemplos indisponíveis mostram o que está faltando. Os horários militares da DW usam uma ação por período.

Um NPC mais velho. **Legacy AI compatibility** mantém seu comportamento anterior. Ao alternar, verifique ambos **Schedule type** e o interruptor habilitado.

## Embarque em um barco, cavalo ou veículo

1. Defina a atividade de um período para **Movement → Ride vehicle**.
2. Encontre veículos vazios próximos automaticamente, ou selecione um com .
3. Defina o centro de pesquisa e o raio: default 16 blocks, range 1 –32.
4. Escolha um lugar. Comece com **-1** Seleção automática para barcos de baunilha, carrinhos de minas e cavalos.
5. Escolha se deve desmontar quando o período terminar e salvar.

O NPC vai até o veículo. Tentativas padrão para 600 ticks, ajustáveis a partir de 20–2400. Um veículo fora da área de busca ou em outra dimensão não pode ser abordado.

Compatível SuperbWarfare Veículos em alvos mais antigos aceitam assentos 0–63. O recurso 26.3 usa veículos de baunilha e não pode pular um assento de passageiro anterior; características do veículo DW / DWE não estão disponíveis em 26.3.

A desmontagem espera até que o veículo pare e uma saída segura esteja disponível. Configure a condução, patrulhas e armas em DWE ou configurações do próprio veículo.

## Horário de funcionamento da loja

Conectar a DRM comprar um cronograma para limitar o horário de negociação. Uma vez fechado, os negócios de uma tela de loja já aberta também são recusados.

Verifique **DRM functions → Use DNPC function schedule** também. Quando desligado, aplicado diretamente DRM arquivos são usados. Quando ligado, as ligações agendadas têm prioridade; um caminho agendado vazio desabilita essa função. Ativar esse interruptor sozinho não configura o horário de funcionamento.

![DRM funções com DRM Aplicar e Usar DNPC programação de funções.](assets/media/guides/dnpc-012-neo1211/dnpc-drm.png "DRM Apply abre a tela de vinculação de arquivo de função. O interruptor abaixo decide se as ligações agendadas têm prioridade.")
