---
title: Instalar y configurar la primera toma
slug: warfare-setup
order: 320
description: Instalar los mods requeridos y configurar un NPC para disparar.
product: dochi-warfare
category: Configuración
section: setup
status: Proyecto
version: 0.3.2
audience: Operadores de servidor
tags:
  - setup
  - TACZ
  - gui
translationSource: en
translationMethod: assisted
---

## Mods requeridos

| Artículo | Requisito |
| --- | --- |
| Minecraft / cargador | Forge 1.20.1, NeoForge 1.21.1 o Fabric 1.21.1 |
| Java | Forge 17 / NeoForge y Fabric 21 |
| DW | 0.3.2 del cargador correcto |
| TACZ | Obligatorio: TACZ en Forge/NeoForge; TACZ Refabricated en Fabric. Ya no se aplica la antigua restricción inferior a 1.2 |
| Player Animator | Obligatorio en clientes Forge/NeoForge: Forge 1.0.0+ / NeoForge 2.0+. Opcional en Fabric |
| Fabric | Fabric API + Forge Config API Port (versiones Fabric) |
| NPC mod | DNPC o CustomNPCs |

Instale el cargador coincidente DW y sus requisitos en el servidor y el cliente. DRM es opcional. En el caso de los vehículos, añádase **DWE 0.3.2** y SuperbWarfare. Las versiones SuperbWarfare admitidas son **0.8.9 / 0.8.9.1 / 0.8.9.2** en Forge y **0.8.9.1 / 0.8.9.2** en NeoForge. Incluya las dependencias propias de SuperbWarfare, como Kotlin para Forge.

## Elige un arma del inventario del jugador

Estas pantallas inglesas usan **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![Carabina M4A1 seleccionada en Pistola con la vista previa de PNJ armado.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Elige Pistola a la izquierda y luego haz clic en un arma de fuego en el catálogo de inventario del jugador. Compruebe el arma almacenada y la entrada de arma 100% a continuación.")

1. Coloca un PNJ. Ver [DNPC setup](#dochi-npc-core/npc-core-setup) para un primer actor.
2. Coloque un arma de fuego compatible en el inventario del jugador ****, luego haga clic derecho en el NPC con **DW Npc Core**.
3. Activar **TACZ Fire NPC Mode** en la parte superior derecha. Compruebe el modo y el estado Habilitado en **Overview**.
4. En **Gun**, seleccione el icono de arma de fuego. Si la lista está vacía, revisa el inventario del jugador para ver si tiene un arma compatible.
5. En **Senses → Quick View → Combat Mode**, elija **Stance: Ranged** o **Auto**. Ranged utiliza el arma; Auto cambia entre distancia y cuerpo a cuerpo.
6. En **Quick View → Fire Rate**, comience con **RPM Mode: TACZ Native**. La velocidad y la precisión se configuran aquí.
7. Habilitar **Reload / Supply Ammo** en **Ammo** y establecer **Ammo Stock**. `-1` proporciona reservas ilimitadas.
8. Seleccione un objetivo en **Targets** y, a continuación, utilice el control superior **Save** para guardarlo en el NPC.
9. Prueba contra un objetivo válido dentro del alcance, con visión clara y la dirección de detección correcta. Compruebe el disparo y la recarga.

## Encuentra la siguiente configuración

![Sentidos Vista rápida junto a la conciencia y el modo de combate.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Haga clic en una entrada de Vista rápida para saltar a esa sección. La distancia de detección y la distancia de disparo se configuran por separado.")

| Ubicación | Controles |
| --- | --- |
| **Gun / Melee** | Armas a distancia / cuerpo a cuerpo y daño |
| **Senses → Awareness** | Distancia de adquisición, ángulo, retardo y movimiento inactivo |
| **Senses → Combat Mode** | Cambio a distancia / cuerpo a cuerpo y comportamiento de compromiso |
| **Senses → Fire Modes / Fire Rate** | Fuego en movimiento y ráfagas / velocidad y precisión |
| **Targets** | Objetivos a atacar |
| **Ammo** | Recarga, reservas y regeneración |
| **Armor / Visual & FX / Pose** | Armadura, apariencia, sonidos y poses |
| **Cover** | Cubierta durante el combate |

**Overview** resumen los valores actuales. Múltiples candidatos de arma, piel o armadura deben sumar **100%** en su respectivo grupo. El control actual de la interfaz de usuario **Even** distribuye la probabilidad por igual.

## Reutilizar la configuración en otro NPC

**Save As** un perfil, **Load** en otro NPC, luego **Save**. Los perfiles están bajo `config/dochi_warfare/target_entities/`. Para mantener el NPC en sí, haga clic derecho en el aire con el núcleo para abrir el [biblioteca de clones](#dochi-warfare/warfare-entity-clones).

Continúe a [Easy Build y Presets](#dochi-warfare/warfare-easy-build-presets) para la configuración de comportamiento guiada, o [solución de problemas](#dochi-warfare/warfare-troubleshooting) si no se dispara. Usa **DW Pose Core / DW Mercenary Core / DW Booby Trap Core** para poses, contratación o trampas, y [DWE](#dochi-warfare-expanded/expanded-overview) para vehículos.
