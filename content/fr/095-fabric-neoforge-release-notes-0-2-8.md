---
title: 0.2.8 Mise à jour
slug: release-notes-0-2-8
order: 5
description: 0.2.8 Mise à jour
product: core-fabric
category: 0.2.8 Mise à jour
section: getting-started
status: Guide
version: 0.2.8
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Cette page enregistre un **Libération plus ancienne**. Utilisation [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour l'installation et l'utilisation actuelles. Les illustrations de la version actuelle ci-dessous sont distinctes de l'historique de publication.


## Lire les listes de choix et d'action

Sélectionnez la ligne bleue Choix pour modifier ce choix sur la droite. Une case à cocher est séparée de la sélection d'édition. Cet exemple divise l'enregistrement d'attribution et de revendication d'un élément en deux actions. Continuer avec le [guide actuel](#core-fabric/dialogue-system) pour l'épargner et l'appliquer.

![Lire les listes de choix et d'action.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Installation

DRM ** 0.2.8 ** cibles Forge 1.20.1 / Java 17 et Fabric / NeoForge 1.21.1 / Java 21. Faites correspondre le chargeur et construisez sur le serveur et chaque client. Filtrer les fichiers [Modrinth](https://modrinth.com/mod/drm/versions) par version Minecraft et par chargeur.

**CustomNPCs est facultatif**. Installez-le pour les workflows qui associent des dialogues, des boutiques ou des modèles à CustomNPCs PNJ. DNPC est un fournisseur de PNJ facultatif distinct ; la prise en charge d'un fournisseur n'implique pas que chaque fonctionnalité d'addon le supporte.

## Édition et sauvegarde

- Les listes prises en charge offrent désormais des vérifications de ligne indépendantes, Sélectionner tout, supprimer en bloc et copier/coller. La ligne de détail active et les cibles de suppression vérifiées sont séparées.
- Les nœuds de dialogue, les choix, les conditions et les actions ont des sections et un défilement plus clairs. Forge les pannes d'entrée multiligne et de glisser-déplacer-noeud ont été corrigées.
- NPC Apply supporte plusieurs filtres de catégorie. Correspondant à une catégorie sélectionnée comprend un fichier; Tout efface le filtre. La sélection est sauvegardée localement.
- Les boutons Back/Forward partagés naviguent dans l'historique de l'écran. Enregistrer ou Save As valide toujours votre document.

## Quêtes et administration

Les actions de quête exposent des champs pour leur élément réel, tag, score, avancement, animation ou opération JSON. Le sélecteur de nouvelle action de quête exclut `go_stat_builder`, `cobble_npc:go_battle` et `dochi_minigames:play`. Les actions enregistrées existantes et le registre mondial des actions de dialogue restent pris en charge.

Les actions de score de faction peuvent cibler des factions CustomNPCs ou **DNPC relations**. Les relations DNPC sont la réputation du joueur vis-à-vis d'un groupe de relations, avec des opérations d'addition, de soustraction et de définition. Installez DRM et un DNPC build avec la relation API ensemble. Un fournisseur DNPC indisponible ne revient jamais aux scores changeants CustomNPCs.

F7 Admin peut inspecter la progression de l'entraîneur et réinitialiser la victoire compte sur Fabric / NeoForge avec un éditeur compatible Cobblemon. Les opérations par lots montrent maintenant des progrès.

## Messages et performances

Des marqueurs cachés et des déclencheurs persistants par joueur sont disponibles. La recherche, la mise en cache PNJ-preview et Admin-list et la préparation de l'interface graphique ont été améliorées. Les conditions côté serveur, les récompenses et les contrôles d'autorisation régissent toujours les opérations réelles.

## Mise à jour

1. Retournez `config/dochi_rpg_maker` et le monde ensemble.
2. Installer les constructions correspondantes 0.2.8 sur le serveur et les clients.
3. Mettre à jour Cobblemon Éditeur avec son noyau: la version 0.2.6 nécessite DRM 0.2.8 ou plus tard.
4. Réouvrez les dialogues personnalisés, les boutiques, les quêtes et le contenu de Remnant et vérifiez les interactions réelles. Personnalisez les modèles groupés à travers Save As.

Minecraft 26.3 Les ports constituent un secteur d'activité distinct. Cette page décrit les versions 1.20.1 et 1.21.1.
