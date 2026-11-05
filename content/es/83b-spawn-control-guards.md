---
title: Coloca una escuadra en cada estructura
slug: spawn-control-guards
order: 841
description: Configura filtros de biomas y estructuras, miembros, equipo y esperas de reaparición.
product: dochi-spawn-control
category: Reglas
section: rules
status: Guía
version: 0.1.5
audience: Operadores de servidores y creadores de mapas
translationSource: en
translationMethod: assisted
---

En 0.1.5, una regla natural puede reunir varios destinos y cantidades dentro de estructuras existentes. Se aplica a Forge 1.20.1, Fabric/NeoForge 1.21.1 y 26.3. Las criaturas normales no necesitan DRM ni un mod de PNJ. Las plantillas DNPC guardadas requieren DRM y DNPC; CustomNPCs no está disponible en 26.3.

## 1. Abrir los ajustes de lugar

Pulsa **K**, elige un destino y usa **Add Rule**. En Forge, abre **World → Locations and guard squad → Edit**. En Fabric/NeoForge, desplázate hacia abajo en el inspector hasta **Locations and guard squad → Edit**.

Esta herramienta de creación tiene las pestañas **Locations** y **Squad and equipment**. **Apply** actualiza el borrador; después **Save** en el editor principal lo aplica al servidor. Cancel o Escape descarta los cambios de esta ventana.

## 2. Elegir biomas y estructuras

Usa 🔍 en Locations para buscar biomas y estructuras registrados en el servidor, incluidos los de mods y paquetes de datos.

| Selección | Ejemplo y significado |
| --- | --- |
| Included biomes | Coincide con cualquier ID/etiqueta elegida, como `minecraft:plains` |
| Excluded biomes | Rechaza aunque coincida un selector incluido |
| Included structures | Una instancia existente de, por ejemplo, `minecraft:pillager_outpost` |
| Excluded structures | Rechaza posiciones dentro de estos límites |
| Etiquetas | Selecciona un grupo registrado con `#namespace:tag` |

Una inclusión vacía no limita esa categoría; las exclusiones tienen prioridad. Se usan los límites registrados completos. No se reconocen castillos construidos a mano ni se generan estructuras. Los chunks candidatos y la información de inicio de la estructura deben estar cargados; no se fuerza la carga.

![Filtros de lugar y controles de ocupación por estructura.](assets/media/guides/spawn-control-015-fabric263/guard-locations-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Pantalla real en inglés. Included structures muestra Any: todavía no hay límite por estructura activo.")

## 3. Componer la escuadra completa

En Squad and equipment, activa **Use squad** y usa **Add** para elegir miembros. Por ejemplo, ajusta **Member count** a 2 en una fila de zombis y a 1 en una de esqueletos: tres entidades en total. Para un PNJ guardado, elige su plantilla exacta en vez del EntityType predeterminado.

El máximo total es 64. **Member spread** abarca 1–32 bloques, con 5 por defecto. La escuadra usa cantidades por miembro en lugar de Minimum/Maximum Group. Una tirada prepara la composición entera; todos deben cumplir posición, colisión, condiciones y límites antes de añadirse juntos. La falta de espacio o capacidad hace fallar el intento completo.

Es una función de aparición natural. Un generador colocado sigue sorteando destinos individuales de su lista de probabilidades. Configura patrullas, facción e IA de combate en el mod de la criatura o PNJ.

## 4. Ajustar el equipo

Selecciona un miembro y usa 🔍 para cabeza, pecho, piernas, pies y manos. El selector ofrece todos los ítems y **Player inv** sin consumir objetos del inventario.

**Keep** conserva el equipo original o de la plantilla. Elegir un ítem configura esa ranura. **Clear** la vacía; al desactivarlo se recupera el ítem elegido o Keep si no hay ninguno. Sin filas de miembros, la derecha edita el equipo del destino base.

![Ranuras de equipo y sus interruptores Clear.](assets/media/guides/spawn-control-015-fabric263/guard-members-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Ajustes de un miembro con Clear activado en la cabeza. No demuestra combate ni aplicación completada del equipo.")

## 5. Evitar grupos duplicados

**One group per structure instance** está activado por defecto y requiere una estructura incluida. Todos los jugadores comparten el lugar identificado por dimensión, regla, tipo de estructura y chunk inicial. Varias llegadas no duplican el grupo de esta regla. Otras reglas tienen ocupación independiente.

**Respawn delay** empieza al retirar al último miembro propio; el valor inicial es 1200 ticks. Perder solo algunos no repone la escuadra inmediatamente. Descargar chunks, cambiar de dimensión o alejar a los guardias no libera el lugar. La ocupación y la espera se guardan en los datos del mundo. Sin estructuras incluidas, no se aplican este límite ni su espera.

## 6. Guardar y probar

Aplica, activa la regla y guarda. Empieza con probabilidad 1 e intervalo de unos 200 ticks, con capacidad y espacio para la escuadra completa. Dimensión, hora, luz y distancia siguen aplicándose. La distancia mínima predeterminada de 24 bloques puede hacer fallar una comprobación a los pies del jugador.

Usa **Advanced Diagnostics** para ver fallos. La prueba confirmada crea entidades reales, incluida toda la escuadra activa; Forge la llama **Spawn Squad**. Comprueba límites de estructura, carga, espacio y capacidad antes de ajustar valores de uso. Consulta [condiciones y límites](#dochi-spawn-control/dochi-spawn-control-rules).

## 7. Trasladar a otro servidor

El esquema natural es 4; los esquemas 2 y 3 siguen siendo legibles. Evita guardar los nuevos preajustes en versiones antiguas de Spawn Control. Incluye mods de destinos e ítems y las plantillas DNPC originales. El NBT avanzado de ítems 1.20.1 y los componentes posteriores no se convierten automáticamente entre versiones.

Respalda el mundo junto con los JSON para conservar ocupación y esperas. Consulta [preajustes y operaciones](#dochi-spawn-control/dochi-spawn-control-presets-operations) para rutas y ámbitos de guardado.
