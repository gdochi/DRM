---
title: Faire un article Roulette
slug: minigames-roulette
order: 1315
description: Choisissez des prix et des cotes, puis lancez un tirage à partir d'une machine ou d'un écran de jeu.
product: dochi-minigames
category: Création de jeux
section: rules
status: Guide
version: 0.1.6
audience: Joueurs / créateurs de jeux
translationSource: en
translationMethod: assisted
---

## Un spin, un prix

L'élément Roulette a été ajouté en **Minigames 0.1.6** et fonctionne sans DRM. Connectez une partie sauvegardée à une machine à roulette et faites un clic droit pour jouer.

**Current bundled presets default to Spin on block** : un clic droit fait tourner la machine sans ouvrir de fenêtre. Pour un écran d'entrée affichant d'abord les prix et les cotes, sélectionnez **Rules → Play mode → Game screen**, enregistrez et appliquez. Vérifiez le mode Lecture dans les profils enregistrés existants.

![Une machine à roulette placé dans le monde.](assets/media/guides/minigames-016-neo1211/roulette-native-world-stopped.png "Minijeux 0.1.6 / NeoForge 1.21.1. La roulette est au centre; Whack-a-Mole et Slots utilisent des machines séparées. Cet original a été capturé lors de la vérification du client natif du projet.")

En mode **Game screen**, vérifiez les prix, les quantités, les cotes et les frais d'entrée, puis appuyez sur **Spin**. La flèche détermine un prix. **Hide prizes & odds / Show prizes & odds** contrôle la liste de droite.

![Un écran d'entrée de roulette payé avant Spin.](assets/media/guides/minigames-016-neo1211/roulette-native-entry.png "Minijeux 0.1.6 / NeoForge 1.21.1. Cet exemple payant charge une émeraude et donne chacun des huit emplacements 12.5%. Le préréglage de la roulette est gratuit, alors vérifiez vos propres paramètres.")

**Play again** commence immédiatement un autre tirage et facture des frais supplémentaires dans une partie payante. Il ne s’agit pas d’un bouton de replay.

## Fabriquez la machine et connectez un jeu

Fabriquez une machine à roulette avec ** lingot d’or / horloge / lingot d’or ** sur la première rangée, ** bâton / poussière de redstone / bâton ** sur la deuxième, et **trois planches ** sur la troisième. Les types de planches peuvent être mélangés.

1. Placez-le avec un bloc clair au-dessus.
2. Ouvrez `/minigame editor` et choisissez **Item Roulette**.
3. Configurez-le ci-dessous, puis **Save As** votre propre nom, tel que `village_roulette`.
4. **Shift-right-click with empty hands**, choisissez le profil et appliquez-le à la table. La configuration nécessite une autorisation de l'opérateur de niveau 2 ou supérieur.
5. Faites un clic droit normalement pour jouer. Voir [configuration de la table](#dochi-minigames/minigames-tables) pour la table générique Minigame.

## Changer les prix et les cotes

Sélectionnez une ligne en **Prize slots**. Utilisez le Finder à côté de **Reward ID** pour choisir un élément, puis définissez **Count**. La sélection d'un élément d'inventaire peut préserver son nom personnalisé et ses données natives sans le consommer.

![Modifier l'objet, la quantité et le poids d'un prix sélectionné.](assets/media/guides/minigames-016-neo1211/roulette-editor-prizes.png "Minijeux 0.1.6 / NeoForge 1.21.1. La rangée de diamants bleus est en cours d'édition. Les cases à cocher marquent les prix pour la suppression des lots séparément. Le hasard sur la droite montre la probabilité résultante.")

Avec **Rules → Weighted chances** off, tous les emplacements de prix sont également probables. Avec elle, chaque prix utilise sa part du total **Weight**. Deux poids de 1 et 3 donnent 25% et 75%. La quantité ne change pas la probabilité. Les secteurs de roues suivent également les cotes réelles.

**Spin time (seconds)** gammes de 3 aux 8. Définissez l'élément d'entrée et le montant sous **General**; `0` est gratuit. La roulette charge actuellement des objets physiques. Il attribue une entrée de slots de prix plutôt que d'utiliser la politique de récompense la plus élevée ou cumulative du jeu.

![Mode de jeu de roulette, durée et commutateur de chance pondérée.](assets/media/guides/minigames-016-final-neo1211/roulette-editor-rules.png "Minijeux réels 0.1.6 / NeoForge 1.21.1 artefact remplacé à 15:40 KST en novembre 1. Les valeurs par défaut sont Spin on block, five seconds et Weighted chances OFF, donnant huit prix 12.5% chacun. La photo de l'écran d'entrée ci-dessus est un exemple d'écran de jeu séparé.")

## Faire tourner la machine physique sans écran

Choisissez **Rules → Play mode → Spin on block**. Un clic droit normal démarre la roue physique sans ouvrir l'écran de jeu, et paie les frais si configuré. En cliquant sur une machine à filer occupée ne charge pas à nouveau.

**Game screen** ouvre la grande interface de roulette. Enregistrez le mode choisi, appliquez le profil à la machine et vérifiez le comportement réel du clic droit.

Spin on block peut démarrer sans fichier de mise en page de l'interface graphique. Les 26.3 construit également ajouter des particules de prix et des sons lorsque la roue s'arrête; 1.21.1 Les images ci-dessus n'établissent pas ces effets.

## Fermer la fenêtre ou avoir un inventaire complet

Un tirage à la roulette déjà commencé continue après avoir fermé l'écran ou s'être éloigné. Le serveur conserve le tirage et le prix. Un inventaire complet maintient le prix en attente et empêche un autre tirage payé. Faites de la place, confirmez la réception du prix enregistré, puis rejouez.

Cela diffère de la confiscation d'un jeu de score normal comme Monty Hall ou Slots. L'enregistrement d'un profil et sa connexion à une machine sont également des étapes distinctes ; voir [fichiers et interfaces graphiques](#dochi-minigames/minigames-files-gui).
