---
title: Radios et tablettes d’ordres tactiques
slug: expanded-tactical-orders
order: 333
description: Créez et distribuez des tactiques, maintenez pour viser et configurez préréglages, délais, HUD et sons.
product: dochi-warfare-expanded
category: Appui au combat
section: support
status: Guide
version: 0.3.3
audience: Creators and players
translationSource: en
translationMethod: assisted
---

## À quoi sert cet objet ?

Ce sont des **objets consommables pour joueurs** de DWE 0.3.3. Les administrateurs lient une chronologie sauvegardée dans Tactical Orders ; les joueurs visent le sol avec une radio ou tablette pour la demander. L’apparence change, mais les deux appareils peuvent utiliser la même tactique.

Serveur et clients nécessitent la même build DWE, un DW compatible et les mods originaux de véhicules/armes. Les appels sont des **combats réels**, sans protection du terrain de Simulation. Les armes natives peuvent blesser alliés, demandeur et terrain.

## Administrateur : créer et distribuer une tactique

1. Avec le niveau de permission administrateur 2, ouvrez la commande ci-dessous ou **Tactical Orders** dans le sélecteur Warfare.
2. Chargez une tactique ou créez un document. Dans **General**, liez un ID de gimmick sauvegardé. Sa modification ouvre l’éditeur de monde existant.
3. Dans **Use & Target**, définissez distance, durée et mouvement autorisé. Dans **Limits**, définissez groupe de délai, limite de demandes et dimensions.
4. Dans **Item & HUD**, choisissez apparence, orientation et couleurs, puis sauvegardez. Activez la tactique et distribuez l’objet. Les joueurs ordinaires n’ont pas besoin d’OP pour l’utiliser.

```text
/dw tactical editor
/dw tactical give @s light_bombardment ww2_radio 1
/dw tactical give @s tank_reinforcement rugged_tablet 1
```

## Joueur : désigner et demander un appui

1. Tenez l’objet en main principale et visez la face supérieure d’un sol chargé. Lisez portée, durée et règle de mouvement dans l’infobulle.
2. Maintenez le bouton d’utilisation. Les guides sont des aperçus ; coordonnées et direction sont confirmées **à la fin du maintien côté serveur**.
3. Bouger annule les tactiques restreintes ; regarder autour reste permis. Relâcher trop tôt ou changer objet, emplacement ou dimension avant acceptation annule la demande.
4. Attendez l’effet et le son d’acceptation du serveur. La barre locale à 100 % n’est pas une acceptation. L’acceptation consomme un objet, même en Créatif, et lance le délai.
5. Relâchez avant de réessayer. L’acceptation ne garantit pas d’impact ; l’appui accepté continue après changement d’objet ou déconnexion.

Les tactiques du même groupe partagent un **délai par joueur**, conservé après reconnexion/redémarrage du serveur. Changer d’apparence ou d’objet ne le réinitialise pas.

## Préréglages d’une nouvelle installation

Ce sont les valeurs nouvellement générées. Les fichiers existants sont préservés : l’infobulle et la configuration serveur priment. Précision, ligne et combiné partagent air_support ; les chars utilisent ground_support. Les exemples utilisent les véhicules de base SuperbWarfare ; modifiez factions et routes dans le gimmick lié.

| ID tactique | Appui | Maintien | Portée | Mouvement | Délai |
| --- | --- | --- | --- | --- | --- |
| light_bombardment | Bombardement précis, un MK-82 | 1 s | 128 | Autorisé | 60 s |
| line_bombardment | Bombardement en ligne, quatre MK-82 | 2 s | 192 | Annule si déplacement | 90 s |
| tank_reinforcement | Deux M1A2 en renfort | 2 s | 96 | Autorisé | 180 s |
| combined_support | Bombardement puis deux M1A2 | 3 s | 128 | Annule si déplacement | 240 s |

## Personnaliser le HUD et les sons

Dans **Item & HUD**, choisissez **Bar: Vertical / Bar: Horizontal**, **Guide color** et **Bar color**. Ce sont des couleurs RGB opaques indépendantes. Cliquez sur **Apply** dans le sélecteur, puis sauvegardez la tactique. Une seule orientation est affichée. Acceptation/échec utilise de courts effets visuels/sonores ; n’attendez pas de message de chat.

Radio et tablette ont des sons distincts d’équipement/utilisation/acceptation/échec. Les sons personnalisés utilisent JSON sounds ; il n’y a pas d’éditeur sonore dans la GUI. Utilisez les IDs d’un pack de ressources, pas des chemins ou URL.

## Si une demande échoue

| Symptôme | Vérifier |
| --- | --- |
| Tactique non attribuée/indisponible | ID, activation, gimmick lié et mods originaux |
| Visée/route refusée | Sol chargé, portée/visibilité, dimension et espace d’approche |
| Maintien annulé | Règle de mouvement, changement d’emplacement/dimension et bouton relâché |
| Délai/limite de demandes | Autres tactiques du groupe et appui en cours |
| Fichier modifié sans effet | ID sauvegardé et commande reload ci-dessous |
| Barre pleine sans appui | Effets serveur d’acceptation/échec ; aéronef/armes et gimmick |

## Référence des fichiers et scripts

Les champs JSON servent de référence pour l’édition directe/intégration ; ils ne sont pas requis pour la GUI.

Les tactiques sont dans **config/dochi_warfare/vehicle_ai/tactical_orders/<id>.json** ; les chronologies dans **config/dochi_warfare/vehicle_ai/gimmicks/**. Les fichiers par défaut s’installent seulement s’ils sont absents. Mettez enabled à false pour désactiver un préréglage : le supprimer peut le restaurer au prochain démarrage. Utilisez Save As avec un autre ID pour personnaliser. Exécutez reload après modification directe.

```text
/dw tactical reload
```

Configurez hold_ticks/allow_movement dans activation, max_distance dans targeting et cooldown_group/cooldown_ticks dans limits. À 20 TPS, 20 ticks font une seconde. hud utilise bar_style/guide_color/bar_color ; sounds utilise equip/use/cast/fail par apparence. Seuls les sons use peuvent boucler.

Les intégrations HUD peuvent dessiner la barre via TacticalOrderHud.renderGauge, réservé au client. Cela affiche seulement le HUD ; cela ne remplace ni acceptation, ni consommation, ni exécution serveur.
