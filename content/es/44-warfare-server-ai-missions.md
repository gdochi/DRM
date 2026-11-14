---
title: AI de servidor y soporte de combate
slug: warfare-server-ai-missions
order: 385
description: Separe las políticas de AI de NPC y vehículo y use los plazos de soporte de DWE.
product: dochi-warfare
category: Herramientas del mundo
section: tools
status: Proyecto
version: 0.3.3
audience: Operadores de servidores y cartógrafos
tags:
  - server
  - ai
  - missions
translationSource: en
translationMethod: assisted
---

## Si la IA habilitada de un NPC sigue sin hacer nada

Una directiva de servidor puede bloquear una característica habilitada en un NPC individual. Abra **Minecraft Mods → Dochi’s Warfare → Config → DW Server AI** para comprobar el permiso de todo el servidor. Esto es independiente de la página Sentidos o Portada abierta al hacer clic con el botón derecho en un NPC. Guardar cambios requiere permiso de servidor de nivel dos.

![Política de IA del servidor en la propia pantalla de configuración de DW.](assets/media/guides/warfare-031-neo1211/dw-server-ai-policy.png "Política real del servidor en DW 0.3.1 / NeoForge 1.21.1. Lea el botón ON/OFF de la función, Estado disponible y explicación de OFF juntos. Esta instancia permitió inicialmente cada característica.")

1. Encuentra la función bloqueada, como **Cover AI** o **Hearing / investigation**.
2. Enciéndalo para permitirlo en el servidor.
3. Pulse **Save** a continuación para enviar la política.
4. Vuelva a la cubierta individual del NPC, los sentidos u otras configuraciones y configure sus condiciones.

**Basic combat preset** restringe las características extendidas de AI juntas. **Allow all features** elimina esos bloqueos globales. Estos botones no sobrescriben el comportamiento detallado de cada NPC con valores idénticos. Compruebe la directiva actual antes de seleccionar un ajuste preestablecido.

## Características que dependen unas de otras

| Política de servidor | Comportamiento relacionado |
| --- | --- |
| Memoria objetivo de combate | Apagarlo también evita el fuego de supresión, que depende de la memoria de combate. |
| Movimiento táctico / Cover AI | El permiso global aún necesita configuraciones por NPC y terreno accesible. |
| Mercenarios AI | La expiración del contrato, la protección de la propiedad y las órdenes de retención permanecen. Esto no detiene el tiempo del contrato. |
| PNJ granada AI / trampas explosivas | Las granadas lanzadas y las trampas colocadas tienen permisos separados. |

Deshabilitar una característica retiene los valores NPC para su reutilización cuando se permite de nuevo. El archivo de directiva del servidor es `config/dochi_warfare/server-ai.json`.

## Vehículos y secuencias de apoyo

**DWE 0.3.3** gestiona la política global de la IA del vehículo por separado. Cambiar la política de NPC no aplica todos los cambios al comportamiento del vehículo. La política del vehículo se almacena en `config/dochi_warfare/vehicle_ai/server-ai.json`.

Construir bombardeo, ametrallamiento, refuerzos de vehículos y movimiento NPC en la línea de tiempo de apoyo [DWE](#dochi-warfare-expanded/expanded-support-timeline).

![Timeline del mundo de DWE 0.3.2, paneles y cámara.](assets/media/guides/dwe-tutorials-20261109/dwe-workspace.mp4 "Pantalla real de NeoForge 1.21.1. La política permite funciones; la timeline define el orden de llamada.")

Llame a un nombre de soporte guardado con `/dw callgimmicks <name> [x y z]`. Siga la guía de línea de tiempo vinculada desde la creación hasta la ejecución mundial.

Continúa con [ajustes de apoyo](#dochi-warfare-expanded/expanded-support-actions) y [guardar, simular e invocar](#dochi-warfare-expanded/expanded-support-run).
