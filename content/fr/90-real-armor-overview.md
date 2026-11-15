---
title: Armures des PNJ et des créatures
slug: dochi-real-armor-overview
order: 900
description: Réglez la protection et la durabilité des PNJ, créatures et animaux selon la version.
product: dochi-real-armor
category: Aperçu général
section: overview
status: Aperçu
version: 0.1.7
audience: Joueurs, opérateurs de serveur et créateurs de modpack
tags:
  - armor
  - customnpcs
  - easy npc
translationSource: en
translationMethod: assisted
---

## Entités dans la version 0.1.7

Les entités ordinaires et celles des autres mods, dont les zombies, squelettes et piglins, utilisent Real Armor lorsqu’une véritable armure occupe leurs emplacements d’équipement. Aucun mod de PNJ n’est requis ; le réglage de chaque intégration reste prioritaire pour le PNJ concerné. Le traitement des joueurs ne change pas. Une armure tenue en main, les citrouilles et les décorations seules n’activent pas cette fonction. Les créatures ordinaires retrouvent leur traitement initial des dégâts après le retrait ou la destruction de leur dernière armure.

La version 0.1.7 implémente aussi les armures animales selon la version de Minecraft. Les compilations et contrôles des paquets des cinq chargeurs sont terminés ; la vérification en combat réel de la nouvelle fonction animale reste en attente. Les anciennes vidéos ne valident pas cette fonction.

## Entités compatibles par version dans la version 0.1.7

| Minecraft | Loader | Créatures portant une armure ordinaire | Animaux avec armure | Intégrations de PNJ |
| --- | --- | --- | --- | --- |
| 1.20.1 | Forge | Zombies, squelettes, piglins et autres créatures portant une armure | Cheval | DNPC / Easy NPC / CustomNPCs |
| 1.21.1 | Fabric | Zombies, squelettes, piglins et autres créatures portant une armure | Cheval, loup | DNPC / Easy NPC / CustomNPCs |
| 1.21.1 | NeoForge | Zombies, squelettes, piglins et autres créatures portant une armure | Cheval, loup | DNPC / Easy NPC / CustomNPCs |
| 26.3 | Fabric | Zombies, squelettes, piglins et autres créatures portant une armure | Cheval, cheval zombie, loup, nautile, nautile zombie | DNPC / Easy NPC |
| 26.3 | NeoForge | Zombies, squelettes, piglins et autres créatures portant une armure | Cheval, cheval zombie, loup, nautile, nautile zombie | DNPC / Easy NPC |

La compatibilité dépend des objets équipés, pas d’une liste fermée de noms. Les créatures ordinaires doivent porter une véritable armure sur la tête, le torse, les jambes ou les pieds. Cela comprend les variantes de zombies (zombies momifiés, noyés et villageois zombies), les variantes de squelettes (vagabonds et Wither squelettes), les piglins et les autres entités du jeu ou des mods remplissant cette condition. Ce support s’applique à toutes les lignes. Le traitement des joueurs reste inchangé ; les PNJ suivent les réglages de leur intégration.

## Passer à 0.1.6
Voici les changements de la version 0.1.6. Elle améliore les interrupteurs, le focus après les réponses serveur et la gestion des conflits d'enregistrement. Enregistrer un ensemble ne l'active pas : terminez **Save → confirmation Apply**. Les captures antérieures de 0.1.4 et 0.1.5 conservent leur version en légende.

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
