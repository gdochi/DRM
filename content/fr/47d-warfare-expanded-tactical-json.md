---
title: Référence JSON des ordres tactiques
slug: expanded-tactical-json
order: 334
description: Exemple JSON complet, IDs de fichiers, commandes de rechargement/distribution et limites.
product: dochi-warfare-expanded
category: Appui au combat
section: support
status: Guide
version: 0.3.3
audience: Administrateurs et auteurs d’intégrations
translationSource: en
translationMethod: assisted
---

## Avant de modifier les fichiers

Commencez par le [guide de la GUI des ordres tactiques](#dochi-warfare-expanded/expanded-tactical-orders) pour créer normalement. Cette page sert de référence pour modifier directement les fichiers serveur. Créez les appuis avec le [tutoriel de chronologie](#dochi-warfare-expanded/expanded-support-timeline).

## Exemple de fichier complet

Enregistrez ce fichier complet dans **config/dochi_warfare/vehicle_ai/tactical_orders/tutorial_air_support.json**. L’ID est **tutorial_air_support**, identique au nom du fichier. Il lie le gimmick fourni de frappe précise ; ce gimmick et SuperbWarfare doivent être disponibles. Ce fichier distinct ne remplace pas une tactique installée automatiquement.

```json
{
  "schema": "dochi.warfare.tactical_order.v1",
  "id": "tutorial_air_support",
  "enabled": true,
  "name": "Tutorial air support",
  "description": "Request precision support at the designated point.",
  "gimmick": "sample_a10_point_strike",
  "appearance": {
    "default": "ww2_radio",
    "allowed": [
      "ww2_radio",
      "rugged_tablet"
    ]
  },
  "targeting": {
    "mode": "ground_point",
    "max_distance": 128,
    "require_line_of_sight": true,
    "heading": "caller_yaw"
  },
  "activation": {
    "hold_ticks": 20,
    "consume_self": 1,
    "allow_movement": true
  },
  "limits": {
    "cooldown_group": "air_support",
    "cooldown_ticks": 1200,
    "max_active_per_player": 1,
    "allowed_dimensions": [
      "minecraft:overworld"
    ]
  },
  "hud": {
    "bar_style": "horizontal",
    "guide_color": "#68D0DE",
    "bar_color": "#21AA41"
  },
  "sounds": {
    "rugged_tablet": {
      "cast": {
        "id": "minecraft:block.note_block.pling",
        "volume": 0.27,
        "pitch": 1.33,
        "loop": false
      }
    }
  }
}
```

## Recharger et distribuer les objets

Exécutez ces commandes avec le niveau de permission 2. Vérifiez le résultat du rechargement avant distribution. Le premier give fournit un objet d’apparence par défaut ; le second fournit deux tablettes. Consultez le [guide de visée du joueur](#dochi-warfare-expanded/expanded-tactical-orders) pour les utiliser.

```text
/dw tactical reload
/dw tactical give @s tutorial_air_support
/dw tactical give @s tutorial_air_support rugged_tablet 2
```

## Valeurs acceptées et limites

Un ID contient 1–64 minuscules, chiffres, tirets bas ou tirets et commence par une minuscule ou un chiffre. Extensions, séparateurs de chemin et noms réservés Windows sont refusés. Le catalogue accepte au plus 256 fichiers de 32 KiB chacun. Un nom/ID différent ou un champ inconnu est refusé.

Les durées supposent 20 TPS. Des valeurs acceptées nécessitent toujours des véhicules/armes compatibles, un terrain chargé et une route valide.

| Champ | Valeurs acceptées et signification |
| --- | --- |
| `schema` | Exactement dochi.warfare.tactical_order.v1 |
| `id` | ID identique au nom du fichier JSON |
| `gimmick` | ID de chronologie sauvegardée, sans extension |
| `targeting.mode` | Uniquement ground_point |
| `targeting.max_distance` | 8–512 blocs |
| `targeting.heading` | Uniquement caller_yaw ; direction à la fin du maintien |
| `activation.hold_ticks` | Entier de 1–200 ticks, 0,05–10 secondes |
| `activation.consume_self` | Toujours 1 ; un objet consommé à l’acceptation, même en Créatif |
| `activation.allow_movement` | true autorise le déplacement pendant le maintien |
| `limits.cooldown_group` | Les tactiques du groupe partagent un délai par joueur |
| `limits.cooldown_ticks` | Entier de 0–72000 ticks, jusqu’à une heure |
| `limits.max_active_per_player` | Entier de 1–8 ; concerne toutes les demandes tactiques en cours du joueur |
| `limits.allowed_dimensions` | Liste non vide de 1–32 IDs explicites de dimension |

## Paramètres du HUD et des sons

L’orientation est horizontal ou vertical. Les couleurs utilisent #RRGGBB opaque, sans canal alpha. Omettre hud conserve la barre verticale et les couleurs par défaut.

sounds configure equip/use/cast/fail pour ww2_radio ou rugged_tablet. L’exemple change seulement le son d’acceptation de la tablette ; les autres conservent leurs valeurs par défaut. Volume : 0–1 ; hauteur : 0,5–2. Seul use peut boucler. Un id vide ou un volume nul coupe ce son. L’ID désigne une définition de pack de ressources, pas un chemin OGG ou une URL.

Pour désactiver un préréglage fourni, sauvegardez enabled à false. Le supprimer peut le restaurer au démarrage suivant. Utilisez un autre ID pour personnaliser et conservez les originaux.
