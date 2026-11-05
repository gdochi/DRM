---
title: Faire apparaître votre PNJ sauvegardé
slug: spawn-control-npc-templates
order: 838
description: Utilisez un DNPC enregistré dans les règles naturelles ou les géniteurs placés.
product: dochi-spawn-control
category: DNPC Modèle de recherche
section: editor
status: Guide
version: 0.1.5
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Faire apparaître un garde portant son casque sauvé

Cet exemple relie les DNPC modèle `guide_guard` à un géniteur placé. Il a besoin de **DNPC and DRM**. L'entrée ordinaire DNPC sous `Entity` crée un PNJ par défaut. Choisissez **NPC clone template** pour réutiliser l'apparence et l'équipement que vous avez préparés.

Terminez d'abord la garde en DNPC, puis **Save to NPC → Save As → Name: guide_guard → Save**. Voir [sauvegarder les modèles PNJ](#dochi-npc-core/npc-core-templates) pour les deux différentes opérations de sauvegarde.

## 1. Choisissez le PNJ enregistré

1. Ouvrir **Spawner Editor → Spawn Target**. Réutilisez l'entrée initiale ; **Add** crée plus d'entrées quand vous voulez un mélange.
2. Changez **Source** en **NPC clone template**.
3. Appuyez sur la loupe **Choose** à côté de **Entity / Clone** et recherchez `guide_guard`.
4. Sélectionnez **NPC [dochi_npc:actor/guide_guard]**, puis appuyez sur **Select**.

![L'entrée guide_guard enregistrée dans le sélecteur de modèle PNJ.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Même lorsque son nom d'affichage est PNJ, l'identifiant entre crochets guide_guard distingue ce modèle.")

## 2. Sauvegarder le fichier gearer

Allumez **Enabled** et maintenez **Entities per activation** à `1`. Avec une entrée et **Chance** `1.0`, cette entrée a une part de sélection de 100 %. Cela ne signifie pas qu'il apparaît à chaque tique; le timing et les conditions sont des paramètres distincts.

Utilisez **Save As**, entrez `guide_guard_spawner.json`, puis appuyez sur **Confirm**. Vérifiez que **JSON file** en haut indique ce nom.

![Le générateur enregistré utilise le modèle de clone PNJ et dochi_npc:actor/guide_guard.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. guide_guard est le PNJ original ; guide_guard_spawner.json contient ses règles de apparition. Ce sont des fichiers séparés.")

## 3. Appliquez-le sur le générateur mondial

1. Utilisez **Get Spawner** et placez l'objet dans le monde.
2. Maintenez la touche **DRM Core** et cliquez avec le bouton droit sur le générateur placé.
3. Sélectionnez ** guide_guard_spawner.json ** et appuyez sur **Apply JSON**. La fenêtre se ferme après l'application.
4. Par défaut **Conditions** nécessitent un joueur à proximité et laisser **Include creative players** off. Testez ces paramètres dans Survival à l'intérieur des blocs 16.

![guide_guard_spawner.json sélectionné dans la fenêtre Apply Spawner JSON du générateur placé.](assets/media/guides/spawn-control-014-neo1211/spawn-block-apply.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Save As écrit le document; Appliquer JSON met à jour ce générateur de monde.")

À la suite de ce flux a créé un nouveau PNJ et conservé le casque de fer d'origine. Ajustez [timing, limites et conditions possédées](#dochi-spawn-control/dochi-spawn-control-spawner-settings) pour réutiliser le même modèle dans d'autres rencontres.

![Les PNJ équipés de casques originaux et engendrés à côté du géniteur.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Les nouveaux PNJ conservent le casque de fer sauvé. La limite par défaut est 6, de sorte que les activations ultérieures peuvent ajouter plus de PNJ.")

## Apparition naturelle — toutes les cibles de 0.1.5

En 0.1.5, les modèles DNPC enregistrés fonctionnent dans les règles naturelles sur Forge 1.20.1, Fabric/NeoForge 1.21.1 et 26.3. Ouvrez l'éditeur avec **K**, trouvez le modèle, utilisez **Add Rule**, réglez biome, heure, distance et effectifs, activez puis enregistrez. Le PNJ par défaut et le modèle enregistré sont distincts. Si le modèle ou l'API fournisseur de DRM manque, cette apparition est refusée sans créer de PNJ vide.

## Entrées manquantes ou mauvaise apparence

| Problème | Vérifier |
| --- | --- |
| Il manque un vieux template | Chargez-le en DNPC, puis Save to NPC → Save As sous un nouveau nom |
| Un fichier existe mais est absent de la liste | Vérifiez le config/dochi_npc_core/templates/ du serveur et la présence de DNPC et DRM |
| L'enregistrement n'a pas mis à jour un générateur | Ouvrez ce générateur mondial avec le noyau et appliquez à nouveau JSON |
| Rien ne se passe dans la création | Cochez Inclure des joueurs créatifs ou des tests dans Survival |
| Le vieux matériel apparaît | Enregistrez à nouveau l'original PNJ, rechargez son modèle et réappliquez le générateur |

Spawn Control gère la génération répétée de ses PNJ. Leur respawn natif sauvé ne court pas à côté.
