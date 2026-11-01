---
title: Collections et construction de ponts
slug: cards-decks
order: 1530
description: Dépôts voûtés, tirages réguliers et animés, raretés et exigences du pont.
product: mwent
category: Factions et cartes
section: cards
status: Guide
version: 0.1.6
audience: Joueurs
translationSource: en
translationMethod: assisted
---

## Acquérir et stocker des cartes

Collectez les cartes physiques et les packs distribués par le serveur. L'acquisition du marchand et du coffre dépend des paramètres du serveur; les opérateurs peuvent [guide d'acquisition](#mwent/acquisition). Recevoir une carte est séparé de la déposer dans le coffre-fort.

Avec un curseur vide, cliquez avec le bouton droit sur une pile de cartes dans votre inventaire ou un coffre pour déposer sa quantité. Ouvrez le coffre-fort avec la clé par défaut **V**, qui peut être rebond. Retirez les cartes pour obtenir des objets physiques à nouveau.

La construction de deck ajoute des quantités possédées dans le coffre-fort et l'inventaire du joueur. Les coffres et les cartes des autres joueurs sont exclus. Ajouter des cartes à un deck ou les utiliser dans un match ne les consomme pas. Les cartes réservées pendant la préparation ou le jeu ne peuvent pas être retirées du coffre-fort.

## Tirages réguliers et animés

Les tirages réguliers et animés sont des objets physiques distincts et des comtes possédés, mais partagent la limite de copie de la même carte. L'animation n'améliore pas les statistiques de combat.

**Rarity** a quatre valeurs : Commun, Rare, Epic et Légendaire. Le **Bronze / Gold frame** détermine la limite de doublon. Ne pas déduire cette limite de la rareté seule.

## Créer un deck

![Le navigateur de deck de préparation, avec des filtres prédéfinis à gauche et des cartes Companion Chorus, compte et provisions à droite.](assets/media/guides/minigames-015-neo1211/minigames-mwent-play.png "Jouer à Test dans Minigames 0.1.5 / NeoForge 1.21.1. Utilisez cette préparation d'ouverture de deck avec le deck sélectionné ; Mes decks trouvent vos decks sauvegardés.")

1. Ouvrez **My Decks → New Deck** depuis le coffre-fort, l'encyclopédie ou la préparation au combat.
2. Choisissez une faction et vérifiez le chef et la limite de provision.
3. Ajoutez une faction ou des cartes neutres, nommez le deck et enregistrez-le.
4. Sélectionnez le deck sauvegardé avant un match. Réparez d'abord les exigences incomplètes ou les copies possédées manquantes.

En 0.1.6 préparation, choisissez également l'un des [Cinq tactiques d'ouverture](#mwent/version-0-1-6). Il est séparé des cartes à main et est placé pour le joueur qui gagne le tirage au sort de la pièce du premier joueur.

| Besoins | Deck complet |
| --- | --- |
| Cartes | 25–40 |
| Unités | Au moins 13 |
| Provisions | Au plus 150 plus le bonus du leader sélectionné |
| Même carte Gold | Tout au plus un |
| Même carte Bronze | Tout au plus deux |
| Propriété | Tout au plus la quantité combinée de coffre-fort et d'inventaire |
| Faction | Faction choisie et neutre |

Économisez jusqu'à seize ponts. Les brouillons incomplets peuvent être enregistrés mais ne peuvent pas entrer automatiquement une correspondance. Changer de faction efface la composition et nécessite un nouveau chef ; changer seulement le chef préserve les cartes et revérifie la nouvelle limite.

![Préparation du deck avec la faction, le leader et les provisions à gauche, plus/moins les contrôles des cartes à droite et commencer le match ci-dessus.](assets/media/guides/minigames-015-neo1211/minigames-mwent-mulligan.png "Ajustez les nombres avec +/-, vérifiez le total des cartes, des unités et des provisions, puis commencez la correspondance. Il s'agit de la préparation du pont, avant l'ouverture - redessiner à la main.")

## Encyclopédie et inspection

L'encyclopédie n'accorde ou ne consomme pas de cartes. Sélectionnez des cartes pour lire les noms, les factions, la rareté, le pouvoir, les provisions et les capacités. Faites un clic droit dans la bataille pour plus de détails. Distinguer les valeurs de base des valeurs actuelles affectées par les dégâts ou les boosts.

Les cartes non possédées peuvent encore être inspectées. Une carte optionnelle apparaissant dans la liste ne signifie pas qu'elle peut être jouée sans son fournisseur. Le catalogue actuel contient 335 définitions intégrées et 89 définitions optionnelles ; la disponibilité réelle dépend des mods et des ressources installés. Les emplacements de cartes personnalisées inutilisés sont exclus de ces comptes.

Utilisez le [spécification catalogue](#mwent/card-catalog) pour les valeurs et les capacités des cartes [Libérer l'historique](#mwent/releases) pour les ajouts et les changements.

## Si un modèle de carte DNPC est manquant

Depuis 0.1.5, DNPC les paramètres du modèle Gecko sont lus et les aperçus temporaires créés pendant le chargement des ressources sont actualisés. Le modèle, les ressources et les bibliothèques de rendu optionnelles doivent être disponibles ; une entrée de catalogue n'installe pas l'intégration.
