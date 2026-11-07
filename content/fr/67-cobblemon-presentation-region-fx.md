---
title: Block Stages et FX
slug: cobblemon-presentation-region-fx
order: 533
description: Capturez une région du monde dans la présentation JSON et l'auteur de la chorégraphie de particules.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Guide d'utilisation
version: Fabric / NeoForge 0.2.9
audience: Créateurs de présentation de combat
translationSource: en
translationMethod: assisted
---

## Utiliser les blocs du monde comme une scène

Battle Presentation Makerde **Region** incorpore les états de bloc sélectionnés dans la présentation JSON. C'est une scène visuelle pour l'entrée de la bataille, pas un outil qui place ou restaure des blocs du monde. La forme sauvegardée reste disponible après que l'emplacement d'origine ait changé ou que la bataille ait eu lieu ailleurs.

1. Chargez les morceaux contenant la structure.
2. Définissez deux coins de région ou utilisez la sélection de zone mondiale pour déplacer et redimensionner la boîte.
3. Appliquez la sélection validée, puis utilisez **Capture region**.
4. Réglez Yaw, Pitch, Zoom, Offset et fin de rotation pour encadrer la scène.
5. Jouez la chronologie avec les modèles et les calques, puis enregistrez ou Save As dans la barre d’outils.

La capture seule ne persiste pas sur le disque. Capturez à nouveau après avoir changé la zone sélectionnée. La sélection mondiale ne change jamais les blocs, et Esc l'annule.

![Plancher et piliers capturés enregistrés en tant que fichier de présentation.](assets/media/guides/cobble-029-neo1211-flow/cobble-region-captured.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1. Après avoir capturé des blocs 31 et deux états de bloc, Save As a créé custom/guide_stage.json. Enregistré à droite et l'état inférieur confirment l'enregistrement.")

## Capturer un décor et ajouter des particules en vidéo

![Définir les coins, capturer de vrais blocs, ajouter des particules, prévisualiser et enregistrer.](assets/media/guides/tutorial-videos-20261107/battle-region-particles.mp4 "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Le sol et les piliers étaient préparés dans le monde de capture. Interface et annotations en anglais ; sans audio.")

1. Commencez par une petite structure. Les coins **(4, −61, 4)** et **(8, −58, 8)** correspondent au monde de capture ; utilisez vos coordonnées.
2. Utilisez **Region → Capture region** et vérifiez que les blocs apparaissent. Saisir les coordonnées ne suffit pas. Vérifiez les chunks chargés, les limites et les régions vides. Si l’aperçu Region fonctionne mais que la lecture masque le décor, vérifiez aussi les fonds opaques et les calques Color du preset.
3. Utilisez **Particles → Add layer → Emit**. La vidéo conserve la particule par défaut du nouveau calque. Prévisualisez avant de modifier période, Interval ou Samples, un réglage à la fois.
4. **Motion** règle le mouvement, **Path** la trajectoire et **Cues** les effets temporisés. Approfondissez après un premier calque Emit. La vidéo ne montre pas l’édition détaillée de ces trois pages.
5. Utilisez **Play**, puis **Save As → custom/tutorial_stage.json → Save**. Capture et particules modifient le brouillon ; l’enregistrement du fichier reste une étape distincte.

## Limites de capture

| Poste | Limite actuelle / comportement |
| --- | --- |
| Longueur par axe | Jusqu'à 128 blocs |
| Blocs stockés | Jusqu'à 32,768 blocs non aériens pris en charge |
| États de bloc distincts | Jusqu'à 512 |
| Chunks | Toute la région doit être chargée |
| Bloquer des entités telles que des coffres | Rejeter la capture lorsqu'elle est présente ; sélectionner une région les excluant |

Des régions surdimensionnées, trop d'états ou pas de blocs capturables empêchent la capture. Le stade visuel ne tique pas, il ne reproduit donc pas le comportement fonctionnel de la redstone ou du conteneur.

## Auteur FX

Ajoutez une entrée de particule en **Particles**, choisissez son ID/options de particule, puis utilisez Emit, Motion, Path et Cues pour définir le timing, le nombre/intervalle, la forme, les dimensions, la position, la vitesse et le chemin. Copier/Coller les paramètres d'entrée des transferts.

Commencez avec une particule et un court intervalle, puis prévisualisez-la avec l'acteur, la scène de bloc et la caméra. Ce sont des visuels de présentation, pas des attaques mondiales ou des hitboxes de dégâts. Les particules externes nécessitent leur mod fournisseur.

![Une couche de particules ajoutée sous Particules, avec le jeu de présentation.](assets/media/guides/cobble-029-neo1211-flow/cobble-presentation-fx.png "Choisissez Particules → Ajouter un calque, puis modifiez Émettre sur la droite. Cette entrée utilise minecraft:end_rod, les tiques 0–39, Intervalle 2 et Échantillons 24. Play exécute l'aperçu de la présentation de l'éditeur.")

## Connecter le résultat

Utilisez la présentation via les liaisons de l'entraîneur, l'intégration sauvage / RCT / PvP, ou le [ Battle Scheduler ](#drm-cobblemon-editor/cobblemon-battle-scheduler). Présentation JSON reste le schéma `5`. Voir [layers et runtime](#drm-cobblemon-editor/battle-presentation-layers-runtime) pour le texte, les images, les acteurs, l'audio et le timing.
