---
title: Elige equipos, rondas, diálogos y recompensas
slug: cobblemon-trainer-editor
order: 520
description: Construye el equipo de un entrenador y elige lo que sucede antes y después de la batalla.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Cobblemon no hay comentarios
tags:
  - trainer
  - editor
  - party
translationSource: en
translationMethod: assisted
---

## Comience con un Pokémon

Seleccione un Pokémon en la lista del medio **Pokemon Party** para editarlo a la derecha. Las pantallas usan la interfaz de usuario en inglés de **Cobblemon Editor 0.2.9, DRM 0.3.1 y Cobblemon 1.8.4 en NeoForge 1.21.1 **.

![Nivel 5 Bulbasaur seleccionado, con ajustes básicos a la derecha.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Izquierda: categorías. Medio: equipo y modelo de la ronda actual. Derecha: el seleccionado Pokémon.")

1. Usar **Add**. Los entrenadores soportan hasta seis Pokémon por ronda; Pokemon usa uno.
2. Haga clic en el nombre de la especie debajo de **Basic → Pokemon** para elegir una especie. El botón de ejemplo dice **Bulbasaur**.
3. Establece **Level**, luego elige soportado **Form / Aspects**, **Nature** y **Ability**.
4. Elija un **Held Item**. Las pociones utilizadas por el entrenador pertenecen a la **Battle Item Inventory** separada debajo de la lista de equipos.
5. **Save As** tu propio archivo, luego aplícalo a un NPC. Véase [ la primera batalla](#drm-cobblemon-editor/cobblemon-editor-setup) para los pasos obligatorios.

![Selector de especies abierto desde el botón Bulbasaur, con búsqueda, Filtros y páginas.](assets/media/guides/cobble-029-neo1211/cobble-pokemon-picker.png "Busque por nombre o reduzca el catálogo con Filtros; no necesita memorizar ID de especies.")

## Establecer estadísticas y movimientos

**Stats** muestra los valores calculados a nivel de autoría. Utilice **Edit IV / EV** para cambiar IVs y EVs. Los IV aleatorios o naturaleza producen un rango posible en lugar de un solo valor fijo.

![Nivel 5 rangos estadísticos con IV aleatorio y EV 0/510.](assets/media/guides/cobble-029-neo1211/cobble-stats.png "El ajuste del nivel de batalla y otras reglas de batalla pueden cambiar los valores utilizados durante una batalla.")

| Configuración | Rango |
| --- | --- |
| Nivel | 1–100 |
| Se mueve | Hasta 4 |
| IVs | 0–31 por estadística |
| EVs | 0–252 por estadística; 510 total |

En **Moves**, use el botón de exploración de cada ranura para seleccionar un movimiento. Arrastre un movimiento asignado para reordenarlo. Las ranuras vacías usan las reglas de conjunto de movimientos existentes; cuatro etiquetas Ninguno no significan que Pokémon no pueda usar ningún movimiento.

![Cuatro ranuras móviles con botones de selección individuales.](assets/media/guides/cobble-029-neo1211/cobble-moves.png "Establezca movimientos aquí cuando el entrenador necesita un conjunto de movimientos particular. Los movimientos del conjunto de aprendizaje de la especie aparecen primero en el selector.")

Utilice **Generate Party** para un equipo construido a partir de filtros. Continúe con [AI, generación de equipos y mecánicas](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) para obtener más control.

## Conecta disparadores, rondas y diálogo

Elija **Battle Config** a la izquierda para cambiar a la configuración de batalla.

![Configuración general de batalla que muestra la batalla del entrenador, el tipo de batalla, la fuente del nombre y la presentación.](assets/media/guides/cobble-029-neo1211/cobble-config.png "General: identidad y tipo. Encuentro: triggers. Rondas: configuración redonda. Diálogo: conversación previa a la batalla. Después de las acciones: lo que sigue a un resultado.")

1. En **General**, habilite **Trainer Battle** y elija **Battle type**. **Name source → Trainer Profile** usa **Trainer Name** aquí; **Applied NPC Name** usa el nombre del NPC aplicado.
2. En **Encounter**, elija interacción o detección de jugador cercano. Ver [ encuentros y revancha](#drm-cobblemon-editor/cobblemon-encounters-rematches) para condiciones y períodos de espera.
3. En **Rounds**, utilice **Add / Duplicate** para hasta 16 rondas. Cada uno puede tener su propio equipo, reglas, condiciones, diálogo y recompensas. El progreso existente sigue el orden de la ronda, así que revise los cambios antes de reordenar un entrenador operativo. La aplicación de nuevo no borra los registros de victorias.
4. En **Dialogue**, selecciona el diálogo de la ronda actual y pon **go_battle** en su elección de batalla. Sin un conjunto de diálogos, se utiliza la confirmación de batalla normal.
5. Elija una entrada en **General → Battle presentation**. Ajustes de nivel y individuales en [reglas de batalla](#drm-cobblemon-editor/cobblemon-battle-rules).

![Reglas de la ronda actual, AI, trucos y configuraciones de revancha.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "Los controles redondos son Agregar / Duplicar. Haga clic en el valor actual junto a la habilidad AI a la derecha para abrir la configuración de la estrategia.")

### Mira cómo el diálogo inicia una batalla

Con el entrenador y el diálogo de la ronda ya aplicados, interactúa con el NPC y elige **Let's battle!**. La opción ejecuta **go_battle**, reproduce la introducción configurada y abre la pantalla de batalla de Cobblemon. Este es el recorrido del jugador después de la configuración en el editor.

![Habla con Meadow Trainer, elige Let's battle! y entra en la batalla Pokémon tras la introducción.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 + DRM 0.3.1 + DNPC 0.1.3 + Cobblemon 1.8.4 / NeoForge 1.21.1, interfaz en inglés. Diálogo de la ronda → go_battle → introducción → batalla.")

## Recompensa después del diálogo

En **Battle Config → After Actions**, elija **Action Mode → Sequential**. Ponga el diálogo primero y el artículo / recompensas de moneda después de él. Selecciona qué resultado activa la secuencia: ganar, perder o huir.

La ejecución secuencial espera a que termine el diálogo. La cancelación o desconexión detiene las recompensas posteriores; la interacción reanuda las acciones restantes. Cada ronda permite una acción de diálogo. Reduzca las configuraciones multidiálogo anteriores a una antes de guardar o aplicar.

**General Item Inventory** tiene requisitos de posesión como Mega llaves. Está separado de consumibles **Battle Item Inventory**. Copiar un artículo del inventario del jugador no lo consume.

## Crea un Pokémon Alpha
Este vídeo usa el **JAR publicado 0.2.9**. Selecciona un Pokémon en **Pokemon Party** y activa **Basic → Alpha**. **Aspects** también muestra Alpha y los ojos aparecen rojos en la vista previa. Es independiente de **Shiny** y requiere soporte Alpha nativo en el Cobblemon instalado.

![Activa Alpha en Basic, observa a Bulbasaur con ojos rojos y guarda el perfil.](assets/media/guides/cobble-release-20261109/pokemon-alpha.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, inglés. Alpha → vista previa → Save As. No muestra NPC Apply ni una batalla completada.")

Usa **Save As** y después [NPC Apply](#drm-cobblemon-editor/cobblemon-editor-setup) para el primer vínculo. Las pantallas en desarrollo pueden diferir; el botón del vídeo está en **Basic**.

Continúa con [medallas y trofeos](#drm-cobblemon-editor/cobblemon-badges) o [conversión RCT → DNPC](#drm-cobblemon-editor/cobblemon-rct-conversion).
