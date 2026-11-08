---
title: Create · Polimento, encomendas e balcões
slug: npc-core-create-logistics
order: 1515
description: Configure lixa, entregas por endereço para NPCs ou inventários, devoluções e atendimento Stock Ticker.
product: dochi-npc-core
category: Integração Create
section: editor
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Antes de começar

As aulas mostram a criação no **Schedule** e a execução real. Leia [Início Create](#dochi-npc-core/npc-core-create-start) para instalação e salvamento. Gravações silenciosas em DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1, com interface inglesa e etapas em coreano. Cada tarefa parte de um horário vazio; a devolução continua a configuração salva na entrega ao inventário.

## Polimento com lixa

1. Escolha **Sandpaper Polishing**. Ponha **Sand Paper / Red Sand Paper** reais e materiais políveis em **Source inventory**.
2. Atribua **Finished items inventory**.
3. Configure **Working position and facing**, pelo seletor ou **Use my position and facing**, que salva pés e direção.
4. Use **Repeat throughout shift** ou **Finish one batch per shift** com **Batch size** finito. O exemplo transforma dois Rose Quartz em dois Polished Rose Quartz.
5. Defina **Work interval (ticks)**, ative e salve. **20 ticks** equivalem a um segundo em 20 TPS.

![Conferir ingredientes, criar o horário, definir origem, saída e posto, polir duas peças e abrir o inventário final.](assets/media/guides/create-lessons-20261108/lesson-polish.mp4 "Lixa e dois quartzos foram preparados. Receita e desgaste são reais; o inventário final mostra dois Polished Rose Quartz.")

**Momentos**: 0:09 Ingredientes · 0:12 Horário vazio · 0:44 Origem · 0:53 Estoque final · 1:01 Posto · 1:10 Quantidade/contagem · 1:17 Ativar/salvar · 1:32 Execução real · 1:53 Resultado no inventário.

A lixa perde durabilidade real. Destino cheio mantém o resultado com o NPC; o inventário dele também precisa de espaço. Somente definir o local não fornece ferramentas, material ou destino.

## Endereços e destinos

**Addressed Parcel Delivery** transporta o pacote Create selado. Não embala ingredientes soltos nem abre automaticamente a encomenda entregue.

| Campo | Função |
| --- | --- |
| Source inventory | Buscar pacotes endereçados |
| Return inventory | Devolver pacotes que falharam após a coleta |
| Address routes → Address | Comparar o endereço Create |
| Recipient: NPC / inventory | Destinatário real |
| Recipient wait (ticks) | Espera após destino indisponível/cheio; padrão 400 ticks |

Comece com origem, destino e devolução separados. Origem e destino devem ser diferentes; as duas metades de um baú duplo são um único inventário.

São até **32 rotas**. **Batch size 1–64** finito conta **pacotes selados**, não os itens dentro. **Repeat throughout shift** continua entregando durante o turno. **Work interval** aceita **4–1200 ticks** e **Recipient wait**, **20–24000 ticks**. As conversões em segundos pressupõem 20 TPS.

## Rota para NPC

1. Prepare um pacote Create com endereço **Workshop A** na origem.
2. Escolha a ação e atribua origem e devolução.
3. Use **Add address route** e selecione um DNPC carregado em até **64 blocos**.
4. Troque o endereço gerado para **Workshop A** e confira o destinatário com **🔍**.
5. Defina espera, repetição/lote finito e intervalo; salve.

A rota salva o **UUID**, não o nome. Recriar ou clonar um NPC com o mesmo nome não substitui sua identidade. Selecione o novo destinatário; veja [Modelos NPC](#dochi-npc-core/npc-core-templates).

![Criar a rota num horário vazio, definir origem e devolução, escolher destinatário e Workshop A e entregar.](assets/media/guides/create-lessons-20261108/lesson-parcel-npc.mp4 "Receiving Clerk é escolhido no seletor nativo. Um pacote selado chega ao NPC e Unknown fica na origem.")

**Momentos**: 0:10 Horário vazio · 0:42 Origem/devolução · 0:58 NPC destinatário · 1:08 Endereço · 1:11 Quantidade/contagem · 1:22 Ativar/salvar · 1:36 Execução real · 1:52 Resultado no inventário.

## Rota para inventário

Use **Add inventory delivery route**, selecione o recipiente com Shift + clique direito e informe o endereço. Altere rotas existentes com **Choose a receiving inventory / Choose an NPC recipient**.

![Criar uma rota para inventário, definir origem, devolução, destino e endereço e conferir a entrega.](assets/media/guides/create-lessons-20261108/lesson-parcel-container.mp4 "Começa com horário vazio. O barril azul recebe o pacote selado; embalar itens comuns é outra operação de Create.")

**Momentos**: 0:10 Horário vazio · 0:42 Origem/devolução · 0:58 Alvos no mundo · 1:06 Endereço · 1:10 Quantidade/contagem · 1:21 Ativar/salvar · 1:35 Execução real · 1:52 Resultado no inventário.

Cada pacote deve corresponder a **exatamente uma** rota. Os padrões de Create se aplicam: **Workshop *** pode se sobrepor a **Workshop A**. Pacotes ambíguos ficam na origem. Comece com endereços exatos distintos.

## Espera e devolução

Se o destino já está ausente/cheio antes da coleta, o pacote fica na origem. Se isso ocorre durante o transporte, o NPC espera e devolve para **Return inventory**. Devolução cheia mantém a encomenda com o entregador.

![Reabrir a rota salva na aula anterior, mudar a espera e conferir destino cheio e pacote devolvido.](assets/media/guides/create-lessons-20261108/lesson-parcel-return.mp4 "A ferramenta enche explicitamente o destino com pedra após a coleta. Os dois inventários são abertos para mostrar o resultado.")

**Momentos**: 0:15 Pausa extra · 0:19 Ativar/salvar · 0:33 Obstrução · 0:53 Conferir destino · 0:58 Pacote devolvido.

| Estado | Ação |
| --- | --- |
| Waiting for a uniquely addressed package | Compare o endereço com todas as rotas |
| Recipient unavailable; keeping the package | Confira identidade, dimensão, área carregada e caminho |
| Recipient full; keeping the package | Libere espaço |
| Returning the undelivered package | Mantenha acessível a devolução |
| Output full; keeping the item | Libere o destino e confira a carga retida |

Fim de turno não apaga a carga. Encomendas já coletadas podem manter o destino original salvo após alterações. Confira as mercadorias em trânsito antes de redirecionar.

## Atendimento Stock Ticker

1. Coloque um **Create Seat parado** com **exatamente um Stock Ticker** ao lado.
2. Configure a rede logística e o estoque reais.
3. Escolha **Stock Ticker Attendance** e atribua separadamente **Stock Ticker / Create seat**.
4. Salve, feche e espere **Attending the Stock Ticker**.
5. Interação comum abre a tela nativa de pedidos. Ferramentas de edição mantêm prioridade.

![Criar o trabalho de balcão, escolher Ticker e assento separadamente e abrir os pedidos com estoque conectado.](assets/media/guides/create-lessons-20261108/lesson-stock-ticker.mp4 "Packager fornecedor e Stock Link estão conectados. Mostra aproximação, assento, interação de mãos vazias e tela nativa.")

**Momentos**: 0:08 Horário vazio · 0:40 Alvos no mundo · 0:56 Ativar/salvar · 1:10 Execução real · 1:23 Tela de pedidos.

O balcão filmado conecta Packager fornecedor, Stock Link e estoque real de ferro na mesma rede. A interação de mãos vazias abre a tela original de pedidos com esse estoque visível. Pagamento e entrega final ao destinatário não fazem parte desta aula.

É um menu de Create para jogadores, separado da loja DRM. Tickers ausentes/ambíguos ou assento ocupado impedem atendimento. O NPC sai com segurança após o turno. Sentar, atender e [pedir materiais automaticamente](#dochi-npc-core/npc-core-create-factory) são ações diferentes.

## Combustível para Blaze Burner

O transporte de itens existente pode entregar combustível aceito a um Create Blaze Burner compatível e guardar recipientes devolvidos, como baldes. Reserve espaço. Configure filtros e quantidades em [Trabalho e transporte NPC](#dochi-npc-core/npc-core-editor). Os vídeos novos não mostram esse abastecimento separadamente. Aquecer o Burner não fornece automaticamente potência, tubulação ou todos os requisitos da receita.
