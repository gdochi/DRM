---
title: Enregistrer, simuler et lancer
slug: expanded-support-run
order: 332
description: Enregistrez, rechargez, testez des simulations réelles, lancez l’appui et dépannez les anciens fichiers.
product: dochi-warfare-expanded
category: Appui au combat
section: support
status: Guide
version: 0.3.3
audience: Créateurs de cartes et opérateurs
translationSource: en
translationMethod: assisted
---

## Distinguez enregistrement, test et lancement

Terminez le [placement](#dochi-warfare-expanded/expanded-support-timeline) ou les [réglages d’appui](#dochi-warfare-expanded/expanded-support-actions), puis suivez ces étapes.

| Opération | Données | Résultat |
| --- | --- | --- |
| Save / Save As | Brouillon actuel | JSON nommé sur le serveur |
| Simulation | Brouillon actuel | Acteurs temporaires à vitesse normale ; terrain et acteurs existants protégés |
| Commande opérateur | Fichier enregistré | Appui réel avec dégâts et effets natifs |
| Ordre tactique | Chronologie liée à une tactique enregistrée | Appui réel au point et selon la direction désignés par le joueur |

**Simulation ne sauvegarde pas.** Enregistrez le brouillon testé, puis appelez-le par commande opérateur ou liez-le à un [ordre tactique](#dochi-warfare-expanded/expanded-tactical-orders) pour distribuer des objets aux joueurs ordinaires. Les anciens schémas et le bouton d’exécution à ma position ne décrivent pas cette interface.

## 1. Enregistrez un document

1. Saisissez un titre lisible, comme **Road reinforcement**.
2. Cliquez **Save As**.
3. Utilisez **tutorial_support** comme nom de fichier. Titre et fichier sont distincts.
4. Confirmez et attendez la réponse serveur.
5. Vérifiez nom et indicateur de modification. Utilisez ensuite **Save / Ctrl+S**.

![Créez un appui, définissez titre/nom, enregistrez, recherchez et rechargez.](assets/media/guides/dwe-tutorials-20261109/dwe-files.mp4 "09 · Save As → tutorial_support → confirmation → Load → recherche → sélection → chargement. Comparaison du fichier et du placement rouvert.")

**Cliquer ne confirme pas l’enregistrement.** Lisez les états d’attente/erreur. Si un autre utilisateur a modifié le fichier, rechargez la version actuelle et conservez votre brouillon sous un autre nom.

Lisez les confirmations de modifications non enregistrées lors de création, réinitialisation, chargement ou fermeture. **Reset restaure la base enregistrée ; Create New crée un document vide.**

## 2. Rechargez le placement

1. Recherchez le nom dans **Load**.
2. Sélectionnez la ligne et attendez le résumé.
3. Utilisez **Load** dans la fenêtre.
4. Vérifiez événements, horaires, routes et centre.

**Relative coordinates transpose le placement au centre actuel.** Passez d’abord en **Absolute coordinates** pour conserver les positions enregistrées. Pour réutiliser ailleurs, définissez **Center** avant le chargement relatif.

## 3. Testez avec Simulation

1. Commencez simplement, avec un véhicule.
2. Cliquez **Simulation** ; les brouillons non enregistrés sont acceptés.
3. Attendez puis vérifiez véhicule temporaire et temps écoulé.
4. Observez route, début, durée et arrivée.
5. Cliquez **Stop** et vérifiez la suppression de l’appui.

![Tracez une route, observez le véhicule réel de Simulation et supprimez-le avec Stop.](assets/media/guides/dwe-tutorials-20261109/dwe-simulation.mp4 "10 · Véhicule sur client/serveur intégré réels ; distinct du combat appelé par commande.")

La simulation utilise des entités temporaires et le déplacement natif à vitesse normale. Le centre est verrouillé pendant l’exécution ; arrêtez avant de modifier.

Terrain et acteurs existants sont protégés : **les dégâts simulés ne mesurent pas les dégâts de combat réel**. Vérifiez aussi préparation des PNJ, compatibilité, politique serveur et terrain.

## 4. Lancez l’appui réel

Permission **2** requise. Le fichier est **tutorial_support**, sans extension dans les commandes.

```text
/dw callgimmicks tutorial_support
/dw callgimmicks tutorial_support ~ ~ ~
```

| Appel | Placement |
| --- | --- |
| Sans coordonnées | Positions mondiales enregistrées |
| Avec coordonnées | Transpose départs, cibles et destinations de l’origine enregistrée aux coordonnées demandées |

Les coordonnées relatives utilisent la **position de l’exécutant** : joueur ou bloc de commande. Y transpose aussi la hauteur de l’ensemble.

Les modifications non enregistrées ne sont pas incluses. L’appel réel diffère de Simulation protégée ; vérifiez routes et armes dans la zone prévue.

Un bombardement ponctuel par commande est également disponible. Consultez les identifiants installés avec la complétion.

```text
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

**10 est en ticks** : premier largage après une demi-seconde à 20 TPS. La commande accepte points/zones ; créez les lignes dans l’éditeur.

## Dépannez une étape bloquée

| Symptôme | Première vérification |
| --- | --- |
| Cliquer au sol n’ajoute rien | Outil, surface chargée, pointeur dans la vue |
| Propriétés absentes | Sélection, panneau déplié, défilement interne |
| Nombre bloquant une action | Compléter les saisies vides/négatives et lire l’état |
| Catalogue vide | Catalogue réel et combinaison installée |
| PNJ immobiles | DW AI, Clone ou sphère Area, monture/recrutement/autres ordres |
| Véhicule absent/bloqué | Dégagement, terrain, formation et route praticable |
| Appui expiré avant arrivée | Lifetime compte depuis l’apparition |
| Load déplace les positions | Relative/Absolute et Center actuel |
| Commande différente du brouillon | Confirmation, nom, coordonnées et politique |
| Conflit d’enregistrement | Load de la version actuelle ; garder le brouillon avec Save As |

## Fichiers et référence JSON

Inutile de mémoriser ceci pour l’interface ; il s’agit d’une référence de sauvegarde/édition directe.

- Chemin : `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`
- Schéma actuel : `dochi.warfare.gimmicks.v6` ; v1–v5 restent lisibles.
- `origin` est la référence, `steps` contient les événements et `at_tick` leur tick initial.
- Une étape contient `bombard`, `vehicle_support`, `fire_support` ou `npc_move`.
- `lifetime_ticks` est la durée de l’appui. Les positions enregistrées restent mondiales même avec affichage relatif.
- `explosion_damage` et `direct_damage` sont les dégâts de base en HP. **Zéro annule cette composante** ; vide conserve la valeur native. Rayon et destruction ne changent pas. Distance et armure affectent les dégâts réels.

Les exemples intégrés ne sont installés que s’ils manquent. Conservez les originaux et comparez une copie **Save As**.

Revenez au [premier bombardement](#dochi-warfare-expanded/expanded-support-timeline), ou combinez [véhicules, tirs et PNJ](#dochi-warfare-expanded/expanded-support-actions).
