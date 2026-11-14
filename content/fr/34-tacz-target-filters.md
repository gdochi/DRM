---
title: Règles cibles
slug: warfare-target-filters
order: 340
description: Limitez les cibles PNJ par identifiant d'entité, faction, étiquette de tableau de bord et règles de position avancées.
product: dochi-warfare
category: Objectifs
section: targets
status: Projet
version: 0.3.3
audience: Rencontres designers
tags:
  - target
  - filter
  - faction
translationSource: en
translationMethod: assisted
---

## Choisir les créatures à attaquer

Recherchez une cible telle que `minecraft:zombie` en haut de **Targets**, puis vérifiez sa rangée. **Type / View / Mods** filtrer le catalogue; **All / None** sélectionner ou effacer les entrées actuellement affichées.

![Cible la liste des entités avec Selected 0 et Tag Conditions ci-dessous.](assets/media/guides/warfare-031-neo1211/dw-targets.png "DW 0.3.1 / NeoForge 1.21.1. Cet exemple n'a aucune sélection explicite. Zéro ne signifie pas attaquer toutes les créatures ; l'hostilité et les règles de tag ci-dessous importent toujours.")

## Pourquoi les cibles ont besoin de soins supplémentaires

Les PNJ d'armes à feu peuvent attaquer de plus loin que la plupart des PNJ de mêlée, de sorte qu'une mauvaise règle de cible est immédiatement visible. Créez des règles cibles par petites étapes : confirmez d'abord que le PNJ peut tirer, puis ajoutez des identifiants d'entité, puis des tags, puis un comportement avancé de faction ou de position.

## Liste de cibles d'ID d'entité

L'onglet `Targets` permet de sélectionner les ID d'entité cible autorisés. La liste comprend la recherche, check-only, unchecked-only, le filtrage de type d'entité et le filtrage d'ID de mod. C'est la façon la plus propre de faire une attaque de garde seulement un groupe spécifique de créatures ou seulement des entités à partir d'un mod spécifique.

| Contrôle | Utilisation |
| --- | --- |
| Rechercher | Identifiants de filtre tels que `minecraft:zombie`. |
| Afficher le filtre | Afficher toutes les entrées, cochées ou décochées. |
| Type filtre | Groupes étroits d'entités vivantes. |
| Mod filtre | Afficher les identifiants d'entité à partir des identifiants mod sélectionnés. |
| Sélectionner tout / aucun | Appliquer à la liste filtrée actuellement visible. |

Une liste d'entités cible vide signifie qu'il n'y a pas de liste stricte d'autorisations d'entités. A géré CustomNPCs shooter scanne toujours afin qu'il puisse hériter authentique CustomNPCs l'hostilité des factions envers les PNJ ou les joueurs. Le candidat doit toujours correspondre à un sélecteur explicite, à l'exception de la balise same-faction ou à une règle de faction hostile réelle; les entités passives et non liées ne deviennent pas des cibles automatiques.

Les recherches de cibles vivantes à longue distance utilisent un index spatial avant d’appliquer des règles d’identifiant d’entité, de balise, de faction, de distance, d’angle et de ligne de visée. En 0.2.9, chaque cible nouvellement découverte doit passer la portée, la ligne de visée et l’angle de conscience configurés, même lorsque le PNJ se bat déjà. Seuls les dégâts valides, l'autodéfense, la détection rapprochée ou les réactions de défense de faction peuvent accorder l'exception documentée; une cible silencieuse derrière le PNJ n'est pas acquise simplement parce que le combat est actif.

## Règles de tag Scoreboard

Les règles de balise utilisent des balises de tableau de bord d'entité :

| Terrain | Comportement |
| --- | --- |
| Balises obligatoires | Si défini, une cible doit avoir au moins une balise requise. |
| Étiquettes rejetées | Si elle est définie, une cible avec une balise rejetée est rejetée. |
| Attaquer la même faction par tag | Permet à la même faction CustomNPCs d'être attaquée lorsqu'une balise requise correspond. |

Les balises sont utiles pour les événements scriptés. Par exemple, un script de donjon peut ajouter une balise `intruder` aux joueurs ou aux PNJ pendant une phase d’alarme, puis la supprimer après la rencontre.

## Factions et position avancée

Les règles de position avancées peuvent utiliser `Always`, la santé des PNJ en dessous d’un ratio, d’une faction cible, d’une balise cible ou d’un identifiant d’entité cible. `Always` et l'état de santé du PNJ peut être évalué sans cible de combat actuelle. Les conditions de faction, de balise et d'entité cible nécessitent une cible vivante, alors ajoutez les ID et les balises nécessaires en `Targets` avant de les utiliser à partir de `Stance Mode: Advanced`.

Le mode avancé supporte une règle conditionnelle active. Cela rend le résultat prévisible. Utilisez le comportement `Default` si le PNJ doit revenir à la normale `General` paramètres lorsque la condition avancée ne correspond pas.

## Charger et Save As profils

Les profils Topbar `Load` et `Save As` sont stockés sous :

```text
config/dochi_warfare/target_entities/
```

Les profils actuels ne sont pas seulement des fichiers d'entités cibles. Ils fonctionnent comme des préréglages de configuration qui connectent la configuration d'une arme à feu DW d'un PNJ à un autre CustomNPCs PNJ. Configurez les armes à feu, l'IA, les cibles, les munitions et les pools sur un PNJ, stockez le profil avec `Save As`, puis `Load` sur un autre PNJ. Le JSON cible uniquement hérité peut toujours être chargé à partir de la racine héritée migrée.

## Exemples pratiques

| Scénario | Règle proposée |
| --- | --- |
| Zombie guard | Sélectionnez des identifiants d'entité de type zombie dans la liste des entités. |
| Phase événementielle | Utilisez la balise requise `phase2_target`, puis retirez la balise lorsque la phase se termine. |
| Même-faction duel | Utilisez les balises requises et activez le ciblage par balise de même-faction uniquement pour les participants à l'événement. |
| Fusil anti-ajout Boss | Autoriser uniquement l'ajout d'identifiants d'entité et exclure les joueurs de la liste. |

## Règles de débogage des cibles

Si le PNJ ne se déclenche pas, retirez temporairement les filtres et testez avec une cible hostile de base. Ajoutez une règle à la fois. La plupart des problèmes cibles proviennent du mélange d'une liste d'autorisations d'entités, des balises requises, des balises rejetées et des règles de même faction avant de confirmer la ligne de base.

Un PNJ en patrouille ne doit pas jeter immédiatement une cible vivante après une perte de vue momentanée. Les PNJ gérés utilisent une mémoire de combat courte et la dernière position connue pour survivre à une brève occlusion. La dernière vérification de la ligne de visée empêche toujours le feu direct à travers un mur pendant cette fenêtre de mémoire.
