---
title: Battle Presentation Maker Guide fonctionnel
slug: cobblemon-battle-presentation
order: 530
description: Faites une entrée de formateur avec du texte, des images, des modèles et du son.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs de présentation de combat
tags:
  - presentation
  - editor
  - workflow
translationSource: en
translationMethod: assisted
---

## Modifier la scène à un moment précis

Utilisez l'aperçu du milieu avec la chronologie ci-dessous. Il s'agit de l'entrée du formateur par défaut à ** tick 0 **. Utilisez **Play** ou faites glisser la règle jusqu'au moment où son texte, ses modèles et ses effets apparaissent.

![Toile d'entrée par défaut et timeline à 0/144 ticks.](assets/media/guides/cobble-029-neo1211/cobble-presentation.png "0.2.9 / NeoForge 1.21.1. Les calques/catégories sont laissés ; les paramètres pour le calque sélectionné sont corrects. C'est la vue de création, avant la lecture d'exécution.")

## Faire une entrée

1. Ouvrez **Battle Presentation Maker** à partir de la liste des éditeurs DRM et chargez un exemple.
2. Utilisez **Add Label** pour le texte VS et **Add Texture** pour les images.
3. Disposez le texte, les images et les modèles sur la toile.
4. Définissez leurs heures de début / fin sur la timeline et lisez l'aperçu.
5. Utilisez **Save As**.
6. Choisissez le fichier sous le **General → Battle Presentation** du formateur.

La scène se joue avant la bataille. **Duration** est sa longueur; le tour **Battle start delay** est en attente supplémentaire par la suite. **Skippable** Les joueurs l'ignorent.

## Quatre domaines de travail

| Zone | Interaction | Résultat enregistré |
| --- | --- | --- |
| Calques | Ajouter, sélectionner, supprimer et faire glisser les lignes Étiquette, Texture et Couleur | Liste des éléments et ordre Z |
| Toile | Prévisualisez la coche actuelle et sélectionnez ou déplacez directement les éléments et les acteurs | Position de début/fin d'élément ou acteur X/Y |
| Inspecteur | Basculer entre Élément, Modèles, Arrière-plan et Audio | Contenu, transformations, mouvements, acteurs et sons |
| Chronologie | Lecture, pause, redémarrage, frotter et glisser des poignées de plage | Plages actives par élément |

Le modèle de joueur et le modèle d'adversaire sont des lignes d'acteur spéciales qui ne peuvent pas être supprimées. Désactivez `Render Selected Model` pour en cacher un. Le glissement des lignes utilisateur recalcule les valeurs Z afin que la liste, la prévisualisation et le document sauvegardé utilisent le même ordre.

## Limites et coordonnées

| Poste | Plage |
| --- | ---: |
| Durée | 1–600 ticks, jusqu'à 30 secondes |
| Éléments | Jusqu'à 64 |
| Étape par défaut | 960×540 coordonnées logiques |
| Largeur / hauteur de l'élément | 1–3840 / 1–2160 |
| Z | -1000–1000 |
| Texte des étiquettes | Jusqu'à 512 caractères |
| Taille de police | 4–128 |
| Échelle de mouvement | 0.01–20 |
| Rotation de mouvement | -3600–3600 degrés |
| Alpha et opacité de l'image | 0–1 |

L'origine de la scène est en haut à gauche; X augmente à droite et Y augmente vers le bas. Le centre par défaut est X 480, Y 270. La projection d'exécution mappe la scène dans la fenêtre et le contenu des ciseaux à l'extérieur de la fenêtre.

## Actions du fichier

| Mesures prises | Comportement |
| --- | --- |
| `Create New` | Ouvre un modèle sécurisé et le tutoriel guidé. |
| `Reset` | Restaure la présentation de l'entraîneur par défaut ; les modifications non enregistrées sont perdues. |
| `Load` | Passe à un document sous `cobblemon/battle_presentations/`. |
| `Save` | Met à jour le chemin actuel. Un nouveau brouillon tombe à `Save As`. |
| `Save As` | Ecrit un nouveau chemin relatif tel que `custom/gym_intro.json` ; `.json` est ajouté lorsqu'il est omis. |

Le nom est des métadonnées d'affichage à l'intérieur du JSON. Les formateurs font référence au chemin d'accès au fichier `Save As`, pas à la valeur Name.

## Ordre de construction recommandé

1. Définir la durée et skippable.
2. Configurer l'arrière-plan du monde et l'image de scène.
3. Bloquez la composition avec de grandes couches de couleurs.
4. Placez le joueur et les acteurs adverses et choisissez leur ordre Z.
5. Ajoutez du contenu d'étiquette et de texture.
6. Définissez les plages actives et les fondus.
7. Ajoutez du mouvement et de l'assouplissement.
8. Configurez l'audio d'introduction et de combat et jouez la séquence complète.
9. Enregistrez sous `custom/`, puis sélectionnez ce chemin dans Cobblemon Editor.
10. Enregistrez le document de combat ; un PNJ qui suit ce chemin source n'a normalement pas besoin d'être réappliqué.

Organisez la scène en avant-première, puis jouez une bataille pour vérifier les skins réels, les modèles, la taille de la fenêtre et le son.

Le navigateur d'images publie ses résultats et charge les vignettes au besoin, ce qui réduit le coût initial dans les grands packs de ressources.

## Modèles d'équipe et Motion

Choisissez `Actors` → `Player` ou `Opponent` → `Trainer / 1–6`. Chaque côté a six emplacements avec le modèle de rendu indépendant sélectionné, Transform, Pose, et les paramètres de mouvement. Les préréglages normaux masquent les slots d'équipe ; `presets/vs_party_showcase.json` permet un exemple facultatif 6+6.

Les aperçus utilisent l'échantillon Pokémon ; les batailles réelles utilisent l'apparence de l'équipe fournie par le serveur. Les emplacements manquants restent vides. Les emplacements cachés n'exposent pas les espèces, les mouvements, les statistiques ou les objets détenus. Les modèles ne sont pas engendrés dans le monde.

Modifications de mouvement début / fin, durée d'entrée / sortie, décalages, échelle et dérive. Référence JSON : `actors.*.animation.fitToModel` correspond au modèle complet ; `camera` correspond à 64 images clés de position/zoom/rotation basées sur les tiques. Modifiez cette liste dans JSON et vérifiez-la dans le rendu d'aperçu partagé. L'assouplissement pris en charge comprend l'étape, linéaire, ease_in, ease_out et ease_in_out. Le schéma de présentation est 5, avec des documents antérieurs 1 – 4 lisibles.

## Nouveaux presets

| Fichier | Durée à 20 TPS | Objet |
| --- | --- | --- |
| `presets/vs_trainer.json` | 144 ticks / 7.2 s | Entraîneur révéler et nom |
| `presets/vs_pokemon.json` | 132 ticks / 6.6 s | Rencontre sauvage |
| `presets/vs_boss_trainer.json` | 168 ticks / 8.4 s | Entraîneur chef |
| `presets/vs_legendary_pokemon.json` | 184 ticks / 9.2 s | Légendaire Pokémon |
| `presets/vs_party_showcase.json` | 168 ticks / 8.4 s | Facultatif 6+6 révélation de l'équipe |

Les nouveaux préréglages généraux utilisent des arrière-plans plein écran et un ajustement complet du modèle. Traitez les valeurs par défaut comme des modèles et utilisez Save As pour les fichiers personnalisés. Ne pas écraser les scènes utilisateur en gros.

Les effets incluent raster_warp, vs_ribbon, versus_mark, iris_shutter, arena_depth, wild_meadow, wild_grass, rift_sky, ground_shadow, light_sweep et dust_motes. Reliez des scènes à des batailles sauvages ordinaires, RCT ou en JcJ dans [Rendez-vous Présentations ](#drm-cobblemon-editor/cobblemon-encounter-presentations).

## Stades de blocs, FX et planification

Voir [étapes de bloc et FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) pour la création de région/FX dans 0.2.4, et [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) pour le clone, la scène et l'exécution de bataille.
