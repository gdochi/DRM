---
title: Choisissez votre BattleWorks Construire
slug: battleworks-update-0-1-6
order: 208
description: Choisissez DRM et un mod PNJ pour votre version Minecraft.
product: mob-editor
category: 0.1.6 et sélection du chargeur
section: start
status: Guide
version: 0.1.6
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Mods requis

BattleWorks ** ajoute la création de combat PNJ à DRM**. Créez le PNJ avec DNPC ou CustomNPCs.

| Minecraft / chargeur | Java | Fichiers à choisir |
| --- | --- | --- |
| Forge 1.20.1 | 17 | Forge 1.20.1 construit de BattleWorks, DRM et le mod PNJ |
| Fabric / NeoForge 1.21.1 | 21 | 1.21.1 construit pour le chargeur sélectionné |
| Fabric / NeoForge 26.3 | 25 | 26.3 Constructions de BattleWorks, DRM et DNPC pour le chargeur sélectionné |

Correspond aux chargeurs/versions sur le serveur et les clients. Utilisez DNPC sur 26.3; CustomNPCs est indisponible là-bas.

## Faites une attaque

Placez un PNJ, faites son fichier de combat BattleWorks et appliquez-le. Suivez [ votre première attaque de mêlée](#mob-editor/battleworks-first-attack) pour vous enrouler, frapper et récupérer. Le tutoriel actuel utilise un DNPC sur NeoForge 1.21.1 et vérifie l'enregistrement, l'application et les dommages réels.

DNPC prend également en charge le combat, les relations et l'intégration de l'apparence. Le mouvement supplémentaire nécessite ses mods d'animation respectifs.

Le tutoriel de première attaque a été vérifié avec **BattleWorks 0.1.6 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1**. Le succès avec cette combinaison n'établit pas une version minimale DRM qui exclut toutes les anciennes versions.

![Un fichier de combat enregistré BattleWorks lié à un DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Après l'installation, vérifiez l'enregistrement, l'application et un succès réel ainsi que l'ouverture de l'éditeur.")

## Utiliser des modèles d'exemple

Chargez des exemples à partir de `config/dochi_rpg_maker/mobs/patterns/samples/`. Utilisez **Save As** pour créer votre propre version.

Les exemples Better Combat doivent être compatibles avec le mode Better Combat et ses exigences de mouvement. L'invocation d'un clone CustomNPCs n'est pas disponible le 26.3.

Continuer avec [Configuration des PNJ](#mob-editor/mob-editor-setup) ou le [parcours d'apprentissage](#mob-editor/mob-editor-overview).
