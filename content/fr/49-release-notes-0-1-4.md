---
title: Quoi de neuf dans 0.1.4
slug: release-0-1-4
order: 10
description: La fonction vérifiée, le comportement, la dépendance et la migration passent de Forge 0.1.3 à 0.1.4.
product: core
category: Premiers pas
section: getting-started
status: Stable
version: 0.1.4
audience: Créateurs / Opérateurs
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Il s'agit d'un record de libération historique. Voir [DRM 0.3.1](#core/release-notes-0-3-1) pour les orientations actuelles.

## Trouver la création de quêtes

Créez une catégorie et une quête, puis définissez le titre et le comportement de début/achèvement sous Info. Les objectifs contiennent la tâche ; les récompenses contiennent le paiement. Suivez le guide de quête actuel pour l'accepter et le compléter. Continuer avec le [guide actuel](#core/quest-system) pour l'épargner et l'appliquer.

![Trouvez la création de quêtes.](assets/media/guides/drm-031-forge1201/quest-info.png "DRM 0.3.1 / Forge 1.20.1. Il s'agit de la fonctionnalité connexe dans la version de production actuelle, et non d'une capture de l'interface utilisateur historique décrite ci-dessous.")

## Portée de la libération

0.1.4 ajout d'outils pour les quêtes, les statistiques des joueurs, les objets personnalisés, les téléporteurs et les popups. Les conversations et les magasins pourraient être connectés à des récompenses de quête et à des destinations de voyage.

## Nouveaux systèmes de création

| Système | Ce que 0.1.4 ajoute |
| --- | --- |
| Quest | Packs de quêtes, chapitres/catégories, objectifs, récompenses, prérequis, règles de répétition/complétion, `After Complete` et le journal `U`. |
| Stat Builder | Ensembles de statistiques personnalisés, coûts ponctuels, effets d'attributs, sélection d'ensembles actifs, UI d'allocation `Y` et `Go Stat Builder`. |
| Éditeur | DRM éléments de base de données, catégories, raretés, info-bulles, exigences, bonus, attributs et mise à l'échelle. |
| Faction | CustomNPCs présentation de la faction, ordre, styles d'état et vue d'ensemble du joueur. |
| Téléporteur | Catégories, destinations, conditions, commandes, fondus, sons et liaison PNJ. |
| Popup | Définitions de fenêtres contextuelles réutilisables, politique de conflit/timing, disposition de l'interface graphique, invocation de commandes/scripts. |
| Admin | Outils de quête, d'avancement, de faction, de balise et de données stockées DRM/FTB à la portée du joueur. |

## Changements de comportement importants

- CustomNPCs est maintenant une dépendance client-serveur requise.
- Les exigences en matière de statistiques ne rejettent plus les équipements. Lorsqu'il n'est pas atteint, `Unmet penalty %` supprime ce pourcentage de la contribution stat/attribut/scaling configurée de l'élément.
- Les actions d'événement de quête sont intentionnellement limitées à `After Complete`. Ils courent une fois que les récompenses ont réussi et que la quête est terminée.
- Le sélecteur de texture utilise la sélection explicite plus `Apply` ; la pagination ou le filtrage n'écrit pas à la cible.
- Les métadonnées d'animation compagnon `texture.png.mcmeta` valides sont transférées avec des ressources PNG personnalisées.
- Les raccourcis de l'éditeur partagé utilisent `Ctrl+S`, `Ctrl+Z` et `Ctrl+Y`/`Ctrl+Shift+Z` où l'éditeur prend en charge l'historique d'annulation.

## Liste mise à jour

1. Remonter `config/dochi_rpg_maker`.
2. Installez 0.1.4 et l'assortiment CustomNPCs sur le serveur et chaque client.
3. Commencez une fois et passez en revue l'interface graphique par défaut, la quête, la statistique, l'objet, le téléporteur et les modèles de popup.
4. Conservez le contenu de la production sous ID personnalisés ; commencez à partir des valeurs par défaut protégées avec `Save As`.
5. Vérifiez le chevauchement du HUD si les jauges de données Spells de fer, Combat Roll ou CustomNPCs sont activées.
6. Testez la livraison de récompense de quête et les actions `After Complete` sur un joueur de staging avant utilisation en production.

:::warning Données par défaut
Les valeurs par défaut groupées sont des modèles de référence et peuvent être actualisées par la version installée. Ne traitez pas un `default_*` ou un exemple de fichier comme la seule copie du travail de production.
:::
