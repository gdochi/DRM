---
title: Battle Presentation Maker Guía funcional
slug: cobblemon-battle-presentation
order: 530
description: Haz una entrada de entrenador con texto, imágenes, modelos y sonido.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores de presentación de batalla
tags:
  - presentation
  - editor
  - workflow
translationSource: en
translationMethod: assisted
---

## Editar la escena en un momento específico

Usa la vista previa central junto con la línea de tiempo debajo de ella. Esta es la entrada de Entrenador predeterminada en **tick 0**. Utilice **Play** o arrastre la regla hasta el momento en que aparezca el texto, los modelos y los efectos.

![Línea de tiempo de entrada y capa predeterminada en 0/144 ticks.](assets/media/guides/cobble-029-neo1211/cobble-presentation.png "0.2.9 / NeoForge 1.21.1. Las capas/categorías están a la izquierda; los ajustes para la capa seleccionada son correctos. Esta es la vista de creación, antes de la reproducción en tiempo de ejecución.")

## Hacer una entrada

1. Abra **Battle Presentation Maker** de la lista del editor DRM y cargue un ejemplo.
2. Utilice **Add Label** para el texto VS y **Add Texture** para las imágenes.
3. Organizar texto, imágenes y modelos en el lienzo.
4. Establezca sus tiempos de inicio/fin en la línea de tiempo y reproduzca la vista previa.
5. Usar **Save As**.
6. Elija el archivo debajo del entrenador **General → Battle Presentation**.

La escena juega antes de la batalla. **Duration** es su longitud; la ronda **Battle start delay** es la espera adicional después. **Skippable** permite que los jugadores se salten.

## Cuatro áreas de trabajo

| Zona | Interacción | Resultado guardado |
| --- | --- | --- |
| Capas | Agregar, seleccionar, quitar y arrastrar las filas Etiqueta, Textura y Color | Lista de elementos y orden Z |
| Canvas | Previsualizar el tick actual y seleccionar o mover directamente elementos y actores | Elemento de inicio/fin de posición o actor X/Y |
| Inspector | Cambiar entre elemento, modelos, fondo y audio | Contenido, transformaciones, movimiento, actores y sonidos |
| Cronología | Controles de reproducción, pausa, reinicio, depuración y rango de arrastre | Rangos activos por elemento |

El modelo de jugador y el modelo de oponente son filas de actores especiales que no se pueden eliminar. Desactivar `Render Selected Model` para ocultar uno. Arrastrar filas de usuario vuelve a calcular los valores Z para que la lista, la vista previa y el documento guardado usen el mismo orden.

## Límites y coordenadas

| Artículo | Rango |
| --- | ---: |
| Duración | 1–600 garrapatas, hasta 30 segundos |
| Elementos | Hasta 64 |
| Etapa predeterminada | 960×540 coordenadas lógicas |
| Anchura / altura del elemento | 1–3840 / 1–2160 |
| Z | -1000–1000 |
| Texto de la etiqueta | Hasta 512 caracteres |
| Tamaño de fuente | 4–128 |
| Escala de movimiento | 0.01–20 |
| Rotación de movimiento | 3600– 3600 grados |
| Alfa y opacidad de la imagen | 0–1 |

El origen de la Etapa está en la parte superior izquierda; X aumenta a la derecha e Y aumenta hacia abajo. El centro predeterminado es X 480, Y 270. La proyección en tiempo de ejecución asigna el escenario a la ventana y el contenido de las tijeras fuera del puerto de visualización.

## Acciones de archivo

| Medidas adoptadas | Comportamiento |
| --- | --- |
| `Create New` | Abre una plantilla segura y el tutorial guiado. |
| `Reset` | Restaura el valor predeterminado de la presentación del entrenador; se pierden los cambios no guardados. |
| `Load` | Cambia a un documento en `cobblemon/battle_presentations/`. |
| `Save` | Actualiza la ruta actual. Un nuevo borrador cae a través de `Save As`. |
| `Save As` | Escribe una nueva ruta relativa como `custom/gym_intro.json`; `.json` se añade cuando se omite. |

