---
title: API de script de requête d'effet potion
slug: script-effect-api
order: 130
description: Utilisez drmEffect dans les scripts CustomNPCs pour inspecter les effets actifs, le temps restant, l'amplificateur et le niveau d'affichage sur les PNJ et les lecteurs.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs Auteurs de scripts de combat et d'état
tags:
  - script
  - customnpcs
  - potion
  - effect
translationSource: en
translationMethod: assisted
---

## Lire Speed II niveau et temps restant

Utilisez ceci pour brancher un dialogue ou un comportement basé sur un effet de potion. Check a d'abord, puis utilise le niveau pour un numéro de niveau orienté joueur. Cette API lit uniquement les effets ; préparez l'effet séparément.

![Vitesse de lecture réelle ii niveau et temps restant résultat.](assets/media/guides/drm-031-forge1201-apis/api-effect-speed.png "DRM 0.3.1 / Forge 1.20.1. Un effet de lecteur de vitesse II réel retourne has-true, level-2 et amplifier-1. La requête signale 1200 ticks; le temps passe avant la capture, donc l'inventaire montre 00:57.")

## Aperçu général

`drmEffect` est un objet de script global CustomNPCs pour la lecture d'effets de créature active, communément appelés effets de potion, à partir d'entités vivantes. Il indique si un PNJ ou un lecteur a un effet, combien de ticks ou de secondes il reste, et à la fois l'amplificateur interne et le niveau utilisateur.

```js
function interact(event) {
    if (drmEffect.has(event.player, "minecraft:speed")) {
        var seconds = drmEffect.remainingSeconds(event.player, "minecraft:speed");
        var level = drmEffect.level(event.player, "minecraft:speed");
        event.player.message("Speed " + level + " / " + seconds + " seconds left");
    }
}
```

`drmEffect` en lecture seule. Il n'ajoute, ne supprime ni ne modifie d'effets. Un ID de cible ou d'effet non valide renvoie des valeurs par défaut sûres au lieu d'interrompre le script.

:::note Entités acceptées
Le premier argument peut être une enveloppe d'entité CustomNPCs ou une entité vivante Minecraft. Les entrées communes sont `event.npc`, `event.player` et `event.npc.getAttackTarget()`. Tout ce qui ne peut être résolu par une entité vivante est traité comme n’ayant aucun effet.
:::

## Tableau de méthodes complet

| Méthode | Lorsqu'elle est présente | En cas d'absence ou d'invalidité |
| --- | --- | --- |
| `has(entity, effectId)` | `true` | `false` |
| `remainingTicks(entity, effectId)` | tiques restantes | `0` |
| `ticks(entity, effectId)` | Identique à `remainingTicks` | `0` |
| `remainingSeconds(entity, effectId)` | Autres tiques ÷ 20 | `0.0` |
| `seconds(entity, effectId)` | Identique à `remainingSeconds` | `0.0` |
| `amplifier(entity, effectId)` | Amplificateur interne à base de zéro | `-1` |
| `level(entity, effectId)` | Niveau basé sur l'utilisateur | `0` |

### Présence

```js
if (drmEffect.has(event.npc, "minecraft:strength")) {
    event.npc.say("Strength is active");
}
```

`has` est `true` uniquement lorsqu'une instance d'effet est effectivement attachée. Un ID vide, un ID mal formé ou un effet non enregistré est `false`.

### Temps restant

```js
var ticksLeft = drmEffect.remainingTicks(event.player, "regeneration");
var secondsLeft = drmEffect.remainingSeconds(event.player, "regeneration");

// Short aliases return the same values.
var sameTicks = drmEffect.ticks(event.player, "regeneration");
var sameSeconds = drmEffect.seconds(event.player, "regeneration");
```

Minecraft s'exécute normalement 20 ticks par seconde. `remainingSeconds` est un `double`, il peut donc renvoyer une valeur fractionnaire telle que `2.5`.

Un effet infini renvoie `-1` pour les ticks restants et les secondes. Ne traitez pas chaque durée négative ou non positive comme une absence. Vérifiez d'abord `has`.

