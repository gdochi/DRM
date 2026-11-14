---
title: Tu primera línea de tiempo de apoyo
slug: expanded-support-timeline
order: 330
description: Usa el nuevo editor del mundo para bombardeos, tiempos y centro de colocación.
product: dochi-warfare-expanded
category: Apoyo de combate
section: support
status: Guía
version: 0.3.3
audience: Creadores de mapas y operadores principiantes
translationSource: en
translationMethod: assisted
---

## Sigue estas tres lecciones

**Gimmick Editor es una herramienta de creación.** Coloca el apoyo en la vista del mundo y elige cuándo comienza cada evento.

| Lección | Objetivo |
| --- | --- |
| 1. Esta página | Conocer la pantalla, crear bombardeos de punto/línea/área y ajustar tiempo y centro |
| 2. [Vehículos, armas y NPC](#dochi-warfare-expanded/expanded-support-actions) | Salidas/destinos, vehículos, armas y fuentes de NPC |
| 3. [Guardar, simular y ejecutar](#dochi-warfare-expanded/expanded-support-run) | Guardar, cargar, probar con Simulation e invocar el archivo |
| 4. [Llamar con un objeto táctico](#dochi-warfare-expanded/expanded-tactical-orders) | Vincular línea guardada → entregar objeto → jugador apunta |

Las tres lecciones incluyen diez vídeos de **DWE 0.3.2 / NeoForge 1.21.1** con la interfaz real en inglés y explicaciones de pasos en coreano. No tienen audio: pausa para localizar cada control. Forge y Fabric comparten este flujo; la grabación es de NeoForge.

Consulta la [instalación y el primer vehículo](#dochi-warfare-expanded/expanded-overview), entra en un mundo con permisos de operador y abre **Gimmick Editor → Create New**. **Use Default** abre un borrador con un bombardeo de punto en la posición del jugador. Empieza con un solo evento.

## 1. Conoce la pantalla

| Zona | Uso |
| --- | --- |
| Superior | Nuevo, Load, Save, Save As, Reset, título, Simulation, coordenadas y Center |
| Izquierda | Herramientas y selección, duplicación y eliminación de eventos |
| Mundo | Colocar posiciones y rutas sobre bloques reales |
| Derecha | Aeronave/vehículo, tiempos y cantidades; Advanced añade coordenadas y otros valores |
| Timeline inferior | Filas de NPC, vehículos/armas y bombardeos; modificar inicios |

![Crea un documento, pliega y redimensiona paneles y mueve la cámara.](assets/media/guides/dwe-tutorials-20261109/dwe-workspace.mp4 "01 · Paneles, divisores, desplazamiento, rotación y zoom. DWE 0.3.2 / NeoForge 1.21.1.")

Usa las flechas de las esquinas para plegar/desplegar paneles y arrastra sus divisores. Desplázate **dentro de las propiedades** para acceder a más campos.

En el mundo, la rueda ajusta el zoom, el arrastre central desplaza la vista y el derecho la gira. **F** enfoca el evento o centro seleccionado. WASD mueve al jugador con seguimiento; Jump/Sneak ajustan la altura de la cámara. Su velocidad −/+ no altera la ejecución.

## 2. Crea el primer bombardeo de punto

Objetivo: **un blanco en el suelo, con primera suelta dos segundos después de invocar**.

1. Elige **Point bombing**.
2. Pulsa una superficie de bloque cargada. Comprueba el evento en la lista y fila de bombardeo.
3. Vuelve a **Select / move** y selecciona su marcador o fila.
4. Revisa **Aircraft / Payload**. Las listas proceden del servidor; si están vacías, revisa instalación y compatibilidad.
5. Introduce **Start (seconds) 2**, **Altitude 96** y **Lifetime (seconds) 30**.
6. Revisa coordenadas en **Advanced**; **Basic** vuelve al formulario compacto.

![Coloca un punto con inicio a dos segundos, altitud 96 y duración de 30 segundos.](assets/media/guides/dwe-tutorials-20261109/dwe-point.mp4 "02 · Explosion damage 20 establece un daño base de explosión de 20 HP. El vídeo no mide impactos ni daño.")

**Dos segundos es la primera suelta, no el impacto.** La altitud y física del arma retrasan la llegada al suelo. Lifetime es la vida del apoyo temporal.

Los campos de cantidad/intervalo pueden estar desactivados para puntos. Usa línea/área para varias sueltas. Los marcadores muestran el plan; los impactos reales dependen de la física nativa.

## 3. Dibuja líneas y áreas

1. Con **Line bombing**, arrastra un corredor por el suelo.
2. Define cantidad e intervalo: **cuatro bombas, separadas 0,5 segundos** en el ejemplo.
3. Dibuja otro corredor con **Area bombing**, que añade anchura.
4. Arrastra los controles de longitud/anchura/dirección con **Select / move**, o usa **Advanced → Width / Heading**.

![Configura cuatro bombas cada medio segundo y ajusta anchura y dirección de un área.](assets/media/guides/dwe-tutorials-20261109/dwe-corridors.mp4 "03 · Eventos de línea y área separados. Área: Width 24, Heading 0. Es configuración, no un ataque.")

Si empiezas a dos segundos, las sueltas son **2,0 → 2,5 → 3,0 → 3,5 segundos**. La cantidad explícita es por aeronave; las áreas pueden usar varias pasadas paralelas. Cantidad, velocidad nativa e intervalo calculan la longitud y pueden bloquear su entrada. Una cantidad vacía conserva la carga nativa.

Heading: **0 sur, 90 oeste, −90 este**. Comprueba el marcador de aproximación.

## 4. Organiza varios eventos

**Cambiar el tiempo y reordenar la lista son operaciones distintas.**

- Basic usa segundos en incrementos de **0,05**. Advanced y los archivos usan ticks enteros; **20 ticks = un segundo** a 20 TPS.
- Arrastra marcadores horizontalmente para cambiar inicios. Pulsa la regla para elegir el tiempo de nuevas colocaciones.
- Timeline −/+ cambia el intervalo visible, no la velocidad.
- Arrastrar filas reordena eventos conservando sus huecos temporales. Cambia el tiempo con campos/marcadores.
- Tras **Duplicate**, revisa solapamiento e inicio. Las casillas permiten eliminar varios eventos.

![Coloca vehículos a dos segundos y bombardeo a cinco, amplía el intervalo y mueve el marcador.](assets/media/guides/dwe-tutorials-20261109/dwe-timing.mp4 "04 · Tiempos, marcadores, Duplicate y Ctrl+Z / Ctrl+Y.")

**Ctrl+Z / Ctrl+Y** deshacen/rehacen la edición. **Esc** o soltar fuera de la zona permitida cancela el arrastre. Un máximo de 16 eventos puede comenzar en un mismo tick; escalona grupos mayores.

## 5. Usa el centro y coordenadas relativas

La pantalla empieza en **Relative coordinates**. Cero en todos los ejes corresponde al **Center** superior.

| Operación | Relativas | Absolutas |
| --- | --- | --- |
| Cambiar visualización | Conserva la disposición | Conserva la disposición |
| Cambiar Center | Traslada salidas, destinos y blancos juntos | Conserva posiciones mundiales y cambia la referencia |
| Introducir posiciones | Distancias desde el centro | Coordenadas del mundo |

![Compara trasladar toda la disposición relativa con cambiar solo la referencia absoluta.](assets/media/guides/dwe-tutorials-20261109/dwe-center.mp4 "05 · Center X = 8 y deshacer. En Absolute coordinates, cambiar el centro conserva la ruta.")

Usa **Center → X/Y/Z**, **Use player position**, o pulsa/arrastra el centro en el mundo. En modo relativo se trasladan todas las rutas y blancos. Decide si quieres editar un marcador o mover el conjunto.

Cargar en modo relativo lleva la disposición al centro actual. Para conservar las posiciones guardadas, **cambia a Absolute coordinates antes de Load**. Los archivos antiguos sin origen usan el primer blanco como referencia.

Continúa con [vehículos, armas y NPC](#dochi-warfare-expanded/expanded-support-actions) o [guarda, prueba y ejecuta](#dochi-warfare-expanded/expanded-support-run).
