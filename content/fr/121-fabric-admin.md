---
title: DRM Administration
slug: drm-administration
order: 140
description: Inspectez l'état du joueur et effectuez les modifications autorisées par DRM Admin.
product: core-fabric
category: Opérations
section: operations
status: Stable
version: 0.3.1
audience: Opérateurs de serveur
tags:
  - admin
  - operations
translationSource: en
translationMethod: assisted
---

## Activer l'outil serveur en premier

Une nouvelle stratégie de serveur commence par DRM Admin **OFF**. F7 ne peut pas l'ouvrir dans cet état, même pour un opérateur.

1. Rejoignez le monde ou le serveur et faites un clic droit dans les airs avec DRM Core.
2. Ouvrez **Default Configs → Admin** en bas du sélecteur d'éditeur.
3. Allumez **Enable DRM Admin** et cliquez **Apply**.
4. Attendez **Saved and applied on the server**.
5. Fermez les paramètres et appuyez sur **F7**. La modification de cette stratégie nécessite une autorisation de l'opérateur de niveau 2 ou supérieur.

![Activation de DRM Admin et application de sa stratégie serveur.](assets/media/guides/drm-031-neo1211/admin-server-policy.png "DRM 0.3.1 / NeoForge 1.21.1. Appliquer effectivement enregistré activé: true en config/dochi_rpg_maker-admin.json et a reçu l'accusé de réception du serveur. Cette stratégie est distincte de l'activation du raccourci clavier.")

Si F7 ne fait rien, vérifiez également **Keyboard shortcuts → Open DRM Admin** et les liaisons de clé Minecraft. Le fichier de stratégie du serveur est `config/dochi_rpg_maker-admin.json`, en dehors du dossier `config/dochi_rpg_maker/`.

## Choisissez un lecteur et une catégorie de données

Lire les panneaux de gauche à droite: **Players → Data categories → Data list → Edit tools**. Sélectionnez d'abord le joueur, puis une catégorie telle que Tags, DRM Quêtes ou Monnaie. Cliquer sur une ligne de données ouvre ses détails sur la droite.

![Le joueur sélectionné en DRM Admin Overview.](assets/media/guides/drm-031-neo1211/admin-overview.png "DRM 0.3.1 / NeoForge 1.21.1. Ceci est le lecteur de documentation unique DocsGuide. Les factions, les quêtes FTB, les batailles d'entraîneurs et les données stockées sont indisponibles car leurs intégrations sont absentes dans cet environnement.")

**Checkboxes mark mutation targets** ; la ligne bleue sélectionnée choisit les détails affichés. La suppression par lots et les réinitialisations agissent sur les entrées vérifiées. Vérifiez les résultats de la recherche et le lecteur avant de tout sélectionner.

## Vérifier un dossier cadeau unique

Si la [conversation de récompense unique](#core/dialogue-rewards) montre le mauvais état du cadeau, trouvez `welcome_received` dans celui de ce joueur **Tags**. Sa présence signifie que la condition de réclamation est remplie. Retirer l'étiquette pour un autre test ne reprend pas les pommes précédemment accordées. Aucune donnée sur un nouveau joueur signifie qu'aucune balise n'existe encore. Saisissez un nom sous Tag à ajouter et cliquez sur Ajouter pour en créer un ; vérifiez une balise existante avant de la supprimer.

![welcome_received ajouté par DRM Admin et confirmé par le serveur.](assets/media/guides/drm-031-neo1211/admin-tag-added.png "DRM 0.3.1 / NeoForge 1.21.1. En entrant welcome_received sous Tag pour ajouter et en cliquant sur Ajouter, vous créez cette ligne. Le serveur a été confirmé et la balise de lecteur de serveur a été vérifiée. Supprimer est désactivé car la ligne n'est pas cochée.")

## État réinitialisé versus édition de contenu

| Tâche | Outil ou effet |
| --- | --- |
| Modifier le dialogue, les produits, les objectifs ou les récompenses | Modifier et appliquer le document dans son éditeur de création |
| Inspecter les balises, les soldes ou l'état de quête | Sélectionnez le lecteur et la catégorie en DRM Admin |
| Réinitialiser une quête | Modifie la progression ; ne récupère pas automatiquement les objets accordés ou l'argent |
| Changement FTB Quêtes progrès | Peut affecter l'équipe du joueur |
| Changer DNPC relations amicales/hostiles | Utilisez les relations DNPC ; celles-ci diffèrent de CustomNPCs. |

CustomNPCs Les factions et les données stockées s'appliquent aux anciennes cibles Minecraft prises en charge. CustomNPCs est exclu le 26.3.

## 0.2.8 administration

Les changements par lots montrent des progrès. Sur Fabric / NeoForge, un éditeur compatible Cobblemon enregistre l'inspection de la progression de l'entraîneur et les réinitialisations du compte de victoire. Ces outils nécessitent l'addon. Dans l'addon actuel, la réinitialisation du compte de bataille libère également un PNJ après la bataille. Vérifiez le lecteur cible, le PNJ et réinitialisez la portée.

## Supprimer l'historique des combats d'entraîneurs — 0.2.9

Utilisez-le avec un éditeur compatible Cobblemon sur Fabric/NeoForge 1.21.1. Sélectionnez le joueur et les enregistrements dans Combats de Dresseurs, puis choisissez **Delete battle history**.

- **Reset battle count** conserve les marqueurs de récompense et l'historique.
- **Delete battle history** supprime l'enregistrement complet de l'ID de progression du joueur sélectionné, y compris les nombres, le dernier résultat, l'ID de bataille, les marqueurs de récompense et les récompenses en attente. Les récompenses en attente peuvent être perdues et les récompenses précédemment réclamées peuvent redevenir remboursables.

Lisez la confirmation avant de postuler. Les batailles actives ou les réservations d'entraîneurs rejettent la suppression. Les cibles hors ligne utilisent le flux de travail d'exploitation en file d'attente existant. Les addons sans historique de suppression laissent ce bouton indisponible ; la réinitialisation du compte reste disponible.

`Unknown trainer` ou ClearCount 0 n'établit pas d'enregistrement orphelin : le PNJ peut être déchargé, les données d'identité historiques peuvent être manquantes ou l'historique peut rester après une réinitialisation du compte. Il n'y a aucun nettoyage automatique. Réviser manuellement les identifiants définitivement retirés. Cette opération ne supprime pas les entités PNJ ou formateur JSON.
