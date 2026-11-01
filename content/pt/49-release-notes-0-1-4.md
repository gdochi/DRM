---
title: O que há de novo em 0.1.4
slug: release-0-1-4
order: 10
description: O recurso verificado, comportamento, dependência e migração mudam de Forge 0.1.3 para 0.1.4.
product: core
category: Primeiros passos
section: getting-started
status: Estável
version: 0.1.4
audience: Criadores / Operadores
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core/release-notes-0-3-1) para orientação atual.

## Encontre a criação de missões

Crie uma Categoria e Quest e, em seguida, defina o título e o comportamento de início/completo em Info. Objetivos contém a tarefa; Recompensas contém o pagamento. Siga o guia atual para aceitá-lo e completá-lo. Continue com o guia [ atual](#core/quest-system) para salvá-lo e aplicá-lo.

![Encontre a criação de missões.](assets/media/guides/drm-031-forge1201/quest-info.png "DRM 0.3.1 / Forge 1.20.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Release Scope

0.1.4 adicionou ferramentas para missões, estatísticas de jogadores, itens personalizados, teleportadores e pop-ups. Conversas e lojas podem ser conectadas a recompensas de missões e destinos de viagem.

## Novos sistemas de autoria

| Sistema | O que 0.1.4 Adiciona |
| --- | --- |
| Quest | Quest packs, capítulos/categorias, objetivos, recompensas, pré-requisitos, regras de repetição/conclusão, `After Complete`, e o `U` Diário. |
| Stat Builder | Conjuntos de estatísticas personalizados, custos pontuais, efeitos de atributo, seleção de conjunto ativo, `Y` IU de alocação e `Go Stat Builder`. |
| Editor de Itens | DRM itens de banco de dados, categorias, raridades, dicas de ferramentas, requisitos, bônus, atributos e escala. |
| Facção | CustomNPCs apresentação de facção, ordenação, estilos de estado, e uma visão geral do jogador. |
| Teletransporte | Categorias, destinos, condições, comandos, fades, sons e NPC. |
| Popup | Definições de popup reutilizáveis, política de conflito/timing, layout de GUI, invocação de comando/script. |
| Admin | Jogador-scoped DRM / FTB quest, avanço, facção, tag e ferramentas de dados armazenados. |

## Mudanças de comportamento importantes

- CustomNPCs é agora uma dependência cliente-e-servidor necessária.
- Os requisitos de status do item não rejeitam mais o equipamento. Quando não atendida, `Unmet penalty %` remove essa porcentagem da contribuição stat/atributo/escalada configurada do item.
- Ações de eventos de busca são intencionalmente limitadas a `After Complete`. Eles correm uma vez depois que as recompensas são bem-sucedidas e a busca é completada.
- O seletor de textura usa seleção explícita mais `Apply`; paginação ou filtragem não escreve para o alvo.
- Companheiro válido `texture.png.mcmeta` metadados de animação são transferidos com ativos PNG personalizados.
- Os atalhos do editor compartilhado usam `Ctrl+S`, `Ctrl+Z` e `Ctrl+Y`/`Ctrl+Shift+Z` onde o editor suporta desfazer histórico.

## Atualizar lista de verificação

1. Para trás `config/dochi_rpg_maker`.
2. Instale 0.1.4 e combinando CustomNPCs no servidor e em todos os clientes.
3. Comece uma vez e revise a nova GUI padrão, quest, stat, item, teletransporte e modelos pop-up.
4. Mantenha o conteúdo de produção sob IDs personalizados; comece a partir de padrões protegidos com `Save As`.
5. Revise a sobreposição HUD se os Feitiços de Ferro, Rolo de Combate ou CustomNPCs medidores de dados estiverem ativados.
6. Teste a entrega da recompensa da missão e `After Complete` Ações em um jogador de palco antes do uso da produção.

:::warning Dados padrão
Os padrões empacotados são modelos de referência e podem ser atualizados pela versão instalada. Não trate a `default_*` ou arquivo de amostra como a única cópia do trabalho de produção.
:::
