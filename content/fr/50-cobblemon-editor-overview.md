---
title: Créer des PNJ Pokémon
slug: cobblemon-editor-overview
order: 500
description: Choisissez des entraîneurs, des magasins Pokémon, des guérisseurs ou des PNJ de démarrage.
product: drm-cobblemon-editor
category: Aperçu général
section: overview
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs construisant Cobblemon PNJ et magasins
tags:
  - cobblemon
  - customnpcs
  - overview
translationSource: en
translationMethod: assisted
---

## Qu'est-ce que tu veux faire ?

| Objectif | Outil |
| --- | --- |
| Un entraîneur avec une équipe de Pokémon | **Cobblemon Editor → Trainer** |
| Un Pokémon qui se bat directement | **Cobblemon Editor → Pokemon Itself** |
| Pokémon ventes, trades et enchères | **PokéMart Editor** |
| guérison d'équipe | **Nurse Joy Editor** |
| Choisir un premier Pokémon | **Starter Selector Editor** |
| Une entrée avant une bataille | **Battle Presentation Maker** |

Cliquez avec le bouton droit de la souris sur l'air avec le noyau DRM et choisissez un outil sous **Add-on**. Créez des PNJ avec DNPC ou CustomNPCs.

![Rédacteur en chef pour l’équipe Pokémon du formateur.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Choisissez des espèces et des niveaux, configurez la bataille, puis appliquez-la à un PNJ. Version 0.2.9 / NeoForge 1.21.1, interface utilisateur en anglais.")

## Commencez avec un seul entraîneur

Suivez [installation et la première bataille ](#drm-cobblemon-editor/cobblemon-editor-setup). Donnez au formateur un Pokémon, sauvegardez, appliquez à un PNJ et parlez les deux mains vides.

Ensuite, choisissez [équipes et rondes](#drm-cobblemon-editor/cobblemon-trainer-editor), [AI et mécanique](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) et [règles de combat](#drm-cobblemon-editor/cobblemon-battle-rules).

## Ajoutez du dialogue et des récompenses

Ajoutez un message d'accueil avant la bataille ou donnez des récompenses après le dialogue après la bataille. Voir [conditions et actions ultérieures](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

Réglez la disponibilité et les périodes d'attente en [rencontres et rematches](#drm-cobblemon-editor/cobblemon-encounters-rematches).

## Plusieurs rôles sur un PNJ

L'interaction à la main vide peut ouvrir le dialogue ou une boutique en premier. Utilisez une action **go_battle** dans le dialogue pour commencer sa bataille. **Shift+right-click** accède aux rôles dédiés lorsqu'un autre rôle appliqué prend l'interaction normale.

L'utilisation de PNJ séparés pour vos premiers rôles rend l'interaction plus facile à suivre.

## Plateformes

Pour **Minecraft 1.21.1, Fabric or NeoForge**. DRM et Cobblemon sont nécessaires; utiliser DNPC ou CustomNPCs pour les rôles PNJ. Voir le [table d'installation](#drm-cobblemon-editor/cobblemon-editor-setup).
