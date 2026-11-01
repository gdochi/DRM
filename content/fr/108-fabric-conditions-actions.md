---
title: Conditions et actions
slug: conditions-actions
order: 90
description: Types d'état et d'action implémentés utilisés par les nœuds de dialogue, les routes et les choix.
product: core-fabric
category: Systèmes centraux
section: dialogue-editor
status: Stable
version: 0.3.1
audience: Script / créateurs de données
tags:
  - condition
  - action
translationSource: en
translationMethod: assisted
---

## Qui voit un choix, et que se passe-t-il quand ils cliquent ?

**Condition list** contrôle si un choix est visible. **Choice actions** contrôle ce que le clic fait. « N’a pas reçu le cadeau » est une condition; « donner des pommes et enregistrer la réclamation » est une action.

Sélectionnez un nœud général, ouvrez **Choices**, puis sélectionnez le choix sur la gauche. **Label** à droite se trouve le texte du bouton du joueur. Les deux onglets ci-dessous modifient les conditions et les actions séparément.

## Montrez-le seulement avant que le cadeau ne soit réclamé

1. Ouvrez le **Condition list → Add** du choix.
2. Choisissez **Type: tag**.
3. Choisissez **Op: not** et entrez **Tag** `welcome_received`.

![Un choix nécessitant l'absence de welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-choice-condition-tag.png "DRM 0.3.1 / NeoForge 1.21.1. tag / not / welcome_received passe quand l'étiquette est absente. a fait le contraire.")

La condition n'enregistre pas une revendication en soi. Ajoutez la balise ** même grâce à une action de balise ** lors de l'octroi du cadeau. Suivez [récompenses ponctuelles](#core/dialogue-rewards) pour le flux complet.

Pas de conditions signifie que tout le monde passe. Pour plusieurs conditions, **et** exige tout; **ou** exige au moins un. Utilisez et pour « l’étiquette d’autorisation et au moins trois émeraudes », ou pour « l’une ou l’autre des deux étiquettes d’autorisation ».

## Donnez trois pommes au clic

Dans **Choice actions**, changez l'action **Type** en **Item**, puis définissez **Item: give**, **ID: minecraft:apple**, **Count: 3**. Utilisez **+ Action** pour ajouter une autre action. Si l'exemple a déjà Goto, décidez de le remplacer ou de le conserver après la récompense.

![L'élément donner, minecraft:apple et Compter 3 sur un choix.](assets/media/guides/drm-031-neo1211/dialogue-item-reward-editor.png "DRM 0.3.1 / NeoForge 1.21.1. L'étiquette fournit le texte du bouton ; l'action Élément octroie l'élément réel. Faites défiler le panneau de droite pour atteindre Compter.")

Après **Save As → NPC Apply**, cliquer sur ce choix a donné trois pommes dans l'inventaire du serveur. Cet exemple d'élément seulement ferme la fenêtre après avoir accordé les éléments. Pour afficher une réponse par la suite, ajoutez **Goto last and select the destination general node**.

## Choisissez une action commune

| Objectif | Mesures prises | Valeurs à choisir |
| --- | --- | --- |
| Prochaine scène de dialogue | Goto | Nœud général de destination |
| Fin de la conversation | Fermer | Pas de valeurs supplémentaires |
| Ouvrir une boutique PNJ | Go Shop | Bound shop ou fichier de boutique sauvegardé |
| Destinations de voyage ouvertes | Go Teleporter | Ensemble téléporteur enregistré |
| Donner ou prendre des articles | Poste | donner / prendre / définir, item et compter |
| Marquer une réclamation | Étiquette | ajouter et le nom de la balise |
| Supprimer une marque | Étiquette | supprimer et le même nom de balise |
| Exécuter une commande | Commande | Commande serveur sans son leader / |
| Connecter une quête | Action de quête en cours | Suivez les choix actuels dans le guide [quest](#core-fabric/quest-system) |

Disposez les actions dans l'ordre de la liste et mettez **Goto, shop opening or Close last**. Par exemple : Article grant → Tag add → Goto.

## Où la condition devrait-elle aller?

| Emplacement | Objet |
| --- | --- |
| Conditions générales des nœuds | Restreindre l'accès à toute la scène |
| Démarrer les itinéraires | Choisissez la première scène quand l'interaction commence |
| → Liste des conditions | Cacher ou montrer des choix individuels dans une scène |

Pour masquer un bouton, conditionnez ce choix. Pour modifier l'ensemble de la salutation, conditionnez une route de départ menant à un autre nœud général. Voir [Créer une conversation](#core-fabric/dialogue-system).

## Conditions nécessitant un autre mod

Les éléments, les balises et les progrès comparent leurs valeurs correspondantes. Les conditions de quête FTB nécessitent des quêtes FTB. `faction_score` lit CustomNPCs points de faction, non DNPC Amitié ou hostilité.

**CustomNPCs Stored Data** est une connexion avancée aux données écrites par script. L'exemple Tag est suffisant pour un cadeau unique ordinaire. Les conditions CustomNPCs sont limitées aux anciennes cibles Minecraft prises en charge et ne sont pas disponibles sur 26.3.

Utilisez la référence [JSON](#core-fabric/json-reference) uniquement lors de l'édition directe des fichiers.
