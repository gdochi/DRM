---
title: Create · Control condicional e inspección
slug: npc-core-create-control
order: 1517
description: Controla entradas nativas con dos umbrales e inspecciona equipos reales sin cambiar su contenido.
product: dochi-npc-core
category: Integración Create
section: editor
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Trabajar solo cuando se cumpla una condición

**Conditional Machine Operation** aplica manivela, válvula o Linked Controller según un sensor durante el turno activo. Lee [Inicio Create](#dochi-npc-core/npc-core-create-start) y [Procesamiento](#dochi-npc-core/npc-core-create-factory). Vídeos sin sonido: DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Ejemplo: empezar con dos y parar con seis

1. Añade **Create → Conditional Machine Operation**.
2. Elige **Control device → Hand crank** y asigna **Machine control position**.
3. Elige **Sensor reading → Item quantity** y un barril en **Sensor position**.
4. Configura **Counted item → Iron Ingot**; solo cuenta ese ID.
5. Activa **Activate at the lower threshold** y define **Lower threshold 2 / Upper threshold 6**.
6. Define intervalo, activa y guarda.

![Girar con poco hierro y parar al alcanzar seis.](assets/media/guides/create-tutorials-20261108/create-condition.mp4 "La herramienta cambia existencias de cero a seis para mostrar umbrales. La manivela no fabrica los lingotes añadidos.")

## Entre umbrales se conserva el estado anterior

El superior debe superar al inferior; ambos deben ser finitos y no negativos.

| Activate at the lower threshold | Empieza | Para | Entre ellos |
| --- | --- | --- | --- |
| ON | Valor ≤ inferior | Valor ≥ superior | Mantiene estado |
| OFF | Valor ≥ superior | Valor ≤ inferior | Mantiene estado |

ON / 2 / 6 y existencias **0 → 3 → 6 → 4 → 2** producen **girar → seguir → parar → seguir parado → girar**. Evita alternar cerca de un único número.

## Sensores y unidades

| Sensor reading | Objetivo y valor |
| --- | --- |
| Redstone strength | Señal vecina más fuerte del bloque, 0–15 |
| Item quantity | ID elegido en un inventario compatible |
| Tank fill percentage | Tanque Create compatible, 0–100%, no mB |
| Rotation speed in RPM | Velocidad absoluta de un dispositivo cinético |
| Overstress (0 or 1) | Normal 0 / sobrecargado 1 |

Para sobrecarga usa OFF / inferior 0 / superior 1. No confundas volumen con porcentaje ni RPM con sobrecarga. Los sistemas ilegibles o grandes no se escanean sin límite; muestran **Sensor reading unavailable**.

## Manivela, válvula y Linked Controller

| Dispositivo | Activo | Transición inactiva |
| --- | --- | --- |
| Hand crank | Entrada nativa | Detiene nuevas entradas |
| Valve handle | Una operación de transición | Dirección opuesta |
| Linked Controller | Mantiene el canal pulsado | Lo libera |

La válvula responde a cambios de estado, sin repetirse en cada lectura. Espera el giro y enfriamiento nativos. **Reverse the active direction** cambia la dirección activa.

Pon un **Linked Controller real con frecuencias configuradas** en el inventario NPC, elige **Linked Controller button (1–6)** e iguala las frecuencias del receptor Create. **Machine control position** es el lugar físico de trabajo. DNPC no crea frecuencias escribiendo nombres. Un controlador sin configurar muestra **A configured Linked Controller is required in NPC inventory**.

El jugador tiene prioridad. Edición, combate, interacción e IA desactivada pausan nuevas entradas sin rebobinar operaciones iniciadas.

## Factory Inspection

1. Añade **Create → Factory Inspection**.
2. Usa **Add inspection position** y Mayús + clic derecho en hasta **16** dispositivos compatibles.
3. Registra el orden y elimina con **Delete inspection position**.
4. Define **Work interval (ticks)**; la lectura usa al menos **20 ticks**.
5. Asigna opcionalmente un Display Board y guarda.

![Visitar manivela y tanque vacío para leer su estado real.](assets/media/guides/create-tutorials-20261108/create-inspection.mp4 "Solo inspección: sin reparación, repostaje, llenado ni salida Display Board.")

Lee giro/parada, sobrecarga, calor del Burner y nivel del tanque. No repara ni altera contenido. Usa una acción condicional aparte para responder.

## Informes en Display Board

Ensambla correctamente el panel Create y aporta su potencia normal. Asigna **Display Board (optional)** y configura:

| Campo | Significado |
| --- | --- |
| First display row (starting at 1) | Primera fila; 2 conserva la fila 1 |
| Reserved display rows | Filas seguidas; seis desde la 2 reservan 2–7 |

Incluye inspector, dispositivo actual, NPCs cercanos trabajando, trabajos completados y paquetes pendientes. El recuento se limita a unos **32 bloques**, no a toda la producción del servidor. Trabajo completado no equivale al número total de productos.

El informe completo se distribuye en las filas reservadas. **Reserved board rows cannot fit the complete report** deja el panel intacto; aumenta anchura/filas. Reservas solapadas esperan al otro inspector. Las filas externas se conservan.

## Solución de problemas

| Estado | Revisa |
| --- | --- |
| Select valid loaded work positions | Dispositivo, sensor, dimensión y ruta cargada |
| Sensor reading unavailable | Tipo y capacidad compatibles |
| Waiting for the activation threshold | Valor, modo y ambos umbrales; puede ser normal |
| Player manual operation has priority | Uso directo del jugador |
| Workstation is reserved by another worker | Otro NPC o filas reservadas |
| Display Board unavailable or not assembled | Montaje, objetivo, chunks y potencia |
| Panel sin cambios | Fila inicial, anchura, filas y solapamientos |
| NPC esperando cerca | Pausa, IA, posición de pies y visibilidad |

Empieza con un sensor, un actuador y un NPC; después conecta [procesamiento](#dochi-npc-core/npc-core-create-factory) y [logística](#dochi-npc-core/npc-core-create-logistics).
