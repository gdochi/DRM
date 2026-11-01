---
title: Quest Editor et Journal
slug: quest-system
order: 100
description: Les packs de quête, les objectifs, les récompenses, l'achèvement, les actions terminées et le journal du joueur.
product: core
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

## Faire la première quête PNJ

Ouvrez **Quest Editor → Create New** à partir de la liste des éditeurs du noyau. Utilisez ** + Catégorie ** pour un chapitre, puis ** + Quête ** pour une quête à l'intérieur. Ce sont des screenshots **DRM 0.3.1 / Forge 1.20.1**.

![Forge Quest Editor Page d'information avec l'identité de la quête, les sources d'acceptation et le mode d'achèvement.](assets/media/guides/drm-031-forge1201/quest-info.png "Title est montré aux joueurs. NPC Interaction / Dialogue est activé; Player Quest Journal est désactivé. Cet exemple Forge utilise le mode d'achèvement : Activer.")

1. Remplissez **Info → Quest ID / Title / Description** avec son nom de référence, le titre du joueur et la tâche.
2. Avec **Start Policy → Manual Accept**, activez la source d'acceptation : **NPC Interaction / Dialogue** pour le dialogue, ou **Player Quest Journal** pour son bouton Accepter.
3. Ajoutez un objectif avec **Objectives → + Add** et choisissez son type et le nombre requis. Un nouvel objectif peut initialement être **Dialogue Signal**, comme ci-dessous ; vérifiez le type.
4. Ajoutez des récompenses avec **Rewards → + Add**.
5. Pour **Completion Mode → Turn in**, fournissez une étape de soumission après avoir atteint les objectifs. **Automatic** Une fois les objectifs atteints. Cela diffère du guide NeoForge.
6. **Save As** le pack et connectez-vous **quest_start** dans le dialogue PNJ. Pour Tourner dans, connectez ** quest_turn_in ** dans le dialogue d'achèvement aussi.

![Un nouvel objectif de signal de dialogue avec les champs Signal et Obligatoire.](assets/media/guides/drm-031-forge1201/quest-objective-detail.png "Cet objectif ne compte pas les objets détenus. Il progresse quand il reçoit le signal correspondant; faire correspondre Signal avec l'action de dialogue quest_signal.")

Ouvrez le journal avec **U** pour tester l'acceptation, la progression, l'achèvement et la livraison réelle de la récompense. Le pack d'échantillons fourni est désactivé ; activez et sauvegardez votre propre pack.

Les packs sont sauvegardés en `config/dochi_rpg_maker/quests/<pack>/`. Copiez le dossier entier du pack, y compris `pack.json` et `quests/`, lorsque vous le déplacez.

## Quête Structure

| Zone | Valeurs soutenues |
| --- | --- |
| Démarrer la politique | `manual_accept`, `auto_when_available`, `first_progress`; compatible avec l'héritage `dialogue` et `journal_accept` sont également acceptés |
| Accepter la source | PNJ/dialogue à travers `quest_start`, bouton d'acceptation de journal de lecteur |
| Terminé | `turn_in`, `automatic` |
| Répéter | `never`, `always`, `daily`, `cooldown` |
| Prérequis | `all`, `any`, `required_count` |
| Groupes objectifs | `all`, `any`, `sequence`, `required_count` |

L'objectif laisse l'emplacement du support, l'objet, le kill, le signal de dialogue et le score de faction CustomNPCs. Les objectifs de l'objet peuvent représenter la possession, l'acquisition ou la livraison. Les récompenses prennent en charge les éléments, les points/niveaux XP, la devise DRM et les commandes.

## Dialogue Intégration

Les actions de dialogue fournissent `quest_start`, `quest_turn_in`, `quest_signal`, `quest_fail`, `quest_abandon` et `quest_pin`. Utilisez-les lorsqu'un PNJ contrôle le flux de quête. Une quête acceptée par le Journal doit avoir son Journal accepter la source activée.

## Après avoir terminé

La page Actions n'expose que `After Complete`. Le serveur suit cet ordre :

1. Confirmez que la quête est prête et que les objets de livraison peuvent être consommés.
2. Accordez chaque récompense en attente.
3. Définissez l'état de quête sur `Completed` et marquez l'action d'achèvement comme exécutée.
4. Envoyez les actions configurées `After Complete` une fois.

Si une récompense échoue, la quête reste prête pour le revirement et `After Complete` ne s'exécute pas. Réinitialiser la progression de la quête ne récupère pas les récompenses déjà accordées.

## Journal joueur

La clé par défaut est `U`. Le journal prend en charge les filtres de catégorie / état, la recherche, les détails, les listes d'objectifs / récompenses, le suivi, l'acceptation, l'abandon, l'actualisation et la fermeture des composants. Editez `gui/default_quest_journal_gui.json` jusqu'à GUI Maker et sauvegardez une variante de production avec `Save As`.

## 0.2.8 actions et scores relationnels

Les actions Item, tag, faction-score et avancement exposent des champs spécifiques à l'opération. Les sélecteurs JSON enregistrés sélectionnent les fichiers serveur du bon type ; les sélecteurs de quêtes pris en charge incluent d'autres packs et les quêtes non enregistrées actuelles.

Score actions sélectionnez CustomNPCs factions ou DNPC groupes de relations. DNPC La réputation prend en charge l'ajout, la soustraction et la définition. Utilisez le courant DRM et un DNPC construire avec la relation API ensemble; un fournisseur absent DNPC ne revient pas à CustomNPCs.

Le sélecteur de nouvelle action de quête exclut `go_stat_builder`, `cobble_npc:go_battle` et `dochi_minigames:play`. Les actions sauvegardées existantes et les enregistrements de dialogue restent pris en charge.
