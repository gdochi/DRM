---
title: 26.3 Différences de configuration et de fonctionnalité
slug: minecraft-26-3
order: 6
description: Choisissez les fichiers 26.3 et les PNJ, et vérifiez quelles fonctionnalités de l'éditeur diffèrent.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: Guide
version: 0.3.1 / Minecraft 26.3
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Installer les fichiers 26.3

Utilisez **Fabric or NeoForge / Java 25**. Installez les fichiers 26.3 de chaque mod sur le serveur et les clients. Fabric a également besoin de la Fabric API requis par ces mods.

Créez des PNJ avec **DNPC**. ** CustomNPCs est indisponible sur 26.3 ** DRM et DNPC peut également fonctionner indépendamment.

![DNPC Éditeur natif sur Minecraft 26.3.](assets/media/guides/dnpc-013-neo263/core263-dnpc-identity.png "DNPC 0.1.3 + DRM 0.3.1 / NeoForge 26.3.0.95 / Java 25.0.2. Il s'agit d'un DNPC réel dans un monde frais. Identity édite le nom; Appearance & Model édite l'apparence. Les fonctions DRM connectent DRM les caractéristiques.")

## Choisissez les fonctionnalités que vous voulez

| Fonctionnalité | Mods |
| --- | --- |
| Création, apparence et horaires des PNJ | DNPC |
| Dialogues, boutiques, quêtes et disposition des écrans | DRM |
| Patrons PNJ et combat de boss | DRM + BattleWorks + DNPC |
| Règles d'apparition des créatures ordinaires | Spawn Control |
| Créer un PNJ enregistré à partir d'un bloc | Spawn Control + DRM + DNPC |
| Effets d'armure de PNJ | Real Armor et un mod PNJ supporté |
| Minijeux/MWENT tableaux | Minigames |
| Icônes de carte PNJ | DRM + MapIcon + une carte prise en charge |

Cobblemon L'éditeur et DW/DWE ne sont pas inclus comme mods 26.3 ici. Utilisez leurs guides plus anciens 1.21.1 / 1.20.1.

## Différences avec les anciennes versions

26.3 DRM n'a pas **Faction Editor, écran de faction de joueur ou GUI Maker éléments de faction **. Fabric Ne comprend pas non plus **Item Editor and Stat Builder**.

Suivez [Création de NPC](#dochi-npc-core/npc-core-setup) et [DRM mise en route](#core-fabric/quick-start) pour les PNJ avec des conversations ou des magasins.

![Ajout d'une zone de texte indépendante dans le 26.3 GUI Maker.](assets/media/guides/drm-031-neo263/core263-independent-text.png "DRM 0.3.1 / NeoForge 26.3.0.95. + Le texte ajoute une boîte séparée du corps du dialogue. Le contenu choisit un texte direct ou un nom de PNJ. Save As stocke votre GUI. Cela vérifie l'écran d'édition, pas un résultat de dialogue appliqué.")

![Rédacteur en chef sur NeoForge 26.3.](assets/media/guides/drm-031-neo263/core263-item-editor.png "DRM 0.3.1 / NeoForge 26.3.0.95. Item Definition, Tooltip Lines, Stat Rules et Vanilla Attribute sont des onglets d'édition. Fabric 26.3 exclut l'éditeur d'éléments. Modèle d'élément : non sélectionné signifie que cet exemple n'a pas encore d'apparence d'élément sélectionnée.")

Utilisation [Modèles de PNJ placés](#dochi-spawn-control/spawn-control-npc-templates) en Spawn Control. Les anciens clones CustomNPCs ne sont pas directement convertis en DNPC apparition.

Après avoir modifié les définitions de commerce des villageois natifs de MWENT, reconnectez-vous au monde ou redémarrez le serveur.

## Apporter un vieux monde

Essayez les PNJ, conversations, boutiques et autres fonctionnalités que vous utilisez sur une copie avant de remplacer le monde d'origine. Gardez sa configuration et son monde ensemble.
