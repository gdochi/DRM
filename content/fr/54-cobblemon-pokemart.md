---
title: Faire un Pokémon Boutique ou Trading PNJ
slug: cobblemon-pokemart
order: 540
description: Créez des PNJ qui vendent, négocient ou mettent aux enchères Pokémon.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Pokémon Créateurs de boutiques et opérateurs de serveurs
tags:
  - pokemart
  - editor
  - runtime
translationSource: en
translationMethod: assisted
---

## Choisissez un rôle

**PokéMart Editor** fait des PNJ à négociation Pokémon. Utilisation DRMde **NPC Shop** pour les magasins d'articles ordinaires.

| Rôle | Activité du joueur |
| --- | --- |
| **Sales** | Acheter Pokémon à prix fixe |
| **Trade** | Échanger une propriété correspondante Pokémon |
| **Auction** | Énumérer, soumissionner et percevoir les règlements |

Un PNJ n'utilise qu'un rôle. Utilisez des PNJ séparés pour une boutique et un service de trading.

![PokéMart Rôle général et paramètres de paiement.](assets/media/guides/cobble-029-neo1211/cobble-pokemart.png "Choisissez le rôle et la devise PNJ sur la droite. Le fournisseur par défaut est CobbleDollars; changez-le pour un fournisseur de paiement disponible si ce mod est absent. Version 0.2.9 / NeoForge 1.21.1.")

## Faire la première boutique

1. Ouvrez **Add-on → PokéMart Editor** à partir de la liste des éditeurs DRM.
2. Chargez une valeur par défaut et choisissez **General → NPC Role → Sales**.
3. Définissez le nom et le paiement sous **General**.
4. Utilisez **Pokémon Catalog → Add**, puis **Edit Detailed Pokémon Data** en bas à droite pour choisir l'espèce, le niveau, la forme et d'autres détails.
5. Fixez son prix et **NPC Stock → Initial**. **-1** est illimité.
6. **Save As** votre propre fichier.
7. Ouvrez un DNPC ou un CustomNPCs PNJ avec le DRM Core et appliquez **PokéMart**.
8. Interagissez avec les mains vides. Les acheteurs ont besoin d'un emplacement d'équipe gratuit.

![Pokémon Catalogue éditant un niveau 5 Bulbasaur produit, prix et stock.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Sélectionnez un produit sur la gauche pour le modifier sur la droite. Cet exemple coûte 5000, commence / limite à 3, et réapprovisionne 1 toutes les 72000 ticks: une heure à 20 ticks par seconde.")

## Choisissez le paiement

**Currency Provider / ID** sélectionne DRM devise, articles ou CobbleDollars. Créer DRM argent en Currency Editor CobbleDollars a besoin de son mod installé.

Le commerce utilise un Pokémon correspondant au lieu de l'argent. Voir [ventes et métiers ](#drm-cobblemon-editor/pokemart-sales-trade-behavior).

## Changer l'écran

Sélectionnez la disposition du lecteur en **Runtime GUI**. Les champs de saisie de l'éditeur et l'écran de la boutique du joueur sont des mises en page séparées.

Voir [l’inscription aux enchères, les offres et la collecte](#drm-cobblemon-editor/pokemart-auction-gui-runtime) pour les ventes aux enchères.

## Mettre à jour la boutique

**Save** le produit/prix change vers le même fichier pour la prochaine interaction. **Apply** après avoir modifié le nom ou le rôle du fichier.

Les stocks, les enchères et les données de collecte restent dans le monde. Déplacez configuration et monde ensemble. La suppression du lien de la boutique du PNJ ne supprime pas les enchères en cours.
