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

Il s'agit des réglages créateur de **Schedule**, puis de leur exécution dans le monde. Lisez le [Démarrage Create](#dochi-npc-core/npc-core-create-start). Vidéos muettes : DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1. Les exécutions utilisent appareils et services préparés ; les éditions montrent les changements indiqués.

## Polissage au papier abrasif

1. Choisissez **Sandpaper Polishing**. Placez de vrais **Sand Paper / Red Sand Paper** et des matériaux polissables dans **Source inventory**.
2. Affectez **Finished items inventory**.
3. Définissez **Working position and facing** avec le sélecteur ou **Use my position and facing**, qui enregistre pieds et orientation.
4. Choisissez **Repeat throughout shift** ou **Finish one batch per shift** avec un **Batch size** fini. L'exemple transforme deux Rose Quartz en deux Polished Rose Quartz.
5. Réglez **Work interval (ticks)**, activez et sauvegardez. **20 ticks** valent une seconde à 20 TPS.

![Chercher papier et quartz, polir au poste affecté et livrer deux résultats.](assets/media/guides/create-tutorials-20261108/create-polish.mp4 "Recette et usure réelles ; les compteurs lisent les inventaires serveur.")

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

![Modifier Workshop A, saisir 80 ticks d'attente et sauvegarder l'itinéraire préparé.](assets/media/guides/create-tutorials-20261108/create-parcel-routes.mp4 "Destinataire et stockages préparés. 80 ticks valent quatre secondes à 20 TPS, contre 400 par défaut.")

L'itinéraire conserve l'**UUID**, pas le nom. Recréer ou cloner un PNJ du même nom ne remplace pas cette identité. Resélectionnez le remplaçant ; voir [Modèles PNJ](#dochi-npc-core/npc-core-templates).

![Workshop A arrive au PNJ, tandis que Unknown reste à l'origine.](assets/media/guides/create-tutorials-20261108/create-parcel-npc.mp4 "Un colis scellé rejoint l'inventaire du destinataire ; l'autre ne correspond pas.")

## Itinéraire vers un inventaire

Choisissez **Add inventory delivery route**, sélectionnez le stockage par Maj + clic droit et indiquez l'adresse. Modifiez une ligne avec **Choose a receiving inventory / Choose an NPC recipient**.

![Livrer un colis scellé dans un tonneau récepteur.](assets/media/guides/create-tutorials-20261108/create-parcel-container.mp4 "Livraison intacte, sans déballage Packager ni transport ultérieur.")

Un colis doit correspondre à **exactement un** itinéraire. Les motifs Create s'appliquent : **Workshop *** peut recouper **Workshop A**. Les colis ambigus restent à l'origine. Commencez avec des adresses exactes distinctes.

## Attente et retours

Si le destinataire est déjà absent/plein avant collecte, le colis reste à l'origine. Si cela arrive en route, le PNJ attend puis retourne vers **Return inventory**. Un retour plein laisse le colis au livreur.

![Retourner un colis lorsque sa destination se remplit après collecte.](assets/media/guides/create-tutorials-20261108/create-parcel-return.mp4 "L'outil remplit volontairement la destination de pierre après collecte pour illustrer le blocage. Le colis revient intact.")

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

![Le PNJ s'assoit au comptoir et ouvre le vrai menu de commande Create.](assets/media/guides/create-tutorials-20261108/create-stock-keeper.mp4 "Présence et ouverture du menu, sans paiement ni livraison complète.")

**No Packagers Linked** apparaît car ce comptoir de démonstration n'a pas de Packager fournisseur connecté. Reliez réseau logistique et stock réels pour commander. Le guide des commandes utilise un autre réseau connecté.

C'est le menu Create pour joueurs, distinct de la boutique DRM. Tickers absents/ambigus ou siège occupé bloquent la présence. Le PNJ descend en sécurité après le service. S'asseoir, tenir le comptoir et [commander automatiquement](#dochi-npc-core/npc-core-create-factory) sont des actions distinctes.

## Combustible du Blaze Burner

Le transport d'objets existant peut livrer du combustible accepté à un Create Blaze Burner compatible et conserver les récipients rendus, comme les seaux. Prévoyez de la place. Réglez filtres et quantités dans [Travail et transport PNJ](#dochi-npc-core/npc-core-editor). Ces nouvelles vidéos ne montrent pas séparément le ravitaillement. Chauffer le Burner ne fournit pas automatiquement énergie, tuyauterie et conditions de recette.
