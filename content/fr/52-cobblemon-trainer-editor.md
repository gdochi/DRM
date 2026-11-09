---
title: Choisissez des équipes, des rondes, des dialogues et des récompenses
slug: cobblemon-trainer-editor
order: 520
description: Construisez une équipe d'entraîneurs et choisissez ce qui se passe avant et après la bataille.
product: drm-cobblemon-editor
category: Cobblemon Éditeur
section: trainer
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Cobblemon Création de PNJ de combat
tags:
  - trainer
  - editor
  - party
translationSource: en
translationMethod: assisted
---

## Commencer par un Pokémon

Sélectionnez un Pokémon dans la liste du milieu **Pokemon Party** pour le modifier sur la droite. Les écrans utilisent l'interface utilisateur anglaise de **Cobblemon Editor 0.2.9, DRM 0.3.1 et Cobblemon 1.8.4 sur NeoForge 1.21.1**.

![Niveau 5 Bulbasaur sélectionné, avec les paramètres de base sur la droite.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Gauche : catégories. Milieu : l’équipe et le modèle du tour actuel. A droite : le Pokémon sélectionné.")

1. Utilisez **Add**. Les entraîneurs prennent en charge jusqu'à six Pokémon par tour; Pokémon lui-même en utilise un.
2. Cliquez sur le nom de l'espèce sous **Basic → Pokemon** pour choisir une espèce. Le bouton d'exemple indique **Bulbasaur**.
3. Sélectionnez **Level**, puis choisissez pris en charge **Form / Aspects**, **Nature** et **Ability**.
4. Choisissez un **Held Item**. Les potions utilisées par le formateur font partie de la liste séparée **Battle Item Inventory** ci-dessous.
5. **Save As** votre propre fichier, puis appliquez-le à un PNJ. Voir [la première bataille](#drm-cobblemon-editor/cobblemon-editor-setup) pour les étapes de liaison.

![Sélecteur d'espèces ouvert à partir du bouton Bulbasaur, avec recherche, Filtres et pages.](assets/media/guides/cobble-029-neo1211/cobble-pokemon-picker.png "Recherchez par nom ou rétrécissez le catalogue avec des filtres; vous n'avez pas besoin de mémoriser les identifiants d'espèces.")

## Définir les stats et les mouvements

**Stats** affiche les valeurs calculées au niveau de l'auteur. Utilisez **Edit IV / EV** pour changer les IV et les EV. Les IV aléatoires ou nature produisent une plage possible plutôt qu'une seule valeur fixe.

![Le niveau 5 varie avec IV Random et EV 0/510.](assets/media/guides/cobble-029-neo1211/cobble-stats.png "L'ajustement au niveau de la bataille et d'autres règles de combat peuvent changer les valeurs utilisées pendant une bataille.")

| Réglage | Plage |
| --- | --- |
| Niveau | 1–100 |
| Déménage | Jusqu'à 4 |
| IVs | 0–31 par statistique |
| VE | 0–252 par stat; 510 total |

En **Moves**, utilisez le bouton Parcourir de chaque emplacement pour sélectionner un mouvement. Faites glisser un mouvement assigné pour le réorganiser. Les emplacements vides utilisent les règles existantes du jeu de mouvements ; quatre étiquettes None ne signifient pas que Pokémon ne peut pas utiliser de mouvements.

![Quatre emplacements de déplacement avec des boutons de sélection individuels.](assets/media/guides/cobble-029-neo1211/cobble-moves.png "Set se déplace ici lorsque l'entraîneur a besoin d'un moveset particulier. Les mouvements d’apprentissage de l’espèce apparaissent d’abord dans le sélecteur.")

Utilisez **Generate Party** pour une équipe construite à partir de filtres. Continuez jusqu'à [AI, génération d'équipe et mécanique](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) pour plus de contrôle.

## Connecter les déclencheurs, les rondes et les dialogues

Choisissez **Battle Config** sur la gauche pour passer aux paramètres de combat.

![Paramètres généraux de combat indiquant la bataille des Dresseurs, le type de combat, la source du nom et la présentation.](assets/media/guides/cobble-029-neo1211/cobble-config.png "Généralités : identité et type. Encounter : Déclencheurs. Rounds: configuration ronde. Dialogue : conversation pré-bataille. Après les actions : ce qui suit un résultat.")

1. Sous **General**, activez **Trainer Battle** et choisissez **Battle type**. **Name source → Trainer Profile** utilise ici **Trainer Name** ; **Applied NPC Name** utilise le nom du PNJ appliqué.
2. Dans **Encounter**, choisissez l'interaction ou la détection de joueur à proximité. Voir [rencontres et revanches](#drm-cobblemon-editor/cobblemon-encounters-rematches) pour les conditions et les périodes d'attente.
3. Dans **Rounds**, utilisez **Add / Duplicate** jusqu'à 16 tours. Chacun peut avoir sa propre équipe, ses règles, ses conditions, son dialogue et ses récompenses. Les progrès existants suivent un ordre rond, alors examinez les changements avant de réorganiser un entraîneur opérationnel. Appliquer à nouveau n'efface pas les records de victoires.
4. Dans **Dialogue**, sélectionnez le dialogue du round en cours et mettez **go_battle** sur son choix de combat. Sans un ensemble de dialogues, la confirmation de combat normale est utilisée.
5. Choisissez une entrée en **General → Battle presentation**. Réglez Singles/Doubles et les ajustements de niveau en [règles de combat](#drm-cobblemon-editor/cobblemon-battle-rules).

![Règles actuelles, IA, gimmicks et paramètres de match.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "Les contrôles ronds sont Add / Duplicate. Cliquez sur la valeur actuelle à côté de la compétence IA sur la droite pour ouvrir les paramètres de stratégie.")

### Voir le dialogue lancer un combat

Une fois le dresseur et le dialogue de la manche appliqués, interagissez avec le PNJ et choisissez **Let's battle!**. Ce choix exécute **go_battle**, joue l'introduction configurée et ouvre l'écran de combat Cobblemon. La vidéo montre le parcours du joueur après la configuration dans l'éditeur.

![Parlez à Meadow Trainer, choisissez Let's battle!, puis entrez dans le combat Pokémon après l'introduction.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 + DRM 0.3.1 + DNPC 0.1.3 + Cobblemon 1.8.4 / NeoForge 1.21.1, interface en anglais. Dialogue de manche → go_battle → introduction → combat.")

## Donner des récompenses après le dialogue

Dans **Battle Config → After Actions**, choisissez **Action Mode → Sequential**. Mettez le dialogue en premier et les récompenses article / devise après lui. Sélectionnez le résultat qui déclenche la séquence : gagner, perdre ou fuir.

L'exécution séquentielle attend la fin du dialogue. L'annulation ou la déconnexion arrête les récompenses ultérieures; l'interaction reprend les actions restantes. Chaque tour permet une action de dialogue. Réduisez les anciennes configurations multi-dialogues à une seule avant de les enregistrer ou de les appliquer.

**General Item Inventory** contient des exigences de possession telles que les clés Mega. Il est séparé du consommable **Battle Item Inventory**. Copier un objet de l’inventaire du joueur ne le consomme pas.

## Créer un Pokémon Alpha
Cette vidéo utilise le **JAR publié 0.2.9**. Choisissez un Pokémon dans **Pokemon Party** et activez **Basic → Alpha**. **Aspects** affiche aussi Alpha et l'aperçu montre des yeux rouges. Ce réglage est distinct de **Shiny** et exige le support Alpha natif du Cobblemon installé.

![Activer Alpha dans Basic, voir Bulbasaur aux yeux rouges et enregistrer le profil.](assets/media/guides/cobble-release-20261109/pokemon-alpha.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, anglais. Alpha → aperçu → Save As. Ne montre ni NPC Apply ni combat terminé.")

Utilisez **Save As**, puis [NPC Apply](#drm-cobblemon-editor/cobblemon-editor-setup) pour le premier lien. Les écrans en développement peuvent différer ; le bouton filmé est dans **Basic**.

Continuez avec [badges et trophées](#drm-cobblemon-editor/cobblemon-badges) ou [conversion RCT → DNPC](#drm-cobblemon-editor/cobblemon-rct-conversion).
