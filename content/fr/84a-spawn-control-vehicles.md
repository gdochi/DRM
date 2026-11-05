---
title: Frayage du véhicule
slug: spawn-control-vehicles
order: 842
description: Frayage du véhicule
product: dochi-spawn-control
category: Frayage du véhicule
section: operations
status: Guide
version: 0.1.5
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Portée

Spawn Control ** 0.1.5 ** crée des véhicules modifiés enregistrés et des EntityTypes de véhicules pris en charge à partir de géniteurs placés et de profils d'apparition naturelle. DRM et les mods de véhicule sont des intégrations optionnelles.

| Véhicule mod | Objectifs |
| --- | --- |
| Véhicules immersifs / MTS | Véhicule pack installé / variantes de couleur ou véhicules assemblés enregistrés; Forge / NeoForge intégration |
| Superbe guerre | Types de véhicules enregistrés ou modèles enregistrés; Forge / NeoForge intégration |
| avions immersifs | Types d'entités d'aéronefs ou véhicules enregistrés; couverture d'exécution enregistrée Fabric |
| Automobilité | Véhicules assemblés enregistrés; couverture d'exécution enregistrée Fabric |

Utilisez une version réelle pour la version Minecraft et le chargeur sélectionnés. Créer / Valkyrien Les engins de bloc Skies sont en dehors de cette intégration basée sur une entité. Le apparition n'ajoute pas d'IA de conduite de PNJ ou d'équipage automatique.

## Exemple : créer un M1A2 sauvegardé

Ce flux a été sauvé, appliqué et exécuté avec ** Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1 **. Il n'établit pas les pièces ou le comportement en carburant des autres mods du véhicule.

### 1. Sauvegarder le véhicule d'origine

Préparez un M1A2 avec son propre mod, retirez tous les passagers, tenez-vous à proximité et courez:

```text
/spawncontrolvehicle save guide_tank @e[type=superbwarfare:m_1a_2,sort=nearest,limit=1,distance=..32]
```

La réponse de succès noms **, spawncontrol_vehicle:guide_tank, **. L'original reste dans le monde et `config/dochi_rpg_maker/spawn_control/vehicles/guide_tank.json` est créé. Utilisez `/spawncontrolvehicle list` pour vérifier les identifiants enregistrés ou `/spawncontrolvehicle reload` pour relire les modèles édités en externe.

Pour un autre mod, utilisez son type de véhicule réel après `type=`. Enregistrez un véhicule assemblé au lieu de sélectionner un MTS `mts:builder_existing` vide ou un véhicule de base Automobility non assemblé comme cible d'apparition.

### 2. Choisissez l'ID enregistré sous Entité

Ouvrir **Spawner Editor → Spawn Target** et laisser **Source** comme **Entity**. Appuyez sur la loupe (**Choose**, recherchez `guide_tank`, puis sélectionnez **spawncontrol_vehicle:guide_tank → Select**. Les modèles de véhicules appartiennent ici; ne passez pas à **NPC clone template**.

![spawncontrol_vehicle:guide_tank dans le sélecteur d'entités.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-picker.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Choisissez l'ID enregistré par la commande. Un EntityType de véhicule par défaut et un modèle de véhicule enregistré sont des cibles distinctes.")

### 3. Définir l'espace et la quantité, puis économiser

Cet exemple utilise **Spawn Settings** avec la limite possédée `1`, le rayon `12` et **Placement: Air**. La plage verticale reste à `2`, les entités par activation à `1`, et la limite totale à `0`. Utilisez **Save As → guide_tank_spawner.json → Confirm**.

![guide_tank_spawner.json pointe vers l'ID du véhicule enregistré.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-spawner-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. La source est une entité. Cet écran affiche la cible ; le placement et la quantité sont configurés séparément sous Paramètres de spawn.")

**Why Ground failed here:** ce M1A2 original a sauvé une boîte de collision s'étendant légèrement en dessous de son point de référence, coupant le sol aux candidats au sol. L'air a permis un candidat clair au-dessus du sol et le apparition a réussi. L'air n'ajoute pas d'IA de vol; le mod du véhicule contrôle sa physique après l'insertion.

### 4. Appliquer à un géniteur placé

Utilisez **Get Spawner** et placez-le dans une zone large et claire. Faites un clic droit avec le **DRM Core**, puis ** guide_tank_spawner.json → Appliquer JSON **. Les conditions par défaut excluent les joueurs créatifs, alors passez à Survie et restez à proximité pour le test. Suivez le même [placement et appliquez la fenêtre ](#dochi-spawn-control/spawn-control-npc-templates).

![Le nouveau M1A2 avec son original derrière lui.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-runtime.png "Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1. Le serveur a confirmé un nouveau réservoir, un UUID différent de l'original et zéro passagers. Il ne s'agit pas d'une démonstration d'équipage ou de conduite.")

Le même identifiant enregistré peut être sélectionné dans les règles de natural-spawn avec des limites de biome, de temps, de distance et de quantité. L'enregistrement de ces règles et l'application de JSON à un générateur placé sont des opérations distinctes.

## Espace et état restauré

Le véhicule complet a besoin de morceaux chargés, de dédouanement à la frontière mondiale et d'espace de collision. Le rayon 0 sur une ancre d'entité utilise son centre ; une ancre de bloc peut obstruer cette position elle-même. Associez la surface, l'eau ou l'air au véhicule.

`maxOwned: 1`, `maxTotal: 0` permet de frayer à répétition tout en gardant un véhicule en vie. La conduire loin ne la rend pas absente.

Les pièces NBT natives, l'inventaire, le carburant et l'orientation sauvegardée sont restaurés avec un nouvel UUID. Les passagers ne sont pas clonés ; le carburant et les munitions ne sont pas automatiquement réapprovisionnés. Distribuez les mods du véhicule, les packs de contenu et les fichiers `vehicles/` avec le préréglage.

## DNPC apparition

Installez DNPC et DRM et choisissez le modèle de clone [NPC](#dochi-spawn-control/spawn-control-npc-templates) pour faire apparaître un PNJ fini. L'entrée PNJ par défaut ne copie pas l'apparence ou l'équipement sauvegardé.
