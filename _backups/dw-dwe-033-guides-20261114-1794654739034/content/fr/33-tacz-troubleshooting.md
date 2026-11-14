---
title: Dépannage
slug: warfare-troubleshooting
order: 360
description: Diagnostiquez Dochi's Warfare pistolets PNJ, adaptateurs optionnels, IA de véhicule, outils clones, pièges, munitions, visuels et performances.
product: dochi-warfare
category: Opérations
section: operations
status: Projet
version: 0.3.1
audience: Opérateurs
tags:
  - troubleshooting
  - reload
  - npc
translationSource: en
translationMethod: assisted
---

## Débit d'isolement rapide

Lorsqu'un PNJ d'arme à feu échoue, réduisez la configuration avant de changer de nombreuses valeurs :

1. Utilisez un DNPC frais. Les acteurs CustomNPCs pris en charge sont également disponibles sur 1.20.1 et 1.21.1.
2. Utilisez un pistolet uni TACZ 1.1.8 avant de tester un adaptateur optionnel PointBlank ou SuperbWarfare.
3. Allumez `TACZ Fire NPC Mode` et `Enabled`.
4. Utilisez `Stance: Ranged` ou `Stance: Auto`.
5. Garder `Ammo Stock: -1`.
6. Dans Cibles, sélectionnez la cible de test prévue. Une liste vide ne rend pas automatiquement chaque entité hostile.
7. Testez avec une cible visible à l'intérieur `Max Distance`.

Si cela fonctionne, l'addon et la boucle d'arme vont bien. Ajoutez des filtres, des munitions finies, des mouvements, des pools et des effets une étape à la fois.

