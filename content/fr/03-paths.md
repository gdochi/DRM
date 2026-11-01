---
title: Dossiers et chemins
slug: paths
order: 40
description: Dossiers et chemins pour Forge DRM 0.2.1.
product: core
category: Premiers pas
section: getting-started
status: Stable
version: 0.3.1
audience: Créateurs et opérateurs de serveurs
translationSource: en
translationMethod: assisted
---

## Où est la conversation que j'ai enregistrée ?

En mode solo, ouvrez le dossier ** du jeu pour votre instance de lanceur actuelle **. En mode multijoueur, utilisez le dossier ** du serveur connecté**. Les fichiers de création y vivent sous `config/dochi_rpg_maker/`.

Pour **Dialogue Editor → Save As → village_guide**, regardez dans `config/dochi_rpg_maker/dialogue_sets/village_guide/`. Un ensemble de conversation est un dossier : copiez le **Dossier entier** lors du transfert vers un autre serveur.

![Dialogue Editor affiche le chemin d'accès au dossier de la conversation enregistrée.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. Après Save As, SET FOLDER / OUTILS affiche le dossier actuel. Utilisez ce chemin pour identifier la bonne instance.")

## Fichiers à apporter pour chaque tâche

Tous les chemins ci-dessous sont à l'intérieur `config/dochi_rpg_maker/`. Trouvez le nom que vous avez réellement enregistré dans l'éditeur.

| Ce que vous avez fait | Emplacement | Amenez-le |
| --- | --- | --- |
| Dialogue PNJ | `dialogue_sets/village_guide/` | Dossier complet et interface graphique liée, boutique ou quêtes |
| Boutique PNJ | `npc_shops/village_shop.json` | Monnaie, GUI et mods d'objet qu'il utilise |
| Dialogue/mise en page du magasin | `gui/` | Images et textures de référence |
| Type de monnaie | `currency/definitions/town_coin.json` | Magasins et HUD utilisant cette devise |
| HUD | `hud/sets/guide_hud/` | hud_set.json et composants/. Sélection active: hud/active_set.json |
| Quêtes | `quests/<pack-name>/` | pack.json et des quêtes individuelles sous quêtes/ |
| Statistiques | `stats/sets/` | Sélection active stats/active_set.json |
| Bases de données | `items/definitions/` | Règles d'écriture items/editor_settings.json |
| Destinations de voyage | `teleporters/` | Ensemble de destination et interface graphique liée |
| Popups | `popups/definitions/` | Afficher les stratégies sous popups/politiques/ si utilisé |
| Messages du monde | `remnant_msg/messages/` | remnant_msg/politiques/ et GUI lié |
| Créateur PNGs | `assets/textures/` | Correspondance .png.mcmeta pour textures animées |
| Affichage des factions | `factions/` | Paramètres et préréglages requis |
| Paramètres par défaut/partagés | `settings/` | Vérifiez les paramètres que vous avez modifiés avant de les déplacer |

Les modèles de PNJ DNPC utilisent un dossier **séparé **, `config/dochi_npc_core/templates/`. Voir [sauvegarde des PNJ](#dochi-npc-core/npc-core-templates). Vérifiez le guide de stockage de chaque addon pour BattleWorks, Spawn Control et d'autres fichiers d'addon.

## Le fichier a été déplacé, mais le PNJ n'a pas changé

Les fichiers de création et les PNJ du monde sont séparés. Sur le serveur de destination, vérifiez le fichier, puis **clic droit sur le PNJ avec DRM Principaux → sélectionnez le fichier → Appliquer**. Apportez également des photos et des magasins référencés.

Voir [sauvegarde et l'application PNJ](#core/core-concepts) pour les boutons. Sauvegardez **config et world enregistre ensemble** lors du déplacement ou de la restauration d'un serveur entier ; les fichiers de création seuls ne restaurent pas le placement, les générateurs et la progression des PNJ.

## Un fichier enregistré est manquant dans la liste

1. Vérifiez le dossier de jeu réel du serveur. Une copie client uniquement n'apparaît pas dans la liste des serveurs.
2. Utilisez le dossier approprié pour une conversation, une boutique ou un fichier GUI.
3. Ouvrir **Load / Refresh** et effacer les filtres de recherche.
4. Utilisez **Save As** avec votre propre nom lors de la personnalisation d'un exemple groupé.

Entrez des noms tels que `village_shop.json` dans les champs de nom de fichier de l'éditeur ; l'éditeur sélectionne déjà son propre dossier de stockage. Pour les modifications de fichiers externes, voir [rechargement du travail enregistré](#core/core-concepts).
