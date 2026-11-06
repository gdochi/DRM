---
title: 0.2.8 Actualización
slug: release-notes-0-2-8
order: 5
description: 0.2.8 Actualización
product: core-fabric
category: 0.2.8 Actualización
section: getting-started
status: Guía
version: 0.2.8
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

Esta página registra una versión **antigua**. Utilice [DRM 0.3.1 ](#core-fabric/release-notes-0-3-1) para la instalación y el uso actuales. Las ilustraciones de la versión actual a continuación están separadas del registro de lanzamiento histórico.


## Lea las listas de opciones y acciones

Seleccione la fila azul de Opciones para editar esa opción a la derecha. Una casilla de verificación está separada de la selección de edición. Este ejemplo real separa el registro de concesión y reclamación de ítem en dos acciones. Continuar con el [guía actual](#core-fabric/dialogue-system) para guardarlo y aplicarlo.

![Lea las listas de opciones y acciones.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Instalación

DRM **0.2.8** objetivos Forge 1.20.1 / Java 17 y Fabric / NeoForge 1.21.1 / Java 21. Coincidir con el cargador y construir en el servidor y cada cliente. Filtrar [archivos moderados](https://modrinth.com/mod/drm/versions) tanto por la versión Minecraft como por el cargador.

**CustomNPCs es opcional.** Instalarlo para flujos de trabajo que adjuntan diálogos, tiendas o modelos a CustomNPCs NPCs. DNPC es un proveedor de NPC opcional independiente; el soporte para un proveedor no implica que todas las funciones adicionales lo admitan.

## Edición y ahorro

- Las listas compatibles ahora ofrecen controles de fila independientes, Seleccionar todo, eliminación masiva y copiar / pegar. La fila de detalles activos y los objetivos de eliminación comprobados están separados.
- Los nodos de diálogo, opciones, condiciones y acciones tienen secciones más claras y desplazamiento. Forge Se corrigieron los bloqueos de entrada multilínea y de arrastre de nodos.
- NPC Apply soporta múltiples filtros de categoría. Coincidir con cualquier categoría seleccionada incluye un archivo; Todo borra el filtro. La selección se guarda localmente.
- Los botones Atrás/Adelante compartidos navegan por el historial de la pantalla. Guardar o Save As sigue confirmando el documento.

## Misiones y administración

Las acciones de la misión exponen los campos para su objeto real, etiqueta, puntuación, avance, animación u operación JSON. El selector de nueva acción solo para misiones excluye `go_stat_builder`, `cobble_npc:go_battle` y `dochi_minigames:play`. Las acciones guardadas existentes y el registro de acciones de diálogo global siguen siendo compatibles.

Las acciones de puntuación de facción pueden dirigirse a CustomNPCs facciones o **DNPC relations**. DNPC Las relaciones son la reputación del jugador hacia un grupo de relaciones, con operaciones de sumar, restar y establecer. Instalar el actual DRM y un DNPC construir con la relación API juntos. Un proveedor no disponible DNPC nunca vuelve a cambiar las puntuaciones CustomNPCs.

F7 Admin puede inspeccionar el progreso del entrenador y restablecer las cuentas de victoria en Fabric / NeoForge con un Cobblemon Editor compatible. Las operaciones por lotes ahora muestran progreso.

## Resto de mensajes y rendimiento

Los marcadores ocultos y los desencadenadores persistentes de una vez por jugador están disponibles. Se mejoraron la búsqueda, la vista previa de NPC y el almacenamiento en caché de la lista de administración y la preparación de la GUI. Las condiciones del lado del servidor, las recompensas y las verificaciones de permisos aún rigen las operaciones reales.

## Actualización

1. Retroceder `config/dochi_rpg_maker` y el mundo juntos.
2. Instalar 0.2.8 se basa en el servidor y los clientes.
3. Actualización Cobblemon Editor con su núcleo: la versión 0.2.6 requiere DRM 0.2.8 o posterior.
4. Reabrir diálogos personalizados, tiendas, misiones y contenido Remanente y comprobar interacciones reales. Personalice las plantillas agrupadas a través de Save As.

Minecraft 26.3 Los puertos son un flujo de trabajo separado. Esta página describe las versiones 1.20.1 y 1.21.1.
