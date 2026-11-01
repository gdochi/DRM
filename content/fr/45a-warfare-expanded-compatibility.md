---
title: Packs de véhicules compatibles
slug: expanded-compatibility
order: 315
description: Vérifiez les véhicules représentatifs pris en charge et les combinaisons conflictuelles connues.
product: dochi-warfare-expanded
category: Configuration
section: overview
status: Guide
version: 0.3.1
audience: Opérateurs / créateurs de serveurs
translationSource: en
translationMethod: assisted
---

## Choisissez un pack véhicule

Les véhicules suivants ont été vérifiés avec les équipages des PNJ pour le mouvement, le tir et les rechargements en DW/DWE 0.3.1. Les véhicules non répertoriés et les armes spéciales dans le même pack doivent être vérifiés séparément.

| Pack | Minecraft / chargeur | Véhicules |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehicles | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Pack de véhicule vintage | Forge 1.20.1 | BMP-2 |
| Pack de combat de première ligne | Forge 1.20.1 | BMP-2 |
| Spectaculaire Machines Addon | Forge 1.20.1 | Type 10 |

Utilisez les patchs 0.3.1 actuels de DW et DWE ensemble. Suivre [configuration du véhicule](#dochi-warfare-expanded/expanded-overview) pour assigner des chauffeurs, des artilleurs et des munitions.

## Combinaisons de problèmes connues

- **SuperbAddon 1.0.1 + SuperbWarfare 0.8.9.2:** Les explosions peuvent s'écraser. L'essai d'explosion SW 0.8.9.1 correspondant a fonctionné.
- **MCSP M1A2:** non inclus dans les véhicules pris en charge par ce guide. Commencez par le Bradley répertorié à la place.

## Changements dans les correctifs actuels

Les équipages DNPC et la protection alliée sont pris en charge, avec des paramètres pour la manipulation des équipages lorsque les véhicules sont détruits. La duplication des munitions et le débordement du chargeur après avoir modifié les paramètres pendant le rechargement ont été corrigés.

Le tir au sol AH-6, la visée à l'arme fixe F-22 et l'escalade excessive près du terrain déchargé ont été corrigés. L'atterrissage automatique n'est pas prévu.

## Vérifiez le véhicule après l'avoir ouvert

Après avoir installé un pack de véhicule, inspectez ses sièges réels et ses rôles en **Crew**. Continuer avec [ IA de véhicule](#dochi-warfare/warfare-vehicle-ai) pour les sources d'embarquement et les besoins de l'équipage par arme.

![La carte des sièges de l'équipage de base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Sélectionnez un numéro de siège pour inspecter son rôle et son occupant à droite. Il s'agit d'une carte de siège vide, pas d'un résultat d'embarquement terminé. C'est le véhicule de base SuperbWarfare, distinct du MCSP M1A2.")
