---
title: Rencontre, Chase et Comportement de revanche
slug: cobblemon-encounters-rematches
order: 521
description: Suivez l'interaction, la vision, le rayon, la poursuite, le positionnement, le temps de recharge et la progression des rounds dans l'ordre d'exécution du serveur.
product: drm-cobblemon-editor
category: Cobblemon Éditeur
section: trainer
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Les créateurs construisent des rencontres automatiques et des entraîneurs de match revanche
tags:
  - encounter
  - chase
  - rematch
translationSource: en
translationMethod: assisted
---

## Trouver des déclencheurs et des rematchs

Choisissez le déclencheur de combat sous **Battle Config → Encounter**. L'exemple **Trigger: Interaction** commence lorsque le joueur interagit. Pour la détection automatique, changez Déclenchez et examinez la vue, la distance et la poursuite ensemble.

![Rencontrez le déclencheur, la vue, la poursuite et le positionnement de combat.](assets/media/guides/cobble-029-neo1211/cobble-encounter.png "0.2.9 / NeoForge 1.21.1. La distance de début de bataille et la distance de vision sont des paramètres différents. Configurer les matchs revanches dans Rounds →")

## Évaluation des déclencheurs

| Déclencheur | Vérification du serveur | Utilisation typique |
| --- | --- | --- |
| `Interaction` | Main-main vide-clic droit | Tests de base et défis lancés par les joueurs |
| `Vision` | Distance, demi-angle face au PNJ et ligne de visée optionnelle | Entraîneurs qui remarquent et approchent un joueur visible |
| `Radius` | Distance autour du PNJ | Acquisition indépendante de la direction; l'angle de visée et la ligne de visée ne sont pas utilisés |

Vision et Radius rejettent les joueurs Créatifs ou Spectateurs, les joueurs morts ou enlevés, les joueurs déjà au combat, les joueurs réservés ou poursuivis par une autre rencontre, et les joueurs bloqués par la progression, le temps de recharge ou les conditions actuelles. Si plusieurs joueurs valides se qualifient, le plus proche est sélectionné.

## Plages et coût de numérisation

| Réglage | Plage | Signification |
| --- | ---: | --- |
| Intervalle de détection | 5–200 ticks | Intervalle de balayage de la nouvelle cible. Les valeurs inférieures réagissent plus rapidement mais coûtent plus cher avec de nombreux entraîneurs. |
| Distance de vision | 1–64 blocs | Plage de vision maximale |
| Demi-angle de vision | 5–180 degrés | Angle autorisé de chaque côté de la direction avant du PNJ |
| Rayon de détection | 1–64 blocs | Rayon de déclenchement |
| Ligne de vue | Marche/arrêt | Nécessite le PNJ pour voir le lecteur en mode Vision |

Après l'acquisition d'une cible, le PNJ retarde une autre tentative d'acquisition d'au moins 40 ticks ou l'intervalle de balayage configuré, selon la plus longue des deux.

## Rétroaction de détection

La rétroaction de détection s'exécute une fois pour Vision ou Radius, jamais pour Interaction.

| Terrain | Portée ou comportement |
| --- | --- |
| Texte du marqueur | Jusqu'à 32 caractères; sauts de ligne supprimés |
| tiques de réaction | 1–200 ticks avant la poursuite ou le démarrage immédiat de la bataille |
| Couleur du marqueur | `#RRGGBB` ou `#AARRGGBB` |
| Échelle | 0.25–4.0 |
| Y Offset | 0–3 blocs |
| Distance d'affichage | 4–256 blocs |
| Hold Ticks | 0–600 ticks après la libération cible |
| Volume sonore / Pitch | 0–4 / 0.05–4 |

Le PNJ attend à travers les tiques de réaction. Il commence alors immédiatement si Chase est désactivé, ou les transitions à chasser lorsqu'il est activé.

## Fin de la chasse

