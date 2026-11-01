---
title: Flux de travail recommandés
slug: workflows
order: 120
description: Flux pratiques pour le dialogue, les magasins, Teleporter, PNJ Spawner et la configuration de la monnaie / HUD.
product: core-fabric
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

## Construire un PNJ de village dans cet ordre

Commencez par ** une scène de conversation → interaction réelle → magasin ou voyage → apparence personnalisée **. Les dispositions par défaut sont suffisantes pour tester les dialogues et les transactions.

## Guide PNJ : salutation et réponse

1. [ Placer un DNPC ](#dochi-npc-core/npc-core-setup).
2. Écrivez un message d'accueil dans un nœud général Dialogue Editor et une question dans Choix.
3. Créez son nœud de réponse et connectez Goto. Point start Routes vers la salutation.
4. Save As `village_guide` et Apply Dialogue à la NPC.
5. Vider les deux mains et tester la réponse à la question → → fermer.

![Une réponse PNJ réelle après avoir sélectionné la question.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "DRM 0.3.1 / NeoForge 1.21.1. Vérifiez la connexion entre le texte créé et la réponse que le lecteur voit réellement.")

Suivez les [Tutoriel conversation](#core-fabric/dialogue-system) pour chaque écran. Pour un cadeau unique, connectez une étiquette de réclamation comme indiqué dans [conditions et actions ](#core-fabric/conditions-actions).

## Boutique PNJ: vendre un paquet de pain

Sélectionnez Pain dans la valeur par défaut NPC Shop. Vérifiez la quantité de produit `3` et le prix `4`, et utilisez le paiement émeraude sous Paramètres de la boutique. Save As et appliquez NPC Shop sur le PNJ.

Dans la boutique réelle, cochez Pain et appuyez sur **Buy Selected**. Vérifiez **trois pains accordés, quatre émeraudes prises et un paquet de bouillon consommé ** avant d’ajouter d’autres systèmes de récompense.

![Le magasin réel après le pain a été acheté.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "DRM 0.3.1 / NeoForge 1.21.1. Le serveur vérifie le pain 0→3, les émeraudes 10→6 et le bouillon de pain 12→11. Le pied de page suit le produit actuellement sélectionné.")

Suivez [ le tutoriel de la boutique](#core-fabric/shop-system). Ajoutez [ Currency Editor ](#core-fabric/currency-editor) lorsque vous avez besoin d'argent de compte. Utilisez Go Shop pour connecter la boutique enregistrée à partir d'un choix de dialogue.

## Voyage PNJ: enregistrer une destination, puis Voyage

Dans Teleporter Editor, nommez une destination et choisissez les coordonnées dans la même dimension. Save As et appliquez Téléporteur au PNJ. Ouvrez-le les mains vides, sélectionnez la destination et appuyez sur **Travel**.

![Arrivée à la destination de voyage enregistrée.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "DRM 0.3.1 / NeoForge 1.21.1. Les coordonnées du serveur confirment l'arrivée à 20.5 / -60 / 0.5. Le point de repère a été préparé à l'avance pour la vérification de l'emplacement.")

Voir [ le guide du téléporteur](#core-fabric/teleporter) pour les conditions et les destinations verrouillées. Utilisez Go Teleporter pour connecter le jeu enregistré à partir de la boîte de dialogue.

## Étendre un PNJ fonctionnel

| Tâche suivante | Guide |
| --- | --- |
| Dialogue/apparition dans la boutique | [GUI Maker](#core-fabric/gui-system) |
| Affichage persistant de la santé ou de l'argent | [HUD Maker](#core-fabric/hud-maker) |
| Réutiliser un PNJ à plusieurs points d'apparition | [DNPC modèles et Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) |
| Ancienne Core NPC Spawner | [Son propre guide](#core-fabric/npc-spawner) ; CustomNPCs flux de travail appartiennent uniquement aux anciennes cibles prises en charge |
| Déplacer le travail vers un autre serveur | [Folders](#core-fabric/paths) et [application des changements](#core-fabric/data-flow) |

Après Save As sous un nouveau nom, sélectionnez également ce nouveau fichier pour le PNJ. Apportez des images liées, des devises et des magasins, et préservez le placement et la progression des PNJ du monde séparément.
