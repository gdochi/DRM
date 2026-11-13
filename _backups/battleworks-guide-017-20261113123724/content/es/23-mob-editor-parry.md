---
title: La propiedad de combate, el alcance parry y la muerte
slug: mob-editor-parry
order: 270
description: Evita la superposición de controladores y entiende qué opciones de combate están activas.
product: mob-editor
section: combat
category: BattleWorks
status: Guía
version: 0.1.6
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Suprimir los ataques nativos superpuestos

Habilitar **Combat Rules → Combat → Suppress Native Attacks** cuando los hitboxes creados deben tener tiempo de ataque propio.

1. Comienza con un ataque de hitbox.
2. Habilitar la supresión y guardar/aplicar.
3. Compruebe si hay golpes adicionales durante la preparación o recuperación.
4. Si la superposición permanece, inspeccione los scripts de combate CustomNPC.

## 2. Manejar scripts heredados deliberadamente

0.1.5 **Suppress CustomNPC Scripts** impide que la ejecución de scripts heredados compita con BattleWorks. Conserva los datos de script almacenados.

Esto es útil al portar un jefe con guión. Verifique cualquier comportamiento que no sea de combate proporcionado por esos scripts antes de confiar en la supresión. Una nueva práctica NPC normalmente no lo necesita.

## 3. Soporte actual de Parry

| Característica | 0.1.5 Comportamiento de la fuente |
| --- | --- |
| La magia global de Parry Projectile | Integración de reflexión para proyectiles compatibles de Iron's Spellbooks |
| Bloqueo global | Permiso global con ajustes de presentación local |
| Depuración de Hitbox | Visualización, no daños adicionales |
| Ventana de Parry del documento / Postura / Riposte | Se puede editar y persistir, pero no se encontró un patrón de tiempo de ejecución correspondiente BattleWorks |
| Patrón Parryable / Daño de postura en Parry | Estos campos por sí solos no implementan la pérdida de postura, la recuperación cuerpo a cuerpo o la respuesta. |
| guardia / evadir reacciones | Separar la ruta de reacción al daño implementada; ver [pasivos](#mob-editor/battleworks-passives) |

La reflexión de proyectiles no es un soporte universal para todos los proyectiles mod. No hacer un encuentro requieren la postura reservada / campos maposte para ser vencible.

## 4. Configuración global frente a local

| Archivo | Finalidad |
| --- | --- |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Banderas compartidas de parry mágico, lock-on y hitbox-debug |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Paneles, apariencia fija, senderos, audio y preferencias locales |

Los valores predeterminados globales habilitan la magia y el bloqueo y deshabiliten la depuración de hitbox.

**Disable vanilla music** es una preferencia de audio local independiente. Suprime la música de vainilla independientemente del estado de combate y no sobrescribe el valor del volumen de la música. Véase [BGM setup](#mob-editor/battleworks-skills-effects).

![Escenarios de muerte y un calendario de eventos de muerte vacío.](assets/media/guides/battleworks-016-neo1211/battleworks-death.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Habilitado está desactivado y la duración es 60 marca en esta captura. Habilitarlo, establecer la longitud deseada y añadir eventos con Agregar evento de la muerte.")

## 5. Haz una secuencia de muerte corta

1. Abrir **Combat Rules → Death**.
2. Habilitarlo y establecer la duración 40.
3. Habilite Lock Corpse si se debe realizar un movimiento horizontal.
4. Añadir un sonido o título en la marca 0.
5. Agregue otro evento en la marca 20 si es necesario.
6. Mantenga cada evento y la repetición final dentro de Duración.
7. Mata al NPC real y observa toda la secuencia.

El asesino puede convertirse en el objetivo de la secuencia. Los títulos dirigidos por el jugador y el diálogo necesitan un destinatario adecuado. Las habilidades que requieren un lanzador vivo pueden fallar después de la muerte, así que comience con sonido, título y movimiento compatible.

Lock Corpse detiene la navegación y el movimiento horizontal. Gotas, reaparecer, y toda la física del cadáver no están configurados por este interruptor.

## Controles de finalización

Verifique que no se superpongan los hits nativos/script adicionales en la línea de tiempo, que los campos reservados no sean necesarios para la victoria, que la presentación de la muerte termine correctamente y que el archivo deseado permanezca conectado después de reaparecer u otra pelea.
