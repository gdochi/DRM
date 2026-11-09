---
title: Réactions du véhicule
slug: expanded-vehicle-gimmicks
order: 320
description: Configurer les signaux de tir, les réactions de dommages, la fumée, les démontages et les bombardements.
product: dochi-warfare-expanded
category: Véhicules
section: vehicles
status: Projet
version: 0.3.2
audience: Créateurs de combat
translationSource: en
translationMethod: assisted
---

## Activer une réaction

Activez une entrée dans la liste de gadgets de l'éditeur de véhicule, définissez ses conditions et enregistrez. Toutes les entrées sont désactivées par défaut. Le serveur vérifie le moteur, les armes, le système de fumée et les sièges. `Show all` expose également les paramètres enregistrés non pris en charge, avec la modification désactivée.

| Gimmick | Comportement et conditions |
| --- | --- |
| Coup de feu | Joue lorsque l'attente de tir d'une arme commence; préserve les règles de visée, de munitions et de retard. |
| Hit retraite | Se retire brièvement après une perte réelle de HP suffisante depuis la dernière mise à jour de l'IA; véhicules roue / piste. |
| Fumée d'urgence | Demande de la fumée native sur les dommages, les faibles HP ou le départ en retraite; exclut les fusées éclairantes des avions. |
| Faible santé éclater | Modifie la durée/pause de l'éclatement suivant lorsque le tir d'éclatement de base est activé ; préserve la cadence de tir native. |
| NPC combat démonter | Décharge les passagers de transport sélectionnés avec une cible valide à proximité après 10 ticks stables à basse vitesse. |
| Évasion de faible santé | S'éloigne brièvement de la cible lors d'un épisode de faible santé. |
| Recharger la retraite | Retraites pendant que tout est activé, les armes admissibles à l'équipage se rechargent; se termine lorsqu'une arme utilisable se termine ou que la cible est perdue. |
| Frapper le pas | Se déplace perpendiculairement à la direction de la cible après des dégâts suffisants. |
| Bombardement | Utilise `LEVEL`, `DIVE` ou `CARPET` sur des aéronefs à voilure fixe validés avec des armes de chute libre. |

1. Ouvrez le véhicule avec **DW Npc Core**, puis sélectionnez **Gimmicks** à gauche.
2. Sélectionnez un nom de réaction, configurez ses conditions et sa synchronisation sur la droite et activez son bouton **OFF**.
3. Configurer les signaux de tir par arme sous **Weapons → chosen weapon → Fire wait / Preparation cue**. Une attente de tir zéro ne produit pas de signal.
4. Vérifiez **AI enabled** et le mode de déplacement, puis **Save**. La capture d'écran ci-dessous est l'état initial avec l'IA et les réactions toujours éteintes.

![La liste des Gimmicks M1A2 et les instructions de préparation du tir.](assets/media/guides/warfare-expanded-031-neo1211/dwe-reactions.png "DWE 0.3.1 / base SuperbWarfare M1A2 / NeoForge 1.21.1. Afficher : filtre uniquement les réactions de ce véhicule. OFF est l'état non configuré, pas un effet d'exécution.")

## Santé et calendrier

Pour 500 HP maximum, **2% de perte de santé ** signifie au moins 10 HP réel perdu depuis la mise à jour AI précédente. **25 % de la santé restante** signifie 125 HP ou moins. Les réactions de faible santé nécessitent une récupération au-dessus du seuil de 5 points de pourcentage avant réarmement.

20 est égal à une seconde à 20 TPS. Les munitions fumigènes indigènes et les règles de rechargement s'appliquent en plus du temps de rechargement de la réaction. DWE ne recharge pas la fumée ou n'ajoute pas d'invulnérabilité ou d'effets bloquant les cibles.

## Mouvements et passagers

La priorité de mouvement simultané est hit retreat → hit sidestep → low-health escape → reload retreat. Les réactions utilisent les limites de la maison existante et la navigation sans téléportation. Désactivez le mouvement en `STATIONARY` ou `HOLD` pour bloquer les réactions dans ces modes. Le tir lors d'une réaction respecte toujours les règles normales d'arrêt avant feu, de visée et de sécurité.

Les démontages de combat affectent les passagers de transport existants DNPC ou CustomNPCs sur des véhicules à roues/voies. Les conducteurs, les artilleurs, les sièges d'armes et les joueurs sont exclus. Les sorties dangereuses empêchent le démontage. Il ne crée pas de PNJ ni ne les embarque automatiquement à nouveau ; les enregistrements de complétion par siège/PNJ persistent.

## Bombardement versus appels de soutien

Un gadget de bombardement de véhicule contrôle un avion d'IA existant: `LEVEL` pour les attaques de précision de niveau, `DIVE` pour les attaques de plongée et `CARPET` pour les chutes de zone répétées. Les armes natives, les munitions, le RPM et la physique du vol s'appliquent toujours.

Pour appeler des avions temporaires ou des renforts aux heures prévues, utilisez les [calendrier de soutien](#dochi-warfare-expanded/expanded-support-timeline).
