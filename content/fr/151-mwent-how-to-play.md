---
title: Comment jouer MWENT
slug: how-to-play
order: 1510
description: Mulligans, placement, ordres, passe, score et transitions rondes.
product: mwent
category: Lecture
section: play
status: Guide
version: 0.1.6
audience: Joueurs
translationSource: en
translationMethod: assisted
---

## La victoire et le champ de bataille

Gagnez ** deux rounds** dans un match qui dure jusqu'à trois rounds. Chaque joueur a des rangées avant et arrière avec neuf prises fixes par rangée. Votre score est la puissance actuelle des unités restant sur votre tableau. Armure, Bouclier et Fourniture n'ajoutent pas directement de points. Les scénarios, emplacements et pièges introduits en 0.1.5 occupent les sockets sans ajouter de puissance unitaire.

Lorsque les deux joueurs passent, comparez les scores. Le score le plus élevé gagne un tour; un tour à égalité donne aux deux joueurs une victoire. L'ensemble du match peut donc se terminer comme un tirage au sort.

![MWENT bataille avec dix cartes de main, rangées avant / arrière, les scores et le contrôle de passe.](assets/media/guides/minigames-015-neo1211/mwent-battle.png "Minijeux 0.1.5 / NeoForge 1.21.1, interface utilisateur anglaise. Les partitions et les marqueurs ronds sont à gauche, votre main est en dessous, et les ponts, les cimetières et les passes sont à droite. Chaque côté a deux rangées de neuf douilles.")

## 1. Choisir un deck et un mulligan

Vérifiez votre faction, votre deck et votre chef. Tirez dix cartes au début. Un lancer de pièce choisit le joueur de départ. Le premier joueur peut remplacer jusqu'à trois cartes dans le mulligan d'ouverture; le second peut remplacer jusqu'à deux. Le remplacement est facultatif. Continuez à commencer la bataille.

Les tours suivants tirent jusqu'à trois cartes alors que le paquet a des cartes restantes. La limite de la main est de dix. Tirages bloqués par une main complète ajouter à deux mulligans de base de ce tour. Le vainqueur du tour précédent commence le tour suivant.

## 2. Jouez une carte à votre tour

Le premier joueur peut utiliser **tactique d'ouverture** choisi lors de la préparation une fois. Il est séparé de jouer une carte de main, et 0.1.6 offre cinq choix. Voir [sélection et utilisation réelle](#mwent/version-0-1-6) pour le noyau de joint de Golem se transformant en un Golem à quatre puissances dans la même prise.

1. Sélectionnez une carte à main. Cliquez d'abord avec le bouton droit pour inspecter ses capacités et son état actuel.
2. Placez les unités dans une prise vide légale. Les rangées et les voisins immédiats peuvent affecter les capacités.
3. Résoudre les capacités ciblées en choisissant une cible juridique mise en évidence.
4. Utilisez les commandes et les capacités de leader disponibles, puis appuyez sur **End Turn**.

Un tour normal joue une carte de la main. Les invocations et les jeux supplémentaires créés par les capacités suivent ces capacités. **Playing** une carte dépense une vraie carte de main ; **l'invocation** met une unité sur le terrain à travers un effet. Normalement, les invocations ne redéclenchent pas le déploiement ou les capacités nécessitant une carte à jouer.

## 3. Ordres et dirigeants

**Deploy** se déclenche lorsqu'une carte est jouée. **Order** est activé manuellement sur une carte déjà en jeu. Vérifiez les frais, le temps de recharge, les coûts d'approvisionnement et le verrouillage. Sans Zeal, une unité ne peut pas immédiatement utiliser son Ordre au tour où elle entre. Les capacités de leader ont des nombres d'utilisation distincts et ne comptent pas comme des cartes à main.

Par exemple, l'équipage a besoin d'alliés blindés dans les deux emplacements immédiatement adjacents de la même rangée. Il peut recharger une commande épuisée ou réduire le temps de recharge restant à votre tour. Deux alliés blindés ailleurs dans cette rangée sont insuffisants.

## 4. Décider quand passer

**Pass** donne vos tours restants pour le tour en cours. Votre adversaire peut continuer à jouer; vous ne pouvez pas revenir sur un tour plus tard dans ce tour. Choisissez-le avant de jouer une carte ou de faire une autre action à votre tour.

| Situation | Considérons |
| --- | --- |
| L'adversaire est passé | Gagnez uniquement les points nécessaires pour mener et conserver les cartes. Les effets Turn-end peuvent toujours modifier le score. |
| Le rattrapage coûte beaucoup de cartes | Comparez la concession du cycle avec les ressources de dépenses nécessaires dans le prochain. |
| Les commandes ou les moteurs de croissance sont prêts | Peser les points d'un autre tour contre les options de retrait de l'adversaire. |

Les transitions rondes effacent normalement le tableau et préservent la main restante. Les cartes avec Résilience et autres exceptions suivent leur propre texte. Le nettoyage des ronds est distinct de la destruction et ne déclenche pas automatiquement Deathwish.

## Statuts communs

| Statut | Effet |
| --- | --- |
| Armure / Bouclier | L'armure absorbe normalement les dégâts en premier ; le bouclier bloque un événement de dégâts. |
| Poison | Deux applications de poison détruisent l'unité. |
| Saignement / Vitalité | À la fin du tour du propriétaire de l'unité, infligez un dégât / ajoutez une puissance et réduisez la durée. Les saignements ignorent l'armure. |
| Verrouiller / Purifier | Lock désactive les ordres et les capacités passives. Purify supprime les statuts amovibles plutôt que l'armure. |
| Doomed | L'unité ne reste pas dans le cimetière en quittant le plateau. Vérifiez la résurrection et les restrictions symboliques. |

## Minuteries et départ

Les correspondances normales utilisent des tours 60-seconde, des mulligans 20-seconde et des transitions de cinq secondes. Le timeout, le serveur résout les cibles en attente et défausse une carte de main si aucune n'a été jouée, puis termine le tour. Les leçons n'ont pas de minuterie.

Esc ferme d'abord un détail de carte ouverte. Confirmer le départ d'un match en cours le perd. Le JcJ perd également lors de la déconnexion, de la mort, du changement de dimension ou du déplacement de plus de blocs 64 de la table. La fermeture d'un écran ou d'un guide de lecture ne met pas en pause la minuterie normale du serveur.

Les préférences de rotation, de zoom et d'affichage 3D / carte partagent les mêmes règles de serveur. Poursuivre avec [factions](#mwent/factions) et [bâtiment de pont](#mwent/cards-decks).

## Musique de combat

La musique par défaut suit la faction du deck du joueur depuis le lancer de pièces et le mulligan. Un choix explicite de musique de profil de jeu a priorité. Les contrôles de lecture/arrêt et de volume sont laissés dans Rulebook. Silencieux 0% garde la position de lecture; la lecture après Stop redémarre la piste. Les préférences sont locales et n'éditent pas le jeu serveur JSON ou le volume global Minecraft.
