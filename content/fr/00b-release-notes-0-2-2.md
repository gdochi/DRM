---
title: Forge 0.2.2 Mise à jour
slug: release-0-2-2
order: 6
description: Favoris de l'éditeur et améliorations apportées aux textures externes des modèles PNG et PNJ.
product: core
category: Démarrage
section: getting-started
status: Guide d'utilisation
version: 0.2.2
audience: Créateurs / opérateurs
translationSource: en
translationMethod: assisted
hiddenNav: true
---

## Trouver les favoris de l'éditeur

Utilisez une étoile à côté d'un éditeur pour le favori, puis revenez par Favoris sur la gauche. Chargez, Use Default et Create New commencent à travailler dans l'éditeur sélectionné. Continuer avec le [guide actuel](#core/quick-start) pour l'épargner et l'appliquer.

![Trouver les favoris de l'éditeur.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Installation à cette version

Le noyau actuel DRM pour Minecraft 1.20.1 / Forge / Java 17 est **0.2.2**. Fabric et NeoForge 1.21.1 utilisez Core 0.2.5; sélectionnez le JAR pour votre chargeur. Mettre à jour le serveur et les clients ensemble et sauvegarder les paramètres et le monde.

## Favoris de l'éditeur

Utilisez ☆/★ dans la liste des éditeurs pour ajouter ou supprimer des outils favoris. Trouvez-les dans la catégorie Favoris et en haut de la liste. Les préférences sont locales à l'instance de jeu en `config/dochi_rpg_maker/editor_favorites.json` ; elles ne modifient pas les documents de serveur ou les liaisons de PNJ.

## Images externes et textures PNJ

Les PNG et les textures des ressources sont résolues séparément, avec un repli lors du chargement ou du téléchargement. L'image de l'interface graphique et l'intégration des textures du modèle Gecko NPC ont été améliorées. Stockez les images externes sous `config/dochi_rpg_maker/assets/textures/` et référencez-les comme `dochi_rpg_maker:textures/...png`.

## Nouvelle carte addon

[MapIcon L'intégration 0.1.0](#dochi-mapicon-integration/mapicon-setup) est installée séparément. Il configure les icônes Xaero par type JSON, fichier et PNJ ; l'installation de Core seule ne fournit pas d'icônes de carte.

Le [0.2.1 record](#core/release-0-2-1) reste disponible pour ses NPC Shop changements de stock et de carrelage GUI.
