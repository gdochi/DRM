---
title: Mueva vehículos y asigne tripulaciones
slug: expanded-overview
order: 310
description: Configure el movimiento de vehículos DWE, armas, conductores y artilleros.
product: dochi-warfare-expanded
category: Cómo empezar
section: overview
status: Proyecto
version: 0.3.3
audience: Creadores y operadores de servidores
translationSource: en
translationMethod: assisted
---

## Qué instalar

DWE ** añade características del vehículo a DW**. Mueva los vehículos compatibles SuperbWarfare, use sus armas y asigne a los conductores / artilleros de NPC.

| Artículo | Requisito |
| --- | --- |
| Minecraft / cargador | Forge 1.20.1, NeoForge 1.21.1 o Fabric 1.21.1 |
| DW y DWE | DWE 0.3.3 y DW compatible en servidor y clientes; no es necesario que coincidan los números de versión |
| SuperbWarfare | Instala la versión del cargador correcto. Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2. Se ha ejecutado una combinación Fabric 0.8.9.2 |
| Tripulaciones de NPC | DNPC o CustomNPCs |
| DRM | Opcional |

Los requisitos de DW TACZ y Player Animator aún se aplican. Véase [DW setup](#dochi-warfare/warfare-setup).


Esta guía usa DWE **0.3.3**. DW sigue siendo obligatorio; DWE comprueba las API utilizadas al iniciar, sin exigir el mismo número de versión. Las versiones grabadas/probadas no establecen mínimos para todas las combinaciones.

**Abre el editor de tiempos:** sostén DW Npc Core y haz clic derecho al aire sin apuntar a bloques/entidades para abrir el selector independiente. Con DRM también aparece Gimmick Editor en su selección de editores. Sigue el [tutorial de la nueva interfaz](#dochi-warfare-expanded/expanded-support-timeline).

![Vista general del vehículo DWE abierto para un M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE/DW 0.3.1, SuperbWarfare 0.8.9.1, NeoForge 1.21.1. Usa AI, Targets, Weapons, Gimmicks y Crew a la izquierda; AI habilitado en la parte superior derecha controla la activación. Este ejemplo es OFF.")

## Montar el primer vehículo

1. Coloca un vehículo con soporte.
2. Haga clic derecho con **DW Npc Core**.
3. Habilite la IA del vehículo y elija el movimiento, la posición de inicio y el rango de operación.
4. Elige armas y objetivos.
5. Asignar asientos de conductor / artillero en **Crew**.
6. Guarda y comprueba el movimiento y el disparo.

Apague el vehículo antes de conducirlo usted mismo. Las armas disponibles dependen de lo que realmente tenga ese vehículo.

## Qué añadir a continuación

- Retirada, humo y desmontaje de combate: [ reacciones del vehículo](#dochi-warfare-expanded/expanded-vehicle-gimmicks)
- Bombardeo y refuerzos: [ líneas de tiempo de apoyo](#dochi-warfare-expanded/expanded-support-timeline)
- Movimiento, objetivos y munición: [vehículo AI](#dochi-warfare/warfare-vehicle-ai)
- Otros paquetes de vehículos: [vehículos compatibles](#dochi-warfare-expanded/expanded-compatibility)

## Reutilizar una configuración

**Save As** mantiene la configuración para **Load** en otro vehículo. A **clon** es para generar una nueva copia del vehículo en sí.

La configuración del vehículo está en `config/dochi_warfare/vehicle_ai/profiles/`; los plazos de soporte están en `config/dochi_warfare/vehicle_ai/gimmicks/`.

Reemplace el antiguo `dochi_warfare_vehicle` JAR en lugar de mantenerlo junto a DWE. Los perfiles más antiguos se importan manteniendo sus originales.

## Pedir apoyo con radio o tableta

En 0.3.3, jugadores normales pueden llamar una línea de tiempo creada por un administrador mediante una orden táctica. [Órdenes tácticas](#dochi-warfare-expanded/expanded-tactical-orders) distingue creación/entrega y apuntado del jugador.

Instala la **misma build DWE 0.3.3** en servidor y clientes: builds con el mismo número pueden tener mensajes de red diferentes. Mod Menu abre los ajustes de IA de vehículos DWE en Fabric. Las definiciones están en **config/dochi_warfare/vehicle_ai/tactical_orders/**.
