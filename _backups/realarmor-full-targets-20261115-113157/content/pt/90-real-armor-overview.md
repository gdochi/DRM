---
title: Armaduras de NPCs e criaturas
slug: dochi-real-armor-overview
order: 900
description: Configure proteção e durabilidade para NPCs, criaturas e animais conforme a versão.
product: dochi-real-armor
category: Visão geral
section: overview
status: Prévia
version: 0.1.7
audience: Jogadores, operadores de servidores e criadores de modpacks
tags:
  - armor
  - customnpcs
  - easy npc
translationSource: en
translationMethod: assisted
---

## Entidades na versão 0.1.7

Entidades comuns e de outros mods, incluindo zumbis, esqueletos e piglins, usam Real Armor quando uma armadura real ocupa seus espaços de equipamento. Nenhum mod de NPC é necessário; a opção de cada integração continua tendo prioridade para o NPC correspondente. O tratamento dos jogadores não muda. Armaduras na mão, abóboras e enfeites sozinhos não ativam esse suporte. Criaturas comuns voltam ao tratamento original de dano quando a última armadura é removida ou quebra.

A versão 0.1.7 também implementa armaduras de animais conforme a versão do Minecraft. As compilações e verificações de pacotes dos cinco carregadores estão concluídas; a verificação de combate real da nova função de animais está pendente. As gravações anteriores não verificam essa função.

## Atualize para 0.1.6
Estas são as mudanças da versão 0.1.6. Melhora os botões de configuração, o foco após respostas do servidor e o tratamento de conflitos ao salvar. Salvar um conjunto não o ativa: conclua **Save → confirmação de Apply**. As capturas anteriores de 0.1.4 e 0.1.5 mantêm suas versões nas legendas.

## Tornar os NPCs blindados mais resistentes.

Real Armor usa armaduras equipadas, tenacidade e encantamentos de proteção para reduzir o dano da NPC. Você também pode permitir a perda de durabilidade ou usar apenas a armadura que cobre a região atingida.

Ele suporta DNPC, Easy NPC e CustomNPCs. DRM é opcional. CustomNPCs não está disponível em 26.3.

Na versão 0.1.5, configure na GUI os drops de armaduras que realmente perdem durabilidade. Veja a [configuração de drops e o vídeo](#dochi-real-armor/dochi-real-armor-drops) para probabilidades, quantidades e como salvar e aplicar conjuntos.

## Comece.

1. Habilite sua integração NPC em [ setup](#dochi-real-armor/dochi-real-armor-setup).
2. Equipar o NPC com armadura.
3. Compare os danos do mesmo ataque antes e depois de equipá-lo.
4. Escolha armaduras e configurações de durabilidade.

![A DNPC vestindo um conjunto de armadura de ferro completo, com itens de ferro na cabeça, peito, pernas e pés e o modelo equipado na pré-visualização.](assets/media/guides/armor-014-neo1211/armor-equipped.png "Exemplo com Real Armor 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Coloque armadura nos slots do equipamento à direita, em vez de apenas armazená-lo em NPC storage.")

Nesta configuração, um dano de base `10` hit removido `10` Saúde sem armadura e `6` com o conjunto de ferro desencantado. Este é um exemplo de corpo inteiro; modo de região de ataque, armas e encantamentos podem mudar o resultado. Se um DNPC não sofrer nenhum dano, verifique também **Combat AI → Invulnerable** e **Allow player damage**.

## Armadura de corpo inteiro ou parte do corpo

| Configurando | Armadura usada |
| --- | --- |
| Todo o corpo | Armadura equipada juntos |
| Parte do corpo. | Capacete para cabeça, peitoral para peito, leggings/botas para pernas |

A armadura da parte do corpo deixa o equipamento vazio, como uma cabeça desprotegida. Ataques sem uma região de ataque reconhecível usam todos os slots equipados.

Dano de passagem de armadura não é reduzido por armadura. Veja [ configurações de cálculo](#dochi-real-armor/dochi-real-armor-calculation).
