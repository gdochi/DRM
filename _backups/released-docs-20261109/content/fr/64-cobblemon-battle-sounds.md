---
title: Entraîneur Battle Sounds
slug: cobblemon-battle-sounds
order: 525
description: Règles de son courantes et par round déclenchées par le nombre Pokémon restant du formateur.
product: drm-cobblemon-editor
category: Cobblemon Éditeur
section: trainer
status: Stable
version: Fabric / NeoForge 0.2.9
audience: Créateurs auteur formateur bataille audio
tags:
  - battle-sounds
  - rounds
  - audio
translationSource: en
translationMethod: assisted
---

## Ce que cette fonctionnalité est

`Battle Sounds` sont des règles d'exécution qui jouent pendant qu'une bataille d'entraîneurs est active, en fonction du nombre restant de l'entraîneur Pokémon.

- Ils sont séparés de Battle Presentation Maker timeline audio.
- Ils courent pendant la vraie bataille Cobblemon, pas pendant la présentation avant la bataille.
- Ils fonctionnent indépendamment de la DRM stratégie, RCT, ou Cobblemon forte AI.
- Ils s'appliquent aux combats d'entraîneurs, pas aux rencontres de Pokémon lui-même.

![Combattez les sons avec le nombre restant de Pokémon et la sélection globale.](assets/media/guides/cobble-029-neo1211/cobble-sounds.png "Config de bataille → Sons de bataille. Pour changer la musique à un Pokémon, sélectionnez 1, activez Lire à ce nombre et choisissez ID sonore. Appliquez, puis enregistrez le document parent. 0.2.9 / NeoForge 1.21.1.")

## Workflow de création

1. Ouvrez un document Formateur en `Cobblemon Editor`.
2. Choisissez `Battle Sounds` en haut d'une section Formateur. `Battle Strategy` peut également ouvrir le même éditeur tout en préservant le tour actuel.
3. Sélectionnez `Global (all rounds)` ou un tour spécifique sur la gauche.
4. Sélectionnez un nombre de déclencheurs de 1 à 6.
5. Activez `Play at this count`, puis choisissez un ID sonore, un volume et une hauteur.
6. Utilisez `Play` et `Stop` pour prévisualiser le son sur le client.
7. Choisissez `Apply`, puis enregistrez le document Formateur à partir de l'éditeur parent avec `Save` ou `Save As`.

`Close` n'applique pas le brouillon de l'éditeur. S'il reste des valeurs modifiées ou des nombres invalides, une confirmation demande s'il faut les rejeter.

## Modes global et per-round

| Objectif | Mode | Comportement |
| --- | --- | --- |
| Toutes les rondes | Monde | Référence pour chaque tour d ' héritage |
| Un tour | `Use global` | Résoudre les règles globales en cours de jeu |
| Un tour | `Custom` | Utiliser un ensemble indépendant de règles de comptage |
| Un tour | `Off` | Ne jouez aucun de ces sons même lorsque des règles globales existent |

La première fois qu'un tour change en `Custom`, il utilise les règles globales actuelles comme draft de départ. Les modifications ultérieures n'affectent que ce tour.

## Comportement de déclenchement

- Le compte comprend tous les entraîneurs actifs et bancés vivants Pokémon.
- Le premier compte observé après le démarrage de la bataille peut se déclencher. Un entraîneur de six Pokémon peut donc jouer la règle `6` au début.
- Un événement faible marque le nombre pour une autre vérification côté serveur.
- Chaque comte joue au plus une fois dans une bataille.
- Zéro signifie que la bataille est terminée, il n'y a donc pas de règle de compte zéro.
- Une revanche crée une nouvelle session de combat avec un nouvel état de déclenchement unique.

## Paramètres sonores

| Réglage | Portée ou comportement |
| --- | --- |
| ID sonore | Un son namestpacé disponible via les packs de ressources du client actif |
| Volume | 0–4; zéro n'est pas jouable |
| Emplacement | 0.05–4 |
| `Stop sounds first` | Arrêtez la musique de combat actuelle et les sons commencés par ces règles avant de jouer le nouveau son |

Le sélecteur recherche les noms et les identifiants traduits. Si l'aperçu échoue, vérifiez d'abord que le son existe dans les packs de ressources actifs. La navigation ou la sélection d'un son n'active pas automatiquement `Play at this count`.

Le bouton de prévisualisation `Stop` arrête uniquement le son joué par cet éditeur. Cela ne change pas la politique d'exécution `Stop sounds first`.

## Nettoyage d'exécution

Lorsque la bataille se termine ou que sa session est nettoyée, le serveur demande au client d'arrêter l'audio associé à cette bataille d'entraîneur. Cela n'agit pas comme un arrêt global pour les sons de jeu sans rapport.

## Référence JSON

Il s'agit d'informations de référence pour les outils externes et le contrôle de version. Dans le schéma du formateur 22, les règles globales sont stockées dans `trainerOptions.battleSound.rules[]` ; les paramètres par tour utilisent `rounds[].battleSoundOverride`. Chaque règle contient `remainingPokemon`, `enabled`, `sound`, `volume`, `pitch` et `stopBeforePlay`. L'écriture par l'éditeur est recommandée.
