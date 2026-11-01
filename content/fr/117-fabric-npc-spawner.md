---
title: Utilisez le Core NPC Spawner
slug: npc-spawner
order: 84
description: Choisissez les PNJ enregistrés et les conditions d'apparition d'un bloc de noyau.
product: core-fabric
category: Systèmes centraux
section: npc-spawner
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
tags:
  - npc
  - spawner
  - world
translationSource: en
translationMethod: assisted
---

## Quel géniteur est-ce ?

Ceci est **DRM Core's NPC Spawner**, en utilisant des clones PNJ au format Core lisibles par sa liste Source. Cobblemon L'éditeur Clone Library connecte également les DNPC configurés en fonction du rôle à ce flux de travail. Importation CustomNPCs Filled Soul Stones sur les vieux 1.21.1 targets est un chemin de fournisseur séparé.

Commençant par DNPC propre modèle Save As? Utilisez [Spawn Control's NPC-template gearer](#dochi-spawn-control/spawn-control-npc-templates). Pour les clones Cobblemon-rôle, suivre [Clone Library](#drm-cobblemon-editor/cobblemon-clone-library-spawner). Associez le format du modèle à son générateur.

## Placer et ouvrir le bloc

1. Prenez `/give @s dochi_rpg_maker:npc_spawner` et placez-le.
2. Faites un clic droit avec le DRM Core.
3. Restez à moins de huit blocs pendant le montage.
4. Ajoutez les PNJ enregistrés sous **Source**. Compatible CustomNPCs Les pierres d'âme remplies apparaissent lorsqu'elles sont transportées en inventaire.
5. Choisissez le mode d'apparition, l'intervalle et les quantités sous **Spawn**.
6. Appuyez sur **Save**.

Enregistrer modifie le bloc de monde sélectionné ; il ne crée pas un nouveau fichier par Save As.

## Choisissez parmi plusieurs PNJ

Source supporte jusqu'à 64 entrées. **Weights** fixent leur fréquence relative: les gardes à 3 et les archers à 1 rendent les gardes plus communs.

Un nouveau choix est fait pour chaque tentative. **Max Active** PNJ vivants de toute la liste.

## Choisissez quand il fonctionne

![Paramètres de apparition du noyau reproducteur.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "DRM 0.3.1 / NeoForge 1.21.1, anglais UI. Le mode sélectionne le déclencheur, Recharge l'intervalle de tick, Max active la casquette vivante et taille d'onde le nombre par tentative. Les sources affectées sont nulles dans ce cas : cela vérifie l'écran des paramètres, et non l'apparition réussie de PNJ.")

| Mode | Comportement |
| --- | --- |
| continu | Tentatives à intervalles |
| target_nearby | Tentatives pendant qu'une cible est à proximité |
| target_enter | Tentatives quand une cible entre |
| redstone_pulse | Tentatives sur une impulsion redstone |

Par exemple, le temps de recharge 200 est d'environ dix secondes entre les tentatives; Max actif 1 empêche le apparition supplémentaire pendant qu'un reste en vie; La taille des vagues 1 tente un PNJ par activation.

Le temps de recharge est 20–72,000 ticks. La taille des vagues et des caps actifs est de 1–32. Le rayon cible est jusqu'à 64 blocs; le rayon d'apparition est jusqu'à 32.

## Effets et apparence

Utilisez **Conditions** pour les exigences d’activation et **Effects** pour les particules, l’apparence du bloc et la taille. Le PNJ à frayer et l'apparence du géniteur sont des choix distincts.

Lorsque vous déplacez le monde, incluez également des modèles de PNJ à partir de `config/dochi_rpg_maker/npc_spawner/`.
