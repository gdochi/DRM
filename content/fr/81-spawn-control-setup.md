---
title: Créez votre première règle de spawn naturelle
slug: dochi-spawn-control-setup
order: 820
description: Choisissez une créature, ses conditions et ses quantités, puis appliquez la règle.
product: dochi-spawn-control
category: Configuration
section: setup
status: Projet
version: 0.1.5
audience: Premiers opérateurs de serveur
tags:
  - installation
  - first rule
  - permissions
translationSource: en
translationMethod: assisted
---

## Installer et ouvrir l'éditeur

Utilisez Spawn Control 0.1.5 pour Forge 1.20.1, Fabric / NeoForge 1.21.1 ou la cible séparée 26.3. Correspond aux versions serveur / client et aux chargeurs; Fabric a également besoin Fabric API.

Les cibles Java de 0.1.5 sont 17 pour Forge 1.20.1, 21 pour Fabric/NeoForge 1.21.1 et 25 pour Fabric/NeoForge 26.3. CustomNPCs concerne uniquement 1.20.1/1.21.1 ; utilisez DNPC en 26.3. Les règles de créatures ordinaires ne nécessitent aucun mod de PNJ.

Les règles de créature ordinaires ne nécessitent pas d'autres mods Dochi. L'édition nécessite une autorisation de niveau 2 ou une autorisation de création.

Appuyez sur **K**. Si un autre mod l'utilise, changez **Open Spawn Control** dans les paramètres clés de Minecraft. Avec DRM, vous pouvez également ouvrir **Spawn Control** à partir du sélecteur d'éditeur.

## Ajouter une règle pour une créature

1. Choisissez la créature dans la liste de gauche.
2. En vue **Selected target**, appuyez sur **Add rule**.
3. Donnez-lui un nom et un **Profile ID** unique.
4. Définir les dimensions, les biomes, le temps et la lumière. Les listes vides de dimension/biome permettent tout.
5. Choisissez **Ground** pour les créatures terrestres ou **Water** pour les créatures aquatiques.
6. Définissez le hasard, vérifiez l'intervalle, la taille du groupe et les limites de population.
7. Activez la règle et appuyez sur **Save**.

![Conditions immédiatement après l'ajout de la règle.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. Cet exemple sélectionne l'entité DNPC par défaut, pas un modèle PNJ enregistré. La nouvelle règle est toujours en vigueur. Sélectionnez votre cible, configurez-la, activez la règle et enregistrez-la.")

## Vérifier l'emplacement actuel

Utilisez **Advanced diagnostics → Check current position** pour voir les conditions d'échec. **Spawn one mob** Crée une créature réelle. Utilisez **Clean spawned entities** pour enlever les apparition de test.

Les créatures terrestres ont besoin d'un sol et d'un espace de tête appropriés; les créatures aquatiques ont besoin de suffisamment d'eau.

## Remplacez les frayers d'origine

Après avoir vérifié votre règle, tournez **Original spawning OFF** pour remplacer le apparition naturel. En le laissant allumé, il conserve également les apparition d'origine.

## Utiliser un PNJ enregistré

Enregistrez-le en tant que modèle **clone** dans DNPC, puis choisissez son nom dans le catalogue. Voir [Modèle de configuration](#dochi-spawn-control/spawn-control-npc-templates).

Pour un bloc à un emplacement fixe, utilisez un géniteur [ placé](#dochi-spawn-control/dochi-spawn-control-spawner).
