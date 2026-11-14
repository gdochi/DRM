---
title: Pose Editing et Action Mapping
slug: warfare-pose-editor
order: 332
description: Créez des transformations de pose JSON et de pistolet avec DW Pose Core, puis associez-les aux actions PNJ.
product: dochi-warfare
category: Poses
section: combat-ai
status: Projet
version: 0.3.3
audience: Créateurs PNJ
tags:
  - pose
  - editor
  - TACZ
translationSource: en
translationMethod: assisted
---

## Rôles d'éditeur et d'exécution

`DW Pose Core` est un éditeur de pose en mode créatif pour les créateurs, pas un écran de lecteur en combat. Créez la pose JSON dans cet éditeur, puis utilisez la catégorie `Pose` dans `DW Npc Core` pour mapper les profils enregistrés aux actions d'exécution du PNJ.

**Save & Apply** enregistre la pose non-combat par défaut. Combat utilise ses propres poses ; par la suite, le PNJ revient à sa position par défaut.

L'éditeur prend en charge les DNPC des modèles de joueurs et les modèles Steve/Alex CustomNPCs. La capture d'écran ci-dessous utilise une cible réelle DNPC.

## Ouvrir l'éditeur de pose

1. Maintenez `DW Pose Core` en mode Créatif.
2. Cliquez avec le bouton droit sur un modèle de lecteur DNPC ou un PNJ Steve/Alex CustomNPCs.
3. Restez dans les blocs 12 et gardez le noyau dans l'une ou l'autre main pendant l'édition.
4. Modifier la pose en `NPC Pose Editor`.

Les modèles non pris en charge et les cibles distantes ne peuvent pas être modifiés. Commencez avec un modèle de lecteur par défaut DNPC lorsque vous vérifiez le flux de travail.

![Les axes de rotation du corps sur un DNPC sont ouverts avec DW Pose Core.](assets/media/guides/warfare-031-neo1211/dw-pose-editor.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Sélectionnez Corps sur la gauche pour afficher ses axes X/Y/Z. L'animation suit le mouvement existant ; Custom utilise la valeur choisie. Save & Apply enregistre le profil et l'applique à ce PNJ.")

## Aperçu PNJ et parties du corps

L'aperçu du PNJ détaché est une vue du créateur de la peau, de l'armure et de l'état de l'arme de la cible. Faites glisser pour le faire pivoter et utilisez la molette de la souris pour zoomer. En fonction de la pièce sélectionnée et du mode d'édition, le glissement direct de l'aperçu peut ajuster les valeurs de rotation ou les décalages de position. Permettre à `Walking Preview` d'inspecter la façon dont la pose se fond avec le mouvement de marche.

Les parties modifiables sont :

* Tête
* Corps
* bras droit / bras gauche
* Jambe droite / jambe gauche
* Gun Render

Chaque partie du corps expose X, Y et Z rotation avec deux modes d'axe:

| Mode Axe | Signification |
| --- | --- |
| `Animation` | Gardez l'axe calculé par TACZ ou l'animation du joueur. |
| `Custom` | Remplacez cet axe par la valeur du curseur. |

Gardez les jambes de tête et de marche sur `Animation` quand ils devraient continuer à se déplacer. Remplacez seulement les axes nécessaires pour la position personnalisée.

## Gun render transformer

`Gun Render` expose :

| Valeur | Utilisation |
| --- | --- |
| Position X / Y / Z | Position d'affichage du pistolet |
| Pitch / Yaw / Roll | Rotation des canons |
| Échelle X / Y / Z | Échelle de canon par axe |

`All Guns` stocke une transformation de secours pour chaque arme TACZ. `This Gun Only` stocke une transformation distincte pour le canon actuel du PNJ cible TACZ. Une transformation correspondante par arme à feu a la priorité sur le repli toutes armes à feu.

## Créer, charger et enregistrer des poses

| Outil | Comportement |
| --- | --- |
| `New` | Crée une pose vide qui hérite de l'animation. |
| `Use Base Preset` | Applique une pose groupée consultable en tant que brouillon actuel sans charger un fichier JSON. |
| `Load` | Charge une pose sauvegardée JSON. |
| `Save` | Enregistre le nom JSON actuel. |
| `Save As` | Enregistrer sous un nouveau nom. Appuyez à nouveau pour confirmer l'écrasement d'un nom existant. |
| `Save & Apply` | Enregistre le profil et l'applique comme pose de ralenti personnalisée du PNJ actuel. |
| `Reset` | Retourne toutes les modifications non enregistrées au dernier état chargé ou enregistré. |
| Pièce/valeur réinitialisée | Retourne uniquement la partie ou la valeur sélectionnée. |

Les fichiers Pose sont stockés sur le serveur sous :

```text
config/dochi_warfare/poses/
```

Vous n'avez pas besoin d'éditer ce JSON à la main. Sa structure est un matériau de référence pour les créateurs qui utilisent des outils externes ou le contrôle de version.

La bibliothèque intégrée 0.2.9 comprend des poses Low Ready, High Ready et plusieurs poses de combat, de ralenti, de marche et de tir en mouvement. Appliquez-en un, ajustez uniquement les axes nécessaires et la transformation du pistolet, puis utilisez `Save As` pour créer un JSON utilisateur sans modifier les valeurs groupées.

![Poser une carte de catégorie debout, marcher, viser, tirer et recharger.](assets/media/guides/warfare-031-neo1211/dw-pose.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Choisissez Intégré, Hérité ou une autre source pour chaque action, puis sélectionnez la pose sur sa droite.")

## Carte pose à des actions

`DW Npc Core > Pose` ne crée pas de pose. Il mappe les poses intégrées ou enregistrées en actions pour le PNJ actuel.

| Groupe | Actions |
| --- | --- |
| Idle & Conscience | Idle - Standing, Idle - Walking, Alert |
| Combat à distance | Combattre le but, tirer, déplacer le feu |
| Mouvement de combat | Avancée tactique, retraite, recharge |
| Équipement et autres actions | Interrupteur d'arme, prêt pour la mêlée, attaque de mêlée, jet de grenade |

Chaque action utilise une source :

| Source | Signification |
| --- | --- |
| `Built-in` | On utilise `TACZ Default`, `Low Ready`, `High Ready` ou `Aim Ready`. |
| `Inherit` | Utilise la même pose que son action parent liée. |
| `Custom JSON` | Utilise un profil enregistré sous `config/dochi_warfare/poses/`. |

Le mappage par défaut utilise Low Ready pour rester inactif, avec la marche inactive et Alert l'héritant. But de combat, rechargement, changement d'arme, mêlée et grenade par défaut sur le contrôleur DW partagé TACZ. Pendant le rechargement, l'action du haut du corps reste active tandis que le bas du corps continue la marche réelle du PNJ, la course ou l'état accroupi. Commencez par modifier uniquement les actions qui ont vraiment besoin d'un profil personnalisé.

## Débit d ' essai recommandé

1. Créez un profil à partir du modèle Low Ready ou High Ready.
2. Ne changez que les axes du bras et du corps, en laissant la tête et les jambes sur `Animation` lorsque cela est possible.
3. Vérifiez à la fois debout et `Walking Preview`.
4. Alignez le pistolet avec `All Guns`, puis corrigez uniquement les pistolets de forme inhabituelle avec `This Gun Only`.
5. Utilisez `Save & Apply` et vérifiez la pose inactive dans le jeu.
6. Cartographiez une action à la fois en `DW Npc Core > Pose`, puis testez séparément la mise à feu, le rechargement, le mouvement et la commutation au corps à corps.
