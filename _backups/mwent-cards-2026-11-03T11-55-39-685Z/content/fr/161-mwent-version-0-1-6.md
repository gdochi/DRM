---
title: 0.1.6 — Utiliser des tactiques d'ouverture
slug: version-0-1-6
order: 1610
description: Choisissez l'une des cinq tactiques et utilisez sa véritable prise de champ de bataille de premier tour.
product: mwent
category: Historique de publication
section: releases
status: Guide
version: 0.1.6
audience: Joueurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Choisir avant le match

Une tactique d’ouverture est une **outil à usage unique pour le joueur qui passe en premier au premier tour**. Ouvrez sa liste ci-dessous le leader dans le constructeur de deck. À partir d'un préréglage, suivez **Use this deck → choose a tactic → Begin match**. Sauvegarder votre deck conserve son choix tactique pour un chargement ultérieur.

![Cinq tactiques d'ouverture dans le constructeur de pont.](assets/media/guides/minigames-016-neo1211/mwent016-tactic-options.png "Minijeux 0.1.6 / NeoForge 1.21.1, interface utilisateur anglaise. Choisissez ci-dessous le leader. La dernière option, le noyau de joint Golem, se transforme dans sa propre prise plutôt que de stimuler un allié.")

| Tactic | Résultat | Avant de l'utiliser |
| --- | --- | --- |
| Autel de pomme dorée | Donner à un allié +5 puissance | Avoir un allié sur le plateau en premier. |
| Bouclier de garde | Donner à un allié +2 puissance et Bouclier | Préparez les points et la protection contre un événement de dégâts. |
| Cache ferronnerie | Donner un allié +4 Armure | L'armure elle-même n'ajoute pas de score. |
| Coffre d'approvisionnement de terrain | Gain 4 Approvisionnement | Combinez-le avec des capacités qui dépensent de l'approvisionnement. |
| Noyau de joint Golem | Transformez-vous en un jeton Iron Golem 4 dans la même prise | Aucune sélection séparée des sockets vides n'est nécessaire. |

## Utilisez-le dans le premier tour

Si le lancer de la pièce fait de vous le premier joueur, la tactique occupe ** l'une de vos neuf vraies sockets de ligne de mêlée **. Il n'ajoute aucun score, mais prend de la place, laissant huit sockets pour les autres cartes alors qu'il n'est pas utilisé. Le deuxième joueur ne reçoit aucune tactique.

![Un noyau de sceau Golem occupant le centre de la rangée de mêlée du premier joueur.](assets/media/guides/minigames-016-neo1211/mwent016-golem-installed.png "Avant transformation dans la même course 0.1.6. Votre score est de zéro et le dispositif de joint occupe la prise centrale. Le raccourci violet en bas à gauche montre une utilisation disponible.")

À votre tour, cliquez sur **la tactique sur le tableau ou son raccourci en bas à gauche **. Boostez, Bouclier et Armure, puis demandez une cible alliée. L'approvisionnement et le Golem se résolvent sans autre cible. Ceci est séparé de jouer une carte de main, mais il compte comme une action: vous ne pouvez pas passer immédiatement sur le même tour après l'avoir utilisé.

![La même prise contient maintenant un Golem de fer 4-puissance.](assets/media/guides/minigames-016-neo1211/mwent016-golem-transformed.png "Après avoir cliqué sur le vrai raccourci tactique. La prise centrale dans la même rangée devient un Golem 4-puissance, votre score devient quatre, et l'indicateur de tactique à usage unique disparaît. La main reste intacte.")

L'autel, le bouclier, la cache et le coffre d'approvisionnement disparaissent lorsqu'ils sont utilisés, libérant leur douille. Golem ** réutilise la prise occupée de la tactique**, de sorte qu'il peut se transformer même dans une rangée complète. Le Golem transformé participe au score, aux dégâts et à la Consommation en tant qu'unité ordinaire, mais n'a ni Déploiement ni Ordre. C'est un jeton Doomed et ne laisse ni une carte de cimetière ni Morga reste.

Les tactiques inutilisées disparaissent lors du nettoyage du premier tour. Ils ne sont pas tirés, fabriqués ou stockés en tant que cartes de collection, ils sont donc exclus du catalogue de définition [ 424 ](#mwent/card-catalog).

## Changements connexes

L'artefact de production 0.1.6 conserve les définitions intégrées 335 et facultatives 89 enregistrées dans [0.1.5](#mwent/version-0-1-5). Cinq choix tactiques ne signifient pas cinq nouvelles cartes à collectionner. La même mise à jour de Minigames ajoute [Item Roulette](#dochi-minigames/minigames-roulette), un jeu séparé qui n'a pas besoin d'être connecté à un deck MWENT.

Ce guide vérifie les fichiers de production locaux 0.1.6 datés de novembre 1. [L'historique de publication](#mwent/releases) distingue les téléchargements publics vérifiés. Poursuivre avec [comment jouer](#mwent/how-to-play) ou [collections et decks](#mwent/cards-decks).
