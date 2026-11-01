---
title: Connect Shop Monnaie et mises en page
slug: shop-currency-gui
order: 82
description: Choisissez des éléments de paiement ou des soldes DRM et connectez une fenêtre de boutique personnalisée.
product: core
category: NPC Shop
section: npc-shop
status: Guide
version: 0.3.1
audience: Créateurs de boutiques
translationSource: en
translationMethod: assisted
---

## Prenez des objets émeraude ou un solde de pièces de ville

Ouvrir **NPC Shop → Shop settings → Shop currency**. Un élément d'inventaire et un solde enregistré DRM sont des méthodes de paiement différentes.

| Paiement | Choisir | Préparer d'abord |
| --- | --- | --- |
| Émeraude | → Article de paiement: minecraft:emerald | Aucune définition de devise nécessaire |
| Solde des pièces de monnaie | Devise → économisée town_coin | Enregistrer dans [Currency Editor](#core/currency-editor) |

![Achetez la devise et l'article de paiement dans les paramètres de la boutique.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Cet exemple prend des articles émeraude à travers le même article requis. Un produit peut l'écraser dans le paiement.")

## Utilisez un paiement différent pour un seul produit

Sélectionnez le produit et ouvrez **Payment**. **Inherit Shop** utilise le paramètre commun ; un élément ou une devise remplace uniquement ce produit. Changer le nombre dans le prix ne sélectionne pas un autre mode de paiement.

![Paramètres de paiement du pain.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Vérifiez à la fois le mode de paiement et le prix. La quantité de produit est le paquet livré ; le prix est le coût de ce paquet.")

## Connectez votre propre boutique

1. Ouvrez une mise en page **npc_shop** en **GUI Maker**.
2. Organisez les lignes de produits, les prix et les contrôles d'action; **Save As** votre propre mise en page.
3. Dans **NPC Shop → Shop settings → Shop interface**, choisissez le mode d'interface personnalisée.
4. Utilisez le bouton Parcourir à côté de **Interface JSON** pour sélectionner la mise en page enregistrée.
5. Enregistrez la boutique, appliquez-la au PNJ et rouvrez la boutique actuelle.

Les mises en page d'achat / vente séparées doivent toutes deux utiliser ** npc_shop **. Une mise en page de dialogue ne fournit pas les zones de produit et de transaction attendues.

![Boutique PNJ réelle avec Pain vérifié et le total du paiement ci-dessous.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. L'exercice coûte quatre émeraudes pour trois pains. Vérifiez les produits sélectionnés et le total avant d'acheter.")

| Changement | Editeur |
| --- | --- |
| Produits, quantités, prix, stock | NPC Shop → Produit / Réassortiment |
| Poste de paiement ou solde | Paramètres de la boutique ou produit Paiement |
| Lignes de produits et placement des boutons | GUI Maker → npc_shop |
| Nom de la devise, icône et conversion | Currency Editor |
| Un équilibre toujours visible pendant le jeu | HUD Maker |

Un composant de solde affiche de l'argent; dessiner une icône ne l'accorde pas. Continuer à [Monnaie et HUD](#core/currency-hud-shop) ou le [Exercice d'achat complet](#core/shop-system).
