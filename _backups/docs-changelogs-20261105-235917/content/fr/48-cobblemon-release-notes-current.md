---
title: Quoi de neuf dans 0.2.9
slug: cobblemon-editor-current-update
order: 480
description: Changements aux récompenses séquentielles, aux rôles DNPC et au mouvement de l'entraîneur.
product: drm-cobblemon-editor
category: Premiers pas
section: overview
status: Stable
version: Fabric / NeoForge 0.2.9
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
---

## Récompenses après le dialogue

![Après les contrôles Actions pour la commande post-bataille.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1, interface utilisateur anglaise. Ouvrez Battle Config → après les actions et choisissez le mode Action. Cette photo montre le mode Tout initial avec zéro action, pas un dialogue séquentiel terminé et une récompense.")

Pour les récompenses après le dialogue, choisissez **Sequential** et placez l'action de dialogue avant sa récompense. Cela coordonne l'achèvement du dialogue avec le paiement ultérieur.

**Sequential** Les after-actions attendent que le dialogue se termine avant d'accorder des récompenses ultérieures. Après annulation / déconnexion, la prochaine interaction PNJ peut continuer les actions restantes.

Chaque tour permet une action de dialogue. Voir [étapes de configuration](#drm-cobblemon-editor/cobblemon-trainer-editor).

## DNPC Rôles

DNPC prend en charge Trainer, Pokemon Itself, Pokémon apparence, PokéMart, Nurse Joy et Starter Selector, ainsi que les connexions clone / fawnner / battle-scheduler.

Entraîneurs peuvent dash et revenir alors que DNPC **Position lock** est activé. Les correctifs traitent également de la vitesse du tableau de bord restant et de l'échec du retour après l'annulation du dialogue.

## Fonctionnalités poursuivies

Inclut les améliorations de l'IA de combat 0.2.7, la sélection complète des mouvements et le travail de compatibilité Cobblemon 1.8.4. Des mécanismes supplémentaires tels que Mega Evolution ont besoin de leurs mods et éléments clés respectifs.

## Mettre à jour les fichiers

Pour Fabric/NeoForge sur Minecraft 1.21.1. Utilisez les patchs actuels de DRM Core, DNPC et Cobblemon Editor pour ces fonctionnalités. Voir [installation](#drm-cobblemon-editor/cobblemon-editor-setup).
