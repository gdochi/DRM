---
title: Construire un patron d'épée en deux phases
slug: battleworks-encounters
order: 272
description: Combinez la barre oblique, la poussée, la retraite et une transition de demi-santé en une seule rencontre.
product: mob-editor
section: combat
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

## Ce que vous allez construire

Un boss d'épée utilise une barre oblique, une poussée et une retraite, puis ajoute une attaque améliorée en dessous de 50% de santé. Aucun mod de sort optionnel n'est nécessaire. Les valeurs sont des points de départ d'enseignement, pas une garantie de difficulté équilibrée.

Commencez par le travail [Première attaque](#mob-editor/battleworks-first-attack).

## 1. Créer un fichier de travail séparé

1. Chargez la première attaque.
2. Save As `bosses/training_captain.json`.
3. Définissez la santé maximale à **100** dans DNPC **Combat AI → Max health**. Pour un acteur hérité CustomNPCs pris en charge, utilisez son propre écran de statistiques.
4. Vérifiez que les anciens scripts de combat ne sont pas en compétition.
5. Gardez l'équipement et la santé du joueur cohérents entre les tests.

Gardez first_sword comme une comparaison de travail connue.

## 2. Planifier les déménagements

| Motif | Plage de démarrage | Ventilation / Action / Récupération | Rôle |
| --- | --- | --- | --- |
| Slash | 0–2.7 | 24 / 16 / 24 | Attaque de base |
| Poussée | 0–3.2 | 28 / 16 / 24 | Attaque avant plus longue |
| Courte retraite | 0–2.0 | 6 / 12 / 12 | Faire de l'espace |
| Slash amélioré | 0–2.7 | 18 / 16 / 20 | Ajout de la phase 2 |
| Début de l'enrage | Large gamme adaptée | 0 / 30 / 10 | Annonce de phase |

En dehors de la portée d'attaque, Chase Target doit rapprocher le PNJ. Un chef de mêlée a besoin d'une approche navigable.

## 3. Stabiliser la barre oblique et la poussée

1. Gardez la barre oblique.
2. Créer le [boîte de poussée](#mob-editor/battleworks-hitboxes) et le lier à un autre modèle.
3. Commencez tous les deux à Dégâts 4.
4. Placez le coup de poussée à Action tick 3, puis ajustez au contact réel.
5. Donnez à la fois Priorité 10 et Score de base 10.
6. Confirmez que les deux apparaissent dans des combats rapprochés répétés.

Résoudre les problèmes de sélection et de portée avant d'ajouter des phases.

## 4. Ajouter une retraite

1. Suivez les [Exercice de mouvement](#mob-editor/battleworks-movement).
2. Marquez le motif Mobilité et utilisez un rôle de mouvement distinct.
3. Au début, laissez-le sans dommage.
4. Commencez le score de base autour de 6 afin qu'il soit moins important que les attaques.
5. Vérifiez que la poursuite reprend après la retraite.

Si le mouvement domine, vérifiez si les attaques échouent dans leurs conditions de portée avant de changer de score.

## 5. Ajouter la phase 2

1. Ouvrir **Combat Rules → Boss Phases**. Si P1 et P2 existent déjà, sélectionnez P2 et définissez son seuil sur **50**; Ajouter seulement s'il est absent. Maintenir P1 à 100%.
2. Créez une barre oblique améliorée séparée et définissez la phase minimale 2.
3. Gardez les attaques ordinaires disponibles dans les deux phases.
4. Avant d'augmenter les dégâts, raccourcissez Windup amélioré de 24 à 18.
5. Si c'est trop abrupt, accordez entre 20 et 24.

Changez le timing, les dégâts ou le nombre de coups un à la fois.

![Le seuil de santé P2 existant a été économisé à cinquante.](assets/media/guides/battleworks-016-neo1211/battleworks-boss-phases-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Sélectionnez P2 · Enragé à gauche et sauvegardez le seuil 50 à droite. Cet artefact préfixe cette légende avec l'erreur Format; enregistrer les rapports Avertissements 0 et la santé contrôlée du serveur 100/100 → 49/100 confirme la phase 1→2.")

Les [première barre oblique plus fichier de démarrage en deux phases](assets/media/battleworks/first_two_phases.json) est la sauvegarde native exacte de l'UI indiquée ci-dessus. Il contient ** une barre oblique de base et deux phases de santé**. Ajoutez la séquence d'attaque et d'enrage améliorée dans les étapes suivantes. Placez-le en dessous de `config/dochi_rpg_maker/mobs/patterns/`, chargez-le et enregistrez-le dans le PNJ.

## 6. Connecter la transition

1. Donnez à Enrage Commencez un titre et un son à Action cochez 0.
2. Gardez son déclencheur sur Manager et autorisez la phase 2.
3. Pour une utilisation de transition seulement, définissez le score de base et tous les bonus additifs à zéro.
4. Sélectionnez-le comme modèle de transition de la phase 2.
5. Réduire la santé en dessous de la moitié et vérifier une transition.
6. Guérir et confirmer que la phase reste verrouillée.

Voir [détails de la phase](#mob-editor/mob-editor-phases) pour les conditions de transition forcée et les seuils évités.

## 7. Optionnellement ajouter un passif

Utilisez [Ranged Damage retreat](#mob-editor/battleworks-passives) pour répondre aux flèches. Si vous souhaitez également une retraite ordinaire, gardez des motifs séparés : la modification d'un motif en mode passif le supprime de la sélection du gestionnaire.

Les réactions basiques attendent une ouverture. L'annulation immédiate des dommages utilise un déclencheur avancé différent.

## 8. Ajouter un avertissement au sol

Pour un balayage relatif au PNJ, utilisez **Telegraph → Link ground warning to hitbox**, choisissez la hitbox ou **Next hitbox contact**, puis éventuellement **Fill until contact**. Consultez [les avertissements de hitbox](#mob-editor/battleworks-hitboxes).

Pour un effet personnalisé, créez un anneau dans [Particle Maker](#mob-editor/battleworks-particles) et alignez position, taille et durée sur l'impact réel. Pour l'**ancienne position** du joueur, utilisez [enregistrer → avertir → frapper plus tard](#mob-editor/battleworks-advanced-actions). L'avertissement seul ne cause aucun dégât.

## 9. Tester une matrice de situation

| Situation | Vérifier |
| --- | --- |
| À propos de 1 bloc | Admissibilité Slash et Retreat |
| À propos de 2.5 blocs | Contact et dommages réels |
| À propos de 3 blocs | Poussée ou approche renouvelée |
| À propos de 6–8 blocs | Poursuite menant à une attaque |
| Murs et escaliers | Navigation, hauteur et conditions de visibilité |
| Croisement 50% santé | Transition et amélioration des déplacements |
| Guérison au combat | La phase reste verrouillée |
| Perte de cible et autre combat | Réinitialisation de l'état prévu |
| Décès | Présentation, fin de BGM, appel au nettoyage |

## 10. Préparer le paquet

Rouvrir le fichier enregistré et vérifier les valeurs. Incluez toutes les dépendances de combat, de particule, de modèle, de son, de popup, de clone et de fournisseur.

Utilisez [fichiers et guide de sauvegarde](#mob-editor/battleworks-files) et [troubleshooting](#mob-editor/battleworks-troubleshooting) avant de partager.

## Garder le boss dans l'arène

1. Ouvrez **Combat Rules → Arena** et activez **Use arena bounds**.
2. Réglez Center X/Y/Z ou **Use NPC / player position**.
3. Réglez **Radius (blocks)** et **Vertical half-range**. L'arène est cylindrique, pas une sélection carrée.
4. Choisissez **Restore boss health** et **Reset when target leaves** selon la réinitialisation voulue.
5. Enregistrez et appliquez ; testez séparément le boss et la cible traversant la limite.

La réinitialisation annule combat, invocations et projectiles gérés, puis ramène le boss à un centre chargé et sûr. Elle ne téléporte pas les joueurs et ne force pas le chargement de la destination. Gardez le centre utilisable et vérifiez le combat suivant. Les règles sont désactivées avant configuration et application.
