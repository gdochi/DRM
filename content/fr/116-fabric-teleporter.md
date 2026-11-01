---
title: Téléporteur
slug: teleporter
order: 82
description: Créez des ensembles de destination, liez-les à des PNJ et configurez le runtime Teleporter du lecteur.
product: core-fabric
category: Systèmes centraux
section: teleporter
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
tags:
  - teleporter
  - npc
  - gui
translationSource: en
translationMethod: assisted
---

## Rendre une destination à la ville

Laissez les joueurs interagir avec un PNJ, choisir une destination et voyager. Terminez une destination avant d'ajouter des conditions d'accès ou de présentation. Ce sont des captures d'écran en anglais de **DRM 0.3.1 / NeoForge 1.21.1**.

1. Tenez-vous à la destination et notez ses coordonnées **F3**. Vérifiez le sol et la hauteur libre.
2. Faites un clic droit sur l'air avec le noyau et ouvrez **Teleporter Editor → Create New**.
3. Dans **Category Settings**, renommez **Towns** ou utilisez **Add** pour une nouvelle catégorie. **Display name** Nomme la liste complète des destinations.

![Paramètres de la catégorie pour le nom d'affichage de la liste et la catégorie Villes.](assets/media/guides/drm-031-neo1211/teleporter-editor.png "Le milieu contient les paramètres de liste et les catégories; le droit modifie le nom de la catégorie sélectionnée et l'icône. Définissez les coordonnées de destination dans les paramètres de destination suivants.")

### Nom et position d'arrivée

Ouvrir **Destination Settings**. Utilisez **Add** ou sélectionnez l’échantillon **Spawn**, puis configurez **Info** à droite.

| Contrôle | Quoi entrer |
| --- | --- |
| **Name / Description** | Un nom d'emplacement et les directions que les joueurs peuvent reconnaître |
| **Enabled** | Si cette destination est disponible |
| **Category** | La catégorie établie ci-dessus |
| **Position → X / Y / Z** | Coordonnées d'arrivée; Y est la hauteur des pieds du joueur |
| **Yaw / Pitch** | Orientation et angle de vue vertical après l'arrivée |

![La page Spawn Info avec son nom, sa description, sa catégorie, sa position et sa rotation.](assets/media/guides/drm-031-neo1211/teleporter-destinations.png "Remplacez l'échantillon 0.5 / 64 / 0.5 par une position sûre dans votre monde. Le renommage de la destination ne change pas ses coordonnées.")

Séjours **dans la dimension actuelle **. Entrer les coordonnées du Nether seul ne déplace pas le joueur dans le Nether.

### Choisissez qui peut l'utiliser

Laissez les conditions vides pour le premier test. Après les travaux de voyage, configurez-les séparément :

- **Interaction Conditions:** qui peut ouvrir toute la liste.
- **Destination Settings → destination → Conditions:** qui peut utiliser cette destination.

Par exemple, tout le monde peut ouvrir la liste tandis que seuls les joueurs qui ont terminé une quête peuvent visiter les ruines. **Category Settings → Locked destination presentation** contrôle si les entrées verrouillées apparaissent grisées, masquées ou autrement stylées. Il n'accorde pas l'accès.

![Conditions d'interaction avec Enabled, Mode ET et Add.](assets/media/guides/drm-031-neo1211/teleporter-conditions.png "Utilisez Add pour configurer une condition et cochez Enabled. Cette capture d'écran est l'état initial sans conditions.")

### Transitions d'écran et sons

Dans **Travel Presentation**, **Fade out / Fade in** définissez les durées d'assombrissement et de retour en ticks. À vitesse normale, 20 ticks égale une seconde; la valeur indiquée de 10 est d'environ une demi-seconde chacune. Choisissez **Departure sound / Arrival sound** avec les boutons de recherche et auditionnez-les avec Play.

![Présentation de voyage avec des durées de fondu et des sons de départ et d'arrivée séparés.](assets/media/guides/drm-031-neo1211/teleporter-presentation.png "Choisissez chaque son séparément. Si une destination exécute également des commandes, configurez leur synchronisation dans son onglet Commandes.")

## Sauvegarder et connecter le PNJ

1. **Save As** un nouveau nom tel que `guide_travel`. L'éditeur ajoute l'extension et enregistre `guide_travel.json`.
2. Faites un clic droit sur **DNPC or CustomNPCs NPC** avec le noyau.
3. Dans **NPC Apply**, choisissez **Teleporter JSON** à gauche et votre fichier au milieu. Utilisez **Refresh** si nécessaire.
4. Cliquez sur **Apply Teleporter** et vérifiez la liste appliquée à droite.
5. Interagissez avec les deux mains vides, sélectionnez une destination et voyagez. Vérifiez l'ouverture de la liste, les coordonnées d'arrivée et face séparément.

![Le téléporteur du joueur montre la porte Village après avoir appliqué le set au PNJ.](assets/media/guides/drm-031-neo1211/teleporter-npc-player.png "Sélectionnez une destination au milieu, puis appuyez sur Voyage en bas à droite. Cet exemple laisse la grande région d'image vide.")

![Après le voyage, le joueur arrive à l'entrée en chêne préplacée.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "Le serveur a confirmé l'arrivée à la sauvegarde X 20.5 / Y -60 / Z 0.5. Les poteaux de plancher et de chêne ont été préparés dans le monde de la capture pour identifier le point d'arrivée. Utilisez vos propres coordonnées de destination.")

Utilisez **Remove Teleporter** sur ce PNJ pour supprimer la connexion. Appliquez à nouveau lorsque vous passez à un fichier enregistré sous un autre nom.

Pour l'ouvrir à partir d'un choix de dialogue régulier, ajoutez ** go_teleporter ** dans [ Choice actions ](#core-fabric/dialogue-system). Choisissez **bound** pour la liste appliquée de ce PNJ ou sélectionnez un fichier enregistré pour une autre liste.

## Mise en page et fichiers enregistrés

Modifier les destinations et les conditions ici; modifier le placement de la liste, les illustrations et les boutons dans [GUI Maker](#core-fabric/gui-system). La connexion est **Category Settings → GUI JSON / Open GUI Maker**. Conservez une liste de destinations, un bouton de voyage et un bouton de fermeture dans la mise en page personnalisée.

Les ensembles sont enregistrés en `config/dochi_rpg_maker/teleporters/`. `default_teleporter_set.json` et `gui/default_teleporter_gui.json` sont des templates de démarrage. Gardez votre travail séparément avec **Save As**.

Pour une destination manquante, cochez Activé, catégorie, texte de recherche et conditions. Si la liste s'ouvre mais que le voyage est rejeté, vérifiez la distance jusqu'au PNJ et les conditions modifiées, puis interagissez à nouveau pour le rouvrir.
