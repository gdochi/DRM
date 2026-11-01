---
title: Battle Scheduler
slug: cobblemon-battle-scheduler
order: 534
description: Connectez clone apparition, intro/bataille/résultat scènes et l'admission de la zone en une seule course.
product: drm-cobblemon-editor
category: Battle Scheduler
section: scheduler
status: Guide d'utilisation
version: Fabric / NeoForge 0.2.9
audience: Créateurs de rencontres / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Choisissez le PNJ qui entre dans la bataille

Choisissez un clone d'éditeur ou un modèle de PNJ dans **Actor**. Pour réutiliser un formateur DNPC, enregistrez-le d'abord avec son rôle dans [ Clone Library ](#drm-cobblemon-editor/cobblemon-clone-library-spawner), puis connectez les positions d'arène et les scènes de séquence. Les clones CustomNPCs et les modèles DNPC existants utilisent différents formats; les noms correspondants ne les rendent pas interchangeables.

## Ce qu'il relie

Le planificateur exécute **PNC clone fray → scène d'introduction → présentation de bataille → Cobblemon bataille → récompenses existantes/progression → scène de résultat → nettoyage de l'acteur et sortie **. Il est disponible en Fabric et NeoForge Cobblemon Editeur 0.2.9 pour Minecraft 1.21.1. RCT est facultatif.

Le clone fournit le PNJ et l'apparence; Entraîneur ou Pokémon lui-même JSON fournit des paramètres de combat. Scene Maker fournit des scènes d'intro/résultat, tandis que Battle Presentation Maker fournit l'entrée de la bataille. L'exécution d'un planificateur ne modifie pas le clone enregistré.

![Planificateur avec Acteur, Aréna, Séquence, Politique, Prévisualiser, Valider et Exécuter.](assets/media/guides/cobble-029-neo1211/cobble-scheduler.png "0.2.9 / NeoForge 1.21.1. Sélectionnez une source d'acteur, puis connectez les positions d'arène, les scènes de séquence et les déclencheurs de stratégie. Activé seul n'engendre pas d'acteur.")

## Créer une première rencontre

1. Préparez un clone ou un modèle de PNJ et un fichier de combat Pokemon Itself.
2. Ouvrez **Battle Scheduler** dans la liste des éditeurs de l'addon DRM.
3. Dans **Actor**, sélectionnez le clone et choisissez **Use Existing Settings** ou **Apply New JSON**. Utilisez un nouveau JSON lorsque le clone n'a pas de liaison de combat.
4. En **Arena**, configurez l'ID de la pièce, les limites, les positions acteur/joueur/sortie et le parement. Prendre la position actuelle enregistre également son monde.
5. En **Sequence**, connectez l'intro, la présentation de la bataille et les scènes win/loss/flee. Les scènes sont facultatives ; une présentation vide utilise la liaison de combat de l'acteur.
6. Dans **Policy**, définissez la commande/zone/à la fois le déclenchement, l'admission, l'annulation de congé, le temps de recharge, le délai de démarrage et la portée de progression.
7. En **Preview**, jouez/arrêtez et choisissez gagner, perdre ou fuir. Rechargez les références après avoir modifié leurs fichiers.
8. Validez, enregistrez un fichier utilisateur avec `Save As` et utilisez Exécuter pour tester le apparition et la bataille réels.

Aperçu lit les fichiers référencés, l'apparence du clone, les scènes et la présentation. Testez le apparition réel, la victoire et les récompenses avec une véritable course. Chargez les morceaux utilisés par la zone et prévisualisez la caméra.

## Choisissez une région dans le monde

Utilisez **Arena → Select area** pour déplacer la boîte ou faites glisser ses coins, puis appliquez. Esc annule, et les blocs ne sont jamais modifiés. Les limites maximales sont exclusives. Placez les positions de départ acteur/joueur dans la zone et choisissez une sortie utilisable.

Activez **Show scheduler areas** dans Mods Config et maintenez le DRM Core dans Creative pour voir jusqu'à 16 zones à proximité dans 64 blocs. Vert signifie ON, gris OFF et orange en utilisation. L'autorisation d'édition est requise ; les guides sont cachés pendant les scènes ou les batailles. Ce paramètre d'affichage local est distinct du contrôle d'entrée automatique.

## Contrôler l'entrée automatique

Le contrôle ON/OFF de la zone du fichier sauvegardé s'applique immédiatement sur le serveur et persiste entre les redémarrages. OFF arrête les nouvelles admissions automatiques pendant que les batailles actuelles continuent et que le départ explicite reste disponible. Utilisez Annuler pour arrêter une course. L'enregistrement d'un brouillon d'éditeur ne réinitialise pas ce commutateur opérationnel.

```text
/drm battle_scheduler area on "boss_room.json"
/drm battle_scheduler area off "boss_room.json"
/drm battle_scheduler area status "boss_room.json"
```

L'entrée automatique nécessite également un document, une zone ou les deux déclencheurs activés et des limites activées. L'entrée est cochée lorsque le joueur entre ; rester à l'intérieur n'engendre pas d'acteurs à plusieurs reprises.

## Commandes et dialogue

Les commandes d'administrateur ciblent un joueur. Un joueur exécutant la commande peut omettre l'argument du joueur pour se cibler.

```text
/drm battle_scheduler start "boss_room.json" PlayerName
/drm battle_scheduler cancel PlayerName
```

Dans DRM les commandes dialogue/quest, remplacer `PlayerName` par `{player}`. **Copy Command** utilise cette forme. `@player` appartient à display-text replacement, pas à l'argument player de cette commande. Sinon, choisissez l'action de dialogue **Battle Scheduler** et sélectionnez un serveur JSON. Le succès ferme le dialogue, l’échec le maintient ouvert.

## Réservations et nettoyage

Le même joueur, le même identifiant de pièce ou les zones qui se chevauchent dans le même monde ne peuvent pas fonctionner simultanément. Différents fichiers ciblant une pièce partagent la réservation jusqu'à la fin des scènes de résultat et du nettoyage. L'admission en solo rejette les chambres occupées; l'admission du spectateur permet de regarder tout en bloquant une bataille séparée contre l'acteur réservé.

L'annulation, le départ, la déconnexion, la mort, l'échec d'apparition et le délai de démarrage nettoient les scènes et l'acteur engendré et libèrent les réservations. Les PNJ ordinaires ne sont pas supprimés. Les références sont corrigées lors du démarrage d'une exécution, de sorte que les modifications de fichiers prennent effet lors de la prochaine exécution.

## Fichiers et dépannage

| Données | Chemin |
| --- | --- |
| Scheduler JSON | `config/dochi_rpg_maker/cobblemon/battle_schedulers/` |
| État de fonctionnement à entrée automatique | `config/dochi_rpg_maker/cobblemon/battle_scheduler_area_state.json` |

Pour les outils externes, le schéma est `dochi.cobble.battle_scheduler.v1`. Progression est indépendante de l'acteur temporaire UUID; Save As vers un fichier différent crée un ID de progression séparé. Si le démarrage échoue, vérifiez l'autorisation d'édition, les liaisons clone/bataille, les morceaux, les réservations de salle et le temps de recharge.
