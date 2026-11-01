---
title: Guardar y reutilizar un NPC
slug: npc-core-templates
order: 1530
description: Conservar un NPC terminado como plantilla, clonarlo o cargarlo en un NPC existente.
product: dochi-npc-core
category: Plantillas de clon NPC
section: operations
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Guardar un NPC terminado

1. Abre el NPC y termina su apariencia, equipo y comportamiento.
2. Presione **Save to NPC**.
3. Presione **Save As**, ingrese un **Name** distinto como `guide_guard`, luego presione **Save**.

![El diálogo del editor DNPC Save As con la plantilla Name, Guardar y Cancelar.](assets/media/guides/dnpc-012-neo1211/dnpc-templates-save.png "DNPC 0.1.2 / NeoForge 1.21.1. Save to NPC actualiza el NPC mundial; Save As mantiene una plantilla reutilizable.")

Los archivos se guardan en `config/dochi_npc_core/templates/`. Usa Ctrl+C/Ctrl+V para una copia rápida; usa una plantilla para mantener un NPC para más adelante.

![El NPC equipado con casco después de guardar su plantilla, con la respuesta guardada.](assets/media/guides/dnpc-013-neo1211/dnpc-template-saved.png "DNPC 0.1.3 / NeoForge 1.21.1. Este PNJ se guardó como guide_guard, seleccionado en Spawn Control y engendró con su casco de hierro conservado.")

## ¿Qué se reutiliza?

Las plantillas reutilizan la apariencia, el equipo, el inventario, el comportamiento y la configuración de diálogos / tiendas vinculados. Los nuevos NPC comienzan de nuevo en lugar de heredar una entrega activa, un viaje o una batalla.

La carga de una plantilla en un NPC existente mantiene la ubicación de ese NPC y la carga activa. Elija la operación prevista: crear un nuevo NPC o aplicar ajustes a uno existente.

## Esparcir guardias en varios lugares

Elige tu NPC guardado de **NPC clone template** en [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates). Utilícelo para un puesto de guardia fijo o apariciones programadas / basadas en la ubicación. Esta conexión también necesita DRM.

Guardar DNPC plantillas por sí mismo no requiere DRM.

![Los NPC originales y equipados con casco junto al reproductor.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Los nuevos PNJ conservan el casco de hierro guardado. El límite de propiedad predeterminado es 6, por lo que las activaciones posteriores pueden agregar más NPC.")

## Falta un archivo antiguo en la lista

Cargue una plantilla solo para configuración o v2 en un NPC y, a continuación, utilice **Save to NPC → Save As**. Utilice un nombre nuevo para conservar el archivo antiguo.

Si las plantillas editadas siguen mostrando equipos antiguos, vuelva a cargar y vuelva a aplicar la plantilla en Spawn Control.