| Réglage | Plage | Comportement |
| --- | ---: | --- |
| Vitesse de marche | 0–100 | CustomNPCs échelle de vitesse de marche; le multiplicateur de navigation est `Walking Speed ÷ 5` |
| Distance d'arrêt | 0.5–8 blocs | Le démarrage de la bataille est tenté dans cette distance cible |
| Distance max. | Au moins Stop Distance, jusqu'à 96 | Distance maximale autorisée entre les PNJ et les positions actuelles du joueur cible, recalculée à chaque tick du serveur |
| Durée | 10–1200 ticks | Temps de poursuite maximum |
| Retour à la page d'accueil | Marche/arrêt | Retourne au point d'origine capturé après une panne ou une annulation |

La déconnexion, la mort, une autre bataille, les changements de réservation, le délai d'attente et la distance actuelle du joueur PNJ dépassant la distance maximale terminent tous la poursuite. La navigation de retour se termine à l'arrivée ou par un délai de sécurité interne 1200-tick.

Le point de départ capturé est utilisé uniquement pour le retour à la maison et le positionnement de combat. Il n'est pas utilisé pour la vérification de distance maximale.

## Positionnement et verrouillage PNJ

`Battle Positioning` capture le point d'origine du PNJ et place le lecteur 1–16 à distance avant la lecture de la présentation.

1. Capturez la position et l'orientation à la maison des PNJ.
2. Alignez le PNJ et le joueur.
3. Envoyez la présentation au client.
4. Revérifier les conditions après la présentation et le délai de début de round.
5. Cacher et réserver le PNJ pendant que Cobblemon est propriétaire de la bataille.
6. Restaurer la position, la visibilité et verrouiller l'état en cas de victoire, de perte, de fuite ou d'échec de démarrage.

Une présentation qui joue sans bataille suivante peut donc indiquer un état de cible non valide, une vérification de condition échouée ou un échec de création d'équipe.

## Règles du niveau de combat

| Mode | Comportement |
| --- | --- |
| `Keep` | Utilise les niveaux d'auteur. |
| `Fixed` | Définit le côté entraîneur, ou les deux côtés de la bataille, à un niveau de 1–100. |
| `Match player party average` | Cible la moyenne de l'équipe actuelle du joueur plus un décalage de -99 à 99 tout en préservant les écarts de niveau de l'équipe d'entraîneurs lorsque cela est possible. |

Les niveaux corrigés et appariés n'affectent que les copies de combat. Ils ne changent pas de façon permanente le Pokémon du joueur. Les paramètres fixes se chargent avec les deux côtés sélectionnés pour préserver leur comportement précédent.

## Rematches et sélection des rondes

Le premier défi utilise toujours rond 1. `Start Round` et `Round Mode` ne s’applique qu’après la première victoire.

| Réglage | Comportement |
| --- | --- |
| Rematch Off | Un joueur qui a gagné une fois ne peut pas défier à nouveau; la perte et la fuite n'augmentent pas le compte clair |
| Max Rematches `0` | Pas de match nul |
| Max Rematches `3` | Jusqu'à trois clears supplémentaires après la première victoire |
| Max Rematches `-1` | Illimité |
| `Fixed` | Chaque match revanche utilise Start Round |
| `Continue` | Avance de la ronde de départ et reste à la ronde finale |
| `Loop` | Cycles du tour de départ au tour final |

Avec quatre tours et le tour de départ 2, le premier défi est rond 1. `Continue` puis utilise 2→3→4→4; `Loop` Utilisations 2→3→4→2.

## Temps de recharge

Le temps de recharge accepte 0 ticks à travers une journée (1,728,000 ticks).

- `Player` stocke un temps de recharge PNJ/joueur séparé, afin que les autres joueurs puissent défier immédiatement.
- `NPC` partage le temps de recharge entre tous ceux qui utilisent ce PNJ.

Effacer le nombre, le temps de recharge et l'état récompensé-round persistent côté serveur. Les tests répétés sur un compte peuvent réutiliser l'ancien état même après les changements du document.
