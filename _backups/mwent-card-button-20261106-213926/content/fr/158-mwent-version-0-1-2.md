---
title: 0.1.2 — cartes inchangées et stabilité
slug: version-0-1-2
order: 1580
description: Zéro nouvelle ou rééquilibrée cartes, UI et serveur de stabilité travail, et plus tard 26.3 téléchargements.
product: mwent
category: Historique de publication
section: releases
status: Disque de libération publique
version: 0.1.2
audience: Joueurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Téléversement public

CurseForge reçu [Fabric 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309263), [NeoForge 1.21.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309269) et [Forge 1.20.1](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9309265) en octobre 24, 2026. Le même 0.1.2 Libération obtenue [Fabric 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317314) et [NeoForge 26.3](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9317311) uploads en octobre 25.

## Ajouts et modifications de cartes

| Comparaison | 0.1.1 → 0.1.2 |
| --- | --- |
| Cartes ajoutées / supprimées | Zéro / zéro |
| Définitions intégrées | 263 → 263 |
| Définitions des mods optionnels | 89 → 89 |
| Tirages réguliers et animés | 704 → 704 |
| Puissance, provisions, changements de cadre ou de rareté | Zéro |
| Déploiement, ordre, mot-clé ou changements de référence d'apparence | Zéro |

Ces valeurs comparent les catalogues intégrés et optionnels finaux de la **réelle téléchargée Fabric 1.21.1 JARs**plutôt que d'estimer l'histoire à partir de la source d'aujourd'hui. Sans carte supplémentaire, la [0.1.1 Données de base](#mwent/version-0-1-1) continue.

## Gameplay et stabilité du serveur

![Barre d'outils de pont actuelle et contrôles de quantité.](assets/media/guides/minigames-016-neo1211/mwent016-deck-catalog.png "Écran actuel 0.1.6 / NeoForge 1.21.1. Changer deck, deck par défaut et commencer match sont séparés des contrôles de quantité de carte. Les notes de stabilité ci-dessous concernent 0.1.2 ; il ne s'agit pas d'une capture d'écran capturée sur cette version.")

Pour les contrôles actuels, suivez [collections et decks](#mwent/cards-decks) depuis l'édition jusqu'au début du match.

Les enregistrements d'implémentation 0.1.2 confirment les réparations des contrôles de la barre d'outils de sélection de deck qui se chevauchent, l'affichage de la peau du joueur dans les lobbies de table et les aperçus des villageois sur les écrans d'IA non attribués. Le démarrage d'un profil AI non attribué reste désactivé.

Le travail sur le serveur réduit les copies d’état répétées et duplique les diffusions identiques, supprime les diffusions inutiles pour les entrées PvP invalides, distribue les décisions d’IA entre les ticks et arrête les diffusions périodiques inchangées après la fin des matchs. Ce sont des améliorations de traitement et d'affichage plutôt que la puissance de la carte ou les améliorations de provision et les nerfs.

Le téléchargement 26.3 est une cible distincte de Java 25. Ne le remplacez pas par un fichier 1.21.1. La comparaison d'artefacts historiques n'établit pas la compatibilité d'exécution avec les combinaisons arbitraires de mods externes.
