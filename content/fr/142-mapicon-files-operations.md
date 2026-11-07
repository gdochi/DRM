---
title: Map Fichiers et dépannage
slug: mapicon-files-operations
order: 1420
description: Emplacements de profil et PNG, limites d'affichage des PNJ en direct et dépannage.
product: dochi-mapicon-integration
category: Fichiers et opérations
section: operations
status: Guide d'utilisation
version: 0.1.3
audience: Créateurs / opérateurs
translationSource: en
translationMethod: assisted
---

## Profils et images

| Données | Chemin d'accès / exemple |
| --- | --- |
| Profils de serveur | `config/dochi_mapicon_integration/*.json` |
| Nom du profil actif | `config/dochi_mapicon_integration/active.txt` |
| DRM serveur PNGs | `config/dochi_rpg_maker/assets/textures/icons/` |
| PNGs groupés installés | `config/dochi_rpg_maker/assets/textures/icons/nikoichu/` |

Placez des PNG personnalisés dans le dossier de texture du serveur et recherchez **Choose Icon → External Images**. `assets/textures/icons/vendor.png` utilise l'ID d'affichage `dochi_rpg_maker:textures/icons/vendor.png`. Les clients utilisent le transfert de texture et le cache de DRM.

Pour un pack de ressources `assets/myserver/textures/icons/vendor.png`, entrez `myserver:textures/icons/vendor.png`. Statique 32×32 ou 64×64 Les PNG sont recommandés; le maximum est 1024×1024. Les images manquantes ou en attente utilisent l'icône PNJ par défaut. L'initialisation du serveur installe uniquement les PNG groupés manquants et préserve les fichiers existants.

MapIcon 0.1.3 réutilise les images et les marqueurs JourneyMap inchangés. Après avoir remplacé un PNG de pack de ressources sous le même identifiant de ressource, rechargez les packs de ressources pour actualiser l'image sur les cartes.

## Limites d'affichage en direct

Seuls les PNJ chargés par le serveur dans la dimension du joueur sont affichés : dans les blocs 4096, les plus proches en premier, jusqu'à 512 entrées. Le serveur se met à jour toutes les secondes ; les clients qui suivent une entité utilisent sa position réelle.

Déchargement, mort, changement de dimension et déconnexion des entrées obsolètes. La version 0.1.3 ne stocke pas les POI fixes ou les derniers emplacements connus pour les PNJ déchargés. Les PNJ gérés suppriment leur marqueur radar Xaero normal pour réduire les doublons. Le mode Xaero Fair Play ne dessine pas le calque minimap addon.

![Le marqueur DNPC reçu rendu sur la minicarte réelle de Xaero.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "MapIcon 0.1.2 / NeoForge 1.21.1 / Minicarte de Xaero 26.6.0. L'humanoïde bleu au-dessus du marqueur du joueur blanc représente le PNJ visible dans le monde. Vérifiez la carte réelle après l'enregistrement, ainsi que l'aperçu de l'éditeur.")

## Dépannage

| Symptôme | Vérifier |
| --- | --- |
| Aucune icône | Prise en charge de Xaero / XaeroLib ou JourneyMap 6, affichage global, bascule de carte, PNJ chargé, dimension et distance |
| Caché pour un seul joueur | DRM Conditions de visibilité des PNJ, par PNJ Masquer et une règle correspondante désactivée |
| Icône inattendue | surcharge par PNJ, chemin JSON, priorité de règle et ordre type-default |
| Marqueurs dupliqués | Si l'addon gère ce PNJ et la compatibilité de la compilation Xaero installée |
| Conflit d'enregistrement | Utilisez **Reload saved settings**, puis réappliquez les modifications ; un autre éditeur a peut-être modifié le profil ou le PNJ sélectionné |
| Les icônes disparaissent au loin | Les PNJ déchargés sont en dehors de la portée actuelle de l'affichage en direct |

L'édition, la navigation dans les fichiers et la sauvegarde nécessitent un niveau d'autorisation 2, tandis que les joueurs ordinaires peuvent afficher les icônes de la carte. Sauvegardez les profils cartographiques, les ressources DRM et les données PNJ du monde entier.
