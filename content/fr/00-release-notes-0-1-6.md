---
title: Quoi de neuf dans 0.1.6
slug: release-0-1-6
order: 9
description: Améliorations de l'éditeur partagé, aide au survol, prise en charge du HUD de la tête du joueur et correctifs de rendu.
product: core
category: Premiers pas
section: getting-started
status: Stable
version: 0.1.6
audience: Créateurs / Opérateurs
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Minecraft 1.20.1 · Forge

## Contrôles d'éditeur partagés

Les icônes document, dossier et enregistrement conservent les mêmes rôles entre les éditeurs. Les deux flèches se déplacent à travers les écrans visités; utilisez l'icône du disque ou Save As pour enregistrer. Continuer avec le [guide actuel](#core/gui-system) pour l'épargner et l'appliquer.

![Contrôles de l'éditeur partagé.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Changé

- Unifié le menu supérieur et l'interface de navigation entre les éditeurs.
- Amélioration de l'interface utilisateur et de la convivialité de l'écran de configuration et de divers éditeurs.
- Amélioration du rendu du modèle d'infobulle des éléments et de la gestion des animations PNJ GeckoLib.

## Ajouté

- Ajout de l'aide hover partagée pour les éditeurs.
- Ajout d'un composant HUD tête de joueur.
- Ajout de la mise en page popup, du recadrage de la fenêtre d'affichage et de la gestion de l'état des demandes de liste JSON.

## Fixe

- Correction des problèmes de rendu, de tampon et de pochoir dans les infobulles du pistolet TaCZ.
- Correction de l'aperçu du modèle PNJ et des problèmes de synchronisation d'animation.
- Correction des problèmes de mise en page, de sélection et d'affichage sur les écrans de l'éditeur.

Mettez à jour le serveur et les clients à ** 0.1.6 **. Reculez `config/dochi_rpg_maker` avant de remplacer le mod JAR.
