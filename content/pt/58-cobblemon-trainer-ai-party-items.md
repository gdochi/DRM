---
title: Treinador de IA, equipes e itens
slug: cobblemon-trainer-ai-party-items
order: 580
description: Motores de IA, equipes aleatórias, e a distinção entre inventário geral e itens de batalha redonda.
product: drm-cobblemon-editor
category: Primeiros passos
section: trainer
status: Estável
version: Fabric / NeoForge 0.2.9
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
---

## Encontre IA, geração de equipe e itens

Selecione uma rodada em **Battle Config → Rounds** e, em seguida, clique no valor ao lado **AI skill**; ele diz Avançado neste exemplo. Autor de sua equipe e saco de batalha para a mesma rodada. Telas usam ** 0.2.9 / NeoForge 1.21.1, interface do usuário em inglês**.

![Rodadas mostrando a rodada selecionada e a habilidade da IA.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "A PokémonUm item e uma poção usados por seu treinador são configurações separadas.")

## Escolhendo o motor de IA

| Motor | Usar |
| --- | --- |
| `DRM Strategy` | DRM Afinação, planos de estratégia, itens de treinador, e decisões de truques de treinador. |
| `RCT` | Opcional RCT provedor. Requer uma instalação de API compatível RCT. |
| `Cobblemon Strong` | Cobblemon é IA forte embutido. |

DRM Estratégia funciona sem RCT. RCT ausência ou erros de chamada são tratados no limite adicional; eles não fazem RCT uma dependência necessária. DRM's redondo item saco e gimmick plano aplicar a DRM Estratégia.

Comece com uma predefinição, altere um valor ou estratégia de IA de cada vez e compare usando a mesma equipe e regras de batalha. A seleção do movimento, a troca e o timing do item também dependem do estado atual da batalha.

## Equipe aleatória

![Equipe aleatória Básicos, Gerar e Aplicar.](assets/media/guides/cobble-029-neo1211/cobble-party-generator.png "Abrir equipe Pokémon → Gerar equipe. Defina o tamanho, os níveis e os filtros, Gere uma visualização e, em seguida, Aplique-a à equipe atual.")

Configure o tamanho da equipe, nível, gerações, tipos, estágio de evolução, elegibilidade lendária/mítica, espécies duplicadas, chance brilhante, configurações de IV/EV e escolhas automáticas de natureza/capacidade/movimento. Os candidatos vêm do registro Cobblemon instalado. Relaxe os filtros se houver muito poucos candidatos.

Uma semente fixa é reprodutível dentro da mesma configuração mod/datapack/registry. Mudar espécies disponíveis pode mudar o resultado.

## Itens de instrutor

![Catálogo de itens de batalha, inventário por batalha e política de inteligência artificial.](assets/media/guides/cobble-029-neo1211/cobble-battle-items.png "Abra a equipe de Pokémon → Battle Item Inventory. Desativado salva o saco, mas impede o uso de IA; adicione itens, escolha uma política e aplique.")

O saco de batalha virtual da rodada tem até 16 tipos de itens, cada um com quantidade 1 – 99. Ele é recriado para cada batalha e usa DRM Estratégia; não remove itens do inventário físico do NPC.

Use recuperação, cura de status, reavivamento, recuperação de PP, ou itens de aumento de status. Frequência de uso do item, limiar de HP de cura, voltas de impulso antecipadas e controle de categorias de recuperação permitidas quando a IA as considera. Fornecer um item não garante o uso no primeiro turno.

## Gimmicks de treinador

Configure o equipamento e a política Mega, Dynamax, Z-Move, Tera ou Omni da rodada. Coloque o item chave apropriado no Inventário Geral e prepare-se Pokémon itens mantidos, tipo Tera, nível Dynamax ou fator Gigantamax quando necessário. Essas integrações precisam de uma instalação Mega Showdown compatível.

As permissões de equipamentos e regras de batalha são separadas. Um truque proibido permanece proibido mesmo quando seu item-chave está presente. Veja [ Regras de Batalha](#drm-cobblemon-editor/cobblemon-battle-rules).

## Adicionar itens personalizados ao Inventário Geral

![Treinador Geral Inventory com Todos os itens e Player inv.](assets/media/guides/cobble-029-neo1211/cobble-general-items.png "General Item Inventory fornece requisitos de posse, como chaves de truque. Escolha de Todos os itens ou Player inv, Adicionar selecionado e, em seguida, Aplicar.")

Abra `General > General Item Inv` para o inventário compartilhado por todo o Treinador.

1. Pesquise `Items` por uma pilha padrão registrada ou selecione uma pilha de jogador real de `My Inventory`.
2. Escolha `Add selected`. `My Inventory` copia a pilha sem consumir o item do jogador.
3. Set `Quantity` Para 1–99 e salvar o treinador. O inventário tem até 64 entradas.
4. Empilha com o mesmo ID do item, mas nomes diferentes, encantamentos ou componentes personalizados podem permanecer entradas separadas.

As edições de quantidade preservam a TNP e os componentes. Para uma entrada com dados armazenados, escolha outro item da lista em vez de editar seu ID de item. Dados inválidos ou de grandes dimensões são rejeitados em vez de silenciosamente substituídos por um item simples.

Este inventário verifica a posse da chave sem consumir as chaves. É separado de `Trainer Items`, o saco de cura / batalha da IA redonda.

JSON referência: o esquema de Treinador permanece `23`. As entradas gerais armazenam `componentsSnbt` e ainda leem dados mais antigos `components`. Não mude `schemaVersion` manualmente para ativar o recurso.

## 0.2.7 estratégia e seleção de movimento

DRM A estratégia avalia os estágios de estatística reais e o campo atual para configuração, telas, Trick Room, comutação, truques e sinergia de equipe. Corrige a troca pós-configuração, aumento repetido e reservas de duplos vazios. RCT continua sendo um provedor de IA opcional separado.

A pesquisa de movimento inclui todos os movimentos registrados, classificação normal, eventos e movimentos anteriores de aprendizagem primeiro. A seleção não estabelece a capacidade de aprendizagem das espécies ou garante o comportamento arbitrário do provedor. Verifique as permissões, políticas, itens-chave e provedores compatíveis.

Alterações publicadas: [0.2.8 Change Log](#drm-cobblemon-editor/changelog-0-2-8).
