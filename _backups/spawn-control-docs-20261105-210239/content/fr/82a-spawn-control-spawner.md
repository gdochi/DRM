---
title: Créer un spawner placé
slug: dochi-spawn-control-spawner
order: 835
description: Créez JSON, configurez des cibles pondérées, choisissez un modèle et appliquez le document à un générateur placé.
product: dochi-spawn-control
category: Editeur
section: editor
status: Projet
version: 0.1.4
audience: Créateurs de Spawner
tags:
  - spawner
  - editor
  - probability
translationSource: en
translationMethod: assisted
---

## Créer un document et l'appliquer

`Spawner Editor` est un éditeur JSON orienté créateur. Vous pouvez créer des documents sans un générateur installé. L'édition et l'application nécessitent un mode créatif ou un niveau d'autorisation 2.

1. Cliquez avec le bouton droit de la souris sur l'air avec DRM Core pour ouvrir le sélecteur d'éditeur.
2. Choisissez `Spawner Editor`, puis créez un document ou chargez un fichier JSON existant.
3. Définissez le nom et la liste cible en `Spawn Target`.
4. Configurez l'activation, les entités par tentative, les bouchons et le placement dans `Conditions` et `Spawn Settings`.
5. Ajustez la destruction, les effets et l'apparence au besoin.
6. Utilisez `Save As` pour nommer et enregistrer le document. Utilisez `Save` pour les modifications ultérieures de ce fichier.
7. Cliquez sur `Get Spawner` pour recevoir un objet géniteur vide et le placer là où il est nécessaire.
8. Cliquez avec le bouton droit sur le générateur placé avec DRM Core. Sélectionnez le fichier enregistré en `Apply Spawner JSON` et cliquez sur `Apply JSON`.

**L'enregistrement de JSON et son application au monde sont des actions séparées.** Un nouveau géniteur est inactif jusqu'à ce qu'il soit configuré. Après avoir modifié un document, appliquez à nouveau le fichier enregistré à chaque générateur que vous souhaitez mettre à jour.

Les documents sont stockés sur le serveur sous `config/dochi_rpg_maker/spawn_control/spawners/`. En mode solo, le répertoire de jeu de l'instance est la racine ; les documents sont partagés à travers ses mondes. Voir [Partage et opérations](#dochi-spawn-control/dochi-spawn-control-presets-operations) pour les chemins et les sauvegardes.

![Une entrée zombie dans Spawn Target.](assets/media/guides/spawn-control-014-neo1211/spawn-placed.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Entités par activation 1 tente une entité. Chance 1.0 est 100% car c'est la seule entrée. Le placement réussi dépend toujours des conditions et de l'espace disponible.")

## Mise en page de l'éditeur

Sélectionnez une catégorie dans le panneau de gauche et modifiez les valeurs à droite. Le chemin JSON est une étiquette identifiant le document courant. Utilisez `Save As` pour changer sa destination.

| Catégorie | Sommaire |
| --- | --- |
| `Spawn Target` | Nom, état activé, liste entité/clone et probabilités relatives |
| `Conditions` | Déclencheur, intervalle, joueurs, temps, météo, redstone et conditions partagées |
| `Spawn Settings` | Entités par tentative, propriété/durée de vie, emplacement, terrain et lumière |
| `Destruction` | Mode récolte ou santé, santé, hitbox et gouttes d'objets |
| `Effects` | Frappez les particules, frappez / cassez les sons et la barre de boss du géniteur |
| `Appearance` | Modèle, échelle, rotation, décalage et aperçu |

Cliquez sur un bouton de type ou de mode pour ouvrir un flyout et sélectionner une option directement. Les longues listes prennent en charge la recherche, la molette de la souris et une barre de défilement. Annuler ou Esc conserve la sélection précédente. `On/Off` Les contrôles sont des bascules.

## Liste des cibles et chances

Ajoutez des entrées, sélectionnez une ligne, puis modifiez sa cible et sa chance. Supprimez les entrées inutilisées ou définissez leur chance sur `0`. Une liste peut contenir jusqu'à 64 entrées et nécessite au moins une chance positive.

| Source | Objectif |
| --- | --- |
| `Entity` | Un identifiant d'entité enregistré sur le serveur |
| `CNPC Clone` | Un clone de serveur CustomNPCs, identifié par onglet et nom |
| `DW Clone` | Un modèle de clone Dochi’s Warfare sauvé |
| `NPC clone template` | Un modèle de clone v3 exact enregistré en DNPC |

Les sources de clones nécessitent leur mod correspondant et le clone enregistré. Les cibles d'entités ordinaires ne font pas d'un mod clone une dépendance requise.

Les valeurs de chance sont relatives aux autres entrées. Une valeur plus élevée rend cette cible plus probable; elle ne garantit pas que la participation la plus élevée gagne. L'éditeur affiche le pourcentage effectif calculé à partir du total.

| Entrées | Chance de sélection |
| --- | --- |
| Porc 70, vache 30 | Porc 70, vache 30% |
| Porc 1, vache 1 | 50% chacun |
| Porc 10, vache 0 | Cochon seulement |

Définissez `Entities per activation` sur `3` pour tenter jusqu'à trois entités en une seule activation. Chaque entité est dessinée indépendamment, de sorte que les répétitions sont possibles. Une liste 70:30 ne garantit pas deux porcs et une vache. Les échecs de placement et les bouchons peuvent réduire le nombre réellement engendré.

`Maximum owned entities` limite la population totale possédée par le géniteur. `Total spawn limit` limite ses créations cumulatives; `0` signifie illimité. Les deux chapeaux couvrent la liste entière, pas chaque entrée séparément.

![Aperçu de l'apparence du modèle minecraft:spawner Block.](assets/media/guides/spawn-control-014-neo1211/spawn-appearance.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Le panneau de droite prévisualise le corps du générateur, pas l'entité qu'il va créer. La source du modèle, l'échelle, la rotation et le décalage vertical sont séparés de Spawn Target.")

## Apparence et aperçu

`Model source` en `Appearance` offres **Item, Entity, and Block**. L'apparence est indépendante de la liste d'apparition: un géniteur en forme de bloc peut créer des zombies.

Utilisez `Choose` pour sélectionner l’ID du modèle, puis réglez l’échelle, la rotation et le décalage vertical. Configurez les états de bloc avec `Block properties (JSON)` et modélisez les données avec `Model NBT (SNBT)`. Les clones CNPC et DW sont des sources d'apparition, pas des types d'apparence supplémentaires.

L'aperçu s'affiche à l'intérieur de l'éditeur et ne crée pas d'entité dans le monde. Pendant qu'un modèle modifié est en cours de résolution, il conserve le dernier aperçu réussi et les mises à jour de la dernière demande.

Poursuivre avec [Conditions et effets des pions ](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

Pour les DNPC enregistrés, suivez [Configuration du modèle](#dochi-spawn-control/spawn-control-npc-templates). L'entité `dochi_npc:npc` crée un PNJ par défaut sans copier l'apparence/l'équipement enregistrés. `CNPC Clone` s'applique aux cibles plus anciennes et est exclu sur 26.3.
