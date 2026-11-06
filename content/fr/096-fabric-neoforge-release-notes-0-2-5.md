---
title: Fabric et NeoForge 0.2.5 Mise à jour
slug: release-notes-0-2-5
order: 6
description: Favoris de l'éditeur, textures PNJ externes et nouvelles connexions d'addon.
product: core-fabric
category: Démarrage
section: getting-started
status: Guide d'utilisation
version: 0.2.5
audience: Créateurs / opérateurs
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour les orientations actuelles.

## Retour par favoris

Cliquez sur l'étoile à côté d'un éditeur et trouvez-la sous Favoris. Les favoris vous aident à rouvrir les outils; appliquer une conversation ou une boutique à un PNJ est une étape distincte. Continuer avec le [guide actuel](#core-fabric/quick-start) pour l'épargner et l'appliquer.

![Retour par favoris.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Installation à cette version

DRM Core pour Minecraft 1.21.1 / Java 21 était ** 0.2.5 ** sur Fabric et NeoForge. Les deux utilisent la documentation partagée ; choisissez les JARs et les dépendances du chargeur de correspondance. Voir [installation](#core-fabric/installation).

## Favoris et textures

- Utilisez ☆/★ pour gérer les favoris de l'éditeur et ouvrez-les à partir des Favoris. `config/dochi_rpg_maker/editor_favorites.json` est local à l'instance du jeu.
- Les PNG serveur-actif et les textures du pack de ressources sont résolues séparément, avec des replis de chargement. La prévisualisation Gecko et les textures externes World-NPC ont été améliorées.
- Fabric Le flux de travail de sélection et d'aperçu de la texture externe de NPC Basic suit désormais la ligne de base Forge. Stockez les images en `assets/textures/` et connectez leurs DRM identifiants de ressources.

## Addons connexes

| Addon | Guide actuel |
| --- | --- |
| Cobblemon Éditeur 0.2.4 | [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler), étapes de bloc/effets, formateurs et PNJ de service |
| Minijeux 0.1.0 | [Monty Hall, slots and memory](#dochi-minigames/minigames-setup), droits d'entrée/récompenses et liaisons PNJ/dialogue |
| MapIcon Intégration 0.1.0 | [Icônes de carte Xaero](#dochi-mapicon-integration/mapicon-setup), règles JSON et paramètres par PNJ |

Installez chaque addon séparément et répondez à la dépendance CustomNPCs requise par Core. Le plus tôt [0.2.4 compte rendu](#core-fabric/release-notes-0-2-4) reste disponible pour les modifications restock-clock et GUI-tuiling.
