---
title: Installation et préparation des PNJ
slug: mob-editor-setup
order: 220
description: Préparez les mods correspondants, un PNJ de test et le flux de travail d'enregistrement/application correct.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Préparer des fichiers compatibles

Utilisez BattleWorks **0.1.7** pour votre version exacte de Minecraft et votre chargeur. Gardez des installations client et serveur compatibles et installez les dépendances déclarées par le fichier choisi.

| Minecraft | Chargeur BattleWorks | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric ou NeoForge | 21 |
| 26.3 | Fabric ou NeoForge | 25 |

**DRM est facultatif**, y compris pour ouvrir les éditeurs autonomes. DNPC fournit l'acteur de cet exercice. Ajoutez DRM, des bibliothèques d'animation, mods de magie ou fournisseurs de modèles uniquement pour les fonctions utilisées ; leurs ressources sont distinctes du JSON de combat.

CustomNPCs est facultatif sur Forge 1.20.1 et Fabric / NeoForge 1.21.1. Il est exclu à partir de 26.3 ; utilisez DNPC sur ces versions. Les anciennes captures et vidéos de 0.1.6 gardent leurs versions réelles.

## 2. Créer une pratique DNPC

1. Suivre [Création d'un DNPC](#dochi-npc-core/npc-core-setup) dans Creative pour placer un PNJ.
2. Donnez-lui un nom reconnaissable et commencez par un modèle de joueur normal.
3. Préparez un terrain plat sans autres PNJ ou créatures à proximité.
4. Cet exercice utilise BattleWorks **Scan Without Target** pour trouver le joueur. Évitez d'assigner du travail ou un autre contrôleur de combat au même PNJ pendant l'exercice.
5. Auteur dans Creative et testez les attaques dans Survival.

![Préparer l’acteur à DNPCde Identity écran.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. Le fichier BattleWorks sera attaché à cet acteur. L'apparence et l'équipement sont séparés de BattleWorks Dégâts et hitbox.")

Une épée tenue permet de communiquer l'attaque. L'exercice inflige des dégâts dans la BattleWorks Hitbox plutôt que de compter sur les dégâts d'attaque de l'objet. L'amélioration de la santé des PNJ peut attendre l'exercice du patron.

## 3. Ouvrir BattleWorks pour le PNJ

1. En Créatif, trouvez la **BattleWorks Wand** dans l'onglet propre à BattleWorks. Elle apparaît aussi dans l'onglet DNPC lorsqu'il est disponible.
2. Utilisez la baguette sur un PNJ compatible pour ouvrir son sélecteur d'éditeurs. Utilisez-la dans le vide pour créer sans PNJ associé. La commande est `/battleworks editor` ; les permissions du serveur s'appliquent.
3. Choisissez BattleWorks, puis **Load Existing**, **Use Default** ou **Create New**. Les valeurs par défaut sont des modèles ; enregistrez une copie de travail.
4. Commencez par [l'édition simple et les recettes](#mob-editor/battleworks-authoring), ou continuez avec [votre première attaque](#mob-editor/battleworks-first-attack).

Avec DRM installé, Core reste un autre point d'entrée. La catégorie d'application est **Battlework JSON**. Pour un fichier créé sans PNJ, choisissez-le dans le catalogue de l'acteur et appuyez sur **Apply Battlework**. Préparez les autres modèles via leur apparence et la [connexion d'animation](#mob-editor/battleworks-animation).

## 4. Ajoutez des intégrations lorsque la fonctionnalité en a besoin

| Objectif | Préparation supplémentaire |
| --- | --- |
| Basique bras swing et hitbox | Commencez par l'installation testée ci-dessus |
| Mieux combattre le mouvement | Compatible Better Combat, le mouvement et une arme supportée |
| Gecko clips | Actifs de modèle, texture et animation plus leur fournisseur |
| Animateur de joueur clips | Fournisseur compatible et clips réels |
| Autres sorts/compétences des mods | Le mod, les dépendances et la compétence enregistrée |
| Sons/textures personnalisés | Un mod ou un pack de ressources fournissant leurs identifiants |

Vérifiez d'abord l'attaque de base, puis ajoutez des mouvements ou des compétences pour que les échecs d'application de fichier restent faciles à distinguer des ressources externes manquantes.

## 5. Comprendre Enregistrer, Save As, Charger et Appliquer

| Fonctionnement | Résultat | Prochaine étape |
| --- | --- | --- |
| Charger | Ouvre un fichier serveur dans l'éditeur | Modifier, enregistrer ou l'appliquer |
| Save As | Écrire JSON sur le chemin choisi | Lier le PNJ au nouveau chemin |
| Enregistrer avec un PNJ sélectionné | Enregistre le document et lie ce PNJ | Test de combat |
| Enregistrer sans PNJ, fichier chargé | Mettre à jour ce fichier | Vérifiez la liaison du PNJ prévu |
| Enregistrer sans PNJ, nouveau document | Ouvre l'invite de nom de fichier | Enregistrer, puis appliquer à un PNJ |
| NPC catalogue Appliquer | Lie le chemin d'accès au fichier serveur sélectionné | Test de combat |

Entrez `training/first_sword.json` dans Save As. Le chemin résultant est:

```text
config/dochi_rpg_maker/mobs/patterns/training/first_sword.json
```

N'entrez pas le chemin de configuration complet ou un chemin de lecteur Windows dans le champ chemin relatif.

Les valeurs par défaut groupées sont des modèles protégés. Utilisez **Save As** pour une copie de travail. Si l'éditeur a un PNJ attaché, appuyez sur **Save after Save As** pour lier ce PNJ au nouveau fichier.

## 6. Vérifier le résultat enregistré

1. Résoudre toute erreur de validation ou d'enregistrement du serveur.
2. Chargez et rouvrez le fichier de travail.
3. Appliquez-le via le catalogue PNJ ou Sauvegardez avec ce PNJ.
4. Testez en tant que joueur de survie.

Lorsqu'ils sont connectés à un serveur distant, les fichiers sont enregistrés dans le répertoire de configuration du serveur ****. Une copie dans votre répertoire solo séparé n'apparaîtra pas sur ce serveur.

Les PNJ référencent désormais les fichiers au lieu de stocker des copies JSON complètes. Utilisez des chemins Save As séparés lorsque différents PNJ ont besoin de rencontres différentes. Continuez avec [ votre première attaque ](#mob-editor/battleworks-first-attack).
