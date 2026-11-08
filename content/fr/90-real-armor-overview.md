---
title: Faire PNJ Armor Matter
slug: dochi-real-armor-overview
order: 900
description: Faites en sorte que l'armure équipée réduise les dégâts des PNJ et choisisse les paramètres de partie du corps et de durabilité.
product: dochi-real-armor
category: Aperçu général
section: overview
status: Stable
version: 0.1.5
audience: Joueurs, opérateurs de serveur et créateurs de modpack
tags:
  - armor
  - customnpcs
  - easy npc
translationSource: en
translationMethod: assisted
---

## Rendre les PNJ blindés plus résistants

Real Armor utilise l'armure équipée, la ténacité et les enchantements de protection pour réduire les dégâts des PNJ. Vous pouvez également activer la perte de durabilité ou utiliser uniquement l'armure couvrant la région touchée.

Il prend en charge DNPC, Easy NPC et CustomNPCs. DRM est facultatif. CustomNPCs n'est pas disponible sur 26.3.

Dans la version 0.1.5, configurez dans la GUI les drops des armures qui perdent réellement de la durabilité. Consultez la [configuration des drops et la vidéo](#dochi-real-armor/dochi-real-armor-drops) pour les probabilités, quantités et l'enregistrement puis l'application des ensembles.

## Commencez

1. Activez votre intégration PNJ dans [setup](#dochi-real-armor/dochi-real-armor-setup).
2. Equipez le PNJ avec une armure.
3. Comparez les dégâts de la même attaque avant et après l'avoir équipée.
4. Choisissez des paramètres d'armure et de durabilité.

![Un DNPC portant un ensemble complet d'armures en fer, avec des objets en fer dans Tête, Poitrine, Jambes et Pieds et le modèle équipé dans l'aperçu.](assets/media/guides/armor-014-neo1211/armor-equipped.png "Exemple avec Real Armor 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Placez l'armure dans les emplacements d'équipement sur la droite plutôt que de simplement la stocker en NPC storage.")

Dans cette configuration, une base-dégât `10` hit supprimé `10` santé sans armure et `6` avec l'ensemble de fer non enchanté. C'est un exemple de tout le corps; le mode hit-region, les armes et les enchantements peuvent changer le résultat. Si un DNPC ne subit aucun dommage, vérifiez également **Combat AI → Invulnerable** et **Allow player damage**.

## Armure du corps entier ou partie du corps

| Réglage | Armure utilisée |
| --- | --- |
| Tout le corps | Armure équipée ensemble |
| Partie du corps | Casque pour la tête, plastron pour la poitrine, leggings / bottes pour les jambes |

L'armure de partie du corps permet aux lacunes d'équipement d'être importantes, telles qu'une tête non protégée. Les attaques sans zone de frappe reconnaissable utilisent tous les emplacements équipés.

Les dégâts de contournement d'armure ne sont pas réduits par l'armure. Voir [Réglages de calcul](#dochi-real-armor/dochi-real-armor-calculation).
