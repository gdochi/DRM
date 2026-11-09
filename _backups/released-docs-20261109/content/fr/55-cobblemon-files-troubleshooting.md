---
title: Chemins de fichiers et dépannage
slug: cobblemon-files-troubleshooting
order: 550
description: Trouvez des fichiers JSON d'addon, protégez les valeurs par défaut, comprenez la priorité d'interaction avec les PNJ et exécutez les vérifications de version.
product: drm-cobblemon-editor
category: Opérations
section: operations
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Opérateurs de serveur et éditeurs de contenu
tags:
  - paths
  - troubleshooting
  - release
translationSource: en
translationMethod: assisted
---


## Vérifiez d'abord le fichier enregistré et la liaison PNJ

**Save As stocke un fichier serveur ; NPC Apply attache un rôle à un PNJ mondial.** Si le fichier existe mais que le PNJ est inchangé, vérifiez son rôle sélectionné et son chemin source. Appliquer les formateurs via [NPC Apply vs Trainer](#drm-cobblemon-editor/cobblemon-trainer-editor) ; des rôles tels que Starter Selector fournissent leur propre bouton Appliquer au PNJ.

![Sélecteur de démarrage enregistré comme custom/village_starters.json.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1. Fichier actuel sur la gauche et enregistré ci-dessous confirment l'enregistrement du fichier. Cela appartient à starter_selectors, un domaine différent des fichiers Trainer.")

## Save-path map

Tout JSON édité par le serveur commence sous `config/dochi_rpg_maker`.

| Chemin | Contenu |
| --- | --- |
| `cobblemon/trainers/` | Équipes de formateurs, rondes, rencontres, conditions et récompenses |
| `cobblemon/pokemon_itself/` | Single-Pokémon batailles et apparition de PNJ |
| `cobblemon/battle_presentations/` | Présentations du calendrier pré-bataille |
| `cobblemon/pokemarts/` | Documents de vente, commerce et vente aux enchères |
| `cobblemon/nurse_joy/` | Nurse Joy documents |
| `cobblemon/starter_selectors/` | Documents du sélecteur de démarrage |
| `cobblemon/entity_clones/` | Addon Clone Library magasin de compatibilité |
| `npc_spawner/entity_clones/` | DRM Core NPC Spawner clone store |
| `gui/` | PokéMart et Starter Selector dans le jeu |
| `cobblemon/_migration_backups/` | Sauvegardes effectuées lorsque les valeurs par défaut canoniques sont mises à niveau en toute sécurité |

`Save As` accepte un chemin relatif dans le domaine courant. L'enregistrement du chemin de l'entraîneur `custom/gym/leader.json` crée :

```text
config/dochi_rpg_maker/cobblemon/trainers/custom/gym/leader.json
```

## Valeurs par défaut et échantillons

Le premier lancement installe des échantillons d'entraînement et de rencontre, des équipes championnes, des échantillons Pokemon Itself, des préréglages et des échantillons de présentation de combat, des échantillons de rôle PokéMart et des interfaces graphiques d'exécution spécifiques au rôle.

Les fichiers manquants sont installés sans écraser le contenu utilisateur. Un défaut canonique connu n'est mis à niveau que lorsque son hachage actuel correspond exactement à une ancienne version intacte reconnue. Avant le remplacement, l'addon crée :

```text
config/dochi_rpg_maker/cobblemon/_migration_backups/canonical_defaults_<timestamp>/
```

:::warning Séparer le contenu utilisateur
Les valeurs par défaut et les échantillons sont des points de départ. Enregistrez le contenu du projet sous un chemin d'accès utilisateur tel que `custom/` afin que les mises à jour d'addon et le contenu créé restent clairement séparés.
:::

## Priorité PNJ clic droit

L'interaction d'exécution normale utilise un clic droit sur la main principale alors que les deux mains sont vides.

| Priorité | Rôle attaché | Résultat |
| --- | --- | --- |
| 1 | DRM Dialogue ou DRM NPC Shop | Le dialogue DRM ou la boutique possède l'interaction |
| 2 | PokéMart | Ouvre l'écran PokéMart dans le jeu |
| 3 | Entraîneur ou Pokémon lui-même | Ouvre la confirmation de bataille |
| 4 | Pas de rôle addon | Passe à une autre interaction mod ou normale CustomNPCs |

Un élément de base ou un autre outil de configuration conserve son propre chemin d'édition, de sorte qu'il n'ouvre pas l'invite de bataille. Vider à la fois la main principale et offhand pendant les tests d'exécution.

## Problèmes courants

### Le fichier enregistré, mais le PNJ n'a pas changé

Pokemon Itself, PokéMart, Nurse Joy et Starter Selector suivent leur chemin JSON original. Confirmez que le PNJ est lié au fichier que vous avez modifié, puis ouvrez une nouvelle demande d'exécution. Utilisez `/drm reload` après avoir modifié les fichiers en dehors du jeu. Appliquez à nouveau lorsque vous modifiez le chemin ou le rôle source.

### Le fichier est manquant dans Load

- Faites correspondre le domaine de l'éditeur actuel au dossier réel.
- Les entraîneurs appartiennent à `trainers/`; les documents Pokémon lui-même appartiennent à `pokemon_itself/`.
- Confirmez que le fichier a une extension `.json`.
- Si les fichiers ont été édités en dehors du jeu, utilisez le workflow de rechargement de DRM ou redémarrez le serveur en toute sécurité.

### L'interaction à la main vide n'ouvre pas une bataille

- Vider les deux mains.
- Confirmez que les données du Dresseur ou de Pokémon lui-même sont appliquées au PNJ.
- Vérifiez si DRM Dialogue, DRM NPC Shop ou PokéMart est le propriétaire de l'interaction en premier.
- Confirmez que le joueur n'est pas déjà dans une bataille Cobblemon.
- Confirmez que la bataille d'un autre joueur n'a pas réservé le PNJ.

### Vision ou Rayon ne déclenche pas

- Les joueurs créatifs et spectateurs sont exclus de la détection automatique.
- Confirmez que le déclencheur n'est pas encore `Interaction`.
- Vérifiez la distance de vision, l'angle de vision, le rayon et la ligne de visée.
- Vérifiez les conditions rondes, les limites de match revanche et le temps de recharge.
- Vérifiez la distance et la durée de Chase Max.
- Max Distance compare les positions actuelles du PNJ et du joueur cible à chaque tick du serveur ; le point d'origine capturé est utilisé uniquement par Return Home et Battle Positioning.

### Une présentation de combat ne se charge pas

- Utilisez un chemin relatif à `battle_presentations/`.
- Gardez les identifiants de calque uniques.
- Utilisez des ID de ressource Minecraft valides pour les textures et les sons.
- Garder la case de début à ou en dessous de la case de fin et les deux dans la durée.

### Le paiement PokéMart échoue

- Associez le fournisseur de devises à la devise mod ou DRM installée.
- Installez CobbleDollars avant d'utiliser `cobbledollars`.
- Pour la devise de l'élément, l'ID de l'élément de correspondance et le NBT facultatif exactement.
- Vérifiez si les conditions d'interaction bloquent l'accès.

## Liste de contrôle préliminaire

1. Démarrez un serveur et une instance client propre sans erreurs de dépendance.
2. Confirmez les valeurs par défaut et les exemples s'installent dans une nouvelle configuration.
3. Enregistrez, appliquez, entrez et terminez une bataille d'entraîneurs et une bataille de Pokémon.
4. Testez l'interaction, la vision et le rayon avec un joueur en mode Survie.
5. Après avoir gagné, perdu et fui, vérifiez correctement l'apparence, la position, le son et l'état du joueur Pokémon.
6. Testez la lecture de la présentation, le saut, la musique de combat, la petite échelle GUI et différents rapports d'aspect.
7. Testez les ventes, le commerce et les enchères avant et après le redémarrage du serveur.
8. Inclure l'utilisateur JSON et `_migration_backups` dans la stratégie de sauvegarde du serveur.
9. Confirmez que la release JAR est `dochi_cobblemon_editor-0.2.6-fabric-1.21.1.jar` ou `dochi_cobblemon_editor-0.2.6-neoforge-1.21.1.jar` pour le chargeur sélectionné ; le mod ID interne reste `cobble_npc`.

## Sauvegardes d'identité et de quête du formateur

`cobblemon/trainer_registry.json` et `cobblemon/trainer_registry.initialized` préservent l'identité du formateur. Sauvegardez-les avec des profils d'entraîneurs, des packs de quêtes et la progression des joueurs du monde. Les noms de fichiers correspondants ou les noms d'affichage PNJ seuls n'identifient pas le même formateur.

Le codec actuel de Trainer/Pokemon lui-même utilise le schéma 23. Les documents plus anciens se chargent via la conversion de compatibilité ; les documents sans identité commencent sans lien. Liez l'identité dans l'éditeur au lieu de modifier manuellement uniquement le numéro de schéma.

## Vérification des données d'inventaire copiées

Après avoir copié à partir de `My Inventory`, enregistrez et rechargez le formateur et vérifiez le nom de l'élément et les données personnalisées. Si une modification de quantité semble perdre ces détails, vérifiez si vous avez créé une entrée ID d'élément simple à la place, puis sélectionnez à nouveau la pile d'origine. Une copie rejetée pour des données non valides ou surdimensionnées n'est pas ajoutée au document.
