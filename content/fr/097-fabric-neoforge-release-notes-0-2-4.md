---
title: Fabric et NeoForge 0.2.4 mise à jour
slug: release-notes-0-2-4
order: 7
description: Flux de travail de création partagé, horloges de réapprovisionnement et paramètres de carrelage GUI.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.2.4
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour les orientations actuelles.

:::note Record de sortie historique
Cette page enregistre la version précédente. La base d'installation actuelle du Core est 0.2.5.
:::

## Trouver des options de réapprovisionnement

Ouvrir NPC Shop Réapprovisionnement pour Activer le réapprovisionnement et la base de minuterie. Définissez stock fini et maximum sous Produit d'abord. Les ticks 24000 illustrés sont un exemple, alors choisissez une période adaptée à votre serveur. Continuer avec le [guide actuel](#core-fabric/shop-system) pour l'épargner et l'appliquer.

![Trouver des options de réapprovisionnement.](assets/media/guides/drm-031-neo1211/shop-restock.png "DRM 0.3.1 / NeoForge 1.21.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Documentation et installation partagées

**Fabric and NeoForge DRM 0.2.4 for Minecraft 1.21.1** Partager cette documentation. Les outils de création et les flux de travail normaux sont les mêmes ; choisissez le JAR de votre chargeur et les dépendances dans [Installation](#core-fabric/installation).

## NPC Shop

Choisissez `Real ticks` ou `World ticks` dans les détails du produit sous `RESTOCK > Timer basis`. Le réglage s'applique à l'ensemble de la boutique. Les tiques réelles comptent les tiques de jeu réelles; Les tiques du monde incluent le temps du monde passé par le sommeil.

Changer l'horloge ou reculer le temps rebase le temps de recharge restant. L'état stock/restock d'exécution basé sur les fichiers conserve la persistance JSON existante. Voir [NPC Shop](#core-fabric/shop-system).

## GUI Maker

- Entrée tuile/étirée et directe `Sprite Scale %`, 50–400%.
- Par-composant `Tile W %` et `H %` quand `Fit` est `Tile`, chacun 10–800%.
- Paramètres Tile cohérents entre la prévisualisation et les dialogues en direct, avec un rendu amélioré des images répétées.

Voir [GUI Maker](#core-fabric/gui-system). La largeur/hauteur des tuiles sont des paramètres de composant, et non des valeurs par défaut de l'interface utilisateur globale.

## Quêtes et addons

Les deux éditeurs de quêtes actuels créent des quêtes automatiques. Ajoutez la construction Dochi Cobblemon Editor correspondante pour les objectifs entraîneur-victoire. Voir [Quêtes](#core-fabric/quest-system) et [Quêtes de la victoire du formateur](#drm-cobblemon-editor/cobblemon-trainer-quests).

Sauvegardez `config/dochi_rpg_maker` et le monde, puis installez matching-loader 0.2.4 sur le serveur et chaque client. Utilisez `Save As` pour les versions personnalisées des valeurs par défaut protégées.