```js
var present = drmEffect.has(event.npc, "minecraft:resistance");
var left = drmEffect.remainingTicks(event.npc, "minecraft:resistance");

if (present && left < 0) {
    event.npc.say("Resistance is infinite");
}
```

### Amplificateur par rapport au niveau d'affichage

Minecraft stocke les amplificateurs à partir de zéro, tandis que l'interface utilisateur affiche les niveaux d'effet à partir d'un.

| Texte de l'interface utilisateur | `amplifier` | `level` |
| --- | ---: | ---: |
| Vitesse I | 0 | 1 |
| Vitesse II | 1 | 2 |
| Vitesse III | 2 | 3 |
| Absente | -1 | 0 |

Utilisez `level` dans le dialogue et les règles de jeu ordinaires. Utilisez `amplifier` uniquement lorsque vous faites correspondre les formules internes basées sur zéro Minecraft.

```js
var shownLevel = drmEffect.level(event.player, "speed");
var internalAmplifier = drmEffect.amplifier(event.player, "speed");
```

## Règles d'identification d'effet

La forme complète est `namespace:path`.

```text
minecraft:speed
minecraft:regeneration
irons_spellbooks:instant_mana
example_mod:custom_effect
```

Un ID sans espace de noms vaut par défaut `minecraft:`.

```js
drmEffect.has(event.player, "speed");
drmEffect.has(event.player, "minecraft:speed");
// These query the same effect.
```

DRM réduit l'ID, la convertit en minuscules et la recherche dans le registre Forge de l'effet créature. Le texte vierge, un ResourceLocation non valide ou un effet d'un mod qui n'est pas installé sont traités comme absents.

:::warning N'utilisez pas de noms d'affichage
Utilisez l'ID de Registre, un texte non localisé tel que `Speed II` ou un nom d'infobulle. Obtenez l'identifiant exact d'un effet modifié à partir de la documentation de ce mod ou d'un outil d'inspection de registre.
:::

## Brancher sur un effet joueur

Nécessite la vision nocturne avec plus de dix secondes restantes.

```js
function interact(event) {
    var player = event.player;
    var effect = "minecraft:night_vision";

    if (!drmEffect.has(player, effect)) {
        player.message("Night Vision is required.");
        return;
    }

    var seconds = drmEffect.remainingSeconds(player, effect);
    if (seconds >= 0 && seconds <= 10) {
        player.message("The effect expires too soon: " + seconds + " seconds");
        return;
    }

    player.message("Requirement passed");
}
```

`seconds < 0` représente un effet infini, donc il passe l'exigence de durée dans cet exemple.

## Vérifier l'effet du PNJ

Gardez une phase de défense active uniquement lorsque le PNJ a une résistance II ou supérieure.

```js
var DEFENSE_ACTIVE = false;

function tick(event) {
    var npc = event.npc;
    var active = drmEffect.level(npc, "minecraft:resistance") >= 2;

    if (active == DEFENSE_ACTIVE) return;
    DEFENSE_ACTIVE = active;

    if (active) {
        drmCombat.setAttacks(npc, false, false);
        npc.say("Defense phase started");
    } else {
        drmCombat.setAttacks(npc, true, true);
        npc.say("Defense phase ended");
    }
}
```

Le suivi de l'état précédent empêche la mise à jour du message et du combat de répéter chaque tick.

## Vérifier une cible avant de lancer une compétence

Ne lancez un projectile Cataclysm que lorsque la cible n'est pas empoisonnée.

```js
var NEXT_CAST_TICK = 0;

function tick(event) {
    var npc = event.npc;
    var target = npc.getAttackTarget();
    if (target == null) return;

    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    if (drmEffect.has(target, "minecraft:poison")) {
        NEXT_CAST_TICK = now + 20;
        return;
    }

    var options = drmSkill.options()
        .set("speed", 0.8)
        .set("warmupTicks", 0);

    var ok = drmSkill.use(
        npc,
        "cataclysm:ender_guardian_bullet",
        target,
        5,
        options
    );

    NEXT_CAST_TICK = now + (ok
        ? Math.max(20, drmSkill.lastCooldownTicks())
        : 20);
}
```

