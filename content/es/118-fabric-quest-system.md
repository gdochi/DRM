---
title: Quest Editor El Diario
slug: quest-system
order: 100
description: Paquetes de misiones, objetivos, recompensas, enlaces de diálogo NPC y el diario del jugador.
product: core-fabric
category: Sistema de misiones
section: quest-editor
status: Estable
version: 0.3.1
audience: Creadores de misiones
tags:
  - quest
  - journal
translationSource: en
translationMethod: assisted
---

## Nombra tu primera misión y elige cómo aceptarla

Abra **Quest Editor → Create New** desde el selector del editor del núcleo. Usa **+ Categoría**, luego **+ Misión** para agregar una misión a ese capítulo. Estas son las pantallas inglesas de **DRM 0.3.1 / NeoForge 1.21.1**.

![Quest Editor con Nueva Búsqueda seleccionada dentro de Nuevo Capítulo. La información contiene su título, descripción y configuración de aceptación.](assets/media/guides/drm-031-neo1211/quest-info.png "El árbol de la izquierda selecciona una misión. Trabaja a través de la información, los objetivos y las recompensas a la derecha.")

1. Dar **Quest ID** un nombre que se puede encontrar más adelante en el diálogo. **Title** es el nombre de cara al jugador; **Description** explica la tarea.
2. Con **Start Policy → Manual Accept**, verifique **Accept Sources**. Habilite **NPC Interaction / Dialogue** para una oferta de NPC o **Player Quest Journal** para el botón Aceptar de la revista. Solo la fuente NPC está habilitada en este ejemplo.
3. Añada la tarea bajo **Objectives**. Para "traer tres panes", elija si el jugador solo necesita poseerlos o si realmente debe entregarlos.
4. Establecer **Rewards**, a continuación, guardar el paquete con **Save As**. Las misiones actuales escritas por el editor se completan automáticamente cuando se cumplen sus objetivos; un título por sí solo no hace una misión terminada.

Continúe con los enlaces de diálogo de NPC a continuación para permitir que un NPC ofrezca la misión. Compruebe el ID de la misión seleccionada del diálogo, el título de la revista y la recompensa recibida después de completar el objetivo.

## Almacenamiento

Los paquetes de misiones se almacenan en `config/dochi_rpg_maker/quests/<pack>/`. `pack.json` posee el paquete y el orden de categorías, mientras que `quests/` contiene las misiones individuales.

El paquete de muestra incluido comienza desactivado. Utilícelo como referencia y cree un paquete de producción separado.

## Lo que una búsqueda puede hacer

| Zona | Opciones principales |
| --- | --- |
| Inicio | Aceptación manual, inicio automático cuando esté disponible o inicio en el primer progreso |
| Finalización | Las misiones creadas por el editor actual se completan automáticamente después de los objetivos |
| Repetir | Nunca, siempre, todos los días o después de un enfriamiento |
| Prerrequisitos | Todas las misiones requeridas, cualquier misión o una cuenta requerida |
| Objetivos | Ubicación, posesión/adquisición/entrega de artículos, muertes, señales de diálogo, puntaje de facción |
| Premios | Elementos, experiencia, moneda DRM o comandos del servidor |

Crea el paquete y las categorías primero, luego agrega misiones en Quest Editor. Después de guardar, el servidor mantiene el progreso de cada jugador.

## Vínculos de diálogo NPC

El selector de acción actual ofrece `quest_start`, `quest_complete`, `quest_reset`, `quest_objective_complete` y `quest_objective_reset`, con selectores de búsqueda/objetivo respaldados por el servidor. Las acciones heredadas de encender, señalizar, fallar, abandonar y anclar siguen siendo legibles en JSON existente.

Los editores actuales Fabric y NeoForge crean misiones automáticas. Distinguir la finalización a través de los objetivos de la forzada del administrador `quest_complete`. Vea [ migración de datos ](#core-fabric/loader-compatibility) para JSON más antiguo.

## Diario del jugador

La clave por defecto es `U`. Los jugadores pueden buscar misiones, filtrar por estado o categoría, inspeccionar objetivos y recompensas, y aceptar, abandonar, rastrear o entregar misiones.

Personaliza el diario a través del tipo GUI Maker `quest_journal`. Trata `gui/default_quest_journal_gui.json` como una plantilla y crea una copia con `Save As`.

## Controles directos y victorias de los entrenadores

Consulte la guía de comandos de [loader](#core-fabric/loader-compatibility) para las operaciones de inicio, finalización y reinicio de misiones/objetivos. Los reinicios completos no reclaman recompensas; los reinicios objetivos retienen el historial de recompensas.

Con Cobblemon Editor instalado, agregue un `DRM Trainer Victory` objetivo, seleccione su identidad de entrenador y establezca el número requerido de victorias. Siga [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Arrastre los divisores entre el árbol/área de trabajo y los paneles de información/descripción para cambiar su tamaño. Los títulos largos envuelven y las listas se desplazan. Los anchos pertenecen a la instancia actual del editor, no a la misión guardada JSON.

## Copiar un paquete con Save As

Introduzca un nuevo ID de paquete y guarde. Cada misión necesita objetivos; los ID de paquete no válidos o ya usados deben corregirse. Verifique las referencias `pack:quest` dentro de la copia y las referencias a otros paquetes, luego cargue la copia guardada y pruebe la aceptación, finalización y recompensas. Cambiar el nombre de visualización es independiente de cambiar el ID del paquete.

## 0.2.8 acciones y puntuaciones de relación

Las acciones de ítem, etiqueta, puntuación de facción y avance exponen campos específicos de la operación. Los selectores de JSON registrados seleccionan archivos de servidor del tipo correcto; los selectores de misiones compatibles incluyen otros paquetes y misiones no guardadas actuales.

Las acciones de puntuación seleccionan CustomNPCs facciones o DNPC grupos de relaciones. DNPC La reputación admite sumar, restar y establecer. Utilice DRM actual y un DNPC build con la API de relación juntos; un DNPC proveedor ausente no vuelve a CustomNPCs.

El selector de nueva acción solo para misiones excluye `go_stat_builder`, `cobble_npc:go_battle` y `dochi_minigames:play`. Las acciones guardadas existentes y los registros de diálogo siguen siendo compatibles.
