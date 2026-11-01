---
title: Ajoutez vos photos et modèles de PNJ
slug: assets-models
order: 130
description: Importez un PNG pour vos écrans et choisissez des modèles de PNJ et des animations.
product: core
category: Le monde et les outils PNJ
section: world-tools
status: Stable
version: 0.3.1
audience: Créateurs d'interface graphique et de PNJ
tags:
  - assets
  - geckolib
  - animation
translationSource: en
translationMethod: assisted
---

## Choisissez un PNG pour un écran

Dans GUI Maker, suivez **+ Image → Asset: dans l'inspecteur de droite →, choisissez une image → Apply**. Faites défiler à l'intérieur de l'inspecteur si la propriété est vue en dessous. Rechercher par nom de fichier ou affiner le sélecteur par mod et dossier parent.

![Le sélecteur de ressources d'image actuel GUI Maker.](assets/media/guides/drm-031-neo1211/gui-custom-png-search.png "DRM 0.3.1 / NeoForge 1.21.1, anglais UI. La recherche guide_icon trouve le PNG placé dans le dossier du serveur. Cet exemple copie l'icône existante de DNPC inchangée. Sélectionnez la ligne et appuyez sur Appliquer en haut.")

**Appliquer affecte l'image à l'élément Image sélectionné.** L'enregistrement de l'ensemble de l'interface graphique est une étape distincte. Après avoir fermé le sélecteur, réglez la position, la largeur, la hauteur et l'ajustement; utilisez Save As pour un nouveau fichier. Pour l'afficher dans une boîte de dialogue ou une boutique, sélectionnez l'interface graphique enregistrée dans la fonctionnalité correspondante.

![Le PNG sélectionné a été appliqué et enregistré en tant que guide_image.](assets/media/guides/drm-031-neo1211/gui-custom-png-applied.png "Réel Appliquer et Save As dans le même 0.3.1 courir. Vérifiez l'image de canevas sélectionnée et guide_image.json en haut. Cela vérifie l'édition et l'enregistrement de l'interface graphique, séparé de la lecture d'un dialogue en l'utilisant.")

## Si votre PNG est manquant

1. Mettez-le sous le serveur `config/dochi_rpg_maker/assets/textures/`. Les sous-dossiers sont autorisés.
2. Appuyez sur **Refresh** dans le sélecteur et recherchez son nom de fichier.
3. Réinitialiser les filtres de mod ou de dossier à **All** si nécessaire.
4. Vérifiez l'aperçu de la ligne et appuyez sur Appliquer.

Les photos appartenant au serveur sont envoyées aux joueurs qui se joignent. Chaque PNG doit être **8 MiB ou moins**, **4096 pixels ou moins par côté**, et **16,777,216 pixels ou moins total**. Lors du transfert d'une interface graphique, incluez à la fois son JSON et les images auxquelles il fait référence.

## Où changer un modèle de PNJ

Pour DNPC, **cliquez avec le bouton droit de la souris sur le PNJ avec Dochi Npc Core → Appearance & Model ** pour choisir son modèle, sa peau et son échelle. Un élément Image GUI place une image sur un écran ; il ne change pas le corps du PNJ.

![DNPC Appearance & Model.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "DNPC 0.1.2 / NeoForge 1.21.1, anglais UI. Comparez Humanoid, Skin et Scale avec l'aperçu du centre. C'est DNPCl'écran d'apparence, séparé de DRMde CustomNPCs Écran NPC Basic.")

Projets existants 1.20.1 et 1.21.1 utilisant CustomNPCs configurent DRM les modèles dans **NPC Basic**. CustomNPCs est exclu de Minecraft 26.3 à partir de. Suivez [ DNPC l'apparence et l'équipement ](#dochi-npc-core/npc-core-editor) pour le chemin correspondant à votre acteur.

Un modèle Gecko a besoin des ressources correspondant au modèle, à la texture et à l'animation plus le bon GeckoLib. Un PNG seul ne crée pas de mouvements de marche ou d'attaque. **[loop]** répète, **une fois** joue une fois, et **hold-last** tient la pose finale. Choisissez un mouvement réellement fourni par le modèle.

## PNG animés

Pour une image de trame verticale, incluez resource-pack-style `.png.mcmeta` : par exemple, `priest.png` et `priest.png.mcmeta`. Les métadonnées définissent la taille, l'ordre et le timing des images. Poursuivre avec [GUI Maker](#core/gui-system) pour la mise en page et [la création de dialogue](#core/dialogue-system) pour le connecter.
