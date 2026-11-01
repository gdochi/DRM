---
title: Cibler l’acquisition, la poursuite et la confrontation
slug: mob-editor-detection-patrol
order: 250
description: Séparez le ciblage hostile, la poursuite entre les motifs et le mouvement de la scène.
product: mob-editor
section: combat
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

## 1. Choisissez qui acquiert la cible

| Méthode | Réglage | Utilisation |
| --- | --- | --- |
| Utiliser la cible existante du mod PNJ | Scanner sans cible | Utiliser DNPC des cibles d'IA de combat ou CustomNPCs des cibles sur des versions plus anciennes Minecraft |
| BattleWorks analyse de repli | Scanner sans cible | Rechercher des entités vivantes à proximité lorsqu'aucune cible valide n'existe |

L'analyse de repli n'est pas la même chose que DNPC relation ou CustomNPCs filtrage des factions. Testez soigneusement autour des villageois ou d'autres PNJ. Les joueurs créatifs et spectateurs sont exclus.

## 2. Scanner de secours de test en isolation

En **Combat Rules → Combat**, commencez par :

| Réglage | Valeur | Signification |
| --- | --- | --- |
| Scanner sans cible | En | Rechercher lorsqu'aucune cible valide n'existe |
| Plage de balayage cible | 16 | Distance de recherche |
| Sensibilisation FOV | 360 | Rechercher dans toutes les directions horizontales |
| Nécessite une ligne de vue | En | Exclure les entités obscurcies pendant l'analyse |

1. Approche en Survie par l'avant et l'arrière.
2. Réduisez le FOV à 160 et comparez la détection arrière.
3. Testez avec un mur entre le joueur et le PNJ.
4. Désactivez à nouveau la numérisation si vous utilisez des factions CustomNPCs.

La ligne de visée de l'analyse affecte l'acquisition. L'exigence de ligne de mire de Pattern Core affecte le démarrage de ce mouvement.

![Balayage de cible, ligne de visée et poursuite dans Règles de combat →.](assets/media/guides/battleworks-016-neo1211/battleworks-combat.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Numériser sans cible et cible Scan Range trouver une cible. Chase Target et approchent l'approche de contrôle de distance après l'avoir acquise.")

## 3. Configurer la poursuite entre les motifs

| Réglage | Rôle | Valeur de départ de la mêlée |
| --- | --- | --- |
| Supprimer les attaques natives | Réduisez les conflits avec des attaques natives et combattez l'IA | En |
| Chase Target | Naviguer vers la cible entre les motifs | En |
| Visage entre les motifs | Visage pendant les attentes d'engagement et de réutilisation | En |
| Chase Speed Multiplicateur | Multiplicateur de vitesse de navigation | 1.0 |
| Distance d'approche | Espacement souhaité | 2.0 |

L'espacement souhaité peut être serré dans la plage d'une attaque de non-mobilité disponible pour la phase actuelle. Alignez toujours la hitbox réelle, la plage de motifs et le terrain.

Désactiver la suppression native permet à l'IA d'attaque CustomNPCs d'interférer. N'autorisez pas les contrôleurs concurrents à effectuer simplement un mouvement de PNJ stationnaire.

## 4. Les réglages de scène prennent le dessus lors d'un motif

Face Target suit la cible pendant cette étape. Stop Horizontal arrête le mouvement horizontal tout en conservant la physique verticale. Hold est un mouvement stationnaire; Vers, Loin et Orbite sont des mouvements de combat créés.

Une session de mouvement de chronologie dédiée peut conserver le contrôle sur l'arrêt et la poursuite ordinaires de la scène. Voir [Actions de mouvement](#mob-editor/battleworks-movement).

Si le PNJ fait face correctement pendant l'attente mais détourne le regard pendant un coup, inspectez la cible faciale de la scène active. Une attaque intentionnellement à direction fixe devrait conserver son comportement prévu.

## 5. Engagement et réinitialisation du calendrier

| Réglage | Signification | Exemple |
| --- | --- | --- |
| Engage Delay Min / Max | Attendre après avoir acquis une cible avant le premier motif | 10–18 ticks |
| Réessayer Retarder | Attendez avant d'essayer à nouveau sans mouvement admissible | 10 tiques |
| Combat Reset Retard | Intervalle sans cible avant la réinitialisation de l'état de combat | 100 ticks, environ 5 secondes |

Une réinitialisation efface l'état de combat tel que l'historique, les temps de recharge, les phases et l'état passif. Il ne s’agit pas d’une guérison complète ou d’une téléportation automatique vers une position à la maison.

## 6. Si la poursuite fonctionne mais pas les attaques

1. Confirmez la cible prévue.
2. Vérifier le modèle Activé et la plage de phase.
3. Vérifiez la plage horizontale Min/Max.
4. Vérifiez Max Vertical et la ligne de visée.
5. Comparez la distance d'approche avec la hitbox réelle.
6. Inspectez les temps de recharge et répétez les pénalités.
7. Vérifiez la vitesse de déplacement des PNJ, l'IA désactivée et les chemins bloqués.

CustomNPCs possède toujours une configuration normale de ralenti/patrol. Orbit est un mouvement d'attaque autour d'une cible, pas un éditeur de patrouille mondiale.
