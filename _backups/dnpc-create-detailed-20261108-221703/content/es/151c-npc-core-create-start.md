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
| Sentarse durante el turno | Ride vehicle → Create seat | Esta página |
| Pulir, entregar o atender | Sandpaper Polishing / Addressed Parcel Delivery / Stock Ticker Attendance | [Logística](#dochi-npc-core/npc-core-create-logistics) |
| Alimentar máquinas y pedir material | Factory Process / Material Ordering | [Procesamiento](#dochi-npc-core/npc-core-create-factory) |
| Responder a sensores e inspeccionar | Conditional Machine Operation / Factory Inspection | [Control e inspección](#dochi-npc-core/npc-core-create-control) |

## Instalación y alcance de los vídeos

Instala una distribución real de Create para tu versión de Minecraft y cargador, con sus dependencias. Usa archivos compatibles en servidor y clientes. DNPC básico funciona sin Create ni DRM; añade Create para estos trabajos.

Los registros anteriores cubren **Forge 1.20.1 / NeoForge 1.21.1 / Fabric 26.3**. No demuestran disponibilidad o compatibilidad de Create en Fabric 1.21.1 o NeoForge 26.3. Comprueba la distribución y capacidades reales del destino. CustomNPCs queda excluido en 26.3.

Las grabaciones sin sonido usan **DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1**. **6.0.10 identifica la grabación, no un mínimo universal.** La herramienta opera pantallas y controladores reales en un mundo aislado con dispositivos y turnos preparados. Los subtítulos ingleses y contadores del servidor son anotaciones. Adapta las coordenadas a tu mundo.

## Flujo común: horario, acción, objetivo y guardar

1. Abre **NPC editor → Schedule** con el objeto NPC Core; es una herramienta para creadores.
2. Pulsa **Add time**, nombra el turno y configura **Start / End (world ticks)**. Empieza con **0 → 12000**.
3. Usa el **+** del turno y elige una acción de **Create**. Los asientos usan **Ride vehicle**, en movimiento.
4. Selecciona la acción, pulsa **🔍** y usa **Mayús + clic derecho** en el bloque correcto.
5. Revisa nombre, dimensión y coordenadas. **Esc** cancela.
6. Activa **Enable schedule**, pulsa **Save to NPC**, cierra y observa.

Seleccionar un bloque solo cambia el borrador. El **✓** del nombre tampoco guarda el NPC completo. Consulta [Horarios](#dochi-npc-core/npc-core-schedules).

![Asignar una manivela, introducir seis segundos y guardar la acción preparada.](assets/media/guides/create-tutorials-20261108/create-device-setup.mp4 "DNPC 0.1.3 / Create 6.0.10 / NeoForge 1.21.1. Turno y acción preparados. Este ejemplo de edición mantiene el horario OFF; actívalo antes de ejecutar. Las ejecuciones siguientes son ejemplos separados.")

## Manivela manual

Prueba primero la máquina girando la manivela como jugador. Conexiones, dirección y esfuerzo siguen aplicándose.

1. Elige **Operate hand crank** y asigna la manivela en **Assign hand crank block → 🔍**.
2. Configura **Rotation direction → Default direction / Reverse direction**.
3. Elige **Keep turning** o **Turn for a duration**.
4. **Operating time (seconds) 6** significa seis segundos de giro efectivo. Caminar y esperar a otro operador no consumen ese tiempo.
5. Elige posición automática o asignada y guarda.

![El NPC se acerca, gira una manivela real y termina al agotar su tiempo.](assets/media/guides/create-tutorials-20261108/create-crank.mp4 "Horario preparado y entrada nativa de Create. DNPC no añade potencia ilimitada.")

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

![Dos operaciones reales de una válvula ajustada a 90 grados.](assets/media/guides/create-tutorials-20261108/create-valve.mp4 "Create controla giro y espera. Una operación ya aceptada puede terminar durante una pausa del NPC.")

Admite **1–64 operaciones** por turno y **0,2–60 segundos** de pausa extra. El trabajo finito completado se guarda. Editar, combatir o reconectar no reinicia el cupo del mismo turno. Una nueva ocurrencia o un trabajo modificado se trata por separado.

## Asientos Create

Añade **Ride vehicle**, cambia a **Create seat**, selecciona el bloque con **🔍** y revisa tiempo de intento y bajada al acabar el turno antes de guardar.

![Acercarse, sentarse y bajar de forma segura de un asiento parado.](assets/media/guides/create-tutorials-20261108/create-seat.mp4 "Solo muestra asiento estático, sin cubrir todos los casos de ensamblaje, desmontaje o reconexión de estructuras móviles.")

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
