---
title: Conditions et effets Spawner
slug: dochi-spawn-control-spawner-settings
order: 845
description: Configurez les déclencheurs placés, les conditions partagées, les capuchons de placement, la destruction, les particules, les sons et les barres de boss.
product: dochi-spawn-control
category: Conditions et effets
section: rules
status: Projet
version: 0.1.5
audience: Créateurs de Spawner
tags:
  - spawner
  - conditions
  - effects
translationSource: en
translationMethod: assisted
---

## Déclencheurs et conditions

Utilisez `Conditions` pour définir le déclencheur et les exigences supplémentaires. Un déclencheur doit encore passer le joueur, le temps, la météo, la redstone et les contrôles de gear-cap.

| Déclencheur | Comportement |
| --- | --- |
| `Interval` | Tentatives répétées en utilisant les intervalles minimum et maximum configurés |
| Entrée du joueur | S'active à l'entrée dans la plage d'activation; partir au-delà de la distance de sortie et revenir peut le réarmer |
| Vague précédente effacée | Tentatives de la prochaine vague après que le géniteur n'ait plus d'entités possédées |
| Heure | Au plus une activation réussie par jour de jeu dans la fenêtre de temps configurée |
| `Redstone Rising Edge` | Tentatives lorsque le signal redstone passe de off à on |

`Initial delay` est l'attente initiale. Les intervalles minimum et maximum contrôlent les tentatives répétées. Les valeurs sont exprimées en ticks; 20 ticks égaux à une seconde à la vitesse normale du serveur.

Vérifiez si les joueurs sont nécessaires, si les joueurs créatifs comptent, le nombre minimum de joueurs et les distances d'activation / sortie. `Shared Conditions` ouvre l'éditeur de condition commune DRM. Les comparaisons de données stockées se réfèrent à CustomNPCs lecteur de script/monde de données stockées, et non à des objectifs de tableau de bord. Chaque joueur compté doit passer le groupe complet de condition partagée.

Le temps utilise `0–23999`. Un début plus grand que la fin s'étend sur minuit. Les conditions météorologiques et l'état de redstone requis peuvent imposer des restrictions supplémentaires.

![Activation du joueur et intervalle dans les conditions.](assets/media/guides/spawn-control-014-neo1211/spawn-conditions.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Require player est activé et Include creative players est désactivé ici. Un auteur créatif à proximité ne compte pas pour l'activation dans cet état. À vitesse normale, 200 ticks est d'environ dix secondes.")

## Comptes et placement

| Réglage | Objet |
| --- | --- |
| `Entities per activation` | Nombre de tentatives par activation, 1–64 |
| `Maximum owned entities` | Cap de la population totale possédée pour ce géniteur |
| `Total spawn limit` | Plafond de création cumulé ; 0 signifie illimité |
| Rayon, portée verticale, Y minimum/maximum | Zone de recherche des candidats |
| Placement | Contrôles de placement du sol, de l'air, de l'eau ou de la lave |
| Tentatives de position par entité | Limite la recherche d'un emplacement valide |
| Biome ou `#tag` | Restriction optionnelle biome/étiquette |
| Source lumineuse et lumière minimale/maximale | Combiné, bloc, ou gamme de lumière du ciel |

Les candidats ne sont vérifiés que dans des morceaux chargés; le générateur ne force pas les morceaux chargés. Les contrôles aux frontières et les contrôles de collision s'appliquent également. L'augmentation du nombre ne peut pas garantir que de nombreuses entités si l'espace ou les bouchons empêchent le apparition. De grandes opérations peuvent être réparties sur le budget de traitement du serveur.

![Limites de propriété et placement dans les paramètres Spawn.](assets/media/guides/spawn-control-014-neo1211/spawn-settings.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Les entités possédées au maximum 6 limitent les entités possédées au maximum; la limite d'apparition totale 0 supprime la limite cumulative. Les grandes entités ont également besoin d'un espace vertical et de collision suffisant.")

## Destruction

Choisissez la récolte ou la destruction basée sur la santé en `Destruction`.

| Mode | Paramètres et résultat |
| --- | --- |
| Récolte | Configurez la dureté et les exigences de l'outil; retirez le géniteur par extraction |
| Santé | Configurez la santé maximale et la hitbox; détruisez-la avec des dégâts d'attaque |

Vous pouvez également choisir si la destruction fait chuter l'élément d'attouchement configuré. Les effets de hit en mode santé ne s'exécutent que lorsque le serveur accepte les dégâts. Les attaques rejetées et les attaques dans le délai de récupération des dégâts ne les rejouent pas.

![Destruction avec Récolte sélectionnée.](assets/media/guides/spawn-control-014-neo1211/spawn-destruction.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Harvest utilise la dureté minière et l'outil requis. Maximum health et Hitbox sont gris parce que la destruction basée sur la santé n'est pas sélectionnée.")

## Frappez les particules et les sons

Dans `Effects`, activez les particules de frappe, choisissez le type de particule enregistré et définissez les particules par frappe. Recherchez la liste des particules enregistrées dans l'instance en cours. Les types qui nécessitent des données supplémentaires ont également besoin de paramètres correspondants.

Les sons de frappe et les sons de coupure ont des commutateurs indépendants. Choisissez un ID sonore et configurez le volume et la hauteur. Les particules et les sons modifiés référencés nécessitent le mod fournissant ces ressources dans l'environnement en cours d'exécution.

![Frappez des particules, frappez le son et détruisez le son dans les effets.](assets/media/guides/spawn-control-014-neo1211/spawn-effects.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Les interrupteurs sont éteints, donc les entrées associées sont grises. La saisie d'un identifiant seul n'active pas l'effet. Activez-le, puis définissez le type et le nombre ou le volume.")

## Spawner boss bar

Activez la barre de patron pour afficher le nom du géniteur et la santé restante, et choisissez sa couleur. Il est montré aux joueurs qui suivent ce géniteur et retiré lorsque le géniteur est détruit ou quitte leur ensemble suivi. Ce n'est pas une barre toujours visible à l'échelle du serveur.

## Référence JSON : trois tirages à partir d'une liste 70 :30

Utilisez l'éditeur pour la création normale. Cet exemple minimal est pour inspecter ou partager des fichiers ; les paramètres omis reçoivent les valeurs par défaut.

```json
{
  "schemaVersion": 1,
  "name": "Mixed encounter",
  "sources": [
    { "kind": "entity", "id": "minecraft:pig", "weight": 70 },
    { "kind": "entity", "id": "minecraft:cow", "weight": 30 }
  ],
  "activation": { "requirePlayer": true, "includeCreative": true },
  "spawn": { "count": 3, "maxOwned": 9, "maxTotal": 0 }
}
```

Enregistrez-le comme `config/dochi_rpg_maker/spawn_control/spawners/examples/mixed.json` et chargez-le dans l'éditeur. Cet exemple de test inclut les joueurs créatifs dans les contrôles d'activation. Appliquez le JSON enregistré à un générateur placé pour l'exécuter.
