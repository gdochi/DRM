---
title: 0.1.6 — nouvelles cartes, caractéristiques et tactiques d’ouverture
slug: version-0-1-6
order: 1610
description: Caractéristiques de 60 cartes de faction et de 12 cartes de siège, avec cinq tactiques d’ouverture.
product: mwent
category: Historique de publication
section: releases
status: Guide
version: 0.1.6
audience: Joueurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Cartes ajoutées et caractéristiques de la version 0.1.6

La version 0.1.6 ajoute **60 cartes de faction et 12 cartes de siège, soit 72 au total**. Les nouveaux identifiants sont **1700–1759 et 1800–1811**. Les définitions incluses passent de **263 → 335**, les définitions optionnelles restent à **89**, et le total passe de **352 → 424**. Les éditions normale et animée représentent la même carte de combat ; les cinq tactiques d’ouverture sont exclues de ce total.

La puissance, les provisions, les cadres, les raretés et les anciennes définitions de Deploy, Order et mots-clés des cartes existantes sont conservés. Les tableaux ci-dessous indiquent puissance / provisions, cadre, rareté et capacités de chaque nouvelle carte. Les instructions des tactiques précèdent les caractéristiques des cartes de faction et de siège.

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

Version publiée sur CurseForge les 3–4 novembre 2026. [CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-minigames/files/9432406) · [Historique des modifications](#mwent/releases) · [MWENT](#mwent/how-to-play) · [Cards](#mwent/cards-decks)

## Ajout de mécaniques

![Éditeur de capacité de carte personnalisée avec conditions, cibles et opérations.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Réel Minigames 0.1.5 / NeoForge 1.21.1 écran de capacité. Les mécanismes ci-dessous se rapportent à ces contrôles de création. L'enregistrement d'une définition est distinct de l'octroi de la propriété.")

Pour créer une carte, consultez la [création de cartes personnalisées](#mwent/authoring). La capture de l’éditeur ci-dessous provient de l’espace de travail 0.1.5 et illustre des commandes de capacités également disponibles dans cette version.

- Les scénarios avancent les chapitres à travers les jeux de qualification, les emplacements offrent des ordres persistants, et les pièges fournissent des réactions cachées. Ils occupent des prises sans ajouter de points unitaires.
- Voile, Immunité, Rupture, Infusion, Résilience, compteurs, minuteurs et évolution circulaire sont pris en charge.
- Les opérations ajoutées incluent le choix des cartes créées, le jeu du deck/cimetière, le rappel/rejeu, les boosts de main/deck, les changements de puissance de base, le Duel/Clash et le redéclenchement de Deathwish/Deploy.
- Les conditions portent sur le deck initial, la taille de la main, la puissance maximale, la somme des trois cartes les plus fortes et les dépenses de Ravitaillement, avec des coûts optionnels. Les cinq tactiques d’ouverture actuelles sont expliquées ci-dessus.
- L'éditeur de cartes personnalisées expose ces capacités, conditions, cibles, opérations et coûts. L'épargne n'accorde pas les cartes possédées.

## Soixante nouvelles cartes de faction

Dix cartes sont ajoutées par faction. Ces tableaux résument la puissance stockée réelle, les provisions et les capacités.

Sur mobile, faites défiler la table horizontalement pour lire la colonne de capacité.

### Volkar Empire

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Volkar Founding Chronicle (card_1700) · 0.1.6 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Construct; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2 #0 · par tour 1; Chapitre 1: Ally Unit Board All · Cible: Armure 2 · par tour 1; Chapitre 2: Ally Unit Board All · Cible: Réarme 2 · par tour 1 |
| Volkar Field Workshop (card_1701) · 0.1.6 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 0 · par tour 1 |
| Volkar Hidden Snare (card_1702) · 0.1.6 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Conseil d'unité ennemie Puissance la plus élevée · Cible: Dégâts 3 · par tour 1 |
| Volkar Signal Keeper (card_1703) · 0.1.6 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Volkar Unexpected Ally (card_1704) · 0.1.6 | 4 / 5 | Bronze · Rare | Ally Joue · si la carte de déclenchement a une catégorie Construct · Self Unit Board All · Cible : Armure 1 · par tour 1 |
| Volkar Sworn Vanguard (card_1705) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Volkar Challenge Bearer (card_1706) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Volkar Unwritten Possibilities (card_1707) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Volkar Shared Instinct (card_1708) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1704 · par tour 1 |
| Volkar Relic Breaker (card_1709) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Avalin

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Avalin Founding Chronicle (card_1710) · 0.1.6 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Beast; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2 #8 · par tour 1; Chapitre 1: Ally Unit Board All · Cible: Guérir 2 · par tour 1; Chapitre 2: Self Unit Board All · Cible: Invoquer un jeton avec puissance 4 #8 · par tour 1 |
| Avalin Field Workshop (card_1711) · 0.1.6 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 8 · par tour 1 |
| Avalin Hidden Snare (card_1712) · 0.1.6 | — / 4 | Bronze · Rare | Piège; Révéler: Ennemi spécial joué; Réaction de piège · Ally Unit Board Puissance la plus faible · Cible: Boost 3 · par tour 1 |
| Avalin Signal Keeper (card_1713) · 0.1.6 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Avalin Unexpected Ally (card_1714) · 0.1.6 | 4 / 5 | Bronze · Rare | Spécial Joué · si la carte déclenchante a la catégorie Nature · Self Unit Board All · Cible : Boost 1 · par tour 1 |
| Avalin Sworn Vanguard (card_1715) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Avalin Challenge Bearer (card_1716) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Avalin Unwritten Possibilities (card_1717) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Avalin Shared Instinct (card_1718) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1714 · par tour 1 |
| Avalin Relic Breaker (card_1719) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Roden League

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Roden Founding Chronicle (card_1720) · 0.1.6 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Merchant; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2 #16 · par tour 1; Chapitre 1: Self Unit Board All · Cible: Livraison 3 · par tour 1; Chapitre 2: Ennemi Unit Board Puissance la plus élevée · Cible: Marquer et frapper 4 · par tour 1 |
| Roden Field Workshop (card_1721) · 0.1.6 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 16 · par tour 1 |
| Roden Hidden Snare (card_1722) · 0.1.6 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Unité ennemie Conseil Puissance la plus élevée · Cible: Marquer et frapper 1 · par tour 1 |
| Roden Signal Keeper (card_1723) · 0.1.6 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Roden Unexpected Ally (card_1724) · 0.1.6 | 4 / 5 | Bronze · Rare | Fournitures dépensées · Self Unit Board All · Cible : Boost 1 · par tour 1 |
| Roden Sworn Vanguard (card_1725) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Roden Challenge Bearer (card_1726) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Roden Unwritten Possibilities (card_1727) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Roden Shared Instinct (card_1728) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1724 · par tour 1 |
| Roden Relic Breaker (card_1729) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Nevra

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Nevra Founding Chronicle (card_1730) · 0.1.6 | — / 10 | Or · Légendaire | Scénario; Progrès: Agent Allié Joué; Doomed; Déployer · Self Unit Board Tous · Cible : Invoquez un jeton avec puissance 2 #24 · par tour 1; Chapitre 1: Enemy Unit Board Puissance maximale · Cible : Infiltrer 1 · par tour 1; Chapitre 2: Espionnage de cible ≥ 1 · Enemy Unit Board Puissance maximale · Cible : Verrouillage 1Cible : Dégâts 3 · par tour 1 |
| Nevra Field Workshop (card_1731) · 0.1.6 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 24 · par tour 1 |
| Nevra Hidden Snare (card_1732) · 0.1.6 | — / 4 | Bronze · Rare | Piège; Révéler: Ennemi spécial joué; Piège réaction · Ennemi Unité Conseil Plus grande puissance · Cible: Verrouillage 1 · par tour 1 |
| Nevra Signal Keeper (card_1733) · 0.1.6 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Nevra Unexpected Ally (card_1734) · 0.1.6 | 4 / 5 | Bronze · Rare | Ally · Évènement généré à l'extérieur du pont de départ ≥ 1 · Conseil d'administration de l'unité autonome Tous · Cible : Boost 1 · par tour 1 |
| Nevra Sworn Vanguard (card_1735) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Nevra Challenge Bearer (card_1736) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Nevra Unwritten Possibilities (card_1737) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Nevra Shared Instinct (card_1738) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1734 · par tour 1 |
| Nevra Relic Breaker (card_1739) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Mistwake Clans

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Haemu Founding Chronicle (card_1740) · 0.1.6 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Raider; Doomed; Déployer · Self Unit Board Tous · Cible: Invoquer un jeton avec puissance 2 #1300 · par tour 1; Chapitre 1: Ally Unit Board Tous · Cible: Guérir 2 · par tour 1; Chapitre 2: Ally Unit Board Puissance la plus faible · Cible: Rite sanguin 5 · par tour 1 |
| Haemu Field Workshop (card_1741) · 0.1.6 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 1300 · par tour 1 |
| Haemu Hidden Snare (card_1742) · 0.1.6 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Tableau de l'unité ennemie Puissance la plus élevée · Cible: Saignement 3 · par tour 1 |
| Haemu Signal Keeper (card_1743) · 0.1.6 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Haemu Unexpected Ally (card_1744) · 0.1.6 | 4 / 5 | Bronze · Rare | Ally endommagé · Self Unit Board Tous · Cible: Boost 1 · per turn 1 |
| Haemu Sworn Vanguard (card_1745) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Haemu Challenge Bearer (card_1746) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Haemu Unwritten Possibilities (card_1747) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Haemu Shared Instinct (card_1748) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1744 · par tour 1 |
| Haemu Relic Breaker (card_1749) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Morga Brood

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Morga Founding Chronicle (card_1750) · 0.1.6 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Swarm; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2  # 1400 · par tour 1; Chapitre 1: Ally Unit Board All · Cible: Semer un husk 1 · par tour 1; Chapitre 2: Self Unit Board All · Cible: Invoquer un jeton avec puissance 4 #1400· par tour 1 |
| Morga Field Workshop (card_1751) · 0.1.6 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 1400 · par tour 1 |
| Morga Hidden Snare (card_1752) · 0.1.6 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Unité ennemie Conseil Puissance la plus élevée · Cible: Poison 1 · par tour 1 |
| Morga Signal Keeper (card_1753) · 0.1.6 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Morga Unexpected Ally (card_1754) · 0.1.6 | 4 / 5 | Bronze · Rare | Ally Détruit · Self Unit Board Tous · Cible : Boost 1 · par tour 1 |
| Morga Sworn Vanguard (card_1755) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Morga Challenge Bearer (card_1756) · 0.1.6 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Morga Unwritten Possibilities (card_1757) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Morga Shared Instinct (card_1758) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1754 · par tour 1 |
| Morga Relic Breaker (card_1759) · 0.1.6 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

## Douze cartes de siège

Sept modèles de machines originales avec des composants mobiles sont partagés par des cartes, des champs et des aperçus. Les cartes, les capacités et les modèles de base fonctionnent sans créer de gros canons. Les palettes optionnelles utilisent des ressources installées compatibles.

Ajout de catégories de moteur de siège, d'événements d'ordre et de réduction du temps de recharge, de réduction du temps de recharge, de charge d'ordre et d'invocation de capacités de préservation. De telles invocations ne redéclenchent pas Déployer et gagner Doomed.

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Volkar Timber Ballista (card_1800) · 0.1.6 | 4 / 5 | Bronze · Rare | Armure 1; Ordre: Dommages 2; Temps de recharge 2; Réapprovisionnement 1; Équipage 1; Machine Ballista en bois |
| Volkar Counterweight Catapult (card_1801) · 0.1.6 | 5 / 7 | Bronze · Rare | Armure 1; Ordre: Socket burst 2; Refroidissement 3; Réapprovisionnement 1; Patience 1; Catapulte à contrepoids machine |
| Volkar Armored Cannon (card_1802) · 0.1.6 | 5 / 8 | Or · Epic | Armure 2; Ordre: Piercing d'armure 3; Temps de recharge 3; Réapprovisionnement 1; Dépenses 1; Canon blindé |
| Volkar Automatic Loader (card_1803) · 0.1.6 | 4 / 6 | Bronze · Rare | Armure 1; Turn End · Moteur Ally Unit adjacent à All Siege · Cible: Réduire le temps de recharge uniquement 1 · par tour 1; Chargeur automatique de machine |
| Volkar Steam Ballista (card_1804) · 0.1.6 | 5 / 7 | Bronze · Rare | Armure 3; Ordre: Décharge d'armure 2; Temps de recharge 2; Réapprovisionnement 1; Équipage 1; Machine à vapeur Ballista |
| Volkar Repeating Cannon (card_1805) · 0.1.6 | 4 / 10 | Or · Epic | Armure 1; Ordre: Dégâts 1; Temps de recharge 2; Réapprovisionnement 1; Un temps de recharge allié diminue · si la carte de déclenchement a catégorie Siège moteur · Unité de l'ennemi Conseil aléatoire · Cible: Dégâts 1 · par tour 3; Machine répétition Canon |
| Volkar Armored Crew (card_1806) · 0.1.6 | 4 / 5 | Bronze · Rare | Armure 2; Défenseur 1; Déploiement · Unité alliée adjacente à toutes · Cible : Armure 1 · par tour 1 |
| Volkar Field Engineer (card_1807) · 0.1.6 | 4 / 5 | Bronze · Rare | Armure 1 ; Déployer · Ally Unit Board Choisir le moteur de siège · Cible : Réarme 2 · par tour 1 |
| Volkar Ammunition Cart (card_1808) · 0.1.6 | 5 / 5 | Bronze · Rare | Armor 1; Trade 1; Turn End · Self Unit Board Tous · Cible: Livraison 1 · par tour 1; Chariot de munitions machine |
| Volkar Field Maintenance (card_1809) · 0.1.6 | — / 5 | Bronze · Rare | Déployez · Ally Unit Board Choisissez le moteur de siège · Cible : Arrière 2 · par tour 1 |
| Volkar Bombardment Order (card_1810) · 0.1.6 | — / 4 | Bronze · Rare | Déploiement · Rangée de l'unité ennemie Tous · Cible : Dégâts 1 · par tour 1 |
| Volkar Siege Encampment (card_1811) · 0.1.6 | — / 12 | Or · Légendaire | Scénario ; Progrès : Moteur de siège allié ; Destiné ; Déployer · Self Unit Board Tous · Cible : Invoquer 1 unité avec des capacités et Doomed; pas de déploiement1800 · par tour 1; Chapitre 1: Self Unit Board Tous · Cible : Invoquer 1 unité avec des capacités et Doomed; pas de déploiement1801 · par tour 1; Chapitre 2: Ally Unit Board All Siege moteur · Cible: Rearm 2 · par tour 1 |

Voir [création de table et de carte](#mwent/authoring) et les [catalogue de spécifications complet](#mwent/card-catalog).
