---
title: Recharger et munitions Stock
slug: warfare-reload-ammo
order: 350
description: Comment les munitions DW, le timing de rechargement natif, la régénération, le repli et le mouvement de recharge fonctionnent sur les canons pris en charge.
product: dochi-warfare
category: Immo
section: ammo
status: Projet
version: 0.3.1
audience: Firearm PNJ Créateurs
tags:
  - reload
  - ammo
  - magazine
translationSource: en
translationMethod: assisted
---

## Commencez par un garde qui se recharge

Dans **Ammo**, activez **Reload** et **Supply Ammo**, puis commencez par **Reload Type: Normal**. **Ammo Stock** est une munition de réserve, distincte des cartouches déjà chargées dans le canon.

![Rechargement de munitions, réserves, régénération et épuisement.](assets/media/guides/warfare-031-neo1211/dw-ammo.png "DW 0.3.1 / NeoForge 1.21.1. Stock -1 donne des réserves illimitées; Durée de rechargement 0 utilise le temps de rechargement natif du pistolet. Ces réserves ne nécessitent pas un accessoire de magazine désinvolte.")

![Voir un garde tirer trois coups, recharger puis reprendre le tir.](assets/media/guides/extra-videos-20261106/warfare-fire-reload.mp4 "DW 0.3.2 / TACZ 1.1.8 / DNPC 0.1.3 / NeoForge 1.21.1. Exemple préparé : recharge tous les trois tirs. Montre le tir et la recharge.")

## Modèle de munitions

Dochi's Warfare ne permet pas aux PNJ gérés de transporter des munitions de rechange TACZ, PointBlank ou SuperbWarfare à la main. Le PNJ utilise un canon natif pris en charge, tandis que les munitions de réserve sont représentées par des données DW:

| Données | Signification |
| --- | --- |
| `Ammo Stock` | Pièces de rechange pour ce PNJ. `-1` est infini, `0` est vide, les valeurs positives sont des tours de réserve finis. |
| `Ammo Stock Max` | Munition de réserve maximale après régénération. `-1` signifie non écrêté. |
| `Ammo Regen Amount` | Les rounds restaurent chaque intervalle de régénération. `0` Désactive la régénération. |
| `Ammo Regen Interval Ms` | Temps entre les tiques de régénération. `0` Désactive la régénération. |
| `Reload Duration Ms` | Durée du verrouillage de rechargement PNJ. `0` utilise le temps de rechargement natif ou tactique du pistolet opéré. |
| `Reload Speed Multiplier` | Multiplicateur de vitesse de marche seulement pendant le rechargement. `0` arrête le mouvement de rechargement, `1` garde une vitesse normale. |

:::warning N'utilisez pas de munitions à main nue
Les munitions PNJ sont gérées par `Ammo Stock`, l'état de rechargement DW et l'état de pile natif du canon. N'équipez pas de munitions physiques ou d'articles de magazines pour représenter les recharges de PNJ.
:::

## Principaux interrupteurs

| Basculer | Comportement |
| --- | --- |
| `Reload` | Permet au PNJ de recharger après que le canon soit vide. |
| `Supply Ammo` | Utilise un stock de munitions addon pour recharger le pistolet PNJ après le délai de rechargement. |

Si `Supply Ammo` est OFF, l'addon ne se recharge pas de son stock de réserve. Si `Ammo Stock` est `0`, le PNJ n'a pas de munitions de réserve même si le rechargement est activé.

## Types de rechargement

| `Reload Type` | Comportement |
| --- | --- |
| `Normal` | Rechargez lorsque le pistolet devient vide. |
| `Force Fixed` | Forcer un rechargement après `Force Shots` tirs réussis, même si les tours restent chargés. |
| `Force Range` | Après chaque rechargement, roulez un nouveau seuil de réussite de `Force Min` inclusive à `Force Max`, puis forcez le rechargement suivant à ce seuil. |

Les compteurs de recharge forcée utilisent des tirs réussis. Confirmez d'abord la compatibilité du canon natif avec `Normal`, puis utilisez les modes forcés uniquement lorsque la rencontre a besoin de ce rythme.

## Empty-ammo fallback

`Ammo-Aware Switching` ne s'active que lorsque les munitions chargées de l'arme et la réserve PNJ `Ammo Stock` sont épuisées.

| Réglage | Comportement |
| --- | --- |
| `Fallback To Melee` | Continuez le combat avec l'arme de mêlée configurée quand elle est disponible. |
| `Fallback To Unarmed` | Autoriser la mêlée non armée lorsqu'aucune arme de mêlée configurée ne peut être utilisée. |

Lorsque le repli se termine et que les munitions redeviennent utilisables, le PNJ retourne à son arme à distance et recharge le flux. Si la fonction de secours est désactivée, un PNJ complètement épuisé devrait cesser de tirer.

## Réarmement automatique après perte de la cible

`Auto Rearm After Target Loss` est un chemin de récupération optionnel pour un PNJ qui est entré dans le repli d'épuisement des munitions, puis a continuellement perdu sa cible.

