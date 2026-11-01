---
title: API Cross-Mod Skill Script
slug: script-skill-api
order: 129
description: Les sorts de fonte, les créatures de Mowzie et les compétences de cataclysme des scripts CustomNPCs jusqu'à drmSkill.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs Auteurs de scénarios de combat et de boss
tags:
  - script
  - customnpcs
  - skill
  - forge
translationSource: en
translationMethod: assisted
---

## Laissez un PNJ lancer un sort installé

Cette API connecte le sort d'un fournisseur installé à un lanceur de sorts CustomNPCs. Vérifiez que le fournisseur est présent et que le sort est disponible avant de lancer. L’écran affiche un appel réel de niveau 1 à la boule de feu des sorts de fer. Pour configurer le timing, la portée et les phases via un éditeur, utilisez [BattleWorks compétences et effets](#mob-editor/battleworks-skills-effects).

![Réel permet à un npc de lancer un résultat de sort installé.](assets/media/guides/drm-031-forge1201-apis/api-skill-fireball.png "DRM 0.3.1 / Forge 1.20.1 avec CustomNPCs et les sorts de fer 3.4.0.9. L’appel renvoie le succès et produit l’effet de sort réel ; l’état de santé du serveur de la vache préparée passe de 100 à 90. Ce cas unique n'est pas une valeur universelle de dommages pour d'autres niveaux ou défenses.")

## Aperçu général

`drmSkill` est un objet de script global CustomNPCs qui permet à un CustomNPCs PNJ de lancer des sorts publics, des effets et des projectiles fournis par d'autres Forge mods. DRM 0.1.4 comprend ces fournisseurs :

| ID du fournisseur | Mod | Modèle d'exposition |
| --- | --- | --- |
| `irons_spellbooks` | Iron's Spells n Spellbooks | Expose dynamiquement le registre orthographique activé pour la version installée |
| `mowziesmobs` | Les créatures de Mowzie | Expose six DRM compétences d'effet testées |
| `cataclysm` | L_EnderCataclysme | Expose cinq DRM effets testés ou compétences de projectile |

Les intégrations Mowzie et Cataclysm ne copient pas l'IA du patron privé. Ils créent des effets publics ou des entités de projectiles appartenant au PNJ. Un mod facultatif manquant ou incompatible renvoie `false` au lieu de planter le script.

:::warning Exigences d'exécution
`drmSkill` est enregistré lorsque Forge 1.20.1 DRM et CustomNPCs sont chargés ensemble. Le lanceur de sorts doit être un PNJ CustomNPCs côté serveur. Un joueur, une créature ordinaire, une entité morte ou une entité côté client est rejetée en tant que lanceur de sorts.
:::

## Le plus petit exemple

Lancer une boule de feu de sorts de fer de niveau 5 sur le joueur en interaction.

```js
function interact(event) {
    var success = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (!success) {
        event.npc.say("Cast failed: " + drmSkill.lastCode());
    }
}
```

`use` renvoie `true` lorsque la distribution est acceptée et `false` lorsqu'elle est rejetée ou annulée. Un niveau demandé en dehors de la définition de compétence est serré à son minimum ou maximum.

## Référence API

### Découverte

| Appeler | Retour | Objet |
| --- | --- | --- |
| `drmSkill.providers()` | Tableau de chaînes | ID de fournisseur disponibles |
| `drmSkill.skills()` | Tableau de chaînes | Tous les identifiants de compétences disponibles, triés |
| `drmSkill.skills(provider)` | Tableau de chaînes | Identifiants de compétences d'un fournisseur |
| `drmSkill.available(skillId)` | booléen | Si la compétence est actuellement utilisable |
| `drmSkill.describe(skillId)` | Chaîne JSON | Niveau, temps de recharge, plage et exigences cibles |

```js
function init(event) {
    var providers = drmSkill.providers();
    var skills = drmSkill.skills("mowziesmobs");

    event.npc.getStoreddata().put("drm.provider.count", providers.length);
    event.npc.getStoreddata().put("drm.mowzie.skill.count", skills.length);
}
```

`describe` renvoie une chaîne JSON avec ces champs :

```js
var text = drmSkill.describe("mowziesmobs:solar_beam");
// {"id":"mowziesmobs:solar_beam","label":"Solar Beam",
//  "minLevel":1,"maxLevel":10,"cooldownTicks":120,
//  "maxRange":64.0,"requiresTarget":false,"supportsDirection":true}
```

Il retourne `{}` pour une compétence inconnue. Utilisez `JSON.parse(text)` lorsque le moteur de script CustomNPCs a besoin d'un objet.

### Casts cibles

```js
drmSkill.use(npc, skillId);
drmSkill.use(npc, skillId, target);
drmSkill.use(npc, skillId, target, level);
drmSkill.use(npc, skillId, target, level, options);
drmSkill.use(npc, skillId, target, level, affectNpcs);
drmSkill.use(npc, skillId, target, level, affectNpcs, options);
```

