---
title: Connecter les modèles et l'animation de combat
slug: battleworks-animation
order: 240
description: Choisissez des clips compatibles et alignez le timing de la scène, de la timeline et de l'animation.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.7
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Préparer le modèle de l'acteur

Configurez d'abord l'acteur réel : dans DNPC utilisez **Appearance & Model** ; pour un modèle DRM, utilisez **DRM NPC Basic** et ses ressources. **DRM est facultatif**. Sans DRM, BattleWorks utilise le mouvement humanoïde natif et les fournisseurs facultatifs compatibles ; avec DRM installé, DRM garde le contrôle de l'animation.

| Modèle ou méthode | Source adaptée |
| --- | --- |
| Humanoïde normal | Main-Hand Swing ou source compatible Player Animator / PAL |
| Mouvement d'arme Better Combat | Ressources Better Combat compatibles et arme prise en charge |
| Modèle Gecko | Clip réel exposé par le fournisseur et le fichier d'animation |
| Entité modifiée / Behavior DRM | Clips ou correspondances sémantiques de l'intégration DRM |
| Test de géométrie seule | No Animation / None explicite |

Les clips humanoïdes personnalisés peuvent apparaître sous leur propre espace de noms ; ils ne se limitent pas aux identifiants Better Combat. Un clip Gecko et une couche humanoïde ne sont pas interchangeables. CustomNPCs reste une intégration ancienne facultative uniquement avant 26.3.

## 2. Sélectionner un clip dans Hitbox Library

1. Depuis l'action du motif, ouvrez **Edit this hitbox**.
2. Dans **Pattern:** choisissez l'utilisation liée et son étape, par exemple Action.
3. Lisez la description de source au-dessus de **Clips**, puis cherchez par nom ou identifiant.
4. Sélectionnez un clip compatible, appuyez sur Play, vérifiez le contact puis Stop.
5. Ajustez l'événement d'impact au contact et enregistrez/appliquez.

Une sélection sans motif lié est temporaire dans l'aperçu. Choisissez l'utilisation voulue pour enregistrer son animation d'étape. L'aperçu séparé utilise l'apparence copiée du PNJ, les réglages enregistrés ou un acteur par défaut ; rouvrez avec le PNJ réel si le modèle diffère.

![Source, recherche et noms longs dans Hitbox Library.](assets/media/guides/battleworks-017-20261113/animation-clips.png "BattleWorks 0.1.7 / Fabric 1.21.1 / DRM 0.3.2 / DNPC 0.1.4, avec des ressources Better Combat installées. La description passe à la ligne au-dessus de la recherche et le nom long apparaît au survol. Aucun mouvement d'étape compatible n'est affecté dans cette image ; elle ne démontre pas la lecture.")

Les noms longs restent sur une ligne et révèlent leur texte complet au survol. Faites glisser le séparateur modèle/liste pour élargir, ou actualisez après le chargement des ressources.

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

## 7. Diagnostiquer une liste vide ou incompatible

1. Vérifiez le modèle réel et la description de source au-dessus de Clips.
2. Pour Gecko, distinguez géométrie `.geo.json` et animation `.animation.json`, puis vérifiez la ressource liée.
3. Pour les humanoïdes, vérifiez le fournisseur Player Animator / PAL correspondant et les ressources réelles du client. Better Combat n'est nécessaire que pour ses propres mouvements.
4. Actualisez après le chargement asynchrone. Utilisez les clips proposés pour le modèle actuel sans inventer d'identifiants.
5. Avec DRM, vérifiez correspondances et lecture ; sans DRM, testez le mouvement natif avant les clips facultatifs.

Une entrée visible ne prouve pas qu'un modèle incompatible peut la lire. Comparez le PNJ réel après enregistrement et application.

## Modèles instantanés

Un document avec `drmNpcModel` peut restaurer la configuration du modèle lorsqu'il est appliqué. `previewNpcModel` et `previewTexture` sont des données de prévisualisation détachée. Vérifiez les instantanés avant d'appliquer une rencontre importée à un autre modèle.

Enfin, vérifiez que le PNJ réel joue le même mouvement prévu pendant le combat.
