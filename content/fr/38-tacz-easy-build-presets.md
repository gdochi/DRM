---
title: Facile à construire et à combattre Presets
slug: warfare-easy-build-presets
order: 325
description: Créez rapidement le comportement des PNJ avec le flux Easy Build guidé ou cinq préréglages de combat.
product: dochi-warfare
category: Outils de configuration
section: setup
status: Projet
version: 0.3.3
audience: Firearm PNJ Créateurs
tags:
  - easy-build
  - preset
  - setup
translationSource: en
translationMethod: assisted
---

## Deux outils de configuration rapide

`Easy Build` et `Presets` sont des outils de création dans la zone d'aide de `DW Npc Core` Éditeur Topbar. Les deux créent un point de départ de combat utile, mais ils fonctionnent différemment.

| Outil | Mieux utiliser lorsque | Résultat |
| --- | --- | --- |
| `Easy Build` | Vous souhaitez composer un comportement en répondant à des questions | Construit les paramètres de combat directement à partir des réponses. Il n'applique pas un préréglage de rôle nommé. |
| `Presets` | Vous voulez un type de combat éprouvé immédiatement | Applique l'une des cinq doctrines suivantes : Guard Rifleman, Patroller, Assault, Support Gunner ou Sniper. |

Aucun outil ne verrouille le résultat. Chaque valeur appliquée reste modifiable dans les catégories normales.

## Workflow Easy Build

1. Ouvrez le PNJ avec `DW Npc Core`.
2. Appuyez sur `Easy Build` dans la barre supérieure.
3. Choisissez la quantité de détails que vous voulez.
4. Répondez aux questions. Des questions supplémentaires peuvent apparaître uniquement lorsque le système associé est activé.
5. Passez en revue les traits de base, la force globale, les mises en garde et les avertissements de conflit.
6. Appuyez sur `Apply`.
7. Retournez à l'éditeur normal, inspectez le pistolet et générez des valeurs, puis appuyez sur `Save`.

![Ouverture facile avec Débutant, Intermédiaire et Expert.](assets/media/guides/warfare-031-neo1211/dw-easy.png "DW 0.3.1 / NeoForge 1.21.1. Commencez par sept questions Débutant, appliquez le comportement résultant, puis enregistrez les paramètres PNJ.")

## Niveaux de détail

| Niveau | Style des questions |
| --- | --- |
| `Beginner` | Sept grandes questions composent le comportement inactif, le mouvement de combat, la portée, la réaction, le contrôle du feu et la survie. La première question de tempérament ne fait que recommander des réponses ultérieures ; elle n’assigne pas de rôle. |
| `Intermediate` | Sélectionne directement le ralenti groupé, la conscience, l'engagement, le repositionnement, le feu, la rampe de précision, la suppression, la couverture et le comportement des munitions vides. |
| `Expert` | Modifie les distances au niveau du champ, le calendrier, la vitesse, l'éclatement, la suppression et les valeurs de couverture. Les questions de suivi s'affichent uniquement pour les systèmes activés. |

Easy Build n'est pas basé sur un préréglage de combat nommé. Les choix de tempérament des débutants tels que les suggestions agressives, équilibrées ou prudentes ne font que changer; ils n'écrasent pas silencieusement les réponses ultérieures.

## Paramètres conservés

Easy Build compose le comportement tout en préservant le contenu appartenant à d'autres éditeurs:

* Armes à distance et de mêlée et leurs piscines
* Entités, factions et règles de tag ciblées
* Piscines de peau et d'armure
* Contrats de mercenaires
* Grenades et combat FX
* `Ammo Stock` et son maximum

Vous pouvez inspecter ces valeurs inchangées par la suite dans `Gun`, `Targets`, `Ammo`, `Visual & FX` et les autres catégories normales.

![Garde Rifleman, Patrouilleur et Assaut préréglé cartes avec défilement horizontal.](assets/media/guides/warfare-031-neo1211/dw-presets.png "Cliquez sur une carte Presets pour l'appliquer. Faites défiler horizontalement pour les cartes de tireur d'artillerie et de tireur d'élite. Vérifiez l'arme à feu, les cibles et les munitions actuelles séparément.")

## Préréglages de combat

`Presets` applique une doctrine de combat générale complète en une seule étape.

| Preset | Comportement de départ |
| --- | --- |
| `Guard Rifleman` | Défendez une position avec un tir d'éclatement contrôlé de milieu de gamme |
| `Patroller` | Patrouille une zone, enquête sur le son et se repositionne pendant le combat |
| `Assault` | Ferme rapidement la distance et applique une pression d'incendie |
| `Support Gunner` | Maintient l'espacement des escouades et utilise un tir et une suppression soutenus de moyenne à longue portée |
| `Sniper` | Utilise de longues plages de détection et de tir avec une grande précision |

Les préréglages changent la conscience, le comportement inactif, la distance d'engagement, le mouvement tactique, le contrôle de tir, la couverture et la réponse de rechargement. Ils ne remplacent pas les armes, les armures, les peaux, les cibles, les relations de faction, les grenades, les effets spéciaux, les contrats de mercenaires ou `Ammo Stock`.

## Vérifier le résultat avant d'enregistrer

Easy Build et les préréglages sont des points de départ. Après en avoir appliqué un :

1. Confirmez que le pistolet actuel convient à la portée et au style de tir sélectionnés.
2. Vérifiez `Max Distance`, la portée de détection et la distance d'approche ou de recul par rapport au terrain de rencontre.
3. Assurez-vous que `RPM Mode`, la précision et la portée de rafale sont raisonnables pour le stock de munitions disponible.
4. Testez le mouvement et la couverture sur un terrain simple.
5. Appuyez sur `Save` lorsque le résultat est correct, ou utilisez `Save As` pour conserver la configuration complète du PNJ comme profil réutilisable.
