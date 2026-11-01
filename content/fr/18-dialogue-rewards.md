---
title: Donner une récompense une fois
slug: dialogue-rewards
order: 71
description: Accordez des articles, enregistrez la réclamation et cachez un choix lors de la prochaine visite.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guide
version: 0.3.1
audience: Créateurs de dialogue
tags:
  - dialogue
  - reward
translationSource: en
translationMethod: assisted
---

## Donnez trois pommes une fois par joueur

Commencez par [ une courte conversation ](#core/dialogue-system), puis ouvrez un nœud général **Choices**. Cet exemple accorde trois pommes, enregistre la réclamation avec la balise de joueur `welcome_received` et cache le bouton cadeau lors de la prochaine visite.

Les écrans et le résultat ci-dessous ont été vérifiés avec **DRM 0.3.1 / NeoForge 1.21.1**. Le choix est nommé **Receive three apples**, utilisez votre propre formulation si vous préférez.

## Forge : commencez par l'exemple enregistré

**[Téléchargez l'exemple de récompense unique](assets/media/dialogue/welcome_reward_once.zip)**

Dans la version **DRM 0.3.1 / Forge 1.20.1** testée, choisir Item pour une nouvelle action l'a laissé comme Goto. Utilisez cet exemple enregistré et modifiez ses valeurs existantes au lieu de suivre les étapes de création d'actions NeoForge ci-dessous.

1. Extrayez le dossier `welcome_reward_once` entier dans le jeu ou le serveur `config/dochi_rpg_maker/dialogue_sets/`. Le chemin résultant doit être `dialogue_sets/welcome_reward_once/dialogue_set.json`. Préservez tout travail existant avec ce nom en premier.
2. Ouvrir **Dialogue Editor → Load → welcome_reward_once → Load**.
3. Choisissez ** dialogue_1 → Choix → Recevez trois pommes → Choice actions **. Modifiez l'élément et le nombre de lignes de l'élément existant, ou testez l'exemple inchangé en premier.
4. **Save As** votre propre nom, puis suivez « Enregistrer, appliquer et visiter à nouveau » ci-dessous. Modifiez une balise de réclamation à la fois dans la condition et dans l’action Tag.

![welcome_reward_once sélectionné en Forge Load Dialogue Set.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-load.png "DRM 0.3.1 / Forge 1.20.1. Placez le dossier extrait complet sous dialogue_sets, puis sélectionnez-le ici. Si manquant, recherchez un dossier imbriqué supplémentaire.")

![L'attribution d'objet chargé et l'enregistrement de balise en Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. L'action Item existante est donnée / minecraft:apple / 3. L'application de cet ensemble à un PNJ a produit trois pommes et l'étiquette de réclamation sur le serveur.")

Le téléchargement contient le dossier complet enregistré par l'éditeur NeoForge. Le chargement, l'application, la revendication et la révision ont également été vérifiés sur Forge. Les étapes de nouvelle-action ci-dessous montrent NeoForge.

## 1. Ajouter l'élément grant

1. Sélectionnez le choix du cadeau et entrez **Label: Receive three apples**.
2. Ouvrir **Choice actions**. Remplacez l'exemple Goto ou utilisez ** + Action** pour ajouter une ligne.
3. Choisissez **Type: Item → Item: give**.
4. Fixation **ID: minecraft:apple**, **Count: 3**. Faites défiler le panneau de droite vers le bas si Count est en dehors de la zone visible.

## 2. Enregistrer la réclamation

Utilisez ** + Action ** sur le même choix. La nouvelle ligne est définie sur **Type: Tag**, **Op: add**, **Tag: welcome_received**. La liste est **Item → Tag**.

![Une subvention d'objet suivie de l'action de balise welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. La première action accorde trois pommes; la seconde enregistre la réclamation sur le joueur. Correspond exactement au nom de la balise dans la condition suivante.")

Cet exemple à deux actions se termine après l'octroi du cadeau. Pour afficher une réponse par la suite, créez un nœud général et ajoutez **Goto → that node last**, après l'enregistrement d'octroi et de revendication.

## 3. Cacher le choix après avoir réclamé

Sur le même choix, ouvrez **Condition list → Add** et fixez **Type: tag**, **Op: not**, **Tag: welcome_received**.

![Une étiquette ne nécessitant pas de balise welcome_received.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-condition.png "DRM 0.3.1 / NeoForge 1.21.1. Ce choix a 2 actions / 1 conditions. La condition contrôle la visibilité ; elle n’accorde rien elle-même.")

**a** Il faut que le tag soit présent. Utilisez **not** ici donc seul un joueur qui n'a pas réclamé le cadeau voit le bouton.

## 4. Enregistrer, appliquer et visiter à nouveau

1. **Save As** `welcome_reward_once`.
2. Cliquez avec le bouton droit sur le PNJ avec DRM Core, sélectionnez celui défini sous **Dialogue JSON**, puis **Apply Dialogue**.
3. Videz les deux mains et parlez au PNJ à proximité.
4. Cliquez sur le choix du cadeau et vérifiez la présence de trois pommes dans votre inventaire.
5. Parlez à nouveau et vérifiez que le choix du cadeau a disparu.

![Seul Adieu reste lorsque le dialogue est rouvert après le don.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-hidden.png "DRM 0.3.1 / NeoForge 1.21.1. Après confirmation de trois pommes et de la balise welcome_received sur le serveur, l'interaction a été répétée. Le choix du cadeau était caché et Au revoir restait.")

Le tag appartient au joueur. Si plusieurs PNJ utilisent la même balise, la revendication de l'un cache également ce cadeau sur les autres. Utilisez des noms distincts tels que `gate_guard_gift` et `innkeeper_gift` pour les cadeaux indépendants, correspondant à chaque action et condition.

![Il ne reste que Goodbye après avoir réclamé le cadeau importé sur Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-hidden.png "DRM 0.3.1 / Forge 1.20.1. Il s'agit d'une deuxième conversation après le chargement de l'ensemble fourni, en l'appliquant au PNJ, en cliquant sur le cadeau et en vérifiant la concession du serveur et la balise de réclamation.")

## Testez à nouveau le cadeau

Avec l'autorisation de l'administrateur, retirez votre étiquette de réclamation et parlez à nouveau :

```text
/tag @s remove welcome_received
```

Cela ne reprend pas les pommes déjà reçues. Vérifiez les quantités d'inventaire séparément lors de tests répétés.

## Continuer dans une boutique ou une quête

Préparez les prix et le stock en [NPC Shop](#core/shop-system), puis connectez-vous **Go Shop**. Utilisez les actions en cours dans le guide [quest](#core/quest-system) pour l'acceptation des quêtes et les objectifs. Voir [conditions et actions](#core/conditions-actions) pour les nœuds, les routes et la visibilité de choix.
