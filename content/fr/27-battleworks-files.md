---
title: Fichiers, sauvegardes, échantillons et mises à niveau
slug: battleworks-files
order: 280
description: Utilisez les chemins du serveur correctement et empaquetez toutes les ressources référencées.
product: mob-editor
section: reference
category: BattleWorks
status: Guide
version: 0.1.6
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Trouver le bon répertoire

Les chemins sont relatifs à l'instance Minecraft active ou au serveur dédié.

| Chemin | Sommaire |
| --- | --- |
| `config/dochi_rpg_maker/mobs/patterns/` | Combat JSON |
| `config/dochi_rpg_maker/mobs/animations/` | DRM animation du modèle |
| `config/dochi_rpg_maker/mobs/geometry/` | DRM Géométrie |
| `config/dochi_rpg_maker/particles/` | Séparer les fichiers Particle Maker |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Préférences de l'éditeur/présentation local |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Drapeaux de combat partagés |

Utilisez **creatures/patterns**, pas les anciennes créatures/*.json emplacement. La géométrie et l'animation JSON ne sont pas des documents de combat.

## 2. Organiser les fichiers de travail

```text
config/dochi_rpg_maker/
  mobs/
    patterns/
      training/
        first_sword.json
      bosses/
        training_captain.json
    animations/
    geometry/
  particles/
    training_ring.json
```

Entrez des chemins tels que boss/training_captain.json par rapport aux modèles. Évitez les chemins absolus, les préfixes de lecteur, la traversée par les parents et les segments vides.

Utilisez des lettres, des chiffres, des tirets bas, des tirets et des sous-dossiers pour les noms de fichiers de particules. Omettre .json uniquement dans la commande particle, pas les références stockées.

## 3. Fichiers partagés de référence des PNJ

NPC NBT stocke un chemin de combat et de petits drapeaux au lieu d'une copie JSON complète.

1. L'application d'un fichier à plusieurs PNJ partage le design.
2. Utilisez Save As pour les PNJ qui ont besoin de conceptions différentes.
3. Déplacez JSON référencé à côté d'un monde transféré ou d'un clone.
4. Incluez les particules, le modèle, le son, les fenêtres contextuelles et les dépendances des fournisseurs.

Charger ouvre le fichier. Appliquer le lie. Voir [save/apply comportement](#mob-editor/mob-editor-setup).

![Le fichier de combat enregistré sur le serveur et lié à un DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Le titre abrége le chemin d'accès ; le fichier vérifié est config/dochi_rpg_maker/mobs/patterns/training/first_sword.json. Transférer ce fichier avec le PNJ vers un autre serveur.")

## 4. Actualiser les modifications externes

1. Soutenez le JSON.
2. Editez et sauvegardez à l'extérieur.
3. Vérifiez la syntaxe JSON stricte.
4. Actualisez le catalogue de l'éditeur et rouvrez le fichier.
5. **Reapply to the NPC or restart the server**.
6. Vérifiez le comportement modifié.

Combat lit les données mises en cache au lieu d'interroger le disque à chaque tick. Catalog Refresh ne prouve pas à lui seul que le PNJ a été rafraîchi. Les fichiers de particules ont un cache et un chemin d'enregistrement séparés.

## 5. Fichiers de pratique inclus avec ces documents

| Fichier | Dossier | Préparation |
| --- | --- | --- |
| [first_sword.json](./assets/media/battleworks/first_sword.json) | `mobs/patterns/training/` | Enregistré, appliqué et endommagé avec BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1 |
| [training_swordsman.json](./assets/media/battleworks/training_swordsman.json) | créatures/modèles/formation/ | NPC humanoïde normal avec une cible hostile CustomNPCs |
| [training_ring.json](./assets/media/battleworks/training_ring.json) | particules/ | Particle Maker ou la commande particule |

Si le navigateur ouvre JSON, enregistrez-le en tant que fichier. Vérifiez qu'il n'est pas devenu .json.txt. L'échantillon de combat utilise une balançoire de base et un son de vanille sans paramètres de modèle enregistrés. L'échantillon de particules utilise une particule de vanille.

## 6. Packs d'entraînement séparés et Jar Fist

Le dossier de formation 30 est maintenu sous exemples/dossier de formation/créatures/modèles. Il est **non groupé ou installé automatiquement au démarrage**. Copiez-le seulement si vous avez réellement obtenu le pack.

Des noms tels que 1_sword.json, 1_tutorial.json et 2_tutorial_irons.json décrivent la difficulté/l'intégration. Lisez les fichiers authoring.requiredMods et authoring.steps. Même un échantillon d'entraînement physique peut nécessiter des clips Better Combat.

| Échantillon de Jar Fist | Objet |
| --- | --- |
| battleworks_sample_jar_fist_preview.json | Combat désactivé, aperçu zéro dommage |
| battleworks_sample_jar_fist_combat.json | Poursuite, attaques et tests de recul |

Lorsqu'ils sont fournis dans les ressources d'échantillons du JAR, copiez-les dans les modèles avant de les charger. Le modèle Jar Fist, les textures et les ressources d'animation sont séparés. Les clips prévus comprennent ready_to_fight, sword_attack, sword_attack2 et roulent; d'autres modèles ont besoin de remplacements compatibles.

Les modèles de démarrage groupés et les boss, la musique et les popups distribués séparément sont des packages différents. La mise à jour du mod n'installe pas tous les matériaux de rencontre externes.

## 7. Mettre à jour avec soin

1. Arrêtez le jeu/serveur et sauvegardez la configuration et le monde.
2. Remplacez les anciens JAR sans laisser de versions dupliquées de BattleWorks/creature Editor.
3. Assurez-vous que DRM 0.1.7 ou plus récent pour BattleWorks 0.1.5.
4. Vérifiez les catalogues et les liaisons PNJ.
5. Revérifier les modèles, les compétences, l'audio et le combat.

Les anciens fichiers de combat reconnus peuvent migrer des créatures vers des motifs, les octets originaux sauvegardés sous config/dochi_rpg_maker/backups/battleworks-mobs-patterns-v1. Conflits et JSON inconnu / modèle sont préservés.

La récupération de référence déplacée peut réparer des fichiers identifiables de manière unique; ne comptez pas sur elle pour choisir parmi des noms ambigus. Réappliquer explicitement après la réorganisation.

Le mod ID actuel est dochi_battleworks, pas drm_addon_mob_editor. La conversion CNPC-Gecko model-NBT héritée ne remplace pas les types d'entités ou les ressources de l'addon d'origine ; les mondes qui en dépendent peuvent toujours nécessiter cet addon.

## 8. Package d'une rencontre

Incluez combat JSON, particule JSON, modèles, sons, fichiers popup/GUI, clones et versions de mods requises. Charger et appliquer sur un PNJ frais dans l'environnement de destination.

Poursuivre avec [référence JSON](#mob-editor/battleworks-json-reference) ou [troubleshooting](#mob-editor/battleworks-troubleshooting).
