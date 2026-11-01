---
title: Réactions passives dommages et santé
slug: battleworks-passives
order: 265
description: Créer des réactions en file d'attente et les distinguer des déclencheurs défensifs immédiats.
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

## Commencer par un passif

Les modèles ordinaires sont choisis par le gestionnaire. Un passif demande un motif lorsqu'un événement se produit, comme traverser la moitié de la santé ou recevoir des dégâts de projectile.

Ajoutez un passif à un PNJ dont les attaques ordinaires fonctionnent déjà.

Sélectionnez le motif, puis **Core → Identity → Trigger: Pattern manager**. Ouvrez la liste Déclencheur sur la page **Passive trigger**. **When busy: Wait for completion** est le comportement de la file d'attente; **Queue lifetime** contrôle combien de temps il peut attendre.

## 1. Choisissez un déclencheur en file d'attente de base

Ouvrez le modèle **Core → Passive trigger**.

| Déclencheur | Événement |
| --- | --- |
| Gestionnaire de modèles | Sélection ordinaire notée |
| Seuil de santé | Traverser d'en haut à au-dessous d'un seuil de santé; une observation initiale déjà en dessous est également admissible |
| Dégâts de mêlée | Dommages positifs causés par un attaquant direct vivant |
| Dégâts à distance | Positif projectile / dommages indirects avec un propriétaire vivant |
| Tout dommage | Autres dommages positifs admissibles |

Ces quatre requêtes passives basiques font la queue au lieu d'interrompre la timeline active à l'intérieur du callback des dégâts. Les autres types de réaction immédiate sont décrits séparément ci-dessous.

![Seuil de santé sélectionné sous Core → Déclencheur passif.](assets/media/guides/battleworks-016-neo1211/battleworks-passive-health.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Santé 50%, chance de déclenchement 100%, temps de recharge 100 tiques et durée de vie 200 tiques sont des contrôles distincts. [Passif] distingue ce modèle dans la liste.")

## 2. Annoncer la moitié de la santé une fois

1. Créez un modèle appelé Half-health Warning.
2. Choisissez la santé ci-dessous.
3. Définissez le pourcentage de santé sur 50 et Chance sur 100.
4. Activer une fois par combat.
5. Choisissez File d'attente, File d'attente ticks 200, Trigger Cooldown 100.
6. Configurer Windup 0, Action 20, Récupération 10.
7. Ajouter un Titre à l'Action tick 0, adressé à la cible du joueur.
8. Laissez Combo vide.
9. Enregistrer/appliquer et réduire la santé des PNJ en dessous de la moitié.

Résultat attendu : une fois que le mouvement actuel est terminé et que les conditions le permettent, l'avertissement commence. Rester en dessous de la moitié ne déclenche pas chaque tique.

## 3. Comprendre les contrôles

| Contrôle | Signification |
| --- | --- |
| Chance | Probabilité de demander la réaction |
| Dommages minimaux | Ignorer les coups plus petits que ce seuil |
| Déclenchement de rechargement | Limiter la fréquence à laquelle ce déclencheur peut demander une réaction |
| tiques file d'attente | Durée de vie maximale d'une demande d'attente |
| File d'attente | Attendez quand vous êtes occupé |
| Sauter | Jeter cette demande lorsqu'elle est occupée |
| Une fois par combat | Empêcher un nouveau départ réussi jusqu'à ce que le combat se réinitialise |

Une santé en dessous du seuil doit guérir au-dessus du seuil avant un autre passage vers le bas. Une fois que Par Combat est consommé au démarrage réussi et effacé à la réinitialisation de combat.

## 4. Retraite après un coup de flèche

1. Créez un modèle de dégâts à distance distinct.
2. Dégâts minimaux 1, Chance 100, Temps de rechargement du déclencheur 100, tiques de file d'attente 200.
3. Désactiver une fois par combat.
4. Ecrivez un mouvement 12-tick Away en utilisant l'exercice [movement ](#mob-editor/battleworks-movement).
5. Autorisez les distances auxquelles les flèches vont frapper ; n'héritez pas aveuglément d'un Max Range uniquement en mêlée.
6. Testez la réaction après la fin de l'attaque ordinaire.
7. Seulement ensuite réduire Chance, par exemple à 30%.

Les conditions sont vérifiées à nouveau au début. Une flèche à partir de 12 blocs de distance peut demander un motif dont Max Range 3 l'empêche alors de démarrer.

## 5. Passifs de base multiples

- Au plus huit requêtes attendent par PNJ ; dupliquer les requêtes pour le même motif de fusion.
- La priorité affecte les demandes d'attente et le remplacement lorsqu'il est complet.
- Les transitions de phase ont priorité.
- Démarrage d'un passif de base efface un combo ordinaire en attente.
- Les départs passifs de base ont un écart 40-tick minimum partagé.
- Un mouvement ordinaire admissible obtient un tour après un passif de base.

Utilisez ces règles pour juger pourquoi une réaction sur le coup attend ou est ignorée.

## 6. Les déclencheurs défensifs immédiats sont séparés

0.1.5 implémente également ces types de déclencheurs avancés :

| Type | Condition principale |
| --- | --- |
| hit_count | Nombre de visites dans une fenêtre temporelle |
| damage_sum | Dommages accumulés à l'intérieur d'une fenêtre temporelle |
| Échapper | Dommages entrants admissibles |
| garde | Dommages subis plus un contrôle de l'angle frontal |

Advanced JSON peut définir `interruptActive`, `cancelDamage`, `windowTicks`, `threshold` et des valeurs de hasard/seuil spécifiques à la phase. Un modèle actif sans interruption peut empêcher le remplacement forcé.

Les contrôles de l'éditeur générique n'exposent pas tous les comportements avancés. Ce chemin utilise une gestion des réactions distincte ; ne supposez pas que les règles Once Per Combat, Queue Ticks ou Fairness de la file d'attente de base s'appliquent de la même manière. Testez explicitement l'annulation et l'interruption des dommages réels.

Ces déclencheurs sont différents des [ champs posture/riposte non connectés](#mob-editor/mob-editor-parry).

## Ordre de dépannage

1. Confirmez que le coup n'est pas annulé, nul, invalide ou mortel pour le chemin passif de base.
2. Testez un déclencheur avec Chance 100.
3. Cochez Activé, cible, plage, phase et état de santé.
4. Vérifiez les temps de recharge de la gâchette et du motif.
5. Cochez Ignorer ou file d'attente expirée.
6. Réinitialiser le combat après avoir consommé une fois par combat.
7. Supprimer le combo passif non valide ou les liens de transition.