El nombre es metadatos de visualización dentro del JSON. Los entrenadores hacen referencia a la ruta del archivo `Save As`, no al valor Name.

## Orden de construcción recomendado

1. Establecer duración y saltar.
2. Configurar el fondo del mundo y la imagen de escenario.
3. Bloquear la composición con grandes capas de color.
4. Coloca al jugador y a los actores oponentes y elige su orden Z.
5. Añade contenido de etiquetas y texturas.
6. Establecer rangos activos y desvanecimientos.
7. Añada movimiento y alivio.
8. Configure el audio de introducción y batalla y reproduzca la secuencia completa.
9. Guardar en `custom/` y, a continuación, seleccione esa ruta en Cobblemon Editor.
10. Guarde el documento de batalla; un seguimiento NPC que la ruta de origen normalmente no necesita volver a aplicar.

Organizar la escena en vista previa, a continuación, jugar una batalla para comprobar los aspectos reales, modelos, tamaño de la ventana y el sonido.

El navegador de imágenes pagina sus resultados y carga miniaturas según sea necesario, reduciendo el costo inicial en paquetes de recursos grandes.

## Modelos de equipo y Motion

Elija `Actors` → `Player` o `Opponent` → `Trainer / 1–6`. Cada lado tiene seis ranuras con ajustes de modelo, transformación, posición y movimiento seleccionados de Render independiente. Los ajustes preestablecidos normales ocultan las ranuras de equipo; `presets/vs_party_showcase.json` habilita un ejemplo opcional 6+6.

Las vistas previas usan sample Pokémon; las batallas reales usan la apariencia de equipo proporcionada por el servidor. Los espacios perdidos permanecen vacíos. Las ranuras ocultas no exponen especies, movimientos, estadísticas o elementos retenidos. Los modelos no se generan en el mundo.

Movimiento edita inicio/fin, duración de entrada/salida, desplazamientos, escala y deriva. Referencia JSON: `actors.*.animation.fitToModel` se ajusta al modelo completo; `camera` contiene hasta 64 fotogramas clave de posición/zoom/rotación basados en ticks. Edita esa lista en JSON y compruébala en el renderizador de vista previa compartida. La flexibilización soportada incluye paso, lineal, ease_in, ease_out y ease_in_out. El esquema de presentación es 5, con documentos anteriores 1–4 legibles.

## Nuevos ajustes preestablecidos

| Archivo | Duración en 20 TPS | Finalidad |
| --- | --- | --- |
| `presets/vs_trainer.json` | 144 ticks / 7.2 s | Revelación y nombre del entrenador |
| `presets/vs_pokemon.json` | 132 ticks / 6.6 s | Encuentro salvaje |
| `presets/vs_boss_trainer.json` | 168 ticks / 8.4 s | Entrenador jefe |
| `presets/vs_legendary_pokemon.json` | 184 ticks / 9.2 s | Legendario Pokémon |
| `presets/vs_party_showcase.json` | 168 ticks / 8.4 s | Opcional 6+6 Revelación del equipo |

Los nuevos ajustes preestablecidos generales utilizan fondos de pantalla completa y ajuste de modelo completo. Trate los valores predeterminados como plantillas y use Save As para archivos personalizados. No sobrescriba las escenas de usuario al por mayor.

Los efectos incluyen raster_warp, vs_ribbon, versus_mark, iris_shutter, arena_depth, wild_meadow, wild_grass, rift_sky, ground_shadow, light_sweep y dust_motes. Enlazar escenas a batallas ordinarias salvajes, RCT o JcJ en [Encounter Presentations](#drm-cobblemon-editor/cobblemon-encounter-presentations).

## Etapas de bloque, FX y programación

Véase [ block stages y FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) para autoría de Región/FX en 0.2.4, y [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) para ejecución de clonación, escena y batalla.
