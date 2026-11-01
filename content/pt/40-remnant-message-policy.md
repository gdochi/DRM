---
title: Condições Remanescentes, Ações e Permissões
slug: remnant-message-policy
order: 116
description: Escolha quem pode usar ou ler uma mensagem e o que acontece quando ela é lida.
product: core
category: Remnant Msg
section: remnant-msg
status: Guia
version: 0.3.1
audience: Criadores e operadores
translationSource: en
translationMethod: assisted
---

## Decida quem pode ler o aviso.

Crie uma mensagem [Remanescente](#core/remnant-msg), depois configure **Interact Conditions / View Conditions / View Actions**. Siga [ colocação marcador ](#core/remnant-marker-gui) para colocá-lo no mundo.

| Comportamento desejado | Abrir |
| --- | --- |
| Restringir quem pode usar o marcador | Condições de Interação |
| Restringir quem vê seu corpo | Ver Condições |
| Dê um item, defina uma tag ou execute outra ação na leitura | Ver Ações |

Depois de adicionar condições, também ative o interruptor **Enable**. ** e** requer todas as condições; ** ou** requer uma. Escolha se as ações de visualização acontecem sempre ou uma vez por jogador e salve.

![Ative a lista de mudanças e condições.](assets/media/guides/drm-031-forge1201/remnant-view-conditions.png "DRM 0.3.1 / Forge 1.20.1. Adicionando uma regra e habilitando suas verificações são passos separados. Uso de controles de interação; Exibir exibição de mensagens de controles.")

## Referência do arquivo de mensagem

O editor pode escrever essas configurações. Use esta tabela ao inspecionar um arquivo externo.

| Campo | Significado |
| --- | --- |
| id / nome / ativado | Identidade salva, nome da lista e se ela é usada |
| mensagem / messageStyles | Corpo e intervalos de texto com estilo |
| gui | O layout conectado remnant_msg |
| useConditions / messageConditions | Condições de interação e exibição |
| messageActionsEnabled / messageActions | Se as ações são executadas e seu conteúdo |
| messageTrigger | `every_view` ou `once_per_player` |

Estilos de mensagem podem colorir, em negrito, em itálico, sublinhar ou atacar através dos intervalos do corpo. As condições usam a mesma família geral que as condições de diálogo.

## Permissões da política de servidor

A política controla o que os autores podem fazer; não contém um corpo de mensagem.

| Campo de política | Controles |
| --- | --- |
| generalUseAllowed | Setter/marcador de jogador comum |
| generalCanWriteMessage | Escrita de texto direta do jogador comum |
| generalCanUseJson / generalCanUseTriggers | Ordinary-player salvou-mensagem e uso de gatilho |
| adminCanUseJson / adminCanUseTriggers | Administrador salvou-mensagem e uso de gatilho |
| consumeSetterOnGeneralUse | Se o uso comum consome o setter |
| markerLifetimeTicks | Vida útil do marcador |
| maxMessageLength | Limite de comprimento do corpo |

O pacote `default_policy.json` permite o uso comum e a escrita direta, mas desabilita o uso comum de JSON/gatilho. Os administradores podem usar JSON e gatilhos. Os padrões não consomem o setter, usam a vida útil 0 e permitem 4096 caracteres. Uma política existente é preservada na atualização.

Mantenha os quatro papéis separados: o **mensagem** define o conteúdo, **política** define permissão, **GUI** define layout e **marcador** define a localização do mundo. Uma GUI não pode conceder permissões; as condições de uma mensagem se aplicam apenas a essa mensagem.
