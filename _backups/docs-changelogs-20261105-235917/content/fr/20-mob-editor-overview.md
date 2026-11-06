---
title: Débuter avec BattleWorks
slug: mob-editor-overview
order: 210
description: Un parcours d’apprentissage de l’installation à la première attaque, aux phases de boss et aux effets de particules.
product: mob-editor
section: start
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

## Commencez par une attaque de mêlée lisible

BattleWorks **0.1.6** est DRMaddon de combat PNJ pour Forge 1.20.1, Fabric / NeoForge 1.21.1 et séparés 26.3 Builds. Auteur combat timing, hitboxes, le mouvement et les phases.

Les exercices ci-dessous utilisent **Forge 1.20.1 and CustomNPCs**. Vérifiez [0.1.6 les limites d'installation](#mob-editor/battleworks-update-0-1-6) pour les autres chargeurs et 26.3 DNPC.

Commencez par une attaque de mêlée lente sur un PNJ humanoïde normal ; les mods optionnels de sort et d'animation ne sont pas nécessaires pour le premier exercice.

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

## Où chaque paramètre appartient

![BattleWorks Atelier de patterns avec des patterns à gauche, Windup/Action/Recovery au milieu et propriétés de pattern/stade sélectionnées à droite.](assets/media/guides/battleworks-016-neo1211/workbench.png "L'exemple par défaut de Basic Slash dans BattleWorks 0.1.6 sur NeoForge 1.21.1. Sélectionnez un motif à gauche, une scène au milieu, puis modifiez ses propriétés à droite.")

Utilisez **Pattern Workbench** pour la séquence d'attaque, **Hitbox Library** pour la forme qui inflige des dégâts, et **Combat Rules** pour la poursuite et la sélection du motif. Pour construire une première attaque en répondant aux questions, commencez par **Create New → Pattern Build Assist**. L'assistant est désactivé après le chargement d'un exemple existant.

| Tâche | Editeur |
| --- | --- |
| Santé des PNJ, équipement, factions, gouttes, réapparition | CustomNPCs |
| Modèles, textures, ressources d'animation et mappages comportementaux | DRM NPC Basic |
| Patterns, hitboxes, timing de combat, mouvement, phases | BattleWorks |
| Fichiers de particules visuelles réutilisables | Visuel → Fabricant de particules |
| Popup apparence et présentation de dialogue | DRM Popup Maker et son interface graphique |

Les documents importés avancés peuvent également permettre à `npcStats` de remplacer les attributs de combat sélectionnés. Les exercices pour débutants laissent cette fonctionnalité désactivée et préparent les statistiques de base en CustomNPCs.

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
