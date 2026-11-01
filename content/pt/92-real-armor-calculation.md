---
title: Armadura e cálculo de Hit-Region
slug: dochi-real-armor-calculation
order: 920
description: Fontes de armadura, limiares de região de ataque, ordem de resistência, encantamentos, knockback e durabilidade.
product: dochi-real-armor
category: Cálculo da Armadura
section: calculation
status: Estável
version: 0.1.4
audience: Operadores de servidor e criadores de modpacks
tags:
  - damage
  - body parts
  - toughness
translationSource: en
translationMethod: assisted
---

## Escolha quais efeitos de armadura se aplicam

![Armadura Geral em Real Armor 0.1.4 em NeoForge 1.21.1, com resistência separada, proteção e knockback-resistência interruptores.](assets/media/guides/armor-014-neo1211/armor-config.png "Resistência à armadura, encantamentos de proteção e efeitos separados de controle de resistência à armadura. Redução de danos e knockback não são uma configuração.")

Habilitar **Body-part armor** para fazer lacunas, como uma matéria de cabeça não-helmeted. Desative-o para o equipamento proteger juntos. Desativar **Damage armor items** para armadura que não se desgasta enquanto mantém o cálculo da armadura ativado.

## Referência do arquivo: Armor Stat Source

Os valores a seguir são para edição direta de arquivo de configuração. A tela de configurações básicas não requer a inserção de todas elas.

A configuração `armorStatSource` controla como armadura, dureza e resistência a nocautes são lidos.

| Valor | Comportamento |
| --- | --- |
| `AUTO` | Prefira atributos de entidade utilizável e volte para modificadores de itens equipados quando eles fornecem o valor de armadura ausente ou maior |
| `VANILLA_ATTRIBUTE` | Leia apenas os atributos da armadura da entidade viva |
| `INVENTORY_SCAN` | Modificadores de soma de capacete, peitoral, leggings e botas |

`AUTO` é o padrão recomendado porque os mods NPC nem sempre expõem equipamentos através de atributos de baunilha da mesma maneira.

## Limites da região de acesso

Para Easy NPC, a altura de impacto resolvida é normalizada contra a caixa delimitadora da entidade.

| Altura normalizada | Região | Slots usados |
| --- | --- | --- |
| `0.75` ou superior | Cabeça | Capacete |
| `0.375` para baixo `0.75` | Peito | Chapeuzinho |
| Abaixo `0.375` | Pernas | Leggings e botas |

CustomNPCs usa seus dados dedicados de resolução e modelo quando disponíveis. Se nenhum ponto de acerto confiável existe, a região é `unknown` e todos os slots de armadura são usados para que o dano comum não perca silenciosamente a proteção da armadura.

## Resistência, encantamentos e durabilidade

CustomNPCs A ordem de resistência pode ser definida como `CNPC_RESISTANCE_THEN_VANILLA_ARMOR` ou `VANILLA_ARMOR_THEN_CNPC_RESISTANCE`. Esta opção afeta CustomNPCs processamento; Easy NPC usa o caminho normal da entidade de vida.

Os encantamentos de proteção só são aplicados quando o interruptor está ligado. Dano que ultrapassa a armadura ignora a armadura. A perda de durabilidade também é opcional e se aplica aos slots que participaram da redução, então um golpe na cabeça no modo dividido não danifica leggings.

A resistência ao knockback compara o valor da armadura resolvida com o atributo de baunilha da entidade e só fornece a quantidade em falta. Não duplica a resistência já presente na entidade.
