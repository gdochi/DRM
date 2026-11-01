---
title: Facciones, teletransportadores y popups
slug: world-npc-tools
order: 120
description: Configurar la presentación de facción, los flujos de destino y las ventanas emergentes reutilizables en tiempo de ejecución.
product: core
category: Herramientas de mundo y NPC
section: world-tools
status: Estable
version: 0.3.1
audience: Creadores de mundo y NPC
tags:
  - faction
  - teleporter
  - popup
translationSource: en
translationMethod: assisted
---

## Mostrar las relaciones de facción a los jugadores

**Faction Editor** controla cómo CustomNPCs facciones aparecen en DRM. CustomNPCs posee los ID de facción y los puntos de jugador reales. Crea DNPC grupos de relaciones por separado en el [DNPC editor](#dochi-npc-core/npc-core-editor).

![Faction Editor nombres de relación, colores, descripciones y previsualización de puntos de muestra.](assets/media/guides/drm-031-forge1201/registry-faction.png "DRM 0.3.1 / Forge 1.20.1. Estatus estilos de las etiquetas de relación. Los puntos de muestra previsualizan un valor; no cambian la reputación real de un jugador.")

1. En **Statuses**, establezca los nombres, colores y descripciones de Unfriendly, Neutral y Friendly.
2. En **Manage Factions**, compruebe que CustomNPCs está instalado y su catálogo de facciones está disponible.
3. Establezca el orden, las categorías, los nombres, los iconos y los banners en **Presentation** y el diseño del jugador en **Runtime Screen**.
4. Guardar y abrir **J** para comprobar la lista de jugadores y puntos.

La presentación se guarda en `config/dochi_rpg_maker/factions/settings.json`. Revisa este editor para ver si hay etiquetas o colores incorrectos; revisa la facción original y las condiciones/acciones para otorgar puntos para ver si hay una puntuación incorrecta.

## Dale a un NPC una lista de destinos

Utilice **Teleporter Editor** para crear destinos y aplicar el conjunto a un NPC. Viajes ** en la dimensión actual**.

![Teletransportador Editor Spawn destino con coordenadas de llegada.](assets/media/guides/drm-031-forge1201/teleporter-destinations.png "DRM 0.3.1 / Forge 1.20.1. Configuración de destino → La información contiene X/Y/Z. Reemplace la muestra 0.5 / 64 / 0.5 con una posición segura en su mundo.")

1. Cree el nombre de la lista y las categorías en **Category Settings**.
2. Utilice **Destination Settings → Add**, luego establezca nombre, descripción, X/Y/Z y Yaw/Pitch.
3. Añadir reglas de acceso en el destino **Conditions** y comandos antes/después de la llegada en **Commands**. Forge también expone el destino **Effects**.
4. Establece las duraciones de desvanecimiento y los sonidos de salida/llegada en **Travel Presentation**.
5. **Save As** un nuevo nombre como `town_network`. Abra el NPC con el núcleo y elija **Teleporter JSON → your file → Apply Teleporter**.
6. Interactúa con ambas manos vacías, selecciona el destino y haz clic en **Travel**. Verifique la posición de llegada y la orientación.

Los conjuntos se guardan en `config/dochi_rpg_maker/teleporters/`. **bound** en la acción de diálogo `Go Teleporter` abre el conjunto aplicado de este PNJ. Para personalizar el diseño, cópielo en GUI Maker y conéctelo a través del conjunto **GUI JSON**.

## Mostrar un título de área o una notificación de búsqueda

Establezca el texto temporal y el tiempo en **Popup Maker**. Colocación del diseño y obras de arte en el diseño Popup de [GUI Maker](#core/gui-system).

![Contenido de Popup Maker, sincronización de fundido/retención, canal y sonido de apertura.](assets/media/guides/drm-031-forge1201/popup-maker.png "DRM 0.3.1 / Forge 1.20.1. El panel central inferior es una vista previa. Desvanecer en 10 / Mantener 80 / Desvanecer 20 totaliza 5.5 segundos a velocidad normal.")

1. Escribe **Title / Subtitle / Text**.
2. Establecer **Fade In / Hold / Fade Out** duraciones en ticks; 20 ticks igual a un segundo.
3. Elija cómo se comportan las notificaciones superpuestas en el mismo **Channel** y configure **Priority** cuando sea necesario.
4. Elija **Opening Sound** y audicionarlo con Play.
5. **Save As** tu ventana emergente y prueba la visualización real a través de un comando `/drm popup` o una acción de diálogo.

Las definiciones se guardan en `popups/definitions/`, las políticas en `popups/policies/`. Copie los archivos predeterminados con Save As. Si los avisos se acumulan, compruebe los conflictos de canal junto con los límites de cola y de visualización simultánea en la política.


## Mostrar la ventana emergente guardada con un comando

Fije **ID** en `village_entry` y **Title** en `Village Gate`, luego elija **Save As → village_entry → Save As**. Cierre el editor y ejecute esto como un reproductor con permiso de administración:

```mcfunction
/drm popup show @s village_entry
```

![Popup Maker guardado como village_entry con el título de Village Gate.](assets/media/guides/drm-031-forge1201/popup-village-save.png "DRM 0.3.1 / Forge 1.20.1. Marque Guardado: village_entry.json y el título. El panel central inferior es la vista previa del editor.")

![La ventana emergente guardada se muestra en el juego real.](assets/media/guides/drm-031-forge1201/popup-village-runtime.png "DRM 0.3.1 / Forge 1.20.1. Este es el archivo que se muestra con el comando anterior. Entrar en un pueblo no lo activa automáticamente hasta que la detección de región se conecta por separado.")
