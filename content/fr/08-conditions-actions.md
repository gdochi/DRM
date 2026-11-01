---
title: Conditions et actions
slug: conditions-actions
order: 70
description: Choisissez qui voit un choix de dialogue et ce qui se passe quand ils cliquent dessus.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Créateurs de dialogue
tags:
  - condition
  - action
translationSource: en
translationMethod: assisted
---

## Qui voit le choix, et ce qu'il fait

Ouvrez un nœud de dialogue général **Choices** et sélectionnez un choix. **Label** est le texte de son bouton, **Condition list** contrôle la visibilité et **Choice actions** s'exécute lorsqu'il est cliqué.

« Donner des pommes et enregistrer la réclamation » est une séquence d’action. Une condition seule n'accorde rien; une subvention sans contrôle de réclamation peut être répétée.

## Charger un exemple de récompense sur Forge

Dans la version **DRM 0.3.1 / Forge 1.20.1** testée, choisir Item dans le menu Type a quitté l'action en tant que Goto. Si cela se produit, téléchargez le [Exemple de récompense ponctuelle](#core/dialogue-rewards) et l'ouvrir avec **Load**. Ses actions Item et Tag existantes se chargent correctement. L'application PNJ, l'octroi de la pomme et la dissimulation du choix lors d'une visite répétée ont été vérifiés.

![Les actions Item et Tag sont chargées dans l'éditeur de dialogue Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. Trois pommes sont sélectionnées. La première rangée d'objets octroie trois pommes ; la rangée d'étiquettes suivante enregistre la réclamation. Faites défiler le panneau de droite vers le bas pour voir Compter.")

Vérifiez **Item: give**, **ID: minecraft:apple**, **Count: 3**. Pour modifier le cadeau, modifiez la ligne d'élément existante et **Save As** votre propre ensemble. Appliquez d'abord l'exemple original pour confirmer la subvention de travail avant de modifier ses paramètres.

## Cacher le bouton après avoir réclamé

Ouvrez le **Condition list** de ce choix. L'exemple utilise **Type: tag / Op: not / Tag: welcome_received**, de sorte que le choix n'apparaît que si le joueur n'a pas cette balise.

La deuxième action **Tag** utilise **add / welcome_received** pour enregistrer la revendication. Changez les noms de l'action et de la condition ensemble; différents noms permettent une autre revendication. **a** signifie le contraire : le joueur doit déjà avoir l'étiquette.

Aucune condition signifie que tout le monde passe. À plusieurs conditions, ** et ** les exige toutes ; ** ou ** en exige au moins une. « A un permis et au moins trois émeraudes » utilise et « A l’un ou l’autre de deux permis » utilise ou.

## Où la condition devrait-elle aller?

| Emplacement | Utilisez-le pour |
| --- | --- |
| → Liste des conditions | Afficher ou masquer un bouton dans la même scène |
| Débuter → Itinéraires | Choisissez la première scène quand la conversation commence |
| Conditions générales des nœuds | Restreindre l'entrée dans cette scène |

Utilisez les itinéraires de démarrage pour modifier l'ensemble de la salutation. Utilisez une condition de choix pour masquer uniquement le bouton cadeau. Voir [création de dialogues](#core/dialogue-system) pour les nœuds de début et généraux.

## Actions communes

| Résultat souhaité | Mesures prises | Aussi choisir |
| --- | --- | --- |
| Afficher une autre ligne | Goto | Nœud général de destination |
| Fin de la conversation | Fermer | Pas de valeur supplémentaire |
| Ouvrir une boutique PNJ | Go Shop | Boutique appliquée ou sauvegardée |
| Accorder ou prendre des articles | Poste | donner / prendre / définir, item et compter |
| Enregistrer une demande ou un permis | Étiquette | ajouter et un nom de balise |
| Effacez ce record | Étiquette | supprimer et le même nom de balise |
| Exécuter une commande de serveur | Commande | Commande sans sa direction / |
| Connecter une quête | Action de quête en cours | Utilisez l'opération correspondante dans le guide [quest](#core/quest-system) |

Mettre les subventions et les enregistrements avant les transitions d'écran: **Item → Tag → Goto**. L'exemple Item-and-Tag fourni se ferme après la subvention. Pour montrer une réponse, mettez Goto et sa destination en dernier. Après avoir modifié un type d'action, vérifiez que le type affiché a réellement changé.

**Command** s'exécute dans le contexte du joueur. Utilisez `{player}` pour le nom ou `{uuid}` pour l'UUID. Commencez par l'action intégrée pour des tâches telles que l'octroi d'un seul élément.

## Conditions qui nécessitent un autre mod

Les conditions et les actions FTB nécessitent des quêtes FTB. **faction_score** se réfère à CustomNPCs points de faction, qui diffèrent de DNPC paramètres amicaux/hostiles. **CustomNPCs Stored Data** est un [Intégration de script avancée](#core/script-stored-data-conditions). Utilisez l'exemple ci-dessus pour un cadeau unique normal.

L'intégration CustomNPCs est limitée aux anciennes cibles Minecraft prises en charge ; elle est exclue sur Minecraft 26.3. Consultez la référence [JSON](#core/json-reference) lorsque vous devez éditer des fichiers directement.
