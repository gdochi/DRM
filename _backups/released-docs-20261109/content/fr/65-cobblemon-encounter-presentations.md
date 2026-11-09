---
title: Wild, RCT et PvP Présentations
slug: cobblemon-encounter-presentations
order: 535
description: Lier les scènes enregistrées pour rencontrer des catégories et des exceptions individuelles.
product: drm-cobblemon-editor
category: Présentation du combat
section: presentation
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs et opérateurs
translationSource: en
translationMethod: assisted
---

## Créez une scène, puis liez-la

`Battle Presentation Maker` Scènes d'auteurs. **Encounter Presentations** relie séparément les scènes sauvegardées aux batailles wild Pokémon, RCT et JcJ ordinaires. Trouvez-le directement ci-dessous Battle Presentation dans la liste des éditeurs d'addons DRM.

1. Enregistrer une scène en [Présentation de la bataille ](#drm-cobblemon-editor/cobblemon-battle-presentation).
2. Ouvrez Encounter Presentations et sélectionnez Wild, RCT ou PvP.
3. Activez le commutateur global de cette catégorie et sélectionnez une scène JSON de serveur.
4. Ajoutez des exceptions d'espèces sauvages ou d'entités RCT si nécessaire.
5. Sauvez et vérifiez la prochaine bataille.

La nouvelle catégorie passe par défaut à OFF. Les formateurs PNJ existants conservent leurs propres paramètres de présentation du formateur sans double lecture. RCT L'API reste facultative.

| Réglage | Résultat |
| --- | --- |
| Global OFF | Désactivé même lorsqu'une règle individuelle est activée |
| Global ON, individuel OFF | Désactivé pour cette cible |
| Global ON, individuel ON ou absent | Activé |
| Ensemble de chemin de scène individuel | Utilise la scène individuelle |
| Chemin individuel vide | Hériter de la scène mondiale |
| La voie globale est également vide | Utilise la scène par défaut de la catégorie de combat |

Utilisation des exceptions sauvages **ID d'espèce**, comme `cobblemon:pikachu`, plutôt que des entités individuelles du monde. RCT utilisation des exceptions **entité mondiale UUIDs**. Le JcJ ne fournit qu'un commutateur global et un chemin de scène, sans exceptions par joueur.

![Pokémon, Formateurs et liaison de présentation PvP avec les valeurs par défaut de la catégorie.](assets/media/guides/cobble-029-neo1211/cobble-encounters.png "0.2.9 / NeoForge 1.21.1. Le top OFF d’une catégorie la désactive complètement. Choisissez son fichier partagé sous Présentation globale de la catégorie, puis sélectionnez une entrée pour un remplacement individuel.")

## PvP et skiping

Le JcJ à deux joueurs avec un joueur de chaque côté prend en charge les formats simples et doubles. Deux contre deux batailles multiples sont en dehors de ce flux de travail de présentation. Chaque participant se considère comme un joueur et son rival comme un adversaire.

Pour une scène sautable, le saut d'un participant ne raccourcit pas la minuterie de l'autre. Les deux sauts peuvent commencer la bataille plus tôt. Le serveur possède le timing, bloque les demandes des participants qui se chevauchent et permet aux batailles indépendantes de se dérouler simultanément.

## Stockage et dépannage

```text
config/dochi_rpg_maker/cobblemon/encounter_presentations/settings.json
config/dochi_rpg_maker/cobblemon/battle_presentations/
```

Le premier fichier stocke les reliures ; le dossier stocke les scènes. Transférez les scènes référencées avec leurs liens et sélectionnez les chemins du serveur, pas les fichiers locaux du client.

Si la lecture est manquante, cochez la catégorie global switch → individuel OFF rule → JSON path → real battle category. Les images et les sons personnalisés doivent également exister dans les packs de ressources client. Les builds actuelles corrigent les demandes répétées de Load-list qui ont épuisé le budget de lecture partagé. Pour les erreurs `rate limited` répétées sur les anciennes versions, alignez le serveur et les clients sur la version actuelle de leur chargeur.
