---
title: Premiers pas
slug: quick-start
order: 1
description: Prenez l’outil DRM et créez le premier dialogue d’un PNJ.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.3.1
audience: Utilisateurs novices
tags:
  - quick-start
  - setup
translationSource: en
translationMethod: assisted
---

## Créer le premier dialogue d’un PNJ

Avec DRM, vous pouvez créer des dialogues, des boutiques et des quêtes pour les PNJ. Commencez avec un PNJ et une courte salutation.

1. En mode Créatif, prenez **Dochi RPG Maker Core** ou saisissez `/give @s dochi_rpg_maker:dialogue_editor`.
2. Tenez le Core et **faites un clic droit dans le vide**.
3. Sélectionnez **Dialogue Editor**, puis choisissez **Use Default** à droite.
4. Sélectionnez un nœud de dialogue normal et modifiez la réplique et le texte des choix.
5. Utilisez **Save As** pour enregistrer votre propre dialogue.
6. Avec le Core en main, faites un clic droit sur un PNJ de DNPC ou CustomNPCs et appliquez le dialogue enregistré.
7. Videz vos deux mains, puis faites un clic droit sur le PNJ pour lui parler.

Vous devez d’abord créer un PNJ ? Suivez [Créer un PNJ](#dochi-npc-core/npc-core-setup). Utilisez DNPC sur Minecraft 26.3.

![Sélecteur d’éditeurs de DRM, avec Dialogue Editor sélectionné et Use Default à droite.](assets/media/guides/drm-031-neo1211/editor-selector.png "DRM 0.3.1 sur NeoForge 1.21.1, en anglais. Créez les dialogues dans Dialogue Editor et configurez les produits de la boutique dans NPC Shop.")

Pour créer vos premiers nœuds et choix, suivez [le guide illustré de dialogue](#core-fabric/dialogue-system). Le guide explique comment écrire la réplique, relier la réponse, utiliser Save As et tester le dialogue sur le PNJ.

## Choisissez ce que vous voulez faire

| Objectif | Outil | Guide |
| --- | --- | --- |
| Dialogue et choix | Dialogue Editor | [Conversations](#core-fabric/dialogue-system) |
| Un PNJ qui achète ou vend des articles | NPC Shop | [Boutiques](#core-fabric/shop-system) |
| Une apparence personnalisée de dialogue/boutique | GUI Maker | [Disposition des écrans](#core-fabric/gui-system) |
| Noms monétaires, icônes et soldes | Currency Editor | [Monnaie](#core-fabric/currency-editor) |
| Informations qui restent à l'écran | HUD Maker | [HUDs](#core-fabric/hud-maker) |

Les quêtes, les destinations de voyage et les popups s'ouvrent également à partir du sélecteur d'éditeur. Les extensions installées ajoutent leurs propres outils.

## Quand enregistrer et appliquer

**Save / Save As** enregistre votre travail dans un fichier. **Apply** définit quel PNJ utilise ce fichier. Enregistrez le nouveau dialogue ou la nouvelle boutique, puis appliquez le fichier au PNJ.

Utilisez **Save As** pour enregistrer une copie de l’exemple sous un nom de votre choix. Utilisez **Save** pour les modifications suivantes de votre fichier.

## Avant l'installation

Pour 1.21.1, choisissez Fabric ou NeoForge. Pour 26.3, utilisez ses fichiers séparés. Voir [installation](#core-fabric/installation) et [26.3 différences](#core-fabric/minecraft-26-3).

Pour déplacer le travail enregistré sur un autre serveur, voir [dossiers](#core-fabric/paths).
