---
title: 0.2.9 Mise à jour
slug: release-notes-0-2-9
order: 4
description: Intégration de PNJ en option, modèles de clones et correctifs actuels.
product: core-fabric
category: 0.2.9 Mise à jour
section: getting-started
status: Guide
version: 0.2.9
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

Cette page enregistre un **Libération plus ancienne**. Utilisation [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour l'installation et l'utilisation actuelles. Les illustrations de la version actuelle ci-dessous sont distinctes de l'historique de publication.


## 0.2.9 changement record

DRM ** 0.2.9 ** cibles Forge 1.20.1 / Java 17 et Fabric / NeoForge 1.21.1 / Java 21. Les builds séparés Fabric / NeoForge 26.3 utilisent Java 25. Voir le [26.3 guide](#core-fabric/minecraft-26-3) pour les exclusions et les limites de vérification.

CustomNPCs et DNPC sont des intégrations optionnelles. Les outils de création de base ne nécessitent pas non plus de mod PNJ ; les fonctionnalités spécifiques au fournisseur ont besoin de leur fournisseur. CustomNPCs est exclu de façon permanente de 26.3. Cette cible utilise l'API optionnelle DNPC acteur/fournisseur.

## Les changements que vous pouvez utiliser

- **DNPC clone templates:** Core expose une API de fournisseur de modèle public. Enregistrez un modèle de clone de PNJ v3 en DNPC, puis choisissez-le dans Spawn Control. Voir [Création de templates](#dochi-npc-core/npc-core-templates).
- **Models without CustomNPCs:** les trois anciennes cibles fixent CustomNPCs le chargement de classe lorsque DNPC ou des entités génériques ont des profils d’animation/modèle actifs. Si vous utilisez déjà 0.2.9, remplacez-le par une version contenant cette correction et redémarrez Minecraft.
- **Creative tools:** sur 1.20.1 / 1.21.1, DRM enregistre ses propres outils publics dans les onglets des fournisseurs de PNJ installés, sans les dupliquer lorsque les deux fournisseurs sont installés.
- **Trainer history deletion:** compatible Cobblemon L'éditeur s'appuie sur Fabric / NeoForge 1.21.1 exposer la suppression complète des enregistrements de combat dans Admin. Cela diffère d'une réinitialisation de compte et supprime les récompenses en attente et les marqueurs de récompense. Lire la suite [Guide d'administration](#core-fabric/drm-administration).

Les cœurs plus anciens sans la capacité de modèle conservent leurs autres caractéristiques. Les mods de l'écosystème n'ont pas besoin de numéros de version correspondants.

## D'un PNJ à un modèle réutilisable

Enregistrez l'apparence et l'équipement du PNJ, puis sélectionnez ce PNJ dans Spawn Control. Cet écran montre l'intégration utilisée dans les versions actuelles ; il ne s'agit pas d'un écran historique 0.2.9.

![La sélection d'un modèle DNPC enregistré dans Spawn Control.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1. DNPC enregistré guide_guard apparaît comme dochi_npc:actor/guide_guard. Enregistrer la définition du géniteur et l'appliquer à un géniteur placé avant de s'attendre à un géniteur.")

## Mise à jour

1. Sauvegardez la configuration du serveur et le monde ensemble.
2. Installez les versions correspondantes de Minecraft/loader sur le serveur et chaque client, en remplaçant l'ancien fichier.
3. Vérifiez les exigences de base déclarées de chaque addon.
4. Ouvrez les fichiers de dialogue, de boutique et de quête existants ; cochez l'enregistrement et NPC Apply séparément. Personnalisez les modèles par défaut avec `Save As`.

Certains correctifs conservent le même numéro de version. Un nom de fichier seul n'établit pas qu'un correctif est présent. Les versions ici identifient les builds de production **local vérifiés sur 2026-10-28**, pas la disponibilité publique de téléchargement. Historique [0.2.8 notes](#core/release-notes-0-2-8) restent disponibles.
