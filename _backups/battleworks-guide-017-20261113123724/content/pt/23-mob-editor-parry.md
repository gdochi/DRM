---
title: Combata a propriedade, o escopo e a morte.
slug: mob-editor-parry
order: 270
description: Impedir controladores sobrepostos e entender quais opções de combate estão ativas.
product: mob-editor
section: combat
category: BattleWorks
status: Guia
version: 0.1.6
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Suprimir ataques nativos sobrepostos

Ativar **Combat Rules → Combat → Suppress Native Attacks** quando as caixas de atalhos criadas devem possuir tempo de ataque.

1. Comece com um ataque de hitbox.
2. Habilitar supressão e salvar/aplicar.
3. Procure por mais batidas durante a preparação ou recuperação.
4. Se a sobreposição permanecer, inspecione os scripts de combate do CustomNPC.

## 2. Lidar com scripts legados deliberadamente

0.1.5's **Suppress CustomNPC Scripts** impede a execução de scripts legados de competir com BattleWorks. Ele preserva os dados de script armazenados.

Isso é útil ao portar um chefe com roteiro. Verifique qualquer comportamento de não-combate fornecido por esses scripts antes de confiar na supressão. Um novo NPC normalmente não precisa dele.

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
