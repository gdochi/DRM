---
title: Votre première timeline d’appui
slug: expanded-support-timeline
order: 330
description: Découvrez le nouvel éditeur dans le monde, les bombardements, les horaires et le centre de placement.
product: dochi-warfare-expanded
category: Appui au combat
section: support
status: Guide
version: 0.3.2
audience: Créateurs de cartes et opérateurs débutants
translationSource: en
translationMethod: assisted
---

## Suivez ces trois leçons

**Gimmick Editor est un outil de création.** Placez l’appui dans la vue réelle du monde, puis choisissez quand chaque événement commence.

| Leçon | Objectif |
| --- | --- |
| 1. Cette page | Découvrir l’écran, placer des bombardements ponctuels/en ligne/en zone, régler horaires et centre |
| 2. [Véhicules, tirs et PNJ](#dochi-warfare-expanded/expanded-support-actions) | Départs/destinations, véhicules, armes et sources de PNJ |
| 3. [Enregistrer, simuler et lancer](#dochi-warfare-expanded/expanded-support-run) | Enregistrer, recharger, tester avec Simulation et appeler le fichier |

Dix vidéos accompagnent ces trois leçons. Elles montrent les **écrans réels de DWE 0.3.2 / NeoForge 1.21.1**, avec commandes anglaises et explications des étapes en coréen. Sans son : mettez en pause pour trouver chaque commande. Forge et Fabric partagent ce fonctionnement ; les captures proviennent de NeoForge.

Consultez [l’installation et le premier véhicule](#dochi-warfare-expanded/expanded-overview), entrez dans un monde avec les permissions opérateur et ouvrez **Gimmick Editor → Create New**. **Use Default** ouvre un brouillon de bombardement ponctuel à la position du joueur. Commencez par un seul événement.

## 1. Découvrez l’écran

| Zone | Fonction |
| --- | --- |
| Haut | Nouveau, Load, Save, Save As, Reset, titre, Simulation, coordonnées et Center |
| Gauche | Outils, sélection, duplication et suppression des événements |
| Monde | Positions et trajets sur les surfaces réelles des blocs |
| Droite | Appareil/véhicule, horaires et quantités ; Advanced ajoute coordonnées et autres valeurs |
| Timeline inférieure | Lignes PNJ, véhicules/tirs et bombardement ; modification des départs |

![Créez un document, repliez et redimensionnez les panneaux, puis déplacez la caméra.](assets/media/guides/dwe-tutorials-20261109/dwe-workspace.mp4 "01 · Panneaux, séparateurs, déplacement, rotation et zoom. DWE 0.3.2 / NeoForge 1.21.1.")

Utilisez les flèches pour replier/déplier les panneaux et faites glisser les séparateurs. Faites défiler **à l’intérieur des propriétés** pour atteindre les autres champs.

Dans le monde, la molette zoome, le glisser central déplace la vue et le glisser droit la fait tourner. **F** cadre l’événement ou le centre sélectionné. WASD déplace le joueur avec suivi ; Jump/Sneak règlent la hauteur de caméra. Sa vitesse −/+ ne change pas la vitesse d’exécution.

## 2. Créez le premier bombardement ponctuel

Objectif : **une cible au sol, premier largage deux secondes après l’appel**.

1. Choisissez **Point bombing**.
2. Cliquez sur la surface d’un bloc chargé. Vérifiez l’événement dans la liste et la ligne de bombardement.
3. Revenez à **Select / move** et sélectionnez son marqueur ou sa ligne.
4. Vérifiez **Aircraft / Payload**. Ces listes viennent du serveur ; une liste vide demande de vérifier installation et compatibilité.
5. Réglez **Start (seconds) 2**, **Altitude 96** et **Lifetime (seconds) 30**.
6. Consultez les coordonnées avec **Advanced** ; **Basic** revient au formulaire compact.

![Placez un point avec début à deux secondes, altitude 96 et durée de 30 secondes.](assets/media/guides/dwe-tutorials-20261109/dwe-point.mp4 "02 · Explosion damage 20 signifie 20 HP de dégâts de base. Cette vidéo ne mesure ni impacts ni dégâts.")

**Deux secondes indique le premier largage, pas l’impact.** L’altitude et la physique native retardent l’arrivée au sol. Lifetime est la durée de vie de l’appui temporaire.

Nombre et intervalle peuvent être désactivés pour un point. Utilisez ligne/zone pour plusieurs largages. Les marqueurs montrent le placement prévu ; les impacts réels dépendent de la physique native.

## 3. Dessinez lignes et zones

1. Avec **Line bombing**, tracez un corridor au sol.
2. Réglez nombre et intervalle : **quatre bombes espacées de 0,5 seconde** dans l’exemple.
3. Tracez un second corridor avec **Area bombing**, qui ajoute une largeur.
4. Déplacez les poignées de longueur/largeur/direction avec **Select / move**, ou utilisez **Advanced → Width / Heading**.

![Réglez quatre bombes espacées d’une demi-seconde et la largeur/direction d’une zone.](assets/media/guides/dwe-tutorials-20261109/dwe-corridors.mp4 "03 · Événements ligne et zone distincts. Zone : Width 24, Heading 0. Configuration, sans attaque réelle.")

Avec un début à deux secondes : **2,0 → 2,5 → 3,0 → 3,5 secondes**. Le nombre explicite s’applique par appareil ; une zone peut employer plusieurs couloirs. Nombre, vitesse native et intervalle déterminent la longueur, ce qui peut verrouiller son champ. Un nombre vide conserve le chargement natif.

Heading : **0 sud, 90 ouest, −90 est**. Consultez le marqueur d’approche.

## 4. Organisez plusieurs événements

**Modifier l’horaire et réordonner la liste sont deux opérations différentes.**

- Basic utilise des secondes par pas de **0,05**. Advanced et les fichiers utilisent des ticks entiers ; **20 ticks = une seconde** à 20 TPS.
- Glissez les marqueurs horizontalement pour changer les départs. Cliquez sur la règle pour choisir l’instant des nouveaux placements.
- Timeline −/+ change la plage visible, pas la vitesse.
- Glisser une ligne réordonne les événements en conservant les créneaux horaires. Utilisez champs/marqueurs pour changer l’horaire.
- Après **Duplicate**, vérifiez superpositions et départs. Les cases permettent la suppression groupée.

![Placez véhicules à deux secondes et bombardement à cinq, élargissez la plage puis déplacez le marqueur.](assets/media/guides/dwe-tutorials-20261109/dwe-timing.mp4 "04 · Horaires, marqueurs, Duplicate et Ctrl+Z / Ctrl+Y.")

**Ctrl+Z / Ctrl+Y** annulent/rétablissent les modifications. **Esc** ou un relâchement hors zone autorisée annule un glisser. Au maximum 16 événements démarrent au même tick ; échelonnez les groupes plus importants.

## 5. Utilisez centre et coordonnées relatives

L’écran démarre en **Relative coordinates**. Zéro sur tous les axes correspond au **Center** de la barre supérieure.

| Opération | Mode relatif | Mode absolu |
| --- | --- | --- |
| Changer l’affichage | Conserve le placement | Conserve le placement |
| Modifier Center | Déplace départs, destinations et cibles ensemble | Conserve les positions mondiales, change la référence |
| Saisir les positions | Décalages depuis le centre | Coordonnées mondiales |

![Comparez le déplacement relatif de l’ensemble avec le seul changement de référence absolue.](assets/media/guides/dwe-tutorials-20261109/dwe-center.mp4 "05 · Center X = 8 puis annulation. En Absolute coordinates, changer le centre conserve le trajet.")

Utilisez **Center → X/Y/Z**, **Use player position**, ou cliquez/glissez le centre dans le monde. Le mode relatif déplace toutes les routes et cibles : distinguez correction d’un marqueur et déplacement de l’ensemble.

Le chargement relatif transpose la disposition au centre actuel. Pour conserver les positions enregistrées, **passez en Absolute coordinates avant Load**. Les anciens fichiers sans origine utilisent la première cible comme référence.

Continuez avec [véhicules, tirs et PNJ](#dochi-warfare-expanded/expanded-support-actions), ou [enregistrez, testez et lancez](#dochi-warfare-expanded/expanded-support-run).
