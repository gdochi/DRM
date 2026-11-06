---
title: Apparence, équipement et emplois
slug: npc-core-editor
order: 1510
description: Habillez votre PNJ et choisissez ses outils, son lieu de travail et sa routine.
product: dochi-npc-core
category: PNJ, horaires et emploi
section: editor
status: Guide
version: 0.1.3
audience: Créateurs / opérateurs de serveur
translationSource: en
translationMethod: assisted
---

## Modifier l'apparence et l'équipement

Cliquez avec le bouton droit sur un PNJ avec le noyau. Choisissez son nom, sa peau, ses proportions et son équipement, puis sauvegardez. Les modèles installés ajoutent des choix d'apparence; Les modèles Gecko ont besoin de GeckoLib.

![DNPC l'écran Identity, avec des catégories à gauche, un aperçu PNJ au milieu, et les champs nom et titre à droite.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1, anglais UI. Sélectionnez Identity → Information, modifiez Name à droite et Save to NPC en haut. Style change l'apparence du nom et du texte du titre.")

### Changer la peau et la taille

Sélectionnez **Appearance & Model**. Avec **Humanoid**, utilisez le Finder à côté **Skin**, changez **Scale** pour la taille globale, et choisissez **Slim arms** si nécessaire. Utilisez **Part scales** pour les proportions individuelles du corps et **Hitbox** pour les dimensions de collision.

![DNPC 0.1.2 sur NeoForge 1.21.1, montrant Appearance & Model avec Humanoid, Skin, Scale et Slim arms.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "Vérifiez l'apparence dans l'aperçu du milieu. Scale modifie la taille globale du modèle, plutôt que son lieu de travail ou sa portée d'attaque.")

![Passer Scale à 1.15, enregistrer le PNJ puis le vérifier dans le monde.](assets/media/guides/short-videos-20261106/npc-appearance.mp4 "DNPC 0.1.3 / NeoForge 1.21.1, interface anglaise. Appearance & Model → Scale → Save to NPC.")

Utilisez le poseur pour faire des poses et les joindre à des animations. Pour l'équipement aléatoire, choisissez les candidats et les chances pour chaque emplacement.

### Trouvez les emplacements pour armes et munitions

Equipez l'armure sous **Inventory & Equipment → Equipment**, en utilisant **Head / Chest / Legs / Feet**. L'armure stockée en **NPC storage** n'est pas une armure équipée.

![DNPC Inventory & Equipment avec NPC storage et Player inventory au milieu et les fentes d'armure sur la droite.](assets/media/guides/dnpc-012-neo1211/dnpc-inventory.png "DNPC 0.1.2 / NeoForge 1.21.1. Séparez les objets stockés de l'armure équipée. Voir Real Armor pour le comportement de l'armure supplémentaire.")

Sélectionnez **Weapon & ammunition** sur la gauche. **Idle hands** définit ce que le PNJ détient en dehors du combat; **Combat hands** définit ce qu'il détient en cours de combat. Choisissez son arme à distance et ses munitions en **Ranged weapon** et **Ammunition**.

![DNPC L'écran Weapon & ammunition. L'onglet Weapons sur la droite montre les fentes pour les mains inactives et de combat, une fente pour les armes à distance et une fente pour les munitions.](assets/media/guides/dnpc-013-neo1211/dnpc-weapons.png "DNPC 0.1.3 / NeoForge 1.21.1, anglais UI. Utilisez les emplacements dans l'onglet Weapons. NPC storage au milieu se trouve l'inventaire, séparé de la main et des emplacements d'armes sur la droite.")

## Donnez un emploi au PNJ

1. Ajoutez les heures de travail sous **Schedule** sur la gauche.
2. Choisissez l'exploitation minière, l'agriculture, l'exploitation forestière, la collecte, le transport ou un autre emploi.
3. Définissez son lieu de travail / gamme, les outils et le stockage d'entrée / sortie.
4. Fournissez les outils et les articles nécessaires, puis économisez.

Si le PNJ ne fonctionne pas, vérifiez les heures actives, les outils et les itinéraires praticables vers le lieu de travail et le stockage. Les filtres d'exploration vous permettent de choisir des blocs ou des balises.

Voir [calendriers](#dochi-npc-core/npc-core-schedules) pour les heures et [cuisson](#dochi-npc-core/npc-core-cooking) pour la production alimentaire.

### Voir le transport en jeu

Dans cet exemple en jeu, un PNJ dont le travail de transport est déjà configuré prend 32 unités de blé dans le coffre de gauche, les apporte à celui de droite, puis revient. Placez l'origine du travail sur un emplacement accessible à côté du coffre d'entrée et dégagez le chemin vers le coffre de sortie.

![Un PNJ transporte du blé entre deux coffres, puis revient au départ.](assets/media/guides/runtime-videos-20261106/npc-haul.mp4 "DNPC 0.1.3 / NeoForge 1.21.1, interface en anglais. Résultat d'un travail enregistré ; sa configuration dans l'éditeur est décrite ci-dessus.")

## Faire un guide stationnaire

![DNPCde Movement AI écran, avec Lock position et Lock rotation Commutateurs près du bas à droite.](assets/media/guides/dnpc-013-neo1211/dnpc-movement.png "DNPC 0.1.3 / NeoForge 1.21.1, anglais UI. Sélectionnez Movement AI sur la gauche. Lock position Il fixe l'emplacement du PNJ; Lock rotation Il fixe sa direction.")

Activez **Movement AI → Lock position** pour maintenir le PNJ en place. **Lock rotation** fixe séparément sa direction corps/tête et remplace les joueurs proches.

**Combat AI → Invulnerable** bloque tous les dégâts. Désactivez **Allow player damage** pour bloquer uniquement les dégâts causés par les joueurs.

![DNPC 0.1.2 sur NeoForge 1.21.1, montrant Combat AI avec la santé, les dégâts de mêlée, l'intervalle d'attaque, Invulnerable et Allow player damage.](assets/media/guides/dnpc-012-neo1211/dnpc-combat.png "Invulnerable bloque tous les dégâts. Allow player damage contrôle séparément les dégâts causés par les joueurs.")

Les baskets compatibles Cobblemon peuvent toujours effectuer leur tableau de bord / retour configuré tout en étant verrouillées, puis revenir en position.

## Laissez les joueurs embaucher des PNJ

Cette fonctionnalité a besoin de **DRM**.

1. Finir et sauver l'apparence, l'équipement et les emplois du travailleur.
2. Créer une entrée de recrutement dans DRMde **rédacteur emploi**.
3. Choisissez le PNJ, le lieu de départ, le prix, la durée et les tâches que l'employeur peut modifier.
4. Appliquez-le au PNJ recruteur par le biais de **NPC Apply → Function → NPC employment**.
5. Les joueurs parlent au recruteur pour embaucher. Par défaut **H → My employment** fournit l'arrêt, le retour, le renouvellement, le rejet et la collecte de cargaison.

Un PNJ expiré reste disponible jusqu'à ce que sa cargaison restante soit collectée.

### Choisir le travailleur et le contrat

Ce sont les **DNPC 0.1.2 + DRM 0.3.1 / NeoForge 1.21.1** écrans d'emploi. En **NPC**, utilisez le Finder à côté **Prepared NPC JSON set** pour choisir une [modèle de PNJ enregistré](#dochi-npc-core/npc-core-templates). Sélectionnez votre travailleur à la place de **Default NPC** pour utiliser son apparence et les emplois préparés dans l'offre.

![L'onglet PNJ de l'éditeur d'emploi avec l'ensemble JSON PNJ préparé, le nom d'affichage PNJ et le commutateur de location.](assets/media/guides/dnpc-012-neo1211/employment-npc.png "Sélectionnez le PNJ embauché ici, plutôt que le dialogue ou la boutique du recruteur.")

Définissez le paiement, le coût et la durée sous **Contract**. Cet exemple utilise dix émeraudes, ** 20 Minutes ** et **Real Ticks**. Real Ticks suit les ticks du serveur; World Ticks suit le temps du monde, y compris les commandes de sommeil et de temps.

![Contrat avec un coût émeraude de dix, une période de vingt minutes, Real Ticks et Renouveler le contrat.](assets/media/guides/dnpc-012-neo1211/employment-contract.png "Lire l'unité de période et l'horloge de durée avec le nombre. Le renouvellement du contrat détermine si le renouvellement est autorisé.")

**Allowed Work** contrôle les rôles que l'employeur peut attribuer. Un commutateur ne crée pas un nouveau travail que le PNJ préparé ne supporte pas.

## Faire un musicien

Avec **Immersive Melodies** sur 1.20.1 / 1.21.1, ajoutez une performance d'instrument à l'horaire. Choisissez une chanson, un instrument et un lieu.

**Use equipped instrument only** a besoin d'un instrument équipé. **Provide a temporary instrument if missing** montre un pendant la performance. Les instruments temporaires ne deviennent pas des gouttes de mort.
