---
title: Espace de travail, événements et chronologie
slug: mob-editor-patterns
order: 230
description: Recherchez des contrôles, sélectionnez des actions individuelles et modifiez le timing, les répétitions et la probabilité.
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

## Lire l'espace de travail dans cet ordre

Sélectionnez un modèle dans la liste de gauche, choisissez Fenêtre / Action / Récupération, puis sélectionnez une ligne d'action et modifiez ses propriétés.

| Outil | Objet |
| --- | --- |
| Workbench | Conditions du modèle et calendrier d'action |
| Bibliothèque Hitbox | Géométrie partagée, dommages, placement et aperçu du modèle |
| Règles de combat | Gestionnaire, ciblage, phases, mort et BGM |
| fabricant particules | Séparez les fichiers visuels réutilisables |
| Pattern Build Assist | Générer une attaque physique à partir des réponses |
| Graphique de modèle | Inspecter le modèle et les liens combo |
| Simulation | Répéter le mouvement et le placement de la hitbox |

![Pattern Workbench après avoir généré une attaque.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Wide Sweep est sélectionné sur la gauche. Le milieu montre les étapes et le timing; la droite est l'inspecteur d'éléments sélectionné. Sélectionnez une ligne d'action pour modifier cette action.")

## 1. Sélectionner un modèle

Utilisez **Find pattern** pour rechercher des noms ou des identifiants. Cliquez sur le motif prévu et modifiez son nom, son état activé et sa plage dans Core. Utilisez Score pour les préférences de sélection et Combo pour les liens de suivi.

Les noms sont pour les lecteurs, les identifiants relient les références JSON. Si vous modifiez des identifiants externes, mettez à jour chaque combo et référence de transition qui les utilise.

## 2. Définir les longueurs d'étape

| Stage | Objet | Valeur pratique |
| --- | --- | --- |
| Windup | Préparez-vous et avertissez | 24 tiques |
| Mesures prises | Exécuter un coup, une compétence ou un mouvement | 16 tiques |
| Récupération | Terminer le mouvement et offrir une ouverture | 24 tiques |

Core **Recovery Delay** est un étage de retard post-modèle, séparé de la longueur de l'étape de récupération. Après avoir raccourci une étape, vérifiez tous ses événements et répétez.

## 3. Ajouter une action

1. Sélectionnez Action.
2. Appuyez sur ** + Action **.
3. Choisissez une catégorie de but, puis l'action réelle.
4. Pour Hitbox, utilisez **Choose from list** ou créez une hitbox.
5. Cliquez sur la ligne d'action nommée.
6. Définissez la case `3`, l'intervalle `0` et le nombre de répétitions `1`.
7. Gardez les chances d'événement et d'action à 100 pendant le test.

Les catégories organisent le sélecteur ; la sélection d'une catégorie n'est pas un commutateur d'activation. Revenez à la catégorie parente ou utilisez Esc lorsque vous naviguez dans la liste.

**+ Compétence** ouvre la sélection de compétence directement. ** FX** permet d'ajouter des sons, des titres et des commandes.

## 4. Séparer les événements des lignes d'action

Un événement signifie « les actions programmées à ce moment ». Une Hitbox et un son à l’intérieur d’un événement partagent leur tick et se répètent, mais chacun a une ligne sélectionnable.

| Modifier | Affecte |
| --- | --- |
| tique événement | Toutes les actions à l'intérieur de cet événement |
| Intervalle d'événement/nombre de répétitions | Tout le calendrier de l'événement |
| Chance d'événement | Si cet événement se produit |
| Action Chance | La chance indépendante de cette action |
| Hitbox action multiplicateur | Cette utilisation de la hitbox partagée |
| Dommages à la bibliothèque | Chaque utilisation de cette définition de hitbox |

Mettez un son à la coche 3 et des dégâts à la coche 8 dans des événements séparés.

## 5. Déplacer les broches et la tête de lecture

Faites glisser une épingle d'action pour rééditer son événement. En cliquant ou en faisant glisser la règle et les voies vides, vous déplacez la tête de lecture d'aperçu. Faites défiler quand il y a beaucoup de lignes d'action.

Event Tick est local à l'étape sélectionnée. Avec un 24-tick Windup, Action tick 3 apparaît au tick global 27.

## 6. Créer un événement répété

Utilisez une action 20 avec :

| Réglage | Valeur |
| --- | --- |
| tique événement | 4 |
| Intervalle | 6 |
| Nombre de répétitions | 3 |
| Exécution ticks | 4, 10, 16 |

```text
first tick + interval × (count - 1) ≤ stage length
4 + 6 × (3 - 1) = 16 ≤ 20
```

Le nombre inclut la première exécution. L'intervalle 0 signifie pas de répétition. Répéter une hitbox ne redémarre pas automatiquement l'animation de la scène. Voir [hit policies](#mob-editor/battleworks-hitboxes) pour contrôler les tentatives de dégâts répétés.

## 7. Ajuster la probabilité en un seul endroit en premier

Pour des dégâts fiables avec des dialogues occasionnels, utilisez l'événement 100%, Hitbox 100%, Sound 100% et dialogue 20%..

Un événement 50% contenant une action 20% donne 10% de probabilité de base. Les conditions avancées et les bonus de chance de santé / phase peuvent modifier davantage la fréquence effective.

## 8. Récupérer une mise en page exiguë

- Faites glisser les diviseurs pour redimensionner les listes, l’espace de travail et les propriétés.
- Dans Hitbox Library, redimensionnez la hauteur et la largeur du modèle/de la ligne de temps.
- Utilisez les flèches d'en-tête pour plier ou déplier les panneaux.
- Appuyez sur **Reset panels** pour rétablir l'arrangement.
- Faites glisser la simulation par son en-tête et redimensionnez à l'aide de sa poignée inférieure droite.

La vitesse d'aperçu 0.1x–4.0x change la vitesse d'observation, pas les ticks de motif enregistrés. La disposition appartient aux paramètres du client local.

## Avant d'enregistrer

Cochez Activé, ID manquants, limites d'événements et dernière répétition. Résolvez les erreurs de validation, enregistrez/appliquez et testez le PNJ réel. Continuer avec [hitboxes ](#mob-editor/battleworks-hitboxes).
