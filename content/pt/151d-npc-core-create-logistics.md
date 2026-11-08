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

São configurações do **Schedule** para criadores e sua execução no mundo. Leia [Início Create](#dochi-npc-core/npc-core-create-start). Os vídeos silenciosos usam DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1. Execuções usam dispositivos e turnos preparados; vídeos de edição mostram as alterações indicadas.

## Polimento com lixa

1. Escolha **Sandpaper Polishing**. Ponha **Sand Paper / Red Sand Paper** reais e materiais políveis em **Source inventory**.
2. Atribua **Finished items inventory**.
3. Configure **Working position and facing**, pelo seletor ou **Use my position and facing**, que salva pés e direção.
4. Use **Repeat throughout shift** ou **Finish one batch per shift** com **Batch size** finito. O exemplo transforma dois Rose Quartz em dois Polished Rose Quartz.
5. Defina **Work interval (ticks)**, ative e salve. **20 ticks** equivalem a um segundo em 20 TPS.

![Buscar lixa e quartzo, polir no lugar definido e entregar dois resultados.](assets/media/guides/create-tutorials-20261108/create-polish.mp4 "Receita e desgaste reais de Create; contadores leem inventários do servidor.")

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

![Editar Workshop A, espera de 80 ticks e salvar a rota preparada.](assets/media/guides/create-tutorials-20261108/create-parcel-routes.mp4 "Destinatário e inventários preparados. 80 ticks são quatro segundos em 20 TPS; o padrão é 400.")

A rota salva o **UUID**, não o nome. Recriar ou clonar um NPC com o mesmo nome não substitui sua identidade. Selecione o novo destinatário; veja [Modelos NPC](#dochi-npc-core/npc-core-templates).

![Workshop A chega ao NPC; Unknown fica na origem.](assets/media/guides/create-tutorials-20261108/create-parcel-npc.mp4 "Um pacote selado chega ao inventário do destinatário; o outro não corresponde à rota.")

## Rota para inventário

Use **Add inventory delivery route**, selecione o recipiente com Shift + clique direito e informe o endereço. Altere rotas existentes com **Choose a receiving inventory / Choose an NPC recipient**.

![Entregar o pacote selado em um barril receptor.](assets/media/guides/create-tutorials-20261108/create-parcel-container.mp4 "Entrega intacta, sem abrir com Packager ou transportar depois.")

Cada pacote deve corresponder a **exatamente uma** rota. Os padrões de Create se aplicam: **Workshop *** pode se sobrepor a **Workshop A**. Pacotes ambíguos ficam na origem. Comece com endereços exatos distintos.

## Espera e devolução

Se o destino já está ausente/cheio antes da coleta, o pacote fica na origem. Se isso ocorre durante o transporte, o NPC espera e devolve para **Return inventory**. Devolução cheia mantém a encomenda com o entregador.

![Devolver um pacote cujo destino enche após a coleta.](assets/media/guides/create-tutorials-20261108/create-parcel-return.mp4 "A ferramenta enche deliberadamente o destino com pedra após a coleta para mostrar a obstrução. O pacote volta intacto.")

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

![O NPC senta no balcão e abre a tela real de pedidos Create.](assets/media/guides/create-tutorials-20261108/create-stock-keeper.mp4 "Mostra atendimento e abertura do menu, sem concluir pagamento ou entrega.")

**No Packagers Linked** aparece porque este balcão de exemplo não conecta um Packager fornecedor. Conecte rede logística e estoque reais para pedir. O guia de pedidos usa outra rede conectada.

É um menu de Create para jogadores, separado da loja DRM. Tickers ausentes/ambíguos ou assento ocupado impedem atendimento. O NPC sai com segurança após o turno. Sentar, atender e [pedir materiais automaticamente](#dochi-npc-core/npc-core-create-factory) são ações diferentes.

## Combustível para Blaze Burner

O transporte de itens existente pode entregar combustível aceito a um Create Blaze Burner compatível e guardar recipientes devolvidos, como baldes. Reserve espaço. Configure filtros e quantidades em [Trabalho e transporte NPC](#dochi-npc-core/npc-core-editor). Os vídeos novos não mostram esse abastecimento separadamente. Aquecer o Burner não fornece automaticamente potência, tubulação ou todos os requisitos da receita.
