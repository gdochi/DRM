---
title: Intégration Create · Manivelles, vannes et sièges
slug: npc-core-create-start
order: 1514
description: Ajoutez des tâches Create au planning, affectez les blocs et vérifiez leur fonctionnement réel.
product: dochi-npc-core
category: Intégration Create
section: editor
status: Guide
version: 0.1.3
audience: Créateurs / administrateurs de serveur
translationSource: en
translationMethod: assisted
---

## Choisir une tâche

Le planning DNPC décide quand et où le PNJ travaille. Create gère la rotation, les contraintes, les recettes et le réseau logistique réels.

| Objectif | Action | Guide |
| --- | --- | --- |
| Fournir une rotation manuelle | Operate hand crank | Cette page |
| Tourner selon l'angle réglé | Operate valve handle | Cette page |
| S'asseoir pendant le service | Mount vehicle → Create seat | Cette page |
| Polir, livrer ou tenir un comptoir | Sandpaper Polishing / Addressed Parcel Delivery / Stock Ticker Attendance | [Logistique](#dochi-npc-core/npc-core-create-logistics) |
| Alimenter les machines et commander | Factory Process / Material Ordering | [Fabrication](#dochi-npc-core/npc-core-create-factory) |
| Réagir aux capteurs et inspecter | Conditional Machine Operation / Factory Inspection | [Commande et inspection](#dochi-npc-core/npc-core-create-control) |

## Installation et portée des vidéos

Installez une distribution réelle de Create pour votre version Minecraft et votre chargeur, avec ses dépendances. Accordez serveur et clients. DNPC de base fonctionne sans Create ni DRM ; ajoutez Create pour ces tâches.

Les anciens relevés d'exécution couvrent **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 26.3**. Ils ne prouvent pas la disponibilité ou la compatibilité de Create sous Fabric 1.21.1 ou NeoForge 26.3. Vérifiez la distribution et les capacités réelles de votre cible. CustomNPCs est exclu en 26.3.

Ces vidéos muettes utilisent **DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1**. **6.0.10 décrit la capture, pas un minimum universel.** Seuls les appareils et matériaux sont préparés. Chaque leçon part d'un planning vide et montre action, cibles du monde, champs, activation, sauvegarde et exécution native. Le retour poursuit les réglages sauvegardés dans la livraison précédente. L'interface est anglaise, avec étapes coréennes sous le jeu, champs agrandis et marqueur de clic. Adaptez les coordonnées à votre monde. L'étape au-dessus du lecteur suit la lecture et la recherche et reste lisible pendant la pause.

## Parcours commun : planning, action, cible, sauvegarde

1. Ouvrez **NPC editor → Schedule** avec l'objet NPC Core : c'est un outil de création.
2. Cliquez sur **Add time**, nommez le service et réglez **Start / End (world ticks)**. Commencez par **0 → 12000**.
3. Utilisez le **+** de la plage pour choisir une action **Create**. Les sièges relèvent de **Mount vehicle**, dans les déplacements.
4. Sélectionnez l'action, cliquez sur **🔍**, puis faites **Maj + clic droit** sur le bon bloc.
5. Vérifiez nom, dimension et coordonnées. **Échap** annule.
6. Activez **Enable schedule**, utilisez **Save to NPC**, fermez et observez.

La sélection modifie seulement le brouillon. Le **✓** du nom ne sauvegarde pas non plus tout le PNJ. Consultez les [Plannings](#dochi-npc-core/npc-core-schedules).

## Manivelle

Vérifiez d'abord la machine en tournant vous-même la manivelle. Connexions, direction et limites de contrainte restent applicables.

1. Choisissez **Operate hand crank** et affectez la manivelle via **Assign hand crank block → 🔍**.
2. Réglez **Rotation direction → Default direction / Reverse direction**.
3. Choisissez **Keep turning** ou **Turn for a duration**.
4. **Operating time (seconds) 6** correspond à six secondes d'entrée effective. Marche et attente d'un autre opérateur ne consomment pas ce temps.
5. Choisissez une position automatique ou affectée, puis sauvegardez.

![Créer une tâche de manivelle depuis un planning vide, choisir bloc et position, saisir six secondes, sauvegarder et observer la rotation.](assets/media/guides/create-lessons-20261108/lesson-crank.mp4 "Marqueurs et agrandissements montrent les entrées. Activez et sauvegardez le planning, fermez l'éditeur et observez mains et manivelle réelles.")

**Repères**: 0:04 Planning vide · 0:36 Cibles du monde · 0:47 Durée de rotation · 0:59 Activer/sauver · 1:13 Exécution native.

La durée accepte **1–1200 secondes**. Un seul PNJ utilise chaque appareil ; le joueur est prioritaire. Create calcule RPM, capacité et surcharge.

## Position de l'appareil et position des pieds

**Assign hand crank block / Assign valve handle block** désigne l'appareil. La position de travail accueille les pieds du PNJ.

- **Find a reachable position** cherche à proximité.
- **Assign standing position → 🔍** sélectionne un sol solide ; l'espace au-dessus accueille les pieds. Laissez de la place pour le corps et la tête.
- **Use my current position** enregistre vos pieds dans la même dimension.
- **X** efface l'affectation correspondante. Revérifiez la position après un changement d'appareil.

Prévoyez sol plat, accès et visibilité ; évitez les espaces bloqués et les positions sans support.

## Vanne : angle sur le bloc, nombre sur le PNJ

1. Réglez d'abord l'angle du bloc Create : **90°** ici.
2. Choisissez **Operate valve handle** et affectez ce bloc.
3. Réglez direction et **Number of operations**. **2** réalise deux opérations de 90°.
4. Réglez **Pause between operations (seconds)** ; rotation et délai natifs doivent finir avant la suivante.
5. Vérifiez la position et sauvegardez.

![Créer la tâche de vanne, choisir bloc et position, saisir deux opérations et une pause supplémentaire d'une seconde, puis exécuter.](assets/media/guides/create-lessons-20261108/lesson-valve.mp4 "Les 90 degrés du bloc diffèrent du nombre d'opérations. Create gère rotation et délai.")

**Repères**: 0:04 Planning vide · 0:36 Cibles du monde · 0:44 Quantité/nombre · 0:50 Pause ajoutée · 1:04 Activer/sauver · 1:18 Exécution native.

Le nombre accepte **1–64 opérations** par occurrence et la pause **0,2–60 secondes**. Le travail fini est sauvegardé. Éditer, combattre ou se reconnecter ne réinitialise pas le quota accompli du même service. Nouvelle occurrence et tâche modifiée sont traitées séparément.

## Sièges Create

Ajoutez **Mount vehicle**, passez à **Create seat**, sélectionnez le bloc avec **🔍**, puis vérifiez délai de tentative et descente en fin de service avant de sauvegarder.

![Choisir Create seat dans Mount vehicle, affecter siège et délai, sauvegarder, monter et descendre après le service.](assets/media/guides/create-lessons-20261108/lesson-seat.mp4 "Part d'un planning vide. L'outil change explicitement l'heure à 12500 pour montrer la fin du service.")

**Repères**: 0:04 Planning vide · 0:36 Cibles du monde · 0:47 Délai de montée · 0:53 Activer/sauver · 1:07 Exécution native · 1:13 Fin/descente.

La cible est un bloc, pas un numéro de siège ordinaire. Un siège occupé, absent, déchargé ou inaccessible attend jusqu'au délai limite. La descente attend l'arrêt et un sol sûr. Le suivi tient compte d'assemblage et de sauvegarde, mais cette action ne crée ni conduite de train ni trajet.

## Dépannage

| État | Vérifier |
| --- | --- |
| Rien ne commence | Planning activé, heure mondiale, action et sauvegarde |
| Work paused | Édition, IA désactivée, combat, interaction, sommeil ou IA externe |
| Choose a device in this dimension | Affectation et dimension |
| Approaching operating position | Sol, espace libre, accès et visibilité |
| Waiting for another operator | Autre PNJ sur le même appareil |
| Yielding to manual operation | Utilisation manuelle du joueur |
| Device unavailable | Bon bloc, chunk chargé et capacité Create |
| Machine arrêtée | Connexions, sens et contrainte natifs |
| Work complete | Durée ou opérations déjà accomplies pour ce service |

Poursuivez avec [polissage et logistique](#dochi-npc-core/npc-core-create-logistics) ou [fabrication](#dochi-npc-core/npc-core-create-factory).
