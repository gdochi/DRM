---
title: Créer des effets avec Particle Maker
slug: battleworks-particles
order: 274
description: Construisez un anneau de deux secondes, testez-le avec une commande et attachez-le à une étape de combat.
product: mob-editor
section: effects
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

## Ce que cet exercice produit

Un fichier visuel émet un anneau pendant environ deux secondes. Vous jouerez à travers une commande et un boss Windup. Les dégâts restent une Hitbox ou une compétence distincte.

Le 0.1.5 Particle Maker partagé utilise **séparer `dochi.particles.v1` fichiers **. Les anciens documents en ligne particleEffects restent un chemin de compatibilité.

## 1. Ouvrir sans PNJ

1. En Créatif, utilisez la **BattleWorks Wand** dans le vide.
2. Choisissez **Particle Maker** dans le sélecteur autonome. Avec DRM, **Core → Visual → Particle Maker** reste disponible.
3. Créez un effet ou chargez `particle_sample.json`.
4. Utilisez Save As pour une copie de travail.

Une action Particle Shape peut aussi ouvrir l'éditeur avec **Open Particle Maker**, puis associer le fichier enregistré.

## 2. Construisez une couche annulaire

| Contrôle | Valeur |
| --- | --- |
| Nom de l'effet | Anneau de formation |
| Émissions (ticks) | 40 |
| + Couche | Une couche |
| Début / Fin | 0 / 39 |
| Intervalle | 2 |
| Particule | minecraft:end_rod |
| Origine | Caster |
| forme / rayon | 2.4 |
| Points d'échantillonnage / Nombre par point | 24 / 1 |
| Spread / Vitesse | 0 / 0 |
| Local Y | 0.05 |

1. Réglez le timing sous **Timing / names**.
2. Choisissez la particule et l'origine sous **Particle / origin**.
3. Définissez la forme et les dimensions sous **Shape / size**.
4. Déplacez-vous légèrement au-dessus du sol sous **Starting position / rotation**.
5. Inspectez Play / Pause et Reset.

La tique de fin d'une couche de particules est inclusive mais doit être ** inférieure à la durée**. Un effet 40-tick utilise des ticks 0–39. Cela diffère des limites de l'étape-événement de combat.

À l'intervalle 2, cet exemple émet à 0, 2, 4 par 38: 20 émissions de 24 particules, demandant 480 total.

![Calque dans Particle Maker et ses paramètres Timing / names.](assets/media/guides/battleworks-016-neo1211/battleworks-particles.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Lire Emission (ticks) 40 avec Début 0, Fin 39 et Intervalle 2. Le panneau de prévisualisation ci-dessus est plié; développez-le pour inspecter la géométrie des particules.")

## 3. Animer le rayon

1. Ouvrez **End values (linear)** et activez Animate pour terminer les valeurs.
2. Utilisez le rayon de départ 1 et le rayon de fin 2.4.
3. Faites correspondre les autres coordonnées de fin aux coordonnées de départ.
4. Jouez et regardez l'anneau se développer.

Pour plusieurs points temporels, recherchez la ligne du temps, ouvrez **Motion keyframes**, appuyez sur **Add key** et définissez la position, le rayon et le lacet. Les valeurs s'interpolent linéairement entre les clés.

Les clés ont priorité pour leurs valeurs X/Y/Z, rayon et lacet. Ils animent la **émetteur**pas les positions de chaque particule déjà créée.

## 4. Sélectionnez les options de particules valides

Le cueilleur répertorie les particules de vanille et de mod enregistrées. Des options supplémentaires ne s'affichent que lorsque cela est nécessaire.

Exemples: `minecraft:dust` peut utiliser `1 0.3 0.1 1`; une particule de bloc peut utiliser `minecraft:stone`. Les options spécifiques aux mods doivent correspondre à leur décodeur réel. Commencez par end_rod avant de changer de type.

## 5. Prévisualiser les contrôles et les limites

Faites glisser le canevas pour faire pivoter et utilisez la roue pour zoomer. Front / Perspective change la vue.

**End: Hold** garde le cadre final de l'aperçu. **End: Clear** efface l'aperçu après la lecture. Ce ne sont pas des commandes pour outrepasser la durée de vie de chaque particule du monde.

Preview utilise des fournisseurs de particules, des textures et des types de rendu réels. Certains moteurs de rendu CUSTOM ont besoin d'un étage de rendu mondial séparé et ne peuvent pas être intégrés; les particules NO_RENDER sont intentionnellement invisibles. Vérifiez également l'éclairage, la profondeur et l'apparence du monde réel.

## 6. Enregistrer et exécuter une commande

1. Save As `training_ring.json`.
2. Confirmez le résultat de sauvegarde.
3. Vérifiez qu'il est en `config/dochi_rpg_maker/particles/`.
4. Avec permission niveau 2 ou au-dessus, exécutez une fois:

```mcfunction
/drm particle play training_ring ~ ~ ~
```

**N'incluez pas .json dans la commande.** Les sous-dossiers utilisent des noms tels que effects/training_ring. L'achèvement suggère des noms sans extension.

Une commande planifie l'effet entier. Répéter chaque tique est inutile. Les coordonnées relatives utilisent la position d'exécution de la commande.

Vous pouvez également enregistrer le fichier de particules [pratique](./assets/media/battleworks/training_ring.json) dans ce dossier.

## 7. Attachez-le à Windup

1. Sélectionnez un BattleWorks modèle Windup.
2. Ajoutez **Particle Shape** à la catégorie de présentation.
3. Utilisez **Choose particle JSON** et sélectionnez training_ring.json.
4. Choisissez Origin Caster.
5. Cochez 0, Intervalle 0, Nombre de répétitions 1.
6. Pour cet exercice, utilisez un 40-tick Windup avant le contact.
7. Enregistrer/appliquer le document de combat.

L'action stocke une référence particleFile. L'édition de ce fichier de particules partagé affecte d'autres rencontres en l'utilisant.

Les effets Caster / Target peuvent continuer à suivre la position de leur origine et faire face tout en émettant. Pour un avertissement fixe à l'emplacement antérieur du joueur, enregistrez une position et choisissez la position enregistrée.

## 8. Limites d'émission

| Portée | Limite actuelle |
| --- | --- |
| Durée de l'effet | 600 tiques |
| Couches / clés par couche | 32 / 64 |
| Échantillons à géométrie unique / nombre | 512 / 32 |
| Combattre les effets simultanés PNJ / budget par tick | 8 / 2,048 |
| Effets de commande par dimension / par tick budget | 64 / 4,096 |

Si la sortie est ignorée, réduisez les échantillons, le nombre, la fréquence ou les effets simultanés. Inspectez `Particle JSON rejected` pour les échecs de fichiers. Utilisez la commande world lorsque vous prévisualisez des rapports de rendu non pris en charge.

Un anneau visible sans dommage est attendu jusqu'à ce qu'un [hitbox](#mob-editor/battleworks-hitboxes) est connecté.
