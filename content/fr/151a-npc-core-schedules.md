---
title: Horaire quotidien et équitation
slug: npc-core-schedules
order: 1512
description: Choisissez les heures de travail, les périodes de repos et les véhicules à bord.
product: dochi-npc-core
category: Annexes
section: editor
status: Guide
version: 0.1.3
audience: Créateurs PNJ
translationSource: en
translationMethod: assisted
---

## Travailler le jour, se reposer la nuit

1. Ouvrez **Schedule** sur le rail gauche de l'éditeur PNJ.
2. Appuyez sur **Add time** au milieu. Entrez un **Time slot name**, tel que "Day shift", sur la droite et appuyez sur le ** ✓ ** à côté de lui pour appliquer ce nom.
3. Entrez **Start (world ticks) / End (world ticks)** à droite.
4. Utilisez **+** sur la ligne de temps pour ajouter une activité, puis sélectionnez cette activité pour configurer son emplacement et ses cibles.
5. Ajoutez une période de nuit avec **Rest** ou **Sleep in assigned bed**, et assignez son lieu de repos ou son lit.
6. Activer **Enable schedule** Au-dessus de la liste, utilisez **Save to NPC** Au sommet.

![Schedule immédiatement après Ajouter le temps, avec un 0–1000 période au milieu et nom, début et fin des champs sur la droite.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-add.png "DNPC 0.1.2 / NeoForge 1.21.1. La ligne + ajoute une activité. Le nom ✓ s'applique à son nom ; Save to NPC sauve l'ensemble du PNJ.")

L'image `0–1000` est la période initiale. Changez son heure de fin si elle doit couvrir toute une journée de travail. Une période sans activité, ou un horaire désactivé, n'est pas une configuration de travailleur terminée.

| Heure | Cocher la valeur |
| --- | --- |
| 06:00 | 0 |
| 12:00 | 6000 |
| 18:00 | 12000 |
| 00:00 | 18000 |

Recherchez dans la liste des actions des emplois tels que l'exploitation forestière, le transport ou l'équitation. Les catégories peuvent restreindre la recherche.

![Le sélecteur d'action de la ligne de temps avec des catégories à gauche, des activités spécifiques à droite et une recherche ci-dessus.](assets/media/guides/dnpc-012-neo1211/dnpc-action-picker.png "Le mouvement et l’attente contiennent le mouvement, l’attente, l’équitation et la patrouille. Choisissez une catégorie, puis l'activité réelle à droite.")

## Attribuer un lit

![Choisir Assign bed dans Houses, attribuer et enregistrer le lit, puis voir le PNJ marcher et dormir.](assets/media/guides/short-videos-color-20261106/dnpc-bed-assignment.mp4 "Capture en jeu avec DNPC 0.1.3 / NeoForge 1.21.1, interface anglaise. Un horaire nocturne était préparé dans le monde de capture ; l'attribution du lit et le sommeil réel ont été vérifiés.")

Choisissez **Houses → Assign bed**, puis faites **Maj+clic droit** sur le lit. De retour dans l'éditeur, vérifiez **Bed assigned** et cliquez sur **Save to NPC**. Ajoutez **Sleep in assigned bed** à la période nocturne et activez **Enable schedule**. La position de la maison et son lit se définissent séparément.

## Commencer par un exemple

Utilisez **Load schedule**, choisissez un exemple, puis modifiez ses emplacements et ses cibles pour votre monde. Filtrer selon les horaires généraux / militaires et les addons requis.

![Schedule bibliothèque ouverte via Charger le calendrier, montrant des exemples, les addons requis, les filtres de catégorie et Sélectionner.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-load.png "Lisez un exemple, sélectionnez-le et appuyez sur Sélectionner. Des exemples de cuisson signalent des exigences indisponibles lorsque leur addon est manquant.")

Par exemple, **Wheat delivery task** ne collecte que le blé, mais a toujours besoin d'un conteneur de sortie. **Cooking task** a besoin d'un mod de cuisson et d'une source d'ingrédients, d'un poste de travail, d'un conteneur de sortie et d'une recette. Continuer avec [cuisson ](#dochi-npc-core/npc-core-cooking).

Sur 1.20.1 / 1.21.1, les exemples couvrent également les tâches de garde, de patrouille et d’escorte DW et les équipages DWE. DW est disponible sur Forge / NeoForge; les droits de véhicules ont besoin de DW, DWE et SuperbWarfare. Les exemples non disponibles montrent ce qui manque. Les calendriers militaires DW utilisent une action par période.

Un PNJ plus ancien **Legacy AI compatibility** conserve son comportement précédent. Lors de la commutation, vérifiez à la fois **Schedule type** et le commutateur activé.

## Embarquez à bord d’un bateau, d’un cheval ou d’un véhicule

1. Définissez l'activité d'une période sur **Movement → Ride vehicle**.
2. Recherchez automatiquement les véhicules vides à proximité, ou sélectionnez-en un avec .
3. Définissez le centre de recherche et le rayon : blocs 16 par défaut, plage 1–32.
4. Choisissez un siège. Commencez par la sélection automatique **-1** pour les bateaux vanillés, les charrettes et les chevaux.
5. Choisissez de démonter quand la période se termine, puis sauvegardez.

Le PNJ se dirige vers le véhicule. Tentatives par défaut à 600 ticks, réglables à partir de 20–2400. Un véhicule en dehors de la zone de recherche ou dans une autre dimension ne peut pas être embarqué.

Les véhicules SuperbWarfare compatibles sur les anciennes cibles acceptent les sièges 0–63. Le sélecteur ordinaire de 26.3 utilise les véhicules vanilla sans sauter un siège précédent ; les véhicules DW/DWE ne sont pas disponibles en 26.3. Dans les environnements Create compatibles, **Create seat** s'affecte séparément comme bloc.

Le démontage attend que le véhicule s'arrête et qu'une sortie sûre soit disponible. Configurez la conduite, les patrouilles et les armes dans DWE ou dans les paramètres du véhicule.

## Plannings de tâches Create

Dans **+ → Create** du service, choisissez manivelle, vanne, polissage, colis, comptoir, fabrication, commande, contrôle ou inspection. Suivez [Configuration Create et vidéos](#dochi-npc-core/npc-core-create-start) pour sélectionner les blocs et sauvegarder. Les sièges utilisent **Ride vehicle → Create seat** ; le comptoir utilise **Stock Ticker Attendance**.

## Heures d'ouverture du magasin

Connectez une boutique DRM à un calendrier pour limiter les heures de trading. Une fois qu'il ferme, les transactions à partir d'un écran de magasin déjà ouvert sont également refusées.

Vérifiez aussi **DRM functions → Use DNPC function schedule**. Lorsque désactivé, les fichiers DRM directement appliqués sont utilisés. Lorsqu'elle est activée, les liaisons planifiées prennent la priorité ; un chemin planifié vide désactive cette fonction. L'activation de ce commutateur à lui seul ne configure pas les heures d'ouverture.

![DRM avec DRM Appliquer et utiliser DNPC le calendrier des fonctions.](assets/media/guides/dnpc-012-neo1211/dnpc-drm.png "DRM Apply ouvre l'écran de liaison des fichiers de fonction. Le commutateur ci-dessous décide si les liaisons planifiées sont prioritaires.")
