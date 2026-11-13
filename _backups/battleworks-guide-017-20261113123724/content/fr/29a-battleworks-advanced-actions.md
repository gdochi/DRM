---
title: Positions, projectiles, convocations et conditions enregistrés
slug: battleworks-advanced-actions
order: 276
description: Créez des attaques retardées et gérez les entités groupées et l'état de rencontre.
product: mob-editor
section: combat
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

## Ajouter une fonctionnalité avancée à la fois

Commencez après que le boss [ deux-phases ](#mob-editor/battleworks-encounters) fonctionne. Gardez un bon dossier connu. Choisissez une action à travers sa catégorie de but, puis modifiez ses propriétés et ses modificateurs.

Les clés JSON ci-dessous sont des documents de référence pour la création directe.

## 1. Attaquer la position antérieure du joueur

1. Créer une hitbox cylindre avec ID warning_blast, rayon 2.4, hauteur 3, dommages 4.
2. Créer un modèle avec Windup 40, Action 10, Récupération 20.
3. Ajoutez **Save World Position** à la case Windup 0.
4. Définissez l'ID de position blast_spot, la cible source, le mode exact.
5. À Windup tick 1, ajouter **Particle Shape**.
6. Utiliser la position enregistrée, ID de position blast_spot.
7. Utilisez Anneau, Rayon 2.4, Échantillons 24, Particules minecraft:end_rod. Gardez les répétitions dans Windup.
8. Ajouter **Hitbox At Position** à la case Action 0.
9. Lien warning_blast et blast_spot.
10. Utilisez une animation scénique compatible ou une absence explicite.

Résultat attendu: s'éloigner après le début de l'avertissement laisse le coup à l'emplacement précédent. Les hitbox en position sauvegardée utilisent l'ancre comme centre; vérifiez la hauteur au lieu de supposer que les décalages de centre de corps PNJ ordinaires s'appliquent de la même manière.

![Sauvegardez la position mondiale avec l'ID de position enregistré, la cible et l'exact.](assets/media/guides/battleworks-016-neo1211/battleworks-save-position.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Ajouté par + Action → Invocations / Positions → Enregistrer la position mondiale. Changez l'ID initial principal en blast_spot et utilisez le même ID dans les actions ultérieures.")

## 2. Gérer les noms de poste

| Mesures prises | Objet |
| --- | --- |
| save_position | Lanceur d'enregistrement/position cible |
| hitbox_at_position | Exécuter une hitbox à une ancre |
| move_to_position | Déplacer le lanceur/cible vers une ancre |
| clear_position | Supprimer une ou toutes les ancres |

Enregistrer le même nom le met à jour. Garder l'ordre de conservation/utilisation/clair délibéré. Les ancres sont rencontre-local et clair sur la réinitialisation de combat; la limite actuelle est 32.

Random Ring et Random Box choisissent des emplacements aléatoires. Fouille à proximité des hauteurs pour un espace chargé, en bordure, sans collision; il ne garantit pas un bloc de soutien au sol. Destinations d'essai dans le monde.

## 3. Commencez avec un projectile géré

1. Ajouter **Spawn Projectile / Construct**.
2. Commencez avec l'ID de base de l'éditeur minecraft:snowball.
3. Définissez l'ID du groupe training_shots et le nombre 1.
4. Utilisez Spawn à Caster et la cible de direction.
5. Essayez Vitesse 0.5, Dommages 2, Durée de vie 60 ticks.
6. Vérifiez la création, le voyage, l'impact et le nettoyage avant d'augmenter le nombre.

| Terrain | Signification |
| --- | --- |
| ID du groupe | Nom utilisé par les actions de libération/suppression ultérieures |
| Ventilateur / Radial | Disposition des directions |
| Point / Ligne / Anneau / Arc / Grille | Placement de la spawn |
| Hold Ticks | Retard avant le lancement automatique |
| Tiques à vie | Durée de vie maximale |
| Hit Radius | Rayon de collision géré |
| Trail Particle | ID de sentier enregistré |

Toutes les entités mod enregistrées ne prennent pas en charge la création générique. Utilisez d'abord une véritable intégration de compétences pour les sorts externes complexes.

![Boule de neige par défaut dans Spawn Projectile / Construct.](assets/media/guides/battleworks-016-neo1211/battleworks-projectile.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Ajouté par + Action → Compétences / Projectiles. Cet exemple est placé dans Windup; sélectionnez Action avant de l'ajouter si c'est l'étape de tir prévue.")

## 4. Libérer un groupe détenu

1. training_shots avec des tiques d'attente 40.
2. Ajouter **Release Projectiles** 20 ticks plus tard.
3. Utilisez le même identifiant de groupe.
4. Ajouter **Remove Projectiles** lorsque les entités restantes doivent être supprimées.

Choisissez entre le lancement automatique et une version explicite antérieure. Les limites sont 64 par action et 128 les projectiles gérés en direct par lanceur. Commence petit.

Les éléments visuels utilisés pour les constructions ne sont pas un butin de ramassage. Configurez le butin séparément en CustomNPCs.

## 5. Invoquer un clone CustomNPC

1. Sauvegardez un vrai clone avec les outils CustomNPCs.
2. Enregistrez son onglet et son nom exacts.
3. Ajoutez **Summon Clone** à ces valeurs.
4. Utilisez les gardes d'ID de groupe et comptez 1.
5. Configurez l'emplacement d'apparition et la durée de vie.
6. Optionnellement, connectez un fichier Battlework enfant existant.
7. Ajoutez **Dismiss Summons** pour les gardes et testez le nettoyage.

Un nom de clone n'est pas un identifiant d'entité arbitraire. Le clone et le fichier enfant optionnel doivent exister sur le serveur. Les fichiers enfants utilisent des chemins relatifs aux créatures/motifs.

Les invocations sont gérées par les parents et peuvent hériter de la cible. Les limites sont 32 par action et 64 convocations en direct par parent. Examiner les fichiers enfants pour éviter les chaînes d'invocation incontrôlées.

## 6. Gate événements ultérieurs avec des conditions

Les conditions peuvent inspecter la santé, la phase, les comptes, les positions, l'état et les résultats d'action. Plusieurs conditions sont combinées avec AND.

Pour un événement **tableau des conditions**, ceci vérifie que l'ancre existe :

```json
[
  {
    "type": "position_exists",
    "key": "blast_spot",
    "operator": "eq",
    "value": 1
  }
]
```

C'est un fragment, pas un fichier complet. L'existence de la position est une vérification booléenne ; l'opérateur/valeur s'applique principalement aux conditions de comparaison numérique.

| Type | Objet |
| --- | --- |
| boss_health / target_health | Comparaison du ratio santé |
| missing_boss_health | Ratio santé-manque |
| summon_count / projectile_count | Nombre dans le groupe nommé par la clé |
| position_exists | Ancrage de l'existence |
| état | Comparer un numéro de rencontre stocké |
| action_succeeded / action_failed | Inspecter un résultat d'action nommé |
| skill_available | Disponibilité du fournisseur, non garantie de succès |
| target_distance / target_vertical | Distance ou hauteur |
| phase / on_ground / aléatoire | Phase, mise à la terre ou chance |

Les opérateurs numériques sont eq, neq, gt, gte, lt et lte. Santé 50 % est 0.5. Negate inverse le résultat.

## 7. Numéros d'état et attributs PNJ optionnels

**Set State** prend en charge les options Définir, Ajouter, Multiplier, Aléatoire et Effacer. Il peut suivre les frais pour un déménagement ultérieur. Il s'agit d'un état de rencontre, pas de données de joueur permanentes ou de données stockées CustomNPCs.

Advanced `npcStats.enabled` peut appliquer la santé maximale, la vitesse de déplacement, les vitesses spécifiques à la phase, la plage de suivi et la régénération de ralenti / combat. Il est désactivé par défaut. Les valeurs de santé/vitesse/gamme zéro n'appliquent pas de nouvelle valeur d'attribut ; la régénération zéro n'ajoute aucune guérison automatique.

Le premier exercice prépare les statistiques de base en CustomNPCs. Inspectez npcStats lorsqu'un boss importé change de façon inattendue d'état ou de vitesse.

## 8. Autres mesures de statut et de contrôle

Guérir restaure le lanceur. Appliquer l'effet Cibles auto ou Cible avec un effet enregistré. Ignite met le feu à une cible. Lancer et Tether contrôler le mouvement de la cible; Annuler la compétence et Annuler Tether arrêter leurs activités correspondantes.

Shield Punish peut demander le temps de recharge ou la destruction pour le cas d'utilisation du bouclier de vanille pris en charge. Ce n'est pas l'option générique parry. Testez le destinataire, la probabilité et les répétitions sur une configuration de pratique.

Après chaque ajout, utilisez la séquence [troubleshooting](#mob-editor/battleworks-troubleshooting).