1. La cible doit rester absente pour `Rearm Start Delay (Seconds)`.
2. L'acquisition d'une cible annule la récupération en attente.
3. Après le délai, la durée de rechargement configurée s'applique toujours.
4. Une récupération réussie accorde un magazine complet à travers l'adaptateur géré et l'état natif de la pile de pistolets.

Cela ne restaure pas `Ammo Stock` et ne crée pas de munitions physiques. Utilisez-le quand un PNJ de secours devrait être prêt pour la prochaine rencontre sans recevoir de stock de réserve illimité.

L'animation de rechargement est divisée par responsabilité : le haut du corps conserve l'action de rechargement gérée tandis que le bas du corps continue le mouvement réel de marche, de course ou d'accroupissement du PNJ. `Reload Speed Multiplier` modifie la vitesse de déplacement; il ne remplace pas l'état de déplacement actuel du bas du corps par une pose fixe du corps entier.

## Débit de configuration recommandé

1. Commencez par `Ammo Stock: -1`.
2. Confirmez que le PNJ se déclenche, se recharge et retourne au tir.
3. Gardez `Reload Type: Normal`, puis changez `Ammo Stock` pour une valeur finie seulement après que la boucle de base fonctionne.
4. Décidez si la réserve `0` doit arrêter le combat ou passer en mêlée/de secours non armé.
5. Ajoutez `Ammo Regen Amount` et `Ammo Regen Interval Ms` si la rencontre nécessite un réapprovisionnement lent.
6. Réglez `Reload Duration Ms` seulement après que le comportement de rechargement natif du pistolet tenu se sente mal pour la rencontre.
7. Utilisez `Reload Speed Multiplier` pour créer des fenêtres de vulnérabilité pendant le rechargement.
8. Ajoutez `Force Fixed` ou `Force Range` en dernier.
9. Ajoutez le réarmement de perte de cible seulement si un PNJ épuisé devrait récupérer entre les rencontres.

Cet ordre sépare les problèmes de mise à feu des problèmes économiques. Un PNJ en munitions finies qui ne tire jamais peut être vide, mais un PNJ en munitions infinies qui ne tire jamais a probablement un fusil, une cible, une position, une distance ou un problème de ligne de visée.

## RPM et pression des munitions

`RPM Mode`, plage de RPM aléatoire, rafale minimale et maximale, et précision fixe ou rampe tous les changements de pression de munitions. Un PNJ à haut RPM avec des munitions finies peut vider sa réserve rapidement. Un PNJ à faible précision peut paraître cinématographique mais peut gaspiller des munitions si `Ammo Stock` est limité.

Solde dans cet ordre :

1. `RPM Mode: TACZ Native` avec des munitions infinies.
2. Précision fixe.
3. Plage de rafales, rampe de précision ou RPM fixe/aléatoire.
4. Stock de munitions fini.
5. Pénalités de mouvement de régénération ou de rechargement.

## Référence du script et des données stockées

L'interface graphique est le chemin d'installation principal, mais les utilisateurs de script peuvent également travailler avec des valeurs de pont. L'espace de noms des données stockées `tacznpcfire.*` est conservé en tant que contrat de compatibilité interne même si l'ID mod public est maintenant `dochi_warfare`.

| Clé | Signification |
| --- | --- |
| `tacznpcfire.supplyAmmo` | Active ou désactive l'alimentation en munitions d'addon. |
| `tacznpcfire.ammoStock` | `-1` infini, `0` vide, rondes finies positives. |
| `tacznpcfire.ammoStockMax` | Stock maximal pour la régénération. |
| `tacznpcfire.ammoRegenAmount` | Les rounds rétablissent chaque intervalle. |
| `tacznpcfire.ammoRegenIntervalMs` | intervalle de régénération en millisecondes. |
| `tacznpcfire.reloadDurationMs` | Recharger la durée en millisecondes. |
| `tacznpcfire.reloadWalkSpeedMultiplier` | Multiplicateur de mouvement rechargé uniquement. |
| `tacznpcfire.reloadType` | `0` Normal, `1` Force fixe, `2` Portée de la force. |
| `tacznpcfire.forceReload.shots` | Nombre de tirs réussis pour Force Fixe. |
| `tacznpcfire.forceReload.minShots` / `maxShots` | Nombres de tirs réussis minimum et maximum inclus pour la portée de force. |
| `tacznpcfire.combat.ammoAwareSwitching` | Active la logique de commutation lorsque les munitions chargées et de réserve sont toutes deux épuisées. |
| `tacznpcfire.combat.fallbackToMelee` | Permet le repli vers l'arme de mêlée configurée. |
| `tacznpcfire.combat.fallbackToUnarmed` | Permet un repli désarmé lorsqu'aucune arme de mêlée n'est disponible. |

Utilisez les données stockées uniquement lorsque la rencontre a vraiment besoin de modifications côté script. Pour la création normale de PNJ, conservez les valeurs dans l'interface graphique par PNJ afin que les autres créateurs puissent les inspecter visuellement.
