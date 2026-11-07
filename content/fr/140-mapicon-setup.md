---
title: Afficher les icônes PNJ sur la carte
slug: mapicon-setup
order: 1400
description: Donnez aux magasins, entraîneurs et autres PNJ des icônes de carte reconnaissables.
product: dochi-mapicon-integration
category: Démarrage
section: setup
status: Guide d'utilisation
version: 0.1.3
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Donner à un PNJ une icône bleue

Préparez DRM, **MapIcon Integration 0.1.3** et la carte sur laquelle afficher les icônes. Les captures ci-dessous ont été réalisées avec **MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1 / Minimap de Xaero 26.6.0**. La modification des icônes fonctionne aussi sans carte installée.

1. [ Placer un DNPC ](#dochi-npc-core/npc-core-setup).
2. Ouvrir **NPC editor → Addons → Map icon**. L'éditeur individuel n'a que **Selected NPC** sur la gauche.
3. Activez **Icon** et choisissez une image. Cet exemple utilise l'icône humanoïde bleue intégrée.
4. Utilisez **Size 16**, **Tint 4AB7FF** et activez **Minimap**. Activez également **World map** pour cette carte.
5. Appuyez sur **Save** et attendez **Settings saved**.
6. Fermez l'éditeur et trouvez l'icône PNJ sur la minicarte.

![L'icône humanoïde bleue enregistrée pour le PNJ sélectionné.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "Enregistrer dans cet écran enregistre le PNJ sélectionné. Le panneau du milieu est un aperçu d'icône, pas une carte. Vérifiez que la ressource Texture, la taille, la teinte et la carte sont synchronisées.")

![Le DNPC affiché comme un humanoïde bleu sur la minicarte réelle de Xaero.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "Sur la minicarte en haut à gauche, l'humanoïde bleu juste au-dessus du marqueur du joueur blanc est le guide Oakridge. Les marqueurs jaunes sont d'autres animaux. Le PNJ a été placé à une vingtaine de pâtés de maisons pour comparer sa carte et ses positions mondiales.")

## Utilisez une icône pour toutes les boutiques

Pour une catégorie entière, ouvrez l'éditeur d'icônes complet de la liste des éditeurs DRM ou **Mods Config**.

1. Activez l'affichage global et sélectionnez **Type defaults → NPC Shop JSON**.
2. Choisissez l'image, la taille, la teinte et la visibilité de la carte.
3. Utilisez **Save & Apply** pour enregistrer et activer le profil du serveur.
4. Vérifiez un PNJ avec une vraie DRM boutique appliquée.

Choisissez la valeur par défaut correspondante pour les PNJ ou les formateurs de dialogue. Les rôles Cobblemon apparaissent lorsque Cobblemon Editor est installé. Les PNJ individuels sont prioritaires ; voir [icon priority](#dochi-mapicon-integration/mapicon-editor-rules).

## Installation

| Minecraft | Chargeur | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Installez DRM et MapIcon pour le même chargeur sur le serveur et les clients. Xaero’s Minimap, Xaero’s World Map et JourneyMap sont facultatifs : installez-en un seul ou une combinaison, avec les bibliothèques requises par les cartes choisies. Fabric nécessite aussi Fabric API.

Sans aucune carte installée, l'éditeur, les paramètres du serveur et l'enregistrement restent disponibles. Installez une carte pour y voir les icônes. Utilisez DNPC sur 26.3 ; cette version ne prend pas en charge CustomNPCs.

Pour les images personnalisées ou les icônes manquantes, voir [images et dépannage](#dochi-mapicon-integration/mapicon-files-operations).
