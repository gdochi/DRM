---
title: Stat Builder et éditeur d'éléments
slug: stat-item-systems
order: 110
description: Ensembles de statistiques personnalisés, coûts d'allocation, éléments de base de données, exigences, bonus, attributs et mise à l'échelle.
product: core
category: Statistiques et articles
section: stat-item
status: Stable
version: 0.3.1
audience: Créateurs de systèmes RPG
tags:
  - stats
  - items
translationSource: en
translationMethod: assisted
---

## Stat Builder

Créez des statistiques dans lesquelles les joueurs peuvent investir. Commencez par **Add**, nommez une statistique et définissez sa valeur minimale, maximale et par défaut. Choisissez le coût d'investissement **Provider** à droite : niveaux d'XP, une monnaie DRM ou un objet.

Connectez **Attribute** et **Base effect / Per point** pour modifier la santé réelle, l'attaque ou un autre attribut. Enregistrez, utilisez **Set Active**, puis ouvrez **Y** pour vérifier le coût et le résultat de l'allocation.

Les fournisseurs d’investissement sont Minecraft des niveaux d’XP, une monnaie DRM ou un objet. La progression des coûts utilise les paramètres de base, pas à pas et multiplicateur.

L'écran d'allocation des joueurs s'ouvre avec `Y` par défaut. `Allow Y key allocation UI` contrôle si l'ensemble actif peut être ouvert à partir du keybind. L'action de dialogue `Go Stat Builder` ouvre le même écran dans le jeu, quel que soit le paramètre keybind-only.

Le `default_stat_gui.json` groupé utilise une large liste déroulante sur la gauche et sépare la valeur, le coût, la description et augmente les contrôles sur la droite. Modifier une copie en GUI Maker.

![Stat Builder avec force, coût des points et effets d'attributs.](assets/media/guides/drm-031-forge1201/registry-stat_builder.png "DRM 0.3.1 / Forge 1.20.1. Choisissez la statistique à gauche, ses limites au milieu et les coûts / effets à droite. Attribut : Non sélectionné signifie qu'aucun effet d'attribut n'est encore connecté.")

## Éditeur

Choisissez la base **Item template** en premier. Définissez son nom et sa description, utilisez **Stat Rules** pour les exigences et les bonus équipés, et **Vanilla Attribute** pour les effets d'attribut. **Save As** votre fichier, puis utilisez **Give Test Item** pour inspecter le résultat.

Une définition d'élément peut configurer :

- transporteur / catégorie, modèle d'article, nom, rareté, feuille, taille de la pile, durabilité et traditions;
- les stats attribuées requises;
- bonus de stat équipés;
- les modificateurs d'attribut vanilla/modded et les emplacements d'équipement;
- la mise à l'échelle des statistiques par point;
- l'ordre et la visibilité des sections d'infobulles.

![Définition de l'élément avec des lignes d'infobulle, des règles statistiques et des onglets Attributs vanille.](assets/media/guides/drm-031-forge1201/registry-item_editor.png "DRM 0.3.1 / Forge 1.20.1. Le modèle d'élément n'est actuellement pas sélectionné. Choisissez l'élément de base, configurez son nom, ses effets et ses exigences, enregistrez, puis utilisez Donner l'élément de test.")

## Exigences Pénalité

Les exigences n'utilisent que des valeurs allouées, de sorte que le bonus d'un article ne peut pas satisfaire à ses exigences. Un joueur peut toujours détenir, équiper et attaquer avec un objet en vertu de l'exigence.

`Unmet penalty %` est le pourcentage retiré de la contribution de l'élément :

| Pénalité | Contributions non acquittées |
| --- | --- |
| `0` | 100% |
| `25` | 75% |
| `100` | 0% |

Le multiplicateur affecte les bonus de statistiques équipés, les modificateurs d'attribut configurés et les modificateurs de mise à l'échelle des statistiques. Il ne supprime ni ne remplace le comportement de base de l'élément de modèle à moins que ce comportement ne soit représenté par un modificateur configuré.

:::tip Essais
Sauvegardez la définition avant d'utiliser `Give Test Item`. Survolez l'aperçu ou l'élément de test pour vérifier l'infobulle générée, puis testez à la fois un joueur qualifié et un joueur non qualifié.
:::

## Écrans de statistiques PNJ et infobulles sur les articles en 0.1.5

Dans l'écran d'application de PNJ, connectez un fichier **Stat Builder** au PNJ. Interagir avec ce PNJ ouvre alors l'écran d'allocation des statistiques du joueur en utilisant l'ensemble connecté.

Utilisez **Visual → Tooltip Maker** pour concevoir la façon dont les informations sur les éléments sont présentées. Voir le guide **Tooltip Maker** pour les aperçus d'articles, les vues d'équipement et le défilement de l'infobulle. Le retrait de l'équipement qui ne fait que réduire la santé maximale ne joue plus l'effet blessé.

## Ensembles d'équipement et liens d'infobulle

Forge L'éditeur d'élément permet à un élément de sélectionner un `setId` et un modèle d'infobulle. Les ensembles d'équipement sont en direct en `items/sets/` et définissent les nombres de pièces équipées requises, les bonus de statistiques et les modificateurs d'attributs par niveau. Modèles d'infobulles réutilisables en direct dans `items/tooltip_templates/`.

Conservez l'élément individuel, l'ensemble d'équipement partagé et le modèle de présentation en tant que documents distincts. Vérifiez leurs références de stat-set et testez les bonus/tooltips tout en changeant les pièces équipées. Cette caractéristique Forge n'est pas une revendication de mise en œuvre identique sur d'autres chargeurs.

## Déplacer les fichiers enregistrés

| Sommaire | Emplacement |
| --- | --- |
| Ensembles de statistiques / ensemble actif | `config/dochi_rpg_maker/stats/sets/` / `stats/active_set.json` |
| Définitions | `config/dochi_rpg_maker/items/definitions/` |
| Paramètres de catégories, raretés et infobulles partagées | `config/dochi_rpg_maker/items/editor_settings.json` |
