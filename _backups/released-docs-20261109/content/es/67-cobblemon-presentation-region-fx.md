---
title: Etapas de bloque y FX
slug: cobblemon-presentation-region-fx
order: 533
description: Captura una región del mundo en la presentación de JSON y la coreografía de partículas de autor.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Guía de uso
version: Fabric / NeoForge 0.2.9
audience: Creadores de presentación de batalla
translationSource: en
translationMethod: assisted
---

## Usar los bloques del mundo como escenario

Battle Presentation Maker **Region** incrusta los estados de bloque seleccionados en la presentación JSON. Es un escenario visual para la entrada de la batalla, no una herramienta que coloca o restaura bloques del mundo. La forma guardada permanece disponible después de que la ubicación original cambie o la batalla ocurra en otro lugar.

1. Cargue los fragmentos que contienen la estructura.
2. Establezca dos esquinas de región o utilice la selección de área mundial para mover y cambiar el tamaño del cuadro.
3. Aplica la selección validada y luego usa **Capture region**.
4. Ajustar guiñada, tono, zoom, desplazamiento y rotación final para enmarcar el escenario.
5. Reproduce la línea de tiempo con modelos y capas, luego Guardar o Save As en la barra de herramientas.

La captura sola no persiste la etapa en el disco. Capturar de nuevo después de cambiar el área seleccionada. La selección del mundo nunca cambia los bloques, y Esc los cancela.

![Suelos y pilares capturados guardados como archivo de presentación.](assets/media/guides/cobble-029-neo1211-flow/cobble-region-captured.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Después de capturar 31 bloques y dos estados de bloque, Save As creó custom/guide_stage.json. Guardado a la derecha y el estado inferior confirmar el guardar.")

## Capturar un escenario y añadir partículas en vídeo

![Definir esquinas, capturar bloques reales, añadir partículas, previsualizar y guardar.](assets/media/guides/tutorial-videos-20261107/battle-region-particles.mp4 "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. El suelo y los pilares estaban preparados en el mundo de grabación. Interfaz y anotaciones en inglés; sin audio.")

1. Empieza con una estructura pequeña. Las esquinas **(4, −61, 4)** y **(8, −58, 8)** pertenecen al mundo de grabación; usa tus propias coordenadas.
2. Usa **Region → Capture region** y comprueba que aparezcan los bloques. Introducir coordenadas no captura la región. Comprueba chunks cargados, límites y zonas vacías. Si la vista Region funciona, pero el escenario queda oculto en la reproducción completa, revisa los fondos opacos y las capas Color del preset.
3. Usa **Particles → Add layer → Emit**. El vídeo usa la partícula predeterminada de la capa nueva. Previsualiza y cambia período, Interval o Samples de uno en uno.
4. **Motion** controla el movimiento, **Path** la ruta y **Cues** los efectos temporizados. Amplía después de entender una capa Emit. El vídeo no muestra ediciones detalladas de esas tres páginas.
5. Usa **Play** y **Save As → custom/tutorial_stage.json → Save**. La captura y las partículas modifican el borrador; guardar el archivo es otro paso.

## Límites de captura

| Artículo | Límite actual/comportamiento |
| --- | --- |
| Longitud por eje | Hasta 128 bloques |
| Bloques almacenados | Hasta 32,768 bloques no aéreos admitidos |
| Diferentes estados de bloque | Hasta 512 |
| Chunks | Toda la región debe estar cargada |
| Bloquear entidades como cofres | Rechazar la captura cuando esté presente; seleccione una región que los excluya |

Regiones de gran tamaño, demasiados estados o ningún bloque capturable impiden la captura. La etapa visual no marca, por lo que no reproduce el comportamiento funcional de redstone o contenedor.

## Autor FX

Agregue una entrada de partícula en **Particles**, elija su ID/opciones de partícula, luego use Emit, Motion, Path y Cues para establecer la temporización, el recuento/intervalo, la forma, las dimensiones, la posición, la velocidad y la trayectoria. Copiar/Pegar transfiere la configuración de entrada.

Comienza con una partícula y un intervalo corto, luego prevísalo con el actor, el bloque de escenario y la cámara. Estos son gráficos de presentación, no ataques mundiales o cajas de golpe de daño. Las partículas de mod externo requieren su proveedor mod.

![Una capa de partículas añadida bajo Partículas, con la presentación jugando.](assets/media/guides/cobble-029-neo1211-flow/cobble-presentation-fx.png "Elija Partículas → Agregar capa y, a continuación, edite Emit a la derecha. Esta entrada utiliza minecraft:end_rod, garrapatas 0–39, Intervalo 2 y Muestras 24. Play ejecuta la vista previa de la presentación del editor.")

## Conectar el resultado

Usa la presentación a través de enlaces de entrenador, integración salvaje/RCT/PvP, o el [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler). Presentación JSON sigue siendo esquema `5`. Ver [layers y runtime](#drm-cobblemon-editor/battle-presentation-layers-runtime) para texto, imágenes, actores, audio y cronometraje.
