---
title: Compétences, sons, dialogues et musique de combat
slug: battleworks-skills-effects
order: 247
description: Connectez les compétences réelles du catalogue et ajoutez une présentation sans modifier le timing des dégâts.
product: mob-editor
section: effects
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

## 1. Choisir une compétence réelle

1. Installez le fournisseur et les dépendances sur le serveur et les clients.
2. Sélectionnez l'étape d'action d'un motif et appuyez sur ** + Compétence**.
3. Filtrer par mod, rechercher par nom ou ID, et choisir une compétence répertoriée.
4. Définissez son événement sur la case prévue.
5. Gardez les chances d'événement et d'action à 100.
6. Commencez avec un faible niveau de compétence et testez un lancer.

Une action contient une compétence. Taper une identification inventée ne la crée pas. Des actifs supplémentaires du fournisseur doivent également exister.

## 2. Diagnostiquer un casting rejeté

| Vérifier | Pourquoi ça compte |
| --- | --- |
| Prestataire et identité réelle | La compétence doit être disponible |
| Cible, portée, ligne de visée | L'action a besoin d'une situation de casting valide |
| Refroidissement du fournisseur | Séparé de BattleWorks |
| Compatibilité avec Caster | Tous les sorts de joueur ne prennent pas en charge le DNPC ou ancien PNJ choisi comme lanceur |
| Options prises en charge | Différentes compétences acceptent différents paramètres |

La simulation ne lance pas de vrais sorts externes. Tester dans le monde et inspecter les messages `Battleworks skill failed`.

## 3. Ajuster les dégâts au bon endroit

| Attaque | Contrôle des dommages |
| --- | --- |
| Hitbox | Dégâts partagés × par action |
| DRM Compétence | Niveau de compétence et options soutenues par le fournisseur |
| Certaines compétences intégrées | Les options de dommages directs exposées par l'éditeur |
| Projectile géré | Sa propre action Dommages |

Un `damageMultiplier` générique copié dans les paramètres de compétence n'est pas un multiplicateur de sort universel pris en charge.

## 4. Ajouter le moulage répété

1. Conservez une copie unique de travail.
2. Ajouter un autre événement ou un calendrier répétitif intentionnel.
3. Laissez suffisamment de temps pour le propre refroidissement du fournisseur.
4. Utilisez des actions de compétence distinctes lorsque chaque distribution a besoin d'une animation de distribution différente.
5. Match Cast Animation ticks à la durée prévue.

Le cast motion est demandé sur les casts réussis. Aucun mouvement ne peut indiquer une compétence rejetée, pas un mauvais ID d'animation.

## 5. Ajouter un son d'attaque

1. Ajoutez du son à l'événement à succès ou à son propre événement.
2. Utilisez Sélectionner pour choisir un son enregistré.
3. Prévisualisation avec Play / Stop.
4. Commencez le volume et la hauteur à 1.0.
5. Enregistrer/appliquer et écouter pendant le combat.

`minecraft:entity.player.attack.sweep` est un exemple simple. Utilisez un `namespace:path` ID sonore enregistré, pas un nom de fichier OGG. Les actions ordinaires jouent au PNJ à travers la catégorie créature hostile.

## 6. Ajouter un avertissement de titre court

1. Ajouter un titre à Windup tick 0.
2. Entrez un titre court et un sous-titre.
3. Choisissez la cible actuelle ou les joueurs proches comme Audience.
4. Définissez Radius lorsque vous utilisez des destinataires proches.
5. Commencez par Fade In 5, Stay 20, Fade Out 5.
6. Vérifiez la lisibilité et le chevauchement sur l'écran du joueur réel.

Les titres fréquents de plusieurs PNJ peuvent s'écraser les uns les autres.

## 7. Commandes et DRM popups

Ouvrir **Command → Edit command / arguments**. Vérifiez d'abord le timing avec:

```text
say BattleWorks timing test
```

N'utilisez pas de barre oblique dans l'action Commande. Choisissez PNJ ou cible comme exécuteur.

| Token | Remplacement |
| --- | --- |
| `@npc` | Texte PNJ UUID |
| `@target` / `{target}` | Texte UUID cible actuel |
| `{player}` | Nom du joueur cible |
| `{uuid}` | UUID du joueur cible |

Les tokens npc/target sont des chaînes de caractères remplacées, pas des sélecteurs de vanille. Les jetons de joueur nécessitent une cible de joueur.

Créez et testez d'abord la définition du popup et l'interface graphique en DRM. Ensuite, utilisez la fin de la commande et le nom réel du popup. Ne supposez pas que combatv1.json d'une autre distribution existe localement.

Les actions de commande s'exécutent avec l'autorisation de commande élevée. Vérifiez le destinataire et répétez le comptage. Une popup a normalement besoin d'une invocation ; sa définition peut fournir un son de départ.

## 8. Garder les dégâts fiables et dialoguer occasionnellement

Utilisez l'événement 100, la case à cocher 100%, le son 100% et la commande de dialogue 20%. Réduire la chance de l'événement entier permettrait également d'éviter les dégâts.

## 9. Configurer BGM

1. Ouvrir **Combat Rules → BGM**.
2. Activez-le et sélectionnez une piste enregistrée.
3. Commencez par le volume 0.7 et la hauteur 1.0.
4. Prévisualiser et enregistrer/appliquer.
5. Laissez un joueur de Survie devenir la cible du PNJ.
6. Vérifiez l'arrêt sur la perte de cible ou la mort de PNJ.

BGM boucles pour la cible du joueur **courant**, pas tous les joueurs dans un rayon. Lorsque plusieurs PNJ ciblent le même joueur, le propriétaire le plus récemment acquis gagne.

Le volume **Music** du joueur doit être audible. Les ressources audio personnalisées doivent exister sur chaque client destinataire. La suppression de la musique Vanilla utilise la préférence musicale indépendante Disable vanilla.

Ajoutez un casting, puis un son, un titre, un popup et un BGM dans cet ordre. Continuer avec [Fabricant de particules ](#mob-editor/battleworks-particles).

![Règles de combat → Paramètres BGM.](assets/media/guides/battleworks-016-neo1211/battleworks-bgm.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Enable BGM est désactivé et Sound ID est vide ici. Sélectionnez le son, activez BGM et ajustez le volume et la hauteur. Cela montre la configuration, pas un résultat de lecture de musique vérifié.")

## Prévisualisations visuelles pour les compétences supportées

Simulation, bibliothèque Hitbox et tutoriels partagent l'aperçu des compétences. Les projectiles pris en charge, les effets de zone, les invocations, les particules et certains effets soutenus peuvent être visualisés sur l'horloge de l'éditeur. Pause et rembobinage pour comparer le timing et le placement.

Il ne s'agit pas d'une exécution de sort de serveur. Les dégâts, la destruction du terrain, la recherche du chemin, les statistiques de combat réelles et les effets de jeu complets de la troisième équipe nécessitent toujours des tests de combat en direct. Une compétence répertoriée ne garantit pas un adaptateur visuel. Distinguer les mods manquants, les fournisseurs non enregistrés, les visuels non pris en charge et les échecs de rendu natif ; un effet non pris en charge n'est pas remplacé silencieusement par un autre sort.
