---
title: 26.3 Configuración y diferencias de características
slug: minecraft-26-3
order: 6
description: Elija 26.3 archivos y NPC, y compruebe qué características del editor difieren.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: Guía
version: 0.3.1 / Minecraft 26.3
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Instalar 26.3 archivos

Usar **Fabric or NeoForge / Java 25**. Instalar los archivos 26.3 de cada mod en el servidor y los clientes. Fabric también necesita la API Fabric requerida por esos mods.

Crear NPCs con **DNPC**. **CustomNPCs no está disponible en 26.3.** DRM y DNPC también se puede ejecutar de forma independiente.

![DNPC editor nativo en Minecraft 26.3.](assets/media/guides/dnpc-013-neo263/core263-dnpc-identity.png "DNPC 0.1.3 + DRM 0.3.1 / NeoForge 26.3.0.95 / Java 25.0.2. Este es un DNPC real en un mundo fresco. Identity edita el nombre; Appearance & Model edita la apariencia. DRM funciones conecta DRM características.")

## Elija las características que desee

| Característica | Mods |
| --- | --- |
| Creación de NPC, apariencia y horarios | DNPC |
| Diálogo, tiendas, misiones y diseños de pantalla | DRM |
| Patrones de NPC y combate contra jefes | DRM + BattleWorks + DNPC |
| Reglas ordinarias de aparición de criaturas | Spawn Control |
| Crear un NPC guardado de un bloque | Spawn Control + DRM + DNPC |
| Efectos de armadura NPC | Real Armor y un mod NPC compatible |
| Minijuegos/MWENT tablas | Minijuegos |
| Iconos de mapa NPC | DRM + MapIcon + un mapa soportado |

Cobblemon El editor y DW/DWE no se incluyen como 26.3 Mods aquí. Utiliza sus guías más antiguas 1.21.1/1.20.1.

## Diferencias con versiones anteriores

26.3 DRM no tiene **Faction Editor, pantalla de facción de jugador o GUI Maker elementos de facción**. Fabric también excluye **Item Editor and Stat Builder**.

Siga la creación de [NPC](#dochi-npc-core/npc-core-setup) y [DRM para comenzar](#core-fabric/quick-start) para NPC con conversaciones o tiendas.

![Agregar un cuadro de texto independiente en el 26.3 GUI Maker.](assets/media/guides/drm-031-neo263/core263-independent-text.png "DRM 0.3.1 / NeoForge 26.3.0.95. + Texto agrega un cuadro separado del cuerpo del diálogo. El contenido elige texto directo o nombre de NPC. Save As almacena su GUI. Esto verifica la pantalla de edición, no un resultado de diálogo aplicado.")

![Editor de artículos en NeoForge 26.3.](assets/media/guides/drm-031-neo263/core263-item-editor.png "DRM 0.3.1 / NeoForge 26.3.0.95. Item Definition, Tooltip Lines, Stat Rules y Vanilla Attribute están editando pestañas. Fabric 26.3 no incluye el editor de elementos. Plantilla de elemento: no seleccionada significa que este ejemplo no tiene ninguna apariencia de elemento seleccionada todavía.")

Utilice [colocado plantillas NPC ](#dochi-spawn-control/spawn-control-npc-templates) en Spawn Control. Los clones antiguos CustomNPCs no se convierten directamente en desoves DNPC.

Después de cambiar las definiciones comerciales nativas del aldeano MWENT, vuelva a conectarse al mundo o reinicie el servidor.

## Trayendo un viejo mundo

Prueba los NPC, las conversaciones, las tiendas y otras características que usas en una copia antes de reemplazar el mundo original. Mantener su configuración y el mundo juntos.
