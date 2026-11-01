---
title: Tooltip Maker
slug: tooltip-maker
order: 105
description: Organisez le nom, la description et le modèle affichés lorsque vous survolez un élément.
product: core-fabric
category: GUI Maker
section: gui-maker
status: Stable
version: 0.3.1
audience: Créateurs
translationSource: en
translationMethod: assisted
---

## Ce que fait Tooltip Maker

Tooltip Maker dessine le panneau affiché lorsqu'un joueur survole un objet. Disposez où son nom, les informations et l'aperçu de l'élément apparaissent.

Ouvrez le sélecteur d'éditeur avec le **Dochi RPG Maker Core**, choisissez **Tooltip Maker**, puis chargez une disposition d'infobulle ou créez-en une. Les valeurs par défaut groupées sont des modèles protégés, utilisez donc `Save As` avant de les personnaliser.

Les mises en page d'infobulles sont stockées en `config/dochi_rpg_maker/gui/`. Le point de départ est `default_tooltip_gui.json`.

![Tooltip Maker la disposition par défaut, avec l'icône de l'élément, le nom et les zones d'information au milieu et les dimensions du canevas et des éléments à droite.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Le panneau noir est l'infobulle. L'espace de travail bleu environnant est en dehors de sa toile de sortie.")

1. Sélectionnez un élément au milieu. L'icône de l'épée, un **Rendered Item**, est sélectionnée ici.
2. Changez sa position **X / Y** et ses dimensions **W / H** à droite. Définissez toute la taille de l'infobulle avec **Tooltip W / H → Apply** ci-dessus.
3. Ajoutez des affichages avec **+ Tooltip Text**, **+ Divider**, **+ Rendered Item** ou les autres outils sur la gauche.
4. Vérifiez **Preview**, puis **Save As** votre mise en page. Utilisez **Use Globally** lorsque vous le sélectionnez comme disposition pour tous les éléments.

Configurez les statistiques et la description réelles d'un élément dans l'éditeur d'éléments. Tooltip Maker arrange la façon dont cette information est présentée.

## Principaux contrôles

- Définissez la taille du canevas et organisez le texte, les valeurs, les diviseurs, les images et l'aperçu de l'élément.
- Choisissez une icône 2D ou un modèle d'objet 3D ajusté et réglez l'échelle, la rotation et le spin.
- Configurez les effets d'entrée de surface, de cadre, de texte et d'élément, puis rejouez-les dans l'éditeur.
- Conservez les éléments entièrement dans le canevas de sortie s'ils doivent être inclus lors de l'enregistrement.

L'infobulle d'exécution utilise l'élément plané réel et ses données d'élément. Si le résultat est plus grand que l'écran, les joueurs peuvent faire défiler son contenu pendant que le cadre extérieur reste en place.

Les articles d'inventaire créatifs peuvent utiliser l'infobulle d'article personnalisé. Les notes de bouton ordinaires et les cartes de hover-help de l'éditeur utilisent leur propre rendu et ne sont pas remplacées par Tooltip Maker.
