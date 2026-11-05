---
title: Conditions de apparition et population Caps
slug: dochi-spawn-control-rules
order: 840
description: Comprendre les conditions mondiales, le calendrier des tentatives, le placement, les limites de population et les champs du cycle de vie.
product: dochi-spawn-control
category: Règles
section: rules
status: Projet
version: 0.1.5
audience: Opérateurs équilibrant les apparition naturels
tags:
  - conditions
  - caps
  - lifecycle
translationSource: en
translationMethod: assisted
---

Cette page décrit les profils **naturel-spawn**. Pour les géniteurs placés, utilisez le [Guide de l'éditeur de pions](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-Fawn `Spawn Chance (0-1)` est séparé des chances relatives dans une liste de cibles de géniteurs.

## Identité

| Terrain | Signification |
| --- | --- |
| `Name` | Étiquette de liste lisible par l'homme |
| `Profile ID` | ID unique utilisé pour le stockage, les diagnostics, les commandes et le suivi des entités |
| `Priority` | Organise l'ordre des règles et les contrôles ; ce n'est pas un remplacement pour le hasard d'apparition |
| `Enabled` | Les profils désactivés sont ignorés par le planificateur |

Les ID de profil doivent être uniques dans un document actif. Le nom d'affichage est descriptif ; l'ID stable est important pour les opérations et le partage.

## Conditions mondiales

Chaque condition applicable doit être acceptée pour un poste de candidat.

| Terrain | Signification |
| --- | --- |
| `Dimensions` | Vide autorise toutes les dimensions ; les ID sélectionnés forment une liste d'autorisations |
| `Biomes` | Correspond à un ID/tag inclus ; une inclusion vide autorise tout. Les exclusions sont prioritaires |
| `Minimum Y` / `Maximum Y` | Plage de hauteur des blocs candidats |
| `Minimum Light` / `Maximum Light` | Gamme de luminosité locale de 0 à 15 |
| `Start Time` / `End Time` | Temps du monde de 0 à 23999; une plage inversée traverse minuit |
| `Minimum Distance` / `Maximum Distance` | Distance du candidat au joueur vivant le plus proche, non spectateur |

Par exemple, `13000` à `23000` est une plage de nuit. `22000` à travers `2000` traverse minuit et permet la fin d'une journée plus le début de la suivante.

Les candidats ne sont recherchés que dans des morceaux déjà chargés. Une coordonnée correspondante en dehors des morceaux chargés ou au-delà de la frontière mondiale est rejetée.

![Dimension, biome, hauteur, lumière et temps dans Rule Inspector.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. Tout pour Dimensions et Biomes supprime ces restrictions. Vérifiez également la distance minimale 24 et le temps 0 – 23999. Une règle désactivée ne s'exécute pas même lorsque les conditions correspondent.")

## Taux de apparition et groupe

| Terrain | Signification |
| --- | --- |
| `Spawn Chance (0-1)` | Rouleau de probabilité à chaque intervalle admissible; `0.25` signifie 25% |
| `Interval Ticks` | Retard avant la prochaine tentative de ce profil ; 20 ticks est d'environ une seconde |
| `Minimum Group` / `Maximum Group` | Nombre d ' entités demandées par une tentative réussie |
| `Spawn Radius` | Rayon de recherche du candidat autour d'un joueur actif sélectionné au hasard |
| `Position Attempts` | Contrôles de candidat maximum utilisés pour trouver un emplacement chargé valide |
| `Placement` | Politique de bloc et fluide pour les postes candidats |

| Placement | Règle du candidat |
| --- | --- |
| `Surface` | Le bloc candidat est vide et le bloc ci-dessous a une surface de collision |
| `Cave` | Le bloc candidat est vide et ne peut pas voir le ciel |
| `Air` | Le bloc candidat et le bloc ci-dessous sont tous deux vides |
| `Water` | Le bloc candidat contient du liquide |

Un risque élevé ou un intervalle court ne peut pas contourner les conditions mondiales ou les limites de population. Les autres membres du groupe effectuent une recherche à moins de cinq blocs du premier candidat retenu.

## Population Caps

Les majuscules comptent les entités marquées et suivies comme générées par Dochi's Spawn Control. Ils ne comptent pas automatiquement les entités natives ordinaires ou les invocations de commandes non gérées.

| Terrain | Portée |
| --- | --- |
| `Profile Cap` | Entités créées par le même ID de profil |
| `Target Cap` | Entités ayant la même clé cible EntityType ou clone |
| `Player Cap` | Entités enregistrées dans le même contexte joueur |
| `Chunk Cap` | Entités gérées dans le bloc candidat |
| `Dimension Cap` | Entités gérées dans la dimension candidat |
| `Server Cap` | Entités gérées dans toutes les dimensions |
| `Shared Group ID` / `Shared Group Cap` | Limite combinée partagée par les profils avec le même identifiant de groupe non vide |

Quand une cible a plusieurs profils, le Cible Cap combine ces profils. Utilisez un groupe partagé lorsque différentes cibles doivent partager une limite de population plus large.

## Cycle de vie

| Terrain | Signification |
| --- | --- |
| `Persistent` | Marque les créatures générées comme nécessaires à la persistance et saute le nettoyage sans joueur |
| `Maximum Lifetime Ticks` | `0` désactive le nettoyage de l'âge; un maximum positif est vérifié même pour les profils persistants |
| `Despawn Without Player` | Démarre le nettoyage lorsqu'aucun joueur ne reste dans la distance maximale |
| `No-player Delay Ticks` | Retard entre la perte des joueurs à proximité et le retrait |

La politique de cycle de vie s'applique uniquement aux entités créées et marquées par ce mod. Il ne nettoie pas les PNJ placés à la main, les PNJ de quête ou les invocations d'administrateur.

## Exemples de référence

### Créature terrestre

- Placement: `Surface`
- Distance minimale: `24`
- Distance maximale: `96`
- Rayon d'apparition: `64`
- Tentatives de position: `8`
- Intervalle: `200` tiques

### Créature aquatique

- Placement: `Water`
- Commencez par de larges gammes de biomes et de Y
- Tester près d'un véritable plan d'eau
- Réduisez la chance et les plafonds aux valeurs de production uniquement après le placement réussi

:::tip Ordre d'équilibrage
Vérifiez d'abord les conditions et le placement du monde, puis accordez la chance et l'intervalle, et ajustez les capuchons en dernier. Cela rend les tentatives échouées plus faciles à diagnostiquer.
:::

## Filtres de structures et escouades

En 0.1.5, Locations and guard squad propose des ID et tags de biomes et structures à inclure ou exclure. Les limites enregistrées des structures déjà générées servent de référence ; le filtre ne reconnaît pas les bâtiments manuels et ne génère pas de structures. Dimension, heure, lumière, distance et plafonds restent applicables.

Une escouade activée utilise les effectifs explicites au lieu de Minimum/Maximum Group, avec 64 entités au total au maximum. Un tirage prépare toute la composition ; chaque membre doit satisfaire espace, conditions et plafonds avant l'ajout du groupe complet. Consultez le [guide des gardes](#dochi-spawn-control/spawn-control-guards) pour la limite par structure et le délai après le retrait du dernier membre.
