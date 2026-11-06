---
title: Quoi de neuf dans 0.3.1
slug: release-notes-0-3-1
order: 3
description: Ajoutez des noms de texte / NPC aux mises en page de dialogue et utilisez des intégrations DNPC mises à jour.
product: core
category: Actualisations
section: getting-started
status: Guide
version: 0.3.1
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
hiddenNav: true
---

## Ajouter des noms et des étiquettes aux dialogues

Dans **GUI Maker → Text → Content**, choisissez votre propre texte ou **NPC name**. Placez les étiquettes indépendamment du dialogue principal : noms, emplacements ou instructions courtes.

Définissez la position, la taille, le remplissage et la bordure de chaque boîte, **Save As**, puis sélectionnez-la pour la conversation. Suivez [la personnalisation de l'écran](#core/gui-system).

![Une zone de texte indépendante sélectionnée en GUI Maker.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Ajoutez-le avec + Texte et choisissez Entrée directe ou Nom PNJ sous Contenu. La zone de texte au-dessus du texte Dialogue est positionnée indépendamment du corps du dialogue.")

## Mise à jour DNPC formateur et support de dialogue

Sur les anciennes cibles 1.20.1 / 1.21.1, les patchs compatibles DNPC et Cobblemon de l'éditeur permettent aux formateurs verrouillés en position dash et return.

Cobblemonde **Sequential** mode sur Fabric/NeoForge 1.21.1 donne des récompenses après l'achèvement du dialogue. Voir [Récompenses ](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Fichiers d'installation

Forge 1.20.1 utilise Java 17; Fabric/NeoForge 1.21.1 utilise Java 21; les fichiers séparés 26.3 utilisent Java 25. Voir [26.3 différences](#core-fabric/minecraft-26-3).

Nouveau à DRM? Commencez par [commencer ](#core/quick-start).
