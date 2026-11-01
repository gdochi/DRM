---
title: Conversations, boutiques et fichiers enregistrés
slug: npc-core-files
order: 1520
description: Ajoutez d'autres fonctionnalités de mods à DNPC et trouvez votre travail sauvegardé.
product: dochi-npc-core
category: Fichiers PNJ et intégrations
section: operations
status: Guide
version: 0.1.3
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Ajouter des conversations ou des boutiques

Installez **DRM**, cliquez avec le bouton droit sur le DNPC avec le DRM Core, puis choisissez un fichier enregistré dans **NPC Apply**.

![NPC Apply après application village_guide, avec sa liaison Dialogue indiquée sous APPLIED JSON à droite.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "Exemple de DRM 0.3.1  +  DNPC 0.1.2 / NeoForge 1.21.1. Choisissez une fonction à gauche, un fichier au milieu et Appliquer ci-dessous ; vérifiez la liaison résultante à droite.")

Pour le dialogue, utilisez **Dialogue JSON → select file → Apply Dialogue**. Pour une boutique, utilisez **NPC Shop JSON → select file → Apply Shop**. Enregistrer un fichier éditeur et le connecter à ce PNJ sont des étapes distinctes. Rangez le noyau et interagissez ensuite avec le PNJ.

Commencez par [Forge dialogue](#core/quick-start) ou [Fabric/NeoForge dialogue](#core-fabric/quick-start).

## Choisissez un mod pour votre objectif

| Objectif | Mod supplémentaire |
| --- | --- |
| Conversations, magasins et emploi des joueurs | DRM |
| Pokémon Entraîneurs, boutiques, soins et entrées | Cobblemon L'éditeur et ses exigences |
| Faire apparaître les PNJ sauvés dans des conditions choisies | Spawn Control et DRM |
| Motifs de mêlée et batailles de boss | BattleWorks et DRM |
| PNJ et équipages de véhicules | DW / DWE et leurs exigences |
| Armure qui réduit les dégâts entrants | Real Armor |
| Performances instrumentales | Immersive Melodies |

DW/DWE cible Forge 1.20.1 et NeoForge 1.21.1. CustomNPCs n'est pas disponible sur 26.3. Utilisez le guide d'installation de chaque mod pour choisir les fichiers correspondants.

## Trouver du travail sauvegardé

| Contenu | Emplacement |
| --- | --- |
| Modèles PNJ | `config/dochi_npc_core/templates/` |
| Poses | `config/dochi_npc_core/poses/` |
| PNG de peau de serveur | `config/dochi_npc_core/assets/textures/` |
| Paramètres globaux | `config/dochi_npc_core/global.json` |
| Paramètres du client | `config/dochi_npc_core/client-settings.json` |
| DRM Paramètres d'emploi | `config/dochi_rpg_maker/dochi_npc/employment/` |

Les PNJ et les contrats placés sont également sauvegardés dans le monde. Incluez le monde lorsque vous déplacez un serveur.

## Convertissez un autre PNJ en DNPC

Sur 1.20.1 / 1.21.1, ouvrez **Global settings → Experimental features → World scan** et sélectionnez un PNJ. Lisez quelles parties peuvent être converties avant de continuer.

Seuls les contenus pris en charge, tels que l'apparence, l'équipement et les relations, les transferts. Conservez une copie mondiale avant la conversion. La conversion CustomNPCs n'est pas disponible le 26.3.
