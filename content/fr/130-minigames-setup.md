---
title: Placez une table et jouez
slug: minigames-setup
order: 1300
description: Ouvrez un mini-jeu et choisissez ses règles, les frais d'entrée et les récompenses.
product: dochi-minigames
category: Démarrage
section: setup
status: Guide d'utilisation
version: 0.1.6
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Jouer un tour en premier

Placer a [table de mini-jeux](#dochi-minigames/minigames-tables) Choisissez un jeu. DRM n'est pas nécessaire.

Les créateurs peuvent ouvrir `/minigame editor`, charger un préréglage et **Apply to table**. Les joueurs font un clic droit sur la table à rejoindre.

### Essayez un tour de l'éditeur

Ces écrans anglais sont de **Minigames 0.1.5 / NeoForge 1.21.1**. Choisissez un exemple sous **Presets**, puis inspectez l'éditeur.

![Éditeur de mini-jeux avec les types de jeux à gauche, un aperçu Monty Hall au milieu, et le titre, le temps et les paramètres de frais sur la droite.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Choisissez un jeu sur la gauche et configurez son Inspecteur sur la droite. Le milieu est un aperçu de la conception; Test play ouvre l'écran jouable.")

1. Sélectionnez **Monty Hall** sur la gauche.
2. Définissez son titre et **Time (s)** au-dessous **General**. **Entry fee → 0** est libre.
3. Choisissez les règles de porte sous **Rules**, les éléments sous **Symbols** et les prix sous **Rewards**.
4. Appuyez sur **Test play** en haut. Choisissez une porte fermée; une fois que les portes perdantes sont révélées, choisissez de garder votre porte ou votre interrupteur d'origine.

![L'écran de jeu de test jouable de Monty Hall, montrant trois portes fermées, marque et le temps restant.](assets/media/guides/minigames-015-neo1211/minigames-test-play.png "Le jeu de test n'utilise aucun frais d'entrée ou de récompenses. Après avoir vérifié le gameplay, la confirmation d'entrée de test et le règlement à la table réelle séparément.")

## Jeux disponibles

Choisissez Monty Hall, slots, memory, whack, timing, high-low, shooting ou le jeu de cartes **MWENT**. Utilisation [règles du jeu](#dochi-minigames/minigames-rules-rewards) pour définir le jeu et les récompenses. MWENT a son propre [Guide de démarrage](#mwent/start).

**0.1.6 ajoute [Item Roulette](#dochi-minigames/minigames-roulette)** aux jeux existants, avec ses propres prix et cotes.

## Faites-en votre jeu

1. Chargez un préréglage dans l'éditeur.
2. Modifier son titre, sa limite de temps et ses règles.
3. Choisissez un droit d'entrée et des récompenses. Un tarif de 0 est gratuit.
4. Utilisez **Save As** pour garder votre jeu.
5. Appliquez-le à la table qui va l'utiliser.

Le paiement se produit lorsque le joueur appuie sur **Start** dans l'écran d'entrée. L'annulation de cet écran est gratuite; la fermeture d'un jeu de score déjà commencé compte comme confiscation. Par défaut Spin on block roulette démarre et charge sur la machine cliquez sans une fenêtre d'entrée, et conserve son tirage et le prix; suivez le guide de [roulette ](#dochi-minigames/minigames-roulette).

## Ouvrez-le depuis un PNJ ou un dialogue

Avec DRM, utilisez **NPC Apply → Minigames** pour donner un jeu à un PNJ.

Pour l'accès uniquement aux dialogues, utilisez une action de choix **Go Minigames** au lieu d'appliquer le jeu directement. Un jeu directement appliqué s'ouvre avant le dialogue.

## Choisissez les fichiers d'installation

| Minecraft | Chargeur | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Ce guide suit 0.1.6. Les captures d'écran antérieures 0.1.5 conservent leurs légendes de version. Correspond aux versions / chargeurs sur le serveur et les clients; Fabric a également besoin Fabric API. DRM l'argent ou les récompenses Cobblemon ont besoin de leurs mods respectifs.
