---
title: Enregistrer, charger et appliquer
slug: core-concepts
order: 50
description: Comprenez les boutons que vous utilisez pour enregistrer le travail et attachez-le à un PNJ.
product: core-fabric
category: Systèmes centraux
section: getting-started
status: Stable
version: 0.3.1
audience: Créateurs
tags:
  - concepts
  - glossary
translationSource: en
translationMethod: assisted
---

## Les boutons que vous utiliserez

| Bouton | Utilisez-le pour |
| --- | --- |
| **Load** | Ouvrir le travail enregistré ou un exemple groupé |
| **Save** | Conservez les modifications dans votre propre fichier |
| **Save As** | Faites votre propre copie d'un exemple ou enregistrez sous un autre nom |
| **Apply** | Joindre une conversation, une boutique ou un autre travail enregistré à un PNJ |

**Close** et les flèches Retour/Avance ne sauvent pas votre travail.


![Le PNJ applique l'écran après avoir sélectionné une conversation de serveur enregistrée.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide a été sélectionné et associé à Apply Dialogue. Après Save As sous un autre nom, sélectionnez le nouveau fichier ici aussi.")

## Le contenu et l'apparence sont séparés

Ecrire les dialogues et les choix en **Dialogue Editor**. Disposez la fenêtre de dialogue, les couleurs et les images en **GUI Maker**. Définir les produits et les prix en **NPC Shop**.

Vous pouvez d'abord terminer le contenu en utilisant l'écran par défaut. Pour modifier son apparence plus tard, choisissez votre interface graphique enregistrée dans la conversation ou dans les paramètres de l'interface graphique de la boutique.

## Réutiliser le travail sur plusieurs PNJ

Appliquez une conversation enregistrée à plusieurs PNJ pour la partager. La modification de ce fichier met à jour leur contenu partagé. Pour différentes conversations, faites des copies séparées avec **Save As**.

Les magasins utilisant le même fichier de produit ont encore **stock séparé pour chaque PNJ**. Les joueurs visitant le même PNJ partagent le stock de ce PNJ.

## Conditions et actions

Une condition **** décide qui peut voir ou utiliser quelque chose : par exemple, afficher un choix une fois la quête terminée. Une **action** décide de ce qui se passe quand elle est choisie, comme donner un article ou ouvrir une boutique.

Utilisez [conditions et actions](#core-fabric/conditions-actions) pour ajouter ces comportements.
