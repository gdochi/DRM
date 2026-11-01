---
title: MWENT achat de cartes
slug: acquisition
order: 1545
description: Configurez les trades marchands, le butin de coffre, les pools pondérés et l'activation de profil.
product: mwent
category: MWENT achat de cartes
section: authoring
status: Guide
version: 0.1.6
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Ouvrir l'éditeur

Les mini-jeux **0.1.6** prennent en charge les cartes physiques et les packs dans les offres de villageois / errants-commerçants et le butin de poitrine généré. DRM est facultatif.

1. Ouvrez les paramètres de Minigames et choisissez **Edit MWENT**.
2. Choisissez **General / Merchant trades / Chest rewards / Product pools** à gauche.
3. Sélectionnez une règle et modifiez ses valeurs au milieu.
4. Choisissez des cartes, des packs ou des cibles de table de butin sur la droite.
5. Utilisez la barre supérieure **Apply** pour activer le brouillon.

Lorsque vous êtes connecté, vous modifiez les paramètres du serveur avec le niveau opérateur 2. En dehors d'un monde, édite des fichiers locaux cibles pour le prochain démarrage. Les sélecteurs d'éléments ne sont pas disponibles, mais les identifiants, valeurs et poids existants restent modifiables.

## Types de règles

![Commutateur maître d'acquisition et commutateurs de commerce / coffre séparés.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-general.png "Minijeux 0.1.6 / NeoForge 1.21.1. Activé est le commutateur maître; les trois prochains contrôlent les villageois, les commerçants errants et les coffres naturels séparément. Le brouillon du serveur signifie que les modifications ont encore besoin de la barre supérieure Appliquer.")

| Catégorie | Sommaire |
| --- | --- |
| Commerces marchands | Profession/niveau, pool, article de paiement, gamme de prix, nombre, stock et expérience |
| Butin de coffre | Identifiants de table de butin inclus/exclus, piscine, chance, rouleaux et comptage |
| Piscines de cartes | Cartes automatiques/en option, factions, rareté, édition, cartes/packs explicites pondérés et exclusions |

Le paiement utilise des éléments physiques tels que les émeraudes, séparément des paiements basés sur un compte DRM / CobbleDollars. Les cueilleurs de cartes/d'exclusion affichent uniquement les cartes MWENT et ne consomment pas d'articles en stock.

## Lire une règle de marchand

Choisissez une règle sous **Merchant trades**. Définissez la profession, le niveau, le pool de produits et l'élément de paiement au milieu. Les prix minimum et maximum sont des quantités d'articles de paiement. **Items per offer** est la quantité de produit reçue par transaction.

![Profession, gamme de prix et quantité pour les cartes bibliothécaires.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-trades.png "Minijeux 0.1.6 / NeoForge 1.21.1. Cet exemple utilise le niveau bibliothécaire 2, un prix de 6 – 12, un produit par offre et un stock 12 avant le réapprovisionnement. Cartes, Packs et Exclus sur la droite modifier les produits explicites de la piscine et les exclusions.")

## Ajouter une carte au butin de donjon

1. Activer l'acquisition et le butin de poitrine en général.
2. Ajouter et activer une règle de butin de coffre.
3. Choisissez une piscine, le hasard `0.2`, un rouleau et compter `1–1`.
4. Sélectionnez le tableau de butin `minecraft:chests/simple_dungeon` et Appliquer.
5. Vérifiez un coffre de donjon dont le butin n'a pas encore été généré.

Cela ajoute une carte ou un pack sélectionné dans le pool avec une chance de 20% par coffre éligible. Les coffres précédemment ouverts ne se reroulent pas. Les poids de la piscine choisissent le produit; ils ne définissent pas la chance de la poitrine.

`minecraft:chests/village/*` cible le butin du village de vanille. Modded Pokémon Les centres ont besoin de leurs propres identifiants de table de butin. `minecraft:chests/` Ce n'est pas un match. Le 18% de la règle de la carte de village par défaut est par coffre éligible, pas par village.

![Modifier la chance du coffre et les tables de butin.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-chests.png "Minijeux 0.1.6 / NeoForge 1.21.1. Les cartes d'exploration par défaut illustrées utilisent 0.18, un rouleau et comptent 1–1. Définissez Chance par rouleau à 0.2 pour l'exemple 20% ci-dessus. Les cibles incluent les tables ; les exclus les suppriment.")

## Choisissez les produits disponibles

Modifier le pool référencé par les trades et les coffres sous **Product pools**. **Card edition**, **Rarity filter** et **Faction filter** limitent les cartes disponibles. Utilisez Cartes et Packs sur la droite pour les entrées explicites. La modification d'un pool affecte chaque règle à l'aide de ce pool.

![Cartes automatiques, intégrations, édition et filtres dans les cartes standard.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-pools.png "Minijeux 0.1.6 / NeoForge 1.21.1. Une piscine choisit les produits disponibles. Les récompenses de coffre déterminent séparément la probabilité et le nombre de jets de ce pool.")

## Profils versus activation

Fichiers en direct sous `config/dochi_minigames/`.

- `acquisition.json`: paramètres d'acquisition actifs
- `acquisition_profiles/<name>.json`: enregistrement du profil de règle complète

| Mesures prises | Signification |
| --- | --- |
| Charger / Enregistrer / Save As | Charger un brouillon ou conserver un profil |
| Appliquer | Valider et stocker la stratégie active |
| Annuler / Echap | Jeter le brouillon non appliqué de l'éditeur |

Le profil `default.json` ne s'installe que s'il est manquant. Enregistrez des profils personnalisés sous un autre nom. Le chargement ou l'enregistrement d'un profil ne l'active pas.

Pour les modifications de fichiers externes, utilisez `/minigame acquisition reload`. Ordinaire `/reload` ne relit pas cette configuration. Les modifications non valides conservent la dernière politique de travail. **En 26.3, les changements de définition du commerce natif, y compris les prix, les actions, les professions et les nouvelles règles, nécessitent une reconnexion mondiale ou un redémarrage du serveur.**

Les transactions existantes et les articles accordés restent inchangés. Les nouvelles offres rejoignent les pools de candidats existants et ne sont pas garanties sur tous les marchands. Les paramètres d'acquisition ne créent pas de structures ou de coffres. L'octroi d'une carte physique ne l'enregistre pas simultanément dans le stockage de la carte.
