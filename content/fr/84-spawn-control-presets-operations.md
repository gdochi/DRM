---
title: Préréglages, partage et opérations
slug: dochi-spawn-control-presets-operations
order: 850
description: Enregistrez et chargez la stratégie, les chemins de stockage, les conflits de cibles, le partage et le dépannage.
product: dochi-spawn-control
category: Préréglages et opérations
section: operations
status: Guide
version: 0.1.5
audience: Opérateurs de serveurs et distributeurs de contenu
tags:
  - presets
  - troubleshooting
translationSource: en
translationMethod: assisted
---

## Enregistrer le comportement

Le tableau suivant décrit l'éditeur **natural-spawn**. L'enregistrement et l'application du pion placé sont expliqués séparément ci-dessous.

| Mesures prises | Résultat |
| --- | --- |
| `Save` | Stocker et appliquer immédiatement le brouillon comme actif `spawn_control.json` |
| `Save As → Complete Set` | Enregistrez chaque règle, stratégie native et budget global du planificateur en tant qu'ensemble nommé et activez-le |
| `Save As → Current Target Preset` | Enregistrez tous les profils de l'entité ou du clone actuel ainsi que sa politique native recommandée |
| `Reset` | Retour à la ligne de base reçue lors de l'ouverture ou de la dernière mise à jour de l'éditeur après l'enregistrement |
| `Create New` | Démarrer un brouillon de jeu vide sans modifier la configuration active du serveur jusqu'à l'enregistrement |

Un paramètre prédéfini cible exclut les budgets globaux du planificateur. Cela permet aux règles d'une créature de se déplacer entre les serveurs sans remplacer le budget de fonctionnement du serveur de destination.

## Déplacer uniquement les règles de la vache vers un autre serveur

Trouvez `minecraft:cow` dans le catalogue natural-spawn et utilisez **Add Rule**. Terminez ses conditions, puis appuyez sur **Save As** pour choisir la portée.

