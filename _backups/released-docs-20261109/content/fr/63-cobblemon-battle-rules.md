---
title: Règles de combat
slug: cobblemon-battle-rules
order: 524
description: Formats courants et par round, niveaux, éléments, règles légendaires Pokémon, mécaniques et de plomb dans les versions actuelles.
product: drm-cobblemon-editor
category: Cobblemon Éditeur
section: trainer
status: Stable
version: Fabric / NeoForge 0.2.9
audience: Les créateurs configurent les règles de combat des entraîneurs
tags:
  - battle-rules
  - rounds
  - items
  - gimmicks
translationSource: en
translationMethod: assisted
---

## Ouvrir l'éditeur

Ouvrez un document Formateur ou Pokémon lui-même en `Cobblemon Editor`, puis choisissez **Battle Config → Rounds → Edit** pour ouvrir les règles de combat. Ceci est un écran de création enfant, pas un éditeur JSON autonome. Choisissez `Done`, revenez à l'éditeur parent, et utilisez `Save` ou `Save As` pour y écrire le document Trainer/Pokemon Itself.

Les flèches DRM Back et Forward partagées restent toujours visibles ; elles deviennent désactivées lorsqu'aucun historique n'est disponible. Les numéros non valides ou les identifiants d'éléments bloquent la navigation et l'achèvement afin que le brouillon actuel ne soit pas perdu en silence.

