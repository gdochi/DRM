---
title: HUD Maker
slug: hud-maker
order: 86
description: Comment configurer les ensembles de HUD, les mises en page actives et les composants d'affichage des devises dans HUD Maker.
product: core-fabric
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

Un HUD affiche la santé, la faim ou les équilibres pendant le jeu. Ouvrir **HUD Maker** à partir du DRM Core pour le positionner sur la vue du jeu. Cet écran anglais utilise **DRM 0.3.1 / NeoForge 1.21.1**.

![Composant de santé positionné à X 400, Y 250 et enregistré en tant que guide_hud.](assets/media/guides/drm-031-neo1211/native-hud-health.png "Ajoutez-le avec + Santé sur la gauche, sélectionnez Santé sous Ajouté HUD Tapez, puis faites défiler l’inspecteur approprié pour les paramètres de placement et de composant. Le contour vert marque l'affichage de l'état modifié.")

1. Cliquez sur ** + Santé** à gauche.
2. Sélectionnez **Added HUD Types → Health**. A `*` marque l'élément sélectionné.
3. Faites défiler la **Inspector** jusqu'à **X / Y**. L'exemple utilise **400 / 250** de sorte qu'il est facile de voir près du centre; déplacez-le dans le coin prévu pour un jeu normal.
4. Utilisez **Box ID** pour identifier le composant, puis ajustez la taille, le texte et l’apparence de la barre. Réduire les panneaux d'édition qui se chevauchent avec leurs contrôles `-` pour inspecter le placement.
5. **Save As** un nouvel ensemble tel que `guide_hud`. Vérifiez **Loaded JSON: guide_hud**.
6. Choisissez **Apply**, fermez l'éditeur et vérifiez le HUD dans le mode de jeu prévu et à l'échelle de l'interface graphique.

L'enregistrement conserve les fichiers ; Apply sélectionne l'ensemble à afficher. Utilisez **Unapply** pour arrêter de l'utiliser. Chargez le même ensemble pour continuer à éditer et enregistrer sa mise en page.

![Jeu de survie après le chargement de l'ensemble guide_hud, avec sa barre HP 20/20 et ses cœurs vanille.](assets/media/guides/drm-031-neo1211/hud-loaded-world.png "Un nouveau jeu charge les fichiers enregistrés via l'éditeur. La barre à 400 / 250 et les cœurs de vanille sont tous deux visibles; choisissez le placement final et la visibilité de la vanille séparément.")

## Choisir une devise enregistrée

Enregistrez d'abord la devise en Currency Editor, puis appuyez sur **+ Devise**. Dans **Apply Currency HUD**, confirmez son nom et son ID et appuyez sur **Apply**. Ce flyout's Apply ajoute le composant de devise sélectionné ; la barre d'outils Apply active un ensemble de HUD.

![Ville Coin et son ID town_coin dans le sélecteur de devises HUD.](assets/media/guides/drm-031-neo1211/hud-currency-picker.png "DRM 0.3.1 / NeoForge 1.21.1. La première ligne est le nom d'affichage et la seconde est l'ID de devise. Si + Devise est désactivée, vérifiez d'abord que Currency Editor a enregistré une définition.")

Sélectionnez le **Currency** ajouté, ajustez sa position et sa taille, puis enregistrez le jeu de HUD. Les exemples de solde / modification de l'éditeur ne sont pas une preuve de paiement réel; testez également le solde du joueur et la transaction de la boutique.


## Ajouter d'autres informations

| Bouton gauche | Information |
| --- | --- |
| ** + Monnaie** | Solde d'une monnaie créée en Currency Editor |
| **+ Santé / Alimentation / Armure / Air / Niveau** | Santé du joueur, faim, armure, air et expérience |
| ** + Tête de joueur** | Face du joueur |
| Entrées d'intégration installées | Mana, endurance ou autres valeurs fournies par ce mod |

Pour l'argent, sélectionnez le **même monnaie ID** Créé en [Currency Editor](#core-fabric/currency-editor). L'ajout d'un affichage de solde ne donne pas d'argent.

Les valeurs spécifiques aux mods nécessitent leur fournisseur. **CNPC Tempdata / Storeddata** s'applique uniquement aux environnements pris en charge avec CustomNPCs installé. Minecraft 26.3 et plus tard exclut CustomNPCs; ne pas construire HUDs autour de ces entrées là.

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
