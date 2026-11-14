---
title: Packs de véhicules compatibles
slug: expanded-compatibility
order: 315
description: Vérifiez les véhicules représentatifs pris en charge et les combinaisons conflictuelles connues.
product: dochi-warfare-expanded
category: Configuration
section: overview
status: Guide
version: 0.3.3
audience: Opérateurs / créateurs de serveurs
translationSource: en
translationMethod: assisted
---

## Choisissez un pack véhicule

Dans DWE 0.3.3, vérifiez chaque véhicule et arme. Le tableau conserve les **tests déplacement/tirs/rechargement de DW/DWE 0.3.1** ; il ne prouve pas une prise en charge générale de Fabric. Éditeur/simulation 0.3.2 ont été exécutés séparément sur Forge 1.20.1 et Fabric 1.21.1 ; ce tutoriel est filmé sur NeoForge 1.21.1.

| Pack | Minecraft / chargeur | Véhicules |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Pack de véhicule vintage | Forge 1.20.1 | BMP-2 |
| Pack de combat de première ligne | Forge 1.20.1 | BMP-2 |
| Spectaculaire Machines Addon | Forge 1.20.1 | Type 10 |

Utilisez DWE 0.3.3 avec DW compatible. DW reste obligatoire ; les numéros de version identiques ne sont pas requis. Suivez la [configuration du véhicule](#dochi-warfare-expanded/expanded-overview).

## Combinaisons de problèmes connues

- **SuperbAddon 1.0.1 + SuperbWarfare 0.8.9.2:** Les explosions peuvent s'écraser. L'essai d'explosion SW 0.8.9.1 correspondant a fonctionné.
- **MCSP M1A2:** non inclus dans les véhicules pris en charge par ce guide. Commencez par le Bradley répertorié à la place.

## Changements dans les correctifs actuels

Les équipages DNPC et la protection alliée sont pris en charge, avec des paramètres pour la manipulation des équipages lorsque les véhicules sont détruits. La duplication des munitions et le débordement du chargeur après avoir modifié les paramètres pendant le rechargement ont été corrigés.

Le tir au sol AH-6, la visée à l'arme fixe F-22 et l'escalade excessive près du terrain déchargé ont été corrigés. L'atterrissage automatique n'est pas prévu.

## Vérifiez le véhicule après l'avoir ouvert

Après avoir installé un pack de véhicule, inspectez ses sièges réels et ses rôles en **Crew**. Continuer avec [ IA de véhicule](#dochi-warfare/warfare-vehicle-ai) pour les sources d'embarquement et les besoins de l'équipage par arme.

![La carte des sièges de l'équipage de base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Sélectionnez un numéro de siège pour inspecter son rôle et son occupant à droite. Il s'agit d'une carte de siège vide, pas d'un résultat d'embarquement terminé. C'est le véhicule de base SuperbWarfare, distinct du MCSP M1A2.")

## Packs de véhicules dans les demandes 0.3.3

Les listes de renforts, mitraillage et bombardement utilisent les données installées sur le serveur et les capacités réelles des armes. Un nom de pack ne garantit pas tous ses véhicules ou armes. Revérifiez arme/charge après un changement d’aéronef.

Avec AshVehicle installé, un appui compatible **B-2 / GBU-57** peut être configuré. AshVehicle n’est pas requis pour tous les utilisateurs DWE. DWE actuel inclut la compatibilité client à l’entrée dans les mondes combinant SuperbWarfare et AshVehicle. Le tableau historique 0.3.1 ne prouve ni des tests B-2 ni une compatibilité générale Fabric.
