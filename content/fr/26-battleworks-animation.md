---
title: Connecter les modèles et l'animation de combat
slug: battleworks-animation
order: 240
description: Choisissez des clips compatibles et alignez le timing de la scène, de la timeline et de l'animation.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.6
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Préparer le modèle dans NPC Basic

BattleWorks utilise les API de modèle et de lecture DRM. Configurez d'abord la géométrie, les textures, les ressources d'animation et les mappages sémantiques en **DRM NPC Basic**.

| Modèle ou méthode | Source appropriée |
| --- | --- |
| humanoïde normal | Main-Hand Swing ou fournisseur de mouvement humanoïde installé |
| DRM Modèle Gecko | Un vrai clip du fichier d'animation de ce modèle |
| DRM Entité modifiée | Clips natifs exposés par son intégration DRM |
| DRM Comportement | Un mappage sémantique configuré tel que l'attaque |
| Essai de géométrie seulement | Aucune animation / Aucun |

Un clip Gecko et un calque de pose humanoïde Better Combat ne sont pas interchangeables.

![Scène d'action Animation + Hitbox paramètres avec main_hand.](assets/media/guides/battleworks-016-neo1211/battleworks-stage-animation.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Build Assist généré Vanilla Swing / main_hand à la vitesse 1. Choisissez l'animation ouvre les clips; Modifier cette hitbox ouvre la détection de hit.")

Pour les DNPC ordinaires, préparer l'apparence dans le **DNPC editor → Appearance & Model**. Trouver la cartographie des étapes à travers la timeline **Action → Stage → Animation + Hitbox**. Les instructions de base du PNJ s'appliquent aux paramètres du modèle DRM.

## 2. Sélectionner un clip dans Hitbox Library

1. Ouvrez **Edit this hitbox** depuis l'action.
2. Choisissez l'utilisation sous **Pattern:**.
3. Sélectionnez Action dans la barre d'outils du modèle.
4. Recherchez **Clips** et sélectionnez un clip réel.
5. Appuyez sur Lecture, inspectez le contact, puis arrêtez.
6. Modifiez la tique d'événement du modèle pour correspondre au contact.

Pattern sélectionne une utilisation ; Clips sélectionne une animation. Un aperçu détaché peut utiliser un modèle enregistré ou un mannequin par défaut. Réouvrez avec le PNJ réel si le modèle de prévisualisation ne correspond pas.

## 3. Trois lieux d'animation

| Emplacement | Objet |
| --- | --- |
| Scène Animation | Lancer un mapping sur scène |
| Timeline Animation action | Lancer un mouvement spécifique lors d'un événement |
| Skill Cast Animation | Demander une motion sur chaque cast réussi |

Commencez avec une animation de scène. Une animation de scène configurée a préséance sur les actions d'animation ordinaires à l'intérieur de cette étape. Pour programmer plusieurs mouvements explicites, définissez intentionnellement l'animation sur None en premier.

## 4. Changements d'étapes en 0.1.5

- Les étapes consécutives utilisant le même mappage partagent une durée de lecture continue.
- Une cartographie d'étape différente peut commencer dès l'entrée en scène.
- La récupération peut attendre pendant qu'une animation d'action / diffusion créée possède toujours son temps de lecture spécifié.
- La durée de l'action et les tiques d'animation utilisent leurs durées d'auteur au lieu d'être étendues à l'ensemble du motif restant.
- Les contrôles de hitbox répétés ne redémarre pas l'animation de la scène.

N'appliquez pas l'ancienne 0.1.2 limitation « une animation de premier niveau pour l'ensemble du motif » à cette version.

## 5. Réglez la vitesse et le contact séparément

1. Commencez avec Animation Speed 1.0.
2. Faites correspondre l'événement à la posture de contact.
3. Augmentez légèrement la vitesse d'animation uniquement lorsque nécessaire.
4. Vérifiez à nouveau le contact et la longueur de la scène après l'avoir modifié.
5. Enregistrez/appliquez et comparez les combats réels.

La vitesse d'aperçu contrôle l'observation. La vitesse d'animation est enregistrée et affecte le mouvement réel. La recherche arbitraire de trame n'est pas garantie pour chaque clip Gecko ; inspectez également la lecture et le redémarrage normaux.

## 6. Préserver une sélection intentionnelle None

Ce qui suit est un objet d'animation **stage**, pas un fichier de combat complet :

```json
{
  "explicitSelection": true,
  "provider": "none",
  "id": "",
  "playback": "once",
  "speed": 1.0,
  "fadeTicks": 0
}
```

Sans un choix explicite, les anciennes étapes hitbox-only peuvent migrer vers le swing de base.

## 7. Diagnostiquer une liste de clip vide

1. Vérifiez le fournisseur de modèle de PNJ Basic.
2. Distinguer la géométrie `.geo.json` de l'animation `.animation.json`.
3. Confirmez que le modèle fait référence à l'élément d'animation prévu.
4. Vérifiez les fournisseurs optionnels et les ressources client.
5. Rafraîchir après le chargement des ressources asynchrones.
6. Vérifiez que DRM expose réellement le clip natif nécessaire.

Utilisez la liste des PNJ actuels au lieu d'inventer des identifiants.

## Modèles instantanés

Un document avec `drmNpcModel` peut restaurer la configuration du modèle lorsqu'il est appliqué. `previewNpcModel` et `previewTexture` sont des données de prévisualisation détachée. Vérifiez les instantanés avant d'appliquer une rencontre importée à un autre modèle.

Enfin, vérifiez que le PNJ réel joue le même mouvement prévu pendant le combat.
