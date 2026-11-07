---
title: Scene Maker
slug: scene-maker
order: 150
description: Créer et éditer des scènes de caméra dans le monde.
product: core-fabric
category: Scene Maker
section: scene-maker
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
---

## Faites votre première scène

Scene Maker est un outil de création pour organiser le mouvement de la caméra et les effets d'écran. Les joueurs voient la scène enregistrée lorsqu'elle est jouée, pas la chronologie d'édition.

![Scene Maker avec une scène de dix secondes. Les outils d’ajout se trouvent à gauche, l’aperçu et la chronologie au milieu, et les propriétés sélectionnées à droite.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Ajoutez à gauche, sélectionnez une carte de chronologie, puis modifiez Propriétés. Utilisez Appliquer des champs, puis Jouez pour inspecter le résultat.")

1. Ouvrez le sélecteur de l'éditeur DRM et choisissez **Scene Maker**.
2. Choisissez vos paramètres de scène, votre nom et votre longueur. Utilisez **Player** pour placer la scène par rapport au joueur, ou **Fixed Position** pour un emplacement spécifique du monde. Choisissez la dimension et l'origine selon vos besoins. Les ancres PNJ ne sont pas proposées.
3. Ajoutez une piste de caméra et tous les sous-titres, images, sons, fondus, boîtes aux lettres, shakes ou éléments d'événement dont vous avez besoin.
4. Sélectionnez une carte pour modifier ses propriétés. Utilisez **Apply Fields** pour les changements de champ. Cliquez avec le bouton droit sur une carte pour ses actions disponibles. Certains types de cartes ne peuvent pas être divisés.
5. Ouvrez **World positions** pour placer et ajuster les points de la caméra.
6. Utilisez **Play** pour prévisualiser, puis enregistrez votre propre scène avec **Save As**. **Run Saved** joue la version enregistrée, donc enregistrer à nouveau après avoir apporté des modifications.

## Terminer une scène en trois vidéos

Ces vidéos successives montrent les vrais écrans de **DRM 0.3.1 / NeoForge 1.21.1**, avec consignes et repères de clic en anglais, sans audio. La porte et les lampes étaient préparées pour rendre le déplacement de caméra visible.

### 1. Durée et sous-titre

![Configurer une scène de dix secondes et un sous-titre actif entre une et cinq secondes.](assets/media/guides/tutorial-videos-20261107/scene-settings-subtitle.mp4 "Scene Settings → + Subtitle → Edit Subtitle → Apply Fields. Les temps sont saisis en secondes.")

1. Dans **Scene Settings**, saisissez ID **tutorial_gate**, Name **Village gate** et conservez Duration **10**. Utilisez **Apply Fields**. L’ancrage **Player** rend la scène relative au joueur. Avant de raccourcir la durée, ramenez les fins des caméras et effets dans la nouvelle limite.
2. Utilisez **+ Subtitle**, Start **1**, End **5**, puis **Apply Fields**. Le sous-titre est actif entre 1 et 5 secondes de cette scène de dix secondes.
3. Ouvrez **Edit Subtitle**, saisissez **Welcome to the village!**, puis revenez avec **Apply Fields**. Cancel abandonne les modifications de cette fenêtre.
4. Déplacez le repère rouge à **3 secondes**. Sélectionner une carte change la cible d’édition, pas le temps de lecture. Les fondus par défaut peuvent rendre l’instant zéro noir.

### 2. Construire le parcours de caméra dans le monde

![Sélectionner la caméra, déplacer la caméra de travail, marquer des points, appliquer et prévisualiser.](assets/media/guides/tutorial-videos-20261107/scene-world-camera-path.mp4 "Carte Camera → World positions → WASD/Space → P/N → Enter pour Apply → Play. Édition réelle des positions.")

1. Cliquez sur le **corps de la carte Camera**, puis sur **World positions**. Une carte de sous-titre ou d’effet ne sélectionne pas la caméra.
2. Faites défiler la molette vers le bas pour réduire la vitesse, puis déplacez la caméra de travail avec **WASD / Space / Shift**. **P** enregistre sa position à l’instant courant. Le déplacement seul ne crée pas de point.
3. Déplacez-vous ailleurs et utilisez **N** pour ajouter le point suivant. P enregistre l’instant courant ; N ajoute un point ultérieur. Les temps déterminent la durée du trajet.
4. Utilisez **Enter ou Apply** pour intégrer les positions au brouillon. Cancel abandonne les modifications de cette fenêtre.
5. Utilisez **Stop → Play** pour vérifier caméra et sous-titre ensemble. Appliquez les positions et enregistrez le fichier de scène.

### 3. Effets, enregistrement et lecture réelle

![Régler Letterbox, enregistrer et utiliser Run Saved pour vérifier lecture et fin côté serveur.](assets/media/guides/tutorial-videos-20261107/scene-effects-save-run.mp4 "+ Letterbox → Apply Fields → Save As → Run Saved. La lecture finale utilise le fichier enregistré.")

1. Utilisez **+ Letterbox**, Start **0**, End **10**, puis **Apply Fields**. Les effets ont leurs propres cartes et intervalles.
2. Utilisez **Save As** avec **tutorial_gate**. Le fichier est **config/dochi_rpg_maker/scene/tutorial_gate.json**. Apply des positions et Apply Fields n’enregistrent pas le fichier.
3. Utilisez **Run Saved** pour lire le fichier via le serveur. Enregistrez de nouveau après toute modification.
4. Pour relancer par commande, utilisez **/drm scene tutorial_gate.json**. Consultez la section des commandes pour sélectionner les joueurs.
5. Vérifiez la disparition du sous-titre et le retour au jeu. La lecture a été vérifiée dans le monde de test isolé à un joueur.

## Se déplacer dans la timeline

La broche rouge est la position de lecture. Faites-le glisser délibérément pour le chercher. Choisir une carte ne cherche pas. La barre de défilement horizontale inférieure déplace la plage de temps visible indépendamment ; utilisez les commandes moins/plus pour ajuster le zoom. Utilisez le commutateur de boucle lorsque vous voulez la lecture répétée d'aperçu.

Dans la capture d'écran, **Camera** contient le clip de l'appareil photo, tandis que **opening / closing** in **Effects** marque les effets de début et de fin.

## Travailler avec des points de caméra

| Contrôle | Mesures prises |
| --- | --- |
| WASD / Espace / Changement | Déplacez la caméra d'édition. |
| Faites glisser l'espace vide à droite | Regarde. |
| Roue de souris | Ajuster la vitesse de déplacement. |
| Ctrl + roue | Ajustez le champ de vision de la caméra. |
| Cliquez à gauche sur une épingle | Sélectionnez le point sans vous téléporter. |
| Maintenez la souris gauche et faites glisser une épingle | Déplacez le point sur le plan de vue actuel. |
| Relâchez après avoir glissé | Gardez le mouvement sur la scène de travail. |
| Esc ou clic droit lors d'un glisser | Annule ce mouvement. |
| Faites un clic droit sur une épingle | Ouvrir des actions de point. |
| Faites un clic droit sur une ligne de connexion | Ouvrez des actions de chemin. |
| P / Marquer la position | Placez le point sélectionné sur la caméra d'édition. |
| N / Nouveau point | Ajoutez un point à la position actuelle de la caméra et au prochain temps disponible choisi par l'éditeur. |
| Ctrl + Z | Annuler une modification terminée dans cette fenêtre. |
| Appliquer | Gardez les positions modifiées et revenez à Scene Maker. |
| Annuler | Retournez sans appliquer les modifications de cette fenêtre. |

Dragging garde la profondeur originale du point par rapport à la vue. Pour le déplacer dans une autre direction, relâchez, déplacez la caméra d'édition et faites-la glisser à nouveau. Un clic avec un petit mouvement de la main sélectionne seulement. Les épingles doivent rester dans la partie chargée du monde. L'appareil photo reste immobile pendant qu'une épingle est glissée.

Utilisez **Move camera here (TP)** pour afficher un point sélectionné ou **Move point to camera** pour le déplacer vers votre vue actuelle. Ce sont des actions séparées. **Walk in world** vous permet de vous déplacer en tant que joueur et de marquer des positions; suivez les commandes de retour à l'écran.

## Façonner l'itinéraire

Faites un clic droit sur la ligne de connexion ou choisissez **Edit outgoing path** sur une épingle. Choisissez une route droite ou lisse, ajoutez un point médian ou placez un virage sur votre appareil photo. Déplacez les broches ajoutées pour façonner la courbe. Le chemin tracé montre l'itinéraire de la caméra utilisée pour la lecture.

Les scènes en orbite utilisent leurs propres paramètres de distance et d'angle. Déplacer un point d'orbite peut changer la distance de l'orbite partagée. Le montage de trajectoires droites / lisses est pour les trajectoires de caméra ordinaires, pas pour les routes orbitales.

## Jouer une scène sauvegardée

Avec l'autorisation de l'opérateur :

```text
/drm scene
/drm scene <scene-file>
/drm scene <scene-file> play @a
/drm scene <scene-file> stop @a
```

Utilisez les suggestions après `/drm scene ` pour choisir une scène sauvegardée jouable. Remplacez `<scene-file>` par ce nom ; ce n'est pas une partie littérale de la commande. La deuxième forme joue pour vous, la troisième pour les joueurs sélectionnés, et la quatrième arrête cette scène pour eux.

Si une scène n'est pas répertoriée, vérifiez qu'elle a été enregistrée et que son ancre et son contenu référencé sont valides. Appliquer met à jour le document d'édition ; enregistrez la scène par la suite pour la conserver pour une lecture ultérieure.

## Arrêter toutes les scènes actives

`/drm scene stop @a` arrête les scènes actuelles des joueurs sélectionnés sans nommer de fichier. Utilisez la racine `/drm scene`, il n'y a pas de commande séparée `/drmscene`.

## Caméras suivant une cible en mouvement

Utilisez Follow, Orbit ou Path+LookAt pour déplacer des cibles. Les constructions 1.21.1 et séparées 26.3 suivent leur mouvement plus facilement sans avoir besoin de modifier les fichiers de scène existants. Forge 1.20.1 ne comprend pas Scene Maker.
