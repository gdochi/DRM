---
title: Choisissez Fabric ou NeoForge Fichiers
slug: installation
order: 2
description: Installez le fichier DRM correspondant et les exigences pour 1.21.1.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
---

## Faire correspondre le chargeur

| Poste | Fabric | NeoForge |
| --- | --- | --- |
| Minecraft | 1.21.1 | 1.21.1 |
| Java | 21 | 21 |
| Chargeur | Fabric Chargeuse 0.18.0+ | NeoForge 21.1+ |
| Fabric API | 0.116.11+1.21.1+ | Non utilisé |
| DRM fichier | 0.3.1 Fabric 1.21.1 | 0.3.1 NeoForge 1.21.1 |

**26.3 a besoin de fichiers différents**. Voir [26.3 installation](#core-fabric/minecraft-26-3) pour Java 25 et ses builds. Forge 1.20.1 utilise le [Forge guide](#core/installation).

Mettre les fichiers en **mods**. Correspond aux fichiers Minecraft, loader et mod sur le serveur et les clients.

## Ajoutez les fonctionnalités que vous voulez

| Fonctionnalité | Mod supplémentaire |
| --- | --- |
| Créer des PNJ | DNPC ou chargeur correspondant CustomNPCs |
| Modèles Gecko | Correspondant GeckoLib |
| Connexions de quête FTB | Quêtes FTB |
| Pokémon magasins, boutiques et centres de soins | Cobblemon Éditeur et Cobblemon |
| Bouton Paramètres en Fabric's mod list | Menu Mod |

DRM seul ouvre ses outils d'édition. Voir [DNPC se lancer](#dochi-npc-core/npc-core-setup) pour créer un personnage.

## Démarrer dans le jeu

1. Récupère **Dochi RPG Maker Core** dans Créatif, ou entre `/give @s dochi_rpg_maker:dialogue_editor`.
2. Faites un clic droit sur l'air avec.
3. Ouvrez **Dialogue Editor** et faites [ votre première conversation ](#core-fabric/quick-start).

Des exemples et des dossiers de configuration sont créés lors de la première exécution. Fabric exclut l'éditeur d'éléments et le générateur de statistiques.

![Le sélecteur d'éditeur s'ouvre avec Core après l'installation.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 / NeoForge 1.21.1. La sélection de Dialogue Editor expose Load, Use Default et Create New. Commencez par Use Default, puis Save As votre propre travail. Les addons installés modifient la liste disponible.")

## Déplacer un serveur

Gardez `config/dochi_rpg_maker/` et le monde ensemble. La configuration seule n'inclut pas les PNJ placés, la progression de quête ou l'état de géniteur.
