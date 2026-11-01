---
title: GUI, fichiers et dépannage
slug: minigames-files-gui
order: 1320
description: Séparez les fichiers de règles des mises en page dans le jeu, modifiez-les avec GUI Maker et diagnostiquez les problèmes courants.
product: dochi-minigames
category: Fichiers et opérations
section: operations
status: Guide d'utilisation
version: 0.1.6
audience: Créateurs / opérateurs
translationSource: en
translationMethod: assisted
---

## Stockage

| Données | Chemin |
| --- | --- |
| Règles du jeu | `config/dochi_rpg_maker/minigames/games/<id>.json` |
| GUI d'exécution par défaut | `config/dochi_rpg_maker/gui/minigames/minigames_gui.json` |
| Des scores élevés | `<world>/data/dochi_minigames_scores.json` |

JSON stocke les frais, les limites de temps, les symboles et les récompenses. GUI JSON stocke le tableau du joueur et la mise en page du panneau de score. Les liaisons PNJ persistent dans les données PNJ ; les PNJ utilisant le même identifiant de jeu partagent la configuration de ce jeu.

Roulette par défaut **Spin on block** commence à la machine sans un fichier de mise en page GUI. Les fichiers GUI organisent les jeux sur écran existants et la roulette configurée pour **Game screen**.

## Modifier l'écran en GUI Maker

Utilisez **Open GUI Maker** pour ouvrir la mise en page liée du jeu. Modifiez la position et la taille du tableau et du panneau de score, puis sauvegardez. Pour personnaliser une valeur par défaut séparément, créez une copie avec `Save As` et sélectionnez-la dans **General → GUI JSON**.

![La page générale de l'éditeur de mini-jeux avec GUI JSON, son chercheur et Open GUI Maker ci-dessous.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Minijeux 0.1.5 / NeoForge 1.21.1. Définissez le titre, l'heure et les récompenses dans l'éditeur de jeu ; utilisez Open GUI Maker pour la position et l'apparence du plateau.")

**Game Board → Memory Card Size** accepte 16 – 96px, par défaut 40px. Les grandes cartes rétrécissent les cartes pour s'adapter, et la détection des clics suit la taille affichée. `previewGame` modifie uniquement l'écran d'exemple GUI Maker, pas les règles du jeu.

Un onglet de blocs de valeurs numériques incomplets change et enregistre jusqu'à ce qu'il soit corrigé. La navigation et le redimensionnement des fenêtres permettent de conserver le brouillon, mais ne l'enregistrent pas sur le serveur.

## Dépannage

| Symptôme | Vérifier |
| --- | --- |
| Jeu manquant de Load | Dossier du jeu serveur, schéma, type de jeu pris en charge et erreurs de validation |
| NPC ouvre le jeu immédiatement | Supprimer les mini-jeux directs Appliquer lorsque l'entrée doit se faire uniquement par le dialogue |
| Le démarrage échoue après confirmation | Équilibre, éléments référencés, intégrations optionnelles et message serveur |
| La configuration mémoire ne peut pas enregistrer | Même nombre de cartes et suffisamment de symboles de paire distincts |
| Les changements d'interface graphique n'ont aucun effet | Modifier et sauvegarder l'interface graphique réellement liée à ce jeu |
| Combinaison de récompenses inattendues | Seuils de score et politique `highest`, `cumulative` ou `random` |

Sauvegardez `config/dochi_rpg_maker` et le monde avant de mettre à jour. Utilisez des versions JAR ordinaires sans code de test de développement.

## Référence JSON

Pour les éditeurs externes: le schéma de la règle est `dochi.minigames.v1`, avec des types `monty`, `slots`, `memory`, `whack`, `timing`, `highlow`, `shooting`, `mob_battle` et `roulette`. `guiLayout` est relative à DRMde `gui/` dossier et valeurs par défaut à `minigames/minigames_gui.json`. Les fichiers de règles ne stockent pas les réponses cachées ou les sessions en direct.

## Fichiers autonomes et migration

Les chemins `config/dochi_rpg_maker/minigames/` et `gui/minigames/` restent en usage sans DRM. Les anciens emplacements `dochi_minigames/games/` et `gui/dochi_minigames/` sont des entrées de migration ; sauvegardez-les avant la mise à jour. Les paramètres de l'interface utilisateur du client utilisent `config/dochi_minigames/client.json` ; l'achèvement de la leçon utilise `<world>/data/dochi_minigames/tutorial/<UUID>.json`.
