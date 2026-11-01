---
title: API de script d'attaque intégrée
slug: script-combat-api
order: 127
description: Utilisez drmCombat dans les scripts CustomNPCs pour activer ou désactiver les attaques intégrées de mêlée et à distance d'un PNJ.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs Auteurs de scripts de combat
tags:
  - script
  - customnpcs
  - combat
  - ai
translationSource: en
translationMethod: assisted
---

## Désactiver les attaques intégrées pour un PNJ scripté

Un acteur CustomNPCs utilisant des sorts ou des attaques personnalisées peut désactiver ses attaques intégrées au corps à corps et à distance. Le résultat ci-dessous vérifie les deux commutateurs stockés après les avoir désactivés. Ce paramètre à lui seul n'ajoute aucun sort ou motif de combat. Pour les attaques à l'écran, commencez par [BattleWorks](#mob-editor/battleworks-first-attack).

![Désactive les attaques intégrées pour un résultat npc scripté.](assets/media/guides/drm-031-forge1201-apis/api-combat-switches.png "DRM 0.3.1 / Forge 1.20.1 avec CustomNPCs. true dans le chat signifie que le changement a été accepté; melee-false / ranged-false sont les états désactivés interrogés. Cela vérifie l'état de changement plutôt que d'un cycle de combat complet.")

## Premiers pas

`drmCombat` est une API de script faisant autorité pour activer ou désactiver indépendamment les attaques intégrées de mêlée et à distance d'un CustomNPCs PNJ.

Désactivez les attaques intégrées pour un PNJ qui n'utilise que des sorts ou des attaques scriptées personnalisées.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, false);
}
```

N'autorisez que les attaques à distance comme suit.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, true);
}
```

:::note Objectif
Les méthodes de changement d'état n'acceptent qu'un PNJ côté serveur CustomNPCs. Une autre entité ou une cible côté client renvoie `false`.
:::

## Commutateurs d'attaque individuels

```js
drmCombat.setMeleeAttack(event.npc, false);
drmCombat.setRangedAttack(event.npc, true);
```

| Méthode | Effet lorsque `enabled` est `false` |
| --- | --- |
| `setMeleeAttack` | Arrête le démarrage, la continuation et l'exécution directe de mêlée. |
| `setRangedAttack` | Démarrage de l'IA à distance et exécution directe à distance. |

Utilisez `setAttacks(npc, meleeEnabled, rangedEnabled)` pour changer les deux commutateurs en un seul appel.

## Lecture de l'état actuel

```js
var meleeEnabled = drmCombat.isMeleeAttackEnabled(event.npc);
var rangedEnabled = drmCombat.isRangedAttackEnabled(event.npc);
```

Les deux requêtes renvoient `true` lorsqu'aucun verrou n'a été enregistré. Les PNJ existants conservent donc l'héritage par défaut dans lequel les attaques au corps à corps et à distance sont autorisées.

Les méthodes de requête traitent également une cible non valide comme l'héritage `true` par défaut. Ne les utilisez pas pour valider une cible ; vérifiez plutôt la valeur de retour d'une méthode de changement d'état.

## Persistance et comportement de l’IA

Les commutateurs sont stockés côté serveur dans les données persistantes du PNJ. Ils survivent PNJ et recharge le monde. La réactivation d'une attaque supprime sa clé de verrouillage.

```js
function enableNormalCombat(npc) {
    return drmCombat.setAttacks(npc, true, true);
}
```

À distance `enabled` signifie autorisé, pas prêt. Le CustomNPCs PNJ doit également avoir un élément de projectile non vide dans sa fente de projectile avant que l’IA à distance puisse fonctionner. Lorsque les attaques à distance sont désactivées ou qu'aucun projectile utilisable n'existe, un PNJ avec la mêlée activée est traité comme sans projectile afin que son IA de mêlée puisse fonctionner.

## Valeurs de retour et modèle d'utilisation

Les méthodes de changement d'état renvoient `true` après avoir appliqué des valeurs à un PNJ côté serveur CustomNPCs et `false` lorsqu'elles ne peuvent pas appliquer la modification.

```js
function makeMagicOnly(npc) {
    if (!drmCombat.setAttacks(npc, false, false)) {
        // Verify that this is a server-side CustomNPCs NPC.
        return false;
    }

    // Configure separate spell or scripted attacks here.
    return true;
}
```

La désactivation des attaques intégrées ne bloque pas les dommages scriptés séparés tels qu'un appel `drmHitbox`. Ces commutateurs contrôlent uniquement les chemins d'attaque intégrés CustomNPCs en mêlée et à distance.

## Référence complète de signature

```js
drmCombat.setMeleeAttack(npc, enabled);
drmCombat.setRangedAttack(npc, enabled);
drmCombat.setAttacks(npc, meleeEnabled, rangedEnabled);
drmCombat.isMeleeAttackEnabled(npc);
drmCombat.isRangedAttackEnabled(npc);
```
