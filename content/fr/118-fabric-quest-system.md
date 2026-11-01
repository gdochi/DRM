---
title: Quest Editor et Journal
slug: quest-system
order: 100
description: Packs de quêtes, objectifs, récompenses, liens de dialogue PNJ et journal du joueur.
product: core-fabric
category: Quest System
section: quest-editor
status: Stable
version: 0.3.1
audience: Créateurs de quêtes
tags:
  - quest
  - journal
translationSource: en
translationMethod: assisted
---

## Nommez votre première quête et choisissez comment l'accepter

Ouvrez **Quest Editor → Create New** à partir du sélecteur d'éditeur du noyau. Utilisez **+ Catégorie**, puis **+ Quête** pour ajouter une quête à ce chapitre. Ce sont les écrans anglais de **DRM 0.3.1 / NeoForge 1.21.1**.

![Quest Editor avec Nouvelle quête sélectionnée à l'intérieur Nouveau chapitre. Info contient son titre, sa description et ses paramètres d'acceptation.](assets/media/guides/drm-031-neo1211/quest-info.png "L'arbre de gauche sélectionne une quête. Travaillez sur Info, Objectifs et Récompenses à droite.")

1. Donnez à **Quest ID** un nom que vous trouverez plus tard dans le dialogue. **Title** est le nom du joueur ; **Description** explique la tâche.
2. Avec **Start Policy → Manual Accept**, vérifiez **Accept Sources**. Activez **NPC Interaction / Dialogue** pour une offre PNJ, ou **Player Quest Journal** pour le bouton Accepter de la revue. Seule la source PNJ est activée dans cet exemple.
3. Ajoutez la tâche sous **Objectives**. Pour « apporter trois pains », choisissez si le joueur n’a besoin que de les posséder ou s’il doit les livrer.
4. Ensuite, placez **Rewards**, puis sauvegardez le paquet avec **Save As**. Les quêtes actuelles rédigées par l'éditeur se terminent automatiquement lorsque leurs objectifs sont atteints; un titre seul ne fait pas une quête terminée.

Continuez avec les liens de dialogue PNJ ci-dessous pour laisser un PNJ offrir la quête. Vérifiez l'ID de quête du dialogue sélectionné, le titre du journal et la récompense reçue après avoir terminé l'objectif.

## Stockage

Les packs de quêtes sont stockés sous `config/dochi_rpg_maker/quests/<pack>/`. `pack.json` possède le pack et l'ordre des catégories, tandis que `quests/` contient les quêtes individuelles.

Le pack d'échantillons inclus démarre désactivé. Utilisez-le comme référence et créez un pack de production séparé.

## Ce qu'une quête peut faire

| Zone | Options principales |
| --- | --- |
| Démarrage | Acceptation manuelle, démarrage automatique lorsqu'il est disponible ou démarrage dès la première progression |
| Terminé | Les quêtes créées par l'éditeur actuel se terminent automatiquement après les objectifs |
| Répéter | Jamais, toujours, tous les jours ou après un temps de recharge |
| Prérequis | Toutes les quêtes requises, n'importe quelle quête, ou un nombre requis |
| Objectifs | Lieu, possession/acquisition/livraison d'objets, kills, signaux de dialogue, score de faction |
| Récompenses | Éléments, expérience, DRM devise ou commandes de serveur |

Créez d'abord le pack et les catégories, puis ajoutez des quêtes en Quest Editor. Après l'enregistrement, le serveur conserve la progression de chaque joueur.

## NPC Dialogue Liens

Le sélecteur d'action actuel offre `quest_start`, `quest_complete`, `quest_reset`, `quest_objective_complete` et `quest_objective_reset`, avec des sélecteurs de quête / objectif soutenus par le serveur. Les actions de retournement, de signal, d'échec, d'abandon et d'épingle existantes restent lisibles dans JSON existant.

Les éditeurs actuels Fabric et NeoForge créent des quêtes automatiques. Distinguer l'achèvement par des objectifs de la force `quest_complete` de l'administrateur. Voir [migration des données](#core-fabric/loader-compatibility) pour l'ancien turn-in JSON.

## Journal joueur

La clé par défaut est `U`. Les joueurs peuvent rechercher des quêtes, filtrer par statut ou catégorie, inspecter des objectifs et des récompenses, et accepter, abandonner, suivre ou retourner des quêtes.

Personnalisez le journal à l'aide du type GUI Maker `quest_journal`. Traitez `gui/default_quest_journal_gui.json` comme un modèle et créez une copie avec `Save As`.

## Contrôles directs et victoires des entraîneurs

Voir le guide de commande [loader](#core-fabric/loader-compatibility) pour les opérations de démarrage, d'achèvement et de réinitialisation des quêtes/objectifs. Les réinitialisations complètes ne récupèrent pas les récompenses ; les réinitialisations objectives conservent l'historique des récompenses.

Une fois l'éditeur Cobblemon installé, ajoutez un objectif `DRM Trainer Victory`, sélectionnez son identité de formateur et définissez le nombre de victoires requis. Suivez [Entraîneur Victory Quests ](#drm-cobblemon-editor/cobblemon-trainer-quests).

Faites glisser des séparateurs entre l'arbre / la zone de travail et les panneaux d'information / de description pour les redimensionner. Les longs titres enveloppent et les listes défilent. Les largeurs appartiennent à l'instance actuelle de l'éditeur, et non à la quête sauvegardée JSON.

## Copier un pack avec Save As

Entrez un nouvel identifiant de pack et enregistrez. Chaque quête nécessite des objectifs ; les identifiants de pack invalides ou déjà utilisés doivent être corrigés. Vérifiez les références `pack:quest` dans la copie et les références à d'autres packs, puis chargez la copie enregistrée et testez l'acceptation, l'achèvement et les récompenses. La modification du nom d'affichage est distincte de la modification de l'ID du pack.

## 0.2.8 actions et scores relationnels

Les actions Item, tag, faction-score et avancement exposent des champs spécifiques à l'opération. Les sélecteurs JSON enregistrés sélectionnent les fichiers serveur du bon type ; les sélecteurs de quêtes pris en charge incluent d'autres packs et les quêtes non enregistrées actuelles.

Score actions sélectionnez CustomNPCs factions ou DNPC groupes de relations. DNPC La réputation prend en charge l'ajout, la soustraction et la définition. Utilisez le courant DRM et un DNPC construire avec la relation API ensemble; un fournisseur absent DNPC ne revient pas à CustomNPCs.

Le sélecteur de nouvelle action de quête exclut `go_stat_builder`, `cobble_npc:go_battle` et `dochi_minigames:play`. Les actions sauvegardées existantes et les enregistrements de dialogue restent pris en charge.
