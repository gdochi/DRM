---
title: Edición de iconos y prioridad
slug: mapicon-editor-rules
order: 1410
description: Escriba valores predeterminados, excepciones JSON, anulaciones por NPC y comportamiento de guardar/aplicar.
product: dochi-mapicon-integration
category: Creación de iconos
section: editor
status: Guía de uso
version: 0.1.2
audience: Creadores de NPC
translationSource: en
translationMethod: assisted
---

## Predeterminados por tipo JSON

Seleccione **Type defaults** a la izquierda, luego elija **NPC**, **Dialogue JSON**, **NPC Shop JSON** u otra categoría en el medio. Edite la imagen, el tamaño, el tinte y la visibilidad del mapa en **Icon settings** a la derecha. Compruebe su aparición en **Icon preview** debajo de la lista del medio.

![MapIcon Tipo predeterminados con NPC seleccionado en el medio y la imagen, Tamaño, Tint, Minimap y configuración de mapa del mundo a la derecha.](assets/media/guides/mapicon-012-neo1211/type-defaults.png "MapIcon 0.1.2 el NeoForge 1.21.1. Para cambiar los iconos de la tienda, seleccione NPC Shop JSON en el medio y, a continuación, edite su configuración a la derecha.")

**NPC** es el icono NPC básico. Las categorías de diálogo, tienda y teletransportador a continuación eligen iconos para las funciones aplicadas a los NPC. Cobblemon El editor agrega objetivos como Entrenador, Pokemon, PokéMart, Enfermera Joy y Selector de inicio.

**Type Default Icons** le da a los NPC un icono basado en JSON aplicado incluso sin una regla de excepción. Los valores predeterminados de NPC y los valores predeterminados de tipo individual se guardan de forma independiente. Los archivos de presentación y planificador no son objetivos NPC Apply y no aparecen en esta lista.

## Imagen, color y pantalla

| Configuración | Opciones |
| --- | --- |
| Imagen | Búsqueda de iconos agrupados, búsqueda de imágenes externas o ID de recursos directos |
| Tamaño | 8–64 |
| Tinto | Espectro, saturación/brillo, HEX y RGB con una vista previa en vivo |
| Mapa | Minimapa independiente y visualización de mapa del mundo |
| Nombre | Mostrar u ocultar el nombre del PNJ en el mapa |

**Choose Icon** abre una lista de búsqueda con vistas previas y nombres de PNG. La biblioteca incluida contiene 1,476 Nikoichu CC0 1-bit Pixel Icons y un filtro RPG. Tint cambia la representación del mapa, dejando el PNG de origen intacto.

## Excepciones y prioridad de visibilidad

Las reglas coinciden con el tipo JSON y la ruta del archivo. Una ruta vacía coincide con cada archivo de ese tipo. La regla de coincidencia de mayor prioridad gana; los lazos usan la primera regla de coincidencia en orden de lista.

1. Global OFF o per-NPC Ocultar suprime el icono.
2. Una regla de coincidencia deshabilitada lo oculta. Per-NPC Show puede anular el OFF de esta regla, pero no puede anular el OFF global.
3. La selección de imágenes utiliza la regla de coincidencia por NPC → → type default →.
4. DRM También se aplican las condiciones de visibilidad de NPC: un NPC oculto a un jugador permanece oculto en el mapa de ese jugador.

Agregue, duplique, elimine y busque reglas y seleccione archivos JSON reales en el selector de archivos. **Apply Type Icon** reemplaza la imagen de una regla existente con el icono de tipo.

![Una nueva regla NPC Shop en JSON Reglas.](assets/media/guides/mapicon-012-neo1211/mapicon-rule-added.png "MapIcon 0.1.2 / NeoForge 1.21.1. Después de agregar la regla, elija NPC Shop JSON como tipo de fuente DRM. Un archivo vacío JSON coincide con cada archivo de ese tipo. Para una tienda, elija su archivo con la lupa, establezca Prioridad y guarde.")

## Anular uno NPC

Abrir **Addons → Map icon** en el editor DNPC. La pantalla individual tiene solo **Selected NPC**. Utilice **Icon** para mostrarlo u ocultarlo, elija su propia imagen, tamaño, tinte y conmutadores de mapa, luego **Save**. Espere **Settings saved** en la parte inferior.

![El editor individual después de guardar un icono NPC.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1. Esta pantalla solo para NPC no tiene valores predeterminados de tipo ni reglas JSON. Su guardado está separado del guardado del perfil del servidor del editor completo.")

Un interruptor de icono no evita las condiciones de visibilidad de NPC principales para ese jugador. Compara el resultado usando el [ejemplo de minimapa real](#dochi-mapicon-integration/mapicon-setup).

## Guardar y aplicar

Cargar abre un perfil para editar sin cambiar la directiva de servidor. **Save & Apply**, Guardar y Save As guardar el perfil y activarlo. El nombre de archivo inferior **Active** informa del perfil confirmado por el servidor. Mods Config cambia la actualización de la pantalla inmediatamente; pulse **Apply** para guardarlos en el servidor.

Consulte [archivos y solución de problemas](#dochi-mapicon-integration/mapicon-files-operations) para conocer las rutas de textura y los límites de visualización.
