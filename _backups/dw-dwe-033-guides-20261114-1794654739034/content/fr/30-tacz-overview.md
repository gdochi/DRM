---
title: Créer un PNJ d'arme à feu
slug: dochi-warfare-overview
order: 310
description: Utilisez Warfare pour choisir le fusil, les cibles, les rechargements et le comportement de combat d'un PNJ.
product: dochi-warfare
category: Aperçu général
section: overview
status: Projet
version: 0.3.1
audience: Firearm PNJ Créateurs
tags:
  - TACZ
  - customnpcs
  - overview
translationSource: en
translationMethod: assisted
---

## L'éditeur d'armes à feu PNJ

Ouvrez le PNJ avec **DW Npc Core**. Les catégories de gauche contiennent les armes, les sens, les munitions et la sélection des cibles. Cette interface utilisateur anglaise utilise **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![Vue d'ensemble avec le mode arme à feu activé et les paramètres de détection, de combat et de dégâts actuels.](assets/media/guides/warfare-031-neo1211/dw-overview.png "Vue d'ensemble résume les paramètres. Utilisez le pistolet pour l'arme, les munitions pour les recharges et les sens pour la détection et la cadence de tir.")

## Ce que fait la guerre

Donnez un pistolet à un PNJ et choisissez ses cibles, ses mouvements et ses recharges. Vous pouvez également le faire passer à la mêlée à proximité, utiliser une couverture, patrouiller ou suivre les ordres des mercenaires.

Créez le PNJ avec **DNPC or CustomNPCs**. Utilisez DW pour le combat des PNJ; ajoutez **DWE** pour les véhicules et les équipages.

## Mettre en place un PNJ en premier

1. Installez les exigences dans [setup](#dochi-warfare/warfare-setup).
2. Faites un clic droit sur le PNJ avec **DW Npc Core**.
3. Activer **TACZ Fire NPC Mode** et **Enabled**.
4. Choisissez une arme sous **Gun**.
5. **Save**, puis placez-le en vue d'une cible valide.

**Easy Build / Presets** fournit les paramètres de combat de départ.

## Choisir ce qu'il faut changer

| Objectif | Guide |
| --- | --- |
| Utilisez la mêlée à proximité et un pistolet à portée | [Armes et postures](#dochi-warfare/warfare-weapons-ai) |
| Attaquer des ennemis choisis | [Règles cibles](#dochi-warfare/warfare-target-filters) |
| Limiter ou recharger les munitions | [Recharges et stock](#dochi-warfare/warfare-reload-ammo) |
| Se mettre à l'abri ou supprimer les ennemis | [Couverture et suppression](#dochi-warfare/warfare-cover-suppression) |
| Embaucher et commander des PNJ | [Mercenaires](#dochi-warfare/warfare-mercenary) |
| Déplacer des véhicules et affecter des équipages | [DWE](#dochi-warfare-expanded/expanded-overview) |

Mettre des munitions de rechange avec **Ammo Stock**. N'équipez pas de munitions ou d'articles de magazines dans la main gauche du PNJ.

## Plateformes supportées

DW est pour **Forge 1.20.1 / NeoForge 1.21.1**. TACZ et Player Animator côté client sont requis. Les mods compatibles PointBlank/SuperbWarfare installés ajoutent leurs canons pris en charge.

Voir [setup](#dochi-warfare/warfare-setup) pour les exigences de version.
