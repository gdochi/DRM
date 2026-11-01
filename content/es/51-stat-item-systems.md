---
title: Creador de estadísticas y editor de artículos
slug: stat-item-systems
order: 110
description: Conjuntos de estadísticas personalizados, costos de asignación, elementos de base de datos, requisitos, bonificaciones, atributos y escalado.
product: core
category: Estadísticas y artículos
section: stat-item
status: Estable
version: 0.3.1
audience: Creadores de sistemas RPG
tags:
  - stats
  - items
translationSource: en
translationMethod: assisted
---

## Constructor de estadísticas

Crea estadísticas en las que los jugadores puedan invertir. Comience con **Add**, nombre una estadística y establezca su valor mínimo, máximo y predeterminado. Elija el costo de inversión **Provider** a la derecha: niveles de XP, una moneda DRM o un elemento.

Conectar **Attribute** y **Base effect / Per point** para cambiar la salud real, ataque u otro atributo. Guarde, use **Set Active**, luego abra **Y** para verificar el costo y el resultado de la asignación.

Los proveedores de inversión son Minecraft niveles de XP, una moneda DRM o un elemento. La progresión de costos utiliza ajustes de base, paso y multiplicador.

La pantalla de asignación de jugador se abre con `Y` por defecto. `Allow Y key allocation UI` controla si el conjunto activo se puede abrir desde la combinación de teclas. La acción de diálogo `Go Stat Builder` abre la misma pantalla en el juego independientemente de la configuración de solo combinación de teclas.

El paquete `default_stat_gui.json` utiliza una amplia lista desplazable a la izquierda y separado valor, costo, descripción, y aumentar los controles a la derecha. Modificar una copia en GUI Maker.

![Generador de estadísticas con fuerza, costos de puntos y efectos de atributos.](assets/media/guides/drm-031-forge1201/registry-stat_builder.png "DRM 0.3.1 / Forge 1.20.1. Elija la estadística de la izquierda, sus límites en el medio y los costos / efectos en la derecha. Atributo: No seleccionado significa que todavía no hay ningún efecto de atributo conectado.")

## Editor de artículos

Elija la base **Item template** primero. Establezca su nombre y descripción, use **Stat Rules** para requisitos y bonificaciones equipadas, y **Vanilla Attribute** para efectos de atributo. **Save As** su archivo, luego use **Give Test Item** para inspeccionar el resultado.

Una definición de elemento puede configurar:

- portador/categoría, plantilla de artículo, nombre, rareza, papel de aluminio, tamaño de pila, durabilidad y tradición;
- Estadísticas asignadas requeridas;
- bonificaciones estadísticas equipadas;
- Modificadores de atributo vanilla/modded y ranuras de equipo;
- escalado de estadísticas por punto;
- Orden y visibilidad de la sección tooltip.

![Item Editor Item Definition con líneas de información, reglas de estadísticas y pestañas Vanilla Attribute.](assets/media/guides/drm-031-forge1201/registry-item_editor.png "DRM 0.3.1 / Forge 1.20.1. La plantilla de elemento no está seleccionada actualmente. Elija el elemento base, configure su nombre, efectos y requisitos, guarde y, a continuación, use Give Test Item.")

## Penalización por requerimiento

Los requisitos solo usan valores asignados, por lo que el bono de un elemento no puede satisfacer su requisito. Un jugador todavía puede mantener, equipar y atacar con un objeto mientras está bajo el requisito.

`Unmet penalty %` es el porcentaje eliminado de la contribución del ítem:

| Sanción | Contribución retenida mientras no se cumple |
| --- | --- |
| `0` | 100% |
| `25` | 75% |
| `100` | 0% |

El multiplicador afecta a los bonos de estadísticas equipados, los modificadores de atributos configurados y los modificadores de escala de estadísticas. No elimina ni reemplaza el comportamiento base del elemento de plantilla a menos que ese comportamiento esté representado por un modificador configurado.

:::tip Ensayos
Guarde la definición antes de usar `Give Test Item`. Sitúe el cursor sobre la vista previa o el elemento de prueba para verificar la información sobre herramientas generada y, a continuación, pruebe un reproductor que califique y otro que no califique.
:::

## Pantallas de estadísticas de NPC y descripciones de herramientas en 0.1.5

En la pantalla de aplicación de NPC, conecte un archivo **Stat Builder** al NPC. Interactuar con ese NPC abre la pantalla de asignación de estadísticas del jugador utilizando el conjunto conectado.

Utilice **Visual → Tooltip Maker** para diseñar cómo se presenta la información del artículo. Consulte la guía **Tooltip Maker** para obtener vistas previas de elementos, vistas de equipos y desplazamiento de punta de herramienta larga. Quitar el equipo que solo reduce la salud máxima ya no juega el efecto de daño.

## Conjuntos de equipos y enlaces de información útil

Forge El editor de elementos permite a un elemento seleccionar una plantilla `setId` y una sugerencia de herramientas. Los conjuntos de equipos viven en `items/sets/` y definen los recuentos de piezas equipadas, las bonificaciones de estadísticas y los modificadores de atributos requeridos por nivel. Las plantillas de información de herramientas reutilizables viven en `items/tooltip_templates/`.

Mantenga el elemento individual, el conjunto de equipos compartidos y la plantilla de presentación como documentos separados. Compruebe sus referencias de estadísticas y bonificaciones de prueba / consejos de herramientas mientras cambia piezas equipadas. Esta característica Forge no es una reivindicación de implementación idéntica en otros cargadores.

## Mover archivos guardados

| Sumario | Ubicación |
| --- | --- |
| Conjuntos de estadísticas / conjunto activo | `config/dochi_rpg_maker/stats/sets/` / `stats/active_set.json` |
| Definiciones de los elementos | `config/dochi_rpg_maker/items/definitions/` |
| Categorías compartidas, rarezas y configuraciones de información sobre herramientas | `config/dochi_rpg_maker/items/editor_settings.json` |
