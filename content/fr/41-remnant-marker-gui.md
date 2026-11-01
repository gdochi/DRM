---
title: Placez un marqueur de message
slug: remnant-marker-gui
order: 117
description: Placez un marqueur, écrivez son message, lisez-le et modifiez l'interface graphique d'affichage.
product: core
category: Remnant Msg
section: remnant-msg
status: Stable
version: 0.3.1
audience: Créateurs / opérateurs
tags:
  - remnant
  - gui
  - marker
translationSource: en
translationMethod: assisted
---

## Laissez une petite note à un endroit

Pour une note utilisée à un endroit, vous n'avez pas besoin de créer un fichier en premier. Maintenez la touche **Remnant Msg Setter** et cliquez avec le bouton droit sur une face de bloc pour placer un marqueur et ouvrir ses paramètres. Avec l'autorisation d'édition, écrivez dans Message et appuyez sur **Save**.

![Texte du message entré après avoir placé un marqueur avec le passeur.](assets/media/guides/drm-031-neo1211/remnant-message-ready.png "DRM 0.3.1 / NeoForge 1.21.1, anglais UI. Le texte est ‘Suivre les lanternes pour atteindre le village’. Message JSON sélectionne un document existant; Le modèle de marqueur contrôle le marqueur mondial; Enregistrer stocke son message.")

1. Obtenez le setter avec `/give @s dochi_rpg_maker:remnant_msg_setter`.
2. Cliquez avec le bouton droit sur la face du bloc où le marqueur doit être attaché.
3. Entrez le texte en **Message**.
4. Gardez **Marker model: Default icon** et mettez à l'échelle 1 pour la première tentative, puis enregistrez.
5. Rangez le setter et faites un clic droit sur le marqueur pour le lire. Un créateur autorisé tenant le passeur ouvre l'édition à la place.

![Le marqueur enregistré s'ouvre par utilisation à la main vide.](assets/media/guides/drm-031-neo1211/remnant-placed-setter.png "Résultat réel du message sauvegardé dans le même artefact DRM 0.3.1 / NeoForge 1.21.1. Cette interface graphique par défaut affiche le texte et la fermeture. Suivez les étapes de l'interface graphique ci-dessous pour modifier son arrière-plan ou sa position de texte.")

Enregistrer dans ce flux de travail crée le fichier de message du serveur et le lie au marqueur mondial. L'enregistrement d'un document et le placement d'un marqueur sont des opérations distinctes.

## Changer le marqueur du monde

Ouvrez **Marker model** et choisissez Icône, élément, bloc ou caché par défaut. Pour Élément ou Bloc, recherchez une entrée, sélectionnez-la et Postulez. De retour dans le passeur, appuyez sur Enregistrer pour mettre à jour le marqueur.

![Le marqueur-modèle réel sélecteur.](assets/media/guides/drm-031-neo1211/remnant-marker-picker.png "DRM 0.3.1 / NeoForge 1.21.1. Les quatre onglets contrôlent l’apparence du marqueur mondial, pas l’arrière-plan de l’écran de lecture. Cette capture conserve l'icône par défaut.")

**Scale** contrôle la taille du marqueur, **Billboard** comment il fait face à la caméra, et X/Y/Z son modèle se compense. Modifiez la taille et la position du texte de l'écran de lecture en GUI Maker.

## Trouver un marqueur placé à nouveau

Avec le setter, **clic droit en l'air** ou **sneak-clic droit un bloc** pour ouvrir la liste du monde. Utilisez les flèches de message pour sélectionner un marqueur, vérifiez son emplacement et son texte, puis modifiez. Avant Supprimer, vérifiez que le marqueur prévu est sélectionné.

![Un message enregistré dans la liste mondiale.](assets/media/guides/drm-031-neo1211/remnant-populated-world-list.png "Réel DRM 0.3.1 / NeoForge 1.21.1 sauver le résultat. La liste affiche la dimension, les coordonnées, le marqueur lié_...json et le texte. La page précédente/suivante change de page ; le +/- central modifie le message sélectionné.")

## Réutiliser un message et connecter une interface graphique

Pour le même texte à plusieurs endroits, enregistrez un document dans [Remnant Msg Editor](#core/remnant-msg), puis choisissez-le avec **Message JSON** dans chaque setter. **Policy** sélectionne des règles telles que qui peut placer ou modifier des marqueurs. Les utilisateurs généraux peuvent accéder uniquement à ce que la stratégie du serveur autorise.

Pour personnaliser l'écran de lecture :

1. Créez une **remnant_msg** GUI dans [GUI Maker](#core/gui-system).
2. Placez un élément `dialog` pour le message réel; ajoutez `panel` ou `image` éléments pour un arrière-plan si vous le souhaitez.
3. Save As un nouveau nom d'interface graphique.
4. Sélectionnez cette interface graphique dans le document Reste du message et enregistrez-la.
5. Lisez à nouveau un marqueur lié à ce document.

Les types d'interface graphique `dialogue` et remnant_msg servent différents écrans. Pour les choix de PNJ et de branchement, utilisez [Dialogue Editor](#core/dialogue-system).
