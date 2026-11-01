---
title: Teletransportador
slug: teleporter
order: 82
description: Crear conjuntos de destinos, vincularlos a NPC y configurar el tiempo de ejecución del reproductor Teleporter.
product: core-fabric
category: Sistemas de núcleo
section: teleporter
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - teleporter
  - npc
  - gui
translationSource: en
translationMethod: assisted
---

## Hacer un destino de vuelta a la ciudad

Permite a los jugadores interactuar con un NPC, elegir un destino y viajar. Termine un destino antes de agregar condiciones de acceso o presentación. Estas son capturas de pantalla en inglés de **DRM 0.3.1 / NeoForge 1.21.1**.

1. Párese en el destino y observe sus coordenadas **F3**. Revisa el piso y el espacio libre.
2. Haga clic derecho en el aire con el núcleo y abra **Teleporter Editor → Create New**.
3. En **Category Settings**, cambie el nombre **Towns** o use **Add** para una nueva categoría. **Display name** nombra toda la lista de destinos.

![Ajustes de categoría para el nombre de la lista y la categoría Ciudades.](assets/media/guides/drm-031-neo1211/teleporter-editor.png "El medio contiene la configuración de la lista y categorías; la derecha edita el nombre de la categoría seleccionada y el icono. Establece las coordenadas de destino en Ajustes de destino a continuación.")

### Nombre y posición de llegada

Abrir **Destination Settings**. Utilice **Add** o seleccione la muestra **Spawn**, luego configure **Info** a la derecha.

| Control | Qué entrar |
| --- | --- |
| **Name / Description** | Un nombre de ubicación y direcciones que los jugadores pueden reconocer |
| **Enabled** | Si este destino está disponible |
| **Category** | La categoría preparada arriba |
| **Position → X / Y / Z** | Coordenadas de llegada; Y es la altura de los pies del jugador |
| **Yaw / Pitch** | Dirección de orientación y ángulo de visión vertical después de la llegada |

![La página Spawn Info con su nombre, descripción, categoría, posición y rotación.](assets/media/guides/drm-031-neo1211/teleporter-destinations.png "Reemplace la muestra 0.5 / 64 / 0.5 con una posición segura en su mundo. Cambiar el nombre del destino no cambia sus coordenadas.")

Viajes ** en la dimensión actual**. Entrar en las coordenadas del Nether solo no mueve al jugador al Nether.

### Elige quién puede usarlo

Deje las condiciones vacías para la primera prueba. Después de los trabajos de viaje, configure estos por separado:

- **Interaction Conditions:** que puede abrir toda la lista.
- **Destination Settings → destination → Conditions:** quien puede usar ese destino.

Por ejemplo, todos pueden abrir la lista mientras que solo los jugadores que terminaron una misión pueden visitar las ruinas. **Category Settings → Locked destination presentation** controla si las entradas bloqueadas aparecen atenuadas, ocultas o con otro estilo. No permite el acceso.

![Condiciones de interacción con Habilitado, Modo AND y Agregar.](assets/media/guides/drm-031-neo1211/teleporter-conditions.png "Use Agregar para configurar una condición y marque Habilitado. Esta captura de pantalla es el estado inicial sin condiciones.")

### Transiciones de pantalla y sonidos

En **Travel Presentation**, **Fade out / Fade in** establece las duraciones de oscurecimiento y retorno en garrapatas. A velocidad normal, 20 marca igual a un segundo; el valor mostrado de 10 es aproximadamente medio segundo cada uno. Elija **Departure sound / Arrival sound** con los botones de búsqueda y audicionarlos con Play.

![Presentación de viaje con duraciones de desvanecimiento y sonidos separados de salida y llegada.](assets/media/guides/drm-031-neo1211/teleporter-presentation.png "Elige cada sonido por separado. Si un destino también ejecuta comandos, configure su tiempo en su pestaña Comandos.")

## Guardar y conectar el NPC

1. **Save As** un nuevo nombre como `guide_travel`. El editor añade la extensión y guarda `guide_travel.json`.
2. Haga clic con el botón derecho del ratón en **DNPC or CustomNPCs NPC** con el núcleo.
3. En **NPC Apply**, elija **Teleporter JSON** a la izquierda y su archivo en el medio. Utilice **Refresh** si es necesario.
4. Haga clic en **Apply Teleporter** y compruebe la lista aplicada a la derecha.
5. Interactúa con ambas manos vacías, selecciona un destino y viaja. Verifique la apertura de la lista, las coordenadas de llegada y la orientación por separado.

![El teletransportador del jugador muestra la puerta del pueblo después de aplicar el conjunto al NPC.](assets/media/guides/drm-031-neo1211/teleporter-npc-player.png "Selecciona un destino en el medio y, a continuación, pulsa Viajar en la parte inferior derecha. Este ejemplo deja la región de imagen grande vacía.")

![Después del viaje, el jugador llega a la entrada de roble precolocado.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "El servidor confirmó la llegada a la X 20.5 / Y -60 / Z 0.5 guardada. Los postes de piso y roble se prepararon en el mundo de la captura para identificar el punto de llegada. Utilice sus propias coordenadas de destino.")

Utilice **Remove Teleporter** en ese NPC para eliminar la conexión. Aplique de nuevo al cambiar a un archivo guardado con otro nombre.

Para abrirlo desde una elección de diálogo regular, agregue **go_teleporter** en [Choice actions](#core-fabric/dialogue-system). Elija **bound** para la lista aplicada de este NPC o seleccione un archivo guardado para otra lista.

## Diseño y archivos guardados

Edite los destinos y las condiciones aquí; edite la ubicación de la lista, las ilustraciones y los botones en [GUI Maker](#core-fabric/gui-system). La conexión es **Category Settings → GUI JSON / Open GUI Maker**. Mantenga una lista de destinos, un botón de viaje y un botón de cierre en el diseño personalizado.

Los conjuntos se guardan en `config/dochi_rpg_maker/teleporters/`. `default_teleporter_set.json` y `gui/default_teleporter_gui.json` son plantillas de inicio. Mantenga su trabajo por separado con **Save As**.

Para encontrar un destino que falte, marque Habilitado, categoría, búsqueda de texto y condiciones. Si la lista se abre pero se rechaza el viaje, compruebe la distancia al NPC y las condiciones cambiadas, y luego interactúe de nuevo para volver a abrirlo.
