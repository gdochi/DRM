---
title: Forge 0.2.1 mise à jour
slug: release-0-2-1
order: 7
description: Par-NPC magasin stock, horloges de réapprovisionnement et contrôles de carrelage GUI.
product: core
category: Premiers pas
section: getting-started
status: Stable
version: 0.2.1
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
hiddenNav: true
---

:::note Record de sortie historique
Cette page enregistre la version précédente. Utilisez le guide d'installation actuel 0.3.1.
:::

## Trouver l'horloge de réapprovisionnement

Sélectionnez un produit en NPC Shop, puis ouvrez Restock. Les vraies tiques ignorent le temps passé à dormir; Les tiques du monde suivent le temps du monde. Définissez stock fini et maximum sous Produit d'abord. Continuer avec le [guide actuel](#core/shop-system) pour l'épargner et l'appliquer.

![Trouvez l'horloge de réapprovisionnement.](assets/media/guides/drm-031-forge1201/shop-restock.png "DRM 0.3.1 / Forge 1.20.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## L'environnement dans cette version

Minecraft 1.20.1 · Forge · DRM **0.2.1**. Mettez à jour le serveur et tous les clients ensemble et sauvegardez `config/dochi_rpg_maker` et le monde.

## NPC Shop

- Le stock d'exécution et les délais persistent par PNJ en NBT. Différents PNJ utilisant le même JSON ont des stocks séparés.
- JSON conserve le stock initial, les produits et la configuration de réapprovisionnement; la définition enregistre / exporte les délais d'exécution.
- Choisissez `Real ticks` ou `World ticks` dans les détails du produit sous `RESTOCK > Timer basis`. Le choix s'applique à l'ensemble du magasin et contrôle si les sauts de sommeil comptent.

Voir [NPC Shop](#core/shop-system) pour l'installation et la migration des stocks hérités.

## GUI Maker

- Tile/Stretch et entrée directe `Sprite Scale %` en `Default UI Settings`, avec échelle 50–400%.
- Largeur/hauteur de tuile par composant à partir de 10–800% lorsque l'image `Fit` est `Tile`.
- Dialogue runtime lit les paramètres Tile, avec un rendu et une visibilité améliorés des images répétitives.

Voir [GUI Maker](#core/gui-system) pour la création et la référence JSON. Utilisez `Save As` pour des copies personnalisées de modèles groupés.
