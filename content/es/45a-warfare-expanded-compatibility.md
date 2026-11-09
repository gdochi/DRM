---
title: Paquetes de vehículos compatibles
slug: expanded-compatibility
order: 315
description: Verifique los vehículos representativos compatibles y las combinaciones en conflicto conocidas.
product: dochi-warfare-expanded
category: Configuración
section: overview
status: Guía
version: 0.3.2
audience: Operadores de servidores / creadores
translationSource: en
translationMethod: assisted
---

## Elige un pack de vehículos

En DWE 0.3.2, revisa cada vehículo y arma. La tabla conserva **pruebas de movimiento/disparo/recarga de DW/DWE 0.3.1**; no establece compatibilidad general de Fabric. Editor/simulación 0.3.2 se ejecutaron aparte en Forge 1.20.1 y Fabric 1.21.1; este tutorial se grabó en NeoForge 1.21.1.

| Paquete | Minecraft / cargador | Vehículos |
| --- | --- | --- |
| AshVehicle | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley, AH-64, F-22 |
| HaloVehículos | Forge 1.20.1 / NeoForge 1.21.1 | M12 HMG |
| MCSP | Forge 1.20.1 / NeoForge 1.21.1 | M3A3 Bradley |
| Paquete de vehículo vintage | Forge 1.20.1 | BMP-2 |
| Paquete de combate en primera línea | Forge 1.20.1 | BMP-2 |
| Espectaculares Máquinas Addon | Forge 1.20.1 | Tipo 10 |

Usa DWE 0.3.2 con DW compatible. DW es obligatorio; los números de versión no tienen que coincidir. Sigue la [configuración del vehículo](#dochi-warfare-expanded/expanded-overview).

## Combinaciones de problemas conocidos

- **SuperbAddon 1.0.1 + SuperbWarfare 0.8.9.2:** Las explosiones pueden chocar. La prueba de explosión SW 0.8.9.1 correspondiente funcionó.
- **MCSP M1A2:** no incluido en los vehículos admitidos de esta guía. Comience con la lista Bradley en su lugar.

## Cambios en los parches actuales

DNPC Las tripulaciones y la protección de los aliados son compatibles, con configuraciones para manejar tripulaciones cuando los vehículos son destruidos. Se han corregido la duplicación de munición y el desbordamiento del cargador después de cambiar la configuración durante la recarga.

AH-6 se corrigieron el fuego objetivo terrestre, la puntería de armas fijas F-22 y la escalada excesiva cerca del terreno descargado. No se proporciona aterrizaje automático.

## Compruebe el vehículo después de abrirlo

Después de instalar un paquete de vehículo, inspeccione sus asientos y funciones reales en **Crew**. Continúe con [vehículo AI](#dochi-warfare/warfare-vehicle-ai) para las fuentes de embarque y los requisitos de la tripulación por arma.

![El mapa de asientos de la tripulación de la base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Seleccione un número de asiento para inspeccionar su función y ocupante a la derecha. Este es un mapa de asientos vacío, no un resultado de embarque completado. Es el vehículo base SuperbWarfare, distinto de MCSP M1A2.")
