---
title: Texte, images, modèles et calendrier
slug: battle-presentation-layers-runtime
order: 531
description: Placez du texte et des modèles, ajoutez du mouvement et des images et du son.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs arrangeant les entrées de bataille
tags:
  - layers
  - timeline
  - actors
  - audio
translationSource: en
translationMethod: assisted
---


## Déplacer un calque de texte

En Battle Presentation Maker suivre **Element → Add Label → Content**. L'étiquette définit le texte, la taille de police définit sa taille et la couleur sa couleur. La disposition contrôle la position et les dimensions de la boîte; L'animation contrôle séparément le timing et le mouvement.

![Propriétés du contenu après l'ajout d'une étiquette.](assets/media/guides/cobble-029-neo1211/cobble-layer-content.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1 . { opponent_name – dans Label se résout au nom de l’adversaire. Le curseur est à zéro, le début de Fade In, donc le texte du canevas n'est pas encore visible. Utilisez Play pour inspecter son intervalle actif.")

![Propriétés d'animation pour cette étiquette.](assets/media/guides/cobble-029-neo1211/cobble-layer-animation.png "La case Start/End est l'intervalle visible ; Start/Final X sont les positions de départ et d'arrivée. Cet exemple fonctionne 0 – 144 ticks, se déplace X 280 → 360 tout en gardant Y 220, et se développe de 0.8 à 1. Vérifiez que le même élément est sélectionné dans la timeline.")

## Types d'éléments

| Type | Rendu | Champs importants |
| --- | --- | --- |
| `Label` | Centre le texte à l'intérieur de sa boîte et clipse le texte qui dépasse la largeur de la boîte | Texte, taille de police, couleur, styles de texte partiels |
| `Texture` | Dessine une image de ressource Minecraft ; une texture non résolue peut retomber dans une boîte colorée | Image, Opacité, Ajuster, Recadrer |
| `Color` | Dessine un rectangle ARGB | Couleur, dimensions de la boîte, Alpha |

Utilisez `{player_name}` pour afficher le nom du joueur et `{opponent_name}` pour afficher le nom de l'adversaire.

L'image doit être un ID de ressource tel que `namespace:textures/gui/file.png`, pas un chemin de fichier absolu. `Stretch` se déforme à la boîte complète, tandis que `Contain` conserve le rapport d'aspect et centre l'image complète. Crop sélectionne le rectangle source avant le montage.

## Position et toile glissante

La disposition X/Y est synchronisée avec la position de mouvement finale. En faisant glisser un élément sur Canvas, vous déplacez Start X/Y et Final X/Y par le même delta, en préservant sa distance de déplacement existante.

Pour un slide-in :

1. Placez la position finale sur Canvas.
2. Déplacez uniquement Démarrer X ou Démarrer Y en dehors de la scène.
3. Définissez l'échelle de départ / finale et la rotation.
4. Jouez toute la gamme active pour juger de l'assouplissement.

La largeur et la hauteur définissent la boîte de conception. La taille de police est séparée, donc le redimensionnement d'une boîte d'étiquette ne redimensionne pas automatiquement son texte.

## Calcul du calendrier

| Terrain | Calcul du temps d'exécution |
| --- | --- |
| Début / Fin Tick | En dehors de la plage, l'élément n'est pas rendu. La fin est normalisée à au moins une tique après le début. |
| De / vers | Position, Échelle, Rotation et Alpha interpolent sur la progression active. |
| Fade In | Multiplie Alpha calculé de 0 à 1 après le début. |
| Fade Out | Multiplie Alpha de 1 à 0 avant la fin. |
| Easing | Changements De / Pour progresser; l'Alpha final reçoit également des multiplicateurs de fondu. |

| Easing | Résultat |
| --- | --- |
| `Linear` | Vitesse constante |
| `Ease In` | Accélère à partir d'un démarrage lent |
| `Ease Out` | Décélère dans la cible |
| `Ease In Out` | Démarrage et finition en douceur |
| `Back Out` | Dépassement, puis retour |
| `Step` | Se maintient jusqu'à la fin, puis passe à |

Le fait de faire glisser la règle de chronologie met en pause la lecture. Il reprend à la sortie uniquement lorsque la lecture était en cours d'exécution avant le glisser. Pour retester Intro Audio, frotter avant son Start Tick et jouer vers l'avant.

## Ordre Z avec des acteurs

Le joueur et l'adversaire ont chacun une valeur Z. L'exécution fait défiler les éléments normaux par Z et insère un acteur lorsque l'acteur Z devient inférieur ou égal à l'élément suivant Z.

Une pile utile est l'arrière-plan à 1, les panneaux à 5 – 12, l'adversaire / joueur à 23 – 24, les étiquettes de nom à 30 – 31, VS à 40 et un flash final à 100. Si du texte apparaît derrière un modèle, inspectez Z avant de déplacer les coordonnées.

## Acteur modèles

| Réglage | Comportement |
| --- | --- |
| Visible | Désactive le rendu des acteurs lorsqu'il est désactivé |
| `Humanoid` | Utilise le rendu Steve/Alex ainsi que les rotations de la tête, du corps, des bras et des jambes |
| `Pokemon` | Utilise la rotation du modèle entier; la pose des membres n'est pas appliquée |
| `Auto` | Compatibilité héritée ; utiliser un type explicite pour un nouveau travail |
| X/Y | Position de la scène à la base du modèle |
| Échelle et Yaw/Pitch/Roll | Taille et rotation du modèle entier |
| Z | Ordre relatif aux éléments normaux |

Le joueur montre le joueur avec sa balle de plomb Pokémon. L'adversaire montre le PNJ cible. Les deux peuvent être positionnés et superposés avec la scène.

Lorsque l'éditeur n'a pas de PNJ cible, il peut afficher un échantillon de Bulbasaur. Cet échantillon ne prouve pas que le type de modèle choisi correspond au PNJ final.

## Arrière-plan et audio

World Background couvre la fenêtre complète derrière la scène et a sa propre couleur, opacité et fondus. Un élément Color est une couche Stage avec un comportement normal de Z et de timeline. L'image de scène est une image fixe unique derrière les éléments de scène avec opacité, ajustement et recadrage.

| Audio | Comportement d'exécution |
| --- | --- |
| Intro | Démarre une fois lorsque la lecture croise Start Tick. Sauter, manquer la cible ou l'interrompre l'arrête. L'achèvement normal peut laisser une longue queue continuer à travers la transition. |
| Bataille | Ne joue pas sur le calendrier de présentation. Il est passé au contrôle de combat après l'achèvement de la présentation. |

Inspecteur Play/Stop ne prévisualise que le son sélectionné et ne déplace pas la timeline. Chaque client doit avoir la ressource sonore référencée Minecraft.

## Skip et annulation

Lorsque Skippable est activé, `Esc` ou `Space` envoie un résultat ignoré. Sauter doit être activé dans la scène sauvegardée.

Les joueurs morts ou manquants, les cibles supprimées ou non valides, un écran client interrompu, une vérification de condition échouée et les équipes de combat non valides peuvent annuler le démarrage en toute sécurité. Testez la première image, le déclencheur audio, le milieu, le flash final, le saut, la vraie bataille et la restauration post-bataille en un seul flux complet.

## Stades de blocs, FX et planification

Voir [étapes de bloc et FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) pour la création de région/FX dans 0.2.4, et [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) pour le clone, la scène et l'exécution de bataille.
