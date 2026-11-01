---
title: Votre première attaque de mêlée
slug: battleworks-first-attack
order: 225
description: Créez une attaque avec les paramètres exacts, enregistrez-la, appliquez-la et vérifiez le résultat.
product: mob-editor
section: start
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

## Ce que vous allez construire

Un DNPC utilisant un modèle de joueur normal s'approche d'un joueur, se prépare pour environ 1.2 secondes, balaie devant, et récupère. Terminer l'installation [ et la préparation des PNJ](#mob-editor/mob-editor-setup) en premier et ouvrir BattleWorks avec les PNJ de pratique sélectionnés.

Les nouvelles captures ont été vérifiées avec BattleWorks 0.1.6, DRM 0.3.1 et DNPC 0.1.3 le NeoForge 1.21.1. Ces valeurs sont des points de départ d’enseignement. Les modèles Gecko et Modded-Entity ont besoin de leur propre compatibilité [configuration de l'animation](#mob-editor/battleworks-animation).

## 1. Créer le document

1. Sélectionnez **Create New**.
2. Donnez au document un nom reconnaissable et activez-le.
3. Désactiver les modèles non liés tout en faisant cet exercice.
4. Ouvrir **Pattern Build Assist**.

Si vous travaillez sur un patron existant, créez d'abord une copie de pratique distincte avec Save As.

## 2. Répondre aux questions build-assist

| Question | Choix |
| --- | --- |
| Détail Niveau | Débutant |
| Forme d'attaque | Balayage large |
| Attack Tempo | Mesurée |

Choisissez **Beginner → Wide Sweep → Measured**. Chaque réponse passe automatiquement à la question suivante. Inspectez **Review Choices**, revoyez une question si nécessaire, puis appuyez sur **Create Pattern**.

Vérification d'achèvement : un motif et une hitbox réutilisables apparaissent. L'assistant les ajoute sans remplacer les modèles existants.

![Choix d'attaque dans Pattern Build Assist.](assets/media/guides/battleworks-016-neo1211/battleworks-assist.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Commencez par le débutant, puis choisissez le balayage large et mesuré. Retourner à une question pour changer une réponse précédente.")

## 3. Lire le calendrier généré

| Réglage | Valeur | Signification |
| --- | --- | --- |
| Windup Ticks | 24 | Environ 1.2 secondes de préparation |
| Action Ticks | 16 | Environ 0.8 secondes d'action |
| Hitbox Event Tick | 3 | Le contact 3 passe à l'action |
| tiques récupération | 24 | Environ 1.2 secondes de récupération |
| Dégâts Hitbox | 4 | Dégâts avant les défenses |
| Pattern Cooldown | 40 | Reprendre le délai après la fin de ce modèle |
| Action Animation | Main-Hand Swing | Swing normal-humanoïde de base |

Les trois étapes total **64 ticks**, environ 3.2 secondes. Le marqueur de contact est à la coche générale `24 + 3 = 27`. Les retards de réutilisation et post-modèle affectent également le temps entre les attaques.

![Modèle de balayage large généré avec une chronologie 24/16/24-tick.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Comparez Windup, Action, Recovery et le marqueur Hitbox à la coche 27. Cela montre la création de motifs; il ne démontre pas un succès au combat.")

## 4. Réduire la portée après le premier essai

Le générateur commence par Max Range `3.5` et Max Vertical `32`. Vous pouvez d'abord enregistrer, appliquer et tester ces valeurs. Utilisez les ajustements suivants par la suite pour réduire l'attaque d'entraînement.

1. Sélectionnez les paramètres **Core** du nouveau modèle.
2. Définissez la plage minimale `0`, la plage maximale `2.7` et la plage maximale verticale `2.5`.
3. Sous Score, utilisez Distance idéale `2.0`.
4. Sélectionnez son action Hitbox et choisissez **Edit this hitbox**.
5. Confirmez la portée `2.4`, l'épaisseur `0.5` et les dommages `4`.
6. Activez **Locked Target Only** pour le combat d'entraînement.

La plage maximale détermine quand le motif peut commencer. Sweep Reach détermine la portée de la hitbox. L'augmentation de la portée maximale à 10 ne fait pas que l'arme atteigne 10 les blocs.

## 5. Arrêter et faire face au joueur pendant l'attaque

1. Sélectionnez Ventilation, action et récupération à tour de rôle.
2. Activez **Face Target** dans chacun.
3. Activer **Stop Horizontal** et utiliser **Hold** le mouvement.
4. Maintenez la balançoire principale générée sur Action.
5. Utilisez **Simulation** ou Hitbox Library Play pour inspecter la direction et le contact.

Vérifiez les avertissements d'aperçu ou une fenêtre d'aperçu qui ne s'ouvre pas séparément du combat réel. Un modèle visible seul ne vérifie pas son mouvement ou son contact. Confirmez les dégâts réels dans le test de survie ci-dessous.

## 6. Configurer le comportement de combat

Ouvrir **Combat Rules → Combat**.

| Réglage | Valeur |
| --- | --- |
| Supprimer les attaques natives | En |
| Chase Target | En |
| Visage entre les motifs | En |
| Chase Speed Multiplicateur | 1.0 |
| Distance d'approche | 2.0 |
| Scanner sans cible | Pour cet exercice DNPC |

Utilisez Scan Range 16 et FOV 360 dans une arène isolée. L'analyse peut sélectionner d'autres entités vivantes ; gardez les PNJ amicaux et autres créatures hors de ce test. Les anciennes installations CustomNPCs prises en charge peuvent fournir à la place une cible de faction avec un balayage de secours.

Dans **Manager**, fixez **Same Pattern Penalty to 1.0**. Avec un seul motif, une valeur de 0 peut supprimer le seul candidat après sa première utilisation.

## 7. Enregistrer et appliquer

1. Choisissez **Save As**, entrez `training/first_sword.json`, puis confirmez avec **Save** dans le flyout.
2. Avec le PNJ attaché, appuyez sur **Save** pour le lier à ce chemin.
3. Si vous créez sans PNJ, sélectionnez le PNJ pratique avec Core et appliquez le fichier de son catalogue.
4. Fermez l'éditeur.

Vous pouvez également télécharger le [UI-sauvegardé first_sword.json ](./assets/media/battleworks/first_sword.json) dans `config/dochi_rpg_maker/mobs/patterns/training/` et le charger. Ce fichier a été testé en combat avec Scan Range 16, FOV 360 et Same Pattern Penalty 1.0. Il conserve les valeurs d'attaque générées avant les ajustements facultatifs dans la section 4.

## 8. Test dans le monde

1. Passez à Survival et tenez-vous à environ six pâtés de maisons.
2. Confirmez que Scan Without Target est activé et qu'aucune autre entité vivante n'est à proximité.
3. Confirmer l'approche, la préparation, le contact et le rétablissement.
4. Déplacez-vous sur le côté pendant une autre attaque et observez face à face.
5. Éloignez-vous et confirmez la poursuite reprend.

| Échec | Premiers contrôles |
| --- | --- |
| Pas de réaction | Mode survie, cible hostile, Enabled, fichier appliqué correct |
| Aborde mais jamais attaque | Plage, motif Activé, temps de recharge, score de répétition |
| Balançoires sans dommages | Hitbox link, temps d'événement, hauteur, géométrie, dégâts |
| Attaques supplémentaires en dehors du timing | Suppression d'attaques natives et scripts de combat hérités |
| Les dégâts diffèrent de 4 | Armure, cadres invulnérables, effets, autres mods |

![Paramètres de combat après avoir enregistré le fichier et lier au PNJ.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Cochez Sauvé. Avertissements : 0, Balayage sans cible, Plage de balayage 16 et FOV 360. Le fichier serveur est creatures/patterns/training/first_sword.json.")

![Le joueur de survie faisant face au DNPC après avoir reçu des dégâts de balayage large.](assets/media/guides/battleworks-016-neo1211/battleworks-first-fight.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. La santé du serveur du joueur non blindé est passée de 20 à 12. Le apparition naturel et la régénération ont été exclus dans le monde de capture possédé, et la cible PNJ a été vérifiée en tant que ce joueur. Ce total n'est pas les dégâts d'une seule attaque.")

## 9. Changer une valeur à la fois

Tout d'abord changer Windup de 24 à 40, enregistrer/appliquer, et observer les 0.8 secondes supplémentaires. Restaurez-le, puis remplacez Dégâts de 4 par 2. Enfin, déplacez Event Tick de 3 vers 8 et comparez le timing des contacts.

Gardez l'original de travail. Poursuivre avec [espace de travail et la chronologie ](#mob-editor/mob-editor-patterns).
