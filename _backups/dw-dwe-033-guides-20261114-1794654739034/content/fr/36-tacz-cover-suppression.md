---
title: Couvrir, supprimer le feu et défendre la faction
slug: warfare-cover-suppression
order: 335
description: Configurez les déclencheurs de couverture, le tir suppressif et la surveillance post-incendie, l'assistance des factions, les limites et le comportement de récupération.
product: dochi-warfare
category: Combat AI
section: combat-ai
status: Projet
version: 0.3.1
audience: Rencontres designers
tags:
  - cover
  - suppression
  - faction
translationSource: en
translationMethod: assisted
---

## Trouver la couverture et le feu suppressif

**Cover** contrôle le mouvement vers le terrain de protection. Sélectionnez **Enable Cover**, puis choisissez des déclencheurs tels que **On Reload / On Damage**. Le tir vers la dernière position vue d’une cible est configuré séparément en **Senses → Quick View → Suppressive Fire**.

![Couvrir activer le commutateur, les déclencheurs, le rayon de recherche et le calendrier.](assets/media/guides/warfare-031-neo1211/dw-cover.png "DW 0.3.1 / NeoForge 1.21.1. Enable Cover est désactivé dans cet exemple. Même lorsqu'il est activé, un champ plat ouvert peut ne fournir aucune couverture valide.")

## Où ces paramètres sont édités

Ce sont les paramètres du créateur, pas les écrans du joueur dans le jeu.

* Ouvrez le PNJ avec `DW Npc Core`.
* Configurez `Suppressive Fire` et `Faction Defense` dans les commandes de combat et de détection.
* Configurez la couverture stratégique dans la catégorie `Cover` séparée.

La couverture est expérimentale. Le commutateur de serveur global et le commutateur propre au PNJ doivent tous deux être activés :

```toml
[experimentalCover]
enabled = true
```

```text
Cover > Enable Cover: ON
```

La couverture ne peut commencer que lorsque le PNJ est dans sa phase `COMBAT`. Il ne remplace pas les patrouilles inactives, les mouvements de formation de mercenaires ou l'acquisition d'objectifs ordinaires.

## Couvrir les déclencheurs

Chaque déclencheur est activé indépendamment par PNJ.

| Déclencheur | Quand il peut commencer à se couvrir |
| --- | --- |
| `On Reload` | Un rechargement géré est actif et au moins `Reload Left (ms)` reste. |
| `On Damage` | Un événement de dommage final réel atteint `Damage Ratio` de santé maximale. Un coup invisible peut utiliser son origine de dégâts mémorisée avant qu'une cible visible n'existe. |
| `On Low Health` | La santé passe en dessous de `Low Health Ratio` ; il s’agit d’une réponse seuil plutôt que d’une boucle de couverture permanente. |
| `On Repeated Hits` | Assez de groupes de dégâts se produisent à l'intérieur `Damage Window (ms)`. |
| `On Grenade Threat` | Une grenade à fragmentation tactique LR soutenue à proximité est atterrie, ou une grenade à fragmentation aéroportée a un fusible imminent. |

La fumée et les grenades assourdissantes n'activent pas la couverture de fragmentation. La couverture de grenade utilise l'origine de l'explosion comme direction de la menace tout en préservant la cible de combat actuelle.

## Recherche, mouvement et timing

| Réglage | Utilisation pratique |
| --- | --- |
| `Search Radius` | Rayon horizontal de recherche de couverture. La plage enregistrée est 3-12 blocs et le travail de recherche est borné en interne. |
| `Cover Move Speed` | CustomNPCs vitesse de marche utilisée uniquement en entrant, en jetant un coup d'œil ou en revenant du couvert. |
| `Hold Time (ms)` | Temps de maintien minimal pour les dommages et la couverture à coups répétés. |
| `Low-HP Hold (ms)` | Séparer la prise minimale pour une faible couverture de santé. |
| `Cooldown (ms)` | Retard avant qu'une autre action de couverture puisse commencer. |
| `Max Duration (ms)` | Limite dure pour une action de couverture. |
| `Peek After Cover` | Permet le mouvement vers un côté de tir validé par la géométrie après la tenue. |
| `Max Peek Cycles` | Mouvements maximaux de peek dans une action de couverture, de 0 à 4. |

