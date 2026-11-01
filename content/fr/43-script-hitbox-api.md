---
title: API Hitbox Script
slug: script-hitbox-api
order: 126
description: Utilisez drmHitbox dans CustomNPCs scripts pour créer des volumes d'attaque one-shot faisant autorité sur le serveur.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs Auteurs de scripts de combat
tags:
  - script
  - customnpcs
  - hitbox
  - combat
translationSource: en
translationMethod: assisted
---

## Voir où une attaque one-shot frappe

Vérifiez les particules de forme séparément des dommages réels. Cet exemple donne une seule vache à une sphère centrée sur le joueur, le rayon six, et applique six dégâts une fois. Même avec la même vache répertoriée deux fois, le nombre de succès est un et la santé passe de 20 à 14. Pour la création de motifs à l'écran, commencez par [BattleWorks première attaque](#mob-editor/battleworks-first-attack).

![Réel voir où une attaque d'un coup frappe le résultat.](assets/media/guides/drm-031-forge1201-apis/api-hitbox-one-shot.png "DRM 0.3.1 / Forge 1.20.1. Comparez les particules de débogage blanches, appariées 1 / endommagées 1 dans le chat et la santé des vaches 20 → 14. Il s'agit d'un test serveur en un coup contre une vache préparée.")

## Premiers pas

`drmHitbox` est une API de volume d'attaque faisant autorité sur le serveur qui évalue une fois lorsqu'elle est appelée. Passer un attaquant et des cibles candidates ; les cibles dont les limites d'entité coupent la forme demandée reçoivent des dégâts.

```js
function slash(attacker, targets) {
    return drmHitbox.arc(
        attacker,
        targets,
        0.0, 1.0, 1.5,
        3.5, 100.0, 2.0,
        8.0,
        false
    );
}
```

La valeur de retour est le nombre d'entités endommagées avec succès, pas seulement le nombre qui a intersecté le volume.

## Attaquant et cibles

- `attacker` peut être une enveloppe d'entité de script CustomNPCs ou une entité vivante Minecraft.
- `targets` peut être une entité vivante, un tableau, une collection itérable ou les valeurs d'une carte.
- Les entités dupliquées sont évaluées une fois par UUID.
- Un appel évalue au plus 256 des candidats uniques.
- L'attaquant, les cibles mortes et les cibles d'un autre niveau sont ignorés.

`drmHitbox` ne cherche pas dans le monde environnant pour vous. Recueillir les candidats dans le script et ne passer que les cibles souhaitées. Cela permet de sélectionner des joueurs, des factions ou tout autre groupe filtré séparément avant d'appliquer le volume.

## Coordonnées et formes

`offsetX`, `offsetY` et `offsetZ` sont des coordonnées locales basées sur la position des pieds de l'attaquant. Les décalages horizontaux et l'orientation de la forme tournent avec le lacet actuel de l'attaquant. Un `offsetZ` positif place le volume devant l'attaquant.

| Méthode | Taille des arguments | Volume |
| --- | --- | --- |
| `box` | `width`, `height`, `depth` | Une boîte tournée avec l'attaquant |
| `rectangle` | `width`, `height`, `depth` | Alias de `box` |
| `sphere` | `radius` | Sphère |
| `circle` | `radius`, `height` | Cylindre horizontal |
| `cylinder` | `radius`, `height` | Même cylindre que `circle` |
| `arc` | `range`, `angleDegrees`, `height` | Secteur horizontal orienté vers l'avant |

Un volume avec une hauteur s'étend moitié au-dessus et moitié au-dessous du centre sélectionné par `offsetY`.

```js
// 3 x 2 x 2 box in front of the attacker
drmHitbox.box(attacker, targets, 0, 1, 2, 3, 2, 2, 6, false);

// Sphere with radius 2.5
drmHitbox.sphere(attacker, targets, 0, 1, 0, 2.5, 4, false);

// 120-degree forward sector
drmHitbox.arc(attacker, targets, 0, 1, 0, 4, 120, 2, 8, false);
```

Les dégâts utilisent une attaque de joueur ou une source d'attaque de créature attribuée à l'attaquant.

## Déboguer les particules

Le dernier argument de chaque méthode est `debug`. Lorsque `true`, DRM dessine le volume et les marqueurs cibles endommagés avec des particules. Un attaquant de joueur reçoit le résumé directement ; pour un autre attaquant vivant tel qu'un PNJ, les joueurs dans les blocs 64 le reçoivent. Le journal du serveur enregistre le même résumé et les cibles endommagées.

```js
drmHitbox.arc(
    attacker, targets,
    0, 1, 1,
    4, 90, 2,
    8,
    "minecraft:crit",
    true
);
```

Omettre l'ID de particule utilise `minecraft:end_rod`. Un ID de particule non valide, ou un type de particule qui nécessite des données supplémentaires, revient à `minecraft:end_rod` et signale le repli dans la sortie de débogage.

Il n'y a pas de moteur de débogage en ligne directe séparé. `line` n'est pas une valeur spéciale et est traité comme un ID de particule non supporté.

:::warning Serveurs de production
Le mode de débogage émet des particules de forme, des marqueurs de frappe, des messages et des lignes de journal. Activez-le tout en vérifiant un volume et laissez-le `false` dans les scripts de combat normaux.
:::

## Plages acceptées

| Valeur | Portée acceptée |
| --- | --- |
| Chaque offset | `-64.0` par l'intermédiaire `64.0` |
| Largeur, hauteur, profondeur, rayon, portée | Plus grand que `0`, jusqu'à `64.0` |
| Arc angle | Plus grand que `0`, jusqu'à `360.0` |
| Dommages | Plus grand que `0`, jusqu'à `2048.0` |

Les nombres non finis ou hors de portée et les noms de forme inconnus renvoient `0` sans appliquer de dégâts. Lorsque le débogage est activé et que l'attaquant est un joueur, DRM affiche également un message de rejet d'argument non valide.

## Référence complète de signature

Chaque forme a une surcharge de particules par défaut et une surcharge avec `debugParticle`. Les crochets ci-dessous décrivent la position facultative ; ne tapez pas les crochets dans un script.

```js
drmHitbox.hit(attacker, targets, shape,
    offsetX, offsetY, offsetZ,
    sizeA, sizeB, sizeC,
    damage, [debugParticle], debug);

drmHitbox.box(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.rectangle(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.sphere(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, damage, [debugParticle], debug);

drmHitbox.circle(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.cylinder(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.arc(attacker, targets,
    offsetX, offsetY, offsetZ,
    range, angleDegrees, height,
    damage, [debugParticle], debug);
```

Pour le générique `hit`, `sizeA`, `sizeB` et `sizeC`, suivez le même ordre que les arguments de taille de la forme sélectionnée. Une sphère utilise seulement `sizeA`, un cylindre utilise `sizeA` et `sizeB`.
