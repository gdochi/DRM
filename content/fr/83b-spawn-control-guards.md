---
title: Placer une escouade dans chaque structure
slug: spawn-control-guards
order: 841
description: Réglez les filtres de biomes et structures, les membres, l'équipement et les délais de réapparition.
product: dochi-spawn-control
category: Règles
section: rules
status: Guide
version: 0.1.5
audience: Administrateurs de serveurs et créateurs de cartes
translationSource: en
translationMethod: assisted
---

En 0.1.5, une règle naturelle peut réunir plusieurs cibles et effectifs dans des structures existantes. Cela concerne Forge 1.20.1, Fabric/NeoForge 1.21.1 et 26.3. Les créatures ordinaires n'exigent ni DRM ni mod de PNJ. Les modèles DNPC enregistrés nécessitent DRM et DNPC ; CustomNPCs est indisponible en 26.3.

## 1. Ouvrir les réglages de lieu

Appuyez sur **K**, choisissez une cible et utilisez **Add Rule**. En Forge, ouvrez **World → Locations and guard squad → Edit**. En Fabric/NeoForge, faites défiler l'inspecteur jusqu'à **Locations and guard squad → Edit**.

Cet outil de création possède les onglets **Locations** et **Squad and equipment**. **Apply** met à jour le brouillon ; **Save** dans l'éditeur principal l'applique ensuite au serveur. Cancel ou Escape abandonne les changements de cette fenêtre.

## 2. Choisir les biomes et structures

Utilisez 🔍 dans Locations pour chercher les biomes et structures enregistrés du serveur, y compris ceux des mods et datapacks.

| Sélection | Exemple et signification |
| --- | --- |
| Included biomes | Correspond à un ID/tag choisi, comme `minecraft:plains` |
| Excluded biomes | Refuse même si un sélecteur inclus correspond |
| Included structures | Une instance existante de, par exemple, `minecraft:pillager_outpost` |
| Excluded structures | Refuse les positions dans ces limites |
| Tags | Choisit un groupe enregistré avec `#namespace:tag` |

Une inclusion vide ne limite pas cette catégorie ; les exclusions sont prioritaires. Les structures utilisent toutes leurs limites enregistrées. Aucun château manuel n'est reconnu et aucune structure n'est générée. Les chunks candidats et les informations de départ de structure doivent être chargés ; la règle ne force pas leur chargement.

![Filtres de lieu et commandes d'occupation par structure.](assets/media/guides/spawn-control-015-fabric263/guard-locations-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Véritable écran anglais. Included structures affiche Any : aucune limite de structure n'est encore active.")

## 3. Composer toute l'escouade

Dans Squad and equipment, activez **Use squad** et utilisez **Add**. Par exemple, réglez **Member count** à 2 pour une ligne de zombies et à 1 pour une ligne de squelettes : trois entités. Pour un PNJ enregistré, choisissez son modèle exact plutôt que l'EntityType par défaut.

Le total maximal est 64. **Member spread** va de 1 à 32 blocs, avec 5 par défaut. L'escouade utilise les effectifs par membre au lieu de Minimum/Maximum Group. Un tirage prépare toute la composition ; chaque membre doit satisfaire position, collision, conditions et plafonds avant l'ajout commun. Un manque d'espace ou de capacité fait échouer tout l'essai.

Cette fonction concerne l'apparition naturelle. Un générateur placé tire toujours ses cibles individuellement dans sa liste de probabilités. Réglez patrouille, faction et IA de combat dans le mod de la créature ou du PNJ.

## 4. Régler l'équipement

Sélectionnez un membre, puis utilisez 🔍 pour la tête, le torse, les jambes, les pieds et les mains. Le sélecteur propose tous les objets et **Player inv** sans consommer l'inventaire.

**Keep** conserve l'équipement original ou du modèle. Choisir un objet règle cet emplacement. **Clear** le vide ; le désactiver rétablit l'objet choisi, ou Keep sans sélection. Sans ligne de membre, la partie droite modifie l'équipement de la cible de base.

![Emplacements d'équipement et interrupteurs Clear séparés.](assets/media/guides/spawn-control-015-fabric263/guard-members-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Réglages d'un membre avec Clear activé pour la tête. Il ne s'agit pas d'une scène de combat ou d'application terminée de l'équipement.")

## 5. Éviter les groupes en double

**One group per structure instance** est activé par défaut et nécessite une structure incluse. Tous les joueurs partagent le site défini par dimension, règle, type de structure et chunk initial. Plusieurs arrivées ne dupliquent pas le groupe de cette règle. Les autres règles ont une occupation indépendante.

**Respawn delay** commence après le retrait du dernier membre possédé ; valeur initiale : 1200 ticks. Perdre quelques membres ne remplit pas immédiatement l'escouade. Décharger les chunks, changer de dimension ou attirer les gardes au loin ne libère pas le site. Occupation et délais persistent dans les données du monde. Sans structure incluse, cette limite et son délai sont inactifs.

## 6. Enregistrer et tester

Appliquez, activez la règle et enregistrez. Commencez avec une probabilité de 1 et un intervalle d'environ 200 ticks, avec assez de capacité et d'espace pour tous. Dimension, heure, lumière et distance restent applicables. La distance minimale initiale de 24 blocs peut faire échouer un contrôle aux pieds du joueur.

Utilisez **Advanced Diagnostics** pour examiner les échecs. Le test confirmé crée de vraies entités, dont toute l'escouade activée ; Forge le nomme **Spawn Squad**. Vérifiez limites de structure, chargement, espace et plafonds avant les réglages définitifs. Consultez les [conditions et plafonds](#dochi-spawn-control/dochi-spawn-control-rules).

## 7. Transférer vers un autre serveur

Le schéma naturel est 4 ; les schémas 2 et 3 restent lisibles. Évitez de réenregistrer les nouveaux préréglages dans les anciennes versions de Spawn Control. Fournissez les mods des cibles et objets ainsi que les modèles DNPC originaux. Le NBT avancé des objets 1.20.1 et les composants ultérieurs ne sont pas convertis automatiquement entre versions.

Sauvegardez le monde avec les JSON pour conserver occupation et délais. Consultez les [préréglages et opérations](#dochi-spawn-control/dochi-spawn-control-presets-operations) pour les chemins et portées d'enregistrement.
