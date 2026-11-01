---
title: Trouvez votre chemin Dialogue Editor
slug: dialogue-editor-screen
order: 61
description: Trouvez le texte de dialogue, les choix, les connexions et les contrôles d'enregistrement.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Créateurs de dialogue
translationSource: en
translationMethod: assisted
---

## Modifier la ligne qu'un joueur lira

Sélectionnez un nœud général sur la gauche et ouvrez **Text** pour écrire la ligne du PNJ. Ouvrir **Choices** pour les réponses des joueurs. **Blueprint** montre quelle scène chaque réponse s'ouvre. Suivez [ le premier exercice de dialogue](#core/dialogue-system) pour un exemple complet sauvegardé et appliqué.

![Liste des nœuds à gauche et texte PNJ à droite.](assets/media/guides/drm-031-forge1201/dialogue-text.png "DRM 0.3.1 / Forge 1.20.1. Le texte modifie la ligne PNJ du nœud général sélectionné ; les choix modifient les réponses du joueur.")

| Zone | Que faire là |
| --- | --- |
| Liste des nœuds | Sélectionner ou ajouter des scènes telles que `dialogue_1` ; conserver une entrée `start` |
| Info / Texte | Définir l'identité du nœud, le type, l'interface graphique et le texte PNJ |
| Choix | Écrire des réponses et choisir ce que chaque réponse fait |
| Conditions / actions | Limiter la disponibilité ou définir un résultat |
| Blueprint | Inspecter les connexions entre les scènes |

## Barre d'outils contrôles

| Contrôle | Résultat |
| --- | --- |
| Éditeurs | Retour à la sélection de l'éditeur |
| Create New | Lancer un projet de dialogue |
| Charger | Rechercher des ensembles de dialogues enregistrés |
| Enregistrer | Sauvegarder l'ensemble actuel sur son chemin existant |
| Save As | Enregistrer l'ensemble sous un autre nom |
| Réinitialiser | Restaurer l’état par défaut du brouillon |
| Dupliquer | Copiez l'ensemble et sa mise en page Blueprint |
| Fermer | Fermer l'éditeur |

Utilisez **Save As** lors de la personnalisation d'un exemple fourni. Pour réutiliser le dialogue sur plusieurs PNJ, enregistrez un ensemble et sélectionnez-le dans la liste **Dialogue JSON** de chaque PNJ.

## Un ensemble de dialogues est un dossier

Save As `blacksmith` crée un ensemble sous :

```text
config/dochi_rpg_maker/dialogue_sets/blacksmith/
  dialogue_set.json
  start.json
  greeting.json
  quest_done.json
```

`dialogue_set.json` contient l'ensemble, `start` sélectionne la scène d'ouverture et les nœuds généraux contiennent des scènes visibles. **Load / Save / Save As** fonctionne sur l'ensemble, pas seulement sur la ligne sélectionnée.

## Copier des scènes liées ensemble

Sélectionnez des nœuds avec **Shift+Click** ou une sélection par glisser-déplacer, puis **Copy / Ctrl+C**. Lorsque vous collez dans un autre ensemble, cliquez sur son **Dialogue Sets** panneau d'abord, puis **Paste / Ctrl+V**. Les noms en double reçoivent des suffixes ; les liens entre les nœuds copiés et leurs positions Blueprint suivent les nouveaux noms. Les liens vers les nœuds externes restent inchangés.

Faites glisser les lignes de nœud, de route, de choix, de condition et d'action prises en charge pour les réorganiser. Une ligne sélectionnée en bleu est l'élément en cours d'édition ; les cases à cocher marquent les éléments pour les opérations en bloc. **Delete** supprime les éléments cochés, y compris les lignes cochées en dehors de la zone visible.

Créer des produits en [NPC Shop](#core/shop-system), les types d’argent en [Currency Editor](#core/currency-editor), et la mise en page de la fenêtre de dialogue en [GUI Maker](#core/gui-system).
