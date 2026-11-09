---
title: Trainer Maratona Misiones de la Victoria
slug: cobblemon-trainer-quests
order: 568
description: Trainer Maratona Misiones de la Victoria
product: drm-cobblemon-editor
category: Trainer Maratona Misiones de la Victoria
section: trainer
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores
translationSource: en
translationMethod: assisted
---

## Necesidades

El entorno verificado es Cobblemon Editor ** 0.2.9  +  DRM 0.3.1  +  DNPC 0.1.3 / NeoForge 1.21.1 **. El complemento añade **Trainer Victory** a DRM quests. Primero dale al entrenador una identidad legible, luego vincula esa misma identidad en la búsqueda.

## Vincular un ID de entrenador

1. Seleccione el tipo de batalla `Trainer` en Cobblemon Editor.
2. Abrir **Battle Config → General → Set ID**. El campo está marcado con **NPC ID**.
3. Introduzca un identificador legible como `gym_brock` y pulse `Use ID`. Se reutiliza un ID existente; se crea un nuevo ID y se vincula en la misma acción.
4. Guarda el documento y aplícalo al NPC de batalla.

Los identificadores se recortan y se encasillan. Deben comenzar con una letra o dígito, pueden contener letras minúsculas, dígitos, `_`, `.` y `-`, y están limitados a 64 caracteres. Los nombres de NPC y JSON no reemplazan la identidad del entrenador.

El selector de ID enumera los objetivos de victoria del entrenador de las misiones cargadas actualmente. Busca y selecciona el ID de entrenador de una misión existente cuando crees un NPC para una misión que ya hayas creado. Un NPC no necesita existir en el mundo antes del diseño de misiones.

![NPC ID ingresado como gym_guide en el selector real.](assets/media/guides/cobble-029-neo1211/cobble-trainer-id-entry.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Vincular el ID de NPC superior con el ID de uso. Las misiones de búsqueda a continuación reutilizan una identidad de una misión cargada; ninguna coincide en esta instancia. Inspeccionar los controles de identidad es independiente de verificar el conteo de victorias reales.")

## Crea el objetivo

1. Crea una misión y un objetivo en DRM Quest Editor.
2. Elija `Trainer Victory`.
3. Vincula la misma identidad de entrenador que el documento de batalla y establece las ganancias requeridas.
4. Guarda la misión y, a continuación, prueba una batalla real mientras la misión del jugador está activa. Las misiones configuradas para comenzar en el primer progreso siguen esa política de inicio.

Un requisito de 3 significa tres victorias separadas contra el entrenador vinculado. Múltiples NPC que comparten un ID de entrenador cuentan para el mismo objetivo. Usa identificadores distintos para contarlos por separado.

## Lo que cuenta

Solo los jugadores confirmados ganan en DRM las batallas de Entrenador cuentan. Las pérdidas, la huida, la cancelación, las batallas de Pokemon y las batallas externas RCT no cuentan. Las victorias históricas no son importadas. La entrega repetida del mismo resultado de batalla no agrega otra victoria. La identidad se captura cuando comienza la batalla.

Ambos Editores de misiones actuales DRM crean misiones automáticas. Alcanzar el conteo de victorias requerido no termina toda la misión si quedan otros objetivos. Consulte [ migración de datos](#core-fabric/loader-compatibility) al importar JSON de activación más antigua.

## Almacenamiento y copias de seguridad

El tipo objetivo es `cobble_npc:trainer_victory`; los documentos hacen referencia a un estable `trainerKey`. Vincúlelo a través del editor en lugar de sustituir manualmente un ID legible en JSON.

La creación de datos vive bajo `config/dochi_rpg_maker`. Copia de seguridad de los documentos del entrenador, paquetes de misiones, `cobblemon/trainer_registry.json` y `cobblemon/trainer_registry.initialized` juntos, además del mundo que contiene el progreso del jugador.
