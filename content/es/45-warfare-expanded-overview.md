---
title: Mueva vehículos y asigne tripulaciones
slug: expanded-overview
order: 310
description: Configure el movimiento de vehículos DWE, armas, conductores y artilleros.
product: dochi-warfare-expanded
category: Cómo empezar
section: overview
status: Proyecto
version: 0.3.1
audience: Creadores y operadores de servidores
translationSource: en
translationMethod: assisted
---

## Qué instalar

DWE ** añade características del vehículo a DW**. Mueva los vehículos compatibles SuperbWarfare, use sus armas y asigne a los conductores / artilleros de NPC.

| Artículo | Requisito |
| --- | --- |
| Minecraft / cargador | Forge 1.20.1 o NeoForge 1.21.1 |
| DW y DWE | Ambos 0.3.1, instalados juntos en el servidor y los clientes |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2 |
| Tripulaciones de NPC | DNPC o CustomNPCs |
| DRM | Opcional |

Los requisitos de DW TACZ y Player Animator aún se aplican. Véase [DW setup](#dochi-warfare/warfare-setup).

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
