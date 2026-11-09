---
title: Convertir les dresseurs RCT en DNPC
slug: cobblemon-rct-conversion
order: 582
product: drm-cobblemon-editor
section: trainer
category: Trainer Conversion
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Choisissez l'IA RCT ou DRM et distinguez création, remplacement et export.
translationSource: en
translationMethod: assisted
---

## Que fait la conversion ?
Cobblemon Editor 0.2.9 lit les données actives de **Radical Cobblemon Trainers** du serveur et les convertit en dresseurs DNPC ou profils modifiables. RCT reste facultatif pour les dresseurs ordinaires. Conserver son IA exige une RCT API compatible ; créer ou remplacer des entités DNPC exige aussi DNPC.

## Ouvrir la conversion
1. Ouvrez **Add-on → Cobblemon Editor** dans DRM.
2. Cliquez sur **Port Radical Trainers** pour ouvrir **Radical Trainer Porting**.
3. Recherchez par nom ou identifiant et cochez les dresseurs. La liste utilise les datapacks actifs du serveur et propose des pages.
4. Choisissez **Battle AI** et **Conversion target** avant de convertir. Commencez par un dresseur pour comparer le résultat.

## Choisir l'IA
| Choix | Résultat |
| --- | --- |
| **Keep original RCT AI** | Conserve l'IA, le sac d'objets et les règles RCT d'origine. Choix par défaut. |
| **Convert to DRM AI** | Utilise l'équipe et les objets importés avec les décisions et politiques DRM. |

Le comportement RCT conservé est distinct des politiques d'objets et mécaniques de DRM Strategy. Consultez [IA et objets](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items).

## Choisir création, remplacement ou fichiers
| **Conversion target** | Usage |
| --- | --- |
| **Create DNPC trainers** | Crée des DNPC proches avec les skins par défaut, jusqu'à 64 par opération. |
| **Replace matching RCT NPCs within 64 blocks** | Remplace les PNJ RCT à moins de 64 blocs dont l'identifiant correspond. Ignore ceux en combat et les autres cas non admissibles. |
| **Save trainer profiles only** | Enregistre le JSON sans créer ni remplacer d'entité. |

Les profils vont dans **config/dochi_rpg_maker/cobblemon/trainers/radical_ported/**. Avant un remplacement, le type, la dimension et le NBT d'origine sont enregistrés dans **config/dochi_rpg_maker/cobblemon/rct_conversion_backups/**. Il s'agit d'une archive, pas d'une interface d'annulation automatique.

## Vérifier le résultat
Vérifiez les nombres de réussites et d'échecs, puis le nom, l'équipe, les objets tenus et le mode d'IA du nouveau PNJ. Personnalisez son apparence dans l'[éditeur de PNJ](#dochi-npc-core/npc-core-editor). Pour un profil exporté, continuez avec NPC Apply dans [premier dresseur](#drm-cobblemon-editor/cobblemon-editor-setup).

Si un dresseur manque, vérifiez les datapacks actifs. Si conserver RCT est refusé, installez une API compatible ou choisissez DRM. Étapes vérifiées dans le code ; l'environnement de capture n'avait pas RCT, donc aucune vidéo de conversion RCT terminée n'est fournie.
