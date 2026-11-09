---
title: Ventes aux enchères, réclamations et mises en page
slug: pokemart-auction-gui-runtime
order: 542
description: Configurez un PNJ d'enchères, collectez les achats et les recettes, et personnalisez l'écran du joueur.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs exploitant des maisons de ventes aux enchères et des écrans PokéMart personnalisés
tags:
  - auction
  - escrow
  - gui-maker
translationSource: en
translationMethod: assisted
---

## Faire une vente aux enchères NPC

Dans [PokéMart Editor](#drm-cobblemon-editor/cobblemon-pokemart), choisissez **General → NPC Role → Auction** et un mode de paiement. Ouvrez **Auction** à gauche pour définir **Auction House ID**, les frais d'inscription et les taxes. **Save As** votre propre fichier et l'appliquer à l'enchère PNJ.

![ID de la maison de vente aux enchères, limites d'inscription, frais et taxes dans l'éditeur.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-auction.png "Ecran du créateur en Cobblemon Editeur 0.2.9 / NeoForge 1.21.1. L'exemple utilise le défaut de la maison, cinq listes par joueur, une limite de 1440 minutes, les frais 500, la taxe 5% et l'augmentation minimale de l'enchère 100. Il ne montre pas une liste ou une vente terminée.")

Utilisez le ** même ID de maison et les paramètres de devise compatibles ** pour partager les listes entre les villages. Différents ID créent des maisons de vente aux enchères séparées même lorsque leurs devises correspondent.

## Énumérer, enchérir et collecter

1. Dans **Auction Listing**, choisissez un Pokémon et une enchère de départ. L'écran par défaut actuel utilise la durée configurée de la maison. Définissez un rachat optionnel si la maison le permet. Les frais d'inscription et détient le Pokémon pour la vente aux enchères.
2. D'autres joueurs choisissent une liste en **Auction** et enchérissent ou rachètent. Les vendeurs ne peuvent pas enchérir sur leurs propres annonces.
3. Après l'installation, ouvrir **Settlement Inbox → Claim All**. Les acheteurs perçoivent Pokémon; les vendeurs perçoivent le produit après impôt. Les joueurs Outbid recueillent également leurs offres précédentes ici.

**Conservez un emplacement libre pour l'équipe active avant de collecter Pokémon.** L'espace PC seul ne garantit pas la livraison. Les entrées qui ne peuvent pas être livrées restent dans les réclamations ; fixez la capacité ou l'accès aux devises et réessayez.

![Rattata et prix sélectionnés dans la liste des enchères.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-player.png "Écran réel du joueur en 0.2.9 / NeoForge 1.21.1. Cet exercice utilise des émeraudes, enchère de départ 10, rachat 20 et frais 2. Liste Pokémon · La taxe 2 présente la liste.")

![La Rattata et le solde 62 énumérés après les frais d'inscription.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-listed.png "Listing changé émeraudes 64 → 62, retiré Rattata de l'équipe et créé une liste active. L'enchère et le rachat sont désactivés pour le vendeur ; l'Annulation reste disponible.")

![Un unbid expiré Pokémon en attente dans Settlement Inbox.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-inbox.png "L’horloge de jeu du monde isolé a été avancée pour vérifier l’expiration de l’offre. Pokémon L'attente: 1 a été suivie par l'action réelle Revendication Tout.")

![Zéro Pokémon réclamations d'attente et d'enchères livrées après la collecte.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-claimed.png "Rattata est retourné à l'équipe du serveur et le nombre d'attente a changé 1 → 0. Le solde est resté 62 après les frais d'inscription payés. Cet exercice n’incluait pas l’offre d’un autre joueur, une vente complétée ou un règlement fiscal.")

## Référence des paramètres d'enchères

| Réglage | Plage | Comportement d'exécution |
| --- | ---: | --- |
| ID Maison | Jusqu'à 64 caractères symboliques | Enchères PNJ avec les mêmes listes d'actions ID et la même portée de règlement |
| Max Listings | 1–64 | Annonces actives par joueur dans cette maison |
| Durée maximale | 5–10,080 minutes | Limite de durée ; l'écran de liste par défaut actuel utilise cette valeur |
| Frais d'inscription | Entier non négatif | Débité avant séquestre; remboursé lorsque le transfert d'entiercement échoue |
| Taxe de vente | 0–100% | Déduction faite du produit de la vente |
| Augmentation minimale de l'offre | Au moins 1 | Augmentation nécessaire de la prochaine offre |
| Autoriser le rachat | Marche/arrêt | Permet le prix d'achat instantané et l'action |
| Permettre Brillant / Légendaire | Marche/arrêt | Admissibilité à l'inscription |

Les annonces existantes conservent leur devise et leurs paramètres fiscaux d'origine. La modification du document d'enchères ne convertit pas toutes les listes actives vers la nouvelle politique.

## Liste et escrow

Le serveur nécessite une offre de départ positive, un rachat de zéro ou au moins l'offre de départ, la capacité d'inscription disponible, détenue et échangeable Pokémon, l'éligibilité de la politique et des frais d'inscription payables.

L'inscription charge les frais et détient le Pokémon pour l'enchère. L'enregistrement échoué rembourse les frais et ne crée aucune inscription.

## Offres et rachats

Si un autre joueur enchérit alors que votre écran est ouvert, changez d'onglets ou rouvrez l'écran PNJ et vérifiez le nouveau prix avant d'enchérir à nouveau. Les offres ordinaires doivent correspondre au prix actuel plus **Minimum Bid Increment**.

- Un nouvel enchérisseur sécurise l'offre complète.
- Le plus offrant actuel ne paie que la différence lorsqu'il soulève sa propre offre.
- Le montant précédent d'un joueur surenchéri passe à Réclamation d'argent.
- Une enchère égale ou supérieure à Buyout est réglée au montant de buyout configuré.
- Le règlement donne à l'acheteur une réclamation Pokémon et au vendeur une réclamation d'argent après impôt.

Les réclamations non livrées restent stockées pendant qu'un joueur est hors ligne, que son équipe est pleine ou que le fournisseur de devises n'est pas disponible.

## Annulation et expiration

Seul le vendeur peut annuler, et seulement avant qu'un enchérisseur existe. L'annulation ne se termine que si le Pokémon peut immédiatement revenir à l'équipe ou au PC; sinon, la liste reste active.

Le serveur règle les listes expirées environ chaque 20 ticks.

- Aucun enchérisseur: retournez le Pokémon par le biais de la réclamation du vendeur.
- Enchérisseur le plus élevé: créer acheteur Pokémon Réclamation et vendeur Money Claim.
- Le vendeur procède: `winning amount - (winning amount × tax ÷ 100)`.

`Claim All` ne supprime que les entrées livrées avec succès. Échec de la livraison de la monnaie ou Pokémon laisse la demande pour un essai ultérieur.

## Composants d'interface graphique d'exécution

Vérifiez d'abord le comportement de la boutique, puis modifiez une mise en page **PokéMart** dans [ GUI Maker ](#core/gui-system). Utilisez **Save As** pour votre propre mise en page et connectez-le en **General → Runtime GUI** en PokéMart Editor. La forme du produit du créateur et l'écran de transaction du joueur sont des écrans séparés.

PokéMart GUI Maker utilise une étape logique 800×450.

| Composante | Temps d'exécution data/action | Exemples d'inspecteurs |
| --- | --- | --- |
| En-tête et équilibre | Afficher le nom, la balance, l'avertissement du fournisseur | Titre, balance, couleurs d'avertissement |
| Barre | Fermer | Couleurs des boutons |
| Onglets de mode | Commutation de tabulation spécifique au rôle | Écart et couleurs actives/inactives |
| Rechercher | Filtre la liste actuelle | Clé de traduction d'espace réservé |
| Catalogue | Produits, offres ou annonces scrollables | Hauteur de rangée/écart, couleurs, barre de défilement |
| Pokémon Aperçu | Modèle 3D sélectionné | Échelle du modèle, niveau/écran brillant |
| Pokémon Détails | Données sur l'espèce, la description, le prix, le stock ou l'offre | Couleurs du texte |
| Domaine d'action | Acheter, échanger, enchère, liste, annuler, réclamation | Contrôle de l'écart et des couleurs des boutons |

Ces composants fonctionnels sont des singletons. La suppression d'un composant critique laisse le runtime sans endroit pour rendre ses données ou ses contrôles.

Les recherches d'addon et les listes de pages, les Pokémon éligibles, les choix de vente et les réclamations sur le serveur. Les mises en page PokéMart et Starter Selector par défaut utilisent la feuille de sprites partagée de DRM. Seules les valeurs par défaut héritées intactes sont mises à niveau automatiquement ; les fichiers GUI personnalisés sont conservés et les valeurs par défaut remplacées sont sauvegardées sous `cobblemon/_migration_backups/`.

| Rôle | Onglets visibles dans le jeu |
| --- | --- |
| Ventes | Pokémon Boutique |
| Commerce | Pokémon Commerce |
| Enchères | Enchères, Liste des enchères, Boîte de réception de règlement |

Si GUI JSON est manquant, a le mauvais `guiType` ou n'a pas de structure d'élément valide, l'exécution revient à la valeur par défaut de l'addon pour ce rôle. Si une seule zone est manquante, inspectez d'abord la présence et la géométrie de ce composant.

## Essai de fonctionnement

1. Joueur A liste un Pokémon; vérifier les frais et l'enlèvement.
2. Joueur B enchérit ; vérifiez que A ne peut pas annuler.
3. Joueur C surenchérit ; vérifiez que B reçoit une demande de remboursement.
4. Compléter Buyout et réclamer l'acheteur Pokémon et vendeur produit net.
5. Expiration du test avec et sans soumissionnaire.
6. Redémarrez le serveur et vérifiez que les listes, l'entiercement, les enchères et les réclamations persistent.
7. Désactivez temporairement un fournisseur de devises et vérifiez que les réclamations échouées restent stockées.
