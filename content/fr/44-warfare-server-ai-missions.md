---
title: Serveur IA et support de combat
slug: warfare-server-ai-missions
order: 385
description: Séparez les politiques d'IA des PNJ et des véhicules et utilisez les calendriers de support DWE.
product: dochi-warfare
category: Outils du monde
section: tools
status: Projet
version: 0.3.1
audience: Opérateurs de serveurs et cartographes
tags:
  - server
  - ai
  - missions
translationSource: en
translationMethod: assisted
---

## Si l'IA activée d'un PNJ ne fait toujours rien

Une stratégie de serveur peut bloquer une fonctionnalité activée sur un PNJ individuel. Ouvrez **Minecraft Mods → Dochi’s Warfare → Config → DW Server AI** pour vérifier l'autorisation du serveur. Ceci est séparé de la page Sense ou Cover ouverte en faisant un clic droit sur un PNJ. L'enregistrement des modifications nécessite une autorisation du serveur de niveau deux.

![Stratégie d'IA du serveur dans l'écran Config de DW.](assets/media/guides/warfare-031-neo1211/dw-server-ai-policy.png "Politique actuelle du serveur dans DW 0.3.1 / NeoForge 1.21.1. Lire le bouton ON/OFF de la fonctionnalité, État disponible et explication de OFF ensemble. Cette instance autorisait initialement toutes les fonctionnalités.")

1. Trouvez la fonction bloquée, telle que **Cover AI** ou **Hearing / investigation**.
2. Définissez-le pour l'autoriser sur le serveur.
3. Appuyez sur **Save** ci-dessous pour soumettre la politique.
4. Revenez à la couverture individuelle du PNJ, aux sens ou à d'autres paramètres et configurez ses conditions.

**Basic combat preset** restreint les fonctionnalités étendues de l'IA ensemble. **Allow all features** supprime ces verrous globaux. Ces boutons n'écrasent pas le comportement détaillé de chaque PNJ avec des valeurs identiques. Vérifiez la stratégie actuelle avant de sélectionner un préréglage.

## Caractéristiques qui dépendent l'une de l'autre

| Stratégie du serveur | Comportement connexe |
| --- | --- |
| Mémoire cible de combat | L'éteindre empêche également le feu de suppression, qui dépend de la mémoire de combat. |
| Mouvement tactique / Cover AI | L'autorisation globale nécessite toujours des paramètres par NPC et un terrain accessible. |
| Mercenary AI | L'expiration du contrat, la protection de la propriété et les ordres de retenue restent. Cela ne met pas en pause le temps de contrat. |
| Pièges PNJ grenade AI / Booby | Les grenades lancées et les pièges placés ont des autorisations distinctes. |

La désactivation d'une fonctionnalité conserve les valeurs PNJ pour réutilisation lorsqu'elle est à nouveau autorisée. Le fichier de stratégie du serveur est `config/dochi_warfare/server-ai.json`.

## Véhicules et séquences de soutien

**DWE 0.3.1** gère la politique globale de l'IA des véhicules séparément. La modification de la politique PNJ ne s'applique pas à chaque modification du comportement du véhicule. La politique du véhicule est stockée en `config/dochi_warfare/vehicle_ai/server-ai.json`.

Construisez des bombardements, des mitraillages, des renforts de véhicules et des mouvements PNJ dans la chronologie de soutien [DWE ](#dochi-warfare-expanded/expanded-support-timeline).

![DWE soutient l'éditeur de chronologie.](assets/media/guides/warfare-expanded-031-neo1211/dwe-gimmick.png "Réel DWE 0.3.1 / NeoForge 1.21.1 éditeur. La stratégie serveur accorde la permission ; la chronologie définit la séquence lors de l'appel. Cette capture d'écran à elle seule ne permet pas de vérifier un bombardement exécuté.")

Appelez un nom de support enregistré avec `/dw callgimmicks <name> [x y z]`. Suivez le guide chronologique lié de la création à l'exécution mondiale.
