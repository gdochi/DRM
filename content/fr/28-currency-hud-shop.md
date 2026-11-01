---
title: Utiliser une monnaie dans les magasins et les HUD
slug: currency-hud-shop
order: 92
description: Connectez la même devise enregistrée aux paiements du magasin et à l'affichage du solde du joueur.
product: core
category: Currency Editor
section: currency-editor
status: Guide
version: 0.3.1
audience: Créateurs et opérateurs
translationSource: en
translationMethod: assisted
---

## Sélectionnez la même devise enregistrée

Sauvegarder `town_coin` dans [Currency Editor](#core/currency-editor). Son fichier définit le type d’argent ; un magasin accepte cet argent et un HUD affiche le solde du joueur. Sélectionnez le même ID dans les trois endroits.

## Accepter son équilibre dans une boutique

1. Ouvrir **NPC Shop → Shop settings**.
2. Choisissez **Shop currency → Currency** et la devise enregistrée.
3. Utilisez **Payment → Payment method → Inherit Shop** pour les produits qui le suivent.
4. Définissez **Price**, enregistrez et appliquez la boutique au PNJ.
5. Essayez un achat avec un joueur détenant un solde dans cette devise.

![Paramètres de magasin pour le paiement commun.](assets/media/guides/drm-031-forge1201/shop-settings.png "DRM 0.3.1 / Forge 1.20.1. Cette photo utilise le paiement de l'article; changez la devise de la boutique en devise pour un solde de DRM. Les remplacements de produit ont priorité sur le paramètre commun.")

| Paiement | Ce dont le joueur a besoin |
| --- | --- |
| Poste | Articles d'inventaire réels, tels que quatre émeraudes |
| Monnaie | Une balance stockée, telle que town_coin 4 |

Une émeraude **Item Icon** ne fait pas accepter les articles émeraude à la boutique. Choisissez le paiement séparément. Voir [produits](#core/shop-editor-items) pour les remplacements.

## Afficher la balance sur un HUD

1. Ouvrir **HUD Maker → + Currency**.
2. Recherchez `town_coin` dans **Apply Currency HUD**.
3. Vérifiez l'ID sous le nom et appuyez sur **Apply** de ce sélecteur.
4. Sélectionnez l'élément **Currency** ajouté et définissez le format de position, de taille et de quantité.
5. **Save As** le HUD défini et utilisez la barre d'outils **Apply** pour l'activer.

![Ville Coin / town_coin sélectionné dans Apply Devise HUD.](assets/media/guides/drm-031-forge1201/hud-currency-picker.png "DRM 0.3.1 / Forge 1.20.1. Appliquer à l'intérieur de ce sélecteur ajoute le composant. Appliquer dans la barre d'outils derrière il active l'ensemble.")

Configurez le formatage et la visibilité en HUD Maker plutôt que d'ajouter des champs HUD obsolètes au fichier de devise. L'artefact Forge 0.3.1 coché peut rejeter la deuxième sauvegarde de l'activation en raison d'une limite de requête ; voir la note d'activation de [HUD Maker](#core/hud-maker).

## Préparez de l'argent pour un contrôle des transactions

Avec l'autorisation administrative, utilisez l'ID enregistré réel :

```mcfunction
/drm currency give @s town_coin 20
/drm currency get @s town_coin
```

Pour un achat au prix de quatre, comparez le solde et le nombre de produits avant et après. Si le trading fonctionne mais que l'affichage est manquant, vérifiez le HUD actif, l'ID de devise et les règles de visibilité. Utilisez [ conversion pickup](#core/currency-fields) pour transformer les objets collectés en solde.
