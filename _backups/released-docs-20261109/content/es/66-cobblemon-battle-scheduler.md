---
title: Battle Scheduler
slug: cobblemon-battle-scheduler
order: 534
description: Conecte el aparición de clones, las escenas de introducción/batalla/resultados y la admisión de área en una sola carrera.
product: drm-cobblemon-editor
category: Battle Scheduler
section: scheduler
status: Guía de uso
version: Fabric / NeoForge 0.2.9
audience: Encuentro creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Elige el NPC que entra en la batalla

Elija un clon del editor o una plantilla NPC en **Actor**. Para reutilizar un entrenador DNPC terminado, primero guárdelo con su papel en [Clone Library](#drm-cobblemon-editor/cobblemon-clone-library-spawner), luego conecte las posiciones de la Arena y las escenas de Secuencia. Los clones existentes CustomNPCs y las plantillas DNPC usan diferentes formatos; los nombres coincidentes no los hacen intercambiables.

## Lo que conecta

El planificador ejecuta **NPC clon aparición → escena de introducción → presentación de batalla → Cobblemon batalla → recompensas existentes / progresión → escena de resultado → actor limpieza y salida**. Está disponible en Fabric y NeoForge Cobblemon Editor 0.2.9 para Minecraft 1.21.1. RCT es opcional.

El clon proporciona el NPC y la apariencia; Entrenador o Pokémon JSON proporciona la configuración de batalla. Scene Maker suministra escenas de introducción/resultado, mientras que Battle Presentation Maker suministra la entrada de batalla. Ejecutar un planificador no modifica el clon guardado.

![Programador con Actor, Arena, Secuencia, Política, Vista Previa, Validar y Ejecutar.](assets/media/guides/cobble-029-neo1211/cobble-scheduler.png "0.2.9 / NeoForge 1.21.1. Seleccione una fuente de actor y, a continuación, conecte las posiciones de la arena, las escenas de secuencia y los desencadenadores de directiva. Habilitado solo no genera un actor.")

## Crear un primer encuentro

1. Prepara un clon o plantilla de NPC y un archivo de batalla de Entrenador o Pokemon en funcionamiento.
2. Abra **Battle Scheduler** en la lista del editor de complementos DRM.
3. En **Actor**, seleccione el clon y elija **Use Existing Settings** o **Apply New JSON**. Usa el nuevo JSON cuando el clon no tenga encuadernación de batalla.
4. En **Arena**, configure el ID de habitación, los límites, las posiciones de actor/jugador/salida y el frente. Tomando la posición actual también registra su mundo.
5. En **Sequence**, conecte la introducción, la presentación de batalla y las escenas de ganar/perder/huir. Las escenas son opcionales; una presentación vacía usa la encuadernación de batalla del actor.
6. En **Policy**, establezca comando/área/disparo, admisión, cancelación de permisos, tiempo de reutilización, tiempo de espera de inicio y alcance de progresión.
7. En **Preview**, juega/detente y elige ganar, perder o huir. Vuelva a cargar las referencias después de cambiar sus archivos.
8. Validar, guardar un archivo de usuario con `Save As` y usar Ejecutar para probar el aparición real y la batalla.

Vista previa lee archivos referenciados, apariencia de clon, escenas y presentación. Prueba el aparición real, la victoria y las recompensas con una carrera real. Cargue los trozos utilizados por el área y previsualizar la cámara.

## Seleccione un área en el mundo

Utilice **Arena → Select area** para mover el cuadro o arrastrar sus esquinas y, a continuación, Aplicar. Esc cancela, y los bloques nunca se cambian. Los límites máximos son exclusivos. Coloque las posiciones iniciales del actor / jugador dentro del área y elija una salida utilizable.

Habilite **Show scheduler areas** en Mods Config y mantenga presionado el núcleo DRM en Creative para ver hasta 16 áreas cercanas dentro de 64 bloques. Verde significa encendido, gris apagado y naranja en uso. Se requiere permiso de edición; las guías están ocultas durante escenas o batallas. Esta configuración de pantalla local es independiente del control de entrada automática.

## Control de entrada automática

El control ON/OFF del área del archivo guardada se aplica inmediatamente en el servidor y persiste en los reinicios. OFF detiene las nuevas admisiones automáticas mientras continúan las batallas actuales y el inicio explícito permanece disponible. Utilice Cancelar para detener una carrera. Guardar un borrador del editor no restablece este interruptor operativo.

```text
/drm battle_scheduler area on "boss_room.json"
/drm battle_scheduler area off "boss_room.json"
/drm battle_scheduler area status "boss_room.json"
```

La entrada automática también requiere un documento habilitado, Área o ambos desencadenantes y límites habilitados. La entrada se comprueba cuando el jugador entra; permanecer dentro no genera actores repetidamente.

## Comandos y diálogo

Los comandos de administrador apuntan a un jugador. Un jugador que ejecuta el comando puede omitir el argumento del jugador para dirigirse a sí mismo.

```text
/drm battle_scheduler start "boss_room.json" PlayerName
/drm battle_scheduler cancel PlayerName
```

En los comandos DRM dialogue/quest, reemplace `PlayerName` por `{player}`. **Copy Command** utiliza esa forma. `@player` pertenece al reemplazo de texto de visualización, no al argumento del jugador de este comando. Alternativamente, elija la acción de diálogo **Battle Scheduler** y seleccione un servidor JSON. El éxito cierra el diálogo; el fracaso lo mantiene abierto.

## Reservas y limpieza

El mismo jugador, el mismo ID de mundo/habitación o las áreas superpuestas en el mismo mundo no pueden ejecutarse simultáneamente. Diferentes archivos dirigidos a una habitación comparten la reserva hasta las escenas de resultados y el final de la limpieza. La admisión individual rechaza las habitaciones ocupadas; la admisión de espectadores permite ver mientras bloquea una batalla separada contra el actor reservado.

Cancelación, partida, desconexión, muerte, fallo de generación y tiempo de espera de inicio limpian las escenas y el actor generado y liberan las reservas. Los NPC ordinarios no se eliminan. Las referencias se fijan cuando se inicia una ejecución, por lo que los cambios de archivo surten efecto en la siguiente ejecución.

## Archivos y solución de problemas

| Datos | Ruta |
| --- | --- |
| Programador JSON | `config/dochi_rpg_maker/cobblemon/battle_schedulers/` |
| Estado operativo de entrada automática | `config/dochi_rpg_maker/cobblemon/battle_scheduler_area_state.json` |

Para herramientas externas, el esquema es `dochi.cobble.battle_scheduler.v1`. La progresión es independiente del UUID del actor temporal; Save As a un archivo diferente crea un ID de progresión separado. Si el inicio falla, compruebe el permiso de edición, las encuadernaciones de clonación/batalla, los fragmentos, las reservas de habitación y el tiempo de reutilización.
