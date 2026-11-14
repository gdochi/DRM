---
title: Radios y tabletas de órdenes tácticas
slug: expanded-tactical-orders
order: 333
description: Crea y entrega tácticas, mantén pulsado para apuntar y configura preajustes, esperas, HUD y sonidos.
product: dochi-warfare-expanded
category: Apoyo de combate
section: support
status: Guide
version: 0.3.3
audience: Creators and players
translationSource: en
translationMethod: assisted
---

## ¿Qué hace el objeto?

Son **objetos consumibles para jugadores** de DWE 0.3.3. Los administradores vinculan una línea de tiempo guardada en Tactical Orders; los jugadores apuntan una radio o tableta al suelo para solicitarla. Cambian la apariencia y los sonidos, pero ambos dispositivos pueden usar la misma táctica.

Servidor y clientes requieren la misma build DWE, DW compatible y los mods originales de vehículos/armas. Las llamadas son **combate real**, sin protección del terreno de Simulation. Las armas nativas pueden dañar aliados, al solicitante y el terreno.

## Administrador: crear y entregar una táctica

1. Con permiso de administrador nivel 2, abre el comando de abajo o **Tactical Orders** en el selector Warfare.
2. Carga una táctica o crea un documento. En **General**, vincula un ID de gimmick guardado. Editarlo abre el editor de mundo existente.
3. En **Use & Target**, configura distancia, tiempo y movimiento permitido. En **Limits**, el grupo de espera, límite de solicitudes y dimensiones.
4. En **Item & HUD**, elige apariencia, orientación y colores; guarda. Activa la táctica y entrega el objeto. Los jugadores normales no necesitan OP para usarlo.

```text
/dw tactical editor
/dw tactical give @s light_bombardment ww2_radio 1
/dw tactical give @s tank_reinforcement rugged_tablet 1
```

## Jugador: señalar y pedir apoyo

1. Sostén el objeto en la mano principal y apunta a la cara superior de suelo cargado. Lee alcance, tiempo y regla de movimiento en la descripción.
2. Mantén pulsado usar. Las guías son vistas previas; coordenadas y dirección se confirman **cuando termina el tiempo en el servidor**.
3. Mover el cuerpo cancela las tácticas restringidas; mirar alrededor está permitido. Soltar antes o cambiar objeto, ranura o dimensión antes de la aceptación cancela la solicitud.
4. Espera el efecto y sonido de aceptación del servidor. La barra local al 100% no confirma aceptación. Aceptar consume un objeto incluso en Creativo e inicia la espera.
5. Suelta antes de reintentar. Aceptación no garantiza impacto; el apoyo aceptado continúa al cambiar de objeto o desconectarse.

Las tácticas del mismo grupo comparten una **espera por jugador**, conservada al reconectar/reiniciar el servidor. Cambiar apariencia u objeto no la reinicia.

## Preajustes de una instalación nueva

Son valores predeterminados recién generados. Los archivos existentes se conservan; prevalecen la descripción del objeto y el servidor. Precisión, línea y combinado comparten air_support; tanques usan ground_support. Los ejemplos usan vehículos básicos SuperbWarfare; modifica facciones y rutas en el gimmick vinculado.

| ID de táctica | Apoyo | Mantener | Alcance | Movimiento | Espera |
| --- | --- | --- | --- | --- | --- |
| light_bombardment | Bombardeo preciso, un MK-82 | 1 s | 128 | Permitido | 60 s |
| line_bombardment | Bombardeo en línea, cuatro MK-82 | 2 s | 192 | Moverse cancela | 90 s |
| tank_reinforcement | Refuerzo de dos M1A2 | 2 s | 96 | Permitido | 180 s |
| combined_support | Bombardeo seguido de dos M1A2 | 3 s | 128 | Moverse cancela | 240 s |

## Personalizar HUD y sonidos

En **Item & HUD**, elige **Bar: Vertical / Bar: Horizontal**, **Guide color** y **Bar color**. Son colores RGB opacos independientes. Pulsa **Apply** en el selector y guarda la táctica. Solo se muestra una orientación. Aceptación/fallo usa efectos visuales/sonoros breves; no esperes un aviso en el chat.

Radio y tableta tienen sonidos distintos al equipar/usar/aceptar/fallar. Personalízalos con JSON sounds; no hay editor de sonidos en la GUI. Usa IDs registrados por un paquete de recursos, no rutas o URL.

## Si falla una solicitud

| Síntoma | Comprobar |
| --- | --- |
| Táctica sin asignar/no disponible | ID, activación, gimmick vinculado y mods originales |
| Apuntado/ruta rechazados | Suelo cargado, alcance/visibilidad, dimensión y espacio de aproximación |
| Uso cancelado | Regla de movimiento, cambios de ranura/dimensión y soltar botón |
| Límite de espera/solicitudes | Otras tácticas del grupo y apoyo activo |
| Cambios del archivo no aparecen | ID guardado y comando reload de abajo |
| Barra llena sin apoyo | Efectos de aceptación/fallo del servidor; aeronave/armas y gimmick |

## Referencia de archivos y scripts

Los campos JSON son referencia para edición directa/integración, no requisitos para usar la GUI.

Las tácticas están en **config/dochi_warfare/vehicle_ai/tactical_orders/<id>.json**; las líneas de tiempo en **config/dochi_warfare/vehicle_ai/gimmicks/**. Los valores por defecto se instalan solo si faltan. Pon enabled en false para desactivar un preajuste: borrarlo puede restaurarlo al iniciar. Usa Save As con otro ID para personalizar. Ejecuta reload tras editar directamente.

```text
/dw tactical reload
```

Configura hold_ticks/allow_movement en activation, max_distance en targeting y cooldown_group/cooldown_ticks en limits. A 20 TPS, 20 ticks son un segundo. hud usa bar_style/guide_color/bar_color; sounds usa equip/use/cast/fail por apariencia. Solo los sonidos use pueden repetirse.

Las integraciones HUD pueden dibujar la barra con TacticalOrderHud.renderGauge, exclusivo del cliente. Solo representa la pantalla; no sustituye aceptación, consumo ni ejecución en el servidor.

Para editar archivos directamente, consulta el [ejemplo JSON completo y límites](#dochi-warfare-expanded/expanded-tactical-json). Crear y entregar por GUI no requiere memorizar estos campos.
