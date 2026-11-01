---
title: MWENT Présentation et mise en place
slug: start
order: 1500
description: Installez MWENT dans Minigames, apprenez les règles et lancez des matchs d'IA ou de joueurs.
product: mwent
category: Débuter
section: play
status: Guide
version: 0.1.6
audience: Joueurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Qu’est-ce que MWENT ?

**MWENT** est un jeu de cartes tactique utilisant Minecraft Créatures et armées. Déployez des cartes dans des sockets fixes avant/arrière, combinez les voisins, les ordres et les capacités de leader, et gérez votre main restante pour gagner deux tours. Ses stratégies de faction s'inspirent du standalone en ligne **GWENT: The Witcher Card Game**, avec des cartes originales et des interactions construites autour Minecraft les champs de bataille et les prises fixes.

MWENT est **inclus dans Dochi`s Minigames**. Cette documentation dédiée ne représente pas un téléchargement de mod séparé. Sa première version publique de Minigames était ** 0.1.1 **. Choisissez le bon Minecraft et le fichier loader en utilisant le [Guide d'installation de Minigames](#dochi-minigames/minigames-setup).

![MWENT bataille avec dix cartes de main, rangées avant / arrière, les scores et le contrôle de passe.](assets/media/guides/minigames-015-neo1211/mwent-battle.png "Minijeux 0.1.5 / NeoForge 1.21.1, interface utilisateur anglaise. Les partitions et les marqueurs ronds sont à gauche, votre main est en dessous, et les ponts, les cimetières et les passes sont à droite. Chaque côté a deux rangées de neuf douilles.")

## Base de référence pour l'installation et la documentation

Installez les versions correspondantes de Minigames sur le serveur et le client. Les batailles de base, les tables et les leçons fonctionnent sans DRM. Installez les exigences de la plate-forme telles que Fabric API séparément. DRM ajoute PNJ, dialogue et intégrations monétaires. Les cartes optionnelles nécessitent leur fournisseur et leurs actifs réels. Minecraft 26.3 utilise Java 25 et exclut CustomNPCs.

Ce guide explique le gameplay 0.1.6. Voir l'historique de [release](#mwent/releases) pour les changements de cartes antérieurs.

## Apprendre en jouant

1. Cliquez avec le bouton droit sur une table MWENT et sélectionnez **AI Battle → Learn by Playing**, ou utilisez Apprendre en jouant sur l'écran de démarrage MWENT.
2. Identifiez le champ de bataille, la main, le score et les marqueurs ronds. Faites un clic droit sur une carte pour l'inspecter.
3. Pratiquez le placement, les tours de fin, les ordres, les leaders, la contiguïté et passez par des actions réelles.
4. Pratiquez une transition ronde et mulligan, puis jouer un match complet.

Les cours ne nécessitent pas de cartes possédées et n'ont pas de frais d'entrée, de récompenses ou de limite de temps. Sélectionnez les leçons librement. Continue Learning ouvre la première leçon inachevée ; les leçons interrompues reprennent leur état de pratique. Précédent / Suivant revisite les explications sans rembobiner les cartes ou les scores.

## Pratique de l'IA et matchs des joueurs

| Mode | Démarrage |
| --- | --- |
| Pratique de l'IA | Sélectionnez un adversaire intégré à une table et préparez votre deck. La liste actuelle a deux adversaires par faction, douze au total. |
| Match de joueur | Deux joueurs se joignent à la même table, choisissent des decks et les deux pressent Prêt. Le serveur vérifie les decks de cartes possédées. |
| Spectateurs | Rejoignez une table complète ou un match en cours pour voir le champ public et marquer des points. Les mains cachées et l'ordre du pont ne sont pas révélés. |

Fabriquez un **MWENT table** à partir de deux livres, une laine verte et cinq planches: livre / laine verte / livre; trois planches; planche / vide / planche. Commencer une partie ne consomme pas la table ou les cartes utilisées dans le jeu.

Poursuivez avec [comment jouer](#mwent/how-to-play), [six factions](#mwent/factions) et [collections et decks](#mwent/cards-decks).
