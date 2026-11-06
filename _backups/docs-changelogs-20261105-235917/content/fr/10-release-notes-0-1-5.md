---
title: Quoi de neuf dans 0.1.5
slug: release-0-1-5
order: 10
description: Tooltip Maker, des choix de dialogue plus clairs, de meilleurs aperçus d'articles et des corrections HUD.
product: core
category: Premiers pas
section: getting-started
status: Stable
version: 0.1.5
audience: Créateurs / Opérateurs
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core/release-notes-0-3-1) pour les orientations actuelles.

Minecraft 1.20.1 · Forge

Cette mise à jour ajoute un Tooltip Maker dédié et donne aux créateurs plus de contrôle sur les choix de dialogue. Il améliore également les aperçus d'articles et corrige plusieurs problèmes d'affichage du HUD.

## Trouver Tooltip Maker

Modifiez l'infobulle de l'élément sur le canevas central. L'élément rendu affiche l'élément ; le texte d'infobulle ajoute des sections de texte. Vérifiez Aperçu et Save As votre propre mise en page. Continuer avec le [guide actuel](#core/tooltip-maker) pour l'épargner et l'appliquer.

![Trouvez Tooltip Maker.](assets/media/guides/drm-031-forge1201/tooltip-maker.png "DRM 0.3.1 / Forge 1.20.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Ajouté

- **Tooltip Maker:** Concevoir des infobulles d'éléments dans leur propre éditeur, disponible sous **Visual**. Organisez les aperçus d'éléments, le texte, les sections de statistiques, les images et les diviseurs.
- **Tooltip effects:** Ajoutez des effets d'entrée et rejouez-les avec le bouton de lecture pendant l'édition. Choisissez des icônes d'objets 2D, des objets 3D rotatifs ou des aperçus d'équipements portables.
- **Long tooltip scrolling:** Lisez les informations qui ne correspondent pas à l'écran en faisant défiler l'info-bulle.
- **Choice text size:** Modifier la taille du texte de choix de dialogue dans l'éditeur de dialogue ou sa mise en page graphique.
- **Choice pulse highlight:** Faire un choix individuel clignote doucement quand il apparaît. Choisissez la couleur, la durée totale, le nombre de pulsations et la force de **0 à 100**. Les conversations existantes restent inchangées sauf si vous activez l'effet.
- **NPC stat screens:** Connectez un fichier Stat Builder à un PNJ afin d'interagir avec ce PNJ ouvre l'écran d'allocation des statistiques du joueur.

## Amélioration

- Les boutons de choix utilisent désormais la largeur disponible avant d’emballer du texte long, y compris du texte traduit via un pack de ressources.
- Les longs choix deviennent plus grands en cas de besoin. Les listes avec trop de choix peuvent être défilantes.
- Les boutons de choix par défaut ont environ **5 pixels GUI d'espace au-dessus et en dessous du texte**, au lieu de remplissage vide surdimensionné.
- L'édition d'infobulle a des limites de canevas plus claires, des contrôles de taille et de l'espace pour placer temporairement des éléments en dehors du canevas. Seuls les éléments entièrement à l'intérieur du canevas de sortie sont enregistrés.
- Amélioration de l'enregistrement, du chargement et de la réouverture de l'infobulle afin que la conception par défaut ne clignote plus avant la conception précédemment chargée.

## Fixe

- Blocs ordinaires fixes et autres objets non portables affichés dans la main d'un support d'armure ou d'un joueur lorsqu'un aperçu de l'équipement a été sélectionné.
- Amélioration de la taille et du centre de rotation des aperçus d'objets modifiés, y compris les armes Chevaliers épiques. Réduction de l'écrêtage et correction des causes de scintillement foncé pendant que les éléments tournent.
- Correction des canons TaCZ manquants dans les aperçus des infobulles. Les détails des armes à feu et les pièces jointes installées sont conservés lors de l'affichage de leurs modèles.
- Correction des arrière-plans des emplacements d’objets qui restaient petits lorsque leur boîte à infobulles était agrandie.
- Correction des noms d'onglets créatifs recevant incorrectement la mise en page de l'infobulle personnalisée.
- Monnaie fixe apparaissant dans l'inventaire de survie lorsque son option d'affichage de l'inventaire a été désactivée.
- Correction des barres HUD personnalisées retournant aux barres vanille lorsque **F3** était ouvert.
- Correction de l'effet de blessure lorsque le retrait de l'équipement ne faisait qu'abaisser la santé maximale du joueur.
- Amélioration du chargement du modèle PNJ personnalisé pour éviter de montrer brièvement des pièces de modèle et de texture dépareillées.

## Mise à jour

Mettez à jour le serveur et les clients à ** 0.1.5 **. Conservez une copie de votre dossier `config/dochi_rpg_maker` avant de remplacer les fichiers. Utilisez **Save As** lors de la personnalisation des modèles groupés.
