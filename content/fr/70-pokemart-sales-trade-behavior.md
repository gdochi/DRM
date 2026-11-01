---
title: Vendre et échanger Pokémon
slug: pokemart-sales-trade-behavior
order: 541
description: Créez des produits et des offres commerciales Pokémon, puis gérez les prix et les stocks.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs construisant des magasins de vente et des centres commerciaux
tags:
  - sales
  - trade
  - stock
translationSource: en
translationMethod: assisted
---

## Faire un produit Pokémon

Choisissez **Sales** et une méthode de paiement dans [PokéMart setup](#drm-cobblemon-editor/cobblemon-pokemart), puis ouvrez **Pokémon Catalog → Add**. Sélectionnez le produit et utilisez **Edit Detailed Pokémon Data** pour les espèces, le niveau et les mouvements. Définissez son prix et son stock, **Save As** votre propre fichier, puis appliquez-le à la boutique PNJ.

![Bulbasaur produit avec le prix et les champs de stock.](assets/media/guides/cobble-029-neo1211/cobble-catalog.png "Ecran du créateur en Cobblemon Editeur 0.2.9 / NeoForge 1.21.1. Prix 5000, Initial 3, Maximum 3, Restock 1 et Intervalle 72000 reconstituer un Pokémon par heure jusqu'à trois. Ceci est un exemple d'édition, pas un achat terminé.")

**Les acheteurs ont besoin d'un emplacement gratuit pour l'équipe active.** Les achats ne sont pas automatiquement envoyés sur le PC. Vérifiez le mode de paiement et livré Pokémon avant d'élargir le catalogue.

![Boutique PNJ réelle après un achat, avec solde 60 et stock 2.](assets/media/guides/cobble-029-neo1211-player/cobble-sales-purchased.png "Dans la même version, le produit sauvegardé et appliqué coûte quatre émeraudes. Acheter · 4 changé émeraudes 64→60 et stock 3→2, et a ajouté un niveau 5 Bulbasaur à l'équipe du serveur.")

### Prix et référence du stock

Un document de vente prend en charge jusqu'à 256 produits. Ajoutez, dupliquez ou supprimez des lignes, puis utilisez l'éditeur Pokémon détaillé pour la ligne livrée Pokémon.

| Terrain | Comportement |
| --- | --- |
| ID du produit | Clé d'inventaire et recherche d'achat ; gardez-la unique à l'intérieur du document |
| Pokémon | Espèce complète, forme, aspects, brillant, niveau, nature, capacité, balle, objet tenu et jusqu'à quatre mouvements |
| Désignation | Texte détaillé de l'exécution, jusqu'à 512 caractères |
| Prix | Nombre entier non négatif dans la devise sélectionnée |
| Stock initial | Nombre initial de serveurs ; `-1` signifie illimité |
| Stock maximum | Plafond de réapprovisionnement; normalisé au moins à Stock initial |
| Montant du réapprovisionnement | Unités restaurées par intervalle ; zéro désactive le réapprovisionnement |
| Restock Intervalle | 20 ticks through 30 days; normalisé à zéro lorsque le montant de réapprovisionnement est nul |

Si les identifiants sont dupliqués, la recherche du serveur utilise la première correspondance. L'éditeur peut ne pas présenter cela comme une erreur de validation matérielle, de sorte que les créateurs doivent garder les identifiants uniques.

## Identité du stock

Le stock fini est tapé par `NPC UUID + Product ID`. Deux PNJ utilisant le même document ont un stock séparé. L'ID de produit renommé sur le même PNJ crée une nouvelle clé de stock à partir du stock initial.

Le réapprovisionnement utilise le temps du monde du serveur. Hors ligne temps de l'horloge murale ne recharge pas l'inventaire. Lorsque les ticks du monde avancent et que le stock est à nouveau interrogé, les intervalles manqués sont appliqués ensemble jusqu'au stock maximum.

## Si un achat échoue

L'échec de livraison ou de paiement restaure le stock et le paiement. Signaler des erreurs persistantes et des détails de transaction à un administrateur.

Les achats vont à l'équipe active. **Gardez un emplacement d'équipe gratuit avant d'acheter.** Les ventes n'envoient pas automatiquement les achats sur le PC.

## Offres commerciales

Choisissez **General → Trade**, puis **Pokémon Trades → Add**. Le modèle du milieu est le Pokémon donné par le PNJ; **Requests** ci-dessous, il identifie ce que le joueur doit donner.

![Bulbasaur ← Rattata offre avec les niveaux demandés, stock et les deux Pokémon boutons de l'éditeur.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-trades.png "Un réel Add result dans 0.2.9 / NeoForge 1.21.1: le joueur donne Rattata et reçoit Bulbasaur. Offert et demandé sont édités séparément. Cela ne montre pas un échange terminé.")

1. Utilisez **Edit NPC Offered Pokémon** pour choisir la récompense Pokémon.
2. Utilisez **Edit Requested Pokémon** pour choisir l'espèce, la forme et les aspects requis.
3. Ensuite, placez **Minimum / Maximum level**, **Shiny rule** et **NPC Stock** à droite.
4. **Save As** et appliquez le fichier au PNJ de transaction. Les joueurs sélectionnent une offre et une propriété éligible Pokémon, puis confirment l’échange.

Un document commercial prend en charge jusqu'à 128 offres. Les règles suivantes correspondent à la **du joueur Pokémon**.

| Champ de demande | Règle de correspondance |
| --- | --- |
| Espèce | Doit correspondre |
| Formulaire | Blank permet toutes les formes, sinon la correspondance exacte |
| Les aspects | Le Pokémon du joueur doit contenir tous les aspects demandés séparés par des virgules |
| Brillant `Any` | L'un ou l'autre état |
| Brillant `Required` | Brillant seulement |
| Brillant `Forbidden` | Non-brillant seulement |
| Niveau Min / Max | Compris dans la gamme 1–100 |

La nature, la capacité, les mouvements, la balle et l'objet tenu affectent les champs Pokémon offerts mais ne correspondent pas à la demande.

## Compléter un échange

1. Le joueur sélectionne une offre.
2. Choisissez un Pokémon éligible de l'équipe active ou du PC.
3. Vérifiez le Pokémon offert et confirmez l'échange permanent.

![Rattata, propriété du joueur, sélectionnée pour l'échange.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-player.png "Choisissez Votre Pokémon ouvre la liste des propriétaires éligibles. Vérifiez l'individu et le message d'exigence vert, puis appuyez sur Confirmer le commerce.")

![Trade complété avec offre stock zéro et le message de succès.](assets/media/guides/cobble-029-neo1211-player/cobble-trade-completed.png "Après la transaction réelle, Rattata a été retiré de l'équipe du serveur, un niveau 5 Bulbasaur a été ajouté et l'offre a été modifiée 1 → 0. Cet échange n'a pas utilisé de monnaie.")

Si la livraison échoue, le serveur essaie de restaurer l'original et restaure le stock de l'offre. Si la restauration immédiate échoue, le Pokémon est conservé dans [ Pokémon Revendications ](#drm-cobblemon-editor/pokemart-auction-gui-runtime).

L'offre Pokémon va à l'équipe **active**. Donner une équipe Pokémon libère son emplacement, mais échanger un PC Pokémon avec une équipe complète peut échouer. Gardez un emplacement d'équipe libre.

Le stock commercial utilise `NPC UUID + Trade ID` et les mêmes règles Initial/Maximum/Restock. Les Trade ID doivent également être uniques.

## Cas types

L'addon récupère les produits de vente, les offres commerciales et les correspondances appartenant à Pokémon par recherche et page. Les grands catalogues et le stockage sur PC n'ont plus besoin d'être envoyés en une seule liste.

- Deux joueurs qui cliquent sur la dernière ligne à actions finies devraient produire un succès.
- Testez l'achat et la récupération des échanges avec une capacité d'équipe ou de PC limitée.
- Confirmer la devise de l'élément rejette les NBT non appariés.
- Formulaire de test et Aspect demandes à la fois ordinaire et variante Pokémon.
- Traiter les ID de produit et commerciaux publiés comme des identifiants de stock persistants.