![Le sélecteur de portée Save As offre un ensemble complet et un préréglage de cible actuel.](assets/media/guides/spawn-control-014-neo1211/spawn-preset-scope.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Complete Set déplace la configuration du serveur ; Current Target Preset déplace uniquement les règles pour la cible de vache sélectionnée.")

Choisissez **Current Target Preset**, entrez **Display Name** `Meadow Cows` et **Stable ID** `meadow_cows`, puis appuyez sur **Save As**. La réponse `Target preset saved. The active set was not changed.` confirme l'économie. **Cette opération ne modifie pas les règles actives du serveur.** Retournez dans l'éditeur et utilisez le haut **Save** pour activer le brouillon ici aussi.

![Réussir la sauvegarde de la cible meadow_cows prédéfinie.](assets/media/guides/spawn-control-014-neo1211/spawn-target-preset-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Le fichier targets/meadow_cows.json a été vérifié. Afficher Name étiquette la liste ; l'ID stable identifie le fichier.")

Mettez le fichier dans le `targets/` du serveur de destination, puis sélectionnez-le sous **Load → Target Presets**. Utilisez la politique de conflit ci-dessous pour remplacer les règles existantes sur les vaches ou les conserver.

## Chemins de stockage

La création de documents se trouve dans le répertoire partagé `config` sous le dossier de travail du jeu ou du serveur. En mode solo, il s'agit du répertoire `minecraft` de l'instance, partagé par les mondes dans cette instance. En multijoueur, utilisez le dossier du serveur connecté. Les fichiers copiés uniquement vers le client n'apparaissent pas dans la liste des serveurs.

```text
config/dochi_rpg_maker/spawn_control/
├─ spawn_control.json
├─ spawn_control.json.bak
├─ sets/
│  └─ <set-id>.json
├─ targets/
│  └─ <target-preset-id>.json
└─ spawners/
   └─ examples/mixed.json
```

La configuration active et les préréglages Natural Spawn utilisent le remplacement temporaire du fichier et conservent la destination précédente en tant que `.bak`. Spawner JSON utilise également le remplacement de fichier temporaire, mais ne crée pas de `.bak` automatique ; sauvegardez-le séparément.

## Enregistrer et appliquer le géniteur JSON

`Save` dans `Spawner Editor` enregistre uniquement le document de création. Cliquez avec le bouton droit sur le générateur placé avec DRM Core, sélectionnez le fichier enregistré, puis cliquez sur `Apply JSON` pour modifier ce générateur. La modification d'un fichier ne met pas automatiquement à jour tous les générateurs précédemment configurés à partir de celui-ci.

Partager JSON de `spawners/` avec ses dépendances. Il n'intègre pas de clones de serveur CNPC ou de modèles DW. Fournissez également des mods fournissant des entités, des modèles, des particules et des sons référencés.

### La liste des fichiers gearer est vide

Vérifiez le dossier `config/dochi_rpg_maker/spawn_control/spawners/` du serveur, puis cliquez sur `Refresh`. World serverconfig n'est pas l'emplacement de création. Effacer les filtres de recherche et vérifier le JSON pour les erreurs.

### Un générateur placé ne fonctionne pas

Un nouveau générateur est inactif jusqu'à ce que JSON soit appliqué. Vérifiez `Enabled`, les conditions du joueur et du joueur créatif, le temps, l'espace de placement et les capuchons d'apparition. Un mod ou un clone manquant requis par une entrée de chance positive peut suspendre ce géniteur. Voir [Conditions et effets Spawner](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

## Politique de chargement et de conflit

Le chargement d'un ensemble complet remplace l'ensemble actif et nécessite une confirmation. Un préréglage cible fusionne dans le brouillon non enregistré actuellement ouvert dans l'éditeur et nécessite une stratégie.

| Politique | Comportement |
| --- | --- |
| `Replace Target` | Supprimez les règles existantes pour la même cible, puis ajoutez les règles prédéfinies |
| `Merge by ID` | Remplacer les profils par le même ID de cible et de profil ; conserver les autres |
| `Keep Both` | Conserver les règles existantes et attribuer un nouvel identifiant unique lorsqu'un identifiant importé est en conflit |

La stratégie native recommandée du préréglage peut être appliquée aux entités enregistrées à moins que Keep Both ne soit sélectionné. Toujours revérifier `Native: ON/OFF` après l'importation.

## Partage

Distribuez les fichiers JSON à partir de `sets/` ou `targets/`. Prédéfinit les espaces de noms mod requis en `requiredMods`.

- Un préréglage EntityType modifié nécessite le mod qui enregistre cet EntityType.
- Un CustomNPCs préréglage cible enregistre l'exigence `customnpcs` mais ne contient pas de données clone.
- Distribuez un clone de serveur avec le même onglet et le même nom séparément.
- Une cible manquante ne supprime pas l'ensemble du fichier ; seul le profil affecté est isolé comme désactivé avec une erreur.

## Dépannage

### La règle d'une autre entité apparaît sous l'entité sélectionnée

1. Confirmez que la vue du milieu est `Selected Target` ; `All Configured` répertorie intentionnellement chaque cible.
2. Lisez l'étiquette EntityType ou clone sous l'inspecteur pour identifier la cible réelle de la règle sélectionnée.
3. Si l'interface utilisateur n'a pas de boutons `Selected Target` et `All Configured` et affiche toujours l'ancienne disposition `Target / + / All / P / Name`, un ancien JAR est en cours d'exécution.
4. Supprimez les JAR en double, installez la même version actuelle sur le client et le serveur et redémarrez complètement les deux.

La version actuelle efface le profil et l'inspecteur précédents lorsqu'une cible nouvellement sélectionnée n'a pas de règle. Les profils n'héritent jamais entre les cibles.

### Un profil activé n'apparaît pas

Vérifiez dans cet ordre:

1. Exécutez `Advanced Diagnostics → Check Here`.
2. Vérifiez la dimension, le temps, le Y, le biome, la lumière et la distance du joueur.
3. Confirmez le placement de la surface, de la grotte, de l'air ou de l'eau pour la cible.
4. Vérifiez Chance de apparition et tiques d'intervalle.
5. Vérifiez le serveur, la dimension, le morceau, le joueur, le profil, la cible et les limites de groupe partagé.
6. Confirmez que les morceaux candidats sont chargés.
7. Inspectez le journal du serveur pour un déni d'apparition Forge à partir d'un autre mod.

### Un profil se désactive lui-même

- `MISSING ENTITY` : le mod enregistrant que EntityType est absent
- `MISSING CLONE`: les sauvés CustomNPCs La page demandée n'existe pas.
- `CUSTOMNPCS NOT LOADED` : un profil clone est actif sans CustomNPCs
- `ADAPTER REQUIRED OR UNSUPPORTED` : `MISC`, un EntityType vide CustomNPCs ou un chemin de création spécial
- `RUNTIME ERROR` : une défaillance isolée de l'adaptateur-cible s'est produite

### Les créatures indigènes et gérées apparaissent trop souvent

Vérifiez si le apparition natif et un profil géré sont tous deux activés. Une fois la règle gérée prouvée, enregistrez `Native: OFF` pour cette entité enregistrée, puis réglez son profil, sa cible et ses limites de serveur.

## Portée de sauvegarde recommandée

- `config/dochi_rpg_maker/spawn_control/`
- Le monde entier sauve
- Listes de versions des mods serveur et client
- correspondant aux données du clone serveur lors de l'utilisation des cibles CustomNPCs

Sauvegarder JSON seul ne restaure pas les entités déjà présentes dans le monde ou les données appartenant à d'autres mods.

## Intégrations PNJ et véhicules en 0.1.5

DRM, DNPC et Warfare sont optionnels ; CustomNPCs est optionnel uniquement en 1.20.1/1.21.1. L'apparition DNPC par défaut nécessite l'API d'acteurs de DRM ; cloner un PNJ enregistré exige l'API fournisseur de modèles de DRM et le modèle DNPC correspondant. Consultez [l'enregistrement et l'apparition des véhicules](#dochi-spawn-control/spawn-control-vehicles) pour les procédures propres aux véhicules.

## Préréglages 0.1.5 et sauvegardes du monde

Les documents naturels utilisent le schéma 4. Les schémas 2 et 3 restent lisibles, mais évitez de réenregistrer les nouveaux filtres, escouades ou équipements dans une ancienne version de Spawn Control. Fournissez les mods des cibles et objets ainsi que les modèles DNPC originaux. Le NBT avancé des objets 1.20.1 et les composants ultérieurs ne sont pas convertis automatiquement entre versions.

L'occupation par structure et les délais sont enregistrés dans les données du monde ; sauvegardez donc le monde avec les JSON. Consultez les [limites de structures](#dochi-spawn-control/spawn-control-guards).
