---
title: Guardar, simular y ejecutar
slug: expanded-support-run
order: 332
description: Guarda, carga, prueba simulaciones reales, invoca apoyo y resuelve problemas con archivos antiguos.
product: dochi-warfare-expanded
category: Apoyo de combate
section: support
status: Guía
version: 0.3.2
audience: Creadores de mapas y operadores
translationSource: en
translationMethod: assisted
---

## Distingue guardar, probar e invocar

Completa la [colocación](#dochi-warfare-expanded/expanded-support-timeline) o la [configuración de apoyo](#dochi-warfare-expanded/expanded-support-actions) y sigue estos pasos.

| Operación | Datos | Resultado |
| --- | --- | --- |
| Save / Save As | Borrador actual | JSON con nombre en el servidor |
| Simulation | Borrador actual | Actores temporales a velocidad normal; terreno y actores existentes protegidos |
| Comando de operador | Archivo guardado | Apoyo real con daño y efectos nativos |

**Simulation no guarda.** Guarda antes de invocar por nombre. El flujo actual es **colocar en el mundo → Simulation → comandos con el nombre guardado**. Los diagramas antiguos y el botón de ejecutar en mi posición no describen esta interfaz.

## 1. Guarda un documento

1. Introduce un título legible, como **Road reinforcement**.
2. Pulsa **Save As**.
3. Usa **tutorial_support** como nombre. Título y archivo son distintos.
4. Confirma y espera la respuesta del servidor.
5. Revisa nombre e indicador de cambios. Después usa **Save / Ctrl+S**.

![Crea apoyo, asigna título/nombre, guarda, busca y carga.](assets/media/guides/dwe-tutorials-20261109/dwe-files.mp4 "09 · Save As → tutorial_support → confirmación → Load → búsqueda → selección → cargar. Compara el archivo y la disposición reabierta.")

**Pulsar no equivale a confirmar.** Lee los estados de espera/error. Si otra persona modificó el archivo, carga la última versión y conserva el borrador con otro nombre.

Lee las confirmaciones de cambios sin guardar al crear, restaurar, cargar o cerrar. **Reset restaura la base guardada; Create New crea un documento vacío.**

## 2. Carga la disposición

1. Busca por nombre en **Load**.
2. Selecciona la fila y espera el resumen.
3. Usa **Load** dentro de la ventana.
4. Revisa eventos, tiempos, rutas y centro.

**Relative coordinates lleva la disposición al centro actual.** Cambia antes a **Absolute coordinates** para conservar posiciones guardadas. Para reutilizarla en otro lugar, fija **Center** antes de cargar en modo relativo.

## 3. Prueba con Simulation

1. Empieza con algo sencillo, como un vehículo.
2. Pulsa **Simulation**; también admite borradores sin guardar.
3. Espera y comprueba vehículo temporal y tiempo transcurrido.
4. Observa ruta, inicio, duración y llegada.
5. Pulsa **Stop** y comprueba la retirada del apoyo.

![Crea una ruta, observa el vehículo real de Simulation y retíralo con Stop.](assets/media/guides/dwe-tutorials-20261109/dwe-simulation.mp4 "10 · Vehículo en cliente/servidor integrado reales; diferente del combate invocado por comandos.")

Usa entidades temporales y movimiento nativo a velocidad normal. El centro queda bloqueado durante la ejecución; detén antes de editar.

Como se protegen terreno y actores existentes, **el daño simulado no mide daño de combate real**. Revisa preparación de NPC, compatibilidad, política del servidor y terreno.

## 4. Invoca apoyo real

Requiere permiso **2**. El archivo es **tutorial_support**, sin extensión en el comando.

```text
/dw callgimmicks tutorial_support
/dw callgimmicks tutorial_support ~ ~ ~
```

| Invocación | Colocación |
| --- | --- |
| Sin coordenadas | Posiciones mundiales guardadas |
| Con coordenadas | Traslada salidas, blancos y destinos del origen guardado a la posición indicada |

Las coordenadas relativas usan la **posición del ejecutor**: jugador o bloque de comandos. Y también traslada la altura del conjunto.

Los cambios sin guardar no se incluyen. La llamada real difiere de Simulation protegida; comprueba rutas y armas en la zona prevista.

También existe bombardeo único. Revisa los ID instalados con autocompletado.

```text
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

**10 son ticks**: primera suelta tras medio segundo a 20 TPS. El comando admite puntos/áreas; crea líneas en el editor.

## Resuelve un paso bloqueado

| Síntoma | Primera comprobación |
| --- | --- |
| Pulsar el suelo no añade evento | Herramienta, superficie cargada y cursor dentro de la vista |
| Faltan propiedades | Selección, panel desplegado y desplazamiento interno |
| Número bloquea otra acción | Completa entradas vacías/negativas y lee el estado |
| Catálogo vacío | Catálogo real del servidor y combinación instalada |
| NPC inmóviles | DW AI, Clone o esfera Area, montura/contrato/otras órdenes |
| Vehículo no aparece/avanza | Espacio libre, terreno, formación y ruta |
| Apoyo expira antes de llegar | Lifetime cuenta desde su generación |
| Load cambia posiciones | Relative/Absolute y Center actual |
| Comando difiere del borrador | Confirmación, nombre, coordenadas y política |
| Conflicto al guardar | Load de la última versión; conserva borrador con Save As |

## Archivos y referencia JSON

No hace falta memorizarlo para usar la interfaz; sirve para copias y edición directa.

- Ruta: `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`
- Esquema actual: `dochi.warfare.gimmicks.v6`; v1–v5 siguen siendo legibles.
- `origin` es la referencia, `steps` contiene eventos y `at_tick` es el tick inicial.
- Una etapa contiene `bombard`, `vehicle_support`, `fire_support` o `npc_move`.
- `lifetime_ticks` es la vida del apoyo. Las posiciones guardadas siguen siendo mundiales aunque la interfaz sea relativa.
- `explosion_damage` y `direct_damage` son daño base en HP. **Cero anula ese componente**; vacío conserva el valor nativo. No cambian radio ni destrucción. Distancia y armadura afectan al daño real.

Los ejemplos integrados solo se instalan si faltan. Conserva los originales y compara una copia de **Save As**.

Vuelve al [primer bombardeo](#dochi-warfare-expanded/expanded-support-timeline) o combina [vehículos, armas y NPC](#dochi-warfare-expanded/expanded-support-actions).
