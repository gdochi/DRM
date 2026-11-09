---
title: Appui de véhicules, tirs et PNJ
slug: expanded-support-actions
order: 331
description: Tracez des routes et réglez véhicules, armes, sources de PNJ et horaires.
product: dochi-warfare-expanded
category: Appui au combat
section: support
status: Guide
version: 0.3.2
audience: Créateurs de cartes et opérateurs
translationSource: en
translationMethod: assisted
---

## Choisissez un outil

Apprenez d’abord les commandes de [votre première timeline](#dochi-warfare-expanded/expanded-support-timeline). Ces outils peuvent partager un document.

| Outil | Action dans le monde | Début |
| --- | --- | --- |
| Vehicle support | Glisser du départ à la destination | Apparition/déplacement du véhicule |
| Fire support | Cliquer la cible et tracer l’approche | Apparition du véhicule/appareil |
| NPC deployment | Glisser du départ à la destination | Clones ou sélection/déplacement de PNJ existants |

Testez un seul événement avant de les combiner. Terminez par [enregistrement, simulation et lancement](#dochi-warfare-expanded/expanded-support-run).

## 1. Envoyez un véhicule en renfort

1. Choisissez **Vehicle support** dans un document vide.
2. Tracez départ/destination sur un terrain praticable.
3. Revenez à **Select / move** et sélectionnez l’événement.
4. Vérifiez le sélecteur : l’exemple conserve **un M1A2 de base**.
5. Début **3 secondes**, nombre **1**, espacement **12**, rayon défensif **24**, durée **60 secondes**.
6. Vérifiez les deux positions dans **Advanced**. Corrigez avec poignées ou coordonnées.

![Tracez une route avec début à trois secondes, un véhicule, espacement 12, rayon 24 et durée 60.](assets/media/guides/dwe-tutorials-20261109/dwe-vehicles.mp4 "06 · Création de la route. La vidéo 10 montre apparition, déplacement et suppression du véhicule temporaire.")

| Champ | Signification |
| --- | --- |
| Count | 1–8 par événement ; testez d’abord un véhicule |
| Spacing | Mêmes décalages de formation au départ et à l’arrivée |
| Faction | Identifiant numérique ; relations normales d’hostilité |
| Guard radius | Zone défendue après arrivée |
| Lifetime | Depuis l’apparition, trajet compris |

Les unités défendent les environs après arrivée. Les véhicules terrestres ont besoin d’un trajet praticable. Les hélicoptères apparaissent au sol et décollent avec l’IA native ; Y destination demande une hauteur de vol. Les avions utilisent bombardement/appui de tir.

## 2. Configurez l’appui de tir

1. Avec **Fire support**, cliquez la cible et tracez l’approche.
2. Vérifiez **mode sol/air → véhicule → arme réelle**. Changer de mode réinitialise aussi les valeurs par défaut.
3. Exemple : plafond **20** tirs, fenêtre **3 secondes**, distance **48**, balayage **16**.
4. Début **5 secondes**, durée **30 secondes**.
5. Pour l’air, réglez l’altitude et testez approche, tirs et sortie sur le terrain prévu.

![Réglez direction, plafond de tirs, durée, distance et balayage.](assets/media/guides/dwe-tutorials-20261109/dwe-fire.mp4 "07 · Réglages au sol ; sans sélection du mode aérien, autre arme ou tirs réels.")

**Début, fenêtre de tir et durée de vie sont distincts.** Le début programme l’apparition ; la fenêtre compte depuis le **premier tir réel**. Le tir s’arrête au plafond de temps ou de coups. Terrain, portée, sortie sûre et durée de vie peuvent l’écourter.

Seules mitrailleuses/canons automatiques fournis par le serveur sont admissibles. Bombes, roquettes, missiles et canons lents sont exclus. Cadence, munitions, chaleur, rechargement et sécurité natifs restent actifs. L’appui aérien attaque puis quitte ; l’appui terrestre balaie avec la tourelle.

## 3. Déplacez des PNJ existants

| Source | Préparation et résultat |
| --- | --- |
| Area | Sélectionne les PNJ avec DW AI active dans la sphère de départ à l’exécution |
| Clone | Crée des copies d’un PNJ enregistré dans la bibliothèque DW |

1. Tracez départ/destination avec **NPC deployment**.
2. Vérifiez **Source** : la capture utilise **Area**, sans clones enregistrés.
3. Nombre **4**, rayon **16**, espacement **2**, vitesse DW **5**.
4. Début **2 secondes**, durée **30 secondes**. Une faction affecte sélection/apparition.
5. Vérifiez les positions dans **Advanced** et enregistrez.

![Réglez route, nombre, rayon, espacement, vitesse et horaires pour Area.](assets/media/guides/dwe-tutorials-20261109/dwe-npcs.mp4 "08 · Création Area uniquement ; déplacement réussi non montré. Préparez des PNJ avec DW AI active près du départ.")

Area utilise une **sphère centrée au départ à l’exécution**. Les PNJ montés, recrutés ou déjà dirigés sont exclus. Pour Clone, activez DW AI sur l’original avant de l’enregistrer. Les identifiants de fichier peuvent différer des noms affichés.

Le combat DW est prioritaire ; l’avancée reprend ensuite. Aucun téléport ne contourne les obstacles. À expiration, **seuls les clones créés sont supprimés**. Les PNJ existants retrouvent leurs réglages antérieurs sans écraser aveuglément les modifications effectuées pendant l’exécution.

## Combinez les appuis

Commencez par **PNJ à zéro seconde → véhicules à trois → tirs à cinq**. L’ordre de départ ne garantit pas l’ordre d’arrivée : navigation, physique et combat restent actifs.

Revoyez [horaires et centre](#dochi-warfare-expanded/expanded-support-timeline), puis [enregistrez et lancez](#dochi-warfare-expanded/expanded-support-run). Les véhicules temporaires ne permettent ni embarquement, ni clonage, ni capture par pierre d’âme. Utilisez [l’éditeur de véhicules](#dochi-warfare-expanded/expanded-overview) pour les véhicules permanents.
