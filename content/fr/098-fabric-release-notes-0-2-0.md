---
title: Fabric 0.2.0 Mise à jour
slug: release-notes-0-2-0
order: 8
description: Tooltip Maker, aide au survol partagé, présentation des dialogues et améliorations de l'animation Gecko dans Fabric 0.2.0.
product: core-fabric
category: Premiers pas
section: getting-started
status: Stable
version: 0.2.0
audience: Créateurs / Opérateurs
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core-fabric/release-notes-0-3-1) pour les orientations actuelles.

## Personnaliser une infobulle d'élément

Tooltip Maker organise le nom, la description et l'aperçu de l'élément. Sélectionnez un élément sur le canevas central, modifiez-le à droite et utilisez Aperçu. Il s'agit d'un écran NeoForge actuel, pas de l'interface utilisateur historique Fabric 0.2.0. Continuer avec le [guide actuel](#core-fabric/tooltip-maker) pour l'épargner et l'appliquer.

![Personnalisez l'infobulle d'un élément.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Historique des news 0.2.0

### Changé

- Les champs et les boutons de l'éditeur utilisent désormais des largeurs basées sur le contenu plus compactes, le cas échéant.
- Les cartes hover-help partagées emballent, repositionnent et restent au-dessus du contenu de l'éditeur de manière plus cohérente.
- La lecture de l'animation Gecko utilise désormais une chronologie de serveur synchronisée et rattrape correctement les téléspectateurs tardifs.

### Ajouté

- **Tooltip Maker** pour les mises en page de survol d'éléments, les aperçus d'éléments 2D ou 3D, les images, le texte, le défilement et les effets d'entrée.
- Player-head HUD rendu.
- Taille du texte de choix de dialogue par nœud et surlignages optionnels.
- Démarrer les itinéraires avec une cible Goto.

### Fixe

- La navigation dans les dialogues n'empêche plus l'exécution d'actions ultérieures telles que des animations, des commandes, des balises ou des actions d'éléments.
- Les prévisualisations Gecko peuvent rechercher et redémarrer indépendamment, réessayer les actifs manquants et se replier en toute sécurité lorsque le chargement échoue.
- Les commandes superposées, étirées et incorrectement coupées ont été corrigées dans GUI Maker, Quest Editor, Faction Editor et les écrans associés.

### Mise à jour

Sauvegardez votre monde et `config/dochi_rpg_maker/`, puis installez le même DRM Core 0.2.0 JAR sur le serveur et chaque client. CustomNPCs est nécessaire à la construction de ce Fabric. Les données 0.1.9 existantes restent le point de départ ; utilisez `Save As` pour personnaliser les valeurs par défaut protégées.
