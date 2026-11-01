---
title: Configurar la armadura NPC
slug: dochi-real-armor-setup
order: 910
description: Abre los ajustes y elige las integraciones NPC, la armadura de la parte del cuerpo y la durabilidad.
product: dochi-real-armor
category: Instalar y configurar
section: setup
status: Estable
version: 0.1.4
audience: Jugadores y operadores de servidores
tags:
  - installation
  - configuration
  - forge
translationSource: en
translationMethod: assisted
---

## Instalar

Ponga los archivos coincidentes Minecraft/loader Real Armor 0.1.4 en el servidor y los clientes.

| Minecraft | Cargador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Fabric también necesita Fabric API. Utilice DNPC, Easy NPC o CustomNPCs en objetivos antiguos. DRM es opcional.

## Abrir ajustes

- **Forge / NeoForge:** elige Real Armor's **Config** en la lista de modificaciones.
- **Fabric:** abrir su **Config** en el menú Mod.
- **With DRM:** uso **Mods Config → Real Armor**.

Cambiar la configuración multijugador necesita nivel de permiso 2.

Estos son los ajustes independientes de **Real Armor 0.1.4 / NeoForge 1.21.1**. Usa **General Armor** para el comportamiento de la armadura y **NPC Compatibility** para la integración de tu NPC.

![Armadura general con cálculo, armadura de parte del cuerpo, durabilidad, dureza, protección e interruptores de resistencia al retroceso.](assets/media/guides/armor-014-neo1211/armor-config.png "Habilitar cálculo de armadura controla toda la función. La armadura de la parte del cuerpo selecciona el equipo por la región golpeada; Los elementos de armadura de daño permiten la pérdida de durabilidad.")

![Compatibilidad NPC con Dochi NPC Core, Easy NPC, CustomNPCs y configuración de depuración.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Compruebe Dochi NPC Core cuando se utiliza DNPC. Esta captura es 1.21.1; CustomNPCs no está disponible en 26.3.")

La configuración compartida de DRM muestra las mismas opciones en dos columnas.

![Dochi Real Armor seleccionado en los ajustes compartidos de DRM, con reglas de armadura a la izquierda e integraciones a la derecha.](assets/media/guides/armor-014-neo1211/shared-armor.png "Seleccione Dochi Real Armor en Mods Config. Compruebe el interruptor de cálculo principal, así como la integración de NPC.")

## Elige lo básico

1. Habilite la integración de NPC que utiliza.
2. Comienza con una armadura de cuerpo entero y equipa al PNJ.
3. Activar **armadura de cuerpo-parte** utilizar equipos que cubran la región afectada.
4. Permita que ** la pérdida de durabilidad** desgaste la armadura hacia abajo cuando se golpea.
5. Aplicar ajustes.

DNPC Las regiones golpeadas siguen sus límites corporales básicos, que pueden diferir de la apariencia de un modelo personalizado.

## Compruebe si está habilitado

Usar `/dochi_real_armor status`. Los comandos también autocompletan `split`, `durability` y `debug`.

Para la gestión directa de archivos, Forge/NeoForge use `config/dochi_real_armor-common.toml`; Fabric uses `config/dochi_real_armor.json`.
