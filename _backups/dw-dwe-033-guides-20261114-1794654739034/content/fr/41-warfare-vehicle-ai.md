---
title: SuperbWarfare Véhicule IA
slug: warfare-vehicle-ai
order: 370
description: Configurez SuperbWarfare les mouvements de surface et d'air, les cibles, les armes, les munitions virtuelles, l'équipage des PNJ, les profils et les commandes.
product: dochi-warfare
category: Véhicule AI
section: vehicles
status: Projet
version: 0.3.2
audience: Créateurs et opérateurs de scénarios
tags:
  - SuperbWarfare
  - vehicle
  - ai
translationSource: en
translationMethod: assisted
---

**DWE 0.3.2** fournit les véhicules sur Forge 1.20.1, NeoForge 1.21.1 et Fabric 1.21.1. Voir [installation et fichiers](#dochi-warfare-expanded/expanded-overview), [réactions](#dochi-warfare-expanded/expanded-vehicle-gimmicks) et la [timeline remaniée](#dochi-warfare-expanded/expanded-support-timeline).

DW reste le noyau obligatoire. Les API utilisées sont vérifiées sans imposer des numéros DW/DWE identiques. Voir [installation par chargeur](#dochi-warfare/warfare-setup) pour les dépendances externes.

## Exigences et éditeur

L'IA du véhicule est une intégration SuperbWarfare facultative. Correspond au chargeur et à la version prise en charge décrits dans le guide d'installation. En mode créatif, maintenez la touche `DW Npc Core` enfoncée et cliquez avec le bouton droit sur un véhicule pris en charge. Cela ouvre un éditeur de véhicule séparé de l'éditeur PNJ d'infanterie.

DW utilise le moteur natif `processInput` ou les commandes de vol. SuperbWarfare continue de posséder la physique du moteur, la vitesse, la collision, l'énergie, les tourelles, les armes, les rechargements, les projectiles et les sons; DW ne remplace pas directement la position, la rotation ou la vitesse. Un joueur qui monte à bord d’un véhicule IA est démonté pour des raisons de sécurité, alors désactivez l’IA avant de le conduire. L'équipage DNPC ou CustomNPCs placé à travers l'éditeur du véhicule peut rester à bord.

![Résumé de la détection, de la mémoire et de la protection amicale.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE 0.3.1 / NeoForge 1.21.1. Vue d'ensemble résume les valeurs actuelles; les paramètres du véhicule sont stockés séparément des PNJ d'infanterie.")

## Modes de déplacement

| Mode veille | Comportement |
| --- | --- |
| `Stationary` | Restez à la position sauvegardée jusqu'à ce que le combat ou un ordre explicite nécessite un mouvement. |
| `Area Patrol` | Distribuer les destinations à travers les secteurs de la région d'origine et éviter les secteurs récemment visités. |
| `Return Only` | Rentrez chez vous, puis attendez. |
| `Route Patrol` | Suivez les waypoints enregistrés et appliquez le temps d'attente configuré à chaque point. |

Le mouvement de combat est configuré séparément comme `Hold Position`, `Advance` ou `Retreat`. La maintenance à portée minimale peut temporairement reculer lorsque l'arme de référence est trop proche ou que sa tourelle ne peut pas appuyer assez loin pour toucher la cible.

### Mouvement du sol et de l'eau

Les profils à roues, à chenilles et de navire utilisent un comportement d'empreinte, de rayon de virage, de marche, de pente, de support, d'obstacle, de limite d'eau et de récupération bloquée. Les itinéraires sont planifiés uniquement à travers un terrain chargé avec des travaux de recherche limités.

En 0.2.9, Area Patrol marque huit secteurs relatifs à la maison au lieu de répéter un petit cercle autour de la position actuelle. Poussée et rampe de freinage à partir de la distance restante, de la vitesse actuelle, de la distance d'arrêt, de la demande de virage et de l'état de l'obstacle, évitant les lancements à pleine puissance pour les mouvements courts.

### Hélicoptères et avions

Les hélicoptères utilisent la puissance du rotor natif et l'entrée de la souris pour le décollage, la retenue d'altitude, l'accélération vers l'avant, le freinage, la montée d'obstacle, l'approche de destination, le vol stationnaire et le retour de la barrière géographique. Avec un rayon de patrouille suffisant, Area Patrol relie des arcs plus longs plutôt que de s'arrêter complètement à chaque point court.

Les aéronefs à voilure fixe utilisent des entrées natives d'accélérateur, de tangage, de roulis et de train d'atterrissage pour le roulis au sol, le décollage, la montée, la croisière, l'approche, l'évitement du terrain et le flâneur près d'une destination. Parce que les avions ne peuvent pas s'arrêter en l'air, ils ne supportent pas `Pause movement before fire` et ont besoin de suffisamment d'espace pour tourner.

## Sensibilisation et objectifs

Le ciblage de véhicule combine les identifiants d'entité, les balises de tableau de bord requises / rejetées, les règles de faction et la protection propriétaire / équipe / amicale. La sensibilisation comprend le rayon de détection, le champ de vision horizontal, le délai de réaction, la détection rapprochée, les alertes de dommages, la défense de faction, la mémoire de cible et la détection sonore.

`Nearest` Sélectionnez la distance. `Custom` combine le poids personnel/vivant, le poids des véhicules terrestres/de surface et le poids des véhicules aériens avec un bonus de représailles, la rétention de la cible actuelle, la distance et l'écart de commutation. La balise `dochi_warfare_vehicle_target` peut marquer une cible explicite mais ne contourne pas les contrôles propriétaire, équipe, faction, portée ou tir amical.

## Armes et munitions virtuelles

La page `Weapons` est propriétaire de l'activation des armes. Chaque montage natif dispose de paramètres indépendants pour :

- ON/OFF et préférence 0-100
- Exactitude et catégories de cibles au sol/surface et aériennes
- Entité, faction, étiquette et état de santé des véhicules
- Native/par défaut ou portée minimale et maximale manuelle
- Comportement de pause avant le feu (sauf à voilure fixe) et tic-tac d'attente au feu
- Héritage mondial de munitions ou magazine illimité/limité par arme, réserve et rechargement
- Toujours actif ou nécessitant DNPC/CustomNPCs de l'équipage dans le siège de contrôle lié

`Weapon use mode` sélectionne uniquement les armes qui sont activées et actuellement éligibles, puis en utilise une, un nombre configuré ou chaque arme éligible par opportunité d'attaque. Une arme OFF ne participe pas à la sélection du candidat ou de la portée de référence.

Utilisez les paramètres de munitions de DW pour le stock et les rechargements de véhicules; vous n'avez pas besoin de placer des munitions ou des magazines dans la main gauche d'un membre d'équipage.

## Équipage de PNJ

La page `Crew` affiche les sièges du véhicule sur une carte supérieure ou latérale. La sélection d'un siège indique sa position locale, son occupation, son rôle de conducteur / tourelle / station d'armes / passager, son état caché et sa visibilité.

Pour un siège vide, `Board NPC` peut utiliser:

- Un clone PNJ JSON du serveur Entity Clone Library
- Une pierre d'âme remplie de PNJ dans l'inventaire principal du joueur, son armure ou sa machine à sous

Le serveur revalide l'autorisation créative, la distance de bloc 64, l'état du siège, le type de PNJ, le chemin du clone, l'emplacement de la pierre de l'âme et l'hostilité des factions. Un nouveau PNJ est désinfecté de l'UUID, de la position, de la propriété et de l'état de combat en direct, puis placé dans le siège exact sélectionné. L'équipage des PNJ peut être démonté de cet éditeur. DNPC utilise des clones PNJ JSON; les pierres d'âme sont une source distincte nécessitant CustomNPCs.

![La carte des sièges de l'équipage de base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Sélectionnez un numéro de siège pour inspecter son rôle et son occupant à droite. Il s'agit d'une carte de siège vide, pas d'un résultat d'embarquement terminé. C'est le véhicule de base SuperbWarfare, distinct du MCSP M1A2.")

### Voir l'équipage et l'IA du véhicule

Deux membres d'équipage DNPC déjà préparés montent dans le M1A2 de base de SuperbWarfare, qui suit un ordre **Move To**. Le véhicule passe ensuite au combat stationnaire et tire sur une cible d'entraînement. La vidéo montre le résultat en jeu ; utilisez la page Crew ci-dessus pour choisir les sources de PNJ et les sièges, puis configurez les règles de déplacement et de ciblage avant d'activer l'IA.

![Deux PNJ montent dans un M1A2, l'IA le conduit et ses armes tirent sur une cible d'entraînement.](assets/media/guides/runtime-videos-20261106/vehicle-ai-crew-drive.mp4 "DW + DWE 0.3.2 + DNPC 0.1.3 + SuperbWarfare 0.8.9.1 / NeoForge 1.21.1, interface en anglais. Équipage et règles préparés → embarquement → déplacement par IA → détection et tir.")

## Profils, pierres d'âme et clones

`Save As` et `Load` stockent les profils IA des véhicules réutilisables sous :

```text
config/dochi_warfare/vehicle_ai/profiles/
```

Les profils omettent l'identité de l'entité vivante et l'état de position mondiale. Les pierres d'âme CustomNPCs vides peuvent capturer des véhicules pris en charge SuperbWarfare et les redéployer tout en préservant les données natives et les paramètres DW. `Clone` stocke un modèle de véhicule serveur aseptisé ; faites un clic droit dans l'air avec `DW Npc Core` pour l'invoquer à partir de la bibliothèque clone.

## Commandes d'opérateur

Les commandes nécessitent une autorisation de niveau 2. Regardez directement un véhicule SuperbWarfare dans les blocs 24, puis utilisez :

```text
/dw vehicle_ai enable
/dw vehicle_ai disable
/dw vehicle_ai wander
/dw vehicle_ai guard
/dw vehicle_ai engage
/dw vehicle_ai move_to_me
/dw vehicle_ai return_home
/dw vehicle_ai patrol_add
/dw vehicle_ai patrol_clear
/dw vehicle_ai status
```

L'interface graphique est le flux de travail du créateur principal. Les commandes sont destinées à des opérations en direct, des commandes rapides et des diagnostics d'état.
