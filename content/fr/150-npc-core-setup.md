---
title: Créez votre premier PNJ
slug: npc-core-setup
order: 1500
description: Installez DNPC, placez un PNJ et choisissez son nom, sa peau et son équipement.
product: dochi-npc-core
category: Configuration du NPC Core
section: setup
status: Guide
version: 0.1.3
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Télécharger et installer

[Télécharger le noyau PNJ de Dochi sur CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core)

Choisissez votre version Minecraft et votre chargeur. En multijoueur, installez les fichiers correspondants sur le serveur et sur chaque client. Fabric a également besoin de Fabric API.

| Minecraft | Chargeur | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

DNPC vous permet de créer, personnaliser et affecter des tâches aux PNJ. Ajoutez DRM lorsque vous voulez des conversations ou des magasins.

## Placez votre premier PNJ

1. Procurez-vous le noyau à partir de l'onglet Créatif **NPC Core**, ou utilisez `/dnpc core`.
2. Faites un clic droit sur le sol pour placer un PNJ.
3. Cliquez avec le bouton droit sur ce PNJ avec le noyau pour le modifier.
4. Entrez un nom, choisissez une peau et de l'équipement, puis enregistrez.
5. Rangez le noyau et regardez votre PNJ.

![Identity dans l'éditeur DNPC 0.1.3, avec les catégories à gauche, l'aperçu au milieu et Name et Title à droite.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "UI en anglais sur NeoForge 1.21.1. Name votre PNJ sous Identity → Name. Utilisez Appearance & Model pour les peaux et Inventory & Equipment pour les armures.")

Utilisez le contrôle **Save to NPC** en forme de disque après l'édition. Pour conserver le PNJ pour une réutilisation ultérieure, [enregistrer un modèle avec Save As](#dochi-npc-core/npc-core-templates).

## Contrôles de base

| Entrées | Résultat |
| --- | --- |
| Clic-droit au sol | Placer un PNJ |
| Faites un clic droit sur un PNJ | Éditer |
| Faites un clic droit | Ouvrir les paramètres globaux et le poseur |
| Cliquez à gauche | Ouvrir les contrôles de l'utilitaire PNJ |
| Tenez le noyau dans votre main principale; Ctrl + C / Ctrl + V | Copier/coller un PNJ |
| Tenez le noyau dans votre main principale; Ctrl + X | Supprimer le PNJ ciblé |

Pour une utilisation répétée, [ enregistrer un modèle ](#dochi-npc-core/npc-core-templates).

## Quoi essayer ensuite

- [Apparence, équipement et emplois ](#dochi-npc-core/npc-core-editor)
- [Horaires de travail et de repos](#dochi-npc-core/npc-core-schedules)
- [Cuisine et livraison de nourriture](#dochi-npc-core/npc-core-cooking)
- [DRM conversations, magasins et autres mods](#dochi-npc-core/npc-core-files)
