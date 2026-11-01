---
title: Choisissez les bonnes parties de l'interface graphique
slug: gui-maker-components
order: 102
description: Choisissez des composants qui affichent les dialogues, produits, soldes et messages réels.
product: core
category: GUI Maker
section: gui-maker
status: Guide
version: 0.3.1
audience: Créateurs d'interface graphique
translationSource: en
translationMethod: assisted
---

## Gardez les parties fonctionnelles dans la mise en page

Pour une conversation, positionnez les zones **dialogue** et **choix** avant d’ajouter du texte ou des images décoratifs. L'éditeur de dialogue fournit la ligne réelle et répond; GUI Maker fournit leur position et leur apparence.

![Toile de dialogue avec aperçu PNJ, dialogue et choix.](assets/media/guides/drm-031-forge1201/gui-maker.png "DRM 0.3.1 / Forge 1.20.1. Gardez les zones de dialogue/choix réelles séparées du texte décoratif. Écrivez la conversation en Dialogue Editor.")

## Parties du dialogue

| Composante | Affichages |
| --- | --- |
| boîte de dialogue | Ligne PNJ du nœud actuel |
| choix | Réponses satisfaisant leurs conditions de visibilité |
| entité | Aperçu des PNJ ou des entités |
| poste | Icône d'élément de présentation |
| image / panneau | Photos, fond et cadrage |

Enlevez `dialog` ou `choice` la place utilisée pour les parties de la conversation.

## Pièces de magasin

| Composante | Affiche ou exécute |
| --- | --- |
| item_slot | Lignes de produits |
| player_inventory | Player inventory en mode vente |
| shop_transaction_viewer | Résumé de la transaction prévue |
| shop_action_button | Achat ou vente |
| shop_item_description | Description du produit |
| shop_search_bar / shop_page_selector | Recherche et navigation de page |
| currency_display | Solde des joueurs ou avoirs en paiement |

Acheter et vendre des mises en page peut partager des parties, mais le mode actif détermine la ligne et la signification de l'action. Fabriquer des produits en [NPC Shop](#core/shop-system).

## Monnaie et pièces de statut de joueur

`currency_list` fournit la zone de liste. `currency_icon`, `currency_amount`, `currency_delta` et `currency_name` montrent une icône, un équilibre, un changement récent et un nom. `player_health`, `player_food`, `player_armor`, `player_air` et `player_xp_level` montrent l'état du joueur.

Une composante de montant monétaire n'accorde pas d'argent. Les soldes changent à travers les actions du serveur, les transactions et la conversion de ramassage. Voir [devises et HUD](#core/currency-hud-shop).

## Restes de pièces

Utilisez `dialog` pour le corps du message et `panel / image` pour le cadrage. Les messages restants n'utilisent pas de liste de choix de conversation. Connectez la mise en page à travers le message [Reste ](#core/remnant-msg).

Si un composant est vide, vérifiez si la fonctionnalité fournit ses données et si le composant a une zone visible. Pour la position et la superposition, voir [édition de toile](#core/gui-maker-screen).
