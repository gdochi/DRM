---
title: Intégrations de pistolets gérés
slug: warfare-gun-integrations
order: 365
description: Utilisez les armes TACZ, PointBlank et SuperbWarfare via le contrôleur de combat partagé Dochi's Warfare.
product: dochi-warfare
category: Gun Intégrations
section: integrations
status: Projet
version: 0.3.1
audience: Firearm PNJ Créateurs
tags:
  - TACZ
  - PointBlank
  - SuperbWarfare
translationSource: en
translationMethod: assisted
---

Constructions actuelles: DW 0.3.1 pour Forge 1.20.1 et DW 0.3.1 pour NeoForge 1.21.1. L'IA du véhicule sur les deux chargeurs nécessite l'addon DWE 0.3.1 séparé. Vérifiez l'installation spécifique à [loader](#dochi-warfare/warfare-setup) pour les dépendances externes pistolet/véhicule.

## Donnez à un PNJ une arme d'un autre mod

Avec un mod de canon pris en charge installé, choisissez son canon dans la page **Gun** de DW. Mettez l'élément réel dans l'inventaire du créateur, ouvrez le PNJ avec DW Npc Core, sélectionnez l'élément, puis confirmez l'aperçu et **Stored gun** avant d'enregistrer.

![Sélection des armes à feu et un pool M4A1 stocké.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / NeoForge 1.21.1, interface utilisateur en anglais. L'icône supérieure provient de l'inventaire du créateur; la liste inférieure est le pool à stocker sur le PNJ. Cet exemple a un M4A1 à 100 %.")

DW contrôle qui le PNJ détecte et quand il se déclenche ou se recharge. Le mod original fournit le modèle, le projectile, les sons intrinsèques et la mécanique de tir supportée. Lorsque vous changez d'arme, vérifiez la portée, la cadence et les actions spéciales prises en charge aux côtés des paramètres DW.

## Adaptateurs pris en charge

| Système d'arme | Besoins | Comportement natif retenu |
| --- | --- | --- |
| TACZ | Requis 1.1.8 dans la plage prise en charge 1.1.x | Tir, état du canon, état de rechargement, RPM, museau/effets et persistance de la pile |
| PointBlank | Facultatif 1.11.1 ou 2.1.0; installer exactement un | Projectile ou hitscan natif, rayons multi-pellet, headshots, falloff, phases de rechargement, sons et rendu |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2 | Tir natif, rechargement, boulon, projectile, son, chaleur, recul, durabilité, modèles, accessoires et persistance |

TACZ et Player Animator restent la base d'exécution et d'animation même lorsque l'élément géré provient de PointBlank ou SuperbWarfare.

:::warning Version gates
Il suffit d'installer une branche PointBlank prise en charge : 1.11.1 ou 2.1.0. Utilisez les versions SuperbWarfare spécifiques au chargeur ci-dessus.
:::

## Configurer un canon externe

1. Confirmer qu'un TACZ 1.1.8 simple pistolet fonctionne sur le PNJ.
2. Installez exactement une version de mod d'arme à feu optionnelle prise en charge des deux côtés.
3. Mettez l'objet natif dans l'inventaire du créateur.
4. Ouvrez le PNJ avec `DW Npc Core` et sélectionnez l'élément dans `Gun`. Pour plusieurs armes à feu, faites au total des chances de pool 100% ou appuyez sur `Even`.
5. Gardez `Ammo Stock: -1`, `Reload Duration Ms: 0`, et une simple cible visible pour le premier test.
6. Enregistrez, vérifiez le rendu et le tir natifs, puis ajoutez des munitions finies, des pools, un RPM personnalisé ou une IA avancée.

Les objets pris en charge peuvent également être mélangés dans un pool d'armes à distance aléatoire. Une arme à feu spéciale ou de mêlée uniquement non prise en charge est rejetée plutôt que partiellement gérée.

## RPM, rechargement et munitions

L'étiquette UI `RPM Mode: TACZ Native` est conservée pour des raisons de compatibilité. Pour un adaptateur optionnel, le mode natif résout la cadence prise en charge par le pistolet. Les paramètres de RPM fixes et aléatoires sont toujours limités par un comportement de recharge natif; un pistolet rejetant un tir ne consomme pas d'occasion de tir DW supplémentaire.

`Reload Duration Ms: 0` utilise le temps de rechargement natif ou tactique du pistolet opéré. Une valeur positive est une surcharge manuelle. Les munitions de réserve proviennent toujours de DW `Ammo Stock` ; aucun TACZ, PointBlank ou SuperbWarfare munitions ou chargeur ne doit être placé dans le PNJ à la main.

## Résolution des problèmes d'échec

Si TACZ fonctionne mais qu'un pistolet externe ne fonctionne pas :

1. Vérifiez la version exacte de l'adaptateur.
2. Retirez l'autre branche PointBlank si les deux sont installés.
3. Testez une arme à feu normale sans procédures de tir spécial ou de mêlée uniquement.
4. Gardez un RPM natif, des munitions de réserve infinies et une ligne de vue claire.
5. Vérifiez les messages du serveur pour un pistolet ou une version non pris en charge.

Ne compensez pas un adaptateur incompatible en augmentant le nombre de tours par minute, en ajoutant des munitions à main levée ou en remplaçant le moteur de rendu natif.
