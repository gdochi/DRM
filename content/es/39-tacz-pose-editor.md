---
title: Pose Edición y Mapeo de Acción
slug: warfare-pose-editor
order: 332
description: Crea pose JSON y transformaciones de arma con DW Pose Core, luego asignalas a acciones NPC.
product: dochi-warfare
category: Poses
section: combat-ai
status: Proyecto
version: 0.3.3
audience: Creadores de NPC
tags:
  - pose
  - editor
  - TACZ
translationSource: en
translationMethod: assisted
---

## Roles de editor y tiempo de ejecución

`DW Pose Core` es un editor de pose de modo creativo para creadores, no una pantalla de jugador en combate. Crear JSON de pose en este editor, luego usar la categoría `Pose` en `DW Npc Core` para asignar perfiles guardados a las acciones en tiempo de ejecución del NPC.

**Save & Apply** guarda la pose de no combate predeterminada. Combat utiliza sus propias poses; después, el NPC vuelve a su valor predeterminado.

El editor admite DNPC de modelo de jugador y admite modelos Steve/Alex CustomNPCs. La captura de pantalla a continuación utiliza un objetivo real DNPC.

## Abrir el editor de pose

1. Mantenga `DW Pose Core` en modo creativo.
2. Haga clic con el botón derecho del ratón en un modelo de jugador DNPC o en un NPC de Steve/Alex CustomNPCs.
3. Manténgase dentro de los bloques 12 y mantenga el núcleo en cualquier mano mientras edita.
4. Editar la pose en `NPC Pose Editor`.

Los modelos no compatibles y los objetivos distantes no se pueden editar. Comience con un reproductor-modelo predeterminado DNPC al comprobar el flujo de trabajo.

![Edición de los ejes de rotación del cuerpo en un DNPC abierto con DW Pose Core.](assets/media/guides/warfare-031-neo1211/dw-pose-editor.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Seleccione Cuerpo a la izquierda para mostrar sus ejes X/Y/Z. La animación sigue el movimiento existente; Custom usa el valor elegido. Guardar y aplicar guarda el perfil y lo aplica a este NPC.")

## Vista previa de NPC y partes del cuerpo

La vista previa de PNJ separada es una vista del creador de la piel, la armadura y el estado del arma del objetivo. Arrastre para girarlo y utilice la rueda del ratón para hacer zoom. Dependiendo de la parte seleccionada y el modo de edición, el arrastre de vista previa directa puede ajustar los valores de rotación o los desplazamientos de posición. Permita que `Walking Preview` inspeccione cómo la pose se mezcla con el movimiento al caminar.

Las partes editables son:

* Cabeza
* Cuerpo
* Brazo derecho / brazo izquierdo
* Pierna derecha / pierna izquierda
* Render de armas

Cada parte del cuerpo expone la rotación X, Y y Z con dos modos de eje:

| Modo de eje | Significado |
| --- | --- |
| `Animation` | Mantenga el eje calculado por TACZ o la animación del jugador. |
| `Custom` | Anule ese eje con el valor del control deslizante. |

Mantenga la cabeza rastreando y caminando las piernas en `Animation` cuando deben continuar moviéndose. Anule solo los ejes necesarios para la postura personalizada.

## Pistola render transforma

`Gun Render` expone:

| Valor | Uso |
| --- | --- |
| Posición X / Y / Z | Mostrar la posición del arma |
| Pitch / Yaw / Roll | Rotación de armas |
| Escala X / Y / Z | Escala de arma por eje |

`All Guns` almacena una transformación de reserva para cada TACZ arma. `This Gun Only` almacena una transformación separada para el arma actual TACZ del NPC objetivo. Una transformación por arma coincidente tiene prioridad sobre el fallback de todas las armas.

## Crear, cargar y guardar poses

| Herramienta | Comportamiento |
| --- | --- |
| `New` | Crea una pose vacía que hereda la animación. |
| `Use Base Preset` | Aplica una pose agrupada que se puede buscar como borrador actual sin cargar un archivo JSON. |
| `Load` | Carga una posición guardada JSON. |
| `Save` | Guarda el nombre actual de JSON. |
| `Save As` | Guarda bajo un nuevo nombre. Presione de nuevo para confirmar la sobreescritura de un nombre existente. |
| `Save & Apply` | Guarda el perfil y lo aplica como la pose de inactividad personalizada del NPC actual. |
| `Reset` | Revierte todos los cambios no guardados al último estado cargado o guardado. |
| Restablecimiento de parte/valor | Revierte solo la parte o valor seleccionado. |

Los archivos Pose se almacenan en el servidor bajo:

```text
config/dochi_warfare/poses/
```

No es necesario editar este JSON a mano. Su estructura es material de referencia para creadores que utilizan herramientas externas o control de versiones.

La biblioteca integrada 0.2.9 incluye Low Ready, High Ready y múltiples poses de combate, ociosas, caminando y fuego en movimiento. Aplique uno, ajuste solo los ejes necesarios y la transformación del arma, luego use `Save As` para crear un JSON de usuario sin modificar los valores agrupados.

![Pose mapeo de categorías de pie, caminando, apuntando, disparando y recargando.](assets/media/guides/warfare-031-neo1211/dw-pose.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Elija Incorporado, Heredar u otra fuente para cada acción, luego seleccione la pose a su derecha.")

## Mapa plantea a las acciones

`DW Npc Core > Pose` no crea una pose. Asigna poses incorporadas o guardadas a acciones para el NPC actual.

| Grupo | Acciones |
| --- | --- |
| Ocioso & Conciencia | Descanso - De pie, Descanso, Alerta |
| Combate a distancia | Objetivo de combate, Disparo, Fuego en movimiento |
| Movimiento de combate | Avance táctico, Retiro, Recargar |
| Equipos y otras acciones | Interruptor de arma, listo para cuerpo a cuerpo, ataque cuerpo a cuerpo, lanzamiento de granada |

Cada acción utiliza una fuente:

| Fuente | Significado |
| --- | --- |
| `Built-in` | Utiliza `TACZ Default`, `Low Ready`, `High Ready` o `Aim Ready`. |
| `Inherit` | Utiliza la misma pose que su acción padre vinculada. |
| `Custom JSON` | Utiliza un perfil guardado en `config/dochi_warfare/poses/`. |

La asignación predeterminada utiliza Low Ready para estar inactivo, con caminar inactivo y Alert heredándolo. Las acciones de objetivo de combate, recarga, interruptor de arma, cuerpo a cuerpo y granada predeterminadas para el controlador DW compartido respaldado por TACZ. Durante la recarga, la acción de la parte superior del cuerpo permanece activa mientras la parte inferior del cuerpo continúa el estado real de caminar, correr o agacharse del NPC. Comience cambiando solo las acciones que realmente necesitan un perfil personalizado.

## Flujo de prueba recomendado

1. Cree un perfil a partir de la plantilla Listo bajo o Listo alto.
2. Cambie solo los ejes necesarios del brazo y el cuerpo, dejando la cabeza y las piernas en `Animation` cuando sea posible.
3. Compruebe tanto de pie y `Walking Preview`.
4. Alinee el arma con `All Guns`, luego corrija solo las armas de forma inusual con `This Gun Only`.
5. Usa `Save & Apply` y verifica la pose inactiva en el juego.
6. Mapee una acción a la vez en `DW Npc Core > Pose`, luego pruebe por separado el disparo, la recarga, el movimiento y la conmutación cuerpo a cuerpo.
