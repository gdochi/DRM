---
title: Tu primer ataque cuerpo a cuerpo
slug: battleworks-first-attack
order: 225
description: Cree un ataque con la configuración exacta, guárdelo, aplíquelo y verifique el resultado.
product: mob-editor
section: start
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

## Lo que construirás

Un DNPC usando un modelo de jugador normal se acerca a un jugador, se prepara durante aproximadamente 1.2 segundos, barre al frente y se recupera. Completar la [instalación y la preparación del NPC](#mob-editor/mob-editor-setup) primero y abrir BattleWorks con el NPC de práctica seleccionado.

Las nuevas capturas fueron verificadas con BattleWorks 0.1.6, DRM 0.3.1 y DNPC 0.1.3 en NeoForge 1.21.1. Estos valores son puntos de partida para la enseñanza. Los modelos Gecko y modded-entity necesitan su propia compatibilidad [configuración de animación](#mob-editor/battleworks-animation).

## 1. Crear el documento

1. Seleccione **Create New**.
2. Dale al documento un nombre reconocible y habilitelo.
3. Deshabilite los patrones no relacionados mientras hace este ejercicio.
4. Abrir **Pattern Build Assist**.

Si está trabajando en un jefe existente, primero cree una copia de práctica separada con Save As.

## 2. Responde a las preguntas de asistencia de construcción

| Pregunta | Elección |
| --- | --- |
| Nivel de detalle | Principiante |
| Forma de ataque | Barrido amplio |
| Ataque Tempo | Medido |

Elija **Beginner → Wide Sweep → Measured**. Cada respuesta avanza automáticamente a la siguiente pregunta. Inspeccionar **Review Choices**, volver a una pregunta si es necesario, a continuación, pulse **Create Pattern**.

Comprobación de finalización: aparece un patrón y un hitbox reutilizable. El asistente los agrega sin reemplazar los patrones existentes.

![Opciones de ataque en Pattern Build Assist.](assets/media/guides/battleworks-016-neo1211/battleworks-assist.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Comience con Principiante, luego elija Amplio barrido y Medido. Vuelva a una pregunta para cambiar una respuesta anterior.")

## 3. Leer el tiempo generado

| Configuración | Valor | Significado |
| --- | --- | --- |
| garrapatas de viento | 24 | Aproximadamente 1.2 segundos de preparación |
| Garrapatas de acción | 16 | Aproximadamente 0.8 segundos de acción |
| Hitbox Event Tick | 3 | Contacto 3 garrapatas en acción |
| garrapatas de recuperación | 24 | Aproximadamente 1.2 segundos de recuperación |
| Daño de Hitbox | 4 | Daño configurado antes de las defensas |
| Refrigeración del patrón | 40 | Reutilice el retraso después de que termine este patrón |
| Animación de acción | Columpio de la mano principal | Swing humanoide normal básico |

Las tres etapas suman **64 garrapatas**, aproximadamente 3.2 segundos. El marcador de contacto está en la marca general `24 + 3 = 27`. La reutilización y los retrasos posteriores al patrón también afectan el tiempo entre ataques.

![Generado patrón de barrido amplio con una línea de tiempo 24/16/24-tick.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Comparar Windup, Acción, Recuperación y el marcador Hitbox en el tick 27. Esto muestra la creación de patrones; no demuestra un éxito en combate.")

## 4. Reduzca el rango después de la primera prueba

El generador comienza con Rango máximo `3.5` y Vertical máximo `32`. Puede guardar, aplicar y probar esos valores primero. Utilice los siguientes ajustes después para reducir el ataque de práctica.

1. Seleccione la configuración del nuevo patrón **Core**.
2. Establecer rango mínimo `0`, rango máximo `2.7` y vertical máximo `2.5`.
3. En Puntuación, usa Distancia Ideal `2.0`.
4. Seleccione su acción Hitbox y elija **Edit this hitbox**.
5. Confirmar Alcance `2.4`, Espesor `0.5` y Daño `4`.
6. Habilitar **Locked Target Only** para la lucha de práctica.

Rango máximo determina cuándo puede comenzar el patrón. El alcance de barrido determina el alcance de la caja de golpe. Elevar el alcance máximo a 10 no hace que el arma alcance bloques 10.

## 5. Detenerse y enfrentar al jugador durante el ataque

1. Seleccione Windup, Acción y Recuperación a su vez.
2. Habilitar **Face Target** en cada uno.
3. Habilitar **Stop Horizontal** y utilizar **Hold** movimiento.
4. Mantenga el swing principal generado en Acción.
5. Utilice **Simulation** o Hitbox Library Play para inspeccionar la dirección y el contacto.

Compruebe las advertencias de vista previa o una ventana de vista previa que no se abra por separado del combate real. Un modelo visible por sí solo no verifica su movimiento o contacto. Confirma el daño real en la prueba de supervivencia a continuación.

## 6. Configurar el comportamiento de combate

Abrir **Combat Rules → Combat**.

| Configuración | Valor |
| --- | --- |
| Suprimir los ataques nativos | En marcha |
| Objetivo Chase | En marcha |
| Cara entre patrones | En marcha |
| Multiplicador de velocidad Chase | 1.0 |
| Distancia de aproximación | 2.0 |
| Escanear sin objetivo | En este ejercicio DNPC |

Utilice Rango de escaneo 16 y FOV 360 en un campo aislado. El escaneo puede seleccionar otras entidades vivientes; mantener NPCs amistosos y otras criaturas fuera de esta prueba. En cambio, las instalaciones CustomNPCs más antiguas compatibles pueden suministrar un objetivo de facción con el escaneo de reserva.

En **Manager**, conjunto **Same Pattern Penalty to 1.0**. Con un solo patrón, un valor de 0 puede eliminar el único candidato después de su primer uso.

## 7. Guardar y aplicar

1. Elija **Save As**, ingrese `training/first_sword.json` y luego confirme con **Save** en el volante.
2. Con el NPC conectado, presione **Save** para enlazarlo a esa ruta.
3. Si es autor sin un NPC, seleccione el NPC de práctica con Core y aplique el archivo de su catálogo.
4. Cierre el editor.

También puede descargar el [UI-saved first_sword.json](./assets/media/battleworks/first_sword.json) en `config/dochi_rpg_maker/mobs/patterns/training/` y cargarlo. Este archivo fue probado en combate con Scan Range 16, FOV 360 y Same Pattern Penalty 1.0. Conserva los valores de ataque generados antes de los ajustes opcionales de la sección 4.

## 8. Prueba en el mundo

1. Cambia a Supervivencia y permanece a unas seis cuadras de distancia.
2. Confirma que Scan Without Target está activado y ninguna otra entidad viviente está cerca.
3. Confirmar enfoque, preparación, contacto y recuperación.
4. Muévete de lado durante otro ataque y observa la cara.
5. Aléjese y confirme los currículums de búsqueda.

| Fracaso | Primeros controles |
| --- | --- |
| Ninguna reacción | Modo de supervivencia, objetivo hostil, Habilitado, corregir el archivo aplicado |
| Se acerca pero nunca ataca | Rango, patrón Habilitado, tiempo de reutilización, repetir puntuación |
| Columpios sin daños | Enlace Hitbox, tiempo de evento, altura, geometría, daño |
| Ataques extra fuera de tiempo | Supresión de ataques nativos y scripts de combate heredados |
| El daño difiere de 4 | Armadura, marcos de invulnerabilidad, efectos, otros mods |

![Combate la configuración después de guardar el archivo y vincularlo al NPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Compruebe Guardado. Advertencias: 0, Scan Without Target, Scan Range 16 y FOV 360. El archivo del servidor es creatures/patterns/training/first_sword.json.")

![El jugador Supervivencia se enfrenta al DNPC después de recibir daño de barrido amplio.](assets/media/guides/battleworks-016-neo1211/battleworks-first-fight.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. La salud del servidor del jugador sin armadura cayó de 20 a 12. El aparición natural y la regeneración se excluyeron en el mundo de captura de propiedad, y el objetivo NPC se verificó como este jugador. Este total no es el daño de un ataque.")

## 9. Cambiar un valor a la vez

Primero cambia Windup de 24 a 40, guarda/aplica y observa los 0.8 segundos adicionales. Restaurarlo, luego cambiar el daño de 4 a 2. Finalmente mueva Event Tick de 3 a 8 y compare el tiempo de contacto.

Mantenga el original de trabajo. Continuar con [ espacio de trabajo y línea de tiempo](#mob-editor/mob-editor-patterns).
