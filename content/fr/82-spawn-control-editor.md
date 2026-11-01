---
title: Spawn Control Éditeur
slug: dochi-spawn-control-editor
order: 830
description: Utilisez la barre supérieure, le catalogue cible, l'aperçu, le gestionnaire de règles, l'inspecteur, les filtres et les actions en masse.
product: dochi-spawn-control
category: Editeur
section: editor
status: Projet
version: 0.1.4
audience: Créateurs de Spawn-rule
tags:
  - editor
  - profiles
  - filters
translationSource: en
translationMethod: assisted
---

Cette page décrit les profils **naturel-spawn**. Pour les géniteurs placés, utilisez le [Guide de l'éditeur de pions](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-Fawn `Spawn Chance (0-1)` est séparé des chances relatives dans une liste de cibles de géniteurs.

## Ce que cet écran est

Spawn Control est un éditeur ** de création ** pour la configuration active de natural-spawn du serveur. Ce n'est pas un écran de jeu orienté joueur. Les modifications restent dans le brouillon actuel jusqu'à ce que vous ayez terminé `Save` ou une opération prédéfinie.

![Spawn Control avec le catalogue d'entités / clones à gauche, un aperçu de la cible et des règles de spawn naturelles au milieu, et l'inspecteur de règles à droite.](assets/media/guides/spawn-control-014-neo1211/catalog.png "Spawn Control 0.1.4 le NeoForge 1.21.1. Sélectionnez une cible, ajoutez une règle avec Add Rule, puis modifiez ses conditions d'apparition sur la droite.")

Trouvez la créature dans le champ de recherche de gauche. **Selected Target** indique ses règles; **All Configured** comprend d'autres cibles. Si le panneau de droite indique « Aucune règle n’est sélectionnée », sélectionnez une règle au milieu.

## Barre supérieure

| Mesures prises | Comportement |
| --- | --- |
| `Editors` | Retournez au sélecteur de l'éditeur partagé DRM lorsque DRM Core est disponible. |
| `Create New` | Démarrez un brouillon vide sans modifier encore la configuration active du serveur. |
| `Load` | Recherchez et chargez un ensemble complet ou un préréglage cible. |
| `Save` | Stockez le brouillon comme configuration active du serveur et appliquez-le immédiatement. |
| `Save As` | Choisissez Ensemble complet ou Préréglage de la cible actuelle avant de nommer le fichier. |
| `Reset` | Restaurer la ligne de base reçue lors de l'ouverture ou de la dernière mise à jour de l'éditeur après l'enregistrement. |
| `Close` | Fermez l'éditeur. Les modifications non enregistrées ne sont pas appliquées. |

## À gauche : Entité / Clone Catalog

Le catalogue choisit la cible pour les nouvelles règles.

- Rechercher des créatures enregistrées et des modèles de PNJ sauvegardés pris en charge ensemble. Voir [ les PNJ enregistrés](#dochi-spawn-control/spawn-control-npc-templates) pour DNPC modèles.
- Recherche par ID, nom d'affichage ou nom de mod.
- Utilisation `mod:<id>` ou `support:<state>` requêtes.
- Combinez la source entité/clone, l'état de prise en charge et les filtres de modification installés.
- Prévisualisez la cible sélectionnée dans le panneau du milieu.
- Utilisez l'action `Native: ON/OFF` pour une entité enregistrée. Cela ne s'applique pas aux clones.

Les projectiles, effets, véhicules et autres EntityTypes non-créatures sont exclus. Des boss spéciaux peuvent apparaître avec le statut de support expérimental.

## Milieu : aperçu et règles de spawn naturelles

La section supérieure prévisualise la cible de catalogue sélectionnée. La section inférieure gère les règles configurées.

| Vue | Signification |
| --- | --- |
| `Selected Target` | Afficher uniquement les règles qui appartiennent à la cible actuelle du catalogue. C'est la valeur par défaut. |
| `All Configured` | Afficher les règles pour chaque cible dans une vue de gestion. |

La sélection d'un corps de règle en `All Configured` sélectionne ce profil et déplace le catalogue vers sa cible réelle. Il ne copie ni n'hérite de la règle dans l'entité précédemment prévisualisée.

Chaque partie d'une ligne de règle a une action distincte.

| Zone des rangées | Mesures prises |
| --- | --- |
| Case à cocher gauche | Sélectionnez des règles pour dupliquer, activer, désactiver ou supprimer en masse |
| Corps de la rangée | Sélectionnez le profil affiché dans l'inspecteur |
| Interrupteur droit | Basculer l'état activé d'un profil |

`Add Rule` crée toujours un profil pour la cible actuelle du catalogue. Les actions groupées n'affectent que les règles vérifiées. Delete a une étape de confirmation et reste un changement de brouillon jusqu'à l'enregistrement.

## Rechercher, filtrer et trier

La recherche de règles couvre les noms, les identifiants de profil, les clés cibles, les EntityTypes, les tab/name clone et les erreurs de validation. Les listes déroulantes d'état, de clé de tri et de direction ci-dessous fournissent :

- état : Tout, Activé, Désactivé ou Erreur
- clé de tri : Priorité, Nom ou Cible
- direction : ascendante ou descendante

Une règle cachée par la recherche ou le filtrage n'a pas été supprimée. Si une cible a des règles mais que le résultat est vide, effacez d'abord le filtre de requête et d'état.

## Droite : Inspecteur des règles

L'inspecteur modifie le profil sélectionné sous Identité, Conditions mondiales, Taux de apparition et groupe, Capsules de population et Cycle de vie.

Dimensions et Biomes utilisent des cueilleurs multi-sélectionnables. Aucune sélection ne signifie sans restriction. Les plages numériques utilisent des champs séparés ; les plages inversées peuvent être normalisées dans un ordre sûr pendant la sauvegarde.

L'étiquette EntityType ou clone sous l'inspecteur est la cible réelle ** appartenant à la règle sélectionnée**. S'il diffère de l'aperçu, vérifiez si vous avez sélectionné intentionnellement une règle différente dans `All Configured`.

## Diagnostics avancés

| Mesures prises | Impact mondial |
| --- | --- |
| `Check Here` | Évaluer les conditions et les plafonds à l'emplacement actuel sans créer d'entité |
| `Spawn One` | Créer une entité réelle gérée après confirmation |
| `Clear Generated` | Supprimer les entités générées actuellement suivies par ce mod |

Les diagnostics soumettent le brouillon actuel pour une évaluation temporaire côté serveur sans remplacer au préalable le fichier de configuration actif.

Les filtres de règles modifient la présentation de la liste sans enregistrer le document. Échapper ou un clic externe annule une liste déroulante ouverte sans activer les contrôles d'arrière-plan. Les panneaux étroits enveloppent les commandes sur la ligne suivante.
