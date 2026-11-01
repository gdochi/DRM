---
title: Resto de condiciones, acciones y permisos
slug: remnant-message-policy
order: 116
description: Elija quién puede usar o leer un mensaje y qué sucede cuando se lee.
product: core
category: Remnant Msg
section: remnant-msg
status: Guía
version: 0.3.1
audience: Creadores y operadores
translationSource: en
translationMethod: assisted
---

## Decidir quién puede leer el aviso

Cree un mensaje [Remnant](#core/remnant-msg), luego configure **Interact Conditions / View Conditions / View Actions**. Siga [ la colocación de marcadores ](#core/remnant-marker-gui) para ponerlo en el mundo.

| Comportamiento deseado | Abrir |
| --- | --- |
| Restringir quién puede usar el marcador | Condiciones de interacción |
| Restringe a quien ve su cuerpo | Ver Condiciones |
| Dar un elemento, establecer una etiqueta o realizar otra acción en la lectura | Ver acciones |

Después de agregar condiciones, también habilite su interruptor **Enable**. ** y** requiere todas las condiciones; ** o** requiere una. Elija si las acciones de vista ocurren cada vez o una vez por jugador, y luego guarde.

![Ver condiciones Habilitar la lista de interruptores y condiciones.](assets/media/guides/drm-031-forge1201/remnant-view-conditions.png "DRM 0.3.1 / Forge 1.20.1. Agregar una regla y habilitar sus comprobaciones son pasos separados. Uso de controles de interacción; Visualización de mensajes de controles de vista.")

## Referencia de archivo de mensaje

El editor puede escribir estos ajustes. Utilice esta tabla cuando inspeccione un archivo externo.

| Campo | Significado |
| --- | --- |
| id / nombre / habilitado | Identidad guardada, nombre de la lista y si se usa |
| mensaje / messageStyles | Rangos de cuerpo y texto estilizado |
| gui | El diseño conectado remnant_msg |
| useConditions / messageConditions | Condiciones de interacción y visualización |
| messageActionsEnabled / messageActions | Si se ejecutan acciones de vista y su contenido |
| messageTrigger | `every_view` o `once_per_player` |

Los estilos de mensaje pueden colorear, negrita, cursiva, subrayar o golpear a través de rangos del cuerpo. Las condiciones usan la misma familia general como condiciones de diálogo.

## Permisos de directiva de servidor

La política controla lo que los autores pueden hacer; no contiene un cuerpo de mensajes.

| Campo de políticas | Controles |
| --- | --- |
| generalUseAllowed | Setter/uso de marcadores para el jugador común |
| generalCanWriteMessage | Escritura de texto directo para jugadores comunes |
| generalCanUseJson / generalCanUseTriggers | Mensaje guardado de jugador común y uso del disparador |
| adminCanUseJson / adminCanUseTriggers | Mensaje guardado del administrador y uso del desencadenador |
| consumeSetterOnGeneralUse | Si el uso ordinario consume el setter |
| markerLifetimeTicks | Marcador de por vida |
| maxMessageLength | Límite de longitud corporal |

El paquete `default_policy.json` permite el uso ordinario y la escritura directa, pero deshabilita el uso ordinario de JSON/trigger. Los administradores pueden usar JSON y disparadores. Los valores predeterminados no consumen el setter, usa caracteres de por vida 0 y permite 4096. Una política existente se conserva en la actualización.

Mantenga los cuatro roles separados: el mensaje **** define el contenido, ** la política** define el permiso, **GUI** define el diseño y ** el marcador** define la ubicación del mundo. Una GUI no puede otorgar permisos; las condiciones de un mensaje se aplican solo a ese mensaje.
