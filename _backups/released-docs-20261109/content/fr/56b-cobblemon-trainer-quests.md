---
title: Quêtes de victoire des entraîneurs
slug: cobblemon-trainer-quests
order: 568
description: Quêtes de victoire des entraîneurs
product: drm-cobblemon-editor
category: Quêtes de victoire des entraîneurs
section: trainer
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs
translationSource: en
translationMethod: assisted
---

## Ressources nécessaires

L'environnement vérifié est Cobblemon Editeur **0.2.9 + DRM0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**. L'addon ajoute **Trainer Victory** aux quêtes DRM. Donnez d'abord au formateur une identité lisible, puis associez cette même identité à la quête.

## Lier un identifiant de formateur

1. Sélectionnez le type de combat `Trainer` dans Cobblemon Editeur.
2. Ouvrir **Battle Config → General → Set ID**. Le champ est marqué **NPC ID**.
3. Entrez un identifiant lisible tel que `gym_brock` et appuyez sur `Use ID`. Un identifiant existant est réutilisé ; un nouvel identifiant est créé et lié dans la même action.
4. Enregistrez le document et appliquez-le au PNJ de combat.

Les identifiants sont coupés et en minuscules. Ils doivent commencer par une lettre ou un chiffre, peuvent contenir des lettres minuscules, des chiffres, `_`, `.` et `-`, et sont limités à 64 caractères. Les noms de PNJ et les noms de fichiers JSON ne remplacent pas l'identité du formateur.

Le sélecteur d'ID répertorie les objectifs de l'entraîneur-victoire à partir des quêtes actuellement chargées. Recherchez et sélectionnez l'identifiant de l'entraîneur d'une quête existante lorsque vous créez un PNJ pour une quête que vous avez déjà créée. Un PNJ n'a pas besoin d'exister dans le monde avant la conception de quêtes.

![NPC ID entré en tant que gym_guide dans le sélecteur réel.](assets/media/guides/cobble-029-neo1211/cobble-trainer-id-entry.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1. Reliez l'ID de PNJ supérieur avec l'ID d'utilisation. Les quêtes de recherche ci-dessous réutilisent une identité issue d'une quête chargée ; aucune ne correspond dans ce cas. L'inspection des contrôles d'identité est distincte de la vérification du comptage des victoires réelles.")

## Créer l'objectif

1. Créez une quête et un objectif en DRM Quest Editor.
2. Choisissez `Trainer Victory`.
3. Associez la même identité d'entraîneur que le document de combat et définissez les victoires requises.
4. Enregistrez la quête, puis testez une vraie bataille pendant que la quête du joueur est active. Les quêtes configurées pour commencer lors de la première progression suivent cette stratégie de démarrage.

Une exigence de 3 signifie trois victoires distinctes contre l'entraîneur lié. Plusieurs PNJ partageant un identifiant de formateur vers la même cible. Utilisez des identifiants distincts pour les compter séparément.

## Ce qui compte

Seuls les joueurs confirmés gagnent en DRM Les combats d'entraîneurs comptent. Les pertes, la fuite, l'annulation, les combats Pokémon Lui-même et les combats d'entraîneurs externes RCT ne comptent pas. Les victoires historiques ne sont pas importées. La livraison répétée du même résultat de bataille n'ajoute pas une autre victoire. L'identité est capturée lorsque la bataille commence.

Les deux DRM Éditeurs de quêtes actuels écrivent des quêtes automatiques. Atteindre le nombre de victoires requis ne termine pas toute la quête si d'autres objectifs restent. Voir [migration des données](#core-fabric/loader-compatibility) lors de l'importation de l'ancien format JSON.

## Stockage et sauvegardes

Le type objectif est `cobble_npc:trainer_victory` ; les documents font référence à une écurie `trainerKey`. Liez-le via l'éditeur au lieu de remplacer manuellement un identifiant lisible dans JSON.

L'auteur des données vit sous `config/dochi_rpg_maker`. Sauvegardez les documents de l'entraîneur, les packs de quêtes, `cobblemon/trainer_registry.json` et `cobblemon/trainer_registry.initialized` ensemble, ainsi que le monde contenant la progression du joueur.
