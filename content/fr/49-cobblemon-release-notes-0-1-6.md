---
title: Cobblemon Editeur 0.1.6 Changements
slug: cobblemon-editor-release-0-1-6
order: 490
description: Règles de combat, compatibilité, éditeur et modifications d'exécution dans la version 0.1.6.
product: drm-cobblemon-editor
category: Premiers pas
section: overview
status: Stable
version: 0.1.6
audience: Créateurs / Opérateurs
tags:
  - release
  - changelog
translationSource: en
translationMethod: assisted
hiddenNav: true
---


Cette page est une **Historique 0.1.6 change record**. Pour l'installation actuelle, utilisez [0.2.9 setup](#drm-cobblemon-editor/cobblemon-editor-setup); pour les contrôles, utilisez [Battle Rules](#drm-cobblemon-editor/cobblemon-battle-rules).

![L'écran actuel des paramètres de combat par tour.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules.png "Le 0.2.9 / NeoForge 1.21.1 actuel illustre les règles communes et spécifiques aux rondes. Ce n'est pas une capture d'écran archivée 0.1.6 et peut contenir des contrôles ultérieurs.")

## En un coup d'œil

La version 0.1.6 réorganise les paramètres de combat en règles communes et par tour et prend en charge Cobblemon 1.7.3 et 1.8.0 avec un JAR. Il ajoute également des sons de combat d’entraîneurs et corrige les listes d’apprentissage-déplacement, l’application des éléments, l’évaluation de l’IA de propagation-déplacement, l’état de l’éditeur et la navigation partagée DRM.

## Installation au moment de 0.1.6

- Minecraft 1.21.1, Java 21, Fabric Chargeur 0.17.2+, Fabric API 0.116.6+1.21.1+
- Obligatoire: DRM Noyau 0.1.9+, Cobblemon 1.7.3 à ci-dessous 1.9.0, CustomNPCs Fabric 1.0.0
- Optionnel par fonctionnalité : CobbleDollars, RCT API 0.15.1-beta+, FTB Quests, Mega Showdown et autres intégrations compatibles
- JAR: `dochi_cobblemon_editor-0.1.6-fabric-1.21.1.jar`

RCT L'API reste facultative. Les échecs d'absence ou d'appel retombent à la limite de l'addon au lieu de faire de RCT une dépendance d'exécution requise. Remplacez le 0.1.6 JAR sur le serveur et tous les clients.

## Règles de combat centrées sur le round

- Ouvrez les règles de combat à partir de `Rounds`, puis choisissez `Common Rules` ou un tour explicite à partir de 1–16.
- Chaque tour peut hériter des règles communes ou garder une dérogation indépendante.
- Les formats incluent Singles, Doubles, Triples et Lead Duel.
- Les modes de niveau incluent les niveaux créés, la moyenne joueur-équipe plus le décalage, et les niveaux fixes avec la portée.
- Les règles d'objet couvrent l'autorisation de bataille/objet tenu, une liste de recherche bloquée, les limites d'utilisation, les tours minimums et les casquettes HP cibles.
- Pokémon et les règles mécaniques couvrent les restrictions légendaires, la sélection des pistes et la permission Mega/Tera/Dynamax.

Le fait de cliquer sur une ligne du catalogue d’articles la bloque ou l’autorise immédiatement. Le serveur impose les objets de combat, relance et capture les objets avant la consommation ; les joueurs créatifs suivent toujours les limites d'utilisation. Lead Duel crée des équipes mono-Pokémon Singles sans supprimer les équipes créées.

L'équipement de gimmick et les règles de combat des PNJ sont séparés. L'équipement configure le PNJ et l'élément clé du round ; la règle de combat contrôle si le mécanicien est autorisé des deux côtés.

## Sons de bataille

Les batailles d'entraîneurs peuvent jouer un son une fois par bataille à chaque configuration restante.Pokémon comte de 1–6. Définissez des règles communes, puis laissez chaque tour hériter, les remplacer ou les désactiver. L'éditeur fournit la recherche et l'aperçu de l'ID sonore, le volume 0 – 4, la hauteur 0.05 – 4 et une option pour arrêter l'audio de combat actuel avant le nouveau son.

## Pokémon, l'IA, et les corrections d'éditeur

- Les sélecteurs de déplacement affichent uniquement les mouvements apprenables résolus par le serveur pour les espèces, formes et aspects sélectionnés.
- Des ensembles explicites d'un à quatre mouvements gardent leur nombre exact et l'ordre dans l'aperçu et la bataille.
- DRM L'IA évalue désormais les dégâts, la frappe, le STAB, les cibles multiples et les dégâts alliés pour les mouvements de propagation et de cible automatique tels que tremblement de terre et glissement de terrain.
- Les brouillons d'inventaire de combat/général survivent à la recherche, à la pagination et au redimensionnement; les étiquettes de long déplacement, les aperçus et les états des boutons de page ont été corrigés.
- Les flèches Back et Forward partagées et l'aide au survol utilisent désormais l'historique partagé de DRM Core 0.1.9 et les API d'interface utilisateur.

## Contrats de données

- Schéma du formateur JSON: `22`
- Pokemon lui-même schéma JSON: `8`
- Schéma cérébral: `4`
- ID de mod interne et espace de noms des ressources: `cobble_npc`

Les anciennes données JSON et NBT prises en charge sont normalisées aux champs actuels. Sauvegardez `config/dochi_rpg_maker/cobblemon/` avec le monde avant de mettre à jour.
