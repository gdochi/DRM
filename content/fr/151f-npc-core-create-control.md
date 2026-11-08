---
title: Create · Commande conditionnelle et inspection
slug: npc-core-create-control
order: 1517
description: Commandez les entrées natives avec deux seuils et inspectez les équipements sans modifier leur contenu.
product: dochi-npc-core
category: Intégration Create
section: editor
status: Guide
version: 0.1.3
audience: Créateurs / administrateurs de serveur
translationSource: en
translationMethod: assisted
---

## Travailler seulement sous condition

**Conditional Machine Operation** applique manivelle, vanne ou Linked Controller selon un capteur pendant le service actif. Lisez le [Démarrage Create](#dochi-npc-core/npc-core-create-start) et la [Fabrication](#dochi-npc-core/npc-core-create-factory). Vidéos muettes : DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Exemple : démarrer à deux, arrêter à six

1. Ajoutez **Create → Conditional Machine Operation**.
2. Choisissez **Control device → Hand crank** et affectez **Machine control position**.
3. Choisissez **Sensor reading → Item quantity** et un tonneau dans **Sensor position**.
4. Réglez **Counted item → Iron Ingot** ; seul cet ID est compté.
5. Activez **Activate at the lower threshold**. Saisissez d'abord **6** dans **Upper threshold**, puis **2** dans **Lower threshold** pour conserver une plage valide.
6. Réglez l'intervalle, activez et sauvegardez.

![Créer le contrôle conditionnel, affecter appareil, capteur et fer, puis saisir plafond six avant plancher deux.](assets/media/guides/create-lessons-20261108/lesson-conditional-control.mp4 "Cet ordre conserve une plage valide. Le changement explicite 0→6 est une entrée de test ; la manivelle ne produit pas ces lingots.")

**Repères**: 0:04 Planning vide · 0:36 Appareil · 0:45 Capteur · 0:56 Choisir les objets · 1:11 Seuils · 1:19 Activer/sauver · 1:33 Exécution native · 1:40 Arrêt à six.

## Entre les seuils, conserver l'état précédent

Le seuil supérieur doit dépasser l'inférieur ; les deux doivent être finis et positifs ou nuls.

| Activate at the lower threshold | Démarre | Arrête | Entre eux |
| --- | --- | --- | --- |
| ON | Valeur ≤ inférieur | Valeur ≥ supérieur | Conserve l'état |
| OFF | Valeur ≥ supérieur | Valeur ≤ inférieur | Conserve l'état |

Avec ON / 2 / 6, le stock **0 → 3 → 6 → 4 → 2** donne **tourner → continuer → arrêter → rester arrêté → tourner**. Cela évite les basculements autour d'un seul chiffre.

## Capteurs et unités

| Sensor reading | Cible et valeur |
| --- | --- |
| Redstone strength | Signal voisin maximal du bloc, 0–15 |
| Item quantity | ID choisi dans un inventaire compatible |
| Tank fill percentage | Réservoir Create compatible, 0–100 %, pas des mB |
| Rotation speed in RPM | Vitesse absolue d'un appareil cinétique |
| Overstress (0 or 1) | Normal 0 / surcharge 1 |

Pour détecter une surcharge : OFF / inférieur 0 / supérieur 1. Ne confondez pas volume et pourcentage, ni RPM et surcharge. Les réseaux illisibles ou trop grands ne sont pas scannés sans limite ; ils signalent **Sensor reading unavailable**.

## Manivelle, vanne et Linked Controller

| Appareil | Actif | Transition inactive |
| --- | --- | --- |
| Hand crank | Entrée native | Arrête les nouvelles entrées |
| Valve handle | Une opération de transition | Sens opposé |
| Linked Controller | Maintient le canal pressé | Le relâche |

La vanne réagit aux changements d'état plutôt qu'à chaque lecture. Elle attend rotation et délai natifs. **Reverse the active direction** inverse le sens actif.

Placez un **vrai Linked Controller avec fréquences configurées** dans l'inventaire PNJ, choisissez **Linked Controller button (1–6)** et accordez le récepteur Create. **Machine control position** est le poste physique rejoint. DNPC ne crée pas des fréquences à partir de noms saisis. Un contrôleur vide indique **A configured Linked Controller is required in NPC inventory**.

Le joueur garde la priorité. Édition, combat, interaction et IA désactivée suspendent les nouvelles entrées sans annuler les mouvements commencés.

## Factory Inspection

1. Ajoutez **Create → Factory Inspection**.
2. Utilisez **Add inspection position** puis Maj + clic droit sur **16** appareils compatibles au maximum.
3. Enregistrez l'ordre et retirez avec **Delete inspection position**.
4. Réglez **Work interval (ticks)** ; lecture minimale de **20 ticks**.
5. Affectez éventuellement un Display Board et sauvegardez.

![Affecter deux points d'inspection et un vrai Display Board, saisir ses lignes et vérifier tournée et rapport.](assets/media/guides/create-lessons-20261108/lesson-inspection-board.mp4 "Manivelle et réservoir vide sont choisis séparément. Le panneau assemblé et alimenté reçoit le rapport et apparaît en gros plan.")

**Repères**: 0:05 Énergie du panneau · 0:09 Planning vide · 0:41 Cibles d'inspection · 1:01 Affecter panneau · 1:09 Première/lignes réservées · 1:14 Activer/sauver · 1:29 Exécution native · 1:41 Rapport du panneau.

Lit rotation/arrêt, surcharge, chaleur du Burner et niveau du réservoir. Ne répare pas et ne change pas le contenu. Réagissez avec une action conditionnelle distincte.

## Rapports sur Display Board

Assemblez correctement le panneau Create avec son énergie normale. La vidéo l'entraîne par un **Cogwheel** engrené à côté. Recevoir du texte ne suffit pas pour qu'un panneau sans énergie stabilise ses caractères ; vérifiez d'abord la liaison des engrenages et le fonctionnement. Affectez **Display Board (optional)** et réglez :

| Champ | Signification |
| --- | --- |
| First display row (starting at 1) | Première ligne ; 2 préserve la ligne 1 |
| Reserved display rows | Lignes consécutives ; six depuis la 2 réservent 2–7 |

Le rapport inclut inspecteur, appareil actuel, PNJ proches au travail, tâches terminées et colis en attente. Le comptage est borné à environ **32 blocs**, pas à toute la production serveur. Les tâches terminées ne sont pas le nombre total de produits.

Le rapport complet revient à la ligne dans la réservation. **Reserved board rows cannot fit the complete report** laisse le panneau intact ; augmentez largeur/lignes. Les réservations qui se recoupent attendent l'autre inspecteur. Les lignes externes sont préservées.

## Dépannage

| État | Vérifier |
| --- | --- |
| Select valid loaded work positions | Appareil, capteur, dimension et trajet chargé |
| Sensor reading unavailable | Type et capacité compatibles |
| Waiting for the activation threshold | Valeur, mode et deux seuils ; peut être normal |
| Player manual operation has priority | Utilisation directe du joueur |
| Workstation is reserved by another worker | Autre PNJ ou lignes réservées |
| Display Board unavailable or not assembled | Assemblage, cible, chunks et énergie |
| Panneau inchangé | Première ligne, largeur, lignes et recoupements |
| PNJ en attente à proximité | Pause, IA, pieds et visibilité |

Commencez avec un capteur, un actionneur et un PNJ, puis reliez [fabrication](#dochi-npc-core/npc-core-create-factory) et [logistique](#dochi-npc-core/npc-core-create-logistics).
