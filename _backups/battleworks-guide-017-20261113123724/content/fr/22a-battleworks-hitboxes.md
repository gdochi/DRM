---
title: Géométrie Hitbox, dommages et politiques de répétition
slug: battleworks-hitboxes
order: 235
description: Créez une poussée, alignez son centre et distinguez les dégâts partagés des paramètres par action.
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

## Une hitbox est l'espace testé pour les dommages

Une épée ou une animation visible ne crée pas de dégâts BattleWorks à elle seule. Connectez la définition d'une bibliothèque Hitbox à l'action Hitbox d'un motif.

## 1. Ouvre la définition de son action

1. Sélectionnez le modèle et la ligne Hitbox Action-stage.
2. Appuyez sur **Edit this hitbox**.
3. Confirmez son nom et son utilisation.
4. Utilisez **Pattern:** pour choisir l'utilisation appropriée.
5. Retour avec **Edit pattern**.

Les hitboxes non attachées peuvent être prévisualisées, mais le timing d'exécution réel appartient à une action liée.

![Géométrie et timing du balayage large généré Hitbox.](assets/media/guides/battleworks-016-neo1211/battleworks-hitbox-geometry.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Le panneau du modèle est plié en utilisant sa flèche d'en-tête. Les dégâts 4, la portée 2.4 et l’épaisseur 0.5 définissent la hitbox ; le marqueur à la coche 27 définit quand il s’exécute.")

## 2. Choisissez une forme

| Forme | Principaux contrôles | Utilisation typique |
| --- | --- | --- |
| Box | Largeur, hauteur, profondeur | Poussée avant |
| Sphère | Radius | Sursaut environnant |
| Cylindre | Rayon, hauteur | Surface au sol |
| Capsule | Épaisseur, hauteur | Volume vertical arrondi |
| Sweep | Portée, épaisseur, angles, pas de balayage | Barre oblique |
| Polygone | Au moins trois sommets et hauteur | Zone irrégulière |

Sweep Steps échantillonne l'arc; ce n'est pas un nombre de succès. Les points de balayage personnalisés remplacent l'arc généré automatiquement.

## 3. Ajuster la taille avant les décalages

| Réglage | Signification |
| --- | --- |
| Largeur / Hauteur / Profondeur | Dimensions de forme |
| Radius | Rayon ou portée de balayage; un rayon de 2 donne un diamètre de sphère proche 4 |
| Épaisseur | Rayon du tube de balayage ou rayon de la capsule |
| Décalage X | Décalage latéral local; positif est la gauche du PNJ |
| Compensation Y | Déplacement vertical depuis le centre de hitbox PNJ ordinaire |
| Décalage Z | Déplacement local en avant |
| Yaw / Pitch | Rotation horizontale / inclinaison |

La hauteur au centre de la hitbox ordinaire est **NPC feet Y + half NPC height + Offset Y**. Le décalage Y 0 commence déjà autour du centre du corps. Le mettre à 1 déplace un autre bloc vers le haut.

### Construire une poussée

1. Créer une hitbox.
2. Entrez Largeur `0.8`, Hauteur `1.5`, Profondeur `2.8`.
3. Utilisez les décalages X `0`, Y `0`, Z `1.8`.
4. Commencez par Dégâts `4` et Cible verrouillée uniquement.
5. Connectez-le à un événement Action et prévisualisez le volume transféré.
6. Essai devant et sur le côté du PNJ.

Ce sont des valeurs de départ pour un humanoïde normal. Revérifier la géométrie après avoir changé la taille du modèle ou la longueur de l'arme.

## 4. Dégâts partagés et multiplicateur d'action

```text
configured damage = library Damage × action Damage Multiplier
4 × 1.5 = 6
```

Changement de bibliothèque Les dommages modifient toutes les références à cette hitbox. Pour renforcer une seule utilisation, modifiez le multiplicateur de cette action ou créez une autre hitbox.

Il s'agit des dégâts configurés ** avant** l'armure, la résistance, les cadres d'invulnérabilité et d'autres règles de mod. Le Knockback est appliqué après un coup de dégâts réussi.

## 5. Restriction et effets visés

Cible verrouillée Ne restreint les coups à la cible actuelle que lorsqu'elle existe. La désactivation peut inclure des entités vivantes à proximité. Une action peut ajouter cette restriction mais ne peut pas desserrer un vrai paramètre de bibliothèque.

Pour un effet vérifié tel que `minecraft:slowness`, Amplificateur `0` signifie niveau I, et la durée `40` demande environ deux secondes. Zéro dégât peut toujours être utilisé avec effet. Une hitbox zéro dommage peut produire un avertissement.

## 6. Choisissez la politique de répétition

| hitPolicy | Comportement |
| --- | --- |
| illimité | Pas de restriction supplémentaire BattleWorks |
| once_per_pattern | Cette action peut affecter avec succès chaque cible une fois pendant le modèle. |
| once_per_repeat | Chaque occurrence de cette action peut affecter chaque cible |
| cooldown | Appliquer targetCooldownTicks avant que cette action n'affecte à nouveau cette cible |

Seules les applications d'effets/dommages réussies sont mémorisées. La mémoire est **par action**, de sorte que les actions Hitbox séparées restent des tentatives indépendantes. Ces politiques ne suppriment pas l’immunité contre les dommages à la vanille.

Pour une zone persistante, commencez par le temps de recharge et targetCooldownTicks `10`, puis testez les coups réels avant d’augmenter la fréquence de répétition.

## 7. Aligner le contact

1. Choisissez l'utilisation du modèle et la scène d'action de la hitbox.
2. Sélectionnez un clip compatible et jouez à une vitesse d'aperçu plus lente.
3. Trouvez la posture de contact.
4. Retournez au motif et déplacez la case d'événement.
5. Enregistrer/appliquer et tester l'avant, les côtés, l'arrière et différentes hauteurs.

Si trop élevé, cochez Offset Y. Si c'est sur le côté, cochez Offset X et Yaw. Si elle est courte, comparez Offset Z, les dimensions et la plage de démarrage. Continuer avec [animation](#mob-editor/battleworks-animation).
