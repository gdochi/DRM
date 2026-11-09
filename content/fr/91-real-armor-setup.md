---
title: Configurer une armure de PNJ
slug: dochi-real-armor-setup
order: 910
description: Ouvrez les paramètres et choisissez les intégrations PNJ, l'armure de carrosserie et la durabilité.
product: dochi-real-armor
category: Installer et configurer
section: setup
status: Stable
version: 0.1.6
audience: Joueurs et opérateurs de serveurs
tags:
  - installation
  - configuration
  - forge
translationSource: en
translationMethod: assisted
---

## Installer

Mettez les fichiers correspondants Minecraft / loader Real Armor 0.1.6 sur le serveur et les clients.

| Minecraft | Chargeur | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Fabric a également besoin de Fabric API. Utilisez DNPC, Easy PNJ ou CustomNPCs sur des cibles plus anciennes. DRM est facultatif.

## Ouvrir les paramètres

- **Forge / NeoForge:** Choisissez Real Armor's **Config** dans la liste mod.
- **Fabric:** ouvrir son **Config** dans Mod Menu.
- **With DRM:** utiliser **Mods Config → Real Armor**.

La modification des paramètres multijoueur nécessite une autorisation de niveau 2.

Ce sont les paramètres autonomes de **Real Armor 0.1.4 / NeoForge 1.21.1**. Utilisez **General Armor** pour le comportement de l'armure et **NPC Compatibility** pour votre intégration PNJ.

![Armure générale avec des commutateurs de calcul, d'armure de partie de corps, de durabilité, de ténacité, de protection et de résistance au retour arrière.](assets/media/guides/armor-014-neo1211/armor-config.png "Activer le calcul d'armure contrôle l'ensemble de la fonctionnalité. L'armure de partie de corps sélectionne l'équipement par région touchée; Les objets d'armure de dégâts permettent une perte de durabilité.")

![Compatibilité PNJ avec Dochi NPC Core, Easy NPC, CustomNPCs et paramètres de débogage.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Vérifiez Dochi NPC Core lorsque vous utilisez DNPC. Cette capture est 1.21.1 ; CustomNPCs n'est pas disponible sur 26.3.")

Les paramètres partagés de DRM affichent les mêmes options dans deux colonnes.

![Dochi Real Armor sélectionné dans les paramètres partagés de DRM, avec les règles d'armure à gauche et les intégrations à droite.](assets/media/guides/armor-014-neo1211/shared-armor.png "Sélectionnez Dochi Real Armor en Mods Config. Vérifiez le commutateur de calcul principal ainsi que l'intégration de PNJ.")

0.1.5 ajoute **Armor Drop Editor**. Suivez la [configuration des drops et la vidéo](#dochi-real-armor/dochi-real-armor-drops) pour créer des drops par armure et activer un ensemble avec **Save As → Save → Apply**. Les captures 0.1.4 ci-dessus sont des images antérieures des options de calcul d'armure.

## Choisissez les bases

1. Activez l'intégration de PNJ que vous utilisez.
2. Commencez avec l'armure du corps entier et équipez le PNJ.
3. Activez **armure de partie de corps** pour utiliser l'équipement couvrant la région touchée.
4. Activer **perte de durabilité** Porter une armure lorsqu'il est touché.
5. Appliquer les paramètres.

DNPC les régions touchées suivent ses limites corporelles de base, qui peuvent différer de l'apparence d'un modèle personnalisé.

## Vérifiez si elle est activée

Utilisez `/dochi_real_armor status`. Commandes également autocompléter `split`, `durability` et `debug`.

Pour la gestion directe des fichiers, Forge/NeoForge utiliser `config/dochi_real_armor-common.toml`; Fabric utilise `config/dochi_real_armor.json`.
