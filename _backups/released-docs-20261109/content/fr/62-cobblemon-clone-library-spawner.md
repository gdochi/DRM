---
title: Reprendre les Entraîneurs avec Clone Library
slug: cobblemon-clone-library-spawner
order: 560
description: Enregistrez un formateur appliqué en tant que clone et connectez-le à un Core NPC Spawner.
product: drm-cobblemon-editor
category: Clones et spawners
section: world-tools
status: Guide d'utilisation
version: Fabric / NeoForge 0.2.9
audience: Créateurs réutilisant les PNJ de combat
tags:
  - clone-library
  - npc-spawner
translationSource: en
translationMethod: assisted
---

## Sauvegarder un formateur fini pour le réutiliser

**Clone Library** sauve un PNJ qui a déjà un rôle de Dresseur ou Pokémon Lui-même. Choisissez ce clone comme source dans **DRM Core NPC Spawner**. DNPC’ s propre Save As modèles utilisent un format différent; utiliser [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) pour ces templates.

Le flux de sauvegarde et d'application suivant a été vérifié avec ** Cobblemon Editor 0.2.9, DRM 0.3.1 et DNPC 0.1.3 on NeoForge 1.21.1**.

1. Construisez une équipe en [Éditeur de formation](#drm-cobblemon-editor/cobblemon-trainer-editor) et **Save As** votre propre fichier.
2. Ouvrez le PNJ avec le noyau DRM. Choisissez **vs Trainer → votre fichier → Appliquer vs Trainer **. Vérifiez le nom du fichier sous **APPLIED JSON** à droite.
3. Ouvrez **Clone Library** pour ce PNJ et choisissez **Save As**.
4. Activez **Follow applied JSON source** si de nouveaux clones doivent suivre les modifications apportées au fichier d'origine. Vérifiez le nom et appuyez sur **Confirm**.
5. Trouvez le PNJ sous **Saved Clones**. Sélectionnez sa ligne pour les détails et **Test Spawn**.

![NPC Apply avec guide_trainer connecté sous Vs Trainer.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "vs Trainer à gauche sélectionne une catégorie; Apply vs Trainer en bas effectue la liaison. Le serveur a reconnu custom/guide_trainer.json et le nom de fichier est apparu sur la droite.")

![Sauvegardés Pyrmont guide trainer en Clone Library.](assets/media/guides/cobble-029-neo1211-flow/cobble-clone-library.png "Le serveur a retourné Saved clone: trainer/guide_trainer_clone et a créé son fichier. Les stockées entityType est dochi_npc:npc et bindingPolicy est follow_source. Cela montre l'enregistrement du clone, pas un run de grower terminé.")

## Choisissez comment les modifications affectent les clones

| Réglage | Utilisez-le quand |
| --- | --- |
| **Follow applied JSON source** activé | Les PNJ nouvellement créés doivent lire les modifications apportées au fichier source appliqué |
| Désactivé: **Snapshot** | Le PNJ enregistré doit conserver son contenu capturé sans suivre les modifications de source ultérieures |

L'enregistrement d'un identifiant clone existant nécessite une confirmation d'écrasement. Avant de supprimer un clone, vérifiez quels géniteurs utilisent son ID ; ces entrées ne peuvent pas apparaître après la suppression de leur source.

L'onglet **Filled Soul Stones** importe les sources héritées CustomNPCs par l'intermédiaire de ce fournisseur sur les anciennes cibles Minecraft prises en charge. Il est séparé de l'enregistrement d'une cible DNPC.

## Se connecter Core NPC Spawner

1. Placer `dochi_rpg_maker:npc_spawner`.
2. Maintenez l'élément de base DRM, `dochi_rpg_maker:dialogue_editor`, puis cliquez avec le bouton droit sur le bloc.
3. Dans **Source**, ajoutez un clone enregistré.
4. Dans **Spawn**, commencez par **Wave size 1** et **Max active 1**, puis **Save** vers le bloc.
5. Détection de cible de test dans Survival: Creative et Spectator joueurs sont exclus.

![Core NPC Spawner Réglages de temps et de quantité.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "Le mode sélectionne le déclencheur, recharge l'intervalle, max active la limite de vie et taille d'onde le nombre par activation. Cette capture séparée a assigné des sources 0 et affiche uniquement les paramètres ; elle n'établit pas que le clone enregistré a été engendré.")

Utilisez le bloc de base pour les nouveaux emplacements. L'ancien bloc d'addon `cobble_npc:clone_spawner` reste pour la compatibilité du monde existant. Il s'agit d'un géniteur de bloc fixe; biome et la génération de morceaux appartiennent à un système de apparition naturel séparé.

### Référence du déclencheur et de la quantité

| Réglage | Choix / gamme |
| --- | --- |
| Mode | Continu, Cible à proximité, Cible d'entrée, Redstone Pulse |
| Temps de recharge | 20–72,000 ticks |
| Max Active / Taille de vague | 1–32 chaque |
| Rayon cible | 1–64 blocs |
| Décalage | −32–32 blocs par axe |
| Rayon aléatoire | 0–32 blocs |
| Source pool | Jusqu'à 64 clones; chaque poids 1 – 10,000 |
| Conditions | Jusqu'à 32 règles vérifiées par le serveur |

Les poids influencent la sélection aléatoire pour chaque slot d'apparition; ils ne définissent pas une séquence fixe. **Require Target**, **Remove Inactive** et redstone Ignorer/Powered/Unpowered contrôle quand le bloc peut fonctionner. **Effects** change les particules et l’apparence du bloc ; l’apparence du PNJ provient de son clone.

## Conservez les fichiers nécessaires ensemble

| Dossier | Sommaire |
| --- | --- |
| `config/dochi_rpg_maker/npc_spawner/entity_clones/` | Stockage du clone de base |
| `config/dochi_rpg_maker/cobblemon/entity_clones/` | Cobblemon Clone Library stockage de compatibilité |

Current Core lit les deux emplacements. Évitez les identifiants en double et conservez les fichiers sources `cobblemon/trainers/` et `pokemon_itself/` avec des clones follow-source. Préservez également le monde lorsque vous déplacez des géniteurs installés.

## Vérifiez le nettoyage de bataille avant d'ajouter des vagues

Cobblemon L'éditeur enregistre un nettoyage conscient de la bataille avec Core. Un PNJ réservé à la bataille n'est pas immédiatement supprimé par **Remove Inactive** ou le nettoyage des vagues ; le retrait attend la fin de la réservation.

Commencez par un clone. Confirmez son apparence et son rôle de combat avec **Test Spawn**, puis testez le générateur installé, en laissant sa zone de détection pendant une bataille, le nettoyage après et un redémarrage du serveur. Vérifiez les distributions pondérées sur les activations répétées plutôt que de juger un seul résultat.
