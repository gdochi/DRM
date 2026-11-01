---
title: Faire apparaître les modifications enregistrées
slug: data-flow
order: 105
description: Savoir quand enregistrer, appliquer à un PNJ et recharger les fichiers modifiés.
product: core-fabric
category: Référence / Opérations
section: operations
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
tags:
  - data-flow
  - architecture
  - json
translationSource: en
translationMethod: assisted
---

## Une nouvelle conversation ou un nouveau magasin

Utilisez cet ordre : **edit → Save As → Appliquer à un PNJ → Interagir avec les mains vides**.

L'enregistrement crée le fichier. Apply choisit le PNJ qui l'utilise. Si vous avez seulement enregistré, cliquez avec le bouton droit sur le PNJ avec le noyau et sélectionnez le fichier à appliquer.


![Le PNJ applique l'écran après avoir sélectionné une conversation de serveur enregistrée.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide a été sélectionné et associé à Apply Dialogue. Après Save As sous un autre nom, sélectionnez le nouveau fichier ici aussi.")

## Changer quelque chose déjà appliqué

Ouvrez le même fichier, utilisez **Save**, puis interagissez à nouveau avec le PNJ. Si vous avez enregistré sous un nouveau nom, appliquez ce nouveau fichier au PNJ.

Vérifiez également les fichiers liés, tels que l'interface graphique du dialogue ou la devise de la boutique, lors de leur remplacement.

## Après avoir édité un fichier directement

| Contenu édité | Recharger |
| --- | --- |
| Dialogue, magasins et autres lieux ordinaires | `/drm reload` |
| Réglages des devises | `/drm currency reload` |
| Travail sauvegardé dans un éditeur | Fermez et rouvrez l'écran correspondant |

Le multijoueur utilise les fichiers du serveur. La modification de la copie locale ne modifie pas la conversation du serveur.

## Déplacer le travail vers un autre serveur

Les fichiers sont en dessous de `config/dochi_rpg_maker/`. Déplacez tout un dossier de jeu de conversations et incluez des fichiers boutique/GUI liés.

Le placement des PNJ, le stock restant et les contrats de travail vivent également dans le monde. **Keep configuration and the world together** lors du déplacement ou de la restauration d'un serveur entier.

Les paramètres placés PNJ Spawner sont également dans le monde. La seule copie des modèles ne copie pas les paramètres d'un bloc placé.

Voir [dossiers](#core-fabric/paths) pour les emplacements exacts.
