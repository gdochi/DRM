---
title: Ajouter et positionner des éléments HUD
slug: hud-maker-elements
order: 111
description: Ajoutez de la santé, des équilibres et d'autres informations, puis ajustez la taille et la superposition.
product: core
category: HUD Maker
section: hud-maker
status: Guide
version: 0.3.1
audience: Créateurs de HUD
translationSource: en
translationMethod: assisted
---

## Ajoutez les informations que vous voulez voir

Ouvrez [ HUD Maker ](#core/hud-maker). Utilisez ** + Santé **, ** + Alimentation ** ou ** + Monnaie ** sous **HUD TYPE**. Ensuite, sélectionnez cette entrée sous **ADDED HUD TYPES** pour la modifier sur la droite.

![Santé sélectionnée sur le canevas HUD et dans l'Inspecteur.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "DRM 0.3.1 / Forge 1.20.1. L'entrée Ajoutée sélectionnée a un * en tête. Cet exemple a été positionné à X 400 / Y 250 et enregistré en tant que guide_hud.")

| Ajouter | Affichages |
| --- | --- |
| + Monnaie | Le solde d’une monnaie sauvée |
| + Santé / Alimentation / Armure / Air / Niveau | Valeurs de survie et d'expérience des joueurs |
| + Tête du joueur | Face du joueur |
| Intégrations mana/stamina en option | Valeurs du fournisseur installé |

Un bouton désactivé peut indiquer la devise manquante ou les données du fournisseur. **CNPC Tempdata / Storeddata** require CustomNPCs sur une cible plus ancienne supportée.

## Déplacer, redimensionner et dupliquer

Faites défiler l'inspecteur jusqu'à **Box ID / Layer # / X / Y / W / H**. Box ID distingue l'élément; Layer contrôle l'ordre avant/arrière. Position de réglage X/Y et taille de réglage W/H. Vous pouvez également sélectionner et déplacer des éléments sur le canevas.

Les paramètres de texte, de barre et d'icône disponibles dépendent de l'élément. **Duplicate** copie l'élément sélectionné ; déplacez la copie pour qu'elle ne couvre pas l'original.

Si les informations de survie sont masquées dans Creative, cochez **Render survival HUD** et inspectez également Survival. Supprimer un DRM élément est séparé de [Cacher les cœurs de vanille](#core/hud-maker-vanilla).

**Save As** Votre set. La limitation d'activation-sauvegarde vérifiée Forge 0.3.1 est décrite dans la configuration [HUD](#core/hud-maker) ; un fichier enregistré seul ne prouve pas que l'activation a réussi.
