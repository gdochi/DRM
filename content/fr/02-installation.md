---
title: Choisir Forge Fichiers d'installation
slug: installation
order: 2
description: Installez DRM et le mod PNJ de votre choix sur Forge 1.20.1.
product: core
category: Premiers pas
section: getting-started
status: Stable
version: 0.3.1
audience: Opérateurs de serveur
tags:
  - install
  - forge
translationSource: en
translationMethod: assisted
---

## Fichiers requis

| Poste | Choisir |
| --- | --- |
| Minecraft | Java Edition 1.20.1 |
| Java | 17 |
| Chargeur | Forge 47+ |
| DRM | Forge 1.20.1 version 0.3.1 |

Mettez le fichier mod dans **mods**. Sur un serveur, installez les fichiers correspondants sur le serveur et sur chaque client.

Utilisez le guide [séparé](#core-fabric/installation) pour Fabric/NeoForge.

## Vous voulez aussi des PNJ ?

Installer [DNPC](#dochi-npc-core/npc-core-setup) ou compatible CustomNPCs. DRM lui-même ne nécessite pas de mod PNJ, mais vous en avez besoin pour créer les caractères recevant des conversations ou des boutiques.

Ajoutez des mods optionnels pour les fonctionnalités que vous utilisez, telles que GeckoLib pour les modèles Gecko ou FTB Quests pour les connexions de quête FTB.

## Ouvrez-le après l'installation

1. Entrez dans un monde en mode Créatif.
2. Prenez **Dochi RPG Maker Core**, ou utilisez `/give @s dochi_rpg_maker:dialogue_editor`.
3. Faites un clic droit sur l'air avec.
4. Une fois la liste des éditeurs ouverte, suivez [ votre première conversation ](#core/quick-start).

Des exemples groupés sont préparés au premier passage ; aucun JSON manuscrit n'est nécessaire pour commencer.

![Le sélecteur d'éditeur s'ouvre avec Core après l'installation.](assets/media/guides/drm-031-forge1201/editor-selector.png "DRM 0.3.1 / Forge 1.20.1. La sélection de Dialogue Editor expose Load, Use Default et Create New. Commencez par Use Default, puis Save As votre propre travail. Les addons installés modifient la liste disponible.")

## Mises à jour et serveurs mobiles

Remplacez les anciens fichiers mod plutôt que de conserver les deux versions. Gardez `config/dochi_rpg_maker/` avec le monde, qui stocke également les PNJ placés et la progression du joueur.
