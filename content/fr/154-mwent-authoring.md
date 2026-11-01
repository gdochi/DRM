---
title: Configurer des tables, cartes et packs
slug: authoring
order: 1540
description: Mappages de table d'opérateur, cartes personnalisées, packs de cartes et chemins de stockage possédés.
product: mwent
category: Opérations et création
section: authoring
status: Guide
version: 0.1.6
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Mapper un jeu à une table

Les opérateurs peuvent Maj-clic droit sur une table avec une main vide pour sélectionner un enregistrement MWENT jeu ou profil intégré. Plusieurs tables peuvent réutiliser un ID de jeu. La cartographie ne nécessite pas un nouveau JSON pour chaque bloc. La sélection du deck joueur est séparée des paramètres de jeu de l'opérateur partagé.

L'éditeur de jeu actuel gère les règles, les conditions de démarrage, les récompenses, la présentation et la sélection d'IA intégrée. Configurez les récompenses de victoire dans l'onglet Récompenses. La pratique de l’IA par défaut est gratuite et non récompensée. Le serveur vérifie les conditions de démarrage, les destinataires des récompenses et les résultats. Les références aux devises, conditions ou actions DRM nécessitent leur fournisseur.

## Créez une carte personnalisée en 0.1.5

1. Ouvrir **MWENT Table → Card Editor** ou **Mods Config → Minigames → Custom Cards → Card Editor**. `/minigame cards` est une autre entrée.
2. Créez une carte ou utilisez **Save As** pour copier une carte existante dans la bibliothèque personnalisée.
3. Définissez faction, cadre, rareté, puissance, provisions, modèle et équipement.
4. Configurez les conditions de déclenchement → → opérations cibles → → coûts et limites.
5. Enregistrez, connectez la carte à des collections, des decks, des packs ou des pools d'acquisition, et vérifiez-la dans une bataille.

L'enregistrement enregistre une définition; il n'accorde ni objets physiques ni copies possédées. Les variantes cosmétiques des cartes existantes partagent la propriété de l'original et dupliquent les limites et conservent ses valeurs de combat. Les matches en cours d'exécution conservent les définitions avec lesquelles ils ont commencé.

### Lire l'éditeur de cartes

Ces **Minigames 0.1.5 / NeoForge 1.21.1** écrans montrent le intégré **Imperial Artisan**. Utilisez **Save As** pour créer une carte personnalisée avant de tenter de modifier les champs prédéfinis désactivés.

![Onglet de base de l'éditeur de cartes avec l'aperçu, le nom, le type, la faction, la description et la liste des cartes personnalisées.](assets/media/guides/minigames-015-neo1211/minigames-card-basic.png "Ensembles de base identité et genre. Apparence gère le modèle/équipement, Stats gère la puissance et les états, et Capacités gère les effets déclenchés.")

![Stats avec le mot clé Salvage 1 existant, compteur / temporisateur initial, états spéciaux et puissance.](assets/media/guides/minigames-015-neo1211/minigames-card-stats.png "Les statistiques incluent les mots-clés et les états initiaux ainsi que la puissance. Cet exemple intégré a Salvage 1.")

![Capacités avec la capacité existante sélectionnée, montrant Boost et Montant 2.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Sélectionnez une capacité à gauche en premier. Son effet Boost 2 est séparé de la puissance de la carte 4.")

Chaque carte prend en charge jusqu'à douze capacités, avec huit conditions et huit opérations par capacité. Déployez, commandez, terminez, détruisez, déplacez, soignez et jouez des cartes. La sélection directe de la cible est utilisée pour le déploiement et l'ordre; les déclencheurs automatiques utilisent des sélections telles que toutes ou aléatoires. Des scénarios, des emplacements, des pièges et des chapitres peuvent également être créés.

## Modèles de siège et fournisseurs optionnels

0.1.5 comprend les modèles originaux de balle, de trébuchet, de canon, de chargeur automatique, de balle motorisée, de canon automatique et de chariot d'approvisionnement. Sélectionnez un modèle de machine dans l'apparence d'une carte d'entité. Les modèles de base et les capacités fonctionnent sans créer de gros canons. Les palettes compatibles utilisent des actifs installés réels; le combat de cartes ne nécessite pas de machinerie mondiale ou de réseau électrique.

DNPC Les apparences de clones sont facultatives. Enregistrer une entité de secours si fournisseurs ou modèles manquants restaurer le modèle par défaut. L'IA clone, les emplois, les inventaires et les statistiques de combat ne deviennent pas des règles de carte.

## Faire des packs de cartes

L'éditeur de pack contrôle les cartes fixes, les pools pondérés, les quantités, les choix de cartes finales et l'apparence. Vérifiez si les destinataires peuvent utiliser les cartes sélectionnées. Le serveur possède les résultats d'ouverture. Connecter le marchand et la distribution de coffre via [paramètres d'acquisition](#mwent/acquisition).

![Le Volkar Muster Pack exemple, avec un pool de cartes pondérées sur la gauche, les options d'ouverture ci-dessus et les détails de la carte sur la droite.](assets/media/guides/minigames-015-neo1211/minigames-card-packs.png "Le poids est un poids de sélection relatif dans la piscine. Lisez les cartes garanties pour la quantité et les options de choix pour le choix final séparément.")

Utilisez **Get saved pack** en haut pour obtenir un pack sauvegardé. Enregistrez votre propre premier, puis ouvrez son élément physique pour vérifier le nombre garanti et la séquence de choix.

## Référence de stockage

| Emplacement | Contenu |
| --- | --- |
| `config/dochi_minigames/games/mob_battle/` | Réutilisable MWENT jeu / IA mappings |
| `config/dochi_minigames/cards/custom_card_<number>.json` | 0.1.5 Définitions de cartes personnalisées |
| `config/dochi_minigames/card_packs/` | Définitions de Card Pack |
| `config/dochi_minigames/acquisition.json` | Paramètres d'acquisition actifs |
| `<world>/data/dochi_minigames/cards/` | Quantités de coffre-fort par joueur |
| `<world>/data/dochi_minigames/decks/` | Decks sauvegardés par joueur |

Minigames possède des jeux, des cartes et des packs même avec DRM installé. Utilisez Save As pour les fichiers personnalisés avant de les mapper. Les fichiers `table_<32 hex>` hérités restent compatibles en lecture dans `config/dochi_minigames/internal/tables/` ; les nouveaux blocs ne les créent pas automatiquement. DRM GUI Maker Les mises en page sont séparées des règles du jeu.