`cast(...)` est un alias pour `use(...)` ; `use` est recommandé car il a le jeu de surcharge complet le plus clair. `target` peut être une enveloppe CustomNPCs ou une entité vivante Minecraft. Passez `null` uniquement pour une compétence qui ne nécessite pas de cible.

### Direction Casts

```js
drmSkill.useDirection(npc, skillId, x, y, z);
drmSkill.useDirection(npc, skillId, x, y, z, level);
drmSkill.useDirection(npc, skillId, x, y, z, level, options);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs);
drmSkill.useDirection(npc, skillId, x, y, z, level, affectNpcs, options);
```

`castDirection(...)` est l'alias. DRM normalise le vecteur, de sorte que sa longueur ne doit pas être 1. Les trois valeurs doivent être finies et le vecteur ne doit pas être `(0, 0, 0)`.

```js
// Cast along the NPC's look direction.
var rotation = event.npc.getRotation();
var yaw = Number(rotation[0]) * Math.PI / 180.0;
var pitch = Number(rotation[1]) * Math.PI / 180.0;
var x = -Math.sin(yaw) * Math.cos(pitch);
var y = -Math.sin(pitch);
var z =  Math.cos(yaw) * Math.cos(pitch);

drmSkill.useDirection(
    event.npc,
    "cataclysm:ignis_fireball",
    x, y, z,
    4
);
```

Si une définition nécessite strictement une cible, un lancer de direction est discrètement annulé. Il retourne `false`, `lastCode()` est `cancelled`, aucun temps de recharge n'est consommé, et aucun diagnostic d'erreur n'est écrit.

## Contrôler les dommages aux PNJ

`affectNpcs` par défaut à `true`. Passer `false` fait que ce sort inflige zéro dégât spécifiquement aux CustomNPCs PNJ.

```js
var success = drmSkill.use(
    event.npc,
    "mowziesmobs:solar_beam",
    event.npc.getAttackTarget(),
    4,
    false,
    drmSkill.options().set("durationTicks", 50)
);
```

| Valeur | CustomNPCs Dégâts PNJ | Dégâts du joueur | Dégâts de créature non-CustomNPC |
| --- | --- | --- | --- |
| `true` | Autorisé | Autorisé | Autorisé |
| `false` | Bloqué | Autorisé | Autorisé |

Ce n'est pas un test de faction, d'équipe ou de tir amical. Il filtre uniquement si l'entité endommagée est un PNJ CustomNPCs. Les poutres traquées, les souffles et les projectiles conservent la politique tandis que DRM peuvent les associer au lanceur.

Le constructeur d'options peut avoir le même paramètre :

```js
var options = drmSkill.options()
    .affectNpcs(false)
    .set("durationTicks", 50);

drmSkill.use(event.npc, "mowziesmobs:solar_beam", target, 4, options);
```

Une surcharge booléenne explicite a priorité lorsque les deux emplacements fournissent le paramètre.

## Options sans citations échappées

Le constructeur est le formulaire de saisie le plus lisible.

```js
var options = drmSkill.options()
    .set("damage", 14)
    .set("speed", 1.1)
    .set("warmupTicks", 8)
    .set("soul", true);
```

`set` renvoie le même constructeur pour le chaînage. `set(key, null)` supprime une touche, `clear()` supprime toutes les entrées, et `size()` renvoie le compte courant.

Les formulaires suivants sont également acceptés :

```js
// JavaScript object
drmSkill.use(npc, skillId, target, 4, {
    durationTicks: 50,
    damage: 14
});

// Relaxed object text: keys and numbers need no quotes
drmSkill.use(npc, skillId, target, 4, "{durationTicks:50, damage:14}");

// key=value text
drmSkill.use(npc, skillId, target, 4, "durationTicks=50, damage=14");

// Existing valid JSON text remains compatible
drmSkill.use(npc, skillId, target, 4, '{"durationTicks":50}');
```

:::note Limites d'entrée
Un appel accepte jusqu'à 32 options primitives. La saisie de texte est limitée à 2,048 caractères. Les touches acceptent 1–48 les lettres minuscules, les chiffres, les points, les tirets bas ou les traits d'union; les valeurs sont limitées à 256 caractères. N'imbriquez pas des tableaux ou des objets en tant que valeurs. Invalid input renvoie `false` avec `rejected`.
:::

Les touches d'option sont normalisées en minuscules en interne. La documentation utilise des noms lisibles tels que `durationTicks`, `warmupTicks` et `affectNpcs`; la recherche du fournisseur est insensible à la casse après normalisation.

## Compétences et options du fournisseur

### Iron's Spells n Spellbooks

