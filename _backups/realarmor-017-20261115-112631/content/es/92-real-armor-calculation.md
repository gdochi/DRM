---
title: Cálculo de Armadura y Hit-Region
slug: dochi-real-armor-calculation
order: 920
description: Fuentes de armadura, umbrales de región de golpe, orden de resistencia, encantamientos, retroceso y durabilidad.
product: dochi-real-armor
category: Cálculo de armadura
section: calculation
status: Estable
version: 0.1.6
audience: Operadores de servidores y creadores de modpack
tags:
  - damage
  - body parts
  - toughness
translationSource: en
translationMethod: assisted
---

## Elija qué efectos de armadura se aplican

![Armadura general en Real Armor 0.1.4 en NeoForge 1.21.1, con interruptores separados de dureza, protección y resistencia al retroceso.](assets/media/guides/armor-014-neo1211/armor-config.png "La dureza de la armadura, los encantamientos de protección y la resistencia de retroceso de la armadura controlan los efectos separados. La reducción de daño y el golpeteo no son una configuración.")

Habilitar **Body-part armor** para hacer huecos tales como una materia de cabeza sin casco. Deshágala para que los equipos la protejan juntos. Desactivar **Damage armor items** para armadura que no se desgasta mientras se mantiene activado el cálculo de armadura.

## Referencia del archivo: Armor Stat Source

Los siguientes valores son para la edición directa del archivo de configuración. La pantalla de configuración básica no requiere ingresar todos ellos.

La configuración `armorStatSource` controla cómo se leen la armadura, la dureza y la resistencia al retroceso.

| Valor | Comportamiento |
| --- | --- |
| `AUTO` | Prefieren atributos de entidad utilizables y vuelven a los modificadores de elementos equipados cuando proporcionan el valor de armadura faltante o mayor. |
| `VANILLA_ATTRIBUTE` | Lee los atributos de armadura de la entidad viviente solamente |
| `INVENTORY_SCAN` | Modificadores de suma de casco, pectoral, leggings y botas |

`AUTO` es el valor predeterminado recomendado porque los mods NPC no siempre exponen el equipo a través de atributos vanilla de la misma manera.

## Umbrales de la región de golpe

Para Easy NPC, la altura de impacto resuelta se normaliza contra el cuadro delimitador de entidad.

| Altura normalizada | Región | Ranuras usadas |
| --- | --- | --- |
| `0.75` o superior | Cabeza | Casco |
| `0.375` por debajo `0.75` | Pecho | Placa de pecho |
| Abajo `0.375` | Piernas | Leggings y botas |

CustomNPCs utiliza su resolutor dedicado y los datos del modelo cuando están disponibles. Si no existe un punto de golpe confiable, la región es `unknown` y se usan todas las ranuras de armadura para que el daño ordinario no pierda silenciosamente la protección de la armadura.

## Resistencia, encantamientos y durabilidad

CustomNPCs El orden de resistencia se puede establecer en `CNPC_RESISTANCE_THEN_VANILLA_ARMOR` o `VANILLA_ARMOR_THEN_CNPC_RESISTANCE`. Esta opción afecta al procesamiento CustomNPCs; Easy NPC usa la ruta normal de la entidad de vivienda.

Los encantamientos de protección se aplican solo cuando su interruptor está ENCENDIDO. El daño por omisión de armadura ignora la armadura. La pérdida de durabilidad también es opcional y se aplica a las ranuras que participaron en la reducción, por lo que un golpe en la cabeza en modo dividido no daña las mallas.

La resistencia de retroceso compara el valor de armadura resuelto con el atributo vanilla de la entidad y solo proporciona la cantidad faltante. No duplica la resistencia ya presente en la entidad.
