---
title: Produits, rachat et stock
slug: shop-editor-items
order: 81
description: Faites un produit à trois pains coûtant quatre émeraudes, puis configurez le stock et le réapprovisionnement.
product: core
category: NPC Shop
section: npc-shop
status: Guide
version: 0.3.1
audience: Créateurs de boutiques
translationSource: en
translationMethod: assisted
---

## Choisissez dans quelle direction va le commerce

Ouvrez la boutique par défaut à partir [NPC Shop configuration](#core/shop-system). **Buy items** contient des produits que le joueur achète ; **Sell items** contient des objets que le joueur vend au PNJ. Le mode commercial de la boutique doit également permettre la direction sélectionnée.

| Exemple | Liste | Le joueur reçoit |
| --- | --- | --- |
| NPC vend du pain | Acheter des articles | Pain après paiement |
| NPC achète du blé | Vendre des articles | Le paiement configuré après avoir donné du blé |

## Faire un paquet de trois pains

![Pain sélectionné sous Acheter des articles, avec les paramètres du produit.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "DRM 0.3.1 / Forge 1.20.1. La quantité 3 est du pain par achat; Stock 12 signifie douze achats, pas douze pains.")

1. Sélectionnez **Bread** ou utilisez **Buy items → Add**.
2. Choisissez le pain en dessous de **Product → Item** et réglez l'affichage **Name**.
3. Fixer **Quantity 3**, **Stock 12** et **Maximum stock 12**.
4. Ajoutez un produit **Description** si nécessaire. Il est distinct du nom et des effets de l'article livré.

Utilisez **Duplicate** pour une variante et **Delete** pour une ligne indésirable. Le pain ordinaire n'a pas besoin de NBT personnalisé; l'appariement d'articles spéciaux peut en avoir besoin.

## Chargez quatre émeraudes pour l'ensemble du paquet

![Onglet de paiement Pain avec prix quatre et paiement émeraude.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Prix 4 achète l'ensemble Quantité 3 bundle. item:minecraft:merald identifie l'élément de paiement.")

Ouvrez **Payment**, définissez **Price 4** et utilisez **Payment method → Inherit Shop** pour suivre la devise par défaut de la boutique. Lire **Preview** avant d'économiser. Choisissez **Override: Item / Override: Currency** pour un paiement spécifique au produit ; utilisez **Required items** pour plusieurs matériaux. Voir [connexions monétaires](#core/shop-currency-gui).

## Restocker un produit limité

![Restocker l'onglet avec des contrôles d'intervalle et de montant.](assets/media/guides/drm-031-forge1201/shop-restock.png "Activez le réapprovisionnement et définissez l'intervalle de réapprovisionnement, le montant du réapprovisionnement et le stock maximal. Le ravitaillement s’arrête au maximum.")

| Réglage | Signification |
| --- | --- |
| Stock 12 / 0 / −1 | Douze achats / épuisé / illimité |
| Stock maximum 12 | Bouchon de recharge |
| Quantité de réapprovisionnement 2 | Restaurer deux achats par intervalle |
| Intervalle de réapprovisionnement 24000 | Un jour normal Minecraft à 20 tiques par seconde |

Utilisez la quantité positive, l'intervalle et le maximum pour le réapprovisionnement fini. La boutique de **Timer basis** détermine comment le temps de sommeil manqué est compté; voir [configuration du magasin](#core/shop-system). Deux PNJ utilisant un fichier de magasin gardent le stock restant séparé.

## Acheter des objets du joueur

Utilisez **Sell items → Add**, choisissez l'article et **Quantity**, puis son paiement. Par exemple, une quantité de blé de trois nécessite un paquet complet de trois blés par vente. Les entrées de rachat n'utilisent pas de stock de produits de vente. Testez l'élément exact lors de l'ajout des exigences NBT.

## Enregistrer et vérifier un achat

**Save As** `village_shop`, puis ouvrez le PNJ avec le noyau DRM et utilisez **NPC Shop JSON → file → Apply Shop**. Ouvrez le PNJ les mains vides, vérifiez le produit et appuyez sur **Buy Selected**. L'exemple vérifié fournit trois pains, enlève quatre émeraudes et réduit le stock d'un.

Modifier le placement des lignes et l'apparence des boutons dans [GUI Maker](#core/gui-system); les produits, les quantités et les prix restent dans NPC Shop.