![1er round de la bataille.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1. Common et 1 en haut choisissez scope; L'utilisation de règles communes en bas à gauche montre l'héritage. Distinguer les mécaniciens autorisés sur la droite de l'équipement de gimmick PNJ, actuellement Aucun.")

## Règles communes et par tour

Sélectionnez `Common Rules` ou un tour explicite de 1 – 16.

- Les règles communes n'affectent que les tours qui les héritent encore.
- Un round surcharge la configuration de combat complète de ce round indépendamment.
- `Use Common Rules` supprime uniquement le remplacement du tour sélectionné.
- L'édition d'un tour n'écrase pas les autres tours indépendants.

## Configuration de la bataille

### Formats

| Format | Comportement |
| --- | --- |
| `Inherit` | Utilisez le format créé en `Rounds` |
| `Singles` | Un actif Pokémon par côté |
| `Doubles` | Deux actifs Pokémon par côté |
| `Triples` | Trois actifs Pokémon par côté |
| `Lead Duel` | Singles utilisant uniquement le plomb sélectionné de chaque côté |

Les doubles et les triples nécessitent suffisamment de combats prêts Pokémon des deux côtés. Lead Duel limite uniquement les équipes de combat temporaires ; il ne supprime pas les équipes créées. Pokemon lui-même utilise Singles et cache les contrôles de l'entraîneur-plomb dénués de sens.

### Niveaux

| Mode | Comportement |
| --- | --- |
| `Keep` | Utiliser les niveaux créés dans le document |
| `Player party average` | Ciblez la moyenne joueur-équipe actuelle plus un décalage de -99 vers 99 |
| `Fixed` | Définir la bataille temporaire Pokémon à un niveau de 1 à 100 |

Le mode fixe peut affecter l'entraîneur seulement ou les deux côtés de la bataille. Ces transformations s'appliquent aux copies de combat temporaires et ne modifient pas les niveaux Pokémon originaux du joueur.

### Mécanique de combat

L'autorisation Mega, Tera et Dynamax est une règle de serveur pour les deux côtés. L’autorisation n’installe ni ne garantit un mécanicien. L'activation réelle nécessite toujours un addon compatible, l'équipement PNJ et l'élément clé du tour, ainsi que tout élément ou propriété détenu par Pokémon requis.

`Trainer Gimmick` configure l'équipement du PNJ ; les règles de combat contrôlent l'autorisation des deux côtés. Si une règle bloque le mécanicien, le PNJ ne la choisira pas même lorsqu'il est équipé.

## Produits

| Réglage | Effet d'exécution |
| --- | --- |
| Autoriser les éléments | Lorsque désactivé, bloquer toutes les actions d'éléments de bataille couverts |
| Articles interdits | Bloquer les identifiants individuels choisis par le biais de la recherche de nom/ID |
| Limite d'utilisation | Par acteur et par combat, 0–999 utilise ou illimité |
| Tour minimum | Autoriser l'utilisation uniquement sur ou après ce tour |
| Cible HP cap | Autoriser l'utilisation uniquement lorsque le pourcentage HP actuel de la cible est égal ou inférieur à la valeur |
| Autoriser les articles retenus | Lorsque désactivé, refusez le démarrage de la bataille si un Pokémon participant détient un objet |

La liste interdite accepte jusqu'à 128 identifiants uniques. Vérifiez les entrées dans le catalogue de droite, puis appuyez sur **Add (selected count)**. Pour autoriser à nouveau un élément, vérifiez-le dans la liste bannie centrale et appuyez sur **Remove**. Les identifiants d'un mod actuellement manquant restent visibles sans icône au lieu d'être supprimés silencieusement.

Le serveur revérifie les objets du sac de combat, les ranime et capture les objets avant leur consommation. Un lancer de capture autorisé compte vers la limite. Lorsque plusieurs adversaires sont actifs, chaque cible doit satisfaire à la règle HP. Les joueurs créatifs suivent également les limites d'utilisation.

![Ecran des éléments avec sélection et ajout de contrôles.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules-items.png "Recherchez à droite, vérifiez les entrées, puis ajoutez. Ajouter 0 signifie que rien n'est sélectionné; la liste interdite au centre est également vide. Autoriser les objets de combat est séparé des interdictions individuelles.")

## Légendaire Pokémon

Lorsque le légendaire Pokémon est désactivé, le serveur vérifie les deux équipes participantes avant le démarrage et refuse la bataille si l'une d'entre elles est présente. Ce qui suit Cobblemonde `isLegendary()` Ce n'est pas une règle séparée qui inclut automatiquement chaque Mythique. Pokémon.

## Plombs

Configurer les leads des joueurs et entraîneurs de manière indépendante :

- `Selected`: garder la sélection initiale de prospects
- `Random`: choisissez parmi l'équipe saine du joueur ou l'équipe d'entraîneurs générée
- `Slot`: utilisation d'une fente 1–6

Un emplacement manquant, un joueur sélectionné en tête ou une taille d'équipe insuffisante pour le format choisi refuse le démarrage au lieu de changer silencieusement la règle.

## Pokémon lui-même rencontre les règles

Pokemon lui-même expose également la permission de capture et de chute naturelle sur cet écran. Désactiver la capture de blocs de capture pour cette rencontre indépendamment des règles de l'élément. La désactivation des gouttes naturelles empêche la rencontre de l'addon de permettre des gouttes normales.

## Politiques de fuite

Les stratégies de fuite sont le comportement natif Cobblemon (`native`), la fuite immédiate (`immediate`), ou le déplacement d'une distance configurée de la position de départ (`distance`, 1–512 blocs). En mode distance, le bouton explique la distance requise; se déplacer à l'extérieur déclenche la fuite. Ces règles s'appliquent aux batailles appartenant à Addon et produisent le résultat `flee`.

## Dépannage

| Symptôme | Vérifier |
| --- | --- |
| Une règle n'a pas changé | Choisissez `Done`, enregistrez dans l'éditeur parent et vérifiez si le tour hérite des règles communes |
| Le démarrage est refusé | taille de l'équipe, prospects explicites, restriction des objets retenus et restriction légendaire |
| Un mécanicien ne s'active pas | Addon compatible, équipement PNJ, élément clé de l'inventaire général, exigences Pokémon et règles de combat |
| Un article est refusé | La permission globale, l'ID interdite, le nombre d'utilisations, le tour et la cible HP doivent tous l'autoriser |

## Référence JSON

Il s'agit d'informations de référence pour les outils externes et le contrôle de version, pas le chemin d'accès de création recommandé. Entraîneur schéma 23 stocke les paramètres communs dans `trainerOptions.battleConfig` et un tour de remplacement dans `rounds[].battleConfigOverride`. Un round sans surcharge utilise la configuration commune.
