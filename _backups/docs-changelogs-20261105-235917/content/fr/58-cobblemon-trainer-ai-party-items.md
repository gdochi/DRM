---
title: Entraîneur IA, équipes et objets
slug: cobblemon-trainer-ai-party-items
order: 580
description: Les moteurs d'IA, les équipes aléatoires et la distinction entre l'inventaire général et les objets de combat rond.
product: drm-cobblemon-editor
category: Premiers pas
section: trainer
status: Stable
version: Fabric / NeoForge 0.2.9
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
---

## Trouver l'IA, la génération d'équipe et les articles

Sélectionnez un tour en **Battle Config → Rounds**, puis cliquez sur la valeur à côté de **AI skill**; il est indiqué Avancé dans cet exemple. Auteur de son équipe et sac de combat pour le même tour. Les écrans utilisent **0.2.9 / NeoForge 1.21.1, l'interface utilisateur anglaise**.

![Tours montrant le tour sélectionné et la compétence AI.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "Un Pokémon élément tenu et une potion utilisée par son entraîneur sont des paramètres séparés.")

## Choisir le moteur IA

| Moteur | Utilisation |
| --- | --- |
| `DRM Strategy` | DRM tuning, plans de stratégie, articles d'entraîneur et décisions de gimmick d'entraîneur. |
| `RCT` | Fournisseur RCT optionnel. Nécessite une installation compatible de l'API RCT. |
| `Cobblemon Strong` | Cobblemon La puissance de l'IA. |

DRM La stratégie fonctionne sans RCT. RCT L'absence ou les erreurs d'appel sont gérées à la limite de l'addon ; elles ne font pas RCT une dépendance requise. DRM Le sac rond et le plan de gimmick s'appliquent à DRM Stratégie.

Commencez par un préréglage, puis modifiez une valeur ou une stratégie d’IA à la fois et comparez-la en utilisant la même équipe et les mêmes règles de combat. La sélection des déplacements, la commutation et le timing des objets dépendent également de l'état de combat actuel.

## Équipe aléatoire

![Bases d'équipe aléatoires, générer et appliquer.](assets/media/guides/cobble-029-neo1211/cobble-party-generator.png "Ouvrir l'équipe Pokémon → Générer l'équipe. Définissez la taille, les niveaux et les filtres, générez un aperçu, puis appliquez-le à l'équipe en cours.")

Configurez la taille de l'équipe, le niveau, les générations, les types, le stade d'évolution, l'éligibilité légendaire / mythique, les espèces en double, les chances brillantes, les paramètres IV / EV et les choix automatiques nature / capacité / déplacement. Les candidats proviennent du registre Cobblemon installé. Détendez les filtres s'il y a trop peu de candidats.

Une graine fixe est reproductible dans la même configuration mod/datapack/registry. Changer les espèces disponibles peut changer le résultat.

## Articles d'entraîneur

![Catalogue d'articles de combat, inventaire par bataille et politique d'IA.](assets/media/guides/cobble-029-neo1211/cobble-battle-items.png "Ouvrir l'équipe Pokemon → Objet de combat Inventory. Désactivé enregistre le sac mais empêche l'utilisation de l'IA; ajouter des éléments, choisir une stratégie et appliquer.")

Le sac de combat virtuel du round peut contenir jusqu'à 16 types d'objets, chacun avec une quantité 1–99. Il est recréé pour chaque bataille et utilise la stratégie DRM ; il ne supprime pas les objets de l'inventaire physique du PNJ.

Utilisez la récupération, la guérison de statut, la relance, la récupération de PP, ou les articles de stat-boost. La fréquence d'utilisation des éléments, le seuil de guérison des HP, les tours de boost précoces et les catégories de récupération autorisées contrôlent le moment où l'IA les considère. La fourniture d'un article ne garantit pas l'utilisation au premier tour.

## Gimmicks formateurs

Configurez l'équipement et la politique Mega, Dynamax, Z-Move, Tera ou Omni de la manche. Placez l'élément clé approprié dans l'inventaire général et préparez Pokémon les éléments retenus, le type Tera, le niveau Dynamax ou le facteur Gigantamax si nécessaire. Ces intégrations nécessitent une installation Mega Showdown compatible.

L'équipement et les permissions des règles de combat sont séparés. Un gadget interdit reste interdit même lorsque son élément clé est présent. Voir [Règles de bataille](#drm-cobblemon-editor/cobblemon-battle-rules).

## Ajout d'articles personnalisés à l'inventaire général

![Entraîneur Général Inventory avec Tous les objets et Joueur inv.](assets/media/guides/cobble-029-neo1211/cobble-general-items.png "L'article général Inventory fournit des exigences de possession telles que des clés de gimmick. Choisissez parmi Tous les éléments ou Joueur inv, Ajouter sélectionné, puis Appliquer.")

Ouvert `General > General Item Inv` pour l'inventaire partagé par l'ensemble du Dresseur.

1. Recherchez `Items` une pile enregistrée par défaut, ou sélectionnez une pile de joueurs réels parmi `My Inventory`.
2. Choisissez `Add selected`. `My Inventory` copie la pile sans consommer l'objet du joueur.
3. Réglez `Quantity` sur 1 – 99 et sauvegardez le formateur. L'inventaire peut contenir jusqu'à 64 entrées.
4. Les piles avec le même ID d'élément mais des noms, des enchantements ou des composants personnalisés différents peuvent rester des entrées distinctes.

Les modifications de quantité préservent NBT et les composants. Pour une entrée contenant des données stockées, choisissez un autre élément dans la liste au lieu de modifier son ID d’élément. Les données non valides ou surdimensionnées sont rejetées plutôt que remplacées silencieusement par un élément brut.

Cet inventaire vérifie la possession des clés gimmick sans consommer les clés. Il est séparé de `Trainer Items`, le sac de guérison/bataille de l'IA ronde.

Référence JSON : le schéma Trainer reste `23`. Les entrées générales stockent `componentsSnbt` et lisent encore des données plus anciennes `components`. Ne changez pas `schemaVersion` à la main pour activer la fonction.

## 0.2.7 Déplacer la sélection

DRM Strategy évalue les étapes de statistiques réelles et le champ actuel pour la configuration, les écrans, Trick Room, la commutation, les gadgets et la synergie d'équipe. Les correctifs couvrent la commutation post-installation, les boosts répétés et les réservations de slots doubles vides. RCT reste un fournisseur d'IA optionnel distinct.

La recherche de mouvement inclut chaque mouvement enregistré, triant les mouvements normaux, d'événement et passés en premier. La sélection n'établit pas la capacité d'apprentissage des espèces ni ne garantit un comportement arbitraire du fournisseur. Vérifiez les autorisations, les politiques, les éléments clés et les fournisseurs compatibles.

Voir [0.2.7 compatibilité](#drm-cobblemon-editor/cobblemon-editor-current-update) pour les Cobblemon Versions effectivement utilisées.
