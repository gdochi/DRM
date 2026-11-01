---
title: Dialogue Choix et présentation de Gecko
slug: dialogue-presentation
order: 63
description: Taillez les choix, ajoutez des impulsions et connectez les itinéraires d'animation Gecko en Fabric et NeoForge 0.2.4.
product: core-fabric
category: Dialogue Editor
section: dialogue-editor
status: Stable
version: 0.3.1
audience: Créateurs de dialogue
translationSource: en
translationMethod: assisted
---

## Choix du texte et du pouls

Dans la section **Choices** d'un nœud de dialogue, utilisez **Choice text size (px; 0 = GUI default)** pour remplacer la taille du texte de la mise en page de l'interface graphique liée pour ce nœud. Une valeur de `0` permet de conserver le paramètre GUI.

Activez **Pulse highlight** sur un choix individuel pour attirer l'attention lorsqu'il devient visible pour la première fois. Configurez ses ticks totaux, son nombre d'impulsions, sa couleur RVB et son intensité. Les choix cachés ou hors écran ne passent pas leur temps de pouls avant de devenir visibles.

Les longs choix traduits utilisent leur texte affiché lorsque DRM calcule la largeur du bouton et l'emballage. La zone de choix d'exécution peut défiler lorsque la liste complète ne convient pas.

![Surbrillance des impulsions activée pour un choix sélectionné.](assets/media/guides/drm-031-neo1211/dialogue-choice-pulse.png "DRM 0.3.1 / NeoForge 1.21.1. Ci-dessous, le nombre total de ticks 40, le nombre de pulsations 2, l'intensité 25 et la couleur. La taille du texte de choix 0 hérite de la taille de l'interface graphique. Cela capture les paramètres d'édition, pas la lecture.")

Suivez [la création de dialogue](#core-fabric/dialogue-system) à Save As et appliquez l'ensemble à un PNJ, puis vérifiez les choix de moment apparaissent. Sélectionnez un choix avant d'activer la surbrillance Pulse pour ce bouton.

## Itinéraires d'animation Gecko

Une route de départ utilisant `gecko_animation` peut inclure une cible Goto. DRM envoie la demande d'animation, puis se déplace vers le nœud valide sélectionné.

Les actions de dialogue sont évaluées dans l'ordre du document pendant la même coche de serveur. Le premier résultat de navigation reste autorisé, mais les effets secondaires ultérieurs tels que l'animation Gecko, les commandes, les balises et les actions d'éléments s'exécutent toujours.

La lecture Gecko utilise une chronologie de serveur synchronisée. Un joueur qui commence à suivre un PNJ après le début de la lecture reçoit l'animation active et rattrape sa position actuelle.
