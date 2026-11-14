---
title: Déplacer des véhicules et affecter des équipages
slug: expanded-overview
order: 310
description: Mettre en place le mouvement des véhicules DWE, les armes, les conducteurs et les artilleurs.
product: dochi-warfare-expanded
category: Débuter
section: overview
status: Projet
version: 0.3.3
audience: Créateurs et opérateurs de serveurs
translationSource: en
translationMethod: assisted
---

## Quoi installer

DWE ** ajoute les caractéristiques du véhicule à DW **. Déplacez les véhicules supportés SuperbWarfare, utilisez leurs armes et assignez des pilotes / mitrailleur PNJ.

| Poste | Besoins |
| --- | --- |
| Minecraft / chargeur | Forge 1.20.1, NeoForge 1.21.1 ou Fabric 1.21.1 |
| DW et DWE | DWE 0.3.3 et DW compatible sur serveur et clients ; numéros de version identiques non requis |
| SuperbWarfare | Installez la version du bon chargeur. Forge 0.8.9 / 0.8.9.1 / 0.8.9.2 ; NeoForge 0.8.9.1 / 0.8.9.2. Une combinaison Fabric 0.8.9.2 a été exécutée |
| Équipages de PNJ | DNPC ou CustomNPCs |
| DRM | Optionnel |

Les exigences DW TACZ et Player Animator s'appliquent toujours. Voir [Configuration DW](#dochi-warfare/warfare-setup).


Ce guide vise DWE **0.3.3**. DW reste obligatoire ; DWE vérifie les API réellement utilisées au démarrage sans imposer un numéro de version DW identique. Les versions filmées/testées ne constituent pas des minima universels.

**Ouvrir la timeline :** tenez DW Npc Core et faites un clic droit dans l’air sans viser bloc/entité pour ouvrir le sélecteur autonome. Avec DRM, Gimmick Editor est aussi disponible dans la sélection DRM. Suivez le [tutoriel de la nouvelle interface](#dochi-warfare-expanded/expanded-support-timeline).

![Vue d'ensemble ouverte pour un M1A2 réel.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE/DW 0.3.1, SuperbWarfare 0.8.9.1, NeoForge 1.21.1. Utilisez AI, Cibles, Weapons, Gimmicks et Crew sur la gauche ; l'IA activée en haut à droite contrôle l'activation. Cet exemple est OFF.")

## Mettre en place le premier véhicule

1. Placez un véhicule soutenu.
2. Faites un clic droit avec **DW Npc Core**.
3. Activez l'IA du véhicule et choisissez le mouvement, la position à la maison et la plage de fonctionnement.
4. Choisissez des armes et des cibles.
5. Assigner des sièges de conducteur/tireur en **Crew**.
6. Enregistrez, puis vérifiez le mouvement et le tir.

Éteignez le véhicule avant de le conduire vous-même. Les armes disponibles dépendent de ce que ce véhicule a réellement.

## Quoi ajouter ensuite

- Retraite, fumée et démontage au combat: [réactions des véhicules ](#dochi-warfare-expanded/expanded-vehicle-gimmicks)
- Bombardements et renforts : [calendriers de soutien](#dochi-warfare-expanded/expanded-support-timeline)
- Déplacement, cibles et munitions : [IA du véhicule](#dochi-warfare/warfare-vehicle-ai)
- Autres packs de véhicules : [véhicules compatibles](#dochi-warfare-expanded/expanded-compatibility)

## Réutiliser une configuration

**Save As** permet de conserver les réglages pour **Load** sur un autre véhicule. Un **clone** sert à faire apparaître une nouvelle copie du véhicule lui-même.

Les réglages du véhicule sont en `config/dochi_warfare/vehicle_ai/profiles/` ; les délais de prise en charge sont en `config/dochi_warfare/vehicle_ai/gimmicks/`.

Remplacez l'ancien `dochi_warfare_vehicle` JAR plutôt que de le garder à côté de DWE. Les profils plus anciens sont importés tout en conservant leurs originaux.

## Demander un appui avec une radio ou une tablette

En 0.3.3, les joueurs ordinaires peuvent appeler une chronologie créée par un administrateur avec un ordre tactique. [Ordres tactiques](#dochi-warfare-expanded/expanded-tactical-orders) distingue création/distribution et visée du joueur.

Installez la **même build DWE 0.3.3** sur serveur et clients : des builds portant le même numéro peuvent utiliser des messages réseau différents. Mod Menu ouvre les paramètres d’IA de véhicules DWE sur Fabric. Les définitions sont dans **config/dochi_warfare/vehicle_ai/tactical_orders/**.
