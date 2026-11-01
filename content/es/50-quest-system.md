---
title: Quest Editor El Diario
slug: quest-system
order: 100
description: Paquetes de misiones, objetivos, recompensas, finalización, después de completar las acciones y el diario del jugador.
product: core
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

## Haz la primera misión NPC

Abrir **Quest Editor → Create New** de la lista de editores del núcleo. Usa **+ Categoría** para un capítulo, luego **+ Misión** para una misión dentro de él. Estas son **DRM 0.3.1 / Forge 1.20.1** capturas de pantalla.

![Forge Quest Editor Página de información con identidad de misión, fuentes de aceptación y modo de finalización.](assets/media/guides/drm-031-forge1201/quest-info.png "Title se muestra a los jugadores. NPC Interacción / Diálogo está activado; Player Quest Journal está desactivado. Este ejemplo Forge usa el Modo de finalización: Devolver.")

1. Llene **Info → Quest ID / Title / Description** con su nombre de referencia, título del jugador y tarea.
2. Con **Start Policy → Manual Accept**, habilite la fuente de aceptación: **NPC Interaction / Dialogue** para el diálogo, o **Player Quest Journal** para su botón Aceptar.
3. Agregue un objetivo con **Objectives → + Add** y elija el tipo y el número requerido. Un nuevo objetivo puede ser inicialmente **Dialogue Signal**, como se muestra a continuación; verifique el tipo.
4. Añade recompensas con **Rewards → + Add**.
5. Para **Completion Mode → Turn in**, proporcione un paso de presentación después de alcanzar los objetivos. **Automatic** se completa después de que se cumplan los objetivos. Esto difiere de la guía NeoForge.
6. **Save As** el paquete y conectar **quest_start** en el diálogo NPC. Para Turn in, conecte **quest_turn_in** en el diálogo de finalización también.

![Un nuevo objetivo Dialogue Signal con los campos Signal y Required.](assets/media/guides/drm-031-forge1201/quest-objective-detail.png "Este objetivo no cuenta los ítems retenidos. Progresa cuando recibe la señal de coincidencia; empareja la señal con la acción de diálogo quest_signal.")

Abra el diario con **U** para probar la aceptación, el progreso, la finalización y la entrega real de la recompensa. El paquete de muestra incluido está deshabilitado; habilite y guarde su propio paquete.

Los paquetes se guardan en `config/dochi_rpg_maker/quests/<pack>/`. Copie toda la carpeta del paquete, incluyendo `pack.json` y `quests/`, al moverla.

## Estructura de misiones

| Zona | Valores soportados |
| --- | --- |
| Política de inicio | `manual_accept`, `auto_when_available`, `first_progress`; compatibles con legado `dialogue` y `journal_accept` también son aceptados |
| Aceptar fuente | PNJ/diálogo a través de `quest_start`, botón de aceptación del diario del jugador |
| Finalización | `turn_in`, `automatic` |
| Repetir | `never`, `always`, `daily`, `cooldown` |
| Prerrequisitos | `all`, `any`, `required_count` |
| Grupos objetivos | `all`, `any`, `sequence`, `required_count` |

El objetivo deja la ubicación de apoyo, el elemento, la muerte, la señal de diálogo y la puntuación de la facción CustomNPCs. Los objetivos del artículo pueden representar posesión, adquisición o entrega. Recompensas artículos de soporte, puntos/niveles de XP, moneda DRM y comandos.

## Integración del diálogo

Las acciones de diálogo proporcionan `quest_start`, `quest_turn_in`, `quest_signal`, `quest_fail`, `quest_abandon` y `quest_pin`. Usa estos cuando un NPC controle el flujo de misiones. Una búsqueda aceptada por Journal debe tener habilitada su fuente de aceptación de Journal.

## Después de completar

La página Acciones expone solo `After Complete`. El servidor sigue este orden:

1. Confirme que la misión está lista y los artículos de entrega se pueden consumir.
2. Concede cada recompensa pendiente.
3. Establece el estado de la misión en `Completed` y marca la acción de finalización como ejecutada.
4. Despache las acciones configuradas `After Complete` una vez.

Si falla una recompensa, la búsqueda permanece lista para el turno de entrada y `After Complete` no se ejecuta. Restablecer el progreso de la misión no reclama recompensas ya concedidas.

## Diario del jugador

La clave por defecto es `U`. La revista admite filtros de categoría/estado, búsqueda, detalles, listas de objetivos/recompensas, seguimiento, aceptación, abandono, actualización y componentes cercanos. Editar `gui/default_quest_journal_gui.json` a través de GUI Maker y guardar una variante de producción con `Save As`.

## 0.2.8 acciones y puntuaciones de relación

Las acciones de ítem, etiqueta, puntuación de facción y avance exponen campos específicos de la operación. Los selectores de JSON registrados seleccionan archivos de servidor del tipo correcto; los selectores de misiones compatibles incluyen otros paquetes y misiones no guardadas actuales.

Las acciones de puntuación seleccionan CustomNPCs facciones o DNPC grupos de relaciones. DNPC La reputación admite sumar, restar y establecer. Utilice DRM actual y un DNPC build con la API de relación juntos; un DNPC proveedor ausente no vuelve a CustomNPCs.

El selector de nueva acción solo para misiones excluye `go_stat_builder`, `cobble_npc:go_battle` y `dochi_minigames:play`. Las acciones guardadas existentes y los registros de diálogo siguen siendo compatibles.
