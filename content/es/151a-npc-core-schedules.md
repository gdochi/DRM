---
title: Horarios diarios y montar a caballo
slug: npc-core-schedules
order: 1512
description: Elija las horas de trabajo, los períodos de descanso y los vehículos a bordo.
product: dochi-npc-core
category: Horarios
section: editor
status: Guía
version: 0.1.3
audience: Creadores de NPC
translationSource: en
translationMethod: assisted
---

## Trabajar de día, descansar de noche

1. Abre **Schedule** en el carril izquierdo del editor del PNJ.
2. Pulse **Add time** en el medio. Introduzca un **Time slot name**, como "Día de turno", a la derecha y pulse el ** ✓ ** al lado para aplicar ese nombre.
3. Entra **Start (world ticks) / End (world ticks)** a la derecha.
4. Usa **+** en la fila de tiempo para agregar una actividad, luego selecciona esa actividad para configurar su ubicación y objetivos.
5. Añada un período de noche con **Rest** o **Sleep in assigned bed**, y asigne su lugar de descanso o cama.
6. Habilite **Enable schedule** encima de la lista, luego use **Save to NPC** en la parte superior.

![Schedule inmediatamente después de Add time, con un 0 – 1000 período en el medio y nombre, los campos de inicio y fin a la derecha.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-add.png "DNPC 0.1.2 / NeoForge 1.21.1. La fila + añade una actividad. El nombre ✓ aplica su nombre; Save to NPC guarda todo el NPC.")

El `0–1000` es el período inicial. Cambie su hora final si debe cubrir un día entero de trabajo. Un período sin actividad, o un horario discapacitado, no es una configuración de trabajador completa.

| Hora | Valor de tick |
| --- | --- |
| 06:00 | 0 |
| 12:00 | 6000 |
| 18:00 | 12000 |
| 00:00 | 18000 |

Buscar en la lista de acciones para trabajos como la madera, el transporte o montar a caballo. Las categorías pueden limitar la búsqueda.

![El selector de acción de la fila de tiempo con categorías a la izquierda, actividades específicas a la derecha y búsqueda arriba.](assets/media/guides/dnpc-012-neo1211/dnpc-action-picker.png "Movimiento y espera contiene movimiento, esperando, montando y patrullando. Elija una categoría, luego la actividad real a la derecha.")

## Asignar una cama

![Elegir Assign bed en Houses, vincular y guardar la cama y ver al PNJ caminar y dormir.](assets/media/guides/short-videos-color-20261106/dnpc-bed-assignment.mp4 "Grabado en el juego con DNPC 0.1.3 / NeoForge 1.21.1, interfaz en inglés. El horario nocturno se preparó en el mundo de captura; se verificaron la asignación y el sueño real.")

Elige **Houses → Assign bed** y haz **Shift+clic derecho** en la cama. Al volver al editor, comprueba **Bed assigned** y pulsa **Save to NPC**. Añade **Sleep in assigned bed** al período nocturno y activa **Enable schedule**. La ubicación de la casa y su cama se asignan por separado.

## Partir de un ejemplo

Usa **Load schedule**, elige un ejemplo y luego cambia sus ubicaciones y objetivos para tu mundo. Filtrar por programas generales / militares y complementos requeridos.

![Schedule biblioteca abierta a través de la programación de carga, que muestra ejemplos, complementos necesarios, filtros de categoría y seleccionar.](assets/media/guides/dnpc-012-neo1211/dnpc-schedule-load.png "Lea un ejemplo, selecciónelo y presione Seleccionar. Los ejemplos de cocción informan los requisitos no disponibles cuando falta su complemento.")

Por ejemplo, **Wheat delivery task** recoge solo trigo, pero aún necesita un contenedor de salida. **Cooking task** necesita un mod para cocinar y una fuente de ingredientes, estación de trabajo, contenedor de salida y receta. Continúe con [cooking](#dochi-npc-core/npc-core-cooking).

En 1.20.1 / 1.21.1, los ejemplos también cubren las tareas de guardia, patrulla y escolta de DW y las tripulaciones de DWE. DW está disponible en Forge/NeoForge; las tareas del vehículo necesitan DW, DWE y SuperbWarfare. Los ejemplos no disponibles muestran lo que falta. Los horarios militares de DW usan una acción por período.

Un NPC más antiguo **Legacy AI compatibility** mantiene su comportamiento anterior. Al cambiar, compruebe **Schedule type** y el interruptor habilitado.

## A bordo de un barco, caballo o vehículo

1. Establezca la actividad de un período en **Movement → Mount vehicle**.
2. Encuentre vehículos vacíos cercanos automáticamente, o seleccione uno con .
3. Establece el centro de búsqueda y el radio: bloques predeterminados 16, rango 1–32.
4. Elige un asiento. Comience con **-1 ** selección automática para barcos de vainilla, carretas de minas y caballos.
5. Elija si desea desmontar cuando finalice el período y, a continuación, guarde.

El PNJ camina hacia el vehículo. Intentos predeterminados a 600 ticks, ajustables desde 20–2400. Un vehículo fuera del área de búsqueda o en otra dimensión no puede ser abordado.

Los vehículos SuperbWarfare compatibles en destinos antiguos admiten asientos 0–63. El selector común de 26.3 usa vehículos vanilla y no omite un asiento anterior; los vehículos DW/DWE no están disponibles en 26.3. En entornos Create compatibles, **Create seat** se asigna aparte como bloque.

El desmontaje espera hasta que el vehículo se detenga y haya una salida segura disponible. Configure la conducción, las patrullas y las armas en DWE o en la configuración del vehículo.

## Horarios de trabajos Create

En **+ → Create** del turno, elige manivela, válvula, pulido, paquetes, atención, procesamiento, pedidos, control o inspección. Sigue [Configuración Create y vídeos](#dochi-npc-core/npc-core-create-start) para seleccionar bloques y guardar. Los asientos usan **Mount vehicle → Create seat**; el mostrador usa **Stock Ticker Attendance**.

## Horario de la tienda

Conecte una tienda DRM a un horario para limitar las horas de negociación. Una vez que se cierra, las operaciones desde una pantalla de tienda ya abierta también se rechazan.

Compruebe **DRM functions → Use DNPC function schedule** también. Cuando está apagado, se utilizan archivos directamente aplicados DRM. Cuando están activados, los enlaces programados tienen prioridad; una ruta programada vacía deshabilita esa función. Habilitar este interruptor por sí solo no configura las horas de apertura.

![DRM funciones con DRM Programa de funciones Apply and Use DNPC.](assets/media/guides/dnpc-012-neo1211/dnpc-drm.png "DRM Aplicar abre la pantalla de vinculación de archivo de función. El siguiente interruptor decide si los enlaces programados tienen prioridad.")
