---
title: Créer un NPC Shop
slug: shop-system
order: 80
description: Choisissez des produits, les prix et le paiement, puis donner un PNJ une boutique.
product: core
category: Systèmes centraux
section: npc-shop
status: Stable
version: 0.3.1
audience: Créateurs de boutiques
tags:
  - shop
  - economy
translationSource: en
translationMethod: assisted
---

## Faire un magasin qui vend du pain

Cet exemple vend ** trois pains pour quatre émeraudes **. Les captures statiques montrent **DRM 0.3.1 on Forge 1.20.1, in English**.

### 1. Choisissez le produit et la quantité

Ouvrez **NPC Shop → Use Default** à partir du sélecteur d'éditeur. Sélectionnez **Bread** dans **Buy items** à gauche, puis ouvrez **Product** à droite. Utilisez **Add** pour un nouveau produit.

![Pain sélectionné dans la liste Acheter des articles, avec minecraft:bread et Quantité 3 dans l'onglet Produit.](assets/media/guides/drm-031-forge1201/shop-bread-product.png "Le produit définit ce que le client reçoit. Quantité 3 signifie trois pains par achat.")

Utilisez la loupe à côté de **Item** pour sélectionner l'élément. Définissez **Quantity** à la taille du paquet. **Stock** est le nombre restant d’achats : l’exemple a 12 ; utilisez **-1** pour des ventes illimitées. **Display name** et **Description** contrôlent le nom et la description du produit.

### 2. Définissez le prix et le paiement

Avec le même produit sélectionné, ouvrez **Payment**. **Price** est le prix d'achat. Avec **Quantity 3 + Price 4**, chaque achat échange quatre émeraudes pour trois pains.

![Onglet de paiement indiquant la boutique en ligne, le prix 4 et le paiement de l'objet émeraude.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "Inherit Shop utilise le paiement par défaut de la boutique. item:minecraft : le montant indiqué ci-dessous confirme le montant du paiement.")

Définissez cette valeur par défaut dans **Shop settings** : choisissez **Shop currency → Item** et les émeraudes comme **Payment item**, par exemple. Pour utiliser l'argent DRM, créez-le en [ Currency Editor ](#core/currency-editor) en premier.

![Magasinez les paramètres avec le chemin de mise en page et les contrôles de paiement par défaut.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Ces paramètres s'appliquent à la boutique. Remplacez-les dans Paiement pour un produit avec un mode de paiement différent.")

### 3. Prévisualiser et enregistrer

Cliquez sur **Preview** en haut pour inspecter la disposition de la boutique du joueur. Vérifiez les quantités, les prix et les descriptions. Retournez avec **Close**, puis utilisez **Save As** pour sauvegarder votre propre boutique.

![La boutique orientée lecteur a ouvert avec le bouton Aperçu de l'éditeur, affichant les produits, les prix, une description et un résumé d'achat.](assets/media/guides/drm-031-forge1201/shop-player-preview.png "Ceci est l'aperçu de l'éditeur. Testez un achat réel après avoir appliqué la boutique sauvegardée à un PNJ et apporté l'article de paiement.")

Faites un clic droit sur le PNJ avec le noyau et appliquez la boutique enregistrée. Videz les deux mains et parlez-lui, apportez l'article de paiement et essayez un achat. Pour l'ouvrir à partir d'une conversation, suivez **Open a shop from dialogue** ci-dessous.

### Vérifier la transaction réelle

Utilisez le noyau DRM sur le PNJ et choisissez **NPC Shop JSON → saved shop → Apply Shop**. Apportez dix émeraudes, videz les deux mains et interagissez avec le PNJ. Vérifiez Pain et appuyez sur **Buy Selected**.

![Seul Bread vérifié dans la boutique PNJ.](assets/media/guides/drm-031-forge1201/shop-bread-selected.png "DRM 0.3.1 / Forge 1.20.1. Le 3 sur l'icône est la taille du paquet de pain; le milieu 1 est le nombre de paquets à acheter. Le résumé montre trois pains pour quatre émeraudes.")

![Après l'achat, Emerald est 6 et le bouillon de pain est 11/12.](assets/media/guides/drm-031-forge1201/shop-bread-purchased.png "L'inventaire du serveur a reçu trois pains et les émeraudes sont passées de dix à six. Le stock de pain est tombé de douze à onze et sa minuterie de réapprovisionnement a commencé. Le résumé inférieur suit la lanterne actuellement sélectionnée; ce n'est pas un reçu pour le commerce précédent.")

![Sélectionner Bread et acheter un lot ; le paiement et le stock sont actualisés.](assets/media/guides/extra-videos-20261106/shop-purchase.mp4 "DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, interface anglaise. Trois pains reçus, émeraudes 10→6, stock 12→11.")

## Vente et rachat

| Objectif | Configuration |
| --- | --- |
| NPC vend au joueur | Ajouter des produits à la liste d'achats |
| NPC achète des objets au joueur | Ajoutez-les à la liste de vente/achat |
| Les deux | Utiliser le mode achat-vente |

Le PNJ ne rachète que les articles listés. Vous pouvez lister le même article plusieurs fois avec des quantités ou des prix différents.

## Stock et réapprovisionnement

Stock **0** signifie épuisé; **-1** signifie illimité. Pour des ventes limitées, utilisez un stock positif. Configurez **Restock** pour le remplir automatiquement.

![L'onglet Restock de l'exemple de lanterne, avec Activer le réapprovisionnement, la base de minuterie, l'intervalle de réapprovisionnement et la quantité de réapprovisionnement.](assets/media/guides/drm-031-forge1201/shop-restock.png "Définissez Stock et Stock maximum dans le produit en premier. Restock contrôle si, quand et combien d'achats à remplir. Cette capture utilise l'exemple de la lanterne.")

**Maximum stock is in Product**; **Restock quantity and interval are in Restock**. Un maximum de huit avec un montant de recharge de deux ajoute deux achats à chaque fois, jusqu'à huit.

**Timer basis** s'applique à l'ensemble de la boutique.

| Réglage | Temps compté |
| --- | --- |
| **Real ticks** | Temps réellement joué; les sauts faits par le sommeil sont exclus |
| **World ticks** | Temps du monde, y compris le temps passé à dormir |

À vitesse normale, 20 ticks est d'une seconde et 24,000 ticks est d'environ 20 minutes. Les ticks réels ne comptent pas le temps pendant que le serveur est éteint. Les entrées illimitées et les entrées de rachat ne sont pas réapprovisionnées.

Différents PNJ ont des stocks séparés même lorsqu'ils utilisent le même fichier produit. Les joueurs qui visitent le même PNJ partagent son stock.

## Paiement différent pour un seul produit

**Inherit Shop** utilise l'argent de la boutique. **Override: Item** choisit un élément de paiement distinct. **Override: Currency** choisit une devise distincte DRM.

Sélectionnez un article personnalisé dans l'inventaire lorsque son nom exact, ses enchantements ou sa variante comptent.

## Ouvrir une boutique à partir du dialogue

Ajoutez une action **open shop / go_shop** à un choix de dialogue et choisissez la boutique enregistrée. Utilisez **bound** pour la boutique déjà appliquée à ce PNJ.

Utilisez [GUI Maker](#core/gui-system) pour la mise en page et les images de la fenêtre. Les produits et les prix sont toujours édités en NPC Shop.
