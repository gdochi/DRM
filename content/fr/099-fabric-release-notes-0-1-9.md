---
title: Fabric 0.1.9 Mise à jour
slug: release-notes-0-1-9
order: 9
description: Scene Maker et plus facile d'édition dans Fabric 0.1.9.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.1.9
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour les orientations actuelles.

## Trouver la chronologie de la scène

Utilisez la chronologie inférieure pour la caméra, les sous-titres et le timing des effets. Ajoutez des clips avec + Camera ou + Subtitle, puis modifiez leurs propriétés sur la droite. La position mondiale ouvre le placement contre le monde réel. Continuer avec le [guide actuel](#core-fabric/scene-maker) pour l'épargner et l'appliquer.

![Trouvez la chronologie de la scène.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Historique des news 0.1.9

### Ajouté

- **Scene Maker** — Créer des visites de caméra et des scènes d'histoire à l'intérieur Minecraft. Organisez le mouvement de la caméra, les sous-titres, les images, les sons, les fondus, les barres cinématographiques et le tremblement de la caméra sur une timeline.
- **World camera points** — Placez des points tout en regardant autour de votre monde. Prenez une épingle en forme de diamant avec la souris pour la déplacer directement.
- **Editable camera routes** — Utilisez des chemins droits ou lisses et ajoutez des points entre ceux existants pour façonner le voyage de la caméra.
- **Scene playback commands** — Utilisez `/drm scene` pour voir les scènes jouables. L'argument suivant suggère des scènes sauvegardées, ce qui les rend plus faciles à démarrer.
- **Back and forward arrows** — Déplacez-vous entre les écrans de l'éditeur à partir de la barre supérieure partagée. Passez la souris sur une flèche pour voir ce qu'elle fait.

### Amélioration

- **Timeline browsing** — Une barre de défilement inférieure séparée vous permet de regarder à travers une longue scène sans déplacer son marqueur de lecture.
- **Card editing** — Cliquez avec le bouton droit de la souris sur une carte de chronologie pour rechercher des actions telles que la division et la suppression. Les actions disponibles dépendent du type de carte.
- **Easier settings** — Choisissez des options dans les listes, utilisez des commutateurs pour les paramètres marche / arrêt et sélectionnez les couleurs avec le sélecteur de couleurs.
- **World editing** — Le mouvement de la caméra est plus fluide, les chemins de la caméra sont plus clairs et les épingles en diamant solides sont plus faciles à reconnaître.
- **Point controls** — Cliquer sur une épingle la sélectionne. Cliquez avec le bouton droit de la souris pour déplacer l'appareil photo, déplacer le point vers l'appareil photo, modifier son chemin sortant ou le supprimer.
- **Safe dragging** — Relâchez la souris pour conserver un déplacement de point, ou appuyez sur Échap/clic droit pour annuler ce déplacement. Un glisser-déposer terminé peut être annulé en une seule étape.

### Fixe

- Cliquer sur les cartes de la timeline ne fait plus sauter le marqueur de lecture.
- L'ajout d'éléments de scène est plus fiable.
- Les noms de dimensions et les étiquettes temporelles restent dans les zones prévues.
- L'application des modifications de position du monde conserve les points que vous avez arrangés au lieu de déplacer le point sélectionné vers la caméra de visualisation.
- L'action de la barre d'outils Save As utilise son icône appropriée.

### Mise à jour

Sauvegardez votre monde et `config/dochi_rpg_maker/`, puis mettez à jour DRM sur le serveur et les clients. CustomNPCs reste nécessaire. Les quêtes existantes, les factions, les popups et les outils d'administration de 0.1.8 restent disponibles.

Les ancres de scène utilisent **Player** ou **Fixed Position**. Si vous avez une scène expérimentale plus ancienne utilisant une ancre PNJ, changez-la avant de l'enregistrer ou de la jouer. Pour les flèches back/forward dans les éditeurs d'addons Cobblemon, installez également la compilation d'addons mise à jour.
