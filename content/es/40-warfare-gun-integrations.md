---
title: Integraciones de armas administradas
slug: warfare-gun-integrations
order: 365
description: Utilice armas TACZ, PointBlank y SuperbWarfare a través del controlador de combate Dochi's Warfare compartido.
product: dochi-warfare
category: Integraciones de armas
section: integrations
status: Proyecto
version: 0.3.3
audience: Creadores de PNJ con armas de fuego
tags:
  - TACZ
  - PointBlank
  - SuperbWarfare
translationSource: en
translationMethod: assisted
---

DW 0.3.3 admite Forge 1.20.1, NeoForge 1.21.1 y Fabric 1.21.1. Los vehículos requieren DWE y SuperbWarfare. Consulta la [instalación por loader](#dochi-warfare/warfare-setup) para las dependencias externas.

## Dale a un NPC un arma de otro mod

Con un mod de arma compatible instalado, elija su arma en la página **Gun** de DW. Coloque el elemento real en el inventario del creador, abra el NPC con DW Npc Core, seleccione el elemento y luego confirme la vista previa y **Stored gun** antes de guardar.

![Selección de armas y una piscina M4A1 almacenada.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / NeoForge 1.21.1, Inglés UI. El icono superior proviene del inventario del creador; la lista inferior es el grupo para almacenar en el NPC. Este ejemplo tiene un M4A1 en 100%.")

DW controla a quién detecta el NPC y cuándo dispara o recarga. El arma original mod suministra el modelo, proyectil, sonidos intrínsecos y apoya la mecánica de disparo. Al cambiar de armas, compruebe el alcance, la cadencia y las acciones especiales compatibles del arma junto con la configuración de DW.

## Adaptadores compatibles

| Sistema de armas | Requisito | Comportamiento nativo retenido |
| --- | --- | --- |
| TACZ | Forge/NeoForge: integraciones TaCZ existentes y 1.2.0. Fabric: TACZ Refabricated 0.7.1 y 1.2.0 | Disparo, estado del arma, estado de recarga, RPM, bozal/efectos y persistencia de la pila |
| PointBlank | Opcional 1.11.1 o 2.1.0; instale exactamente uno | Proyectil nativo o escaneo de impactos, rayos de múltiples pellets, disparos a la cabeza, caída, fases de recarga, sonidos y renderizador |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2 | Disparo nativo, recarga, perno, proyectil, sonido, calor, retroceso, durabilidad, modelos, accesorios y persistencia |

Sigue siendo obligatorio un mod de la familia TACZ. Player Animator es obligatorio en clientes Forge/NeoForge y opcional en Fabric. Usa PointBlank/SuperbWarfare solo si existe una versión compatible con el Minecraft y loader usados.

:::warning Puertas de versión
Instalar una rama PointBlank compatible: 1.11.1 o 2.1.0. Utilice las versiones específicas de cargador SuperbWarfare anteriores.
:::

## Configurar un arma externa

1. Comprueba primero el disparo básico del NPC con un arma TACZ o TACZ Refabricated común compatible con tu loader.
2. Instale exactamente una versión opcional del mod de arma compatible en ambos lados.
3. Pon el arma nativa en el inventario del creador.
4. Abra el NPC con `DW Npc Core` y seleccione el elemento en `Gun`. Para múltiples armas, haz que las posibilidades de la piscina sean totales 100% o presiona `Even`.
5. Mantenga `Ammo Stock: -1`, `Reload Duration Ms: 0` y un objetivo visible simple para la primera prueba.
6. Guarde, verifique el renderizado y el disparo nativos y, a continuación, agregue munición finita, grupos, RPM personalizados o IA avanzada.

Los elementos compatibles también se pueden mezclar en un grupo de armas a distancia aleatorias. Un arma de fuego especial o cuerpo a cuerpo sin apoyo es rechazada en lugar de ser parcialmente manejada.

## RPM, recarga y munición

La etiqueta UI `RPM Mode: TACZ Native` se mantiene para compatibilidad. Para un adaptador opcional, el modo nativo resuelve la cadencia admitida del arma operada. Los ajustes de RPM fijos y aleatorios aún están limitados por el comportamiento de enfriamiento nativo; un arma que rechaza un disparo no consume una oportunidad de disparo DW adicional.

`Reload Duration Ms: 0` usa el tiempo de recarga táctico o vacío nativo del arma operada. Un valor positivo es una anulación manual. La munición de reserva siempre viene de DW `Ammo Stock`; TACZ, PointBlank, o SuperbWarfare La munición o el artículo de la revista deben colocarse en el NPC de forma improvisada.

## Solución de problemas cerrada por error

Si TACZ funciona, pero un arma externa no:

1. Compruebe la versión exacta del adaptador.
2. Retire la otra rama PointBlank si ambas están instaladas.
3. Pruebe un arma de fuego normal sin procedimientos especiales de fuego o solo cuerpo a cuerpo.
4. Mantenga las RPM nativas, la munición de reserva infinita y una línea de visión clara.
5. Revise los mensajes del servidor en busca de una versión o arma no compatible.

No compense un adaptador incompatible elevando las RPM, agregando munición improvisada o reemplazando el renderizador nativo.
