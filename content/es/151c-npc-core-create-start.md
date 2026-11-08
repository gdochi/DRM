---
title: Integración Create · Manivelas, válvulas y asientos
slug: npc-core-create-start
order: 1514
description: Añade trabajos Create al horario, asigna dispositivos y posiciones y comprueba la operación real.
product: dochi-npc-core
category: Integración Create
section: editor
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Elegir un trabajo

El horario DNPC decide cuándo y dónde trabaja el NPC. Create controla la rotación, el esfuerzo, las recetas y la red logística reales.

| Objetivo | Acción | Guía |
| --- | --- | --- |
| Aportar giro manual | Operate hand crank | Esta página |
| Girar el ángulo configurado | Operate valve handle | Esta página |
| Sentarse durante el turno | Mount vehicle → Create seat | Esta página |
| Pulir, entregar o atender | Sandpaper Polishing / Addressed Parcel Delivery / Stock Ticker Attendance | [Logística](#dochi-npc-core/npc-core-create-logistics) |
| Alimentar máquinas y pedir material | Factory Process / Material Ordering | [Procesamiento](#dochi-npc-core/npc-core-create-factory) |
| Responder a sensores e inspeccionar | Conditional Machine Operation / Factory Inspection | [Control e inspección](#dochi-npc-core/npc-core-create-control) |

## Instalación y alcance de los vídeos

Instala una distribución real de Create para tu versión de Minecraft y cargador, con sus dependencias. Usa archivos compatibles en servidor y clientes. DNPC básico funciona sin Create ni DRM; añade Create para estos trabajos.

Los registros anteriores cubren **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 26.3**. No demuestran disponibilidad o compatibilidad de Create en Fabric 1.21.1 o NeoForge 26.3. Comprueba la distribución y capacidades reales del destino. CustomNPCs queda excluido en 26.3.

Las grabaciones sin sonido usan **DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1**. **6.0.10 identifica la grabación, no un mínimo universal.** Solo están preparados los dispositivos y materiales. Cada lección parte de un horario vacío y muestra acción, objetivos del mundo, campos, activación, guardado y ejecución real. La devolución continúa los ajustes guardados en la lección anterior. La interfaz es inglesa, con pasos en coreano bajo el juego, campos ampliados y marcador de clic. Adapta las coordenadas a tu mundo. El paso situado sobre cada vídeo sigue la reproducción y la búsqueda y sigue siendo legible durante la pausa.

## Flujo común: horario, acción, objetivo y guardar

1. Abre **NPC editor → Schedule** con el objeto NPC Core; es una herramienta para creadores.
2. Pulsa **Add time**, nombra el turno y configura **Start / End (world ticks)**. Empieza con **0 → 12000**.
3. Usa el **+** del turno y elige una acción de **Create**. Los asientos usan **Mount vehicle**, en movimiento.
4. Selecciona la acción, pulsa **🔍** y usa **Mayús + clic derecho** en el bloque correcto.
5. Revisa nombre, dimensión y coordenadas. **Esc** cancela.
6. Activa **Enable schedule**, pulsa **Save to NPC**, cierra y observa.

Seleccionar un bloque solo cambia el borrador. El **✓** del nombre tampoco guarda el NPC completo. Consulta [Horarios](#dochi-npc-core/npc-core-schedules).

## Manivela manual

Prueba primero la máquina girando la manivela como jugador. Conexiones, dirección y esfuerzo siguen aplicándose.

1. Elige **Operate hand crank** y asigna la manivela en **Assign hand crank block → 🔍**.
2. Configura **Rotation direction → Default direction / Reverse direction**.
3. Elige **Keep turning** o **Turn for a duration**.
4. **Operating time (seconds) 6** significa seis segundos de giro efectivo. Caminar y esperar a otro operador no consumen ese tiempo.
5. Elige posición automática o asignada y guarda.

![Crear la tarea de manivela desde un horario vacío, elegir bloque y posición, introducir seis segundos, guardar y observar el giro.](assets/media/guides/create-lessons-20261108/lesson-crank.mp4 "Los marcadores y detalles ampliados muestran las entradas. Activa y guarda el horario, cierra el editor y observa manos y manivela reales.")

**Momentos**: 0:04 Horario vacío · 0:36 Objetivos del mundo · 0:47 Tiempo de operación · 0:59 Activar/guardar · 1:13 Ejecución real.

El tiempo admite **1–1200 segundos**. Un NPC usa cada dispositivo; el jugador tiene prioridad manual. RPM, capacidad y sobrecarga corresponden a Create.

## Posición del dispositivo y de los pies

**Assign hand crank block / Assign valve handle block** señala el dispositivo; la posición de trabajo es el espacio para los pies.

- **Find a reachable position** busca cerca del dispositivo.
- **Assign standing position → 🔍** selecciona suelo sólido y usa el espacio superior para los pies. Deja sitio para cuerpo y cabeza.
- **Use my current position** guarda tu posición en la misma dimensión.
- **X** borra la asignación correspondiente. Revísala tras cambiar de dispositivo.

Mantén un acceso plano y visible; evita maquinaria bloqueada y posiciones sin suelo.

## Válvula: ángulo en el bloque, cantidad en el NPC

1. Ajusta el ángulo del bloque Create; el ejemplo usa **90°**.
2. Elige **Operate valve handle** y asigna ese bloque.
3. Configura dirección y **Number of operations**. **2** ejecuta dos operaciones de 90°.
4. Ajusta **Pause between operations (seconds)**; antes debe terminar la rotación y espera nativas.
5. Revisa la posición y guarda.

![Crear la tarea de válvula, elegir bloque y posición, introducir dos operaciones y pausa adicional de un segundo y ejecutar.](assets/media/guides/create-lessons-20261108/lesson-valve.mp4 "Los 90 grados del bloque difieren del número de operaciones. Create controla giro y espera.")

**Momentos**: 0:04 Horario vacío · 0:36 Objetivos del mundo · 0:44 Cantidad/número · 0:50 Pausa extra · 1:04 Activar/guardar · 1:18 Ejecución real.

Admite **1–64 operaciones** por turno y **0,2–60 segundos** de pausa extra. El trabajo finito completado se guarda. Editar, combatir o reconectar no reinicia el cupo del mismo turno. Una nueva ocurrencia o un trabajo modificado se trata por separado.

## Asientos Create

Añade **Mount vehicle**, cambia a **Create seat**, selecciona el bloque con **🔍** y revisa tiempo de intento y bajada al acabar el turno antes de guardar.

![Elegir Create seat en Mount vehicle, asignar asiento y plazo, guardar, montar y bajar al terminar el turno.](assets/media/guides/create-lessons-20261108/lesson-seat.mp4 "Parte de un horario vacío. La herramienta cambia explícitamente la hora a 12500 para demostrar el fin del turno.")

**Momentos**: 0:04 Horario vacío · 0:36 Objetivos del mundo · 0:47 Plazo para montar · 0:53 Activar/guardar · 1:07 Ejecución real · 1:13 Fin/bajada.

Se asigna un bloque, no un número de asiento de vehículo. Asientos ocupados, ausentes, descargados o inaccesibles esperan hasta el límite. La bajada espera una parada y suelo seguro. El seguimiento contempla ensamblaje y datos guardados, pero esta acción no crea conducción de trenes ni rutas.

## Solución de problemas

| Estado | Revisa |
| --- | --- |
| No empieza nada | Horario activo, hora mundial, acción y guardado |
| Work paused | Edición, IA desactivada, combate, interacción, sueño o IA externa |
| Choose a device in this dimension | Asignación y dimensión |
| Approaching operating position | Suelo, espacio libre, ruta y visibilidad |
| Waiting for another operator | Otro NPC en el dispositivo |
| Yielding to manual operation | Uso directo del jugador |
| Device unavailable | Bloque correcto, chunk cargado y capacidad Create |
| Máquina detenida | Conexiones, dirección y esfuerzo nativos |
| Work complete | Tiempo u operaciones ya completados en este turno |

Continúa con [pulido y logística](#dochi-npc-core/npc-core-create-logistics) o [procesamiento](#dochi-npc-core/npc-core-create-factory).
