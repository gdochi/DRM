---
title: Combata a propriedade, o escopo e a morte.
slug: mob-editor-parry
order: 270
description: Impedir controladores sobrepostos e entender quais opções de combate estão ativas.
product: mob-editor
section: combat
category: BattleWorks
status: Guia
version: 0.1.7
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Suprimir ataques nativos sobrepostos

Ative **Combat Rules → Combat → Suppress Native Attacks** quando as hitboxes devem controlar o tempo dos ataques. Salve/aplique e confira golpes extras durante preparação e recuperação. Se persistirem, inspecione a IA do ator e outros controladores; configure DNPC no próprio editor.

## 2. Usar scripts legados deliberadamente

**Suppress CustomNPC Scripts** só se aplica à integração opcional CustomNPCs em destinos compatíveis anteriores a 26.3. Impede competição com BattleWorks preservando os dados dos scripts. Confira funções não relacionadas ao combate antes de usar.

DNPC não precisa de CustomNPCs nem desta opção. A partir de 26.3, CustomNPCs está excluído; use DNPC ou o provedor compatível.

## 3. Suporte atual de parry

| Característica | 0.1.5 comportamento de origem |
| --- | --- |
| Global Magic Projétil Parry | Integração de reflexão para os projéteis Spellbooks do Iron suportados |
| Global Lock-on | Permissão global com configurações de apresentação local |
| Hitbox Debug | Visualização, não dano adicional |
| Documento Janela de Parry / Postura / Riposte | Editável e persistente, mas sem correspondência BattleWorks consumidor de tempo de execução padrão foi encontrado |
| Padrão Parryable / Dano de Postura em Parry | Estes campos por si só não implementam perda de postura, parry corpo a corpo, ou riposte |
| Reações de guarda / evasão | Caminho de reação a danos implementado separadamente; veja [passivos](#mob-editor/battleworks-passives) |

A reflexão projétil não é um suporte universal para cada projétil mod. Não faça um encontro exigir que a postura reservada/campos de ripostas se tornem beatáveis.

## 4. Configurações globais versus locais

| Arquivo | Propósito |
| --- | --- |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Pausa mágica compartilhada, travamento e bandeiras hitbox-debug |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Painéis, aparência de bloqueio, trilhas, áudio e preferências locais |

Os padrões globais ativam a magia parry e lock-on e desabilitam o hitbox debug.

**Disable vanilla music** é uma preferência de áudio local independente. Ele suprime a música baunilha, independentemente do estado de combate e não substitui o valor do volume de música. Veja [BGM configurado](#mob-editor/battleworks-skills-effects).

![Configurações de morte e um cronograma de eventos de morte vazio.](assets/media/guides/battleworks-016-neo1211/battleworks-death.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Ativado está desligado e Duração é 60 carrapatos nesta captura. Ative-o, defina o comprimento desejado e adicione eventos com o evento Adicionar Morte.")

## 5. Faça uma curta sequência de morte.

1. Abra **Combat Rules → Death**.
2. Habilite-o e defina a Duração 40 carrapatos.
3. Habilite Lock Corpse se o movimento horizontal deve ser mantido.
4. Adicione um som ou título no tick 0.
5. Adicione outro evento no tiquetaque 20 se necessário.
6. Mantenha cada evento e repetição final dentro da Duração.
7. Mate o NPC real e observe toda a sequência.

O assassino pode se tornar o alvo da sequência. Títulos e diálogos dirigidos por jogadores precisam de um destinatário adequado. Habilidades que exigem um rodízio vivo podem falhar após a morte, então comece com som, título e movimento compatível.

Lock Corpse pára a navegação e o movimento horizontal. Drops, respawning, e toda a física do cadáver não estão configurados por este interruptor.

## Verificações de conclusão

Certifique-se de que nenhum hit extra nativo/script se sobrepõe à linha do tempo, campos reservados não são necessários para a vitória, a apresentação da morte termina corretamente, e o arquivo pretendido permanece conectado após o respawn ou outra luta.
