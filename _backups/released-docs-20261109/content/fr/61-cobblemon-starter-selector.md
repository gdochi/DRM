---
title: Créer un PNJ Starter Selection
slug: cobblemon-starter-selector
order: 551
description: Choisissez les cartes de démarrage et accordé Pokémon, puis ajoutez une condition de sélection unique.
product: drm-cobblemon-editor
category: PNJ de service
section: services
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs de PNJ et opérateurs de serveur
tags:
  - starter-selector
  - pokemon-give
  - runtime-gui
translationSource: en
translationMethod: assisted
---

## Laissez les joueurs choisir l'un des trois démarreurs

Créez des candidats en **Starter Selector Editor**, puis appliquez le profil à un PNJ. Les joueurs sélectionnent une carte et confirment leur Pokémon. Utilisez a DNPC ou CustomNPCs PNJ le **Minecraft 1.21.1, Fabric or NeoForge**.

![Trois candidats débutants, le libellé de la carte au milieu et les paramètres Pokémon à droite.](assets/media/guides/cobble-029-neo1211/cobble-starter.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1, interface utilisateur anglaise. Sélectionnez un candidat à gauche, modifiez le texte de la carte au milieu et le Pokémon accordé à droite.")

1. Ouvrez **Starter Selector Editor → Use Default** à partir de la liste des éditeurs DRM.
2. Sélectionnez un candidat. Fixez **Card Name / Pokémon Description**, et gardez chaque **Option ID** unique.
3. En **Starter settings → Edit Pokémon**, définissez l'espèce, le niveau, la forme, la nature, la capacité, l'objet tenu et les mouvements. Le renommage de la carte ne change pas les espèces accordées.
4. Utilisez **Add / Delete** pour les candidats 1 – 32.
5. **Save As** un fichier d'utilisateur tel que `custom/village_starters.json`.
6. Ouvrez le PNJ avec le noyau DRM et **Apply** le fichier à **Starter Selector**.
7. Interagissez avec les deux mains vides et vérifiez les cartes, les détails et la confirmation.

Si le dialogue DRM normal ou une boutique s'ouvre en premier, utilisez la main vide **Shift+right-click**. Pour ouvrir la sélection à partir d'un choix de dialogue normal, ajoutez **go_starter_selector** et choisissez un fichier, ou **bound** pour le profil appliqué au PNJ actuel.

![Chemin d'accès utilisateur et statut enregistré après Save As.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "Le chemin d'exemple enregistré par Save As. La création du fichier et l'application du rôle PNJ sont des étapes distinctes.")

![Trois cartes de démarrage et le bouton Choisir ce Pokémon ouvert en interagissant avec le PNJ.](assets/media/guides/cobble-029-neo1211/cobble-starter-runtime.png "Vue Joueur : sélectionnez une carte, puis confirmez avec Choisir ce Pokémon en bas à droite. Cet exemple sélectionne Bulbasaur parmi les trois candidats par défaut.")

La confirmation ferme le sélecteur et ajoute le Pokémon à l'équipe. Le panneau d'équipe sur la gauche ci-dessous montre **Bulbasaur / Lv.5**; l'équipe du serveur a également été vérifiée pour le seul Bulbasaur accordé.

![Après confirmation, le jeu montre un niveau 5 Bulbasaur dans l'équipe sur la gauche.](assets/media/guides/cobble-029-neo1211/cobble-starter-granted.png "Cobblemon Éditeur 0.2.9 / DNPC 0.1.3 / NeoForge 1.21.1. Le résultat de la concession ; configurez les conditions ci-dessous pour une limite unique.")

## Autoriser une sélection par joueur

Le sélecteur n'impose pas de limite unique permanente et universelle. Configurez à la fois l'action de sélection réussie et les conditions :

1. Dans **Dialogue and GUI → Success Tag (optional)**, entrez `starter_chosen` et réglez le bouton ci-dessous sur **Add tag after grant**.
2. En vertu de **Card display conditions** de chaque candidat, exiger que le joueur **n'a pas starter_chosen**. Activez les conditions avec **Enabled** et appliquez la limite à chaque candidat.
3. Si vous utilisez un dialogue d'introduction, mettez la même condition à l'ouverture de la sélection.
4. Sélectionnez avec un nouveau joueur, puis interagissez à nouveau pour vérifier que les démarreurs précédemment revendiqués ne sont pas disponibles.

Les actions réussies ne s'exécutent qu'après que le Pokémon est accordé. Une équipe complète revient au stockage sur PC. Si aucun des deux ne peut recevoir le Pokémon, les actions réussies ne s’exécutent pas.

![Dialogue et interface graphique avec balise de succès et balise d'ajout après la subvention.](assets/media/guides/cobble-029-neo1211/cobble-starter-dialogue.png "Entrez la balise de complétion dans la balise de succès et conservez la balise Ajouter après la subvention. Un chemin d'interface graphique de dialogue vide saute le dialogue d'introduction et ouvre les cartes.")

## Changer de cartes, dialogue et audio

| Emplacement | Contrôles |
| --- | --- |
| **Starter settings → Edit Pokémon** | La Pokémon réellement accordée |
| **Card display conditions** | Lorsque le candidat est visible et sélectionnable |
| **Card Selection Audio** | Les espèces pleurent ou un son personnalisé |
| **Dialogue and GUI** | Dialogue d'introduction, chemin d'accès à l'écran et actions de sélection réussies |
| **DRM GUI Maker** | La liste des cartes du joueur, la prévisualisation et la disposition des boutons |

Un chemin vide **Dialogue GUI (optional)** ouvre les cartes directement. Une option activée utilise des choix fixes **Open Selector / Close**. Construisez des branches de forme libre en [DRM dialogue](#core-fabric/dialogue-system), puis connectez son action de démarrage.

L'écran par défaut affiche trois cartes par page. Une session de sélection dure 60 secondes ; interagissez à nouveau si un ancien écran ne peut pas confirmer. L'audio prend en charge le volume 0–4 et le pitch 0.05–4.

**Save to the same file** pour la prochaine interaction; Appliquer à nouveau après avoir changé son chemin. Les profils sont inférieurs à `config/dochi_rpg_maker/cobblemon/starter_selectors/`; la disposition par défaut est `gui/starter_selector_gui.json`. Utilisez **Save As** avant de personnaliser la mise en page et conservez les cartes et les contrôles de confirmation.
