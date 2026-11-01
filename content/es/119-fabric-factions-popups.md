---
title: Facciones y Popups
slug: factions-popups
order: 120
description: CustomNPCs Presentación de facción y ventanas emergentes reutilizables en pantalla.
product: core-fabric
category: Herramientas de mundo y NPC
section: world-tools
status: Estable
version: 0.3.1
audience: Creadores de mundo y NPC
tags:
  - faction
  - popup
translationSource: en
translationMethod: assisted
---

## Cambiar los nombres y colores del estado de la facción

**Faction Editor** controla cómo aparecen las facciones con soporte CustomNPCs en DRM. CustomNPCs posee los ID de facción y los puntajes de los jugadores. Configure DNPC grupos de relaciones por separado en el editor [DNPC](#dochi-npc-core/npc-core-editor). Estas capturas muestran **DRM 0.3.1 / NeoForge 1.21.1**.

![Estado y puntos de muestra en Faction Editor.](assets/media/guides/drm-031-neo1211/faction-editor.png "Selecciona No amistoso, Neutral o Amistoso y edita su nombre, color y descripción de la relación. Los puntos de muestra 850 prueban la pantalla; no otorga reputación a un jugador.")

1. Seleccione una relación bajo **Statuses**.
2. Coloca **Display name / Color / Relationship description** a la derecha.
3. Cambie **Sample points** para inspeccionar el resultado en diferentes puntuaciones.
4. Compruebe que las facciones originales están disponibles en **Manage Factions**.
5. Utilice **Presentation** para el orden, las categorías y los iconos; utilice **Runtime Screen** para la interfaz del jugador.
6. Guarde e inspeccione la lista de jugadores con la tecla predeterminada **J**.

La presentación se almacena en `config/dochi_rpg_maker/factions/settings.json`. Para las puntuaciones incorrectas, compruebe la facción original y el comportamiento de concesión de puntuación antes de editar la presentación. Este flujo de trabajo CustomNPCs no se aplica a [Minecraft 26.3 y posterior](#core-fabric/minecraft-26-3).

## Guardar una ventana emergente y mostrarla en el mundo

Este ejemplo muestra brevemente **Village Gate**. La detección de regiones necesita un desencadenador separado; este ejercicio muestra la ventana emergente guardada con un comando.

![Popup Maker guardado como village_entry con el título de Village Gate.](assets/media/guides/drm-031-neo1211/popup-village-save.png "Compruebe el ID a la izquierda y Guardado: village_entry.json en la parte inferior. El panel central inferior es la vista previa del editor. Desvanecer en 10 / Sostener 80 / Desvanecer 20 marca da un total de 5.5 segundos a velocidad normal.")

1. Abrir **Popup Maker** desde el Núcleo y establecer **ID** a `village_entry`.
2. Introduzca `Village Gate` en **Title** y su descripción en **Text**. Añada un **Subtitle** si es necesario.
3. Establecer **Fade In / Hold / Fade Out**. A velocidad normal, 20 ticks es un segundo.
4. Elija **Channel** y **Conflict** para las notificaciones superpuestas. El ejemplo `replace` reemplaza el aviso anterior en ese canal.
5. Opcionalmente seleccione **Opening Sound** y escuche con el botón de reproducción.
6. Elija **Save As → village_entry → Save As** para guardar su propia copia.
7. Cierra el editor y ejecuta este comando como un jugador con permiso de administración:

```mcfunction
/drm popup show @s village_entry
```

![La ventana emergente de Village Gate guardada se muestra en el juego real.](assets/media/guides/drm-031-neo1211/popup-village-runtime.png "Se muestra con /drm popup show s village_entry usando la definición guardada arriba. s apunta al jugador en ejecución. Esto no lo une automáticamente a una región o NPC.")

Cambie el texto, el tiempo y el canal en **Popup Maker**. Cambiar la posición, el fondo y las ilustraciones en [GUI Maker](#core-fabric/gui-system)'s Popup GUI. Asignar un diseño copiado en el campo **GUI JSON** de la ventana emergente.

| Archivo para transferir | Ubicación |
| --- | --- |
| Texto, tiempo y canal | `config/dochi_rpg_maker/popups/definitions/village_entry.json` |
| Disposición de pantalla | La GUI asignada bajo `config/dochi_rpg_maker/gui/` |
| Visualización operativa y límites de duración | `config/dochi_rpg_maker/popups/policies/` |

Si no aparece nada, compruebe el ID guardado, el archivo Habilitado y el GUI. Si los avisos se ponen en cola o se reemplazan entre sí, inspeccione Conflicto para el mismo canal y los límites activos/en cola de la política.
