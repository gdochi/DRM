---
title: Create · Fabrication et commandes de matériaux
slug: npc-core-create-factory
order: 1516
description: Distinguez quatre rôles de stockage, configurez les lots et commandez les manques via Create.
product: dochi-npc-core
category: Intégration Create
section: editor
status: Guide
version: 0.1.3
audience: Créateurs / administrateurs de serveur
translationSource: en
translationMethod: assisted
---

## Commencer avec une machine fonctionnelle

**Factory Process** alimente une vraie machine et collecte son vrai résultat. Testez d'abord la recette manuellement. Create contrôle énergie, sens, contrainte, chaleur et fluides. Exemple : **Iron Ingot → Mechanical Press + Depot → Iron Sheet**, avec Creative Motor comme source de démonstration.

Lisez le [Démarrage Create](#dochi-npc-core/npc-core-create-start) et les [Colis](#dochi-npc-core/npc-core-create-logistics). Vidéos muettes : DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Quatre rôles de stockage

| Champ | Rôle | Exemple |
| --- | --- | --- |
| Source inventory | Prendre les matières premières | Tonneau gauche |
| Machine input inventory | Insérer dans la machine | Depot sous la presse |
| Finished output inventory | Collecter les résultats réels | Même Depot |
| Finished items inventory | Livrer les produits | Tonneau droit |

Entrée et résultat peuvent partager le Depot. L'origine doit différer de l'entrée et la destination finale de la sortie machine. Les moitiés du double coffre forment le même inventaire. Commencez avec deux tonneaux et un Depot.

## Configurer Factory Process

1. Ajoutez **Schedule → + du service → Create → Factory Process**.
2. Affectez quatre positions avec **🔍** et vérifiez faces/filtres natifs.
3. Choisissez **Material item / Material quantity**. **Add material** accepte **8 objets distincts**, **1–64** chacun par lot.
4. Réglez **Finished item / Finished quantity per batch** selon la recette.
5. Désactivez d'abord **Order missing materials automatically** et alimentez manuellement.
6. Activez **Repeat throughout shift** ou définissez un **Batch size** fini, qui compte ici les lots.
7. Réglez **Processing timeout in ticks / Work interval (ticks)**, activez et sauvegardez.

![Choisir les quatre positions et les deux objets de Factory Process, saisir quantités et délais et produire deux plaques.](assets/media/guides/create-lessons-20261108/lesson-factory-process.mp4 "Part d'un planning vide. Entrée et résultat sélectionnent le même Depot. Un lingot et une plaque par lot, Batch size 2 ; le stockage final est ouvert.")

**Repères**: 0:10 Planning vide · 0:42 Quatre positions · 1:15 Choisir les objets · 1:49 Quantité/nombre · 2:03 Activer/sauver · 2:17 Exécution native · 2:35 Résultat en stock.

## Quantités des lots

| Réglages | Par lot | Total fini |
| --- | --- | --- |
| Matière 1, résultat 1, Batch size 2 | 1 lingot → 1 plaque | 2 → 2 |
| Matière 2, résultat 2, Batch size 3 | 2 lingots → 2 plaques | 6 → 6 |

Cela suppose une recette garantie 1:1. Des résultats aléatoires peuvent faire attendre une quantité impossible. **Les IDs de matière et de produit doivent différer**.

## Réunir, insérer, attendre, livrer

Retirez le produit configuré déjà présent dans la sortie avant de commencer. Le PNJ réunit, insère, attend le résultat réel et livre. Un travailleur réserve entrée/résultat ; un autre les partageant peut attendre avec **Workstation is reserved by another worker**.

## Le délai limite conserve les marchandises

Par défaut : **1200 ticks**, environ 60 secondes à 20 TPS ; plage **20–24000 ticks**. **Processing timed out; existing materials remain owned** conserve le lot au lieu de l'effacer et d'en insérer un doublon.

Vérifiez énergie/contrainte, ingrédients, chaleur/fluides, vraie sortie, ID et quantité. Une destination pleine conserve les produits sur le PNJ ; un inventaire PNJ plein empêche la collecte. Vérifiez les réservations avant de remplacer des blocs ou déplacer les marchandises. Se reconnecter ou modifier les réglages n'annule pas sûrement un lot en cours.

## Material Ordering maintient un stock cible

**Material Ordering** contrôle **Receiving inventory to maintain** et commande le manque via Stock Ticker. Une cible de **4 lingots** commande quatre depuis zéro ou un si trois sont présents. Ici, quantité signifie **stock cible** ; en fabrication, c'est la **consommation par lot**.

Préparez Create :

1. Stock fournisseur et **Packager**.
2. **Stock Link / Stock Ticker** sur le même réseau ; vérifiez les stocks visibles.
3. Vraie livraison adressée et déballage vers le récepteur ; commander ne téléporte pas les objets.
4. Configurez [Addressed Parcel Delivery](#dochi-npc-core/npc-core-create-logistics) séparément si des PNJ portent les colis. Stocker un colis scellé ne le déballe pas.

Ajoutez ensuite **Material Ordering**, affectez récepteur, objets/cibles, **Stock Ticker**, **Delivery address** et intervalle, puis sauvegardez.

![Affecter stockage récepteur, fer, objectif quatre, Ticker et adresse, puis vérifier commande et stock 16→12.](assets/media/guides/create-lessons-20261108/lesson-material-order.mp4 "Inclut recherche, sélection et Apply natifs. Montre commande acceptée et emballage ; arrivée et déballage exigent un trajet séparé.")

**Repères**: 0:04 Planning vide · 0:36 Stockage récepteur · 0:45 Stock cible · 1:02 Ticker/adresse · 1:17 Activer/sauver · 1:31 Exécution native · 1:44 Stock fournisseur · 1:49 Commande/arrivée.

## Les commandes en attente ne sont pas renvoyées automatiquement

Les commandes acceptées survivent aux sauvegardes et reconnexions. Le temps ne déclenche pas de renvoi. L'arrivée doit être constatée dans le récepteur original ; placer directement des objets sur le PNJ n'achève pas une livraison absente.

| État | Vérifier |
| --- | --- |
| Native logistics network has insufficient stock | Fournisseur, Stock Link et résumé du Ticker |
| Native logistics network rejected the order | Conditions natives de réseau/commande |
| Accepted order is waiting for delivery | Packager, adresse, transport, déballage et récepteur original |
| Order result uncertain; automatic resend stopped | Si Create a déjà réservé ou expédié les biens |
| Target stock is available | Cible satisfaite ; attente normale |

Changer de récepteur ne fait pas arriver une ancienne commande dans le nouveau stockage.

## Ajouter l'approvisionnement automatique

Après réussite manuelle, activez **Factory Process → Order missing materials automatically** et affectez **Stock Ticker / Delivery address**. Le travail reprend lorsque les matières arrivent à l'origine. Commencez par un seul responsable de commande pour éviter les rôles superposés. Continuez vers [Commande et inspection](#dochi-npc-core/npc-core-create-control).
