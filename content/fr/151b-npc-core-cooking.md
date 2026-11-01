---
title: Cuisiner et livrer de la nourriture
slug: npc-core-cooking
order: 1514
description: Choisissez une recette, un stockage d'ingrédients et un poste de travail pour votre cuisinier.
product: dochi-npc-core
category: Emplois
section: editor
status: Guide
version: 0.1.3
audience: Créateurs PNJ
translationSource: en
translationMethod: assisted
---

## Préparer un travail de cuisine

1. Placez un poste de travail accessible et un stockage ingrédient / sortie.
2. Dans l'éditeur PNJ, utilisez **Schedule → Add time**, puis la ligne de temps ** + **. Recherchez **Cooking**, ou trouvez-le sous **Gathering and production**.
3. Utilisez le contrôle de navigation à côté de **Food to cook** pour sélectionner une recette. Les ingrédients ne sont pas récupérés avant qu'une recette ne soit sélectionnée.
4. Attribuer **Ingredient source / Cooking block / Output**. Faites défiler l'inspecteur pour les paramètres inférieurs.
5. Fournissez les ingrédients, l'outil et le carburant nécessaires, puis réglez **Batch / Repeat**.
6. Activer **Enable schedule** et **Save to NPC**. Vérifiez que l'heure mondiale actuelle tombe dans la période prévue.

![Cuisson ajoutée à Schedule, avec nourriture à cuire et source d'ingrédients.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking.png "DNPC 0.1.3, Le plaisir de l’agriculteur 1.3.4, NeoForge 1.21.1. Cette vue de préparation n'a pas de recette ou de station et l'horaire est OFF. Attribuez-leur, activez le calendrier et sauvegardez.")

Activez **Repeat** pour continuer la cuisson. Désactivez-le pour terminer et livrer un lot, puis attendez.

## Lire la recette avant de préparer la station

Recherchez par nom d'aliment ou d'article et sélectionnez une ligne de recette sur la gauche. Le même steak peut avoir des recettes de four et de fumeur séparées. Lire **Bloc de cuisson / Temps de cuisson de la recette / Ingrédients pour un lot de recettes** sur la droite avant de préparer la station et les ingrédients.

![La recette de steak four sélectionné montre un bœuf cru et un temps de cuisson 200-tick.](assets/media/guides/dnpc-013-neo1211/dnpc-cooking-beef.png "DNPC 0.1.3 / NeoForge 1.21.1. La recherche est minecraft:cooked_beef. Cette ligne nécessite Furnace, 200 tiques et Raw Beef ×1. Appliquer les mises à jour du brouillon de l'éditeur; terminer avec Save to NPC séparément.")

## Postes de travail disponibles

| Appareil | Ce que fait le PNJ |
| --- | --- |
| Fournaise/fumeur | Ajoute des ingrédients et du carburant, puis recueille le résultat |
| Planche à découper Farmer’s Delight | Prépare les ingrédients avec l'outil requis |
| Pizzeria du fermier | Roule la pâte, ajoute les garnitures et recueille la pizza crue |
| Moule à fromage français Delight | Remplit le moule, attend le vieillissement et recueille le fromage |
| Paniers/cabinets pris en charge | Déplace les ingrédients, les articles intermédiaires et les produits |

Les appareils supplémentaires ont besoin de leurs mods respectifs. Le guide combiné cuisson-addon ci-dessus est basé sur **NeoForge 1.21.1**. Sur les autres chargeurs, choisissez parmi les appareils installés et la liste de recettes disponibles. Ce n'est pas un guide de cuisine 26.3.

## Les ingrédients sont prêts, mais la cuisson ne commence pas

- Fournissez le nécessaire **outil** ainsi que des ingrédients.
- Vérifiez l'entreposage des ingrédients et le poste de travail.
- Laissez un itinéraire accessible à pied et de la place pour se tenir à l'appareil.
- Les fours/fumeurs ont besoin de **carburant**.
- Le stockage en sortie complète peut retarder la collecte ou la livraison.

Le vieillissement du fromage prend 1,200 tiques, environ une minute à la vitesse normale. Si la conversation interrompt brièvement la cuisson, le PNJ peut récupérer la nourriture une fois l’appareil terminé.

Choisissez les heures de travail en [horaires](#dochi-npc-core/npc-core-schedules).
