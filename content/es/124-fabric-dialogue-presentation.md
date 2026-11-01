---
title: Elección de diálogo y presentación de gecko
slug: dialogue-presentation
order: 63
description: Seleccione opciones de tamaño, agregue reflejos de pulso y conecte rutas de animación Gecko en Fabric y NeoForge 0.2.4.
product: core-fabric
category: Dialogue Editor
section: dialogue-editor
status: Estable
version: 0.3.1
audience: Creadores de diálogo
translationSource: en
translationMethod: assisted
---

## Elección de texto y pulso

En la sección **Choices** de un nodo de diálogo, utilice **Choice text size (px; 0 = GUI default)** para reemplazar el tamaño de texto de la presentación de la GUI vinculada para ese nodo. Un valor de `0` mantiene la configuración de la GUI.

Habilitar **Pulse highlight** en una elección individual para llamar la atención cuando se hace visible por primera vez. Configure sus ticks totales, conteo de pulsos, color RGB e intensidad. Las opciones ocultas o fuera de la pantalla no gastan su tiempo de pulso antes de que se hagan visibles.

Las opciones traducidas largas usan su texto mostrado cuando DRM calcula el ancho del botón y el ajuste. El área de elección de tiempo de ejecución se puede desplazar cuando la lista completa no encaja.

![Pulse resaltado habilitado para una opción seleccionada.](assets/media/guides/drm-031-neo1211/dialogue-choice-pulse.png "DRM 0.3.1 / NeoForge 1.21.1. A continuación se muestran las marcas totales 40, el conteo de pulsos 2, la intensidad 25 y el color. Tamaño de texto de elección 0 hereda el tamaño de la GUI. Esto captura la configuración de edición, no la reproducción.")

Siga [ creación de diálogo ](#core-fabric/dialogue-system) a Save As y aplicar el conjunto a un NPC, a continuación, compruebe las opciones de momento aparecen. Seleccione una opción antes de habilitar Pulse resaltado solo para ese botón.

## Rutas de animación Gecko

Una ruta de inicio usando `gecko_animation` puede incluir un destino Goto. DRM envía la solicitud de animación y luego se mueve al nodo válido seleccionado.

Las acciones de diálogo se evalúan en orden de documento durante el mismo tick de servidor. El primer resultado de navegación sigue siendo autorizado, pero los efectos secundarios posteriores, como la animación Gecko, los comandos, las etiquetas y las acciones de los elementos, aún se ejecutan.

La reproducción de Gecko utiliza una línea de tiempo de servidor sincronizada. Un jugador que comienza a rastrear un NPC después de que se inicia la reproducción recibe la animación activa y alcanza su posición actual.
