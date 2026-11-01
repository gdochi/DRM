---
title: Factions et popups
slug: factions-popups
order: 120
description: CustomNPCs présentation de faction et popups réutilisables à l'écran.
product: core-fabric
category: Le monde et les outils PNJ
section: world-tools
status: Stable
version: 0.3.1
audience: Créateurs de monde et de PNJ
tags:
  - faction
  - popup
translationSource: en
translationMethod: assisted
---

## Modifier les noms et couleurs des états de faction

**Faction Editor** contrôle la façon dont les factions prises en charge CustomNPCs apparaissent dans DRM. CustomNPCs possède les identifiants de faction et les scores des joueurs. Configuration DNPC des groupes séparés dans la [DNPC éditeur](#dochi-npc-core/npc-core-editor). Ces captures montrent **DRM 0.3.1 / NeoForge 1.21.1**.

![Statuts et points d'échantillonnage en Faction Editor.](assets/media/guides/drm-031-neo1211/faction-editor.png "Sélectionnez Inamical, Neutre ou Amical et modifiez son nom, sa couleur et la description de sa relation. Exemple de points 850 teste l'affichage; il n'accorde pas de réputation à un joueur.")

1. Sélectionnez une relation sous **Statuses**.
2. Placez **Display name / Color / Relationship description** à droite.
3. Changez **Sample points** pour inspecter le résultat à différents scores.
4. Vérifiez que les factions d'origine sont disponibles en **Manage Factions**.
5. Utilisez **Presentation** pour l'ordre, les catégories et les icônes; utilisez **Runtime Screen** pour l'interface du lecteur.
6. Enregistrez et inspectez la liste des joueurs avec la touche **J** par défaut.

La présentation est stockée en `config/dochi_rpg_maker/factions/settings.json`. Pour les scores incorrects, vérifiez la faction d'origine et le comportement d'attribution des scores avant de modifier la présentation. Ce flux de travail CustomNPCs ne s'applique pas à [ Minecraft 26.3 et aux versions ultérieures ](#core-fabric/minecraft-26-3).

## Enregistrer une popup et l'afficher dans le monde

Cet exemple affiche brièvement **Village Gate**. La détection de région a besoin d'un déclencheur séparé ; cet exercice affiche la fenêtre contextuelle enregistrée avec une commande.

![Popup Maker enregistré en tant que village_entry avec le titre Village Gate.](assets/media/guides/drm-031-neo1211/popup-village-save.png "Vérifiez ID sur la gauche et Saved: village_entry .json en bas. Le panneau du milieu inférieur est l'aperçu de l'éditeur. Fade In 10 / Hold 80 / Fade Out 20 ticks donne un total de 5.5 secondes à vitesse normale.")

1. Ouvrez **Popup Maker** à partir du noyau et fixez **ID** à `village_entry`.
2. Entrez `Village Gate` dans **Title** et votre description dans **Text**. Ajoutez un **Subtitle** si nécessaire.
3. Fixer **Fade In / Hold / Fade Out**. A vitesse normale, les ticks 20 sont d'une seconde.
4. Choisir **Channel** et **Conflict** pour les notices qui se chevauchent. L'exemple `replace` remplace l'avis précédent dans ce canal.
5. En option, sélectionnez **Opening Sound** et écoutez avec le bouton Lecture.
6. Choisissez **Save As → village_entry → Save As** pour enregistrer votre propre copie.
7. Fermez l'éditeur et exécutez cette commande en tant que lecteur avec l'autorisation de gestion :

```mcfunction
/drm popup show @s village_entry
```

![La fenêtre popup Village Gate sauvegardée s'affiche dans le jeu réel.](assets/media/guides/drm-031-neo1211/popup-village-runtime.png "Montré avec /drm popup show village_entry en utilisant la définition enregistrée ci-dessus. Cela ne le lie pas automatiquement à une région ou à un PNJ.")

Modifier le texte, le moment et le canal en **Popup Maker**. Changez de position, de fond et d'illustration en [GUI Maker](#core-fabric/gui-system)'s Popup GUI. Attribuez une mise en page copiée dans le champ **GUI JSON** de la fenêtre contextuelle.

| Fichier à transférer | Emplacement |
| --- | --- |
| Texte, timing et canal | `config/dochi_rpg_maker/popups/definitions/village_entry.json` |
| Disposition de l'écran | L'interface graphique assignée sous `config/dochi_rpg_maker/gui/` |
| Affichage opérationnel et limites de durée | `config/dochi_rpg_maker/popups/policies/` |

Si rien n'apparaît, vérifiez l'ID enregistré, le fichier activé et l'interface graphique. Si les avis sont en file d'attente ou se remplacent, consultez Conflit pour le même canal et les limites actives/en file d'attente de la stratégie.
