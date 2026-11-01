---
title: 0.2.9 Actualización
slug: release-notes-0-2-9
order: 4
description: Integración opcional de NPC, plantillas de clonación y correcciones actuales.
product: core
category: 0.2.9 Actualización
section: getting-started
status: Guía
version: 0.2.9
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

Esta página registra una versión **antigua**. Utilice [DRM 0.3.1 ](#core/release-notes-0-3-1) para la instalación y el uso actuales. Las ilustraciones de la versión actual a continuación están separadas del registro de lanzamiento histórico.


## 0.2.9 cambiar el registro

DRM **0.2.9** objetivos Forge 1.20.1 / Java 17 y Fabric / NeoForge 1.21.1 / Java 21. Separar Fabric / NeoForge 26.3 construye usar Java 25. Véase la guía [26.3](#core-fabric/minecraft-26-3) para las exclusiones y los límites de verificación.

CustomNPCs y DNPC son integraciones opcionales. Las herramientas básicas de creación no requieren ninguno de los mods NPC; las características específicas del proveedor necesitan su proveedor. CustomNPCs está permanentemente excluida de 26.3 en adelante. Ese objetivo utiliza la API opcional DNPC actor/proveedor.

## Cambios que puedes usar

- **DNPC clone templates:** Core expone una API de proveedor de plantillas públicas. Guarde una plantilla de clon de NPC v3 en DNPC y, a continuación, elija en Spawn Control. Véase [crear plantillas](#dochi-npc-core/npc-core-templates).
- **Models without CustomNPCs:** los tres objetivos más antiguos corrigen la carga de clases CustomNPCs cuando DNPC o entidades genéricas tienen perfiles de animación/modelo activos. Si ya usa 0.2.9, reemplácelo con una compilación que contenga esta corrección y reinicie Minecraft.
- **Creative tools:** en 1.20.1 / 1.21.1, DRM registra sus propias herramientas públicas en las pestañas de los proveedores NPC instalados, sin duplicarlas cuando se instalan ambos proveedores.
- **Trainer history deletion:** compatible Cobblemon Editor se basa en Fabric / NeoForge 1.21.1 exponer la eliminación de registro de batalla completa en Admin. Esto difiere de un reinicio de conteo y elimina las recompensas pendientes y los marcadores de recompensa. Lea la guía [Admin ](#core-fabric/drm-administration).

Los núcleos más antiguos sin la capacidad de plantilla conservan sus otras características. Los mods de ecosistema no necesitan números de versión coincidentes.

## De un NPC a una plantilla reutilizable

Guarde la apariencia y el equipo del NPC y, a continuación, seleccione ese NPC en Spawn Control. Esta pantalla muestra la integración utilizada en las versiones actuales; no es una pantalla histórica 0.2.9.

![Selección de una plantilla guardada DNPC en Spawn Control.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1. DNPC guardado guide_guard aparece como dochi_npc:actor/guide_guard. Guardar la definición de aparición y aplicarla a un aparición colocado antes de esperar un aparición.")

## Actualizar

1. Haga una copia de seguridad de la configuración del servidor y el mundo juntos.
2. Instalar matching Minecraft/loader se basa en el servidor y cada cliente, reemplazando el archivo antiguo.
3. Compruebe los requisitos básicos declarados de cada complemento.
4. Abra los archivos de diálogo, de compra y de búsqueda existentes; compruebe el guardado y NPC Apply por separado. Personalice las plantillas predeterminadas con `Save As`.

Algunas correcciones conservan el mismo número de versión. Un nombre de archivo por sí solo no establece que una corrección está presente. Las versiones aquí identifican ** las compilaciones de producción local verificadas en 2026-10-28**, no la disponibilidad de carga pública. Notas históricas [0.2.8 ](#core/release-notes-0-2-8) permanecen disponibles.
