---
title: Create · Polissage, colis et comptoirs
slug: npc-core-create-logistics
order: 1515
description: Configurez le papier abrasif, les livraisons adressées aux PNJ ou inventaires, les retours et le Stock Ticker.
product: dochi-npc-core
category: Intégration Create
section: editor
status: Guide
version: 0.1.3
audience: Créateurs / administrateurs de serveur
translationSource: en
translationMethod: assisted
---

## Avant de commencer

Les leçons montrent la création dans **Schedule** et son exécution réelle. Consultez [Démarrer Create](#dochi-npc-core/npc-core-create-start) pour installation et sauvegarde. Vidéos muettes en DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1, interface anglaise et étapes coréennes. Chaque tâche part d'un planning vide ; le retour poursuit les réglages sauvegardés dans la livraison au stockage.

## Polissage au papier abrasif

1. Choisissez **Sandpaper Polishing**. Placez de vrais **Sand Paper / Red Sand Paper** et des matériaux polissables dans **Source inventory**.
2. Affectez **Finished items inventory**.
3. Définissez **Working position and facing** avec le sélecteur ou **Use my position and facing**, qui enregistre pieds et orientation.
4. Choisissez **Repeat throughout shift** ou **Finish one batch per shift** avec un **Batch size** fini. L'exemple transforme deux Rose Quartz en deux Polished Rose Quartz.
5. Réglez **Work interval (ticks)**, activez et sauvegardez. **20 ticks** valent une seconde à 20 TPS.

![Vérifier les matériaux, créer le planning, affecter origine, sortie et poste, polir deux pièces et ouvrir le stockage final.](assets/media/guides/create-lessons-20261108/lesson-polish.mp4 "Papier abrasif et deux quartz sont préparés. Recette et usure réelles ; le stockage final contient deux Polished Rose Quartz.")

**Repères**: 0:09 Matériaux · 0:12 Planning vide · 0:44 Origine · 0:53 Stockage final · 1:01 Poste · 1:10 Quantité/nombre · 1:17 Activer/sauver · 1:32 Exécution native · 1:53 Résultat en stock.

Le papier perd sa durabilité réelle. Un stockage plein laisse les résultats au PNJ ; son inventaire doit aussi avoir de la place. Le seul poste de travail ne fournit ni outils, ni matières, ni destination.

## Adresses et destinations

**Addressed Parcel Delivery** transporte le colis Create scellé. L'action n'emballe pas d'ingrédients libres et n'ouvre pas automatiquement les colis livrés.

| Champ | Rôle |
| --- | --- |
| Source inventory | Prendre les colis préparés et adressés |
| Return inventory | Retourner les colis impossibles à livrer après collecte |
| Address routes → Address | Comparer l'adresse Create |
| Recipient: NPC / inventory | Destinataire réel |
| Recipient wait (ticks) | Attendre si la destination devient pleine/absente ; défaut 400 ticks |

Commencez avec origine, destination et retour séparés. Origine et destination doivent différer ; les moitiés d'un double coffre forment un seul inventaire.

Jusqu'à **32 itinéraires** sont possibles. Le **Batch size 1–64** fini compte les **colis scellés**, pas leur contenu. **Repeat throughout shift** poursuit les livraisons pendant le service. **Work interval** accepte **4–1200 ticks**, et **Recipient wait**, **20–24000 ticks**. Les conversions en secondes supposent 20 TPS.

## Itinéraire vers un PNJ

1. Préparez un vrai colis Create adressé **Workshop A** à l'origine.
2. Choisissez l'action et affectez origine et retour.
3. Utilisez **Add address route**, puis un DNPC chargé à **64 blocs** maximum.
4. Remplacez l'adresse proposée par **Workshop A** et vérifiez le destinataire avec **🔍**.
5. Réglez attente, répétition/quantité finie et intervalle ; sauvegardez.

L'itinéraire conserve l'**UUID**, pas le nom. Recréer ou cloner un PNJ du même nom ne remplace pas cette identité. Resélectionnez le remplaçant ; voir [Modèles PNJ](#dochi-npc-core/npc-core-templates).

![Créer un itinéraire depuis un planning vide, définir origine et retour, choisir destinataire et Workshop A, puis livrer.](assets/media/guides/create-lessons-20261108/lesson-parcel-npc.mp4 "Receiving Clerk est choisi dans le sélecteur natif. Un colis scellé rejoint le PNJ et Unknown reste à l'origine.")

**Repères**: 0:10 Planning vide · 0:42 Origine/retour · 0:58 PNJ destinataire · 1:08 Adresse · 1:11 Quantité/nombre · 1:22 Activer/sauver · 1:36 Exécution native · 1:52 Résultat en stock.

## Itinéraire vers un inventaire

Choisissez **Add inventory delivery route**, sélectionnez le stockage par Maj + clic droit et indiquez l'adresse. Modifiez une ligne avec **Choose a receiving inventory / Choose an NPC recipient**.

![Créer un itinéraire vers un stockage, définir origine, retour, destination et adresse, puis vérifier la réception.](assets/media/guides/create-lessons-20261108/lesson-parcel-container.mp4 "Part d'un planning vide. Le tonneau bleu reçoit le colis scellé ; emballer des objets ordinaires est une autre opération Create.")

**Repères**: 0:10 Planning vide · 0:42 Origine/retour · 0:58 Cibles du monde · 1:06 Adresse · 1:10 Quantité/nombre · 1:21 Activer/sauver · 1:35 Exécution native · 1:52 Résultat en stock.

Un colis doit correspondre à **exactement un** itinéraire. Les motifs Create s'appliquent : **Workshop *** peut recouper **Workshop A**. Les colis ambigus restent à l'origine. Commencez avec des adresses exactes distinctes.

## Attente et retours

Si le destinataire est déjà absent/plein avant collecte, le colis reste à l'origine. Si cela arrive en route, le PNJ attend puis retourne vers **Return inventory**. Un retour plein laisse le colis au livreur.

![Rouvrir l'itinéraire sauvegardé dans la leçon précédente, changer l'attente et vérifier destination pleine et colis retourné.](assets/media/guides/create-lessons-20261108/lesson-parcel-return.mp4 "L'outil remplit explicitement la destination de pierre après collecte. Les deux inventaires sont ouverts pour montrer le résultat.")

**Repères**: 0:15 Pause ajoutée · 0:19 Activer/sauver · 0:33 Blocage · 0:53 Vérifier destination · 0:58 Colis retourné.

| État | Action |
| --- | --- |
| Waiting for a uniquely addressed package | Comparer l'adresse à tous les itinéraires |
| Recipient unavailable; keeping the package | Vérifier identité, dimension, zone chargée et accès |
| Recipient full; keeping the package | Libérer de la place |
| Returning the undelivered package | Garder le retour accessible |
| Output full; keeping the item | Libérer la destination et vérifier la cargaison conservée |

Finir un service n'efface pas les marchandises. Un colis déjà pris peut garder sa destination originale après une modification. Vérifiez les cargaisons en route avant de les rediriger.

## Présence au Stock Ticker

1. Placez un **Create Seat immobile** avec **exactement un Stock Ticker** à côté.
2. Configurez réseau et stock réels.
3. Choisissez **Stock Ticker Attendance**, puis affectez séparément **Stock Ticker / Create seat**.
4. Sauvegardez, fermez et attendez **Attending the Stock Ticker**.
5. L'interaction ordinaire ouvre le menu natif. Les outils d'édition gardent leur priorité.

![Créer le travail de comptoir, choisir Ticker et siège séparément et ouvrir les commandes avec un stock connecté.](assets/media/guides/create-lessons-20261108/lesson-stock-ticker.mp4 "Packager fournisseur et Stock Link sont reliés. Montre approche, siège, interaction à main vide et écran natif.")

**Repères**: 0:08 Planning vide · 0:40 Cibles du monde · 0:56 Activer/sauver · 1:10 Exécution native · 1:23 Écran de commande.

Le comptoir filmé relie Packager fournisseur, Stock Link et véritable stock de fer au même réseau. Une interaction à main vide ouvre le menu Create avec ce stock visible. Paiement et livraison finale au destinataire ne font pas partie de cette leçon.

C'est le menu Create pour joueurs, distinct de la boutique DRM. Tickers absents/ambigus ou siège occupé bloquent la présence. Le PNJ descend en sécurité après le service. S'asseoir, tenir le comptoir et [commander automatiquement](#dochi-npc-core/npc-core-create-factory) sont des actions distinctes.

## Combustible du Blaze Burner

Le transport d'objets existant peut livrer du combustible accepté à un Create Blaze Burner compatible et conserver les récipients rendus, comme les seaux. Prévoyez de la place. Réglez filtres et quantités dans [Travail et transport PNJ](#dochi-npc-core/npc-core-editor). Ces nouvelles vidéos ne montrent pas séparément le ravitaillement. Chauffer le Burner ne fournit pas automatiquement énergie, tuyauterie et conditions de recette.
