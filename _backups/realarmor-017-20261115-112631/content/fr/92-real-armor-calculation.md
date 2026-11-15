---
title: Armure et calcul de Hit-Region
slug: dochi-real-armor-calculation
order: 920
description: Les sources d'armure, les seuils de zone de frappe, l'ordre de résistance, les enchantements, le recul et la durabilité.
product: dochi-real-armor
category: calcul armure
section: calculation
status: Stable
version: 0.1.6
audience: Opérateurs de serveur et créateurs de modpack
tags:
  - damage
  - body parts
  - toughness
translationSource: en
translationMethod: assisted
---

## Choisissez quels effets d'armure s'appliquent

![Armure générale en Real Armor 0.1.4 sur NeoForge 1.21.1, avec résistance séparée, protection et commutateurs de résistance au retour arrière.](assets/media/guides/armor-014-neo1211/armor-config.png "L'endurance de l'armure, les enchantements de protection et la résistance au renversement de l'armure contrôlent des effets distincts. La réduction des dégâts et le Knockback ne sont pas un seul réglage.")

Activez **Body-part armor** pour créer des espaces tels qu'une matière de tête non casque. Désactivez-le pour l'équipement à protéger ensemble. Désactivez **Damage armor items** pour une armure qui ne s'use pas tout en gardant le calcul d'armure activé.

## Référence du fichier: Armor Stat Source

Les valeurs suivantes sont utilisées pour l'édition directe du fichier de configuration. L'écran des paramètres de base ne nécessite pas de les saisir tous.

Le réglage `armorStatSource` contrôle la lecture de l'armure, de la ténacité et de la résistance au recul.

| Valeur | Comportement |
| --- | --- |
| `AUTO` | Préférez les attributs d'entité utilisables et revenez aux modificateurs d'items équipés lorsqu'ils fournissent la valeur d'armure manquante ou plus grande. |
| `VANILLA_ATTRIBUTE` | Lire uniquement les attributs d'armure de l'entité vivante |
| `INVENTORY_SCAN` | Modificateurs de somme du casque, de la poitrine, des leggings et des bottes |

`AUTO` est la valeur par défaut recommandée car les mods PNJ n'exposent pas toujours l'équipement de la même manière.

## Seuils Hit-région

Pour Easy PNJ, la hauteur d'impact résolue est normalisée par rapport à la zone de délimitation de l'entité.

| Hauteur normalisée | Région | Slots d'occasion |
| --- | --- | --- |
| `0.75` ou plus haut | Tête | Casque |
| `0.375` vers le bas `0.75` | Poitrine | Plaque thoracique |
| Inférieur à `0.375` | Jambes | Leggings et bottes |

CustomNPCs utilise son résolveur dédié et ses données de modèle lorsqu'elles sont disponibles. Si aucun point de vie fiable n'existe, la région est `unknown` et tous les emplacements d'armure sont utilisés pour que les dégâts ordinaires ne perdent pas silencieusement la protection de l'armure.

## Résistance, enchantements et durabilité

L'ordre de résistance CustomNPCs peut être défini sur `CNPC_RESISTANCE_THEN_VANILLA_ARMOR` ou `VANILLA_ARMOR_THEN_CNPC_RESISTANCE`. Cette option affecte le traitement CustomNPCs ; Easy PNJ utilise le chemin normal de l'entité vivante.

Les enchantements de protection ne sont appliqués que lorsque leur interrupteur est allumé. Les dégâts de contournement d'armure ignorent l'armure. La perte de durabilité est également facultative et s'applique aux fentes qui ont participé à la réduction, de sorte qu'un coup de tête en mode divisé n'endommage pas les leggings.

La résistance au retournement compare la valeur d'armure résolue avec l'attribut vanille de l'entité et ne fournit que le montant manquant. Il ne double pas la résistance déjà présente sur l’entité.
