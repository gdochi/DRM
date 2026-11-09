---
title: Créer et attribuer des badges et trophées
slug: cobblemon-badges
order: 580
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Enregistrez un ensemble, attribuez un badge et consultez la collection.
translationSource: en
translationMethod: assisted
---

## Activer les badges
Inclus dans Cobblemon Editor **0.2.9 / Fabric·NeoForge 1.21.1**. Dans les paramètres DRM, activez **Badges → Enable badges**. Seuls les opérateurs peuvent le modifier ; les nouveaux mondes commencent sur OFF. Attribuez ensuite une touche **Badge Case** dans Controls ou ouvrez avec **/badges**.

## Suivre la première vidéo
La vidéo commence avec une copie de l'ensemble d'exemple. Elle renomme l'ensemble **Meadow League**, le badge **Meadow Badge**, puis enregistre sur le serveur réel.

![Renommer l'ensemble et le badge, puis enregistrer.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, interface anglaise. Saisie et enregistrement réels. Fonction activée avant l'enregistrement.")

1. Ouvrez **Add-on → Badge Editor** dans DRM ou utilisez **/badges edit** comme opérateur.
2. Choisissez un exemple dans **Select Set**, puis copiez-le avec **Save Set As Copy**. Cela crée de nouveaux identifiants sans demander de nom de fichier.
3. Dans **Basic**, remplacez **Set Name** par **Meadow League** et le **Name** du badge par **Meadow Badge**. Ajoutez des entrées avec **Add Count → Add**.
4. Choisissez **Badge** ou **Trophy**. La recherche de **Front Texture** sélectionne une ressource DRM. Un dos vide reprend l'image de face.
5. Vérifiez la description et **Enabled**, puis cliquez sur **Save**. Renommer conserve l'identité ; copier ou créer produit d'autres identifiants.

## Attribuer et consulter la collection
Le niveau de permission 2 ou supérieur est requis. Le dernier argument est le nom ; Tab propose noms et identifiants. Utilisez l'identifiant unique si les noms se répètent.

```mcfunction
/drm badge give @s Meadow Badge
/badges
/drm badge take @s Meadow Badge
```

Pour les trophées, utilisez **/drm trophy give** et **/drm trophy take**. Sélectionnez **Meadow League** dans la collection. Attribuer à nouveau un badge déjà possédé n'augmente pas sa quantité.

![Définitions enregistrées de Meadow League dans l'éditeur.](assets/media/guides/cobble-release-20261109/badge-editor-saved.png "Cet écran confirme la définition enregistrée. Vérifiez la possession du joueur séparément avec /badges.")

## Relier récompenses, dialogues et quêtes
Dans **Battle Config → After Actions**, ajoutez **Badge** ou **Trophy** et recherchez l'entrée enregistrée. Limitez le résultat à la victoire pour un badge de victoire. Pour l'attribuer après un dialogue, placez celui-ci en premier en mode **Sequential**.

Les actions de dialogue disposent aussi de cibles recherchables. **Badge owned / Trophy owned** vérifie la possession ; **Badge count** compte les badges de l'ensemble ; **Badge set complete** vérifie tous les badges obligatoires. Les trophées ne sont pas comptés comme badges. Définissez les obligatoires avec **Required for Completion**. Un ensemble sans badge obligatoire ne satisfait pas la condition d'achèvement.

Dans une quête, choisissez l'objectif d'acquisition et sa cible. Réattribuer un badge possédé ne constitue pas une nouvelle acquisition. Consultez les [actions après combat](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

## Présentations et sauvegarde
Configurez les notifications et animations dans [présentations et GUI de collection](#drm-cobblemon-editor/cobblemon-badge-presentations).

Les définitions se trouvent dans **config/dochi_rpg_maker/cobblemon/badges/catalog.json** ; le réglage du monde dans **serverconfig/cobble_npc/badges.json**. La possession est stockée séparément dans les données des joueurs du monde. Copier les définitions ne transfère pas la possession. Sauvegardez définitions, présentations, textures et joueurs ensemble. Si une référence empêche une suppression, modifiez d'abord les récompenses et conditions concernées.
