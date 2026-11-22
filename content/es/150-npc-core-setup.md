---
title: Crea tu primer NPC
slug: npc-core-setup
order: 1500
description: Instale DNPC, coloque un NPC y elija su nombre, piel y equipo.
product: dochi-npc-core
category: Configuración de NPC Core
section: setup
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Descargar e instalar

[Descarga el NPC Core de Dochi en CurseForge](https://www.curseforge.com/minecraft/mc-mods/dochi-s-npc-core)

Elija su versión Minecraft y cargador. En el modo multijugador, instala archivos coincidentes en el servidor y en cada cliente. Fabric también necesita Fabric API.

| Minecraft | Cargador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

DNPC solo te permite crear, personalizar y asignar trabajos a NPCs. Agregue DRM cuando desee conversaciones o tiendas.

## Coloca tu primer PNJ

1. Obtener el núcleo de la ficha Creativo **NPC Core**, o utilizar `/dnpc core`.
2. Haz clic con el botón derecho del ratón en el suelo para colocar un NPC.
3. Haga clic derecho en ese NPC con el núcleo para editarlo.
4. Introduzca un nombre, elija una piel y equipo y, a continuación, guarde.
5. Guarda el Núcleo y mira a tu NPC.

![Identity en el editor DNPC 0.1.3, con categorías a la izquierda, la vista previa en el medio y Name y Title a la derecha.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "Inglés UI on NeoForge 1.21.1. Name su NPC bajo Identity → Name. Uso Appearance & Model para pieles y Inventory & Equipment para armadura.")

Utilice el control en forma de disco **Save to NPC** después de editar. Para mantener el NPC para su reutilización posterior, también [ guarde una plantilla con Save As](#dochi-npc-core/npc-core-templates).

## Controles básicos

| Entrada | Resultado |
| --- | --- |
| Tierra de clic derecho | Colocar un NPC |
| Haga clic con el botón derecho en un NPC | Editarlo |
| Haga clic derecho en Air | Abra la configuración global y el poser |
| Clic izquierdo | Controles de utilidad NPC abiertos |
| Mantenga el Núcleo en su mano principal; Ctrl+C / Ctrl+V | Copiar / pegar un NPC |
| Sostenga el Núcleo en su mano principal; Ctrl+X | Eliminar el NPC objetivo |

Para el uso repetido, [guardar una plantilla](#dochi-npc-core/npc-core-templates).

## Qué probar a continuación

- [Aparición, equipamiento y puestos de trabajo](#dochi-npc-core/npc-core-editor)
- [Horarios de trabajo y descanso](#dochi-npc-core/npc-core-schedules)
- [Cocina y entrega de alimentos](#dochi-npc-core/npc-core-cooking)
- [DRM Conversaciones, tiendas y otros mods](#dochi-npc-core/npc-core-files)
