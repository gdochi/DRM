---
title: Fabric 0.1.9 Actualización
slug: release-notes-0-1-9
order: 9
description: Scene Maker y más fácil de editar en Fabric 0.1.9.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.1.9
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core-fabric/release-notes-0-3-1) para la dirección actual.

## Encuentra la línea de tiempo escena

Utilice la línea de tiempo inferior para la cámara, los subtítulos y la sincronización del efecto. Añada clips con + Cámara o + Subtítulo y, a continuación, edite sus propiedades a la derecha. Posición mundial abre la colocación contra el mundo real. Continuar con el [guía actual](#core-fabric/scene-maker) para guardarlo y aplicarlo.

![Encuentra la línea de tiempo de la escena.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Cambiar registro 0.1.9

### Añadido

- **Scene Maker** — Crea recorridos con cámara y escenas de la historia en el interior Minecraft. Organiza el movimiento de la cámara, los subtítulos, las imágenes, los sonidos, los fundidos, las barras cinematográficas y el movimiento de la cámara en una línea de tiempo.
- **World camera points** — Coloca puntos mientras miras alrededor de tu mundo. Coge un alfiler en forma de diamante con el ratón para moverlo directamente.
- **Editable camera routes** — Usa rutas rectas o suaves y agrega puntos entre las existentes para dar forma al viaje de la cámara.
- **Scene playback commands** — Usa `/drm scene` para ver escenas jugables. El siguiente argumento sugiere escenas guardadas, haciéndolas más fáciles de comenzar.
- **Back and forward arrows** — Desplazarse entre las pantallas del editor desde la barra superior compartida. Pasa el cursor sobre una flecha para ver qué hace.

### Mejorado

- **Timeline browsing** — Una barra de desplazamiento inferior separada le permite ver una escena larga sin mover su marcador de reproducción.
- **Card editing** — Haz clic con el botón derecho del ratón en una tarjeta de línea de tiempo para buscar acciones como dividir y eliminar. Las acciones disponibles dependen del tipo de tarjeta.
- **Easier settings** — Elige opciones de las listas, usa interruptores para activar/desactivar los ajustes y selecciona colores con el selector de colores.
- **World editing** — El movimiento de la cámara se siente más suave, las trayectorias de la cámara son más claras y los alfileres de diamante macizo son más fáciles de reconocer.
- **Point controls** — Hacer clic en un alfiler lo selecciona. Haga clic con el botón derecho en él para mover la cámara, mover el punto a la cámara, editar su ruta de salida, o eliminarlo.
- **Safe dragging** — Suelta el ratón para mantener un movimiento puntual, o presiona Esc/clic derecho para cancelar ese movimiento. Un arrastre completo se puede deshacer en un solo paso.

### Fijo

- Hacer clic en las tarjetas de línea de tiempo ya no hace que el marcador de reproducción salte.
- Agregar elementos de escena es más confiable.
- Los nombres de dimensión y las etiquetas de tiempo de línea de tiempo permanecen dentro de sus áreas previstas.
- La aplicación de ediciones de posición mundial mantiene los puntos que ha dispuesto en lugar de mover el punto seleccionado a la cámara de visualización.
- La acción de la barra de herramientas Save As utiliza su icono apropiado.

### Actualización

Haga una copia de seguridad de su mundo y `config/dochi_rpg_maker/`, luego actualice DRM en el servidor y los clientes. CustomNPCs sigue siendo necesario. Las misiones, facciones, ventanas emergentes y herramientas de administración existentes de 0.1.8 permanecen disponibles.

Los anclajes de escena usan **Player** o **Fixed Position**. Si tienes una escena experimental antigua con un ancla NPC, cámbiala antes de guardarla o reproducirla. Para las flechas de avance/retroceso en los editores de complementos Cobblemon, también instale la compilación de complementos actualizada.
