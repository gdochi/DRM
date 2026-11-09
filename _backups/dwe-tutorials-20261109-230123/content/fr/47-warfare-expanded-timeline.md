---
title: Calendrier des bombardements et du soutien
slug: expanded-support-timeline
order: 330
description: Planifiez les bombardements, le soutien des armes à feu, les renforts de véhicules et le mouvement des PNJ ensemble.
product: dochi-warfare-expanded
category: Soutien au combat
section: support
status: Projet
version: 0.3.1
audience: Créateurs et opérateurs de cartes
translationSource: en
translationMethod: assisted
---

## Créer un timeline

1. Ouvrez l'éditeur de gimmicks à partir de la sélection de l'éditeur.
2. Choisissez `Create New` pour un document vide ou `Use Default` pour un brouillon de bombardement à votre position.
3. Définissez l'origine et ajoutez des types d'action à la chronologie.
4. Configurez la coche, les coordonnées, l'unité de support et la durée de vie de chaque action.
5. Nommez et enregistrez le fichier avec `Save As`.
6. Utilisez l'action run-at-my-position pour appeler la mise en page enregistrée par rapport à votre position.

Enregistrez d'abord les modifications en attente. Si un autre utilisateur a modifié le fichier, actualisez-le avant de l'exécuter. L'aperçu de l'éditeur affiche la mise en page créée; tester la navigation réelle et les coups dans le terrain prévu.

| Mesures prises | Paramètres et résultat |
| --- | --- |
| Bombardement | Avion, bombe, cible, cap, altitude, forme d'attaque et intervalle; utilise des armes natives en chute libre. |
| Support du véhicule | Véhicule, nombre, départ/destination, espacement, faction et rayon de garde ; se déplace pour défendre la destination. |
| Support d'arme | Mode air/sol, arme réelle du véhicule, approche, couloir de tir, durée et casquette. |
| Mouvement PNJ | Les spawns sélectionnent des clones de NPC DW ou dirigent temporairement des NPC DW existants dans une zone. |

Le serveur fournit des armes à feu éligibles. Les bombes, les roquettes, les missiles et les canons principaux à basse vitesse sont exclus. Attaques et sorties de soutien aérien; le soutien au sol balaie un couloir avec sa tourelle. Les tours natifs, les munitions, la chaleur, le rechargement et les contrôles de sécurité restent actifs.

Choisissez les clones PNJ dans la bibliothèque DW. La sélection de zone nécessite CustomNPCs avec l'IA DW activée et exclut les PNJ de circonscription, embauchés ou déjà dirigés. Les combats existants ont la priorité avant que le mouvement ne reprenne. Il n'y a pas de repli de téléportation. Les factions utilisent des identifiants numériques ; les références de fichiers clones diffèrent des noms d'affichage.

![Gimmick Editor avec étapes, vue de dessus, paramètres et timeline.](assets/media/guides/warfare-expanded-031-neo1211/dwe-gimmick.png "DWE 0.3.1 / NeoForge 1.21.1. Le brouillon par défaut utilise A-10A, MK-82 et Point, avec la première baisse à la case 20. Faites correspondre l'entrée, la cible et la sortie à la timeline avant de courir.")

## Moment et origine

20 est égal à une seconde à 20 TPS. Le tick d'une action de bombardement est le ** premier largage de bombe**, pas l'impact. Les tiques de support de véhicule, de pistolet et de PNJ commencent à apparaître ou à se déplacer. La durée de support des armes à feu commence à l'entrée dans la portée des armes; l'expiration de la sortie ou de la durée de vie peut y mettre fin plus tôt.

`lifetime_ticks` Limite le support temporaire. Les PNJ générés sont supprimés à l'expiration ; les PNJ sélectionnés par zone récupèrent leurs paramètres de mouvement précédents sans écraser les modifications effectuées pendant l'exécution. Les véhicules de soutien temporaire ne peuvent pas être embarqués, clonés ou capturés dans des pierres d'âme.

## Commandes d'opérateur

Le niveau de permission 2 est requis. Sauvez `my_support` d'abord et omettez `.json` de son nom de commande.

```text
/dw callgimmicks my_support
/dw callgimmicks my_support ~ ~ ~
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

Sans coordonnées, la mise en page enregistrée s'exécute en place. Avec les coordonnées, les cibles, les départs et les destinations décalés de la différence par rapport à la valeur enregistrée `origin`. Le dernier exemple libère sa première bombe après 10 ticks. Vérifier les identifiants des aéronefs/charges utiles installés avec l'achèvement de la commande. La commande one-shot supporte les points et `area`; author line layouts dans l'éditeur/JSON.

## Fichiers et référence JSON

Fichiers en direct à `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`. Les exemples intégrés s'installent uniquement lorsqu'ils sont manquants, en préservant les fichiers utilisateur.

Le schéma actuel est `dochi.warfare.gimmicks.v6` ; v1–v5 reste lisible. `origin` définit l'ancre de mise en page, `steps` contient des actions et `at_tick` les planifie. Chaque étape contient un des `bombard`, `vehicle_support`, `fire_support`, ou `npc_move`. Commencez à partir de fichiers générés par l'éditeur lors de l'édition de JSON.

Les champs de bombardement `explosion_damage` et `direct_damage` sont des valeurs de base des dommages de HP. Zéro désactive ce composant d'endommagement ; une valeur d'éditeur vide conserve la valeur d'arme native. Les retombées natives et l'armure affectent toujours les dégâts réels. Ces champs ne changent pas le rayon d'explosion ou la destruction du terrain.
