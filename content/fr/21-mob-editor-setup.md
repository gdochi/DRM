---
title: Installation et préparation des PNJ
slug: mob-editor-setup
order: 220
description: Préparez les mods correspondants, un PNJ de test et le flux de travail d'enregistrement/application correct.
product: mob-editor
section: start
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

## 1. Préparer l’installation de la pratique

C'est la combinaison utilisée pour les écrans capturés et le test de première attaque. Installer **BattleWorks, DRM and an NPC mod**. Pour les autres Minecraft/loader fichiers, voir [choix d'installation](https://www.curseforge.com/minecraft/mc-mods/dochi-s-battleworkes/files/9348660).

| Composante | Cet exercice |
| --- | --- |
| Minecraft / chargeur | 1.21.1 / NeoForge |
| Java | 21 |
| BattleWorks | 0.1.6 |
| DRM | 0.3.1 |
| NPC | DNPC 0.1.3 |

Installez leurs dépendances correspondantes dans la même instance. Cette table enregistre une combinaison testée ; vérifiez les fichiers sélectionnés Minecraft, le chargeur et les exigences avant de remplacer une installation compatible existante. Associez également les installations serveur et client.

Les acteurs CustomNPCs pris en charge sont également disponibles sur Forge 1.20.1 et Fabric/NeoForge 1.21.1. **Use the DNPC workflow on 26.3 and later** ; CustomNPCs y est exclu.

## 2. Créer une pratique DNPC

1. Suivre [Création d'un DNPC](#dochi-npc-core/npc-core-setup) dans Creative pour placer un PNJ.
2. Donnez-lui un nom reconnaissable et commencez par un modèle de joueur normal.
3. Préparez un terrain plat sans autres PNJ ou créatures à proximité.
4. Cet exercice utilise BattleWorks **Scan Without Target** pour trouver le joueur. Évitez d'assigner du travail ou un autre contrôleur de combat au même PNJ pendant l'exercice.
5. Auteur dans Creative et testez les attaques dans Survival.

![Préparer l’acteur à DNPCde Identity écran.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. Le fichier BattleWorks sera attaché à cet acteur. L'apparence et l'équipement sont séparés de BattleWorks Dégâts et hitbox.")

Une épée tenue permet de communiquer l'attaque. L'exercice inflige des dégâts dans la BattleWorks Hitbox plutôt que de compter sur les dégâts d'attaque de l'objet. L'amélioration de la santé des PNJ peut attendre l'exercice du patron.

## 3. Ouvrir BattleWorks pour le PNJ

Sélectionnez le PNJ de pratique avec le noyau DRM et ouvrez son éditeur BattleWorks. Chargez un fichier de combat existant ou choisissez **Create New**, puis continuez avec [votre première attaque en mêlée ](#mob-editor/battleworks-first-attack).

La catégorie de fichier-application du PNJ est **Battlework JSON**. Si vous avez commencé à créer sans PNJ, enregistrez le fichier, sélectionnez-le dans le catalogue de ce PNJ et appuyez sur **Apply Battlework**. Pour un autre modèle, configurez d'abord l'apparence DNPC et sa connexion [animation](#mob-editor/battleworks-animation).

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
