---
title: Hacer que la armadura de NPC importe
slug: dochi-real-armor-overview
order: 900
description: Haz que la armadura equipada reduzca el daño NPC y elige ajustes de parte del cuerpo y durabilidad.
product: dochi-real-armor
category: Sinopsis
section: overview
status: Estable
version: 0.1.5
audience: Jugadores, operadores de servidores y creadores de modpack
tags:
  - armor
  - customnpcs
  - easy npc
translationSource: en
translationMethod: assisted
---

## Hacer NPC blindados más difíciles

Real Armor utiliza armaduras equipadas, resistencia y encantamientos de protección para reducir el daño de los PNJ. También puede habilitar la pérdida de durabilidad o usar solo la armadura que cubre la región golpeada.

Soporta DNPC, Easy NPC y CustomNPCs. DRM es opcional. CustomNPCs no está disponible en 26.3.

En 0.1.5, configura en la GUI los drops de las armaduras que pierden durabilidad de verdad. Consulta la [configuración de drops y el vídeo](#dochi-real-armor/dochi-real-armor-drops) para probabilidades, cantidades y cómo guardar y aplicar conjuntos.

## Empezar

1. Habilite su integración de NPC en [setup](#dochi-real-armor/dochi-real-armor-setup).
2. Equipa al NPC con armadura.
3. Compara el daño del mismo ataque antes y después de equiparlo.
4. Elija armadura de parte del cuerpo y ajustes de durabilidad.

![A DNPC con un conjunto completo de armadura de hierro, con artículos de hierro en Cabeza, Pecho, Piernas y Pies y el modelo equipado en la vista previa.](assets/media/guides/armor-014-neo1211/armor-equipped.png "Ejemplo con Real Armor 0.1.4 + DNPC 0.1.3 / NeoForge 1.21.1. Ponga la armadura en las ranuras de equipo a la derecha en lugar de simplemente almacenarla en NPC storage.")

En esta configuración, un daño de base `10` eliminó la salud `10` sin armadura y `6` con el conjunto de hierro no encantado. Este es un ejemplo de cuerpo entero; el modo de región golpeada, las armas y los encantamientos pueden cambiar el resultado. Si un DNPC no recibe ningún daño, también verifique **Combat AI → Invulnerable** y **Allow player damage**.

## Armadura de cuerpo entero o parte del cuerpo

| Configuración | Armadura usada |
| --- | --- |
| Cuerpo entero | Armados juntos |
| Parte del cuerpo | Casco para cabeza, pectoral para pecho, polainas/botas para piernas |

La armadura de la parte del cuerpo permite que los huecos del equipo importen, como una cabeza sin protección. Los ataques sin una región de golpe reconocible utilizan todas las ranuras equipadas.

El daño por omisión de armadura no se reduce con la armadura. Véase [configuraciones de cálculo](#dochi-real-armor/dochi-real-armor-calculation).