Une cachette doit protéger à la fois la tête et la poitrine du PNJ. La couverture de tir a également besoin de place pour le tir. Si le lieu choisi ne peut pas être atteint, le PNJ peut essayer un autre chemin.

Le mouvement de couverture ne crée pas un accessoire de munitions séparé. Le rechargement se poursuit à travers la pile native du pistolet opéré plus l'état de rechargement DW. Le haut du corps garde l'action de recharge tandis que le bas du corps suit le mouvement réel.

## Débit d'exécution

Une action normale de couverture suit cette forme :

1. Un déclencheur configuré devient valide pendant le combat.
2. Le serveur recherche un rayon délimité pour une couverture accessible contre la cible actuelle, l'origine des dommages mémorisés, l'état de rechargement / munitions, l'état de suppression ou la menace de grenade.
3. Le PNJ entre en couverture en utilisant `Cover Move Speed`.
4. Il est valable pour le temps minimum du déclencheur pendant que la durée maximale dure continue à s'appliquer.
5. Si l'observation est activée et que la géométrie est valide, le PNJ se déplace vers un côté de tir avec une ligne de visée.
6. Le PNJ retourne au combat ordinaire ou avorte en toute sécurité lorsque la phase se termine, que la route échoue ou que `Max Duration` expire.

La couverture ne garantit pas qu'un point valide existe. Un terrain dégagé, des pièces scellées, une assise dangereuse, un rayon trop petit ou un chemin que le PNJ ne peut pas parcourir peuvent ne pas produire correctement d'action de couverture.

## Réprimer le feu

`Suppressive Fire` est une politique de last-seen-position, pas un suivi de cible cachée.

* Il ne peut fonctionner qu'après que le PNJ ait réellement vu la cible pendant le combat.
* Il tire de vrais coups de fusil à cette dernière position visible.
* Il n'est autorisé que pour `Suppression Time Ms`.
* Il ne met pas à jour son objectif à partir de la position actuelle de la cible cachée.
* Le tir final, le stock de munitions, le mode pistolet, le rechargement et les règles de ligne de tir s'appliquent toujours.

`Post-Fire Watch Ms` contrôle la période de vigilance après la fin du feu suppressif. Pendant ce temps, le PNJ continue de viser le dernier point vu sans tirer ni dépenser de munitions. Réglez-le sur `0` pour désactiver la veille post-incendie.

Commencez par la fenêtre courte par défaut. Une longue fenêtre de suppression peut gaspiller des munitions finies et donner l'impression qu'une cible perdue est toujours suivie.

## Défense de faction

`Faction Defense` permet à un PNJ endommagé géré par DW de diffuser son attaquant à des alliés gérés par la même faction à l’intérieur `Faction Alert Radius`. Le partage vertical est limité, et un allié a encore besoin de la dernière ligne de visée avant de tirer.

Cette assistance n'est pas une dérogation universelle au tir amical:

* Les sélecteurs explicites et les règles de balise s'appliquent toujours.
* Les entités passives ou non liées ne deviennent pas des cibles.
* La protection du propriétaire mercenaire et la tolérance au toucher du propriétaire s'appliquent toujours.
* Les représailles de même faction nécessitent une véritable hostilité ou une courte subvention réactive autorisée par le serveur.

## Ordre de réglage recommandé

1. Confirmez le combat ordinaire `Ranged` ou `Auto` en terrain découvert.
2. Confirmer le mouvement et recharger le comportement sans couverture.
3. Activez un déclencheur, généralement `On Reload`.
4. Gardez `Search Radius` petit et vérifiez qu'il existe un obstacle solide atteignable.
5. Accordez le temps et le temps de recharge.
6. Ajoutez un coup d'œil seulement après que les chemins d'entrée et de sortie fonctionnent.
7. Ajoutez des dégâts, des coups répétés, une mauvaise santé et des déclencheurs de grenade un à la fois.
8. Ajoutez un feu suppressif et une défense de faction en dernier afin que leurs effets soient faciles à distinguer.

Si la couverture échoue, testez d'abord avec un PNJ, une cible, un déclencheur et un simple mur. Cela sépare la géométrie de la couverture des problèmes de cible, de formation, de patrouille et de munitions.
