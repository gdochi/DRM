---
title: Conversaciones, tiendas y archivos guardados
slug: npc-core-files
order: 1520
description: Agregue las características de otros mods a DNPC y encuentre su trabajo guardado.
product: dochi-npc-core
category: Archivos NPC e integraciones
section: operations
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Añadir conversaciones o tiendas

Instale **DRM**, haga clic con el botón derecho del ratón en DNPC con el núcleo DRM y, a continuación, elija un archivo guardado en **NPC Apply**.

![NPC Apply después de aplicar village_guide, con su Diálogo vinculante que se muestra en APLICADO JSON a la derecha.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "Ejemplo de DRM 0.3.1  +  DNPC 0.1.2 / NeoForge 1.21.1. Elija una función a la izquierda, un archivo en el medio y Aplicar a continuación; compruebe el enlace resultante a la derecha.")

Para el diálogo, use **Dialogue JSON → select file → Apply Dialogue**. Para una tienda, use **NPC Shop JSON → select file → Apply Shop**. Guardar un archivo de editor y conectarlo a este NPC son pasos separados. Guarda el Núcleo e interactúa con el NPC después.

Comience con [Forge diálogo](#core/quick-start) o [Fabric/NeoForge diálogo](#core-fabric/quick-start).

## Elige un mod para tu objetivo

| Objetivo | Mod adicional |
| --- | --- |
| Conversaciones, tiendas y empleo de jugadores | DRM |
| Pokémon entrenadores, tiendas, sanadores y arrancadores | Cobblemon Editor y sus requisitos |
| Spawn salvó a los NPC en las condiciones elegidas | Spawn Control y DRM |
| Patrones cuerpo a cuerpo y batallas contra jefes | BattleWorks y DRM |
| PNJ de armas de fuego y tripulaciones de vehículos | DW / DWE y sus requisitos |
| Armadura que reduce el daño entrante | Real Armor |
| Actuaciones de instrumentos | Melodías inmersivas |

Objetivo DW/DWE Forge 1.20.1 y NeoForge 1.21.1. CustomNPCs no está disponible en 26.3. Utilice la guía de configuración de cada mod para elegir archivos coincidentes.

## Encontrar trabajo guardado

| Contenido | Ubicación |
| --- | --- |
| Plantillas NPC | `config/dochi_npc_core/templates/` |
| Poses | `config/dochi_npc_core/poses/` |
| Piel de servidor PNGs | `config/dochi_npc_core/assets/textures/` |
| Ajustes globales | `config/dochi_npc_core/global.json` |
| Configuración del cliente | `config/dochi_npc_core/client-settings.json` |
| DRM Perspectivas de empleo | `config/dochi_rpg_maker/dochi_npc/employment/` |

Los NPC y los contratos colocados también se guardan en el mundo. Incluya el mundo al mover un servidor.

## Convertir otro NPC a DNPC

En 1.20.1 / 1.21.1, abra **Global settings → Experimental features → World scan** y seleccione un NPC. Lea qué partes se pueden convertir antes de continuar.

Solo el contenido compatible, como la apariencia, el equipo y las relaciones, las transferencias. Mantenga una copia del mundo antes de la conversión. CustomNPCs La conversión no está disponible en 26.3.
