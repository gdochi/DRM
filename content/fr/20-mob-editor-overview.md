---
title: Débuter avec BattleWorks
slug: mob-editor-overview
order: 210
description: Un parcours d’apprentissage de l’installation à la première attaque, aux phases de boss et aux effets de particules.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Commencer par une attaque de mêlée lisible

BattleWorks **0.1.7** permet de créer les temps d'attaque, hitboxes, déplacements et phases de boss des PNJ. Choisissez le fichier correspondant : Forge 1.20.1, Fabric / NeoForge 1.21.1 ou les versions séparées Fabric / NeoForge 26.3.

**DRM est facultatif.** Ouvrez les éditeurs avec la BattleWorks Wand et créez des fichiers sans PNJ associé. Un combat réel nécessite un acteur compatible, comme DNPC. CustomNPCs reste facultatif sur les anciennes versions et est exclu à partir de 26.3.

Commencez par [l'édition simple et les recettes](#mob-editor/battleworks-authoring), ou suivez l'exercice détaillé ci-dessous. Un mouvement de bras basique et une hitbox ne nécessitent aucun mod externe de magie ou d'animation.

## Suivez ce parcours d'apprentissage

| Étape | Guide | Vérification de l'achèvement |
| --- | --- | --- |
| 1 | [Installation et préparation des PNJ](#mob-editor/mob-editor-setup) | Ouvrez BattleWorks avec votre PNJ sélectionné. |
| 2 | [Votre première attaque de mêlée](#mob-editor/battleworks-first-attack) | Le PNJ s'approche, se prépare, frappe et récupère. |
| 3 | [Espace de travail et chronologie](#mob-editor/mob-editor-patterns) | Déplacer une action vers un autre tick. |
| 4 | [Hitboxes](#mob-editor/battleworks-hitboxes) | Ajustez les dégâts, la taille et le placement séparément. |
| 5 | [Modèle d'animation](#mob-editor/battleworks-animation) | Aligner le contact avec le mouvement du modèle. |
| 6 | [Cible ](#mob-editor/mob-editor-detection-patrol) et [mouvement ](#mob-editor/battleworks-movement) | Approche et recul sans mouvement conflictuel. |
| 7 | [Sélection et phases](#mob-editor/mob-editor-phases), [passives](#mob-editor/battleworks-passives) | Ajouter de la variété et des réactions de santé. |
| 8 | [Exercice en deux phases](#mob-editor/battleworks-encounters) | Combinez les caractéristiques en une seule rencontre. |

Continuez avec [ compétences et présentation](#mob-editor/battleworks-skills-effects), [Particle Maker](#mob-editor/battleworks-particles) et [actions avancées](#mob-editor/battleworks-advanced-actions) lorsque la rencontre de base fonctionne.

## Où configurer chaque fonction

![Inspecteur Simple edit et chronologie d'attaque.](assets/media/guides/battleworks-017-20261113/simple-edit.png "BattleWorks 0.1.7 / NeoForge 1.21.1 / DRM 0.3.2 / DNPC 0.1.4. Basic Slash par défaut est sélectionné. Cette image montre l'organisation de l'éditeur, pas une création par recette ni des dégâts réels.")

Utilisez **Pattern Workbench** pour la séquence, **Hitbox Library** pour la géométrie des dégâts et **Combat Rules** pour les cibles, phases et l'arène. **Simple edit** regroupe les valeurs courantes ; **Detailed edit** conserve et expose toutes les conditions, événements, déplacements et animations. [Les recettes et My techniques](#mob-editor/battleworks-authoring) offrent des bases réutilisables.

| Tâche | Éditeur |
| --- | --- |
| Nom, santé de base, équipement, relations, butin et réapparition | Éditeur de l'acteur, comme DNPC |
| Apparence et modèle | DNPC Appearance & Model ou fournisseur installé ; DRM NPC Basic pour les modèles DRM |
| Motifs, hitboxes, temps, mouvement et phases | BattleWorks |
| Fichiers d'effets visuels réutilisables | Particle Maker du sélecteur autonome ou de la catégorie Visual de DRM |
| Popups et dialogues DRM | DRM et ses outils popup/GUI |

Les documents importés peuvent activer npcStats et remplacer certains attributs de combat. Vérifiez ces réglages si l'application d'un boss modifie sa santé ou son déplacement.

## 5 termes que vous utiliserez

| Durée | Signification |
| --- | --- |
| Bataille | Un document de combat. Plusieurs PNJ peuvent faire référence au même fichier serveur. |
| Motif | Un mouvement, comme une barre oblique ou une retraite. |
| Stage | Ventilation, action ou récupération à l'intérieur d'un motif. |
| Actions chronométrées / événement | Les actions partagent un temps d'exécution et répètent le calendrier. |
| Hitbox | L'espace testé pour les dommages, écrit séparément de l'arme visible. |

À la vitesse normale du serveur, les ticks **20 sont d'environ une seconde**.

## Souvenez-vous de ces trois règles

1. Visuels et dommages sont séparés. Un effet de particule ou une balançoire de bras ne crée pas de hitbox BattleWorks.
2. Enregistrez le fichier et connectez-le au PNJ. Save As seul ne lie pas le PNJ au nouveau chemin.
3. Tester dans le monde après avoir utilisé la simulation. La répétition montre le mouvement et le placement de la hitbox; elle n'exécute pas de véritable IA, de dommages, de commandes, de sons ou de sorts externes.

Utilisez [troubleshooting](#mob-editor/battleworks-troubleshooting) lorsqu'une étape échoue et [fichiers et échantillons](#mob-editor/battleworks-files) avant d'importer la rencontre de quelqu'un d'autre.
