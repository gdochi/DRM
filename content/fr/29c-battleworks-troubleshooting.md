---
title: Dépannage et contrôles de combat en direct
slug: battleworks-troubleshooting
order: 290
description: Limitez le ciblage, les dégâts, l'animation, les fichiers, les compétences et les échecs de présentation.
product: mob-editor
section: reference
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

## Premières vérifications

1. Vérifiez Minecraft, chargeur et BattleWorks 0.1.7. Vérifiez DRM et les fournisseurs externes seulement si vous utilisez leurs fonctions ; DRM est facultatif.
2. Suivez la [préparation du PNJ](#mob-editor/mob-editor-setup). Utilisez DNPC à partir de 26.3 ; CustomNPCs est exclu.
3. Confirmez que le chemin enregistré est celui associé au PNJ.
4. Séparez création en Créatif et tests en Survie.
5. Commencez par mouvement humanoïde natif et Hitbox avant les modèles ou sorts externes.

La [première attaque](#mob-editor/battleworks-first-attack) conserve de vraies captures de combat en 0.1.6. Les anciens avertissements d'aperçu ne sont pas une restriction actuelle. Diagnostiquez séparément application du fichier, aperçu et combat.

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

## Le PNJ n'attaque jamais

1. Quittez Créatif/Spectateur.
2. Confirmez une cible valide de l'acteur ou activez Scan Without Target dans une zone isolée.
3. Vérifiez portée, FOV et ligne de vue. La recherche de secours est distincte du filtre de relations du PNJ.
4. Vérifiez Enabled, portée, hauteur, santé et phase du motif.
5. Assurez un motif Manager ordinaire admissible ; vérifiez scores, multiplicateurs de répétition et recharges.
6. Vérifiez contrôle des déplacements et limites d'arène.

Comparez un autre PNJ avec le [fichier simple d'exercice](./assets/media/battleworks/training_swordsman.json).

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

## Animations ou attaques se superposent

1. Vérifiez Suppress Native Attacks, l'IA de l'acteur et les autres contrôleurs.
2. Uniquement avec CustomNPCs ancien compatible, vérifiez scripts et Suppress CustomNPC Scripts. Ce n'est pas requis pour DNPC ni 26.3.
3. Évitez des demandes concurrentes d'animation d'étape et de chronologie.
4. Comparez Cast Animation Ticks aux étapes suivantes et vérifiez modèle/fournisseur.

Une même animation peut continuer entre étapes consécutives sans redémarrer.

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

## Recettes, imports et réinitialisation d'arène

| Symptôme | À vérifier |
| --- | --- |
| Modifier une copie change la hitbox originale | Utilisation partagée ; rendez la hitbox indépendante ou utilisez Independent copy |
| My techniques vide sur un autre serveur | La bibliothèque appartient au joueur sur ce serveur |
| Import rejeté | Ressources nécessaires, compatibilité du modèle, références et limites |
| Clips absents ou sans lecture | Ressources réelles, description de source et modèle/fournisseur compatible |
| Boss ramené ou soigné sans intention | Arène appliquée, réinitialisation à la sortie et Restore boss health |
| Avertissement sans impact | Action Hitbox liée, tick de contact et position de la cible |

Utilisez le [parcours de création](#mob-editor/battleworks-authoring), le [guide d'animation](#mob-editor/battleworks-animation) et les [instructions d'arène](#mob-editor/battleworks-encounters) pour tester séparément.
