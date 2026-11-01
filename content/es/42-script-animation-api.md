---
title: API de secuencias de comandos de animación
slug: script-animation-api
order: 125
description: Utilice drmAnimation en CustomNPCs scripts para reproducir animaciones y cambiar las asignaciones de comportamiento o el modelo NPC.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs los autores de guiones
tags:
  - script
  - customnpcs
  - animation
translationSource: en
translationMethod: assisted
---

## Cambiar un modelo y movimiento de NPC desde un script

Esta es una referencia avanzada para los scripts CustomNPCs. Para un cambio de nombre o de piel, comience con [configuración de apariencia](#core/assets-models). El resultado real de la API a continuación asigna minecraft:zombie como un modelo de NPC existente. La reproducción de animación también necesita un ID de movimiento proporcionado por ese modelo o un proveedor instalado.

![Cambio real de un modelo npc y movimiento de un resultado de script.](assets/media/guides/drm-031-forge1201-apis/api-model-zombie.png "DRM 0.3.1 / Forge 1.20.1 con CustomNPCs. El NPC usa una apariencia zombie después de useModdedEntityModel. Esto no es una demostración de instalar o reproducir un recurso de onda.")

## Primeros pasos

Dochi's RPG Maker Forge 0.3.1 registra el CustomNPCs script global `drmAnimation`. El primer argumento de cada método es una envoltura de entidad de script CustomNPCs o una entidad Minecraft. En la mayoría de los scripts de eventos, pase `event.npc` directamente.

```js
function interact(event) {
    drmAnimation.useModdedEntityModel(event.npc, "minecraft:zombie");
}
```

Primero confirme que el NPC preparado toma el modelo mostrado anteriormente. Conecte la reproducción de caminar, atacar y otras animaciones solo después de preparar el proveedor y los recursos de movimiento reales.

:::note Necesidades
`drmAnimation` se registra solo cuando CustomNPCs está presente. El mod de proveedor y los recursos de animación seleccionados también deben estar disponibles en el servidor y en los clientes de conexión.
:::

## Reproducción directa

La sobrecarga más corta omite la política de reproducción y utiliza `once`.

```js
drmAnimation.play(event.npc, "entity", "attack_animation", 1.0, 40);
drmAnimation.playPlayerAnimator(event.npc, "mypack:wave", 1.0, 80);
drmAnimation.playBetterCombat(event.npc, "bettercombat:one_handed_slash", 1.0, 40);
drmAnimation.playEntityAnimation(event.npc, "attack_animation", 1.2, 60);
```

| Proveedor | Finalidad |
| --- | --- |
| `entity` | Animación nativa del modelo de entidad modificado seleccionado |
| `geckolib` | Animación desde un modelo JSON administrado DRM GeckoLib |
| `player_animator` | Player Animator animación de recursos |
| `better_combat` | La animación Better Combat especificada |

`player_animator` y `better_combat` se rechazan cuando el objetivo utiliza un GeckoLib o un renderizador de entidad modificada. Para `entity`, primero asigne un modelo de entidad modificada al NPC y use un ID de animación realmente expuesto por ese modelo.

## Políticas de reproducción

Los modos numéricos proporcionan argumentos de script compactos.

| playbackMode | Nombre | Comportamiento |
| --- | --- | --- |
| `0` | `loop` | Repita durante la duración solicitada |
| `1` | `once` | Jugar una vez |
| `2` | `hold_last` | Jugar una vez y mantener el último marco |

Coloque un modo numérico al final de la llamada.

```js
drmAnimation.playEntityAnimation(event.npc, "idle_animation", 1.0, 100, 0);
drmAnimation.playEntityAnimation(event.npc, "death_animation", 1.0, 100, 2);
```

Coloque una política con nombre inmediatamente después de `animation`.

```js
drmAnimation.playEntityAnimation(event.npc, "attack_animation", "once", 1.0, 40);
drmAnimation.play(event.npc, "entity", "idle_animation", "loop", 1.0, 100);
```

Los números y nombres fuera de `loop`, `once` y `hold_last` son rechazados en lugar de ser convertidos silenciosamente.

## Guardar animaciones de comportamiento

`setBehavior` almacena una asignación de animación en la configuración del modelo NPC. Los identificadores de comportamiento estándar son `idle`, `walk`, `sprint`, `attack`, `hurt` y `death`.

```js
function init(event) {
    var npc = event.npc;

    drmAnimation.useModdedEntityModel(npc, "cataclysm:amethyst_crab");
    drmAnimation.setBehavior(npc, "idle", "entity", "idle_animation", 1.0, 0);
    drmAnimation.setBehavior(npc, "attack", "entity", "attack_animation", 1.0, 1);
    drmAnimation.setBehavior(npc, "death", "entity", "death_animation", 1.0, 2);
}
```

Reproducir o eliminar una asignación guardada de la siguiente manera.

```js
drmAnimation.playBehavior(event.npc, "attack", 60);
drmAnimation.clearBehavior(event.npc, "attack");
```

`useModdedEntityModel` aplica un ID de tipo de entidad válido a un CustomNPCs NPC. Restaurar el renderer regular CustomNPCs con `useCustomNpcModel`.

```js
drmAnimation.useCustomNpcModel(event.npc);
```

## Argumentos y valores de retorno

- `speed` acepta `0.0` a `32.0`.
- `durationTicks` acepta 1 a 600 garrapatas.
- Los métodos de reproducción directa incluyen `durationTicks`; no hay un método separado `playForTicks`.
- Utilice el ID de animación exacto expuesto por el proveedor.
- Los métodos devuelven `true` cuando se acepta la solicitud y `false` para un objetivo, argumento o combinación de renderizador no válidos.

## Referencia de firma completa

Esta sección es solo de referencia.

```js
drmAnimation.play(target, provider, animation, speed, durationTicks);
drmAnimation.play(target, provider, animation, speed, durationTicks, playbackMode);
drmAnimation.play(target, provider, animation, playback, speed, durationTicks);

drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks);
drmAnimation.playPlayerAnimator(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playPlayerAnimator(target, animation, playback, speed, durationTicks);

drmAnimation.playBetterCombat(target, animation, speed, durationTicks);
drmAnimation.playBetterCombat(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playBetterCombat(target, animation, playback, speed, durationTicks);

drmAnimation.playEntityAnimation(target, animation, speed, durationTicks);
drmAnimation.playEntityAnimation(target, animation, speed, durationTicks, playbackMode);
drmAnimation.playEntityAnimation(target, animation, playback, speed, durationTicks);

drmAnimation.playBehavior(target, behavior, durationTicks);
drmAnimation.setBehavior(target, behavior, provider, animation, speed, playbackMode);
drmAnimation.clearBehavior(target, behavior);
drmAnimation.useModdedEntityModel(target, entityTypeId);
drmAnimation.useCustomNpcModel(target);
```

## Solución de problemas

- Cuando una llamada devuelve `false`, compruebe primero el destino, proveedor, ID de animación, velocidad y duración.
- Compruebe que Player Animator o Better Combat no se está utilizando con una entidad modificada o GeckoLib renderer.
- Los motores de animación y los ID internos varían según la entidad mod. Use un ID que se muestra en la lista de selección de NPC Basic para el modelo seleccionado.
- El servidor envía solicitudes de reproducción, pero los clientes las renderizan. Los clientes de conexión necesitan la compilación DRM requerida, el mod de proveedor y los recursos.
