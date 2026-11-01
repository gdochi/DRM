---
title: HUD Maker
slug: hud-maker
order: 86
description: Comment configurer les ensembles de HUD, les mises en page actives et les composants d'affichage des devises dans HUD Maker.
product: core
category: Systèmes centraux
section: hud-maker
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
tags:
  - hud
  - editor
translationSource: en
translationMethod: assisted
---

## Placez une barre de santé sur l'écran

Un HUD affiche la santé, la faim ou les équilibres pendant le jeu. Ouvrir **HUD Maker** à partir du DRM Core pour le positionner sur la vue du jeu. Cet écran anglais utilise **DRM 0.3.1 / Forge 1.20.1**.

![Composant de santé positionné à X 400, Y 250 et enregistré en tant que guide_hud.](assets/media/guides/drm-031-forge1201/forge-hud-health.png "Ajoutez-le avec + Santé sur la gauche, sélectionnez Santé sous Ajouté HUD Tapez, puis faites défiler l’inspecteur approprié pour les paramètres de placement et de composant. Le contour vert marque l'affichage de l'état modifié.")

1. Cliquez sur ** + Santé** à gauche.
2. Sélectionnez **Added HUD Types → Health**. A `*` marque l'élément sélectionné.
3. Faites défiler la **Inspector** jusqu'à **X / Y**. L'exemple utilise **400 / 250** de sorte qu'il est facile de voir près du centre; déplacez-le dans le coin prévu pour un jeu normal.
4. Utilisez **Box ID** pour identifier le composant, puis ajustez la taille, le texte et l’apparence de la barre. Réduire les panneaux d'édition qui se chevauchent avec leurs contrôles `-` pour inspecter le placement.
5. **Save As** un nouvel ensemble tel que `guide_hud`. Vérifiez **Loaded JSON: guide_hud**.
6. Choisissez **Apply**, fermez l'éditeur et vérifiez le HUD dans le mode de jeu prévu et à l'échelle de l'interface graphique.

L'enregistrement conserve les fichiers ; Apply sélectionne l'ensemble à afficher. Utilisez **Unapply** pour arrêter de l'utiliser. Chargez le même ensemble pour continuer à éditer et enregistrer sa mise en page.


## Si Apply signale une erreur

La construction actuelle Forge 0.3.1 a été observée pour signaler `JSON save failed: too many requests` après **Apply**. L'ensemble peut être enregistré sans être activé. **Applying HUD Set** seul ne confirme pas le succès ; vérifiez la sortie d'erreur et l'affichage réel du gameplay. La capture d'écran ci-dessus documente la mise en page de sauvegarde.

## Ajouter d'autres informations

| Bouton gauche | Information |
| --- | --- |
| ** + Monnaie** | Solde d'une monnaie créée en Currency Editor |
| **+ Santé / Alimentation / Armure / Air / Niveau** | Santé du joueur, faim, armure, air et expérience |
| ** + Tête de joueur** | Face du joueur |
| Entrées d'intégration installées | Mana, endurance ou autres valeurs fournies par ce mod |

Pour l'argent, sélectionnez le **même monnaie ID** Créé en [Currency Editor](#core/currency-editor). L'ajout d'un affichage de solde ne donne pas d'argent.

Les valeurs spécifiques aux mods nécessitent leur fournisseur. **CNPC Tempdata / Storeddata** s'applique uniquement aux environnements pris en charge avec CustomNPCs installé. Minecraft 26.3 et plus tard exclut CustomNPCs; ne pas construire HUDs autour de ces entrées là.

![Vanille HUD Guide étendu pour afficher les commutateurs d'affichage par défaut.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. Utilisez ces commutateurs visibles pour masquer les cœurs de vanille ou d'autres affichages par défaut. Ajouter un nouvel écran DRM avec + Santé sur la gauche.")

## Vérifier l'éditeur et la lecture normale

La stratégie d'affichage en mode créatif peut masquer des informations de survie telles que la santé et la faim. Vérifiez **Render survival HUD** dans l'éditeur et le mode de jeu réel, puis testez dans l'environnement de survie destiné aux joueurs.

Si la barre DRM chevauche les cœurs de vanille, masquez l’affichage par défaut correspondant dans l’inspecteur **Vanilla HUD Guide**. Cacher un élément vanille ne crée pas son remplacement.

| Symptôme | Vérifier |
| --- | --- |
| Le HUD est absent | Noms de jeu enregistrés et appliqués, composants activés |
| Visible uniquement lors de l'édition | Vérifiez l'ensemble enregistré/appliqué et reconnectez-vous. Si toujours absent, vérifiez le mode de jeu, les conditions de visibilité et la superposition de débogage F3. |
| Mauvais placement | X/Y, ancre, taille d'écran et échelle d'interface graphique |
| Le solde reste inchangé | Identifiant de devise et solde réel du joueur |
| Autres mod HUD se chevauchent | Paramètres de visibilité de chaque mod et placement des composants DRM |

## Gardez l'ensemble complet

Les séries sont en dessous de `config/dochi_rpg_maker/hud/sets/<set name>/`. Ce `guide_hud` exemple crée **hud_set.json** et **components/hp/hp.json**. Conservez l'ensemble du dossier plutôt que de déplacer uniquement son composant santé. `hud/active_set.json` enregistre l'ensemble sélectionné.
