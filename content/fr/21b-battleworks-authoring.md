---
title: Édition simple, recettes et techniques réutilisables
slug: battleworks-authoring
order: 227
description: Créez une attaque par recette, ajustez ses valeurs et réutilisez une technique indépendante.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Débutants et créateurs de combats
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Commencer par une recette

Ouvrez BattleWorks avec la [baguette ou commande d'éditeur](#mob-editor/mob-editor-setup). Dans **Pattern Workbench**, choisissez **Attack recipes**, puis une attaque de départ.

| Recette | Comportement initial |
| --- | --- |
| Wide sweep | Balayage de mêlée avec avertissement au sol lié et mouvement natif |
| Charge and slash | Approcher pendant la préparation, s'arrêter puis frapper |
| Delayed ground strike | Enregistrer la position de la cible, avertir à cet endroit puis frapper la position enregistrée |
| Retreat and counter | Reculer pendant la préparation puis contre-attaquer vers l'avant |

Les recettes ajoutent des motifs et ressources modifiables. Elles n'installent aucun sort ni modèle externe. Une animation incompatible avec le modèle est omise ; choisissez un clip adapté à l'acteur. L'attaque retardée frappe la position enregistrée : le joueur peut l'éviter en se déplaçant.

## 2. Ajuster l'attaque dans Simple edit

Sélectionnez le nouveau motif et **Simple edit**. Réglez nom, Enabled, Min/Max Range, Windup, Action, Recovery et Cooldown. Les champs de temps affichent aussi les secondes : à vitesse normale du serveur, 20 ticks font une seconde.

Choisissez une hitbox liée pour ajuster dégâts et dimensions courantes. Si les dégâts viennent d'une autre action, utilisez **Detailed edit** pour celle-ci. Changer de vue conserve conditions, événements, mouvement et animation ; la vue simple ne remplace pas le document par un fichier simplifié.

Vérifiez **Shared by … patterns** avant de modifier dégâts ou dimensions. Utilisez **Make this hitbox independent** pour ne modifier que ce motif. Vérifiez géométrie complète et tick de contact dans [Hitbox Library](#mob-editor/battleworks-hitboxes).

## 3. Enregistrer une technique pour un autre document

1. Sélectionnez l'attaque et choisissez **Save technique**.
2. Ouvrez un autre document de combat sur le même serveur avec le même joueur.
3. Ouvrez **My techniques**, sélectionnez une entrée, puis **Load technique**.
4. Vérifiez motifs, destinations de combo, hitboxes et particules importés avant d'enregistrer.

La bibliothèque appartient à votre joueur sur ce serveur. L'import crée des identifiants indépendants et reconnecte les références du paquet. Les fichiers de particules référencés peuvent être inclus ; mods, modèles, sons et fournisseurs de compétences externes restent nécessaires sur la destination. Un import incompatible rejeté laisse le document intact.

## 4. Choisir le partage d'une copie

| Choix de Copy technique | Résultat |
| --- | --- |
| Independent copy | Copie attaque, motifs de combo liés, hitboxes et effets de particules avec de nouveaux identifiants |
| Share existing resources | Copie seulement le motif sélectionné ; les ressources liées restent partagées |

Utilisez une copie indépendante pour une variante avec des dégâts ou particules différents. Partagez si plusieurs mouvements doivent garder une définition commune. Modifier une ressource partagée affecte tous les motifs qui l'utilisent ; changer uniquement son nom ne la sépare pas.

## 5. Annuler, enregistrer et appliquer

**Undo / Redo** restaure les modifications du document et l'état de chargement des fichiers. Les flèches Back/Forward parcourent l'historique de l'éditeur. Annuler n'efface pas une entrée déjà enregistrée dans la bibliothèque du serveur.

Utilisez **Save As** pour un nouveau chemin. Avec le PNJ voulu associé, appuyez ensuite sur **Save** pour le lier, ou appliquez le fichier depuis son catalogue. Consultez [les fichiers et le stockage de bibliothèque](#mob-editor/battleworks-files).

Utilisez Simulation pour observer mouvement et hitbox, puis testez un vrai combat en Survie. Un avertissement visuel seul ne cause aucun dégât. Configurez [les avertissements liés](#mob-editor/battleworks-hitboxes) et [la réinitialisation d'arène](#mob-editor/battleworks-encounters) avant de tester le boss complet.
