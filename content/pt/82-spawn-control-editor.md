---
title: Spawn Control Editor
slug: dochi-spawn-control-editor
order: 830
description: Use a barra superior, catálogo de destino, visualização, gerente de regras, inspetor, filtros e ações em massa.
product: dochi-spawn-control
category: Editor
section: editor
status: Rascunho
version: 0.1.5
audience: Criadores da regra de Spawn
tags:
  - editor
  - profiles
  - filters
translationSource: en
translationMethod: assisted
---

Esta página descreve os perfis **natural-spawn**. Para os reprodutores colocados, use o guia [Spawner Editor](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-spawn `Spawn Chance (0-1)` é separado de chances relativas em uma lista de alvos de geração.

## O que é essa tela?

Spawn Control é um **editor de autoria** para a configuração natural ativa do servidor. Não é uma tela de jogo voltada para o jogador. As mudanças permanecem no rascunho atual até que você conclua `Save` ou uma operação predefinida.

![Spawn Control com Entity / Clone Catalog à esquerda, um preview do alvo e Regras de Spawn Natural no meio, e Inspetor de Regras à direita.](assets/media/guides/spawn-control-014-neo1211/catalog.png "Spawn Control 0.1.4 em NeoForge 1.21.1. Selecione um alvo, adicione uma regra com Adicionar regra e, em seguida, edite suas condições de criação à direita.")

Encontre a criatura no campo de busca à esquerda. **Selected Target** mostra suas regras; **All Configured** inclui outros alvos. Se o painel direito disser "Nenhuma regra está selecionada", selecione uma regra no meio.

## Topbar

| Ação | Comportamento |
| --- | --- |
| `Editors` | Retornar para o seletor de editor compartilhado DRM quando DRM Core estiver disponível. |
| `Create New` | Inicie um rascunho de conjunto de geração vazio sem alterar a configuração do servidor ativo ainda. |
| `Load` | Procure e carregue um conjunto completo ou uma predefinição de destino. |
| `Save` | Armazene o rascunho como a configuração do servidor ativo e aplique-o imediatamente. |
| `Save As` | Escolha Complete Set ou Current Target Preset antes de nomear o arquivo. |
| `Reset` | Restaure a linha de base recebida quando o editor abriu ou foi atualizado pela última vez após salvar. |
| `Close` | Feche o editor. Edições não salvas não são aplicadas. |

## Esquerda: Entity/Clone Catalog

O catálogo escolhe o alvo para novas regras.

- Pesquise criaturas registradas e modelos NPC salvos suportados juntos. Veja [ spawning salvou NPCs ](#dochi-spawn-control/spawn-control-npc-templates) para DNPC modelos.
- Pesquise por ID, nome de exibição ou nome mod.
- Use `mod:<id>` ou `support:<state>` consultas.
- Combine fonte de entidade/clone, estado de suporte e filtros mod instalados.
- Visualize o alvo selecionado no painel do meio.
- Use a ação inferior `Native: ON/OFF` para uma entidade registrada. Não se aplica a clones.

Projéteis, efeitos e outros EntityTypes que não sejam criaturas ficam fora dos alvos comuns. Veículos compatíveis e modelos de veículos salvos aparecem por integrações específicas; veja [geração de veículos](#dochi-spawn-control/spawn-control-vehicles). Chefes especiais podem ter suporte experimental.

## Preview e regras de spawn naturais

A seção superior pré-visualiza o destino do catálogo selecionado. A seção inferior gerencia regras configuradas.

| Ver | Significado |
| --- | --- |
| `Selected Target` | Mostre apenas as regras que pertencem ao alvo atual do catálogo. Esse é o padrão. |
| `All Configured` | Mostre regras para cada alvo em uma visão gerencial. |

Selecionando um corpo de regras em `All Configured` seleciona esse perfil e move o catálogo para o seu alvo real. Ele não copia ou herda a regra na entidade previamente visualizada.

Cada parte de uma linha de regras tem uma ação separada.

| Área da fila | Ação |
| --- | --- |
| Caixa de seleção Esquerda | Selecione regras para Duplicar, Habilitar, Desativar ou Excluir em massa |
| Corpo da fila | Selecione o perfil mostrado no inspetor |
| Interruptor direito | Alternar o estado habilitado de um perfil |

`Add Rule` sempre cria um perfil para o alvo atual do catálogo. Ações em massa afetam apenas regras verificadas. Delete tem uma etapa de confirmação e continua sendo uma mudança de rascunho até salvar.

## Pesquisar, filtrar e classificar

A pesquisa de regras abrange nomes, IDs de perfil, chaves de destino, EntityTypes, guia/nome do clone e erros de validação. O status em linha, sort-key e os dropdowns de direção abaixo da pesquisa de regras fornecem:

- state: Todos, habilitados, desativados ou erros
- chave de classificação: Prioridade, Nome ou Alvo
- direção: Ascendente ou descendente

Uma regra oculta por busca ou filtragem não foi excluída. Se um alvo tiver regras, mas o resultado estiver vazio, desmarque o filtro de consulta e de estado primeiro.

## Inspector de regras

O inspetor edita o perfil selecionado em Identidade, Condições Mundiais, Taxa de Spawn e Grupo, Population Caps e Lifecycle.

Dimensões e Biomas usam seletores multi-selecionados pesquisáveis. Nenhuma seleção significa irrestrito. Intervalos numéricos usam campos separados; intervalos invertidos podem ser normalizados em ordem segura durante o save.

O rótulo EntityType ou clone sob o inspetor é o alvo ** real de propriedade da regra selecionada**. Se for diferente da visualização, verifique se você selecionou intencionalmente uma regra diferente em `All Configured`.

## Diagnóstico avançado

| Ação | Impacto mundial |
| --- | --- |
| `Check Here` | Avalie as condições e limites no local atual sem criar uma entidade |
| `Spawn One` | Criar uma entidade gerenciada após confirmar, ou todo o esquadrão ativado |
| `Clear Generated` | Remover entidades geradas atualmente rastreadas por este mod |

Os diagnósticos enviam o rascunho atual para avaliação temporária do lado do servidor sem primeiro substituir o arquivo de configuração ativa.

A regra filtra a apresentação da lista de alterações sem salvar o documento. Fuga ou um clique externo cancela um dropdown aberto sem ativar os controles de fundo. Painéis estreitos envolvem controles na próxima linha.

## Composição e diagnóstico na 0.1.5

No Forge 1.20.1, o inspetor tem abas World, Spawn, Gear, Squad e Advanced. Abra **World → Locations and guard squad → Edit** para os filtros de local. Em Squad, também é possível buscar no catálogo esquerdo, usar **Add to squad** e editar quantidades e equipamentos. A regra do esquadrão continua selecionada durante a busca.

No Fabric/NeoForge, role o inspetor até **Locations and guard squad → Edit**. Veja [guardas de estruturas](#dochi-spawn-control/spawn-control-guards) para as duas abas de detalhes. Apply atualiza o rascunho; Save no editor principal aplica ao servidor.

Advanced Diagnostics abre uma janela centralizada. Leia resultados longos com a roda ou barra de rolagem. Com o esquadrão ativado, o teste confirmado cria o esquadrão inteiro. Forge chama essa ação de **Spawn Squad**.
