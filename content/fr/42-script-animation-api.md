---
title: API Animation Script
slug: script-animation-api
order: 125
description: Utilisez drmAnimation dans les scripts CustomNPCs pour lire des animations et modifier les mappages de comportement ou le modèle PNJ.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs Auteurs du script
tags:
  - script
  - customnpcs
  - animation
translationSource: en
translationMethod: assisted
---

## Modifier un modèle de PNJ et le mouvement d'un script

Il s'agit d'une référence avancée pour les scripts CustomNPCs. Pour un changement de nom ou de peau, commencez par [paramètres d'apparence ](#core/assets-models). Le résultat réel de l’API ci-dessous attribue minecraft:zombie au modèle d’un PNJ existant. La lecture d'animation nécessite en outre un identifiant de mouvement fourni par ce modèle ou un fournisseur installé.

![Modification réelle d'un modèle npc et mouvement à partir d'un résultat de script.](assets/media/guides/drm-031-forge1201-apis/api-model-zombie.png "DRM 0.3.1 / Forge 1.20.1 avec CustomNPCs. Le PNJ utilise une apparence de zombie après useModdedEntityModel. Ce n'est pas une démonstration de l'installation ou de la lecture d'une ressource de vague.")

## Premiers pas

Dochi's RPG Maker Forge 0.3.1 enregistre la CustomNPCs script global `drmAnimation`. Le premier argument de chaque méthode est un wrapper d'entité de script CustomNPCs ou une entité Minecraft. Dans la plupart des scripts d'événement, passez `event.npc` directement.

```js
function interact(event) {
    drmAnimation.useModdedEntityModel(event.npc, "minecraft:zombie");
}
```

Tout d'abord, confirmez que le PNJ préparé prend le modèle indiqué ci-dessus. Connectez la marche, l'attaque et toute autre lecture d'animation uniquement après avoir préparé le fournisseur et les ressources de mouvement réelles.

:::note Ressources nécessaires
`drmAnimation` n'est enregistré que lorsque CustomNPCs est présent. Les ressources de mod et d'animation du fournisseur sélectionné doivent également être disponibles sur le serveur et les clients de connexion.
:::

## Lecture directe

La surcharge la plus courte omet la politique de lecture et utilise `once`.

```js
drmAnimation.play(event.npc, "entity", "attack_animation", 1.0, 40);
drmAnimation.playPlayerAnimator(event.npc, "mypack:wave", 1.0, 80);
drmAnimation.playBetterCombat(event.npc, "bettercombat:one_handed_slash", 1.0, 40);
drmAnimation.playEntityAnimation(event.npc, "attack_animation", 1.2, 60);
```

| Fournisseur | Objet |
| --- | --- |
| `entity` | Animation native à partir du modèle d'entité modifiée sélectionné |
| `geckolib` | Animation à partir d'un modèle DRM géré GeckoLib JSON |
| `player_animator` | animation de ressources Player Animator |
| `better_combat` | L'animation Better Combat spécifiée |

`player_animator` et `better_combat` sont rejetées lorsque la cible utilise un GeckoLib ou moteur de rendu d'entités. Pour `entity`, assignez d'abord un modèle d'entité modifiée au PNJ et utilisez un identifiant d'animation réellement exposé par ce modèle.

## Politiques de lecture

Les modes numériques fournissent des arguments de script compacts.

| playbackMode | Nom | Comportement |
| --- | --- | --- |
| `0` | `loop` | Répéter pour la durée demandée |
| `1` | `once` | Jouer une fois |
| `2` | `hold_last` | Jouez une fois et maintenez la dernière image |

Placez un mode numérique à la fin de l'appel.

```js
drmAnimation.playEntityAnimation(event.npc, "idle_animation", 1.0, 100, 0);
drmAnimation.playEntityAnimation(event.npc, "death_animation", 1.0, 100, 2);
```

Placez une politique nommée immédiatement après `animation`.

```js
drmAnimation.playEntityAnimation(event.npc, "attack_animation", "once", 1.0, 40);
drmAnimation.play(event.npc, "entity", "idle_animation", "loop", 1.0, 100);
```

Les nombres et les noms en dehors `loop`, `once` et `hold_last` sont rejetés au lieu d’être convertis silencieusement.

## Enregistrement des animations comportementales

`setBehavior` stocke un mappage d'animation dans les paramètres du modèle PNJ. Les valeurs d'identification standard sont `idle`, `walk`, `sprint`, `attack`, `hurt` et `death`.

```js
function init(event) {
    var npc = event.npc;

    drmAnimation.useModdedEntityModel(npc, "cataclysm:amethyst_crab");
    drmAnimation.setBehavior(npc, "idle", "entity", "idle_animation", 1.0, 0);
    drmAnimation.setBehavior(npc, "attack", "entity", "attack_animation", 1.0, 1);
    drmAnimation.setBehavior(npc, "death", "entity", "death_animation", 1.0, 2);
}
```

Jouez ou supprimez un mappage enregistré comme suit.

```js
drmAnimation.playBehavior(event.npc, "attack", 60);
drmAnimation.clearBehavior(event.npc, "attack");
```

`useModdedEntityModel` applique un identifiant de type d'entité valide à un PNJ CustomNPCs. Restaurer le moteur de rendu régulier CustomNPCs avec `useCustomNpcModel`.

```js
drmAnimation.useCustomNpcModel(event.npc);
```

## Arguments et valeurs de retour

- `speed` accepte `0.0` à `32.0`.
- `durationTicks` accepte 1 par 600 ticks.
- Les méthodes de lecture directe incluent `durationTicks` ; il n'y a pas de méthode distincte `playForTicks`.
- Utilisez l'ID d'animation exact exposé par le fournisseur.
- Les méthodes renvoient `true` lorsque la requête est acceptée et `false` pour une combinaison cible, argument ou moteur de rendu non valide.

## Référence complète de signature

Cette section est référence seulement.

```js
drmAnimation.play(target, provider, animation, speed, durationTicks);
drmAnimation.play(target, provider, animation, speed, durationTicks, playbackMode);
drmAnimation.play(target, provider, animation, playback, speed, durationTicks);

drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks);
drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playPlayerAnimator(target, animation, playback, speed, durationTicks);

drmAnimation.playBetterCombat(target, animation, speed, durationTicks);
drmAnimation.playBetterCombat(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playBetterCombat(target, animation, playback, speed, durationTicks);

drmAnimation.playEntityAnimation(target, animation, speed, durationTicks);
drmAnimation.playEntityAnimation(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playEntityAnimation(target, animation, playback, speed, durationTicks);

drmAnimation.playBehavior(target, behavior, durationTicks);
drmAnimation.setBehavior(target, behavior, provider, animation, speed, playbackMode);
drmAnimation.clearBehavior(target, behavior);
drmAnimation.useModdedEntityModel(target, entityTypeId);
drmAnimation.useCustomNpcModel(target);
```

## Dépannage

- Lorsqu'un appel renvoie `false`, vérifiez d'abord la cible, le fournisseur, l'ID d'animation, la vitesse et la durée.
- Vérifiez que Player Animator ou Better Combat n'est pas utilisé avec une entité modifiée ou un moteur de rendu GeckoLib.
- Les moteurs d'animation et les identifiants internes varient selon l'entité mod. Utilisez un identifiant affiché par la liste de sélection NPC Basic pour le modèle sélectionné.
- Le serveur envoie des requêtes de lecture, mais les clients les rendent. La connexion des clients nécessite la construction DRM requise, le mod fournisseur et les ressources.
