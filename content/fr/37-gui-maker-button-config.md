---
title: Modifier l'apparence du bouton
slug: gui-maker-button-config
order: 103
description: Choisissez le rendu du bouton Minecraft ou le style personnalisé DRM pour un écran.
product: core
category: GUI Maker
section: gui-maker
status: Guide
version: 0.3.1
audience: Créateurs d'interface graphique
translationSource: en
translationMethod: assisted
---

## Utiliser les boutons de choix Minecraft

1. Ouvrez la mise en page des dialogues en [GUI Maker](#core/gui-system).
2. Choisissez **Button Config** en haut.
3. Allumez le commutateur pour **Choice / choice_box** pour utiliser le rendu vanille. **Custom** utilise le style personnalisé de DRM.
4. Retournez avec **Done** et inspectez **Preview**.
5. **Save As** votre mise en page et sélectionnez-la dans Dialogue EditorGUI settings.

![Choix / choice_box défini sur Personnalisé dans la configuration de bouton.](assets/media/guides/drm-031-forge1201/gui-button-config.png "DRM 0.3.1 / Forge 1.20.1. La liste contient les types de boutons pris en charge par la mise en page actuelle. Chaque commutateur change le rendu de ce type.")

![Choix / choice_box commuté en Vanille.](assets/media/guides/drm-031-forge1201/gui-vanilla-buttons.png "Retournez avec Terminé et vérifiez la taille du choix et les réponses longues dans Aperçu. C'est l'état réel de l'éditeur commuté.")

Le bouton Config change d'apparence. Définissez si une réponse ouvre une boutique ou une autre scène sous **Dialogue Editor → Choice actions**.

| Changement | Où |
| --- | --- |
| Texte de réponse | Dialogue Editor → Choix → Label |
| Choix de la position et de la taille | GUI Maker canvas |
| Taille du texte, longues réponses et impulsions | [Styling de choix](#core/dialogue-choice-style) |
| Rendu Vanille/bouton personnalisé | Configuration des boutons |

L'ouverture d'une mise en page de magasin montre ses propres types de boutons pris en charge. Changer une disposition de dialogue ne change pas les boutons de chaque écran.
