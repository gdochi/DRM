---
title: API de scripts del creador de ventanas emergentes
slug: script-popup-api
order: 131
description: Utilice drmPopup en CustomNPCs scripts para reproducir definiciones de Popup Maker y anular el texto de la presentación o la temporización de la línea de tiempo.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs autores de presentaciones de diálogo, búsqueda y combate
tags:
  - script
  - customnpcs
  - popup
  - forge
translationSource: en
translationMethod: assisted
---

## Mostrar una ventana emergente guardada de un script

Primero cree el título y el cuerpo en [Popup Maker](#core/world-npc-tools) y guarde una definición. Luego, un script selecciona ese nombre de archivo y lo reproduce para un reproductor. Este ejemplo guarda village_entry y lo llama con 10-tick fade-in, 80-tick hold y 20-tick fade-out.

![Muestra una ventana emergente guardada de un resultado de script.](assets/media/guides/drm-031-forge1201-apis/api-popup-shown.png "DRM 0.3.1 / Forge 1.20.1 con CustomNPCs. La llamada real PopupScriptApi.timed envía a un jugador y muestra Village Gate. No es un disparador automático de entrada de región.")

## Sinopsis

`drmPopup` es un objeto de script global CustomNPCs que reproduce definiciones guardadas por Popup Maker para jugadores de servidor. Solo expone las acciones de presentación. Las operaciones de edición, listado y recarga de definiciones permanecen en la interfaz gráfica de usuario de Popup Maker.

```js
function interact(event) {
    drmPopup.show(event.player, "village_entry.json");
}
```

El primer argumento resuelve los jugadores receptores. El segundo es un archivo de definición de Popup Maker; el sufijo `.json` es opcional.

:::warning Requisito de tiempo de ejecución
`drmPopup` se registra cuando Forge 1.20.1 DRM y CustomNPCs se cargan juntos. Llámalo al servidor. Un objetivo que resuelve ningún jugador del servidor devuelve `0`.
:::

## Configuración

1. Abra **Popup Maker** de la lista de editores integrada DRM.
2. Establecer título, subtítulo, cuerpo, desvanecimiento, retención, desvanecimiento, canal y comportamiento de conflicto.
3. Seleccione una GUI JSON y use **Edit Layout** cuando las posiciones de los componentes o texturas necesiten cambios.
4. Guarde la definición y pase ese nombre de archivo a `drmPopup`.

Las definiciones se administran bajo los datos `dochi_rpg_maker/popups/definitions` del servidor y cargan su JSON de GUI seleccionado desde el almacén de GUI compartido. La API de script no acepta JSON de definición sin procesar.

## Tabla de Método Completo

| Método | Devoluciones | Comportamiento |
| --- | ---: | --- |
| `show(targets, definition)` | Jugadores enviados | Reproducir la definición guardada sin cambios |
| `text(targets, definition, text)` | Jugadores enviados | Anular solo el cuerpo `text` |
| `timed(targets, definition, fadeIn, hold, fadeOut)` | Jugadores enviados | Invalida los tres segmentos de línea de tiempo |
| `timed(targets, definition, fadeIn, hold, fadeOut, text)` | Jugadores enviados | Anular el tiempo y un cuerpo no vacío |
| `stop(targets, instanceKey)` | Jugadores enviados | Detener la clave de instancia emergente correspondiente |
| `clear(targets)` | Jugadores enviados | Eliminar todas las ventanas emergentes activas y en cola |
| `lastError()` | Cuerda | La razón más reciente del fracaso, vacía después del éxito |

Los argumentos de tiempo son Minecraft ticks; 20 ticks son normalmente alrededor de un segundo.

:::note Lo que significa `timed`
`timed` no crea una interfaz de cuenta regresiva separada. Cambia la duración de presentación de fundido, espera y desvanecimiento de la ventana emergente para esa llamada.
:::

## Objetivos

`targets` puede ser un reproductor servidor, una envoltura de reproductor CustomNPCs, una matriz o una colección iterable. Los jugadores duplicados se envían una vez.

```js
drmPopup.show(event.player, "area_title");

drmPopup.text(
    [event.player, anotherPlayer],
    "quest_notice.json",
    "Quest updated"
);
```

La resolución está limitada a 1,024 jugadores distintos y cuatro niveles de anidación. Los NPC y las criaturas ordinarias no pueden recibir una ventana emergente.

## Texto del cuerpo, saltos de línea y marcadores de posición

Utilice `\n` en una cadena JavaScript para un salto de línea de cuerpo explícito.

```js
drmPopup.text(
    event.player,
    "area_title.json",
    "Northern Frontier\nA new region has been discovered."
);
```

Título guardado, subtítulos, cuerpo y soporte de texto de cuerpo anulado por marcador de posición de jugador.

| Formularios | Valor |
| --- | --- |
| `@player`, `{player}`, `${player}`, `%player%` | Recibir el nombre del jugador |
| `{uuid}`, `${uuid}`, `%uuid%` | Recepción del jugador UUID |
| `@npc`, `{npc}`, `${npc}`, `%npc%` | Nombre del NPC proporcionado por un contexto de presentación DRM |

`@npc` se resuelve automáticamente solo cuando una ruta DRM, como una acción de diálogo, abre un contexto de presentación NPC. Una llamada directa al script `drmPopup` no tiene argumento NPC, así que componga ese texto explícitamente cuando sea necesario.

```js
var body = String(event.npc.getName()) + "\nhas discovered a new area.";
drmPopup.text(event.player, "area_title.json", body);
```

## Invalidaciones de tiempo

Esta ventana emergente se desvanece para 10 ticks, se mantiene para 60 y se desvanece para 20.

```js
drmPopup.timed(event.player, "area_title.json", 10, 60, 20);
```

Añadir un argumento final para anular el cuerpo también.

```js
drmPopup.timed(
    event.player,
    "quest_notice.json",
    5,
    100,
    15,
    "Objective complete\nReturn to @npc"
);
```

Un cuerpo final vacío preserva el cuerpo salvado. Use `text(targets, definition, "")` cuando el cuerpo deba limpiarse.

## Comportamiento de conflicto y detención

El valor de la definición `conflict` se superpone dentro del mismo canal.

| Valor | Comportamiento |
| --- | --- |
| `replace` | Reemplazar la ventana emergente del canal activo y su cola |
| `refresh` | Reemplazar la ventana emergente activa con una instancia nueva |
| `queue` | Jugar después de que termine el popup actual |
| `stack` | Juega simultáneamente con el espaciado vertical |
| `ignore` | Ignorar una solicitud mientras el canal está activo |

`show`, `text` y `timed` devuelven los recuentos en lugar de los UUID en tiempo de ejecución generados. Utilice el `instanceKey` guardado en la definición cuando se detiene de un script.

```js
drmPopup.stop(event.player, "area_title");
drmPopup.clear(event.player);
```

## Límites y errores de la política

La GUI de la política emergente aplica estos valores a los scripts:

- `allowTextOverride` para `text` y llamadas con texto `timed`
- `allowTimingOverride` para `timed`
- `maxTextLength` para título, subtítulo y cuerpo
- `maxDurationTicks` para la línea de tiempo completa
- `maxActivePerPlayer` y `maxQueuedPerPlayer` para los límites de tiempo de ejecución

Una definición o GUI faltante, o una anulación bloqueada, devuelve `0` y almacena el motivo en `lastError()`.

```js
var sent = drmPopup.text(event.player, "quest_notice.json", "Quest updated");
if (sent == 0) {
    event.npc.say("popup failed: " + drmPopup.lastError());
}
```

## Combinando habilidades Cross-Mod

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "cataclysm:void_rune",
        event.player,
        4,
        drmSkill.options().set("damage", 14)
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "skill_notice.json",
            "Void Rune\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

Consulte **Cross-Mod Skill Script API** para el descubrimiento de proveedores, ID de habilidades, lanzamientos de destino y dirección, opciones, códigos de resultados y tiempos de reutilización.

## Solución de problemas

1. Si `drmPopup` no está definido, verifique que Forge DRM y CustomNPCs se carguen juntos.
2. `Unable to load popup definition` significa que el nombre del archivo de Popup Maker es incorrecto o falta.
3. Un error de carga de GUI significa que la GUI JSON seleccionada de la definición está ausente del almacén de GUI compartido.
4. Si solo falla `text` o `timed`, inspeccione los modificadores de anulación de la política emergente.
5. Para una ventana emergente invisible, inspeccione la definición y el componente `enabled`, el comportamiento del conflicto de canal y los límites de activo/cola.
