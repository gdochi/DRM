---
title: Noms, valeurs et conversion des devises
slug: currency-fields
order: 91
description: Définissez les noms de devises, le formatage du montant, les valeurs de récupération et la monnaie physique.
product: core
category: Currency Editor
section: currency-editor
status: Guide
version: 0.3.1
audience: Créateurs et opérateurs
translationSource: en
translationMethod: assisted
---

## Nommer et afficher la devise

Utilisez **Currency Editor → General settings** pour les règles de la devise. Fixer les prix des produits séparément en [ NPC Shop → Paiement ](#core/shop-system).

![Nom de la devise, format d'affichage, règles de mort et paramètres de conversion des éléments.](assets/media/guides/drm-031-forge1201/currency-editor.png "DRM 0.3.1 / Forge 1.20.1. Cela définit un type d'argent; il ne définit pas directement un prix de produit ou le solde actuel d'un joueur.")

| Réglage | Choisir |
| --- | --- |
| Activé | Si la monnaie est utilisée |
| Nom | Nom du joueur-visible |
| Format d'affichage | Formatage du montant; `%s G` affiche 1200 comme `1200 G` |
| Paramètres de mort | Si et combien d'argent est perdu |
| Utiliser comme monnaie partagée | Indique s'il faut l'utiliser comme monnaie partagée |
| Icône d'élément | L’image représentative de la monnaie |

L'ID enregistré est séparé du nom. **Save As** `town_coin`, puis sélectionnez cette même devise dans les magasins, les récompenses et les HUD. Le renommage du nom affiché est différent de la création d'un autre ID.

## Convertir les objets ramassés en argent

Activez **Convert items on pickup**, puis ouvrez **Item Prices**. La sélection d'une icône n'ajoute aucune règle de conversion.

![Les articles de conversion de ramassage sont ouverts à partir des prix des articles.](assets/media/guides/drm-031-forge1201/currency-item-prices.png "Commencez par Ajouter un élément, puis affectez la valeur / l'élément aux lignes de conversion cochées et utilisez Appliquer sélectionné.")

1. Dans **Add Item**, recherchez et vérifiez l'élément; utilisez **Add Selected**.
2. Vérifiez la ligne de conversion de cet élément.
3. Définir **Value / Item → 10**alors, **Apply Selected**. Un élément correspondant vaut dix unités d'équilibre.
4. Fermez la fenêtre et **Save / Save As** la devise.
5. Ramassez l'article réel et comparez sa quantité d'inventaire avec le changement de solde.

![town_coin sauvé avec seulement Emerald attribué une valeur de dix.](assets/media/guides/drm-031-forge1201/currency-emerald-prices.png "DRM 0.3.1 / Forge 1.20.1. Emerald vaut 10 et le chemin sauvegardé est town_coin.json. Cela vérifie les règles enregistrées; la conversion réelle de ramassage est une vérification séparée.")

La recherche `emerald` permet également de trouver du minerai et des blocs. Vérifiez **Emerald / minecraft:emerald** seul et utilisez **Add Selected (1)** pour cet exercice. **Select Visible** sélectionne chaque résultat de recherche visible.

## Monnaie physique

**Physical currency** définit l'argent qui peut être remis en tant qu'élément. Définissez son nom, son ID unique et sa valeur par élément, puis enregistrez. L'icône, la liste de conversion et la monnaie physique ont des utilisations différentes. Continuer à [ configuration de la devise](#core/currency-editor) pour connecter une boutique.
