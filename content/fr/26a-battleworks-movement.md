---
title: Marchez, tirez, téléportez et déplacez des cibles
slug: battleworks-movement
order: 245
description: Mouvement de l'auteur avec direction claire, durée, annulation et étapes de test en direct.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.6
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Décider ce qui doit bouger

| Intention | Fonctionnalité |
| --- | --- |
| Approche entre les attaques | Chase Target |
| Marcher vers ou loin pendant la préparation | Étape Vers / Loin |
| Se déplacer à un événement spécifique | Mouvement Timeline |
| Tirez le joueur vers le patron | Tirer la cible |
| Déplacer la cible vers les coordonnées du boss local ou mondial | Déplacer la cible relative / absolue |
| Déplacer vers un emplacement précédemment enregistré | [ Positions sauvegardées](#mob-editor/battleworks-advanced-actions) |

## 1. Construisez une courte retraite

1. Ajoutez un motif nommé Short Retreat.
2. Utilisez Min Range 0, Max Range 3 et activez Mobilité.
3. Définir Windup 6, Action 12, Récupération 12 ticks.
4. En Action, désactivez Arrêter Horizontal et choisissez Abandonner à la vitesse 0.08.
5. Gardez la préparation et la récupération en attente.
6. Ne pas ajouter de dégâts au début.
7. Enregistrer / appliquer et confirmer la retraite suivie d'une poursuite renouvelée.

La mobilité indique au gestionnaire comment enregistrer le modèle. Il ne crée pas de mouvement par lui-même.

![La scène d'action sous la scène → Mouvement.](assets/media/guides/battleworks-016-neo1211/battleworks-stage-movement.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Sélectionnez Action au-dessus de la timeline, puis changez la sous-page Stage en Mouvement. Mouvement : Aucun signifie qu’aucun mouvement de scène n’est encore configuré.")

Utilisez **Stage → Movement** pour le mouvement de la scène, ou la chronologie **+ Action → Mouvement de la roulette ** pour une action à une tique particulière. Cela montre le lieu d'édition plutôt qu'une retraite terminée.

## 2. Comprendre les trois actions dédiées au mouvement

| Type | Comportement | Valeurs |
| --- | --- | --- |
| Marcher | Accédez à une destination calculée au début | Multiplicateur de vitesse, distance, délai d'attente |
| Impulse Dash | Appliquer une impulsion de vitesse | Vitesse horizontale, puissance verticale, durée de possession |
| Téléportation | Déplacer après les contrôles de destination | Direction et distance |

Avant/arrière/gauche/droite utiliser le parement initial du PNJ. Utilisez l'emplacement initial de la cible et exigez une cible. Les destinations de marche et les directions d'impulsion ne continuent pas à recibler.

L'étage plus ancien `dash` rafraîchit la vitesse en continu; `impulse_dash` applique une seule impulsion.

## 3. Créer un tableau de bord physique

1. Configurer Windup 12, Action 24, Récupération 16.
2. Ajouter Mouvement à Action tick 0.
3. Sélectionnez Impulse Dash vers la cible.
4. Commencez par la vitesse 0.6, la puissance verticale 0.1, la durée 12.
5. Testez d'abord sans dommages.
6. Add Hold at Action cochez 12 si un arrêt explicite est nécessaire.
7. Ajoutez une Hitbox séparée à la case de contact prévue.

Il s'agit d'un fragment **event**, pas d'un document entier :

```json
{
  "id": "dash_start",
  "at": 0,
  "interval": 0,
  "count": 1,
  "chancePercent": 100,
  "actions": [
    {
      "type": "dochi_battleworks:movement",
      "chancePercent": 100,
      "params": {
        "movementType": "impulse_dash",
        "direction": "toward",
        "speed": 0.6,
        "verticalPower": 0.1,
        "durationTicks": 12
      }
    }
  ]
}
```

La durée est la propriété du contrôle, pas le temps de vol garanti ou la distance de voyage. La gravité, la friction et la collision s’appliquent toujours. Dash lui-même n'a pas de dégâts.

## 4. Évitez les mouvements qui se chevauchent

Un nouveau mouvement dédié remplace la session précédente. Il peut outrepasser l'arrêt et la poursuite ordinaires de la scène, franchir une limite de scène et reporter le modèle suivant tant que la propriété reste. Une action de Hold explicite l'annule.

Répéter un événement de mouvement commence un nouveau mouvement à chaque occurrence. Gardez la durée initiale à l'intérieur de son stade; prolongez-la seulement délibérément.

## 5. Tester la téléportation des PNJ

Commencez par le dos, la distance 3 sur un sol plat chargé. Comparez l'espace ouvert avec un mur, de l'eau et un bord.

NPC Téléport recherche les terrains d'atterrissage et vérifie les conditions de chargement, de frontière, de collision et de liquide. L'échec laisse le PNJ en place.

## 6. Tirer la cible physiquement

1. Ajouter la cible Pull à un motif requis par la cible.
2. Commencez par Force 0.08 et Durée 40 ticks.
3. Testez environ deux secondes de traction.
4. Ajustez progressivement autour de 0.03 – 0.12.
5. Vérifiez les murs, les changements de hauteur et les reculs existants.

La force ajoute de la vélocité à chaque tique; de grandes valeurs accumulent la force rapidement. Tirer ne réécrit pas les coordonnées, et l'élan reste après. Une nouvelle traction remplace l'ancienne session ; les entités invalides, la mort, les changements de dimension ou l'interruption de combat peuvent y mettre fin.

## 7. Déplacer la cible exactement

| Mesures prises | Apports | Origine |
| --- | --- | --- |
| Déplacer la cible relative | Décalage X/Y/Z | Patron pieds et face à l'exécution |
| Déplacer la cible absolue | X/Y/Z | Coordonnées absolues du monde |

Relative X 0, Y 0, Z 3 place les pieds de la cible trois blocs devant le boss. Le positif X est laissé, Y vers le haut, et Z vers l'avant.

Ces actions restent dans la même dimension et nécessitent des destinations chargées, à l’intérieur des frontières, en hauteur et sans collision. Ils ne **non** recherche vers le bas pour le sol. Airborne Y reste dans les airs. Vérifiez `Battleworks target movement rejected` en cas d'échec.

Une relocalisation réussie n'annule pas automatiquement une traction active.

## Commande en direct

Testez le sol plat, les murs, les coins, les escaliers et les changements de hauteur. La répétition au sol plat de la simulation ne valide pas la navigation réelle, la collision ou l'atterrissage.
