---
title: Dépannage et contrôles de combat en direct
slug: battleworks-troubleshooting
order: 290
description: Limitez le ciblage, les dégâts, l'animation, les fichiers, les compétences et les échecs de présentation.
product: mob-editor
section: reference
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


## Premiers contrôles

1. Match Minecraft, chargeur, BattleWorks et DRM fichiers.
2. Suivez [Préparation NPC ](#mob-editor/mob-editor-setup) pour l'exercice actuel DNPC. CustomNPCs est exclu le 26.3 et plus tard.
3. Confirmez que le chemin enregistré est le chemin lié au PNJ.
4. Séparez la création des tests de combat de survie.
5. Vérifiez l'oscillation de bras de base et Hitbox avant d'ajouter des modèles ou des compétences externes.

![Paramètres de combat utilisés pour le test de sauvegarde/application réel.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. Numérisation 16, FOV 360 et Saved. Avertissements: 0 ont été vérifiés avant de vérifier la perte de santé de survie. Traitez les avertissements d'enregistrement et d'aperçu du modèle séparément.")

Dans cette combinaison, la balançoire de base a causé des dommages réels, tandis que des avertissements de modèle/animation de prévisualisation et une fenêtre de simulation qui ne s'est pas ouverte ont également été observés. Comparez les [Fichier de première attaque vérifié](#mob-editor/battleworks-first-attack) et combat réel avant d'abandonner la liaison PNJ en raison d'un problème de prévisualisation.

## Le fichier est absent de la liste

1. Vérifiez le dossier config/dochi_rpg_maker/mobs/patterns du serveur.
2. Vérifiez l'extension .json.
3. Vérifiez le schéma de dochie.battleworks.v1.
4. Exclure les fichiers de géométrie/animation et les dossiers de ressources.
5. Analysez en tant que JSON strict.
6. Rafraîchir la charge / Appliquer.

Les fichiers de particules utilisent des particules et dochi.particles.v1 à la place.

## Le PNJ utilise toujours l'ancien comportement

1. Vérifiez si vous n'avez utilisé que Save As.
2. Enregistrez avec le PNJ attaché, ou appliquez le nouveau fichier à travers son catalogue.
3. Après les modifications externes, réappliquez ou redémarrez le serveur.
4. Vérifiez les fichiers portant le même nom dans les sous-dossiers.
5. Inspectez tous les paramètres de modèle enregistrés qui ont été appliqués.

Utilisez des fichiers séparés lorsque les PNJ ont besoin d'un comportement indépendant.

## Les PNJ n'attaquent jamais

1. Quittez le mode Créatif/Spectateur.
2. Confirmez CustomNPCs le ciblage hostile.
3. Si vous utilisez une analyse de secours, vérifiez la portée, le champ de vision et la vue.
4. Élargir temporairement la gamme de modèles, la hauteur, la phase et les conditions de santé pour isoler l'échec.
5. Assurez-vous qu'il existe au moins un modèle de gestionnaire ordinaire.
6. Vérifiez le score de base et zéro multiplicateurs de répétition.
7. Vérifiez la propriété et les temps de recharge des mouvements longs.

Comparer un PNJ séparé en utilisant le [fichier pratique simple](./assets/media/battleworks/training_swordsman.json).

## Le PNJ s'arrête avant d'atteindre son attaque

Comparez la distance d'approche, la portée maximale du motif, les dimensions/décalages de la hitbox, l'allocation de hauteur et l'emplacement de la cible au contact. Vérifiez si le mouvement de préparation repousse le PNJ.

La portée de départ et la géométrie réelle de la hitbox sont séparées.

## L'animation joue mais les dégâts ne sont pas

1. Testez le combat réel, pas la simulation.
2. Vérifiez qu'une Hitbox ou des dégâts réels L'action de compétence est connectée.
3. Vérifiez les événements et répétez les limites.
4. Vérifier Les dégâts, le multiplicateur et les chances ne sont pas nuls.
5. Inspectez la hauteur de la hitbox, les décalages et les rotations.
6. Vérifiez la restriction de cible.
7. Vérifiez l'armure, les effets, l'invulnérabilité et la politique de frappe.

Plusieurs hitboxes à une tique ne garantissent pas de simples dégâts cumulés.

## Animation ou les attaques se chevauchent

1. Cochez Supprimer les attaques natives.
2. Vérifiez les scripts de combat CustomNPC existants.
3. Supprimez les scripts CustomNPC le cas échéant.
4. Évitez les demandes concurrentes d'animation de scène et de chronologie.
5. Comparez Cast Animation Ticks avec les étapes ultérieures.
6. Vérifiez la compatibilité fournisseur/modèle.

Ne pas redémarrer une animation correspondante sur des étapes consécutives est attendu.

## Une compétence échoue

Choisissez un véritable ID de catalogue, vérifiez les fournisseurs / dépendances des deux côtés, et vérifiez la cible, la portée, la ligne de visée et le temps de recharge du fournisseur. Supprimez les options non prises en charge et testez une distribution simple. Lire La compétence Battleworks a échoué.

## Les combos, les phases ou les passifs se comportent différemment

| Symptôme | Vérifier |
| --- | --- |
| Combo ne démarre pas | Max Combo, existence de destination, conditions, temps de recharge |
| Un mouvement domine | Priorité, étage de sélection, admissibilité |
| La phase reste élevée après la guérison | Attente de verrouillage pendant le combat |
| L'annonce de transition se répète habituellement | Son score manager et ses bonus |
| Attentes passives de base | Les réactions en file d'attente pour une ouverture |
| Le déclencheur de santé ne se répète pas | Une fois par combat et re-traversant le seuil |
| La réaction disparaît | Skip, file d'attente expirée, conditions de démarrage échouées |
| Les champs Posture/Riposte n'ont aucun effet | Paramètres de document réservés et non connectés |

## Les particules sont absentes ou excessives

1. Lire le fichier dans Particle Maker.
2. Vérifiez les options de particules requises.
3. Essayez `/drm particle play training_ring ~ ~ ~` sans l'extension.
4. Vérifier que particleFile existe.
5. Vérifier que les origines de la cible/position enregistrée ont des données valides.
6. Vérifiez que vous ne redémarrez pas un effet long à chaque tick.
7. Réduire les échantillons, le nombre, la fréquence et les effets simultanés.

## BGM ou dialogue manquant

Vérifiez le volume de créature hostile pour le volume ordinaire de son et de musique pour BGM. Vérifiez le son enregistré et la ressource client. Confirmez un destinataire de joueur, utilisez temporairement 100% chances, et inspectez les références réelles de popup/GUI/commande.

La propriété BGM d'un autre PNJ ou les titres / popups qui se chevauchent peuvent également modifier le résultat visible.

## Messages log utiles

| Message | Signification |
| --- | --- |
| Battleworks JSON est indisponible | Impossible de charger le fichier de combat référencé |
| enregistrer rejeté | Le serveur a refusé la sauvegarde ; lisez la raison |
| La compétence Battleworks a échoué | L'exécution du fournisseur a échoué |
| Mouvement de cible Battleworks rejeté | Les contrôles de cible ou de destination ont échoué |
| La particule JSON rejetée | Le fichier de particules référencé n'a pas pu charger/valider |

## Enregistrer une matrice de test finale

Testez les différences de proximité/moyenne/longue portée, avant/côtés/arrière, murs/escaliers/hauteur, chaque phase, chaque phase passive, chaque mort, chaque perte de cible et un autre combat. Rouvrir les fichiers pour vérifier la persistance.

Pour un rapport de problème utile, incluez les versions mod, les étapes de reproduction, les fichiers de combat et référencés, le comportement attendu / réel, le dernier.log et tout rapport de plantage. Supprimez les jetons privés ou les données personnelles avant de partager les journaux.
