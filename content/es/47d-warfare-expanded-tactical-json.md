---
title: Referencia JSON de órdenes tácticas
slug: expanded-tactical-json
order: 334
description: Ejemplo JSON completo, IDs de archivos, comandos de recarga/entrega y límites de configuración.
product: dochi-warfare-expanded
category: Apoyo de combate
section: support
status: Guide
version: 0.3.3
audience: Administradores y autores de integraciones
translationSource: en
translationMethod: assisted
---

## Antes de editar archivos

Empieza por la [guía de la GUI de órdenes tácticas](#dochi-warfare-expanded/expanded-tactical-orders) para crear normalmente. Esta página es referencia para editar archivos del servidor directamente. Crea el apoyo con el [tutorial de la línea de tiempo](#dochi-warfare-expanded/expanded-support-timeline).

## Ejemplo de archivo completo

Guarda este archivo completo en **config/dochi_warfare/vehicle_ai/tactical_orders/tutorial_air_support.json**. El ID es **tutorial_air_support**, igual que el nombre del archivo. Vincula el gimmick incluido de ataque preciso; ese gimmick y SuperbWarfare deben estar disponibles. El archivo separado no sobrescribe una táctica predeterminada instalada automáticamente.

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

## Recargar y entregar objetos

Ejecuta estos comandos con permiso de nivel 2. Comprueba el resultado de la recarga antes de entregar objetos. El primer give entrega uno con apariencia predeterminada; el segundo entrega dos tabletas. Consulta la [guía de apuntado del jugador](#dochi-warfare-expanded/expanded-tactical-orders) para usarlos.

```text
/dw tactical reload
/dw tactical give @s tutorial_air_support
/dw tactical give @s tutorial_air_support rugged_tablet 2
```

## Valores admitidos y límites

Un ID contiene 1–64 letras minúsculas, dígitos, guiones bajos o guiones y empieza por minúscula o dígito. Se rechazan extensiones, separadores de ruta y nombres reservados de Windows. El catálogo admite hasta 256 archivos, cada uno de hasta 32 KiB. Se rechazan nombres/IDs distintos y campos desconocidos.

Los tiempos suponen 20 TPS. Los valores válidos aún requieren vehículos/armas compatibles, terreno cargado y una ruta válida.

| Campo | Valores admitidos y significado |
| --- | --- |
| `schema` | Exactamente dochi.warfare.tactical_order.v1 |
| `id` | ID igual al nombre del archivo JSON |
| `gimmick` | ID de línea de tiempo guardada, sin extensión |
| `targeting.mode` | Solo ground_point |
| `targeting.max_distance` | 8–512 bloques |
| `targeting.heading` | Solo caller_yaw; dirección al terminar el tiempo |
| `activation.hold_ticks` | Entero de 1–200 ticks, 0,05–10 segundos |
| `activation.consume_self` | Siempre 1; consume uno al aceptar incluso en Creativo |
| `activation.allow_movement` | true permite mover el cuerpo durante el uso |
| `limits.cooldown_group` | Las tácticas del grupo comparten espera por jugador |
| `limits.cooldown_ticks` | Entero de 0–72000 ticks, hasta una hora |
| `limits.max_active_per_player` | Entero de 1–8; cuenta todas las solicitudes tácticas activas del jugador |
| `limits.allowed_dimensions` | Lista no vacía de 1–32 IDs explícitos de dimensión |

## Ajustes de HUD y sonido

La orientación es horizontal o vertical. Los colores usan #RRGGBB opaco, sin canal alfa. Omitir hud usa la barra vertical y los colores predeterminados.

sounds configura equip/use/cast/fail para ww2_radio o rugged_tablet. El ejemplo cambia solo el sonido de aceptación de la tableta; los demás conservan los predeterminados. Volumen: 0–1; tono: 0,5–2. Solo use puede repetirse. id vacío o volumen 0 silencia el evento. El ID es una definición registrada por un paquete de recursos, no una ruta OGG o URL.

Para desactivar un preajuste incluido, guarda enabled como false. Borrarlo puede restaurarlo al iniciar. Usa otro ID para personalizar y conserva los originales.
