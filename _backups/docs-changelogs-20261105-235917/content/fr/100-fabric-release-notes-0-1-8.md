---
title: Fabric 0.1.8 Mise à jour
slug: release-notes-0-1-8
order: 10
description: Les principaux ajouts en Fabric 0.1.8 depuis la sortie publique 0.1.7, plus les exigences de mise à jour.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.1.8
audience: Joueurs / Créateurs / Opérateurs
tags:
  - release
  - changelog
translationSource: en
translationMethod: assisted
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour les orientations actuelles.

0.1.8 est une mise à jour majeure basée sur les outils dialogue, shop, Teleporter et PNJ Spawner de 0.1.7. Il ajoute des quêtes, des factions, des popups, de l'administration et un ensemble d'outils de présentation de ressources et de PNJ beaucoup plus volumineux.

## Trouver des objectifs et des récompenses

Ajoutez une catégorie et une quête en Quest Editor, puis remplissez Info, Objectifs et Récompenses. Le journal du joueur est un écran séparé. Cet éditeur NeoForge actuel n'établit pas toutes les règles de complétion dans l'historique Fabric. Continuer avec le [guide actuel](#core-fabric/quest-system) pour l'épargner et l'appliquer.

![Trouvez des objectifs et des récompenses.](assets/media/guides/drm-031-neo1211/quest-info.png "DRM 0.3.1 / NeoForge 1.21.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Nouveau en un coup d'œil

| Fonctionnalité | Ce qu'il fait | Comment ouvrir |
| --- | --- | --- |
| Quest Editor | Crée des packs de quêtes avec des objectifs, des prérequis, des récompenses, des règles de répétition et des liens de dialogue PNJ | Sélecteur d'éditeur de l'élément principal |
| Quest Journal | Rechercher, suivre, accepter et transformer les quêtes des joueurs | Clé par défaut `U` |
| Faction Editor | Ajoute des noms, des icônes, des descriptions, des catégories et la présentation des relations aux factions CustomNPCs | Sélecteur d'éditeur de l'élément principal |
| Aperçu de la faction | Affiche les scores et les relations des factions du joueur | Clé par défaut `J` |
| Popup Maker | Crée des annonces avec du texte, des images, des sons, un timing et une priorité | Sélecteur d'éditeur de l'élément principal |
| DRM Admin | Gère les tags des joueurs, la devise, les quêtes, les avancées, les points de faction et les données stockées | `F7` pour les opérateurs autorisés |

## Création et présentation PNJ

- Les barres supérieures de l'éditeur, les panneaux, les listes, l'alignement et le focus d'entrée sont plus clairs et plus cohérents.
- Les fichiers PNG en `config/dochi_rpg_maker/assets/textures` peuvent être recherchés, filtrés et prévisualisés.
- Un fichier `.png.mcmeta` correspondant peut animer une texture PNG.
- PNJ Basic ajoute des contrôles de texture, de modèle, d'animation, de prévisualisation et de hitbox plus profonds.
- L'installation de GeckoLib permet des modèles de PNJ personnalisés, des animations et des actions d'animation de dialogue.

## Améliorations des fonctionnalités existantes

- Une devise peut avoir une forme d'objet physique et une valeur par objet.
- Les HUD peuvent afficher CustomNPCs les données stockées et les valeurs de tempdata.
- Les commandes du téléporteur peuvent s'exécuter à des moments choisis autour du fondu et de la téléportation.
- Dialogue, boutiques, NPC Apply, PNJ Spawner et Remnant Msg ont reçu des correctifs de recherche, de défilement, d'entrée et d'aperçu.
- Les grandes listes de ressources et les écrans d'éditeur évitent les chargements répétés inutiles.

## Avant la mise à jour

:::warning CustomNPCs est nécessaire
0.1.8 nécessite CustomNPCs `1.0.0`. Installez DRM 0.1.8, Fabric API, et CustomNPCs sur le serveur et chaque client de connexion.
:::

GeckoLib, FTB Quests, Mod Menu et CobbleDollars restent des intégrations optionnelles. Sauvegardez le monde et `config/dochi_rpg_maker` avant de mettre à jour.
