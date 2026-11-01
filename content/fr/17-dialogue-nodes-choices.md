---
title: Connecter les scènes de dialogue et les réponses
slug: dialogue-nodes-choices
order: 62
description: Connectez la route d'ouverture, les lignes PNJ et les réponses du joueur.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Créateurs de dialogue
translationSource: en
translationMethod: assisted
---

## Connecter un message d'accueil à une réponse

Faites un nœud général pour la salutation et un autre pour sa réponse. Point **départ → Routes** jusqu'à la salutation. Dans le message d’accueil **Choices**, écrivez une réponse et donnez-lui une action **Goto** pointant vers la réponse. Ajoutez une réponse **Close** pour quitter la conversation.

![Blueprint linking start, le salut et la réponse.](assets/media/guides/drm-031-forge1201/dialogue-blueprint.png "DRM 0.3.1 / Forge 1.20.1. start est l'entrée; les nœuds généraux sont des scènes visibles. Les lignes de connexion indiquent où les routes et les réponses mènent.")

L'ensemble [Premier exercice de dialogue](#core/dialogue-system) couvertures Save As, NPC Apply et la navigation de réponse réelle. Sur l'artefact Forge 0.3.1 coché, certaines sélections de type d'action ne parviennent pas à changer le type ; utilisez le chemin de chargement d'exemple testé dans [conditions et actions](#core/conditions-actions).

## Choisissez la scène d'ouverture

Chaque ensemble a ** un nœud de départ **. Ses itinéraires sont vérifiés de haut en bas, et un itinéraire éligible choisit la première scène ou une autre action d'ouverture. Mettez une salutation conditionnelle spécifique au-dessus d'un repli général.

| Partie | Objet |
| --- | --- |
| route de départ | Choisissez où l'interaction commence |
| nœud général | Afficher une ligne PNJ et les réponses du joueur |
| condition de choix | Décider si une réponse est visible |
| action de choix | Décidez ce qui se passe quand vous cliquez dessus |

Les conditions contrôlent la disponibilité; elles n’effectuent pas l’action de la réponse simplement en l’affichant.

## Choisissez ce qu'une réponse fait

| Résultat souhaité | Action de choix |
| --- | --- |
| Montrer une autre scène | Goto |
| Ouvrir une boutique | Go Shop |
| Fini de parler | Fermer |
| Donner une récompense, puis continuer | Actions de récompense suivies par Goto |
| Offre une réponse seulement avant qu'une récompense ne soit réclamée | Une condition d'étiquette plus le [ flux de récompense unique ](#core/dialogue-rewards) |

Utilisez un résultat de navigation d'écran clair par réponse. Plusieurs actions de navigation concurrentes peuvent faire qu'une action antérieure décide du flux.

## Référence du fichier enregistré

Vous pouvez créer cela dans l'éditeur sans écrire ces champs vous-même.

| Objet | Champs utiles |
| --- | --- |
| route de départ | `goto`, `conditions`, `mode`, `actionType`, `linkMode` |
| nœud général | `name`, `type`, `text`, `textTranslationKey`, `conditions`, `choice`, `textFx` |
| choix | `label`, `labelTranslationKey`, `conditionMode`, `conditions`, `actions`, `fx` |

Le nom actuel du tableau est **`choice`**, singulier. `mode` choisit **et / ou ** pour les conditions. Les commutateurs de clé de traduction interprètent le texte comme une clé plutôt que comme une prose littérale.

Pour la taille, les réponses longues et **Pulse highlight**, voir [ le texte de choix et l’emphase ](#core/dialogue-choice-style). Ces paramètres changent la présentation ; écrivez la réponse réelle en **Choices → Label**.
