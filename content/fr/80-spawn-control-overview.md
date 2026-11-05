---
title: Faire apparaître des créatures où et quand vous voulez
slug: dochi-spawn-control-overview
order: 810
description: Choisissez des règles d'apparition naturelles ou des géniteurs placés pour les créatures et les PNJ.
product: dochi-spawn-control
category: Aperçu général
section: overview
status: Projet
version: 0.1.5
audience: Opérateurs de serveur et créateurs de modpack
tags:
  - spawn control
  - natural spawn
  - forge
translationSource: en
translationMethod: assisted
---

![Spawn Control pour les règles naturelles.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. La gauche sélectionne la cible, le milieu liste ses règles et la droite modifie la règle sélectionnée. Placed Spawners ouvre l'éditeur de pions placé séparé.")

## Choisissez comment ils apparaissent

| Objectif | Utilisation |
| --- | --- |
| Une créature particulière apparaît dans les forêts la nuit | Règles naturelles d'apparition |
| Les ennemis reviennent dans un donjon | Un géniteur placé |
| Un garde fini apparaît à un poteau | Un modèle DNPC sauvegardé |

Les règles naturelles vérifient la zone autour des joueurs. Les géniteurs placés travaillent autour de leur bloc.

## Changer le apparition naturel

Appuyez sur par défaut **K**, choisissez une créature à gauche et **Add rule**. Définissez ses emplacements, heures et quantités, puis économisez.

Un zombie peut avoir des règles séparées de nuit de forêt et de grotte. Une règle pour les porcs n'affecte pas les vaches.

Suivez [ votre première règle naturelle](#dochi-spawn-control/dochi-spawn-control-setup).

## Placer un géniteur

Ouvrez **Spawner Editor** à partir du sélecteur de l'éditeur DRM. Choisissez les créatures et les conditions, utilisez **Get Spawner**, placez-le et appliquez la configuration enregistrée.

Voir [Créer un grower](#dochi-spawn-control/dochi-spawn-control-spawner).

## Est-ce que les apparition originaux continuent?

**Original spawning ON** permet l'apparition du jeu à côté de vos règles. Réglez-le **OFF** pour n'utiliser que vos règles de apparition naturel.

Cela ne bloque pas les commandes, l'élevage ou d'autres reproducteurs.

## PNJ et véhicules

Utilisez un modèle [NPC](#dochi-spawn-control/spawn-control-npc-templates) pour conserver l'apparence et l'équipement d'un DNPC. Vous pouvez également [spawn véhicules sauvés](#dochi-spawn-control/spawn-control-vehicles).

Les règles des créatures naturelles ordinaires n'ont besoin ni de DRM ni d'un mod PNJ. Ajoutez les mods respectifs pour les PNJ ou les véhicules.

En 0.1.5, limitez les lieux par identifiants et tags de biomes ou de structures, puis réunissez créatures et PNJ dans une escouade. Suivez le guide des [gardes de structures](#dochi-spawn-control/spawn-control-guards).
