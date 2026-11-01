---
title: Enregistrer et réutiliser un PNJ
slug: npc-core-templates
order: 1530
description: Conservez un PNJ fini comme modèle, clonez-le ou chargez-le sur un PNJ existant.
product: dochi-npc-core
category: Modèles de clone PNJ
section: operations
status: Guide
version: 0.1.3
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Enregistrer un PNJ terminé

1. Ouvrez le PNJ et terminez son apparence, son équipement et son comportement.
2. Appuyez sur **Save to NPC**.
3. Appuyez sur **Save As**, entrez un **Name** distinct comme `guide_guard`, puis appuyez sur **Save**.

![Les DNPC éditeur Save As dialogue avec le modèle Name, Enregistrer et annuler.](assets/media/guides/dnpc-012-neo1211/dnpc-templates-save.png "DNPC 0.1.2 / NeoForge 1.21.1. Save to NPC met à jour le PNJ mondial; Save As conserve un modèle réutilisable.")

Les fichiers sont conservés en `config/dochi_npc_core/templates/`. Utilisez Ctrl+C / Ctrl+V pour une copie rapide ; utilisez un modèle pour conserver un PNJ pour plus tard.

![Le PNJ équipé d'un casque après avoir enregistré son modèle, avec la réponse enregistrée.](assets/media/guides/dnpc-013-neo1211/dnpc-template-saved.png "DNPC 0.1.3 / NeoForge 1.21.1. Ce PNJ a été enregistré en tant que guide_guard, sélectionné en Spawn Control et engendré avec son casque de fer préservé.")

## Qu'est-ce qui est réutilisé?

Les modèles réutilisent l'apparence, l'équipement, l'inventaire, le comportement et les paramètres de dialogue / boutique liés. Les nouveaux PNJ commencent frais plutôt que d’hériter d’une livraison active, d’une course ou d’une bataille.

Le chargement d'un modèle sur un PNJ existant conserve l'emplacement et la cargaison active de ce PNJ. Choisissez l'opération prévue : créer un nouveau PNJ ou appliquer des paramètres à un PNJ existant.

## Gardes de apparition à plusieurs endroits

Choisissez votre PNJ enregistré parmi **NPC clone template** dans [ Spawn Control ](#dochi-spawn-control/spawn-control-npc-templates). Utilisez-le pour un poste de garde fixe ou des apparitions planifiées / basées sur la localisation. Cette connexion nécessite également DRM.

L'enregistrement des modèles DNPC seul ne nécessite pas DRM.

![Les PNJ équipés de casques originaux et engendrés à côté du géniteur.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Les nouveaux PNJ conservent le casque de fer sauvé. La limite par défaut est 6, de sorte que les activations ultérieures peuvent ajouter plus de PNJ.")

## Un vieux fichier est absent de la liste

Chargez un modèle de paramètres uniquement ou v2 sur un PNJ, puis utilisez **Save to NPC → Save As**. Utilisez un nouveau nom pour conserver l'ancien fichier.

Si les modèles modifiés affichent toujours l'ancien équipement, rechargez et réappliquez le modèle en Spawn Control.
