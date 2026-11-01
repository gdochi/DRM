---
title: Hacer una selección de inicio NPC
slug: cobblemon-starter-selector
order: 551
description: Elija tarjetas de inicio y concedidas Pokémon, luego agregue una condición de selección única.
product: drm-cobblemon-editor
category: NPCs de servicio
section: services
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores de NPC y operadores de servidores
tags:
  - starter-selector
  - pokemon-give
  - runtime-gui
translationSource: en
translationMethod: assisted
---

## Deje que los jugadores elijan uno de los tres titulares

Cree candidatos en **Starter Selector Editor** y, a continuación, aplique el perfil a un NPC. Los jugadores seleccionan una carta y confirman su Pokémon. Utilice un DNPC o CustomNPCs NPC en **Minecraft 1.21.1, Fabric or NeoForge**.

![Tres candidatos iniciales, texto de la tarjeta en el medio y Pokémon ajustes a la derecha.](assets/media/guides/cobble-029-neo1211/cobble-starter.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, Inglés UI. Seleccione un candidato a la izquierda, edite el texto de la tarjeta en el medio y el Pokémon otorgado a la derecha.")

1. Abre **Starter Selector Editor → Use Default** de la lista de editores DRM.
2. Seleccione un candidato. Establecer **Card Name / Pokémon Description**, y mantener cada **Option ID** único.
3. En **Starter settings → Edit Pokémon**, establece la especie, el nivel, la forma, la naturaleza, la habilidad, el elemento retenido y los movimientos. Cambiar el nombre de la tarjeta no cambia la especie concedida.
4. Utilice **Add / Delete** para los candidatos 1–32.
5. **Save As** un archivo de usuario como `custom/village_starters.json`.
6. Abra el NPC con el núcleo DRM y **Apply** el archivo a **Starter Selector**.
7. Interactúa con ambas manos vacías y comprueba las tarjetas, los detalles y la confirmación.

Si se abre primero un diálogo normal DRM o una tienda, utilice la mano vacía **Shift+right-click**. Para abrir la selección de una opción de diálogo normal, agregue **go_starter_selector** y elija un archivo, o **bound** para el perfil aplicado al NPC actual.

![Ruta de acceso del usuario y estado guardado después de Save As.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "El ejemplo de ruta guardada a través de Save As. Crear el archivo y aplicar el rol NPC son pasos separados.")

![Tres tarjetas de inicio y el botón Elegir este Pokémon se abren interactuando con el NPC.](assets/media/guides/cobble-029-neo1211/cobble-starter-runtime.png "Vista del jugador: selecciona una carta y luego confirma con Elegir este Pokémon en la parte inferior derecha. Este ejemplo selecciona Bulbasaur de los tres candidatos predeterminados.")

La confirmación cierra el selector y añade el Pokémon al equipo. El panel del equipo a la izquierda muestra **Bulbasaur / Lv.5**; el equipo del servidor también fue revisado para el Bulbasaur otorgado.

![Después de la confirmación, el juego muestra un nivel 5 Bulbasaur en el equipo de la izquierda.](assets/media/guides/cobble-029-neo1211/cobble-starter-granted.png "Cobblemon Editor 0.2.9 / DNPC 0.1.3 / NeoForge 1.21.1. El resultado de la concesión; configure las condiciones siguientes para un límite de una sola vez.")

## Permitir una selección por jugador

El selector no impone un límite de una sola vez permanente y universal. Configure tanto la acción de selección exitosa como las condiciones:

1. En **Dialogue and GUI → Success Tag (optional)**, escriba `starter_chosen` y establezca el botón de abajo en **Add tag after grant**.
2. Bajo cada candidato **Card display conditions**, se requiere que el jugador ** no tenga starter_chosen **. Habilite las condiciones con **Enabled** y aplique el límite a cada candidato.
3. Si usa un diálogo introductorio, ponga la misma condición al abrir la selección.
4. Selecciona con un nuevo jugador, luego interactúa de nuevo para comprobar que los inicios previamente reclamados no están disponibles.

Las acciones exitosas se ejecutan solo después de que se otorga el Pokémon. Un equipo completo vuelve al almacenamiento de PC. Si ninguno de los dos puede recibir el Pokémon, las acciones de éxito no se ejecutan.

![Diálogo y interfaz gráfica de usuario con etiqueta de éxito y agregar etiqueta después de la concesión.](assets/media/guides/cobble-029-neo1211/cobble-starter-dialogue.png "Introduzca la etiqueta de finalización en Success Tag y mantenga Agregar etiqueta después de la concesión. Una ruta GUI Dialogue en blanco omite el diálogo introductorio y abre las tarjetas.")

## Cambiar tarjetas, diálogo y audio

| Ubicación | Controles |
| --- | --- |
| **Starter settings → Edit Pokémon** | En efecto, el Pokémon |
| **Card display conditions** | Cuando el candidato es visible y seleccionable |
| **Card Selection Audio** | Lloro de especies o un sonido personalizado |
| **Dialogue and GUI** | Diálogo introductorio, ruta de pantalla y acciones de selección exitosa |
| **DRM GUI Maker** | La lista de cartas del jugador, la vista previa y el diseño del botón |

Una ruta en blanco **Dialogue GUI (optional)** abre las cartas directamente. Una opción habilitada usa opciones fijas **Open Selector / Close**. Construya ramas de forma libre en [DRM diálogo](#core-fabric/dialogue-system), luego conecte su acción de inicio.

La pantalla predeterminada muestra tres tarjetas por página. Una sesión de selección dura 60 segundos; interactúa de nuevo si una pantalla antigua no puede confirmar. El audio es compatible con el volumen 0–4 y Pitch 0.05–4.

**Save to the same file** para la siguiente interacción; Aplicar de nuevo después de cambiar su camino. Los perfiles están en `config/dochi_rpg_maker/cobblemon/starter_selectors/`; el diseño predeterminado es `gui/starter_selector_gui.json`. Utilice **Save As** antes de personalizar el diseño y conservar las tarjetas y los controles de confirmación.
