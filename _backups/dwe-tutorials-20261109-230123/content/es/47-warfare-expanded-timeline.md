---
title: Cronologías de bombardeo y soporte
slug: expanded-support-timeline
order: 330
description: Programar bombardeos, apoyo de armas, refuerzos de vehículos y movimiento de NPC juntos.
product: dochi-warfare-expanded
category: Apoyo de combate
section: support
status: Proyecto
version: 0.3.1
audience: Creadores y operadores de mapas
translationSource: en
translationMethod: assisted
---

## Crear una línea de tiempo

1. Abra el editor de trucos desde la selección del editor.
2. Elija `Create New` para un documento vacío o `Use Default` para un borrador de bombardeo en su posición.
3. Establece el origen y añade tipos de acción a la línea de tiempo.
4. Configure el tick, las coordenadas, la unidad de soporte y la vida útil de cada acción.
5. Nombre y guarde el archivo con `Save As`.
6. Utilice la acción run-at-my-position para invocar el diseño guardado en relación con su posición.

Guarde los cambios pendientes primero. Si otro usuario cambió el archivo, refresque antes de ejecutarlo. La vista previa del editor muestra el diseño creado; prueba la navegación real y los golpes en el terreno previsto.

| Medidas adoptadas | Configuración y resultado |
| --- | --- |
| Bombardeos | Aviones, bombas, objetivos, rumbo, altitud, forma de ataque e intervalo; utiliza armas nativas de caída libre. |
| Soporte de vehículos | Vehículo, cuenta, inicio/destino, espaciado, facción y radio de guardia; se mueve para defender el destino. |
| Soporte de armas | Modo aire / tierra, arma real del vehículo, aproximación, corredor de tiro, duración y tapa de disparo. |
| Movimiento NPC | Genera clones de NPC de DW seleccionados o dirige temporalmente los NPC de DW existentes en un área. |

El servidor suministra armas de apoyo de armas elegibles. Se excluyen bombas, cohetes, misiles y armas principales de baja velocidad. Ataques de apoyo aéreo y salidas; apoyo en tierra barre un corredor con su torreta. Las RPM nativas, la munición, el calor, la recarga y los controles de seguridad permanecen activos.

Elija clones NPC de la biblioteca DW. La selección de área requiere CustomNPCs con DW AI habilitado y excluye los NPC de conducción, contratados o ya dirigidos. El combate existente tiene prioridad antes de que se reanude el movimiento. No hay teletransportación de reserva. Las facciones usan ID numéricos; las referencias de archivos clon difieren de los nombres de visualización.

![Gimmick Editor con pasos, vista superior, configuración y línea de tiempo.](assets/media/guides/warfare-expanded-031-neo1211/dwe-gimmick.png "DWE 0.3.1 / NeoForge 1.21.1. El borrador predeterminado utiliza A-10A, MK-82 y Point, con la primera gota en el tick 20. Coincidir con la entrada, el objetivo y la salida a la línea de tiempo antes de correr.")

## Momento y origen

20 ticks igual a un segundo a 20 TPS. La garrapata de un bombardeo es la **Primer lanzamiento de bomba**, no impacto. Las garrapatas de soporte para vehículos, armas y PNJ comienzan a desovar o moverse. La duración del soporte de armas comienza al entrar en el alcance del arma; la expiración de la salida o de por vida puede terminarlo antes.

`lifetime_ticks` limita el apoyo temporal. Los NPC desvencijados se eliminan al expirar; los NPC seleccionados por área existentes recuperan su configuración de movimiento anterior sin sobrescribir las ediciones realizadas durante la ejecución. Los vehículos de apoyo temporal no pueden ser abordados, clonados o capturados en piedras del alma.

## Comandos del operador

Se requiere un nivel de permiso 2. Guardar `my_support` primero y omitir `.json` de su nombre de comando.

```text
/dw callgimmicks my_support
/dw callgimmicks my_support ~ ~ ~
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

Sin coordenadas, el diseño guardado se ejecuta en su lugar. Con coordenadas, objetivos, inicios y destinos cambian por la diferencia del guardado `origin`. El último ejemplo lanza su primera bomba después de 10. Compruebe los ID de aeronave / carga útil instalados con la finalización del comando. El comando one-shot soporta puntos y `area`; diseños de línea de autor en el editor/JSON.

## Archivos y referencia JSON

Archivos en vivo en `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`. Los ejemplos incorporados se instalan solo cuando faltan, preservando los archivos del usuario.

El esquema actual es `dochi.warfare.gimmicks.v6`; v1–v5 permanece legible. `origin` define el ancla de diseño, `steps` contiene acciones y `at_tick` las programa. Cada paso contiene uno de `bombard`, `vehicle_support`, `fire_support` o `npc_move`. Comience a partir de archivos generados por el editor al editar JSON.

Los campos de bombardeo `explosion_damage` y `direct_damage` son valores de daño de HP base. Cero desactiva ese componente de daño; un valor de editor vacío conserva el valor de arma nativa. La caída nativa y la armadura todavía afectan el daño real. Estos campos no cambian el radio de explosión o la destrucción del terreno.