DRM lit dynamiquement jusqu'à 512 les sorts activés à partir de la version installée. Découvrez la liste exacte des serveurs au lieu de supposer qu'un sort existe.

```js
var ids = drmSkill.skills("irons_spellbooks");
for (var i = 0; i < ids.length; i++) {
    event.npc.say(String(ids[i]));
}
```

L'ID de la compétence est l'ID du registre des sorts, tel que `irons_spellbooks:fireball`. Les descriptions utilisent a 64- gamme de blocs, et il n'y a actuellement aucun DRM options spécifiques au fournisseur. Le sort peut toujours rejeter un lancer à travers ses propres conditions prédéfinies ou règles d'état.

```js
if (drmSkill.available("irons_spellbooks:fireball")) {
    drmSkill.use(event.npc, "irons_spellbooks:fireball", event.player, 5);
}
```

### Les créatures de Mowzie

| ID de compétence | Temps de recharge | Portée maximale | Options et limites |
| --- | ---: | ---: | --- |
| `mowziesmobs:sunstrike` | 40 tiques | 64 | Néant |
| `mowziesmobs:solar_beam` | 120 tiques | 64 | `durationTicks`: 10–100 |
| `mowziesmobs:ice_breath` | 100 tiques | 32 | Néant |
| `mowziesmobs:boulder_projectile` | 60 tiques | 64 | `damage`: 1–100, `speed`: 0.2–2.0 |
| `mowziesmobs:axe_attack` | 40 tiques | 16 | `vertical` : par défaut `false` |
| `mowziesmobs:axe_attack_vertical` | 60 tiques | 16 | `vertical` : par défaut `true` |

Toutes les définitions de Mowzie utilisent les niveaux 1–10 et soutiennent la cible ou la direction visée. Par défaut, Solar Beam vaut `30 + level × 5`. Les dégâts de Boulder sont par défaut de `3 + level × 2`, la vitesse de `0.9 + level × 0.04`, et son niveau de taille augmente avec le niveau.

```js
var boulder = drmSkill.options()
    .set("damage", 18)
    .set("speed", 1.2);

drmSkill.use(
    event.npc,
    "mowziesmobs:boulder_projectile",
    event.npc.getAttackTarget(),
    5,
    boulder
);
```

### L_EnderCataclysme

| ID de compétence | Temps de recharge | Portée maximale | Options et limites |
| --- | ---: | ---: | --- |
| `cataclysm:void_rune` | 60 tiques | 64 | `damage`: 0–200, `warmupTicks`: 0–100 |
| `cataclysm:ignis_fireball` | 30 tiques | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Booléen |
| `cataclysm:ignis_soul_fireball` | 50 tiques | 64 | `speed`: 0.1–1.0, `warmupTicks`: 0–100, `soul`: Booléen |
| `cataclysm:ignis_abyss_fireball` | 80 tiques | 64 | `speed`: 0.1–0.8, `warmupTicks`: 0–100 |
| `cataclysm:ender_guardian_bullet` | 20 tiques | 80 | `speed`: 0.1–2.0, `warmupTicks`: 0–100 |

Toutes les définitions de Cataclysm utilisent les niveaux 1–10 et supportent la cible ou la direction visée. Les options omises utilisent des valeurs par défaut basées sur le niveau.

```js
var rune = drmSkill.options()
    .set("damage", 14)
    .set("warmupTicks", 8);

drmSkill.use(event.npc, "cataclysm:void_rune", target, 4, rune);
```

## Résultats et temps de recharge

Le résultat le plus récent `use` ou `useDirection` est conservé pour le fil de script courant.

```js
var success = drmSkill.use(event.npc, skillId, target, level);
var code = String(drmSkill.lastCode());
var message = String(drmSkill.lastMessage());
var cooldown = Number(drmSkill.lastCooldownTicks());
```

| Code | Signification | Réponse typique |
| --- | --- | --- |
| `success` | Cast accepté | Réessayer après `lastCooldownTicks()` |
| `invalid_caster` | Pas un serveur CustomNPCs NPC | Vérifier le lanceur et le côté logique |
| `invalid_skill` | Identifiant de compétence inconnu | Utiliser `available` ou `skills` |
| `provider_unavailable` | Fournisseur mod ou API indisponible | Vérifier la version du mod et l'installation du serveur |
| `invalid_target` | Cible manquante ou non valide | Attendre une nouvelle cible |
| `out_of_range` | Cible supérieure à la portée maximale | Réessayez quand vous êtes plus proche |
| `cooldown` | DRM le temps de recharge est actif | Attendez les tiques restantes retournées |
| `cancelled` | Annulation calme normale | Fin sans gestion des erreurs |
| `rejected` | Validation du fournisseur ou de l'option rejetée | Lire `lastMessage` |
| `error` | Exception d'exécution fournisseur | Inspecter les journaux DRM |

Interroger ou effacer les temps de recharge directement si nécessaire :

