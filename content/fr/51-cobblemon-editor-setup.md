---
title: Installer et faire votre première bataille
slug: cobblemon-editor-setup
order: 510
description: Donnez un PNJ Pokémon et commencez une bataille avec le joueur.
product: drm-cobblemon-editor
category: Configuration
section: setup
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Opérateurs de serveur et créateurs débutants
tags:
  - setup
  - fabric
  - npc
translationSource: en
translationMethod: assisted
---

## Mods requis

| Poste | Version / choix |
| --- | --- |
| Minecraft | 1.21.1 / Java 21 |
| Chargeur | Fabric ou NeoForge |
| DRM Base | Correspondant chargeur; ce guide a été exécuté avec 0.3.1 |
| Cobblemon | Ce guide a été exécuté avec 1.8.4 |
| Cobblemon Éditeur | Correspondant-chargeur 0.2.9 |
| NPC | DNPC ou CustomNPCs |

Correspond aux fichiers du chargeur sur le serveur et les clients. Fabric a également besoin des versions Loader/API requises par DRM et Cobblemon.

## Faites le premier entraîneur

1. Placez un PNJ. Commencez par [ DNPC ](#dochi-npc-core/npc-core-setup) si vous en avez besoin.
2. Cliquez avec le bouton droit de la souris sur **Dochi RPG Maker Core** et ouvrez **Add-on → Cobblemon Editor**.
3. Commencez à partir de l'équipe initiale ou utilisez **Create New**. Sous **Battle Config → General**, activez **Trainer Battle** et choisissez **Battle type → vs Trainer**.
4. Choisissez un Pokémon et son niveau sous **Pokemon Party**.
5. Utilisez **Singles** et le déclencheur **Interaction**.
6. **Save As** `custom/first_trainer.json`.
7. Cliquez avec le bouton droit sur le PNJ avec le noyau DRM et choisissez **vs Trainer → votre fichier → Appliquer vs Trainer **. Vérifiez le nom sous **APPLIED JSON** à droite.
8. Mettez un Pokémon prêt au combat dans votre propre équipe, videz les deux mains et parlez au PNJ.

![Réglages généraux pour un premier entraîneur.](assets/media/guides/cobble-029-neo1211/cobble-config.png "Vérifiez le type de combat et le type de combat sous Battle Config → Général. Name source choisit le nom du profil ou le nom du PNJ appliqué.")

![Fichier formateur attaché avec succès en NPC Apply.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "Cobblemon Éditeur 0.2.9, DRM 0.3.1 et DNPC 0.1.3 / NeoForge 1.21.1. En appliquant custom/guide_trainer.json placé guide_trainer sous vs Trainer à droite. Enregistrer un document et lier un PNJ sont des étapes distinctes.")

## Combattre le Pokémon lui-même

Choisissez **Battle type → vs Cobblemon**, puis définissez l’espèce, l’apparence et le niveau. Enregistre sous un autre nom et applique par **vs Cobblemon ** dans NPC Apply. Ce type de Pokémon lui-même utilise un Pokémon par tour.

## Les changements ont-ils besoin d'une autre application?

La modification de Pokémon, des niveaux ou d'autres contenus dans le même fichier avec **Save** met à jour l'interaction suivante. Appliquer à nouveau après avoir changé le nom du fichier ou le rôle PNJ.

Utilisez `/drm reload` après avoir modifié les fichiers en dehors du jeu.

## Si la bataille ne s'ouvre pas

| Problème | Vérifier |
| --- | --- |
| Éditeur manquant | DRM, Cobblemon et addon installé pour le même chargeur |
| Le PNJ ne fait rien | Entraîneur activé, fichier enregistré appliqué et les deux mains vides |
| Dialogue/ouverture de la boutique en premier | Connectez son dialogue avec go_battle ou utilisez un autre PNJ |
| Erreur joueur-équipe | Un Pokémon prêt au combat est dans votre équipe |

Poursuivez avec [équipes, rondes et récompenses](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Voir le début du combat
![Choisir le combat dans le dialogue appliqué, voir l'entrée et rejoindre le vrai combat.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, anglais. Exemple préparé : dialogue → go_battle → présentation → combat.")

Après le premier combat, ajoutez un objectif d'arène avec les [récompenses de badges](#drm-cobblemon-editor/cobblemon-badges).
