---
title: Présentations et écrans des badges
slug: cobblemon-badge-presentations
order: 581
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Attribuez des effets distincts à l'acquisition et à la sélection et personnalisez la collection.
translationSource: en
translationMethod: assisted
---

## Acquisition et sélection sont distinctes
Sélectionnez une entrée de [création des badges](#drm-cobblemon-editor/cobblemon-badges), puis ouvrez **Presentation**. Choisissez un effet à l'acquisition et un autre à la sélection. Utilisez les réglages de l'ensemble ou une exception individuelle.

## Copier et enregistrer une présentation en vidéo
![Copier la présentation, enregistrer Meadow Shine et le lien du catalogue.](assets/media/guides/cobble-release-20261109/badge-presentation.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, anglais, sans son. Copy and Edit → nom → Restart → Save → retour → Save du catalogue.")

1. Cliquez sur **Copy and Edit** pour l'événement dans **Presentation**. **Edit** modifie la présentation partagée ; copiez pour un changement individuel.
2. Définissez **Name** à droite et relancez avec **Restart**. **Template** propose **Soft Shine**, **Golden Ring** et **Gentle Rise**.
3. Sélectionnez une piste. **Transform** règle les ticks de début/fin, position, échelle, rotation et opacité. **Effect** règle les propriétés de l'effet. **Add Key** insère une clé à l'instant actuel.
4. Cliquez sur **Save**, puis **Cancel** pour revenir. Cliquez aussi sur **Save** dans l'éditeur de badges pour valider le lien.

## Valeurs d'ensemble et liens individuels
Le sélecteur de portée distingue le badge actuel des valeurs d'ensemble. L'héritage suit leurs modifications. **None** désactive explicitement la présentation de cet événement. Acquisition et sélection ont des liens indépendants.

![Associer séparément acquisition et sélection dans Presentation.](assets/media/guides/cobble-release-20261109/badge-presentation-bindings.png "Copy and Edit du haut : acquisition ; du bas : sélection. Distinguez modification partagée et copie.")

Importer une présentation de combat la convertit en document de badge. Cela ne réutilise pas le lien du PNJ de combat.

## Écrans et disposition
**Display** règle la disposition et les positions. **GUI** associe les écrans **Collection / Detail / Acquisition** de GUI Maker. Placez listes, images, noms et descriptions ; le runtime fournit la possession réelle. Modifiez les clés d'animation dans l'éditeur de présentations et les textes d'écran dans GUI Maker.

## Options d'affichage
Les notifications sont mises en file ; les automatiques par défaut durent au moins huit secondes. Les réglages proposent confirmation, réduction des mouvements et son. La vidéo est muette et ne valide pas l'audio. Distinguez l'aperçu d'une acquisition réelle et vérifiez la possession avec **/badges**.
