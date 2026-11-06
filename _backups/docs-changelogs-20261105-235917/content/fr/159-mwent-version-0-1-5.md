---
title: 0.1.5 — synergie et ajouts de siège
slug: version-0-1-5
order: 1590
description: 72 nouvelles cartes d'espace de travail, mécaniques et spécifications ajoutées.
product: mwent
category: Factions et cartes
section: releases
status: Spécification de référence
version: 0.1.5
audience: Joueurs / créateurs
translationSource: en
translationMethod: assisted
---

> Cette page conserve l’état de l’espace de travail local 0.1.5. La documentation de publication des nouvelles cartes et de leurs caractéristiques est regroupée dans [cartes et tactiques de la version 0.1.6](#mwent/version-0-1-6). Les 72 cartes ci-dessous sont les mêmes ajouts, pas un second ensemble.

## Historique 0.1.5 espace de travail

Sur la base des sources indépendantes Minecraft 26.3 Fabric / NeoForge et de la production 0.1.5 JAR en octobre 30, 2026. Ceci est séparé de l'historique de téléchargement [CurseForge](#mwent/releases).

Augmentation des définitions intégrées **263 → 335**Les définitions facultatives restent **89**, et les augmentations totales **352 → 424**. Tirages réguliers et animés au total 848. Les définitions existantes de puissance, de provisions, de cadres, de raretés et d'héritage Deploy, Order et de mots clés restent intactes. Les ID ajoutés sont 1700–1759 et 1800–1811.

## Ajout de mécaniques

![Éditeur de capacité de carte personnalisée avec conditions, cibles et opérations.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Réel Minigames 0.1.5 / NeoForge 1.21.1 écran de capacité. Les mécanismes ci-dessous se rapportent à ces contrôles de création. L'enregistrement d'une définition est distinct de l'octroi de la propriété.")

Pour créer une carte, commencez par [création de carte personnalisée](#mwent/authoring). Pour le comportement d'ouverture-tactique actuel, continuez à [0.1.6](#mwent/version-0-1-6).

- Les scénarios avancent les chapitres à travers les jeux de qualification, les emplacements offrent des ordres persistants, et les pièges fournissent des réactions cachées. Ils occupent des prises sans ajouter de points unitaires.
- Voile, Immunité, Rupture, Infusion, Résilience, compteurs, minuteurs et évolution circulaire sont pris en charge.
- Les opérations ajoutées incluent le choix des cartes créées, le jeu du deck/cimetière, le rappel/rejeu, les boosts de main/deck, les changements de puissance de base, le Duel/Clash et le redéclenchement de Deathwish/Deploy.
- Les conditions couvrent les decks de départ, la taille des mains, la puissance la plus élevée, les trois premières puissances et les dépenses d'approvisionnement, ainsi que les coûts optionnels et quatre bonus d'ouverture.
- L'éditeur de cartes personnalisées expose ces capacités, conditions, cibles, opérations et coûts. L'épargne n'accorde pas les cartes possédées.

## Soixante nouvelles cartes de faction

Dix cartes sont ajoutées par faction. Ces tableaux résument la puissance stockée réelle, les provisions et les capacités.

Sur mobile, faites défiler la table horizontalement pour lire la colonne de capacité.

### Volkar Empire

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Volkar Founding Chronicle (card_1700) · 0.1.5 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Construct; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2 #0 · par tour 1; Chapitre 1: Ally Unit Board All · Cible: Armure 2 · par tour 1; Chapitre 2: Ally Unit Board All · Cible: Réarme 2 · par tour 1 |
| Volkar Field Workshop (card_1701) · 0.1.5 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 0 · par tour 1 |
| Volkar Hidden Snare (card_1702) · 0.1.5 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Conseil d'unité ennemie Puissance la plus élevée · Cible: Dégâts 3 · par tour 1 |
| Volkar Signal Keeper (card_1703) · 0.1.5 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Volkar Unexpected Ally (card_1704) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally Joue · si la carte de déclenchement a une catégorie Construct · Self Unit Board All · Cible : Armure 1 · par tour 1 |
| Volkar Sworn Vanguard (card_1705) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Volkar Challenge Bearer (card_1706) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Volkar Unwritten Possibilities (card_1707) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Volkar Shared Instinct (card_1708) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1704 · par tour 1 |
| Volkar Relic Breaker (card_1709) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Avalin

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Avalin Founding Chronicle (card_1710) · 0.1.5 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Beast; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2 #8 · par tour 1; Chapitre 1: Ally Unit Board All · Cible: Guérir 2 · par tour 1; Chapitre 2: Self Unit Board All · Cible: Invoquer un jeton avec puissance 4 #8 · par tour 1 |
| Avalin Field Workshop (card_1711) · 0.1.5 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 8 · par tour 1 |
| Avalin Hidden Snare (card_1712) · 0.1.5 | — / 4 | Bronze · Rare | Piège; Révéler: Ennemi spécial joué; Réaction de piège · Ally Unit Board Puissance la plus faible · Cible: Boost 3 · par tour 1 |
| Avalin Signal Keeper (card_1713) · 0.1.5 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Avalin Unexpected Ally (card_1714) · 0.1.5 | 4 / 5 | Bronze · Rare | Spécial Joué · si la carte déclenchante a la catégorie Nature · Self Unit Board All · Cible : Boost 1 · par tour 1 |
| Avalin Sworn Vanguard (card_1715) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Avalin Challenge Bearer (card_1716) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Avalin Unwritten Possibilities (card_1717) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Avalin Shared Instinct (card_1718) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1714 · par tour 1 |
| Avalin Relic Breaker (card_1719) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Roden League

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Roden Founding Chronicle (card_1720) · 0.1.5 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Merchant; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2 #16 · par tour 1; Chapitre 1: Self Unit Board All · Cible: Livraison 3 · par tour 1; Chapitre 2: Ennemi Unit Board Puissance la plus élevée · Cible: Marquer et frapper 4 · par tour 1 |
| Roden Field Workshop (card_1721) · 0.1.5 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 16 · par tour 1 |
| Roden Hidden Snare (card_1722) · 0.1.5 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Unité ennemie Conseil Puissance la plus élevée · Cible: Marquer et frapper 1 · par tour 1 |
| Roden Signal Keeper (card_1723) · 0.1.5 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Roden Unexpected Ally (card_1724) · 0.1.5 | 4 / 5 | Bronze · Rare | Fournitures dépensées · Self Unit Board All · Cible : Boost 1 · par tour 1 |
| Roden Sworn Vanguard (card_1725) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Roden Challenge Bearer (card_1726) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Roden Unwritten Possibilities (card_1727) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Roden Shared Instinct (card_1728) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1724 · par tour 1 |
| Roden Relic Breaker (card_1729) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Nevra

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Nevra Founding Chronicle (card_1730) · 0.1.5 | — / 10 | Or · Légendaire | Scénario; Progrès: Agent Allié Joué; Doomed; Déployer · Self Unit Board Tous · Cible : Invoquez un jeton avec puissance 2 #24 · par tour 1; Chapitre 1: Enemy Unit Board Puissance maximale · Cible : Infiltrer 1 · par tour 1; Chapitre 2: Espionnage de cible ≥ 1 · Enemy Unit Board Puissance maximale · Cible : Verrouillage 1Cible : Dégâts 3 · par tour 1 |
| Nevra Field Workshop (card_1731) · 0.1.5 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 24 · par tour 1 |
| Nevra Hidden Snare (card_1732) · 0.1.5 | — / 4 | Bronze · Rare | Piège; Révéler: Ennemi spécial joué; Piège réaction · Ennemi Unité Conseil Plus grande puissance · Cible: Verrouillage 1 · par tour 1 |
| Nevra Signal Keeper (card_1733) · 0.1.5 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Nevra Unexpected Ally (card_1734) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally · Évènement généré à l'extérieur du pont de départ ≥ 1 · Conseil d'administration de l'unité autonome Tous · Cible : Boost 1 · par tour 1 |
| Nevra Sworn Vanguard (card_1735) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Nevra Challenge Bearer (card_1736) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Nevra Unwritten Possibilities (card_1737) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Nevra Shared Instinct (card_1738) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1734 · par tour 1 |
| Nevra Relic Breaker (card_1739) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Mistwake Clans

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Haemu Founding Chronicle (card_1740) · 0.1.5 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Raider; Doomed; Déployer · Self Unit Board Tous · Cible: Invoquer un jeton avec puissance 2 #1300 · par tour 1; Chapitre 1: Ally Unit Board Tous · Cible: Guérir 2 · par tour 1; Chapitre 2: Ally Unit Board Puissance la plus faible · Cible: Rite sanguin 5 · par tour 1 |
| Haemu Field Workshop (card_1741) · 0.1.5 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 1300 · par tour 1 |
| Haemu Hidden Snare (card_1742) · 0.1.5 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Tableau de l'unité ennemie Puissance la plus élevée · Cible: Saignement 3 · par tour 1 |
| Haemu Signal Keeper (card_1743) · 0.1.5 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Haemu Unexpected Ally (card_1744) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally endommagé · Self Unit Board Tous · Cible: Boost 1 · per turn 1 |
| Haemu Sworn Vanguard (card_1745) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Haemu Challenge Bearer (card_1746) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Haemu Unwritten Possibilities (card_1747) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Haemu Shared Instinct (card_1748) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1744 · par tour 1 |
| Haemu Relic Breaker (card_1749) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

### Morga Brood

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Morga Founding Chronicle (card_1750) · 0.1.5 | — / 10 | Or · Légendaire | Scénario; Progrès: Ally Played Swarm; Doomed; Déployer · Self Unit Board All · Cible: Invoquer un jeton avec puissance 2  # 1400 · par tour 1; Chapitre 1: Ally Unit Board All · Cible: Semer un husk 1 · par tour 1; Chapitre 2: Self Unit Board All · Cible: Invoquer un jeton avec puissance 4 #1400· par tour 1 |
| Morga Field Workshop (card_1751) · 0.1.5 | — / 7 | Or · Epic | Emplacement; Résilience; Déployer · Ally Unit Board All · Cible: Armure 1 · par tour 1; Ordre · Self Unit Board All · Cible: Générer en main 1400 · par tour 1 |
| Morga Hidden Snare (card_1752) · 0.1.5 | — / 4 | Bronze · Rare | Piège; Révéler: Unité ennemie jouée; Réaction au piège · Unité ennemie Conseil Puissance la plus élevée · Cible: Poison 1 · par tour 1 |
| Morga Signal Keeper (card_1753) · 0.1.5 | 4 / 5 | Bronze · Rare | Compteur 2 ; Minuterie 2 ; Tour de fin · Self Unit Board All · Cible : Réduire compteur 1 · par tour 1 ; Compteur atteint zéro · Self Unit Board All · Cible : Bouclier 1 · par tour 1 ; Minuterie expire · Self Unit Board All · Cible : Boost 2 · par tour 1 |
| Morga Unexpected Ally (card_1754) · 0.1.5 | 4 / 5 | Bronze · Rare | Ally Détruit · Self Unit Board Tous · Cible : Boost 1 · par tour 1 |
| Morga Sworn Vanguard (card_1755) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · si le deck de départ ne contient pas de neutres · Self Unit Board All · Cible : Boost units in deck 1 · per turn 1; Turn End · Self Hand size ≤ 3 · Self Unit Board All · Cible : Boost 1 · per turn 1 |
| Morga Challenge Bearer (card_1756) · 0.1.5 | 4 / 5 | Bronze · Rare | Déployez · Carte d'unité ennemie Choisissez · Cible: Clash · par tour 1; Coup fatal · Carte d'unité autonome Tous · Cible: Boost 2 · par tour 1 |
| Morga Unwritten Possibilities (card_1757) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Self Unit Board Tous · Cible : Créez et jouez à l'un des trois choix au maximum 5 · par tour 1 |
| Morga Shared Instinct (card_1758) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Ally Unit Board Choisir · Cible : Infuser des capacités et des catégories  1754 · par tour 1 |
| Morga Relic Breaker (card_1759) · 0.1.5 | — / 4 | Bronze · Rare | Déployer · Planche d'artefact ennemi Choisir · Cible : Détruire l'artefact · par tour 1 |

## Douze cartes de siège

Sept modèles de machines originales avec des composants mobiles sont partagés par des cartes, des champs et des aperçus. Les cartes, les capacités et les modèles de base fonctionnent sans créer de gros canons. Les palettes optionnelles utilisent des ressources installées compatibles.

Ajout de catégories de moteur de siège, d'événements d'ordre et de réduction du temps de recharge, de réduction du temps de recharge, de charge d'ordre et d'invocation de capacités de préservation. De telles invocations ne redéclenchent pas Déployer et gagner Doomed.

| Carte et première version | Puissance / provisions | Cadre et rareté | Résumé des capacités |
| --- | --- | --- | --- |
| Volkar Timber Ballista (card_1800) · 0.1.5 | 4 / 5 | Bronze · Rare | Armure 1; Ordre: Dommages 2; Temps de recharge 2; Réapprovisionnement 1; Équipage 1; Machine Ballista en bois |
| Volkar Counterweight Catapult (card_1801) · 0.1.5 | 5 / 7 | Bronze · Rare | Armure 1; Ordre: Socket burst 2; Refroidissement 3; Réapprovisionnement 1; Patience 1; Catapulte à contrepoids machine |
| Volkar Armored Cannon (card_1802) · 0.1.5 | 5 / 8 | Or · Epic | Armure 2; Ordre: Piercing d'armure 3; Temps de recharge 3; Réapprovisionnement 1; Dépenses 1; Canon blindé |
| Volkar Automatic Loader (card_1803) · 0.1.5 | 4 / 6 | Bronze · Rare | Armure 1; Turn End · Moteur Ally Unit adjacent à All Siege · Cible: Réduire le temps de recharge uniquement 1 · par tour 1; Chargeur automatique de machine |
| Volkar Steam Ballista (card_1804) · 0.1.5 | 5 / 7 | Bronze · Rare | Armure 3; Ordre: Décharge d'armure 2; Temps de recharge 2; Réapprovisionnement 1; Équipage 1; Machine à vapeur Ballista |
| Volkar Repeating Cannon (card_1805) · 0.1.5 | 4 / 10 | Or · Epic | Armure 1; Ordre: Dégâts 1; Temps de recharge 2; Réapprovisionnement 1; Un temps de recharge allié diminue · si la carte de déclenchement a catégorie Siège moteur · Unité de l'ennemi Conseil aléatoire · Cible: Dégâts 1 · par tour 3; Machine répétition Canon |
| Volkar Armored Crew (card_1806) · 0.1.5 | 4 / 5 | Bronze · Rare | Armure 2; Défenseur 1; Déploiement · Unité alliée adjacente à toutes · Cible : Armure 1 · par tour 1 |
| Volkar Field Engineer (card_1807) · 0.1.5 | 4 / 5 | Bronze · Rare | Armure 1 ; Déployer · Ally Unit Board Choisir le moteur de siège · Cible : Réarme 2 · par tour 1 |
| Volkar Ammunition Cart (card_1808) · 0.1.5 | 5 / 5 | Bronze · Rare | Armor 1; Trade 1; Turn End · Self Unit Board Tous · Cible: Livraison 1 · par tour 1; Chariot de munitions machine |
| Volkar Field Maintenance (card_1809) · 0.1.5 | — / 5 | Bronze · Rare | Déployez · Ally Unit Board Choisissez le moteur de siège · Cible : Arrière 2 · par tour 1 |
| Volkar Bombardment Order (card_1810) · 0.1.5 | — / 4 | Bronze · Rare | Déploiement · Rangée de l'unité ennemie Tous · Cible : Dégâts 1 · par tour 1 |
| Volkar Siege Encampment (card_1811) · 0.1.5 | — / 12 | Or · Légendaire | Scénario ; Progrès : Moteur de siège allié ; Destiné ; Déployer · Self Unit Board Tous · Cible : Invoquer 1 unité avec des capacités et Doomed; pas de déploiement1800 · par tour 1; Chapitre 1: Self Unit Board Tous · Cible : Invoquer 1 unité avec des capacités et Doomed; pas de déploiement1801 · par tour 1; Chapitre 2: Ally Unit Board All Siege moteur · Cible: Rearm 2 · par tour 1 |

Voir [création de table et de carte](#mwent/authoring) et les [catalogue de spécifications complet](#mwent/card-catalog).
