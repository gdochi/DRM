---
title: Configuration du chargeur et migration des données
slug: loader-compatibility
order: 45
description: Portée de Forge et partagé Fabric/NeoForge docs, installation et déplacement des données existantes.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
---

## Portée de la documentation

** Fabric et NeoForge 1.21.1 partagent cette documentation. ** Dialogue, NPC Shop, GUI Maker, monnaie, HUD, quêtes, Scene Maker et Core NPC Spawner utilisent le même flux de travail de création normal. Choisissez des fichiers pour la même version Minecraft et le même chargeur. Suivez les notes du chargeur de chaque guide pour connaître les différences telles que les boutons d'application, l'achèvement de la quête et l'activation du HUD.

Forge 1.20.1 a une entrée de documentation distincte. L'itinéraire `core-fabric` existant reste pour la compatibilité des liens et sert également NeoForge de lecteur.

## Exigences d'installation

| Chargeur | Minecraft | DRM | Java | Intégration PNJ en option |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.3.1 | 17 | DNPC ou compatible CustomNPCs |
| Fabric | 1.21.1 | 0.3.1 | 21 | DNPC ou compatible CustomNPCs |
| NeoForge 21.1+ | 1.21.1 | 0.3.1 | 21 | DNPC ou compatible CustomNPCs |

Fabric nécessite également Loader 0.18.0+ et Fabric API 0.116.11+1.21.1+. Voir [Installation](#core-fabric/installation) pour les fichiers et les intégrations optionnelles.

## Données de création en mouvement

Les documents de création utilisent `config/dochi_rpg_maker`. Les fichiers de serveur fournissent les paramètres partagés. Le monde stocke également les connexions PNJ et la progression des joueurs.

1. Sauvegardez config et le monde ensemble.
2. Préparez une instance séparée avec la DRM et les dépendances du chargeur de destination.
3. Chargez des copies de vos documents personnalisés.
4. Vérifiez que les éléments, entités, modèles et animations référencés existent sur ce chargeur.
5. Testez les dialogues, achetez/vendez/restockez, recherchez des récompenses et reconnectez la persistance.

Le guide de création partagée ne convertit pas automatiquement les identifiants Minecraft/mod ou CustomNPCs les données mondiales. Le noyau `dochi_rpg_maker:npc_spawner` et les documents de génération de l'addon Spawn Control séparés utilisent chacun leurs propres chemins de données.

## Vérifier la conversation migrée sur son PNJ

Après avoir déplacé les fichiers, ouvrez le PNJ avec DRM Core et utilisez **Dialogue JSON → your set → Apply Dialogue**. Videz les deux mains, parlez au PNJ réel et vérifiez le texte, les choix et les récompenses.

![Appliquer un ensemble de dialogue déplacé à un PNJ.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide a été sélectionné et appliqué; Appliqué JSON à droite montre la connexion. Trouver un fichier et le connecter à un PNJ sont des vérifications distinctes.")

## Contrôles directs de quête

Disponible en Fabric et NeoForge avec niveau d'autorisation 2.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start` contourne les portes de disponibilité normales. `complete` force l'achèvement et accorde des récompenses non réclamées. La quête entière `reset` efface les enregistrements de progression et de récompense ; elle ne récupère pas les objets ou les devises accordés. La réinitialisation d'un objectif conserve le progrès du frère et récompense l'histoire.

Les quêtes créées dans l'éditeur actuel utilisent la complétion automatique sur les deux chargeurs. Lors de la migration de l'ancien JSON avec `completionMode: turn_in`, Fabric conserve l'activation manuelle tandis que NeoForge se termine automatiquement. Vérifiez le moment de la récompense lors de l'importation de ces données héritées.

Changements actuels: [ DRM 0.3.1 ](#core-fabric/changelog-0-3-0).

Minecraft 26.3 utilise des builds Java 25 séparés. Voir [26.3 et exclusions](#core-fabric/minecraft-26-3).
