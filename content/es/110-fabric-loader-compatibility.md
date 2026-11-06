---
title: Configuración del cargador y migración de datos
slug: loader-compatibility
order: 45
description: Alcance de los documentos Forge y compartidos Fabric/NeoForge, instalación y traslado de datos existentes.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.3.1
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
---

## Alcance de la documentación

**Fabric y NeoForge 1.21.1 comparten esta documentación.** Dialogue, NPC Shop, GUI Maker, currency, HUD, quests, Scene Maker y Core NPC Spawner usan el mismo flujo de trabajo de creación normal. Elija archivos para la misma versión Minecraft y cargador. Sigue las notas del cargador de cada guía para ver las diferencias, como los botones de aplicación, la finalización de la misión y la activación del HUD.

Forge 1.20.1 tiene una entrada de documentación separada. La ruta existente `core-fabric` permanece para la compatibilidad de enlaces y también sirve para lectores NeoForge.

## Requisitos de instalación

| Cargador | Minecraft | DRM | Java | Integración NPC opcional |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.3.1 | 17 | DNPC o compatible CustomNPCs |
| Fabric | 1.21.1 | 0.3.1 | 21 | DNPC o compatible CustomNPCs |
| NeoForge 21.1+ | 1.21.1 | 0.3.1 | 21 | DNPC o compatible CustomNPCs |

Fabric también requiere Loader 0.18.0+ y Fabric API 0.116.11+1.21.1+. Véase [Instalación](#core-fabric/installation) para archivos e integraciones opcionales.

## Datos de autoría en movimiento

Los documentos de autoría usan `config/dochi_rpg_maker`. Los archivos del servidor proporcionan la configuración compartida. El mundo también almacena conexiones NPC y el progreso del jugador.

1. Respaldar la configuración y el mundo juntos.
2. Prepare una instancia separada con las dependencias DRM y del cargador de destino.
3. Carga copias de tus documentos personalizados.
4. Compruebe que existen elementos, entidades, modelos y animaciones referenciados en ese cargador.
5. Pon a prueba el diálogo, la compra/venta/restauración, las recompensas de las misiones y vuelve a conectar la persistencia.

La guía de autoría compartida no convierte automáticamente los ID Minecraft/mod ni los datos del mundo CustomNPCs. `dochi_rpg_maker:npc_spawner` del núcleo y los documentos del generador del complemento Spawn Control separados utilizan cada uno sus propias rutas de datos.

## Compruebe la conversación migrada en su NPC

Después de mover los archivos, abra el NPC con DRM Core y use **Dialogue JSON → your set → Apply Dialogue**. Vacía ambas manos, habla con el NPC real y revisa el texto, las opciones y las recompensas.

![Aplicar un conjunto de diálogos movido a un NPC.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide fue seleccionado y aplicado; Aplicado JSON a la derecha muestra la conexión. Encontrar un archivo y conectarlo a un NPC son comprobaciones separadas.")

## Controles de búsqueda directa

Disponible en Fabric y NeoForge con nivel de permiso 2.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start` evita las puertas de disponibilidad normal. `complete` fuerza la finalización y otorga recompensas no reclamadas. Whole-quest `reset` borra los registros de progreso y recompensa; no recupera los artículos o la moneda otorgados. Restablecer un objetivo conserva el progreso de los hermanos y el historial de recompensas.

Las misiones creadas en el editor actual utilizan la finalización automática en ambos cargadores. Al migrar JSON antiguo con `completionMode: turn_in`, Fabric conserva el encendido manual mientras NeoForge se completa automáticamente. Compruebe el tiempo de recompensa al importar esos datos heredados.

Cambios actuales: [DRM 0.3.1 ](#core-fabric/changelog-0-3-0).

Minecraft 26.3 utiliza versiones separadas de Java 25. Véase [26.3 configuración y exclusiones](#core-fabric/minecraft-26-3).
