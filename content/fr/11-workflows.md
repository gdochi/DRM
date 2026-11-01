---
title: Flux de travail recommandés
slug: workflows
order: 120
description: Flux pratiques pour les PNJ de dialogue, les PNJ de magasin et la configuration des devises / HUD.
product: core
category: Référence / Opérations
section: operations
status: Stable
version: 0.3.1
audience: Créateurs
tags:
  - workflow
  - examples
translationSource: en
translationMethod: assisted
---

## Terminer un dialogue PNJ

1. Ouvrez l'exemple en [Dialogue Editor](#core/dialogue-system) et écrivez le message d'accueil en **Text**.
2. Dans **Choices**, créez un choix de réponse et un choix de fermeture.
3. Vérifiez que **début → Itinéraires** pointe vers le salut.
4. **Save As** `village_guide`.
5. Ouvrez le PNJ avec le noyau et choisissez **Dialogue JSON → village_guide → Apply Dialogue**.
6. Interagissez avec les deux mains vides et testez chaque choix.

![village_guide appliqué en tant que dialogue PNJ.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "DRM 0.3.1 / Forge 1.20.1. Sélectionnez le fichier, appuyez sur Apply Dialogue, puis vérifiez son nom sur la droite.")

Terminez la conversation avec la mise en page par défaut en premier. Pour modifier son apparence, copiez une mise en page en [GUI Maker](#core/gui-system) et connectez-la dans les paramètres du dialogue **GUI**.

## Connecter une boutique

Dans [NPC Shop](#core/shop-system), définir **Product → Payment → Restock** pour les marchandises, le prix et le stock. Vérifiez **Preview**, Save As le fichier et appliquez-le sous **NPC Shop JSON**. Préparez le paiement, achetez une fois, puis vérifiez l'inventaire et le stock.

![Prix du pain 4 avec le paiement Inherit Shop.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "DRM 0.3.1 / Forge 1.20.1. La quantité 3 est le pain reçu par achat; le prix 4 est les émeraudes payées par achat.")

Pour entrer par dialogue, ajoutez **go_shop** dans **Choice actions** et choisissez la boutique enregistrée. Utilisez **bound** pour la boutique appliquée au PNJ actuel.

## Ajouter de la monnaie et un affichage du solde

1. Créer une devise en [Currency Editor](#core/currency-editor) et Save As.
2. Sélectionnez-le pour le paiement en magasin, la correspondance des éléments physiques ou le solde DRM à la méthode prévue.
3. Ajoutez la devise dans [HUD Maker](#core/hud-maker) et sélectionnez la même devise.
4. Test d'octroi d'argent, d'achat et d'affichage du solde ensemble. L'ajout d'un HUD ne donne pas d'argent.

Lorsque vous déplacez des fichiers, vérifiez l'interface graphique, la boutique et la devise connectées dans [dossiers enregistrés](#core/paths).