![M4A1 sélectionné dans l'écran réel du pistolet DW.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, anglais UI. Confirmez l'arme souhaitée dans Stocked gun et PNJ Preview. Cela montre la sélection, pas la preuve de tir.")

## Guide des symptômes

| Symptôme | Contrôles probables |
| --- | --- |
| `DW Npc Core` n'ouvre pas l'interface graphique attendue | Utilisez le mode créatif. Cliquez avec le bouton droit sur un DNPC ou un PNJ pris en charge CustomNPCs pour les paramètres PNJ, un véhicule pris en charge SuperbWarfare pour les paramètres du véhicule ou de l'air pour la bibliothèque de clones. |
| Les PNJ ne brûlent jamais | Vérifiez `TACZ Fire NPC Mode`, `Enabled`, la position, le pistolet pris en charge sélectionné, la visibilité de la cible, `Max Distance`, les règles de la cible et le stock de munitions. |
| PNJ voit la cible mais attend | Vérifiez `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle` et la ligne de mire. |
| Le PNJ manque une cible proche derrière lui | Vérifier `Close Detection` et `Close Detect Distance`. OFF est attendu pour un PNJ intentionnel de type backstab. |
| Le PNJ ignore les tirs du joueur ou bloque les actions | Vérifiez `Sound Detection`, chaque plage d'événements, `Detect Distance` et `Sound Investigation`. Les joueurs créatifs et spectateurs sont ignorés. |
| Le rythme de tir des PNJ est incorrect | Vérifiez `RPM Mode`, `Fixed RPM` ou `RPM Min/Max`, les limites de rafale, et le mode de tir natif / refroidissement du canon opéré. Les adaptateurs externes ne peuvent pas dépasser la cadence native prise en charge par un pistolet. |
| La rampe de précision n'avance jamais | Confirmez que la cible est un joueur, visible, à l'intérieur `Ramp Max Range`, et se déplaçant horizontalement au-dessus `Min Target Speed`. |
| Le PNJ s'arrête après avoir vidé le pistolet | Vérifiez `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Type`, `Ammo-Aware Switching`, et le repli mêlé/non armé. |
| Les dégâts personnalisés, le knockback ou la vitesse d'attaque ne sont pas utilisés | Vérifiez la sélection `Gun Spec` / `Weapon Spec` ou `Custom` et les valeurs dans `Gun` et `Melee`. |
| Le mouvement de l'arme de combat n'apparaît pas | Cochez Better Combat, créature Animateur de joueur, les PNJ `Better Combat Compatibility` et les attaques enregistrées pour l'arme. Un swing main vanille est attendu lorsque le mouvement enregistré ne peut pas être joué. |
| La vitesse d'attaque personnalisée est ignorée lors de la compatibilité Better Combat | La compatibilité verrouille le timing à l'efficace de l'arme `ATTACK_SPEED`. Désactivez `Better Combat Compatibility` pour utiliser une vitesse d'attaque `Custom`. |
| Une patrouille entre dans un mur ou fait une pause à chaque pas | Vérifiez `Default Walk Speed`, les points de patrouille, la hauteur verticale et l'accessibilité A*. Confirmez également que 0.3.1 est installé sur le client et le serveur. |
| Un PNJ attaque la mauvaise cible | Effacez les filtres d'ID d'entité, les balises requises, les balises rejetées et les règles de balise de même-faction, puis ajoutez-les progressivement. |
| Le PNJ continue de montrer l'arme précédente ou incorrecte | Confirmez que les deux côtés utilisent le courant 0.3.1, puis enregistrez à nouveau. Vérifiez que l'élément est pris en charge par son adaptateur TACZ, PointBlank ou SuperbWarfare et retirez les accessoires de munitions physiques. |
| `DW Pose Core` n'ouvre pas l'éditeur | Confirmez le mode créatif, un modèle de lecteur Steve/Alex CustomNPCs, une distance comprise entre 12 blocs et que le noyau reste dans l’une ou l’autre main. |
| Une pose personnalisée enregistrée n'est pas visible | Dans `DW Npc Core > Pose`, confirmez que l'action utilise `Custom JSON` et le profil prévu. Le fichier doit exister sous `config/dochi_warfare/poses/`. |
| Les modifications de pool ne peuvent pas être enregistrées | Rendre la chance en ligne totale `100%` ou appuyez sur `Equalize`. L'édition d'une ligne ne redistribue pas automatiquement les autres. |
| Les entrées ci-dessous un long pool d'armures ne sont pas visibles | Faites défiler à l'intérieur du groupe d'armures avec la molette de la souris ou faites glisser sa barre de défilement interne du côté droit. Si l'écran entier est écrêté, ajustez également la vanille `GUI Scale`. |
| Icônes d'alerte visuelle manquantes | Vérifiez le paramètre par NPC `Alert Icons` et les paramètres de visibilité du marqueur côté client `dochi_warfare Config`. |
| GUI semble déformé | Réglez `GUI Scale` dans les paramètres vidéo vanille, puis vérifiez à nouveau l'écran. |
| La couverture ne commence jamais | Vérifiez le `[experimentalCover].enabled` global, par NPC `Enable Cover`, le déclencheur individuel, la phase de combat, le rayon de recherche, le temps de rechargement et si une position de déclenchement/blocage de tir est accessible. |
| La couverture commence mais le PNJ ne reprend jamais les combats | Vérifiez `Max Duration`, `Hold Time`, les paramètres de peek, l'accessibilité de la route, et que le courant 0.3.1 est installé. La couverture doit protéger à la fois la poitrine et la tête; le serveur tente à nouveau un autre candidat joignable après un échec de recherche initial. |
| La confirmation de location ne s'ouvre pas | Le PNJ doit être un PNJ géré par DW avec `Hire available` activé. Utilisez une main vide ou un élément d'interaction normal ; les outils d'interaction `DW Npc Core`, `DW Mercenary Core` et CustomNPCs conservent leur propre comportement d'éditeur. |
| Les clics ou les info-bulles de l'interface graphique mercenaire sont décalés | Utilisez le courant 0.3.1 des deux côtés. Les paramètres mercenaires, l'écran de confirmation et la commande HUD utilisent la mise à l'échelle et les coordonnées traduites de la souris. |
| PointBlank Le pistolet n'est pas accepté | Installez exactement une branche prise en charge, 1.11.1 ou 2.1.0. Si les deux sont détectés, le pont se désactive. |
| SuperbWarfare arme ou véhicule indisponible | Vérifiez les versions prises en charge spécifiques au chargeur dans [setup](#dochi-warfare/warfare-setup). |
| L’IA du véhicule est activée mais ne bouge pas | Retirez les passagers du joueur, confirmez la version compatible SuperbWarfare, le mode de déplacement, la maison/destination et le terrain chargé. Les hélicoptères et les avions ont besoin de suffisamment d'espace pour monter et tourner. |
| Une tourelle de véhicule suit la cible mais ne tire jamais | Dans `Weapons`, vérifiez que la monture est allumée et incluse par `Weapon use mode`. Vérifiez les munitions par arme, le rechargement, les exigences de l'équipage, la portée minimale / maximale et les limites de hauteur de la tourelle. Une cible très proche peut nécessiter que le véhicule recule. |
| Un véhicule répète un petit cercle ou se lance et s'arrête brusquement | Confirmez que 0.2.9 est installé des deux côtés, puis vérifiez le rayon de patrouille, la vitesse de déplacement et le terrain accessible. La version 0.2.9 utilise des secteurs de patrouille distribués et des gaz/freins sensibles à la distance. |
| La page Crew continue de charger ou ne peut pas monter à bord d'un PNJ | Appuyez sur `Refresh` et sélectionnez à nouveau le véhicule/siège. Utilisez un clone de PNJ valide ou inventoriez la pierre de l'âme du PNJ, restez dans les blocs 64 avec l'autorisation Créative, et confirmez que le PNJ n'est pas hostile à la faction du véhicule. |
| Un piège ne déclenche pas | Mettez de côté `DW Booby Trap Core`, vérifiez à la fois `Enabled` et `Armed`, vérifiez le contournement / refroidissement du propriétaire et confirmez les dépendances facultatives de la charge utile LRT. |

## Problèmes d'accès GUI

`DW Npc Core` est un éditeur en mode Créatif avec trois contextes : DNPC ou supporté CustomNPCs PNJ, supporté SuperbWarfare véhicule, et air pour la bibliothèque clone. Si l'éditeur PNJ ne s'ouvre jamais, confirmez que la cible est un acteur DNPC ou CustomNPCs pris en charge et que les deux côtés ont l'addon. Si l'éditeur de véhicule n'est pas disponible, vérifiez la version compatible SuperbWarfare plutôt que de la traiter comme une défaillance de cible PNJ.

## Problèmes d'incendie et de visibilité directe

Dochi's Warfare effectue une vérification finale de la ligne de visée avant de tirer. Si un PNJ détecte une cible mais ne tire pas, testez un canon uni TACZ dans une zone plate ouverte. Si TACZ fonctionne mais qu'un pistolet optionnel ne fonctionne pas, isolez la version de l'adaptateur, le temps de recharge natif et les règles de tir spécial non prises en charge avant de changer l'IA.

`Detect Distance` contrôle la conscience initiale. `Max Distance` contrôle le feu à distance. N’accordez pas l’un comme si c’était l’autre.

## Problèmes de munitions et rechargement

Le problème de munitions le plus courant est de mélanger des articles de munitions physiques avec du stock de munitions DW. Ne pas mettre TACZ, PointBlank, ou SuperbWarfare munitions ou magazines dans le PNJ offhand. Utilisez `Ammo Stock`, `Supply Ammo`, et rechargez l'état.

Pour le diagnostic:

1. Fixez `Ammo Stock` à `-1`.
2. Conserver `Reload` et `Supply Ammo` ON.
3. Réglez `Reload Duration Ms` sur `0` pour utiliser le temps de rechargement natif du pistolet tenu.
4. Tester à nouveau avec une cible.

Si le stock infini fonctionne mais le stock fini échoue, le PNJ atteint probablement `0` munitions de réserve ou la régénération n'est pas configurée.

![Recharger et réserver les paramètres de munitions.](assets/media/guides/warfare-031-neo1211/dw-ammo.png "Stock de munitions 1 signifie munitions de réserve illimitées. Durée de rechargement Ms 0 utilise la durée de rechargement native du pistolet. Ces contrôles sont séparés du placement d’un objet de munitions physiques dans la main du PNJ.")

## Problèmes de détection du son

La version 0.2.9 utilise un système de stimulus pour gérer les coups de feu, les rechargements, les sons de blocage, les sons d’entité et les sons de monde de position uniquement. Utilisez un joueur de survie lorsque vous testez des sons, et vérifiez la détection de la cible séparément de l'investigation sonore; et `Move To Source` cède toujours au combat actif ou à une position verrouillée.

## Problèmes de patrouille et de repérage

Les patrouilles de zone et de route gardent un chemin A* actif à `Default Walk Speed`. Si la création ou l'achèvement du chemin échoue, le PNJ tente immédiatement à nouveau dans une limite bornée, puis saute le point. Pousser à plusieurs reprises dans un mur ou essayer de le percer n'est pas un comportement attendu.

En cas d'échec d'une descente d'un bloc, confirmer qu'un point d'itinéraire direct utilise les pieds Y prévus. La version 0.2.0 résout les problèmes de terrain debout à proximité et inclut la distance verticale dans les contrôles d’arrivée, mais elle ne force pas le mouvement à travers les clôtures, les espaces scellés ou les plates-formes qui n’ont pas d’itinéraire sûr.

## Problèmes de politique de dommages

`Gun Spec` préserve le comportement de dégâts natif du canon, tandis que `Custom` applique le remplacement DW pris en charge pour ce PNJ. Melee `Weapon Spec` utilise les attributs de l'objet ; la mêlée `Custom` peut infliger indépendamment des dégâts, des reculs et des attaques par seconde. Changer une stratégie à la fois en isolant un résultat inattendu.

L'activation de `Better Combat Compatibility` verrouille la vitesse d'attaque à l'efficace de l'objet maintenu `ATTACK_SPEED`, et `Overview` montre `Weapon Spec (locked)`. Si les attributs d'arme ne s'appliquent pas sur une version plus ancienne, mettez à jour le client et le serveur à 0.3.1 avant de tester à nouveau.

## Changement d'arme et problèmes d'animation de mêlée

L'addon synchronise l'état main confirmé par le serveur avec les clients. Si une lecture d'équipement de mêlée ne correspond pas à l'élément demandé, le PNJ retarde l'attaque et tente à nouveau l'équipement au lieu d'attaquer avec la mauvaise arme. On peut donc s'attendre à une brève pause pendant le changement; une arme définitivement périmée doit d'abord être vérifiée pour les versions JAR client et serveur non appariées.

Le mouvement exact des PNJ de combat nécessite à la fois un meilleur combat et un animateur de créature. Même avec `Better Combat Compatibility` activé, l'addon retombe à un swing main-main vanille quand créature Player Animator est manquant ou aucun mouvement d'arme enregistré utilisable est disponible.

## Poser des problèmes d'éditeur

`DW Pose Core` est un outil de création en mode créatif et prend actuellement en charge les modèles de lecteurs Steve/Alex CustomNPCs. Gardez le noyau dans la main principale ou dans la main gauche et restez à l'intérieur des blocs 12 du PNJ pendant l'édition.

`Save` ne stocke que la pose JSON. `Save & Apply` le stocke et l'applique comme pose de ralenti personnalisée du PNJ actuel. Pour utiliser le profil pour une action spécifique, ouvrez `DW Npc Core > Pose`, définissez cette action sur `Custom JSON`, sélectionnez le profil et enregistrez la configuration du PNJ.

Les fichiers de pose sont stockés sous :

```text
config/dochi_warfare/poses/
```

Le verrouillage des axes de suivi de la tête ou des jambes de marche peut donner l'impression que le mouvement est gelé. Laissez les axes qui doivent continuer à suivre le mouvement normal sur `Animation`, et définissez uniquement les axes sur `Custom`.

## Problèmes de règle cible

Une liste d'ID d'entité vide permet à CustomNPCs géré d'hériter de l'hostilité de faction réelle CustomNPCs. Il ne fait pas des entités passives ou non liées des cibles automatiques. Une liste d'ID d'entité remplie devient un sélecteur explicite, tandis que les balises requises et rejetées restent des filtres supplémentaires.

En cas de doute, exportez le profil d'installation, simplifiez-le et réimportez après le test.

## Performance et journalisation

La version 0.2.0 utilise des index spatiaux pour les longues recherches `Detect Distance` et l'audition basée sur les événements pour réduire les balayages répétés. Les grands `Detect Distance`, les grands `Max Distance`, les grandes listes de cibles et de nombreux PNJ gérés peuvent encore augmenter le filtrage des candidats et le travail de combat. Gardez les premiers tests petits.

Main-main détaillée, arme-commutateur, couverture, et les traces d'animation restent derrière l'enregistrement de débogage. Activez le débogage uniquement lors de la reproduction d'un problème, puis désactivez-le pour que les journaux de serveur en direct restent lisibles.