```js
var ticks = drmSkill.cooldownRemaining(event.npc, skillId);
var cleared = drmSkill.clearCooldown(event.npc, skillId);
```

Une distribution réussie stocke un temps de recharge par PNJ et par compétence. Les échecs et les annulations silencieuses ne consomment pas un nouveau temps de recharge.

## Complete Tick Script

Ce script lance un bloc de niveau 5 pendant qu'une cible d'attaque existe et planifie les tentatives en fonction du résultat.

```js
var NEXT_CAST_TICK = 0;
var SKILL_ID = "mowziesmobs:boulder_projectile";

function tick(event) {
    var npc = event.npc;
    var now = Number(npc.getWorld().getTotalTime());
    if (now < NEXT_CAST_TICK) return;

    var target = npc.getAttackTarget();
    if (target == null) {
        NEXT_CAST_TICK = now + 10;
        return;
    }

    if (!drmSkill.available(SKILL_ID)) {
        NEXT_CAST_TICK = now + 100;
        return;
    }

    var options = drmSkill.options()
        .set("damage", 14)
        .set("speed", 1.1);

    if (drmSkill.use(npc, SKILL_ID, target, 5, false, options)) {
        NEXT_CAST_TICK = now + Math.max(10, drmSkill.lastCooldownTicks());
        return;
    }

    var code = String(drmSkill.lastCode());
    if (code == "cooldown") {
        NEXT_CAST_TICK = now + Math.max(1, drmSkill.lastCooldownTicks());
    } else if (code == "invalid_target" || code == "out_of_range") {
        NEXT_CAST_TICK = now + 10;
    } else {
        NEXT_CAST_TICK = now + 20;
    }
}

function died(event) {
    drmSkill.cancel(event.npc);
}
```

`cancel(npc)` supprime les faisceaux suivis, les souffles, les projectiles et les entités d'effet créés par ce PNJ et renvoie le nombre supprimé. Appelez-le sur la mort de PNJ, une transition de phase de patron, ou une interruption explicite de compétence.

## Combiner DRM APIs de script

```js
function castBossSkill(npc, target) {
    drmCombat.setAttacks(npc, false, false);
    drmAnimation.playEntityAnimation(npc, "attack_animation", 1.0, 40);

    var ok = drmSkill.use(npc, "cataclysm:void_rune", target, 5,
        drmSkill.options().set("damage", 18));

    if (!ok && String(drmSkill.lastCode()) != "cancelled") {
        npc.say("skill: " + drmSkill.lastCode());
    }
    return ok;
}
```

Les pages `drmAnimation`, `drmHitbox` et `drmCombat` documentent leurs méthodes et contraintes complètes. Utilisation `drmEffect` des **Potion Effect Query Script API** gate a cast par un effet actif.

### Annoncer une compétence réussie avec un popup

Une définition enregistrée par Popup Maker peut être jouée à partir du même script par `drmPopup`. Cet exemple montre `area_title.json` au joueur après une distribution réussie et ne remplace que son corps de texte.

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "irons_spellbooks:fireball",
        event.player,
        5
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "area_title.json",
            "Fireball cast\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

`drmPopup.text` renvoie le nombre de joueurs ayant reçu la présentation. Voir **Popup Maker Script API** pour toutes les méthodes, sauts de ligne, tableaux cibles et limites de stratégie.

## Dépannage et journaux

Chaque appel de compétence non annulé écrit un diagnostic aux deux endroits :

```text
config/dochi_rpg_maker/debug.log
logs/latest.log
```

Rechercher :

```text
NPC skill script call:
```

La ligne contient `skill`, demandé `level`, `success`, `code`, `cooldownTicks` et `message`.

1. Si `drmSkill` est indéfini, vérifiez les versions DRM et CustomNPCs et la ligne d'enregistrement de l'API de script au démarrage du serveur.
2. Pour `provider_unavailable`, vérifiez le mod fournisseur et sa version de serveur prise en charge.
3. Pour `invalid_skill`, inspecter `skills(provider)` au lieu de deviner un ID.
4. Pour `invalid_target` ou `out_of_range`, inspectez la cible d’attaque actuelle et la portée `describe`.
5. Pour `rejected`, lire `lastMessage()` et l'option fournisseur ci-dessus.
6. Si des effets persistants persistent, appelez `cancel(npc)` à partir des chemins de mort et de fin de phase.

## Addon Providers

Autre Forge addon peut être utilisé DRMde `NpcSkillProvider` et l'enregistrer à travers `NpcSkillRegistry.register(provider)`. Le fournisseur fournit un ID de fournisseur unique, des définitions de compétences et un `NpcSkillResult` côté serveur. Les scripts utilisent alors les mêmes méthodes `providers`, `skills`, `describe` et `use` sans avoir besoin d'un autre objet global.
