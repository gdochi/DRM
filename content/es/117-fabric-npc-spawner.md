---
title: Usa el Core NPC Spawner
slug: npc-spawner
order: 84
description: Elige los NPC guardados y las condiciones de generación para un bloque de generación de núcleo.
product: core-fabric
category: Sistemas de núcleo
section: npc-spawner
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - npc
  - spawner
  - world
translationSource: en
translationMethod: assisted
---

## ¿Qué aparición es este?

Esto es **DRM Core's NPC Spawner**, usando clones NPC de formato Core legibles por su lista Source. Cobblemon Editor's Clone Library también conecta DNPCs configurados en función a este flujo de trabajo. Importar CustomNPCs Piedras de Alma Llenas en objetivos más antiguos 1.21.1 es una ruta de proveedor separada.

¿Comenzando con la propia plantilla de DNPC Save As? Uso [Spawn ControlNPC-plantilla de aparición](#dochi-spawn-control/spawn-control-npc-templates). Para los clones de Cobblemon-rol, siga [Clone Library](#drm-cobblemon-editor/cobblemon-clone-library-spawner). Haga coincidir el formato de la plantilla con su generador.

## Colocar y abrir el bloque

1. Consigue `/give @s dochi_rpg_maker:npc_spawner` y colócalo.
2. Haga clic con el botón derecho del ratón en DRM.
3. Manténgase dentro de ocho bloques mientras edita.
4. Añadir NPCs guardados bajo **Source**. Compatible CustomNPCs Las piedras de alma rellenas aparecen cuando se llevan en el inventario.
5. Elija el modo de reproducción, el intervalo y las cantidades en **Spawn**.
6. Presione **Save**.

Guardar cambia el bloque del mundo seleccionado; no crea un nuevo archivo a través de Save As.

## Elige entre varios NPC

El código fuente admite hasta 64 entradas. **Weights** establecen su frecuencia relativa: guardias en 3 y arqueros en 1 hacen que los guardias sean más comunes.

Se hace una nueva elección para cada intento. **Max Active** limita los NPC vivos de toda la lista.

## Elegir cuando se ejecuta

![Ajustes de generación de núcleo.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "DRM 0.3.1 / NeoForge 1.21.1, Inglés UI. El modo selecciona el disparador, Enfriar el intervalo de tick, Máx. activa el living cap y Tamaño de onda la cuenta por intento. Las fuentes asignadas son cero en este caso: esto verifica la pantalla de configuración, no el aparición exitoso de NPC.")

| Modo | Comportamiento |
| --- | --- |
| continuo | Intentos a intervalos |
| target_nearby | Intentos mientras un objetivo está cerca |
| target_enter | Intentos cuando un objetivo entra |
| redstone_pulse | Intentos en un pulso redstone |

Por ejemplo, Enfriamiento 200 es aproximadamente diez segundos entre intentos; Máximo activo 1 evita el aparición adicional mientras uno permanece vivo; Tamaño de onda 1 intenta un NPC por activación.

Enfriamiento es 20– 72,000 garrapatas. El límite activo y el tamaño de onda son cada uno 1– 32. El radio objetivo es de hasta 64 bloques; el radio de aparición es de hasta 32.

## Efectos y apariencia

Utilice **Conditions** para los requisitos de activación y **Effects** para partículas, apariencia de bloque y tamaño. El PNJ a desovar y la apariencia del desovedor son opciones separadas.

Al mover el mundo, también incluye plantillas de NPC desde `config/dochi_rpg_maker/npc_spawner/`.
