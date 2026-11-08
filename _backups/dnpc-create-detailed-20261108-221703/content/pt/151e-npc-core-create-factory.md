---
title: Create · Processamento e pedidos de materiais
slug: npc-core-create-factory
order: 1516
description: Diferencie quatro inventários, configure lotes e peça faltas pela logística real de Create.
product: dochi-npc-core
category: Integração Create
section: editor
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Comece com uma máquina funcional

**Factory Process** abastece uma máquina real e recolhe seu resultado. Teste a receita manualmente. Create controla potência, direção, esforço, calor e líquidos. O exemplo usa **Iron Ingot → Mechanical Press + Depot → Iron Sheet**, com Creative Motor como fonte de exemplo.

Leia [Início Create](#dochi-npc-core/npc-core-create-start) e [Encomendas](#dochi-npc-core/npc-core-create-logistics). Vídeos silenciosos: DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Quatro papéis de inventário

| Campo | Função | Exemplo |
| --- | --- | --- |
| Source inventory | Retirar matéria-prima | Barril esquerdo |
| Machine input inventory | Inserir na máquina | Depot sob a prensa |
| Finished output inventory | Recolher resultado real | Mesmo Depot |
| Finished items inventory | Entregar produto | Barril direito |

Entrada e resultado podem compartilhar o Depot. Origem deve diferir da entrada; destino final deve diferir da saída da máquina. Metades do baú duplo são o mesmo inventário. Comece com dois barris e um Depot.

## Configurar Factory Process

1. Adicione **Schedule → + do turno → Create → Factory Process**.
2. Atribua quatro posições com **🔍** e confira faces/filtros nativos.
3. Escolha **Material item / Material quantity**. **Add material** permite até **8 itens distintos**, **1–64** de cada por lote.
4. Defina **Finished item / Finished quantity per batch** conforme a receita.
5. Inicialmente desligue **Order missing materials automatically** e abasteça manualmente.
6. Ative **Repeat throughout shift** ou escolha **Batch size** finito, que aqui conta lotes.
7. Configure **Processing timeout in ticks / Work interval (ticks)**, ative e salve.

![Definir dois lingotes e duas chapas por lote e salvar a máquina preparada.](assets/media/guides/create-tutorials-20261108/create-factory-settings.mp4 "Posições e itens preparados. A execução abaixo usa dois lotes de um item.")

## Quantidades dos lotes

| Configuração | Por lote | Total finito |
| --- | --- | --- |
| Material 1, resultado 1, Batch size 2 | 1 lingote → 1 chapa | 2 → 2 |
| Material 2, resultado 2, Batch size 3 | 2 lingotes → 2 chapas | 6 → 6 |

Isso pressupõe receita garantida 1:1. Resultados aleatórios podem deixar o NPC esperando uma quantidade impossível. **IDs de matéria-prima e produto devem ser diferentes**.

## Reunir, inserir, aguardar e entregar

![Dois lotes completos com a prensa nativa e entrega de chapas.](assets/media/guides/create-tutorials-20261108/create-factory-process.mp4 "Um lingote e uma chapa por lote; Batch size 2. Dois resultados reais chegam ao barril final.")

Remova o produto configurado que já estiver na saída da máquina antes do início. O NPC reúne, insere, espera o resultado real e entrega. Um trabalhador reserva entrada/resultado; outro compartilhando pode esperar em **Workstation is reserved by another worker**.

## O limite de tempo preserva a carga

Padrão: **1200 ticks**, cerca de 60 segundos em 20 TPS; faixa **20–24000 ticks**. **Processing timed out; existing materials remain owned** mantém o lote, sem apagá-lo e duplicar a entrada.

Confira potência/esforço, ingredientes, calor/líquidos, posição real de saída, ID e quantidade final. Destino cheio mantém produtos no NPC; inventário NPC cheio impede a coleta. Revise mercadorias reservadas antes de substituir máquinas ou mover cargas. Reconectar ou alterar ajustes não cancela com segurança um lote em andamento.

## Material Ordering mantém estoque-alvo

**Material Ordering** verifica **Receiving inventory to maintain** e pede apenas a falta pelo Stock Ticker. Meta **4 lingotes** pede quatro com inventário vazio ou um quando existem três. Aqui quantidade é **estoque-alvo**; no processamento é **consumo por lote**.

Prepare o lado Create:

1. Estoque fornecedor e **Packager**.
2. **Stock Link / Stock Ticker** na mesma rede; confira o estoque visível.
3. Entrega endereçada e abertura reais para que ingredientes soltos cheguem ao receptor; pedir não teleporta itens.
4. Configure [Addressed Parcel Delivery](#dochi-npc-core/npc-core-create-logistics) separadamente se NPCs transportarem pacotes. Guardar um pacote selado não abre seus ingredientes.

Depois adicione **Material Ordering**, atribua receptor, itens/metas, **Stock Ticker**, **Delivery address** e intervalo; salve.

![Pedir quatro lingotes na rede preparada e aguardar um pedido aceito.](assets/media/guides/create-tutorials-20261108/create-material-order.mp4 "Estoque fornecedor 16→12 e um registro persistente. O exemplo não conecta rota de entrega; chegada e abertura não são demonstradas.")

## Pedidos pendentes não são reenviados automaticamente

Pedidos aceitos sobrevivem a salvamentos e reconexões. O tempo não dispara reenvio. A chegada deve ser observada no receptor original; itens colocados diretamente no NPC não concluem a entrega ausente.

| Estado | Confira |
| --- | --- |
| Native logistics network has insufficient stock | Fornecedor, Stock Link e resumo do Ticker |
| Native logistics network rejected the order | Condições da rede/pedido |
| Accepted order is waiting for delivery | Packager, endereço, transporte, abertura e receptor original |
| Order result uncertain; automatic resend stopped | Se Create já reservou ou despachou itens |
| Target stock is available | Meta satisfeita; espera normal |

Trocar o receptor não faz um pedido antigo chegar ao novo inventário.

## Abastecimento automático no processamento

Após testar manualmente, ative **Factory Process → Order missing materials automatically** e atribua **Stock Ticker / Delivery address**. A fabricação continua após os materiais chegarem à origem. Comece com um responsável pelo pedido para evitar papéis sobrepostos. Continue em [Controle e inspeção](#dochi-npc-core/npc-core-create-control).
