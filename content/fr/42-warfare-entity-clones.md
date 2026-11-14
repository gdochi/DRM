---
title: Entité Clone Library
slug: warfare-entity-clones
order: 380
description: Enregistrez et invoquez des modèles côté serveur aseptisés pour les PNJ CustomNPCs et les véhicules pris en charge SuperbWarfare.
product: dochi-warfare
category: Outils du monde
section: tools
status: Projet
version: 0.3.3
audience: Créateurs de scénarios
tags:
  - clone
  - npc
  - vehicle
translationSource: en
translationMethod: assisted
---

## Qu'est-ce qu'un clone

L'entité Clone Library stocke les modèles JSON appartenant au serveur pour deux domaines :

* DNPC ou CustomNPCs PNJ avec leurs paramètres DW actuels
* Véhicules SuperbWarfare pris en charge avec données natives et paramètres de combat DW réutilisables

Ceci est différent de `Save As` dans le PNJ ou l'éditeur de véhicule. Un profil de configuration copie la configuration dans une cible existante ; un clone d'entité crée une nouvelle entité aseptisée.

![Entité vide Clone Library avec filtres PNJ et véhicule.](assets/media/guides/warfare-031-neo1211/dw-clones.png "DW 0.3.1 / NeoForge 1.21.1. Une nouvelle configuration peut ne pas avoir d'entrées. Enregistrez avec Clone dans l'éditeur cible avant de le sélectionner ici et d'utiliser Summon.")

## Enregistrer un modèle

1. Entrer en mode créatif.
2. Ouvrez un véhicule CustomNPCs PNJ ou pris en charge SuperbWarfare avec `DW Npc Core`.
3. Appuyez sur `Clone` dans l'éditeur.
4. Entrez un nom et confirmez. L'enregistrement du même nom nécessite une deuxième confirmation d'écrasement.

Le serveur lit et désinfecte les données de l'entité. L'entité brute NBT n'est jamais acceptée par le client.

## Ouvrir et convoquer

Cliquez avec le bouton droit de la souris sur `DW Npc Core` pour ouvrir `Entity Clone Library`. Recherchez la bibliothèque combinée, filtrez par `NPC` ou `Vehicle`, sélectionnez un modèle, puis appuyez sur `Summon`.

Le serveur valide l'autorisation de création, le modèle et les mods requis, puis recherche une position chargée en toute sécurité devant le lecteur. Si la dépendance est manquante ou qu'il n'y a pas d'espace chargé en toute sécurité, l'invocation est rejetée sans créer d'entité partielle.

La version 0.2.9 peut également utiliser des clones PNJ à partir de la page de l'éditeur du véhicule `Crew`. Sélectionnez un siège vide sur la carte supérieure / latérale, appuyez sur `Board NPC`, puis choisissez un clone de PNJ serveur ou une pierre d'âme remplie de PNJ dans l'inventaire du joueur. Le serveur désinfecte un nouveau PNJ et le monte dans le siège sélectionné ; les factions hostiles, les sièges changés et les pierres d'âme invalides sont rejetées.

## Ce qui est désinfecté

Les clones conservent l'apparence réutilisable, l'équipement, les données d'entité native et la configuration de combat DW, mais suppriment l'identité du monde en direct et l'état transitoire tels que:

* UUID, position, mouvement, rotation, passagers, laisse et identité du propriétaire
* Cerveau actuel, colère, feu, air, chute et autres champs d'exécution en direct
* Propriétaire de mercenaires actifs et commandes de mouvements/tirs
* Propriétaire du véhicule AI, domicile, destination commandée et position de patrouille en direct

Cela empêche un clone d'hériter de l'identité, de la propriété ou de la tâche mondiale actuelle de l'entité d'origine.

## Stockage

Les modèles sont stockés dans des dossiers de serveur distincts :

```text
config/dochi_warfare/entity_clones/npc/
config/dochi_warfare/entity_clones/vehicle/
```

Traiter ces fichiers comme du contenu de serveur. Utilisez le flux de travail dans le jeu `Clone` et `Summon` pour la création ordinaire afin que la validation et la désinfection du serveur restent en vigueur.

## Forge 0.3.1 suppression et récupération

Sélectionnez un PNJ ou une entrée de véhicule, choisissez Supprimer, puis confirmez le type et l’ID affichés. Échapper ou annuler les retours sans suppression. Les entités déjà engendrées ne sont pas affectées.

Les fichiers passent à `config/dochi_warfare/entity_clones/.deleted/<type>-<UUID>/`. Pour en restaurer un, assurez-vous d'abord que le dossier d'origine `npc` ou `vehicle` n'a pas de fichier de même nom, puis déplacez-le. Les chronologies DWE faisant référence à ce clone ne sont pas automatiquement réécrites.

Le clone du véhicule et les caractéristiques de l'équipage nécessitent DWE. Les noms enregistrés autorisent actuellement les lettres, les chiffres, les tirets bas, les points et les traits d'union; d'autres caractères sont aseptisés pour les tirets bas. Sélectionnez l'ID réel du clone dans les timelines.