`drmEffect` ne lit que l'état. Cet exemple n'implique pas que la compétence sélectionnée applique Poison ; le comportement réel de la compétence appartient au mod fournisseur.

## Copier l'état de l'effet dans les données stockées

Stockez un instantané pour un autre script CustomNPCs ou une condition DRM `cnpc_stored_data`.

```js
function tick(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (!drmEffect.has(npc, "speed")) {
        data.remove("boss.speed.seconds");
        data.remove("boss.speed.level");
        return;
    }

    data.put("boss.speed.seconds",
        String(drmEffect.remainingSeconds(npc, "speed")));
    data.put("boss.speed.level",
        String(drmEffect.level(npc, "speed")));
}
```

Si un snapshot par tick n'est pas nécessaire, mettez-le à jour toutes les ticks 20 avec un compteur. Lorsque les conditions DRM lisent ces valeurs, suivez les règles de comparaison de portée et de nombre dans **CustomNPCs Stored Data Condition Integration**.

## Instantané sécuritaire réutilisable

Cette aide garde les effets absents et infinis distincts.

```js
function effectSnapshot(entity, effectId) {
    if (!drmEffect.has(entity, effectId)) {
        return {
            present: false,
            ticks: 0,
            seconds: 0,
            amplifier: -1,
            level: 0,
            infinite: false
        };
    }

    var ticks = Number(drmEffect.remainingTicks(entity, effectId));
    return {
        present: true,
        ticks: ticks,
        seconds: Number(drmEffect.remainingSeconds(entity, effectId)),
        amplifier: Number(drmEffect.amplifier(entity, effectId)),
        level: Number(drmEffect.level(entity, effectId)),
        infinite: ticks < 0
    };
}
```

Utilisation :

```js
var state = effectSnapshot(event.player, "minecraft:strength");
if (state.present && state.level >= 2) {
    event.player.message("Strength II or higher");
}
```

## Défaillances

| Situation des intrants | `has` | Heure | `amplifier` | `level` |
| --- | ---: | ---: | ---: | ---: |
| Effet absent | faux | 0 | -1 | 0 |
| `entity` est `null`. | faux | 0 | -1 | 0 |
| L'objet n'est pas une entité vivante | faux | 0 | -1 | 0 |
| Identifiant d'effet vierge | faux | 0 | -1 | 0 |
| Syntaxe d'ID non valide | faux | 0 | -1 | 0 |
| Mod facultatif manquant, donc l'effet n'est pas enregistré | faux | 0 | -1 | 0 |
| Effet infini | true | -1 | Valeur réelle | Niveau effectif |

Utilisez cet ordre lorsque l'absence et le niveau zéro ne doivent pas être confondus :

```js
if (drmEffect.has(entity, id)) {
    var level = drmEffect.level(entity, id);
    var ticks = drmEffect.remainingTicks(entity, id);
}
```

## Erreurs courantes

1. N'interprétez pas `amplifier >= 2` comme niveau II ou supérieur. Le niveau II a un amplificateur 1.
2. N'utilisez pas seulement `remainingTicks <= 0` pour l'absence; cela rejette également la durée infinie `-1`. Appelez `has` en premier.
3. Ne pas préfixer un effet modifié avec `minecraft:`. Utilisez son espace de noms mod actuel.
4. Utilisez un identifiant de registre au lieu d'un nom d'affichage ou d'une clé de traduction.
5. Dans un script Tick, null-check `getAttackTarget()` à chaque fois car la cible peut changer.

## Script Globals

| Objet | Objet |
| --- | --- |
| `drmSkill` | Découvrir, cibler-caster, direction-caster, cooldown et annuler les compétences cross-mod |
| `drmAnimation` | Lecture directe de l'animation et mappages comportementaux |
| `drmHitbox` | Touche PNJ, hauteur des yeux et contrôle de la boîte d'attaque |
| `drmCombat` | Autoriser ou bloquer les attaques au corps à corps et à distance par défaut CustomNPCs |
| `drmEffect` | État actuel de l'effet potion |

Chaque objet a une référence complète et des exemples pratiques dans la section API de script.
