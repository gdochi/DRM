---
title: Factions, téléporteurs et popups
slug: world-npc-tools
order: 120
description: Configurez la présentation des factions, les flux de destination et les popups d'exécution réutilisables.
product: core
category: Le monde et les outils PNJ
section: world-tools
status: Stable
version: 0.3.1
audience: Créateurs de monde et de PNJ
tags:
  - faction
  - teleporter
  - popup
translationSource: en
translationMethod: assisted
---

## Afficher les relations de faction aux joueurs

**Faction Editor** Contrôler comment CustomNPCs Les factions apparaissent en DRM. CustomNPCs possède les identifiants de faction et les points réels du joueur. Créer DNPC des groupes séparés dans la [DNPC éditeur](#dochi-npc-core/npc-core-editor).

![Faction Editor les noms des relations, les couleurs, les descriptions et l'aperçu des exemples de points.](assets/media/guides/drm-031-forge1201/registry-faction.png "DRM 0.3.1 / Forge 1.20.1. Statuses stylise les étiquettes de relation. Un exemple de points prévisualise une valeur ; cela ne change pas la réputation réelle d’un joueur.")

1. Dans **Statuses**, définissez les noms, les couleurs et les descriptions de Inamical, Neutral et Friendly.
2. En **Manage Factions**, vérifiez que CustomNPCs est installé et que son catalogue de factions est disponible.
3. Définissez l'ordre, les catégories, les noms, les icônes et les bannières en **Presentation**, ainsi que la disposition du lecteur en **Runtime Screen**.
4. Enregistrez et ouvrez **J** pour vérifier la liste des joueurs et les points.

La présentation est enregistrée en `config/dochi_rpg_maker/factions/settings.json`. Vérifiez cet éditeur pour les étiquettes ou les couleurs incorrectes; vérifiez les conditions / actions d'attribution de points et de faction d'origine pour un score incorrect.

## Donner à un PNJ une liste de destination

Utilisez **Teleporter Editor** pour créer des destinations et appliquer l'ensemble à un PNJ. Séjours **dans la dimension actuelle **.

![Teleporter Editor Spawn destination avec les coordonnées d'arrivée.](assets/media/guides/drm-031-forge1201/teleporter-destinations.png "DRM 0.3.1 / Forge 1.20.1. → L'information contient X/Y/Z. Remplacez l'échantillon 0.5 / 64 / 0.5 par une position sûre dans votre monde.")

1. Créez le nom de la liste et les catégories en **Category Settings**.
2. Utilisez **Destination Settings → Add**, puis définissez le nom, la description, X/Y/Z et Yaw/Pitch.
3. Ajoutez des règles d'accès dans la destination **Conditions** et des commandes avant/après l'arrivée dans **Commands**. Forge expose également la destination **Effects**.
4. Définissez les durées de fondu et les sons de départ/arrivée en **Travel Presentation**.
5. **Save As** un nouveau nom tel que `town_network`. Ouvrez le PNJ avec le noyau et choisissez **Teleporter JSON → your file → Apply Teleporter**.
6. Interagissez avec les deux mains vides, sélectionnez la destination et cliquez sur **Travel**. Vérifier la position d'arrivée et face.

Les ensembles sont enregistrés en `config/dochi_rpg_maker/teleporters/`. **bound** dans l’action de dialogue `Go Teleporter` ouvre l’ensemble appliqué de ce PNJ. Pour personnaliser la mise en page, copiez-la en GUI Maker et connectez-la via l’ensemble **GUI JSON**.

## Afficher un titre de zone ou une notification de quête

Définir le texte temporaire et le timing en **Popup Maker**. Conception de placement et d'illustration dans la mise en page Popup de [GUI Maker](#core/gui-system).

![Contenu de Popup Maker, timings fade/hold, canal et son d'ouverture.](assets/media/guides/drm-031-forge1201/popup-maker.png "DRM 0.3.1 / Forge 1.20.1. Le panneau du milieu inférieur est un aperçu. Fade In 10 / Hold 80 / Fade Out 20 totalise 5.5 secondes à vitesse normale.")

1. Écrivez **Title / Subtitle / Text**.
2. Définissez **Fade In / Hold / Fade Out** durées en ticks; 20 ticks égaux à une seconde.
3. Choisissez comment les notifications qui se chevauchent se comportent sur le même **Channel**, et définissez **Priority** si nécessaire.
4. Choisissez **Opening Sound** et auditionnez-le avec Play.
5. **Save As** votre popup et testez l'affichage réel par une commande `/drm popup` ou une action de dialogue.

Les définitions sont enregistrées en `popups/definitions/`, les politiques en `popups/policies/`. Copiez les fichiers par défaut avec Save As. Si les avis s'accumulent, vérifiez les conflits de canal avec les limites d'affichage simultané et de file d'attente dans la stratégie.


## Afficher le popup enregistré avec une commande

Définir **ID** aux `village_entry` et **Title** aux `Village Gate`puis choisir **Save As → village_entry → Save As**. Fermez l'éditeur et exécutez-le en tant que lecteur avec l'autorisation de gestion :

```mcfunction
/drm popup show @s village_entry
```

![Popup Maker enregistré en tant que village_entry avec le titre Village Gate.](assets/media/guides/drm-031-forge1201/popup-village-save.png "DRM 0.3.1 / Forge 1.20.1. Vérifiez Saved: village_entry.json et le titre. Le panneau du milieu inférieur est l'aperçu de l'éditeur.")

![Le popup sauvegardé affiché dans le jeu réel.](assets/media/guides/drm-031-forge1201/popup-village-runtime.png "DRM 0.3.1 / Forge 1.20.1. C'est le fichier affiché avec la commande ci-dessus. Entrer dans un village ne le déclenche pas automatiquement tant que la détection de région n'est pas connectée séparément.")
